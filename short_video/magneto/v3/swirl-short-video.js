let productsAll = []
  , addedtoCart = []
  , globalMute = !0
  , brandCustomizations = []
  , SSVallURL = []
  , SSVCurrentURL = ""
  , isVerified = !1
  , SWIRLuser = null;
localStorage.getItem("SWIRLVerifiedUser") && (isVerified = !0,
SWIRLuser = JSON.parse(localStorage.getItem("SWIRLVerifiedUser")));
let live_stream_phone = "0"
  , live_stream_phone_otp = "0"
  , SSVvideosAll = ""
  , store = "satyamgandhidev.com";
var headTag = document.getElementsByTagName("head")[0];
const urlSearchParams = new URLSearchParams(window.location.search)
  , params = Object.fromEntries(urlSearchParams.entries());
function secondsToHms(e) {
    e = Number(e),
    Math.floor(e / 3600);
    var t = Math.floor(e % 3600 / 60)
      , o = Math.floor(e % 3600 % 60);
    return String(t).padStart(2, "0") + ":" + String(o).padStart(2, "0")
}
function ssvPlayWithPromise(e) {
    var t = e.play();
    void 0 !== t && t.then((e=>{}
    )).catch((e=>{}
    ))
}
function updateSSVDurations(e) {
    var t = String(Math.floor(parseInt(e.duration / 60, 10))).padStart(2, "0")
      , o = String(Math.floor(e.duration % 60)).padStart(2, "0");
    jQuery(e).parent(".swiper-slide").children(".SSV-video-timer-top").children("p").html(t + ":" + o)
}
function updateSSVProgressBar(e) {
    var t = Math.floor(100 / e.duration * e.currentTime);
    jQuery(e).parent(".swiper-slide").children(".SSV-video-progress").children(".SSV-video-progress-inner").css("width", t + "%")
}
function SSVpauseAll(e="") {
    if (jQuery("#SSV-short-videos .swiper-slide video").each((function() {
        jQuery(this).get(0).pause()
    }
    )),
    e) {
        var t = e.get(0).play();
        void 0 !== t && t.then((e=>{}
        )).catch((e=>{}
        ))
    }
}
function updateSSVModalProgressBar(e) {
    var t = Math.floor(100 / e.duration * e.currentTime);
    jQuery(e).parent(".SSV-play-modal-video-container").children(".SSV-video-popup-progress").children(".SSV-video-popup-progress-inner").css("width", t + "%")
}
function updateSSVModalInfos(e) {
    this.SSVsetPopupHight(),
    jQuery(".SSV-play-modal-buynow-on").html(brandCustomizations.buy_btn),
    jQuery(".SSV-pm-buy-now").html(brandCustomizations.buy_btn),
    jQuery(".SSV-pmm-buy-now").html(brandCustomizations.buy_btn),
    jQuery(".SSV-pm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
    jQuery(".SSV-pmm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
    jQuery(".SSV-play-modal-addtocart").css("border-color", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-play-modal-buynow-on").css("background", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-pm-buy-now").css("background", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-pmm-buy-now").css("background", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-play-modal-buynow-on")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-pm-buy-now")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-pmm-buy-now")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-pm-add-to-cart").css("border-color", brandCustomizations.bk_color_add_to_cart_btn),
    jQuery(".SSV-pmm-add-to-cart").css("border-color", brandCustomizations.bk_color_add_to_cart_btn),
    jQuery(".SSV-pm-add-to-cart")[0].style.setProperty("color", brandCustomizations.front_color_add_to_cart_btn, "important"),
    jQuery(".SSV-pmm-add-to-cart")[0].style.setProperty("color", brandCustomizations.front_color_add_to_cart_btn, "important"),
    jQuery(".SSV-pm-add-to-cart")[0].style.setProperty("background", "transparent", "important"),
    jQuery(".SSV-pmm-add-to-cart")[0].style.setProperty("background", "transparent", "important"),
    jQuery(".SSV-CTA-modal-inner label").css("background", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-CTA-modal-inner label")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-CTA-modal-inner button").css("background", brandCustomizations.bk_color_buy_btn),
    jQuery(".SSV-CTA-modal-inner button")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-video-popup-product-multi .counter")[0].style.setProperty("background", brandCustomizations.bk_color_buy_btn, "important"),
    jQuery(".SSV-video-popup-product-multi .counter")[0].style.setProperty("color", brandCustomizations.front_color_buy_btn, "important"),
    jQuery(".SSV-video-popup-product-multi img")[0].style.setProperty("border-color", brandCustomizations.bk_color_buy_btn, "important"),
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
    let t = jQuery(e).children("source").attr("src")
      , o = jQuery(`.swiper-wrapper video[data-videourl="${t}"]`).attr("data-title");
    jQuery(e).parent(".SSV-play-modal-video-container").children(".SSV-video-popup-title").html(o),
    jQuery(e).removeClass("SSV-landscape-video"),
    "1" === jQuery(`.swiper-wrapper video[data-videourl="${t}"]`).attr("data-landscape") && jQuery(e).addClass("SSV-landscape-video");
    // let productsAll = [];
    let r = jQuery(`.swiper-wrapper video[data-videourl="${t}"]`).attr("data-vid")
      , i = productsAll[r];
    if (Object.keys(i).length > 0)
        if (1 === Object.keys(i).length) {
            let e = i[0];
            e.desription = e.desription.trim();
            let t = parseFloat(e.price) > parseFloat(e.discount_price) ? `${e.currencysymbols + "" + e.discount_price} <strike style="color: #727272; margin-left: 10px;">${e.currencysymbols + "" + e.price}</strike>` : e.currencysymbols + " " + e.price;
            if (jQuery(".SSV-video-popup-product p").html(e.title),
            jQuery(".SSV-video-popup-product label").html(t),
            jQuery(".SSV-video-popup-product img").attr("src", e.image),
            setTimeout((()=>{
                jQuery(".SSV-video-popup-product").show()
            }
            ), 100),
            jQuery(".SSV-video-product-open p").html(e.title),
            e.desription) {
                let t = e.desription.length > 200 ? '<h6 style="text-align: left; margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + e.desription.substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See more</a></h6><h6 style="text-align: left; margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + e.desription + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See less</a></h6>' : e.desription;
                jQuery(".SSV-video-product-open section").html(t),
                jQuery(".SSV-video-product-open section").show(),
                jQuery(".SSV-video-product-open span").show()
            } else
                jQuery(".SSV-video-product-open section").hide(),
                jQuery(".SSV-video-product-open span").hide();
            t = parseFloat(e.price) > parseFloat(e.discount_price) ? `${e.currencysymbols + "" + e.discount_price} <strike style="color: #bfbfbf; margin-left: 10px;">${e.currencysymbols + "" + e.price}</strike>` : e.currencysymbols + " " + e.price,
            jQuery(".SSV-video-product-open label").html(t),
            jQuery(".SSV-video-product-open img").attr("src", e.image),
            "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-product-open").show(),
            jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover"));
            let o = e.url;
            o ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", o),
            jQuery(".SSV-play-modal-addtocart").attr("data-pid", e.product_id),
            addedtoCart.includes(o) ? (jQuery(".SSV-pm-add-to-cart").html("View Cart"),
            jQuery(".SSV-pm-add-to-cart").attr("data-action", "3")) : (jQuery(".SSV-pm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
            jQuery(".SSV-pm-add-to-cart").attr("data-action", "1")),
            o.search(store) >= 0 ? jQuery(".SSV-pm-add-to-cart").show() : jQuery(".SSV-pm-add-to-cart").hide()) : jQuery(".SSV-play-modal-addtocart").hide()
        } else {
            jQuery(".SSV-video-popup-product-multi img").attr("src", i[0].image),
            jQuery(".SSV-video-popup-product-multi .counter").html(i.length);
            let e = "";
            i.forEach((t=>{
                let o = parseFloat(t.price) > parseFloat(t.discount_price) ? `${t.currencysymbols + "" + t.discount_price} <strike style="color: #bfbfbf; margin-left: 10px;">${t.currencysymbols + "" + t.price}</strike>` : t.currencysymbols + " " + t.price;
                e += `\n                    <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">\n                        <img src="${t.image}" alt="Product Image" height="" width="">\n                        <div>\n                            <p data-pid="${t.product_id}" data-desc="${t.desription.replace('"', "").replace("<", "").replace(">", "")}">${t.title}</p>\n                            <label data-link="${t.url}">${o}</label>\n                        </div>\n                    </div>\n                `
            }
            )),
            jQuery(".SSV-video-popup-product-list-multi-append").html(e),
            setTimeout((()=>{
                jQuery(".SSV-video-popup-product-multi").show()
            }
            ), 100)
        }
    else {
        let e = jQuery(`.swiper-wrapper video[data-videourl="${t}"]`).attr("data-productlink");
        e && (jQuery(".SSV-play-modal-buynow-on").show(),
        jQuery(".SSV-play-modal-buynow-on").attr("data-link", e)),
        jQuery(".SSV-video-popup-product").hide(),
        jQuery(".SSV-video-product-open").hide(),
        jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover")
    }
    let a = jQuery(`.swiper-wrapper video[data-videourl="${t}"]`).attr("data-buynow");
    "" != a && "null" !== a && (jQuery(".SSV-play-modal-buynow-on").html(a),
    jQuery(".SSV-pm-buy-now").html(a),
    jQuery(".SSV-pmm-buy-now").html(a));
    let n = SSVallURL.indexOf(t);
    jQuery(".SSV-modal-left").show(),
    jQuery(".SSV-modal-right").show(),
    void 0 === SSVallURL[n + 1] && jQuery(".SSV-modal-right").hide(),
    void 0 === SSVallURL[n - 1] && jQuery(".SSV-modal-left").hide(),
    console.log(globalMute);
    1 == globalMute ? (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg"),
    jQuery(".SSV-play-modal video").prop("muted", globalMute)) : (jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg"),
    jQuery(".SSV-play-modal video").prop("muted", globalMute)),
    "1" === brandCustomizations.pip_mode && localStorage.setItem("SSVlastPlayed", t),
    brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(),
    jQuery(".SSV-pmm-add-to-cart").hide()),
    brandCustomizations.product_price_status ? (jQuery(".SSV-video-popup-product label").show(),
    jQuery(".SSV-video-product-open label").show(),
    jQuery(".SSV-video-popup-product-list-multi-product-detail label").show(),
    jQuery(".SSV-video-popup-product-item-multi label").show()) : (jQuery(".SSV-video-popup-product label").hide(),
    jQuery(".SSV-video-product-open label").hide(),
    jQuery(".SSV-video-popup-product-list-multi-product-detail label").hide(),
    jQuery(".SSV-video-popup-product-item-multi label").hide()),
    brandCustomizations.ask_question || jQuery(".SSV-play-modal-askaque").hide()
}
function openMultiProductDetail(e) {
    jQuery(".SSV-video-popup-product-list-multi-product-detail p").html(jQuery(e).find("p").html());
    let t = jQuery(e).find("p").attr("data-desc");
    if (t) {
        let e = t.length > 200 ? '<h6 style="text-align: left; margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + t.substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See more</a></h6><h6 style="text-align: left; margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + t + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See less</a></h6>' : t;
        jQuery(".SSV-video-popup-product-list-multi-product-detail section").html(e),
        jQuery(".SSV-video-popup-product-list-multi-product-detail section").show(),
        jQuery(".SSV-video-popup-product-list-multi-product-detail span").show()
    } else
        jQuery(".SSV-video-popup-product-list-multi-product-detail section").hide(),
        jQuery(".SSV-video-popup-product-list-multi-product-detail span").hide();
    jQuery(".SSV-video-popup-product-list-multi-product-detail label").html(jQuery(e).find("label").html()),
    jQuery(".SSV-video-popup-product-list-multi-product-detail img").attr("src", jQuery(e).find("img").attr("src")),
    "1" === brandCustomizations.auto_show_cta_btn && (jQuery(".SSV-video-popup-product-list-multi").show(),
    jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover"));
    let o = jQuery(e).find("label").attr("data-link");
    o ? (jQuery(".SSV-play-modal-addtocart").attr("data-link", o),
    jQuery(".SSV-play-modal-addtocart").attr("data-pid", jQuery(e).find("p").attr("data-pid")),
    addedtoCart.includes(o) ? (jQuery(".SSV-pmm-add-to-cart").html("View Cart"),
    jQuery(".SSV-pmm-add-to-cart").attr("data-action", "3")) : (jQuery(".SSV-pmm-add-to-cart").html(brandCustomizations.add_to_cart_btn),
    jQuery(".SSV-pmm-add-to-cart").attr("data-action", "1")),
    o.search(store) >= 0 ? jQuery(".SSV-pmm-add-to-cart").show() : jQuery(".SSV-pmm-add-to-cart").hide()) : jQuery(".SSV-play-modal-addtocart").hide(),
    jQuery(".SSV-video-popup-product-list-multi-append").hide(),
    jQuery(".SSV-video-popup-product-list-multi-product-detail").show(),
    brandCustomizations.add_to_cart_btn || (jQuery(".SSV-pm-add-to-cart").hide(),
    jQuery(".SSV-pmm-add-to-cart").hide())
}
function updateSSVPIPInfos(e) {
    let t = jQuery(e).children("source").attr("src");
    "1" === brandCustomizations.pip_mode && localStorage.setItem("SSVlastPlayed", t)
}
function dragElement(e) {
    var t = 0
      , o = 0
      , r = 0
      , i = 0;
    function a(e) {
        (e = e || window.event).preventDefault(),
        r = e.clientX,
        i = e.clientY,
        document.onmouseup = d,
        document.onmousemove = n
    }
    function n(a) {
        (a = a || window.event).preventDefault(),
        t = r - a.clientX,
        o = i - a.clientY,
        r = a.clientX,
        i = a.clientY,
        e.style.top = e.offsetTop - o + "px",
        e.style.left = e.offsetLeft - t + "px"
    }
    function d() {
        document.onmouseup = null,
        document.onmousemove = null
    }
    document.getElementById(e.id + "header") ? document.getElementById(e.id + "header").onmousedown = a : e.onmousedown = a
}
function SSVcopyLink(e) {
    var t = e;
    t.select(),
    t.setSelectionRange(0, 99999),
    navigator.clipboard.writeText(t.value)
}
var keys = {
    38: 1,
    40: 1
};
function preventDefault(e) {
    e.preventDefault()
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode])
        return preventDefault(e),
        !1
}
var supportsPassive = !1;
try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function() {
            supportsPassive = !0
        }
    }))
} catch (e) {}
var wheelOpt = !!supportsPassive && {
    passive: !1
}
  , wheelEvent = "onwheel"in document.createElement("div") ? "wheel" : "mousewheel";
