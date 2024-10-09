$(document).ready(function () {
  var end_time = $('#end_time').val();
  var is_schedule = $('#is_schedule').val();
  var is_defer = $('#is_defer').val();
  var productsid = $('#product_ids').val();
  if(productsid == '')
  {
    $('.showproduct-icon').removeClass('d-inline');
    $('.showproduct-icon').hide();
    $('.product-tab-title').hide();
    $('.product-tab-title').removeClass('current');
    $('#tab-2').removeClass('current');
    $('#tabs .mobile-tab').addClass('current');
    $('#tab-1').addClass('current');
    $('#tab-2').hide();
  }
  if ($(window).width() > 768) {
    performLargeScreenActions();
  }
  else {
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
  if ($(window).width() < 768) {
      $('.SLS-comments-panel').addClass('h-100');
      $('.SLS-comments-panel').removeAttr('style');
  }
}
function performLargeScreenActions() {
  setTimeout(() => {
    if (!$(".SLS-poll-panel").is(":visible")) {
      $(".all-tabs").show();
    }
    if (is_defer !== '2') {
      $(".SLS-show-comments").click();
      var bottomarrow = $(".messages-pin").height();
      bottomarrow = bottomarrow + 55;
      $('#myBtn').css('bottom', bottomarrow + 'px');
    }
    reverseCommentsOrder();
  }, 5000);
}
function performSmallScreenActions() {
  setTimeout(() => {
    reverseCommentsOrder();
    isScrollBottom();
  }, 1000);
  /* console.log(window.innerHeight);
  console.log($(".video-box").height()); */
  const currentHeightDataBox = window.innerHeight - $(".video-box").height() - 17;
  $(".data-box").height(currentHeightDataBox);

  $('#livestreambro').on('loadeddata', function() 
  {
    var videoHeight = $(this).height();
    const currentHeightDataBox = window.innerHeight - videoHeight - 17;
    $(".data-box").height(currentHeightDataBox);
    //console.log('Video Height:', currentHeightDataBox);
  });
}

function reverseCommentsOrder() {
  $('.SLS-comments-all').html($('.SLS-comments-all').find('.new').get().reverse());
}

$(window).on("orientationchange", function () {
  if ((window.orientation == 90 && $(window).width() < 780) || (window.orientation == -90 && $(window).width() < 780)) // Landscape
  {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      let video = jQuery('video')[0];
      video.webkitEnterFullscreen();
    }
  }
});
var hlsUrl = $('#live_stream_url').val();
var player = document.getElementById('livestreambro');
var hls = new Hls();
var startTime = $('#shareTime').val();

if (Hls.isSupported()) {

  if (startTime != '') {
    hls.config.startPosition = parseFloat(startTime);
  }
  hls.loadSource(hlsUrl);
  hls.attachMedia(player);
   hls.on(Hls.Events.MANIFEST_PARSED, function () {
    player.play();
  });

 
  hls.on(Hls.Events.FRAG_LOADED, function () {
    $(".current-time").text(time_format(player.currentTime));
    $(".duration").text(time_format(player.duration));
  });
  if (typeof mux !== 'undefined') {
    mux.monitor(player, {
      debug: false,
      hlsjs: hls,
      Hls: Hls,
      data: {
        env_key: 'k3lqqflvf5vkmhq7ct2pi1f0p', // required
        player_name: 'Main Player', // any arbitrary string you want to use to identify this player
        player_init_time: window.muxPlayerInitTime // ex: 1451606400000
      }
    });
  }
}else if (player.canPlayType('application/vnd.apple.mpegurl')) {
  player.src = hlsUrl;
  player.addEventListener('loadedmetadata', function () {
    player.play();
  });
} else {
  console.error('HLS.js is not supported, and the browser does not support native HLS playback.');
}

$(".play-button").click(function() {
  if (player.paused) {
      player.play();
      $('.play-button').hide();
  }
});

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
        //'heart_like': heart_like
        'heart_like': firebase.firestore.FieldValue.increment(1)
      });
    });
  }
  var docRef = db.collection("live_streams").doc(streamId);
  docRef.get().then((doc) => {
    var click_heart_like = (doc.data().click_heart_like);
    click_heart_like = (click_heart_like == undefined) ? 0 : click_heart_like;
    click_heart_like = click_heart_like + 1;
    db.collection("live_streams").doc(streamId).update({
      //'click_heart_like': click_heart_like
      'click_heart_like': firebase.firestore.FieldValue.increment(1)
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
    $('.all-tabs').addClass('h-100');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $('.product-tab-title').addClass('current');
    $("#tab-2").addClass('current');
  }
  //$('#tab-5').addClass('current');
});

$(".SLS-show-comments").click(function () {
  $(this).find('img').toggle();
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
  $(this).find('img').toggle();
  var player = document.getElementById('livestreambro');
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
function insertMessage() {
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
    flag: '1'
  });
  $('.message-input').val(null);
  $('.message-input-mobile').val(null);
  $('.collapsable').css('display', 'none');
  if ($(window).width() < 768) {
    $('.action-bar').css('display', 'table-cell');
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
    if (tab_id == 'tab-1' || tab_id == 'tab-5') {
      $('.all-tabs').removeClass('h-100');
      if ($(window).width() < 768) {
        $('.SLS-comments-panel').addClass('h-100');
      }
      if(tab_id == 'tab-5')
      {
        $('#tab-1').removeAttr("style");
        $('.SLS-poll-panel').css('display','block');
      }
      pinheight();
    }
    else {
      $('.all-tabs').addClass('h-100');
    }
    //alert(tab_id);
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
  // Pause event
  $(player).on("pause", function() {
    $('.play-button').show();
  });
  if (player.paused) {
    $('.play-button').show();
  }
}
function closeFullscreen() {
  screen.orientation.lock("portrait");
}

function closeFullscreen() { document.exitFullscreen(); }

var streamId = $('#stream_id').val();
var comments_limit = $('#comments_limit').val();
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "desc").limit(comments_limit)
  .onSnapshot((snapshot) => {
    size = snapshot.size;
    snapshot.docChanges().forEach((change) => {
      if (change.type === "removed") {
          $('#message-' + change.doc.id).remove();
      }
      else {
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
        }
        else {
          $('<div id="message-' + change.doc.id + '" class="new"><div class="' + fillcolor + ' msgcontent-div"><div class="icon">' + brand_logo + '</div><div class="msg-content"><p>' + change.doc.data().name + ' <span class="time ' + brand_time + '">' + time + '</span></p><p>' + change.doc.data().message + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new');
        }
      }
    });
    if ($('#myBtn').css("display") == 'none') {
      topFunction();
    } else {
      var scrollableDiv = $(".SLS-comments-all")[0];
      var hasVerticalScrollbar = scrollableDiv.scrollHeight > scrollableDiv.clientHeight;
      if (hasVerticalScrollbar) {
        $('#myBtn').css('display', 'block');
      } else {
        $('#myBtn').css('display', 'none');
      }
    }
  });

let mybutton = document.getElementById("myBtn");

function topFunction() {
  $('.SLS-comments-all').animate({
    scrollTop: $('.SLS-comments-all').get(0).scrollHeight
  }, 0);
}

function isScrollBottom() {
  var element = $('.SLS-comments-all');
  return element.scrollTop() + element.innerHeight() >= element[0].scrollHeight - 20;
}

$('.SLS-comments-all').scroll(function () {
  if (isScrollBottom()) {
    $('#myBtn').css('display', 'none');
  } else {
    $('#myBtn').css('display', 'block');
  }
});
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
            if ($(window).width() < 768) {
              var pinheightweb = $(".messages-pin").height();
              //alert(pinheightweb);
              pinheightweb = 110 + pinheightweb;
              pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
              $('.SLS-comments-all').css('height', pinheightweb);
              var bottomarrow = $(".messages-pin").height();
              bottomarrow = bottomarrow + 75;
              $('#myBtn').css('bottom', bottomarrow + 'px');
            } else {
             
              var bottomarrow = $(".messages-pin").height();
              bottomarrow = bottomarrow + 55;
              $('#myBtn').css('bottom', bottomarrow + 'px');
            }
          }
          else {
            $('<div id="message-' + doc.id + '" class="new"><div class="pin-main-div"><div class="icon pin-user-pic">' + brand_logo + '</div><div class="msg-content pin-msg-content"><p>' + doc.data().name + ' </p><p>' + doc.data().message + '</p></div><div class="pin-main-icon"><span class="pinicon"><i class="icon-pushpin"></i></span></div></div></div>').appendTo($('.messages-pin')).addClass('new');

            if ($(window).width() < 768) {
              var pinheightweb = $(".messages-pin").height();
              //alert(pinheightweb);
              pinheightweb = 110 + pinheightweb;
              pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
              $('.SLS-comments-all').css('height', pinheightweb);
              var bottomarrow = $(".messages-pin").height();
              bottomarrow = bottomarrow + 75;
              $('#myBtn').css('bottom', bottomarrow + 'px');
            } else {
              var bottomarrow = $(".messages-pin").height();
              bottomarrow = bottomarrow + 55;
              $('#myBtn').css('bottom', bottomarrow + 'px');
            }
          }

        }
        else {
          $(".messages-pin").empty();
          $(".messages-pin-mobile").empty();
          if ($(window).width() < 768) {
            var pinheightweb = 100;
            pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
            $('.SLS-comments-all').css('height', pinheightweb);
            var bottomarrow = 72;
            $('#myBtn').css('bottom', bottomarrow + 'px');
          }
          else {
            bottomarrow = 55;
            $('#myBtn').css('bottom', bottomarrow + 'px');
          }
        }

      });
    } else {
      $(".messages-pin").empty();
      if ($(window).width() < 768) {
        var pinheightweb = 100;
        pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
        $('.SLS-comments-all').css('height', pinheightweb);
        var bottomarrow = 72;
        $('#myBtn').css('bottom', bottomarrow + 'px');
      }
      else {
        bottomarrow = 55;
        $('#myBtn').css('bottom', bottomarrow + 'px');
      }
    }
  }
});

