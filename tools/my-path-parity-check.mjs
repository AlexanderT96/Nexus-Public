import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.equal(fs.existsSync('src/career-path-v14.js'), false, 'legacy career-path-v14 overlay must stay removed');
assert.doesNotMatch(indexHtml, /career-path-v14\.js/, 'index.html must not load the legacy My Path overlay');
assert.match(indexHtml, /src\/path-defaults\.js/, 'index.html must load the canonical My Path source');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('certs.js', 'utf8'), sandbox, { filename: 'certs.js' });
vm.runInContext(fs.readFileSync('src/path-defaults.js', 'utf8'), sandbox, { filename: 'src/path-defaults.js' });

const route = sandbox.window.CERT_TRACKER_FOCUSED_ROUTE;
const routeIds = Array.from(route.ids || []);
const focusIds = [...new Set(Array.from(route.focusTracks || []).flatMap(track => Array.from(track.certs || [])))];
const certs = Array.from(sandbox.window.CERTS || []).map(cert => structuredClone(cert));
vm.runInContext(fs.readFileSync('src/cert-extensions.js', 'utf8'), sandbox, { filename: 'src/cert-extensions.js' });
const assembledCerts = Array.from(sandbox.window.CERTS || []);
const assembledById = new Map(assembledCerts.map(cert => [cert.id, cert]));
const baseIds = new Set(certs.map(cert => cert.id));
const byId = new Map([...certs, ...assembledCerts.filter(cert => !baseIds.has(cert.id))].map(cert => [cert.id, cert]));
vm.runInContext(fs.readFileSync('src/catalogue-policy-normalize.js', 'utf8'), sandbox, { filename: 'src/catalogue-policy-normalize.js' });
const runtimeById = new Map(Array.from(sandbox.window.CERTS || []).map(cert => [cert.id, cert]));
assert.ok(route && routeIds.length, 'focused My Path route must be present');
assert.equal(new Set(routeIds).size, routeIds.length, 'My Path must not contain duplicate route IDs');

const unknown = routeIds.filter(id => !byId.has(id));
assert.deepEqual(unknown, [], 'My Path references unknown canonical certification IDs');
assert.deepEqual(focusIds.filter(id => !assembledById.has(id)), [], 'My Path focus tracks reference unknown assembled-catalogue certification IDs');

