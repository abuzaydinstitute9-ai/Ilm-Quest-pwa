// Additive audio layer. Uses ONLY its own localStorage keys; never reads or writes the progress key ("ilmq").
const A=(()=>{
const K={voice:"ilmQuestVoiceEnabled",music:"ilmQuestMusicEnabled",fx:"ilmQuestEffectsEnabled",vol:"ilmQuestVolume"},
get=(k,d)=>{try{const v=localStorage.getItem(K[k]);return v===null?d:v}catch(e){return d}},put=(k,v)=>{try{localStorage.setItem(K[k],v)}catch(e){}},
on=k=>get(k,"1")=="1",vol=()=>Math.min(1,Math.max(0,+get("vol","0.7")||0));
let bg=null,duck=0,busy=false,btn=null;const bgv=()=>vol()*.3*(duck?.35:1);
function fade(a,to,ms){if(!a)return;clearInterval(a._f);const from=a.volume,n=Math.max(1,ms/25);let i=0;a._f=setInterval(()=>{i++;try{a.volume=Math.max(0,Math.min(1,from+(to-from)*i/n))}catch(e){}if(i>=n)clearInterval(a._f)},25)}
function showBtn(){if(btn||!AUDIO.tracks.length)return;btn=document.createElement("button");btn.textContent="♪";btn.setAttribute("aria-label","Play background audio");btn.style.cssText="position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:50;width:38px;height:38px;border-radius:50%;border:1px solid var(--bd);background:var(--card);color:var(--ac);font-size:18px;opacity:.8";btn.onclick=()=>music();document.body.appendChild(btn)}
const hideBtn=()=>{if(btn){btn.remove();btn=null}};
function music(){try{if(!on("music")||!AUDIO.tracks.length||document.hidden)return;if(bg&&!bg.paused)return;if(bg&&!bg.error){const p=bg.play();p&&p.then(()=>{hideBtn();fade(bg,bgv(),1000)}).catch(()=>showBtn());return}track(Math.random()*AUDIO.tracks.length|0,0)}catch(e){}}
function track(i,n){if(n>=AUDIO.tracks.length){bg=null;return}const a=new Audio(AUDIO.tracks[i]);bg=a;a.volume=0;a.onended=()=>track(Math.random()*AUDIO.tracks.length|0,0);a.onerror=()=>{if(bg===a)track((i+1)%AUDIO.tracks.length,n+1)};const p=a.play();p&&p.then(()=>{hideBtn();fade(a,bgv(),1500)}).catch(e=>{if(e&&e.name=="NotAllowedError")showBtn()})}
function stop(){if(bg){const a=bg;fade(a,0,600);setTimeout(()=>{try{a.pause()}catch(e){}},650)}hideBtn()}
function tts(t,done){try{if(!t||!window.speechSynthesis){done();return}const u=new SpeechSynthesisUtterance(t);u.volume=vol();u.rate=.95;u.onend=done;u.onerror=done;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){done()}}
// Voice: short, only for key moments. Background fades down, voice plays, background fades back up.
function say(ev){try{if(!on("voice")||busy)return;let v=AUDIO.voice[ev];if(!v)return;if(Array.isArray(v))v=v[Math.random()*v.length|0];busy=true;duck++;fade(bg,bgv(),350);
const end=()=>{if(!busy)return;busy=false;setTimeout(()=>{duck=Math.max(0,duck-1);fade(bg,bgv(),900)},250)},guard=setTimeout(end,15000),fin=()=>{clearTimeout(guard);end()};
const a=new Audio(v.file);a.volume=vol();let fell=false;const fb=()=>{if(fell)return;fell=true;tts(v.text,fin)};a.onended=fin;a.onerror=fb;const p=a.play();p&&p.catch(e=>{if(e&&e.name=="NotAllowedError")fin();else fb()})}catch(e){busy=false}}
function msg(){const q=AUDIO.quotes.filter(x=>x.verification=="verified"),m=AUDIO.messages;if(q.length&&Math.random()<.3){const x=q[Math.random()*q.length|0];return`<div dir="rtl" lang="ar" style="font-size:20px;line-height:1.9">${x.ar}</div><div>${x.en}</div><div class="m">${x.ref}</div>`}return m[Math.random()*m.length|0]}
const tg=(k,l)=>`<div class="row"><span>${l}</span><button class="b" style="width:auto;margin:0;padding:6px 18px" onclick="A.t('${k}');prof()">${on(k)?"ON":"OFF"}</button></div>`;
const panel=()=>`<h4>Audio</h4>${tg("voice","Voice")}${tg("music","Background Nasheed")}${tg("fx","Effects")}<div class="row"><span>Volume</span><input type="range" min="0" max="100" value="${Math.round(vol()*100)}" oninput="A.v(this.value)" style="width:55%"></div><p class="m">Voice recordings and nasheed tracks load from assets/audio/ when present.</p>`;
function t(k){put(k,on(k)?"0":"1");if(k=="music")on("music")?music():stop();if(k=="voice"&&!on("voice")){try{speechSynthesis.cancel()}catch(e){}}}
function v(x){put("vol",String(x/100));if(bg)fade(bg,bgv(),100)}
const unlock=()=>{document.removeEventListener("pointerdown",unlock);music()};document.addEventListener("pointerdown",unlock);
document.addEventListener("visibilitychange",()=>{if(!bg)return;if(document.hidden){try{bg.pause()}catch(e){}}else music()});
return{say,msg,panel,t,v,fx:()=>on("fx"),open:msg()}})();
