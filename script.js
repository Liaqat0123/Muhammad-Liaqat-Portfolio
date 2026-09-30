  /* ---------- PAGE LOAD CURTAIN ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('curtain').classList.add('hide'), 350);
  });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* ---------- SIDEBAR ACTIVE LINK + SCROLLED STATE ---------- */
  const links = document.querySelectorAll('#sbnav a');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));
  const sidebarEl = document.getElementById('sidebar');
  function onScroll(){
    let idx = 0;
    const pos = window.scrollY + 120;
    sections.forEach((sec, i) => { if(sec && sec.offsetTop <= pos) idx = i; });
    links.forEach((l,i) => l.classList.toggle('active', i === idx));
    sidebarEl.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- HERO PARALLAX ---------- */
  const heroAvatar = document.getElementById('heroAvatar');
  const bgGrid = document.getElementById('bgGrid');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroAvatar.style.transform = `translateY(${y*0.08}px)`;
    bgGrid.style.transform = `translateY(${y*0.03}px)`;
  }, {passive:true});
  heroAvatar.addEventListener('mousemove', e => {
    const r = heroAvatar.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - 0.5;
    const py = (e.clientY - r.top)/r.height - 0.5;
    heroAvatar.style.transform += ` rotateY(${px*8}deg) rotateX(${-py*8}deg)`;
  });
  heroAvatar.addEventListener('mouseleave', () => { heroAvatar.style.transform = ''; });

  /* ---------- TYPING ANIMATION ---------- */
  const roles = ["Data Analyst", "Python Developer", "BI Analyst", "SQL & Power BI"];
  const typeEl = document.getElementById('typeText');
  let ri=0, ci=0, deleting=false;
  function typeLoop(){
    const word = roles[ri];
    if(!deleting){
      ci++;
      typeEl.textContent = word.slice(0, ci);
      if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1200); return; }
    } else {
      ci--;
      typeEl.textContent = word.slice(0, ci);
      if(ci === 0){ deleting = false; ri = (ri+1)%roles.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  typeLoop();

  /* ---------- MAGNETIC BUTTONS ---------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*0.25}px, ${y*0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---------- SKILLS MARQUEE CONTENT ---------- */
  const skillsA = ["Python","Pandas","NumPy","SQL","Power BI","DAX","Power Query","Excel","PivotTables","Matplotlib"];
  const skillsB = ["Seaborn","Git & GitHub","VS Code","Tkinter","BeautifulSoup","TextBlob","ReportLab","OpenPyXL","EDA","Data Cleaning"];
  function buildTrack(el, items, tag){
    const doubled = items.concat(items);
    el.innerHTML = doubled.map(s => `<div class="skill-card"><div class="k">${tag}</div><div class="v">${s}</div></div>`).join('');
  }
  buildTrack(document.getElementById('track1'), skillsA, 'SKILL');
  buildTrack(document.getElementById('track2'), skillsB, 'TOOL');

  /* ---------- PROJECTS CAROUSEL ---------- */
  const track = document.getElementById('carTrack');
  const slides = track.children;
  const dotsWrap = document.getElementById('carDots');
  let current = 0;
  for(let i=0;i<slides.length;i++){
    const d = document.createElement('button');
    d.className = 'car-dot' + (i===0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
  function goTo(i){
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    Array.from(dotsWrap.children).forEach((d,idx) => d.classList.toggle('active', idx===current));
  }
  document.getElementById('carPrev').addEventListener('click', () => goTo(current-1));
  document.getElementById('carNext').addEventListener('click', () => goTo(current+1));
  let autoplay = setInterval(() => goTo(current+1), 5000);
  document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoplay));
  document.querySelector('.carousel').addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current+1), 5000); });

  /* ---------- 3D TILT ON PROJECT CARDS ---------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `rotateY(${px*6}deg) rotateX(${-py*6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------- SCROLL REVEAL (generic) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in-view'); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- TIMELINE SEQUENTIAL REVEAL ---------- */
  const timelineItems = document.querySelectorAll('.t-item');
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        const idx = Array.from(timelineItems).indexOf(en.target);
        setTimeout(() => en.target.classList.add('in-view'), idx*180);
        timelineObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.25 });
  timelineItems.forEach(el => timelineObserver.observe(el));

  /* ---------- SKILL PROGRESS BARS ---------- */
  const bars = document.querySelectorAll('.progress-fill');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.style.width = en.target.dataset.width + '%';
        barObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------- NUMBER COUNTERS ---------- */
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        const el = en.target;
        const target = parseInt(el.dataset.target, 10);
        let cur = 0;
        const step = Math.max(1, Math.ceil(target/30));
        const iv = setInterval(() => {
          cur += step;
          if(cur >= target){ cur = target; clearInterval(iv); }
          el.textContent = cur + (cur === target ? '+' : '');
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
