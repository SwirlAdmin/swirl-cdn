
firebase.initializeApp({
    apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
    authDomain: 'getnatty-1547727043139.firebaseapp.com',
    projectId: 'getnatty-1547727043139',
    storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();
var storage = firebase.storage();

var base_url = $('#base_url').val();
var streamId = $('#stream_id').val();
var end_time = $('#end_time').val();
var brand_id = $('#designer_id').val();
//remove local storage 
if ((end_time != '0000-00-00 00:00:00')) {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fname");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_email");
}
try {
    if (localStorage.getItem("user_id") != null) {
        res = localStorage.getItem("user_id");
        $('#user_id').val(res);
    }
    if (localStorage.getItem("user_fname") != null) {
        res1 = localStorage.getItem("user_fname");
        $('#user_fname').val(res1);
    }
    if (localStorage.getItem("user_phone") != null) {
        res2 = localStorage.getItem("user_phone");
        $('#user_phone').val(res2);
    }
    if (localStorage.getItem("user_email") != null) {
        res3 = localStorage.getItem("user_email");
        $('#user_email_local').val(res3);
    }
} catch (e) { }
var user_id = $('#user_id').val();
if (user_id != '') {
    $('.rsvp-button').hide();
}
else {
    $('.rsvp-button').show();
}
// fb share 
var fbButton = document.getElementById('fb-share-button');
var url = $('#copy-text').val();
fbButton.addEventListener('click', function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});
// copy url
function copy_text() {
    var copyText = document.getElementById("copy-text");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    $('[data-toggle="tooltip"]').tooltip();
    $("#btn-copy").html("Copied");
}
function playFunction() {
    var end_time = $('#end_time').val();
    if (end_time == '0000-00-00 00:00:00')
    {
        $(this).addClass("vjs-controls-disabled");
        $(this).removeClass("vjs-controls-enabled");
        $(this).removeClass("vjs-touch-enabled");
        $('#livestreambro_html5_api').css("pointer-events","none");
        $(this).removeAttr("controls");
        $('.vjs-control-bar').hide();
    }
}   
// mute/unmute web
$(".muteicon").click(function () {
    $(this).find('svg').toggle();
    var player = document.getElementById('livestreambro_html5_api');
    if (player.muted) {
        player.muted = false;
    }
    else {
        player.muted = true;
    }
});
// mute/unmute mobile
$('.mute-unmute-icon').click(function (event) {
    event.preventDefault();
    $('#mute-svg').toggle();
    $('#unmute-svg').toggle();
    var player = document.getElementById('livestreambro_html5_api');
    if (player.muted) {
        player.muted = false;
    }
    else {
        player.muted = true;
    }
});
//mobile action bar animation
$("#cat-svg").click(function () {
    $('#cat-svg').toggleClass('fill-icon');
    $('#productlist-section-div').toggleClass('d-none');
    $('#productlist-section-div').parent().toggleClass('productlist-bg');
});
$("#cmt-svg").click(function () {
    $('#verify-section-div').addClass('d-none');
    $('#askque-section-div').addClass('d-none');
    $('#askque-svg').removeClass('fill-icon');
    $('#cmt-svg').toggleClass('fill-icon');
    $('#comments-section-div').toggleClass('d-none');
    var className = $('#cmt-svg').attr('class');
    if (className != '') {
        $('#comments-section-div').parent().removeClass('productlist-bg');
    }
    else {
        $('#comments-section-div').parent().addClass('productlist-bg');
    }

});
$("#askque-svg").click(function () {
    $('#verify-section-div').addClass('d-none');
    $('#comments-section-div').addClass('d-none');
    $('#cmt-svg').removeClass('fill-icon');
    $('#askque-svg').toggleClass('fill-icon');
    $('#askque-section-div').toggleClass('d-none');
    /* $('#comments-section-div').parent().removeClass('productlist-bg'); */
});
$("#message").keyup(function (e) {
    $('.collapsable').css('display', 'table-cell');
    $('.catlogicon').css('display', 'none');
    $('.askicon').css('display', 'none');
    $('.muteicon').css('display', 'none');
    $('.message-textbox-div').css('width', '60%');
});
$(".collapsable").click(function () {
    $('.collapsable').css('display', 'none');
    $('.catlogicon').css('display', 'table-cell');
    $('.askicon').css('display', 'table-cell');
    $('.muteicon').css('display', 'table-cell');
    $('.message-textbox-div').css('width', '40%');
});

