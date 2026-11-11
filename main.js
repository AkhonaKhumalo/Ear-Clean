(function(){
'use strict';
// ===== EDIT THESE THREE SETTINGS =====
var CONFIG={
 whatsapp:'27000000000',   // your WhatsApp number, country code first, no + or spaces
 paymentUrl:'',            // PayFast / Yoco / Ozow payment link for R200 (leave blank to hide the Pay button)
 formEndpoint:''           // e.g. https://formspree.io/f/yourid (leave blank to send bookings via WhatsApp instead)
};
var waLink=function(t){return 'https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(t||'Hi Ear Clean, I would like to book a consultation.')};
(function(){var a=document.createElement('a');a.className='wa-float';a.href=waLink();a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','Chat with Ear Clean on WhatsApp');
a.innerHTML='<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor"><path d="M16 4a12 12 0 0 0-10.3 18L4 28l6.2-1.6A12 12 0 1 0 16 4zm0 2.2a9.8 9.8 0 1 1-5 18.2l-.4-.2-3.6.9 1-3.5-.2-.4A9.8 9.8 0 0 1 16 6.2zm-3.600 4.600c-.3 0-.7.1-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700.9 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800l-.6-.4-2.100-1c-.3-.1-.6-.2-.8.200l-1 1.200c-.2.200-.4.200-.7.100-.4-.2-1.500-.5-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.3 0-.5.200-.7l.5-.6c.2-.2.200-.4.300-.6.100-.2 0-.4 0-.6l-1-2.300c-.2-.6-.5-.5-.7-.5z"/></svg><span>Chat on WhatsApp</span>';
document.body.appendChild(a)})();
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
if(v){v.addEventListener('canplay',function(){var f=$('.hero .fallback');if(f)f.style.display='none'});if(reduce){v.pause()}}
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
var data={name:val('name'),cell:val('cell'),email:val('email'),language:val('language'),platform:val('platform'),reason:val('reason'),when:val('when'),consent:'yes'};
var msg='Hi Ear Clean, I would like to book a R200 consultation.\nName: '+data.name+'\nCell: '+data.cell+'\nEmail: '+data.email+'\nLanguage: '+data.language+'\nPlatform: '+data.platform+'\nPreferred time: '+data.when.replace('T',' ')+'\nReason: '+data.reason;
var btn=$('button[type=submit]',form),err=$('#form-error');err.textContent='';
var done=function(){form.hidden=true;var s=$('#success'),p=$('#pay');
if(CONFIG.paymentUrl){p.href=CONFIG.paymentUrl;p.hidden=false}
$('#wa-confirm').href=waLink(msg);s.hidden=false;s.focus();s.scrollIntoView({behavior:reduce?'auto':'smooth'})};
if(!CONFIG.formEndpoint){done();return}
btn.disabled=true;btn.textContent='Sending...';
fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
.then(function(r){if(!r.ok)throw new Error('bad');done()})
.catch(function(){err.textContent='We could not send your request. Please check your connection and try again, or tap the WhatsApp button to book instead.';btn.disabled=false;btn.textContent='Request my R200 consultation'});
});
}
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
})();
