import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const app=read('src/autonomous-assistant.js');
const css=read('autonomous-assistant.css');
const index=read('index.html');
const config=read('src/config.js');
const worker=read('sw.js');
const renderer=read('src/renderer.js');
const failures=[];
const requireText=(source,value,label)=>{if(!source.includes(value))failures.push(label)};

for(const value of ['V17','V18','V19','V20','Reliable foundation','Closed-loop learning','Proactive assistant','Continuous optimisation'])requireText(app,value,`assistant missing ${value}`);
for(const value of ['snapshot','response','recordOutcome','data-autonomous-assistant','What deserves attention?'])requireText(app,value,`assistant contract missing ${value}`);
for(const value of ['autonomous-assistant.css','src/autonomous-assistant.js'])requireText(index,value,`index missing ${value}`);
for(const value of ['src/autonomous-assistant.js','autonomous-assistant.css','v4.32.1-autonomous-v20'])requireText(worker,value,`service worker missing ${value}`);
requireText(config,"app: '4.32.1'",'app version not bumped to 4.32.1');
requireText(config,'intelligence: 20','intelligence version not bumped to 20');
requireText(css,'@media(max-width:560px)','mobile assistant layout missing');
requireText(css,'prefers-reduced-motion','reduced-motion handling missing');
requireText(renderer,'focused.definition?.phases?.[ph]','saved focused routes do not use a safe phase lookup');
requireText(renderer,'|| PHASES?.[ph]','saved focused routes do not fall back to canonical phases');

for(const forbidden of ['lvbwdswjcmngyabhusqr','service_role','sb_secret_','AIRTABLE_TOKEN'])if(app.includes(forbidden)||css.includes(forbidden))failures.push(`public assistant contains forbidden private token/reference: ${forbidden}`);

if(failures.length){console.error(failures.map(item=>`FAIL: ${item}`).join('\n'));process.exit(1)}
console.log('Autonomous assistant checks passed.');
