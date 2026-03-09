gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches

if(!prefersReducedMotion){

gsap.from(".hero-title span",{

y:80,
opacity:0,
stagger:0.2,
duration:1,
ease:"power3.out"

})

gsap.from(".hero-subtitle",{

y:40,
opacity:0,
delay:0.5,
duration:1

})

gsap.utils.toArray(".chapter").forEach(section=>{

gsap.from(section.querySelector(".comic"),{

scrollTrigger:{

trigger:section,
start:"top 80%"

},

y:100,
opacity:0,
duration:1,
ease:"power2.out"

})

gsap.from(section.querySelectorAll(".panel"),{

scrollTrigger:{

trigger:section,
start:"top 80%"

},

opacity:0,
y:40,
stagger:0.15,
duration:0.8

})

})

}
