
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
 {pos:4,t:"Size of the economy",u:"Nominal GDP 2025, US$ trillion",src:"IMF World Economic Outlook, Apr 2025",url:"https://www.imf.org/en/Publications/WEO",fmt:v=>"$"+v.toFixed(2)+"T",
  r:[["USA",30.51],["China",19.23],["Germany",4.74],["India",4.187],["Japan",4.186]]},
 {pos:2,t:"Crude steel production",u:"2025, million tonnes",src:"worldsteel Association",url:"https://worldsteel.org/",fmt:v=>v.toFixed(1)+" Mt",
  r:[["China",960.8],["India",164.9],["USA",82.0],["Japan",80.7],["Russia",67.8]]},
 {pos:3,t:"Vehicle sales",u:"2025, million vehicles",src:"OICA",url:"https://oica.net/",fmt:v=>v.toFixed(2)+"M",
  r:[["China",34.40],["USA",16.68],["India",5.52],["Japan",4.57],["Germany",3.21]]},
 {pos:5,t:"Foreign exchange reserves",u:"US$ bn, latest (Switzerland approx.)",src:"RBI; central banks via Trading Economics",url:"https://tradingeconomics.com/country-list/foreign-exchange-reserves",fmt:v=>"$"+Math.round(v).toLocaleString("en-US")+"B",
  r:[["China",3438],["Japan",1208],["Switzerland",950],["Russia",769],["India",747.6]]},
 {pos:1,t:"Feature films made in a year",u:"Guinness World Records (2013 count, latest verified)",src:"Guinness World Records",url:"https://www.guinnessworldrecords.com/world-records/largest-annual-film-output",fmt:v=>Math.round(v).toLocaleString("en-IN"),
  r:[["India",1724],["Nigeria (approx.)",1000],["USA",738]]},
];
const GDP=[[1990,.321],[1991,.27],[1992,.288],[1993,.279],[1994,.327],[1995,.36],[1996,.393],[1997,.416],[1998,.421],[1999,.459],[2000,.468],[2001,.485],[2002,.515],[2003,.608],[2004,.709],[2005,.82],[2006,.94],[2007,1.217],[2008,1.199],[2009,1.342],[2010,1.676],[2011,1.823],[2012,1.828],[2013,1.857],[2014,2.039],[2015,2.104],[2016,2.295],[2017,2.651],[2018,2.703],[2019,2.836],[2020,2.675],[2021,3.167],[2022,3.353],[2023,3.55],[2024,3.91],[2025,4.187]];
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
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--flash)" stop-opacity=".22"/><stop offset="1" stop-color="var(--flash)" stop-opacity="0"/></linearGradient></defs>${g}
 ${area?`<path d="${area}" fill="url(#${id})"/>`:""}<path d="${path}" fill="none" stroke="var(--flash)" stroke-width="2.25" stroke-linejoin="round"/>
 ${(o.notes||[]).map(([x,y,t,a])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="var(--panel)" stroke="var(--ink2)" stroke-width="1.5"/><text x="${X(x)+(a==="l"?-8:8)}" y="${Y(y)-8}" text-anchor="${a==="l"?"end":"start"}">${t}</text>`).join("")}
 <circle cx="${last[0]}" cy="${last[1]}" r="5.5" fill="var(--flash)" stroke="var(--panel)" stroke-width="2"/>
 <text class="lbl" x="${last[0]-10}" y="${last[1]-12}" text-anchor="end">${o.vf(ld[1])}</text>
 <line class="cx" x1="0" x2="0" y1="${P.t}" y2="${H-P.b}" stroke="var(--muted)" stroke-dasharray="3 3" opacity="0"/><circle class="cd" r="5" fill="var(--flash)" stroke="var(--panel)" stroke-width="2" opacity="0"/>
 <rect x="${P.l}" y="0" width="${W-P.l-P.r}" height="${H}" fill="transparent"/></svg><div class="tip"></div>`;
 const svg=el.querySelector("svg"),tip=el.querySelector(".tip"),cx=svg.querySelector(".cx"),cd=svg.querySelector(".cd");
 const move=e=>{const r=svg.getBoundingClientRect(),sx=(e.clientX-r.left)/r.width*W;let bi=0,bd=1e9;
  pts.forEach((p,i)=>{const d=Math.abs(p[0]-sx);if(d<bd){bd=d;bi=i}});const p=pts[bi];
  cx.setAttribute("x1",p[0]);cx.setAttribute("x2",p[0]);cx.setAttribute("opacity",1);cd.setAttribute("cx",p[0]);cd.setAttribute("cy",p[1]);cd.setAttribute("opacity",1);
  tip.textContent=o.lf(data[bi][0])+" · "+o.vf(data[bi][1]);tip.style.left=(p[0]/W*r.width)+"px";tip.style.top=(p[1]/H*r.height)+"px";tip.classList.add("on")};
 svg.addEventListener("pointermove",move);svg.addEventListener("pointerleave",()=>{tip.classList.remove("on");cx.setAttribute("opacity",0);cd.setAttribute("opacity",0)});
}

function renderBoard(el,list){el.innerHTML=list.map(R=>{const mx=Math.max(...R.r.map(x=>x[1]));
 return `<article class="rank"><div class="top"><span class="pos"><small>#</small>${R.pos}</span><div><h3>${R.t}</h3><span class="unit">${R.u}</span></div></div>
 <div class="rows">${R.r.map(([n,v])=>`<div class="row${n==="India"?" in":""}" title="${n}: ${R.fmt(v)}"><span class="nm">${n}</span><span class="track"><span class="fill" style="width:${Math.max(2,v/mx*100)}%"></span></span><span class="val">${R.fmt(v)}</span></div>`).join("")}</div>
 <p class="src">Source: <a href="${R.url}" rel="noopener">${R.src}</a></p></article>`}).join("")}
function renderKpis(el){el.innerHTML=KPIS.map(k=>`<div class="kpi"><span class="k">${k.k}</span><span class="v">${k.v}</span><span class="n">${k.n}</span><span class="chip${k.red?" red":""}">${k.c}</span></div>`).join("")}
const W0=el=>Math.max(360,Math.min(1100,Math.round(el.clientWidth)||460));
const CH={
 gdp:el=>line(el,GDP,{w:W0(el),h:300,ymax:4.5,yt:[0,1,2,3,4],yf:t=>"$"+t+"T",xt:[1990,1995,2000,2005,2010,2015,2020,2025],vf:v=>"$"+v.toFixed(2)+"T",lf:x=>x,aria:"India GDP rising from 0.32 to 4.19 trillion dollars, 1990 to 2025",notes:[[1991,.27,"1991 crisis","r"],[2007,1.217,"$1T (2007)","l"],[2020,2.675,"COVID dip","r"]]}),
 gold:(el,w)=>line(el,GOLD,{w:W0(el),h:280,ymax:160000,yt:[0,40000,80000,120000,160000],yf:t=>t?"₹"+t/1000+"k":"0",xt:[1970,1990,2010,2026],vf:inr,lf:x=>x>2026?"5 Oct 2026":x,aria:"Gold price in India rising from 63 to 1,47,785 rupees per 10 grams",notes:[[1991,3466,"1991","l"],[2020,47562,"COVID rush","l"]]}),
 repo:(el,w)=>line(el,REPO,{w:W0(el),h:280,step:true,ymin:3,ymax:10,yt:[4,6,8,10],yf:t=>t+"%",xt:[2010,2015,2020,2025],vf:v=>v.toFixed(2)+"%",lf:x=>{const y=Math.floor(x),m=Math.round((x-y)*12);return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Math.min(11,m)]+" "+y},aria:"RBI repo rate from 9% in 2008 to 5.25% in 2026",notes:[[2020.4,4.0,"4% COVID low","r"]]})
};