//product auto updates
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
    if (doc.exists) {
        if (doc.data().is_live == true) {
            var productsid = $('#product_ids').val();
            var brand_id = $('#designer_id').val();
            var id = 0;
            setInterval(function () {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: base_url + "index.php/Live/otmanyproductlist",
                    data: "stream_id=" + encodeURIComponent(streamId) + "&productIds=" + encodeURIComponent(productsid),
                    beforeSend: function () {
                    },
                    success: function (json) {
                        console.log(json);
                        if (json['status_code'] == '1') {
                            $('#web-static-product-listing').css('display', 'none');
                            $('#web-dynamic-product-listing').empty();
                            $('#static').css('display', 'none');
                            $('#dynamic').empty();
                            $('#static-img').css('display', 'none');
                            $('#dynamic-img').empty();
                            $('#static-productdetails').css('display', 'none');
                            $('#dynamic-productdetails').empty();
                            $("#product_count").text(json['data']['product_count']);
                            $('#web-dynamic-product-listing').addClass('product-listing');
                            for (var k = 0; k < json['data']['product'].length; k++) {
                                var link = json['data']['product'][k]['link'];
                                var discount_price = '';
                                if (json['data']['product_count'] != '0') {
                                    if (json['data']['product'][k]['product_sell_price'] != json['data']['product'][k]['product_price']) {
                                        var discount_price = '<s class="pl-2 cl-red">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_price'] + '</s> ';
                                    }
                                    $('#dynamic-img').append('<div class="product-img-div"><img data-toggle="modal" data-target="#productidd_' + json['data']['product'][k]['product_id'] + '" src="' + json['data']['product'][k]['product_img_url'] + '" alt="..." class="img-fluid product-img"><span>' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '</span></div>');

                                    $('#dynamic').append('<div class="card-body"><div class="product-img-div"><img src="' + json['data']['product'][k]['product_img_url'] + '" alt="..." class="img-fluid product-img"></div><div class="product-details"><h7 class="card-title">' + json['data']['product'][k]['product_title'] + '</h7><p class="card-text"><span class="price-amt">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '<span>' + discount_price + '</p><div class="product-action-btn product-btn-3 "><a href="' + link + '" target="_blank" rel="noopener"><button type="button" class="btn btn-buy buy-now-btn" onclick="buynow_firbase(this)" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + json['data']['product'][k]['external_links'] + '" data-desid="' + json['data']['designer_id'] + '">' + json['data']['btn2_title'] + '</button></a></div></div></div><hr>');

                                    $('#dynamic-productdetails').append('<div id="productidd_' + json['data']['product'][k]['product_id'] + '" class="productlist-modal modal bottom fade"  role="dialog"><div class="modal-dialog modal-dialog-bottom product_details_modal"><div class="modal-content"><div class="modal-header"><h6 class="modal-title">Product List</h6><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><div class=""><div class="card-body"><div class="product-img-div"><img src="' + json['data']['product'][k]['product_img_url'] + '" alt="..." class="img-fluid product-img"></div><div class="product-details"><h7 class="card-title">' + json['data']['product'][k]['product_title'] + '</h7><p class="card-text"><span class="price-amt">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '</span>' + discount_price + '</p><div class="product-action-btn  dynamic-6"><a href="' + link + '"  target="_blank" rel="noopener"><button type="button" class="btn btn-buy buy-now-btn" onclick="buynow_firbase(this)" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + json['data']['product'][k]['external_links'] + '" data-desid="' + json['data']['designer_id'] + '" >' + json['data']['btn2_title'] + '</button></a></div></div></div></div></div></div></div></div>');

                                    $('#web-dynamic-product-listing').append('<div class="media my-3 mr-3"><div class=""><img class="align-self-center mr-3 rounded proimg" src="' + json['data']['product'][k]['product_img_url'] + '"></div><div class="media-body"><h6 class="mt-0" style="word-break: break-all;" title="' + json['data']['product'][k]['product_title'] + '">' + json['data']['product'][k]['product_title'] + '</h6><p><span class="price-amt">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '</span>' + discount_price + '</p><div class="product-action-btn"><button type="button" class="btn btn-buy buy-now-btn" onclick="buynow_firbase(this)" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + json['data']['product'][k]['external_links'] + '" data-desid="' + json['data']['designer_id'] + '">' + json['data']['btn2_title'] + '</button></div></div></div><hr>');
                                }
                            }
                            productsid = json['data']['product_ids'];
                        }
                    }
                });
            }, 60000);
        }
    }
});


