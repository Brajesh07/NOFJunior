// var perloader = document.getElementById('loading');
//       setTimeout(function myfunction(){
//         perloader.style.display = 'none';
//       }, 6000);
  
//  




//document.getElementById('vid').play();
  
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

    tl.from(".visual-st", {delay: 1, scale: .0, transformOrigin: 'center'}, "-=.1")	
      .from(".file", {scale:0, transformOrigin:'left'})
  .from(".scale", {opacity:0})

tl2.to(".editor", {y: 10, repeat: -1, yoyo:true}, "=2")  

tl3.from(".main-content", {opacity:0, y: 40, stagger: .3}, "=2")


// right hamburger nav 

function openNav() {
  document.getElementById("mySidenav").style.width = "100vw";
  }
    
  function closeNav() {
     document.getElementById("mySidenav").style.width = "0";
    }


//about us leaders section 

$(document).ready(function() {
  $('#autoWidth').lightSlider({
      autoWidth:true,
      loop:true,
      onSliderLoad: function() {
          $('#autoWidth').removeClass('cS-hidden');
      } 
  });  
});

