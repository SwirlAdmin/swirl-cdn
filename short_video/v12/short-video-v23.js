//v12 - New design with new swiping up-down + Multiple Product + No Product + Multiple Page + PDP PIP (v10 Upgrade) [Reels] feature

// Global Defines
let ssv_mode = 'Live'; // Test, Live
let ssv_globalMute = true;
let ssv_pip = false;
let ssv_brandCustomizations = [];
let ssv_store = '';
let ssv_storeType = '0';
let ssv_storeCode = '';
let ssv_storePlaylist = '';
let ssv_baseURL = ssv_mode === 'Live' ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/v12/swirl-style-v17.min.css' : '';
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
let ssv_gptPrompt = [];
let ssv_gumletRegistered = [];
let ssv_gumletConfig = {
    property_id: 'jYfkUIVL', // required:  please replace with correct property id.
};

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

        // Jquery depended JS        
        let JSL1, JSL2, JSL3, JSL4, JSL5, JSL6 = false;

        JSL1 = true;

        JSL2 = true;
        // jQuery.getScript("https://cdn.gumlytics.com/insights/1.1/gumlet-insights.min.js", function () {
        // });

        // jQuery.getScript("https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js", function () {
        //     JSL3 = true;
        // });

        // jQuery.getScript("https://www.gstatic.com/firebasejs/9.19.1/firebase-auth-compat.js", function () {
        //     JSL4 = true;
        // });

        // jQuery.getScript("https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-compat.js", function () {
        //     JSL5 = true;
        // });

        JSL3 = JSL4 = JSL5 = true;

        JSL6 = true;
        jQuery.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js", function () {
        });

        // Inits
        ssv_store = window.location.href.split('?')[0];
        ssv_store = ssv_store.split('#')[0];
        let currentURL = window.location.href.split('?')[0];
        if (document.querySelector('#swirl-short-videos') != null) {
            ssv_storeCode = jQuery('#swirl-short-videos').data('code');
            ssv_storeType = jQuery('#swirl-short-videos').data('wt');
            ssv_storePlaylist = jQuery('#swirl-short-videos').data('playlist');

            localStorage.setItem('_ssv_storecode', ssv_storeCode);
            localStorage.setItem('_ssv_storetype', ssv_storeType);
            localStorage.setItem('_ssv_storeplaylist', ssv_storePlaylist);

            // PDP or Normal            
            jQuery('#swirl-short-videos').data('pdp').split(',').forEach(uVal => {
                if (currentURL.includes(uVal) || uVal == '/home') ssv_pdppip = true;
            });
            if (jQuery('#swirl-short-videos').data('pdp').includes('/home')) currentURL = currentURL.charAt(currentURL.length - 1) == '/' ? currentURL + 'home' : currentURL + '/home';
        } else {
            ssv_pip = true;
            ssv_storeCode = localStorage.getItem('_ssv_storecode');
            ssv_storeType = localStorage.getItem('_ssv_storetype');
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
                        // let SSVSL = setInterval(() => {
                        //     if (JSL1 && JSL2 && JSL3 && JSL4 && JSL5 && JSL6) {
                        //         // firebase.initializeApp({
                        //         //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                        //         //     authDomain: 'swirl-short-vido.firebaseapp.com',
                        //         //     projectId: 'swirl-short-vido',
                        //         //     storageBucket: 'swirl-short-vido.appspot.com'
                        //         // });
                        //         // ssv_fsdb = firebase.firestore();

                        //         clearInterval(SSVSL);
                        //     }
                        // }, 300);

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
                        // let SSVSL = setInterval(() => {
                        //     if (JSL1 && JSL2 && JSL3 && JSL4 && JSL5 && JSL6) {
                        //         // firebase.initializeApp({
                        //         //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                        //         //     authDomain: 'swirl-short-vido.firebaseapp.com',
                        //         //     projectId: 'swirl-short-vido',
                        //         //     storageBucket: 'swirl-short-vido.appspot.com'
                        //         // });
                        //         // ssv_fsdb = firebase.firestore();

                        //         clearInterval(SSVSL);
                        //     }
                        // }, 300);

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

function getHandle(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle ? handle.split('#')[0] : '';
    handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

    return handle;
}

function imagekitDynamicssv(img, w) {
    let imgParts = img.split('coverimages');
    return imgParts[0] + `coverimages/tr:w-${w}` + imgParts[1];
}

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
                    <img src="${video.product[0].image.includes('imagekit') ? imagekitDynamicssv(video.product[0].image, 80) : video.product[0].image}" alt="Product Image">                                        
                    
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
                    if (ssv_storeType == '1') {
                        let productHandle = getHandle(product.url);
                        jQuery.getJSON(window.Shopify.routes.root + 'products/' + productHandle + '.js', function (productShopify) {
                            ssv_productIds[product.product_id] = productShopify.variants[0]['id'];
                        });
                    } else if (ssv_storeType == '2') {
                        ssv_productIds[product.product_id] = product.brand_product_id;
                    }

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
                                            src="${product.image.includes('imagekit') ? imagekitDynamicssv(product.image, 80) : product.image}" />
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
                                <img alt="Product Image" src="${product.image.includes('imagekit') ? imagekitDynamicssv(product.image, 80) : product.image}">
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
                                            src="${product.image.includes('imagekit') ? imagekitDynamicssv(product.image, 80) : product.image}" />
                                    </div>
                                    <div class="product-detail-block-pb-ssv">
                                        <p>${product.title}</p>
                                        <section>${product.desription}</section>
                                        <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${product.currencysymbols}${product.discount_price} <strike ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${product.currencysymbols}${product.price}</strike>
                                            <span ${parseFloat(product.price) > parseFloat(product.discount_price) ? '' : 'style="display: none;"'}>${parseFloat(product.price) > parseFloat(product.discount_price) ? Math.round(((product.price - product.discount_price) * 100) / product.price) : ''}% OFF</span></label>
                                    </div>
                                </div>                            
                                <div class="product-desc-pb-ssv">
                                    <p class="product-desc-title-pb-ssv">Product Details</p>
                                    <section>${product.desription}</section>                                                                       
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
                if (ssv_storeType == '1') {
                    let productHandle = getHandle(video.product[0].url);
                    jQuery.getJSON(window.Shopify.routes.root + 'products/' + productHandle + '.js', function (productShopify) {
                        ssv_productIds[video.product[0].product_id] = productShopify.variants[0]['id'];
                    });
                } else if (ssv_storeType == '2') {
                    ssv_productIds[video.product[0].product_id] = video.product[0].brand_product_id;
                }

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
                                    src="${video.product[0].image.includes('imagekit') ? imagekitDynamicssv(video.product[0].image, 80) : video.product[0].image}" />
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
                                        src="${video.product[0].image.includes('imagekit') ? imagekitDynamicssv(video.product[0].image, 80) : video.product[0].image}" />
                                </div>
                                <div class="product-detail-block-pb-ssv">
                                    <p>${video.product[0].title}</p>
                                    <section>${video.product[0].desription}</section>
                                    <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${video.product[0].currencysymbols}${video.product[0].discount_price} <strike ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${video.product[0].currencysymbols}${video.product[0].price}</strike>
                                        <span ${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'style="display: none;"'}>${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}% OFF</span></label>
                                </div>
                            </div>                            
                            <div class="product-desc-pb-ssv">
                                <p class="product-desc-title-pb-ssv">Product Details</p>
                                <section>${video.product[0].desription}</section>                                
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
                <a href="${video.product_link}" onclick="CTAClicksssv(0, '', '', '', ${video.designer_id}, ${video.video_id}, '1');">
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
                        <div class="SWIRLhearts" style="display: none !important;"></div>                
                        <button class="video-modal-like-ssv" title="Like" onclick="likeVideossv(this, ${video.video_id}, ${video.designer_id});" style="background: rgb(0, 0, 0, .6) !important; display: none !important;">
                            <img src="${getCookie(`ssv_vl_${video.video_id}`) ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/heart-fill-2.webp' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/heart-outline.webp'}"
                                alt="Heart icon">
                            <p class="videoLikes-${video.video_id}">Like</p>
                        </button>                          
                        <button class="video-modal-download-ssv" title="Download Video" onclick="downloadVideossv(this, '${video.video_url}', ${video.video_id}, ${video.designer_id})" style="${ssv_brandCustomizations.download_icon == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
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
                                <input name="code" id="code${video.video_id}" type="hidden" onfocus="ssv_swiper_modal.disable();" onfocusout="ssv_swiper_modal.enable();" value="91" />
                                <input name="phone" id="phone${video.video_id}" type="text" onfocus="ssv_swiper_modal.disable();" onfocusout="ssv_swiper_modal.enable();" style="margin: 0px !important;" placeholder="Enter your phone" pattern=".{10,10}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum 10 and maximim 10 digits." required />                                
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
                    
                    <div class="user-registration-popup-ssv">
                        <div class="user-registration-popup-inner-ssv">
                            <div class="urp-top-ssv">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                                    alt="Close icon" onclick="closeUrpssv(this);">
                                <p>Register yourself</p>     
                            </div>
                            <div class="urp-form-ssv">
                                <form onsubmit="return userRegistrationssv(this, ${video.video_id});" autocomplete="off">
                                    <input name="fullname" type="text" placeholder="Enter your name" style="margin-bottom: 8px !important;" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required autocomplete="off" />
                                    <div class="urp-form-phone-ssv">
                                        <select class="form-select" id="phone" name="phone" style="margin: 0px !important; margin-right: 5px !important;">                                        
                                            <option value="93">Afghanistan +93</option>
                                            <option value="358">Aland Islands +358</option>
                                            <option value="355">Albania +355</option>
                                            <option value="213">Algeria +213</option>
                                            <option value="1684">American Samoa +1684</option>
                                            <option value="376">Andorra +376</option>
                                            <option value="244">Angola +244</option>
                                            <option value="1264">Anguilla +1264</option>
                                            <option value="672">Antarctica +672</option>
                                            <option value="1268">Antigua and Barbuda +1268</option>
                                            <option value="54">Argentina +54</option>
                                            <option value="374">Armenia +374</option>
                                            <option value="297">Aruba +297</option>
                                            <option value="61">Australia +61</option>
                                            <option value="43">Austria +43</option>
                                            <option value="994">Azerbaijan +994</option>
                                            <option value="1242">Bahamas +1242</option>
                                            <option value="973">Bahrain +973</option>
                                            <option value="880">Bangladesh +880</option>
                                            <option value="1246">Barbados +1246</option>
                                            <option value="375">Belarus +375</option>
                                            <option value="32">Belgium +32</option>
                                            <option value="501">Belize +501</option>
                                            <option value="229">Benin +229</option>
                                            <option value="1441">Bermuda +1441</option>
                                            <option value="975">Bhutan +975</option>
                                            <option value="591">Bolivia +591</option>
                                            <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                                            <option value="387">Bosnia and Herzegovina +387</option>
                                            <option value="267">Botswana +267</option>
                                            <option value="55">Bouvet Island +55</option>
                                            <option value="55">Brazil +55</option>
                                            <option value="246">British Indian Ocean Territory +246</option>
                                            <option value="673">Brunei Darussalam +673</option>
                                            <option value="359">Bulgaria +359</option>
                                            <option value="226">Burkina Faso +226</option>
                                            <option value="257">Burundi +257</option>
                                            <option value="855">Cambodia +855</option>
                                            <option value="237">Cameroon +237</option>
                                            <option value="1">Canada +1</option>
                                            <option value="238">Cape Verde +238</option>
                                            <option value="1345">Cayman Islands +1345</option>
                                            <option value="236">Central African Republic +236</option>
                                            <option value="235">Chad +235</option>
                                            <option value="56">Chile +56</option>
                                            <option value="86">China +86</option>
                                            <option value="61">Christmas Island +61</option>
                                            <option value="672">Cocos (Keeling) Islands +672</option>
                                            <option value="57">Colombia +57</option>
                                            <option value="269">Comoros +269</option>
                                            <option value="242">Congo +242</option>
                                            <option value="242">Congo, Democratic Republic of the Congo +242</option>
                                            <option value="682">Cook Islands +682</option>
                                            <option value="506">Costa Rica +506</option>
                                            <option value="225">Cote D'Ivoire +225</option>
                                            <option value="385">Croatia +385</option>
                                            <option value="53">Cuba +53</option>
                                            <option value="599">Curacao +599</option>
                                            <option value="357">Cyprus +357</option>
                                            <option value="420">Czech Republic +420</option>
                                            <option value="45">Denmark +45</option>
                                            <option value="253">Djibouti +253</option>
                                            <option value="1767">Dominica +1767</option>
                                            <option value="1809">Dominican Republic +1809</option>
                                            <option value="593">Ecuador +593</option>
                                            <option value="20">Egypt +20</option>
                                            <option value="503">El Salvador +503</option>
                                            <option value="240">Equatorial Guinea +240</option>
                                            <option value="291">Eritrea +291</option>
                                            <option value="372">Estonia +372</option>
                                            <option value="251">Ethiopia +251</option>
                                            <option value="500">Falkland Islands (Malvinas) +500</option>
                                            <option value="298">Faroe Islands +298</option>
                                            <option value="679">Fiji +679</option>
                                            <option value="358">Finland +358</option>
                                            <option value="33">France +33</option>
                                            <option value="594">French Guiana +594</option>
                                            <option value="689">French Polynesia +689</option>
                                            <option value="262">French Southern Territories +262</option>
                                            <option value="241">Gabon +241</option>
                                            <option value="220">Gambia +220</option>
                                            <option value="995">Georgia +995</option>
                                            <option value="49">Germany +49</option>
                                            <option value="233">Ghana +233</option>
                                            <option value="350">Gibraltar +350</option>
                                            <option value="30">Greece +30</option>
                                            <option value="299">Greenland +299</option>
                                            <option value="1473">Grenada +1473</option>
                                            <option value="590">Guadeloupe +590</option>
                                            <option value="1671">Guam +1671</option>
                                            <option value="502">Guatemala +502</option>
                                            <option value="44">Guernsey +44</option>
                                            <option value="224">Guinea +224</option>
                                            <option value="245">Guinea-Bissau +245</option>
                                            <option value="592">Guyana +592</option>
                                            <option value="509">Haiti +509</option>
                                            <option value="39">Holy See (Vatican City State) +39</option>
                                            <option value="504">Honduras +504</option>
                                            <option value="852">Hong Kong +852</option>
                                            <option value="36">Hungary +36</option>
                                            <option value="354">Iceland +354</option>
                                            <option value="91" selected>India +91</option>
                                            <option value="62">Indonesia +62</option>
                                            <option value="98">Iran, Islamic Republic of +98</option>
                                            <option value="964">Iraq +964</option>
                                            <option value="353">Ireland +353</option>
                                            <option value="44">Isle of Man +44</option>
                                            <option value="972">Israel +972</option>
                                            <option value="39">Italy +39</option>
                                            <option value="1876">Jamaica +1876</option>
                                            <option value="81">Japan +81</option>
                                            <option value="44">Jersey +44</option>
                                            <option value="962">Jordan +962</option>
                                            <option value="7">Kazakhstan +7</option>
                                            <option value="254">Kenya +254</option>
                                            <option value="686">Kiribati +686</option>
                                            <option value="850">Korea, Democratic People's Republic of +850</option>
                                            <option value="82">Korea, Republic of +82</option>
                                            <option value="381">Kosovo +383</option>
                                            <option value="965">Kuwait +965</option>
                                            <option value="996">Kyrgyzstan +996</option>
                                            <option value="856">Lao People's Democratic Republic +856</option>
                                            <option value="371">Latvia +371</option>
                                            <option value="961">Lebanon +961</option>
                                            <option value="266">Lesotho +266</option>
                                            <option value="231">Liberia +231</option>
                                            <option value="218">Libyan Arab Jamahiriya +218</option>
                                            <option value="423">Liechtenstein +423</option>
                                            <option value="370">Lithuania +370</option>
                                            <option value="352">Luxembourg +352</option>
                                            <option value="853">Macao +853</option>
                                            <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                                            <option value="261">Madagascar +261</option>
                                            <option value="265">Malawi +265</option>
                                            <option value="60">Malaysia +60</option>
                                            <option value="960">Maldives +960</option>
                                            <option value="223">Mali +223</option>
                                            <option value="356">Malta +356</option>
                                            <option value="692">Marshall Islands +692</option>
                                            <option value="596">Martinique +596</option>
                                            <option value="222">Mauritania +222</option>
                                            <option value="230">Mauritius +230</option>
                                            <option value="262">Mayotte +262</option>
                                            <option value="52">Mexico +52</option>
                                            <option value="691">Micronesia, Federated States of +691</option>
                                            <option value="373">Moldova, Republic of +373</option>
                                            <option value="377">Monaco +377</option>
                                            <option value="976">Mongolia +976</option>
                                            <option value="382">Montenegro +382</option>
                                            <option value="1664">Montserrat +1664</option>
                                            <option value="212">Morocco +212</option>
                                            <option value="258">Mozambique +258</option>
                                            <option value="95">Myanmar +95</option>
                                            <option value="264">Namibia +264</option>
                                            <option value="674">Nauru +674</option>
                                            <option value="977">Nepal +977</option>
                                            <option value="31">Netherlands +31</option>
                                            <option value="599">Netherlands Antilles +599</option>
                                            <option value="687">New Caledonia +687</option>
                                            <option value="64">New Zealand +64</option>
                                            <option value="505">Nicaragua +505</option>
                                            <option value="227">Niger +227</option>
                                            <option value="234">Nigeria +234</option>
                                            <option value="683">Niue +683</option>
                                            <option value="672">Norfolk Island +672</option>
                                            <option value="1670">Northern Mariana Islands +1670</option>
                                            <option value="47">Norway +47</option>
                                            <option value="968">Oman +968</option>
                                            <option value="92">Pakistan +92</option>
                                            <option value="680">Palau +680</option>
                                            <option value="970">Palestinian Territory, Occupied +970</option>
                                            <option value="507">Panama +507</option>
                                            <option value="675">Papua New Guinea +675</option>
                                            <option value="595">Paraguay +595</option>
                                            <option value="51">Peru +51</option>
                                            <option value="63">Philippines +63</option>
                                            <option value="64">Pitcairn +64</option>
                                            <option value="48">Poland +48</option>
                                            <option value="351">Portugal +351</option>
                                            <option value="1787">Puerto Rico +1787</option>
                                            <option value="974">Qatar +974</option>
                                            <option value="262">Reunion +262</option>
                                            <option value="40">Romania +40</option>
                                            <option value="7">Russian Federation +7</option>
                                            <option value="250">Rwanda +250</option>
                                            <option value="590">Saint Barthelemy +590</option>
                                            <option value="290">Saint Helena +290</option>
                                            <option value="1869">Saint Kitts and Nevis +1869</option>
                                            <option value="1758">Saint Lucia +1758</option>
                                            <option value="590">Saint Martin +590</option>
                                            <option value="508">Saint Pierre and Miquelon +508</option>
                                            <option value="1784">Saint Vincent and the Grenadines +1784</option>
                                            <option value="684">Samoa +684</option>
                                            <option value="378">San Marino +378</option>
                                            <option value="239">Sao Tome and Principe +239</option>
                                            <option value="966">Saudi Arabia +966</option>
                                            <option value="221">Senegal +221</option>
                                            <option value="381">Serbia +381</option>
                                            <option value="381">Serbia and Montenegro +381</option>
                                            <option value="248">Seychelles +248</option>
                                            <option value="232">Sierra Leone +232</option>
                                            <option value="65">Singapore +65</option>
                                            <option value="721">Sint Maarten +721</option>
                                            <option value="421">Slovakia +421</option>
                                            <option value="386">Slovenia +386</option>
                                            <option value="677">Solomon Islands +677</option>
                                            <option value="252">Somalia +252</option>
                                            <option value="27">South Africa +27</option>
                                            <option value="500">South Georgia and the South Sandwich Islands +500</option>
                                            <option value="211">South Sudan +211</option>
                                            <option value="34">Spain +34</option>
                                            <option value="94">Sri Lanka +94</option>
                                            <option value="249">Sudan +249</option>
                                            <option value="597">Suriname +597</option>
                                            <option value="47">Svalbard and Jan Mayen +47</option>
                                            <option value="268">Swaziland +268</option>
                                            <option value="46">Sweden +46</option>
                                            <option value="41">Switzerland +41</option>
                                            <option value="963">Syrian Arab Republic +963</option>
                                            <option value="886">Taiwan, Province of China +886</option>
                                            <option value="992">Tajikistan +992</option>
                                            <option value="255">Tanzania, United Republic of +255</option>
                                            <option value="66">Thailand +66</option>
                                            <option value="670">Timor-Leste +670</option>
                                            <option value="228">Togo +228</option>
                                            <option value="690">Tokelau +690</option>
                                            <option value="676">Tonga +676</option>
                                            <option value="1868">Trinidad and Tobago +1868</option>
                                            <option value="216">Tunisia +216</option>
                                            <option value="90">Turkey +90</option>
                                            <option value="7370">Turkmenistan +7370</option>
                                            <option value="1649">Turks and Caicos Islands +1649</option>
                                            <option value="688">Tuvalu +688</option>
                                            <option value="256">Uganda +256</option>
                                            <option value="380">Ukraine +380</option>
                                            <option value="971">United Arab Emirates +971</option>
                                            <option value="44">United Kingdom +44</option>
                                            <option value="1">United States +1</option>
                                            <option value="1">United States Minor Outlying Islands +1</option>
                                            <option value="598">Uruguay +598</option>
                                            <option value="998">Uzbekistan +998</option>
                                            <option value="678">Vanuatu +678</option>
                                            <option value="58">Venezuela +58</option>
                                            <option value="84">Viet Nam +84</option>
                                            <option value="1284">Virgin Islands, British +1284</option>
                                            <option value="1340">Virgin Islands, U.s. +1340</option>
                                            <option value="681">Wallis and Futuna +681</option>
                                            <option value="212">Western Sahara +212</option>
                                            <option value="967">Yemen +967</option>
                                            <option value="260">Zambia +260</option>
                                            <option value="263">Zimbabwe +263</option>
                                        </select>
                                        <input name="phone" type="text" style="margin: 0px !important;" placeholder="Enter your phone" pattern=".{10,10}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum 10 and maximim 10 digits." required autocomplete="off" />                                
                                    </div>
                                    <button class="urp-btn-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Register</button>                           
                                </form>
                            </div> 
                        </div>     
                    </div>                    

                    <div class="chat-input-ssv" style="${ssv_brandCustomizations.chat_bot == '1' ? '' : 'display: none !important'}">
                        <form onsubmit="return sendChatssv(this);">
                            <input name="message" placeholder="ask anyting..." required autocomplete="off" />
                            <button>
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/send.svg"
                                    alt="Send icon">  
                            </button>
                        </form>
                    </div>

                    <div class="chat-history-ssv chatssv-${video.video_id}">
                        <div class="chat-messages-block-ssv">
                            <p><b>${ssv_brandCustomizations.designer_brand_name}</b>, Coustomer executive <span onclick="$(this).closest('.chat-history-ssv').hide();">&#10006;</span></p>
                            <div class="chat-messages-ssv"></div>
                            <div class="chat-history-input-ssv">
                                <form onsubmit="return sendChatMessagessv(this, ${video.video_id});">
                                    <input name="chatmessage" placeholder="Type here..." required autocomplete="off" />
                                    <button>
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/ai-send.svg"
                                            alt="Send icon">                                        
                                    </button>
                                </form>
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
            <div class="swiper-button-next-ssv">
                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp" height="" width="" alt="Next icon">
            </div>
            <div class="swiper-button-prev-ssv">
                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp" height="" width="" alt="Previous icon">
            </div>
        </div>
    ` : '');

    // Swirl Overlay Modal
    let chatBoatCSS = ssv_brandCustomizations.chat_bot == '1' ? `
        .video-modal-product-tile-carousel-ssv {
            bottom: 75px;
        }
        
        .video-modal-actions-ssv, .video-progress-ssv {
            bottom: 200px
        }

        @media (min-width: 768px) {
            .video-modal-actions-ssv, .video-progress-ssv {
                bottom: 90px;
            }
        }
    ` : '';
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

                ${chatBoatCSS}
            </style>
            <div class="video-modal-ssv" style="display: none;">
                <div class="video-modal-container-ssv">
                    <div class="swiper swiper-ssv-m">
                        <div class="swiper-wrapper">
                            ${modalSlides}
                        </div>
                        <div class="swiper-button-next-ssv">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp"
                                alt="Next icon">
                        </div>
                        <div class="swiper-button-prev-ssv">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp"
                                alt="Previous icon">
                        </div>
                    </div>                    
                </div>                    
            </div>
            <div class="video-pip-ssv" onclick="fullscreenpipssv(event);">
                <video loop playsinline="" preload="none" data-setup="{}" onplay="jQuery(this).next().hide()" onmouseover="showPipControls();"                   
                    poster="">
                    <source src="" type="video/mp4">
                </video>
                <div class="video-pip-video-loader-ssv">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg"
                        alt="Spinner">
                </div>
                <button class="video-pip-playpause-ssv" title="Play/Pause" onclick="playpausepipssv(this)" style="background: rgb(0, 0, 0, .6) !important; display: none !important;">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp"
                        alt="Play/Pause icon" />
                </button>                            
                <button class="video-pip-volume-ssv pfs-ex-ssv" title="Mute/Unmute" onclick="volumepipssv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                    <img class="pfs-ex-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                        alt="Volume icon">                    
                </button>
                <button class="video-pip-close-ssv pfs-ex-ssv" title="Close" onclick="closepipssv();" style="background: rgb(0, 0, 0, .6) !important;">
                    <img class="pfs-ex-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                        alt="Close icon">
                </button>
                <button class="video-pip-fullscreen-ssv" title="Full Screen" style="border: 2.5px solid #fff !important;">
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
        ssv_gptPrompt[video.video_id] = video.gpt_prompt;

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
                nextEl: '.swiper-button-next-ssv',
                prevEl: '.swiper-button-prev-ssv',
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
            nextEl: '.swiper-button-next-ssv',
            prevEl: '.swiper-button-prev-ssv',
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
                updateCartCountssv();
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

function updateCartCountssv() {
    jQuery('.cart-count-ssv').html('0');
    if (ssv_brandCustomizations.dot_class && jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0) {
        jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()));
    } else if (ssv_storeType == '1') {
        updateShopifyCartssv();
    }
}

function updatePreviewThumbsssv(swpr) {
    jQuery(swpr + ' .swiper-slide').each(function () {
        jQuery(this).prepend(jQuery(this).prev().length ? '<img src="' + jQuery(this).prev().find('video').attr('poster') + '" class="video-modal-np-img-ssv p-img-ssv" onclick="jQuery(`.video-modal-ssv:visible`).find(`.swiper-button-prev-ssv`).click();">' : '');
        jQuery(this).prepend(jQuery(this).next().length ? '<img src="' + jQuery(this).next().find('video').attr('poster') + '" class="video-modal-np-img-ssv n-img-ssv" onclick="jQuery(`.video-modal-ssv:visible`).find(`.swiper-button-next-ssv`).click();">' : '');
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
    // window.location.hash = '#short-videos';

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

    if (jQuery(player).find('source').attr('src') == '') {
        jQuery(player).find('source').attr('src', jQuery(player).find('source').attr('data-src'));
        jQuery(player)[0].load();
    }

    // Player registration [Gumlet]
    // if (typeof gumlet != 'undefined' && !ssv_gumletRegistered.includes(jQuery(player).find('source').attr('data-src'))) {
    //     var gumletInsights = gumlet.insights(ssv_gumletConfig);
    //     gumletInsights.registerHTML5Player(player);
    //     ssv_gumletRegistered.push(jQuery(player).find('source').attr('data-src'));
    // }

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
    let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp';
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

    // jQuery('.swiper-ssv-c .swiper-slide video').each(function () {
    //     jQuery(this)[0].pause();
    // });
}

function volumessv(btn) {
    if (jQuery(btn).closest('.video-modal-video-container-ssv').find('video').prop('muted')) {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp');
        jQuery(btn).children('p').html('Unmute');
        jQuery(btn).closest('.video-modal-video-container-ssv').find('video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery(btn).children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp');
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

    // reset all popups
    closeAllpopupsssv();

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function changeQtyssv(action, btn) {
    let qtyLimit = 20;
    if (action == 'minus') {
        jQuery(btn).next().val(parseInt(jQuery(btn).next().val()) > 1 ? (parseInt(jQuery(btn).next().val()) - 1) : 1);
    } else if (action == 'plus') {
        if (jQuery(btn).prev().val() == qtyLimit) {
            videoAlertssv(`You can not choose more then ${qtyLimit} quantity.`, 2000);
            return;
        }
        jQuery(btn).prev().val((parseInt(jQuery(btn).prev().val()) + 1));
    }
}

function openProductssv(e, btn) {
    if (e.target.classList == 'ontile-addtocart-ssv' || e.target.classList == 'ontile-buynow-ssv') return;

    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(0%)');

    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').show();
    }, 300);

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = false;
        ssv_swiper_modal.allowSlidePrev = false;
        ssv_swiper_modal.allowTouchMove = false;
    }
}

function closeProductssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');

    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').hide();
    }, 300);

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function openListProductssv(e, btn, i) {
    if (e.target.classList == 'ontile-addtocart-ssv' || e.target.classList == 'ontile-buynow-ssv') return;

    if (jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-tile-carousel-ssv').is(":visible")) {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').eq((i - 1)).css('transform', 'translateY(0%)');
        setTimeout(() => {
            jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-ssv').css('transform', 'translateY(0%)');
        }, 500);
    } else {
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-product-block-product-ssv').eq((i - 1)).css('transform', 'translateX(0%)');
    }

    if (window.innerWidth <= 768) {
        setTimeout(() => {
            jQuery('.video-modal-fade-ssv').show();
        }, 300);

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
        setTimeout(() => {
            jQuery('.video-modal-fade-ssv').hide();
        }, 300);

        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function openCartPopupssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-cart-popup-ssv').fadeIn(500);
}

function closeCartPopupssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-cart-popup-ssv').fadeOut(500);
}

function openUrpssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.user-registration-popup-ssv').css('display', 'flex');
    // jQuery('.video-modal-fade-ssv').show();
}

function closeUrpssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.user-registration-popup-ssv').css('display', 'none');
    // jQuery('.video-modal-fade-ssv').hide();
}

function setPopupHightssv() {
    jQuery('.video-modal-ssv').height(window.innerHeight);
    jQuery('.video-modal-ssv').width(window.innerWidth);

    // Modal navigation adjust
    // setTimeout(() => {
    //     let videoWidth = jQuery('.swiper-ssv-m .swiper-slide-active .video-modal-video-container-ssv').width() + 80;
    //     jQuery('.swiper-ssv-m .swiper-button-prev-ssv').css('left', `calc(50% - ${(videoWidth + 36)}px)`);
    //     jQuery('.swiper-ssv-m .swiper-button-next-ssv').css('left', `calc(50% + ${videoWidth}px)`);
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
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-playpause-ssv').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp');
    } else {
        player.pause();
        jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-playpause-ssv').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp');
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

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = false;
        ssv_swiper_modal.allowSlidePrev = false;
        ssv_swiper_modal.allowTouchMove = false;
    }
}

function closeSharessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-share-modal-ssv').css('transform', 'translateY(110%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').hide();
    }, 300);

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = true;
        ssv_swiper_modal.allowSlidePrev = true;
        ssv_swiper_modal.allowTouchMove = true;
    }
}

function openRatingssv(btn) {
    jQuery(btn).closest('.video-modal-product-block-product-ssv').find('.product-rating-all-ssv').css('transform', 'translateY(0%)');
}

function closeRatingssv(btn) {
    jQuery(btn).closest('.video-modal-product-block-product-ssv').find('.product-rating-all-ssv').css('transform', 'translateY(110%)');
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

let allOverElements = [];
let allOverElementsSticky = [];
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

    // hide all fixed visible elements
    allOverElements = [];
    allOverElementsSticky = [];
    jQuery('*').each(function () {
        if (jQuery(this).css('position') == 'fixed' && jQuery(this).is(":visible")) {
            if (!jQuery(this).is('.video-modal-ssv') && !jQuery(this).is('.modal-loader-ssv') && !jQuery(this).is('.video-pip-ssv')) {
                jQuery(this).hide();
                allOverElements.push(jQuery(this));
            }
        }

        if (jQuery(this).css('position') == 'sticky' && jQuery(this).is(":visible")) {
            if (!jQuery(this).is('.video-modal-ssv') && !jQuery(this).is('.modal-loader-ssv') && !jQuery(this).is('.video-pip-ssv')) {
                jQuery(this).hide();
                allOverElements.push(jQuery(this));
            }
        }
    });
}

function enableScrollssv() {
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    allOverElements.forEach(element => {
        jQuery(element).show();
    });

    // Show again all hidden fixed elements
    allOverElementsSticky.forEach(element => {
        jQuery(element).show();
    });
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
        let src = ssv_globalMute ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp';
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
    // jQuery('.video-pip-playpause-ssv').fadeIn();
    // setTimeout(() => {
    //     jQuery('.video-pip-playpause-ssv').fadeOut();
    // }, 3000);
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
        jQuery('.video-pip-playpause-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp');
    } else {
        player.pause();
        jQuery('.video-pip-playpause-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp');
    }
}

function volumepipssv(btn) {
    if (jQuery('.video-pip-ssv video').prop('muted')) {
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp');
        jQuery('.video-pip-ssv video').prop('muted', false);

        ssv_globalMute = false;
    } else {
        jQuery('.video-pip-volume-ssv img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp');
        jQuery('.video-pip-ssv video').prop('muted', true);

        ssv_globalMute = true;
    }
}

function fullscreenpipssv(e) {
    if (e.target.classList == 'pfs-ex-ssv') return;

    let video = jQuery('.video-pip-ssv video source').attr('src');
    let slideNo = jQuery('.swiper-ssv-m video source[data-src="' + video + '"]').closest('.swiper-slide').index();

    // Update cart counts
    updateCartCountssv();

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

let graphqlCartId = ''; // Glamour book
function addtocartssv(videoId, productId, skuCode, btn, qty = 0) {
    productId = ssv_productIds[productId];
    let quantity = qty ? qty : parseInt(jQuery(btn).closest('.video-modal-product-block-product-ssv').find('.quantity-inp-ssv').val());

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
            },
            error: function (error) {
                jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                jQuery(btn).removeAttr('disabled');

                // Alert
                videoAlertssv('Sold out!', 2000);
            }
        }
        ).done(function (response) {
            jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
            jQuery(btn).removeAttr('disabled');

            jQuery('.quantity-inp-ssv').val('1');

            // Alert
            openCartPopupssv(btn);
            // videoAlertssv(ssv_brandCustomizations.cart_success_message, 2000);

            updateShopifyCartssv();
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
                    openCartPopupssv(btn);
                    // videoAlertssv(ssv_brandCustomizations.cart_success_message, 2000);

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
                openCartPopupssv(btn);
                // videoAlertssv(ssv_brandCustomizations.cart_success_message, 2000);
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
    } if (ssv_storeType == '5') {  // GraphQL Glamourbook
        // AJAX to GraphQL Mutation
        if (!skuCode) {
            jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
            jQuery(btn).removeAttr('disabled');
            jQuery('.quantity-inp-ssv').val('1');
            videoAlertssv('Unable to add!', 2000);
            return;
        }

        if (localStorage.getItem('token') && !graphqlCartId) {
            var settings = {
                "url": `${ssv_brandCustomizations.add_to_cart_endpoint}`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "query": "{customerCart {id}}",
                    "variables": {}
                }),
            };

            $.ajax(settings).done(function (response) {
                graphqlCartId = response.data.customerCart.id;
            });
        }

        let finalCartId = '';
        let cito = setInterval(() => {
            finalCartId = localStorage.getItem('token') ? graphqlCartId : localStorage.getItem('cartID');
            if (finalCartId) {
                clearInterval(cito);

                jQuery.ajax({
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: false,
                    url: `${ssv_brandCustomizations.add_to_cart_endpoint}`,
                    processData: false,
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`); },
                    data: JSON.stringify({
                        operationName: "addSimpleProductToCart",
                        query: `mutation addSimpleProductToCart($cartID:String! $sku:String! $quantity:Float!){addProductsToCart(cartId:$cartID cartItems:[{quantity:$quantity,sku:$sku}]){cart{total_quantity items{uid product{name sku}quantity errors{code message}}}user_errors{code message}}}`,
                        variables: {
                            cartID: finalCartId,
                            sku: skuCode,
                            quantity: quantity
                        }
                    }),
                    success: function (response) {
                        // console.log(response);

                        if (Object.keys(response.data.addProductsToCart.user_errors).length) {
                            videoAlertssv(response.data.addProductsToCart.user_errors[0].message, 2000);
                        } else {
                            openCartPopupssv(btn);
                            // videoAlertssv(ssv_brandCustomizations.cart_success_message, 2000);
                        }

                        jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                        jQuery(btn).removeAttr('disabled');
                        jQuery('.quantity-inp-ssv').val('1');

                        // Cart count
                        jQuery('.cart-count-ssv').html(response.data.addProductsToCart.cart.total_quantity);
                    },
                    error: function (request, error) {
                        jQuery(btn).html(ssv_brandCustomizations.add_to_cart_btn);
                        jQuery(btn).removeAttr('disabled');
                        jQuery('.quantity-inp-ssv').val('1');

                        // Alert
                        videoAlertssv('Sold out!', 2000);
                    }
                });
            }
        }, 1000);
    }
}

