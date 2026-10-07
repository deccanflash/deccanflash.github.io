
const KPIS=[
 {k:"RBI repo rate",v:"5.25%",n:"Decision due 7 Oct, 10 AM",c:"Watch",red:true},
 {k:"24K gold / 10g",v:"₹1,47,785",n:"5 Oct 2026 · Dhanteras 6 Nov",c:"Near record"},
 {k:"UPI · Sept 2026",v:"2,407 cr",n:"payments worth ₹29.37 lakh cr",c:"+23% YoY"},
 {k:"GST · Sept 2026",v:"₹2.04L cr",n:"gross collection, ₹2,03,521 cr",c:"+14.7% YoY"},
 {k:"Forex reserves",v:"$747.6B",n:"week ended 25 Sept",c:"World top 5"},
 {k:"Retail inflation",v:"4.82%",n:"CPI, August 2026",c:"Rising",red:true}
];
const RANKS=[
 {pos:1,t:"Money sent home from abroad",u:"Remittances received, 2025, US$ bn",src:"World Bank (WDI)",url:"https://data.worldbank.org/indicator/BX.TRF.PWKR.CD.DT",fmt:v=>"$"+v.toFixed(1)+"B",
  r:[["India",150.7],["Mexico",64.4],["Philippines",41.6],["Egypt",41.5],["Pakistan",40.5]]},
 {pos:1,t:"Milk production",u:"2024, million tonnes",src:"FAOSTAT via Our World in Data",url:"https://ourworldindata.org/",fmt:v=>v.toFixed(1)+" Mt",
  r:[["India",247.8],["USA",102.5],["Pakistan",66.7],["China",45.4],["Brazil",36.9]]},
 {pos:1,t:"Banana production",u:"2024, million tonnes",src:"FAOSTAT via Our World in Data",url:"https://ourworldindata.org/grapher/banana-production",fmt:v=>v.toFixed(1)+" Mt",
  r:[["India",37.6],["China",11.8],["Indonesia",9.3],["Ecuador",7.6],["Brazil",7.0]]},
 {pos:1,t:"Population",u:"2026 estimate, crore people",src:"UN World Population Prospects 2024",url:"https://population.un.org/wpp/",fmt:v=>v.toFixed(1)+" cr",
  r:[["India",147.7],["China",141.3],["USA",34.9],["Indonesia",28.8],["Pakistan",25.9]]},
 {pos:6,t:"Size of the economy",u:"Nominal GDP 2025, US$ trillion",src:"IMF World Economic Outlook, Apr 2026",url:"https://www.imf.org/en/Publications/WEO",fmt:v=>"$"+v.toFixed(2)+"T",
  r:[["USA",30.77],["China",19.63],["Germany",5.05],["Japan",4.44],["UK",4.00],["India",3.92]]},
 {pos:2,t:"Crude steel production",u:"2025, million tonnes",src:"worldsteel Association",url:"https://worldsteel.org/",fmt:v=>v.toFixed(1)+" Mt",
  r:[["China",960.8],["India",164.9],["USA",82.0],["Japan",80.7],["Russia",67.8]]},
 {pos:3,t:"Vehicle sales",u:"2025, million vehicles",src:"OICA",url:"https://oica.net/",fmt:v=>v.toFixed(2)+"M",
  r:[["China",34.40],["USA",16.68],["India",5.52],["Japan",4.57],["Germany",3.21]]},
 {pos:5,t:"Foreign exchange reserves",u:"US$ bn, latest (Switzerland approx.)",src:"RBI; central banks via Trading Economics",url:"https://tradingeconomics.com/country-list/foreign-exchange-reserves",fmt:v=>"$"+Math.round(v).toLocaleString("en-US")+"B",
  r:[["China",3438],["Japan",1208],["Switzerland",950],["Russia",769],["India",747.6]]},
 {pos:1,t:"Feature films made in a year",u:"Guinness World Records (2013 count, latest verified)",src:"Guinness World Records",url:"https://www.guinnessworldrecords.com/world-records/largest-annual-film-output",fmt:v=>Math.round(v).toLocaleString("en-IN"),
  r:[["India",1724],["Nigeria (approx.)",1000],["USA",738]]},
];
const GDP=[[1990,.321],[1991,.27],[1992,.288],[1993,.279],[1994,.327],[1995,.36],[1996,.393],[1997,.416],[1998,.421],[1999,.459],[2000,.468],[2001,.485],[2002,.515],[2003,.608],[2004,.709],[2005,.82],[2006,.94],[2007,1.217],[2008,1.199],[2009,1.342],[2010,1.676],[2011,1.823],[2012,1.828],[2013,1.857],[2014,2.039],[2015,2.104],[2016,2.295],[2017,2.651],[2018,2.703],[2019,2.836],[2020,2.675],[2021,3.167],[2022,3.353],[2023,3.55],[2025,3.916]];
const GOLDP={1964:63,1965:72,1966:84,1967:102,1968:162,1969:176,1970:184,1971:193,1972:202,1973:278,1974:506,1975:540,1976:432,1977:486,1978:685,1979:937,1980:1330,1981:1800,1982:1645,1983:1800,1984:1970,1985:2130,1986:2140,1987:2570,1988:3130,1989:3140,1990:3200,1991:3466,1992:4334,1993:4140,1994:4598,1995:4680,1996:5160,1997:4725,1998:4045,1999:4234,2000:4400,2001:4300,2002:4990,2003:5600,2004:5850,2005:7000,2006:8400,2007:9428,2008:12361,2009:15417,2010:18448,2011:24130,2012:29926,2013:28848,2014:27708,2015:26671,2016:30128,2017:29174,2018:30692,2019:35154,2020:47562,2021:47437,2022:51249,2023:58836,2024:77000,2025:135880};
const GOLD=Object.entries(GOLDP).map(([y,v])=>[+y,v]); GOLD.push([2026.76,147785]);
const REPO=[[2008.58,9.0],[2009.3,4.75],[2011.8,8.5],[2013.1,7.75],[2014.08,8.0],[2015.75,6.75],[2016.8,6.25],[2017.6,6.0],[2018.6,6.5],[2019.8,5.15],[2020.4,4.0],[2022.35,4.4],[2022.95,6.25],[2023.1,6.5],[2025.1,6.25],[2025.45,5.5],[2025.93,5.25],[2026.76,5.25]];


