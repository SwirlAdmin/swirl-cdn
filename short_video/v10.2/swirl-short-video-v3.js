//v10.2 - New design with new swiping up-down - Multiple pages [Reels] feature

// Global Defines
let ssv_mode = 'Live'; // Test, Live
let ssv_globalMute = true;
let ssv_pip = false;
let ssv_brandCustomizations = [];
let ssv_store = '';
let ssv_storeType = '0';
let ssv_storeCode = '';
let ssv_storePlaylist = '';
let ssv_baseURL = ssv_mode === 'Live' ? 'https://apigoswirl.com/v10.2/swirl-short-video-v3.min.css' : '';
let ssv_responseData = [];
let ssv_productIds = [];
let ssv_apiURL = 'https://api.goswirl.live/index.php/shopify/videolistingV4'; // bigleap.live  ,  api.goswirl.live
let ssv_swiper = [];
let ssv_swiper_modal = [];
let ssv_videoPlayCounter = 0;
let ssv_userData = null;
let ssv_fsdb = [];
let ssv_gumletConfig = {
    property_id: 'jYfkUIVL', // required:  please replace with correct property id.
};

// Append JS / CSS 
let jqTag = '';

jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css';
document.body.insertBefore(jqTag, document.body.lastChild);

jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = ssv_baseURL;
document.body.insertBefore(jqTag, document.body.lastChild);

let JSLOAD1 = false;
jqTag = document.createElement('script');
jqTag.rel = 'text/javascript';
jqTag.src = 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js';
jqTag.onload = function () { JSLOAD1 = true; };
document.body.insertBefore(jqTag, document.body.lastChild);

let JSLOAD2 = false;
if (typeof jQuery == 'undefined') {
    jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
    document.body.insertBefore(jqTag, document.body.lastChild);
    jqTag.onload = function () { JSLOAD2 = true; };
} else {
    JSLOAD2 = true;
}

// check all loaded or not - then execute ssv
let SSVScriptsLOADED = setInterval(() => {
    if (JSLOAD1 && JSLOAD2) {
        executessv();
        clearInterval(SSVScriptsLOADED);
    }
}, 500);

// Main execution function on JS ready
function executessv() {
    // check if div is present or not    
    if (document.querySelector('#swirl-short-videos') != null || localStorage.getItem('_ssv_pip')) {

        // Jquery depended JS
        // Intl   
        let JSL1 = false;
        jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js';
        jqTag.onload = function () { JSL1 = true; };
        document.body.insertBefore(jqTag, document.body.lastChild);

        let JSL2 = false;
        jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://cdn.gumlytics.com/insights/1.1/gumlet-insights.min.js';
        jqTag.onload = function () { JSL2 = true; };
        document.body.insertBefore(jqTag, document.body.lastChild);

        let JSL3 = false;
        jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js';
        jqTag.onload = function () { JSL3 = true; };
        document.body.insertBefore(jqTag, document.body.lastChild);

        let JSL4 = false;
        jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-compat.js';
        jqTag.onload = function () { JSL4 = true; };
        document.body.insertBefore(jqTag, document.body.lastChild);

        let JSL5 = false;
        jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth-compat.js';
        jqTag.onload = function () { JSL5 = true; };
        document.body.insertBefore(jqTag, document.body.lastChild);

        // Inits
        ssv_store = window.location.origin.split('?')[0];
        ssv_store = ssv_store.split('#')[0];
        if (document.querySelector('#swirl-short-videos') != null) {
            ssv_storeCode = jQuery('#swirl-short-videos').data('code');
            ssv_storeType = jQuery('#swirl-short-videos').data('wt');
            localStorage.setItem('_ssv_storecode', ssv_storeCode);
            localStorage.setItem('_ssv_storetype', ssv_storeType);
        } else {
            ssv_pip = true;
            ssv_storeCode = localStorage.getItem('_ssv_storecode');
            ssv_storeType = localStorage.getItem('_ssv_storetype');
            ssv_storePlaylist = localStorage.getItem('_ssv_storeplaylist');
        }

        // Multiple playlist
        let playlistCodes = [];
        if (document.querySelector('.swirl-short-videos-playlist') != null) {
            jQuery('.swirl-short-videos-playlist').each(function () {
                playlistCodes.push(jQuery(this).data('playlist'));
            });
            ssv_storePlaylist = playlistCodes.join(',');
            localStorage.setItem('_ssv_storeplaylist', playlistCodes.join(','));
        }

        // Logged user
        if (localStorage.getItem('_ssv_user')) {
            ssv_userData = JSON.parse(localStorage.getItem('_ssv_user'));
        }

        // fecth videos
        jQuery.ajax({
            type: "GET",
            dataType: "json",
            url: ssv_apiURL,
            data: {
                user: ssv_storeCode,
                playlist: ssv_storePlaylist
            },
            success: function (data) {
                // console.log(data);                

                if (Object.keys(data.swilrs).length > 0) {
                    ssv_responseData = data;
                    ssv_brandCustomizations = ssv_responseData.swilrs.data;
                    ssv_globalMute = ssv_brandCustomizations.auto_play_mute_un === "1" ? true : false;

                    // generate SSV
                    let SSVSL = setInterval(() => {
                        if (JSL1 && JSL2 && JSL3 && JSL4 && JSL5) {
                            firebase.initializeApp({
                                apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                                authDomain: 'swirl-short-vido.firebaseapp.com',
                                projectId: 'swirl-short-vido',
                                storageBucket: 'swirl-short-vido.appspot.com'
                            });
                            ssv_fsdb = firebase.firestore();

                            generatessv(ssv_responseData.swilrs);
                            clearInterval(SSVSL);
                        }
                    }, 300);

                    // check user cookie
                    if (getCookie('ssv_user')) {
                        setCookie('ssv_user', (parseInt(getCookie('ssv_user')) + 1), 365);
                    } else {
                        setCookie('ssv_user', 1, 365);
                    }
                } else {
                    console.log('SSV Videos Absent!')
                }
            }
        });
    } else { // Not present
        console.log('SSV Absent!')
    }
}