// verification popup
function otpcheck_without_sp() {
    var name = document.getElementById("name").value;
    if (name == '') {
        $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
        $('#name').focus();
        return false;
    }
    else {
        var verify_name = onlyAlphabets(name);
        if (verify_name == false) {
            $('.error_msg').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
            $('#name').focus();
            return false;
        }
        $('#demo-modal-1').modal('toggle');
        var d = new Date();
        var current_d = d.getTime();
        let user_code = generateString(20);
        db.collection("messages").doc(streamId).collection("users").doc(user_code).set({
            user_id: user_code,
            country_code: '',
            name: name,
            phone: '',
            created_date: current_d,
            stream_id: streamId
        });
        $('#user_id').val(user_code);
        $('#user_fname').val(name);
        // Set Item
        try {
            localStorage.setItem("user_id", user_code);
            localStorage.setItem("user_fname", name);
        } catch (e) {
        }
        insertMessage();
        insertMessage1();
        var msg = document.getElementById("inquiry_text_ask").value;
        if (msg != '') {
            otp_through_ask();
        }
    }
}
// ask quetions after otp verification popup
function otp_through_ask() {
    var a = $('#user_id').val();
    var swirls_id = '';
    var msg = document.getElementById("inquiry_text_ask").value;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url + "index.php/Live/ask_que",
        data: "user_id=" + encodeURIComponent(a) + "&designer_id=" + encodeURIComponent(brand_id) + "&msg=" + encodeURIComponent(msg) + "&live_id=" + encodeURIComponent(streamId) + "&swirls_id=" + encodeURIComponent(swirls_id),
        success: function (json) {
            $('#ask_que').modal('hide');
            $('#inquiry_text_ask').val('');
            alert(json.message);
        }
    });
}
// generate random string
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// buynow button event
function buynow_firbase(e) {
    var product_id = $(e).attr("data-proid");
    var designer_id = $(e).attr("data-desid");
    var pro_title = $(e).attr("data-protitle");
    var pro_img = $(e).attr("data-proimg");
    var pro_redirection = $(e).attr("data-redirection");

    var user_id = $('#user_id').val();
    var name = $("#user_fname").val();
    var d = new Date();
    var current_d = d.getTime();
    let user_code = generateString(20);
    db.collection("messages").doc(streamId).collection("buy_now").doc(user_code).set({
        user_id: user_id,
        country_code: '',
        name: name,
        phone: '',
        created_date: current_d,
        stream_id: streamId,
        product_id: product_id,
        product_title: pro_title,
        product_image: pro_img,
        product_url: pro_redirection,
        designer_id: designer_id
    });

    var mobileOS = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(mobileOS) && !window.MSStream) {
        $('.btn-buy').click(function () {
            var redirectWindow = window.open(pro_redirection, '_blank');
            $.ajax({
                type: 'POST',
                url: '/echo/json/',
                success: function (data) {
                    redirectWindow.location;
                }
            });
        });
    } else {
        window.open(pro_redirection, '_blank');
    }
}
// ask que button click
$('.ask_que').click(function () {
    $('#ask_que').modal('show');
});
//ask que submit mobile
function ask_que_submit(b, c) {
    var a = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var swirls_id = '';
    var msg = document.getElementById("inquiry_text_ask").value;
    if (msg == '') {
        $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
        $('#inquiry_text_ask').focus();
        return false;
    }
    else if (a == '') {
        $('#ask_que').modal('hide');
        $('#inquiry_text_ask').val(msg);
        $('#demo-modal-1').modal('show');
    }
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: base_url + "index.php/Live/ask_que_details",
            data: "user_id=" + encodeURIComponent(a) + "&user_fname=" + encodeURIComponent(user_fname) + "&user_phone=" + encodeURIComponent(user_phone) + "&designer_id=" + encodeURIComponent(b) + "&msg=" + encodeURIComponent(msg) + "&live_id=" + encodeURIComponent(c) + "&swirls_id=" + encodeURIComponent(swirls_id),
            success: function (json) {
                $('#ask_que').modal('hide');
                $('#inquiry_text_ask').val('');
                alert(json.message);
                ask_que_count();
            }
        });
    }
}
// ask que submit web
function ask_que_submit_web(b, c) {
    var a = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var swirls_id = '';
    var msg = document.getElementById("inquiry_text_ask_web").value;
    if (msg == '') {
        $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
        $('#inquiry_text_ask_web').focus();
        return false;
    }
    else if (a == '') {
        $('#ask_que').modal('hide');
        $('#inquiry_text_ask_web').val(msg);
        $('#demo-modal-1').modal('show');
    }
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: base_url + "index.php/Live/ask_que_details",
            data: "user_id=" + encodeURIComponent(a) + "&user_fname=" + encodeURIComponent(user_fname) + "&user_phone=" + encodeURIComponent(user_phone) + "&designer_id=" + encodeURIComponent(b) + "&msg=" + encodeURIComponent(msg) + "&live_id=" + encodeURIComponent(c) + "&swirls_id=" + encodeURIComponent(swirls_id),
            success: function (json) {
                $('#ask_que').modal('hide');
                $('#inquiry_text_ask_web').val('');
                alert(json.message);
                ask_que_count();
            }
        });
    }
}