const $=s=>document.querySelector(s);
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
function line(el,data,o){
 const W=o.w||720,H=o.h||300,P={l:46,r:18,t:16,b:28};
 const xs=data.map(d=>d[0]),ys=data.map(d=>d[1]);
 const x0=Math.min(...xs),x1=Math.max(...xs),y0=o.ymin??0,y1=o.ymax;
 const X=x=>P.l+(x-x0)/(x1-x0)*(W-P.l-P.r),Y=y=>H-P.b-(y-y0)/(y1-y0)*(H-P.t-P.b);
 let pts=data.map(d=>[X(d[0]),Y(d[1])]);
 let path; if(o.step){path="M"+pts[0];for(let i=1;i<pts.length;i++)path+=`H${pts[i][0]}V${pts[i][1]}`}else path="M"+pts.map(p=>p.join(",")).join("L");
 const area=o.step?"":`${path}L${pts.at(-1)[0]},${Y(y0)}L${pts[0][0]},${Y(y0)}Z`;
 let g="";for(const t of o.yt){g+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--grid)" stroke-width="1"/><text x="${P.l-8}" y="${Y(t)+4}" text-anchor="end">${o.yf(t)}</text>`}
 for(const t of o.xt)g+=`<text x="${X(t)}" y="${H-6}" text-anchor="middle">${t}</text>`;
 const last=pts.at(-1),ld=data.at(-1);
 const id="g"+Math.random().toString(36).slice(2,7);
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--flash)" stop-opacity=".22"/><stop offset="1" stop-color="var(--flash)" stop-opacity="0"/></linearGradient><clipPath id="${id}c"><rect class="clip" x="0" y="0" width="${W}" height="${H}"/></clipPath></defs><g class="gr">${g}</g>
 ${area?`<path class="ar" d="${area}" fill="url(#${id})" clip-path="url(#${id}c)"/>`:""}<path class="ln" d="${path}" fill="none" stroke="var(--flash)" stroke-width="2.25" stroke-linejoin="round"/>
 ${(o.notes||[]).map(([x,y,t,a])=>`<g class="nt" data-x="${X(x)}"><circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="var(--panel)" stroke="var(--ink2)" stroke-width="1.5"/><text x="${X(x)+(a==="l"?-8:8)}" y="${Y(y)-8}" text-anchor="${a==="l"?"end":"start"}">${t}</text></g>`).join("")}
 <circle class="end" cx="${last[0]}" cy="${last[1]}" r="5.5" fill="var(--flash)" stroke="var(--panel)" stroke-width="2"/>
 <text class="lbl" x="${last[0]-10}" y="${last[1]-12}" text-anchor="end">${o.vf(ld[1])}</text>
 <line class="cx" x1="0" x2="0" y1="${P.t}" y2="${H-P.b}" stroke="var(--muted)" stroke-dasharray="3 3" opacity="0"/><circle class="cd" r="5" fill="var(--flash)" stroke="var(--panel)" stroke-width="2" opacity="0"/>
 <rect x="${P.l}" y="0" width="${W-P.l-P.r}" height="${H}" fill="transparent"/></svg><div class="tip"></div>`;
 const svg=el.querySelector("svg"),tip=el.querySelector(".tip"),cx=svg.querySelector(".cx"),cd=svg.querySelector(".cd");
 const move=e=>{const r=svg.getBoundingClientRect(),sx=(e.clientX-r.left)/r.width*W;let bi=0,bd=1e9;
  pts.forEach((p,i)=>{const d=Math.abs(p[0]-sx);if(d<bd){bd=d;bi=i}});const p=pts[bi];
  cx.setAttribute("x1",p[0]);cx.setAttribute("x2",p[0]);cx.setAttribute("opacity",1);cd.setAttribute("cx",p[0]);cd.setAttribute("cy",p[1]);cd.setAttribute("opacity",1);
  tip.textContent=o.lf(data[bi][0])+" · "+o.vf(data[bi][1]);tip.style.left=(p[0]/W*r.width)+"px";tip.style.top=(p[1]/H*r.height)+"px";tip.classList.add("on")};
 el._line={pts,data,vf:o.vf,W,P};
 svg.addEventListener("pointermove",move);svg.addEventListener("pointerleave",()=>{tip.classList.remove("on");cx.setAttribute("opacity",0);cd.setAttribute("opacity",0)});
}

function renderBoard(el,list){el.innerHTML=list.map(R=>{const mx=Math.max(...R.r.map(x=>x[1]));
 return `<article class="rank"><div class="top"><span class="pos"><small>#</small>${R.pos}</span><div><h3>${R.t}</h3><span class="unit">${R.u}</span></div></div>
 <div class="rows">${R.r.map(([n,v])=>`<div class="row${n==="India"?" in":""}" title="${n}: ${R.fmt(v)}"><span class="nm">${n}</span><span class="track"><span class="fill" style="width:${Math.max(2,v/mx*100)}%"></span></span><span class="val">${R.fmt(v)}</span></div>`).join("")}</div>
 <p class="src">Source: <a href="${R.url}" rel="noopener">${R.src}</a></p></article>`}).join("")}
function renderKpis(el){el.innerHTML=KPIS.map(k=>`<div class="kpi"><span class="k">${k.k}</span><span class="v">${k.v}</span><span class="n">${k.n}</span><span class="chip${k.red?" red":""}">${k.c}</span></div>`).join("")}
const W0=el=>Math.max(360,Math.min(1100,Math.round(el.clientWidth)||460));
const CH={
 gdp:el=>line(el,GDP,{w:W0(el),h:300,ymax:4.5,yt:[0,1,2,3,4],yf:t=>"$"+t+"T",xt:[1990,1995,2000,2005,2010,2015,2020,2025],vf:v=>"$"+v.toFixed(2)+"T",lf:x=>x,aria:"India GDP rising from 0.32 to 3.92 trillion dollars, 1990 to 2025",notes:[[1991,.27,"1991 crisis","r"],[2007,1.217,"$1T (2007)","l"],[2020,2.675,"COVID dip","r"]]}),
 gold:(el,w)=>line(el,GOLD,{w:W0(el),h:280,ymax:160000,yt:[0,40000,80000,120000,160000],yf:t=>t?"₹"+t/1000+"k":"0",xt:[1970,1990,2010,2026],vf:inr,lf:x=>x>2026?"5 Oct 2026":x,aria:"Gold price in India rising from 63 to 1,47,785 rupees per 10 grams",notes:[[1991,3466,"1991","l"],[2020,47562,"COVID rush","l"]]}),
 repo:(el,w)=>line(el,REPO,{w:W0(el),h:280,step:true,ymin:3,ymax:10,yt:[4,6,8,10],yf:t=>t+"%",xt:[2010,2015,2020,2025],vf:v=>v.toFixed(2)+"%",lf:x=>{const y=Math.floor(x),m=Math.round((x-y)*12);return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Math.min(11,m)]+" "+y},aria:"RBI repo rate from 9% in 2008 to 5.25% in 2026",notes:[[2020.4,4.0,"4% COVID low","r"]]})
};

/* ---- horizontal bar chart (diverging-aware) ---- */
function hbar(el,data,o){o=o||{};
 const vals=data.map(d=>d[1]),mx=Math.max(0,...vals),mn=Math.min(0,...vals),span=(mx-mn)||1;
 const pad=o.labelPad??24; /* % of width reserved for value labels */
 const scale=v=>(v-mn)/span*(100-pad);
 const z=scale(0);
 el.classList.add("hb");
 el.innerHTML=data.map(([n,v,meta])=>{const a=scale(Math.min(0,v)),b=scale(Math.max(0,v));
  const cls=v<0?"neg":(o.diverging?"pos":"");const lab=o.fmt?o.fmt(v):v;
  const vp=v<0?`left:calc(${z}% + 6px)`:`left:calc(${b}% + 6px)`;
  return `<div class="hb-row${o.hl&&o.hl(n)?" in":""}" title="${n}: ${lab}${meta?" · "+meta:""}"><span class="nm">${n}</span><span class="hb-plot">${mn<0?`<i class="hb-zero" style="left:${z}%"></i>`:""}<i class="hb-bar ${cls}" style="left:${a}%;width:${Math.max(.6,b-a)}%"></i><span class="hb-val" style="${vp}">${lab}</span></span></div>`}).join("");
}
function sortable(btns,el,data,o){const go=m=>{const d=[...data];if(m==="desc")d.sort((a,b)=>b[1]-a[1]);if(m==="asc")d.sort((a,b)=>a[1]-b[1]);const before=window.DFM?DFM.snap(el):null;hbar(el,d,o);if(before)DFM.flip(el,before);btns.forEach(b=>b.setAttribute("aria-pressed",b.dataset.sort===m))};
 btns.forEach(b=>b.addEventListener("click",()=>go(b.dataset.sort)));go("desc")}
const pct=v=>(v>0?"+":"")+v.toFixed(1)+"%";

/* 2025 India markets (calendar year, price return) */
const SECTORS25=[["PSU Bank",27.67],["Metal",24.02],["Auto",21.86],["Financial Services",17.11],["Bank",16.49],["Commodities",15.01],["MNC",8.81],["Consumption",7.96],["Services",7.95],["CPSE",4.08],["PSE",2.32],["Energy",0.13],["Pharma",-2.14],["FMCG",-2.81],["IT",-9.71],["Realty",-16.10],["Media",-22.16]];
const ASSETS25=[["Silver",122],["Gold",72],["Nifty 50",10.5],["Sensex",9.1],["Nifty 500",6.29],["Nifty Midcap 150",5.09],["Nifty Smallcap 250",-7.22]];
/* IMF WEO Apr 2026: nominal GDP 2025, US$ billion */
const WGDP25=[["United States",30767.08],["China",19626.25],["Germany",5048.06],["Japan",4435.16],["United Kingdom",4003.02],["India",3916.31],["France",3368.93],["Russia",2587.94],["Italy",2550.11],["Canada",2319.90],["Brazil",2279.92],["Spain",1903.83],["South Korea",1872.38],["Australia",1839.96],["Mexico",1832.64],["Türkiye",1597.30],["Indonesia",1445.64],["Netherlands",1332.24],["Saudi Arabia",1276.94],["Switzerland",1043.54]];


/* ================================================================
   Motion layer: data draws itself when it scrolls into view.
   Lines trace with a live value dot, bars grow, numbers count up,
   re-sorted rows glide. Off for prefers-reduced-motion.
   ================================================================ */
const DFM=(()=>{
 const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 const tween=(dur,fn,done)=>{const t0=performance.now();const f=n=>{const t=Math.min(1,(n-t0)/dur);fn(ease(t));t<1?requestAnimationFrame(f):done&&done()};requestAnimationFrame(f)};
 /* ---- count-up for any "₹1,47,785" / "+27.7%" / "$3.92 trillion" style text ---- */
 const NUM=/^(.*?)([+\-−]?)(\d[\d,]*(?:\.\d+)?)(.*)$/s;
 function count(el,dur=1400){
  const txt=el.textContent,m=txt.match(NUM);if(!m||el.dataset.counted)return;el.dataset.counted=1;
  const [,pre,sg,num,post]=m,v=parseFloat(num.replace(/,/g,"")),dec=(num.split(".")[1]||"").length;
  const loc=/\d,\d\d,\d{3}/.test(num)||pre.includes("₹")?"en-IN":"en-US",comma=num.includes(",");
  const fmt=x=>{const s=comma?x.toLocaleString(loc,{minimumFractionDigits:dec,maximumFractionDigits:dec}):x.toFixed(dec);return pre+sg+s+post};
  el.style.fontVariantNumeric="tabular-nums";
  tween(dur,t=>el.textContent=fmt(v*t),()=>el.textContent=txt);
 }
 /* ---- line chart: draw path, area wipes behind a travelling dot that shows the value ---- */
 function drawLine(plot){
  const L=plot._line,svg=plot.querySelector("svg");if(!L||!svg||svg.dataset.drawn)return;svg.dataset.drawn=1;
  const ln=svg.querySelector(".ln"),clip=svg.querySelector(".clip"),end=svg.querySelector(".end"),lbl=svg.querySelector(".lbl"),nts=[...svg.querySelectorAll(".nt")];
  const len=ln.getTotalLength(),x0=L.pts[0][0],x1=L.pts.at(-1)[0],fx=+end.getAttribute("cx"),fy=+end.getAttribute("cy"),ftxt=lbl.textContent;
  ln.style.strokeDasharray=len;ln.style.strokeDashoffset=len;
  svg.classList.add("drawing");
  const valAt=x=>{const p=L.pts;let i=1;while(i<p.length-1&&p[i][0]<x)i++;const a=p[i-1],b=p[i],k=b[0]===a[0]?1:Math.max(0,Math.min(1,(x-a[0])/(b[0]-a[0])));return L.data[i-1][1]+(L.data[i][1]-L.data[i-1][1])*k};
  tween(2200,t=>{
   ln.style.strokeDashoffset=len*(1-t);
   const pt=ln.getPointAtLength(len*t);
   clip.setAttribute("width",pt.x);
   end.setAttribute("cx",pt.x);end.setAttribute("cy",pt.y);
   lbl.setAttribute("x",pt.x-10);lbl.setAttribute("y",pt.y-12);
   lbl.textContent=L.vf(valAt(pt.x));
   nts.forEach(n=>{if(pt.x>=+n.dataset.x)n.classList.add("on")});
  },()=>{ln.style.strokeDasharray="";ln.style.strokeDashoffset="";clip.setAttribute("width",L.W);end.setAttribute("cx",fx);end.setAttribute("cy",fy);lbl.setAttribute("x",fx-10);lbl.setAttribute("y",fy-12);lbl.textContent=ftxt;nts.forEach(n=>n.classList.add("on"));svg.classList.remove("drawing");svg.classList.add("done");end.classList.add("pulse")});
 }
 /* ---- bars grow with a stagger; values count up beside them ---- */
 function growBars(box){
  if(box.dataset.grown)return;box.dataset.grown=1;
  const bars=[...box.querySelectorAll(".fill,.hb-bar")];
  bars.forEach((b,i)=>{b.style.setProperty("--d",(i*55)+"ms")});
  box.classList.add("grow");
  box.querySelectorAll(".val,.hb-val").forEach((v,i)=>setTimeout(()=>count(v,900),i*55));
 }
 /* ---- FLIP for re-sorting ---- */
 const snap=el=>{const m=new Map();el.querySelectorAll(".hb-row").forEach(r=>m.set(r.querySelector(".nm").textContent,r.getBoundingClientRect().top));return m};
 function flip(el,before){
  el.dataset.grown=1;el.classList.add("grow");
  if(calm)return;
  el.querySelectorAll(".hb-row").forEach((r,i)=>{const t=before.get(r.querySelector(".nm").textContent);if(t==null)return;
   const dy=t-r.getBoundingClientRect().top;if(!dy)return;
   r.animate([{transform:`translateY(${dy}px)`},{transform:"none"}],{duration:650+Math.min(i,12)*18,easing:"cubic-bezier(.65,0,.35,1)"});});
 }
 function boot(){
  if(calm)return;
  document.documentElement.classList.add("motion");
  const targets=[
   ...document.querySelectorAll(".plot"),
   ...document.querySelectorAll(".rank .rows,.hb"),
   ...document.querySelectorAll(".kpi .v,.chart .big,.hero-num .big"),
   ...document.querySelectorAll(".kpis,.card,.rank,.chart,.tbl")
  ];
  const run=el=>{
   if(el.classList.contains("plot"))drawLine(el);
   else if(el.matches(".rows,.hb"))growBars(el);
   else if(el.matches(".v,.big"))count(el);
   else el.classList.add("seen");
  };
  if(!("IntersectionObserver"in window)){targets.forEach(run);return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target)}}),{threshold:.25,rootMargin:"0px 0px -8% 0px"});
  targets.forEach(el=>{if(el.matches(".kpis,.card,.rank,.chart,.tbl"))el.classList.add("rise");io.observe(el)});
  document.querySelectorAll(".cards .card,.board .rank,.kpis .kpi").forEach((c,i)=>c.style.setProperty("--i",i%8));
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else setTimeout(boot,0);
 return {snap,flip,count};
})();
