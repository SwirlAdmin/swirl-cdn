//v12 - New design with new swiping up-down + Multiple Product + No Product + Multiple Page + PDP PIP (v10 Upgrade) [Reels] feature

// Global Defines
let ssv_mode = 'Live'; // Test, Live
let ssv_globalMute = true;
let ssv_pip = false;
let ssv_brandCustomizations = [];
let ssv_store = '';
let ssv_storeCode = '';
let ssv_storePlaylist = '';
let ssv_baseURL = ssv_mode === 'Live' ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/magneto/v10/style-v4.min.css' : '';
let ssv_responseData = [];
let ssv_productIds = [];
let ssv_apiURL = 'https://api.goswirl.live/index.php/ShortVideo/videolistingV4'; // bigleap.live  ,  api.goswirl.live
let ssv_pdpapiURL = 'https://api.goswirl.live/index.php/ShortVideo/getmultiple_productvideo'; // bigleap.live  ,  api.goswirl.live
let ssv_pdppip = false;
let ssv_pdppipHideOnscreen = false;
let ssv_swiper = [];
let ssv_swiper_modal = [];
let ssv_videoPlayCounter = 0;
let ssv_userData = null;
let ssv_fsdb = [];
let ssv_gumletConfig = {
    property_id: 'jYfkUIVL', // required:  please replace with correct property id.
};

