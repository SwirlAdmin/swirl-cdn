let productsAll = [],
    addedtoCart = [],
    globalMute = !0,
    brandCustomizations = [],
    SSVallURL = [],
    SSVCurrentURL = "",
    isVerified = !1,
    SWIRLuser = null;
localStorage.getItem("SWIRLVerifiedUser") && ((isVerified = !0), (SWIRLuser = JSON.parse(localStorage.getItem("SWIRLVerifiedUser"))));
let live_stream_phone = "0",
    live_stream_phone_otp = "0",
    SSVvideosAll = "",
    store = "satyamgandhidev.com";
var headTag = document.getElementsByTagName("head")[0];
function ssvPlayWithPromise(e) {
    var t = e.play();
    void 0 !== t && t.then((e) => {}).catch((e) => {});
}
function updateSSVDurations(e) {
    var t = String(Math.floor(parseInt(e.duration / 60, 10))).padStart(2, "0"),
        o = String(Math.floor(e.duration % 60)).padStart(2, "0");
    $(e)
        .parent(".swiper-slide")
        .children(".SSV-video-timer-top")
        .children("p")
        .html(t + ":" + o);
}
function updateSSVProgressBar(e) {
    var t = Math.floor((100 / e.duration) * e.currentTime);
    $(e)
        .parent(".swiper-slide")
        .children(".SSV-video-progress")
        .children(".SSV-video-progress-inner")
        .css("width", t + "%");
    var o = String(Math.floor(parseInt(e.duration - e.currentTime) / 60, 10)).padStart(2, "0"),
        i = String(Math.floor(parseInt(e.duration - e.currentTime) % 60)).padStart(2, "0");
    $(e)
        .parent(".swiper-slide")
        .children(".SSV-video-timer-top")
        .children("p")
        .html(o + ":" + i);
}
function SSVpauseAll(e = "") {
    if (
        (jQuery(".swiper-slide video").each(function () {
            jQuery(this).get(0).pause();
        }),
        e)
    ) {
        var t = e.get(0).play();
        void 0 !== t && t.then((e) => {}).catch((e) => {});
    }
}
function updateSSVModalProgressBar(e) {
    var t = Math.floor((100 / e.duration) * e.currentTime);
    $(e)
        .parent(".SSV-play-modal-video-container")
        .children(".SSV-video-popup-progress")
        .children(".SSV-video-popup-progress-inner")
        .css("width", t + "%");
}
function updateSSVModalInfos(e) {
    let t = localStorage.getItem("SSVlastPlayedData") && localStorage.getItem("SSVlastPlayed") ? JSON.parse(localStorage.getItem("SSVlastPlayedData")) : "";
    t && (productsAll[t.vid] = t.product),
        jQuery(".SSV-play-modal-buynow-on").html(brandCustomizations.buy_btn),
        jQuery(".SSV-pm-buy-now").html(brandCustomizations.buy_btn),
        jQuery(".SSV-pmm-buy-now").html(brandCustomizations.buy_btn),
        jQuery(".SSV-pm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
        jQuery(".SSV-pmm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
        jQuery(".SSV-play-modal-buynow-on").hide(),
        jQuery(".SSV-video-popup-brand-info").hide(),
        jQuery(".SSV-video-product-open").hide(),
        jQuery(".SSV-video-popup-share").hide(),
        jQuery(".SSV-video-popup-product").hide(),
        jQuery(".SSV-video-popup-product-multi").hide(),
        jQuery(".SSV-video-popup-product-list-multi").hide(),
        jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover"),
        jQuery(".SSV-video-popup-brand-info").removeClass("SSV-video-popup-brand-info-cover"),
        jQuery(".SSV-video-popup-share").removeClass("SSV-video-popup-share-cover"),
        jQuery(".SSV-video-popup-product-list-multi").removeClass("SSV-video-popup-product-list-multi-cover"),
        jQuery(".SSV-video-popup-product-list-multi-product-detail").hide(),
        jQuery(".SSV-video-popup-product-list-multi-append").show();
    let o = $(e).children("source").attr("src"),
        i = $(`.swiper-wrapper source[src="${o}"]`).length ? $(`.swiper-wrapper source[src="${o}"]`).parent("video").attr("data-title") : t.title;
    $(e).parent(".SSV-play-modal-video-container").children(".SSV-video-popup-title").html(i);
    let a = $(`.swiper-wrapper source[src="${o}"]`).length ? $(`.swiper-wrapper source[src="${o}"]`).parent("video").attr("data-vid") : t.vid,
        r = productsAll[a];
    if (Object.keys(r).length > 0)
        if (1 === Object.keys(r).length) {
            let e = r[0];
            if (
                ((e.desription = e.desription.trim()),
                jQuery(".SSV-video-popup-product p").html(e.title),
                jQuery(".SSV-video-popup-product label").html(e.currencysymbols + " " + e.price),
                jQuery(".SSV-video-popup-product img").attr("src", e.image),
                setTimeout(() => {
                    jQuery(".SSV-video-popup-product").show();
                }, 100),
                jQuery(".SSV-video-product-open p").html(e.title),
                e.desription)
            ) {
                let t =
                    e.desription.length > 200
                        ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' +
                          e.desription.substr(0, 196) +
                          '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' +
                          e.desription +
                          ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>'
                        : e.desription;
                jQuery(".SSV-video-product-open section").html(t), jQuery(".SSV-video-product-open section").show(), jQuery(".SSV-video-product-open span").show();
            } else jQuery(".SSV-video-product-open section").hide(), jQuery(".SSV-video-product-open span").hide();
            jQuery(".SSV-video-product-open label").html(e.currencysymbols + " " + e.price),
                jQuery(".SSV-video-product-open img").attr("src", e.image),
                "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-product-open").show(), jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover"));
            let t = e.url;
            t
                ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", t),
                  jQuery(".SSV-play-modal-addtocart").attr("data-pid", e.product_id),
                  addedtoCart.includes(t)
                      ? (jQuery(".SSV-pm-add-to-cart").html("View Cart"), jQuery(".SSV-pm-add-to-cart").attr("data-action", "3"))
                      : (jQuery(".SSV-pm-add-to-cart").html("Add to Cart"), jQuery(".SSV-pm-add-to-cart").attr("data-action", "1")),
                  t.search(store) >= 0 ? jQuery(".SSV-pm-add-to-cart").show() : jQuery(".SSV-pm-add-to-cart").hide())
                : jQuery(".SSV-play-modal-addtocart").hide();
        } else {
            jQuery(".SSV-video-popup-product-multi img").attr("src", r[0].image), jQuery(".SSV-video-popup-product-multi .counter").html(r.length);
            let e = "";
            r.forEach((t) => {
                e += `\n                    <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">\n                        <img src="${
                    t.image
                }" alt="Product Image" height="" width="">\n                        <div>\n                            <p data-pid="${t.product_id}" data-desc="${t.desription.replace('"', "").replace("<", "").replace(">", "")}">${
                    t.title
                }</p>\n                            <label data-link="${t.url}">${t.currencysymbols + " " + t.price}</label>\n                        </div>\n                    </div>\n                `;
            }),
                jQuery(".SSV-video-popup-product-list-multi-append").html(e),
                setTimeout(() => {
                    jQuery(".SSV-video-popup-product-multi").show();
                }, 100);
        }
    else
        jQuery(".SSV-play-modal-buynow-on").show(),
            jQuery(".SSV-play-modal-buynow-on").attr("data-link", jQuery(`.swiper-wrapper source[src="${o}"]`).length ? jQuery(`.swiper-wrapper source[src="${o}"]`).parent("video").attr("data-productlink") : t.productlink),
            jQuery(".SSV-video-popup-product").hide(),
            jQuery(".SSV-video-product-open").hide(),
            jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover");
    let l = SSVallURL.indexOf(o);
    if (
        (jQuery(".SSV-modal-left").show(),
        jQuery(".SSV-modal-right").show(),
        void 0 === SSVallURL[l + 1] && jQuery(".SSV-modal-right").hide(),
        void 0 === SSVallURL[l - 1] && jQuery(".SSV-modal-left").hide(),
        1 == globalMute
            ? (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"), jQuery(".SSV-play-modal video").prop("muted", globalMute))
            : (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg"), jQuery(".SSV-play-modal video").prop("muted", globalMute)),
        "1" === brandCustomizations.pip_mode)
    )
        if ((localStorage.setItem("SSVlastPlayed", o), jQuery(`.swiper-wrapper source[src="${o}"]`).length)) {
            let e = $(`.swiper-wrapper source[src="${o}"]`).parent("video").data();
            (e.product = productsAll[e.vid]), localStorage.setItem("SSVlastPlayedData", JSON.stringify(e));
        } else t && localStorage.setItem("SSVlastPlayedData", JSON.stringify(t));
    brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(), jQuery(".SSV-pmm-add-to-cart").hide());
}
function openMultiProductDetail(e) {
    jQuery(".SSV-video-popup-product-list-multi-product-detail p").html(jQuery(e).find("p").html());
    let t = jQuery(e).find("p").attr("data-desc");
    if (t) {
        let e =
            t.length > 200
                ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' +
                  t.substr(0, 196) +
                  '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' +
                  t +
                  ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>'
                : t;
        jQuery(".SSV-video-popup-product-list-multi-product-detail section").html(e), jQuery(".SSV-video-popup-product-list-multi-product-detail section").show(), jQuery(".SSV-video-popup-product-list-multi-product-detail span").show();
    } else jQuery(".SSV-video-popup-product-list-multi-product-detail section").hide(), jQuery(".SSV-video-popup-product-list-multi-product-detail span").hide();
    jQuery(".SSV-video-popup-product-list-multi-product-detail label").html(jQuery(e).find("label").html()),
        jQuery(".SSV-video-popup-product-list-multi-product-detail img").attr("src", jQuery(e).find("img").attr("src")),
        "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-popup-product-list-multi").show(), jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover"));
    let o = jQuery(e).find("label").attr("data-link");
    o
        ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", o),
          jQuery(".SSV-play-modal-addtocart").attr("data-pid", jQuery(e).find("p").attr("data-pid")),
          addedtoCart.includes(o)
              ? (jQuery(".SSV-pmm-add-to-cart").html("View Cart"), jQuery(".SSV-pmm-add-to-cart").attr("data-action", "3"))
              : (jQuery(".SSV-pmm-add-to-cart").html("Add to Cart"), jQuery(".SSV-pmm-add-to-cart").attr("data-action", "1")),
          o.search(store) >= 0 ? jQuery(".SSV-pmm-add-to-cart").show() : jQuery(".SSV-pmm-add-to-cart").hide())
        : jQuery(".SSV-play-modal-addtocart").hide(),
        jQuery(".SSV-video-popup-product-list-multi-append").hide(),
        jQuery(".SSV-video-popup-product-list-multi-product-detail").show(),
        brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(), jQuery(".SSV-pmm-add-to-cart").hide());
}
function updateSSVPIPInfos(e) {
    if ("1" === brandCustomizations.pip_mode) {
        let t = $(e).children("source").attr("src");
        localStorage.setItem("SSVlastPlayed", t);
    }
}
function dragElement(e) {
    var t = 0,
        o = 0,
        i = 0,
        a = 0;
    function r(e) {
        (e = e || window.event).preventDefault(), (i = e.clientX), (a = e.clientY), (document.onmouseup = s), (document.onmousemove = l);
    }
    function l(r) {
        (r = r || window.event).preventDefault(), (t = i - r.clientX), (o = a - r.clientY), (i = r.clientX), (a = r.clientY), (e.style.top = e.offsetTop - o + "px"), (e.style.left = e.offsetLeft - t + "px");
    }
    function s() {
        (document.onmouseup = null), (document.onmousemove = null);
    }
    document.getElementById(e.id + "header") ? (document.getElementById(e.id + "header").onmousedown = r) : (e.onmousedown = r);
}
function SSVcopyLink(e) {
    var t = e;
    t.select(), t.setSelectionRange(0, 99999), navigator.clipboard.writeText(t.value);
}
!(function () {
    if (localStorage.getItem("SSVallURL") && localStorage.getItem("SSVlastPlayed") && null == document.querySelector("#swirl-short-videos")) {
        SSVvideosAll = JSON.parse(localStorage.getItem("SSVallURL"));
        let t,
            o = !1;
        if (
            (((e = document.createElement("script")).rel = "text/javascript"),
            (e.src = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/swiper-bundle.min.js"),
            (e.onload = function () {
                t = !0;
            }),
            headTag.insertBefore(e, headTag.lastChild),
            ((e = document.createElement("link")).rel = "stylesheet"),
            (e.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/short-videos.css"),
            document.body.appendChild(e),
            ((e = document.createElement("link")).rel = "stylesheet"),
            (e.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/swiper-bundle.min.css"),
            headTag.insertBefore(e, headTag.firstChild),
            "undefined" == typeof jQuery)
        )
            ((e = document.createElement("script")).rel = "text/javascript"),
                (e.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"),
                headTag.insertBefore(e, headTag.lastChild),
                (e.onload = function () {
                    o = !0;
                });
        else o = !0;
        let i = setInterval(() => {
            t &&
                o &&
                ($(document).ready(function () {
                    jQuery("body").prepend(
                        '\n                <div id="SWIRL-short-videos">\n                    <div class="swiper" style="display: none!important;">\n                        <div class="swiper-wrapper">\n                            <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>\n                        </div>\n                        <div class="swiper-button-next">\n                            <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" height="" width="" alt="Next icon">\n                        </div>\n                        <div class="swiper-button-prev">\n                            <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" height="" width="" alt="Previous icon">\n                        </div>\n                    </div>\n\n                    <div class="SSV-powered-by">\n                        <label><i>Powered by</i></label>\n                        <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                            <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                        </a>\n                    </div>\n\n                    <div class="SSV-play-modal">                \n                        <div class="SSV-play-modal-video-container">\n                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >\n                                <source src="" type="video/mp4">\n                            </video>\n\n                            <div class="SSV-play-modal-top-shadow"></div>\n\n                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">\n                                <img src="https://goswirl.shop/swirl-embed/assets/unmute.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">\n                                <img src="https://goswirl.shop/swirl-embed/assets/share.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pause.svg" alt="Play/Pause icon" height="" width="">\n                            </button>                                                \n\n                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">\n                                Buy Now\n                            </button>\n\n                            <div class="SSV-video-popup-progress">\n                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>\n                            </div>\n\n                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>\n                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pip.svg" alt="Share icon" height="" width="">\n                            </button>\n\n                            <p class="SSV-video-popup-title"></p>\n\n                            <div class="SSV-video-popup-product">\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-product-open">\n                                <b style="font-family: arial;" title="Close">&times;</b>\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                                <br>\n                                <span>Description</span>\n                                <section></section>\n                                <center>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>\n                                </center>\n                            </div>\n\n                            <div class="SSV-video-popup-product-multi" onclick="jQuery(\'.SSV-video-popup-product-list-multi\').show();">\n                                <img src="" alt="Product Image" height="" width="">                                \n                                <p class="counter"></p>\n                            </div>\n\n                            <div class="SSV-video-popup-product-list-multi">                                \n                                <p class="SSV-video-popup-product-list-multi-title">\n                                    <label style="font-family: arial;" title="Back">&#8249;</label>\n                                    Shop\n                                    <b style="font-family: arial;" title="Close">&times;</b>\n                                </p>\n                                <div class="SSV-video-popup-product-list-multi-append">                                    \n                                </div>\n                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    \n                                    <img src="" alt="Product Image" height="" width="">\n                                    <div>\n                                        <p></p>\n                                        <label></label>\n                                    </div>\n                                    <br>\n                                    <span>Description</span>\n                                    <section></section>\n                                    <center>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>\n                                    </center>\n                                </div>\n                            </div>\n\n                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">\n                                <img src="https://goswirl.shop/swirl-embed/assets/toggle.png" alt="Toggle icon" height="" width="">\n                            </button>\n                            <div class="SSV-video-popup-brand-info">\n                                <label style="font-family: arial;" title="Close">&times;</label>                        \n                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />\n                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>\n                                <p class="SSV-video-popup-brand-info-brand-about">About</p>\n                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>\n                                <div class="SSV-video-popup-brand-info-powered">\n                                    <span>Powered by</span>\n                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                                        <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> \n                                    </a>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-popup-share">\n                                <p>Share to</p>\n                                <label style="font-family: arial;">&times;</label>\n                                <img class="SSV-facebook" src="https://goswirl.shop/swirl-embed/assets/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">\n                                <img class="SSV-twitter" src="https://goswirl.shop/swirl-embed/assets/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">\n                                <img class="SSV-whatsapp" src="https://goswirl.shop/swirl-embed/assets/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">\n                                <img class="SSV-copy" src="https://goswirl.shop/swirl-embed/assets/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">\n                                <span>Link Copied!</span>\n                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">\n                            </div>                            \n                        </div>\n\n                        <div class="SSV-popup-video-loader"><p></p></div>\n\n                        <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">\n                        <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">\n                    </div>\n\n                    <div class="SSV-PIP" id="SSV-PIP">\n                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>\n                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);">\n                            <source src="" type="video/mp4">\n                        </video>\n                        <span class="SSV-PIP-fullscreen"></span>\n                    </div>\n                </div>\n            '
                    );
                    var e = window.location.href.split("?")[0] ? window.location.href.split("?")[0] : window.location.href;
                    e = (e = e.replace("#SWIRL-short-videos", "")).replace("#", "");
                    let t = localStorage.getItem("SSVshopify"),
                        o = new URL(e);
                    (store = o.hostname), (store = t ? store : "satyamgandhidev.com");
                    var i = document.createElement("script");
                    if (((i.rel = "text/javascript"), (i.src = "https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js"), headTag.insertBefore(i, headTag.lastChild), void 0 !== SSVvideosAll.swilrs.video)) {
                        let t = SSVvideosAll.swilrs.data;
                        brandCustomizations = t;
                        let o = 0,
                            i = "";
                        (live_stream_phone = t.live_stream_phone),
                            (live_stream_phone_otp = t.live_stream_phone_otp),
                            "0" === live_stream_phone && (jQuery(".phone-and-code").hide(), jQuery('input[name="SSVphoneNumber"]').attr("disabled", "true")),
                            SSVvideosAll.swilrs.video.forEach((e) => {
                                let a = "";
                                o++, "1" === t.auto_play && (a = o > 6 ? "" : "loop autoplay"), SSVallURL.push(e.video_url);
                                let r = e.image ? e.image : "https://goswirl.shop/swirl-embed/assets/default-video-thumbnail.jpg",
                                    l = "",
                                    s = "",
                                    d = "";
                                Object.keys(e.product).length > 0 && ((l = e.product[0].product_id), (s = e.product[0].url), (d = `<img src="${e.product[0].image}" class="SSV-video-prod-image-c" alt="Product Thumbnail" />`)),
                                    (s = s || e.product_link),
                                    (productsAll[e.video_id] = e.product),
                                    (i += `<div class="swiper-slide">\n                        <video poster="${r}" ontimeupdate="updateSSVProgressBar(this);" onloadeddata="updateSSVDurations(this);" playsinline preload="metadata" data-setup="{}" muted ${a} width="100%" height="100%" data-product="${s}" data-title="${e.video_title}" data-cover="${e.image}" data-link="${e.link}" data-vid="${e.video_id}" data-did="${e.designer_id}" data-productid="${l}" data-productlink="${s}" data-gumletassetid="${e.gumletAssetId}" data-totalviews="${e.total_views}">\n                            <source src="${e.video_url}" type="video/mp4">\n                        </video>\n                        <div class="SSV-play-btn">\n                            <label></label>\n                        </div>\n                        <div class="SSV-video-progress">\n                            <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>\n                        </div>\n                        <div class="SSV-video-playing">\n                            <label>Preview mode</label>\n                        </div>\n                        <div class="SSV-video-title-bottom">\n                            <p class="full-t">${e.video_title}</p>\n                            <a href="https://www.goswirl.live/" target="_blank" rel="nofollow" style="display:none;">\n                                <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                            </a>\n                        </div>\n                        <div class="SSV-video-timer-top">\n                            <p>00:00</p>                            \n                        </div>\n                        ${d}\n                    </div>`);
                            }),
                            jQuery("#SWIRL-short-videos .swiper-wrapper").empty(),
                            jQuery("#SWIRL-short-videos .swiper-wrapper").append(i),
                            jQuery(".swiper-slide").hover(function () {
                                SSVpauseAll(jQuery(this).children("video"));
                            }),
                            jQuery(".swiper-slide video").on("play", function () {
                                $(this).next().hide(), $(this).next().next().show();
                            }),
                            jQuery(".swiper-slide video").on("pause", function () {
                                $(this).next().show(), $(this).next().next().hide();
                            }),
                            jQuery(".swiper-slide").click(function () {
                                (window.location = "#SWIRL-short-videos"), $(this).children(".SSV-video-playing").show(), jQuery(".SSV-play-modal").show();
                                let o = $(this).children("video").children("source").attr("src"),
                                    i = $(this).children("video").attr("data-cover");
                                (SSVCurrentURL = o),
                                    jQuery(".SSV-play-modal video source").attr("src", o),
                                    jQuery(".SSV-play-modal video").attr("poster", i),
                                    jQuery(".SSV-play-modal video").get(0).load(),
                                    "0" === t.auto_play_mute_un
                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(o)),
                                    jQuery(".SSV-video-popup-share").hide(),
                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                    jQuery(".close-SSV-PIP").click(),
                                    disableScroll();
                            });
                        let a = 0;
                        jQuery(".close-SSV-modal").click(function () {
                            (a = jQuery(".SSV-play-modal video").get(0).currentTime),
                                SSVpauseAll(),
                                jQuery(".SSV-play-modal video").get(0).pause(),
                                jQuery(".SSV-play-modal").hide(),
                                jQuery(".SSV-video-playing").hide(),
                                enableScroll(),
                                localStorage.setItem("SSVlastPlayed", ""),
                                localStorage.setItem("SSVlastPlayedTime", "");
                        }),
                            jQuery(".close-SSV-PIP").click(function () {
                                jQuery(".SSV-PIP video").get(0).pause(), jQuery(".SSV-PIP").hide(), localStorage.setItem("SSVlastPlayed", ""), localStorage.setItem("SSVlastPlayedTime", "");
                            }),
                            jQuery(".SSV-play-modal-play-pause").click(function () {
                                let e = jQuery(".SSV-play-modal video").get(0);
                                e.paused ? e.play() : e.pause();
                            }),
                            jQuery(".SSV-play-modal-mute-unmute").click(function () {
                                jQuery(".SSV-play-modal video").prop("muted")
                                    ? (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg"), jQuery(".SSV-play-modal video").prop("muted", !1), (globalMute = !1))
                                    : (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"), jQuery(".SSV-play-modal video").prop("muted", !0), (globalMute = !0));
                            }),
                            jQuery(".SSV-play-modal video").on("play", function () {
                                jQuery(".SSV-play-modal-play-pause").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/pause.svg"), jQuery(".SSV-play-modal-play-pause").hide();
                            }),
                            jQuery(".SSV-play-modal video").on("pause", function () {
                                jQuery(".SSV-play-modal-play-pause").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/play.svg");
                            }),
                            jQuery(".SSV-modal-left").click(function () {
                                let o = jQuery(".SSV-play-modal video source").attr("src"),
                                    i = SSVallURL.indexOf(o);
                                if (void 0 !== SSVallURL[i - 1]) {
                                    SSVCurrentURL = SSVallURL[i - 1];
                                    let o = $(`.swiper-wrapper source[src="${SSVallURL[i - 1]}"]`)
                                        .parent("video")
                                        .attr("data-cover");
                                    jQuery(".SSV-play-modal video").attr("poster", o),
                                        jQuery(".SSV-play-modal video source").attr("src", SSVallURL[i - 1]),
                                        jQuery(".SSV-play-modal video").get(0).load(),
                                        "0" === t.auto_play_mute_un
                                            ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                            : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                        ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                        jQuery(".SSV-video-popup-share").hide(),
                                        jQuery(".SSV-CTA-modal-inner").hide(),
                                        jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(SSVallURL[i - 1]));
                                }
                            }),
                            jQuery(".SSV-modal-right").click(function () {
                                let o = jQuery(".SSV-play-modal video source").attr("src"),
                                    i = SSVallURL.indexOf(o);
                                if (void 0 !== SSVallURL[i + 1]) {
                                    SSVCurrentURL = SSVallURL[i + 1];
                                    let o = $(`.swiper-wrapper source[src="${SSVallURL[i + 1]}"]`)
                                        .parent("video")
                                        .attr("data-cover");
                                    jQuery(".SSV-play-modal video").attr("poster", o),
                                        jQuery(".SSV-play-modal video source").attr("src", SSVallURL[i + 1]),
                                        jQuery(".SSV-play-modal video").get(0).load(),
                                        "0" === t.auto_play_mute_un
                                            ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                            : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                        ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                        jQuery(".SSV-video-popup-share").hide(),
                                        jQuery(".SSV-CTA-modal-inner").hide(),
                                        jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(SSVallURL[i + 1]));
                                }
                            }),
                            jQuery(".SSV-play-modal-share").click(function () {
                                jQuery(".SSV-video-popup-share").show(),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-share").addClass("SSV-video-popup-share-cover");
                                    }, 100);
                            }),
                            jQuery(".SSV-video-popup-share label").click(function () {
                                jQuery(".SSV-video-popup-share").removeClass("SSV-video-popup-share-cover"),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-share").hide();
                                    }, 500);
                            }),
                            jQuery(".SSV-facebook").click(function () {
                                let e = $(this).attr("data-sharelink");
                                window.open("https://www.facebook.com/sharer/sharer.php?u=" + e, "_blank");
                            }),
                            jQuery(".SSV-twitter").click(function () {
                                let e = $(this).attr("data-sharelink");
                                window.open("https://twitter.com/share?url=" + e, "_blank");
                            }),
                            jQuery(".SSV-whatsapp").click(function () {
                                let e = $(this).attr("data-sharelink");
                                window.open("whatsapp://send?text=" + e);
                            }),
                            jQuery(".SSV-copy").click(function () {
                                let e = $(this).attr("data-sharelink");
                                jQuery(".SSV-copylink-input").val(e), jQuery(".SSV-copylink-input").click(), jQuery(".SSV-video-popup-share span").fadeIn().delay(3e3).fadeOut();
                            });
                        const r = new URLSearchParams(window.location.search),
                            l = Object.fromEntries(r.entries());
                        if (void 0 !== l.ssv) {
                            jQuery(".SSV-play-modal").show();
                            let t = l.ssv;
                            (SSVCurrentURL = window.atob(t)),
                                jQuery(".SSV-play-modal video source").attr("src", window.atob(t)),
                                jQuery(".SSV-play-modal video").get(0).load(),
                                jQuery(".SSV-play-modal video").prop("muted", !0),
                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"),
                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + t),
                                setTimeout(() => {
                                    document.getElementById("SWIRL-short-videos").scrollIntoView(), disableScroll();
                                }, 2e3);
                        }
                        jQuery(".SSV-play-modal video").hover(function () {
                            jQuery(".SSV-play-modal-play-pause").show();
                        }),
                            jQuery(".SSV-play-modal video").mouseleave(function () {
                                jQuery(".SSV-play-modal-play-pause").hide();
                            }),
                            jQuery(".SSV-play-modal-play-pause").mouseenter(function () {
                                jQuery(".SSV-play-modal-play-pause").show();
                            }),
                            dragElement(document.getElementById("SSV-PIP")),
                            jQuery(".SSV-CTA-modal label span").click(function () {
                                jQuery(".SSV-CTA-modal-inner").hide();
                            }),
                            jQuery(".SSV-play-modal-addtocart").click(function () {
                                let e = $(this),
                                    t = $(this).attr("data-action"),
                                    o = $(this).attr("data-pid"),
                                    i = $(this).attr("data-link");
                                "2" == t
                                    ? ("1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click(), SSVCTAClicksTrack(o, "1"), (window.location = i))
                                    : "1" == t
                                    ? (SSVaddToCart(i, e), SSVCTAClicksTrack(o, "2"))
                                    : "3" == t && (window.location = "https://" + store + "/cart");
                            }),
                            $(document).keydown(function (e) {
                                jQuery(".SSV-play-modal").is(":visible") &&
                                    (37 != e.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                        ? 39 != e.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                            ? "Escape" === e.key &&
                                              (jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                  ? jQuery(".SSV-CTA-modal-inner").hide()
                                                  : jQuery(".SSV-video-product-open").is(":visible")
                                                  ? jQuery(".SSV-video-product-open b").click()
                                                  : jQuery(".SSV-video-popup-brand-info").is(":visible")
                                                  ? jQuery(".SSV-video-popup-brand-info label").click()
                                                  : jQuery(".SSV-play-modal .close-SSV-modal").click())
                                            : jQuery(".SSV-play-modal .SSV-modal-right").click()
                                        : jQuery(".SSV-play-modal .SSV-modal-left").click());
                            }),
                            jQuery(".SSV-play-modal-pip").click(function () {
                                (a = jQuery(".SSV-play-modal video").get(0).currentTime),
                                    SSVpauseAll(),
                                    jQuery(".SSV-play-modal video").get(0).pause(),
                                    jQuery(".SSV-play-modal").hide(),
                                    jQuery(".SSV-video-playing").hide(),
                                    jQuery(".SSV-PIP video source").attr("src", jQuery(".SSV-play-modal video source").attr("src")),
                                    jQuery(".SSV-PIP video").get(0).load(),
                                    (jQuery(".SSV-PIP video").get(0).currentTime = a),
                                    ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                    jQuery(".SSV-PIP").show(),
                                    enableScroll();
                            }),
                            jQuery(".SSV-PIP-fullscreen").click(function () {
                                let o = jQuery(".SSV-PIP video source").attr("src");
                                (SSVCurrentURL = o),
                                    jQuery(".SSV-play-modal video source").attr("src", o),
                                    jQuery(".SSV-play-modal video").get(0).load(),
                                    "0" === t.auto_play_mute_un
                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(o)),
                                    jQuery(".SSV-video-popup-share").hide(),
                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                    jQuery(".SSV-PIP video").get(0).pause(),
                                    jQuery(".SSV-PIP").hide(),
                                    jQuery(".SSV-play-modal").show(),
                                    disableScroll();
                            }),
                            "1" === t.powered_by ? jQuery(".SSV-video-popup-brand-info-powered").show() : jQuery(".SSV-video-popup-brand-info-powered").hide(),
                            $(document).on("click touch", function (e) {
                                jQuery(".SSV-video-popup-brand-info").is(":visible")
                                    ? ($(e.target).is(".SSV-play-modal") || $(e.target).is(".SSV-play-modal-video-container video")) && jQuery(".SSV-video-popup-brand-info label").click()
                                    : jQuery(".SSV-play-modal").is(":visible") && $(e.target).is(".SSV-play-modal");
                            }),
                            (window.onpopstate = function (e) {
                                jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-play-modal .close-SSV-modal").click();
                            }),
                            jQuery("#SSV-PIP video").click(function () {
                                jQuery(".SSV-PIP-fullscreen").click();
                            }),
                            jQuery(".SSV-video-popup-product").click(function () {
                                jQuery(".SSV-video-product-open").show(),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover");
                                    }, 100);
                            }),
                            jQuery(".SSV-video-product-open b").click(function () {
                                jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover"),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-product-open").hide();
                                    }, 500);
                            }),
                            jQuery(".SSV-video-popup-brand-info-btn").click(function () {
                                jQuery(".SSV-video-popup-brand-info").show(),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-brand-info").addClass("SSV-video-popup-brand-info-cover");
                                    }, 100);
                            }),
                            jQuery(".SSV-video-popup-brand-info label").click(function () {
                                jQuery(".SSV-video-popup-brand-info").removeClass("SSV-video-popup-brand-info-cover"),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-brand-info").hide();
                                    }, 500);
                            }),
                            t.user_profile ? (jQuery(".SSV-video-popup-brand-info-brand-logo").attr("src", t.user_profile), jQuery(".SSV-video-popup-brand-info-brand-logo").show()) : jQuery(".SSV-video-popup-brand-info-brand-logo").hide(),
                            jQuery(".SSV-video-popup-brand-info-brand-name").html(t.designer_brand_name),
                            t.designer_bio
                                ? (jQuery(".SSV-video-popup-brand-info-brand-description").html(t.designer_bio), jQuery(".SSV-video-popup-brand-info-brand-description").show(), jQuery(".SSV-video-popup-brand-info-brand-about").show())
                                : (jQuery(".SSV-video-popup-brand-info-brand-description").hide(), jQuery(".SSV-video-popup-brand-info-brand-about").hide()),
                            document.addEventListener("touchstart", handleTouchStart, !1),
                            document.addEventListener("touchmove", handleTouchMove, !1),
                            localStorage.getItem("SSVlastPlayed") &&
                                ((SSVCurrentURL = localStorage.getItem("SSVlastPlayed")),
                                jQuery(".SSV-PIP video source").attr("src", localStorage.getItem("SSVlastPlayed")),
                                jQuery(".SSV-PIP video").get(0).load(),
                                ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                jQuery(".SSV-PIP video").attr("loop", !0),
                                setTimeout(() => {
                                    jQuery(".SSV-PIP").show();
                                }, 1e3)),
                            $(document).on("click", ".SSV-P-see-more", function () {
                                $(this).parent().next().show(), $(this).parent().hide();
                            }),
                            $(document).on("click", ".SSV-P-see-less", function () {
                                $(this).parent().prev().show(), $(this).parent().hide();
                            }),
                            jQuery(".SSV-play-modal video").on("loadstart", function (e) {
                                jQuery(".SSV-play-modal-video-container").addClass("SSV-popup-video-blur-load");
                            }),
                            jQuery(".SSV-play-modal video").on("canplay", function (e) {
                                jQuery(".SSV-play-modal-video-container").removeClass("SSV-popup-video-blur-load");
                            }),
                            jQuery(".SSV-video-popup-product-multi").click(function () {
                                jQuery(".SSV-video-popup-product-list-multi").show(),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover");
                                    }, 100);
                            }),
                            jQuery(".SSV-video-popup-product-list-multi-title b").click(function () {
                                jQuery(".SSV-video-popup-product-list-multi").removeClass("SSV-video-popup-product-list-multi-cover"),
                                    setTimeout(() => {
                                        jQuery(".SSV-video-popup-product-list-multi").hide();
                                    }, 500);
                            }),
                            jQuery(".SSV-video-popup-product-list-multi-title label").click(function () {
                                jQuery(".SSV-video-popup-product-list-multi-product-detail").is(":visible")
                                    ? (jQuery(".SSV-video-popup-product-list-multi-product-detail").hide(), jQuery(".SSV-video-popup-product-list-multi-append").show())
                                    : jQuery(".SSV-video-popup-product-list-multi-append").is(":visible") && jQuery(".SSV-video-popup-product-list-multi-title b").click();
                            });
                    } else {
                        let e = "";
                        jQuery("#SWIRL-short-videos .swiper-wrapper").empty(), jQuery("#SWIRL-short-videos .swiper-wrapper").append(e);
                    }
                    SSVsetPopupHight();
                }),
                clearInterval(i));
        }, 1e3);
    } else if (null != document.querySelector("#swirl-short-videos")) {
        let t,
            o = !1;
        var e;
        if (
            (((e = document.createElement("script")).rel = "text/javascript"),
            (e.src = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/swiper-bundle.min.js"),
            (e.onload = function () {
                t = !0;
            }),
            headTag.insertBefore(e, headTag.lastChild),
            ((e = document.createElement("link")).rel = "stylesheet"),
            (e.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/short-videos.css"),
            document.body.appendChild(e),
            ((e = document.createElement("link")).rel = "stylesheet"),
            (e.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v8/swiper-bundle.min.css"),
            headTag.insertBefore(e, headTag.firstChild),
            "undefined" == typeof jQuery)
        )
            ((e = document.createElement("script")).rel = "text/javascript"),
                (e.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"),
                headTag.insertBefore(e, headTag.lastChild),
                (e.onload = function () {
                    o = !0;
                });
        else o = !0;
        let i = setInterval(() => {
            t &&
                o &&
                ($(document).ready(function () {
                    jQuery("#swirl-short-videos").html(
                        '\n                <div id="SWIRL-short-videos">\n                    <div class="swiper">\n                        <div class="swiper-wrapper">\n                            <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>\n                        </div>\n                        <div class="swiper-button-next">\n                            <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" height="" width="" alt="Next icon">\n                        </div>\n                        <div class="swiper-button-prev">\n                            <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" height="" width="" alt="Previous icon">\n                        </div>\n                    </div>\n\n                    <div class="SSV-powered-by">\n                        <label><i>Powered by</i></label>\n                        <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                            <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                        </a>\n                    </div>\n\n                    <div class="SSV-play-modal">                \n                        <div class="SSV-play-modal-video-container">\n                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >\n                                <source src="" type="video/mp4">\n                            </video>\n\n                            <div class="SSV-play-modal-top-shadow"></div>\n\n                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">\n                                <img src="https://goswirl.shop/swirl-embed/assets/unmute.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">\n                                <img src="https://goswirl.shop/swirl-embed/assets/share.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pause.svg" alt="Play/Pause icon" height="" width="">\n                            </button>                                                \n\n                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">\n                                Buy Now\n                            </button>\n\n                            <div class="SSV-video-popup-progress">\n                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>\n                            </div>\n\n                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>\n                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pip.svg" alt="Share icon" height="" width="">\n                            </button>\n\n                            <p class="SSV-video-popup-title"></p>\n\n                            <div class="SSV-video-popup-product">\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-product-open">\n                                <b style="font-family: arial;" title="Close">&times;</b>\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                                <br>\n                                <span>Description</span>\n                                <section></section>\n                                <center>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>\n                                </center>\n                            </div>\n\n                            <div class="SSV-video-popup-product-multi" onclick="jQuery(\'.SSV-video-popup-product-list-multi\').show();">\n                                <img src="" alt="Product Image" height="" width="">                                \n                                <p class="counter"></p>\n                            </div>\n\n                            <div class="SSV-video-popup-product-list-multi">                                \n                                <p class="SSV-video-popup-product-list-multi-title">\n                                    <label style="font-family: arial;" title="Back">&#8249;</label>\n                                    Shop\n                                    <b style="font-family: arial;" title="Close">&times;</b>\n                                </p>\n                                <div class="SSV-video-popup-product-list-multi-append">                                    \n                                </div>\n                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    \n                                    <img src="" alt="Product Image" height="" width="">\n                                    <div>\n                                        <p></p>\n                                        <label></label>\n                                    </div>\n                                    <br>\n                                    <span>Description</span>\n                                    <section></section>\n                                    <center>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>\n                                    </center>\n                                </div>\n                            </div>\n\n                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">\n                                <img src="https://goswirl.shop/swirl-embed/assets/toggle.png" alt="Toggle icon" height="" width="">\n                            </button>\n                            <div class="SSV-video-popup-brand-info">\n                                <label style="font-family: arial;" title="Close">&times;</label>                        \n                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />\n                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>\n                                <p class="SSV-video-popup-brand-info-brand-about">About</p>\n                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>\n                                <div class="SSV-video-popup-brand-info-powered">\n                                    <span>Powered by</span>\n                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                                        <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> \n                                    </a>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-popup-share">\n                                <p>Share to</p>\n                                <label style="font-family: arial;">&times;</label>\n                                <img class="SSV-facebook" src="https://goswirl.shop/swirl-embed/assets/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">\n                                <img class="SSV-twitter" src="https://goswirl.shop/swirl-embed/assets/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">\n                                <img class="SSV-whatsapp" src="https://goswirl.shop/swirl-embed/assets/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">\n                                <img class="SSV-copy" src="https://goswirl.shop/swirl-embed/assets/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">\n                                <span>Link Copied!</span>\n                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">\n                            </div>                            \n                        </div>\n\n                        <div class="SSV-popup-video-loader"><p></p></div>\n\n                        <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">\n                        <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">\n                    </div>\n\n                    <div class="SSV-PIP" id="SSV-PIP">\n                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>\n                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);" >\n                            <source src="" type="video/mp4">\n                        </video>\n                        <span class="SSV-PIP-fullscreen"></span>\n                    </div>\n                </div>\n            '
                    );
                    var e = window.location.href.split("?")[0] ? window.location.href.split("?")[0] : window.location.href;
                    e = (e = e.replace("#SWIRL-short-videos", "")).replace("#", "");
                    let t = jQuery("#swirl-short-videos").data("code"),
                        o = jQuery("#swirl-short-videos").data("sw"),
                        i = new URL(e);
                    (store = i.hostname), (store = o ? store : "satyamgandhidev.com");
                    var a = document.createElement("script");
                    (a.rel = "text/javascript"), (a.src = "https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js"), headTag.insertBefore(a, headTag.lastChild), e.substring(e.lastIndexOf("/") + 1);
                    let r = "";
                    (r = "https://shop.goswirl.live/index.php/shopify/videolistingV2?user=" + t),
                        void 0 !== jQuery("#swirl-short-videos").data("byshopify") && (r = "https://store.goswirl.live/shopify-app/swirl_short_videos.php"),
                        void 0 !== jQuery("#swirl-short-videos").data("onpdp") && (r = "https://shop.goswirl.live/index.php/shopify/getmultiple_productvideo?url=" + e),
                        jQuery.ajax({
                            type: "POST",
                            dataType: "json",
                            url: r,
                            data: "store=" + encodeURIComponent(store),
                            success: function (t) {
                                if (
                                    (void 0 === t.swilrs.video &&
                                        localStorage.getItem("SSVallURL") &&
                                        void 0 !== jQuery("#swirl-short-videos").data("onpdp") &&
                                        localStorage.getItem("SSVallURL") &&
                                        localStorage.getItem("SSVlastPlayed") &&
                                        ((t = JSON.parse(localStorage.getItem("SSVallURL"))), $("#SWIRL-short-videos .swiper").css("display", "none")),
                                    void 0 !== t.swilrs.video)
                                ) {
                                    let i = t.swilrs.data;
                                    brandCustomizations = i;
                                    let a = 0,
                                        r = "";
                                    (live_stream_phone = i.live_stream_phone),
                                        (live_stream_phone_otp = i.live_stream_phone_otp),
                                        "0" === live_stream_phone && (jQuery(".phone-and-code").hide(), jQuery('input[name="SSVphoneNumber"]').attr("disabled", "true")),
                                        t.swilrs.video.forEach((e) => {
                                            let t = "";
                                            a++, "1" === i.auto_play && (t = a > 6 ? "" : "loop autoplay"), SSVallURL.push(e.video_url);
                                            let o = e.image ? e.image : "https://goswirl.shop/swirl-embed/assets/default-video-thumbnail.jpg",
                                                l = "",
                                                s = "",
                                                d = '<div class="SSV-product-on-carousel"></div>';
                                            if (Object.keys(e.product).length > 0) {
                                                (l = e.product[0].product_id), (s = e.product[0].url);
                                                let t = Object.keys(e.product).length > 1 ? `<span>${Object.keys(e.product).length}</span>` : "",
                                                    o =
                                                        parseFloat(e.product[0].price) > parseFloat(e.product[0].discount_price)
                                                            ? `<strike>${e.product[0].currencysymbols + " " + e.product[0].price}</strike> ${e.product[0].currencysymbols + " " + e.product[0].discount_price}`
                                                            : e.product[0].currencysymbols + " " + e.product[0].price;
                                                d = `<div class="SSV-product-on-carousel">                                    \n                                        <img src="${e.product[0].image}" alt="Product Thumbnail" />                                        \n                                        ${t}\n                                        <p>${e.product[0].title}</p>\n                                        <label>${o}</label>\n                                    </div>`;
                                            }
                                            (s = s || e.product_link),
                                                (productsAll[e.video_id] = e.product),
                                                (r += `<div class="swiper-slide">\n                                <video poster="${o}" ontimeupdate="updateSSVProgressBar(this);" onloadeddata="updateSSVDurations(this);" playsinline preload="none" data-setup="{}" muted ${t} width="100%" height="100%" data-product="${s}" data-title="${e.video_title}" data-cover="${e.image}" data-link="${e.link}" data-vid="${e.video_id}" data-did="${e.designer_id}" data-productid="${l}" data-productlink="${s}" data-gumletassetid="${e.gumletAssetId}" data-totalviews="${e.total_views}">\n                                    <source src="${e.video_url}" type="video/mp4">\n                                </video>\n                                <div class="SSV-play-btn">\n                                    <label></label>\n                                </div>\n                                <div class="SSV-video-progress">\n                                    <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>\n                                </div>\n                                <div class="SSV-video-playing">\n                                    <label>Preview mode</label>\n                                </div>                                \n                                <div class="SSV-video-timer-top">\n                                    <p>00:00</p>                            \n                                </div>\n                                <div class="SSV-video-views-count-top">\n                                    <p><img src="https://goswirl.shop/swirl-embed/assets/views-icon.svg" alt="Views icon" height="" width=""> ${e.total_views}</p>                            \n                                </div>\n                                ${d}\n                            </div>`);
                                        }),
                                        jQuery("#SWIRL-short-videos .swiper-wrapper").html(r),
                                        localStorage.setItem("SSVallURL", JSON.stringify(t)),
                                        localStorage.setItem("SSVshopify", o),
                                        new Swiper(".swiper", {
                                            slidesPerView: 5,
                                            direction: "horizontal",
                                            spaceBetween: 15,
                                            centeredSlides: !0,
                                            centeredSlidesBounds: !0,
                                            centerInsufficientSlides: !0,
                                            breakpoints: { 320: { slidesPerView: 2 }, 640: { slidesPerView: 5 } },
                                            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                                        }),
                                        jQuery(".swiper-slide").hover(function () {
                                            SSVpauseAll(jQuery(this).children("video"));
                                        }),
                                        jQuery(".swiper-slide video").on("play", function () {
                                            $(this).next().hide(), $(this).next().next().show();
                                        }),
                                        jQuery(".swiper-slide video").on("pause", function () {
                                            $(this).next().show(), $(this).next().next().hide();
                                        }),
                                        jQuery(".swiper-slide").click(function () {
                                            (window.location = "#SWIRL-short-videos"), $(this).children(".SSV-video-playing").show(), jQuery(".SSV-play-modal").show();
                                            let t = $(this).children("video").children("source").attr("src"),
                                                o = $(this).children("video").attr("data-cover");
                                            (SSVCurrentURL = t),
                                                jQuery(".SSV-play-modal video source").attr("src", t),
                                                jQuery(".SSV-play-modal video").attr("poster", o),
                                                jQuery(".SSV-play-modal video").get(0).load(),
                                                "0" === i.auto_play_mute_un
                                                    ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                    : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(t)),
                                                jQuery(".SSV-video-popup-share").hide(),
                                                jQuery(".SSV-CTA-modal-inner").hide(),
                                                jQuery(".close-SSV-PIP").click(),
                                                disableScroll();
                                        });
                                    let l = 0;
                                    jQuery(".close-SSV-modal").click(function () {
                                        (l = jQuery(".SSV-play-modal video").get(0).currentTime),
                                            SSVpauseAll(),
                                            jQuery(".SSV-play-modal video").get(0).pause(),
                                            jQuery(".SSV-play-modal").hide(),
                                            jQuery(".SSV-video-playing").hide(),
                                            enableScroll(),
                                            localStorage.setItem("SSVlastPlayed", ""),
                                            localStorage.setItem("SSVlastPlayedTime", "");
                                    }),
                                        jQuery(".close-SSV-PIP").click(function () {
                                            jQuery(".SSV-PIP video").get(0).pause(), jQuery(".SSV-PIP").hide(), localStorage.setItem("SSVlastPlayed", ""), localStorage.setItem("SSVlastPlayedTime", "");
                                        }),
                                        jQuery(".SSV-play-modal-play-pause").click(function () {
                                            let e = jQuery(".SSV-play-modal video").get(0);
                                            e.paused ? e.play() : e.pause();
                                        }),
                                        jQuery(".SSV-play-modal-mute-unmute").click(function () {
                                            jQuery(".SSV-play-modal video").prop("muted")
                                                ? (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg"),
                                                  jQuery(".SSV-play-modal video").prop("muted", !1),
                                                  (globalMute = !1))
                                                : (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"), jQuery(".SSV-play-modal video").prop("muted", !0), (globalMute = !0));
                                        }),
                                        jQuery(".SSV-play-modal video").on("play", function () {
                                            jQuery(".SSV-play-modal-play-pause").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/pause.svg"), jQuery(".SSV-play-modal-play-pause").hide();
                                        }),
                                        jQuery(".SSV-play-modal video").on("pause", function () {
                                            jQuery(".SSV-play-modal-play-pause").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/play.svg");
                                        }),
                                        jQuery(".SSV-modal-left").click(function () {
                                            let t = jQuery(".SSV-play-modal video source").attr("src"),
                                                o = SSVallURL.indexOf(t);
                                            if (void 0 !== SSVallURL[o - 1]) {
                                                SSVCurrentURL = SSVallURL[o - 1];
                                                let t = $(`.swiper-wrapper source[src="${SSVallURL[o - 1]}"]`)
                                                    .parent("video")
                                                    .attr("data-cover");
                                                jQuery(".SSV-play-modal video").attr("poster", t),
                                                    jQuery(".SSV-play-modal video source").attr("src", SSVallURL[o - 1]),
                                                    jQuery(".SSV-play-modal video").get(0).load(),
                                                    "0" === i.auto_play_mute_un
                                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                    jQuery(".SSV-video-popup-share").hide(),
                                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(SSVallURL[o - 1]));
                                            }
                                        }),
                                        jQuery(".SSV-modal-right").click(function () {
                                            let t = jQuery(".SSV-play-modal video source").attr("src"),
                                                o = SSVallURL.indexOf(t);
                                            if (void 0 !== SSVallURL[o + 1]) {
                                                SSVCurrentURL = SSVallURL[o + 1];
                                                let t = $(`.swiper-wrapper source[src="${SSVallURL[o + 1]}"]`)
                                                    .parent("video")
                                                    .attr("data-cover");
                                                jQuery(".SSV-play-modal video").attr("poster", t),
                                                    jQuery(".SSV-play-modal video source").attr("src", SSVallURL[o + 1]),
                                                    jQuery(".SSV-play-modal video").get(0).load(),
                                                    "0" === i.auto_play_mute_un
                                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                    jQuery(".SSV-video-popup-share").hide(),
                                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(SSVallURL[o + 1]));
                                            }
                                        }),
                                        jQuery(".SSV-play-modal-share").click(function () {
                                            jQuery(".SSV-video-popup-share").show(),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-share").addClass("SSV-video-popup-share-cover");
                                                }, 100);
                                        }),
                                        jQuery(".SSV-video-popup-share label").click(function () {
                                            jQuery(".SSV-video-popup-share").removeClass("SSV-video-popup-share-cover"),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-share").hide();
                                                }, 500);
                                        }),
                                        jQuery(".SSV-facebook").click(function () {
                                            let e = $(this).attr("data-sharelink");
                                            window.open("https://www.facebook.com/sharer/sharer.php?u=" + e, "_blank");
                                        }),
                                        jQuery(".SSV-twitter").click(function () {
                                            let e = $(this).attr("data-sharelink");
                                            window.open("https://twitter.com/share?url=" + e, "_blank");
                                        }),
                                        jQuery(".SSV-whatsapp").click(function () {
                                            let e = $(this).attr("data-sharelink");
                                            window.open("whatsapp://send?text=" + e);
                                        }),
                                        jQuery(".SSV-copy").click(function () {
                                            let e = $(this).attr("data-sharelink");
                                            jQuery(".SSV-copylink-input").val(e), jQuery(".SSV-copylink-input").click(), jQuery(".SSV-video-popup-share span").fadeIn().delay(3e3).fadeOut();
                                        });
                                    const s = new URLSearchParams(window.location.search),
                                        d = Object.fromEntries(s.entries());
                                    if (void 0 !== d.ssv) {
                                        jQuery(".SSV-play-modal").show();
                                        let t = d.ssv;
                                        (SSVCurrentURL = window.atob(t)),
                                            jQuery(".SSV-play-modal video source").attr("src", window.atob(t)),
                                            jQuery(".SSV-play-modal video").get(0).load(),
                                            jQuery(".SSV-play-modal video").prop("muted", !0),
                                            ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                            jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"),
                                            jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + t),
                                            setTimeout(() => {
                                                document.getElementById("SWIRL-short-videos").scrollIntoView(), disableScroll();
                                            }, 2e3);
                                    }
                                    jQuery(".SSV-play-modal video").hover(function () {
                                        jQuery(".SSV-play-modal-play-pause").show();
                                    }),
                                        jQuery(".SSV-play-modal video").mouseleave(function () {
                                            jQuery(".SSV-play-modal-play-pause").hide();
                                        }),
                                        jQuery(".SSV-play-modal-play-pause").mouseenter(function () {
                                            jQuery(".SSV-play-modal-play-pause").show();
                                        }),
                                        dragElement(document.getElementById("SSV-PIP")),
                                        jQuery(".SSV-CTA-modal label span").click(function () {
                                            jQuery(".SSV-CTA-modal-inner").hide();
                                        }),
                                        jQuery(".SSV-play-modal-addtocart").click(function () {
                                            let e = $(this),
                                                t = $(this).attr("data-action"),
                                                o = $(this).attr("data-pid"),
                                                i = $(this).attr("data-link");
                                            "2" == t
                                                ? ("1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click(), SSVCTAClicksTrack(o, "1"), (window.location = i))
                                                : "1" == t
                                                ? (SSVaddToCart(i, e), SSVCTAClicksTrack(o, "2"))
                                                : "3" == t && (window.location = "https://" + store + "/cart");
                                        }),
                                        $(document).keydown(function (e) {
                                            jQuery(".SSV-play-modal").is(":visible") &&
                                                (37 != e.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                    ? 39 != e.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                        ? "Escape" === e.key &&
                                                          (jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                              ? jQuery(".SSV-CTA-modal-inner").hide()
                                                              : jQuery(".SSV-video-product-open").is(":visible")
                                                              ? jQuery(".SSV-video-product-open b").click()
                                                              : jQuery(".SSV-video-popup-brand-info").is(":visible")
                                                              ? jQuery(".SSV-video-popup-brand-info label").click()
                                                              : jQuery(".SSV-play-modal .close-SSV-modal").click())
                                                        : jQuery(".SSV-play-modal .SSV-modal-right").click()
                                                    : jQuery(".SSV-play-modal .SSV-modal-left").click());
                                        }),
                                        jQuery(".SSV-play-modal-pip").click(function () {
                                            (l = jQuery(".SSV-play-modal video").get(0).currentTime),
                                                SSVpauseAll(),
                                                jQuery(".SSV-play-modal video").get(0).pause(),
                                                jQuery(".SSV-play-modal").hide(),
                                                jQuery(".SSV-video-playing").hide(),
                                                jQuery(".SSV-PIP video source").attr("src", jQuery(".SSV-play-modal video source").attr("src")),
                                                jQuery(".SSV-PIP video").get(0).load(),
                                                (jQuery(".SSV-PIP video").get(0).currentTime = l),
                                                ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                                jQuery(".SSV-PIP").show(),
                                                enableScroll();
                                        }),
                                        jQuery(".SSV-PIP-fullscreen").click(function () {
                                            let t = jQuery(".SSV-PIP video source").attr("src");
                                            (SSVCurrentURL = t),
                                                jQuery(".SSV-play-modal video source").attr("src", t),
                                                jQuery(".SSV-play-modal video").get(0).load(),
                                                "0" === i.auto_play_mute_un
                                                    ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                    : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", e + "?ssv=" + window.btoa(t)),
                                                jQuery(".SSV-video-popup-share").hide(),
                                                jQuery(".SSV-CTA-modal-inner").hide(),
                                                jQuery(".SSV-PIP video").get(0).pause(),
                                                jQuery(".SSV-PIP").hide(),
                                                jQuery(".SSV-play-modal").show(),
                                                disableScroll();
                                        }),
                                        "1" === i.powered_by ? jQuery(".SSV-video-popup-brand-info-powered").show() : jQuery(".SSV-video-popup-brand-info-powered").hide(),
                                        $(document).on("click touch", function (e) {
                                            jQuery(".SSV-video-popup-brand-info").is(":visible")
                                                ? ($(e.target).is(".SSV-play-modal") || $(e.target).is(".SSV-play-modal-video-container video")) && jQuery(".SSV-video-popup-brand-info label").click()
                                                : jQuery(".SSV-play-modal").is(":visible") && $(e.target).is(".SSV-play-modal") && "1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click();
                                        }),
                                        (window.onpopstate = function (e) {
                                            jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-play-modal .close-SSV-modal").click();
                                        }),
                                        jQuery("#SSV-PIP video").click(function () {
                                            jQuery(".SSV-PIP-fullscreen").click();
                                        }),
                                        jQuery(".SSV-video-popup-product").click(function () {
                                            jQuery(".SSV-video-product-open").show(),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover");
                                                }, 100);
                                        }),
                                        jQuery(".SSV-video-product-open b").click(function () {
                                            jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover"),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-product-open").hide();
                                                }, 500);
                                        }),
                                        jQuery(".SSV-video-popup-brand-info-btn").click(function () {
                                            jQuery(".SSV-video-popup-brand-info").show(),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-brand-info").addClass("SSV-video-popup-brand-info-cover");
                                                }, 100);
                                        }),
                                        jQuery(".SSV-video-popup-brand-info label").click(function () {
                                            jQuery(".SSV-video-popup-brand-info").removeClass("SSV-video-popup-brand-info-cover"),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-brand-info").hide();
                                                }, 500);
                                        }),
                                        i.user_profile
                                            ? (jQuery(".SSV-video-popup-brand-info-brand-logo").attr("src", i.user_profile), jQuery(".SSV-video-popup-brand-info-brand-logo").show())
                                            : jQuery(".SSV-video-popup-brand-info-brand-logo").hide(),
                                        jQuery(".SSV-video-popup-brand-info-brand-name").html(i.designer_brand_name),
                                        i.designer_bio
                                            ? (jQuery(".SSV-video-popup-brand-info-brand-description").html(i.designer_bio),
                                              jQuery(".SSV-video-popup-brand-info-brand-description").show(),
                                              jQuery(".SSV-video-popup-brand-info-brand-about").show())
                                            : (jQuery(".SSV-video-popup-brand-info-brand-description").hide(), jQuery(".SSV-video-popup-brand-info-brand-about").hide()),
                                        document.addEventListener("touchstart", handleTouchStart, !1),
                                        document.addEventListener("touchmove", handleTouchMove, !1),
                                        localStorage.getItem("SSVlastPlayed") &&
                                            ((SSVCurrentURL = localStorage.getItem("SSVlastPlayed")),
                                            jQuery(".SSV-PIP video source").attr("src", localStorage.getItem("SSVlastPlayed")),
                                            jQuery(".SSV-PIP video").get(0).load(),
                                            ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                            jQuery(".SSV-PIP video").attr("loop", !0),
                                            setTimeout(() => {
                                                jQuery(".SSV-PIP").show();
                                            }, 1e3)),
                                        $(document).on("click", ".SSV-P-see-more", function () {
                                            $(this).parent().next().show(), $(this).parent().hide();
                                        }),
                                        $(document).on("click", ".SSV-P-see-less", function () {
                                            $(this).parent().prev().show(), $(this).parent().hide();
                                        }),
                                        "0" === brandCustomizations.pip_mode && (jQuery(".SSV-play-modal-pip").hide(), jQuery(".SSV-play-modal-pip").attr("disabled", "disabled")),
                                        jQuery(".SSV-play-modal video").on("loadstart", function (e) {
                                            jQuery(".SSV-play-modal-video-container").addClass("SSV-popup-video-blur-load");
                                        }),
                                        jQuery(".SSV-play-modal video").on("canplay", function (e) {
                                            jQuery(".SSV-play-modal-video-container").removeClass("SSV-popup-video-blur-load");
                                        }),
                                        jQuery(".SSV-video-popup-product-multi").click(function () {
                                            jQuery(".SSV-video-popup-product-list-multi").show(),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover");
                                                }, 100);
                                        }),
                                        jQuery(".SSV-video-popup-product-list-multi-title b").click(function () {
                                            jQuery(".SSV-video-popup-product-list-multi").removeClass("SSV-video-popup-product-list-multi-cover"),
                                                setTimeout(() => {
                                                    jQuery(".SSV-video-popup-product-list-multi").hide();
                                                }, 500);
                                        }),
                                        jQuery(".SSV-video-popup-product-list-multi-title label").click(function () {
                                            jQuery(".SSV-video-popup-product-list-multi-product-detail").is(":visible")
                                                ? (jQuery(".SSV-video-popup-product-list-multi-product-detail").hide(), jQuery(".SSV-video-popup-product-list-multi-append").show())
                                                : jQuery(".SSV-video-popup-product-list-multi-append").is(":visible") && jQuery(".SSV-video-popup-product-list-multi-title b").click();
                                        });
                                } else jQuery("#SWIRL-short-videos .swiper-wrapper").empty(), jQuery("#SWIRL-short-videos .swiper").hide();
                            },
                        }),
                        SSVsetPopupHight();
                }),
                clearInterval(i));
        }, 1e3);
    }
})();
var keys = { 38: 1, 40: 1 };
function preventDefault(e) {
    e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) return preventDefault(e), !1;
}
var supportsPassive = !1;
try {
    window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = !0;
            },
        })
    );
} catch (e) {}
var wheelOpt = !!supportsPassive && { passive: !1 },
    wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
