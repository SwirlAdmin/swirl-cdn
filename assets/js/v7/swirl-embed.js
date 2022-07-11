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
function ssvPlayWithPromise(o) {
    var e = o.play();
    void 0 !== e && e.then((o) => {}).catch((o) => {});
}
function updateSSVDurations(o) {
    var e = String(Math.floor(parseInt(o.duration / 60, 10))).padStart(2, "0"),
        t = String(Math.floor(o.duration % 60)).padStart(2, "0");
    $(o)
        .parent(".swiper-slide")
        .children(".SSV-video-timer-top")
        .children("p")
        .html(e + ":" + t);
}
function updateSSVProgressBar(o) {
    var e = Math.floor((100 / o.duration) * o.currentTime);
    $(o)
        .parent(".swiper-slide")
        .children(".SSV-video-progress")
        .children(".SSV-video-progress-inner")
        .css("width", e + "%");
    var t = String(Math.floor(parseInt(o.duration - o.currentTime) / 60, 10)).padStart(2, "0"),
        a = String(Math.floor(parseInt(o.duration - o.currentTime) % 60)).padStart(2, "0");
    $(o)
        .parent(".swiper-slide")
        .children(".SSV-video-timer-top")
        .children("p")
        .html(t + ":" + a);
}
function SSVpauseAll(o = "") {
    if (
        (jQuery(".swiper-slide video").each(function () {
            jQuery(this).get(0).pause();
        }),
        o)
    ) {
        var e = o.get(0).play();
        void 0 !== e && e.then((o) => {}).catch((o) => {});
    }
}
function updateSSVModalProgressBar(o) {
    var e = Math.floor((100 / o.duration) * o.currentTime);
    $(o)
        .parent(".SSV-play-modal-video-container")
        .children(".SSV-video-popup-progress")
        .children(".SSV-video-popup-progress-inner")
        .css("width", e + "%");
}
function updateSSVModalInfos(o) {
    let e = localStorage.getItem("SSVlastPlayedData") && localStorage.getItem("SSVlastPlayed") ? JSON.parse(localStorage.getItem("SSVlastPlayedData")) : "";
    e && (productsAll[e.vid] = e.product),
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
    let t = $(o).children("source").attr("src"),
        a = $(`.swiper-wrapper source[src="${t}"]`).length ? $(`.swiper-wrapper source[src="${t}"]`).parent("video").attr("data-title") : e.title;
    $(o).parent(".SSV-play-modal-video-container").children(".SSV-video-popup-title").html(a);
    let n = $(`.swiper-wrapper source[src="${t}"]`).length ? $(`.swiper-wrapper source[src="${t}"]`).parent("video").attr("data-vid") : e.vid,
        i = productsAll[n];
    if (Object.keys(i).length > 0)
        if (1 === Object.keys(i).length) {
            let o = i[0];
            if (
                ((o.desription = o.desription.trim()),
                jQuery(".SSV-video-popup-product p").html(o.title),
                jQuery(".SSV-video-popup-product label").html(o.currencysymbols + " " + o.price),
                jQuery(".SSV-video-popup-product img").attr("src", o.image),
                setTimeout(() => {
                    jQuery(".SSV-video-popup-product").show();
                }, 100),
                jQuery(".SSV-video-product-open p").html(o.title),
                o.desription)
            ) {
                let e =
                    o.desription.length > 200
                        ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' +
                          o.desription.substr(0, 196) +
                          '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' +
                          o.desription +
                          ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>'
                        : o.desription;
                jQuery(".SSV-video-product-open section").html(e), jQuery(".SSV-video-product-open section").show(), jQuery(".SSV-video-product-open span").show();
            } else jQuery(".SSV-video-product-open section").hide(), jQuery(".SSV-video-product-open span").hide();
            jQuery(".SSV-video-product-open label").html(o.currencysymbols + " " + o.price),
                jQuery(".SSV-video-product-open img").attr("src", o.image),
                "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-product-open").show(), jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover"));
            let e = o.url;
            e
                ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", e),
                  jQuery(".SSV-play-modal-addtocart").attr("data-pid", o.product_id),
                  addedtoCart.includes(e)
                      ? (jQuery(".SSV-pm-add-to-cart").html("View Cart"), jQuery(".SSV-pm-add-to-cart").attr("data-action", "3"))
                      : (jQuery(".SSV-pm-add-to-cart").html("Add to Cart"), jQuery(".SSV-pm-add-to-cart").attr("data-action", "1")),
                  e.search(store) >= 0 ? jQuery(".SSV-pm-add-to-cart").show() : jQuery(".SSV-pm-add-to-cart").hide())
                : jQuery(".SSV-play-modal-addtocart").hide();
        } else {
            jQuery(".SSV-video-popup-product-multi img").attr("src", i[0].image), jQuery(".SSV-video-popup-product-multi .counter").html(i.length);
            let o = "";
            i.forEach((e) => {
                o += `\n                    <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">\n                        <img src="${
                    e.image
                }" alt="Product Image" height="" width="">\n                        <div>\n                            <p data-pid="${e.product_id}" data-desc="${e.desription.replace('"', "").replace("<", "").replace(">", "")}">${
                    e.title
                }</p>\n                            <label data-link="${e.url}">${e.currencysymbols + " " + e.price}</label>\n                        </div>\n                    </div>\n                `;
            }),
                jQuery(".SSV-video-popup-product-list-multi-append").html(o),
                setTimeout(() => {
                    jQuery(".SSV-video-popup-product-multi").show();
                }, 100);
        }
    else
        jQuery(".SSV-play-modal-buynow-on").show(),
            jQuery(".SSV-play-modal-buynow-on").attr("data-link", jQuery(`.swiper-wrapper source[src="${t}"]`).length ? jQuery(`.swiper-wrapper source[src="${t}"]`).parent("video").attr("data-productlink") : e.productlink),
            jQuery(".SSV-video-popup-product").hide(),
            jQuery(".SSV-video-product-open").hide(),
            jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover");
    let d = SSVallURL.indexOf(t);
    if (
        (jQuery(".SSV-modal-left").show(),
        jQuery(".SSV-modal-right").show(),
        void 0 === SSVallURL[d + 1] && jQuery(".SSV-modal-right").hide(),
        void 0 === SSVallURL[d - 1] && jQuery(".SSV-modal-left").hide(),
        1 == globalMute
            ? (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"), jQuery(".SSV-play-modal video").prop("muted", globalMute))
            : (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg"), jQuery(".SSV-play-modal video").prop("muted", globalMute)),
        "1" === brandCustomizations.pip_mode)
    )
        if ((localStorage.setItem("SSVlastPlayed", t), jQuery(`.swiper-wrapper source[src="${t}"]`).length)) {
            let o = $(`.swiper-wrapper source[src="${t}"]`).parent("video").data();
            (o.product = productsAll[o.vid]), localStorage.setItem("SSVlastPlayedData", JSON.stringify(o));
        } else e && localStorage.setItem("SSVlastPlayedData", JSON.stringify(e));
    brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(), jQuery(".SSV-pmm-add-to-cart").hide());
}
function openMultiProductDetail(o) {
    jQuery(".SSV-video-popup-product-list-multi-product-detail p").html(jQuery(o).find("p").html());
    let e = jQuery(o).find("p").attr("data-desc");
    if (e) {
        let o =
            e.length > 200
                ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' +
                  e.substr(0, 196) +
                  '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' +
                  e +
                  ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none;">See less</a></h6>'
                : e;
        jQuery(".SSV-video-popup-product-list-multi-product-detail section").html(o), jQuery(".SSV-video-popup-product-list-multi-product-detail section").show(), jQuery(".SSV-video-popup-product-list-multi-product-detail span").show();
    } else jQuery(".SSV-video-popup-product-list-multi-product-detail section").hide(), jQuery(".SSV-video-popup-product-list-multi-product-detail span").hide();
    jQuery(".SSV-video-popup-product-list-multi-product-detail label").html(jQuery(o).find("label").html()),
        jQuery(".SSV-video-popup-product-list-multi-product-detail img").attr("src", jQuery(o).find("img").attr("src")),
        "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-popup-product-list-multi").show(), jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover"));
    let t = jQuery(o).find("label").attr("data-link");
    t
        ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", t),
          jQuery(".SSV-play-modal-addtocart").attr("data-pid", jQuery(o).find("p").attr("data-pid")),
          addedtoCart.includes(t)
              ? (jQuery(".SSV-pmm-add-to-cart").html("View Cart"), jQuery(".SSV-pmm-add-to-cart").attr("data-action", "3"))
              : (jQuery(".SSV-pmm-add-to-cart").html("Add to Cart"), jQuery(".SSV-pmm-add-to-cart").attr("data-action", "1")),
          t.search(store) >= 0 ? jQuery(".SSV-pmm-add-to-cart").show() : jQuery(".SSV-pmm-add-to-cart").hide())
        : jQuery(".SSV-play-modal-addtocart").hide(),
        jQuery(".SSV-video-popup-product-list-multi-append").hide(),
        jQuery(".SSV-video-popup-product-list-multi-product-detail").show(),
        brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(), jQuery(".SSV-pmm-add-to-cart").hide());
}
function updateSSVPIPInfos(o) {
    if ("1" === brandCustomizations.pip_mode) {
        let e = $(o).children("source").attr("src");
        localStorage.setItem("SSVlastPlayed", e);
    }
}
function dragElement(o) {
    var e = 0,
        t = 0,
        a = 0,
        n = 0;
    function i(o) {
        (o = o || window.event).preventDefault(), (a = o.clientX), (n = o.clientY), (document.onmouseup = r), (document.onmousemove = d);
    }
    function d(i) {
        (i = i || window.event).preventDefault(), (e = a - i.clientX), (t = n - i.clientY), (a = i.clientX), (n = i.clientY), (o.style.top = o.offsetTop - t + "px"), (o.style.left = o.offsetLeft - e + "px");
    }
    function r() {
        (document.onmouseup = null), (document.onmousemove = null);
    }
    document.getElementById(o.id + "header") ? (document.getElementById(o.id + "header").onmousedown = i) : (o.onmousedown = i);
}
function SSVcopyLink(o) {
    var e = o;
    e.select(), e.setSelectionRange(0, 99999), navigator.clipboard.writeText(e.value);
}
!(function () {
    if (localStorage.getItem("SSVallURL") && localStorage.getItem("SSVlastPlayed") && null == document.querySelector("#swirl-short-videos")) {
        SSVvideosAll = JSON.parse(localStorage.getItem("SSVallURL"));
        let e,
            t = !1;
        if (
            (((o = document.createElement("script")).rel = "text/javascript"),
            (o.src = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/swiper-bundle.min.js"),
            (o.onload = function () {
                e = !0;
            }),
            headTag.insertBefore(o, headTag.lastChild),
            ((o = document.createElement("link")).rel = "stylesheet"),
            (o.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/short-videos.css"),
            document.body.appendChild(o),
            ((o = document.createElement("link")).rel = "stylesheet"),
            (o.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/swiper-bundle.min.css"),
            headTag.insertBefore(o, headTag.firstChild),
            "undefined" == typeof jQuery)
        )
            ((o = document.createElement("script")).rel = "text/javascript"),
                (o.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"),
                headTag.insertBefore(o, headTag.lastChild),
                (o.onload = function () {
                    t = !0;
                });
        else t = !0;
        let a = setInterval(() => {
            e &&
                t &&
                ($(document).ready(function () {
                    jQuery("body").prepend(
                        '\n                <div id="SWIRL-short-videos">\n                    <div class="swiper" style="display: none!important;">\n                        <div class="swiper-wrapper">\n                            <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>\n                        </div>\n                        <div class="swiper-button-next">\n                            <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" height="" width="" alt="Next icon">\n                        </div>\n                        <div class="swiper-button-prev">\n                            <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" height="" width="" alt="Previous icon">\n                        </div>\n                    </div>\n\n                    <div class="SSV-powered-by">\n                        <label><i>Powered by</i></label>\n                        <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                            <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                        </a>\n                    </div>\n\n                    <div class="SSV-play-modal">                \n                        <div class="SSV-play-modal-video-container">\n                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >\n                                <source src="" type="video/mp4">\n                            </video>\n\n                            <div class="SSV-play-modal-top-shadow"></div>\n\n                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">\n                                <img src="https://goswirl.shop/swirl-embed/assets/unmute.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">\n                                <img src="https://goswirl.shop/swirl-embed/assets/share.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pause.svg" alt="Play/Pause icon" height="" width="">\n                            </button>                    \n                            <button type="button" class="SSV-play-modal-askaque SSV-play-modal-operation-btns" title="Ask Question">\n                                <img src="https://goswirl.shop/swirl-embed/assets/ask-question.svg" alt="Ask Question icon" height="" width="">\n                            </button>\n\n                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">\n                                Buy Now\n                            </button>\n\n                            <div class="SSV-video-popup-progress">\n                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>\n                            </div>\n\n                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>\n                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pip.svg" alt="Share icon" height="" width="">\n                            </button>\n\n                            <p class="SSV-video-popup-title"></p>\n\n                            <div class="SSV-video-popup-product">\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-product-open">\n                                <b style="font-family: arial;" title="Close">&times;</b>\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                                <br>\n                                <span>Description</span>\n                                <section></section>\n                                <center>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>\n                                </center>\n                            </div>\n\n                            <div class="SSV-video-popup-product-multi" onclick="jQuery(\'.SSV-video-popup-product-list-multi\').show();">\n                                <img src="" alt="Product Image" height="" width="">                                \n                                <p class="counter"></p>\n                            </div>\n\n                            <div class="SSV-video-popup-product-list-multi">                                \n                                <p class="SSV-video-popup-product-list-multi-title">\n                                    <label style="font-family: arial;" title="Back">&#8249;</label>\n                                    Shop\n                                    <b style="font-family: arial;" title="Close">&times;</b>\n                                </p>\n                                <div class="SSV-video-popup-product-list-multi-append">                                    \n                                </div>\n                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    \n                                    <img src="" alt="Product Image" height="" width="">\n                                    <div>\n                                        <p></p>\n                                        <label></label>\n                                    </div>\n                                    <br>\n                                    <span>Description</span>\n                                    <section></section>\n                                    <center>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>\n                                    </center>\n                                </div>\n                            </div>\n\n                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">\n                                <img src="https://goswirl.shop/swirl-embed/assets/toggle.png" alt="Toggle icon" height="" width="">\n                            </button>\n                            <div class="SSV-video-popup-brand-info">\n                                <label style="font-family: arial;" title="Close">&times;</label>                        \n                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />\n                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>\n                                <p class="SSV-video-popup-brand-info-brand-about">About</p>\n                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>\n                                <div class="SSV-video-popup-brand-info-powered">\n                                    <span>Powered by</span>\n                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                                        <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> \n                                    </a>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-popup-share">\n                                <p>Share to</p>\n                                <label style="font-family: arial;">&times;</label>\n                                <img class="SSV-facebook" src="https://goswirl.shop/swirl-embed/assets/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">\n                                <img class="SSV-twitter" src="https://goswirl.shop/swirl-embed/assets/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">\n                                <img class="SSV-whatsapp" src="https://goswirl.shop/swirl-embed/assets/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">\n                                <img class="SSV-copy" src="https://goswirl.shop/swirl-embed/assets/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">\n                                <span>Link Copied!</span>\n                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">\n                            </div>\n\n                            <div class="SSV-CTA-modal">          \n                                <div class="SSV-OTP-send SSV-CTA-modal-inner">\n                                    <label>Register Yourself <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVsendOTP(this);">\n                                    <input type="text" name="SSVuserName" placeholder="Name" autocomplete="off" required>\n                                    <div style="position: relative;" class="phone-and-code">\n                                        <select name="SSVcountryCode">\n                                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>\n                                        <option data-countryCode="AD" value="376">Andorra (+376)</option>\n                                        <option data-countryCode="AO" value="244">Angola (+244)</option>\n                                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>\n                                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>\n                                        <option data-countryCode="AR" value="54">Argentina (+54)</option>\n                                        <option data-countryCode="AM" value="374">Armenia (+374)</option>\n                                        <option data-countryCode="AW" value="297">Aruba (+297)</option>\n                                        <option data-countryCode="AU" value="61">Australia (+61)</option>\n                                        <option data-countryCode="AT" value="43">Austria (+43)</option>\n                                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>\n                                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>\n                                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>\n                                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>\n                                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>\n                                        <option data-countryCode="BY" value="375">Belarus (+375)</option>\n                                        <option data-countryCode="BE" value="32">Belgium (+32)</option>\n                                        <option data-countryCode="BZ" value="501">Belize (+501)</option>\n                                        <option data-countryCode="BJ" value="229">Benin (+229)</option>\n                                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>\n                                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>\n                                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>\n                                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>\n                                        <option data-countryCode="BW" value="267">Botswana (+267)</option>\n                                        <option data-countryCode="BR" value="55">Brazil (+55)</option>\n                                        <option data-countryCode="BN" value="673">Brunei (+673)</option>\n                                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>\n                                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>\n                                        <option data-countryCode="BI" value="257">Burundi (+257)</option>\n                                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>\n                                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>\n                                        <option data-countryCode="CA" value="1">Canada (+1)</option>\n                                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>\n                                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>\n                                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>\n                                        <option data-countryCode="CL" value="56">Chile (+56)</option>\n                                        <option data-countryCode="CN" value="86">China (+86)</option>\n                                        <option data-countryCode="CO" value="57">Colombia (+57)</option>\n                                        <option data-countryCode="KM" value="269">Comoros (+269)</option>\n                                        <option data-countryCode="CG" value="242">Congo (+242)</option>\n                                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>\n                                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>\n                                        <option data-countryCode="HR" value="385">Croatia (+385)</option>\n                                        <option data-countryCode="CU" value="53">Cuba (+53)</option>\n                                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>\n                                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>\n                                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>\n                                        <option data-countryCode="DK" value="45">Denmark (+45)</option>\n                                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>\n                                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>\n                                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>\n                                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>\n                                        <option data-countryCode="EG" value="20">Egypt (+20)</option>\n                                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>\n                                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>\n                                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>\n                                        <option data-countryCode="EE" value="372">Estonia (+372)</option>\n                                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>\n                                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>\n                                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>\n                                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>\n                                        <option data-countryCode="FI" value="358">Finland (+358)</option>\n                                        <option data-countryCode="FR" value="33">France (+33)</option>\n                                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>\n                                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>\n                                        <option data-countryCode="GA" value="241">Gabon (+241)</option>\n                                        <option data-countryCode="GM" value="220">Gambia (+220)</option>\n                                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>\n                                        <option data-countryCode="DE" value="49">Germany (+49)</option>\n                                        <option data-countryCode="GH" value="233">Ghana (+233)</option>\n                                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>\n                                        <option data-countryCode="GR" value="30">Greece (+30)</option>\n                                        <option data-countryCode="GL" value="299">Greenland (+299)</option>\n                                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>\n                                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>\n                                        <option data-countryCode="GU" value="671">Guam (+671)</option>\n                                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>\n                                        <option data-countryCode="GN" value="224">Guinea (+224)</option>\n                                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>\n                                        <option data-countryCode="GY" value="592">Guyana (+592)</option>\n                                        <option data-countryCode="HT" value="509">Haiti (+509)</option>\n                                        <option data-countryCode="HN" value="504">Honduras (+504)</option>\n                                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>\n                                        <option data-countryCode="HU" value="36">Hungary (+36)</option>\n                                        <option data-countryCode="IS" value="354">Iceland (+354)</option>\n                                        <option data-countryCode="IN" value="91" selected>India (+91)</option>\n                                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>\n                                        <option data-countryCode="IR" value="98">Iran (+98)</option>\n                                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>\n                                        <option data-countryCode="IE" value="353">Ireland (+353)</option>\n                                        <option data-countryCode="IL" value="972">Israel (+972)</option>\n                                        <option data-countryCode="IT" value="39">Italy (+39)</option>\n                                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>\n                                        <option data-countryCode="JP" value="81">Japan (+81)</option>\n                                        <option data-countryCode="JO" value="962">Jordan (+962)</option>\n                                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>\n                                        <option data-countryCode="KE" value="254">Kenya (+254)</option>\n                                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>\n                                        <option data-countryCode="KP" value="850">Korea North (+850)</option>\n                                        <option data-countryCode="KR" value="82">Korea South (+82)</option>\n                                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>\n                                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>\n                                        <option data-countryCode="LA" value="856">Laos (+856)</option>\n                                        <option data-countryCode="LV" value="371">Latvia (+371)</option>\n                                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>\n                                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>\n                                        <option data-countryCode="LR" value="231">Liberia (+231)</option>\n                                        <option data-countryCode="LY" value="218">Libya (+218)</option>\n                                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>\n                                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>\n                                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>\n                                        <option data-countryCode="MO" value="853">Macao (+853)</option>\n                                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>\n                                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>\n                                        <option data-countryCode="MW" value="265">Malawi (+265)</option>\n                                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>\n                                        <option data-countryCode="MV" value="960">Maldives (+960)</option>\n                                        <option data-countryCode="ML" value="223">Mali (+223)</option>\n                                        <option data-countryCode="MT" value="356">Malta (+356)</option>\n                                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>\n                                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>\n                                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>\n                                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>\n                                        <option data-countryCode="MX" value="52">Mexico (+52)</option>\n                                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>\n                                        <option data-countryCode="MD" value="373">Moldova (+373)</option>\n                                        <option data-countryCode="MC" value="377">Monaco (+377)</option>\n                                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>\n                                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>\n                                        <option data-countryCode="MA" value="212">Morocco (+212)</option>\n                                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>\n                                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>\n                                        <option data-countryCode="NA" value="264">Namibia (+264)</option>\n                                        <option data-countryCode="NR" value="674">Nauru (+674)</option>\n                                        <option data-countryCode="NP" value="977">Nepal (+977)</option>\n                                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>\n                                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>\n                                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>\n                                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>\n                                        <option data-countryCode="NE" value="227">Niger (+227)</option>\n                                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>\n                                        <option data-countryCode="NU" value="683">Niue (+683)</option>\n                                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>\n                                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>\n                                        <option data-countryCode="NO" value="47">Norway (+47)</option>\n                                        <option data-countryCode="OM" value="968">Oman (+968)</option>\n                                        <option data-countryCode="PW" value="680">Palau (+680)</option>\n                                        <option data-countryCode="PA" value="507">Panama (+507)</option>\n                                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>\n                                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>\n                                        <option data-countryCode="PE" value="51">Peru (+51)</option>\n                                        <option data-countryCode="PH" value="63">Philippines (+63)</option>\n                                        <option data-countryCode="PL" value="48">Poland (+48)</option>\n                                        <option data-countryCode="PT" value="351">Portugal (+351)</option>\n                                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>\n                                        <option data-countryCode="QA" value="974">Qatar (+974)</option>\n                                        <option data-countryCode="RE" value="262">Reunion (+262)</option>\n                                        <option data-countryCode="RO" value="40">Romania (+40)</option>\n                                        <option data-countryCode="RU" value="7">Russia (+7)</option>\n                                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>\n                                        <option data-countryCode="SM" value="378">San Marino (+378)</option>\n                                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>\n                                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>\n                                        <option data-countryCode="SN" value="221">Senegal (+221)</option>\n                                        <option data-countryCode="CS" value="381">Serbia (+381)</option>\n                                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>\n                                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>\n                                        <option data-countryCode="SG" value="65">Singapore (+65)</option>\n                                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>\n                                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>\n                                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>\n                                        <option data-countryCode="SO" value="252">Somalia (+252)</option>\n                                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>\n                                        <option data-countryCode="ES" value="34">Spain (+34)</option>\n                                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>\n                                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>\n                                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>\n                                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>\n                                        <option data-countryCode="SD" value="249">Sudan (+249)</option>\n                                        <option data-countryCode="SR" value="597">Suriname (+597)</option>\n                                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>\n                                        <option data-countryCode="SE" value="46">Sweden (+46)</option>\n                                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>\n                                        <option data-countryCode="SI" value="963">Syria (+963)</option>\n                                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>\n                                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>\n                                        <option data-countryCode="TH" value="66">Thailand (+66)</option>\n                                        <option data-countryCode="TG" value="228">Togo (+228)</option>\n                                        <option data-countryCode="TO" value="676">Tonga (+676)</option>\n                                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>\n                                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>\n                                        <option data-countryCode="TR" value="90">Turkey (+90)</option>\n                                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>\n                                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>\n                                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>\n                                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>\n                                        <option data-countryCode="UG" value="256">Uganda (+256)</option>\n                                        <option data-countryCode="GB" value="44">UK (+44)</option>\n                                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>\n                                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>\n                                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>\n                                        <option data-countryCode="US" value="1">USA (+1)</option>\n                                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>\n                                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>\n                                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>\n                                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>\n                                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>\n                                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>\n                                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>\n                                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>\n                                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>\n                                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>\n                                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>\n                                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>\n                                        </select>\n                                        <input type="number" name="SSVphoneNumber" placeholder="Phone Number" autocomplete="off" required>\n                                    </div>\n                                    <button>Register<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                </div>\n                                <div class="SSV-OTP-verification SSV-CTA-modal-inner">\n                                    <label>Verify Yourself <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVregisterOTP(this);">\n                                    <input type="number" name="SSVotp" placeholder="OTP" autocomplete="off" required>\n                                    <button>Verify<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                </div>\n                                <div class="SSV-ask-question SSV-CTA-modal-inner">\n                                    <div>\n                                    <label>Ask Question <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVaskQuestion(this);">\n                                    <textarea placeholder="Type here" name="SSVaskQue" rows="3" autocomplete="off" required></textarea>\n                                    <button>Send<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="SSV-popup-video-loader"><p></p></div>\n\n                        <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">\n                        <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">\n                    </div>\n\n                    <div class="SSV-PIP" id="SSV-PIP">\n                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>\n                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);">\n                            <source src="" type="video/mp4">\n                        </video>\n                        <span class="SSV-PIP-fullscreen"></span>\n                    </div>\n                </div>\n            '
                    );
                    var o = window.location.href.split("?")[0] ? window.location.href.split("?")[0] : window.location.href;
                    o = (o = o.replace("#SWIRL-short-videos", "")).replace("#", "");
                    let e = localStorage.getItem("SSVshopify"),
                        t = new URL(o);
                    (store = t.hostname), (store = e ? store : "satyamgandhidev.com");
                    var a = document.createElement("script");
                    if (((a.rel = "text/javascript"), (a.src = "https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js"), headTag.insertBefore(a, headTag.lastChild), void 0 !== SSVvideosAll.swilrs.video)) {
                        let e = SSVvideosAll.swilrs.data;
                        brandCustomizations = e;
                        let t = 0,
                            a = "";
                        (live_stream_phone = e.live_stream_phone),
                            (live_stream_phone_otp = e.live_stream_phone_otp),
                            "0" === live_stream_phone && (jQuery(".phone-and-code").hide(), jQuery('input[name="SSVphoneNumber"]').attr("disabled", "true")),
                            SSVvideosAll.swilrs.video.forEach((o) => {
                                let n = "";
                                t++, "1" === e.auto_play && (n = t > 6 ? "" : "loop autoplay"), SSVallURL.push(o.video_url);
                                let i = o.image ? o.image : "https://goswirl.shop/swirl-embed/assets/default-video-thumbnail.jpg",
                                    d = "",
                                    r = "",
                                    l = "";
                                Object.keys(o.product).length > 0 && ((d = o.product[0].product_id), (r = o.product[0].url), (l = `<img src="${o.product[0].image}" class="SSV-video-prod-image-c" alt="Product Thumbnail" />`)),
                                    (r = r || o.product_link),
                                    (productsAll[o.video_id] = o.product),
                                    (a += `<div class="swiper-slide">\n                        <video poster="${i}" ontimeupdate="updateSSVProgressBar(this);" onloadeddata="updateSSVDurations(this);" playsinline preload="metadata" data-setup="{}" muted ${n} width="100%" height="100%" data-product="${r}" data-title="${o.video_title}" data-cover="${o.image}" data-link="${o.link}" data-vid="${o.video_id}" data-did="${o.designer_id}" data-productid="${d}" data-productlink="${r}" data-gumletassetid="${o.gumletAssetId}" data-totalviews="${o.total_views}">\n                            <source src="${o.video_url}" type="video/mp4">\n                        </video>\n                        <div class="SSV-play-btn">\n                            <label></label>\n                        </div>\n                        <div class="SSV-video-progress">\n                            <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>\n                        </div>\n                        <div class="SSV-video-playing">\n                            <label>Preview mode</label>\n                        </div>\n                        <div class="SSV-video-title-bottom">\n                            <p class="full-t">${o.video_title}</p>\n                            <a href="https://www.goswirl.live/" target="_blank" rel="nofollow" style="display:none;">\n                                <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                            </a>\n                        </div>\n                        <div class="SSV-video-timer-top">\n                            <p>00:00</p>                            \n                        </div>\n                        ${l}\n                    </div>`);
                            }),
                            jQuery("#SWIRL-short-videos .swiper-wrapper").empty(),
                            jQuery("#SWIRL-short-videos .swiper-wrapper").append(a),
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
                                    a = $(this).children("video").attr("data-cover");
                                (SSVCurrentURL = t),
                                    jQuery(".SSV-play-modal video source").attr("src", t),
                                    jQuery(".SSV-play-modal video").attr("poster", a),
                                    jQuery(".SSV-play-modal video").get(0).load(),
                                    "0" === e.auto_play_mute_un
                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(t)),
                                    jQuery(".SSV-video-popup-share").hide(),
                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                    jQuery(".close-SSV-PIP").click(),
                                    disableScroll();
                            });
                        let n = 0;
                        jQuery(".close-SSV-modal").click(function () {
                            (n = jQuery(".SSV-play-modal video").get(0).currentTime),
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
                                let o = jQuery(".SSV-play-modal video").get(0);
                                o.paused ? o.play() : o.pause();
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
                                let t = jQuery(".SSV-play-modal video source").attr("src"),
                                    a = SSVallURL.indexOf(t);
                                if (void 0 !== SSVallURL[a - 1]) {
                                    SSVCurrentURL = SSVallURL[a - 1];
                                    let t = $(`.swiper-wrapper source[src="${SSVallURL[a - 1]}"]`)
                                        .parent("video")
                                        .attr("data-cover");
                                    jQuery(".SSV-play-modal video").attr("poster", t),
                                        jQuery(".SSV-play-modal video source").attr("src", SSVallURL[a - 1]),
                                        jQuery(".SSV-play-modal video").get(0).load(),
                                        "0" === e.auto_play_mute_un
                                            ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                            : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                        ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                        jQuery(".SSV-video-popup-share").hide(),
                                        jQuery(".SSV-CTA-modal-inner").hide(),
                                        jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[a - 1]));
                                }
                            }),
                            jQuery(".SSV-modal-right").click(function () {
                                let t = jQuery(".SSV-play-modal video source").attr("src"),
                                    a = SSVallURL.indexOf(t);
                                if (void 0 !== SSVallURL[a + 1]) {
                                    SSVCurrentURL = SSVallURL[a + 1];
                                    let t = $(`.swiper-wrapper source[src="${SSVallURL[a + 1]}"]`)
                                        .parent("video")
                                        .attr("data-cover");
                                    jQuery(".SSV-play-modal video").attr("poster", t),
                                        jQuery(".SSV-play-modal video source").attr("src", SSVallURL[a + 1]),
                                        jQuery(".SSV-play-modal video").get(0).load(),
                                        "0" === e.auto_play_mute_un
                                            ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                            : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                        ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                        jQuery(".SSV-video-popup-share").hide(),
                                        jQuery(".SSV-CTA-modal-inner").hide(),
                                        jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[a + 1]));
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
                                let o = $(this).attr("data-sharelink");
                                window.open("https://www.facebook.com/sharer/sharer.php?u=" + o, "_blank");
                            }),
                            jQuery(".SSV-twitter").click(function () {
                                let o = $(this).attr("data-sharelink");
                                window.open("https://twitter.com/share?url=" + o, "_blank");
                            }),
                            jQuery(".SSV-whatsapp").click(function () {
                                let o = $(this).attr("data-sharelink");
                                window.open("whatsapp://send?text=" + o);
                            }),
                            jQuery(".SSV-copy").click(function () {
                                let o = $(this).attr("data-sharelink");
                                jQuery(".SSV-copylink-input").val(o), jQuery(".SSV-copylink-input").click(), jQuery(".SSV-video-popup-share span").fadeIn().delay(3e3).fadeOut();
                            });
                        const i = new URLSearchParams(window.location.search),
                            d = Object.fromEntries(i.entries());
                        if (void 0 !== d.ssv) {
                            jQuery(".SSV-play-modal").show();
                            let e = d.ssv;
                            (SSVCurrentURL = window.atob(e)),
                                jQuery(".SSV-play-modal video source").attr("src", window.atob(e)),
                                jQuery(".SSV-play-modal video").get(0).load(),
                                jQuery(".SSV-play-modal video").prop("muted", !0),
                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"),
                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + e),
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
                            jQuery(".SSV-play-modal-askaque").click(function () {
                                jQuery(".SSV-CTA-modal-inner").hide(), jQuery(".SSV-ask-question").show();
                            }),
                            jQuery(".SSV-play-modal-addtocart").click(function () {
                                let o = $(this),
                                    e = $(this).attr("data-action"),
                                    t = $(this).attr("data-pid"),
                                    a = $(this).attr("data-link");
                                "2" == e
                                    ? ("1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click(), SSVCTAClicksTrack(t, "1"), (window.location = a))
                                    : "1" == e
                                    ? (SSVaddToCart(a, o), SSVCTAClicksTrack(t, "2"))
                                    : "3" == e && (window.location = "https://" + store + "/cart");
                            }),
                            $(document).keydown(function (o) {
                                jQuery(".SSV-play-modal").is(":visible") &&
                                    (37 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                        ? 39 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                            ? "Escape" === o.key &&
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
                                (n = jQuery(".SSV-play-modal video").get(0).currentTime),
                                    SSVpauseAll(),
                                    jQuery(".SSV-play-modal video").get(0).pause(),
                                    jQuery(".SSV-play-modal").hide(),
                                    jQuery(".SSV-video-playing").hide(),
                                    jQuery(".SSV-PIP video source").attr("src", jQuery(".SSV-play-modal video source").attr("src")),
                                    jQuery(".SSV-PIP video").get(0).load(),
                                    (jQuery(".SSV-PIP video").get(0).currentTime = n),
                                    ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                    jQuery(".SSV-PIP").show(),
                                    enableScroll();
                            }),
                            jQuery(".SSV-PIP-fullscreen").click(function () {
                                let t = jQuery(".SSV-PIP video source").attr("src");
                                (SSVCurrentURL = t),
                                    jQuery(".SSV-play-modal video source").attr("src", t),
                                    jQuery(".SSV-play-modal video").get(0).load(),
                                    "0" === e.auto_play_mute_un
                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(t)),
                                    jQuery(".SSV-video-popup-share").hide(),
                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                    jQuery(".SSV-PIP video").get(0).pause(),
                                    jQuery(".SSV-PIP").hide(),
                                    jQuery(".SSV-play-modal").show(),
                                    disableScroll();
                            }),
                            "1" === e.powered_by ? jQuery(".SSV-video-popup-brand-info-powered").show() : jQuery(".SSV-video-popup-brand-info-powered").hide(),
                            $(document).on("click touch", function (o) {
                                jQuery(".SSV-video-popup-brand-info").is(":visible")
                                    ? ($(o.target).is(".SSV-play-modal") || $(o.target).is(".SSV-play-modal-video-container video")) && jQuery(".SSV-video-popup-brand-info label").click()
                                    : jQuery(".SSV-play-modal").is(":visible") && $(o.target).is(".SSV-play-modal");
                            }),
                            (window.onpopstate = function (o) {
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
                            e.user_profile ? (jQuery(".SSV-video-popup-brand-info-brand-logo").attr("src", e.user_profile), jQuery(".SSV-video-popup-brand-info-brand-logo").show()) : jQuery(".SSV-video-popup-brand-info-brand-logo").hide(),
                            jQuery(".SSV-video-popup-brand-info-brand-name").html(e.designer_brand_name),
                            e.designer_bio
                                ? (jQuery(".SSV-video-popup-brand-info-brand-description").html(e.designer_bio), jQuery(".SSV-video-popup-brand-info-brand-description").show(), jQuery(".SSV-video-popup-brand-info-brand-about").show())
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
                            jQuery(".SSV-play-modal video").on("loadstart", function (o) {
                                jQuery(".SSV-play-modal-video-container").addClass("SSV-popup-video-blur-load");
                            }),
                            jQuery(".SSV-play-modal video").on("canplay", function (o) {
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
                        let o = "";
                        jQuery("#SWIRL-short-videos .swiper-wrapper").empty(), jQuery("#SWIRL-short-videos .swiper-wrapper").append(o);
                    }
                    SSVsetPopupHight();
                }),
                clearInterval(a));
        }, 1e3);
    } else if (null != document.querySelector("#swirl-short-videos")) {
        let e,
            t = !1;
        var o;
        if (
            (((o = document.createElement("script")).rel = "text/javascript"),
            (o.src = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/swiper-bundle.min.js"),
            (o.onload = function () {
                e = !0;
            }),
            headTag.insertBefore(o, headTag.lastChild),
            ((o = document.createElement("link")).rel = "stylesheet"),
            (o.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/short-videos.css"),
            document.body.appendChild(o),
            ((o = document.createElement("link")).rel = "stylesheet"),
            (o.href = "https://goswirl.shop/swirl-embed/short-videos-carousel/v7/swiper-bundle.min.css"),
            headTag.insertBefore(o, headTag.firstChild),
            "undefined" == typeof jQuery)
        )
            ((o = document.createElement("script")).rel = "text/javascript"),
                (o.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"),
                headTag.insertBefore(o, headTag.lastChild),
                (o.onload = function () {
                    t = !0;
                });
        else t = !0;
        let a = setInterval(() => {
            e &&
                t &&
                ($(document).ready(function () {
                    jQuery("#swirl-short-videos").html(
                        '\n                <div id="SWIRL-short-videos">\n                    <div class="swiper">\n                        <div class="swiper-wrapper">\n                            <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>\n                        </div>\n                        <div class="swiper-button-next">\n                            <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" height="" width="" alt="Next icon">\n                        </div>\n                        <div class="swiper-button-prev">\n                            <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" height="" width="" alt="Previous icon">\n                        </div>\n                    </div>\n\n                    <div class="SSV-powered-by">\n                        <label><i>Powered by</i></label>\n                        <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                            <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                        </a>\n                    </div>\n\n                    <div class="SSV-play-modal">                \n                        <div class="SSV-play-modal-video-container">\n                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >\n                                <source src="" type="video/mp4">\n                            </video>\n\n                            <div class="SSV-play-modal-top-shadow"></div>\n\n                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">\n                                <img src="https://goswirl.shop/swirl-embed/assets/unmute.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">\n                                <img src="https://goswirl.shop/swirl-embed/assets/share.svg" alt="Share icon" height="" width="">\n                            </button>\n                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pause.svg" alt="Play/Pause icon" height="" width="">\n                            </button>                    \n                            <button type="button" class="SSV-play-modal-askaque SSV-play-modal-operation-btns" title="Ask Question">\n                                <img src="https://goswirl.shop/swirl-embed/assets/ask-question.svg" alt="Ask Question icon" height="" width="">\n                            </button>\n\n                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">\n                                Buy Now\n                            </button>\n\n                            <div class="SSV-video-popup-progress">\n                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>\n                            </div>\n\n                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>\n                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">\n                                <img src="https://goswirl.shop/swirl-embed/assets/pip.svg" alt="Share icon" height="" width="">\n                            </button>\n\n                            <p class="SSV-video-popup-title"></p>\n\n                            <div class="SSV-video-popup-product">\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-product-open">\n                                <b style="font-family: arial;" title="Close">&times;</b>\n                                <img src="" alt="Product Image" height="" width="">\n                                <div>\n                                    <p></p>\n                                    <label></label>\n                                </div>\n                                <br>\n                                <span>Description</span>\n                                <section></section>\n                                <center>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>\n                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>\n                                </center>\n                            </div>\n\n                            <div class="SSV-video-popup-product-multi" onclick="jQuery(\'.SSV-video-popup-product-list-multi\').show();">\n                                <img src="" alt="Product Image" height="" width="">                                \n                                <p class="counter"></p>\n                            </div>\n\n                            <div class="SSV-video-popup-product-list-multi">                                \n                                <p class="SSV-video-popup-product-list-multi-title">\n                                    <label style="font-family: arial;" title="Back">&#8249;</label>\n                                    Shop\n                                    <b style="font-family: arial;" title="Close">&times;</b>\n                                </p>\n                                <div class="SSV-video-popup-product-list-multi-append">                                    \n                                </div>\n                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    \n                                    <img src="" alt="Product Image" height="" width="">\n                                    <div>\n                                        <p></p>\n                                        <label></label>\n                                    </div>\n                                    <br>\n                                    <span>Description</span>\n                                    <section></section>\n                                    <center>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>\n                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>\n                                    </center>\n                                </div>\n                            </div>\n\n                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">\n                                <img src="https://goswirl.shop/swirl-embed/assets/toggle.png" alt="Toggle icon" height="" width="">\n                            </button>\n                            <div class="SSV-video-popup-brand-info">\n                                <label style="font-family: arial;" title="Close">&times;</label>                        \n                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />\n                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>\n                                <p class="SSV-video-popup-brand-info-brand-about">About</p>\n                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>\n                                <div class="SSV-video-popup-brand-info-powered">\n                                    <span>Powered by</span>\n                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">\n                                        <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> \n                                    </a>\n                                </div>\n                            </div>\n\n                            <div class="SSV-video-popup-share">\n                                <p>Share to</p>\n                                <label style="font-family: arial;">&times;</label>\n                                <img class="SSV-facebook" src="https://goswirl.shop/swirl-embed/assets/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">\n                                <img class="SSV-twitter" src="https://goswirl.shop/swirl-embed/assets/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">\n                                <img class="SSV-whatsapp" src="https://goswirl.shop/swirl-embed/assets/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">\n                                <img class="SSV-copy" src="https://goswirl.shop/swirl-embed/assets/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">\n                                <span>Link Copied!</span>\n                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">\n                            </div>\n\n                            <div class="SSV-CTA-modal">          \n                                <div class="SSV-OTP-send SSV-CTA-modal-inner">\n                                    <label>Register Yourself <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVsendOTP(this);">\n                                    <input type="text" name="SSVuserName" placeholder="Name" autocomplete="off" required>\n                                    <div style="position: relative;" class="phone-and-code">\n                                        <select name="SSVcountryCode">\n                                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>\n                                        <option data-countryCode="AD" value="376">Andorra (+376)</option>\n                                        <option data-countryCode="AO" value="244">Angola (+244)</option>\n                                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>\n                                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>\n                                        <option data-countryCode="AR" value="54">Argentina (+54)</option>\n                                        <option data-countryCode="AM" value="374">Armenia (+374)</option>\n                                        <option data-countryCode="AW" value="297">Aruba (+297)</option>\n                                        <option data-countryCode="AU" value="61">Australia (+61)</option>\n                                        <option data-countryCode="AT" value="43">Austria (+43)</option>\n                                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>\n                                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>\n                                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>\n                                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>\n                                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>\n                                        <option data-countryCode="BY" value="375">Belarus (+375)</option>\n                                        <option data-countryCode="BE" value="32">Belgium (+32)</option>\n                                        <option data-countryCode="BZ" value="501">Belize (+501)</option>\n                                        <option data-countryCode="BJ" value="229">Benin (+229)</option>\n                                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>\n                                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>\n                                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>\n                                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>\n                                        <option data-countryCode="BW" value="267">Botswana (+267)</option>\n                                        <option data-countryCode="BR" value="55">Brazil (+55)</option>\n                                        <option data-countryCode="BN" value="673">Brunei (+673)</option>\n                                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>\n                                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>\n                                        <option data-countryCode="BI" value="257">Burundi (+257)</option>\n                                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>\n                                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>\n                                        <option data-countryCode="CA" value="1">Canada (+1)</option>\n                                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>\n                                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>\n                                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>\n                                        <option data-countryCode="CL" value="56">Chile (+56)</option>\n                                        <option data-countryCode="CN" value="86">China (+86)</option>\n                                        <option data-countryCode="CO" value="57">Colombia (+57)</option>\n                                        <option data-countryCode="KM" value="269">Comoros (+269)</option>\n                                        <option data-countryCode="CG" value="242">Congo (+242)</option>\n                                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>\n                                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>\n                                        <option data-countryCode="HR" value="385">Croatia (+385)</option>\n                                        <option data-countryCode="CU" value="53">Cuba (+53)</option>\n                                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>\n                                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>\n                                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>\n                                        <option data-countryCode="DK" value="45">Denmark (+45)</option>\n                                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>\n                                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>\n                                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>\n                                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>\n                                        <option data-countryCode="EG" value="20">Egypt (+20)</option>\n                                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>\n                                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>\n                                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>\n                                        <option data-countryCode="EE" value="372">Estonia (+372)</option>\n                                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>\n                                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>\n                                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>\n                                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>\n                                        <option data-countryCode="FI" value="358">Finland (+358)</option>\n                                        <option data-countryCode="FR" value="33">France (+33)</option>\n                                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>\n                                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>\n                                        <option data-countryCode="GA" value="241">Gabon (+241)</option>\n                                        <option data-countryCode="GM" value="220">Gambia (+220)</option>\n                                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>\n                                        <option data-countryCode="DE" value="49">Germany (+49)</option>\n                                        <option data-countryCode="GH" value="233">Ghana (+233)</option>\n                                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>\n                                        <option data-countryCode="GR" value="30">Greece (+30)</option>\n                                        <option data-countryCode="GL" value="299">Greenland (+299)</option>\n                                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>\n                                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>\n                                        <option data-countryCode="GU" value="671">Guam (+671)</option>\n                                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>\n                                        <option data-countryCode="GN" value="224">Guinea (+224)</option>\n                                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>\n                                        <option data-countryCode="GY" value="592">Guyana (+592)</option>\n                                        <option data-countryCode="HT" value="509">Haiti (+509)</option>\n                                        <option data-countryCode="HN" value="504">Honduras (+504)</option>\n                                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>\n                                        <option data-countryCode="HU" value="36">Hungary (+36)</option>\n                                        <option data-countryCode="IS" value="354">Iceland (+354)</option>\n                                        <option data-countryCode="IN" value="91" selected>India (+91)</option>\n                                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>\n                                        <option data-countryCode="IR" value="98">Iran (+98)</option>\n                                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>\n                                        <option data-countryCode="IE" value="353">Ireland (+353)</option>\n                                        <option data-countryCode="IL" value="972">Israel (+972)</option>\n                                        <option data-countryCode="IT" value="39">Italy (+39)</option>\n                                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>\n                                        <option data-countryCode="JP" value="81">Japan (+81)</option>\n                                        <option data-countryCode="JO" value="962">Jordan (+962)</option>\n                                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>\n                                        <option data-countryCode="KE" value="254">Kenya (+254)</option>\n                                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>\n                                        <option data-countryCode="KP" value="850">Korea North (+850)</option>\n                                        <option data-countryCode="KR" value="82">Korea South (+82)</option>\n                                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>\n                                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>\n                                        <option data-countryCode="LA" value="856">Laos (+856)</option>\n                                        <option data-countryCode="LV" value="371">Latvia (+371)</option>\n                                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>\n                                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>\n                                        <option data-countryCode="LR" value="231">Liberia (+231)</option>\n                                        <option data-countryCode="LY" value="218">Libya (+218)</option>\n                                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>\n                                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>\n                                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>\n                                        <option data-countryCode="MO" value="853">Macao (+853)</option>\n                                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>\n                                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>\n                                        <option data-countryCode="MW" value="265">Malawi (+265)</option>\n                                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>\n                                        <option data-countryCode="MV" value="960">Maldives (+960)</option>\n                                        <option data-countryCode="ML" value="223">Mali (+223)</option>\n                                        <option data-countryCode="MT" value="356">Malta (+356)</option>\n                                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>\n                                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>\n                                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>\n                                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>\n                                        <option data-countryCode="MX" value="52">Mexico (+52)</option>\n                                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>\n                                        <option data-countryCode="MD" value="373">Moldova (+373)</option>\n                                        <option data-countryCode="MC" value="377">Monaco (+377)</option>\n                                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>\n                                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>\n                                        <option data-countryCode="MA" value="212">Morocco (+212)</option>\n                                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>\n                                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>\n                                        <option data-countryCode="NA" value="264">Namibia (+264)</option>\n                                        <option data-countryCode="NR" value="674">Nauru (+674)</option>\n                                        <option data-countryCode="NP" value="977">Nepal (+977)</option>\n                                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>\n                                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>\n                                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>\n                                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>\n                                        <option data-countryCode="NE" value="227">Niger (+227)</option>\n                                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>\n                                        <option data-countryCode="NU" value="683">Niue (+683)</option>\n                                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>\n                                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>\n                                        <option data-countryCode="NO" value="47">Norway (+47)</option>\n                                        <option data-countryCode="OM" value="968">Oman (+968)</option>\n                                        <option data-countryCode="PW" value="680">Palau (+680)</option>\n                                        <option data-countryCode="PA" value="507">Panama (+507)</option>\n                                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>\n                                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>\n                                        <option data-countryCode="PE" value="51">Peru (+51)</option>\n                                        <option data-countryCode="PH" value="63">Philippines (+63)</option>\n                                        <option data-countryCode="PL" value="48">Poland (+48)</option>\n                                        <option data-countryCode="PT" value="351">Portugal (+351)</option>\n                                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>\n                                        <option data-countryCode="QA" value="974">Qatar (+974)</option>\n                                        <option data-countryCode="RE" value="262">Reunion (+262)</option>\n                                        <option data-countryCode="RO" value="40">Romania (+40)</option>\n                                        <option data-countryCode="RU" value="7">Russia (+7)</option>\n                                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>\n                                        <option data-countryCode="SM" value="378">San Marino (+378)</option>\n                                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>\n                                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>\n                                        <option data-countryCode="SN" value="221">Senegal (+221)</option>\n                                        <option data-countryCode="CS" value="381">Serbia (+381)</option>\n                                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>\n                                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>\n                                        <option data-countryCode="SG" value="65">Singapore (+65)</option>\n                                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>\n                                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>\n                                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>\n                                        <option data-countryCode="SO" value="252">Somalia (+252)</option>\n                                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>\n                                        <option data-countryCode="ES" value="34">Spain (+34)</option>\n                                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>\n                                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>\n                                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>\n                                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>\n                                        <option data-countryCode="SD" value="249">Sudan (+249)</option>\n                                        <option data-countryCode="SR" value="597">Suriname (+597)</option>\n                                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>\n                                        <option data-countryCode="SE" value="46">Sweden (+46)</option>\n                                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>\n                                        <option data-countryCode="SI" value="963">Syria (+963)</option>\n                                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>\n                                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>\n                                        <option data-countryCode="TH" value="66">Thailand (+66)</option>\n                                        <option data-countryCode="TG" value="228">Togo (+228)</option>\n                                        <option data-countryCode="TO" value="676">Tonga (+676)</option>\n                                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>\n                                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>\n                                        <option data-countryCode="TR" value="90">Turkey (+90)</option>\n                                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>\n                                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>\n                                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>\n                                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>\n                                        <option data-countryCode="UG" value="256">Uganda (+256)</option>\n                                        <option data-countryCode="GB" value="44">UK (+44)</option>\n                                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>\n                                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>\n                                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>\n                                        <option data-countryCode="US" value="1">USA (+1)</option>\n                                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>\n                                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>\n                                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>\n                                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>\n                                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>\n                                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>\n                                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>\n                                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>\n                                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>\n                                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>\n                                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>\n                                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>\n                                        </select>\n                                        <input type="number" name="SSVphoneNumber" placeholder="Phone Number" autocomplete="off" required>\n                                    </div>\n                                    <button>Register<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                </div>\n                                <div class="SSV-OTP-verification SSV-CTA-modal-inner">\n                                    <label>Verify Yourself <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVregisterOTP(this);">\n                                    <input type="number" name="SSVotp" placeholder="OTP" autocomplete="off" required>\n                                    <button>Verify<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                </div>\n                                <div class="SSV-ask-question SSV-CTA-modal-inner">\n                                    <div>\n                                    <label>Ask Question <span style="font-family: arial;" title="Close">&times;</span></label>\n                                    <p class="SSV-CTA-message"></p>\n                                    <form onsubmit="return SSVaskQuestion(this);">\n                                    <textarea placeholder="Type here" name="SSVaskQue" rows="3" autocomplete="off" required></textarea>\n                                    <button>Send<p class="SSV-CTA-loader"></p></button>\n                                    </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="SSV-popup-video-loader"><p></p></div>\n\n                        <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">\n                        <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">\n                    </div>\n\n                    <div class="SSV-PIP" id="SSV-PIP">\n                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>\n                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);" >\n                            <source src="" type="video/mp4">\n                        </video>\n                        <span class="SSV-PIP-fullscreen"></span>\n                    </div>\n                </div>\n            '
                    );
                    var o = window.location.href.split("?")[0] ? window.location.href.split("?")[0] : window.location.href;
                    o = (o = o.replace("#SWIRL-short-videos", "")).replace("#", "");
                    let e = jQuery("#swirl-short-videos").data("code"),
                        t = jQuery("#swirl-short-videos").data("sw"),
                        a = new URL(o);
                    (store = a.hostname), (store = t ? store : "satyamgandhidev.com");
                    var n = document.createElement("script");
                    (n.rel = "text/javascript"), (n.src = "https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js"), headTag.insertBefore(n, headTag.lastChild), o.substring(o.lastIndexOf("/") + 1);
                    let i = "";
                    (i = "https://shop.goswirl.live/index.php/shopify/videolistingV2?user=" + e),
                        void 0 !== jQuery("#swirl-short-videos").data("byshopify") && (i = "https://store.goswirl.live/shopify-app/swirl_short_videos.php"),
                        void 0 !== jQuery("#swirl-short-videos").data("onpdp") && (i = "https://shop.goswirl.live/index.php/shopify/getmultiple_productvideo?url=" + o),
                        jQuery.ajax({
                            type: "POST",
                            dataType: "json",
                            url: i,
                            data: "store=" + encodeURIComponent(store),
                            success: function (e) {
                                if (
                                    (void 0 === e.swilrs.video &&
                                        localStorage.getItem("SSVallURL") &&
                                        void 0 !== jQuery("#swirl-short-videos").data("onpdp") &&
                                        localStorage.getItem("SSVallURL") &&
                                        localStorage.getItem("SSVlastPlayed") &&
                                        ((e = JSON.parse(localStorage.getItem("SSVallURL"))), $("#SWIRL-short-videos .swiper").css("display", "none")),
                                    void 0 !== e.swilrs.video)
                                ) {
                                    let a = e.swilrs.data;
                                    brandCustomizations = a;
                                    let n = 0,
                                        i = "";
                                    (live_stream_phone = a.live_stream_phone),
                                        (live_stream_phone_otp = a.live_stream_phone_otp),
                                        "0" === live_stream_phone && (jQuery(".phone-and-code").hide(), jQuery('input[name="SSVphoneNumber"]').attr("disabled", "true")),
                                        e.swilrs.video.forEach((o) => {
                                            let e = "";
                                            n++, "1" === a.auto_play && (e = n > 6 ? "" : "loop autoplay"), SSVallURL.push(o.video_url);
                                            let t = o.image ? o.image : "https://goswirl.shop/swirl-embed/assets/default-video-thumbnail.jpg",
                                                d = "",
                                                r = "",
                                                l = '<div class="SSV-product-on-carousel"></div>';
                                            if (Object.keys(o.product).length > 0) {
                                                (d = o.product[0].product_id), (r = o.product[0].url);
                                                let e = Object.keys(o.product).length > 1 ? `<span>${Object.keys(o.product).length}</span>` : "",
                                                    t =
                                                        parseFloat(o.product[0].price) > parseFloat(o.product[0].discount_price)
                                                            ? `<strike>${o.product[0].currencysymbols + " " + o.product[0].price}</strike> ${o.product[0].currencysymbols + " " + o.product[0].discount_price}`
                                                            : o.product[0].currencysymbols + " " + o.product[0].price;
                                                l = `<div class="SSV-product-on-carousel">                                    \n                                        <img src="${o.product[0].image}" alt="Product Thumbnail" />                                        \n                                        ${e}\n                                        <p>${o.product[0].title}</p>\n                                        <label>${t}</label>\n                                    </div>`;
                                            }
                                            (r = r || o.product_link),
                                                (productsAll[o.video_id] = o.product),
                                                (i += `<div class="swiper-slide">\n                                <video poster="${t}" ontimeupdate="updateSSVProgressBar(this);" onloadeddata="updateSSVDurations(this);" playsinline preload="metadata" data-setup="{}" muted ${e} width="100%" height="100%" data-product="${r}" data-title="${o.video_title}" data-cover="${o.image}" data-link="${o.link}" data-vid="${o.video_id}" data-did="${o.designer_id}" data-productid="${d}" data-productlink="${r}" data-gumletassetid="${o.gumletAssetId}" data-totalviews="${o.total_views}">\n                                    <source src="${o.video_url}" type="video/mp4">\n                                </video>\n                                <div class="SSV-play-btn">\n                                    <label></label>\n                                </div>\n                                <div class="SSV-video-progress">\n                                    <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>\n                                </div>\n                                <div class="SSV-video-playing">\n                                    <label>Preview mode</label>\n                                </div>                                \n                                <div class="SSV-video-timer-top">\n                                    <p>00:00</p>                            \n                                </div>\n                                <div class="SSV-video-views-count-top">\n                                    <p><img src="https://goswirl.shop/swirl-embed/assets/views-icon.svg" alt="Views icon" height="" width=""> ${o.total_views}</p>                            \n                                </div>\n                                ${l}\n                            </div>`);
                                        }),
                                        jQuery("#SWIRL-short-videos .swiper-wrapper").html(i),
                                        localStorage.setItem("SSVallURL", JSON.stringify(e)),
                                        localStorage.setItem("SSVshopify", t),
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
                                            let e = $(this).children("video").children("source").attr("src"),
                                                t = $(this).children("video").attr("data-cover");
                                            (SSVCurrentURL = e),
                                                jQuery(".SSV-play-modal video source").attr("src", e),
                                                jQuery(".SSV-play-modal video").attr("poster", t),
                                                jQuery(".SSV-play-modal video").get(0).load(),
                                                "0" === a.auto_play_mute_un
                                                    ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                    : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(e)),
                                                jQuery(".SSV-video-popup-share").hide(),
                                                jQuery(".SSV-CTA-modal-inner").hide(),
                                                jQuery(".close-SSV-PIP").click(),
                                                disableScroll();
                                        });
                                    let d = 0;
                                    jQuery(".close-SSV-modal").click(function () {
                                        (d = jQuery(".SSV-play-modal video").get(0).currentTime),
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
                                            let o = jQuery(".SSV-play-modal video").get(0);
                                            o.paused ? o.play() : o.pause();
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
                                            let e = jQuery(".SSV-play-modal video source").attr("src"),
                                                t = SSVallURL.indexOf(e);
                                            if (void 0 !== SSVallURL[t - 1]) {
                                                SSVCurrentURL = SSVallURL[t - 1];
                                                let e = $(`.swiper-wrapper source[src="${SSVallURL[t - 1]}"]`)
                                                    .parent("video")
                                                    .attr("data-cover");
                                                jQuery(".SSV-play-modal video").attr("poster", e),
                                                    jQuery(".SSV-play-modal video source").attr("src", SSVallURL[t - 1]),
                                                    jQuery(".SSV-play-modal video").get(0).load(),
                                                    "0" === a.auto_play_mute_un
                                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                    jQuery(".SSV-video-popup-share").hide(),
                                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[t - 1]));
                                            }
                                        }),
                                        jQuery(".SSV-modal-right").click(function () {
                                            let e = jQuery(".SSV-play-modal video source").attr("src"),
                                                t = SSVallURL.indexOf(e);
                                            if (void 0 !== SSVallURL[t + 1]) {
                                                SSVCurrentURL = SSVallURL[t + 1];
                                                let e = $(`.swiper-wrapper source[src="${SSVallURL[t + 1]}"]`)
                                                    .parent("video")
                                                    .attr("data-cover");
                                                jQuery(".SSV-play-modal video").attr("poster", e),
                                                    jQuery(".SSV-play-modal video source").attr("src", SSVallURL[t + 1]),
                                                    jQuery(".SSV-play-modal video").get(0).load(),
                                                    "0" === a.auto_play_mute_un
                                                        ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                        : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                    ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                    jQuery(".SSV-video-popup-share").hide(),
                                                    jQuery(".SSV-CTA-modal-inner").hide(),
                                                    jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[t + 1]));
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
                                            let o = $(this).attr("data-sharelink");
                                            window.open("https://www.facebook.com/sharer/sharer.php?u=" + o, "_blank");
                                        }),
                                        jQuery(".SSV-twitter").click(function () {
                                            let o = $(this).attr("data-sharelink");
                                            window.open("https://twitter.com/share?url=" + o, "_blank");
                                        }),
                                        jQuery(".SSV-whatsapp").click(function () {
                                            let o = $(this).attr("data-sharelink");
                                            window.open("whatsapp://send?text=" + o);
                                        }),
                                        jQuery(".SSV-copy").click(function () {
                                            let o = $(this).attr("data-sharelink");
                                            jQuery(".SSV-copylink-input").val(o), jQuery(".SSV-copylink-input").click(), jQuery(".SSV-video-popup-share span").fadeIn().delay(3e3).fadeOut();
                                        });
                                    const r = new URLSearchParams(window.location.search),
                                        l = Object.fromEntries(r.entries());
                                    if (void 0 !== l.ssv) {
                                        jQuery(".SSV-play-modal").show();
                                        let e = l.ssv;
                                        (SSVCurrentURL = window.atob(e)),
                                            jQuery(".SSV-play-modal video source").attr("src", window.atob(e)),
                                            jQuery(".SSV-play-modal video").get(0).load(),
                                            jQuery(".SSV-play-modal video").prop("muted", !0),
                                            ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                            jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"),
                                            jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + e),
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
                                        jQuery(".SSV-play-modal-askaque").click(function () {
                                            jQuery(".SSV-CTA-modal-inner").hide(), jQuery(".SSV-ask-question").show();
                                        }),
                                        jQuery(".SSV-play-modal-addtocart").click(function () {
                                            let o = $(this),
                                                e = $(this).attr("data-action"),
                                                t = $(this).attr("data-pid"),
                                                a = $(this).attr("data-link");
                                            "2" == e
                                                ? ("1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click(), SSVCTAClicksTrack(t, "1"), (window.location = a))
                                                : "1" == e
                                                ? (SSVaddToCart(a, o), SSVCTAClicksTrack(t, "2"))
                                                : "3" == e && (window.location = "https://" + store + "/cart");
                                        }),
                                        $(document).keydown(function (o) {
                                            jQuery(".SSV-play-modal").is(":visible") &&
                                                (37 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                    ? 39 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible")
                                                        ? "Escape" === o.key &&
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
                                            (d = jQuery(".SSV-play-modal video").get(0).currentTime),
                                                SSVpauseAll(),
                                                jQuery(".SSV-play-modal video").get(0).pause(),
                                                jQuery(".SSV-play-modal").hide(),
                                                jQuery(".SSV-video-playing").hide(),
                                                jQuery(".SSV-PIP video source").attr("src", jQuery(".SSV-play-modal video source").attr("src")),
                                                jQuery(".SSV-PIP video").get(0).load(),
                                                (jQuery(".SSV-PIP video").get(0).currentTime = d),
                                                ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                                jQuery(".SSV-PIP").show(),
                                                enableScroll();
                                        }),
                                        jQuery(".SSV-PIP-fullscreen").click(function () {
                                            let e = jQuery(".SSV-PIP video source").attr("src");
                                            (SSVCurrentURL = e),
                                                jQuery(".SSV-play-modal video source").attr("src", e),
                                                jQuery(".SSV-play-modal video").get(0).load(),
                                                "0" === a.auto_play_mute_un
                                                    ? (jQuery(".SSV-play-modal video").prop("muted", !0), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/mute.svg"))
                                                    : (jQuery(".SSV-play-modal video").prop("muted", !1), jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://goswirl.shop/swirl-embed/assets/unmute.svg")),
                                                ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                                jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(e)),
                                                jQuery(".SSV-video-popup-share").hide(),
                                                jQuery(".SSV-CTA-modal-inner").hide(),
                                                jQuery(".SSV-PIP video").get(0).pause(),
                                                jQuery(".SSV-PIP").hide(),
                                                jQuery(".SSV-play-modal").show(),
                                                disableScroll();
                                        }),
                                        "1" === a.powered_by ? jQuery(".SSV-video-popup-brand-info-powered").show() : jQuery(".SSV-video-popup-brand-info-powered").hide(),
                                        $(document).on("click touch", function (o) {
                                            jQuery(".SSV-video-popup-brand-info").is(":visible")
                                                ? ($(o.target).is(".SSV-play-modal") || $(o.target).is(".SSV-play-modal-video-container video")) && jQuery(".SSV-video-popup-brand-info label").click()
                                                : jQuery(".SSV-play-modal").is(":visible") && $(o.target).is(".SSV-play-modal") && "1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click();
                                        }),
                                        (window.onpopstate = function (o) {
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
                                        a.user_profile
                                            ? (jQuery(".SSV-video-popup-brand-info-brand-logo").attr("src", a.user_profile), jQuery(".SSV-video-popup-brand-info-brand-logo").show())
                                            : jQuery(".SSV-video-popup-brand-info-brand-logo").hide(),
                                        jQuery(".SSV-video-popup-brand-info-brand-name").html(a.designer_brand_name),
                                        a.designer_bio
                                            ? (jQuery(".SSV-video-popup-brand-info-brand-description").html(a.designer_bio),
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
                                        jQuery(".SSV-play-modal video").on("loadstart", function (o) {
                                            jQuery(".SSV-play-modal-video-container").addClass("SSV-popup-video-blur-load");
                                        }),
                                        jQuery(".SSV-play-modal video").on("canplay", function (o) {
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
                clearInterval(a));
        }, 1e3);
    }
})();
var keys = { 38: 1, 40: 1 };
function preventDefault(o) {
    o.preventDefault();
}
function preventDefaultForScrollKeys(o) {
    if (keys[o.keyCode]) return preventDefault(o), !1;
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
} catch (o) {}
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
        allOverElements.forEach((o) => {
            jQuery(o).show();
        }),
        allOverElementsSticky.forEach((o) => {
            jQuery(o).show();
        });
}
let userName = "",
    userCode = "",
    userMobile = "",
    generatedOTP = "";
function SSVsendOTP(o) {
    if ("1" === live_stream_phone && "1" === live_stream_phone_otp) {
        let e = $(o).serializeArray(),
            t = e[0].value;
        userName = t;
        let a = e[1].value;
        userCode = a;
        let n = e[2].value;
        (userMobile = n),
            jQuery.ajax({
                type: "POST",
                dataType: "json",
                url: "https://shop.goswirl.live/index.php/Shopify/otp",
                data: "code=" + encodeURIComponent(a) + "&mobile=" + encodeURIComponent(n),
                beforeSend: function () {
                    jQuery(".SSV-CTA-loader").show();
                },
                success: function (o) {
                    1 == o.success ? ((generatedOTP = o.data), jQuery(".SSV-CTA-modal-inner").hide(), jQuery(".SSV-OTP-verification").show()) : jQuery(".SSV-OTP-send button").click();
                },
                error: function (o, e) {
                    alert("Something went wrong! Please try again later.");
                },
                complete: function () {
                    jQuery(".SSV-CTA-loader").hide();
                },
            });
    } else if ("1" === live_stream_phone) {
        let e = $(o).serializeArray(),
            t = e[0].value;
        userName = t;
        let a = e[2].value;
        (userMobile = a), jQuery(".SSV-OTP-verification form").submit();
    } else {
        let e = $(o).serializeArray()[0].value;
        (userName = e), jQuery(".SSV-OTP-verification form").submit();
    }
    return !1;
}
function SSVregisterOTP(o) {
    return (
        $(o).serializeArray()[0].value == generatedOTP || "0" === live_stream_phone_otp
            ? jQuery.ajax({
                  type: "POST",
                  dataType: "json",
                  url: "https://shop.goswirl.live/index.php/Shopify/user_register",
                  data: "name=" + encodeURIComponent(userName) + "&code=" + encodeURIComponent(userCode) + "&mobile=" + encodeURIComponent(userMobile),
                  beforeSend: function () {
                      jQuery(".SSV-CTA-loader").show();
                  },
                  success: function (o) {
                      1 == o.success
                          ? (localStorage.setItem("SWIRLVerifiedUser", JSON.stringify(o.data)), (isVerified = !0), (SWIRLuser = o.data), jQuery(".SSV-OTP-verification input").val(""), jQuery(".SSV-ask-question button").click())
                          : jQuery(".SSV-OTP-verification button").click();
                  },
                  error: function (o, e) {
                      alert("Something went wrong! Please try again later.");
                  },
                  complete: function () {
                      jQuery(".SSV-CTA-loader").hide();
                  },
              })
            : (jQuery(".SSV-CTA-message").css("color", "#bb2124"), jQuery(".SSV-CTA-message").html("Incorrect OTP!").fadeIn().delay(2e3).fadeOut()),
        !1
    );
}
function SSVaskQuestion(o) {
    let e = $(o).serializeArray()[0].value;
    if (SWIRLuser) {
        let o = SWIRLuser.user_id,
            t = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-did"),
            a = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-vid");
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://store.goswirl.live/index.php/Shopify/askque",
            data: "user_id=" + encodeURIComponent(o) + "&designer_id=" + encodeURIComponent(t) + "&msg=" + encodeURIComponent(e) + "&swirls_id=" + encodeURIComponent(a),
            beforeSend: function () {
                jQuery(".SSV-CTA-loader").show();
            },
            success: function (o) {
                1 == o.success
                    ? (jQuery(".SSV-CTA-message").css("color", "#22bb33"),
                      jQuery(".SSV-CTA-message").html("Your query is submitted. Thank you!").fadeIn().delay(2500).fadeOut(),
                      jQuery(".SSV-ask-question textarea").val(""),
                      setTimeout(() => {
                          jQuery(".SSV-CTA-modal-inner").hide(), jQuery(".SSV-ask-question").hide();
                      }, 3e3))
                    : jQuery(".SSV-ask-question button").click();
            },
            error: function (o, e) {
                alert("Something went wrong! Please try again later.");
            },
            complete: function () {
                jQuery(".SSV-CTA-loader").hide();
            },
        });
    } else jQuery(".SSV-CTA-modal-inner").hide(), jQuery(".SSV-OTP-send").show();
    return !1;
}
function SSVaddToCart(o, e) {
    var t = o.split("?")[0] ? o.split("?")[0] : o,
        a = t.substring(t.lastIndexOf("/") + 1),
        n = "";
    jQuery.ajax({ url: "/products/" + a + ".js", dataType: "json" }).done(function (t) {
        if (t) {
            (n = t.variants[0].id), $(e).html("Adding...");
            var a = !1;
            jQuery.ajax({ url: "/cart.js", dataType: "json" }).done(function (t) {
                for (var i = 0; i < t.items.length; i++) t.items[i].id == n && (a = !0);
                if (0 == a)
                    jQuery.ajax({ type: "POST", url: "/cart/add.js", dataType: "json", data: { items: [{ id: n, quantity: 1 }] } }).done(function (t) {
                        $(e).html("View Cart"), $(e).attr("data-action", "3"), addedtoCart.push(o);
                        const a = new Event("SwirlAddtoCart");
                        document.getElementById("swirl-short-videos").dispatchEvent(a);
                    });
                else {
                    $(e).html("View Cart"), $(e).attr("data-action", "3"), addedtoCart.push(o);
                    const t = new Event("SwirlAddtoCart");
                    document.getElementById("swirl-short-videos").dispatchEvent(t);
                }
            });
        } else $(e).html("Failed").delay(3e3).html("Add to Cart");
    });
}
var xDown = null,
    yDown = null;
function getTouches(o) {
    return o.touches || o.originalEvent.touches;
}
function handleTouchStart(o) {
    const e = getTouches(o)[0];
    (xDown = e.clientX), (yDown = e.clientY);
}
function handleTouchMove(o) {
    if (xDown && yDown) {
        var e = o.touches[0].clientX,
            t = o.touches[0].clientY,
            a = xDown - e,
            n = yDown - t;
        Math.abs(a) > Math.abs(n) && (a > 0 ? jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-right").click() : jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-left").click()), (xDown = null), (yDown = null);
    }
}
function SSVsetPopupHight() {
    let o = window.innerHeight;
    jQuery(".SSV-play-modal").height(o);
}
function SSVCTAClicksTrack(o, e) {
    let t = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-vid"),
        a = $(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-did"),
        n = o,
        i = e,
        d = SWIRLuser ? SWIRLuser.user_id : "";
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://shop.goswirl.live/index.php/shopify/actionbuttons",
        data: "designer_id=" + encodeURIComponent(a) + "&product_id=" + encodeURIComponent(n) + "&user_id=" + encodeURIComponent(d) + "&video_id=" + encodeURIComponent(t) + "&type=" + encodeURIComponent(i),
        beforeSend: function () {},
        success: function (o) {},
        error: function (o, e) {},
        complete: function () {},
    });
}
window.onresize = SSVsetPopupHight;
let gumletVideoCountCall = 0;
function gumletVideoCount() {
    if ((gumletVideoCountCall++, null != jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-gumletassetid") && gumletVideoCountCall > 1)) {
        var o = document.getElementById("gumlet-video-count");
        gumlet.insights({ property_id: "jYfkUIVL" }).register(o),
            (vid = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent("video").attr("data-vid")),
            jQuery.ajax({ type: "POST", dataType: "json", url: "https://api.goswirl.live/index.php/BrandController/getShortVideoAnalytics", data: "vid=" + encodeURIComponent(vid), success: function (o) {} });
    }
}

function demo(){
    
}