let allOverElements = []
  , allOverElementsSticky = [];
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, !1),
    window.addEventListener(wheelEvent, preventDefault, wheelOpt),
    window.addEventListener("touchmove", preventDefault, wheelOpt),
    window.addEventListener("keydown", preventDefaultForScrollKeys, !1),
    allOverElements = [],
    allOverElementsSticky = [],
    jQuery("*").each((function() {
        "fixed" == jQuery(this).css("position") && jQuery(this).is(":visible") && (jQuery(this).is(".SSV-play-modal") || jQuery(this).is(".SSV-PIP") || (jQuery(this).hide(),
        allOverElements.push(jQuery(this)))),
        "sticky" == jQuery(this).css("position") && jQuery(this).is(":visible") && (jQuery(this).is(".SSV-play-modal") || jQuery(this).is(".SSV-PIP") || (jQuery(this).hide(),
        allOverElements.push(jQuery(this))))
    }
    ))
}
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, !1),
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt),
    window.removeEventListener("touchmove", preventDefault, wheelOpt),
    window.removeEventListener("keydown", preventDefaultForScrollKeys, !1),
    allOverElements.forEach((e=>{
        jQuery(e).show()
    }
    )),
    allOverElementsSticky.forEach((e=>{
        jQuery(e).show()
    }
    ))
}
let userName = ""
  , userCode = ""
  , userMobile = ""
  , generatedOTP = ""
  , userEmail = ""
  , userIncome = "";
