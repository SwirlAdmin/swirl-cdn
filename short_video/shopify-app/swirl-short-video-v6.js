//v1 - Shopify - New design with new swiping up-down + Multiple Product + No Product + Multiple Page + PDP PIP (v10 Upgrade) [Reels] feature

// Global Defines
let ssv_mode = 'Live'; // Test, Live
let ssv_globalMute = true;
let ssv_pip = false;
let ssv_brandCustomizations = [];
let ssv_store = '';
let ssv_storeCode = '';
let ssv_storePlaylist = '';
let ssv_baseURL = ssv_mode === 'Live' ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/shopify-app/style-v5.min.css' : '';
let ssv_responseData = [];
let ssv_IdProducts = [];
let ssv_handleProducts = [];
let ssv_videoProducts = [];
let ssv_apiURL = 'https://bigleap.live/index.php/APIv1/shopifyApp/getPlaylistVideos'; // bigleap.live  ,  api.goswirl.live
let ssv_pdpapiURL = 'https://bigleap.live/index.php/APIv1/shopifyApp/getPDPVideos'; // bigleap.live  ,  api.goswirl.live
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
        let JSL1, JSL2, JSL3, JSL4, JSL5 = false;

        jQuery.getScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js", function () {
            JSL1 = true;
        });

        jQuery.getScript("https://cdn.gumlytics.com/insights/1.1/gumlet-insights.min.js", function () {
            JSL2 = true;
        });

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

        // Inits
        ssv_store = window.location.href.split('?')[0];
        ssv_store = ssv_store.split('#')[0];
        if (document.querySelector('#swirl-short-videos') != null) {
            ssv_storeCode = jQuery('#swirl-short-videos').data('code');
            ssv_storePlaylist = jQuery('#swirl-short-videos').data('playlist');

            localStorage.setItem('_ssv_storecode', ssv_storeCode);
            localStorage.setItem('_ssv_storeplaylist', ssv_storePlaylist);
        } else {
            ssv_pip = true;
            ssv_storeCode = localStorage.getItem('_ssv_storecode');
            ssv_storePlaylist = localStorage.getItem('_ssv_storeplaylist');
        }

        // Logged user
        if (localStorage.getItem('_ssv_user')) {
            ssv_userData = JSON.parse(localStorage.getItem('_ssv_user'));
        }

        // PDP or Normal
        let currentURL = window.location.href.split('?')[0];
        jQuery('#swirl-short-videos').data('pdp').split(',').forEach(uVal => {
            if (currentURL.includes(uVal)) ssv_pdppip = true;
        });
        if (ssv_pdppip) currentURL = getHandle(currentURL);
        let finalAPICall = ssv_pdppip ? ssv_pdpapiURL : ssv_apiURL;

        // fecth videos
        if (ssv_pdppip || ssv_storePlaylist) {
            jQuery.ajax({
                type: "POST",
                dataType: "json",
                url: finalAPICall,
                data: {
                    shortCode: ssv_storeCode,
                    playlistCode: ssv_storePlaylist,
                    pdpUrl: currentURL
                },
                success: function (data) {
                    // console.log(data);

                    if (localStorage.getItem('_ssv_storeResponseData') && localStorage.getItem('_ssv_pip') && ssv_pdppip) {
                        ssv_pip = true, ssv_pdppip = false;
                        ssv_responseData = JSON.parse(localStorage.getItem('_ssv_storeResponseData'));
                        ssv_brandCustomizations = ssv_responseData.swirls.data;
                        ssv_globalMute = ssv_brandCustomizations.auto_play_mute_un === "1" ? true : false;
                        // generate SSV
                        let SSVSL = setInterval(() => {
                            if (JSL1 && JSL2 && JSL3 && JSL4 && JSL5) {
                                // firebase.initializeApp({
                                //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                                //     authDomain: 'swirl-short-vido.firebaseapp.com',
                                //     projectId: 'swirl-short-vido',
                                //     storageBucket: 'swirl-short-vido.appspot.com'
                                // });
                                // ssv_fsdb = firebase.firestore();

                                generatessv(ssv_responseData.swirls.video);
                                clearInterval(SSVSL);
                            }
                        }, 300);

                        // check user cookie
                        if (getCookie('ssv_user')) {
                            setCookie('ssv_user', (parseInt(getCookie('ssv_user')) + 1), 365);
                        } else {
                            setCookie('ssv_user', 1, 365);
                        }
                    } else if (Object.keys(data.swirls).length > 0 && Object.keys(data.swirls.video).length > 0) {
                        ssv_responseData = data;
                        if (!ssv_pdppip) localStorage.setItem('_ssv_storeResponseData', JSON.stringify(ssv_responseData));
                        ssv_brandCustomizations = ssv_responseData.swirls.data;
                        ssv_globalMute = ssv_brandCustomizations.auto_play_mute_un === "1" ? true : false;

                        // PDP PIP
                        ssv_brandCustomizations.pdppip_hidecarousel = ssv_brandCustomizations.pdppip_hidecarousel == 1 ? true : false;
                        ssv_pdppipHideOnscreen = ssv_pdppip ? ssv_brandCustomizations.pdppip_hidecarousel : ssv_pdppipHideOnscreen;

                        // generate SSV
                        let SSVSL = setInterval(() => {
                            if (JSL1 && JSL2 && JSL3 && JSL4 && JSL5) {
                                // firebase.initializeApp({
                                //     apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                                //     authDomain: 'swirl-short-vido.firebaseapp.com',
                                //     projectId: 'swirl-short-vido',
                                //     storageBucket: 'swirl-short-vido.appspot.com'
                                // });
                                // ssv_fsdb = firebase.firestore();

                                generatessv(ssv_responseData.swirls.video);
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
        } else {
            console.log('SSV Absent!');
        }
    } else { // Not present
        console.log('SSV Absent!')
    }
}

// handle from URL
function getHandle(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle.split('/');
    handle = handle.at(-1) ? handle.at(-1) : handle.at(-2);

    return handle;
}

// Get Products filter for video
function productFilterssv(handles) {
    let products = [];
    handles.forEach(h => {
        if (typeof ssv_handleProducts[h] != 'undefined') { products.push(ssv_handleProducts[h]) };
    });

    return products;
}

// Helper function to make an AJAX request
function makeAjaxRequestssv(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.Shopify.routes.root + 'products/' + url + '.js');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
                let prd = JSON.parse(xhr.responseText);
                ssv_handleProducts[prd.handle] = prd;
                ssv_IdProducts[prd.id] = prd;
            } else {
                resolve(null);
            }
        };
        xhr.onerror = () => reject(Error('Network Error'));
        xhr.send();
    });
}