function openAskquessv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.video-modal-askque-modal-ssv').css('transform', 'translateY(0%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').show();
    }, 300);

    if (window.innerWidth <= 768) {
        ssv_swiper_modal.allowSlideNext = false;
        ssv_swiper_modal.allowSlidePrev = false;
        ssv_swiper_modal.allowTouchMove = false;
    }
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

        if (window.innerWidth <= 768) {
            ssv_swiper_modal.allowSlideNext = true;
            ssv_swiper_modal.allowSlidePrev = true;
            ssv_swiper_modal.allowTouchMove = true;
        }
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
        // askQuestionStepssv(form, 2);
        registerationAction = 2;
        openUrpssv(form);
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
        user_id: 0,
        user_name: formData[0]['value'],
        user_phone_code: formData[1]['value'],
        user_phone: formData[2]['value']
    };
    localStorage.setItem('_ssv_user', JSON.stringify(user));
    ssv_userData = user;
    jQuery(form).closest('.video-modal-video-container-ssv').find('.askque-modal-btn1-ssv').click();

    return false;
}

let registerationAction = 0;
function userRegistrationssv(form) {
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
        user_id: 0,
        user_name: formData[0]['value'],
        user_phone_code: formData[1]['value'],
        user_phone: formData[2]['value']
    };
    localStorage.setItem('_ssv_user', JSON.stringify(user));
    ssv_userData = user;

    if (registerationAction == 1) {
        jQuery(form).closest('.video-modal-video-container-ssv').find('.video-modal-download-ssv').click();
    } else if (registerationAction == 2) {
        jQuery(form).closest('.video-modal-video-container-ssv').find('.askque-modal-btn1-ssv').click();
    } else if (registerationAction == 3) {
        jQuery(form).closest('.video-modal-video-container-ssv').find('.chat-input-ssv button').click();
    }


    jQuery(form).closest('.video-modal-video-container-ssv').find('.user-registration-popup-ssv input').val('');
    jQuery(form).closest('.video-modal-video-container-ssv').find('.user-registration-popup-ssv .urp-top-ssv img').click();

    registerationAction = 0;

    return false;
}