//comments
var $messages = $('.messages-content');
var i = 0;
var myName = "";
$messages.mCustomScrollbar();
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "asc")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.doc.data().flag === '1') {
                if (change.type === "removed") {
                    $('#message-' + change.doc.id).remove();
                }
                else {
                    if (change.doc.data().from == brand_id) {
                        var changecolor = 'col-change';
                        var fillcolor = 'fillcolor';
                        var brand_time = 'brand-time';
                    }
                    else {
                        var changecolor = '';
                        var fillcolor = '';
                        var brand_time = '';
                    }
                    var time = convertMsToTime(change.doc.data().created_time);
                    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                    if ((change.doc.data().message).match(regex)) {
                        var string_link = urlify(change.doc.data().message);
                        $('<div class="message message-personal ' + fillcolor + '"><div class="mesg-blk" id="message-' + change.doc.id + '"><span class="' + changecolor + '">' + change.doc.data().name + ' : </span>' + string_link + '<span class="time ' + brand_time + '">' + time + '</span></div></div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                    else {
                        $('<div class="message message-personal ' + fillcolor + '"><div class="mesg-blk" id="message-' + change.doc.id + '"><span class="' + changecolor + '">' + change.doc.data().name + ' : </span>' + change.doc.data().message + '<span class="time ' + brand_time + '">' + time + '</span></div></div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                }
            }
            setTimeout(function () {
                var docRef = db.collection("messages").doc(streamId).collection("messages").doc(change.doc.id).update({
                    flag: '1'
                });
            }, 5000);
        });
        updateScrollbar();
    });
function convertMsToTime(milliseconds) {
    var date = new Date(milliseconds);
    timezone = date.toString();
    var date1 = new Date(timezone);
    localtime = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return localtime;
}
db.collection("live_streams").doc(streamId)
    .onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        var livestream = '';
        if (doc.data().is_recorded != '' || doc.data().is_recorded != 'undefined') {
            livestream = doc.data().is_recorded;
        }
        if (livestream == true) {
            $('.live-status').html('<span class="recording-icon">TALLENNE</span>');
        } else {
            $('.live-status').html('<span class="live-icon"> LIVE</span>');
        }
    });
