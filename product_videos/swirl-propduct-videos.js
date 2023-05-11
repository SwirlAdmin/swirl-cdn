var headTag = document.getElementsByTagName("head")[0];
var SSVPPCurrentURL = '';
var SSVPPGlobalMute = true;

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

(function () {
    if (document.querySelector('#swirl-short-videos-playlist-page') != null && params.playlist != 'undefined') {
        let SET1, SET2 = false;

        var jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/js/v8.4/swiper-bundle.min.js';
        jqTag.onload = function () { SET1 = true; };
        headTag.insertBefore(jqTag, headTag.lastChild);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://apigoswirl.com/short_video/product_videos/swirl-product-videos.min.css';
        document.body.appendChild(jqTag);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/css/v8.4/swiper-bundle.min.css';
        headTag.insertBefore(jqTag, headTag.firstChild);

        if (typeof jQuery == 'undefined') {
            var jqTag = document.createElement('script');
            jqTag.rel = 'text/javascript';
            jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
            headTag.insertBefore(jqTag, headTag.lastChild);
            jqTag.onload = function () { SET2 = true; };
        } else {
            SET2 = true;
        }

        let SSVScriptsLOADED = setInterval(() => {
            if (SET1 && SET2) {
                executeNowSSVPP();
                clearInterval(SSVScriptsLOADED);
            }
        }, 1000);

        function executeNowSSVPP() {
            // Fetch all SWIRLS on page load
            jQuery('#swirl-short-videos-playlist-page').html(`
                    <div id="SSVPP-short-videos">
                        <p class="short-videos-main-title-ssvpp">Videos</p>

                        <div class="swiper swiper-ssvpp">
                            <div class="swiper-wrapper">                            
                            </div>
                            <div class="swiper-button-next swiper-button-next-ssvpp">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                            </div>
                            <div class="swiper-button-prev swiper-button-prev-ssvpp">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                            </div>
                        </div>                    

                        <div class="play-modal-ssvpp">
                            <div class="play-modal-video-container-ssvpp">
                                <video playsinline preload="metadata" data-setup="{}" onended="jQuery('.play-modal-next-ssvpp').click();">
                                    <source src="" type="video/mp4">
                                </video>                            

                                <button type="button" class="play-modal-mute-unmute-ssvpp play-modal-operation-btns-ssvpp" title="Mute/Unmute">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg" alt="Share icon">
                                </button>                            
                                <button type="button" class="play-modal-play-pause-ssvpp play-modal-operation-btns-ssvpp" title="Play/Pause">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg" alt="Play/Pause icon">
                                </button>     
                                <button type="button" class="play-modal-close-ssvpp play-modal-operation-btns-ssvpp" title="Close">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/close.svg" alt="Close icon" />
                                </button>                                                         
                            </div>                        

                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" class="play-modal-prev-ssvpp" alt="Previous icon">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" class="play-modal-next-ssvpp" alt="Next icon">
                        </div>                    
                    </div>
                `);

            jQuery.ajax({
                type: "GET",
                dataType: "json",
                url: 'https://api.apigoswirl.live/index.php/ShortVideo/getVideoBaseOnPlaylistId',
                data: "playlist=" + encodeURIComponent(params.playlist),
                success: function (data) {
                    // console.log(data);

                    if (data.playlist != null) {
                        var append = '';
                        data.playlist.forEach(swirl => {
                            append += `<div class="swiper-slide swiper-slide-ssvpp" data-video="${swirl.server_url}">
                                    <img class="video-thumb-ssvpp" src="${swirl.cover_image}" alt="Video thumbnail">
                                    <img class="video-play-ssvpp" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" alt="Play icon">                                
                                </div>`;
                        });

                        jQuery('#SSVPP-short-videos .swiper-wrapper').html(append);

                        // Initialize Swiper
                        var swiper = new Swiper('.swiper-ssvpp', {
                            slidesPerView: 5,
                            direction: 'horizontal',
                            spaceBetween: 10,
                            centeredSlides: true,
                            centeredSlidesBounds: true,
                            centerInsufficientSlides: true,
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

                        updateSSVSwiperNavigationssvpp();

                        jQuery('.swiper-slide-ssvpp').click(function () {
                            var currentVideo = jQuery(this).data('video');
                            SSVPPCurrentURL = currentVideo;

                            jQuery('.play-modal-ssvpp video').get(0).pause();
                            jQuery('.play-modal-ssvpp video source').attr('src', currentVideo);
                            jQuery('.play-modal-ssvpp video').get(0).load();

                            jQuery('.play-modal-ssvpp').show();

                            videoPlayNowssvpp();
                        });


                        jQuery('.play-modal-prev-ssvpp').click(function () {
                            var currentVideo = jQuery('.play-modal-ssvpp video source').attr('src');
                            var videoIndex = jQuery(`.swiper-slide-ssvpp[data-video="${currentVideo}"]`).index();

                            if (videoIndex > 0) {
                                jQuery('.play-modal-ssvpp video').get(0).pause();
                                jQuery('.play-modal-ssvpp video source').attr('src', jQuery('.swiper-slide-ssvpp').eq((videoIndex - 1)).data('video'));
                                jQuery('.play-modal-ssvpp video').get(0).load();
                                videoPlayNowssvpp();
                            }
                        });

                        jQuery('.play-modal-next-ssvpp').click(function () {
                            var currentVideo = jQuery('.play-modal-ssvpp video source').attr('src');
                            var videoIndex = jQuery(`.swiper-slide-ssvpp[data-video="${currentVideo}"]`).index();

                            if (videoIndex < jQuery('.swiper-slide-ssvpp').last().index()) {
                                jQuery('.play-modal-ssvpp video').get(0).pause();
                                jQuery('.play-modal-ssvpp video source').attr('src', jQuery('.swiper-slide-ssvpp').eq((videoIndex + 1)).data('video'));
                                jQuery('.play-modal-ssvpp video').get(0).load();
                                videoPlayNowssvpp();
                            }
                        });

                        jQuery('.play-modal-ssvpp video').on('play', function () {
                            jQuery('.play-modal-play-pause-ssvpp').hide();
                            jQuery('.play-modal-play-pause-ssvpp img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
                        });

                        jQuery('.play-modal-ssvpp video').on('pause', function () {
                            jQuery('.play-modal-play-pause-ssvpp img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
                        });

                        jQuery('.play-modal-video-container-ssvpp').on('mouseenter', function () {
                            jQuery('.play-modal-play-pause-ssvpp').show();
                        });

                        jQuery('.play-modal-video-container-ssvpp').on('mouseleave', function () {
                            jQuery('.play-modal-play-pause-ssvpp').hide();
                        });

                        jQuery('.play-modal-ssvpp video').on('click', function () {
                            if (jQuery('.play-modal-play-pause-ssvpp').is(':visible'))
                                jQuery('.play-modal-play-pause-ssvpp').hide();
                            else
                                jQuery('.play-modal-play-pause-ssvpp').show();
                        });

                        jQuery('.play-modal-play-pause-ssvpp').click(function () {
                            let video = jQuery('.play-modal-ssvpp video').get(0);

                            if (video.paused) {
                                videoPlayNowssvpp();
                            } else {
                                video.pause();
                            }
                        });

                        jQuery('.play-modal-mute-unmute-ssvpp').click(function () {
                            let video = jQuery('.play-modal-ssvpp video').get(0);

                            if (video.muted) {
                                jQuery(video).prop('muted', false);
                                SSVPPGlobalMute = false;
                                jQuery('.play-modal-mute-unmute-ssvpp img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                            } else {
                                jQuery(video).prop('muted', true);
                                SSVPPGlobalMute = true;
                                jQuery('.play-modal-mute-unmute-ssvpp img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                            }
                        });

                        jQuery('.play-modal-close-ssvpp').click(function () {
                            let video = jQuery('.play-modal-ssvpp video').get(0);
                            video.pause();

                            jQuery('.play-modal-ssvpp').hide();
                        });

                        jQuery(document).keydown(function (event) {
                            if (jQuery('.play-modal-ssvpp').is(":visible")) {
                                if (event.keyCode == 37 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                    jQuery('.play-modal-prev-ssvpp').click(); //on left arrow
                                } else if (event.keyCode == 39 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                    jQuery('.play-modal-next-ssvpp').click(); //on right arrow
                                } else if (event.key === 'Escape') {
                                    jQuery('.play-modal-close-ssvpp').click();
                                }
                            }
                        });

                        jQuery('.swiper-slide-ssvpp').eq(0).click();

                    } else {
                        jQuery('#SSVPP-short-videos .swiper-wrapper').html('');
                    }
                }
            });

            setPopupHightssvpp();
        }
    }
})();

function videoPlayNowssvpp() {
    jQuery('.play-modal-ssvpp video').prop('muted', SSVPPGlobalMute);
    var playPromise = jQuery('.play-modal-ssvpp video').get(0).play();
    if (playPromise !== undefined) {
        playPromise.then(_ => { }).catch(error => { });
    }
}

function setPopupHightssvpp() {
    let currentHeight = window.innerHeight;
    jQuery('.play-modal-ssvpp').height(currentHeight);
}

addEventListener('resize', (event) => {
    updateSSVSwiperNavigationssvpp();
    setPopupHightssvpp();
});

addEventListener('load', (event) => {
    updateSSVSwiperNavigationssvpp();
    setPopupHightssvpp();
});

function updateSSVSwiperNavigationssvpp() {
    if (jQuery(window).width() >= 640 && jQuery(".swiper-ssvpp .swiper-slide").length < 6) {
        jQuery('.swiper-ssvpp .swiper-button-next').addClass("swiper-button-disabled");
        jQuery('.swiper-ssvpp .swiper-button-prev').addClass("swiper-button-disabled");
    } else if (jQuery(window).width() < 640 && jQuery(".swiper-ssvpp .swiper-slide").length < 3) {
        jQuery('.swiper-ssvpp .swiper-button-next').addClass("swiper-button-disabled");
        jQuery('.swiper-ssvpp .swiper-button-prev').addClass("swiper-button-disabled");
    }
}