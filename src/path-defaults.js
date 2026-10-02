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
    Object.freeze({id:'cwnp-wifi',title:'CWNP enterprise Wi-Fi progression',status:'CORE',why:'The complete CWNP progression is visible in My Path: CWNA foundation, CWISA bridge, CWAP troubleshooting, CWDP architecture, CWSP security and CWNE experience-gated expert recognition.',certs:Object.freeze(['cwna','cwisa','cwap','cwdp','cwsp','cwne']),resources:Object.freeze([{label:'CWNP certifications and study material',url:'https://www.cwnp.com/certifications/cwna'}])}),
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
  const executionPolicy=Object.freeze({
    mode:'FOREGROUND_CORE_BACKGROUND_PYTHON',
    foreground:Object.freeze(['mcie','ccna','acp']),
    complementary:Object.freeze(['pcep','pcap','pcpp1']),
    nonCompeting:Object.freeze(['pcep','pcap','pcpp1','ai-901','ai-103']),
    rule:'Python remains a core dependency but cannot displace an active networking, wireless or current-role milestone. AI begins only after the mapped Python rung is complete.'
  });
  global.CERT_TRACKER_FOCUSED_ROUTE=Object.freeze({id:'network-platform-v6',title:'Security systems convergence engineering',ids,phases,focusTracks,deScopedTracks,auditIds,additions,previousIds,previousPaths,careerPolicy,executionPolicy});
  global.CERT_TRACKER_DEFAULT_PATH=ids;
  global.CERT_TRACKER_DEFAULT_ADDITIONS=Object.freeze([]);
})(window);
