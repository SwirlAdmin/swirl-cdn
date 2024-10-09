$(document).ready(function () {
  if ($(window).width() < 768) {
    performSmallScreenActions();
  }
  SLSsetHeight();
});
$(window).resize(function () {
  SLSsetHeight();
});

function SLSsetHeight() {
  let currentHeight = window.innerHeight;
  $(".SLS-main-conatiner").height(currentHeight);
}

function performSmallScreenActions() {
  const currentHeightDataBox = window.innerHeight - $(".video-box").height() - 17;
  $(".data-box").height(currentHeightDataBox);
}


$(window).on("orientationchange", function () {
  if ((window.orientation == 90 && $(window).width() < 780) || (window.orientation == -90 && $(window).width() < 780)) // Landscape
  {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    /* if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      let video = jQuery('video')[0];
      video.webkitEnterFullscreen();
    } */
  }
});


var player = videojs('livestreambro');
var hlsUrl = $('#live_stream_url').val();
var playerhls = document.getElementById('livestreambro_html5_api');
var hls = new Hls();
var startTime = $('#shareTime').val();

if (Hls.isSupported()) {
  // Configure HLS.js with start position
  console.log(startTime);
  if (startTime != '') {
    hls.config.startPosition = parseFloat(startTime);
  }
  hls.loadSource(hlsUrl);
  hls.attachMedia(playerhls);
  // Handle HLS.js events
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    playerhls.play();
  });
} else if (playerhls.canPlayType('application/vnd.apple.mpegurl')) {
  playerhls.src = hlsUrl;
  playerhls.addEventListener('loadedmetadata', function () {
    playerhls.play();
  });
} else {
  console.error('HLS.js is not supported, and the browser does not support native HLS playback.');
}