require([
    'jquery',
    'swirlswiper',
    '@firebase/app',
    '@firebase/app-compat',
    '@firebase/auth-compat',
    '@firebase/firestore-compat',
    'jquery/ui',
    'domReady!'],
    function ($, Swiper, app, firebase, auth, firestore) {
        $(document).ready(function () {
            // Append JS / CSS 
            var jqTag = '';

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

                    // Inits
                    ssv_store = window.location.href.split('?')[0];
                    ssv_store = ssv_store.split('#')[0];
                    let currentURL = window.location.href.split('?')[0];
                    if (document.querySelector('#swirl-short-videos') != null) {
                        ssv_storeCode = jQuery('#swirl-short-videos').data('code');
                        ssv_storePlaylist = jQuery('#swirl-short-videos').data('playlist');

                        localStorage.setItem('_ssv_storecode', ssv_storeCode);
                        localStorage.setItem('_ssv_storeplaylist', ssv_storePlaylist);

                        // PDP or Normal            
                        jQuery('#swirl-short-videos').data('pdp').split(',').forEach(uVal => {
                            if (currentURL.includes(uVal) || uVal == '/home') ssv_pdppip = true;
                        });
                        if (jQuery('#swirl-short-videos').data('pdp').includes('/home')) currentURL = currentURL.charAt(currentURL.length - 1) == '/' ? currentURL + 'home' : currentURL + '/home';
                    } else {
                        ssv_pip = true;
                        ssv_storeCode = localStorage.getItem('_ssv_storecode');
                        ssv_storePlaylist = localStorage.getItem('_ssv_storeplaylist');
                    }

                    // Logged user
                    if (localStorage.getItem('_ssv_user')) {
                        ssv_userData = JSON.parse(localStorage.getItem('_ssv_user'));
                    }

                    let finalAPICall = ssv_pdppip ? ssv_pdpapiURL : ssv_apiURL;

                    // fecth videos
                    if (ssv_pdppip || ssv_storePlaylist) {
                        jQuery.ajax({
                            type: "GET",
                            dataType: "json",
                            url: finalAPICall,
                            data: {
                                user: ssv_storeCode,
                                playlist: ssv_storePlaylist,
                                url: currentURL
                            },
                            success: function (data) {
                                // console.log(data);

                                if (Object.keys(data.swilrs).length > 0 && Object.keys(data.swilrs.video).length > 0) {
                                    ssv_responseData = data;
                                    if (!ssv_pdppip) localStorage.setItem('_ssv_storeResponseData', JSON.stringify(ssv_responseData));
                                    ssv_brandCustomizations = ssv_responseData.swilrs.data;
                                    ssv_globalMute = ssv_brandCustomizations.auto_play_mute_un === "1" ? true : false;

                                    // PDP PIP
                                    ssv_brandCustomizations.pdppip_hidecarousel = ssv_brandCustomizations.pdppip_hidecarousel == 1 ? true : false;
                                    ssv_pdppipHideOnscreen = ssv_pdppip ? ssv_brandCustomizations.pdppip_hidecarousel : ssv_pdppipHideOnscreen;

                                    // generate SSV
                                    // firebase.initializeApp({
                                    //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                                    //     authDomain: 'swirl-short-vido.firebaseapp.com',
                                    //     projectId: 'swirl-short-vido',
                                    //     storageBucket: 'swirl-short-vido.appspot.com'
                                    // });
                                    // ssv_fsdb = firebase.firestore();

                                    generatessv(ssv_responseData.swilrs.video);

                                    // check user cookie
                                    if (getCookie('ssv_user')) {
                                        setCookie('ssv_user', (parseInt(getCookie('ssv_user')) + 1), 365);
                                    } else {
                                        setCookie('ssv_user', 1, 365);
                                    }
                                } else if (localStorage.getItem('_ssv_storeResponseData') && localStorage.getItem('_ssv_pip') && ssv_pdppip) {
                                    ssv_pip = true, ssv_pdppip = false;
                                    ssv_responseData = JSON.parse(localStorage.getItem('_ssv_storeResponseData'));
                                    ssv_brandCustomizations = ssv_responseData.swilrs.data;
                                    ssv_globalMute = ssv_brandCustomizations.auto_play_mute_un === "1" ? true : false;
                                    // generate SSV
                                    // firebase.initializeApp({
                                    //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                                    //     authDomain: 'swirl-short-vido.firebaseapp.com',
                                    //     projectId: 'swirl-short-vido',
                                    //     storageBucket: 'swirl-short-vido.appspot.com'
                                    // });
                                    // ssv_fsdb = firebase.firestore();

                                    generatessv(ssv_responseData.swilrs.video);

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
                    } else {
                        console.log('SSV Absent!');
                    }
                } else { // Not present
                    console.log('SSV Absent!')
                }
            }

            // function getHandle(url) {
            //     let handle = url ? url.split('?')[0] : '';
            //     handle = handle ? handle.split('#')[0] : '';
            //     handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

            //     return handle;
            // }

            function generatessv(videos) {
                let onpageSlides = '';
                let modalSlides = '';
                let swipeupTooltip = parseInt(getCookie('ssv_user')) <= 1 ? '<img class="video-modal-swipe-up-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirper-up.gif" alt="Tool Tip Swipe Up" />' : '';
                swipeupTooltip = '';
                let i = 0;

                videos.forEach(video => {
                    // ${ssv_brandCustomizations.time_sec === '1' ? 'onloadeddata="updateDurationssv(this);" ontimeupdate="updateProgressDurationssv(this);"' : ''}
                    if (!ssv_pip && !ssv_pdppipHideOnscreen) {
                        let outerProduct = typeof video.product[0] != 'undefined' ? `
                            <div class="product-on-carousel-ssv" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="display: none !important;"' : ''}>                                    
                                <img src="${video.product[0].image}" alt="Product Image">                                        
                                
                                <h6 style="${video.product.length > 1 ? '' : 'display: none !important;'} background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">${video.product.length}</h6>
                                <p>${video.product[0].title}</p>
                                <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${video.product[0].currencysymbols}${video.product[0].discount_price} <strike ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${video.product[0].currencysymbols}${video.product[0].price}</strike>
                                    <br><span ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}% OFF</span></label>
                            </div>
                        ` : `
                            <div class="product-on-carousel-ssv" ${ssv_brandCustomizations.product_blog_img == '0' || typeof video.product[0] == 'undefined' ? 'style="display: none !important;"' : ''}></div>
                        `;

                        let autoplayVideo = video.cover_video ? video.cover_video : video.video_url;
                        autoplayVideo = i < 5 && ssv_brandCustomizations['auto_play'] === '1' ? autoplayVideo : '';

                        onpageSlides += `
                            <div class="swiper-slide ms-${video.video_id}" onclick="playssv(${i})">
                                <video id="onpageVideossv-${video.video_id}" ${ssv_brandCustomizations.product_blog_img == '0' || typeof video.product[0] == 'undefined' ? 'style="margin-bottom: 0 !important;"' : ''} class="carousel-video-ssv" poster="${video.cover_image}" ${ssv_brandCustomizations['auto_play'] === '1' && i < 5 ? 'autoplay' : ''} loop onplay="jQuery(this).next().hide();" onpause="jQuery(this).next().show();" playsinline="" preload="metadata" data-setup="{}" muted>
                                    <source src="${autoplayVideo}" type="video/mp4">
                                </video>
                                <img ${ssv_brandCustomizations.product_blog_img == '0' || typeof video.product[0] == 'undefined' ? 'style="top: calc(50% - 20px) !important;"' : ''} class="carousel-video-play-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp"
                                    alt="Play icon" />  
                                <div class="video-views-count-top-ssv" ${ssv_brandCustomizations.views === '0' ? 'style="display: none !important;"' : ''}>
                                    <p><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/views-icon.webp" alt="Views icon" height="" width="">
                                        ${video.total_views}
                                    </p>                            
                                </div>   
                                <div class="video-timer-top-ssv" ${ssv_brandCustomizations.time_sec === '0' ? 'style="display: none !important;"' : ''}>
                                    <p>${video.video_len ? secondsToHms(video.video_len) : '00:00'}</p>
                                </div> 
                                ${outerProduct}          
                            </div>
                        `;
                    }

                    var productList = '';
                    var productTile = '';
                    var buynowBtn = '';
                    if (typeof video.product[0] != 'undefined') {
                        if (Object.keys(video.product).length > 1) {
                            var pl = '';
                            var pb = '';
                            var pi = 0;

                            video.product.forEach(product => {
                                pi++;

                                // Product IDs for addtocart
                                ssv_productIds[product.product_id] = product.brand_product_id;

                                let desc = ssv_brandCustomizations.cta_on_tile == '0' ? `<section>${product.desription}</section>` : '';
                                let cta = ssv_brandCustomizations.cta_on_tile == '1' ? `
                                    <div class="ontile-cta-ssv">
                                        <a class="ontile-addtocart-ssv" onclick="addtocartssv(${video.video_id}, ${product.product_id}, '${product.sku_code}', this, 1); CTAClicksssv(${product.product_id}, '${product.title}', '${product.image}', '${product.url}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: 100% !important; margin-right: 0 !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</a>
                                        <a class="ontile-buynow-ssv" href="${product.url}" onclick="CTAClicksssv(${product.product_id}, '${product.title}', '${product.image}', '${product.url}', ${video.designer_id}, ${video.video_id}, '1');" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important;' : ''}">
                                            ${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}
                                        </a>
                                    </div>
                                ` : '';

                                productTile += `
                                    <div class="swiper-slide-pt">                        
                                        <div class="video-modal-product-tile-ssv" onclick="openListProductssv(event, this, ${pi});">
                                            <div class="product-info-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' || ssv_brandCustomizations.cta_on_tile == '1' ? 'width: 100% !important;' : ''}">
                                                <div class="product-image-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'display: block !important;' : ''}">
                                                    <img alt="Product Image"
                                                        src="${product.image}" />
                                                </div>
                                                <div class="product-detail-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'width: calc(100% - 75px) !important;' : ''}">
                                                    <p>${product.title}</p>
                                                    ${desc}
                                                    <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${product.currencysymbols}${product.discount_price} <strike ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${product.currencysymbols}${product.price}</strike>
                                                        <span ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${parseFloat(product.price) > parseFloat(product.discount_price) ? Math.round(((product.price - product.discount_price) * 100) / product.price) : ''}% OFF</span></label>
                                                    ${cta}
                                                </div>
                                            </div>
                                            <div class="product-buy-btn-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' || ssv_brandCustomizations.cta_on_tile == '1' ? 'display: none !important;' : ''}">
                                                <button style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">
                                                    ${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}
                                                    <img style="display: none !important;" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/forward-arrow.webp"
                                                        alt="Forward icon">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `;

                                pl += `
                                    <div class="product-list-block-ssv" onclick="openListProductssv(event, this, ${pi});">
                                        <div class="product-list-block-image-ssv">
                                            <img alt="Product Image" src="${product.image}">
                                        </div>
                                        <div class="product-list-block-detail-ssv">
                                            <p>${product.title}</p>
                                            ${desc}
                                            <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${product.currencysymbols}${product.discount_price} <strike ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${product.currencysymbols}${product.price}</strike>
                                                <span ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${parseFloat(product.price) > parseFloat(product.discount_price) ? Math.round(((product.price - product.discount_price) * 100) / product.price) : ''}% OFF</span></label>
                                            ${cta}
                                        </div>
                                        <div class="product-list-block-open-ssv">
                                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp" alt="Previous icon">
                                        </div>
                                    </div>
                                `;

                                pb += `
                                    <div class="video-modal-product-block-product-ssv video-modal-product-block-product-multi-ssv" style="transform: translateX(110%);">
                                        <div class="product-top-pb-ssv product-top-pb-multi-ssv" onclick="closeListProductssv(this);">
                                            <img class="video-modal-pb-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                                alt="Previous icon">                                                              
                                        </div>
                                        <div class="product-middle-pb-ssv">                            
                                            <div class="product-detail-pb-ssv">
                                                <div class="product-image-pb-ssv">
                                                    <img alt="Product Image"
                                                        src="${product.image}" />
                                                </div>
                                                <div class="product-detail-block-pb-ssv">
                                                    <p>${product.title}</p>
                                                    <section>${product.desription}</section>
                                                    <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${product.currencysymbols}${product.discount_price} <strike ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${product.currencysymbols}${product.price}</strike>
                                                        <span ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${parseFloat(product.price) > parseFloat(product.discount_price) ? Math.round(((product.price - product.discount_price) * 100) / product.price) : ''}% OFF</span></label>
                                                </div>
                                            </div>                            
                                            <div class="product-desc-pb-ssv">
                                                <p>Product Details</p>
                                                <section>${product.desription}</section>
                                                <li>Points</li>                                    
                                            </div>                                    
                                            <div class="product-quantity-pb-ssv" style="${ssv_brandCustomizations.product_qty == '0' ? 'display: none !important;' : ''}">
                                                <div class="product-quantity-title-pt-ssv">
                                                    <p>Choose Quantity</p>
                                                </div>
                                                <div class="product-quantity-inp-pb-ssv">
                                                    <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('minus', this);">-</button>
                                                    <input class="quantity-inp-ssv" value="1" readonly></input>
                                                    <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('plus', this);">+</button>
                                                </div>
                                            </div>
                                            <div class="product-rating-ssv prssv-${video.video_id}-${product.product_id}">
                                            </div>
                                            <div class="product-rating-all-ssv prassv-${video.video_id}-${product.product_id}">
                                            </div>
                                        </div>
                                        <div class="product-bottom-pb-ssv">
                                            <button class="product-addtocart-pb-ssv" onclick="addtocartssv(${video.video_id}, ${product.product_id}, '${product.sku_code}', this); CTAClicksssv(${product.product_id}, '${product.title}', '${product.image}', '${product.url}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: calc(100% - 65px) !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</button>
                                            <a href="${product.url}" onclick="CTAClicksssv(${product.product_id}, '${product.title}', '${product.image}', '${product.url}', ${video.designer_id}, ${video.video_id}, '1');">
                                                <button class="product-buynow-pb-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                                            </a>
                                            <a href="${window.location.origin}/${ssv_brandCustomizations.cust_cart_redirection_link}">
                                            <button class="product-cart-pb-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' || ssv_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">
                                                <svg stroke="none" fill="none" stroke-width="0" viewBox="0 0 24 24" color="black" height="26" width="26" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 0, 0) !important;"><path fill="none" stroke="#000" stroke-width="2" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"></path></svg>
                                                <label class="cart-count-ssv" style="line-height: 20px !important; background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">0</label>
                                            </button>
                                            </a>
                                        </div>
                                    </div>
                                `;
                            });
                            productList = `
                                <div class="video-modal-product-block-list-ssv">
                                    ${pl}
                                </div>
                                ${pb}
                            `;

                            productTile = `
                                <div class="swiper swiper-ssv-pt swiper-ssv-pt-${video.video_id}">
                                    <div class="swiper-wrapper">
                                        ${productTile}
                                    </div>
                                    <div class="sw-button-next">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp" height="" width="" alt="Next icon">
                                    </div>
                                    <div class="sw-button-prev">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp" height="" width="" alt="Previous icon">
                                    </div>
                                </div>
                            `;
                        } else {
                            // Product IDs for addtocart
                            ssv_productIds[video.product[0].product_id] = video.product[0].brand_product_id;

                            let desc = ssv_brandCustomizations.cta_on_tile == '0' ? `<section>${video.product[0].desription}</section>` : '';
                            let cta = ssv_brandCustomizations.cta_on_tile == '1' ? `
                                <div class="ontile-cta-ssv">
                                    <a class="ontile-addtocart-ssv" onclick="addtocartssv(${video.video_id}, ${video.product[0].product_id}, '${video.product[0].sku_code}', this, 1); CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: 100% !important; margin-right: 0 !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</a>
                                    <a class="ontile-buynow-ssv" href="${video.product[0].url}" onclick="CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '1');" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important;' : ''}">
                                        ${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}
                                    </a>
                                </div>
                            ` : '';

                            productTile = `
                                <div class="video-modal-product-tile-ssv" onclick="openProductssv(event, this);">
                                    <div class="product-info-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' || ssv_brandCustomizations.cta_on_tile == '1' ? 'width: 100% !important;' : ''}">
                                        <div class="product-image-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'display: block !important;' : ''}">
                                            <img alt="Product Image"
                                                src="${video.product[0].image}" />
                                        </div>
                                        <div class="product-detail-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'width: calc(100% - 75px) !important;' : ''}">
                                            <p>${video.product[0].title}</p>
                                            ${desc}
                                            <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${video.product[0].currencysymbols}${video.product[0].discount_price} <strike ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${video.product[0].currencysymbols}${video.product[0].price}</strike>
                                                <span ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}% OFF</span></label>
                                            ${cta}
                                        </div>
                                    </div>
                                    <div class="product-buy-btn-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' || ssv_brandCustomizations.cta_on_tile == '1' ? 'display: none !important;' : ''}">
                                        <button style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">
                                            ${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}
                                            <img style="display: none !important;" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/forward-arrow.webp"
                                                alt="Forward icon">
                                        </button>
                                    </div>
                                </div>
                            `;

                            productList = `
                                <div class="video-modal-product-block-product-ssv">
                                    <div class="product-top-pb-ssv" onclick="closeProductssv(this);">
                                        <img class="video-modal-pb-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                            alt="Previous icon">                                                              
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
                                                <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${video.product[0].currencysymbols}${video.product[0].discount_price} <strike ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${video.product[0].currencysymbols}${video.product[0].price}</strike>
                                                    <span ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}% OFF</span></label>
                                            </div>
                                        </div>                            
                                        <div class="product-desc-pb-ssv">
                                            <p>Product Details</p>
                                            <section>${video.product[0].desription}</section>                                            
                                        </div>                                    
                                        <div class="product-quantity-pb-ssv" style="${ssv_brandCustomizations.product_qty == '0' ? 'display: none !important;' : ''}">
                                            <div class="product-quantity-title-pt-ssv">
                                                <p>Choose Quantity</p>
                                            </div>
                                            <div class="product-quantity-inp-pb-ssv">
                                                <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('minus', this);">-</button>
                                                <input class="quantity-inp-ssv" value="1" readonly></input>
                                                <button style="background: #eaeaea !important; color: #323232 !important;" onclick="changeQtyssv('plus', this);">+</button>
                                            </div>
                                        </div>
                                        <div class="product-rating-ssv prssv-${video.video_id}-${video.product[0].product_id}">
                                        </div>
                                        <div class="product-rating-all-ssv prassv-${video.video_id}-${video.product[0].product_id}">
                                        </div>
                                    </div>
                                    <div class="product-bottom-pb-ssv">
                                        <button class="product-addtocart-pb-ssv" onclick="addtocartssv(${video.video_id}, ${video.product[0].product_id}, '${video.product[0].sku_code}', this); CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: calc(100% - 65px) !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</button>
                                        <a href="${video.product[0].url}" onclick="CTAClicksssv(${video.product[0].product_id}, '${video.product[0].title}', '${video.product[0].image}', '${video.product[0].url}', ${video.designer_id}, ${video.video_id}, '1');">
                                            <button class="product-buynow-pb-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                                        </a>
                                        <a href="${window.location.origin}/${ssv_brandCustomizations.cust_cart_redirection_link}">
                                        <button class="product-cart-pb-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' || ssv_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">
                                            <svg stroke="none" fill="none" stroke-width="0" viewBox="0 0 24 24" color="black" height="26" width="26" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 0, 0) !important;"><path fill="none" stroke="#000" stroke-width="2" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"></path></svg>
                                            <label class="cart-count-ssv" style="line-height: 20px !important; background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">0</label>
                                        </button>
                                        </a>
                                    </div>
                                </div>
                            `;
                        }
                    } else {
                        buynowBtn = video.product_link && ssv_brandCustomizations.buy_now == '1' ? `
                            <a href="${video.product_link}">
                                <button class="video-redirect-btn-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                            </a>
                        ` : '';
                    }

                    modalSlides += `
                        <div class="swiper-slide ${typeof video.product[0] == 'undefined' ? 'no-product-ssv' : ''} ${buynowBtn ? 'video-redirect-on-ssv' : ''}">
                            <div class="video-modal-video-container-ssv">
                                <div class="video-modal-fade-ssv" onclick="closeAnyPopupssv();"></div>
                                <video id="modalVideossv-${video.video_id}" loop playsinline="" data-setup="{}" onplay="jQuery(this).next().hide()"
                                    onmouseover="showControlsssv(this);" onclick="showPhoneControlsssv(this);"
                                    ontimeupdate="updateProgressbarssv(this)"
                                    poster="${video.cover_image}">
                                    <source src="" data-src="${video.video_url}" type="video/mp4">
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
                                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp"
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
                                <button class="video-modal-close-ssv" title="Close" onclick="closessv();" style="background: rgb(0, 0, 0, .6) !important;">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                                        alt="Close icon">
                                </button>                    
                                <button class="video-modal-pip-ssv" title="PIP Mode" onclick="playpipssv();" style="${ssv_brandCustomizations.pip_mode == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pip.webp"
                                        alt="PIP icon">
                                </button>                                             
                                <div class="video-modal-actions-ssv">                                           
                                    <div class="SWIRLhearts"></div>                
                                    <button class="video-modal-like-ssv" title="Like" onclick="likeVideossv(this, ${video.video_id}, ${video.designer_id});" style="background: rgb(0, 0, 0, .6) !important;">
                                        <img src="${getCookie(`ssv_vl_${video.video_id}`) ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/heart-fill-2.webp' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/heart-outline.webp'}"
                                            alt="Heart icon">
                                        <p class="videoLikes-${video.video_id}">Like</p>
                                    </button>  
                                    <button class="video-modal-download-ssv" title="Download Video" onclick="downloadVideossv('${video.video_url}')" style="background: rgb(0, 0, 0, .6) !important;">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/download.webp"
                                            alt="Download icon">
                                        <p>Download</p>
                                    </button>
                                    <button class="video-modal-askque-ssv" title="Ask Question" onclick="openAskquessv(this);" style="${ssv_brandCustomizations.ask_question == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/ask-question.webp"
                                            alt="Close icon">
                                        <p>Question</p>
                                    </button>     
                                    <button class="video-modal-volume-ssv" title="Mute/Unmute" onclick="volumessv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                                            alt="Volume icon">
                                        <p>Mute</p>
                                    </button>
                                    <button class="video-modal-share-ssv" title="Share" onclick="openSharessv(this);" style="background: rgb(0, 0, 0, .6) !important;">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/share-icon.webp"
                                            alt="Close icon">
                                        <p>Share</p>
                                    </button> 
                                </div>                      
            
                                <div class="video-modal-product-tile-carousel-ssv">
                                    ${productTile}
                                </div>                                                                            
            
                                <div class="video-modal-product-block-ssv">        
                                    <div class="video-modal-product-block-inner-ssv">                                                           
                                        ${productList}                            
                                    </div>
                                </div>    
                                
                                ${buynowBtn}
            
                                <div class="video-modal-share-modal-ssv">
                                    <div class="video-modal-share-modal-top-ssv">
                                        <img class="video-modal-share-modal-close"
                                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                            alt="Previous icon" onclick="closeSharessv(this);">
                                        <p>Share to</p>     
                                    </div>                           
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/facebook.webp" alt="Facebook icon" title="Share on Facebook"></a>
                                    <a href="https://twitter.com/share?url=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/twitter.webp" alt="Twitter icon" title="Share on Twitter"></a>
                                    <a href="https://api.whatsapp.com/send?text=${ssv_store}?ssv=${window.btoa(video.video_id)}" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/whatsapp.webp" alt="Whatsapp icon" title="Share on Whatsapp"></a>
                                    <a onclick="copyEmailEmbedssv('${ssv_store}?ssv=${window.btoa(video.video_id)}', '${video.cover_image}');" target="_blank"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/email.webp" alt="Email icon" title="Share on Email"></a>
                                    <a onclick="jQuery(this).next().click();"><img class="video-modal-share-modal-social-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/copy-link.webp" alt="Copy link icon" title="Copy Link"></a>                                
                                    <input type="text" value="${ssv_store}?ssv=${window.btoa(video.video_id)}" style="display: none;" onclick="copyLinkssv(this);">
                                </div>      
            
                                <div class="video-modal-askque-modal-ssv">
                                    <div class="video-modal-askque-modal-top-ssv">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                            alt="Previous icon" onclick="closeAskquessv(this, true);">
                                        <p>Ask Question</p>     
                                    </div>
                                    <div class="askque-modal-form-ssv askque-modal-form1-ssv">
                                        <form onsubmit="return askQuestionssv(this, ${video.designer_id}, ${video.video_id});">
                                            <textarea name="question" rows="3" onfocus="ssv_swiper_modal.disable();" onfocusout="ssv_swiper_modal.enable();" placeholder="Enter query here" required></textarea>                           
                                            <button class="askque-modal-btn-ssv askque-modal-btn1-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Send</button>                           
                                        </form>
                                    </div>
                                    <div class="askque-modal-form-ssv askque-modal-form2-ssv">
                                        <form onsubmit="return registerUserssv(this, ${video.video_id});">
                                            <input name="fullname" type="text" onfocus="ssv_swiper_modal.disable();" onfocusout="ssv_swiper_modal.enable();" placeholder="Enter your name" style="margin-bottom: 8px !important;" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required />
                                            <div class="urp-form-phone-ssv">
                                                <select class="form-select" id="phone" name="phone" style="margin: 0px !important; margin-right: 5px !important;">                                        
                                                    <option value="91" selected>India +91</option>
                                                    <option value="44">United Kingdom +44</option>
                                                    <option value="1">United States +1</option>
                                                    <option value="92">Pakistan +92</option>
                                                    <option value="971">United Arab Emirates +971</option>
                                                    <option value="974">Qatar +974</option>
                                                    <option value="966">Saudi Arabia +966</option>
                                                    <option value="965">Kuwait +965</option>
                                                    <option value="968">Oman +968</option>
                                                    <option value="967">Yemen +967</option>
                                                    <option value="973">Bahrain +973</option>
                                                </select>
                                                <input name="phone" type="text" style="margin: 0px !important;" placeholder="Enter your phone" pattern=".{10,10}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum 10 and maximim 10 digits." required autocomplete="off" />                                
                                            </div>                            
                                            <button class="askque-modal-btn-ssv askque-modal-btn2-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Register</button>                           
                                        </form>
                                    </div>                        
                                </div>
            
                                ${swipeupTooltip}
            
                                <p class="video-modal-alert-ssv"></p>                        
                                <div class="video-modal-cart-popup-ssv">
                                    <div class="cart-popup-flex-ssv">
                                        <div class="cart-popup-wraper-ssv">
                                            <img onclick="closeCartPopupssv(this);" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp" alt="Close icon">
                                            <p>${ssv_brandCustomizations.cart_success_message}</p>
                                            <div class="video-modal-cart-popup-action-ssv">
                                                <a href="${window.location.origin}/${ssv_brandCustomizations.cust_cart_redirection_link}" class="popup-cart-btn-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important;">${ssv_brandCustomizations.view_cart_txt}</a>
                                                <a onclick="closeCartPopupssv(this);" class="popup-shopping-btn-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">${ssv_brandCustomizations.shopping_text}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>                      
                            </div>
                        </div>
                    `;

                    i++;
                });

                // Slider on page
                jQuery('#swirl-short-videos').html(!ssv_pip && !ssv_pdppipHideOnscreen ? `
                    <div class="swiper swiper-ssv-c">
                        <div class="swiper-wrapper">
                            ${onpageSlides}
                        </div>
                        <div class="swiper-button-next">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp" height="" width="" alt="Next icon">
                        </div>
                        <div class="swiper-button-prev">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp" height="" width="" alt="Previous icon">
                        </div>
                    </div>
                ` : '');

                // Swirl Overlay Modal
                jQuery('body').append(`
                    <div class="swirl-short-videos">
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
                        <div class="video-modal-ssv" style="display: none;">
                            <div class="video-modal-container-ssv">
                                <div class="swiper swiper-ssv-m">
                                    <div class="swiper-wrapper">
                                        ${modalSlides}
                                    </div>
                                    <div class="swiper-button-next">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp"
                                            alt="Next icon">
                                    </div>
                                    <div class="swiper-button-prev">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp"
                                            alt="Previous icon">
                                    </div>
                                </div>                    
                            </div>                    
                        </div>
                        <div class="video-pip-ssv">
                            <video loop playsinline="" preload="none" data-setup="{}" onplay="jQuery(this).next().hide()" onmouseover="showPipControls();"                   
                                poster="">
                                <source src="" type="video/mp4">
                            </video>
                            <div class="video-pip-video-loader-ssv">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                                    alt="Spinner">
                            </div>
                            <button class="video-pip-playpause-ssv" title="Play/Pause" onclick="playpausepipssv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp"
                                    alt="Play/Pause icon" />
                            </button>                            
                            <button class="video-pip-volume-ssv" title="Mute/Unmute" onclick="volumepipssv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                                    alt="Volume icon">                    
                            </button>
                            <button class="video-pip-close-ssv" title="Close" onclick="closepipssv();" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                                    alt="Close icon">
                            </button>
                            <button class="video-pip-fullscreen-ssv" title="Full Screen" onclick="fullscreenpipssv();" style="border: 2.5px solid #fff !important;">
                            </button>
                        </div>
                        <div class="modal-loader-ssv">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                                alt="Spinner">
                        </div>
                        <a href="/?add-to-cart=" data-quantity="1" data-product_id="" class="ajax-add-to-cart-ssv ${ssv_brandCustomizations.ajax_cart_class}" style="display: none;"></a>
                    </div>
                `);

                // Email embed
                jQuery('body').append(`
                    <textarea class="email-share-txt-ssv" style="display: none !important;" onclick="copyFormatedssv(this);"></textarea>
                `);

                // Post append activities
                videos.forEach(video => {
                    // Ask question         
                    // jQuery(`#phone${video.video_id}`).intlTelInput({
                    //     initialCountry: "in",
                    //     separateDialCode: true,
                    //     // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
                    // }).on('countrychange', function () {
                    //     jQuery(`#code${video.video_id}`).val(jQuery(`#phone${video.video_id}`).intlTelInput("getSelectedCountryData").dialCode);
                    // });

                    // Player registration [Gumlet]    
                    // var videoPlayer = document.getElementById(`modalVideossv-${video.video_id}`);
                    // var gumletInsights = window.gumlet.insights(ssv_gumletConfig);
                    // gumletInsights.registerHTML5Player(videoPlayer);

                    // Player Load
                    // if (!ssv_pip && !ssv_pdppipHideOnscreen) {
                    //     document.getElementById(`onpageVideossv-${video.video_id}`).load();
                    // }
                    // document.getElementById(`modalVideossv-${video.video_id}`).load();

                    // Firebase events for all videos        
                    // ssv_fsdb.collection("swirlshortvideo_likes_" + video.designer_id).doc(video.video_id).onSnapshot((doc) => {
                    //     if (doc.exists) {
                    //         let likes = nFormatterssv(doc.data().unique_likes)
                    //         jQuery(`.videoLikes-${video.video_id}`).html(likes);
                    //         let elm = jQuery(`.videoLikes-${video.video_id}`).closest('.video-modal-video-container-ssv').find('.SWIRLhearts')[0];
                    //         SWIRLHeartFlawsssv(elm);
                    //         SWIRLHeartFlawsssv(elm);
                    //     }
                    // });

                    // Product carousel load
                    if (Object.keys(video.product).length > 1) {
                        new Swiper(`.swiper-ssv-pt-${video.video_id}`, {
                            slidesPerView: 'auto',
                            direction: "horizontal",
                            clickable: true,
                            slideClass: "swiper-slide-pt",
                            // freeMode: true,
                            navigation: {
                                nextEl: '.sw-button-next',
                                prevEl: '.sw-button-prev',
                            }
                        });
                    }

                    // Stamped IO Reviews
                    if (typeof video.product[0] != 'undefined' && ssv_brandCustomizations.stamped === 1) {
                        video.product.forEach(product => {
                            if (product.brand_product_id) {
                                var url = `https://stamped.io/api/widget/reviews?productId=${product.brand_product_id}&minRating&page&storeUrl=${ssv_brandCustomizations.store_url}&apiKey=${ssv_brandCustomizations.api_key}`
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
                                                        <img class="product-rating-all-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp" alt="Previous icon" onclick="closeRatingssv(this);">
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

                                            jQuery(`.prssv-${video.video_id}-${product.product_id}`).append(rappend);
                                            jQuery(`.prassv-${video.video_id}-${product.product_id}`).append(cappend);
                                        }
                                    }
                                }

                                xhr.send();
                            }
                        });
                    }
                });

                if (!ssv_pip && !ssv_pdppipHideOnscreen) {
                    // Initialize Swiper C    
                    ssv_swiper = new Swiper('.swiper-ssv-c', {
                        slidesPerView: 5,
                        direction: 'horizontal',
                        spaceBetween: 15,
                        // centeredSlides: true,
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
                        },
                        on: {
                            init: function () {
                                updateSwiperNavigationssv(`.swiper-ssv-c`);
                            }
                        }
                    });
                }

                // Initialize Swiper M    
                ssv_swiper_modal = new Swiper(".swiper-ssv-m", {
                    slidesPerView: 1,
                    direction: "vertical",
                    clickable: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        768: {
                            direction: "horizontal",
                            slidesPerView: 1,
                        },
                    },
                    on: {
                        init: function () {
                            // Open PIP if found
                            if (ssv_pip && !ssv_pdppip) {
                                ssv_globalMute = true;
                                playpipssv();
                            }

                            if (ssv_pdppip && ssv_brandCustomizations.pdppip == 1) {
                                ssv_globalMute = true;
                                playpipssv(videos[0].video_url, videos[0].cover_image);
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

                            // Update preview thumbs
                            if (ssv_brandCustomizations.next_previous_preview == '1') {
                                updatePreviewThumbsssv(`.swiper-ssv-m`);
                            }

                            // Update init cart counts
                            if (ssv_brandCustomizations.dot_class && jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0) {
                                jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()));
                            }
                        },
                    }
                });

                // Init swiper M movement    
                ssv_swiper_modal.on('slideChange', function () {
                    let slideno = ssv_swiper_modal.activeIndex;
                    let videoPlayer = jQuery('.swiper-ssv-m .swiper-slide').eq(slideno).find('video')[0];

                    // Open loader
                    videoloaderssv(true);
                    // videoPlayer.load();
                    videoPlayer.onloadstart = playWithPromisessv(videoPlayer);
                });

                // generate hover event 
                // if (ssv_brandCustomizations.auto_play_video == '1') {
                //     jQuery('.swiper-ssv-c .swiper-slide').hover(function () {
                //         jQuery('.swiper-ssv-c .swiper-slide video').each(function () {
                //             jQuery(this)[0].pause();
                //         });

                //         let player = jQuery(this).find('video')[0];
                //         let playPromise = player.play();
                //         if (playPromise !== undefined) {
                //             playPromise.then(_ => {
                //             }).catch(error => {
                //             });
                //         }
                //     });
                // }
            }

            jqTag = document.createElement('script');
            jqTag.rel = 'text/javascript';
            jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/magneto/v10/custom_submodule_v7.min.js';
            document.body.insertBefore(jqTag, document.body.lastChild);
        });
    });