async function downloadVideossv(btn, videoURL, videoId, designerId) {
    let allowDownload = false;
    if (ssv_userData) {
        allowDownload = true;

        // Track download
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/ShortVideo/downloadVideo",
            data: "user_id=" + encodeURIComponent('0') + "&designer_id=" + encodeURIComponent(designerId) + "&swirls_id=" + encodeURIComponent(videoId) + "&username=" + encodeURIComponent(ssv_userData.user_name) + "&userphone=" + encodeURIComponent(ssv_userData.user_phone) + "&userphonecode=" + encodeURIComponent(ssv_userData.user_phone_code),
            success: function (response) {
                if (response.success == true) {
                } else {
                    console.log('Download track failed.')
                }
            },
            error: function (request, error) {
                console.log('Download track error.')
            }
        });
    } else {
        if (ssv_brandCustomizations.download_verfication == '1') {
            registerationAction = 1;
            openUrpssv(btn);
        } else {
            allowDownload = true;
        }
    }

    if (allowDownload) {
        videoAlertssv('Preparing...', 2000);
        try {
            const blob = await fetch(videoURL).then(response => response.blob());
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'video.mp4'; // Change the filename as needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

            videoAlertssv('Download started.', 2000);
        } catch (error) {
            videoAlertssv('Failed to download.', 2000);
            console.error('Error downloading the video:', error);
        }
    }
}