firebase.initializeApp({
  apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
  authDomain: 'getnatty-1547727043139.firebaseapp.com',
  projectId: 'getnatty-1547727043139',
  storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();
var streamId = $('#stream_id').val();

$('.SSV-heart-flaws-btn').on('click', function () {
  $('.swirl-heart-icon').hide();
  $('#swirl-heart-icon-mobile').hide();
  $('.fill-heart').show();
  SWIRLHeartFlaws();
  SWIRLHeartFlaws();
  SWIRLHeartFlaws();
  if (localStorage.getItem("heart_like") == null) {
    value = 1;
    var docRef = db.collection("live_streams").doc(streamId);
    docRef.get().then((doc) => {
      var heart_like = (doc.data().heart_like);
      heart_like = (heart_like == undefined) ? 0 : heart_like;
      heart_like = heart_like + 1;
      localStorage.setItem("heart_like", heart_like);
      db.collection("live_streams").doc(streamId).update({
        'heart_like': heart_like
      });
    });
  }
  var docRef = db.collection("live_streams").doc(streamId);
  docRef.get().then((doc) => {
    var click_heart_like = (doc.data().click_heart_like);
    click_heart_like = (click_heart_like == undefined) ? 0 : click_heart_like;
    click_heart_like = click_heart_like + 1;
    db.collection("live_streams").doc(streamId).update({
      'click_heart_like': click_heart_like
    });
  });
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
    if ($(window).width() > 600) {
      $(".SLS-poll-panel").hide();
    }
    $(".all-tabs").show();
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $('.product-tab-title').addClass('current');
    $("#tab-2").addClass('current');
  }
  $('#tab-5').addClass('current');
});

$(".muteicon").click(function () {
  $('.tooltiptext').css('visibility', 'hidden');
  $(this).find('img').toggle();
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

//live stream status
var streamId = $('#stream_id').val();
var is_defer = $('#is_defer').val();
var autoverify_popup = $('#autoverify_popup').val();
db.collection("live_streams").doc(streamId)
  .onSnapshot({
    includeMetadataChanges: true
  }, (doc) => {
    if (doc.exists == true) {
      var livestream = '';
      if (doc.data().is_recorded != '' || doc.data().is_recorded != 'undefined') {
        livestream = doc.data().is_recorded;
      }
      if (livestream == true) {
        $('#livestatus').text('RECORDED');
        $('#livestatus').addClass('recordingflag');
      } else {
        $('#livestatus').text('LIVE');
        $('#livestatus').addClass('liveflag');
        if (autoverify_popup == 1) {
          $(".rsvp-button").click();
        }
      }
    } else {
      if (is_defer == 2) {
        $('#livestatus').text('UPCOMING');
        $('#livestatus').addClass('upcoming-flag');
        $('#viewcount').hide();
      }
    }
  });
function backtoedit(sel, step) {
  $(sel).trigger('next.m.' + step);
  $('.resend-link').hide();
}

$('#mobile').on('keydown', function (e) {
  if (e.which == 13) {
    sendEvent('#demo-modal-1', 2);
  }
});
$('#otp').on('keydown', function (e) {
  if (e.which == 13) {
    otpcheck();
  }
});

sendEvent = function (sel, step) {
  $('.err_user_cpassword').css('color', 'red');
  var base_url = $('#base_url').val();
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if (name == '') {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#name').focus();
    return false;
  }
  else if (name.length < 3) {
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
  else {
    var verify_name = onlyAlphabets(name);
    if (verify_name == false) {
      $('.err_user_cpassword').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }

    $('.close1').css('display', 'block');
    var mobile = $('#mobile').val();
    var message = Math.floor(1000 + Math.random() * 9000);
    $('#otp_confirm').val(message);

    $.ajax({
      type: "POST",
      dataType: "json",
      url: base_url + "index.php/Live/send_otp",
      data: "mobile=" + encodeURIComponent(mobile) + "&otp=" + encodeURIComponent(message) + "&code=" + encodeURIComponent(code),
      success: function (json) {

      }
    });
    $(sel).trigger('next.m.' + step);
    $('.resend-link').show();
  }
}
resendotp = function (sel, step) {
  $('.err_user_cpassword').css('color', 'red');
  var base_url = $('#base_url').val();
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if (name == '') {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#name').focus();
    return false;
  }
  else if (name.length < 3) {
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
  else {
    var verify_name = onlyAlphabets(name);
    if (verify_name == false) {
      $('.err_user_cpassword').html("Name should be alphabets only").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }

    $('.close1').css('display', 'block');
    var mobile = $('#mobile').val();
    var message = Math.floor(1000 + Math.random() * 9000);
    $('#otp_confirm').val(message);
    $('.err_user_cpassword').css('color', '#20B641');
    $('.err_user_cpassword').html("Resend otp successfully.").fadeIn().delay(3000).fadeOut();

    $.ajax({
      type: "POST",
      dataType: "json",
      url: base_url + "index.php/Live/send_otp",
      data: "mobile=" + encodeURIComponent(mobile) + "&otp=" + encodeURIComponent(message) + "&code=" + encodeURIComponent(code),
      success: function (json) {

      }
    });
    $(sel).trigger('next.m.' + step);
    $('.resend-link').show();
  }
}

$('#close-popup-btn').click(function () {
  $('.modal-backdrop').remove();
});
$('#close-popup-btn-1').click(function () {
  $('.modal-backdrop').remove();
});
$('.askque-popup-icon').click(function () {
  $('#askque-popup').modal('toggle');
});

function otpcheck() {
  $('.err_user_cpassword').css('color', 'red');
  var stream_id = $('#stream_id').val();
  var otp = document.getElementById("otp").value;
  var otp_confirm = document.getElementById("otp_confirm").value;
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if (otp == otp_confirm) {
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
      phone: mobile,
      created_date: current_d,
      stream_id: stream_id
    });
    $('#user_id').val(user_code);
    $('#user_fname').val(name);
    $('#user_phone').val(mobile);
    // Set Item
    try {
      localStorage.setItem("user_id", user_code);
      localStorage.setItem("user_fname", name);
      localStorage.setItem("user_phone", mobile);
    } catch (e) {
    }
    insertMessage();
    $('.rsvp-button').hide();
  }
  else {
    $('.err_user_cpassword').html("OTP should be same.").fadeIn().delay(3000).fadeOut();
    $('#otp').focus();
    return false;
  }
}

function otpcheck_without_sp(e) {
  if (e == 0) {
    var name = document.getElementById("name").value;
    if (name == '') {
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else if (name.length < 3) {
      $('.error_msg').html("Please enter 3 latter.").fadeIn().delay(3000).fadeOut();
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
      var streamId = $('#stream_id').val();
      var name = document.getElementById("name").value;
      var d = new Date();
      var current_d = d.getTime();
      let user_code = generateString(20);
      db.collection("messages").doc(streamId).collection("users").doc(user_code).set({
        user_id: user_code,
        name: name,
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
    }
  }
  else {
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    if (name == '') {
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#name').focus();
      return false;
    }
    else if (name.length < 3) {
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
    else {
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
    }
  }
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
  try {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fname");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_email");
  } catch (e) { }
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
    }
    else {
      var user_id = generateString(6);
      $('#user_id').val(user_id);
      $('#user_fname').val(user_id);
      try{
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user_fname", user_id);
      }catch(e){            
      }
    }
    return false;
  }
});

$(document).ready(function () {

  $('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');
    $('.all-tabs').addClass('h-100');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  })
})
function openFullscreen() {

  const parent = document.getElementById('parent');
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    /*  alert('android'); */
    document.body.requestFullscreen();
    screen.orientation.lock("landscape");
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    /*  alert('ios'); */
    let video = jQuery('video')[0];
    video.webkitEnterFullscreen();
  }

}
function closeFullscreen() {
  screen.orientation.lock("portrait");
}

