// menu

function onclickMenu(){
    document.getElementById("menu").classList.toggle("icon");
    document.getElementById("nav").classList.toggle("change");
}
        


//scroling 

function smoothScroll(target,duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;


    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed,startPosition,distance,duration);
        window.scrollTo(0,run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    // https://gizma.com/

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    requestAnimationFrame(animation);


    // console.log(targetPosition);
}  

var section1 = document.querySelector('.active');

section1.addEventListener('click', function(){
    smoothScroll('.photos', 1000);
});
