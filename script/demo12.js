$(".menu-collapsed").click(function () {
    $(this).toggleClass("menu-expanded");
});
(function () {
    var triggerBttn = document.getElementById('trigger-overlay'),
        navBar = document.getElementById('nav'),
        overBox = document.getElementById('all'),
        closeNavBox = document.getElementById('navSpan'),
        overlay = document.querySelector('div.overlay'),
        closeBttn = overlay.querySelector('button.overlay-close');
    transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };
    s = Snap(overlay.querySelector('svg')),
        path = s.select('path'),
        steps = overlay.getAttribute('data-steps').split(';'),
        stepsTotal = steps.length;

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            var pos = stepsTotal - 1;
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');

            var onEndTransitionFn = function (ev) {
                    classie.remove(overlay, 'close');
                },
                nextStep = function (pos) {
                    pos--;
                    if (pos < 0) return;
                    path.animate({
                        'path': steps[pos]
                    }, 60, mina.linear, function () {
                        if (pos === 0) {
                            onEndTransitionFn();
                        }
                        nextStep(pos);
                    });
                };

            nextStep(pos);
            navBar.style.backgroundColor = 'black';
            navBar.style.background = 'linear-gradient(90deg, #FAE74C 6.7%, black 6.7%)';
            overBox.style.visibility = 'hidden';
            document.body.style.overflow = 'scroll';
            $(".menu-collapsed").removeClass("menu-expanded");
        } else if (!classie.has(overlay, 'close')) {
            var pos = 0;
            classie.add(overlay, 'open');

            var nextStep = function (pos) {
                pos++;
                if (pos > stepsTotal - 1) return;
                path.animate({
                    'path': steps[pos]
                }, 60, mina.linear, function () {
                    nextStep(pos);
                });
            };

            nextStep(pos);
            navBar.style.backgroundColor = 'white';
            navBar.style.background = 'linear-gradient(90deg, white 6.7%, black 6.7%)';
            overBox.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
})();


