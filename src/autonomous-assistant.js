// Nexus V20 — unified local assistant surface over existing private/connected intelligence.
(function initAutonomousAssistant(global){
  'use strict';
  const CT=global.CertTrackerV3;
  if(!CT?.recommendations||!CT?.accountConnections){
    if(!global.__nexusAssistantDeferred){
      global.__nexusAssistantDeferred=true;
      const retry=()=>{global.__nexusAssistantDeferred=false;initAutonomousAssistant(global)};
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',retry,{once:true});
      else setTimeout(retry,0);
    }
    return;
  }
  if(CT.autonomousAssistant)return;
  const esc=CT.util.escapeHtml;
  const FEEDBACK_KEY='ct4-autonomous-assistant-feedback-v1';
  const STAGES=Object.freeze([
    Object.freeze({id:'A',version:'V17',label:'Reliable foundation',state:'ACTIVE'}),
    Object.freeze({id:'B',version:'V18',label:'Closed-loop learning',state:'SHADOW'}),
    Object.freeze({id:'C',version:'V19',label:'Proactive assistant',state:'ACTIVE'}),
    Object.freeze({id:'D',version:'V20',label:'Continuous optimisation',state:'SHADOW'})
  ]);

  function safe(call,fallback=null){try{return call()}catch{return fallback}}
  function text(value){return String(value??'').trim()}
  function loadFeedback(){try{return JSON.parse(global.localStorage?.getItem(FEEDBACK_KEY)||'{}')||{}}catch{return {}}}
  function saveFeedback(value){try{global.localStorage?.setItem(FEEDBACK_KEY,JSON.stringify(value||{}))}catch{}}
  function connectionState(){return safe(()=>CT.accountConnections.status(),{outlook:{connected:false,configured:false},github:{connected:false}})}
  function intelligence(){return safe(()=>CT.nextGenIntelligence?.snapshot?.(),null)}
  function strategy(){return safe(()=>CT.strategyIntelligence?.snapshot?.(),null)}
  function weekly(){return safe(()=>CT.weeklyCoach?.summary?.(),null)}
  function recommendation(){return safe(()=>CT.recommendations.recommend({limit:1,horizon:'now'})[0],null)}
  function daysUntil(value){if(!value)return null;const date=new Date(value);if(!Number.isFinite(date.getTime()))return null;return Math.ceil((date-Date.now())/86400000)}

  function snapshot(){
    const connections=connectionState(),next=intelligence(),strategic=strategy(),coach=weekly(),pick=recommendation();
    const localRows=next?.rows||[],priorities=next?.priorities||[];
    const upcoming=localRows.filter(row=>{const days=daysUntil(row.start);return days!=null&&days>=0&&days<=14;});
    const dependencies=[...(strategic?.triggers||[]).filter(item=>item.status==='OPEN'),...(strategic?.proof||[])].slice(0,5);
    const openDecisions=(strategic?.decisions||[]).filter(item=>!['DONE','CANCELLED','SUPERSEDED'].includes(item.state)).slice(0,5);
    const feedback=loadFeedback(),outcomeCount=Object.values(feedback).reduce((sum,row)=>sum+Number(row.count||0),0);
    const checks=[
      {label:'Five-pillar profile',ready:true,detail:'V20 interface contract loaded'},
      {label:'Outlook',ready:!!connections.outlook?.connected,detail:connections.outlook?.connected?'Connected':'Not connected on this device'},
      {label:'GitHub sync',ready:!!connections.github?.connected,detail:connections.github?.connected?'Connected':'Not connected on this device'},
      {label:'Managed intelligence',ready:!!next,detail:next?`${localRows.length} locally available signal${localRows.length===1?'':'s'}`:'Awaiting connected data'},
      {label:'Outcome loop',ready:outcomeCount>0,detail:outcomeCount?`${outcomeCount} local outcome signal${outcomeCount===1?'':'s'}`:'No local outcomes yet'}
    ];
    return Object.freeze({at:new Date().toISOString(),connections,next,strategic,coach,pick,priorities,upcoming,dependencies,openDecisions,feedback,outcomeCount,checks,readyChecks:checks.filter(item=>item.ready).length});
  }

  function actionFrom(snap){
    const commitment=snap.coach?.active;
    if(commitment)return {title:commitment.primaryTitle||commitment.outcome||'Continue this week’s commitment',why:commitment.createdReason||'It is the current recorded weekly commitment.',detail:commitment.outcome||commitment.definitionOfDone||'',route:'learning',key:`commitment:${commitment.id||commitment.primaryId||'active'}`};
    const priority=snap.priorities[0];
    if(priority)return {title:priority.nextAction||priority.subject,why:`${priority.pillar||'INTELLIGENCE'} signal · relevance ${priority.adjustedPersonalScore||priority.personalScore||0}`,detail:priority.dependency?`Dependency: ${priority.dependency}`:'Source-backed intelligence is available for review.',route:'calendar',key:`intelligence:${priority.thread||priority.key||priority.subject}`};
    if(snap.pick)return {title:`Advance ${snap.pick.name}`,why:(snap.pick.reasons||[]).slice(0,2).join(' · ')||'It is the current highest-ranked eligible learning move.',detail:`${snap.pick.readiness?.score||0}% exam readiness · approximately ${Math.round(snap.pick.estimatedHours||0)} hours remaining`,route:'learning',key:`recommendation:${snap.pick.id}`};
    return {title:'Review the current goal',why:'No higher-priority verified action is represented locally.',detail:'Use My Path to select the next evidence checkpoint.',route:'learning',key:'assistant:goal-review'};
  }

  function response(intent,snap=snapshot()){
    const action=actionFrom(snap),key=text(intent).toLowerCase();
    if(/health|system|connection|runtime/.test(key))return {intent:'health',title:`${snap.readyChecks}/${snap.checks.length} local checks ready`,summary:'This page reports browser-local and connected-app state. Private scheduled receipts remain in the control plane and are not exposed in public source.',items:snap.checks.map(item=>`${item.label}: ${item.detail}`),action};
    if(/depend|block|wait|approval/.test(key))return {intent:'dependencies',title:snap.dependencies.length?`${snap.dependencies.length} represented dependencies need review`:'No represented dependency currently needs intervention',summary:snap.openDecisions.length?`${snap.openDecisions.length} decision item${snap.openDecisions.length===1?' is':'s are'} also open.`:'No open decision is represented in the local intelligence view.',items:snap.dependencies.map(item=>item.trigger||item.nextAction||item.subject||item.thread).filter(Boolean),action};
    if(/goal|career|path|cert/.test(key))return {intent:'goals',title:action.title,summary:action.why,items:[action.detail,snap.pick?.portfolioClass?`Evidence class: ${snap.pick.portfolioClass}`:'Evidence, not course completion, is the gate.'].filter(Boolean),action};
    if(/intel|change|risk|opportun|news/.test(key))return {intent:'intelligence',title:snap.priorities.length?`${snap.priorities.length} prioritised intelligence item${snap.priorities.length===1?'':'s'}`:'No material prioritised intelligence is represented locally',summary:snap.strategic?.risks?.length?`${snap.strategic.risks.length} active risk item${snap.strategic.risks.length===1?'':'s'} represented.`:'No material risk is represented in the local view.',items:snap.priorities.slice(0,4).map(item=>`${item.pillar||'INTEL'} — ${item.subject}`),action};
    if(/week|today|calendar|plan|next/.test(key))return {intent:'week',title:action.title,summary:action.why,items:[action.detail,`${snap.upcoming.length} relevant item${snap.upcoming.length===1?'':'s'} represented in the next 14 days`,snap.dependencies.length?`${snap.dependencies.length} dependency item${snap.dependencies.length===1?'':'s'} to check`:'No represented dependency is blocking the plan'].filter(Boolean),action};
    return {intent:'overview',title:action.title,summary:action.why,items:[action.detail,`${snap.priorities.length} prioritised intelligence item${snap.priorities.length===1?'':'s'}`,`${snap.readyChecks}/${snap.checks.length} local system checks ready`].filter(Boolean),action};
  }

  function recordOutcome(intent,signal){
    const data=loadFeedback(),key=`assistant:${text(intent)||'overview'}`,row=data[key]||{count:0,useful:0,dismissed:0,completed:0,last:''};
    row.count+=1;if(signal==='USEFUL')row.useful+=1;if(signal==='DISMISSED')row.dismissed+=1;if(signal==='COMPLETED')row.completed+=1;row.last=new Date().toISOString();data[key]=row;saveFeedback(data);
    CT.nextGenIntelligence?.recordFeedback?.(key,signal==='COMPLETED'?'ACTED':signal);
    CT.events?.emit?.('state-saved',{key:'autonomousAssistantFeedback',at:row.last,signal});
  }

  function assistantHtml(answer,snap){
    const action=answer.action,health=snap.checks.map(item=>`<li class="${item.ready?'is-ready':'is-waiting'}"><span aria-hidden="true"></span><div><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></div></li>`).join('');
    return `<section class="nx-assistant" data-autonomous-assistant aria-label="Nexus autonomous assistant">
      <header class="nx-assistant-head"><div><span class="nx-assistant-kicker">NEXUS // AUTONOMOUS ASSISTANT</span><h2>One command surface. Five specialist pillars.</h2><p>Local guidance from your goals and connected signals. Consequential actions still require the authority defined by V20.</p></div><div class="nx-assistant-version"><strong>V20</strong><span>BOUNDED AUTONOMY</span></div></header>
      <div class="nx-assistant-kpis">
        <button type="button" data-nx-intent="week"><span>Calendar</span><strong>${snap.connections.outlook?.connected?snap.upcoming.length:'—'}</strong><small>${snap.connections.outlook?.connected?'next 14 days':'connect Outlook'}</small></button>
        <button type="button" data-nx-intent="goals"><span>Goals</span><strong>${snap.pick?'1':'—'}</strong><small>${esc(snap.pick?.name||'review needed')}</small></button>
        <button type="button" data-nx-intent="intelligence"><span>Intelligence</span><strong>${snap.priorities.length}</strong><small>prioritised locally</small></button>
        <button type="button" data-nx-intent="health"><span>System health</span><strong>${snap.readyChecks}/${snap.checks.length}</strong><small>local checks ready</small></button>
      </div>
      <div class="nx-assistant-grid">
        <article class="nx-assistant-console">
          <div class="nx-assistant-console-top"><span>UNIFIED GUIDANCE</span><small>Evidence-aware · no silent external action</small></div>
          <form data-nx-assistant-form><label for="nx-assistant-query">What deserves attention?</label><div><input id="nx-assistant-query" name="query" maxlength="180" autocomplete="off" placeholder="Review my week, goals, dependencies or system health"><button type="submit">Analyse</button></div></form>
          <div class="nx-assistant-presets"><button type="button" data-nx-intent="week">Review my week</button><button type="button" data-nx-intent="dependencies">Show blockers</button><button type="button" data-nx-intent="intelligence">What changed?</button><button type="button" data-nx-intent="health">System health</button></div>
          <div class="nx-assistant-response" aria-live="polite"><span>${esc(answer.intent.toUpperCase())}</span><h3>${esc(answer.title)}</h3><p>${esc(answer.summary)}</p>${answer.items.length?`<ul>${answer.items.slice(0,5).map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}<div class="nx-assistant-feedback"><button type="button" data-nx-outcome="USEFUL" data-nx-answer="${esc(answer.intent)}">Useful</button><button type="button" data-nx-outcome="COMPLETED" data-nx-answer="${esc(answer.intent)}">Completed</button><button type="button" data-nx-outcome="DISMISSED" data-nx-answer="${esc(answer.intent)}">Not useful</button></div></div>
        </article>
        <aside class="nx-assistant-action"><span>NEXT BEST ACTION</span><h3>${esc(action.title)}</h3><p>${esc(action.why)}</p><small>${esc(action.detail)}</small><div><button type="button" class="primary" data-nx-route="${esc(action.route)}">Open relevant view</button><button type="button" data-nx-intent="dependencies">Check dependencies</button></div></aside>
        <aside class="nx-assistant-health"><div class="nx-assistant-panel-title"><span>SYSTEM HEALTH</span><small>Local + connected-app view</small></div><ul>${health}</ul><p>Private execution receipts and learning samples remain in the control plane.</p></aside>
      </div>
      <footer class="nx-assistant-stages">${STAGES.map(stage=>`<div data-stage="${stage.id}"><span>${stage.version}</span><strong>${esc(stage.label)}</strong><small>${stage.state}</small></div>`).join('')}</footer>
    </section>`;
  }

  function render(intent='overview'){
    if(global.state?.currentTab!=='dashboard')return;
    const content=document.getElementById('tab-content');if(!content)return;
    const snap=snapshot(),answer=response(intent,snap),wrap=document.createElement('div');wrap.innerHTML=assistantHtml(answer,snap);
    const section=wrap.firstElementChild,existing=content.querySelector('[data-autonomous-assistant]');
    if(existing)existing.replaceWith(section);else (content.querySelector('.dash-hero')||content.firstElementChild)?.after(section);
    bind(section);
  }

  function bind(section){
    section.querySelectorAll('[data-nx-intent]').forEach(button=>button.addEventListener('click',()=>render(button.dataset.nxIntent)));
    section.querySelector('[data-nx-assistant-form]')?.addEventListener('submit',event=>{event.preventDefault();const query=new FormData(event.currentTarget).get('query');render(text(query)||'overview');});
    section.querySelectorAll('[data-nx-outcome]').forEach(button=>button.addEventListener('click',()=>{recordOutcome(button.dataset.nxAnswer,button.dataset.nxOutcome);button.closest('.nx-assistant-feedback').innerHTML='<span>Outcome recorded for local learning.</span>';}));
    section.querySelectorAll('[data-nx-route]').forEach(button=>button.addEventListener('click',()=>{const route=button.dataset.nxRoute;if(route==='calendar')document.getElementById('ct3-launcher')?.click();else global.switchTab?.(route==='learning'?'learning':'dashboard');}));
  }

  function init(){global.addEventListener('certtracker:workspace-rendered',()=>render());global.addEventListener('certtracker:outlook-sync',()=>render());global.addEventListener('certtracker:state-saved',event=>{if(event.detail?.key!=='autonomousAssistantFeedback')render();});setTimeout(()=>render(),0);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  CT.autonomousAssistant=Object.freeze({version:'20.0',STAGES,snapshot,response,recordOutcome,render});
})(window);
