//v12 - New design with new swiping up-down + Multiple Product + No Product + Multiple Page + PDP PIP (v10 Upgrade) [Reels] feature

// Global Defines
// let ssv_mode = 'Live'; // Test, Live
// let ssv_globalMute = true;
// let ssv_pip = false;
// let ssv_brandCustomizations = [];
// let ssv_store = '';
// let ssv_storeType = '0';
// let ssv_storeCode = '';
// let ssv_storePlaylist = '';
// let ssv_baseURL = ssv_mode === 'Live' ? 'https://apigoswirl.com/short_video/v10/magento/style.min.css' : '';
// let ssv_responseData = [];
// let ssv_productIds = [];
// let ssv_apiURL = 'https://api.goswirl.live/index.php/ShortVideo/videolistingV4'; // bigleap.live  ,  api.goswirl.live
// let ssv_pdpapiURL = 'https://api.goswirl.live/index.php/ShortVideo/getmultiple_productvideo'; // bigleap.live  ,  api.goswirl.live
// let ssv_pdppip = false;
// let ssv_pdppipHideOnscreen = false;
// let ssv_swiper = [];
// let ssv_swiper_modal = [];
// let ssv_videoPlayCounter = 0;
// let ssv_userData = null;
// let ssv_fsdb = [];
// let ssv_gumletConfig = {
//     property_id: 'jYfkUIVL', // required:  please replace with correct property id.
// };

// ssv_responseData = JSON.parse(localStorage.getItem('_ssv_storeResponseData'));
// ssv_brandCustomizations = ssv_responseData.swilrs.data;

// Initialize Swiper M    
// ssv_swiper_modal = new Swiper(".swiper-ssv-m", {
//     slidesPerView: 1,
//     direction: "vertical",
//     clickable: true,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     breakpoints: {
//         768: {
//             direction: "horizontal",
//             slidesPerView: 1,
//         },
//     },
//     on: {
//         init: function () {
//             // Open PIP if found
//             if (ssv_pip && !ssv_pdppip) {
//                 ssv_globalMute = true;
//                 playpipssv();
//             }

//             if (ssv_pdppip && ssv_brandCustomizations.pdppip == 1) {
//                 ssv_globalMute = true;
//                 playpipssv(videos[0].video_url, videos[0].cover_image);
//             }
//             // Open Modal if shared link found                
//             const urlSearchParams = new URLSearchParams(window.location.search);
//             const params = Object.fromEntries(urlSearchParams.entries());
//             if (typeof params['ssv'] != 'undefined') {
//                 let videoId = window.atob(params['ssv']);
//                 setTimeout(() => {
//                     jQuery(`.ms-${videoId}`).click();
//                 }, 1000);
//             }

//             // Cart Values
//             if (ssv_storeType == '1') {
//                 updateShopifyCartssv();
//             }

//             // Update preview thumbs
//             if (ssv_brandCustomizations.next_previous_preview == '1') {
//                 updatePreviewThumbsssv(`.swiper-ssv-m`);
//             }
//         },
//     }
// });

function getHandle(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle ? handle.split('#')[0] : '';
    handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

    return handle;
}

function updatePreviewThumbsssv(swpr) {
    jQuery(swpr + ' .swiper-slide').each(function () {
        jQuery(this).prepend(jQuery(this).prev().length ? '<img src="' + jQuery(this).prev().find('video').attr('poster') + '" class="video-modal-np-img-ssv p-img-ssv" onclick="jQuery(`.video-modal-ssv:visible`).find(`.swiper-button-prev`).click();">' : '');
        jQuery(this).prepend(jQuery(this).next().length ? '<img src="' + jQuery(this).next().find('video').attr('poster') + '" class="video-modal-np-img-ssv n-img-ssv" onclick="jQuery(`.video-modal-ssv:visible`).find(`.swiper-button-next`).click();">' : '');
    })
}

function loaderssv(swtch) {
    if (swtch) {
        jQuery('.modal-loader-ssv').css('display', 'flex');
    } else {
        jQuery('.modal-loader-ssv').css('display', 'none');
    }
}

