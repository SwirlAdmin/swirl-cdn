$(document).ready(function () {
    var end_time = $('#end_time').val();
    var is_schedule = $('#is_schedule').val();
    /* if (end_time != '0000-00-00 00:00:00') { */
        if ($(window).width() > 768) {
            setTimeout(() => {
                $(".all-tabs").show();
                $(".SLS-show-comments").click();
                $('.SLS-comments-all').html($('.SLS-comments-all').find('.new').get().reverse());
            }, 5000);
        }
        else {
            setTimeout(() => {
                $('.SLS-comments-all').html($('.SLS-comments-all').find('.new').get().reverse());
                
                isScrollBottom();
            }, 1000);
            var currentHeight_data_box = window.innerHeight - $(".video-box").height() - 17;
            $(".data-box").height(currentHeight_data_box);
        }
    /* }else{
        $('.video-box').addClass('without-after-element');
        var currentHeight_data_box = window.innerHeight - 320;
        setTimeout(() => {
          var currentHeight_data_box = window.innerHeight - $(".video-box").height() - 17;
          $(".data-box").height(currentHeight_data_box);
        }, 1000);
    } */
   
    SLSsetHeight();
});
$(window).resize(function () {
    SLSsetHeight();
});

function SLSsetHeight() {
    let currentHeight = window.innerHeight;
    $(".SLS-main-conatiner").height(currentHeight);
}
firebase.initializeApp({
    apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
    authDomain: 'getnatty-1547727043139.firebaseapp.com',
    projectId: 'getnatty-1547727043139',
    storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();
var player = videojs('livestreambro');
var streamId = $('#stream_id').val();

$('.SSV-heart-flaws-btn').on('click', function () {
    $('#swirl-heart-icon').hide();
    $('#swirl-heart-icon-mobile').hide();
    $('.fill-heart').show();
    SWIRLHeartFlaws();
    SWIRLHeartFlaws();
    SWIRLHeartFlaws();
});
function SWIRLHeartFlaws() {
    var b = Math.floor((Math.random() * 100) + 1);
    var d = ["flowOne", "flowTwo", "flowThree"];
    var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
    var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
    $('<div class="SWIRLheart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><span></span></div>').appendTo(".SWIRLhearts").css({
        animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
    });
    $(".part-" + b).show();
    setTimeout(function () {
        $(".part-" + b).remove()
    }, c * 900)
}

$(".SLS-products-panel").click(function () {
    if ($(".all-tabs").is(":visible")) {
        $(".all-tabs").hide();
    } else {
        $(".all-tabs").show();
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $('.product-tab-title').addClass('current');
        $("#tab-2").addClass('current');
    }
});

$(".SLS-show-comments").click(function () {
    $(this).find('svg').toggle();
    if ($(".SLS-comments-panel").is(":visible")) {
        $(".SLS-comments-panel").css("transform", "translateY(100%)");
        setTimeout(() => {
            $(".SLS-comments-panel").hide();
        }, 500);
    } else {
        $('#tab-1').show();
        $('.SLS-comments-panel').removeClass('h-100');
        $(".SLS-comments-panel").show();
        setTimeout(() => {
            $(".SLS-comments-panel").css("transform", "translateY(0%)");
        }, 10);
        isScrollBottom();
    }
});

$(".muteicon").click(function () {
    $('.tooltiptext').css('visibility', 'hidden');
    /* $(this).find("img").toggle(); */
    $(this).find('svg').toggle();
    var player = document.getElementById('livestreambro_html5_api');
    if (player.muted) {
        player.muted = false;
    }
    else {
        player.muted = true;
    }
});

var code = "+91";
$('.mobile-input').val(code);
$('.mobile-input').intlTelInput({
    autoHideDialCode: true,
    autoPlaceholder: "ON",
    dropdownContainer: document.body,
    formatOnDisplay: true,
    hiddenInput: "full_number",
    initialCountry: "auto",
    nationalMode: true,
    placeholderNumberType: "MOBILE",
    preferredCountries: ['in'],
    separateDialCode: true
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
/* sendEvent = function (sel, step) {
    $('.step-1').hide();
    $('.step-2').show();
} */
//live stream status
var streamId = $('#stream_id').val();
var is_defer = $('#is_defer').val();
var autoverify_popup = $('#autoverify_popup').val();
db.collection("live_streams").doc(streamId)
  .onSnapshot({
    includeMetadataChanges: true
  }, (doc) => {
    if(doc.exists == true)
    {
      var livestream = '';
      if (doc.data().is_recorded != '' || doc.data().is_recorded != 'undefined') {
        livestream = doc.data().is_recorded;
      }
      if (livestream == true) {
        $('#livestatus').text('RECORDED');
        $('#livestatus').addClass('recordingflag');
        //$('.live-status').html('<span class="recording-icon">RECORDED</span>');
      } else {
        $('#livestatus').text('LIVE');
        $('#livestatus').addClass('liveflag');
        if(autoverify_popup == 1)
        {
          $(".rsvp-button").click();
        }
        //$('.live-status').html('<span class="live-icon"> LIVE</span>');
      }
    }else{
      if(is_defer == 2)
      {
        $('#livestatus').text('UPCOMING');
        $('#livestatus').addClass('upcoming-flag');
        $('#viewcount').hide();
        //$('.live-status').html('<span class="live-icon upcoming-flag" style="background: gray;"> Upcoming</span>');
      }
    }
});
sendEvent = function(sel, step) 
{
  var base_url = $('#base_url').val();
  var name = document.getElementById("name").value;  
  var mobile = document.getElementById("mobile").value; 
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if(name == '')
  {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#name').focus();
    return false;
  }
  else if(name.length < 3){
    $('.err_user_cpassword').html("Please enter 3 latter.").fadeIn().delay(3000).fadeOut();
    $('#name').focus();
    return false;
  }
  else if (mobile == '') {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#mobile').focus();
    return false;
  }
  else if (mobile.length < 10 || mobile.length > 10) {
    $('.err_user_cpassword').html("Please Enter 10 Digit Mobile No.").fadeIn().delay(3000).fadeOut();
    $('#mobile').focus();
    return false;
  }
  else
  {
    var verify_name  = onlyAlphabets(name);
    if(verify_name == false){
      $('.err_user_cpassword').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }

    $('.close1').css('display','block');
    var mobile = $('#mobile').val();
    var message = Math.floor(1000 + Math.random() * 9000);
    $('#otp_confirm').val(message);
    
    $.ajax({
      type: "POST",
      dataType : "json",
      url: base_url+"index.php/Live/send_otp",
      data: "mobile="+encodeURIComponent(mobile)+"&otp="+encodeURIComponent(message)+"&code="+encodeURIComponent(code),
      success: function(json)
      {

      }
    });
    $(sel).trigger('next.m.' + step);
  }
}
$('#close-popup-btn').click(function() { 
  $('.modal-backdrop').remove();
});
$('#close-popup-btn-1').click(function() { 
  $('.modal-backdrop').remove();
});
$('.askque-popup-icon').click(function() { 
  $('#askque-popup').modal('toggle');
});

function otpcheck()
{
  var stream_id = $('#stream_id').val();
  var otp = document.getElementById("otp").value;  
  var otp_confirm = document.getElementById("otp_confirm").value; 
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if(otp == otp_confirm)
  {
      $('#demo-modal-1').modal('toggle');
      var name = document.getElementById("name").value;  
      var mobile = document.getElementById("mobile").value;

      var d = new Date();
      var current_d = d.getTime();
      let user_code = generateString(20);
      console.log(user_code);
      db.collection("messages").doc(stream_id).collection("users").doc(user_code).set({
        user_id: user_code,
        country_code: code,
        name: name,
        phone:mobile,
        created_date:current_d,
        stream_id:stream_id
      });
      $('#user_id').val(user_code);
      $('#user_fname').val(name);
      $('#user_phone').val(mobile);
      // Set Item
      try{
        localStorage.setItem("user_id", user_code);
        localStorage.setItem("user_fname", name);
        localStorage.setItem("user_phone", mobile);  
      }catch(e){            
      }
      insertMessage();
      //$('.modal-backdrop').remove();
      $('.rsvp-button').hide();
    }
    else
    {
    $('.err_user_cpassword').html("OTP should be same.").fadeIn().delay(3000).fadeOut();
    $('#otp').focus();
    return false;
  }
}

function otpcheck_without_sp(e) {
  if(e == 0)
  {
    var name = document.getElementById("name").value;  
    if(name=='')
    {
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else if(name.length < 3){
      $('.error_msg').html("Please enter 3 latter.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else{
      var verify_name  = onlyAlphabets(name);
      if(verify_name == false){
        $('.error_msg').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
        $('#name').focus();
        return false;
      }
      $('#demo-modal-1').modal('toggle');
      var streamId = $('#stream_id').val();
      var name = document.getElementById("name").value;  
      var d = new Date();
      var current_d = d.getTime();
      let user_code = generateString(20);
      db.collection("messages").doc(streamId).collection("users").doc(user_code).set({
        user_id: user_code,
        name: name,
        created_date:current_d,
        stream_id:streamId
      });
      $('#user_id').val(user_code);
      $('#user_fname').val(name);
      // Set Item
      try{
        localStorage.setItem("user_id", user_code);
        localStorage.setItem("user_fname", name);
      }catch(e){            
      }
      insertMessage();
     //$('.modal-backdrop').remove();
    }
  }
  else{
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    if (name == '') {
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else if(name.length < 3){
      $('.error_msg').html("Please enter 3 latter.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else if (mobile == '') {
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#mobile').focus();
      return false;
    }
    else if (mobile.length < 10 || mobile.length > 10) {
      $('.error_msg').html("Please Enter 10 Digit Mobile No.").fadeIn().delay(3000).fadeOut();
      $('#mobile').focus();
      return false;
    }
    else 
    {
      var verify_name = onlyAlphabets(name);
      if (verify_name == false) {
        $('.error_msg').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
        $('#name').focus();
        return false;
      }
      var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
      $('#demo-modal-1').modal('toggle');
      //$('.modal-backdrop').remove();
      var name = document.getElementById("name").value;
      var mobile_num = document.getElementById("mobile").value;
      if (mobile_num == '') {
        var mobile = '';
      }
      else {
        var mobile = mobile_num;
      }
      //get stream id
      var streamId = $('#stream_id').val();
      var d = new Date();
      var current_d = d.getTime();
      let user_code = generateString(20);
      code = (code != undefined) ? code : '';
      db.collection("messages").doc(streamId).collection("users").doc(user_code).set({
        user_id: user_code,
        country_code: code,
        name: name,
        phone: mobile,
        created_date: current_d,
        stream_id: streamId
      });
      $('#user_id').val(user_code);
      $('#user_fname').val(name);
      $('#user_phone').val(mobile);
      $('#country_code').val(code);
      // Set Item
      try {
        localStorage.setItem("user_id", user_code);
        localStorage.setItem("user_fname", name);
        localStorage.setItem("user_phone", mobile);
        localStorage.setItem("country_code", code);
      } catch (e) {
      }
      insertMessage();
      /* $('.modal-backdrop').remove(); */
    }
  }
}
function insertMessage() 
{
    var msg = $('.message-input').val();
    if (msg == '') {
      $('.message-input').focus();
      return false;
    }
    sendMessage();
}
function sendMessage(e) {
    var user_id = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var d = new Date();
    var current_d = d.getTime();
    var message = document.getElementById("SLS-comment").value;
    
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
    $('.message-input').val(null);
    $('.message-input-mobile').val(null);
    $('.collapsable').css('display', 'none');
    if ($(window).width() < 768) {
      $('.action-bar').css('display', 'table-cell');
  
     // $(".SLS-show-comments").click();
    }
    
    $('.message-textbox-div').css('width', '50%');
    $('.message-textbox-div').css('padding-right', '0px');
    
}
$('.rsvp-button').click(function () {
  var user_id = $('#user_id').val();
  if (user_id != '') {
    $('#demo-modal-1').modal('hide');
  }
  else {
    $('#demo-modal-1').modal('show');
    $('.close1').css('display', 'none');
  }
});
var end_time = $('#end_time').val();
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
  if (localStorage.getItem("country_code") != null) {
    res4 = localStorage.getItem("country_code");
    $('#country_code').val(res4);
  }
} catch (e) { }
var user_id = $('#user_id').val(); 
if (user_id != '') {  
  $('.rsvp-button').hide(); 
} 
else {  
  $('.rsvp-button').show(); 
}
$(window).on('keydown', function (e) {
    if (e.which == 13) {
      var user_id = $('#user_id').val();
      if (user_id != '') {
        $('#demo-modal-1').modal('hide');
        insertMessage();
      }
      else {
        $('#demo-modal-1').modal('show');
        $('.close1').css('display', 'none');
      }
      return false;
    }
});
$(document).ready(function () {
    
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        if (tab_id == 'tab-1') {
            $('.all-tabs').removeClass('h-100');
            if ($(window).width() < 768)
            {
              $('.SLS-comments-panel').addClass('h-100');
            }
            pinheight();
        }
        else 
        {
          $('.all-tabs').addClass('h-100');
        }
        //alert(tab_id);
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
})
/* screen.addEventListener("orientationchange", () => {
  alert(screen.orientation);
  console.log(`The orientation of the screen is: ${screen.orientation}`);
}); */
function openFullscreen() {
    document.body.requestFullscreen();
    screen.orientation.lock("landscape");
    /* let currentWidth = window.innerWidth;
    alert(currentWidth); */

}
function closeFullscreen() {
    screen.orientation.lock("portrait");
}

function closeFullscreen() { document.exitFullscreen(); }
/* function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
} */

var streamId = $('#stream_id').val();
var comments_limit = $('#comments_limit').val();
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "desc").limit(comments_limit)
    .onSnapshot((snapshot) => {
        size = snapshot.size;
        snapshot.docChanges().forEach((change) => {

            if (change.doc.data().flag === '1') {
                if (change.type === "removed") {
                    $('#message-' + change.doc.id).remove();
                }
                else {
                    //get designer id
                    var des_id = $('#designer_id').val();
                    var des_id = $('#designer_id').val();
                    var time = convertMsToTime(change.doc.data().created_time);
                    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                    if (change.doc.data().from == des_id) {
                        var brand_img = $('#brand_logo').val();
                        var changecolor = 'col-change';
                        var fillcolor = 'fillcolor';
                        var brand_time = 'brand-time';
                        var brand_logo = ' <img src="' + brand_img + '" alt="Brand logo" title="' + change.doc.data().name + '" />';
                    }
                    else {
                        var changecolor = '';
                        var fillcolor = 'user-comments';
                        var brand_time = '';
                        var brand_logo = '<i class="fas fa-user-circle" style="font-size:30px"></i>';
                    }
                    if (isValidUrl(change.doc.data().message) == true) {
                        var string_link = urlify(change.doc.data().message);

                        $('<div id="message-' + change.doc.id + '" class="new"><div class="' + fillcolor + ' msgcontent-div"><div class="icon">' + brand_logo + '</div><div class="msg-content"><p>' + change.doc.data().name + ' <span class="time ' + brand_time + '">' + time + '</span></p><p>' + string_link + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new');

                        /* $('<div id="message-' + change.doc.id + '" class="new"><div class="' + fillcolor + ' msgcontent-div" style="margin: 5px 0px;width: 100%;"><div class="icon" style="display: table-cell;padding-top: 5px;">' + brand_logo + '</div><div class="msg-content" style="width: 100%;display: table-cell;vertical-align: top;"><p style="font-weight: bold;text-transform: capitalize; margin-bottom: 0px;font-size: 15px;">' + change.doc.data().name + '<span class="time ' + brand_time + '">' + time + '</span></p><p>' + string_link + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new'); */
                    }
                    else {

                        $('<div id="message-' + change.doc.id + '" class="new"><div class="' + fillcolor + ' msgcontent-div"><div class="icon">' + brand_logo + '</div><div class="msg-content"><p>' + change.doc.data().name + ' <span class="time ' + brand_time + '">' + time + '</span></p><p>' + change.doc.data().message + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new');
                    }
                }
            }
            setTimeout(function () {
                var docRef = db.collection("messages").doc(streamId).collection("messages").doc(change.doc.id).update({
                    flag: '1'
                });
            }, 5000);
        });
        isScrollBottom();
    });
function isScrollBottom() 
{
    $('.SLS-comments-all').animate({
        scrollTop: $('.SLS-comments-all').get(0).scrollHeight
    }, 0);
}
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
    if (doc.exists) {
        // pin Comments
        var pin = doc.data().pin_comment_id;
        if (pin != '' && pin != undefined) {
            var docRef = db.collection("messages").doc(streamId).collection("messages").doc(pin);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    $(".messages-pin").empty();
                    $(".messages-pin-mobile").empty();
                    var brand_img = $('#brand_logo').val();
                    var brand_logo = ' <img src="' + brand_img + '" alt="Brand logo" title="' + doc.data().name + '" />';
                    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                    var res = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                    if (isValidUrl(doc.data().message) == true) {
                        var string_link = urlify(doc.data().message);

                        $('<div id="message-' + doc.id + '" class="new"><div class="pin-main-div"><div class="icon pin-user-pic">' + brand_logo + '</div><div class="msg-content pin-msg-content"><p>' + doc.data().name + '</p><p>' + string_link + '</p></div><div class="pin-main-icon"><span class="pinicon"><i class="icon-pushpin"></i></span></div></div>').appendTo($('.messages-pin')).addClass('new');
                        if ($(window).width() < 768) 
                        {
                            var pinheightweb = $(".messages-pin").height();
                            //alert(pinheightweb);
                            pinheightweb = 110 +  pinheightweb;
                            pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
                            $('.SLS-comments-all').css('height',pinheightweb);
                        }
                    }
                    else {
                        $('<div id="message-' + doc.id + '" class="new"><div class="pin-main-div"><div class="icon pin-user-pic">' + brand_logo + '</div><div class="msg-content pin-msg-content"><p>' + doc.data().name + ' </p><p>' + doc.data().message + '</p></div><div class="pin-main-icon"><span class="pinicon"><i class="icon-pushpin"></i></span></div></div></div>').appendTo($('.messages-pin')).addClass('new');

                        if ($(window).width() < 768) 
                        {
                            var pinheightweb = $(".messages-pin").height();
                            //alert(pinheightweb);
                            pinheightweb = 110 +  pinheightweb;
                            pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
                            $('.SLS-comments-all').css('height',pinheightweb);
                        }
                    }
                    
                }
                else {
                    $(".messages-pin").empty();
                    $(".messages-pin-mobile").empty();
                    if ($(window).width() < 768) 
                    {
                        var pinheightweb = 100;
                        pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
                        $('.SLS-comments-all').css('height',pinheightweb);
                    }
                }

            });
        } else {
            $(".messages-pin").empty();
            if ($(window).width() < 768) 
            {
                var pinheightweb = 100;
                pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
                $('.SLS-comments-all').css('height',pinheightweb);
            }
        }
        
        //product updates
        if(doc.data().is_live == true)
        { 
            var base_url = $('#base_url').val();
            var productsid = $('#product_ids').val();
            var brand_id = $('#designer_id').val();
            var star_products = $('#star_products').val();
            setInterval(function () {
                $.ajax({
                type: "POST",
                dataType: "json",
                url: base_url + "index.php/Live/otmanyproductlist",
                data: "stream_id=" + encodeURIComponent(streamId) + "&productIds=" + encodeURIComponent(productsid) + "&star_products=" + encodeURIComponent(star_products),
                beforeSend: function () {
                },
                success: function (json) {
                    console.log(json);
                    if (json['status_code'] == '1') 
                    {
                        $("#product_count").text(json['data']['product_count']);
                        $('.SLS-added-products-static').hide();
                        $('.SLS-added-products-dynamic').empty();
                        if (json['data']['product_count'] != '0') 
                        {
                            if(json['data']['is_product_price'] == '0'){
                                var is_product_price_class = 'mb-2';
                                var is_product_price_display = 'd-none';
                            }
                            else{
                                var is_product_price_class = '';
                                var is_product_price_display = 'd-block';
                            }
                            for (var k = 0; k < json['data']['product'].length; k++) 
                            {
                                var link = json['data']['product'][k]['link'];
                                var discount_price = '';
                                if(json['data']['product'][k]['is_star'] == 1)
                                {
                                    var is_star = 'starproduct';
                                    var is_star_class = 'inline';
                                }
                                else{
                                    var is_star = '';
                                    var is_star_class = 'd-none';
                                }
                                if(json['data']['product'][k]['product_sell_price'] != json['data']['product'][k]['product_price'])
                                {
                                    var discount_price = '<s class="pl-2 cl-red">'+json['data']['currencysymbols']+' '+json['data']['product'][k]['product_price']+'</s> ';
                                }

                                newRowAdd = 
                                '<div class="d-flex align-items-start SLS-product-tile '+ is_star + '" id="pro-detail-' + json['data']['product'][k]['product_id'] + '">'+
                                '<div class="SLS-product-image">'+
                                '<img src="' + json['data']['product'][k]['product_img_url'] + '" alt="Product Image" title="Product Image">'+
                                '</div>'+
                                '<div class="SLS-product-content">'+
                                '<p class="m-0 '+ is_product_price_class + '" title="' + json['data']['product'][k]['product_title'] + '">' + json['data']['product'][k]['product_title'] + '</p>'+
                                '<label class="m-0 mb-2 '+ is_product_price_display + '">' + json['data']['currencysymbols'] + ' ' + json['data']['product'][k]['product_sell_price'] + '<del>'+discount_price+'</del> </label>'+
                                '<button type="button" class="SLS-product-buynow-btn" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + link + '" data-desid="' + brand_id + '">' + json['data']['btn2_title'] + '</button>'+
                                '</div>'+
                                '<div class="'+ is_star_class +'"><img class="star-animation setproduct" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/star-animation.gif" class=""></div>'+
                                '</div>';
                                $('.SLS-added-products-dynamic').append(newRowAdd);
                            }
                        }
                        productsid = json['data']['product_ids'];
                        star_products = json['data']['star_products'];
                    }
                }
                });
            }, 60000);
        }
    }
});

function pinheight() 
{
  setTimeout(() => {
    var pinheightweb = $(".messages-pin").height();
    pinheightweb = 110 +  pinheightweb;
    pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
    $('.SLS-comments-all').css('height',pinheightweb);
  }, 100);
}
function convertMsToTime(milliseconds) {
    var date = new Date(milliseconds);
    timezone = date.toString();
    var date1 = new Date(timezone);
    localtime = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return localtime;
}
const isValidUrl = string => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}
function urlify(text) {
    var startIndex = text.indexOf("https");
    if (startIndex !== -1) {
        var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

        return text.replace(urlRegex, function (url) {

            var pattern = /^((http|https|ftp):\/\/)/;

            if (!pattern.test(url)) {
                url = "https://" + url;
            }
            return '<a style="word-break:break-all" href="' + url + '" target="_blank">' + url + '</a>';
        })
    } else {
        return text;
    }
}

$('body').on('click', '.SLS-product-buynow-btn', function() {
    var product_id = $(this).attr("data-proid");
    var designer_id = $(this).attr("data-desid");
    var pro_title = $(this).attr("data-protitle");
    var pro_img = $(this).attr("data-proimg");
    var pro_redirection = $(this).attr("data-redirection");
  
    var user_id = $('#user_id').val();
    var name = $("#user_fname").val();
    var mobile = $("#user_phone").val();
    var country_code = $("#country_code").val();
    var d = new Date();
    var current_d = d.getTime();
    let user_code = generateString(20);
  
    db.collection("messages").doc(streamId).collection("buy_now").doc(user_code).set({
      user_id: user_id,
      country_code: country_code,
      name: name,
      phone: mobile,
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
      $('.SLS-product-buynow-btn').click(function () {
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
});
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
var fbButton = document.getElementById('fb-share-button');
var url = $('#copy-text').val();
fbButton.addEventListener('click', function () {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
    'facebook-share-dialog',
    'width=800,height=600'
  );
  return false;
});
function copy_text() 
{
  var copyText = document.getElementById("copy-text");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  $('[data-toggle="tooltip"]').tooltip();
  $("#btn-copy").html("Copied");
}
function onlyAlphabets(name) {
    var regex = /^[a-zA-Z ]*$/;
    if (regex.test(name)) {
      return true;
    } else {
      return false;
    }
}

function ask_que_submit(b, c) 
{
    var base_url = $('#base_url').val();
    var a = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var swirls_id = '';
    var msg = document.getElementById("inquiry_text_ask").value;
    if (msg == '') {
      $('.err_ask').css('color','red');
      $('.err_ask').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#inquiry_text_ask').focus();
      return false;
    }
    else if (a == '') {
      $('#askque-popup').modal('hide');
      //$('.modal-backdrop').remove();
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
            $('.err_ask').css('color','#20B641');
            $('.err_ask').html(json.message).fadeIn().delay(3000).fadeOut();
          
            $('#inquiry_text_ask').val('');
            //$('#askque-popup').modal('hide');
          //alert(json.message);
            ask_que_count();
           // $('.modal').modal('hide') // closes all active pop ups.
            //$('.modal-backdrop').remove();
        }
      });
    }
}
function ask_que_submit_mobile(b, c) 
{
    var base_url = $('#base_url').val();
    var a = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var swirls_id = '';
    var msg = document.getElementById("inquiry_text_ask_mobile").value;
    if (msg == '') {
      $('.err_ask_mobile').css('color','red');
      $('.err_ask_mobile').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#inquiry_text_ask_mobile').focus();
      return false;
    }
    else if (a == '') {
      $('#askque-popup').modal('hide');
      $('#inquiry_text_ask_mobile').val(msg);
      $('#demo-modal-1').modal('show');
    }
    else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url + "index.php/Live/ask_que_details",
        data: "user_id=" + encodeURIComponent(a) + "&user_fname=" + encodeURIComponent(user_fname) + "&user_phone=" + encodeURIComponent(user_phone) + "&designer_id=" + encodeURIComponent(b) + "&msg=" + encodeURIComponent(msg) + "&live_id=" + encodeURIComponent(c) + "&swirls_id=" + encodeURIComponent(swirls_id),
        success: function (json) {
            $('.err_ask_mobile').css('color','#20B641');
            $('.err_ask_mobile').html(json.message).fadeIn().delay(3000).fadeOut();
          //$('#askque-popup').modal('hide');
            $('#inquiry_text_ask_mobile').val('');
          //alert(json.message);
            ask_que_count();
        }
      });
    }
}
function ask_que_count() 
{
    var docRef = db.collection("live_streams").doc(streamId);
    docRef.get().then((doc) => 
    {
      var count = (doc.data().ask_que_count);
      var arrcount = count;
      arrcount++;
      db.collection("live_streams").doc(streamId).update({
        'ask_que_count' : arrcount
      });
    });
}
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
        var is_defer = $('#is_defer').val();
        if(is_defer == 2)
        {
            $('#black-screen').hide();
            $('#remote-media').show();
            $('.muteicon').show();
            $('.share-div').show();
            $('.live-status').show();
            $('.SL-schedule-timer').show();
        }
        else
        {
            $('#remote-media').hide();
            $('#black-screen').show();
            $('.live-status').hide();
        }
        $('.product-img-list').hide();
        //$('.SLS-control-panel').hide();

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
                console.log('auto-refresh response' + response);
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
var end_time = $('#end_time').val();
var is_defer = $('#is_defer').val();
$('#black-screen').hide();
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) {
    $('#black-screen').hide();
    $('.flag').show();
    $('#remote-media').show();
    
    if (doc.data().is_paused == true) {
      $('#remote-media').hide();
      $('#black-screen').show();
      $('#stream_span').html('paused & will resume shortly');
    }
  }
  else {
    if (end_time == '0000-00-00 00:00:00') 
    {
        $('#black-screen').show();
        $('.flag').hide();
        $('#remote-media').hide();
        $('.top-bar .text-left').hide();
        $('.top-bar .muteicon svg').hide();
        $('.top-bar .share-icon svg').hide();
        $('.close-icon svg path').css('fill','#000');
        $('.action-bar').hide();
        $('.SLS-panel-scroll').hide();
        
        if ($(window).width() > 768) {
          $('#tabs').hide();
          $('#tab-1').addClass('banner-tab-hide');
        }
        var currentHeight_data_box = window.innerHeight - $("#black-screen").height() - 17;
        $(".data-box").height(currentHeight_data_box);
       /*  $("#SLS-comment").prop("disabled", true);
        $('.message-submit').prop('disabled', true); */
    }
    else {
      $('#remote-media').show();
      $('#black-screen').hide();
    }
  }
});

