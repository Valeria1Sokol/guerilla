  $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
          //          items: 3,
          loop: true,
          nav: true,
          center: true,
          touchDrag: true,
          responsiveClass: true,
          responsive: {

              0: {
                  items: 1
              },
              1025: {
                  items: 3
              }
          },
          onInitialized: function (e) {
              $('.counter-out').text('1 / ' + this.items().length)
          }
      });

      $(".owl-carousel").on('changed.owl.carousel', function (e) {
          $('.counter-out').text(++e.page.index + ' / ' + e.page.count);
      });
  });
 $(".glitch-img").mgGlitch({

            // set 'true' to stop the plugin
            destroy: false,
            // set 'false' to stop glitching
            glitch: true,
            // set 'false' to stop scaling
            scale: true,

            // set 'false' to stop glitch blending
            blend: true,

            // select blend mode type
            blendModeType: 'hue',

            // set min time for glitch 1 elem
            glitch1TimeMin: 600,
            // set max time for glitch 1 elem

            glitch1TimeMax: 900,
            // set min time for glitch 2 elem

            glitch2TimeMin: 100,
            // set max time for glitch 2 elem

            glitch2TimeMax: 60,
            zIndexStart: 5

        }, 2000);