// Function to perform AJAX requests in a loop
function getAllShopifyProductssv(urls) {
    const requests = urls.map(url => makeAjaxRequestssv(url));
    return Promise.all(requests);
}

function generatessv(videos) {
    // Testing
    ssv_brandCustomizations.chat_bot = 0;

    let onpageSlides = '';
    let modalSlides = '';
    let swipeupTooltip = parseInt(getCookie('ssv_user')) <= 1 ? '<img class="video-modal-swipe-up-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirper-up.gif" alt="Tool Tip Swipe Up" />' : '';
    swipeupTooltip = '';
    let i = 0;

    // Fetch all handles of products of all videos
    let allHandles = [];
    videos.forEach(video => {
        if (video.brand_product_handle) {
            video.brand_product_handle.split(',').forEach(h => {
                if (!allHandles.includes(h)) allHandles.push(h);
            });
        }
    });

    // Fetch all products from shopify AJAX before init SSV 
    getAllShopifyProductssv(allHandles).then(responses => {
        // Continue with the SSV init        
        videos.forEach(video => {
            let shopifyProduct = video.brand_product_handle ? productFilterssv(video.brand_product_handle.split(',')) : [];
            shopifyProduct = Object.keys(shopifyProduct).length ? shopifyProduct : '';

            ssv_videoProducts[video.video_id] = shopifyProduct;

            // ${ssv_brandCustomizations.time_sec === '1' ? 'onloadeddata="updateDurationssv(this);" ontimeupdate="updateProgressDurationssv(this);"' : ''}
            if (!ssv_pip && !ssv_pdppipHideOnscreen) {
                if (shopifyProduct) shopifyProduct[0].price = shopifyProduct[0].price ? shopifyProduct[0].price : shopifyProduct[0].compare_at_price, shopifyProduct[0].description = shopifyProduct[0].description ? shopifyProduct[0].description : '';
                let outerProduct = shopifyProduct ? `
                    <div class="product-on-carousel-ssv" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="display: none !important;"' : ''}>                                    
                        <img src="${shopifyProduct[0].featured_image + '&width=100'}" alt="Product Image">                                        
                        
                        <h6 style="${Object.keys(shopifyProduct).length > 1 ? '' : 'display: none;'} background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">${Object.keys(shopifyProduct).length}</h6>
                        <p>${shopifyProduct[0].title}</p>
                        <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(shopifyProduct[0].price / 100).toFixed(2)} <strike ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(shopifyProduct[0].compare_at_price / 100).toFixed(2)}</strike>
                            <br><span ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? Math.round((((shopifyProduct[0].compare_at_price / 100).toFixed(2) - (shopifyProduct[0].price / 100).toFixed(2)) * 100) / (shopifyProduct[0].compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                    </div>
                ` : `
                    <div class="product-on-carousel-ssv" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="display: none !important;"' : ''}></div>
                `;
                onpageSlides += `
                    <div class="swiper-slide ms-${video.video_id}" onclick="playssv(${i})">
                        <video id="onpageVideossv-${video.video_id}" ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="margin-bottom: 0 !important;"' : ''} class="carousel-video-ssv" poster="${video.cover_image}" ${ssv_brandCustomizations['auto_play'] === '1' && i < 5 ? 'autoplay' : ''} loop onplay="jQuery(this).next().hide();" onpause="jQuery(this).next().show();" playsinline="" preload="metadata" data-setup="{}" muted>
                            <source src="${ssv_brandCustomizations['auto_play'] === '1' && i < 5 && video.cover_video ? video.cover_video : video.video_url}" type="video/mp4">
                        </video>
                        <img ${ssv_brandCustomizations.product_blog_img == '0' ? 'style="top: calc(50% - 20px) !important;"' : ''} class="carousel-video-play-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp"
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
            if (shopifyProduct) {
                if (Object.keys(shopifyProduct).length > 1) {
                    var pl = '';
                    var pb = '';
                    var pi = 0;

                    productTile += `
                        <button style="display: none;" onclick="nextPrevTilessv(this, 'prev');" class="video-modal-product-tile-prev-ssv">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp" alt="Previous icon">
                        </button>
                        <button onclick="nextPrevTilessv(this, 'next');" class="video-modal-product-tile-next-ssv">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp" alt="Next icon">
                        </button>
                    `;

                    shopifyProduct.forEach(product => {
                        product.price = product.price ? product.price : product.compare_at_price, product.description = product.description ? product.description : '';
                        pi++;

                        let productVariantSelection = '';
                        if (Object.keys(product.variants).length > 1) {
                            productVariantSelection = '<div class="variant-selection-pb-ssv">';
                            let op = 0;
                            product.options.forEach(option => {
                                op++;
                                productVariantSelection += `
                                    <div class="variant-selection-col-pb-ssv">
                                        <p>${option.name}</p>
                                        <select name="ssvoption${op}">
                                `;
                                opv = 0;
                                option.values.forEach(v => {
                                    opv++;
                                    productVariantSelection += `
                                        <option value="${v}" ${opv == 1 ? 'selected' : ''}>${v}</option>
                                    `;
                                });
                                productVariantSelection += `                                        
                                        </select>
                                    </div>
                                `;
                            });
                            productVariantSelection += '</div>';
                        }

                        productTile += `
                            <div class="video-modal-product-tile-ssv" onclick="openListProductssv(this, ${pi});">
                                <div class="product-info-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' ? 'style="width: 100% !important;"' : ''}">
                                    <div class="product-image-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'display: block !important;' : ''}">
                                        <img alt="Product Image"
                                            src="${product.featured_image + 'width=150'}" />
                                    </div>
                                    <div class="product-detail-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'width: calc(100% - 75px) !important;' : ''}">
                                        <p>${product.title}</p>
                                        <section>${product.description}</section>
                                        <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(product.price / 100).toFixed(2)} <strike ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(product.compare_at_price / 100).toFixed(2)}</strike>
                                            <br><span ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? Math.round((((product.compare_at_price / 100).toFixed(2) - (product.price / 100).toFixed(2)) * 100) / (product.compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                                    </div>
                                </div>
                                <div class="product-buy-btn-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' ? 'style="display: none !important;"' : ''}">
                                    <button style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">
                                        ${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}
                                        <img style="display: none !important;" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/forward-arrow.webp"
                                            alt="Forward icon">
                                    </button>
                                </div>
                            </div>
                        `;

                        pl += `
                            <div class="product-list-block-ssv" onclick="openListProductssv(this, ${pi});">
                                <div class="product-list-block-image-ssv">
                                    <img alt="Product Image" src="${product.featured_image + 'width=150'}">
                                </div>
                                <div class="product-list-block-detail-ssv">
                                    <p>${product.title}</p>
                                    <section>${product.description}</section>
                                    <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(product.price / 100).toFixed(2)} <strike ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(product.compare_at_price / 100).toFixed(2)}</strike>
                                        <span ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? Math.round((((product.compare_at_price / 100).toFixed(2) - (product.price / 100).toFixed(2)) * 100) / (product.compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                                </div>
                                <div class="product-list-block-open-ssv">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp" alt="Previous icon">
                                </div>
                            </div>
                        `;

                        pb += `
                            <div class="video-modal-product-block-product-ssv video-modal-product-block-product-multi-ssv" style="transform: translateX(110%);">
                                <div class="product-top-pb-ssv product-top-pb-multi-ssv">
                                    <img class="video-modal-pb-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                        alt="Previous icon" onclick="closeListProductssv(this);">                                                              
                                </div>
                                <div class="product-middle-pb-ssv">                            
                                    <div class="product-detail-pb-ssv">
                                        <div class="product-image-pb-ssv">
                                            <img alt="Product Image"
                                                src="${product.featured_image + 'width=150'}" />
                                        </div>
                                        <div class="product-detail-block-pb-ssv">
                                            <p>${product.title}</p>
                                            <section>${product.description}</section>
                                            <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(product.price / 100).toFixed(2)} <strike ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(product.compare_at_price / 100).toFixed(2)}</strike>
                                                <span ${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((product.compare_at_price / 100).toFixed(2)) > parseFloat((product.price / 100).toFixed(2)) ? Math.round((((product.compare_at_price / 100).toFixed(2) - (product.price / 100).toFixed(2)) * 100) / (product.compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                                        </div>
                                    </div>                            
                                    <div class="product-desc-pb-ssv">
                                        <p>Product Details</p>
                                        <section>${product.description}</section>
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
                                    ${productVariantSelection}
                                    <div class="product-rating-ssv prssv-${video.video_id}">
                                    </div>
                                    <div class="product-rating-all-ssv prassv-${video.video_id}">
                                    </div>
                                </div>
                                <div class="product-bottom-pb-ssv">
                                    <button class="product-addtocart-pb-ssv" onclick="addtocartssv(${video.video_id}, ${product.id}, ${Object.keys(product.options).length}, this); CTAClicksssv(${product.id}, '${product.title}', '${product.featured_image + 'width=150'}', '${location.origin + '/products/' + product.handle}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: calc(100% - 65px) !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</button>
                                    <a href="${location.origin + '/products/' + product.handle}" onclick="CTAClicksssv(${product.id}, '${product.title}', '${product.featured_image + 'width=150'}', '${location.origin + '/products/' + product.handle}', ${video.designer_id}, ${video.video_id}, '1');">
                                        <button class="product-buynow-pb-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                                    </a>
                                    <a href="${window.location.origin}/cart">
                                    <button class="product-cart-pb-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' || ssv_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">                                            
                                            <g>
                                                <path class="st1" d="M14.7,16.4L10,11.8l2-2l4.7,4.7h21.9c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.5,0.4c0.1,0.2,0.2,0.4,0.3,0.6   c0,0.2,0,0.4,0,0.7l-3.4,11.5c-0.1,0.3-0.3,0.6-0.5,0.7c-0.2,0.2-0.5,0.3-0.9,0.3H17.5v2.9h15.8v2.9H16.1c-0.4,0-0.7-0.2-1-0.4   c-0.3-0.3-0.4-0.6-0.4-1V16.4z M17.5,17.3v8.6h16.5l2.6-8.6H17.5z M16.8,40.2c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-1-0.6-1.5   c0-0.6,0.2-1.1,0.6-1.5c0.4-0.4,1-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.5c0,0.6-0.2,1.1-0.6,1.5   C17.9,40,17.4,40.2,16.8,40.2z M34,40.2c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-1-0.6-1.5c0-0.6,0.2-1.1,0.6-1.5   c0.4-0.4,1-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.5c0,0.6-0.2,1.1-0.6,1.5C35.2,40,34.6,40.2,34,40.2z"/>
                                            </g>
                                        </svg>
                                        <label class="cart-count-ssv" style="line-height: 20px !important; background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">
                                            ${ssv_brandCustomizations.dot_class && jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0 ? parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()) : ''}
                                        </label>
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
                } else {
                    shopifyProduct[0].price = shopifyProduct[0].price ? shopifyProduct[0].price : shopifyProduct[0].compare_at_price, shopifyProduct[0].description = shopifyProduct[0].description ? shopifyProduct[0].description : '';
                    let productVariantSelection = '';
                    if (Object.keys(shopifyProduct[0].variants).length > 1) {
                        productVariantSelection = '<div class="variant-selection-pb-ssv">';
                        let op = 0;
                        shopifyProduct[0].options.forEach(option => {
                            op++;
                            productVariantSelection += `
                                    <div class="variant-selection-col-pb-ssv">
                                        <p>${option.name}</p>
                                        <select name="ssvoption${op}">
                                `;
                            opv = 0;
                            option.values.forEach(v => {
                                opv++;
                                productVariantSelection += `
                                        <option value="${v}" ${opv == 1 ? 'selected' : ''}>${v}</option>
                                    `;
                            });
                            productVariantSelection += `                                        
                                        </select>
                                    </div>
                                `;
                        });
                        productVariantSelection += '</div>';
                    }

                    productTile = `
                        <div class="video-modal-product-tile-ssv" onclick="openProductssv(this);">
                            <div class="product-info-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' ? 'style="width: 100% !important;"' : ''}">
                                <div class="product-image-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'display: block !important;' : ''}">
                                    <img alt="Product Image"
                                        src="${shopifyProduct[0].featured_image + 'width=150'}" />
                                </div>
                                <div class="product-detail-pt-ssv" style="${ssv_brandCustomizations.mobile_product_tile_img == '1' ? 'width: calc(100% - 75px) !important;' : ''}">
                                    <p>${shopifyProduct[0].title}</p>
                                    <section>${shopifyProduct[0].description}</section>
                                    <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(parseFloat(shopifyProduct[0].price / 100)).toFixed(2)} <strike ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(shopifyProduct[0].compare_at_price / 100).toFixed(2)}</strike>
                                        <br><span ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? Math.round((((shopifyProduct[0].compare_at_price / 100).toFixed(2) - parseFloat((shopifyProduct[0].price / 100).toFixed(2))) * 100) / (shopifyProduct[0].compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                                </div>
                            </div>
                            <div class="product-buy-btn-pt-ssv" style="${ssv_brandCustomizations.product_tile_cta_btn == '0' ? 'style="display: none !important;"' : ''}">
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
                            <div class="product-top-pb-ssv">
                                <img class="video-modal-pb-close-ssv" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                    alt="Previous icon" onclick="closeProductssv(this);">                                                              
                            </div>
                            <div class="product-middle-pb-ssv">                            
                                <div class="product-detail-pb-ssv">
                                    <div class="product-image-pb-ssv">
                                        <img alt="Product Image"
                                            src="${shopifyProduct[0].featured_image + 'width=150'}" />
                                    </div>
                                    <div class="product-detail-block-pb-ssv">
                                        <p>${shopifyProduct[0].title}</p>
                                        <section>${shopifyProduct[0].description}</section>
                                        <label ${ssv_brandCustomizations.product_price_status == '0' ? 'style="display: none !important;"' : ''}>${ssv_brandCustomizations.currencySymbol}${(parseFloat(shopifyProduct[0].price / 100)).toFixed(2)} <strike ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${ssv_brandCustomizations.currencySymbol}${(shopifyProduct[0].compare_at_price / 100).toFixed(2)}</strike>
                                            <span ${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? '' : 'style="display: none;"'}>${parseFloat((shopifyProduct[0].compare_at_price / 100).toFixed(2)) > parseFloat((shopifyProduct[0].price / 100).toFixed(2)) ? Math.round((((shopifyProduct[0].compare_at_price / 100).toFixed(2) - parseFloat((shopifyProduct[0].price / 100).toFixed(2))) * 100) / (shopifyProduct[0].compare_at_price / 100).toFixed(2)) : ''}% OFF</span></label>
                                    </div>
                                </div>                            
                                <div class="product-desc-pb-ssv">
                                    <p>Product Details</p>
                                    <section>${shopifyProduct[0].description}</section>
                                    <li>Material: Cotton Mul Mul</li>
                                    <li>Material: Cotton Mul Mul</li>
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
                                ${productVariantSelection}
                                <div class="product-rating-ssv prssv-${video.video_id}">
                                </div>
                                <div class="product-rating-all-ssv prassv-${video.video_id}">
                                </div>
                            </div>
                            <div class="product-bottom-pb-ssv">
                                <button class="product-addtocart-pb-ssv" onclick="addtocartssv(${video.video_id}, ${shopifyProduct[0].id}, ${Object.keys(shopifyProduct[0].options).length}, this); CTAClicksssv(${shopifyProduct[0].id}, '${shopifyProduct[0].title}', '${shopifyProduct[0].featured_image + 'width=150'}', '${location.origin + '/products/' + shopifyProduct[0].handle}', ${video.designer_id}, ${video.video_id}, '2');" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.buy_now == '0' ? 'width: calc(100% - 65px) !important;' : ''}">${ssv_brandCustomizations.add_to_cart_btn}</button>
                                <a href="${location.origin + '/products/' + shopifyProduct[0].handle}" onclick="CTAClicksssv(${shopifyProduct[0].id}, '${shopifyProduct[0].title}', '${shopifyProduct[0].featured_image + 'width=150'}', '${location.origin + '/products/' + shopifyProduct[0].handle}', ${video.designer_id}, ${video.video_id}, '1');">
                                    <button class="product-buynow-pb-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''} ${ssv_brandCustomizations.view_cart == '0' ? 'width: calc(50% - 5px) !important;' : ''} ${ssv_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                                </a>
                                <a href="${window.location.origin}/cart">
                                <button class="product-cart-pb-ssv" style="background: none !important; border: 2px solid ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; color: ${ssv_brandCustomizations.front_color_add_to_cart_btn} !important; ${ssv_brandCustomizations.add_to_cart == '0' || ssv_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">                                        
                                        <g>
                                            <path class="st1" d="M14.7,16.4L10,11.8l2-2l4.7,4.7h21.9c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.5,0.4c0.1,0.2,0.2,0.4,0.3,0.6   c0,0.2,0,0.4,0,0.7l-3.4,11.5c-0.1,0.3-0.3,0.6-0.5,0.7c-0.2,0.2-0.5,0.3-0.9,0.3H17.5v2.9h15.8v2.9H16.1c-0.4,0-0.7-0.2-1-0.4   c-0.3-0.3-0.4-0.6-0.4-1V16.4z M17.5,17.3v8.6h16.5l2.6-8.6H17.5z M16.8,40.2c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-1-0.6-1.5   c0-0.6,0.2-1.1,0.6-1.5c0.4-0.4,1-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.5c0,0.6-0.2,1.1-0.6,1.5   C17.9,40,17.4,40.2,16.8,40.2z M34,40.2c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-1-0.6-1.5c0-0.6,0.2-1.1,0.6-1.5   c0.4-0.4,1-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.5c0,0.6-0.2,1.1-0.6,1.5C35.2,40,34.6,40.2,34,40.2z"/>
                                        </g>
                                    </svg>
                                    <label class="cart-count-ssv" style="line-height: 20px !important; background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">
                                        ${ssv_brandCustomizations.dot_class && jQuery(`.${ssv_brandCustomizations.dot_class}`).length > 0 ? parseInt(jQuery(`.${ssv_brandCustomizations.dot_class}`).html()) : ''}
                                    </label>
                                </button>
                                </a>
                            </div>
                        </div>
                    `;
                }
            } else {
                video.product_link = '';
                buynowBtn = video.product_link && ssv_brandCustomizations.buy_now == '1' ? `
                    <a href="${video.product_link}">
                        <button class="video-redirect-btn-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important; ${ssv_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}">${video.cta_customization ? video.cta_customization : ssv_brandCustomizations.buy_btn}</button>
                    </a>
                ` : '';
            }

            modalSlides += `
                <div class="swiper-slide ${!shopifyProduct ? 'no-product-ssv' : ''} ${buynowBtn ? 'video-redirect-on-ssv' : ''}">
                    <div class="video-modal-video-container-ssv">
                        <div class="video-modal-fade-ssv" onclick="closeAnyPopupssv();"></div>
                        <video id="modalVideossv-${video.video_id}" loop playsinline="" data-setup="{}" onplay="jQuery(this).next().hide()"
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
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/close.svg"
                                alt="Close icon">
                        </button>                    
                        <button class="video-modal-pip-ssv" title="PIP Mode" onclick="playpipssv();" style="${ssv_brandCustomizations.pip_mode == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important;">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/pip.svg"
                                alt="PIP icon">
                        </button>  

                        <div class="video-modal-actions-ssv">
                            <div class="SWIRLhearts ${ssv_brandCustomizations.ask_question == '0' ? 'askoff' : ''}" style="display: none !important;"></div>                
                            <button class="video-modal-like-ssv ${ssv_brandCustomizations.ask_question == '0' ? 'askoff' : ''}" title="Like" onclick="likeVideossv(this, ${video.video_id}, ${video.designer_id});" style="background: rgb(0, 0, 0, .6) !important; display: none !important;">
                                <img src="${getCookie(`ssv_vl_${video.video_id}`) ? 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/heart-filled.svg' : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/heart.svg'}"
                                    alt="Heart icon">
                                <p class="videoLikes-${video.video_id}">Like</p>
                            </button>  
                            <button class="video-modal-askque-ssv" title="Ask Question" onclick="openAskquessv(this);" style="${ssv_brandCustomizations.ask_question == '0' ? 'display: none !important;' : ''} background: rgb(0, 0, 0, .6) !important; display: none !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/ask-question.webp"
                                    alt="Question icon">
                                <p>Question</p>
                            </button>                      
                            <button class="video-modal-volume-ssv" title="Mute/Unmute" onclick="volumessv(this)" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                                    alt="Volume icon">
                                <p>Mute</p>
                            </button>
                            <button class="video-modal-share-ssv" title="Share" onclick="openSharessv(this);" style="background: rgb(0, 0, 0, .6) !important;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/share.svg"
                                    alt="Share icon">
                                <p>Share</p>
                            </button>
                        </div>

                        <div class="video-modal-product-tile-carousel-ssv" onscroll="nextPrevTileIconssv(this);">
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

                        <div class="registration-for-chat-ssv">
                            <div class="rfc-top-ssv">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                    alt="Previous icon" onclick="closeRfcssv(this);">
                                <p>Register yourself</p>     
                            </div>
                            <div class="rfc-form-ssv">
                                <form onsubmit="return registerRfcUserssv(this, ${video.video_id});">
                                    <input name="fullname" type="text" placeholder="Enter your name" style="margin-bottom: 8px !important;" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required />
                                    <input name="code" id="codeRfc${video.video_id}" type="hidden" value="91" />
                                    <input name="phone" id="phoneRfc${video.video_id}" type="text" style="margin: 0px !important;" placeholder="Enter your phone" pattern=".{10,10}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum 10 and maximim 10 digits." required />                                
                                    <button class="rfc-btn-ssv" style="background: ${ssv_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv_brandCustomizations.front_color_buy_btn} !important;">Register</button>                           
                                </form>
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

                        ${swipeupTooltip}

                        <p class="video-modal-alert-ssv"></p>                        
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
        let chatBoatCSS = ssv_brandCustomizations.chat_bot == '1' ? `
            .video-modal-product-tile-carousel-ssv {
                bottom: 75px;
            }
            
            .video-modal-actions-ssv, .video-progress-ssv {
                bottom: 200px
            }

            .video-modal-product-tile-next-ssv, .video-modal-product-tile-prev-ssv {
                bottom: 105px;
            }

            @media (min-width: 768px) {
                .video-modal-actions-ssv, .video-progress-ssv {
                    bottom: 90px;
                }
            }

            .no-product-ssv .video-modal-actions-ssv, .no-product-ssv .video-progress-ssv {
                bottom: 90px;
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

                    .product-cart-pb-ssv svg path {
                        fill: ${ssv_brandCustomizations.front_color_add_to_cart_btn};
                    }

                    ${chatBoatCSS}
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
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/close.svg"
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

            // Rfc
            jQuery(`#phoneRfc${video.video_id}`).intlTelInput({
                initialCountry: "in",
                separateDialCode: true,
                // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
            }).on('countrychange', function () {
                jQuery(`#codeRfc${video.video_id}`).val(jQuery(`#phoneRfc${video.video_id}`).intlTelInput("getSelectedCountryData").dialCode);
            });

            // Player registration [Gumlet]    
            var videoPlayer = document.getElementById(`modalVideossv-${video.video_id}`);
            var gumletInsights = gumlet.insights(ssv_gumletConfig);
            gumletInsights.registerHTML5Player(videoPlayer);

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

            // Stamped IO Reviews
            let shopifyProduct = video.brand_product_handle ? productFilterssv(video.brand_product_handle.split(',')) : [];
            shopifyProduct = Object.keys(shopifyProduct).length ? shopifyProduct : '';
            if (shopifyProduct && ssv_brandCustomizations.stamped === 1) {
                shopifyProduct.forEach(product => {
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

                    updateShopifyCartssv();

                    // Update preview thumbs
                    if (ssv_brandCustomizations.next_previous_preview == '1') {
                        updatePreviewThumbsssv(`.swiper-ssv-m`);
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
    });
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

    jQuery('.swiper-ssv-c .swiper-slide video').each(function () {
        jQuery(this)[0].pause();
    });
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

function getVariantIdssv(variants, options, btn) {
    let variantId = 0;
    let selected = { option1: null, option2: null, option3: null };
    for (let i = 1; i <= options; i++) {
        selected['option' + i] = jQuery(btn).closest('.video-modal-product-block-product-ssv').find(`select[name="ssvoption${i}"]`).val();
    }

    variants.forEach(v => {
        if (v['option1'] == selected['option1'] && v['option2'] == selected['option2'] && v['option3'] == selected['option3']) {
            variantId = v.id;
        }
    });

    return variantId;
}

function addtocartssv(videoId, productId, options, btn) {
    let product = ssv_IdProducts[productId];
    let quantity = parseInt(jQuery(btn).closest('.video-modal-product-block-product-ssv').find('.quantity-inp-ssv').val());

    let variantId = options ? getVariantIdssv(product.variants, options, btn) : product.variants[0].id;
    variantId = variantId == 0 ? product.variants[0].id : variantId;

    jQuery(btn).attr('disabled', 'disabled');
    jQuery(btn).html('Adding..');

    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: {
            items: [
                {
                    id: variantId,
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
        videoAlertssv('Added to cart!', 2000);

        updateShopifyCartssv();
    });
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
    jQuery(btn).find('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/shopify/heart-filled.svg');
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
        jQuery(`${swpr} .swiper-button-next`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev`).addClass("swiper-button-disabled");
    } else if (jQuery(window).width() < 640 && jQuery(`${swpr} .swiper-slide`).length < 3) {
        jQuery(`${swpr} .swiper-button-next`).addClass("swiper-button-disabled");
        jQuery(`${swpr} .swiper-button-prev`).addClass("swiper-button-disabled");
    }
}

// Rfc 
function openRfcssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.registration-for-chat-ssv').css('transform', 'translateY(0%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').show();
    }, 300);
}

function closeRfcssv(btn) {
    jQuery(btn).closest('.video-modal-video-container-ssv').find('.registration-for-chat-ssv').css('transform', 'translateY(110%)');
    setTimeout(() => {
        jQuery('.video-modal-fade-ssv').hide();
    }, 300);
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
        openRfcssv(frm);
    }

    return false;
}

function registerRfcUserssv(frm) {
    let formData = jQuery(frm).serializeArray();

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

    closeRfcssv(frm);
    jQuery(frm).closest('.video-modal-video-container-ssv').find('.chat-input-ssv button').click();

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
            gpt_prompt: ssv_videoProducts[videoId] ? JSON.stringify(ssv_videoProducts[videoId]) : ssv_videoProducts[videoId]
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