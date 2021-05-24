
//
var perloader = document.getElementById('loading');
      setTimeout(function myfunction(){
        perloader.style.display = 'none';
      }, 6000);
  
//    
document.getElementById('vid').play();
  
//
 AOS.init({
  offset: 100,
  duration: 1000,
  easing: 'ease',
 });


// timeline animation of section

var tl = gsap.timeline({default:{duration: 2.7, ease: Back.easeOut.config(2), opacity:0}})
var tl2 = gsap.timeline({default:{duration: 1.5, delay:1}})
var tl3 = gsap.timeline({default:{duration: 1}})

    tl.from(".visual-st", {delay: 1, scale: .0, transformOrigin: 'center'}, "=6.1")	
      .from(".file", {scale:0, transformOrigin:'left'})
  .from(".scale", {opacity:0})

tl2.to(".editor", {y: 10, repeat: -1, yoyo:true}, "=6.1")  

tl3.from(".main-content", {opacity:0, y: 40, stagger: .3}, "=6.1")


// right hamburger nav 

function openNav() {
  document.getElementById("mySidenav").style.width = "100vw";
  }
    
  function closeNav() {
     document.getElementById("mySidenav").style.width = "0";
    }

/* about us image animation */

//Movement Animation to happen
const circle = document.querySelector(".circle");
const container = document.querySelector(".hover-area");
//Items
//const title = document.querySelector(".title");

const photo = document.querySelector(".photo img");
const photos = document.querySelector(".photos img");

//Moving Animation Event
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  circle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate In
container.addEventListener("mouseenter", (e) => {
  circle.style.transition = "none";
  //Popout
  photo.style.transform = "translateZ(200px) rotateZ(-10deg)";
  photos.style.transform = "translateZ(200px) rotateZ(10deg)";
  
});
//Animate Out
container.addEventListener("mouseleave", (e) => {
  circle.style.transition = "all 0.5s ease";
  circle.style.transform = `rotateY(0deg) rotateX(0deg)`;
  //Popback
  photo.style.transform = "translateZ(0px) rotateZ(0deg)";
  photos.style.transform = "translateZ(0px) rotateZ(0deg)";    
});
