(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];

  const boot = qs('#boot');
  if (boot) {
    const finish = () => { boot.classList.add('done'); setTimeout(() => boot.remove(), 800); };
    if (reduce) finish(); else setTimeout(finish, 1150);
  }

  const progress = qs('#scrollProgress');
  const nav = qs('#siteNav');
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (nav) nav.classList.toggle('scrolled', scrollY > 32);
  };
  addEventListener('scroll', updateScroll, { passive: true }); updateScroll();

  const menuBtn = qs('#menuBtn'), mobileMenu = qs('#mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    qsa('a', mobileMenu).forEach(a => a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false'); mobileMenu.classList.remove('open'); document.body.classList.remove('menu-open');
    }));
  }

  if (!reduce && fine) {
    const cursor = qs('#cursor'), ring = qs('#cursorRing');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; if (cursor) cursor.style.transform = `translate(${mx}px,${my}px)`; });
    const animateRing = () => { rx += (mx-rx)*.16; ry += (my-ry)*.16; if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(animateRing); }; animateRing();
    qsa('a,button,[data-tilt]').forEach(el => {
      el.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
    });

    qsa('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; el.style.transform=`translate(${x*.12}px,${y*.12}px)`; });
      el.addEventListener('pointerleave', () => el.style.transform='');
    });

    qsa('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => { const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; card.style.setProperty('--rx', `${-y*2.4}deg`); card.style.setProperty('--ry', `${x*3}deg`); card.style.setProperty('--mx', `${(x+.5)*100}%`); card.style.setProperty('--my', `${(y+.5)*100}%`); });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg'); });
    });

    const hero = qs('.hero-v2'), spot = qs('#heroSpotlight');
    if (hero && spot) hero.addEventListener('pointermove', e => { const r=hero.getBoundingClientRect(); spot.style.setProperty('--x', `${e.clientX-r.left}px`); spot.style.setProperty('--y', `${e.clientY-r.top}px`); });
  }

  const reveals = qsa('.reveal-up');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } }), { threshold: .1, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((el,i) => { el.style.setProperty('--delay', `${Math.min(i%4,3)*70}ms`); io.observe(el); });
  } else reveals.forEach(el => el.classList.add('visible'));

  if (!reduce) {
    qsa('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count,10); if (!target || el.textContent.includes('+')) return;
      let started=false;
      const counterObs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting || started) return; started=true; const start=performance.now(), dur=800; const run=t=>{ const p=Math.min((t-start)/dur,1); el.textContent=Math.round(target*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(run); }; requestAnimationFrame(run); counterObs.disconnect(); }),{threshold:.6});
      counterObs.observe(el);
    });
  }

  const canvas = qs('#particleField');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d'); let particles=[], dpr=Math.min(devicePixelRatio||1,2), w=0,h=0;
    const resize=()=>{w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(65,Math.floor(w/22));particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.2+.3}));};
    const draw=()=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(176,255,73,.32)';particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});requestAnimationFrame(draw);};
    resize(); addEventListener('resize',resize,{passive:true}); draw();
  }
})();