for (const id of routeIds) {
  const cert = byId.get(id);
  assert.ok(cert.officialUrl && /^https:\/\//.test(cert.officialUrl), `${id} needs an official source URL`);
  assert.ok(cert.sourceUrl === cert.officialUrl, `${id} sourceUrl must match officialUrl`);
  assert.ok(cert.code, `${id} needs an exam or credential code/version`);
  assert.ok(cert.provider, `${id} needs a provider`);
  assert.ok(Number.isFinite(cert.validity), `${id} needs an explicit validity value in months`);
  assert.ok(cert.renewalRule, `${id} needs a renewal rule`);
  assert.ok(cert.costStatus, `${id} needs a cost status`);
  assert.ok(/^\d{4}-\d{2}(?:-\d{2})?$/.test(cert.verifiedAt || ''), `${id} needs a dated verifiedAt value`);
  assert.ok(Array.isArray(cert.tutorBottlenecks) && cert.tutorBottlenecks.length > 0, `${id} needs subject-level tutor bottlenecks`);
}

const az802 = byId.get('az-802');
assert.equal(az802.catalogueStatus, 'ACTIVE');
assert.equal(az802.active, true);
assert.equal(az802.track, 'CORE');
assert.deepEqual(Array.from(az802.deps || []), [], 'AZ-802 must not fabricate AZ-900 as a prerequisite');
assert.ok(Number.isFinite(byId.get('cwne').experienceGate?.enterpriseProjects) && byId.get('cwne').experienceGate.enterpriseProjects >= 3);
assert.equal(Array.from(byId.get('cwap').deps || []).join(','), 'cwna');
assert.equal(Array.from(byId.get('cwdp').deps || []).join(','), 'cwna');
assert.equal(Array.from(byId.get('cwsp').deps || []).join(','), 'cwna');
assert.equal(byId.get('ai-901').code, 'AI-901');
assert.equal(byId.get('cwisa').phase, 2);
assert.equal(byId.get('cwisa').track, 'CORE');
assert.match(byId.get('cwisa').note, /core wireless-IoT/i);
assert.equal(byId.get('sc-100').provider, 'Microsoft');
assert.equal(byId.get('sc-100').track, 'CORE');
assert.deepEqual(Array.from(byId.get('sc-100').awardPrerequisiteAnyOf || []), ['sc-200', 'sc-300', 'sc-500']);
assert.equal(byId.get('cissp').provider, 'ISC2');
assert.ok(byId.get('cissp').applicationBased, 'CISSP must remain visibly experience/application gated');
assert.equal(byId.get('cissp').experienceGate?.minYears, 5);
assert.equal(byId.get('cissp').experienceGate?.domainsRequired, 2);
assert.equal(byId.get('cissp').experienceGate?.endorsementRequired, true);
assert.deepEqual(Array.from(byId.get('cissp').deps || []), [], 'CISSP has experience requirements, not a fabricated CySA+ prerequisite');
assert.ok(focusIds.includes('secai-plus'));
assert.ok(focusIds.includes('iec-62443-cfs'));
const lenelTrack=Array.from(route.focusTracks||[]).find(track=>track.id==='lenels2-access-control');
const briefcamTrack=Array.from(route.focusTracks||[]).find(track=>track.id==='milestone-briefcam');
assert.equal(lenelTrack?.hidden,true,'LenelS2 must remain a collapsed optional unlock track');
assert.deepEqual(Array.from(lenelTrack?.certs||[]),['lca','lcp','lce','lcda']);
assert.equal(lenelTrack?.unlock?.type,'EMPLOYER_PARTNER_ACCESS');
assert.equal(briefcamTrack,undefined,'Accessible BriefCam must not remain duplicated as a hidden optional track');
assert.ok(routeIds.includes('briefcam-tech'),'Accessible BriefCam must be visible in the core route');
const otTrack=Array.from(route.focusTracks||[]).find(track=>track.id==='ot-convergence');
assert.deepEqual(Array.from(otTrack?.certs||[]),['iec-62443-cfs','iec-62443-cra','iec-62443-cds','iec-62443-cms','iec-62443-expert','isa95-fund','isa-apm','isa-cap-associate','isa-cap','isa-61511-sis-fund','isa-61511-sil-select','isa-61511-sil-verify','isa-61511-expert']);
assert.equal(otTrack?.status,'OPTIONAL');
assert.equal(route.executionPolicy?.mode,'FOREGROUND_CORE_BACKGROUND_PYTHON');
assert.equal(route.careerPolicy?.target,'Security Convergence Architect');
assert.equal(route.careerPolicy?.phaseOneCapstone,'ccna');
assert.match(route.careerPolicy?.scope||'',/physical installation is outside/i);
assert.ok(route.careerPolicy?.transitionOne,'first strategic career transition must be explicit');
assert.match(route.careerPolicy?.transitionOne?.employerRule||'',/genuinely engineer and own/i);
assert.ok(Array.isArray(Array.from(route.deScopedTracks||[])) && Array.from(route.deScopedTracks||[]).length>=5,'sidetrack controls must remain explicit');
for (const id of ['az-900','cwisa','cisco-meraki-solutions','pcpp1','ccie-enterprise']) assert.equal(routeIds.includes(id),false,`${id} must not silently return to mandatory core`);
assert.deepEqual(Array.from(runtimeById.get('ai-901').deps||[]),['pcep']);
assert.deepEqual(Array.from(runtimeById.get('ai-103').deps||[]),['pcap','ai-901']);
assert.match(byId.get('pcep').marketNote, /five years/i);
assert.match(byId.get('pcap').marketNote, /five years/i);

console.log(`My Path parity OK: ${routeIds.length} core route IDs, ${focusIds.length} focus-track IDs, ${assembledCerts.length} total assembled catalogue records`);