// post comments web
function sendMessage(e) {
    var user_id = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var d = new Date();
    var current_d = d.getTime();
    var message = document.getElementById("message").value;
    db.collection('messages').doc(streamId).collection("messages").get().then(snap => {
        size = snap.size
    });
    db.collection("messages").doc(streamId).collection("messages").add({
        cover_img: '',
        created_time: current_d,
        from: user_id,
        is_designer: false,
        is_designer_seen: false,
        message: message,
        name: user_fname,
        profile: '',
        title: '',
        type: 'text',
        user_percentage: '20',
        user_phone: user_phone,
        flag: '0'
    });
    updateScrollbar();
    $('.message-input').val(null);
}
// post comments mobile
function sendMessage1(e) {
    var user_id = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var d = new Date();
    var current_d = d.getTime();
    var message = document.getElementById("message1").value;
    db.collection('messages').doc(streamId).collection("messages").get().then(snap => {
        size = snap.size
    });
    db.collection("messages").doc(streamId).collection("messages").add({
        cover_img: '',
        created_time: current_d,
        from: user_id,
        is_designer: false,
        is_designer_seen: false,
        message: message,
        name: user_fname,
        profile: '',
        title: '',
        type: 'text',
        user_percentage: '20',
        user_phone: user_phone,
        flag: '0'
    });
    updateScrollbar();
    $('.message-input1').val(null);
}
//auto update comment scrollbar
function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}
// web submit comments
function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        $('#message').focus();
        return false;
    }
    sendMessage();
}
// mobile submit comments
function insertMessage1() {
    msg = $('.message-input1').val();
    if ($.trim(msg) == '') {
        $('#message1').focus();
        return false;
    }
    sendMessage1();
}
$('.message-submit1').click(function () {
    var user_id = $('#user_id').val();
    if (user_id != '') {
        $('#demo-modal-1').modal('hide');
        insertMessage1();
    }
    else {
        $('#demo-modal-1').modal('show');
        $('.close1').css('display', 'none');
    }
});
$('.message-submit').click(function () {
    var user_id = $('#user_id').val();
    if (user_id != '') {
        $('#demo-modal-1').modal('hide');
        insertMessage();
    }
    else {
        $('#demo-modal-1').modal('show');
        $('.close1').css('display', 'none');
    }
});
$(window).on('keydown', function (e) {
    if (e.which == 13) {
        var user_id = $('#user_id').val();
        if (user_id != '') {
            $('#demo-modal-1').modal('hide');
            insertMessage();
            insertMessage1();
        }
        else {
            $('#demo-modal-1').modal('show');
            $('.close1').css('display', 'none');
        }
        return false;
    }
});
// schedule banner show
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
    if (doc.exists) {
        $('#livestreambro').css('display', 'block');
        $('.webplayer-icon-bar').css('display', 'block');
        $('#black-screen').hide();
        $('#card-header').css('display', 'block');
        $('.product-img-list').css('display', 'block');
        if (doc.data().is_paused == true) {
            $('.product-img-list').css('display', 'none');
            $('#card-header').css('display', 'none');
            $('#livestreambro').css('display', 'none');
            $('.webplayer-icon-bar').css('display', 'none');
            $('.bottom-bar').css('display', 'none');
            $('.messages').css('display', 'none');
            $('#black-screen').show();
            $('#stream_span').html('paused & will resume shortly');
        }
        else {
            if ($(window).width() < 440) {
                $('.bottom-bar').css('display', 'table');
                $('.messages').css('display', 'block');
            }
        }
    }
    else {
        if (end_time == '0000-00-00 00:00:00') {
            $('.product-img-list').css('display', 'none');
            $('#card-header').css('display', 'none');
            $('#livestreambro').css('display', 'none');
            $('.webplayer-icon-bar').css('display', 'none');
            $('.bottom-bar').css('display', 'none');
            $('.vjs-modal-dialog-content').empty();
            $('.vjs-modal-dialog-content').text('Stream will start playing automatically. when it is live');
            $('.action-div').css('display', 'none');
        }
        else {
            $('#livestreambro').css('display', 'block');
            $('.webplayer-icon-bar').css('display', 'block');
            $('#black-screen').hide();
            $('#card-header').css('display', 'block');
            $('.product-img-list').css('display', 'block');
        }
    }
});