window.addEventListener('load', doFirst, false);
function doFirst() 
{
    barSize = $("#defaultBar").width();
    $('#defaultBar').css('width', barSize);
    //console.log(barSize);
    myVideo = document.getElementById('livestreambro_html5_api');
    playButton = document.getElementById('playButton');
    icon = document.getElementById('play-pause-icon');
    defaultBar = document.getElementById('defaultBar');
    progressBar = document.getElementById('progressBar');
  
    playButton.addEventListener('click', playOrPause, false);
    defaultBar.addEventListener('click', clickedBar, false);
  
    $(".current-time").text(time_format(0));
    $(".duration").text(time_format(player.duration()));
    updateBar = setInterval(update, 500);
}
function playOrPause() 
{
    if (!myVideo.paused && !myVideo.ended) {
      myVideo.pause();
      icon.className = "fa fa-play";
      window.clearInterval(updateBar);
    } else {
      myVideo.play();
      icon.className = "fa fa-pause";
      updateBar = setInterval(update, 500);
    }
}
function clickedBar(e) 
{
    if (!myVideo.paused && !myVideo.ended) {
      //var mouseX = e.pageX - $(this).offset().left;
      barSize = $("#defaultBar").width();
      $('#defaultBar').css('width', barSize);
      var mouseX = e.pageX - $('#defaultBar').offset().left;
      var newtime = mouseX * myVideo.duration / barSize;
      myVideo.currentTime = newtime;
      progressBar.style.width = mouseX + 'px';
    }
}
function update() 
{
    if (!myVideo.ended) {
      barSize = $("#defaultBar").width();
        $('#defaultBar').css('width', barSize);
      var size = parseInt(myVideo.currentTime * barSize / myVideo.duration);
      progressBar.style.width = size + 'px';
    } else {
      progressBar.style.width = '0px';
      /* playButton.innerHTML = 'Play'; */
       icon.className = "fa fa-pause";
      window.clearInterval(updateBar);
    }
}
player.on("timeupdate", function () {
    $(".current-time").text(time_format(player.currentTime()));
    $(".duration").text(time_format(player.duration()));
});
function time_format(seconds) 
{
    var m = Math.floor(seconds / 60) < 10
      ? "0" + Math.floor(seconds / 60)
      : Math.floor(seconds / 60);
    var s = Math.floor(seconds - m * 60) < 10
      ? "0" + Math.floor(seconds - m * 60)
      : Math.floor(seconds - m * 60);
    return m + ":" + s;
}
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists)
  {
    db.collection("live_streams").doc(streamId)
    .onSnapshot({
      includeMetadataChanges: true
    }, (doc) => {
    var comments_status = doc.data().comments_status; 
    
    if(comments_status == true)
    {
      $('#Search').show();
    } else {
      $('#Search').hide();
    }
    var fire_status = doc.data().fire_status; 
    if(fire_status == true)
    {
      $('#gif').show();
    } else {
      $('#gif').hide();
    }
    var ivs_viewer_count = doc.data().ivs_viewer_count; 
    if(ivs_viewer_count != undefined || ivs_viewer_count != null){
      result = nFormatter(ivs_viewer_count);
      $('#view-count').text(result);
    }else{
      $('#view-count').text(0);
    }
    });
  }
  else{
    $('.SLS-comment-form').hide();
    $('.message-textbox-div').css('display','none !important');
    $('#gif').hide();
  }
});

function nFormatter(num) {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