let allOverElements = [],
    allOverElementsSticky = [];
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, !1),
        window.addEventListener(wheelEvent, preventDefault, wheelOpt),
        window.addEventListener("touchmove", preventDefault, wheelOpt),
        window.addEventListener("keydown", preventDefaultForScrollKeys, !1),
        (allOverElements = []),
        (allOverElementsSticky = []),
        jQuery("*").each(function () {
            "fixed" == jQuery(this).css("position") && jQuery(this).is(":visible") && (jQuery(this).is(".SSV-play-modal") || jQuery(this).is(".SSV-PIP") || (jQuery(this).hide(), allOverElements.push(jQuery(this)))),
                "sticky" == jQuery(this).css("position") && jQuery(this).is(":visible") && (jQuery(this).is(".SSV-play-modal") || jQuery(this).is(".SSV-PIP") || (jQuery(this).hide(), allOverElements.push(jQuery(this))));
        });
}
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, !1),
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt),
        window.removeEventListener("touchmove", preventDefault, wheelOpt),
        window.removeEventListener("keydown", preventDefaultForScrollKeys, !1),
        allOverElements.forEach((e) => {
            jQuery(e).show();
        }),
        allOverElementsSticky.forEach((e) => {
            jQuery(e).show();
        });
}
function SSVaddToCart(e, t) {
    var o = e.split("?")[0] ? e.split("?")[0] : e,
        i = o.substring(o.lastIndexOf("/") + 1),
        a = "";
    jQuery.ajax({ url: "/products/" + i + ".js", dataType: "json" }).done(function (o) {
        if (o) {
            (a = o.variants[0].id), $(t).html("Adding...");
            var i = !1;
            jQuery.ajax({ url: "/cart.js", dataType: "json" }).done(function (o) {
                for (var r = 0; r < o.items.length; r++) o.items[r].id == a && (i = !0);
                if (0 == i)
                    jQuery.ajax({ type: "POST", url: "/cart/add.js", dataType: "json", data: { items: [{ id: a, quantity: 1 }] } }).done(function (o) {
                        $(t).html("View Cart"), $(t).attr("data-action", "3"), addedtoCart.push(e);
                        const i = new Event("SwirlAddtoCart");
                        document.getElementById("swirl-short-videos").dispatchEvent(i);
                    });
                else {
                    $(t).html("View Cart"), $(t).attr("data-action", "3"), addedtoCart.push(e);
                    const o = new Event("SwirlAddtoCart");
                    document.getElementById("swirl-short-videos").dispatchEvent(o);
                }
            });
        } else $(t).html("Failed").delay(3e3).html("Add to Cart");
    });
}
var xDown = null,
    yDown = null;