function pinheight() {
  setTimeout(() => {
    var pinheightweb = $(".messages-pin").height();
    pinheightweb = 110 + pinheightweb;
    pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
    $('.SLS-comments-all').css('height', pinheightweb);
    var bottomarrow = $(".messages-pin").height();
    bottomarrow = bottomarrow + 75;
    $('#myBtn').css('bottom', bottomarrow + 'px');
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

$('body').on('click', '.SLS-product-buynow-btn', function () {
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
  var page = getUrlParameter('page');
  if (page == 'listing') {
    sendTimeSL();
  }
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
function copy_text() {
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
            /* var page = getUrlParameter('page');
            if (page == 'listing') {
              sendRefreshSL();
            } */
            window.location = window.location.href;
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
        $('.top-bar .muteicon svg').hide();
        $('.top-bar .share-icon svg').hide();
        $('.close-icon svg path').css('fill', '#000');
        var currentHeight_data_box = window.innerHeight - $("#black-screen").height() - 17;
        $(".data-box").height(currentHeight_data_box);
        if ($(window).width() > 768) {
          $('#tab-1').addClass('banner-tab-hide');
          $('.SLS-product-tile').css('border', '1px solid #0000004D');
          $('.offer-style p').css('border', '1px solid #0000004D');
        }
        $('.swirl-heart-shaped').hide();
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
  myVideo = document.getElementById('livestreambro');
  playButton = document.getElementById('playButton');
  icon = document.getElementById('play-pause-icon');
  defaultBar = document.getElementById('defaultBar');
  progressBar = document.getElementById('progressBar');

  playButton.addEventListener('click', playOrPause, false);
  defaultBar.addEventListener('click', clickedBar, false);

  $(".current-time").text(time_format(0));
  $(".duration").text(time_format(player.duration));
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
/* player.on("timeupdate", function () {
  $(".current-time").text(time_format(player.currentTime()));
  $(".duration").text(time_format(player.duration()));
}); */
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

//poll questions
$(document).ready(function () {
  var end_time = $('#end_time').val();
  if ((end_time == '0000-00-00 00:00:00')) {
    var database = $('#database').val();
    const bookRefid = db.collection("live_streams").doc(streamId);
    bookRefid.get().then((doc) => {

      if (doc.exists) {
        var base_url = $('#base_url').val();
        db.collection("polls_questions_stream").doc(streamId).onSnapshot((doc) => {
          if (doc.exists) {
            var poll_question_id = doc.data().poll_question_id;
            console.log(poll_question_id);
            if (poll_question_id != '' && poll_question_id != undefined) {
              if (localStorage.getItem("poll_question_answer") != poll_question_id) {
                $('ul.tabs li').removeClass('current');
                $('.tab-content').removeClass('current');
                $(".poll-tab").css("visibility", "initial");
                $('.poll-tab').addClass('current');
                $('#tab-5').addClass('current');
                $('.all-tabs').removeClass('h-100');

                if ($(window).width() > 600) {
                  if ($(".all-tabs").is(":visible")) {
                    $(".all-tabs").hide();
                  }
                }
                $('#tab-1').removeAttr("style");
                $(".SLS-poll-panel").show();
                setTimeout(() => {
                  let transformVal = "translateY(0%)";
                  $(".SLS-poll-panel").css("transform", transformVal);
                }, 10);
                
                $.ajax({
                  type: "POST",
                  dataType: "json",
                  url: base_url + "index.php/Live/fetch_questions",
                  data: "stream_id=" + encodeURIComponent(streamId) + "&poll_question_id=" + encodeURIComponent(poll_question_id) + "&database=" + encodeURIComponent(database),
                  success: function (json) {
                    console.log(json);
                    $('#add-poll').empty();
                    numbersString = json.data['options'];

                    queAdd =
                      '<div class="poll-header">' +
                      '<p class="d-inline share-panel-title" style="font-weight: 500;">' + json.data['question_title'] + '</p>' +
                      '</div>' +
                      '<div class="share-btn text-center mcq">' +
                      '<input type="hidden" id="poll-question-number" value="' + json.data['questions_id'] + '">' +
                      '<input type="hidden" id="poll-question-title" value="' + json.data['question_title'] + '">';
                    var numbersArray = numbersString.split(',');
                    $.each(numbersArray, function (index, value) {
                      index = index + 1;
                      queAdd +=
                        '<label class="mcq-answer">' +
                        '<input type="radio" name ="question1" id="answer' + index + '" value="' + value + '" onchange="switchbtn(' + index + ')">' +
                        '<div class="highlight highlight-answer' + index + '"></div>' +
                        '<p class="options-text" id="answer-text-' + index + '">' + value + '</p>' +
                        '<span class="feedback feedback-answer' + index + '"></span>' +
                        '</label>';
                    });
                    queAdd +=
                    '</div>'+
                    '<div class="poll-scroll-text">'+
                    '<span>scroll down</span>'+
                    '<i class="fas fa-chevron-down"></i>'+
                    '</div>'+
                    '<div class="poll-bottom-div">'+
                    '<div class="poll-time-progressbar"><div id="progressBarPoll" style="width: 1px;"></div></div>'+
                    '<div class="bottom-action">'+
                    '<div class="total-votes-div" style="display:none">'+
                    '<img class="poll-users" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/webp/user-vote.webp">'+
                    '<span class="total_votes"><span id="totalVotes">0</span> votes</span>'+
                    '</div>'+
                    '<div class="d-inline">'+
                    '<span class="dot"></span>'+
                    '<span class="question-timer">00:'+json.data['countdown_time']+'</span>'+
                    '</div>'+
                    '<div class="d-inline">'+
                    '<span class="float-right skip-txt SLS-poll-panel-close">Skip</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                    $('#add-poll').append(queAdd);
                    $('.mcq').on('scroll', handleScroll);
                    startTimer(json.data['countdown_time']);
                  }
                });
              } else {
                $(".poll-tab").css("visibility", "hidden");
              }
            } else {
              $(".poll-tab").css("visibility", "hidden");
              let transformVal = "translateY(100%)";
              $(".SLS-poll-panel").css("transform", transformVal);
              setTimeout(() => {
                $(".SLS-poll-panel").hide();
              }, 500);

            }
          }
          else
          {
            $(".poll-tab").css("visibility", "hidden");
          }
        });
      }
    });
  }
  else{
    $(".poll-tab").css("visibility", "hidden");
  }

  function startTimer(countdown_time) {
    var countDownDate = new Date().getTime() + (countdown_time * 1000); // Set the countdown time in seconds
    var totalWidth = $(".poll-time-progressbar").width(); // Get the total width of the progress bar
    var timer = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        // Calculate the remaining seconds
        var seconds = Math.floor(distance / 1000);

        // Display the timer in seconds with "sec"
        $(".question-timer").text(seconds + " sec");

        // Calculate the current width of the progress bar
        var elapsed = (countdown_time * 1000 - distance) / (countdown_time * 1000);
        var currentWidth = totalWidth * elapsed;
        $("#progressBarPoll").css("width", currentWidth + "px");
        if (distance < 0) {
          clearInterval(timer);
          $(".question-timer").text("0 sec");
          $("#progressBarPoll").css("width", totalWidth + "px");
          let transformVal = "translateY(100%)";
          $(".SLS-poll-panel").css("transform", transformVal);
          setTimeout(() => {
            $(".SLS-poll-panel").hide();
          }, 500);
          $(".poll-tab").css("visibility", "hidden");
          $('.product-tab-title').addClass('current');
          $('#tab-2').addClass('current');
          $('.all-tabs').addClass('h-100');
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
  }
  
  $('body').on('click', '.SLS-poll-panel-close', function () {
    let transformVal = "translateY(100%)";
    $(".SLS-poll-panel").css("transform", transformVal);
    setTimeout(() => {
      $(".SLS-poll-panel").hide();
    }, 500);
  });

  var lastScrollTop = 0;
  function handleScroll(event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
          // Downscroll
          $(".poll-scroll-text span").text("scroll up");
          $(".poll-scroll-text i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
      } else {
          // Upscroll
          $(".poll-scroll-text span").text("scroll down");
          $(".poll-scroll-text i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
      }
      lastScrollTop = st;
  }
});

function switchbtn(e) {
  var database = $('#database').val();
  var options_bc = $('#options_bc').val();
  var base_url = $('#base_url').val();
  var user_id = $('#user_id').val();
  var user_fname = $('#user_fname').val();
  var user_phone = $('#user_phone').val();
  var question = $('#poll-question-number').val();
  var question_title = $('#poll-question-title').val();
  var stream_id = $('#stream_id').val();
  if (user_id == '') {
    $('input[name="question1"]').prop("checked", false);
    $('#demo-modal-1').modal('show');
    $('.close1').css('display', 'none');
  }
  else {
    $('#demo-modal-1').modal('hide');
    var ans = $('#answer-text-' + e).text();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: base_url + "index.php/Live/question_answer",
      data: "user_id=" + encodeURIComponent(user_id) + "&user_fname=" + encodeURIComponent(user_fname) + "&user_phone=" + encodeURIComponent(user_phone) + "&question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(ans) + "&question_title=" + encodeURIComponent(question_title) + "&stream_id=" + encodeURIComponent(stream_id) + "&database=" + encodeURIComponent(database),
      success: function (json) {
        console.log(json);
        $("input:radio[name=question1]").attr('disabled', true);
        $('.total-votes-div').show();
        $('.total-votes-div').addClass('d-inline');
        $('.feedback').show();
        var numbersArray = json.data['percentage'];
        $('#totalVotes').text(json.data['total_votes']);
        $.each(numbersArray, function (index, value) {
          index = index + 1;
          var per = value + '%';
          $('.highlight-answer' + index).css('width', '0%');
          $(".highlight-answer" + index).animate({ width: per }, 1000);
          $('.highlight-answer' + index).css('background-color', options_bc);
          $('.feedback-answer' + index).text(per);
          localStorage.setItem("poll_question_answer", question);
          //console.log(value);
          if (value == 0) {
            $('#answer-text-' + index).addClass('options-text-add');
          }
          else {
            /* $('#answer-text-'+index).css('color','#fff'); */
          }
        });
      }
    });
  }
}
function sendTimeSL() {
  vdo = document.getElementById('livestreambro');
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

function executeCode() 
{
  var desId = $('#designer_id').val();
  var todayDate = new Date();
  var currentMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
  var currentYear = todayDate.getFullYear();

  if(desId == '19791' || desId == '23520' || desId == '19187' || desId == '18354')
  {
    if (localStorage.getItem('swirl_live_' + currentMonth + '_' + currentYear)) 
    {
      db.collection(desId +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            var users = db.collection(desId +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear);
            users.update({
              t_users: firebase.firestore.FieldValue.increment(1)
            });
        } else {
          db.collection(desId  +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear).set({
              t_users: 1,
              u_users: 1
            });
        }
      });
    } else {
        localStorage.setItem('swirl_live_' + currentMonth + '_' + currentYear, '1')
        db.collection(desId +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear).get().then((docSnapshot) => {
          if (docSnapshot.exists) {
              var users = db.collection(desId +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear);
              users.update({
                  u_users: firebase.firestore.FieldValue.increment(1),
                  t_users: firebase.firestore.FieldValue.increment(1)
              });
          } else {
            db.collection(desId +'_stream_users').doc('swirl_live_' + currentMonth + '_' + currentYear).set({
                  u_users: 1,
                  t_users:1
              });
          }
        });
    }
  }
}

// Delay execution by 5 seconds
setTimeout(executeCode, 5000);

function executeCode_onload() 
{
  var desId = $('#designer_id').val();
  var todayDate = new Date();
  var currentMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
  var currentYear = todayDate.getFullYear();

  if(desId == '19791' || desId == '23520' || desId == '19187' || desId == '18354')
  {
    if (localStorage.getItem('swirl_live_on_load_' + currentMonth + '_' + currentYear)) 
    {
      db.collection(desId +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            var users = db.collection(desId +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear);
            users.update({
              t_users: firebase.firestore.FieldValue.increment(1)
            });
        } else {
          db.collection(desId  +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear).set({
              t_users: 1,
              u_users: 1
            });
        }
      });
    } else {
        localStorage.setItem('swirl_live_on_load_' + currentMonth + '_' + currentYear, '1')
        db.collection(desId +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear).get().then((docSnapshot) => {
          if (docSnapshot.exists) {
              var users = db.collection(desId +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear);
              users.update({
                  u_users: firebase.firestore.FieldValue.increment(1),
                  t_users: firebase.firestore.FieldValue.increment(1)
              });
          } else {
            db.collection(desId +'_stream_users_onload').doc('swirl_live_' + currentMonth + '_' + currentYear).set({
                  u_users: 1,
                  t_users:1
              });
          }
        });
    }
  }
}

executeCode_onload();

/* db.collection("live_streams").doc(streamId)
  .onSnapshot({
    includeMetadataChanges: true
  }, (doc) => {
    if (doc.exists == true) {
      var product_status = '';
      if (doc.data().product_status != '' || doc.data().product_status != 'undefined') {
        product_status = doc.data().product_status;
      }
      if (product_status == true) 
      {
        console.log(product_status);
      }
    }
  }); */

var productsid = $('#product_ids').val();
if(productsid == '')
{
  const streamDocRef = db.collection("live_streams").doc(streamId);
  let hasBeenCalled = false;
  streamDocRef.onSnapshot({ includeMetadataChanges: true }, (doc) => {
    if (doc.exists) {
      const productStatus = doc.data().product_status;
      if (productStatus === true && !hasBeenCalled) {
        console.log(productStatus);
        hasBeenCalled = true;
        productupdates();
      }
    }
  });
}

  
function productupdates()
{
  var database = $('#database').val();
  var base_url = $('#base_url').val();
  var brand_id = $('#designer_id').val();
  $.ajax({
    type: "POST",
    dataType: "json",
    url: base_url + "index.php/Live/productupdates_vivo",
    data: "stream_id=" + encodeURIComponent(streamId) + '&database=' + encodeURIComponent(database),
    beforeSend: function () {
    },
    success: function (json) {
      console.log(json);
      if (json['status_code'] == '1') {
        $("#product_count").text(json['data']['product_count']);
        $('#product_ids').val(json['data']['product_ids']);
        $('.SLS-added-products-static').hide();
        $('.SLS-added-products-dynamic').empty();
       
        for (var k = 0; k < json['data']['product'].length; k++) {
          var link = json['data']['product'][k]['link'];
          var discount_price = '';
          if (json['data']['product_count'] != '0') {

            if(json['data']['is_product_price'] == '0'){
              var is_product_price_class = 'mb-2';
              var is_product_price_display = 'd-none';
            }
            else{
              var is_product_price_class = '';
              var is_product_price_display = 'd-block';
            }
            if(json['data']['product'][k]['is_star'] == 1){
              var is_star = 'starproduct';
              var is_star_class = 'inline';
            }
            else{
              var is_star = '';
              var is_star_class = 'd-none';
            }
            
            if(json['data']['product'][k]['product_sell_price'] != json['data']['product'][k]['product_price'])
            {
              var discount_price = '<s class="pl-2 cl-red">'+json['data']['currencysymbols']+''+json['data']['product'][k]['product_price']+'</s> ';
            }
            $('.SLS-added-products-dynamic').append('<div class="d-flex align-items-start SLS-product-tile '+ is_star + '"  id="pro-detail-' + json['data']['product'][k]['product_id'] + '"><div class="SLS-product-image"><img src="' + json['data']['product'][k]['product_img_url'] + '" alt="Product Image" title="Product Image" /></div><div class="SLS-product-content"><p class="m-0 '+ is_product_price_class + '" title="' + json['data']['product'][k]['product_title'] + '">' + json['data']['product'][k]['product_title'] + '</p><label class="m-0 mb-2 '+ is_product_price_display + '">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '<del>'+discount_price+'</del></label><button type="button" class="SLS-product-buynow-btn" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + link + '" data-desid="' + brand_id + '">' + json['data']['cta_btn'] + '</button> </div><div class="'+ is_star_class +'"><img class="star-animation setproduct" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/star-animation.gif"></div></div>');
          }
        }
        $('.showproduct-icon').addClass('d-inline');
        $('.product-tab-title').show();
        $('.product-tab-title').addClass('current');
        $('#tab-2').addClass('current');
        $('#tabs .mobile-tab').removeClass('current');
        $('#tab-1').removeClass('current');
        $('#tab-2').show();
         if ($(window).width() > 768) {
          $('.SLS-added-products-dynamic').css({
            'height': '365px',
            'padding-right': '5px',
            'overflow-y': 'auto'
          });
        }
      }
    }
  });
  console.log('run');
}