function SSVsendOTP(e) {
    let t = jQuery(e).serializeArray();
    if (userEmail = 1 === brandCustomizations.email ? t[3].value : "",
    userIncome = 1 === brandCustomizations.dropdown ? t[4].value : "",
    "1" === live_stream_phone && "1" === live_stream_phone_otp) {
        let e = t[0].value;
        userName = e;
        let o = t[1].value;
        userCode = o;
        let r = t[2].value;
        userMobile = r,
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/Shopify/otp",
            data: "code=" + encodeURIComponent(o) + "&mobile=" + encodeURIComponent(r),
            beforeSend: function() {
                jQuery(".SSV-CTA-loader").show()
            },
            success: function(e) {
                1 == e.success ? (generatedOTP = e.data,
                jQuery(".SSV-CTA-modal-inner").hide(),
                jQuery(".SSV-OTP-verification").show()) : jQuery(".SSV-OTP-send button").click()
            },
            error: function(e, t) {
                alert("Something went wrong! Please try again later.")
            },
            complete: function() {
                jQuery(".SSV-CTA-loader").hide()
            }
        })
    } else if ("1" === live_stream_phone) {
        let e = t[0].value;
        userName = e;
        let o = t[2].value;
        userMobile = o,
        jQuery(".SSV-OTP-verification form").submit()
    } else {
        let e = t[0].value;
        userName = e,
        jQuery(".SSV-OTP-verification form").submit()
    }
    return !1
}
function SSVregisterOTP(e) {
    return jQuery(e).serializeArray()[0].value == generatedOTP || "0" === live_stream_phone_otp ? jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.goswirl.live/index.php/Shopify/user_register",
        data: "name=" + encodeURIComponent(userName) + "&code=" + encodeURIComponent(userCode) + "&mobile=" + encodeURIComponent(userMobile),
        beforeSend: function() {
            jQuery(".SSV-CTA-loader").show()
        },
        success: function(e) {
            1 == e.success ? (localStorage.setItem("SWIRLVerifiedUser", JSON.stringify(e.data)),
            isVerified = !0,
            SWIRLuser = e.data,
            jQuery(".SSV-OTP-verification input").val(""),
            jQuery(".SSV-ask-question button").click()) : jQuery(".SSV-OTP-verification button").click()
        },
        error: function(e, t) {
            alert("Something went wrong! Please try again later.")
        },
        complete: function() {
            jQuery(".SSV-CTA-loader").hide()
        }
    }) : (jQuery(".SSV-CTA-message").css("color", "#bb2124"),
    jQuery(".SSV-CTA-message").html("Incorrect OTP!").fadeIn().delay(2e3).fadeOut()),
    !1
}
function SSVaskQuestion(e) {
    let t = jQuery(e).serializeArray()[0].value;
    if (SWIRLuser) {
        let e = SWIRLuser.user_id
          , o = jQuery(`.swiper-wrapper video[data-videourl="${SSVCurrentURL}"]`).attr("data-did")
          , r = jQuery(`.swiper-wrapper video[data-videourl="${SSVCurrentURL}"]`).attr("data-vid");
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/Shopify/askque",
            data: "user_id=" + encodeURIComponent(e) + "&designer_id=" + encodeURIComponent(o) + "&msg=" + encodeURIComponent(t) + "&swirls_id=" + encodeURIComponent(r),
            beforeSend: function() {
                jQuery(".SSV-CTA-loader").show()
            },
            success: function(e) {
                1 == e.success ? (jQuery(".SSV-CTA-message").css("color", "#22bb33"),
                jQuery(".SSV-CTA-message").html("Your query is submitted. Thank you!").fadeIn().delay(2500).fadeOut(),
                jQuery(".SSV-ask-question textarea").val(""),
                setTimeout((()=>{
                    jQuery(".SSV-CTA-modal-inner").hide(),
                    jQuery(".SSV-ask-question").hide()
                }
                ), 3e3)) : jQuery(".SSV-ask-question button").click()
            },
            error: function(e, t) {
                alert("Something went wrong! Please try again later.")
            },
            complete: function() {
                jQuery(".SSV-CTA-loader").hide()
            }
        })
    } else
        jQuery(".SSV-CTA-modal-inner").hide(),
        jQuery(".SSV-OTP-send").show();
    return !1
}
function SSVaddToCart(e, t) {
    var o = e.split("?")[0] ? e.split("?")[0] : e
      , r = o.substring(o.lastIndexOf("/") + 1)
      , i = "";
    jQuery.ajax({
        url: "/products/" + r + ".js",
        dataType: "json"
    }).done((function(o) {
        if (o) {
            i = o.variants[0].id,
            jQuery(t).html("Adding...");
            var r = !1;
            jQuery.ajax({
                url: "/cart.js",
                dataType: "json"
            }).done((function(o) {
                for (var a = 0; a < o.items.length; a++)
                    o.items[a].id == i && (r = !0);
                if (0 == r)
                    jQuery.ajax({
                        type: "POST",
                        url: "/cart/add.js",
                        dataType: "json",
                        data: {
                            items: [{
                                id: i,
                                quantity: 1
                            }]
                        }
                    }).done((function(o) {
                        jQuery(t).html("View Cart"),
                        jQuery(t).attr("data-action", "3"),
                        addedtoCart.push(e);
                        const r = new Event("SwirlAddtoCart");
                        document.getElementById("swirl-short-videos").dispatchEvent(r)
                    }
                    ));
                else {
                    jQuery(t).html("View Cart"),
                    jQuery(t).attr("data-action", "3"),
                    addedtoCart.push(e);
                    const o = new Event("SwirlAddtoCart");
                    document.getElementById("swirl-short-videos").dispatchEvent(o)
                }
            }
            ))
        } else
            jQuery(t).html("Failed").delay(3e3).html(brandCustomizations.add_to_cart_btn)
    }
    ))
}
var xDown = null
  , yDown = null;