function getHandle(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle ? handle.split('#')[0] : '';
    handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

    return handle;
}

function generatessv(swirls) {
    if (document.querySelector('.swirl-short-videos-playlist') != null) {
        jQuery('.swirl-short-videos-playlist').each(function () {

            let cPlaylist = jQuery(this);
            let cPlaylistCode = jQuery(cPlaylist).data('playlist');
            let videos = swirls[cPlaylistCode];
            let onpageSlides = '';
            let modalSlides = '';
            let swipeupTooltip = parseInt(getCookie('ssv_user')) <= 1 ? '<img class="video-modal-swipe-up-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirper-up.gif" alt="Tool Tip Swipe Up" />' : '';
            swipeupTooltip = '';
            let i = 0;

            videos.forEach(video => {
                // testing
                // video.video_url = 'https://livevideoshopping.in/test/pre.mp4';
                // video.cover_video = 'https://livevideoshopping.in/test/pre.mp4';

                // Product IDs for addtocart
                if (ssv_storeType == '1') {
                    let productHandle = getHandle(video.product[0].url);
                    jQuery.getJSON(window.Shopify.routes.root + 'products/' + productHandle + '.js', function (product) {
                        ssv_productIds[video.video_id] = product.variants[0]['id'];
                    });
                } else if (ssv_storeType == '2') {
                    ssv_productIds[video.video_id] = video.product[0].brand_product_id;
                }

                // ${ssv_brandCustomizations.time_sec === '1' ? 'onloadeddata="updateDurationssv(this);" ontimeupdate="updateProgressDurationssv(this);"' : ''}
                if (!ssv_pip) {
                    onpageSlides += `
                        <div class="swiper-slide ms-${video.video_id}" onclick="playssv(${i}, '${cPlaylistCode}')">
                            <video id="onpageVideossv-${video.video_id}" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="margin-bottom: 0 !important;"' : ''} class="carousel-video-ssv" poster="${video.cover_image}" ${ssv_brandCustomizations['auto_play'] === '1' && i < 5 ? 'autoplay' : ''} loop onplay="jQuery(this).next().hide();" onpause="jQuery(this).next().show();" playsinline="" preload="metadata" data-setup="{}" muted>
                                <source src="${ssv_brandCustomizations['auto_play'] === '1' && i < 5 && video.cover_video ? video.cover_video : video.video_url}" type="video/mp4">
                            </video>
                            <img ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="top: calc(50% - 20px) !important;"' : ''} class="carousel-video-play-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg"
                                alt="Play icon" />  
                            <div class="video-views-count-top-ssv" ${ssv_brandCustomizations.views === '0' ? 'style="display: none !important;"' : ''}>
                                <p><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon" height="" width="">
                                    ${video.total_views}
                                </p>                            
                            </div>   
                            <div class="video-timer-top-ssv" ${ssv_brandCustomizations.time_sec === '0' ? 'style="display: none !important;"' : ''}>
                                <p>${video.video_len ? secondsToHms(video.video_len) : '00:00'}</p>
                            </div> 
                            <div class="product-on-carousel-ssv" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="display: none !important;"' : ''}>                                    
                                <img src="${video.product[0].image}" alt="Product Image">                                        
                                
                                <p>${video.product[0].title}</p>
                                <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>₹${video.product[0].discount_price} <strike ${video.product[0].price > video.product[0].discount_price ? '' : 'style="display: none;"'}>₹${video.product[0].price}</strike></label>
                            </div>          
                        </div>
                    `;
                }

                modalSlides += `
                    <div class="swiper-slide">
                        <div class="video-modal-video-container-ssv">
                            <video id="modalVideossv-${video.video_id}" loop playsinline="" preload="metadata" data-setup="{}" onplay="jQuery(this).next().hide()"
                                onmouseover="showControlsssv(this);" onclick="showPhoneControlsssv(this);"
                                ontimeupdate="updateProgressbarssv(this)"
                                poster="${video.cover_image}">
                                <source src="${video.video_url}" type="video/mp4">
                            </video>
                            <div class="video-modal-video-loader-ssv">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                                    alt="Spinner">
                            </div>
                            <div class="video-modal-video-controls-ssv" onclick="hidePhoneControlsssv(this, event);" onmouseout="hideControlsssv(this);">
                                <div class="video-controls-ssv">
                                    <img class="video-rewind-ssv" onclick="videoForwardRewindssv(this, 'R');"
                                        src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/rewind.svg"
                                        alt="Rewind icon" />
                                    <img class="video-playpause-ssv" onclick="videoPlayPausessv(this);"
                                        src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg"
                                        alt="Play/Pause icon" />
                                    <img class="video-forward-ssv" onclick="videoForwardRewindssv(this, 'F');"
                                        src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/forward.svg"
                                        alt="Forward icon" />
                                </div>
                                <div class="video-progress-ssv">
                                    <progress min='0' max='100' value='0'
                                        onclick="videoTimeUpdatessv(this, event);"></progress>
                                </div>
                            </div>
                            <button class="video-modal-volume-ssv" title="Mute/Unmute" onclick="volumessv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg"
                                    alt="Volume icon">
                                <p>Mute</p>
                            </button>
                            <button class="video-modal-close-ssv" title="Close" onclick="closessv();" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/close.svg"
                                    alt="Close icon">
                            </button>                    
                            <button class="video-modal-share-ssv" title="Share" onclick="openSharessv(this);" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/share-icon.svg"
                                    alt="Close icon">
                                <p>Share</p>
                            </button>  
                            <div class="SWIRLhearts"></div>                
                            <button class="video-modal-like-ssv" title="Like" onclick="likeVideossv(this, ${video.video_id}, ${video.designer_id});" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="${getCookie(`ssv_vl_${video.video_id}`) ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/heart-fill-2.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/heart-outline.svg'}"
                                    alt="Heart icon">
                                <p class="videoLikes-${video.video_id}">Like</p>
                            </button>
                            <button class="video-modal-askque-ssv" title="Ask Question" onclick="openAskquessv(this);" style="${ssv_brandCustomizations.ask_question == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/ask-question.svg"
                                    alt="Close icon">
                                <p>Question</p>
                            </button>                      
                            <button class="video-modal-pip-ssv" title="PIP Mode" onclick="playpipssv();" style="${ssv_brandCustomizations.pip_mode == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pip.svg"
                                    alt="PIP icon">
                            </button>                                             

                            <div class="video-modal-product-tile-ssv">
                                <div class="product-info-pt-ssv">
                                    <div class="product-image-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'display: block !important;' : ''}">
                                        <img alt="Product Image"
                                            src="${video.product[0].image}" />
                                    </div>
                                    <div class="product-detail-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'width: calc(100% - 75px) !important;' : ''}">
                                        <p>${video.product[0].title}</p>
                                        <section>${video.product[0].desription}</section>
                                        <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>₹${video.product[0].discount_price} <strike ${video.product[0].price > video.product[0].discount_price ? '' : 'style="display: none;"'}>₹${video.product[0].price}</strike>
                                            <span style="display: none;">35% OFF</span></label>
                                    </div>
                                </div>
                                <div class="product-buy-btn-pt-ssv">
                                    <button onclick="openProductssv(this);" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Buy Now
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/forward-arrow.svg"
                                            alt="Forward icon">
                                    </button>
                                </div>
                            </div>                    

                            <div class="video-modal-product-block-ssv">                                                             
                                <div class="product-top-pb-ssv">
                                    <img class="video-modal-pb-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/previous-arrow.svg"
                                        alt="Previous icon" onclick="closeProductssv(this);">                                                              
                                </div>
                                <div class="product-middle-pb-ssv">                            
                                    <div class="product-detail-pb-ssv">
                                        <div class="product-image-pb-ssv">
                                            <img alt="Product Image"
                                                src="${video.product[0].image}" />
                                        </div>
                                        <div class="product-detail-block-pb-ssv">
                                            <p>${video.product[0].title}</p>
                                            <section>${video.product[0].desription}</section>
                                            <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>₹${video.product[0].discount_price} <strike ${video.product[0].price > video.product[0].discount_price ? '' : 'style="display: none;"'}>₹${video.product[0].price}</strike>
                                                <span style="display: none;">35% OFF</span></label>
                                        </div>
                                    </div>                            
                                    <div class="product-desc-pb-ssv">
                                        <p>Product Details</p>
                                        <section>${video.product[0].desription}</section>
                                        <li>Material: Cotton Mul Mul</li>
                                        <li>Material: Cotton Mul Mul</li>
                                    </div>                                    
                                    <div class="product-quantity-pb-ssv" style="${ssv_storeType == '0' || ssv_brandCustomizations.product_qty == '0' ? 'display: none !important;' : ''}">
                                        <div class="product-quantity-title-pt-ssv">
                                            <p>Choose Quantity</p>
                                        </div>
                                        <div class="product-quantity-inp-pb-ssv">
                                            <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('minus', this);">-</button>
                                            <input class="quantity-inp-ssv" value="1" readonly></input>
                                            <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('plus', this);">+</button>
                                        </div>
                                    </div>
                                    <div class="product-rating-ssv prssv-${video.video_id}">
                                    </div>
                                    <div class="product-rating-all-ssv prassv-${video.video_id}">
                                    </div>
                                </div>
                                <div class="product-bottom-pb-ssv">
                                    <button class="product-addtocart-pb-ssv" onclick="addtocartssv(${video.video_id}, this); CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: calc(100% - 65px) !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</button>
                                    <a href="${video.product[0].url}" onclick="CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '1');">
                                        <button class="product-buynow-pb-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                                    </a>
                                    <a href="${ssv_store}/cart">
                                    <button class="product-cart-pb-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''}">
                                        <svg stroke="none" fill="none" stroke-width="0" viewBox="0 0 24 24" color="black" height="26" width="26" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 0, 0) !important;"><path fill="none" stroke="#000" stroke-width="2" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"></path></svg>
                                        <label class="cart-count-ssv" style="line-height: 20px !important; background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.dot_class ? '' : 'display: none !important;'}">
                                            ${ssv_brandCustomizations.dot_class && jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0 ? parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()) : ''}
                                        </label>
                                    </button>
                                    </a>
                                </div>
                            </div>                    

                            <div class="video-modal-share-modal-ssv">
                                <div class="video-modal-share-modal-top-ssv">
                                    <img class="video-modal-share-modal-close"
                                        src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/previous-arrow.svg"
                                        alt="Previous icon" onclick="closeSharessv(this);">
                                    <p>Share to</p>     
                                </div>                           
                                <a href="https://www.facebook.com/sharer/sharer.php?u=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" alt="Facebook icon" title="Share on Facebook"></a>
                                <a href="https://twitter.com/share?url=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" alt="Twitter icon" title="Share on Twitter"></a>
                                <a href="whatsapp://send?text=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" alt="Whatsapp icon" title="Share on Whatsapp"></a>
                                <a onclick="jQuery(this).next().click();"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" alt="Copy link icon" title="Copy Link"></a>                                
                                <input type="text" value="${ssv_store}?ssv=${window.btoa(video.video_id)}" style="display: none;" onclick="copyLinkssv(this);">
                            </div>      

                            <div class="video-modal-askque-modal-ssv">
                                <div class="video-modal-askque-modal-top-ssv">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/previous-arrow.svg"
                                        alt="Previous icon" onclick="closeAskquessv(this, true);">
                                    <p>Ask Question</p>     
                                </div>
                                <div class="askque-modal-form-ssv askque-modal-form1-ssv">
                                    <form onsubmit="return askQuestionssv(this, ${video.designer_id}, ${video.video_id});">
                                        <textarea name="question" rows="3" placeholder="Enter query here" required></textarea>                                
                                        <button class="askque-modal-btn-ssv askque-modal-btn1-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Send</button>                           
                                    </form>
                                </div>
                                <div class="askque-modal-form-ssv askque-modal-form2-ssv">
                                    <form onsubmit="return registerUserssv(this, ${video.video_id});">
                                        <input name="fullname" type="text" placeholder="Enter your name" style="margin-bottom: 8px !important;" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required />
                                        <input name="code" id="code${video.video_id}" type="hidden" value="91" />
                                        <input name="phone" id="phone${video.video_id}" type="text" style="margin: 0px !important;" placeholder="Enter your phone" pattern=".{10,10}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum 10 and maximim 10 digits." required />                                
                                        <button class="askque-modal-btn-ssv askque-modal-btn2-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Register</button>                           
                                    </form>
                                </div>                        
                            </div>

                            ${swipeupTooltip}

                            <p class="video-modal-alert-ssv"></p>
                        </div>
                    </div>
                `;

                i++;
            });

            // Slider on page
            jQuery(cPlaylist).html(!ssv_pip ? `
                <div class="swiper swiper-ssv-c swiper-ssv-c-${cPlaylistCode}">
                    <div class="swiper-wrapper">
                        ${onpageSlides}
                    </div>
                    <div class="swiper-button-next">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                    </div>
                    <div class="swiper-button-prev">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                    </div>
                </div>
            ` : '');

            // Swirl Overlay Modal
            jQuery('body').append(`
                <div class="swirl-short-videos" data-playlist="${cPlaylistCode}">
                    <style>
                        .video-progress-ssv progress::-webkit-progress-bar {
                            background-color: ${ssv_brandCustomizations.front_color_buy_btn};
                        }
                        
                        .video-progress-ssv progress::-webkit-progress-value {
                            background-color: ${ssv_brandCustomizations.bk_color_buy_btn};
                        }
                        
                        .video-progress-ssv progress::-moz-progress-bar {
                            background-color: ${ssv_brandCustomizations.bk_color_buy_btn};
                        }
                    </style>
                    <div class="video-modal-ssv video-modal-ssv-${cPlaylistCode}" style="display: none;">
                        <div class="video-modal-container-ssv">
                            <div class="swiper swiper-ssv-m swiper-ssv-m-${cPlaylistCode}">
                                <div class="swiper-wrapper">
                                    ${modalSlides}
                                </div>
                                <div class="swiper-button-next">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg"
                                        alt="Next icon">
                                </div>
                                <div class="swiper-button-prev">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg"
                                        alt="Previous icon">
                                </div>
                            </div>                    
                        </div>                    
                    </div>                    
                    <div class="modal-loader-ssv">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                            alt="Spinner">
                    </div>                    
                </div>
            `);

            // Post append activities
            videos.forEach(video => {
                // Ask question         
                jQuery(`#phone${video.video_id}`).intlTelInput({
                    initialCountry: "in",
                    separateDialCode: true,
                    // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
                }).on('countrychange', function () {
                    jQuery(`#code${video.video_id}`).val(jQuery(`#phone${video.video_id}`).intlTelInput("getSelectedCountryData").dialCode);
                });

                // Player registration [Gumlet]    
                var videoPlayer = document.getElementById(`modalVideossv-${video.video_id}`);
                var gumletInsights = gumlet.insights(ssv_gumletConfig);
                gumletInsights.registerHTML5Player(videoPlayer);

                // Player Load
                if (!ssv_pip) {
                    document.getElementById(`onpageVideossv-${video.video_id}`).load();
                }
                document.getElementById(`modalVideossv-${video.video_id}`).load();

                // Firebase events for all videos        
                ssv_fsdb.collection("swirlshortvideo_likes_" + video.designer_id).doc(video.video_id).onSnapshot((doc) => {
                    if (doc.exists) {
                        let likes = nFormatterssv(doc.data().unique_likes)
                        jQuery(`.videoLikes-${video.video_id}`).html(likes);
                        let elm = jQuery(`.videoLikes-${video.video_id}`).closest('.video-modal-video-container-ssv').find('.SWIRLhearts')[0];
                        SWIRLHeartFlawsssv(elm);
                        SWIRLHeartFlawsssv(elm);
                    }
                });

                // Append reviews
                if (ssv_storeType == '2' && video.product[0].brand_product_id && ssv_brandCustomizations.stamped === 1) {
                    var url = `https://stamped.io/api/widget/reviews?productId=${video.product[0].brand_product_id}&minRating&page&storeUrl=${ssv_brandCustomizations.store_url}&apiKey=${ssv_brandCustomizations.api_key}`
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            // console.log(JSON.parse(xhr.responseText));
                            let reviews = JSON.parse(xhr.responseText);
                            if (Object.keys(reviews.data).length > 0) {
                                let totalRating = 0;
                                reviews.data.forEach(r => {
                                    totalRating += r.reviewRating;
                                });
                                totalRating = totalRating ? Math.round(totalRating / (Object.keys(reviews.data).length)) : totalRating;

                                let rappend = Object.keys(reviews.data).length > 2 ? `
                                    <p class="product-rating-title-ssv">${totalRating} <i class="starssv"></i> (${(Object.keys(reviews.data).length)} reviews)
                                        <a class="product-rating-all-btn-ssv" onclick="openRatingssv(this);">See all</a>
                                    </p>
                                    <div class="product-rating-comments-ssv">
                                    ` : `
                                    <p class="product-rating-title-ssv">${totalRating} <i class="starssv"></i> (${(Object.keys(reviews.data).length)} reviews)</p>
                                    <div class="product-rating-comments-ssv">
                                `;

                                let cappend = `
                                    <div class="product-rating-all-title-ssv">
                                        <p>
                                            <img class="product-rating-all-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/previous-arrow.svg" alt="Previous icon" onclick="closeRatingssv(this);">
                                            ${totalRating} 
                                            <label class="bh-stars" data-bh-rating="${totalRating}">
                                                <svg version="1.1" class="bh-star bh-star--1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
                                                
                                                <svg version="1.1" class="bh-star bh-star--2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
                                                
                                                <svg version="1.1" class="bh-star bh-star--3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
                                                
                                                <svg version="1.1" class="bh-star bh-star--4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
                                                
                                                <svg version="1.1" class="bh-star bh-star--5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>                                        
                                            </label>
                                            (${(Object.keys(reviews.data).length)} reviews)                                    
                                        </p>
                                    </div>
                                    <div class="product-rating-all-comments-ssv">
                                `;

                                let cc = 0;
                                reviews.data.forEach(r => {
                                    cc++;
                                    if (cc <= 2) {
                                        rappend += `
                                            <div>
                                                <p>${r.author}</p>
                                                <section>${r.reviewMessage}</section>
                                            </div>
                                        `;
                                    }

                                    cappend += `
                                        <div>
                                            <p>${r.author}</p>
                                            <section>${r.reviewMessage}</section>
                                        </div>
                                    `;
                                });

                                rappend += `</div>`;

                                cappend += `</div>`;

                                jQuery(`.prssv-${video.video_id}`).append(rappend);
                                jQuery(`.prassv-${video.video_id}`).append(cappend);
                            }
                        }
                    }

                    xhr.send();
                }
            });

            if (!ssv_pip) {
                // Initialize Swiper C    
                ssv_swiper[cPlaylistCode] = new Swiper(`.swiper-ssv-c-${cPlaylistCode}`, {
                    slidesPerView: 5,
                    direction: 'horizontal',
                    spaceBetween: 15,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                    centerInsufficientSlides: true,
                    breakpoints: {
                        320: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 5,
                        }
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
            }

            // Initialize Swiper M    
            ssv_swiper_modal[cPlaylistCode] = new Swiper(`.swiper-ssv-m-${cPlaylistCode}`, {
                direction: "vertical",
                clickable: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        direction: "horizontal",
                    },
                },
                on: {
                    init: function () {
                        // Open PIP if found
                        if (ssv_pip) {
                            playpipssv();
                        }

                        // Open Modal if shared link found                
                        const urlSearchParams = new URLSearchParams(window.location.search);
                        const params = Object.fromEntries(urlSearchParams.entries());
                        if (typeof params['ssv'] != 'undefined') {
                            let videoId = window.atob(params['ssv']);
                            setTimeout(() => {
                                jQuery(`.ms-${videoId}`).click();
                            }, 1000);
                        }
                    },
                }
            });

            // Init swiper M movement    
            ssv_swiper_modal[cPlaylistCode].on('slideChange', function () {
                let slideno = ssv_swiper_modal[cPlaylistCode].activeIndex;
                let videoPlayer = jQuery(`.swiper-ssv-m-${cPlaylistCode} .swiper-slide`).eq(slideno).find('video')[0];

                // Open loader
                videoloaderssv(true);
                // videoPlayer.load();
                videoPlayer.onloadstart = playWithPromisessv(videoPlayer);
            });

            // generate hover event 
            if (ssv_brandCustomizations.auto_play_video == '1') {
                jQuery(`.swiper-ssv-c-${cPlaylistCode} .swiper-slide`).hover(function () {
                    jQuery(`.swiper-ssv-c-${cPlaylistCode} .swiper-slide video`).each(function () {
                        jQuery(this)[0].pause();
                    });

                    let player = jQuery(this).find('video')[0];
                    let playPromise = player.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                        }).catch(error => {
                        });
                    }
                });
            }

        });

        // add PIP
        jQuery('#swirl-short-videos').append(`
            <div class="video-pip-ssv">
                <video loop playsinline="" preload="none" data-setup="{}" onplay="jQuery(this).next().hide()" onmouseover="showPipControls();"                   
                    poster="https://swirl-assets.s3.ap-south-1.amazonaws.com/video/image/1673331184_Graphic-Oversized-Tees.jpg">
                    <source src="" type="video/mp4">
                </video>
                <div class="video-pip-video-loader-ssv">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                        alt="Spinner">
                </div>
                <button class="video-pip-playpause-ssv" title="Play/Pause" onclick="playpausepipssv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg"
                        alt="Play/Pause icon" />
                </button>                            
                <button class="video-pip-volume-ssv" title="Mute/Unmute" onclick="volumepipssv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg"
                        alt="Volume icon">                    
                </button>
                <button class="video-pip-close-ssv" title="Close" onclick="closepipssv();" style="background: rgb(0, 0, 0, .6) !important;">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/close.svg"
                        alt="Close icon">
                </button>
                <button class="video-pip-fullscreen-ssv" title="Full Screen" onclick="fullscreenpipssv();" style="border: 2.5px solid #fff !important;">
                </button>
            </div>

            <a href="/?add-to-cart=" data-quantity="1" data-product_id="" class="ajax-add-to-cart-ssv ${ssv_brandCustomizations.ajax_cart_class}" style="display: none;"></a>
        `)
    } else {
        console.log('SSV Absent');
    }
}

