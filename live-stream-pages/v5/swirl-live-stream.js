var urlSL = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
urlSL = urlSL.replace('#', '');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let SET1, SET2 = false;

var headTag = document.getElementsByTagName("head")[0];

if (typeof jQuery == 'undefined') {
    var jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    headTag.insertBefore(jqTag, headTag.lastChild);
    jqTag.onload = function () { SET2 = true; };
} else {
    SET2 = true;
}

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/css/v8.4/swiper-bundle.min.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/live-stream-pages/v5/swirl-live-streams.min.css';
// jqTag.href = 'live-streams.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('script');
jqTag.rel = 'text/javascript';
jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/js/v8.4/swiper-bundle.min.js';
headTag.insertBefore(jqTag, headTag.lastChild);
jqTag.onload = function () { SET1 = true; };

let SLScriptsLOADED = setInterval(() => {
    if (SET1 && SET2) {
        executeSLiveNow();
        clearInterval(SLScriptsLOADED);
    }
}, 500);

function executeSLiveNow() {
    $('#swirl-live-streams').append(`
        <div class="SL-streams-list"></div>
        
        <div class="SL-iframe-live" style="display:none;">
            <iframe style="width: 100%;height: 100vh;border: none;position: fixed;top: 0;left: 0;z-index: 1211;" src=""></iframe>
            <span onclick="closeLiveStreamPop();" style="position: fixed;top: 15px;right: 15px;background: #fff;color: #6f4cd0;z-index: 1211;font-family: sans-serif;font-size: 25px;line-height: 25px;height: 25px;width: 25px;text-align: center;border-radius: 50%;cursor: pointer;">&times;</span>
        </div> 
        
        <input type="text" class="SL-copylink-input" value="" style="display: none !important;" onclick="SLcopyLink(this);">
    `);

    let code = $('#swirl-live-streams').data('code');
    let domain = (new URL(urlSL));
    let store = domain.hostname;
    $.ajax({
        type: "POST",
        dataType: "json",
        // url: "https://livevideoshopping.in/admin/api/LiveAPI/streamlisting?user=" + code,
        url: "https://goswirl.shop/admin/api/LiveAPI/streamlisting?user=" + code,
        success: function (data) {
            if (Object.keys(data).length && (data['scheduled'].length || data['completed'].length)) {
                customization = data['data'];
                // console.log(customization);

                let append = '';
                if (customization.format == 0) {

                    append += `
                        <div class="swiper-SL">
                            <div class="swiper-wrapper">                            
                    `;

                    // if (data['live'].length) {
                    //     data['live'].forEach(live => {
                    //         append += `                                
                    //                 <div class="col-md-2 mb-3 px-1">
                    //                     <div class="SL-active-stream-video-container position-relative" data-stream="${live.streamURL}" onclick="watchStream('${live.streamURL}');">
                    //                         <img src="${live.cover_img}" class="SL-vdo-thmub"
                    //                             alt="Stream Thumbnail" title="Stream Thumbnail">
                    //                         <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                    //                             title="Play icon">
                    //                         <p class="SL-stream-label LL">Live</p>
                    //                         <p class="SL-stream-title scroll_on_hover ellipsis">${live.title}</p>
                    //                     </div>
                    //                 </div>                                                              
                    //             `;
                    //     });
                    // }

                    if (data['scheduled'].length) {
                        data['scheduled'].forEach(scheduled => {
                            var onDT = new Date(`${scheduled.starting_time}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `      
                                <div class="swiper-slide">                          
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${scheduled.streamURL}') : '';">
                                        <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">                                                                                
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${scheduled.title}</p>
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">
                                                <p style="color: ${customization.date_fk_color} !important;">${scheduled.title}</p>
                                                <label style="color: ${customization.date_fk_color} !important;">${onDT}</label>
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>                                                                  
                            `;
                        });
                    }

                    if (data['completed'].length) {
                        data['completed'].forEach(completed => {
                            var onDT = new Date(`${completed.starting_time}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `
                                <div class="swiper-slide">        
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${completed.streamURL}') : '';">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">                                        
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        ${customization.total_view_set ? `<p class="SL-views-top"><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon"> ${completed.total_views}</p>` : ''}
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${completed.title}</p>
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">
                                                <p style="color: ${customization.date_fk_color} !important;">${completed.title}</p>
                                                <label style="color: ${customization.date_fk_color} !important;">${onDT}</label>
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            `;

                        });
                    }

                    append += `
                        </div>
                            <div class="swiper-button-next">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                            </div>
                            <div class="swiper-button-prev">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                            </div>
                        </div>
                    `;

                } else {

                    if (data['scheduled'].length) {
                        append += `<p class="m-0 mb-1 mt-4 pb-2 h5 SL-break-title ${customization.header_setting ? 'text-center' : ''}">${customization.schedule_text}</p><hr class="SL-title-border ${customization.header_setting ? 'm-auto mb-3' : ''}" style="background: ${customization.date_bk_color} !important;">`;
                        append += `
                            <div class="swiper-SL">
                                <div class="swiper-wrapper">                            
                        `;
                        data['scheduled'].forEach(scheduled => {
                            var onDT = new Date(`${scheduled.starting_time}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `                                
                                <div class="swiper-slide">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${scheduled.streamURL}') : '';">
                                        <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">                                                                                
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${scheduled.title}</p>
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">
                                                <p style="color: ${customization.date_fk_color} !important;">${scheduled.title}</p>
                                                <label style="color: ${customization.date_fk_color} !important;">${onDT}</label>
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>                                    
                            `;
                        });
                        append += `
                            </div>
                                <div class="swiper-button-next">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                                </div>
                                <div class="swiper-button-prev">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                                </div>
                            </div>
                        `;
                    }

                    if (data['completed'].length) {
                        append += `<p class="m-0 mb-1 mt-4 pb-2 h5 SL-break-title ${customization.header_setting ? 'text-center' : ''}">${customization.completed_text}</p><hr class="SL-title-border ${customization.header_setting ? 'm-auto mb-3' : ''}" style="background: ${customization.date_bk_color} !important;">`;
                        append += `
                            <div class="swiper-SL">
                                <div class="swiper-wrapper">                            
                        `;
                        data['completed'].forEach(completed => {
                            var onDT = new Date(`${completed.starting_time}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `
                                <div class="swiper-slide">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${completed.streamURL}') : '';">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">                                        
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        ${customization.total_view_set ? `<p class="SL-views-top"><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon"> ${completed.total_views}</p>` : ''}
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${completed.title}</p>
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">
                                                <p style="color: ${customization.date_fk_color} !important;">${completed.title}</p>
                                                <label style="color: ${customization.date_fk_color} !important;">${onDT}</label>
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            `;

                        });
                        append += `
                            </div>
                                <div class="swiper-button-next">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                                </div>
                                <div class="swiper-button-prev">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                                </div>
                            </div>
                        `;
                    }

                }

                $('.SL-streams-list').html(append);

                // Initialize Swiper                
                var swiper = new Swiper('.swiper-SL', {
                    slidesPerView: 5,
                    // loop: true,
                    direction: 'horizontal',
                    spaceBetween: 15,
                    // centeredSlides: true,
                    // centeredSlidesBounds: true,
                    // centerInsufficientSlides: true,
                    // autoplay: {
                    //   delay: 5000,
                    //   disableOnInteraction: true,
                    // },
                    breakpoints: {
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 2,
                            centeredSlides: true,
                            centeredSlidesBounds: true,
                            centerInsufficientSlides: true,
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

                window.addEventListener('load', (event) => {
                    // Shared link autoplay
                    const urlSearchParams = new URLSearchParams(window.location.search);
                    const params = Object.fromEntries(urlSearchParams.entries());
                    if (typeof params['stream'] != 'undefined') {
                        window.scrollTo(0, 500);
                        setTimeout(() => {
                            $(`div[data-stream="${window.atob(params['stream'])}"]`).click();
                        }, 500);
                    }
                });

                // share clicks
                $('.SL-facebook').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('https://www.facebook.com/sharer/sharer.php?u=' + link, '_blank');
                });

                $('.SL-twitter').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('https://twitter.com/share?url=' + link, '_blank');
                });

                $('.SL-whatsapp').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('whatsapp://send?text=' + link);
                });

                $('.SL-copy').click(function () {
                    let link = $(this).attr('data-sharelink');

                    $('.SL-copylink-input').val(link);
                    $('.SL-copylink-input').click();
                    $(this).parent('.SL-share').find('.SL-link-copied').fadeIn().delay(3000).fadeOut();
                });

                // for stuff that scrolls left on hover
                $(".scroll_on_hover").mouseover(function () {
                    $(this).removeClass("ellipsis");
                    var maxscroll = $(this).width();
                    var speed = maxscroll * 15;
                    $(this).animate({
                        scrollLeft: maxscroll
                    }, speed, "linear");
                });

                $(".scroll_on_hover").mouseout(function () {
                    $(this).stop();
                    $(this).addClass("ellipsis");
                    $(this).animate({
                        scrollLeft: 0
                    }, 'slow');
                });
            }
            else {
                $('#swirl-live-streams').html(`
                    <p class="h5 text-muted text-center my-5">No Live Stream yet!</p>
                `);
            }
        }
    });
}

let allOverElementsLS = [];
let allOverElementsLSSticky = [];

function closeLiveStreamPop() {
    let sls = document.querySelector('.SL-iframe-live');

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    slsFrame.src = '';

    sls.style.display = 'none';

    // Scroll and over items
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    allOverElementsLS.forEach(element => {
        $(element).show();
    });

    // Show again all hidden fixed elements
    allOverElementsLSSticky.forEach(element => {
        $(element).show();
    });
}

function watchStream(stream) {
    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    // slsFrame.src = stream+'?plugin=1';
    let link = btoa(urlSL + '?stream=' + window.btoa(stream));
    slsFrame.src = stream + '?plugin=' + link;

    // Scroll and over items
    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // hide all fixed visible elements
    allOverElementsLS = [];
    allOverElementsLSSticky = [];
    $('*').each(function () {
        if ($(this).css('position') == 'fixed' && $(this).is(":visible")) {
            if (!$(this).is('.SSV-play-modal') && !$(this).is('.SSV-PIP')) {
                $(this).hide();
                allOverElementsLS.push($(this));
            }
        }

        if ($(this).css('position') == 'sticky' && $(this).is(":visible")) {
            if (!$(this).is('.SSV-play-modal') && !$(this).is('.SSV-PIP')) {
                $(this).hide();
                allOverElementsLS.push($(this));
            }
        }
    });

    $('.SL-iframe-live').show();
}

function SLcopyLink(inp) {
    /* Get the text field */
    var copyText = inp;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    return;
}

function checkLive(streamId) {
    return false;
}