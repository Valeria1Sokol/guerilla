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
              1000: {
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