function loaderssv(swtch) {
    if (swtch) {
        jQuery('.modal-loader-ssv').css('display', 'flex');
    } else {
        jQuery('.modal-loader-ssv').css('display', 'none');
    }
}

function playssv(slideno, playlist) {
    // set current slide
    ssv_swiper_modal[playlist].slideTo(slideno);

    // Close PIP
    closepipssv();

    // get video player
    let videoPlayer = jQuery(`.swiper-ssv-m-${playlist} .swiper-slide`).eq(slideno).find('video')[0];

    // Open loader
    videoloaderssv(true);
    // videoPlayer.load();
    videoPlayer.onloadstart = playWithPromisessv(videoPlayer);

    // open modal
    loaderssv(true);
    setTimeout(() => {
        jQuery(`.video-modal-ssv-${playlist}`).show();
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
    let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute2.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg';
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
    if (jQuery(btn).parent('.video-modal-video-container-ssv').find('video').prop('muted')) {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg');
        jQuery(btn).children('p').html('Unmute');
        jQuery(btn).parent('.video-modal-video-container-ssv').find('video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute2.svg');
        jQuery(btn).children('p').html('Mute');
        jQuery(btn).parent('.video-modal-video-container-ssv').find('video').prop('muted', true);

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

    ssv_swiper_modal.allowSlideNext = false;
    ssv_swiper_modal.allowSlidePrev = false;
    ssv_swiper_modal.allowTouchMove = false;
}

function closeProductssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');

    ssv_swiper_modal.allowSlideNext = true;
    ssv_swiper_modal.allowSlidePrev = true;
    ssv_swiper_modal.allowTouchMove = true;
}

function setPopupHightssv() {
    let currentHeight = window.innerHeight;
    jQuery('.video-modal-ssv').height(currentHeight);
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
}

function closeSharessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-share-modal-ssv').css('transform', 'translateY(110%)');
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
function playpipssv() {
    let video = localStorage.getItem('_ssv_pip') ? atob(localStorage.getItem('_ssv_pip')) : '';
    let poster = localStorage.getItem('_ssv_pip_t') ? atob(localStorage.getItem('_ssv_pip_t')) : '';

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
        let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute2.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg';
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
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute2.svg');
        jQuery('.video-pip-ssv video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute2.svg');
        jQuery('.video-pip-ssv video').prop('muted', true);

        ssv_globalMute = true;
    }
}

function fullscreenpipssv(btn) {
    let video = jQuery('.video-pip-ssv video source').attr('src');
    let slideNo = jQuery('.swiper-ssv-m video source[src="' + video + '"]').closest('.swiper-slide').index();
    let playlist = jQuery('.swiper-ssv-m video source[src="' + video + '"]').closest('.swirl-short-videos').data('playlist');

    closepipssv();
    playssv(slideNo, playlist);
}

function addtocartssv(videoId, btn) {
    let productId = ssv_productIds[videoId];
    let quantity = parseInt(jQuery(btn).closest('.video-modal-video-container-ssv').find('.quantity-inp-ssv').val());

    jQuery(btn).attr('disabled', 'disabled');
    jQuery(btn).html('Adding..');

    if (ssv_storeType == '1') {  // Shopify        
        jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            dataType: 'json',
            data: {
                items: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            }
        }
        ).done(function (response) {
            jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
            jQuery(btn).removeAttr('disabled');

            jQuery('.quantity-inp-ssv').val('1');

            // Alert
            videoAlertssv('Added to cart!', 2000);
        });
    } if (ssv_storeType == '2') {  // Woo commerse
        if (ssv_brandCustomizations.ajax_cart_class == '') {
            if ('undefined' === typeof wc_add_to_cart_params) {
                // The add to cart params are not present.
                return false;
            }

            var data = {
                product_id: productId,
                quantity: quantity,
            };

            jQuery.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), data, function (response) {
                if (!response) {
                    console.log('Something went wrong on add to cart.')
                    return;
                }

                // This redirects the user to the product url if for example options are needed ( in a variable product ).
                // You can remove this if it's not the case.
                if (response.error && response.product_url) {
                    // window.location = response.product_url;
                    videoAlertssv("Product out of stock.", 2000);
                } else {
                    // window.location = wc_add_to_cart_params.cart_url;                    
                    videoAlertssv("Added to cart.", 2000);

                    // This is important so your theme gets a chance to update the cart quantity for example, but can be removed if not needed.
                    jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash]);

                    // Cart count
                    if (ssv_brandCustomizations.dot_class) {
                        if (jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0) {
                            jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()));
                        }
                    }
                }

                jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                jQuery(btn).removeAttr('disabled');
                jQuery('.quantity-inp-ssv').val('1');
                return
            });
        } else {
            jQuery('.ajax-add-to-cart-ssv').attr('data-quantity', quantity);
            jQuery('.ajax-add-to-cart-ssv').attr('data-product_id', productId);
            jQuery('.ajax-add-to-cart-ssv').attr('href', '/?add-to-cart=' + productId);
            jQuery('.ajax-add-to-cart-ssv').click();

            setTimeout(() => {
                jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                jQuery(btn).removeAttr('disabled');
                jQuery('.quantity-inp-ssv').val('1');

                // Cart count
                if (ssv_brandCustomizations.dot_class) {
                    if (jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0) {
                        jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()));
                    }
                }
            }, 1000);
        }
    }
}

function openAskquessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv').css('transform', 'translateY(0%)');
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
        }, 500);
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
        videoloaderssv(true);
        ssv_fsdb.collection("swirlshortvideo_askquestion_" + designerId).doc(`${videoId}`).collection('queries').add({
            user_name: ssv_userData.user_name,
            user_phone_code: ssv_userData.user_phone_code,
            user_phone: ssv_userData.user_phone,
            video_id: videoId,
            designer_id: designerId,
            message: question,
            created_at: Math.round((new Date().getTime() / 1000))
        }).then(function () {
            videoAlertssv('Your query is submitted.<br> Thank you!', 3000);
            setTimeout(() => {
                closeAskquessv(form);
            }, 1000);
            videoloaderssv(false);
        }).catch((error) => {
            videoAlertssv('Failed! Try again.', 2000);
            videoloaderssv(false);
        });
    } else {
        askQuestionStepssv(form, 2);
    }

    return false;
}

function registerUserssv(form) {
    let formData = jQuery(form).serializeArray();

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
    ssv_fsdb.collection("swirlshortvideo_cta_" + dId).doc(`${vId}`).collection('clicks').add({
        user_name: ssv_userData ? ssv_userData.user_name : '',
        user_phone_code: ssv_userData ? ssv_userData.user_phone_code : '',
        user_phone: ssv_userData ? ssv_userData.user_phone : '',
        video_id: vId,
        product_id: pId,
        product_title: pTitle,
        product_image: pImage,
        product_url: pURL,
        designer_id: dId,
        cta_type: cType,
        created_at: Math.round((new Date().getTime() / 1000))
    }).then(function () {
    }).catch((error) => {
        console.log('SWIRL CTA Track failed!');
    });
}

function closeAllpopupsssv() {
    // Ask questions
    jQuery('.askque-modal-form-ssv').hide();
    jQuery('.askque-modal-form1-ssv').show();
    jQuery('.video-modal-askque-modal-ssv').css('transform', 'translateY(110%)');

    // Share
    jQuery('.video-modal-share-modal-ssv').css('transform', 'translateY(110%)');

    jQuery('.quantity-inp-ssv').val('1');

    // Product block on phone 
    // if (window.innerWidth <= 768) {
    //     jQuery('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');
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

addEventListener('keydown', function (event) {
    if (event.key === "Escape" && jQuery('.video-modal-ssv').is(":visible")) {
        closessv();
    } else if (event.keyCode == 37 && jQuery('.video-modal-ssv').is(":visible")) {
        let vModal = jQuery('.video-modal-ssv:visible');
        jQuery(vModal).find('.swiper-button-prev').click(); //on left arrow
    } else if (event.keyCode == 39 && jQuery('.video-modal-ssv').is(":visible")) {
        let vModal = jQuery('.video-modal-ssv:visible');
        jQuery(vModal).find('.swiper-button-next').click();; //on right arrow
    }
});

addEventListener('resize', (event) => {
    setPopupHightssv();
});