function playssv(slideno) {
    // set current slide
    ssv_swiper_modal.slideTo(slideno);

    // Close PIP
    closepipssv();

    // get video player
    let videoPlayer = jQuery('.swiper-ssv-m .swiper-slide').eq(slideno).find('video')[0];

    // Open loader
    videoloaderssv(true);
    // videoPlayer.load();
    videoPlayer.onloadstart = playWithPromisessv(videoPlayer);

    // open modal
    loaderssv(true);
    setTimeout(() => {
        jQuery('.video-modal-ssv').show();
        loaderssv(false);
    }, 500);

    // Scroll disable
    disableScrollssv();
}

function playWithPromisessv(player) {
    ssv_videoPlayCounter++; // counter ++

    // Pause all other videos
    pauseAllssv();

    // reset all popups
    closeAllpopupsssv();

    // remove swipe up gif
    if (ssv_videoPlayCounter > 2 && parseInt(getCookie('ssv_user')) <= 1) {
        jQuery('.video-modal-swipe-up-ssv').remove();
    }

    // Player to reset seconds
    player.currentTime = 0;

    // true if iOS    
    ssv_globalMute = getMobileOperatingSystemssv() == 'iOS' ? true : ssv_globalMute;

    // Mute/Unmute
    jQuery(player).prop('muted', ssv_globalMute);
    let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-mute-fill.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-up-fill.svg';
    jQuery(player).parent('.video-modal-video-container-ssv').find('.video-modal-volume-ssv img').attr('src', src);
    jQuery(player).parent('.video-modal-video-container-ssv').find('.video-modal-volume-ssv p').html(ssv_globalMute ? 'Mute' : 'Unmute');
    // Popup height
    setPopupHightssv();

    // Play selected video now    
    var playPromise = player.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {
        });
    }

    // set PIP value
    if (ssv_brandCustomizations.pip_mode === '1') {
        localStorage.setItem('_ssv_pip', jQuery(player).find('source').attr('src') ? btoa(jQuery(player).find('source').attr('src')) : '');
        localStorage.setItem('_ssv_pip_t', jQuery(player).attr('poster') ? btoa(jQuery(player).attr('poster')) : '');
    }
}

function pauseAllssv() {
    jQuery('.swiper-ssv-m .swiper-slide video').each(function () {
        jQuery(this)[0].pause();
    });

    jQuery('.swiper-ssv-c .swiper-slide video').each(function () {
        jQuery(this)[0].pause();
    });
}

function volumessv(btn) {
    if (jQuery(btn).closest('.video-modal-video-container-ssv').find('video').prop('muted')) {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-up-fill.svg');
        jQuery(btn).children('p').html('Unmute');
        jQuery(btn).closest('.video-modal-video-container-ssv').find('video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-mute-fill.svg');
        jQuery(btn).children('p').html('Mute');
        jQuery(btn).closest('.video-modal-video-container-ssv').find('video').prop('muted', true);

        ssv_globalMute = true;
    }
}

function closessv() {
    // Pause all other videos
    pauseAllssv();

    // Hide modal
    jQuery('.video-modal-ssv').hide();

    // PIP release
    localStorage.setItem('_ssv_pip', '');
    localStorage.setItem('_ssv_pip_t', '');

    // Scroll enable
    enableScrollssv();
}

function changeQtyssv(action, btn) {
    if (action == 'minus') {
        jQuery(btn).next().val(parseInt(jQuery(btn).next().val()) > 1 ? (parseInt(jQuery(btn).next().val()) - 1) : 1);
    } else if (action == 'plus') {
        jQuery(btn).prev().val((parseInt(jQuery(btn).prev().val()) + 1));
    }
}

function openProductssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(0%)');

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = false;
        ssv_swiper_modal.allowSlidePrev = false;
        ssv_swiper_modal.allowTouchMove = false;
    }
}

function closeProductssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function openListProductssv(btn, i) {
    if (jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv').is(":visible")) {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').eq((i - 1)).css('transform', 'translateY(0%)');
        setTimeout(() => {
            jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(0%)');
        }, 500);
    } else {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').eq((i - 1)).css('transform', 'translateX(0%)');
    }

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = false;
        ssv_swiper_modal.allowSlidePrev = false;
        ssv_swiper_modal.allowTouchMove = false;
    }
}