function getTouches(e) {
    return e.touches || e.originalEvent.touches
}
function handleTouchStart(e) {
    const t = getTouches(e)[0];
    xDown = t.clientX,
    yDown = t.clientY
}
function handleTouchMove(e) {
    if (xDown && yDown) {
        var t = e.touches[0].clientX
          , o = e.touches[0].clientY
          , r = xDown - t
          , i = yDown - o;
        Math.abs(r) > Math.abs(i) && (r > 0 ? jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-right").click() : jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-modal-left").click()),
        xDown = null,
        yDown = null
    }
}
function SSVsetPopupHight() {
    let e = window.innerHeight;
    jQuery(".SSV-play-modal").height(e)
}
function SSVCTAClicksTrack(e, t) {
    let o = jQuery(`.swiper-wrapper video[data-videourl="${SSVCurrentURL}"]`).attr("data-vid")
      , r = jQuery(`.swiper-wrapper video[data-videourl="${SSVCurrentURL}"]`).attr("data-did")
      , i = e
      , a = t
      , n = SWIRLuser ? SWIRLuser.user_id : "";
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.goswirl.live/index.php/shopify/actionbuttons",
        data: "designer_id=" + encodeURIComponent(r) + "&product_id=" + encodeURIComponent(i) + "&user_id=" + encodeURIComponent(n) + "&video_id=" + encodeURIComponent(o) + "&type=" + encodeURIComponent(a),
        beforeSend: function() {},
        success: function(e) {},
        error: function(e, t) {},
        complete: function() {}
    })
}
addEventListener("resize", (e=>{
    updateSSVSwiperNavigation(),
    SSVsetPopupHight()
}
));
let gumletVideoCountCall = 0;
function gumletVideoCount() {
    if (gumletVideoCountCall++,
    null != jQuery(`.swiper-wrapper video[data-videourl="${SSVCurrentURL}"]`).attr("data-gumletassetid") && gumletVideoCountCall > 1) {
        var e = document.getElementById("gumlet-video-count");
        gumlet.insights({
            property_id: "jYfkUIVL"
        }).register(e)
    }
}
function updateSSVSwiperNavigation() {
    (jQuery(window).width() >= 640 && jQuery(".swiper .swiper-slide").length < 6 || jQuery(window).width() < 640 && jQuery(".swiper .swiper-slide").length < 3) && (jQuery(".swiper-button-next").addClass("swiper-button-disabled"),
    jQuery(".swiper-button-prev").addClass("swiper-button-disabled"))
}

