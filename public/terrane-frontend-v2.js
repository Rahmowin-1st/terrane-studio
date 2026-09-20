/* TERRANE Frontend V2 — art-direction runtime.
   Adds visual chrome and motion only. Does not alter form payloads, routes or backend. */
(() => {
  if (window.__TERRANE_FRONTEND_V2__) return;
  window.__TERRANE_FRONTEND_V2__ = true;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine=matchMedia("(pointer:fine)").matches;

  function boot(){
    document.body.classList.add("terrane-v2");
    installChrome();
    caseChrome();
    tagScenes();
    activeNavigation();
    projectDepth();
    approachObserver();
    magneticCTAs();
    refreshMotion();
  }

  function installChrome(){
    if(q(".terrane-chrome"))return;
    const el=document.createElement("div");
    el.className="terrane-chrome";
    el.setAttribute("aria-hidden","true");
    el.innerHTML=
      '<div class="terrane-chrome__progress"></div>'+
      '<div class="terrane-chrome__left"><span>TERRANE / TASHKENT</span><i class="terrane-chrome__rule"></i><span>41.31°N</span></div>'+
      '<div class="terrane-chrome__right"><span>ARCHITECTURE / INTERIOR / LAND</span><i class="terrane-chrome__rule"></i><span>69.24°E</span></div>'+
      '<div class="terrane-chrome__scene"><b>01</b><span>GROUND / LIGHT / DURATION</span></div>';
    document.body.appendChild(el);

    let ticking=false;
    const update=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const p=clamp(scrollY/max,0,1);
      document.documentElement.style.setProperty("--tv2-progress",p.toFixed(4));
      ticking=false;
    };
    addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
    update();
  }

  function caseChrome(){
    const root=document.getElementById("terrane-case-root");
    if(!root)return;
    const scene=q(".terrane-chrome__scene");
    if(scene) scene.innerHTML="<b>CS</b><span>CASE / STUDY</span>";
    const left=q(".terrane-chrome__left");
    if(left) left.innerHTML="<span>TERRANE / CASE STUDY</span><i class=\"terrane-chrome__rule\"></i><span>ARCHIVE</span>";
  }

  function tagScenes(){
    const config=[
      [".hero-scene","01","GROUND / LIGHT / DURATION"],
      [".practice-scene","02","PRACTICE / WHAT REMAINS"],
      [".work-scene","03","SELECTED WORK / 01—05"],
      [".expertise-scene","04","EXPERTISE / ONE PRACTICE"],
      [".control-scene","05","DECISION ARCHITECTURE"],
      [".approach-scene","06","APPROACH / SITE TO HANDOVER"],
      [".studio-scene","07","STUDIO / TASHKENT"],
      [".commission-scene","08","COMMISSION / BEGIN"]
    ];
    const sceneRead=q(".terrane-chrome__scene");
    const observer=new IntersectionObserver(entries=>{
      const hit=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!hit)return;
      const n=hit.target.dataset.tv2Index||"01";
      const label=hit.target.dataset.tv2Label||"TERRANE";
      if(sceneRead)sceneRead.innerHTML="<b>"+n+"</b><span>"+label+"</span>";
    },{rootMargin:"-38% 0px -42% 0px",threshold:[0,.1,.25,.5,.75]});

    config.forEach(([sel,n,label])=>{
      const el=q(sel);if(!el)return;
      el.dataset.tv2Scene="true";
      el.dataset.tv2Index=n;
      el.dataset.tv2Label=label;
      observer.observe(el);
    });
  }

  function activeNavigation(){
    const links=qa('.site-header nav a[href^="#"]');
    if(!links.length)return;
    const map=new Map();
    links.forEach(a=>{const id=a.getAttribute("href");const el=q(id);if(el)map.set(el,a)});
    const ob=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting)return;
        links.forEach(a=>a.dataset.active="false");
        map.get(e.target)?.setAttribute("data-active","true");
      });
    },{rootMargin:"-42% 0px -50% 0px",threshold:.01});
    map.forEach((_,el)=>ob.observe(el));
  }

  function projectDepth(){
    qa(".project-story").forEach((story,i)=>{
      story.dataset.tv2Project=String(i+1).padStart(2,"0");
      const stage=q(".project-stage",story);
      const image=q(".project-image.is-active",stage||story);
      if(!stage||!fine||reduce)return;

      const reset=()=>{
        stage.style.setProperty("--tv2-rx","0deg");
        stage.style.setProperty("--tv2-ry","0deg");
        if(image)image.style.transform="";
      };
      stage.addEventListener("pointermove",e=>{
        const r=stage.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        stage.style.setProperty("--tv2-rx",(-y*2.4).toFixed(2)+"deg");
        stage.style.setProperty("--tv2-ry",(x*3.2).toFixed(2)+"deg");
        if(image)image.style.transform="scale(1.055) translate("+(-x*7).toFixed(1)+"px,"+(-y*5).toFixed(1)+"px)";
      });
      stage.addEventListener("pointerleave",reset);
    });
  }

  function approachObserver(){
    const steps=qa(".approach-step");
    if(!steps.length)return;
    const ob=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          steps.forEach(x=>x.classList.remove("is-current"));
          e.target.classList.add("is-current");
        }
      });
    },{rootMargin:"-38% 0px -48% 0px",threshold:.1});
    steps.forEach(x=>ob.observe(x));
  }

  function magneticCTAs(){
    if(!fine||reduce)return;
    qa(".hero-primary-cta,.project-link,.consultation-submit").forEach(el=>{
      if(el.dataset.tv2Magnetic)return;
      el.dataset.tv2Magnetic="1";
      el.addEventListener("pointermove",e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left-r.width/2)/r.width;
        const y=(e.clientY-r.top-r.height/2)/r.height;
        el.style.transform="translate("+(x*5).toFixed(1)+"px,"+(y*4).toFixed(1)+"px)";
      });
      el.addEventListener("pointerleave",()=>{el.style.transform=""});
    });
  }

  function refreshMotion(){
    if(!window.gsap||reduce)return;
    try{
      window.gsap.registerPlugin(window.ScrollTrigger);
      const gsap=window.gsap,ST=window.ScrollTrigger;

      qa(".practice-proof").forEach((el,i)=>{
        gsap.fromTo(el,{y:i%2?58:30,opacity:.4},{y:i%2?(i===3?-32:48):0,opacity:1,ease:"none",
          scrollTrigger:{trigger:el,start:"top 95%",end:"top 50%",scrub:.8}});
      });

      qa(".project-story").forEach((story,i)=>{
        const stage=q(".project-stage-wrap",story),copy=q(".project-copy",story),num=q(".project-number",story);
        if(stage)gsap.from(stage,{clipPath:i%2?"inset(0 0 0 22%)":"inset(0 22% 0 0)",duration:1.1,ease:"power3.out",
          scrollTrigger:{trigger:story,start:"top 78%",once:true}});
        if(copy)gsap.from(copy,{y:72,opacity:0,duration:.9,ease:"power3.out",
          scrollTrigger:{trigger:story,start:"top 72%",once:true}});
        if(num)gsap.to(num,{yPercent:-20,ease:"none",scrollTrigger:{trigger:story,start:"top bottom",end:"bottom top",scrub:1}});
      });

      gsap.to(".hero-plan",{xPercent:2,yPercent:-2,ease:"none",
        scrollTrigger:{trigger:".hero-scene",start:"top top",end:"bottom top",scrub:1}});
      gsap.to(".studio-material-card",{y:-34,rotation:-1.2,ease:"none",
        scrollTrigger:{trigger:".studio-scene",start:"top bottom",end:"bottom top",scrub:1}});
      setTimeout(()=>ST.refresh(),120);
    }catch(_){}
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();

/* TERRANE Frontend V2.1 — signature instrumentation */
(() => {
  if (window.__TERRANE_FRONTEND_V21__) return;
  window.__TERRANE_FRONTEND_V21__ = true;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const fine=matchMedia("(pointer:fine)").matches;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  function addSectionCuts(root=document){
    [
      ".practice-scene",".work-scene",".expertise-scene",".control-scene",
      ".approach-scene",".studio-scene",".commission-scene",
      ".case-intro",".case-gallery",".case-material",".case-next"
    ].forEach(sel=>qa(sel,root).forEach(el=>el.classList.add("tv2-cut")));
  }

  function heroCoordinate(root=document){
    const hero=q(".hero-frame",root);
    if(!hero||q(".tv2-hero-coordinate",hero))return;
    const el=document.createElement("div");
    el.className="tv2-hero-coordinate";
    el.setAttribute("aria-hidden","true");
    el.innerHTML="<strong>Ground / light</strong><span>41.31°N / 69.24°E<br>Climate / proportion / use<br>Archive 01—05</span>";
    hero.appendChild(el);
  }

  function projectDossiers(root=document){
    qa(".project-story",root).forEach((story,i)=>{
      const stage=q(".project-stage",story);
      if(!stage||stage.dataset.tv21)return;
      stage.dataset.tv21="1";

      const frame=document.createElement("div");
      frame.className="tv2-stage-frame";
      frame.setAttribute("aria-hidden","true");
      frame.innerHTML="<i></i><i></i><i></i><i></i>";
      stage.appendChild(frame);

      const dossier=document.createElement("div");
      dossier.className="tv2-project-dossier";
      dossier.setAttribute("aria-hidden","true");
      const idx=String(i+1).padStart(2,"0");
      dossier.innerHTML=
        '<div class="tv2-project-dossier__head"><span>Study</span><span class="tv2-project-dossier__index">'+idx+'</span></div>'+
        '<div class="tv2-project-dossier__rule"></div>'+
        '<div class="tv2-project-dossier__meta"><span>Layer</span><b>Spatial</b><span>Read</span><b>Material</b><span>Mode</span><b>Live</b></div>';
      stage.appendChild(dossier);

      const cross=document.createElement("div");
      cross.className="tv2-crosshair";
      cross.setAttribute("aria-hidden","true");
      cross.innerHTML="<span>50 / 50</span>";
      stage.appendChild(cross);

      if(fine){
        stage.addEventListener("pointermove",e=>{
          const r=stage.getBoundingClientRect();
          const x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));
          const y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));
          cross.style.setProperty("--x",x.toFixed(1)+"%");
          cross.style.setProperty("--y",y.toFixed(1)+"%");
          const read=q("span",cross);
          if(read)read.textContent=Math.round(x)+" / "+Math.round(y);
        },{passive:true});
      }

      const imgs=qa(".project-image",stage);
      const mo=new MutationObserver(ms=>{
        ms.forEach(m=>{
          if(m.type!=="attributes"||m.attributeName!=="class")return;
          const img=m.target;
          if(img.classList.contains("is-active")){
            img.classList.remove("tv2-enter");
            void img.offsetWidth;
            img.classList.add("tv2-enter");
          }
        });
      });
      imgs.forEach(img=>mo.observe(img,{attributes:true,attributeFilter:["class"]}));
    });
  }

  function materialStrip(root=document){
    const studio=q(".studio-scene",root);
    const inner=studio?.querySelector(".mx-auto");
    if(!inner||q(".tv2-material-strip",inner))return;
    const el=document.createElement("div");
    el.className="tv2-material-strip";
    el.setAttribute("aria-label","Material language");
    const names=["Earth","Lime","Timber","Brick"];
    el.innerHTML=names.map((name,i)=>
      '<div class="tv2-material-strip__item"><span class="tv2-material-strip__index">0'+(i+1)+'</span><span class="tv2-material-strip__name">'+name+'</span></div>'
    ).join("");
    inner.appendChild(el);
  }

  function caseInstrumentation(root=document){
    const hero=q(".case-hero",root);
    if(hero&&!q(".tv2-case-index",hero)){
      const el=document.createElement("div");
      el.className="tv2-case-index";
      el.setAttribute("aria-hidden","true");
      el.textContent="TERRANE / CASE STUDY";
      hero.appendChild(el);
    }
  }

  function motion(root=document){
    if(reduce||!window.gsap||!window.ScrollTrigger)return;
    try{
      const gsap=window.gsap;
      qa(".tv2-project-dossier",root).forEach(el=>{
        if(el.dataset.tv21Motion)return;el.dataset.tv21Motion="1";
        gsap.from(el,{x:22,opacity:0,duration:.65,ease:"power3.out",
          scrollTrigger:{trigger:el.closest(".project-story"),start:"top 70%",once:true}});
      });
      qa(".tv2-material-strip__item",root).forEach((el,i)=>{
        if(el.dataset.tv21Motion)return;el.dataset.tv21Motion="1";
        gsap.from(el,{y:24,opacity:0,duration:.55,delay:i*.03,ease:"power3.out",
          scrollTrigger:{trigger:el.parentElement,start:"top 86%",once:true}});
      });
      setTimeout(()=>window.ScrollTrigger.refresh(),80);
    }catch(_){}
  }

  function decorate(root=document){
    addSectionCuts(root);
    heroCoordinate(root);
    projectDossiers(root);
    materialStrip(root);
    caseInstrumentation(root);
    motion(root);
  }

  const start=()=>{
    decorate(document);
    const caseRoot=document.getElementById("terrane-case-root");
    if(caseRoot){
      let timer=0;
      new MutationObserver(()=>{
        clearTimeout(timer);
        timer=setTimeout(()=>decorate(caseRoot),40);
      }).observe(caseRoot,{childList:true,subtree:true});
    }
  };

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();