function closeListProductssv(btn) {
    if (jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv').is(":visible")) {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');
        setTimeout(() => {
            jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').css('transform', 'translateX(110%)');
        }, 500);
    } else {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').css('transform', 'translateX(110%)');
    }

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function nextPrevTilessv(btn, act) {
    jQuery(btn).attr('disabled', 'disabled');
    let elm = jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv');
    let scrollW = (elm[0].scrollWidth / jQuery(elm).find('.video-modal-product-tile-ssv').length) + 2;

    if (act == 'next') {
        jQuery(elm).animate({ scrollLeft: (scrollW + elm[0].scrollLeft) }, 500);
    } else {
        jQuery(elm).animate({ scrollLeft: (elm[0].scrollLeft - scrollW) }, 500);
    }

    setTimeout(() => {
        if ((elm[0].scrollWidth - jQuery(elm).find('.video-modal-product-tile-ssv').width()) - (elm[0].scrollLeft) > 100) jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-next-ssv').show();
        else jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-next-ssv').hide();
        if (elm[0].scrollLeft) jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-prev-ssv').show();
        else jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-prev-ssv').hide();

        jQuery(btn).removeAttr('disabled');
    }, 500);
}

function nextPrevTileIconssv(btn) {
    let elm = jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv');

    if ((elm[0].scrollWidth - jQuery(elm).find('.video-modal-product-tile-ssv').width()) - (elm[0].scrollLeft) > 100) jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-next-ssv').show();
    else jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-next-ssv').hide();
    if (elm[0].scrollLeft) jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-prev-ssv').show();
    else jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv .video-modal-product-tile-prev-ssv').hide();
}

function setPopupHightssv() {
    jQuery('.video-modal-ssv').height(window.innerHeight);
    jQuery('.video-modal-ssv').width(window.innerWidth);

    // Modal navigation adjust
    // setTimeout(() => {
    //     let videoWidth = jQuery('.swiper-ssv-m .swiper-slide-active .video-modal-video-container-ssv').width() + 80;
    //     jQuery('.swiper-ssv-m .swiper-button-prev').css('left', `calc(50% - ${(videoWidth + 36)}px)`);
    //     jQuery('.swiper-ssv-m .swiper-button-next').css('left', `calc(50% + ${videoWidth}px)`);
    // }, 600);
}

function videoloaderssv(swtch) {
    if (swtch) {
        jQuery('.video-modal-video-loader-ssv').css('display', 'flex');
    } else {
        jQuery('.video-modal-video-loader-ssv').css('display', 'none');
    }
}

function showControlsssv(player) {
    if (window.innerWidth > 768) {
        jQuery(player).closest('.video-modal-video-container-ssv').find('.video-modal-video-controls-ssv').css('display', 'flex');
    }
}

function hideControlsssv(player) {
    if (window.innerWidth > 768) {
        jQuery(player).fadeOut();
    }
}

function showPhoneControlsssv(player) {
    if (window.innerWidth <= 768) {
        jQuery(player).closest('.video-modal-video-container-ssv').find('.video-modal-video-controls-ssv').css('display', 'flex').delay(3000).fadeOut();
    }
}

function hidePhoneControlsssv(player, event) {
    if (window.innerWidth <= 768) {
        if (jQuery(player).closest('.video-modal-video-container-ssv').find('.video-modal-video-controls-ssv').is(":visible") && event.target.classList.contains('video-modal-video-controls-ssv')) {
            jQuery(player).closest('.video-modal-video-container-ssv').find('.video-modal-video-controls-ssv').css('display', 'none');
        }
    }
}

function updateProgressbarssv(player) {
    var percentage = player.duration > 0 ? Math.floor((100 / player.duration) * player.currentTime) : 0;
    var progressBar = jQuery(player).closest('.video-modal-video-container-ssv').find('progress')[0];
    progressBar.value = percentage;
}

function videoTimeUpdatessv(progress, e) {
    var player = jQuery(progress).closest('.video-modal-video-container-ssv').find('video')[0];
    var percent = e.offsetX / progress.offsetWidth;
    player.currentTime = percent * player.duration;
}