function closeFullscreen() { document.exitFullscreen(); }

var streamId = $('#stream_id').val();

$('body').on('click', '.SLS-product-buynow-btn', function () 
{
  var pro_title = $(this).attr("data-protitle");
  var product_id = $(this).attr("data-productid");
  var blueid = $("#blueid").val();
  if(blueid != ''){
      Swal.fire({
        position: "bottom",
        title: "Book a test drive?",
        text: "Do you wish to book a test drive of "+ pro_title +" ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          //firebase entry
          var user_id = $('#user_id').val();
          var name = $("#user_fname").val();
          var utm_source = $("#utm_source").val();
          var d = new Date();
          var current_d = d.getTime();
          let user_code = generateString(20);
          var designer_id = $(this).attr("data-desid");
          var pro_title = $(this).attr("data-protitle");
          var pro_img = $(this).attr("data-proimg");
          var pro_redirection = $(this).attr("data-redirection");
          db.collection("messages").doc(streamId).collection("buy_now").doc(user_code).set({
            blue_id:blueid,
            user_id: user_id,
            name: name,
            created_date: current_d,
            stream_id: streamId,
            product_id: product_id,
            product_title: pro_title,
            product_image: pro_img,
            product_url: pro_redirection,
            designer_id: designer_id,
            utm: utm_source
          });
          Swal.fire({
            position: "bottom",
            title: "Submitted!",
            text: "Thanks for your test drive request! A BYD representative will reach out to you soon.",
            confirmButtonText: "Close",
            imageUrl: "https://swirl-assets.s3.ap-south-1.amazonaws.com/brand_logo/blue_reward_squircle.png",
            imageWidth: 80,
            imageHeight: 80,
            imageAlt: "logo"
          });
        }
      }); 
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
function onlyAlphabets(name) {
  var regex = /^[a-zA-Z ]*$/;
  if (regex.test(name)) {
    return true;
  } else {
    return false;
  }
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
    if (is_defer == 2) {
      $('#black-screen').hide();
      $('#remote-media').show();
      $('.muteicon').show();
      $('.share-div').show();
      $('.live-status').show();
      $('.SL-schedule-timer').show();
    }
    else {
      $('#remote-media').hide();
      $('#black-screen').show();
      $('.live-status').hide();
    }
    $('.product-img-list').hide();
    //$('.SLS-control-panel').hide();

    var mix_live_stream_id = streamId;
    if (doc.exists) {
      db.collection("live_streams").doc(streamId)
        .onSnapshot({
          includeMetadataChanges: true
        }, (doc) => {
          var mux_status = doc.data().mux_status;
          if (mux_status == true) {
            var page = getUrlParameter('page');
            if (page == 'listing') {
              sendRefreshSL();
            }
            window.location = window.location.href + '?live=true';
          }
        });
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
    if (end_time == '0000-00-00 00:00:00') {
      $(".poll-tab").css("visibility", "hidden");
      $('#black-screen').show();
      if (is_defer != 2) {
        $('.flag').hide();
        $('.top-bar .text-left').hide();
        $('.top-bar .muteicon').hide();
        $('.top-bar .share-icon svg').hide();
        $('.close-icon svg path').css('fill', '#000');
        var currentHeight_data_box = window.innerHeight - $("#black-screen").height() - 17;
        $(".data-box").height(currentHeight_data_box);
        if ($(window).width() > 768) {
          $('#tab-1').addClass('banner-tab-hide');
          $('.SLS-product-tile').css('border', '1px solid #0000004D');
          $('.offer-style p').css('border', '1px solid #0000004D');
        }
        $('.SSV-heart-flaws-btn').hide();
        $('.fullscreen-icon').hide();
        $('.action-bar').hide();
      }
      else {
        $('.SSV-heart-flaws-btn svg').hide();
        $('.askque-popup-icon svg').hide();
        $('.SLS-show-comments .comment-off').hide();
        $('.SLS-show-comments .comment-on').hide();
        $('.SLS-show-comments').css('display', 'none !important');
        $('.askque-popup-icon').css('display', 'none !important');
        $('.SLS-show-comments').removeClass('pr-2');
        $('.askque-popup-icon').removeClass('pr-2');
        $('.showproduct-icon').removeClass('pr-2');

        $('.close-icon svg path').css('fill', '#fff');
        var currentHeight_data_box = window.innerHeight - $("#black-screen").height();
        currentHeight_data_box = currentHeight_data_box + 70;
        $(".data-box").height(currentHeight_data_box);
      }
      $('#remote-media').hide();
    }
    else {
      $('#remote-media').show();
      $('#black-screen').hide();
    }
  }
});

window.addEventListener('load', doFirst, false);
function doFirst() {
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
function playOrPause() {
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
function clickedBar(e) {
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
function update() {
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
function time_format(seconds) {
  var m = Math.floor(seconds / 60) < 10
    ? "0" + Math.floor(seconds / 60)
    : Math.floor(seconds / 60);
  var s = Math.floor(seconds - m * 60) < 10
    ? "0" + Math.floor(seconds - m * 60)
    : Math.floor(seconds - m * 60);
  return m + ":" + s;
}
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) {
    db.collection("live_streams").doc(streamId)
      .onSnapshot({
        includeMetadataChanges: true
      }, (doc) => {
        var comments_status = doc.data().comments_status;

        if (comments_status == true) {
          $('#Search').show();
        } else {
          $('#Search').hide();
        }
        var fire_status = doc.data().fire_status;
        if (fire_status == true) {
          $('#gif').show();
        } else {
          $('#gif').hide();
        }
        var ivs_viewer_count = doc.data().ivs_viewer_count;
        if (ivs_viewer_count != undefined || ivs_viewer_count != null) {
          result = nFormatter(ivs_viewer_count);
          $('#view-count').text(result);
        } else {
          $('#view-count').text(0);
        }
      });
  }
  else {
    $('.SLS-comment-form').hide();
    $('.message-textbox-div').css('display', 'none !important');
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

var is_defer = $('#is_defer').val();
if (is_defer == 2) {
  //schedule timer
  var id = 'undefined';
  var starting_time = $('#starting_time').val();
  var countDownDate = [];
  var x = [];
  var now = [];
  var distance = [];
  var days = [];
  var hours = [];
  var minutes = [];
  var seconds = [];
  // countDownDate[scheduled.id] = new Date("2022-10-17 20:25:00").getTime();
  countDownDate[id] = new Date((starting_time).replaceAll('-', '/')).getTime();

  x[id] = setInterval(function () {
    // Get today's date and time
    now[id] = new Date().getTime();

    // Find the distance between now and the count down date
    distance[id] = countDownDate[id] - now[id];

    // Time calculations for days, hours, minutes and seconds
    days[id] = Math.floor(distance[id] / (1000 * 60 * 60 * 24));
    hours[id] = Math.floor((distance[id] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes[id] = Math.floor((distance[id] % (1000 * 60 * 60)) / (1000 * 60));
    seconds[id] = Math.floor((distance[id] % (1000 * 60)) / 1000);
    // Output the result in an element with id="demo"
    document.getElementById(`${id}day`).innerHTML = String(days[id]).padStart(2, '0');
    document.getElementById(`${id}hour`).innerHTML = String(hours[id]).padStart(2, '0');
    document.getElementById(`${id}min`).innerHTML = String(minutes[id]).padStart(2, '0');
    document.getElementById(`${id}sec`).innerHTML = String(seconds[id]).padStart(2, '0');

    // If the count down is over, write some text 

    if (distance[id] < 0) {
      clearInterval(x[id]);
      $('.SL-schedule-timer').hide();
      document.getElementById(`${id}day`).innerHTML = '00';
      document.getElementById(`${id}hour`).innerHTML = '00';
      document.getElementById(`${id}min`).innerHTML = '00';
      document.getElementById(`${id}sec`).innerHTML = '00';
    }
  }, 1000);
}

db.collection("live_streams").doc(streamId)
  .onSnapshot({
    includeMetadataChanges: true
  }, (doc) => {
    if (doc.exists == true) {
      var click_heart_like = doc.data().click_heart_like;
      if (click_heart_like != undefined) {
        SWIRLHeartFlaws();
        SWIRLHeartFlaws();
        SWIRLHeartFlaws();
      }
    }
});

function sendTimeSL() {
  vdo = document.getElementById('livestreambro_html5_api');
  parent.postMessage({
      action: 'updateStreamTime',
      data: Math.floor(end_time != '0000-00-00 00:00:00' ? vdo.currentTime : 0)
  }, "*"); // `*` on any domain
  //console.log(Math.floor(end_time != '0000-00-00 00:00:00' ? vdo.currentTime : 0));
}
function sendRefreshSL() {
  parent.postMessage({
    action: 'refreshStreamPage',
    data: true
  }, "*");  //  `*` on any domain
}
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

var blueid = $("#blueid").val();
var utm_source = $("#utm_source").val();
const user_ida = $('#user_id').val();
const nameaa = $("#user_fname").val();
const current_d = new Date().getTime();
const user_code = generateString(20);

const storedBlueId = localStorage.getItem("blue_id");
const storedStreamId = localStorage.getItem("stream_id");

if (storedBlueId !== blueid || storedStreamId !== streamId) {
  const blueRewardDataRef = db.collection("blue_reward_data").doc(streamId);
  
  const blueData = {
    blue_id: blueid,
    user_id: user_ida,
    name: nameaa,
    created_date: current_d,
    stream_id: streamId,
    utm: utm_source
  };
  
  // Reference to the 'blue_ids' subcollection
  const blueIdsCollectionRef = blueRewardDataRef.collection("blue_ids");
  
  // Add a new document to the 'blue_ids' subcollection
  blueIdsCollectionRef.add(blueData);
  
  localStorage.setItem('blue_id', blueid);
  localStorage.setItem('stream_id', streamId);
}

