// General Vars
let $ = function (e) {
        return document.querySelector(e);
    },
    $_ = function (e) {
        return document.querySelectorAll(e);
    };

// Sound Utility
let played = false;
$('.master .fixed-section .sound-icon').onclick = function () {
    this.classList.toggle('stopped');
    if (played) {
        $('#sound').pause();
        this.children[0].src = 'images/icons/sound.png';
        played = false;
    } else {
        $('#sound').play();
        this.children[0].src = 'images/icons/sound.gif';
        played = true;
    }
};

// Animated Letters On Reload
let letters = [...$_('.changed-section .sec-1 h1 span')];
let i = 0;
let lettersInterval = setInterval(() => {
    if (i < letters.length) {
        if (letters[i].classList.contains('special')) {
            letters[i].classList.add('animate__jackInTheBox');
        } else {
            letters[i].classList.add('animate__bounceIn');
        }
        i++;
    } else {
        clearInterval(lettersInterval);
        for (let letter of letters) {
            letter.classList.remove('animate__bounceIn');
            letter.classList.remove('animate__jackInTheBox');
            letter.style.opacity = 1;
        }
    }
}, 100);

// TR Dots Utility
let secNum = 1;
let trDots = $_('.master .fixed-section .tr-dots li');
let activatedDot = $('.fixed-section .tr-dots .active');
trDots.forEach(function (li) {
    let siblings = [...li.parentElement.children];
    li.addEventListener('click', function () {
        let sections = [...$_('.changed-section .sec')];
        let currentSec = sections.filter(sec => sec.classList.contains('sec-' + li.dataset.slide));
        for (let sib of siblings) {
            sib.classList.remove('active')
        }
        li.classList.add('active');
        for (let sec of sections) {
            sec.classList.remove('actived-sec');
        }
        currentSec[0].classList.add('actived-sec');
        activatedDot = $('.fixed-section .tr-dots .active');
        secNum = li.dataset.slide;
        if (parseInt(secNum) == 1) {
            $('.pagin .left').classList.add('disabled');
        } else {
            $('.pagin .left').classList.remove('disabled');
        }
    })
    // Delete active from dots while hovering
    li.addEventListener('mouseenter', function () {
        console.log(activatedDot);
        for (let sib of siblings) {
            sib.classList.remove('active');
        };
    });
    li.addEventListener('mouseleave', function () {
        activatedDot.classList.add('active');
    });
});

// Pagination Utility
function trActivate(slideNum) {
    let trDots = [...$_('.master .fixed-section .tr-dots li')];
    for (let tr of trDots) {
        if (tr.dataset.slide == slideNum) {
            tr.classList.add('active');
        } else {
            tr.classList.remove('active');
        }
    }
}
let sections = [...$_('.sec')];
$('.pagin .right').onclick = function () {
    for (let sec of sections) {
        sec.classList.remove('actived-sec');
    }
    if (parseInt(secNum) < 5) {
        $('.sec-' + (parseInt(secNum) + 1)).classList.add('actived-sec');
        secNum = parseInt(secNum) + 1;
        $('.pagin .left').classList.remove('disabled');
        trActivate(parseInt(secNum));
    } else {
        $('.sec-1').classList.add('actived-sec');
        secNum = 1;
        $('.pagin .left').classList.add('disabled');
        trActivate(parseInt(secNum));
    }
};
$('.pagin .left').onclick = function () {
    if (parseInt(secNum) > 1) {
        this.classList.remove('disabled');
        for (let sec of sections) {
            sec.classList.remove('actived-sec');
        }
        $('.sec-' + (parseInt(secNum) - 1)).classList.add('actived-sec');
        secNum = parseInt(secNum) - 1
        if (parseInt(secNum) == 1) {
            this.classList.add('disabled');
        }
        trActivate(parseInt(secNum));
    };
};

// Animated Letters
let animatedElements = [...$_('.sec-1 h1 span')];

function stopAnimate() {
    for (let animE of animatedElements) {
        if (animE.classList.contains('animate__rubberBand')) {
            animE.classList.remove('animate__rubberBand');
        }
    };
}
setTimeout(stopAnimate, 1000);

function strLettersAnime(animE) {
    if (animE.classList.contains('animate__rubberBand')) {
        animE.classList.remove('animate__rubberBand');
        setTimeout(() => {
            animE.classList.add('animate__rubberBand');
        }, 10);
    } else {
        animE.classList.add('animate__rubberBand');
    }
}
for (let animE of animatedElements) {
    animE.addEventListener('mouseenter', function (e) {
        strLettersAnime(animE);
    });
};

// See All Projects Button
$('.see-all').addEventListener('click', function () {
    secNum = 3;
    // Active 3rd Section
    let sections = [...$_('.changed-section .sec')];
    for (let sec of sections) {
        sec.classList.remove('actived-sec');
    };
    $('.changed-section .sec:nth-child(3)').classList.add('actived-sec');
    // Active 3rd Dot
    trDots.forEach(tr => {
        tr.classList.remove('active');
    });
    $('.fixed-section .tr-dots li:nth-child(3)').classList.add('active');
});

// Pagination with mousewheel
let elementColor = $('.fixed-section .pagin span').style.color;
let elementTransform = $('.fixed-section .pagin span').style.transform;
function hoverIt(element) {
    element.style.color = 'var(--main-color)';
    element.style.transform = 'translateY(-2px)';
    window.setTimeout(() => {
        element.style.color = elementColor;
        element.style.transform = elementTransform;
    }, 400);
};
window.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
        $('.fixed-section .pagin .left').click();
        hoverIt($('.fixed-section .pagin .left'))
    } else if (e.deltaY > 0) {
        $('.fixed-section .pagin .right').click();
        hoverIt($('.fixed-section .pagin .right'))
    };
});

// Pagination with Buttons
document.addEventListener('keydown', function (e) {
    e = e || window.event;
    console.log(e.key);
    if (e.key == 'ArrowUp' || e.code == 'ArrowUp') {
        hoverIt($('.fixed-section .pagin .left'))
        $('.fixed-section .pagin .left').click();
    } else if (e.key == 'ArrowDown' || e.code == 'ArrowDown') {
        hoverIt($('.fixed-section .pagin .right'))
        $('.fixed-section .pagin .right').click();
    }
});


// Hammer.js
var myElement = $('.master .changed-section');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
// mc.on("panleft panright panup pandown tap press", function(ev) {
    //     //myElement.textContent = ev.type +" gesture detected.";
    //     console.log(ev.type +" gesture detected.")
    // });
    mc.on("panup", function(ev) {
        $('.fixed-section .pagin .left').click();
        hoverIt($('.fixed-section .pagin .left'))
    });
    mc.on("pandown", function(ev) {
        $('.fixed-section .pagin .right').click();
        hoverIt($('.fixed-section .pagin .right'))
});