function videoPlayPausessv(btn) {
    var player = jQuery(btn).closest('.video-modal-video-container-ssv').find('video')[0];
    if (player.paused) {
        player.play();
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-playpause-ssv').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
    } else {
        player.pause();
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-playpause-ssv').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
    }
}

function videoForwardRewindssv(btn, action) {
    var player = jQuery(btn).closest('.video-modal-video-container-ssv').find('video')[0];
    if (action === 'F') {
        player.currentTime += 10;
    } else {
        player.currentTime += -10;
    }
}

function videoAlertssv(msg, sec) {
    jQuery('.video-modal-alert-ssv').html(msg).fadeIn().delay(sec).fadeOut();
}

function copyLinkssv(inp) {
    /* Get the text field */
    var copyText = inp;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    videoAlertssv('Link copied!', 2000);

    return;
}

function openSharessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-share-modal-ssv').css('transform', 'translateY(0%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').show();
    }, 300);
}

function closeSharessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-share-modal-ssv').css('transform', 'translateY(110%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').hide();
    }, 300);
}

function openRatingssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.product-rating-all-ssv').css('transform', 'translateY(0%)');
}

function closeRatingssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.product-rating-all-ssv').css('transform', 'translateY(110%)');
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function disableScrollssv() {
    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

function enableScrollssv() {
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

function updateDurationssv(player) {
    var minutes = String(Math.floor(parseInt(player.duration / 60, 10))).padStart(2, '0');
    var seconds = String(Math.floor(player.duration % 60)).padStart(2, '0');

    jQuery(player).parent('.swiper-slide').children('.video-timer-top-ssv').children('p').html(minutes + ':' + seconds);
}

function updateProgressDurationssv(player) {
    var minutes = String(Math.floor(parseInt(player.duration - player.currentTime) / 60, 10)).padStart(2, '0');
    var seconds = String(Math.floor(parseInt(player.duration - player.currentTime) % 60)).padStart(2, '0');

    jQuery(player).parent('.swiper-slide').children('.video-timer-top-ssv').children('p').html(minutes + ':' + seconds);
}

// PIP
function playpipssv(v = '', p = '') {

    let video = v ? v : localStorage.getItem('_ssv_pip') ? atob(localStorage.getItem('_ssv_pip')) : '';
    let poster = p ? p : localStorage.getItem('_ssv_pip_t') ? atob(localStorage.getItem('_ssv_pip_t')) : '';

    if (video) {
        // get video player
        let videoPlayer = jQuery('.video-pip-ssv video')[0];

        // set video
        jQuery(videoPlayer).find('source').attr('src', video);
        jQuery(videoPlayer).attr('poster', poster)

        // Pause all other videos
        pauseAllssv();

        // Player to reset seconds
        videoPlayer.currentTime = 0;

        // Mute/Unmute
        jQuery(videoPlayer).prop('muted', ssv_globalMute);
        let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-mute-fill.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-up-fill.svg';
        jQuery(videoPlayer).parent('.video-pip-ssv').find('.video-pip-volume-ssv img').attr('src', src);

        // Open loader
        jQuery('.video-pip-video-loader-ssv').css('display', 'flex');
        videoPlayer.load();
        videoPlayer.onloadstart = function () {
            var playPromise = videoPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                }).catch(error => {
                });
            }
        };

        // hide modal if open
        if (jQuery('.video-modal-ssv').is(":visible")) {
            closessv();
        }

        // Open PIP
        jQuery('.video-pip-ssv').show();
    }
}

function showPipControls() {
    jQuery('.video-pip-playpause-ssv').fadeIn();
    setTimeout(() => {
        jQuery('.video-pip-playpause-ssv').fadeOut();
    }, 3000);
}

function closepipssv() {
    // Pause video
    jQuery('.video-pip-ssv video')[0].pause();

    // Hide modal
    jQuery('.video-pip-ssv').hide();

    // PIP release
    localStorage.setItem('_ssv_pip', '');
    localStorage.setItem('_ssv_pip_t', '');
}

