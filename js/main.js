(function(){
  /* Set to false to remove the blur + "Coming Soon" popup below the hero */
  var COMING_SOON=true;
  /* ---- Hero slider ---- */
  var hero=document.getElementById('hero');
  var slides=[].slice.call(hero.querySelectorAll('.slide'));
  var dots=[].slice.call(hero.querySelectorAll('.dot'));
  var cur=0,timer=null,paused=false;
  function go(i){
    cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){
      var on=k===cur;s.classList.toggle('is-active',on);s.setAttribute('aria-hidden',on?'false':'true');
      s.querySelectorAll('a').forEach(function(a){a.tabIndex=on?0:-1;});
    });
    dots.forEach(function(d,k){d.classList.toggle('is-active',k===cur);d.setAttribute('aria-selected',k===cur);});
    hero.classList.toggle('on-dark',slides[cur].dataset.dark==='1');
  }
  function start(){stop();if(!paused)timer=setInterval(function(){go(cur+1);},6000);}
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  hero.querySelector('.prev').addEventListener('click',function(){go(cur-1);start();});
  hero.querySelector('.next').addEventListener('click',function(){go(cur+1);start();});
  dots.forEach(function(d,k){d.addEventListener('click',function(){go(k);start();});});
  hero.addEventListener('mouseenter',function(){paused=true;stop();});
  hero.addEventListener('mouseleave',function(){paused=false;start();});
  hero.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){go(cur-1);}if(e.key==='ArrowRight'){go(cur+1);}});
  var sx=null,sy=null;
  hero.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});
  hero.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){go(cur+(dx<0?1:-1));start();}sx=null;});
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)start();

  /* ---- Mega menu ---- */
  var sun=document.getElementById('sunLink'),mega=document.getElementById('mega'),hide=null;
  function openMega(){clearTimeout(hide);mega.classList.add('open');sun.classList.add('is-open');sun.setAttribute('aria-expanded','true');}
  function closeMega(){hide=setTimeout(function(){mega.classList.remove('open');sun.classList.remove('is-open');sun.setAttribute('aria-expanded','false');},140);}
  [sun,mega].forEach(function(el){el.addEventListener('mouseenter',openMega);el.addEventListener('mouseleave',closeMega);});
  sun.addEventListener('focus',openMega);
  sun.addEventListener('click',function(e){e.preventDefault();mega.classList.contains('open')?closeMega():openMega();});
  mega.addEventListener('focusout',function(e){if(!mega.contains(e.relatedTarget)&&e.relatedTarget!==sun)closeMega();});
  sun.addEventListener('blur',function(e){if(!mega.contains(e.relatedTarget))closeMega();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMega();closeDrawer();}});

  /* ---- Cards: wishlist + quick add ---- */
  var toast=document.getElementById('toast'),tt=null;
  function say(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show');},2200);}
  var wl=0,wlEl=document.getElementById('wlCount'),wlBtn=document.querySelector('.wl');
  var count=2,cart=document.querySelector('.cart'),countEl=document.querySelector('.count');
  document.querySelectorAll('.wish').forEach(function(b){
    b.addEventListener('click',function(e){
      e.preventDefault();var on=b.getAttribute('aria-pressed')!=='true';
      b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Remove from wishlist':'Add to wishlist');
      wl+=on?1:-1;wlEl.textContent=wl;wlEl.hidden=wl===0;wlBtn.classList.remove('bump');void wlBtn.offsetWidth;wlBtn.classList.add('bump');
      var n=b.closest('.card').dataset.name;say(on?'Saved to wishlist · '+n:'Removed from wishlist');
    });
  });
  document.querySelectorAll('.qadd').forEach(function(b){
    b.addEventListener('click',function(e){
      e.preventDefault();count++;countEl.textContent=count;cart.setAttribute('aria-label','Bag, '+count+' items');
      cart.classList.remove('bump');void cart.offsetWidth;cart.classList.add('bump');
      b.classList.add('added');b.textContent='✓';
      say('Added to bag · '+b.closest('.card').dataset.name);
      setTimeout(function(){b.classList.remove('added');b.textContent='+';},1600);
    });
  });

  /* ---- Signup ---- */
  document.getElementById('signup').addEventListener('submit',function(e){
    e.preventDefault();var v=document.getElementById('email').value.trim(),m=document.getElementById('signupMsg');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){m.textContent='Enter a valid email address, like name@example.com.';return;}
    m.textContent='Welcome to the Chic Club. Check '+v+' for your first letter from Paris.';e.target.reset();
  });

  /* ---- Mobile drawer ---- */
  var drawer=document.getElementById('drawer'),burger=document.getElementById('burger');
  function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');burger.setAttribute('aria-expanded','true');}
  function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');burger.setAttribute('aria-expanded','false');}
  burger.addEventListener('click',openDrawer);
  drawer.querySelectorAll('[data-close]').forEach(function(el){el.addEventListener('click',closeDrawer);});
  var ds=document.getElementById('drawerSun'),dsub=document.getElementById('drawerSub');
  ds.addEventListener('click',function(){var o=ds.getAttribute('aria-expanded')!=='true';ds.setAttribute('aria-expanded',o);dsub.hidden=!o;});



  /* ---- Coming soon overlay ---- */
  function placeSoon(){
    var s=document.getElementById('soon'),hero=document.getElementById('hero'),pg=document.getElementById('page');
    var on=document.body.classList.contains('soon-on');s.hidden=!on;
    document.querySelectorAll('#view-home > section:not(.hero), .signup, .footer').forEach(function(el){if(on)el.setAttribute('inert','');else el.removeAttribute('inert');});
    if(!on)return;
    var top=hero.offsetTop+hero.offsetHeight;s.style.top=top+'px';s.style.height=(pg.scrollHeight-top)+'px';
  }
  window.addEventListener('resize',placeSoon);window.addEventListener('load',placeSoon);
  document.getElementById('soonForm').addEventListener('submit',function(e){
    e.preventDefault();var v=document.getElementById('soon-email').value.trim(),m=document.getElementById('soonMsg');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){m.textContent='Enter a valid email, like name@example.com.';return;}
    m.textContent='Thank you. We\u2019ll write to '+v+' when we launch.';e.target.reset();
  });

  /* ---- Views (home / about / contact) ---- */
  var views={home:document.getElementById('view-home'),about:document.getElementById('view-about'),contact:document.getElementById('view-contact')};
  var navLinks=document.querySelectorAll('.nav-left a[data-route]');
  function route(){
    var h=location.hash.replace('#','')||'home';
    var v=views[h]?h:'home';
    var target=views[h]?null:document.getElementById(h);
    Object.keys(views).forEach(function(k){views[k].hidden=k!==v;});
    document.body.dataset.view=v;
    document.body.classList.toggle('soon-on',v==='home'&&COMING_SOON);placeSoon();
    navLinks.forEach(function(a){var on=a.dataset.route===v;a.classList.toggle('current',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    closeMega();closeDrawer();
    if(target){requestAnimationFrame(function(){var y=target.getBoundingClientRect().top+scrollY-document.getElementById('header').offsetHeight;scrollTo({top:y,behavior:'smooth'});});}
    else scrollTo(0,0);
    document.title=v==='about'?'About · Paris Chic':v==='contact'?'Contact · Paris Chic':'Paris Chic Homepage';
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute('href');
    if(h.length>1&&h===location.hash){e.preventDefault();route();}
  });
  window.addEventListener('hashchange',route);
  route();

  /* ---- Contact form ---- */
  var cf=document.getElementById('cform'),cm=document.getElementById('cformMsg');
  cf.addEventListener('submit',function(e){
    e.preventDefault();var em=document.getElementById('c-email'),nm=document.getElementById('c-name').value.trim();
    var ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim());
    em.parentNode.classList.toggle('err',!ok);cm.classList.toggle('bad',!ok);
    if(!ok){cm.textContent='Add your email address so we can reply, for example name@example.com.';em.focus();return;}
    cm.textContent=(nm?'Thanks, '+nm+'. ':'Thanks. ')+'This preview doesn\u2019t send messages yet. For a quick answer, text +971 54 310 1985 or email support@parischic.ae.';
  });
  document.querySelectorAll('.copy').forEach(function(b){b.addEventListener('click',function(){
    var v=b.dataset.copy;function done(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy';},1500);}
    try{navigator.clipboard.writeText(v).then(done,function(){sel(b);});}catch(err){sel(b);}
  });});
  function sel(b){var r=document.createRange();r.selectNodeContents(b.parentNode.firstChild);var s=getSelection();s.removeAllRanges();s.addRange(r);}

  document.querySelectorAll('a[href="#"]').forEach(function(a){a.addEventListener('click',function(e){if(a!==sun)e.preventDefault();});});
})();
