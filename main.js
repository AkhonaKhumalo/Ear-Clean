(function(){
'use strict';
document.documentElement.classList.add('js');
var WA='27810894183';
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
setTimeout(function(){var l=$('#loader');if(l){l.classList.add('done')}},reduce?0:800);
var header=$('#header'),top=$('#totop');
function onScroll(){var y=window.scrollY;header.classList.toggle('scrolled',y>10);top.hidden=y<600}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
top.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
var burger=$('#burger'),nav=$('#nav');
burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){burger.click();burger.focus()}});
var greet={en:'Welcome.',xh:'Wamkelekile.',zu:'Siyakwamukela.',ss:'Wamukelekile.'},sel=$('#lang');
try{var saved=localStorage.getItem('ec-lang');if(saved&&greet[saved]){sel.value=saved;$('#greeting').textContent=greet[saved]}}catch(e){}
sel.addEventListener('change',function(){$('#greeting').textContent=greet[sel.value];try{localStorage.setItem('ec-lang',sel.value)}catch(e){}});
var items=$$('.reveal');
if(reduce||!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('revealed')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=e.target.getAttribute('data-delay');if(d)e.target.style.transitionDelay=d+'ms';e.target.classList.add('revealed');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
items.forEach(function(el){io.observe(el)})}
var v=$('.hero video');
if(v){v.addEventListener('playing',function(){v.classList.add('ready')});v.addEventListener('error',function(){v.remove()});var src=v.querySelector('source');if(src)src.addEventListener('error',function(){v.remove()});v.play&&v.play().catch(function(){});if(reduce){v.pause()}}
$$('.faq-q').forEach(function(b){b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!open);document.getElementById(b.getAttribute('aria-controls')).hidden=open})});
var slides=$$('.slide');
if(slides.length){var i=0,show=function(n){slides[i].classList.remove('active');i=(n+slides.length)%slides.length;slides[i].classList.add('active')};
$('#next').addEventListener('click',function(){show(i+1)});$('#prev').addEventListener('click',function(){show(i-1)});
if(!reduce)setInterval(function(){if(!$('#slider').matches(':hover,:focus-within'))show(i+1)},7000)}
var form=$('#booking');
if(form){
var when=$('#when',form);var n=new Date();n.setMinutes(n.getMinutes()-n.getTimezoneOffset());when.min=n.toISOString().slice(0,16);
var rules={name:function(v){return v.trim().length<2?'Enter your full name.':''},
cell:function(v){return /^(\+27|0)[0-9\s-]{8,12}$/.test(v.trim())?'':'Enter a valid South African number, for example 082 123 4567.'},
email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Enter a valid email address, for example name@example.com.'},
reason:function(v){return v.trim().length<5?'Tell us briefly what your concern is.':''},
when:function(v){return !v?'Choose a preferred date and time.':(new Date(v)<new Date()?'Choose a time in the future.':'')},
consent:function(v,el){return el.checked?'':'Please tick the box to give your consent.'}};
var check=function(id){var el=document.getElementById(id),m=rules[id](el.value,el);document.getElementById('e-'+id).textContent=m;el.setAttribute('aria-invalid',m?'true':'false');return !m};
Object.keys(rules).forEach(function(id){document.getElementById(id).addEventListener('blur',function(){check(id)})});
form.addEventListener('submit',function(e){e.preventDefault();var bad=Object.keys(rules).filter(function(id){return !check(id)});
if(bad.length){document.getElementById(bad[0]).focus();return}
var val=function(id){return document.getElementById(id).value.trim()};
var msg='Hi Ear Clean, I would like to book a R200 consultation.\nName: '+val('name')+'\nCell: '+val('cell')+'\nEmail: '+val('email')+'\nLanguage: '+val('language')+'\nPlatform: '+val('platform')+'\nPreferred time: '+val('when').replace('T',' ')+'\nReason: '+val('reason');
var url='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
var sw=$('#wa-send');if(sw)sw.href=url;
form.hidden=true;var s=$('#success');s.hidden=false;s.focus();s.scrollIntoView({behavior:reduce?'auto':'smooth'});
window.open(url,'_blank','noopener');
});
}
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
})();