function playpausepipssv(btn) {
    var player = jQuery('.video-pip-ssv video')[0];
    if (player.paused) {
        player.play();
        jQuery('.video-pip-playpause-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
    } else {
        player.pause();
        jQuery('.video-pip-playpause-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
    }
}

function volumepipssv(btn) {
    if (jQuery('.video-pip-ssv video').prop('muted')) {
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-up-fill.svg');
        jQuery('.video-pip-ssv video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/volume-mute-fill.svg');
        jQuery('.video-pip-ssv video').prop('muted', true);

        ssv_globalMute = true;
    }
}

function fullscreenpipssv(btn) {
    let video = jQuery('.video-pip-ssv video source').attr('src');
    let slideNo = jQuery('.swiper-ssv-m video source[src="' + video + '"]').closest('.swiper-slide').index();

    closepipssv();
    playssv(slideNo);
}

function updateShopifyCartssv() {
    jQuery.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',
    }
    ).done(function (response) {
        jQuery('.cart-count-ssv').html(response.item_count);
    });
}

function addtocartssv(videoId, productId, btn) {
    productId = ssv_productIds[productId];
    let quantity = parseInt(jQuery(btn).closest('.video-modal-product-block-product-ssv').find('.quantity-inp-ssv').val());

    jQuery(btn).attr('disabled', 'disabled');
    jQuery(btn).html('Adding..');

    let cLink = window.location.href.split('?')[0];

    if (productId) {
        jQuery.ajax({
            type: 'post',
            url: window.location.origin + `/checkout/cart/add/uenc/${btoa(cLink)}/product/${productId}/`,
            dataType: 'json',
            data: {
                qty: quantity,
                product: productId,
                form_key: getCookie(`form_key`),
                uenc: btoa(window.location.origin + `/checkout/cart/add/uenc/${btoa(cLink)}/product/${productId}/`)
            },
            success: function (data) {
                // console.log(data);

                jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                jQuery(btn).removeAttr('disabled');

                jQuery('.quantity-inp-ssv').val('1');

                // Alert
                videoAlertssv('Added to cart!', 2000);
            },
            error: function (error) {
                // console.log(error);

                jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                jQuery(btn).removeAttr('disabled');

                jQuery('.quantity-inp-ssv').val('1');

                // Alert
                videoAlertssv('Something went wrong!', 2000);
            },
            complete: function () {
                setTimeout(() => {
                    jQuery('.cart-count-ssv').html(jQuery('.counter.qty .counter-number').html());
                }, 1000);
            }
        });
    } else {
        jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
        jQuery(btn).removeAttr('disabled');

        jQuery('.quantity-inp-ssv').val('1');

        videoAlertssv('Something went wrong!', 2000);
    }
}

function openAskquessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv').css('transform', 'translateY(0%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').show();
    }, 300);
}

function closeAskquessv(btn, step = false) {
    if (step && jQuery(btn).closest('.video-modal-video-container-ssv').find('.askque-modal-form2-ssv').is(":visible")) {
        askQuestionStepssv(btn, 1);
    } else {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv').css('transform', 'translateY(110%)');
        setTimeout(() => {
            askQuestionStepssv(btn, 1);
            jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv input[type="text"]').val('');
            jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv textarea').val('');
            jQuery('.video-modal-fade-ssv').hide();
        }, 300);
    }
}

function askQuestionStepssv(elm, n) {
    jQuery(elm).closest('.video-modal-video-container-ssv').find('.askque-modal-form-ssv').hide();
    jQuery(elm).closest('.video-modal-video-container-ssv').find(`.askque-modal-form${n}-ssv`).show();
}

