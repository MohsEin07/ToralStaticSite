function ManageHeader() {
    var header = document.getElementById("header");
    var pageHeight = window.innerHeight;
    var sticky = header.offsetTop;
    var siteLogo = document.getElementById("logo");
    var logoSize;
    
    if (window.pageYOffset > sticky) {
        header.classList.add("is-sticky");
        header.style.top = "0";
        if (window.innerWidth > 480) {
            siteLogo.style.width = "200px";
        }
        else {
            siteLogo.style.width = "150px";
        }
        
    } else {
        header.classList.remove("is-sticky");
        header.style.top = "0";
        
        if (window.innerWidth > 480) {
            siteLogo.style.width = "250px";
        }
        else {
            siteLogo.style.width = "150px";
        }
        //if (window.innerWidth > 920)
        //    siteLogo.style.width = "200px";
        //else if (window.innerWidth > 640)
        //    siteLogo.style.width = "200px";
        //else
        //    siteLogo.style.width = "200px";
    }
}



function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("activate");
        } else {
            reveals[i].classList.remove("activate");
        }
    }
}
function loaded() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("activate");
        } else {
            reveals[i].classList.remove("activate");
        }
    }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", loaded);