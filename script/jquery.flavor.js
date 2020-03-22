(function ($) {

    // Modal template
    var htmlModal = '' +
        '<div class="flavor-overlay" id="flavorOverlay"></div>' +
        '<div class="flavor-lightbox" id="flavorLightbox">' + '<div id="Box">' +
        '<div class="flavor-lightbox__close" id="flavorLightboxClose">&times;</div>' + '<div class="textBox">' + '<span id="flavorLightboxTittleS"></span>' +
        '<p class="workText" id="flavorLightboxTittle"></p>' + '</div>' +
        '<img class="flavor-lightbox__image" id="flavorLightboxImage" src="" alt="">' +
        '<h1 class="flavor-lightbox__caption" id="flavorLightboxCaption"></h1>' +
        '<p class="text" id="flavorLightboxText"></p>'
    '<div class="flavor-lightbox__thumbnails"></div>' +
    '</div>' + '</div>';

    //only executed once
    var insertModal = (function () {
        var executed = false;
        return function () {
            if (!executed) {
                executed = true;
                $('body').prepend(htmlModal);
                $('body').on('click', '#flavorLightboxImage', $.fn.flavor.next);
            }
        };
    })();

    var lightboxIsOpened = false;

    $.fn.flavor = function () {

        //insert once the modal's html in the document
        insertModal();

        //precaching images
        new Image().src = $(this).find('[data-flavor-src]').data('flavor-src');

        //add click handeler
        $(this).find('[data-flavor-src]').click(function (e) {
            //get the gallery name
            var gallery = $(e.target).closest('[data-flavor]').data('flavor');
            //save the gallery name in data-attribute
            $('#flavorLightbox').data('gallery', gallery);

            // update image src
            var src = $(this).data('flavor-src');
            $('#flavorLightboxImage').attr('src', src);

            // update image caption
            var caption = $(this).find('img').attr('alt');
            $('#flavorLightboxCaption').html(caption);


            var tittle = $(this).find('.workText').text();
            console.log(tittle);
            $('#flavorLightboxTittle').text(tittle);



            var tittleSpan = $(this).find('span').text();
            console.log(tittleSpan);
            $('#flavorLightboxTittleS').text(tittleSpan);




            var text = $(this).find('.text').text();
            console.log(text);
            $('#flavorLightboxText').text(text);

            //show modal
            $('#flavorLightbox, #flavorOverlay').fadeIn();
            lightboxIsOpened = true;
        });

        return this;
    };



    // close lightbox
    $.fn.flavor.close = function () {
        $('#flavorLightbox, #flavorOverlay').fadeOut();
        lightboxIsOpened = false;
    };

    $.fn.flavor.move = function (direction) {
        //retrive gallery
        //var gallery       = $('#flavorLightbox').data('gallery');
        var $gallery = $('[data-flavor="' + $('#flavorLightbox').data('gallery') + '"]');
        var $galleryItems = $gallery.find('[data-flavor-src]');
        //var currentSrc    = $('#flavorLightboxImage').attr('src');
        var $currentItem = $gallery.find('[data-flavor-src="' + $('#flavorLightboxImage').attr('src') + '"]');
        var $newItem;

        if (direction === 'next') { //next
            $newItem = $currentItem.next();
            // go to first element if next is empty
            if ($newItem.length === 0) {
                $newItem = $galleryItems.first();
            }
        } else { //prev
            $newItem = $currentItem.prev();
            // go to last element if next is empty
            if ($newItem.length === 0) {
                $newItem = $galleryItems.last();
            }
        }

        // update lightbox img src
        var newSrc = $newItem.data('flavor-src');
        $('#flavorLightboxImage').attr('src', newSrc);

        // update image caption
        var caption = $newItem.find('img').attr('alt');
        $('#flavorLightboxCaption').html(caption);

    };

    $.fn.flavor.next = function () {
        //        console.log('coucou');
        //        $.fn.flavor.move('next');
    };

    $.fn.flavor.prev = function () {
        //        $.fn.flavor.move('prev');
    };

    //modal interactions
    $(document).on('click', '#flavorLightboxClose, #flavorOverlay', $.fn.flavor.close);

    //keyboard interactions
    $(document).keyup(function (e) {

        if (lightboxIsOpened) {
            switch (e.keyCode) {
                case 27: // escape
                    $.fn.flavor.close();
                    break;
                case 39: // right arrow
                    $.fn.flavor.next();
                    break;
                case 37: // left arrow
                    $.fn.flavor.prev();
                    break;
            }
        }

    });

}(jQuery));