function askQuestionssv(form, designerId, videoId) {
    let formData = jQuery(form).serializeArray();
    let question = formData[0]['value'];

    if (ssv_userData) {
        // videoloaderssv(true);
        // ssv_fsdb.collection("swirlshortvideo_askquestion_" + designerId).doc(`${videoId}`).collection('queries').add({
        //     user_name: ssv_userData.user_name,
        //     user_phone_code: ssv_userData.user_phone_code,
        //     user_phone: ssv_userData.user_phone,
        //     video_id: videoId,
        //     designer_id: designerId,
        //     message: question,
        //     created_at: Math.round((new Date().getTime() / 1000))
        // }).then(function () {
        //     videoAlertssv('Your query is submitted.<br> Thank you!', 3000);
        //     setTimeout(() => {
        //         closeAskquessv(form);
        //     }, 1000);
        //     videoloaderssv(false);
        // }).catch((error) => {
        //     videoAlertssv('Failed! Try again.', 2000);
        //     videoloaderssv(false);
        // });

        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/ShortVideo/askquestion",
            data: "user_id=" + encodeURIComponent('0') + "&designer_id=" + encodeURIComponent(designerId) + "&msg=" + encodeURIComponent(question) + "&swirls_id=" + encodeURIComponent(videoId) + "&username=" + encodeURIComponent(ssv_userData.user_name) + "&userphone=" + encodeURIComponent(ssv_userData.user_phone) + "&userphonecode=" + encodeURIComponent(ssv_userData.user_phone_code),
            beforeSend: function () {
                videoloaderssv(true);
            },
            success: function (response) {
                if (response.success == true) {
                    videoAlertssv('Your query is submitted.<br> Thank you!', 3000);
                    setTimeout(() => {
                        closeAskquessv(form);
                    }, 1000);
                } else {
                    videoAlertssv('Failed! Try again.', 2000);
                }
            },
            error: function (request, error) {
                alert("Something went wrong! Please try again later.");
            },
            complete: function () {
                videoloaderssv(false);
            }
        });
    } else {
        askQuestionStepssv(form, 2);
    }

    return false;
}

function registerUserssv(form) {
    let formData = jQuery(form).serializeArray();

    var regName = /^[a-zA-Z ]+$/;
    if (!formData[0]['value'].match(regName)) {
        videoAlertssv('Please Enter valid name.', 3000);
        return false;
    }
    var regPhone = /^\d{10}$/;
    if (!formData[2]['value'].match(regPhone)) {
        videoAlertssv('Please Enter valid phone number.', 3000);
        return false;
    }

    let user = {
        user_id: 1,
        user_name: formData[0]['value'],
        user_phone_code: formData[1]['value'],
        user_phone: formData[2]['value']
    };
    localStorage.setItem('_ssv_user', JSON.stringify(user));
    ssv_userData = user;
    jQuery(form).closest('.video-modal-video-container-ssv').find('.askque-modal-btn1-ssv').click();

    return false;
}

function CTAClicksssv(pId, pTitle, pImage, pURL, dId, vId, cType) {
    // ssv_fsdb.collection("swirlshortvideo_cta_" + dId).doc(`${vId}`).collection('clicks').add({
    //     user_name: ssv_userData ? ssv_userData.user_name : '',
    //     user_phone_code: ssv_userData ? ssv_userData.user_phone_code : '',
    //     user_phone: ssv_userData ? ssv_userData.user_phone : '',
    //     video_id: vId,
    //     product_id: pId,
    //     product_title: pTitle,
    //     product_image: pImage,
    //     product_url: pURL,
    //     designer_id: dId,
    //     cta_type: cType,
    //     created_at: Math.round((new Date().getTime() / 1000))
    // }).then(function () {
    // }).catch((error) => {
    //     console.log('SWIRL CTA Track failed!');
    // });    

    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.goswirl.live/index.php/shopify/actionbuttons",
        data: "designer_id=" + encodeURIComponent(dId) + "&product_id=" + encodeURIComponent(pId) + "&user_id=" + encodeURIComponent('') + "&video_id=" + encodeURIComponent(vId) + "&type=" + encodeURIComponent(cType),
        beforeSend: function () {
        },
        success: function (response) {
        },
        error: function (request, error) {
            console.log('SWIRL CTA Track failed!');
        },
        complete: function () {
        }
    });
}

function closeAllpopupsssv() {
    // Hide fade
    jQuery('.video-modal-fade-ssv').hide();

    // Ask questions
    jQuery('.askque-modal-form-ssv').hide();
    jQuery('.askque-modal-form1-ssv').show();
    jQuery('.video-modal-askque-modal-ssv').css('transform', 'translateY(110%)');

    // Share
    jQuery('.video-modal-share-modal-ssv').css('transform', 'translateY(110%)');

    jQuery('.quantity-inp-ssv').val('1');

    // Product block of web
    if (window.innerWidth > 768) {
        jQuery('.video-modal-product-block-product-multi-ssv').css('transform', 'translateX(110%)');
    }
}

