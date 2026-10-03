// Generic focused curriculum. No personal progress or automatic exam passes.
(function(global){
  'use strict';
  const groups=[
    ['Security systems and infrastructure core identity',['a-plus','network-plus','mcit','mcde','arcules-csp','mcie','acp','briefcam-tech','ccna'],'Exploit the current role to build enterprise security-systems depth and close the foundation with CCNA. BriefCam is role-driven/deferred until employer access arrives and does not block the CCNA capstone.'],
    ['Infrastructure ownership bridge',['cwna','security-plus','az-802','linux-plus','pcep'],'Prepare for the first strategic move: enterprise Wi-Fi, security fundamentals, Windows Server/hybrid infrastructure and Linux competence, with Python kept deliberately non-competing.'],
    ['Convergence engineering depth',['az-104','az-700','sc-300','pcap','ccnp-enterprise','cwap','cwdp','cwsp'],'Build real infrastructure depth across Azure administration/networking, identity, professional networking and advanced wireless while converting Python into practical automation capability.'],
    ['Architecture and intelligent systems',['sc-500','ai-901','ai-103','az-305','sc-100'],'Add security implementation, applied AI and architecture only after infrastructure competence and evidence are established.'],
    ['Experience-gated architecture capstone',['cissp','cwne'],'Use experience-backed security and wireless authority as late-stage evidence; expert vendor credentials are reassessed against the actual architecture role rather than accumulated automatically.']
  ];
  const ids=Object.freeze(groups.flatMap(g=>g[1]));
  const phases=Object.freeze(Object.fromEntries(groups.map(([title,certs,sub],i)=>[i+1,Object.freeze({title,name:title,sub,layer:sub,window:'Self-paced',certs:Object.freeze(certs),artifact:null,roles:null,applyOut:null})])));
  const additions=Object.freeze(['briefcam-tech','cwna','cwisa','cisco-meraki-solutions','cwap','cwdp','cwsp','cwne','sc-100','cissp']);
  const previousIds=Object.freeze(ids.filter(id=>!additions.includes(id)));
  const previousPaths=Object.freeze([previousIds,Object.freeze(previousIds.filter(id=>id!=='linux-plus')),Object.freeze(previousIds.filter(id=>!['linux-plus','az-700','az-802'].includes(id)))]);
  const focusTracks=Object.freeze([
    Object.freeze({id:'cwnp-wifi',title:'CWNP enterprise Wi-Fi progression',status:'CORE',why:'Enterprise Wi-Fi remains core: CWNA foundation, then CWAP troubleshooting, CWDP design, CWSP security and CWNE experience-gated expert recognition. CWISA is visible but conditional on material IoT/IIoT responsibility.',certs:Object.freeze(['cwna','cwisa','cwap','cwdp','cwsp','cwne']),resources:Object.freeze([{label:'CWNP certifications and study material',url:'https://www.cwnp.com/certifications/cwna'}])}),
    Object.freeze({id:'cellular-wan',title:'Enterprise cellular and Nokia 5G depth',status:'OPTIONAL',why:'The complete Nokia Bell Labs ladder is a credible carrier, RAN and private-5G market signal, but it is not a universal enterprise-cellular requirement. Activate the Associate rung first and add Professional domains only when a target role or private-5G project rewards that telecom depth.',certs:Object.freeze(['nokia-5g-associate','nokia-5g-networking','nokia-5g-slicing','nokia-5g-security','nokia-5g-cloud','nokia-5g-industrial']),topics:Object.freeze(['cellular-wan-operations','cellular-radio-diagnostics','cellular-carrier-core','cellular-security-resilience','cellular-architecture-capstone']),resources:Object.freeze([{label:'Nokia 5G certification portfolio',url:'https://www.nokia.com/networks/training/5g/'},{label:'Nokia Bell Labs 5G programme',url:'https://www.nokia.com/networks/training/bell-labs/'}])}),
    Object.freeze({id:'cloudflare',title:'Cloudflare edge and Zero Trust capability',status:'OPTIONAL',why:'High architecture and operational value for DNS, CDN/WAF/DDoS, tunnels and SASE; no verified public exam ladder, so evidence outranks badge claims.',certs:Object.freeze([]),topics:Object.freeze(['cloudflare-edge-foundations','cloudflare-zero-trust','cloudflare-architecture-capstone']),resources:Object.freeze([{label:'Cloudflare Learning Center',url:'https://www.cloudflare.com/learning/'},{label:'Cloudflare developer learning paths',url:'https://developers.cloudflare.com/learning-paths/'},{label:'Cloudflare Zero Trust documentation',url:'https://developers.cloudflare.com/cloudflare-one/'}])}),
    Object.freeze({id:'ai-security',title:'Vendor-neutral AI security depth',status:'OPTIONAL',why:'Activate after Security+ and AI-901 when AI-system threat modelling, adversarial testing or governance becomes a real project or vacancy requirement; SC-500 remains the Microsoft implementation route.',certs:Object.freeze(['secai-plus']),resources:Object.freeze([{label:'CompTIA certification catalogue',url:'https://www.comptia.org/en-us/certifications/'},{label:'NIST AI Risk Management Framework',url:'https://www.nist.gov/itl/ai-risk-management-framework'},{label:'OWASP Top 10 for LLM Applications',url:'https://genai.owasp.org/llm-top-10/'}])}),
    Object.freeze({id:'ot-convergence',title:'OT, ISA and industrial convergence architecture',status:'OPTIONAL',why:'The entire OT/ISA route remains available without inflating core completion: ISA/IEC 62443 security from Fundamentals through Expert, enterprise-control integration, automation engineering and the sector-gated SIS safety branch. Activate only the branch supported by real industrial or critical-infrastructure exposure.',certs:Object.freeze(['iec-62443-cfs','iec-62443-cra','iec-62443-cds','iec-62443-cms','iec-62443-expert','isa95-fund','isa-apm','isa-cap-associate','isa-cap','isa-61511-sis-fund','isa-61511-sil-select','isa-61511-sil-verify','isa-61511-expert']),branches:Object.freeze([
      Object.freeze({id:'iec-62443',label:'OT cybersecurity lifecycle',certs:Object.freeze(['iec-62443-cfs','iec-62443-cra','iec-62443-cds','iec-62443-cms','iec-62443-expert'])}),
      Object.freeze({id:'automation-architecture',label:'Enterprise-control and automation architecture',certs:Object.freeze(['isa95-fund','isa-apm','isa-cap-associate','isa-cap'])}),
      Object.freeze({id:'sis-safety',label:'Safety-instrumented systems (sector gated)',certs:Object.freeze(['isa-61511-sis-fund','isa-61511-sil-select','isa-61511-sil-verify','isa-61511-expert'])})
    ]),resources:Object.freeze([{label:'ISA/IEC 62443 cybersecurity certificate programme',url:'https://www.isa.org/certification/certificate-programs/isa-iec-62443-cybersecurity-certificate-program'},{label:'ISA/IEC 62443 standards overview',url:'https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards'},{label:'ISA certificate programmes',url:'https://www.isa.org/certification/certificate-programs'}])}),
    Object.freeze({id:'palo-alto',title:'Palo Alto network-security focus',status:'OPTIONAL',why:'Activate when PAN-OS, Prisma or a target vacancy creates vendor-specific return; keep architecture levels experience-gated.',certs:Object.freeze(['pan-practitioner','pan-netsec-pro','pan-ngfw-eng','pan-cloudsec-pro','pan-netsec-arch']),resources:Object.freeze([{label:'Palo Alto Networks certification programme',url:'https://www.paloaltonetworks.com/services/education/certification'},{label:'Beacon learning platform',url:'https://beacon.paloaltonetworks.com/'}])}),
    Object.freeze({id:'lenels2-access-control',title:'LenelS2 access-control engineering ecosystem',status:'EMPLOYER ACCESS',hidden:true,unlock:Object.freeze({type:'EMPLOYER_PARTNER_ACCESS',condition:'Reveal when LenelS2 partner-portal access or assigned OnGuard / NetBox delivery responsibility is confirmed.',evidence:'Partner learning entitlement plus a named workplace system, project or support responsibility.'}),why:'High contextual value for enterprise physical-security work, but the current credential names and eligibility beyond the publicly evidenced LCA foundation must be confirmed inside the authorised partner portal before booking.',certs:Object.freeze(['lca','lcp','lce','lcda']),topics:Object.freeze(['lenels2-platform-foundations','lenels2-integration-operations','lenels2-enterprise-design']),resources:Object.freeze([{label:'LenelS2 training and certification',url:'https://www.lenels2.com/en/training/'},{label:'LenelS2 + BriefCam integration ecosystem',url:'https://buildings.honeywell.com/us/en/brands/our-brands/lenels2/security-solutions/third-party-integration/oaap-partners/briefcam-video-analytics-platform'}])}),
  ]);
  const deScopedTracks=Object.freeze([
    Object.freeze({id:'knowledge-only-azure-fundamentals',title:'Azure fundamentals knowledge',status:'KNOWLEDGE_ONLY',why:'Learn the AZ-900 concepts when needed, but do not require the beginner exam before role-based Azure administration.',certs:Object.freeze(['az-900'])}),
    Object.freeze({id:'wireless-iot-adjacent',title:'Wireless IoT administration',status:'CONDITIONAL',why:'CWISA is useful when IoT/IIoT responsibilities become material; it is not required for the enterprise Wi-Fi progression.',certs:Object.freeze(['cwisa'])}),
    Object.freeze({id:'meraki-vendor-depth',title:'Cisco Meraki vendor depth',status:'CONDITIONAL',why:'Activate when a role or managed estate uses Meraki; CCNA and CWNA provide the more transferable foundations.',certs:Object.freeze(['cisco-meraki-solutions'])}),
    Object.freeze({id:'advanced-python-credential',title:'Advanced Python credential',status:'CONDITIONAL',why:'PCPP1 is only justified if software/automation depth becomes a material part of the role; practical automation evidence outranks another Python badge.',certs:Object.freeze(['pcpp1'])}),
    Object.freeze({id:'expert-cisco-decision',title:'Expert Cisco networking decision',status:'REASSESS',why:'CCIE Enterprise is no longer an automatic capstone. Reassess after CCNP and senior design experience against architecture-oriented alternatives and the actual target role.',certs:Object.freeze(['ccie-enterprise'])})
  ]);
  const auditIds=Object.freeze([...new Set([...ids,...focusTracks.flatMap(x=>x.certs||[]),...deScopedTracks.flatMap(x=>x.certs||[])])]);
  const careerPolicy=Object.freeze({
    target:'Security Convergence Architect',
    coreIdentity:'Security Systems & Infrastructure Engineer',
    scope:'Design, build, implement, maintain, troubleshoot and improve enterprise security systems and the infrastructure they depend on; physical installation is outside the target role.',
    progression:Object.freeze(['Security Systems & Infrastructure Engineer','Infrastructure-capable Security Engineer','Security Convergence Engineer','Senior/Lead Convergence Engineer','Security Convergence Architect']),
    compoundingRule:'Every core item must deepen the security-systems advantage or acquire a missing capability needed for the next ownership jump. Interesting but non-essential technology is conditional, optional or knowledge-only.',
    experienceRule:'Production experience is preferred but is not required where the current role does not provide ownership. Use production work, deliberate labs/projects, or informed troubleshooting/design work without overstating them as equivalent.',
    evidenceRoutes:Object.freeze({
      production:'Hands-on responsibility for a live system or service.',
      lab:'Deliberate lab, project, design or implementation evidence where production access is unavailable.',
      advisory:'Educated troubleshooting, health assessment, design reasoning or technical collaboration where the customer, MSP or another team owns the infrastructure.'
    }),
    roleDrivenDeferred:Object.freeze(['briefcam-tech','lca','lcp','lce','lcda']),
    roleDrivenRule:'Employer-mandated role learning may pre-empt the roadmap when access or responsibility becomes real; dormant vendor tracks must not displace active foreground study.',
    phaseOneCapstone:'ccna',
    transitionOne:Object.freeze({
      objective:'Move from customer-boundary troubleshooting into materially greater infrastructure ownership without discarding the enterprise security-systems specialism.',
      timing:'Opportunity-triggered, not calendar-triggered. Phase 1 should be substantially established, but a high-runway opportunity may justify moving before every deferred vendor item is complete.',
      employerRule:'Prefer teams that genuinely engineer and own technology. Internal IT proximity alone is insufficient when meaningful infrastructure work is routinely handed to an MSP or supplier.',
      mspRule:'MSPs and integrators remain valid targets when they provide real ownership plus strong mentoring, training, compensation and progression.',
      opportunityDimensions:Object.freeze(['technical ownership','infrastructure breadth','design responsibility','training investment','mentorship','internal mobility','security-systems relevance','compensation','architecture runway']),
      hardRule:'A move must materially increase technical ownership, architectural responsibility, development runway or strategically important exposure; do not change employer merely to perform the same bounded support role elsewhere.'
    }),
    transitionTwo:Object.freeze({
      objective:'Move from cross-domain implementation into senior/lead engineering and solution-design authority.',
      trigger:'Demonstrated ownership across multiple infrastructure domains plus evidence of design, resilience, security, integration and lifecycle decisions.'
    })
  });
  const presentationFlow=Object.freeze({
    promise:'Enterprise security systems → infrastructure ownership → convergence engineering → solution design → security convergence architecture.',
    narrative:'Take a specialist enterprise physical-security systems foundation, add ownership of the infrastructure around it, integrate those domains in production, then progress into whole-solution design and architecture.',
    steps:Object.freeze([
      Object.freeze({order:1,id:'specialise',verb:'SPECIALISE',kind:'STAGE',phase:1,title:'Security Systems & Infrastructure',purpose:'Build the core identity and close the foundation with CCNA.'}),
      Object.freeze({order:2,id:'strengthen',verb:'STRENGTHEN',kind:'STAGE',phase:2,title:'Infrastructure Ownership Readiness',purpose:'Close only the capability gaps that improve readiness for greater technical ownership.'}),
      Object.freeze({order:3,id:'own',verb:'OWN',kind:'CAREER_GATE',afterPhase:2,title:'Strategic Transition 1',purpose:'Move when the right opportunity provides materially greater infrastructure ownership, development runway and design exposure.'}),
      Object.freeze({order:4,id:'integrate',verb:'INTEGRATE',kind:'STAGE',phase:3,title:'Security Convergence Engineering',purpose:'Engineer across security systems, networking, wireless, compute, cloud, identity, cybersecurity and automation.'}),
      Object.freeze({order:5,id:'design',verb:'DESIGN',kind:'CAREER_GATE',afterPhase:3,title:'Strategic Transition 2',purpose:'Acquire senior/lead responsibility and genuine solution-design authority rather than substituting architecture exams for experience.'}),
      Object.freeze({order:6,id:'architect',verb:'ARCHITECT',kind:'STAGE',phases:Object.freeze([4,5]),title:'Security Convergence Architecture',purpose:'Own whole-solution technical decisions; use late credentials as evidence of mature capability, not as the definition of success.'})
    ]),
    displayRule:'Show career purpose and transition gates before certification detail. Certifications, labs and evidence are subordinate proof beneath the career objective.',
    tenSecondTest:'A reader should be able to infer within ten seconds that the path takes enterprise physical-security specialism, adds infrastructure ownership, integrates the domains and progresses into architecture.'
  });
  const capabilityModel=Object.freeze({
    purpose:'Measure career progression by demonstrated capability and ownership, not certification count.',
    maturity:Object.freeze([
      Object.freeze({level:1,id:'knowledge',label:'Knowledge',evidence:'Can explain the domain, terminology, architecture and troubleshooting principles; certification or structured study may support this level.'}),
      Object.freeze({level:2,id:'lab',label:'Lab Evidence',evidence:'Can configure, test, break, troubleshoot and document representative systems in a deliberate lab or project.'}),
      Object.freeze({level:3,id:'advisory',label:'Advisory Exposure',evidence:'Can diagnose, assess, design around or collaborate on real environments where another team, customer or MSP retains ownership.'}),
      Object.freeze({level:4,id:'production',label:'Production Ownership',evidence:'Has meaningful hands-on responsibility for live systems, changes, incidents, lifecycle work and operational outcomes.'}),
      Object.freeze({level:5,id:'design',label:'Design Authority',evidence:'Owns or materially influences requirements, architecture, standards, resilience, security, integration, capacity and lifecycle decisions.'})
    ]),
    domains:Object.freeze([
      Object.freeze({id:'security-systems',label:'Enterprise security systems',priority:'ANCHOR',target:'design'}),
      Object.freeze({id:'networking',label:'Networking',priority:'CORE',target:'design'}),
      Object.freeze({id:'wireless',label:'Wireless',priority:'CORE',target:'design'}),
      Object.freeze({id:'windows-compute',label:'Windows / compute / virtualisation',priority:'CORE',target:'production'}),
      Object.freeze({id:'linux',label:'Linux',priority:'SUPPORTING',target:'production'}),
      Object.freeze({id:'cloud',label:'Cloud infrastructure',priority:'CORE',target:'design'}),
      Object.freeze({id:'identity',label:'Identity and access',priority:'CORE',target:'design'}),
      Object.freeze({id:'cybersecurity',label:'Cybersecurity',priority:'CORE',target:'design'}),
      Object.freeze({id:'access-control',label:'Access control',priority:'ROLE_DRIVEN',target:'production'}),
      Object.freeze({id:'analytics',label:'Video analytics',priority:'ROLE_DRIVEN',target:'production'}),
      Object.freeze({id:'automation',label:'Automation and APIs',priority:'SUPPORTING',target:'production'}),
      Object.freeze({id:'ai-systems',label:'Applied AI systems',priority:'LATE_CORE',target:'production'})
    ]),
    progressionRule:'For each strategically important domain, advance evidence from Knowledge to Lab Evidence to Advisory Exposure to Production Ownership to Design Authority. Do not infer a higher level merely from certification.',
    bottleneckRule:'Prioritise the lowest maturity layer that materially blocks the next career transition. More study is not the default answer when the missing layer is production ownership or design authority.',
    recommendationLogic:Object.freeze([
      Object.freeze({when:'knowledge_gap',action:'STUDY',rule:'Use focused learning or a justified certification only when missing knowledge is the actual constraint.'}),
      Object.freeze({when:'lab_gap',action:'BUILD_LAB',rule:'Create practical evidence before adding another overlapping credential.'}),
      Object.freeze({when:'advisory_gap',action:'SEEK_CROSS_TEAM_EXPOSURE',rule:'Use current work, customer collaboration and technical projects to gain real-environment reasoning exposure.'}),
      Object.freeze({when:'production_gap',action:'SEEK_OWNERSHIP',rule:'Ask for live responsibility internally; if the ownership ceiling is structural, prioritise Transition 1 over another certificate.'}),
      Object.freeze({when:'design_gap',action:'SEEK_DESIGN_AUTHORITY',rule:'Pursue senior/lead responsibilities, design participation or Transition 2 rather than substituting architecture exams for design experience.'})
    ]),
    antiBadgeRule:'A certification is evidence of structured knowledge, not automatic evidence of production ownership or design authority.',
    stopStudyingRule:'When knowledge and lab evidence are sufficient but strategically important domains remain blocked at advisory or production maturity, Nexus should explicitly recommend gaining responsibility or changing role instead of continuing certification accumulation.',
    transitionOneGate:'Trigger active opportunity comparison when Phase 1 is substantially established and multiple CORE domains are knowledge/lab capable but production ownership is structurally unavailable in the current role.',
    transitionTwoGate:'Trigger senior/lead or architecture opportunity comparison when multiple CORE domains have production ownership but design authority is the dominant remaining constraint.'
  });
  const executionPolicy=Object.freeze({
    mode:'FOREGROUND_CORE_BACKGROUND_PYTHON',
    foreground:Object.freeze(['mcie','ccna','acp']),
    complementary:Object.freeze(['pcep','pcap']),
    nonCompeting:Object.freeze(['pcep','pcap','ai-901','ai-103']),
    rule:'Python remains a core dependency but cannot displace an active networking, wireless or current-role milestone. AI begins only after the mapped Python rung is complete.'
  });
  global.CERT_TRACKER_FOCUSED_ROUTE=Object.freeze({id:'network-platform-v8',title:'Security systems convergence engineering',ids,phases,focusTracks,deScopedTracks,auditIds,additions,previousIds,previousPaths,careerPolicy,presentationFlow,capabilityModel,executionPolicy});
  global.CERT_TRACKER_DEFAULT_PATH=ids;
  global.CERT_TRACKER_DEFAULT_ADDITIONS=Object.freeze([]);
})(window);