!function() {
          let a = setInterval((()=>{
               (jQuery(document).ready((function() {
                  var o = window.location.href.split("?")[0] ? window.location.href.split("?")[0] : window.location.href;
                  o = (o = o.replace("#SSV-short-videos", "")).replace("#", "");
                  let e = jQuery("#swirl-short-videos").data("code")
                    , t = jQuery("#swirl-short-videos").data("sw")
                    , a = new URL(o);
                  store = a.hostname,
                  store = t ? store : "satyamgandhidev.com";
                  var n = document.createElement("script");
                  n.rel = "text/javascript",
                  n.src = "https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js",
                  headTag.insertBefore(n, headTag.lastChild);
                  let i = "";
                  i = "https://api.goswirl.live/index.php/shopify/videolistingV2?user=" + e,
                  void 0 !== jQuery("#swirl-short-videos").data("byshopify") && (i = "https://api.goswirl.live/shopify-app/swirl_short_videos.php"),
                  jQuery.ajax({
                      type: "POST",
                      dataType: "json",
                      url: i,
                      data: "store=" + encodeURIComponent(store),
                      success: function(e) {
                          if (void 0 !== e.swilrs.video) {
                              let a = e.swilrs.data;
                              brandCustomizations = a;
                              let n = 0
                                , i = "";
                              globalMute = "0" != brandCustomizations.auto_play_mute_un,
                              live_stream_phone = a.live_stream_phone,
                              live_stream_phone_otp = a.live_stream_phone_otp,
                              "0" === live_stream_phone && (jQuery(".phone-and-code").hide(),
                              jQuery('input[name="SSVphoneNumber"]').attr("disabled", "true")),
                              0 === brandCustomizations.dropdown && (jQuery('select[name="SSVincome"]').hide(),
                              jQuery('select[name="SSVincome"]').attr("disabled", "true")),
                              0 === brandCustomizations.email && (jQuery('input[name="SSVuserEmail"]').hide(),
                              jQuery('input[name="SSVuserEmail"]').attr("disabled", "true")),
                              e.swilrs.video.forEach((o=>{
                                  let e = "";
                                  n++,
                                  "1" === a.auto_play && (e = n > 6 ? "" : "loop autoplay"),
                                  SSVallURL.push(o.video_url);
                                  let t = o.image ? o.image : "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/default-video-thumbnail.jpg"
                                    , d = ""
                                    , r = ""
                                    , l = "";
                                  Object.keys(o.product).length > 0 && (d = o.product[0].product_id,
                                  r = o.product[0].url,
                                  l = `<img src="${o.product[0].image}" class="SSV-video-prod-image-c" alt="Product Thumbnail" />`);
                                  let u = "";
                                  "1" === a.views && (u = `<div class="SSV-video-views-count-top">\n                                                        <p><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon" height="" width=""> ${o.total_views}</p>                            \n                                                    </div>`);
                                  let p = o.video_len ? secondsToHms(o.video_len) : "00:00"
                                    , s = "";
                                  "1" === a.time_sec && (s = `<div class="SSV-video-timer-top">\n                                                        <p>${p}</p>                            \n                                                    </div>`);
                                  let c = "";
                                  1 == a.video_title && (c = `<p class="full-t">${o.video_title}</p>`),
                                  r = r || o.product_link,
                                  
                                  productsAll[o.video_id] = o.product,
                                  i += `<div class="swiper-slide">\n                                <video poster="${t}" playsinline preload="metadata" data-setup="{}" muted ${e} width="100%" height="100%" data-product="${r}" data-title="${o.video_title}" data-cover="${o.image}" data-link="${o.link}" data-vid="${o.video_id}" data-did="${o.designer_id}" data-productid="${d}" data-productlink="${r}" data-gumletassetid="${o.gumletAssetId}" data-totalviews="${o.total_views}" data-buynow="${o.cta_customization}" data-videourl="${o.video_url}" data-landscape="${o.is_landscape}">\n                                    <source src="${e && o.cover_video ? o.cover_video : o.video_url}" type="video/mp4">\n                                </video>\n                                <div class="SSV-play-btn">\n                                    <label></label>\n                                </div>\n                                <div></div>\n                                <div class="SSV-video-playing">\n                                    <label>Preview mode</label>\n                                </div>\n                                <div class="SSV-video-title-bottom">\n                                    ${c}\n                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow" style="display:none;">\n                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> \n                                    </a>\n                                </div>\n                                ${s}\n                                ${u}\n                                ${l}\n                            </div>`
                                  
                              }
                              )),
                              jQuery("#SSV-short-videos .swiper-wrapper").html(i),
                              localStorage.setItem("SSVallURL", JSON.stringify(e)),
                              localStorage.setItem("SSVlastPlayed", ""),
                              localStorage.setItem("SSVlastPlayedTime", ""),
                              localStorage.setItem("SSVshopify", t),
                              updateSSVSwiperNavigation(),
                              1 == a.auto_play_video && jQuery("#SSV-short-videos .swiper-slide").hover((function() {
                                  SSVpauseAll(jQuery(this).children("video"))
                              }
                              )),
                              jQuery("#SSV-short-videos .swiper-slide video").on("play", (function() {
                                  jQuery(this).next().hide(),
                                  jQuery(this).next().next().show()
                              }
                              )),
                              jQuery("#SSV-short-videos .swiper-slide video").on("pause", (function() {
                                  jQuery(this).next().show(),
                                  jQuery(this).next().next().hide()
                              }
                              )),
                              jQuery("#SSV-short-videos .swiper-slide").click((function() {
                                  window.location = "#SSV-short-videos",
                                  jQuery(this).children(".SSV-video-playing").show(),
                                  jQuery(".SSV-play-modal").show();
                                  let e = jQuery(this).children("video").attr("data-videourl")
                                    , t = jQuery(this).children("video").attr("data-cover");
                                  SSVCurrentURL = e,
                                  jQuery(".SSV-play-modal video source").attr("src", e),
                                  jQuery(".SSV-play-modal video").attr("poster", t),
                                  jQuery(".SSV-play-modal video").get(0).load(),
                                  "0" === a.auto_play_mute_un ? (jQuery(".SSV-play-modal video").prop("muted", !0),
                                  jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg")) : (jQuery(".SSV-play-modal video").prop("muted", !1),
                                  jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg")),
                                  ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                  jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(e)),
                                  jQuery(".SSV-video-popup-share").hide(),
                                  jQuery(".SSV-CTA-modal-inner").hide(),
                                  jQuery(".close-SSV-PIP").click(),
                                  disableScroll()
                              }
                              ));
                              let d = 0;
                              if (jQuery(".close-SSV-modal").click((function() {
                                  d = jQuery(".SSV-play-modal video").get(0).currentTime,
                                  SSVpauseAll(),
                                  jQuery(".SSV-play-modal video").get(0).pause(),
                                  jQuery(".SSV-play-modal").hide(),
                                  jQuery(".SSV-video-playing").hide(),
                                  enableScroll(),
                                  localStorage.setItem("SSVlastPlayed", ""),
                                  localStorage.setItem("SSVlastPlayedTime", "")
                              }
                              )),
                              jQuery(".close-SSV-PIP").click((function() {
                                  jQuery(".SSV-PIP video").get(0).pause(),
                                  jQuery(".SSV-PIP").hide(),
                                  localStorage.setItem("SSVlastPlayed", ""),
                                  localStorage.setItem("SSVlastPlayedTime", "")
                              }
                              )),
                              jQuery(".SSV-modal-left").click((function() {
                                  let e = jQuery(".SSV-play-modal video source").attr("src")
                                    , t = SSVallURL.indexOf(e);
                                  if (void 0 !== SSVallURL[t - 1]) {
                                      SSVCurrentURL = SSVallURL[t - 1];
                                      let e = jQuery(`.swiper-wrapper video[data-videourl="${SSVallURL[t - 1]}"]`).attr("data-cover");
                                      jQuery(".SSV-play-modal video").attr("poster", e),
                                      jQuery(".SSV-play-modal video source").attr("src", SSVallURL[t - 1]),
                                      jQuery(".SSV-play-modal video").get(0).load(),
                                      "0" === a.auto_play_mute_un ? (jQuery(".SSV-play-modal video").prop("muted", !0),
                                      jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg")) : (jQuery(".SSV-play-modal video").prop("muted", !1),
                                      jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg")),
                                      ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                      jQuery(".SSV-video-popup-share").hide(),
                                      jQuery(".SSV-CTA-modal-inner").hide(),
                                      jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[t - 1]))
                                  }
                              }
                              )),
                              jQuery(".SSV-modal-right").click((function() {
                                  let e = jQuery(".SSV-play-modal video source").attr("src")
                                    , t = SSVallURL.indexOf(e);
                                  if (void 0 !== SSVallURL[t + 1]) {
                                      SSVCurrentURL = SSVallURL[t + 1];
                                      let e = jQuery(`.swiper-wrapper video[data-videourl="${SSVallURL[t + 1]}"]`).attr("data-cover");
                                      jQuery(".SSV-play-modal video").attr("poster", e),
                                      jQuery(".SSV-play-modal video source").attr("src", SSVallURL[t + 1]),
                                      jQuery(".SSV-play-modal video").get(0).load(),
                                      "0" === a.auto_play_mute_un ? (jQuery(".SSV-play-modal video").prop("muted", !0),
                                      jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg")) : (jQuery(".SSV-play-modal video").prop("muted", !1),
                                      jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg")),
                                      ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                      jQuery(".SSV-video-popup-share").hide(),
                                      jQuery(".SSV-CTA-modal-inner").hide(),
                                      jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(SSVallURL[t + 1]))
                                  }
                              }
                              )),
                              jQuery(".SSV-play-modal-share").click((function() {
                                  jQuery(".SSV-video-popup-share").show(),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-share").addClass("SSV-video-popup-share-cover")
                                  }
                                  ), 100)
                              }
                              )),
                              jQuery(".SSV-video-popup-share label").click((function() {
                                  jQuery(".SSV-video-popup-share").removeClass("SSV-video-popup-share-cover"),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-share").hide()
                                  }
                                  ), 500)
                              }
                              )),
                              jQuery(".SSV-facebook").click((function() {
                                  let o = jQuery(this).attr("data-sharelink");
                                  window.open("https://www.facebook.com/sharer/sharer.php?u=" + o, "_blank")
                              }
                              )),
                              jQuery(".SSV-twitter").click((function() {
                                  let o = jQuery(this).attr("data-sharelink");
                                  window.open("https://twitter.com/share?url=" + o, "_blank")
                              }
                              )),
                              jQuery(".SSV-whatsapp").click((function() {
                                  let o = jQuery(this).attr("data-sharelink");
                                  window.open("https://api.whatsapp.com/send?text=" + o)
                              }
                              )),
                              jQuery(".SSV-copy").click((function() {
                                  let o = jQuery(this).attr("data-sharelink");
                                  jQuery(".SSV-copylink-input").val(o),
                                  jQuery(".SSV-copylink-input").click(),
                                  jQuery(".SSV-video-popup-share span").fadeIn().delay(3e3).fadeOut()
                              }
                              )),
                              void 0 !== params.ssv) {
                                  jQuery(".SSV-play-modal").show();
                                  let e = params.ssv;
                                  SSVCurrentURL = window.atob(e),
                                  jQuery(".SSV-play-modal video source").attr("src", window.atob(e)),
                                  jQuery(".SSV-play-modal video").get(0).load(),
                                  jQuery(".SSV-play-modal video").prop("muted", !0),
                                  ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                  jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg"),
                                  jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + e),
                                  setTimeout((()=>{
                                      document.getElementById("SSV-short-videos").scrollIntoView(),
                                      disableScroll()
                                  }
                                  ), 2e3)
                              }
                              jQuery(".SSV-play-modal video").hover((function() {
                                  jQuery(".SSV-play-modal-play-pause").show()
                              }
                              )),
                              jQuery(".SSV-play-modal video").mouseleave((function() {
                                  jQuery(".SSV-play-modal-play-pause").hide()
                              }
                              )),
                              jQuery(".SSV-play-modal-play-pause").mouseenter((function() {
                                  jQuery(".SSV-play-modal-play-pause").show()
                              }
                              )),
                              dragElement(document.getElementById("SSV-PIP")),
                              jQuery(".SSV-CTA-modal label span").click((function() {
                                  jQuery(".SSV-CTA-modal-inner").hide()
                              }
                              )),
                              jQuery(".SSV-play-modal-askaque").click((function() {
                                  jQuery(".SSV-CTA-modal-inner").hide(),
                                  jQuery(".SSV-ask-question").show()
                              }
                              )),
                              jQuery(".SSV-play-modal-addtocart").click((function() {
                                  let o = jQuery(this)
                                    , e = jQuery(this).attr("data-action")
                                    , t = jQuery(this).attr("data-pid")
                                    , a = jQuery(this).attr("data-link");
                                  "2" == e ? ("1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click(),
                                  SSVCTAClicksTrack(t, "1"),
                                  window.location = a) : "1" == e ? (SSVaddToCart(a, o),
                                  SSVCTAClicksTrack(t, "2")) : "3" == e && (window.location = "https://" + store + "/cart")
                              }
                              )),
                              jQuery(document).keydown((function(o) {
                                  jQuery(".SSV-play-modal").is(":visible") && (37 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible") ? 39 != o.keyCode || jQuery(".SSV-CTA-modal-inner").is(":visible") ? "Escape" === o.key && (jQuery(".SSV-CTA-modal-inner").is(":visible") ? jQuery(".SSV-CTA-modal-inner").hide() : jQuery(".SSV-video-product-open").is(":visible") ? jQuery(".SSV-video-product-open b").click() : jQuery(".SSV-video-popup-brand-info").is(":visible") ? jQuery(".SSV-video-popup-brand-info label").click() : jQuery(".SSV-play-modal .close-SSV-modal").click()) : jQuery(".SSV-play-modal .SSV-modal-right").click() : jQuery(".SSV-play-modal .SSV-modal-left").click())
                              }
                              )),
                              jQuery(".SSV-play-modal-pip").click((function() {
                                  d = jQuery(".SSV-play-modal video").get(0).currentTime,
                                  SSVpauseAll(),
                                  jQuery(".SSV-play-modal video").get(0).pause(),
                                  jQuery(".SSV-play-modal").hide(),
                                  jQuery(".SSV-video-playing").hide(),
                                  jQuery(".SSV-PIP video source").attr("src", jQuery(".SSV-play-modal video source").attr("src")),
                                  jQuery(".SSV-PIP video").get(0).load(),
                                  jQuery(".SSV-PIP video").get(0).currentTime = d,
                                  ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                                  jQuery(".SSV-PIP").show(),
                                  enableScroll()
                              }
                              )),
                              jQuery(".SSV-PIP-fullscreen").click((function() {
                                  let e = jQuery(".SSV-PIP video source").attr("src");
                                  SSVCurrentURL = e,
                                  jQuery(".SSV-play-modal video source").attr("src", e),
                                  jQuery(".SSV-play-modal video").get(0).load(),
                                  "0" === a.auto_play_mute_un ? (jQuery(".SSV-play-modal video").prop("muted", !0),
                                  jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg")) : (jQuery(".SSV-play-modal video").prop("muted", !1),
                                  jQuery(".SSV-play-modal-mute-unmute").children("img").attr("src", "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg")),
                                  ssvPlayWithPromise(jQuery(".SSV-play-modal video").get(0)),
                                  jQuery(".SSV-video-popup-share img").attr("data-sharelink", o + "?ssv=" + window.btoa(e)),
                                  jQuery(".SSV-video-popup-share").hide(),
                                  jQuery(".SSV-CTA-modal-inner").hide(),
                                  jQuery(".close-SSV-PIP").click(),
                                  jQuery(".SSV-play-modal").show(),
                                  disableScroll()
                              }
                              )),
                              "1" === a.powered_by ? jQuery(".SSV-video-popup-brand-info-powered").show() : jQuery(".SSV-video-popup-brand-info-powered").hide(),
                              jQuery(document).on("click touch", (function(o) {
                                  jQuery(".SSV-video-popup-brand-info").is(":visible") ? (jQuery(o.target).is(".SSV-play-modal") || jQuery(o.target).is(".SSV-play-modal-video-container video")) && jQuery(".SSV-video-popup-brand-info label").click() : jQuery(".SSV-play-modal").is(":visible") && jQuery(o.target).is(".SSV-play-modal") && "1" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").click()
                              }
                              )),
                              window.onpopstate = function(o) {
                                  jQuery(".SSV-play-modal").is(":visible") && jQuery(".SSV-play-modal .close-SSV-modal").click()
                              }
                              ,
                              jQuery("#SSV-PIP video").click((function() {
                                  jQuery(".SSV-PIP-fullscreen").click()
                              }
                              )),
                              jQuery(".SSV-video-popup-product").click((function() {
                                  jQuery(".SSV-video-product-open").show(),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-product-open").addClass("SSV-video-product-open-cover")
                                  }
                                  ), 100)
                              }
                              )),
                              jQuery(".SSV-video-product-open b").click((function() {
                                  jQuery(".SSV-video-product-open").removeClass("SSV-video-product-open-cover"),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-product-open").hide()
                                  }
                                  ), 500)
                              }
                              )),
                              jQuery(".SSV-video-popup-brand-info-btn").click((function() {
                                  jQuery(".SSV-video-popup-brand-info").show(),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-brand-info").addClass("SSV-video-popup-brand-info-cover")
                                  }
                                  ), 100)
                              }
                              )),
                              jQuery(".SSV-video-popup-brand-info label").click((function() {
                                  jQuery(".SSV-video-popup-brand-info").removeClass("SSV-video-popup-brand-info-cover"),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-brand-info").hide()
                                  }
                                  ), 500)
                              }
                              )),
                              a.user_profile ? (jQuery(".SSV-video-popup-brand-info-brand-logo").attr("src", a.user_profile),
                              jQuery(".SSV-video-popup-brand-info-brand-logo").show()) : jQuery(".SSV-video-popup-brand-info-brand-logo").hide(),
                              jQuery(".SSV-video-popup-brand-info-brand-name").html(a.designer_brand_name),
                              a.designer_bio ? (jQuery(".SSV-video-popup-brand-info-brand-description").html(a.designer_bio),
                              jQuery(".SSV-video-popup-brand-info-brand-description").show(),
                              jQuery(".SSV-video-popup-brand-info-brand-about").show()) : (jQuery(".SSV-video-popup-brand-info-brand-description").hide(),
                              jQuery(".SSV-video-popup-brand-info-brand-about").hide()),
                              document.addEventListener("touchstart", handleTouchStart, !1),
                              document.addEventListener("touchmove", handleTouchMove, !1),
                              localStorage.getItem("SSVlastPlayed") && (SSVCurrentURL = localStorage.getItem("SSVlastPlayed"),
                              jQuery(".SSV-PIP video source").attr("src", localStorage.getItem("SSVlastPlayed")),
                              jQuery(".SSV-PIP video").get(0).load(),
                              ssvPlayWithPromise(jQuery(".SSV-PIP video").get(0)),
                              jQuery(".SSV-PIP video").attr("loop", !0),
                              setTimeout((()=>{
                                  jQuery(".SSV-PIP").show()
                              }
                              ), 1e3)),
                              jQuery(document).on("click", ".SSV-P-see-more", (function() {
                                  jQuery(this).parent().next().show(),
                                  jQuery(this).parent().hide()
                              }
                              )),
                              jQuery(document).on("click", ".SSV-P-see-less", (function() {
                                  jQuery(this).parent().prev().show(),
                                  jQuery(this).parent().hide()
                              }
                              )),
                              "0" === brandCustomizations.pip_mode && jQuery(".SSV-play-modal-pip").hide(),
                              jQuery(".SSV-play-modal video").on("loadstart", (function(o) {
                                  jQuery(".SSV-play-modal-video-container").addClass("SSV-popup-video-blur-load")
                              }
                              )),
                              jQuery(".SSV-play-modal video").on("canplay", (function(o) {
                                  jQuery(".SSV-play-modal-video-container").removeClass("SSV-popup-video-blur-load")
                              }
                              )),
                              jQuery(".SSV-video-popup-product-multi").click((function() {
                                  jQuery(".SSV-video-popup-product-list-multi").show(),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-product-list-multi").addClass("SSV-video-popup-product-list-multi-cover")
                                  }
                                  ), 100)
                              }
                              )),
                              jQuery(".SSV-video-popup-product-list-multi-title b").click((function() {
                                  jQuery(".SSV-video-popup-product-list-multi").removeClass("SSV-video-popup-product-list-multi-cover"),
                                  setTimeout((()=>{
                                      jQuery(".SSV-video-popup-product-list-multi").hide()
                                  }
                                  ), 500)
                              }
                              ))
                          } else {
                              let o = "";
                              jQuery("#SSV-short-videos .swiper-wrapper").html(o)
                          }
                      }
                  }),
                  SSVsetPopupHight()
              }
              )),
              clearInterval(a))
          }
          ), 1e3)
  }();