function closeAnyPopupssv() {
    // if (jQuery('.swiper-slide-active .video-modal-askque-modal-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
    //     closeAskquessv(jQuery('.swiper-slide-active .video-modal-askque-modal-top-ssv img'), false);
    // }

    // if (jQuery('.swiper-slide-active .video-modal-share-modal-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
    //     jQuery('.swiper-slide-active .video-modal-share-modal-top-ssv img').click();
    // }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return String(m).padStart(2, "0") + ':' + String(s).padStart(2, "0");
}

function getMobileOperatingSystemssv() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function likeVideossv(btn, videoId, designerId) {
    let elm = jQuery(btn).closest('.video-modal-video-container-ssv').find('.SWIRLhearts')[0];
    jQuery(btn).find('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/heart-fill-2.svg');
    SWIRLHeartFlawsssv(elm);
    SWIRLHeartFlawsssv(elm);

    let likedVideoIds = null;
    if (getCookie(`ssv_vl_${videoId}`)) {
        likedVideoIds = getCookie(`ssv_vl_${videoId}`);
    } else {
        setCookie(`ssv_vl_${videoId}`, videoId, 365);
    }

    require([
        'jquery',
        '@firebase/app',
        '@firebase/app-compat',
        '@firebase/auth-compat',
        '@firebase/firestore-compat',
        'jquery/ui'],
        function ($, app, firebase, auth, firestore) {
            firebase.initializeApp({
                apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                authDomain: 'swirl-short-vido.firebaseapp.com',
                projectId: 'swirl-short-vido',
                storageBucket: 'swirl-short-vido.appspot.com'
            });
            ssv_fsdb = firebase.firestore();
            // Add to firestore
            ssv_fsdb.collection('swirlshortvideo_likes_' + designerId).doc(`${videoId}`).get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    var videoCount = ssv_fsdb.collection('swirlshortvideo_likes_' + designerId).doc(`${videoId}`);
                    videoCount.update({
                        total_likes: firebase.firestore.FieldValue.increment(1)
                    });
                    if (likedVideoIds == null) {
                        videoCount.update({
                            unique_likes: firebase.firestore.FieldValue.increment(1)
                        });
                    }
                } else {
                    ssv_fsdb.collection('swirlshortvideo_likes_' + designerId).doc(`${videoId}`).set({
                        total_likes: 1,
                        unique_likes: 1
                    });
                }
            });
        });

}

function SWIRLHeartFlawsssv(elm) {
    var b = Math.floor((Math.random() * 100) + 1);
    var d = ["flowOne", "flowTwo", "flowThree"];
    var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
    var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
    jQuery('<div class="SWIRLheart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><span></span></div>').appendTo(elm).css({
        animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
    });
    jQuery(".part-" + b).show();
    setTimeout(function () {
        jQuery(".part-" + b).remove()
    }, c * 900)
}

function nFormatterssv(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function updateSwiperNavigationssv(swpr) {
    if (jQuery(window).width() >= 640 && jQuery(`${swpr} .swiper-slide`).length < 6) {
        jQuery(`${swpr} .swiper-button-next`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev`).addClass("swiper-button-disabled");
    } else if (jQuery(window).width() < 640 && jQuery(`${swpr} .swiper-slide`).length < 3) {
        jQuery(`${swpr} .swiper-button-next`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev`).addClass("swiper-button-disabled");
    }
}

addEventListener('keydown', function (event) {
    if (event.key === "Escape" && jQuery('.video-modal-ssv').is(":visible")) {
        closessv();
    } else if (event.keyCode == 37 && jQuery('.video-modal-ssv').is(":visible")) {
        jQuery('.video-modal-ssv .swiper-button-prev').click(); //on left arrow
    } else if (event.keyCode == 39 && jQuery('.video-modal-ssv').is(":visible")) {
        jQuery('.video-modal-ssv .swiper-button-next').click();; //on right arrow
    }
});

addEventListener('resize', (event) => {
    setPopupHightssv();
});

