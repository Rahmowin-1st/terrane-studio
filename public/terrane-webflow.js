(() => {
  const API = "https://terrane-studio.vercel.app/api/consultation";
  const SOURCE = "https://terrane-studio.vercel.app";
  const q = (s, r=document) => r.querySelector(s);
  const qa = (s, r=document) => [...r.querySelectorAll(s)];
  const pad = n => String(n + 1).padStart(2, "0");

  function stitchMain(root=document) {
    if (root !== document || document.getElementById("main")) return;
    const a=document.getElementById("terrane-main-a"), b=document.getElementById("terrane-main-b");
    if(!a||!b)return;
    const main=document.createElement("main");
    main.id="main";
    a.parentNode.insertBefore(main,a);
    while(a.firstChild)main.appendChild(a.firstChild);
    while(b.firstChild)main.appendChild(b.firstChild);
    a.remove();
    b.remove();
  }

  function liquid(root=document) {
    const header = q(".liquid-glass", root);
    if (!header || header.dataset.vsLiquid) return;
    header.dataset.vsLiquid = "1";

    if (matchMedia("(pointer:fine)").matches) {
      let tx=48, ty=38, cx=48, cy=38, raf=0;
      const tick=()=>{ cx+=(tx-cx)*.13; cy+=(ty-cy)*.13; header.style.setProperty("--lg-x",cx+"%"); header.style.setProperty("--lg-y",cy+"%"); raf=requestAnimationFrame(tick); };
      header.addEventListener("pointermove",e=>{ const r=header.getBoundingClientRect(); tx=((e.clientX-r.left)/Math.max(r.width,1))*100; ty=((e.clientY-r.top)/Math.max(r.height,1))*100; });
      raf=requestAnimationFrame(tick);
    }

    const ua=navigator.userAgent;
    if (!/Chrome|Chromium|Edg|CriOS/i.test(ua) || /OPR|Opera|Firefox/i.test(ua) || innerWidth<720 || !matchMedia("(pointer:fine)").matches) return;
    if (document.getElementById("terrane-liquid-filter")) return;

    const NS="http://www.w3.org/2000/svg";
    const svg=document.createElementNS(NS,"svg");
    svg.setAttribute("aria-hidden","true");
    svg.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
    svg.innerHTML='<filter id="terrane-liquid-filter" x="-12%" y="-50%" width="124%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="7.5" result="blur"/><feColorMatrix in="blur" type="saturate" values="1.28" result="sat"/><feImage result="map" preserveAspectRatio="none"/><feDisplacementMap in="sat" in2="map" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>';
    document.body.appendChild(svg);
    document.documentElement.classList.add("lg-svg");
    const fe=svg.querySelector("feImage"), canvas=document.createElement("canvas"), ctx=canvas.getContext("2d");
    const paint=(w,h)=>{
      if(!ctx||!fe)return;
      const W=Math.max(12,Math.round(w)),H=Math.max(12,Math.round(h)); canvas.width=W; canvas.height=H;
      const img=ctx.createImageData(W,H),rx=W*.46,ry=H*.42;
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=(x-W/2)/rx,dy=(y-H/2)/ry,d=Math.sqrt(dx*dx+dy*dy),rim=Math.max(0,1-Math.abs(d-.82)/.34),i=(y*W+x)*4;img.data[i]=128+rim*86;img.data[i+1]=128+(1-rim)*36;img.data[i+2]=132;img.data[i+3]=255;}
      ctx.putImageData(img,0,0); fe.setAttribute("href",canvas.toDataURL());
    };
    const ro=new ResizeObserver(es=>{const {width,height}=es[0].contentRect;paint(width,height);}); ro.observe(header); paint(header.offsetWidth,header.offsetHeight);
  }

  function header(root=document) {
    const h=q(".site-header",root), glass=q(".site-header-inner",root);
    if(!h||h.dataset.vsHeader)return;
    h.dataset.vsHeader="1";
    let last=scrollY,ticking=false;
    const onScroll=()=>{ if(ticking)return; ticking=true; requestAnimationFrame(()=>{const y=scrollY; if(y<72)h.style.transform="translateY(0)"; else if(y>last+12)h.style.transform="translateY(-130%)"; else if(y<last-12)h.style.transform="translateY(0)"; if(glass)glass.dataset.tone=y<innerHeight*.68?"dark":"light"; last=y;ticking=false;});};
    addEventListener("scroll",onScroll,{passive:true}); onScroll();
  }

  function menu(root=document) {
    const btn=q(".site-header button[aria-controls='index-menu']",root);
    if(!btn||btn.dataset.vsMenu)return;
    btn.dataset.vsMenu="1";
    let open=false, aside=null, previousFocus=null;
    const close=()=>{
      if(!open)return;
      open=false;
      btn.textContent="Index";
      btn.setAttribute("aria-expanded","false");
      document.body.style.overflow="";
      aside?.remove();
      aside=null;
      if(previousFocus instanceof HTMLElement) previousFocus.focus();
    };
    const show=()=>{
      open=true;
      previousFocus=document.activeElement;
      btn.textContent="Close";
      btn.setAttribute("aria-expanded","true");
      document.body.style.overflow="hidden";
      aside=document.createElement("aside");
      aside.id="index-menu";
      aside.className="fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pt-28 text-bone sm:px-7 lg:hidden";
      aside.setAttribute("role","dialog");
      aside.setAttribute("aria-modal","true");
      aside.setAttribute("aria-label","TERRANE navigation");
      aside.innerHTML='<div class="mx-auto max-w-xl"><p class="text-[9px] font-semibold tracking-[0.2em] text-clay uppercase">Terrane / index</p><nav class="mt-7 flex flex-col" aria-label="Mobile">'+
        [["Work","/#work"],["Practice","/#trust"],["Approach","/#approach"],["Studio","/#studio"],["Commission","/#commission"]].map((x,i)=>'<a href="'+x[1]+'" class="flex items-end justify-between gap-4 border-b border-bone/14 py-5 font-display text-[2.7rem] leading-none font-light"><span><small class="mr-3 align-middle text-[10px] text-clay">0'+(i+1)+'</small>'+x[0]+'</span><span class="pb-1 text-xl text-bone/35">↗</span></a>').join("")+
        '</nav><div class="mt-10 flex items-center justify-between gap-5 border-t border-bone/14 pt-6"><p class="max-w-[14rem] text-xs leading-relaxed text-bone/52">Architecture of ground, light, and duration.</p><a href="/#commission" class="inline-flex min-h-12 items-center rounded-full bg-bone px-5 text-[9px] font-semibold tracking-[0.16em] text-ink uppercase">Start brief ↗</a></div></div>';
      aside.style.opacity="0";
      aside.style.clipPath="inset(0 0 100% 0)";
      document.body.appendChild(aside);
      requestAnimationFrame(()=>{
        aside.style.transition="opacity .45s ease,clip-path .52s cubic-bezier(.16,1,.3,1)";
        aside.style.opacity="1";
        aside.style.clipPath="inset(0 0 0 0)";
        q("a",aside)?.focus();
      });
      aside.addEventListener("click",e=>{if(e.target.closest("a"))close();});
      aside.addEventListener("keydown",e=>{
        if(e.key==="Escape"){e.preventDefault();close();return;}
        if(e.key!=="Tab")return;
        const focusable=qa('a,button,[tabindex]:not([tabindex="-1"])',aside).filter(el=>!el.hasAttribute("disabled"));
        if(!focusable.length)return;
        const first=focusable[0],last=focusable[focusable.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      });
    };
    btn.setAttribute("aria-expanded","false");
    btn.addEventListener("click",()=>open?close():show());
  }

  function galleries(root=document) {
    qa(".project-stage",root).forEach(stage=>{
      if(stage.dataset.vsGallery)return;stage.dataset.vsGallery="1";
      const imgs=qa(".project-image",stage), prev=qa(".project-arrow",stage)[0], next=qa(".project-arrow",stage)[1], counter=q(".project-counter",stage), label=q(".project-stage-index",stage);
      if(imgs.length<2)return;
      let i=Math.max(0,imgs.findIndex(x=>x.classList.contains("is-active"))),paused=false,inView=false,timer=0,start=null;
      const show=n=>{i=(n+imgs.length)%imgs.length;imgs.forEach((img,j)=>{img.classList.toggle("is-active",j===i);img.setAttribute("aria-hidden",j===i?"false":"true");});if(counter)counter.textContent=pad(i)+" / "+String(imgs.length).padStart(2,"0");if(label)label.textContent="Image "+pad(i);};
      prev?.addEventListener("click",()=>show(i-1));next?.addEventListener("click",()=>show(i+1));
      stage.tabIndex=stage.tabIndex<0?0:stage.tabIndex;stage.style.touchAction="pan-y";
      stage.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();show(i+1)}else if(e.key==="ArrowLeft"){e.preventDefault();show(i-1)}else if(e.key==="Home"){e.preventDefault();show(0)}else if(e.key==="End"){e.preventDefault();show(imgs.length-1)}});
      stage.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;start={x:e.clientX,y:e.clientY,t:performance.now()};paused=true;});
      stage.addEventListener("pointerup",e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y,dt=Math.max(1,performance.now()-start.t),v=dx/dt,threshold=Math.max(34,stage.clientWidth*.12);if(Math.abs(dx)>Math.abs(dy)*1.15&&(Math.abs(dx)>=threshold||Math.abs(v)>.45))show(i+(dx<0?1:-1));start=null;setTimeout(()=>paused=false,650);});
      stage.addEventListener("mouseenter",()=>paused=true);stage.addEventListener("mouseleave",()=>paused=false);stage.addEventListener("focusin",()=>paused=true);stage.addEventListener("focusout",e=>{if(!stage.contains(e.relatedTarget))paused=false});
      const io=new IntersectionObserver(es=>{inView=!!es[0]?.isIntersecting&&es[0].intersectionRatio>=.45;},{threshold:[0,.2,.45,.7]});io.observe(stage);
      if(!matchMedia("(prefers-reduced-motion: reduce)").matches) timer=setInterval(()=>{if(inView&&!paused)show(i+1)},5000);
      show(i);
    });
  }

  function statusOverlay(form,status) {
    const wrap=form.parentElement; if(!wrap)return;
    q(".consultation-status",wrap)?.remove();
    const overlay=document.createElement("div");overlay.className="consultation-status absolute inset-0 z-20 flex items-center justify-center rounded-[1.75rem] p-5";overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");
    const map={
      sending:["Recording brief","Holding the note.","The studio path is validating and storing your brief."],
      success:["Server confirmed","Received.","The server accepted and stored the brief. Notification delivery depends on the configured owner channel."],
      failed:["Not recorded","Not held yet.","Your words remain in the form. Return and try again."],
      offline:["Not recorded","Offline.","Reconnect and send again. Your entered text remains in place."]
    };
    const m=map[status];
    overlay.innerHTML='<div class="consultation-status-card w-full max-w-md border border-bone/18 bg-ink/94 px-7 py-10 text-center text-bone shadow-2xl backdrop-blur-xl sm:px-9"><p class="text-[9px] font-semibold tracking-[0.18em] text-clay uppercase">'+m[0]+'</p><p class="mt-4 font-display text-[2.6rem] leading-none font-light">'+m[1]+'</p><p class="mx-auto mt-5 max-w-xs text-sm leading-[1.65] text-bone/62">'+m[2]+'</p>'+(status==="sending"?'<div class="consultation-progress mx-auto mt-8 h-px w-36 overflow-hidden bg-bone/15"><span class="block h-full w-1/2 bg-clay"></span></div>':'<button type="button" class="mt-8 min-h-10 text-[10px] font-semibold tracking-[0.18em] uppercase underline decoration-bone/30 underline-offset-4">Return to brief</button>')+'</div>';
    wrap.appendChild(overlay);q("button",overlay)?.addEventListener("click",()=>overlay.remove());
    return overlay;
  }

  function consultation(root=document) {
    const form=q("form.consultation-plane",root); if(!form||form.dataset.vsForm)return; form.dataset.vsForm="1";
    let requestId="";
    form.addEventListener("submit",async e=>{
      e.preventDefault(); if(form.dataset.sending==="1")return;
      const fd=new FormData(form), data=Object.fromEntries(fd.entries()); if(data.website)return;
      qa(".form-error",form).forEach(x=>x.remove());qa("[aria-invalid='true']",form).forEach(x=>x.setAttribute("aria-invalid","false"));
      const errs={}; if(!String(data.name||"").trim())errs.name="Required"; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email||"")))errs.email="Valid email required"; if(!data.type)errs.type="Choose one"; if(!data.budget)errs.budget="Choose one"; if(!String(data.site||"").trim())errs.site="Required"; if(String(data.brief||"").trim().length<3)errs.brief="A few sentences are enough";
      for(const [name,msg] of Object.entries(errs)){const field=q('[name="'+name+'"]',form);field?.setAttribute("aria-invalid","true");const label=field?.closest(".form-field");if(label){const small=document.createElement("small");small.className="form-error";small.textContent=msg;label.appendChild(small);}}
      const first=Object.keys(errs)[0]; if(first){q('[name="'+first+'"]',form)?.focus();return;}
      requestId=requestId||(crypto.randomUUID?.()||((Date.now()+"-"+Math.random()).replace(".","")));
      form.dataset.sending="1";statusOverlay(form,"sending");
      const started=Date.now();
      try{
        const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),12000);
        const res=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json","X-Request-Id":requestId},body:JSON.stringify({name:data.name,email:data.email,type:data.type,budget:data.budget,site:data.site,brief:data.brief,requestId}),signal:ctrl.signal});
        clearTimeout(timer);const payload=await res.json().catch(()=>({}));const wait=Math.max(0,950-(Date.now()-started));if(wait)await new Promise(r=>setTimeout(r,wait));
        if(res.ok&&payload.ok){const layer=statusOverlay(form,"success");form.reset();requestId="";qa(".form-error",form).forEach(x=>x.remove());setTimeout(()=>layer?.remove(),3000);}else statusOverlay(form,"failed");
      }catch{statusOverlay(form,navigator.onLine?"failed":"offline");}
      finally{form.dataset.sending="0";}
    });
  }

  function homeMotion(root=document) {
    if(!window.gsap||!window.ScrollTrigger||q(".hero-scene",root)?.dataset.vsMotion)return;
    const hero=q(".hero-scene",root);if(!hero)return;hero.dataset.vsMotion="1";gsap.registerPlugin(ScrollTrigger);
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce)return;
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({defaults:{ease:"power3.out"}});
      tl.from(".hero-kicker",{y:18,opacity:0,duration:.6})
        .from(".hero-line > span",{yPercent:110,rotation:2,duration:.9,stagger:.09},"-=.38")
        .from(".hero-lead,.hero-actions,.hero-meta,.hero-footer-line",{y:22,opacity:0,duration:.7,stagger:.07},"-=.52");
      gsap.to(".hero-media",{scale:1.07,yPercent:4,ease:"none",scrollTrigger:{trigger:".hero-scene",start:"top top",end:"bottom top",scrub:1}});
      gsap.from(".practice-title,.practice-copy",{y:42,opacity:0,duration:.8,stagger:.12,scrollTrigger:{trigger:".practice-scene",start:"top 78%",once:true}});
      gsap.from(".practice-proof",{y:28,opacity:0,duration:.65,stagger:.08,scrollTrigger:{trigger:".practice-grid",start:"top 84%",once:true}});
      qa(".project-story").forEach((el,i)=>{gsap.from(el.querySelector(".project-stage-wrap"),{x:i%2?52:-52,opacity:0,duration:.85,scrollTrigger:{trigger:el,start:"top 80%",once:true}});gsap.from(el.querySelector(".project-copy"),{y:40,opacity:0,duration:.78,scrollTrigger:{trigger:el,start:"top 78%",once:true}});});
      gsap.from(".discipline-row",{y:28,opacity:0,duration:.65,stagger:.07,scrollTrigger:{trigger:".expertise-scene",start:"top 78%",once:true}});
      gsap.from(".control-step",{x:38,opacity:0,duration:.7,stagger:.08,scrollTrigger:{trigger:".control-scene",start:"top 78%",once:true}});
      gsap.from(".approach-step",{y:34,opacity:0,duration:.65,stagger:.08,scrollTrigger:{trigger:".approach-scene",start:"top 80%",once:true}});
      gsap.from(".studio-media",{clipPath:"inset(0 100% 0 0)",duration:1,ease:"power3.out",scrollTrigger:{trigger:".studio-scene",start:"top 80%",once:true}});
      gsap.from(".studio-copy",{x:42,opacity:0,duration:.8,scrollTrigger:{trigger:".studio-scene",start:"top 76%",once:true}});
      gsap.from(".commission-copy,.commission-form-wrap",{y:44,opacity:0,duration:.82,stagger:.12,scrollTrigger:{trigger:".commission-scene",start:"top 80%",once:true}});
      gsap.from(".footer-inner",{y:40,opacity:0,duration:.8,scrollTrigger:{trigger:"footer",start:"top 88%",once:true}});
    },root);
    setTimeout(()=>ScrollTrigger.refresh(),60);
  }

  function caseMotion(root=document) {
    if(!window.gsap||!window.ScrollTrigger)return;
    const hero=q(".case-hero",root);if(!hero||hero.dataset.vsMotion)return;hero.dataset.vsMotion="1";gsap.registerPlugin(ScrollTrigger);
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    gsap.context(()=>{
      const tl=gsap.timeline({defaults:{ease:"power3.out"}});
      tl.from(".case-kicker",{y:18,opacity:0,duration:.55}).from(".case-title",{y:48,opacity:0,duration:.85},"-=.28").from(".case-meta,.case-back",{y:18,opacity:0,duration:.6,stagger:.08},"-=.42");
      gsap.to(".case-cover",{scale:1.07,yPercent:4,ease:"none",scrollTrigger:{trigger:".case-hero",start:"top top",end:"bottom top",scrub:.9}});
      gsap.from(".case-brief",{x:-48,opacity:0,duration:.8,scrollTrigger:{trigger:".case-intro",start:"top 78%",once:true}});
      gsap.from(".case-response",{x:52,y:18,opacity:0,duration:.82,scrollTrigger:{trigger:".case-intro",start:"top 78%",once:true}});
      qa(".case-gallery-item").forEach((item,i)=>{const image=q(".case-gallery-image",item);gsap.fromTo(item,{clipPath:i%2?"inset(0 0 0 100%)":"inset(0 100% 0 0)"},{clipPath:"inset(0 0 0 0)",duration:.95,ease:"power3.out",scrollTrigger:{trigger:item,start:"top 83%",once:true}});if(image)gsap.to(image,{yPercent:i%2?4:-4,ease:"none",scrollTrigger:{trigger:item,start:"top bottom",end:"bottom top",scrub:1}});});
      gsap.from(".case-material > *",{y:34,opacity:0,duration:.7,stagger:.08,scrollTrigger:{trigger:".case-material",start:"top 80%",once:true}});
    },root);
    setTimeout(()=>ScrollTrigger.refresh(),60);
  }

  function boot(root=document){ stitchMain(root); header(root); liquid(root); menu(root); galleries(root); consultation(root); homeMotion(root); caseMotion(root); }

  async function caseLoader() {
    const root=document.getElementById("terrane-case-root"); if(!root||root.dataset.loaded)return;root.dataset.loaded="1";
    const allowed=["house-of-four-courts","qorasuv-reading-room","chorsu-apartment","sitora-garden","fergana-pavilion"];
    let slug=new URLSearchParams(location.search).get("slug")||allowed[0]; if(!allowed.includes(slug))slug=allowed[0];
    try{
      const res=await fetch(SOURCE+"/work/"+slug,{credentials:"omit"}); if(!res.ok)throw new Error("load");
      const html=await res.text(),doc=new DOMParser().parseFromString(html,"text/html");
      doc.querySelectorAll("script").forEach(x=>x.remove());
      doc.querySelectorAll("body > div[hidden]").forEach(x=>x.remove());
      doc.querySelectorAll('a[href^="/work/"]').forEach(a=>{const s=a.getAttribute("href").split("/").filter(Boolean).pop();a.setAttribute("href","/work?slug="+s);});
      doc.querySelectorAll('img[src="/logo.svg"]').forEach(i=>i.setAttribute("src",SOURCE+"/logo.svg"));
      root.innerHTML=doc.body.innerHTML;
      const title=doc.querySelector("title")?.textContent;if(title)document.title=title;
      const description=doc.querySelector('meta[name="description"]')?.getAttribute("content");
      if(description){
        let meta=document.querySelector('meta[name="description"]');
        if(!meta){meta=document.createElement("meta");meta.setAttribute("name","description");document.head.appendChild(meta);}
        meta.setAttribute("content",description);
      }
      const cover=doc.querySelector(".case-cover")?.getAttribute("src");
      [["og:title",title],["og:description",description],["og:image",cover]].forEach(([property,value])=>{
        if(!value)return;
        let meta=document.querySelector('meta[property="'+property+'"]');
        if(!meta){meta=document.createElement("meta");meta.setAttribute("property",property);document.head.appendChild(meta);}
        meta.setAttribute("content",value);
      });
      boot(root);
    }catch{
      root.innerHTML='<main class="min-h-dvh bg-bone px-6 py-32 text-ink"><div class="mx-auto max-w-3xl"><p class="text-[10px] uppercase tracking-[.2em] text-umber">Terrane / case study</p><h1 class="mt-5 font-display text-5xl font-light">Case study unavailable.</h1><p class="mt-5 text-ink/65">Open the production study directly.</p><a class="mt-8 inline-flex underline" href="'+SOURCE+'/work/'+slug+'">Open study ↗</a></div></main>';
    }
  }

  const start=()=>{boot(document);caseLoader();};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();