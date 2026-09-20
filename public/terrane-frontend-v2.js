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
      if(!stage||!fine||reduce)return;

      let touchedImage=null;
      const activeImage=()=>q(".project-image.is-active",stage);

      const reset=()=>{
        stage.style.setProperty("--tv2-rx","0deg");
        stage.style.setProperty("--tv2-ry","0deg");
        if(touchedImage)touchedImage.style.transform="";
        touchedImage=null;
      };

      stage.addEventListener("pointermove",e=>{
        const r=stage.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        stage.style.setProperty("--tv2-rx",(-y*2.4).toFixed(2)+"deg");
        stage.style.setProperty("--tv2-ry",(x*3.2).toFixed(2)+"deg");

        const image=activeImage();
        if(touchedImage&&touchedImage!==image)touchedImage.style.transform="";
        touchedImage=image;
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

/* TERRANE V3 FINAL — iPhone / VeroSpace interaction polish */
(() => {
  if (window.__TERRANE_V3_FINAL__) return;
  window.__TERRANE_V3_FINAL__ = true;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const fine=matchMedia("(pointer:fine)").matches;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  function liquidHeader(){
    const header=q(".site-header-inner");
    if(!header||header.dataset.tv3Ready)return;
    header.dataset.tv3Ready="1";
    header.classList.add("tv3-liquid");

    let tx=50,ty=18,cx=50,cy=18,raf=0;
    if(fine&&!reduce){
      const tick=()=>{
        cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;
        header.style.setProperty("--lg-x",cx.toFixed(2)+"%");
        header.style.setProperty("--lg-y",cy.toFixed(2)+"%");
        raf=requestAnimationFrame(tick);
      };
      const move=e=>{
        const r=header.getBoundingClientRect();
        tx=clamp(((e.clientX-r.left)/Math.max(1,r.width))*100,0,100);
        ty=clamp(((e.clientY-r.top)/Math.max(1,r.height))*100,0,100);
      };
      header.addEventListener("pointermove",move,{passive:true});
      raf=requestAnimationFrame(tick);
    }

    let press=0,target=0,velocity=0,last=performance.now(),praf=0;
    const animatePress=now=>{
      const dt=Math.min(.035,(now-last)/1000);last=now;
      const spring=120,damping=18;
      const a=(target-press)*spring-velocity*damping;
      velocity+=a*dt;press+=velocity*dt;
      press=clamp(press,0,1.08);
      header.style.setProperty("--lg-press",press.toFixed(3));
      header.classList.toggle("tv3-pressed",press>.08);
      if(Math.abs(target-press)>.003||Math.abs(velocity)>.01)praf=requestAnimationFrame(animatePress);
      else{praf=0;press=target;velocity=0}
    };
    const setPress=v=>{target=v;last=performance.now();if(!praf)praf=requestAnimationFrame(animatePress)};
    header.addEventListener("pointerdown",()=>setPress(1),{passive:true});
    addEventListener("pointerup",()=>setPress(0),{passive:true});
    addEventListener("pointercancel",()=>setPress(0),{passive:true});

    const darkSelectors=[".hero-scene",".expertise-scene",".commission-scene",".case-hero",".case-material","footer"];
    const updateTone=()=>{
      const r=header.getBoundingClientRect();
      const y=r.top+r.height*.56;
      let dark=false;
      for(const sel of darkSelectors){
        for(const el of qa(sel)){
          const b=el.getBoundingClientRect();
          if(b.top<=y&&b.bottom>=y){dark=true;break}
        }
        if(dark)break;
      }
      header.dataset.tv3Tone=dark?"dark":"light";
      header.dataset.tv3Scrolled=scrollY>96?"true":"false";
    };
    addEventListener("scroll",updateTone,{passive:true});
    addEventListener("resize",updateTone,{passive:true});
    updateTone();
  }

  function heroPolish(){
    const frame=q(".hero-frame");
    if(!frame)return;

    if(!q(".tv3-hero-island",frame)){
      const island=document.createElement("div");
      island.className="tv3-hero-island";
      island.setAttribute("aria-hidden","true");
      island.innerHTML='<i></i><span>Explore the work</span><span class="tv3-hero-island__bar"><span></span></span><b>01—08</b>';
      frame.appendChild(island);
    }

    let ticking=false;
    const progress=()=>{
      const r=frame.getBoundingClientRect();
      const total=Math.max(1,r.height-innerHeight*.35);
      const p=clamp((-r.top)/total,0,1);
      document.documentElement.style.setProperty("--tv3-hero-progress",(p*100).toFixed(1)+"%");
      ticking=false;
    };
    addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(progress)}},{passive:true});
    progress();

    if(fine&&!reduce){
      frame.addEventListener("pointermove",e=>{
        const r=frame.getBoundingClientRect();
        const x=clamp(((e.clientX-r.left)/r.width)*100,0,100);
        const y=clamp(((e.clientY-r.top)/r.height)*100,0,100);
        document.body.style.setProperty("--tv3-hero-x",x.toFixed(1)+"%");
        document.body.style.setProperty("--tv3-hero-y",y.toFixed(1)+"%");
      },{passive:true});
    }
  }

  function formGlow(){
    const form=q(".consultation-plane");
    if(!form||!fine||reduce)return;
    form.addEventListener("pointermove",e=>{
      const r=form.getBoundingClientRect();
      const x=clamp(((e.clientX-r.left)/r.width)*100,0,100);
      const y=clamp(((e.clientY-r.top)/r.height)*100,0,100);
      form.style.setProperty("--form-x",x.toFixed(1)+"%");
      form.style.setProperty("--form-y",y.toFixed(1)+"%");
    },{passive:true});
  }

  function tactile(){
    qa(".hero-primary-cta,.hero-secondary-cta,.project-arrow,.project-link,.consultation-submit,.site-header-inner button").forEach(el=>{
      el.classList.add("tv3-pressable");
    });
  }

  function cinematicScroll(){
    if(reduce||!window.gsap||!window.ScrollTrigger)return;
    try{
      const gsap=window.gsap,ST=window.ScrollTrigger;
      gsap.registerPlugin(ST);

      qa(".practice-scene,.work-scene,.expertise-scene,.control-scene,.approach-scene,.studio-scene,.commission-scene").forEach((scene,i)=>{
        if(scene.dataset.tv3SceneMotion)return;
        scene.dataset.tv3SceneMotion="1";
        const heading=q("h2",scene);
        if(heading){
          gsap.fromTo(heading,{y:30,opacity:.68},{y:0,opacity:1,ease:"none",
            scrollTrigger:{trigger:scene,start:"top 94%",end:"top 60%",scrub:.8}});
        }
      });

      qa(".project-stage").forEach((stage,i)=>{
        if(stage.dataset.tv3StageMotion)return;
        stage.dataset.tv3StageMotion="1";
        const image=q(".project-image.is-active",stage);
        if(image){
          gsap.to(image,{scale:1.075,yPercent:i%2?2.8:-2.8,ease:"none",
            scrollTrigger:{trigger:stage,start:"top bottom",end:"bottom top",scrub:1}});
        }
      });

      qa(".case-gallery-image").forEach((img,i)=>{
        if(img.dataset.tv3Motion)return;
        img.dataset.tv3Motion="1";
        gsap.to(img,{scale:1.045,yPercent:i%2?3:-3,ease:"none",
          scrollTrigger:{trigger:img,start:"top bottom",end:"bottom top",scrub:1}});
      });

      setTimeout(()=>ST.refresh(),120);
    }catch(_){}
  }

  function mobileMenuPolish(){
    const btn=q('.site-header button[aria-controls="index-menu"]');
    if(!btn)return;
    const body=document.body;
    new MutationObserver(()=>{
      const menu=q("#index-menu");
      body.classList.toggle("tv3-menu-open",!!menu);
    }).observe(body,{childList:true,subtree:true});
  }

  function caseObserve(){
    const root=document.getElementById("terrane-case-root");
    if(!root)return;
    let t=0;
    new MutationObserver(()=>{
      clearTimeout(t);
      t=setTimeout(()=>{
        tactile();
        cinematicScroll();
      },80);
    }).observe(root,{childList:true,subtree:true});
  }

  function start(){
    liquidHeader();
    heroPolish();
    formGlow();
    tactile();
    cinematicScroll();
    mobileMenuPolish();
    caseObserve();
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