$(document).ready(function () {
    db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
        if (!doc.exists) {
            reloadOnceLive();
        }
    });
});
function reloadOnceLive() {
    db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
        var live_stream_status = 'idle';
        $('.product-img-list').css('display', 'none');
        $('#card-header').css('display', 'none');
        $('#livestreambro').css('display', 'none');
        $('.webplayer-icon-bar').css('display', 'none');
        $('.bottom-bar').css('display', 'none');
        $('#black-screen').show();
        $('.live-status').hide();
        var mix_live_stream_id = streamId;
        if (doc.exists) {
            let docInterval = setInterval(function () {
                if (live_stream_status == 'idle') {
                    $.ajax({
                        url: 'https://store.goswirl.live/index.php/api/Mogicon/muxLiveStreamStatus',
                        method: 'POST',
                        dataType: 'JSON',
                        data: { 'stream_id': mix_live_stream_id },
                        success: function (response) {
                            /* console.log('auto-refresh response'+response); */
                            if (response.status == 'active') {
                                live_stream_status = 'active';
                                clearInterval(docInterval);
                                window.location = window.location.href + '?live=true';
                            }
                        }
                    });
                }
            }, 3000);
        }
    });
}

function urlify(text) {
    var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return text.replace(urlRegex, function (url) {
        var pattern = /^((http|https|ftp):\/\/)/;
        if (!pattern.test(url)) {
            url = "https://" + url;
        }
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
}

db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
    if (doc.exists) {
        var pin = doc.data().pin_comment_id;
        if (pin != '' && pin != undefined) {
            var docRef = db.collection("messages").doc(streamId).collection("messages").doc(pin);
            docRef.get().then((doc) => {
                if (doc.exists) {

                    $(".messages-pin").empty();
                    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                    if ((doc.data().message).match(regex)) {
                        var string_link = urlify(doc.data().message);
                        $('<div class="message message-personal pin-color"><i class="icon-pushpin"></i><div class="mesg-blk d-inline" style="word-break: break-word" id="message-' + doc.id + '"><span>' + doc.data().name + ' : </span>' + string_link + '</div></div>').appendTo($('.messages-pin')).addClass('new');
                    }
                    else {
                        $('<div class="message message-personal pin-color"><i class="icon-pushpin"></i><div class="mesg-blk d-inline" style="word-break: break-word" id="message-' + doc.id + '"><span>' + doc.data().name + ' : </span>' + doc.data().message + '</div></div>').appendTo($('.messages-pin')).addClass('new');

                    }

                }
                else {
                    $(".messages-pin").empty();
                }
                if ($(window).width() > 768) {
                    pinheightweb();
                }
            });
        } else {
            $(".messages-pin").empty();
            if ($(window).width() > 768) {
                pinheightweb();
            }
        }
    }
});
if ($(window).width() > 768) {
    pinheightweb();
}

function pinheightweb() {
    var pinheightweb = $(".messages-pin").height();
    pinheightweb = pinheightweb + 125;
    pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
    //alert(pinheightweb);
    $('.messages').css('height', pinheightweb);
}
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
    if (doc.exists) {
        db.collection("live_streams").doc(streamId)
            .onSnapshot({
                includeMetadataChanges: true
            }, (doc) => {
                var comments_status = doc.data().comments_status;
                if (comments_status == true) {
                    $('.web-msg-section').show();
                    $('#message').prop('disabled', false);
                } else {
                    $('.web-msg-section').hide();
                    $('#message').prop('disabled', true);
                }
            });
    }
    else {
        $('.web-msg-section').hide();
        $('#message').prop('disabled', true);
    }
});
function onlyAlphabets(name) {
    var regex = /^[a-zA-Z ]*$/;
    if (regex.test(name)) {
        return true;
    } else {
        return false;
    }
}
$(document).ready(function () {
    SLSsetHeight();
});
$(window).resize(function () {
    SLSsetHeight();
});

function SLSsetHeight() {
    let currentHeight = window.innerHeight;
    currentHeight = currentHeight - 1;
    $(".main-bg").height(currentHeight);
    if ($(window).width() < 768) {
        let pl = currentHeight - 62;
        $("#html-video-tag .video-player").height(pl);
        $("#black-screen").height(pl);
    }
}

