// Pure board engine (no DOM) so it can be tested in Node. Layers are centred; a tile is blocked while any higher-layer tile overlaps it.
const Eng=(()=>{
const P={full:()=>1,ring:(x,y,c,r)=>x==0||y==0||x==c-1||y==r-1,diamond:(x,y,c,r)=>Math.abs(x-(c-1)/2)/(c/2)+Math.abs(y-(r-1)/2)/(r/2)<=.95,checker:(x,y)=>(x+y)%2==0,cross:(x,y,c,r)=>Math.abs(x-(c-1)/2)<1||Math.abs(y-(r-1)/2)<1,stripes:(x,y)=>y%2==0,corners:(x,y,c,r)=>(x<2||x>=c-2)&&(y<2||y>=r-2)};
const LAY=["4,4,full;3,3,full","5,4,full;4,3,checker","5,5,diamond;4,4,full","6,4,full;5,3,full","5,6,ring;4,5,full;3,4,full","6,5,cross;5,4,full","6,6,checker;5,5,checker;4,4,full","6,6,corners;5,5,diamond;4,4,full","6,7,stripes;5,6,full;4,5,checker","6,7,full;5,6,full;4,5,full"].map(s=>s.split(";").map(l=>{const a=l.split(",");return[+a[0],+a[1],a[2]]}));
const free=(a,t)=>!a.some(o=>o.z>t.z&&Math.abs(o.x-t.x)<1&&Math.abs(o.y-t.y)<1);
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function build(li){const L=LAY[li],W=L[0][0],H=L[0][1];let t=[];L.forEach(([c,r,p],z)=>{for(let y=0;y<r;y++)for(let x=0;x<c;x++)if(P[p](x,y,c,r))t.push({x:(W-c)/2+x,y:(H-r)/2+y,z})});t=t.slice(0,t.length-t.length%3);t.forEach((o,i)=>o.id=i);return t}
// Solvable by construction: tiles are removed one at a time (always a free tile); types are dealt in that order in same-type groups, so the reverse play order is always legal.
function deal(tiles,groups){const seq=groups.flat(),rem=[...tiles];let i=0;while(rem.length){const f=rem.filter(t=>free(rem,t)),t=f[Math.random()*f.length|0];t.t=seq[i];t.o=i++;rem.splice(rem.indexOf(t),1)}}
function gen(L){const li=L==1?0:L==2?1:Math.random()*Math.min(10,L+1)|0,ty=Math.min(3+((L-1)>>1),7),tiles=build(li);deal(tiles,Array.from({length:tiles.length/3},()=>{const x=Math.random()*ty|0;return[x,x,x]}));return{tiles,ty,li,time:70+tiles.length*3}}
// Shuffle keeps the multiset of types (including those already in the tray) and re-deals a solvable order.
function reshuffle(b,tr){const n={},r={};b.forEach(t=>n[t.t]=(n[t.t]||0)+1);tr.forEach(t=>r[t.t]=(r[t.t]||0)+1);const f=[],rest=[];for(const k in n){let c=n[k];const q=r[k]||0;if(q){const g=3-q;f.push(Array(g).fill(+k));c-=g}for(;c>0;c-=3)rest.push([+k,+k,+k])}deal(b,[...sh(f),...sh(rest)])}
const E={free,gen,reshuffle,sh,LAY};if(typeof module!="undefined")module.exports=E;return E})();