function sendChatssv(frm) {
    let formData = jQuery(frm).serializeArray();
    if (ssv_userData) { // Send chat and open window
        jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-history-input-ssv input').val(formData[0]['value']);
        jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-history-input-ssv button').click();
        jQuery(frm).find('input').val('');

        jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-history-ssv').fadeIn(1000);
        setTimeout(() => {
            jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-history-input-ssv input').focus();
        }, 1000);
    } else { // Register open
        registerationAction = 3;
        openUrpssv(frm);
    }

    return false;
}

function sendChatMessagessv(frm, videoId) {
    let formData = jQuery(frm).serializeArray();

    jQuery(frm).find('input').val('');

    // Append users message
    jQuery(`.chatssv-${videoId} .chat-messages-ssv`).append(`
    <div class="chat-message-R-ssv">
    <section>${formData[0]['value']}</section>
    </div>
    `);

    let chatDiv = jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-messages-ssv');
    chatDiv.scrollTop(chatDiv.prop("scrollHeight"));

    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://bigleap.live/index.php/api/Chatbot/QuestionsNew",
        data: {
            question: formData[0]['value'],
            gpt_prompt: ssv_gptPrompt[videoId]
        },
        beforeSend: function () {
        },
        success: function (response) {
            // <div class="chat-message-R-ssv">
            //     <section>Hi</section>
            // </div>
            // <div class="chat-message-L-ssv">
            //     <section>Hello there how can i assist you today?</section>
            // </div>
            jQuery(`.chatssv-${videoId} .chat-messages-ssv`).append(`                
            <div class="chat-message-L-ssv">
            <section>${response.reply}</section>
            </div>
            `);

            chatDiv.scrollTop(chatDiv.prop("scrollHeight"));
        },
        error: function (request, error) {
        },
        complete: function () {
        }
    });

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

    // Product block for phone
    if (window.innerWidth <= 768) {
        jQuery('.video-modal-product-block-ssv').css('transform', 'translateY(110%)');
        jQuery('.video-modal-product-block-product-multi-ssv').css('transform', 'translateX(110%)');
        jQuery('.product-rating-all-ssv').css('transform', 'translateY(110%)');
    }

    // User Verification popup
    jQuery('.user-registration-popup-ssv').hide();

    // Chat popup
    jQuery('.chat-history-ssv').hide();
}

