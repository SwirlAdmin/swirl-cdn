// Initialize Swiper
// if (typeof Swiper != 'undefined') {
var swiper = new Swiper('.swiper', {
    slidesPerView: 5,
    // loop: true,
    direction: 'horizontal',
    spaceBetween: 15,
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    // autoplay: {
    // delay: 5000,
    // disableOnInteraction: true,
    // },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 5,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

// for stuff that scrolls left on hover
jQuery(".scroll_on_hover").mouseover(function () {
    jQuery(this).removeClass("ellipsis");
    var maxscroll = jQuery(this).width();
    var speed = maxscroll * 15;
    jQuery(this).animate({
        scrollLeft: maxscroll
    }, speed, "linear");
});

jQuery(".scroll_on_hover").mouseout(function () {
    jQuery(this).stop();
    jQuery(this).addClass("ellipsis");
    jQuery(this).animate({
        scrollLeft: 0
    }, 'slow');
});

jQuery('.SP-video-prev').click(function () {
    var currentVideo = jQuery('.SP-video-modal video source').attr('src');
    var cIndex = videosAll.indexOf(currentVideo);

    if (typeof videosAll[(cIndex - 1)] != 'undefined') {
        jQuery('.SP-video-modal video').get(0).pause();
        jQuery('.SP-video-modal video source').attr('src', videosAll[(cIndex - 1)]);
        jQuery('.SP-video-modal video').get(0).load();
        videoPlayNow();
    }
});

jQuery('.SP-video-next').click(function () {
    var currentVideo = jQuery('.SP-video-modal video source').attr('src');
    var cIndex = videosAll.indexOf(currentVideo);

    if (typeof videosAll[(cIndex + 1)] != 'undefined') {
        jQuery('.SP-video-modal video').get(0).pause();
        jQuery('.SP-video-modal video source').attr('src', videosAll[(cIndex + 1)]);
        jQuery('.SP-video-modal video').get(0).load();
        videoPlayNow();
    }
});

function videoPlayNow() {
    var playPromise = jQuery('.SP-video-modal video').get(0).play();
    if (playPromise !== undefined) {
        playPromise.then(_ => { })
            .catch(error => { });
    }
}

function setModalHeight() {
    jQuery('.SP-video-modal').height(window.innerHeight);
}

jQuery(document).ready(function () {
    setModalHeight();

    // jQuery('.SSV-play-modal-mute-unmute').click();
    jQuery('.SP-videos-all').eq(0).find('.SP-video-container').click();
});

jQuery(window).resize(function () {
    setModalHeight();
});

jQuery('.SSV-play-modal-mute-unmute').click(function () {
    if (jQuery('.SP-video-modal video').prop('muted')) {
        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
        jQuery('.SP-video-modal video').prop('muted', false);

        globalMute = false;
    } else {
        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
        jQuery('.SP-video-modal video').prop('muted', true);

        globalMute = true;
    }
});

function updateSSVModalInfos(player) {
    // hide opens
    jQuery('.SSV-video-product-open').hide();
    jQuery('.SSV-video-popup-product').hide();
    jQuery('.SSV-video-popup-product-multi').hide();
    jQuery('.SSV-video-popup-product-list-multi').hide();

    jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
    jQuery('.SSV-video-popup-product-list-multi').removeClass('SSV-video-popup-product-list-multi-cover');

    // multi detail show/hide
    jQuery('.SSV-video-popup-product-list-multi-product-detail').hide();
    jQuery('.SSV-video-popup-product-list-multi-append').show();

    // video URL
    let video = jQuery(player).children('source').attr('src');

    // Product if attached
    let vid = jQuery(`.SP-videos-all[data-video="${video}"]`).data('videoid');
    let products = productsAll[vid];
    if (Object.keys(products).length > 0) {
        if (Object.keys(products).length === 1) {
            let product = products[0];
            // add product info bottom
            product['desription'] = product['desription'].trim();
            jQuery('.SSV-video-popup-product p').html(product['title']);
            jQuery('.SSV-video-popup-product label').html(product['currencysymbols'] + ' ' + product['price']);
            jQuery('.SSV-video-popup-product img').attr('src', product['image']);

            setTimeout(() => {
                jQuery('.SSV-video-popup-product').show();
            }, 100);

            // product detail and add to cart and buynow
            jQuery('.SSV-video-product-open p').html(product['title']);
            if (product['desription']) {
                let description = product['desription'].length > 200 ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + product['desription'].substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + product['desription'] + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>' : product['desription'];
                jQuery('.SSV-video-product-open section').html(description);
                jQuery('.SSV-video-product-open section').show();
                jQuery('.SSV-video-product-open span').show();
            } else {
                jQuery('.SSV-video-product-open section').hide();
                jQuery('.SSV-video-product-open span').hide();
            }
            jQuery('.SSV-video-product-open label').html(product['currencysymbols'] + ' ' + product['price']);
            jQuery('.SSV-video-product-open img').attr('src', product['image']);
            jQuery('.SSV-video-product-open .SSV-pm-buy-now').attr('href', product['url']);
        } else {
            jQuery('.SSV-video-popup-product-multi img').attr('src', products[0]['image']);
            jQuery('.SSV-video-popup-product-multi .counter').html(products.length);

            let appendProds = '';
            products.forEach(product => {
                appendProds += `
<div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">
    <img src="${product['image']}" alt="Product Image" height="" width="">
    <div>
        <p data-pid="${product['product_id']}" data-desc="${product['desription'].replace('"', '').replace(' <', '').replace('>', '')}">${product['title']}</p>
        <label data-link="${product['url']}">${product['currencysymbols'] + ' ' + product['price']}</label>
    </div>
</div>
`;
            });
            jQuery('.SSV-video-popup-product-list-multi-append').html(appendProds);

            setTimeout(() => {
                jQuery('.SSV-video-popup-product-multi').show();
            }, 100);
        }
    }

    updateNavButtons();
}

function openMultiProductDetail(prodElem) {
    jQuery('.SSV-video-popup-product-list-multi-product-detail p').html(jQuery(prodElem).find('p').html());
    let desc = jQuery(prodElem).find('p').attr('data-desc')
    if (desc) {
        let description = desc.length > 200 ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + desc.substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + desc + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>' : desc;
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').html(description);
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').show();
        jQuery('.SSV-video-popup-product-list-multi-product-detail span').show();
    } else {
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').hide();
        jQuery('.SSV-video-popup-product-list-multi-product-detail span').hide();
    }
    jQuery('.SSV-video-popup-product-list-multi-product-detail label').html(jQuery(prodElem).find('label').html());
    jQuery('.SSV-video-popup-product-list-multi-product-detail img').attr('src', jQuery(prodElem).find('img').attr('src'));
    jQuery('.SSV-video-popup-product-list-multi-product-detail .SSV-pmm-buy-now').attr('href', jQuery(prodElem).find('label').attr('data-link'));

    jQuery('.SSV-video-popup-product-list-multi-append').hide();
    jQuery('.SSV-video-popup-product-list-multi-product-detail').show();
}

// Product detail open
jQuery('.SSV-video-popup-product').click(function () {
    jQuery('.SSV-video-product-open').show();
    setTimeout(() => {
        jQuery('.SSV-video-product-open').addClass('SSV-video-product-open-cover');
    }, 100);
});

jQuery('.SSV-video-product-open b').click(function () {
    jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
    setTimeout(() => {
        jQuery('.SSV-video-product-open').hide();
    }, 500);
});

// Product multiple open
jQuery('.SSV-video-popup-product-multi').click(function () {
    jQuery('.SSV-video-popup-product-list-multi').show();
    setTimeout(() => {
        jQuery('.SSV-video-popup-product-list-multi').addClass('SSV-video-popup-product-list-multi-cover');
    }, 100);
});

jQuery('.SSV-video-popup-product-list-multi-title b').click(function () {
    jQuery('.SSV-video-popup-product-list-multi').removeClass('SSV-video-popup-product-list-multi-cover');
    setTimeout(() => {
        jQuery('.SSV-video-popup-product-list-multi').hide();
    }, 500);
});

// Product multiple back
jQuery('.SSV-video-popup-product-list-multi-title label').click(function () {
    if (jQuery('.SSV-video-popup-product-list-multi-product-detail').is(":visible")) {
        jQuery('.SSV-video-popup-product-list-multi-product-detail').hide();
        jQuery('.SSV-video-popup-product-list-multi-append').show();
    } else if (jQuery('.SSV-video-popup-product-list-multi-append').is(":visible")) {
        jQuery('.SSV-video-popup-product-list-multi-title b').click();
    }
});

jQuery('.SP-video-modal video').on('play', function () {
    jQuery('.SP-video-play-pause').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
});

jQuery('.SP-video-modal video').on('pause', function () {
    jQuery('.SP-video-play-pause').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
    jQuery('.SP-video-play-pause').show();
});

jQuery(document).on('click', '.SSV-P-see-more', function () {
    jQuery(this).parent().next().show();
    jQuery(this).parent().hide();
});

jQuery(document).on('click', '.SSV-P-see-less', function () {
    jQuery(this).parent().prev().show();
    jQuery(this).parent().hide();
});

jQuery('.SP-video-play-pause').click(function () {
    let video = jQuery('.SP-video-modal video').get(0);

    if (video.paused) {
        videoPlayNow();
    } else {
        video.pause();
    }
});

function updateNavButtons() {
    var currentVideo = jQuery('.SP-video-modal video source').attr('src');
    var cIndex = videosAll.indexOf(currentVideo);

    if (typeof videosAll[(cIndex + 1)] != 'undefined') {
        jQuery('.SP-video-next').show();
    } else {
        jQuery('.SP-video-next').hide();
    }

    if (typeof videosAll[(cIndex - 1)] != 'undefined') {
        jQuery('.SP-video-prev').show();
    } else {
        jQuery('.SP-video-prev').hide();
    }
}

jQuery(document).keydown(function (event) {
    if (jQuery('.SP-video-modal').is(":visible")) {
        if (event.keyCode == 37) {
            jQuery('.SP-video-modal .SP-video-prev').click(); //on left arrow
        } else if (event.keyCode == 39) {
            jQuery('.SP-video-modal .SP-video-next').click(); //on right arrow
        } else if (event.key === 'Escape') {
            jQuery('.SP-video-modal-close').click();
        }
    }
});