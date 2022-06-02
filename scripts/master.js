'use strict';
// General Vars
let $ = function (e) {
    return document.querySelector(e);
},
    $_ = function (e) {
        return document.querySelectorAll(e);
    };

let typeItHandler;
// TypeIt Plugin
document.addEventListener("DOMContentLoaded", function () {
    typeItHandler = new TypeIt("#element", {
        strings: ["&lt;/ Creative Front-End Developer &gt;"],
    });
});

// Journey
function startJourney() {

    // Activate TypeIt
    typeItHandler.go();

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
    let lettersSec1 = [...$_('.changed-section .sec-1 h1 span')];
    let lettersSec2 = [...$_('.changed-section .sec-2 h2 span')];
    let lettersSec3 = [...$_('.changed-section .sec-3 h2 span')];
    let lettersSec4 = [...$_('.changed-section .sec-4 h2 span')];
    let lettersSec5 = [...$_('.changed-section .sec-5 h2 span')];
    let lettersSec2Finished = false;
    let lettersSec3Finished = false;
    let lettersSec4Finished = false;
    let lettersSec5Finished = false;

    function animatedLetters(letters) {
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
    };
    animatedLetters(lettersSec1);

    // Animated progrss bar
    function animateProgress() {
        let bars = [...$_('.skills .progress .progress-bar')];
        for (let bar of bars) {
            bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        };
    };

    // Animated Letters
    function animatedHoveredLetters(animatedElements) {
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
    };
    animatedHoveredLetters(lettersSec1);
    animatedHoveredLetters(lettersSec2);
    animatedHoveredLetters(lettersSec3);
    animatedHoveredLetters(lettersSec4);
    animatedHoveredLetters(lettersSec5);

    window.setInterval(function () {
        $('.changed-section .actived-sec .animated-heading span').dispatchEvent(new Event('mouseenter'));
    }, 3000)


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
            };
            if (li.dataset.slide == '2' && lettersSec2Finished == false) {
                window.setTimeout(() => {
                    animatedLetters(lettersSec2);
                    animateProgress();
                    lettersSec2Finished = true;
                }, 500)
            } else if (li.dataset.slide == '3' && lettersSec3Finished == false) {
                window.setTimeout(() => {
                    animatedLetters(lettersSec3);
                    animateProgress();
                    lettersSec3Finished = true;
                }, 500)
            } else if (li.dataset.slide == '4' && lettersSec3Finished == false) {
                window.setTimeout(() => {
                    animatedLetters(lettersSec4);
                    animateProgress();
                    lettersSec4Finished = true;
                }, 500)
            } else if (li.dataset.slide == '5' && lettersSec3Finished == false) {
                window.setTimeout(() => {
                    animatedLetters(lettersSec5);
                    animateProgress();
                    lettersSec5Finished = true;
                }, 500)
            };
        })
        // Delete active from dots while hovering
        li.addEventListener('mouseenter', function () {
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
    let paginRightFinished = true;
    let paginLeftFinished = true;

    function paginRight() {
        paginRightFinished = false;
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
        activatedDot = $('.fixed-section .tr-dots .active');
        window.setTimeout(() => {
            paginRightFinished = true;
        }, 1000);
        if ($('.tr-dots li[data-slide="2"]').classList.contains('active') && lettersSec2Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec2);
                animateProgress();
                lettersSec2Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="3"]').classList.contains('active') && lettersSec3Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec3);
                animateProgress();
                lettersSec3Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="4"]').classList.contains('active') && lettersSec4Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec4);
                animateProgress();
                lettersSec4Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="5"]').classList.contains('active') && lettersSec5Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec5);
                animateProgress();
                lettersSec5Finished = true;
            }, 500)
        };
    }

    function paginLeft() {
        paginLeftFinished = false;
        if (parseInt(secNum) > 1) {
            for (let sec of sections) {
                sec.classList.remove('actived-sec');
            }
            $('.sec-' + (parseInt(secNum) - 1)).classList.add('actived-sec');
            secNum = parseInt(secNum) - 1
            trActivate(parseInt(secNum));
        };
        activatedDot = $('.fixed-section .tr-dots .active');
        window.setTimeout(() => {
            paginLeftFinished = true;
        }, 1000);
        if ($('.tr-dots li[data-slide="2"]').classList.contains('active') && lettersSec2Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec2);
                animateProgress();
                lettersSec2Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="3"]').classList.contains('active') && lettersSec3Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec3);
                animateProgress();
                lettersSec3Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="4"]').classList.contains('active') && lettersSec4Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec4);
                animateProgress();
                lettersSec4Finished = true;
            }, 500)
        } else if ($('.tr-dots li[data-slide="5"]').classList.contains('active') && lettersSec5Finished == false) {
            window.setTimeout(() => {
                animatedLetters(lettersSec5);
                animateProgress();
                lettersSec5Finished = true;
            }, 500)
        };
    };
        $('.pagin .right').onclick = function () {
            if (paginRightFinished == true) {
                paginRight();
            } else {
                console.log('not finished');
            };
        };
    $('.pagin .left').onclick = function () {
        if (paginLeftFinished == true) {
            paginLeft();
        } else {
            console.log('not finished');
        }
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
            if (paginLeftFinished == true) {
                paginLeft();
                hoverIt($('.fixed-section .pagin .left'))
            };
        } else if (e.key == 'ArrowDown' || e.code == 'ArrowDown') {
            if (paginRightFinished == true) {
                paginRight();
                hoverIt($('.fixed-section .pagin .right'))
            };
        }
    });


    // Hammer.js
    var myElement = $('.master .changed-section');
    var mc = new Hammer(myElement);
    mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
    });
    mc.on("pandown", function (ev) {
        if (paginLeftFinished == true) {
            paginLeft();
            hoverIt($('.fixed-section .pagin .left'))
        };
    });
    mc.on("panup", function (ev) {
        if (paginRightFinished == true) {
            paginRight();
            hoverIt($('.fixed-section .pagin .right'))
        };
    });
}

// Start Journey
$('.sound-notify .btn').addEventListener('click', function () {
    this.parentElement.parentElement.classList.add('hide');
    window.setTimeout(function () {
        $('.sound-notify').style.display = 'none';
    }, 502)
    startJourney();
    $('.master .fixed-section .sound-icon').click();
});