function getTouches(e) {
    return e.touches || e.originalEvent.touches;
}
function handleTouchStart(e) {
    const t = getTouches(e)[0];
    (xDown = t.clientX), (yDown = t.clientY);
}
function handleTouchMove(e) {
    if (xDown && yDown) {
        var t = e.touches[0].clientX,
            o = e.touches[0].clientY,
            i = xDown - t,
            a = yDown - o;
        Math.abs(i) > Math.abs(a) && (i > 0 ? jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-right").click() : jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-left").click()), (xDown = null), (yDown = null);
    }
}
function SSVsetPopupHight() {
    let e = window.innerHeight;
    jQuery(".SSV-play-modal").height(e);
}
function SSVCTAClicksTrack(e, t) {
    let o = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-vid"),
        i = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-did"),
        a = e,
        r = t,
        l = SWIRLuser ? SWIRLuser.user_id : "";
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://shop.goswirl.live/index.php/shopify/actionbuttons",
        data: "designer_id=" + encodeURIComponent(i) + "&product_id=" + encodeURIComponent(a) + "&user_id=" + encodeURIComponent(l) + "&video_id=" + encodeURIComponent(o) + "&type=" + encodeURIComponent(r),
        beforeSend: function () {},
        success: function (e) {},
        error: function (e, t) {},
        complete: function () {},
    });
}
window.onresize = SSVsetPopupHight;
let gumletVideoCountCall = 0;
function gumletVideoCount() {
    if ((gumletVideoCountCall++, null != jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-gumletassetid") && gumletVideoCountCall > 1)) {
        var e = document.getElementById("gumlet-video-count");
        gumlet.insights({ property_id: "jYfkUIVL" }).register(e),
            (vid = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-vid")),
            jQuery.ajax({ type: "POST", dataType: "json", url: "https://api.goswirl.live/index.php/BrandController/getShortVideoAnalytics", data: "vid=" + encodeURIComponent(vid), success: function (e) {} });
    }
}