function closeAnyPopupssv() {
    if (jQuery('.swiper-slide-active .video-modal-askque-modal-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
        closeAskquessv(jQuery('.swiper-slide-active .video-modal-askque-modal-top-ssv img'), false);
        if (window.innerWidth <= 768) {
            ssv_swiper_modal.allowSlideNext = true;
            ssv_swiper_modal.allowSlidePrev = true;
            ssv_swiper_modal.allowTouchMove = true;
        }
    }

    if (jQuery('.swiper-slide-active .video-modal-share-modal-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
        jQuery('.swiper-slide-active .video-modal-share-modal-top-ssv img').click();
    }

    if (jQuery('.swiper-slide-active .video-modal-product-block-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
        jQuery('.swiper-slide-active .video-modal-pb-close-ssv').click();
    }

    if (jQuery('.swiper-slide-active .product-rating-all-ssv').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
        jQuery('.swiper-slide-active .product-rating-all-close-ssv').click();
    }

    // if (jQuery('.swiper-slide-active .user-registration-popup-ssv').is(':visible')) {
    //     jQuery('.swiper-slide-active .user-registration-popup-ssv .urp-top-ssv img').click();
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
    jQuery(btn).find('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/heart-fill-2.webp');
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

function updateSwiperNavigationssv(swpr) {
    if (jQuery(window).width() >= 640 && jQuery(`${swpr} .swiper-slide`).length < 6) {
        jQuery(`${swpr} .swiper-button-next-ssv`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev-ssv`).addClass("swiper-button-disabled");
    } else if (jQuery(window).width() < 640 && jQuery(`${swpr} .swiper-slide`).length < 3) {
        jQuery(`${swpr} .swiper-button-next-ssv`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev-ssv`).addClass("swiper-button-disabled");
    }
}

function copyEmailEmbedssv(link, poster) {
    jQuery('.email-share-txt-ssv').val(
        `<center>
            <a href="${link}">
            <table cellpadding="0" cellspacing="0" border="0" style="min-height: 640px; min-width: 360px">
                <tbody>
                <tr>
                    <td aria-label="videoPreviewImage" style="background-image: url(${poster}); background-repeat: no-repeat; background-size: cover; background-position: center; border-radius: 25px; min-width: 100%;">
                    <span style="display: none">.</span>
                    <!--[if gte mso 9]>
                        <v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPreview" src="${poster}" style="behavior: url(#default#VML); height: {@height}; width: {@width}; top: 0; left: 0; border: 0; z-index: 1;"/>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="false" stroke="false" style="position: relative;">
                        <![endif]-->
                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="min-width: 100%">
                        <tbody>
                        <tr>
                            <td height="640" width="360" background="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play-icon.webp" style="background-image: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play-icon.webp); background-repeat: no-repeat; background-position: center; position: relative; display: inline-block; height: 640px; width:360px; min-width: 100%;">
                            <!--[if gte mso 9]><v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPlayButton" src={@button_url} style="behavior: url(#default#VML); position: absolute; top: {floor((@height/2)-40)}px; left:  {floor((@width/2)-40)}px; height: 80px; width: 80px; "/><![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--[if gte mso 9]></v:rect><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
            </a>
        </center>`
    );

    var htmlEditor = CodeMirror.fromTextArea(jQuery('.email-share-txt-ssv')[0], {
        mode: 'text/html'
    });
    copyFormattedHtmlssv(htmlEditor.getValue());
    videoAlertssv('Email embed code copied!', 2000);
}

function copyFormattedHtmlssv(html) {
    // Create an iframe (isolated container) for the HTML
    var container = document.createElement('div')
    container.innerHTML = html

    // Hide element
    container.style.position = 'fixed'
    container.style.pointerEvents = 'none'
    container.style.opacity = 0

    // Detect all style sheets of the page
    var activeSheets = Array.prototype.slice.call(document.styleSheets)
        .filter(function (sheet) {
            return !sheet.disabled
        })

    // Mount the iframe to the DOM to make `contentWindow` available
    document.body.appendChild(container)

    // Copy to clipboard
    window.getSelection().removeAllRanges()

    var range = document.createRange()
    range.selectNode(container)
    window.getSelection().addRange(range)

    document.execCommand('copy')
    // for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
    document.execCommand('copy')
    // for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false

    // Remove the iframe
    document.body.removeChild(container)
}

addEventListener('keydown', function (event) {
    if (event.key === "Escape" && jQuery('.video-modal-ssv').is(":visible")) {
        closessv();
    } else if (event.keyCode == 37 && jQuery('.video-modal-ssv').is(":visible")) {
        jQuery('.video-modal-ssv .swiper-button-prev-ssv').click(); //on left arrow
    } else if (event.keyCode == 39 && jQuery('.video-modal-ssv').is(":visible")) {
        jQuery('.video-modal-ssv .swiper-button-next-ssv').click();; //on right arrow
    }
});

addEventListener('resize', (event) => {
    setPopupHightssv();
});

window.onpopstate = function (event) {
    if (jQuery('.video-modal-ssv').is(":visible")) {
        closessv();
    }
};