function ask_que_count() {
    var docRef = db.collection("live_streams").doc(streamId);
    docRef.get().then((doc) => {
        var count = (doc.data().ask_que_count);
        var arrcount = count;
        arrcount++;
        db.collection("live_streams").doc(streamId).update({
            'ask_que_count': arrcount
        });
    });
}
$('#tabs-nav li:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first').show();
// Click function 
$('#tabs-nav li').click(function () {
    $('#tabs-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();
    $('.messages-pin').toggle();
    $('.SLS-panel-scroll-mcustom').toggle();
    $('.SLS-comment-post').toggle();
    var activeTab = $(this).find('a').attr('href');
    var activeId = $(this).find('a').attr('id');

    if (activeId == 'live-chat-tabs') {
        $('#Offers').hide();
        $('.SLS-comments-all').show();
        $('.SLS-comment-post').show();

    } else {
        $('.SLS-comments-all').hide();
        $('.SLS-comment-post').hide();
        $('#Offers').show();
    }
    //$(activeTab).fadeIn();  
    return false;
});
//offers panel  
$(".SLS-offer").click(function () {
    if ($(".SLS-offer-panel").is(":visible")) {
        $(".SLS-offer-panel-close").click();
    } else {
        if ($(window).width() < 768) {
            let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
            $('.SLS-offer-panel').css('bottom', pinheight);
            $(".SLS-products-panel-close").click();
            $(".SLS-comments-panel-close").click();
            $(".SLS-ask-panel-close").click();
            $(".SLS-share-panel-close").click();
            $(".SLS-offer-panel").show();
        }
        else {
            $(".SLS-comments-panel").show();
            setTimeout(() => {
                let transformVal = "translateY(0%)";
                $(".SLS-comments-panel").css("transform", transformVal);
            }, 10);
            /* var activeTab = $(this).find('a').attr('href');  
            $('#Offers').fadeIn(); */

            $('#tabs-nav li').removeClass('active');
            $('a[href="#Offers"]').parent().addClass('active');
            $('.tab-content').hide();
            $('.messages-pin').hide();
            $('.SLS-panel-scroll-mcustom').hide();
            $('.SLS-comment-post').hide();
            // $('.SLS-comments-all').hide();  
            $('#tabs-content #Offers').show();
        }

        setTimeout(() => {
            let transformVal = "translateY(0%)";
            $(".SLS-offer-panel").css("transform", transformVal);
        }, 10);
    }
});
$(".SLS-offer-panel-close").click(function () {
    let transformVal = "translateY(100%)";
    $(".SLS-offer-panel").css("transform", transformVal);
    setTimeout(() => {
        $(".SLS-offer-panel").hide();
    }, 500);
});
function rsvp_submit() {
    var stream_id = $('#stream_id').val();
    let user_code = generateString(20);
    var name = document.getElementById("rsvp-name").value;
    var email = document.getElementById("rsvp-email").value;
    var phone = document.getElementById("rsvp-phone").value;
    var checkbox = document.forms['rsvp-form']['agree'];
    var d = new Date();
    var current_d = d.getTime();

    if (name == '') {
        $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
        $('#rsvp-name').focus();
        return false;
    }
    else if (email == '') {
        $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
        $('#rsvp-email').focus();
        return false;
    }
    else if (phone == '') {
        $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
        $('#rsvp-phone').focus();
        return false;
    }
    else if (!checkbox.checked) {
        $('.error_msg_rsvp').html("You must agree with the terms and conditions").fadeIn().delay(3000).fadeOut();
        $('#checkbox').focus();
        return false;
    }
    else {
        // Set Item
        try {
            localStorage.setItem("user_id", user_code);
            localStorage.setItem("user_fname", name);
            localStorage.setItem("user_email", email);
            localStorage.setItem("user_phone", phone);
            localStorage.setItem("is_rsvp", 1);
        } catch (e) {
        }
        db.collection("messages").doc(stream_id).collection("users").doc(user_code).set({
            user_id: user_code,
            name: name,
            email: email,
            phone: phone,
            created_date: current_d,
            stream_id: stream_id,
            is_rsvp: 1
        });
        alert('Vastauspyyntiölomake tallennettu onnistuneesti');
        $('#exampleModal').modal('hide');
        $('.modal-backdrop').remove();
        $('.rsvp-button').hide();

    }
}