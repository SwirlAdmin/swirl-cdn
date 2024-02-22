$(document).ready(function () {
  if ($(window).width() > 768) {
    $("#SWIRLhearts-mobile").hide();
    $("#SWIRLhearts-web").show();
    setTimeout(() => {
      $(".SLS-control-panel .SLS-show-products").click();
      $(".SLS-show-comments").click();
      $('.SLS-comments-all').html($('.SLS-comments-all').find('.new').get().reverse());
      pinheightweb(); 
    }, 5000);
  }
  else{  
    $("#SWIRLhearts-web").hide();
    $("#SWIRLhearts-mobile").show();
   /*  $('#tabs-nav').hide(); */ 
   var is_defer = $('#is_defer').val();
   if(is_defer != 2){
    setTimeout(() => { 
      //$(".SLS-show-comments").click();
    }, 5000);
    }
    $('#Offers').hide();  
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


var player = videojs('livestreambro');
var hlsUrl = $('#live_stream_url').val();
var playerhls = document.getElementById('livestreambro_html5_api');
var hls = new Hls();
var startTime = $('#shareTime').val();

if (Hls.isSupported()) 
{
    // Configure HLS.js with start position
    if(startTime != '')
    {
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

var actionbar_size = 56;
var end_time = $('#end_time').val();
var product_ids = $('#product_ids').val();
if ((end_time != '0000-00-00 00:00:00')) {
  var recordingcontrol_size = 36;
}
else{
  $('.messages-pin-mobile').css('bottom','56px');
  var recordingcontrol_size = 0;
}


function time_format(seconds) {
  var m = Math.floor(seconds / 60) < 10
    ? "0" + Math.floor(seconds / 60)
    : Math.floor(seconds / 60);
  var s = Math.floor(seconds - m * 60) < 10
    ? "0" + Math.floor(seconds - m * 60)
    : Math.floor(seconds - m * 60);
  return m + ":" + s;
}
function doFirst() {
  barSize = $("#defaultBar").width();
  $('#defaultBar').css('width', barSize);
  //console.log(barSize);
  myVideo = document.getElementById('livestreambro_html5_api');
  playButton = document.getElementById('playButton');
  playButton_mobile = document.getElementById('playButton-mobile');
  icon = document.getElementById('play-pause-icon');
  icon_mobile = document.getElementById('play-pause-icon-mobile');
  defaultBar = document.getElementById('defaultBar');
  progressBar = document.getElementById('progressBar');
  defaultBar_mobile = document.getElementById('defaultBar-mobile');
  progressBar_mobile = document.getElementById('progressBar-mobile');

  playButton.addEventListener('click', playOrPause, false);
  defaultBar.addEventListener('click', clickedBar, false);
  playButton_mobile.addEventListener('click', playOrPauseMobile, false);
  defaultBar_mobile.addEventListener('click', clickedBar_mobile, false);

  $(".current").text(time_format(0));
  $(".duration").text(time_format(player.duration()));
  updateBar = setInterval(update, 500);
  updateBar = setInterval(updateMobile, 500);
}

player.on("timeupdate", function () {
  $(".current").text(time_format(player.currentTime()));
  $(".duration").text(time_format(player.duration()));
});

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
function playOrPauseMobile() {
  if (!myVideo.paused && !myVideo.ended) {
      myVideo.pause();
      icon_mobile.className = "fa fa-play";
      window.clearInterval(updateBar);
  } else {
      myVideo.play();
      icon_mobile.className = "fa fa-pause";
      updateBar = setInterval(updateMobile, 500);
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
function updateMobile() {
  if (!myVideo.ended) {
      barSize = $("#defaultBar-mobile").width();
      $('#defaultBar-mobile').css('width', barSize);
      var size = parseInt(myVideo.currentTime * barSize / myVideo.duration);
      progressBar_mobile.style.width = size + 'px';
  } else {
      progressBar.style.width = '0px';
      icon_mobile.className = "fa fa-pause";
      window.clearInterval(updateBar);
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
function clickedBar_mobile(e) {
  if (!myVideo.paused && !myVideo.ended) {
      barSize = $("#defaultBar-mobile").width();
      $('#defaultBar-mobile').css('width', barSize);

      var mouseX = e.pageX - $('#defaultBar-mobile').offset().left;
      var newtime = mouseX * myVideo.duration / barSize;
      myVideo.currentTime = newtime;
      progressBar_mobile.style.width = mouseX + 'px';
  }
}
window.addEventListener('load', doFirst, false);

$(".message-input-mobile").keyup(function (e) {
  $('.collapsable').css('display', 'table-cell');
  $('.action-bar').css('display', 'none');
  $('.message-textbox-div').css('width', '90%');
  $('.message-textbox-div').css('padding-right', '5px');
});
$(".collapsable").click(function () {
  $('.collapsable').css('display', 'none');
  $('.action-bar').css('display', 'table-cell');
  $('.message-textbox-div').css('width', '50%');
  $('.message-textbox-div').css('padding-right', '0px');
});

$('.SSV-heart-flaws-btn').on('click', function () {
  /* var className = $('.SSV-heart-flaws-btn .notliked').attr('class');
  if(className != undefined)
  { */
  $('.swirl-heart-shaped .st0').css('fill','red');
  $('.swirl-heart-shaped .st0').css('stroke','red');
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

  /* }else{
      $('.swirl-heart-shaped').toggle();
      $('.swirl-heart-shaped').addClass('notliked');
  } */

});



function SWIRLHeartFlaws() {
  /* $('.swirl-heart-shaped').toggle(); */
  /* $('.swirl-heart-shaped').removeClass('notliked'); */
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

$(document).on('click touchstart', 'video', function() {
  if ($(window).width() < 768) {
    $(".SLS-products-panel-close").click();
    $(".SLS-comments-panel-close").click();
    $(".SLS-ask-panel-close").click();
    $(".SLS-share-panel-close").click();
    $(".SLS-offer-panel-close").click();
  }
});

$(".SLS-ask").click(function () {
  if ($(".SLS-ask-panel").is(":visible")) {
    $(".SLS-ask-panel-close").click();
  } else {
    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-ask-panel').css('bottom', pinheight);
      $(".SLS-products-panel-close").click();
      $(".SLS-comments-panel-close").click();
      $(".SLS-offer-panel-close").click();
      
    }
    $(".SLS-poll-panel-close").click();
    $(".SLS-share-panel-close").click();
    $(".SLS-ask-panel").show();
    setTimeout(() => {
      let transformVal = "translateY(0%)";
      $(".SLS-ask-panel").css("transform", transformVal);
    }, 10);
  }
});
$(".SLS-ask-panel-close").click(function () {
  let transformVal = "translateY(100%)";
  $(".SLS-ask-panel").css("transform", transformVal);
  setTimeout(() => {
    $(".SLS-ask-panel").hide();
  }, 500);
});


$(".SLS-share").click(function () {
  if ($(".SLS-share-panel").is(":visible")) {
    $(".SLS-share-panel-close").click();
  } else {
    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-share-panel').css('bottom', pinheight);
      $(".SLS-products-panel-close").click();
      $(".SLS-comments-panel-close").click();
      $(".SLS-offer-panel-close").click();
    }
    else{
      if(is_defer == 2)
      {
        $('.SLS-share-panel').css('bottom', '0px');
      }
    }
    $(".SLS-poll-panel-close").click();
    $(".SLS-ask-panel-close").click();
    $(".SLS-share-panel").show();
    setTimeout(() => {
      let transformVal = "translateY(0%)";
      $(".SLS-share-panel").css("transform", transformVal);
    }, 10);
  }
});
$(".SLS-share-panel-close").click(function () {
  let transformVal = "translateY(100%)";
  $(".SLS-share-panel").css("transform", transformVal);
  setTimeout(() => {
    $(".SLS-share-panel").hide();
  }, 500);
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
      $(".SLS-poll-panel-close").click();
    } 
    else{ 
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
      $('.tabs').addClass('h-100');
      $('#tabs-content').addClass('h-100');
      $('#Offers').addClass('h-100');
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


$(".SLS-show-products").click(function () {
  if ($(".SLS-products-panel").is(":visible")) {
    $(".SLS-products-panel-close").click();
  } else {

    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-products-panel').css('bottom', pinheight);
      $(".SLS-comments-panel-close").click();
      $(".SLS-share-panel-close").click();
      $(".SLS-ask-panel-close").click();
      $(".SLS-offer-panel-close").click();
      $(".SLS-poll-panel-close").click();
    }
    $(".SLS-products-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-products-panel").css("transform", transformVal);
    }, 10);
    let panelheight = $(window).width() > 768 ? "100%" : "50%";
    $('.SLS-products-panel').css('height', panelheight);
    if(product_ids == '')
    {
      if ($(window).width() < 768){
        $('.SLS-products-panel').css('height','18%');
      }
    }
    $('.SLS-product-tile').css('border-bottom', '1px solid #c7c7c7');
    $('.SLS-added-products .SLS-product-tile').removeClass('hide');
  }
});

$(".SLS-products-panel-close").click(function () {
  let transformVal =
    $(window).width() > 768 ? "translateX(100%)" : "translateY(100%)";
  $(".SLS-products-panel").css("transform", transformVal);
  setTimeout(() => {
    $(".SLS-products-panel").hide();
  }, 500);
});
$(".showcase-products").click(function () {
  if ($(window).width() < 768) {
    if ($(".SLS-products-panel").is(":visible")) {
      $(".SLS-products-panel-close").click();
    } else {
      var product_id = $(this).attr("data-proid");

      if ($(window).width() < 768) {
        let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
        $('.SLS-products-panel').css('bottom', pinheight);
        $(".SLS-comments-panel-close").click();
        $(".SLS-share-panel-close").click();
        $(".SLS-ask-panel-close").click();
        $(".SLS-offer-panel-close").click();
      }
      $(".SLS-products-panel").show();
      setTimeout(() => {
        let transformVal =
          $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
        $(".SLS-products-panel").css("transform", transformVal);
      }, 10);
      $('.SLS-products-panel').css('height', '30%');
      $('.SLS-product-tile').css('border-bottom', 'unset');
      $('.SLS-added-products .SLS-product-tile').addClass('hide');
      $('#pro-detail-' + product_id).removeClass('hide');
    }
  }else{
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
  }
});

function showcase_products(e) {
  if ($(window).width() < 768) {
    if ($(".SLS-products-panel").is(":visible")) {
      $(".SLS-products-panel-close").click();
    } else {
      var product_id = $(e).attr("data-proid");
      if ($(window).width() < 768) {
        let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
        $('.SLS-products-panel').css('bottom', pinheight);
        $(".SLS-comments-panel-close").click();
        $(".SLS-share-panel-close").click();
        $(".SLS-ask-panel-close").click();
      }
      $(".SLS-products-panel").show();
      setTimeout(() => {
        let transformVal =
          $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
        $(".SLS-products-panel").css("transform", transformVal);
      }, 10);
      $('.SLS-products-panel').css('height', '28%');
      $('.SLS-product-tile').css('border-bottom', 'unset');
      $('.SLS-added-products .SLS-product-tile').addClass('hide');
      $('#pro-detail-pro-' + product_id).removeClass('hide');
    }
  }else{
    var product_id = $(e).attr("data-proid");
    var designer_id = $(e).attr("data-desid");
    var pro_title = $(e).attr("data-protitle");
    var pro_img = $(e).attr("data-proimg");
    var pro_redirection = $(e).attr("data-redirection");

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
};



$(".SLS-show-comments").click(function () {
  if ($(".SLS-comments-panel").is(":visible")) {
    $(".SLS-comments-panel-close").click();
  } else {
    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      console.log(pinheight);
      $('.SLS-comments-panel').css('bottom', pinheight);
      $(".SLS-products-panel-close").click();
      $(".SLS-share-panel-close").click();
      $(".SLS-ask-panel-close").click();
      $(".SLS-offer-panel-close").click();
      $(".SLS-poll-panel-close").click();
    }
    $(".SLS-comments-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-comments-panel").css("transform", transformVal);
    }, 10);
   // updateScrollbar();
  }
});
$(".SLS-comments-panel-close").click(function () {
  let transformVal =
    $(window).width() > 768 ? "translateX(-100%)" : "translateY(100%)";
  $(".SLS-comments-panel").css("transform", transformVal);
  setTimeout(() => {
    $(".SLS-comments-panel").hide();
  }, 500);
});
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

$(document).ready(function () {
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
  var end_time = $('#end_time').val();
  if ((end_time != '0000-00-00 00:00:00')) {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fname");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_email");
    localStorage.removeItem("poll_question_answer");
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

});
sendEvent = function(sel, step) 
{
  var name = document.getElementById("name").value;  
  var mobile = document.getElementById("mobile").value; 
  var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
  if(name == '')
  {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#name').focus();
    return false;
  }
  else if(mobile == '')
  {
    $('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
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
      url: "https://demo.goswirl.live/index.php/Live/otp",
      data: "mobile="+encodeURIComponent(mobile)+"&otp="+encodeURIComponent(message)+"&code="+encodeURIComponent(code),
      success: function(json)
      {

      }
    });
    $(sel).trigger('next.m.' + step);
  }
}

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
      //console.log(user_code);
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
     // console.log(user_code);
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
function onlyAlphabets(name) {
  var regex = /^[a-zA-Z ]*$/;
  if (regex.test(name)) {
    return true;
  } else {
    return false;
  }
}
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function insertMessage() {
  if ($(window).width() > 768) {
    var msg = $('.message-input').val();
    if (msg == '') {
      $('.message-input').focus();
      return false;
    }
  }else{
    var msg = $('.message-input-mobile').val();
    if (msg == '') {
      $('.message-input-mobile').focus();
      return false;
    }
  }
  sendMessage();
}

firebase.initializeApp({
  apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
  authDomain: 'getnatty-1547727043139.firebaseapp.com',
  projectId: 'getnatty-1547727043139',
  storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();

$(window).on('keydown', function (e) {
  /* var streamId = $('#stream_id').val();
  db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) { */
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
  /* } */
/* }); */
});

//live stream status
var streamId = $('#stream_id').val();
var is_defer = $('#is_defer').val();
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
       // $('.live-status').html('<span class="live-icon"> LIVE</span>');
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
function sendMessage(e) {
  var user_id = $('#user_id').val();
  var user_fname = $('#user_fname').val();
  var user_phone = $('#user_phone').val();
  var d = new Date();
  var current_d = d.getTime();
  /* var d = new Date();
  var n = d.getTimezoneOffset();
  var ans = new Date(d.getTime() + n * 60 * 1000);
  var current_d = Math.floor(ans / 1000); */
  //console.log(current_d);
  if ($(window).width() > 768) {
    var message = document.getElementById("SLS-comment").value;
  }else{
    var message = document.getElementById("SLS-comment-mobile").value;
  }

  
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
var $messages = $('.SLS-panel-scroll-mcustom');
//get stream id
var streamId = $('#stream_id').val();
var comments_limit = $('#comments_limit').val();
/* $messages.mCustomScrollbar({
  scrollInertia: 0,
  live: true
}); */
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "desc").limit(comments_limit)
  .onSnapshot((snapshot) => {
    size = snapshot.size;
      snapshot.docChanges().forEach((change) => {
        if(size > 0){
          $('#comments-dot').show();
        }else{
          $('#comments-dot').hide();
        }
        if (change.doc.data().flag === '1') {
          if (change.type === "removed") {
            // $(".messages-pin").empty();
            // $(".messages-pin-mobile").empty();
            //console.log('#message-' + change.doc.id);
            $('#message-' + change.doc.id).remove();
          }
          else {
            //get designer id
            var des_id = $('#designer_id').val();
            var des_id = $('#designer_id').val();
            var time = convertMsToTime(change.doc.data().created_time);
            if (change.doc.data().from == des_id) {
              var brand_img = $('#brand_logo').val();
              var changecolor = 'col-change';
              var fillcolor = 'fillcolor';
              var brand_time = 'brand-time';
              var brand_logo = ' <img style="width: 30px;border-radius: 50%;" src="'+brand_img+'" alt="Brand logo" title="'+ change.doc.data().name + '" />';
            }
            else {
              var changecolor = '';
              var fillcolor = '';
              var brand_time = '';
              var brand_logo = '<i class="fas fa-user-circle" style="font-size:30px"></i>';
            }
            var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        
            if(isValidUrl(change.doc.data().message) == true )
            {
          /*   if ((change.doc.data().message).match(regex)) { */
              var string_link = urlify(change.doc.data().message);
              $('<div id="message-' + change.doc.id + '"><div class="' + fillcolor + ' msgcontent-div" style="margin: 5px 0px;width: 100%;"><div class="icon" style="display: table-cell;padding-top: 5px;">'+ brand_logo +'</div><div class="msg-content" style="width: 100%;display: table-cell;vertical-align: top;"><p style="font-weight: bold;text-transform: capitalize; margin-bottom: 0px;font-size: 15px;">' + change.doc.data().name + '<span class="time '+brand_time+'">' + time +'</span></p><p>' + string_link + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new');

              //$('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + string_link+'<span class="time '+brand_time+'">' + time +'</span></p></div>').appendTo($('.SLS-comments-all')).addClass('new');
            }
            else {
              $('<div id="message-' + change.doc.id + '"><div class="' + fillcolor + ' msgcontent-div" style="margin: 5px 0px;width: 100%;"><div class="icon" style="display: table-cell;padding-top: 5px;">'+ brand_logo +'</div><div class="msg-content" style="width: 100%;display: table-cell;vertical-align: top;"><p style="font-weight: bold;text-transform: capitalize; margin-bottom: 0px;font-size: 15px;">' + change.doc.data().name + '<span class="time '+brand_time+'">' + time +'</span></p><p>' + change.doc.data().message + '</p></div></div></div>').appendTo($('.SLS-comments-all')).addClass('new');

             /*  $('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + change.doc.data().message + '<span class="time '+brand_time+'">' + time +'</span></p></div>').appendTo($('.SLS-comments-all')).addClass('new'); */
            }
          }
        }
        
      });
      if($('#myBtn').css("display") == 'none')
      {
        topFunction();
      }else{
        var scrollableDiv = $(".SLS-panel-scroll-mcustom")[0];
        var hasVerticalScrollbar = scrollableDiv.scrollHeight > scrollableDiv.clientHeight;
        if (hasVerticalScrollbar) {
          $('#myBtn').css('display','block');
        } else {
          $('#myBtn').css('display','none');
        }
      }
    //updateScrollbar();
  });

const isValidUrl = string => {
    /* let url;
    try { 
      url =new URL(string); 
    }
    catch(e){ 
      return false; 
    }
    return url.protocol === "http:" || url.protocol === "https:"; */
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

  function convertMsToTime(milliseconds) {
    var date = new Date(milliseconds);
    timezone = date.toString();
    var date1 = new Date(timezone); 
    localtime = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return localtime;
  }

function updateScrollbar() {
  var $messages = $('.SLS-panel-scroll-mcustom');
  $messages.mCustomScrollbar();
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0
  });
}
function buynow_firbase(e) {
  var product_id = $(e).attr("data-proid");
  var designer_id = $(e).attr("data-desid");
  var pro_title = $(e).attr("data-protitle");
  var pro_img = $(e).attr("data-proimg");
  var pro_redirection = $(e).attr("data-redirection");

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
  if(page == 'listing')
  {
    //console.log('click 1');
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
}
var end_time = $('#end_time').val();
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) {
    $('.view-count-live').show();
    $('.flag').show();
    $('#remote-media').show();
    $('.product-img-list').show();
    $('.SLS-control-panel').show();
    $('#black-screen').hide();
    $('.SL-schedule-timer').hide();
    if (doc.data().is_paused == true) {
      $('#remote-media').hide();
      $('.product-img-list').hide();
      $('.SLS-control-panel').hide();
      $('#black-screen').show();
      $('#stream_span').html('paused & will resume shortly');
    }
  }
  else {
    if (end_time == '0000-00-00 00:00:00') {
      console.log('sadf');
      $('.view-count-live').hide();
      if(is_defer != 2)
      {
        $('.flag').hide();
      }
      if(is_defer == 2)
      {
        $('.offer-icon').show();
      }else{
        $('.offer-icon').hide();
      }
      $('#remote-media').hide();
      $('#black-screen').show();
      $('.product-img-list').hide();
      if ($(window).width() < 768) {
        $('.SLS-control-panel').show();
      }
      else{
        $('.SLS-control-panel').hide();
      }
      //$('.SLS-control-panel').show();
      $('.muteicon').hide();
      $('.share-div').hide();
      
      if ($(window).width() > 768) {
      $('.SLS-products-panel-close .fas').hide();
      $('.SLS-comments-panel-close .fas').hide();
      }
      /* $("#SLS-comment-mobile").prop("disabled", true);
      $(".message-submit").prop("disabled", true); */
    }
    else {
      $('#remote-media').show();
      $('#black-screen').hide();
    }
  }
});

/*   const fbLS = async () => {
      let LS = db.collection('live_streams').doc(streamId);
      let LSSnap = await LS.get();
      var pin = LSSnap.data().pin_comment_id;
      
      var pinheightweb = $(".messages-pin").height();
      alert(pinheightweb);
      pinheightweb();
  }
  fbLS(); */
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) {
    // pin Comments
    var pin = doc.data().pin_comment_id;
    if (pin != '' && pin != undefined) {
      var docRef = db.collection("messages").doc(streamId).collection("messages").doc(pin);
      docRef.get().then((doc) => {
       
        if (doc.exists) 
        {
          $(".messages-pin").empty();
          $(".messages-pin-mobile").empty();
          var brand_img = $('#brand_logo').val();
          var brand_logo = ' <img style="width: 30px;border-radius: 50%;" src="'+brand_img+'" alt="Brand logo" title="'+ doc.data().name + '" />';

          var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
          var res = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
          /* if ((doc.data().message).match(regex)) 
          { */
          if(isValidUrl(doc.data().message) == true )
          {
            var string_link = urlify(doc.data().message);
            $('<div id="message-' + doc.id + '"><div class="pin-main-div"><div class="icon pin-user-pic">'+ brand_logo +'</div><div class="msg-content pin-msg-content"><p>' + doc.data().name + '</p><p>' + string_link + '</p></div><div class="pin-main-icon"><span class="pinicon"><i class="icon-pushpin"></i></span></div></div>').appendTo($('.messages-pin')).addClass('new');

            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + string_link + '</p></div>').appendTo($('.messages-pin-mobile')).addClass('new');
          }
          else 
          {
            $('<div id="message-' + doc.id + '"><div class="pin-main-div"><div class="icon pin-user-pic">'+ brand_logo +'</div><div class="msg-content pin-msg-content"><p>' + doc.data().name + '</p><p>' + doc.data().message + '</p></div><div class="pin-main-icon"><span class="pinicon"><i class="icon-pushpin"></i></span></div></div>').appendTo($('.messages-pin')).addClass('new');

            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + doc.data().message + '</p></div>').appendTo($('.messages-pin-mobile')).addClass('new');
          }
        }
        else{
          $(".messages-pin").empty();
          $(".messages-pin-mobile").empty();
        }
        let pinheight2 = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
        $('.SLS-comments-panel').css('bottom', pinheight2);
        $('.SLS-poll-panel').css('bottom', pinheight2);

        if ($(window).width() > 768) {
          pinheightweb();
        }

      });
    } else {
      $(".messages-pin").empty();
      $(".messages-pin-mobile").empty();
      let pinheight2 = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-comments-panel').css('bottom', pinheight2);
      $('.SLS-poll-panel').css('bottom', pinheight2);
    }
    
    if ($(window).width() > 768) {
      pinheightweb();
    } 

  }
});


function pinheightweb() {
  var pinheightweb = $(".messages-pin").height();
  pinheightweb = pinheightweb + 80;
  pinheightweb = 'calc(100% - ' + pinheightweb + 'px)';
  //alert(pinheightweb);
  $('.SLS-panel-scroll-mcustom').css('height', pinheightweb);
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
     // $('.view-count-live').show();
      $('.SL-schedule-timer').show();
    }
    else{
      $('#remote-media').hide();
      $('#black-screen').show();
      $('.live-status').hide();
      $('.view-count-live').hide();
    }
    $('.product-img-list').hide();
   // $('.SLS-control-panel').hide();

   var mix_live_stream_id = streamId;
   if (doc.exists) {
     db.collection("live_streams").doc(streamId)
     .onSnapshot({
       includeMetadataChanges: true
     }, (doc) => {
     var mux_status = doc.data().mux_status; 
     if(mux_status == true)
     {
      var page = getUrlParameter('page');
      if(page == 'listing')
      {
        sendRefreshSL();
      }
       window.location = window.location.href + '?live=true';
     } 
   });
   }
  });
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
      $('.SLS-comment-form').show();
      $('.message-textbox-div').show();

      $("#SLS-comment-mobile").prop("disabled", false);
      $(".message-submit").prop("disabled", false);
    } else {
      $('.SLS-comment-form').hide();
      $('.message-textbox-div').css('display','none !important');
      $("#SLS-comment-mobile").prop("disabled", true);
      $(".message-submit").prop("disabled", true);
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
    /* $('.SLS-comment-form').hide();
    $('.message-textbox-div').css('display','none !important'); */
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
function ask_que_submit(b, c) {
  var base_url = $('#base_url').val();
  var a = $('#user_id').val();
  var user_fname = $('#user_fname').val();
  var user_phone = $('#user_phone').val();
  var swirls_id = '';
  var msg = document.getElementById("inquiry_text_ask").value;
  if (msg == '') {
    $('.err_ask').html("This is a required field.").fadeIn().delay(3000).fadeOut();
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
        //ask_que_count();
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

    
$('#tabs-nav li:first-child').addClass('active'); 
$('.tab-content').hide(); 
$('.tab-content:first').show(); 
// Click function 
$('#tabs-nav li').click(function () { 
  if ($(window).width() > 768) {
    $('#tabs-nav li').removeClass('active');  
    $(this).addClass('active'); 
    $('.tab-content').hide(); 
    $('.messages-pin').toggle();  
    $('.SLS-panel-scroll-mcustom').toggle();  
    $('.SLS-comment-post').toggle();  
    var activeTab = $(this).find('a').attr('href'); 
    var activeId = $(this).find('a').attr('id'); 

    if(activeId == 'live-chat-tabs'){
      $('#Offers').hide();
      $('.messages-pin').show();  
      $('.SLS-panel-scroll-mcustom').show();  
      $('.SLS-comment-post').show();
      
      $('.tabs').removeClass('h-100');
      $('#tabs-content').removeClass('h-100');
      $('#Offers').removeClass('h-100');
    } else {
      $('.tabs').addClass('h-100');
      $('#tabs-content').addClass('h-100');
      $('#Offers').addClass('h-100');
      $('.SLS-panel-scroll-mcustom').hide();  
      $('.messages-pin').hide();  
      $('.SLS-comment-post').hide();
      $('#Offers').show();
    }
    //$(activeTab).fadeIn();  
    return false; 
  }
  else{
    $("#live-chat-tabs").removeAttr("href");
  }
});

function rsvp_submit(){
  var stream_id = $('#stream_id').val();
  let user_code = generateString(20);
  var name = document.getElementById("rsvp-name").value;  
  var email = document.getElementById("rsvp-email").value;
  var phone = document.getElementById("rsvp-phone").value;
  var checkbox =document.forms['rsvp-form']['agree'];
  var d = new Date();
  var current_d = d.getTime();

  if(name == '')
  {
    $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
    $('#rsvp-name').focus();
    return false;
  }
  else if(name.length < 3){
    $('.form-validation-error').html("Please enter 3 latter.").fadeIn().delay(3000).fadeOut();
    $('#rsvp-name').focus();
    return false;
  }
  else if(email == '')
  {
    $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
    $('#rsvp-email').focus();
    return false;
  }
  else if(phone == '')
  {
    $('.form-validation-error').html("This is a required fields.").fadeIn().delay(3000).fadeOut();
    $('#rsvp-phone').focus();
    return false;
  }
  else if (!checkbox.checked) {
      $('.error_msg_rsvp').html("You must agree with the terms and conditions").fadeIn().delay(3000).fadeOut();
      $('#checkbox').focus();
      return false;
  }
  else{
    $('#user_id').val(user_code);
    $('#user_fname').val(name);
    $('#user_phone').val(phone);
    // Set Item
    try{
      localStorage.setItem("user_id", user_code);
      localStorage.setItem("user_fname", name);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);  
      localStorage.setItem("is_rsvp", 1); 
    }catch(e){            
    }
    db.collection("messages").doc(stream_id).collection("users").doc(user_code).set({
      user_id: user_code,
      name: name,
      email:email,
      phone:phone,
      created_date:current_d,
      stream_id:stream_id,
      is_rsvp:1
    });
    alert('RSVP form submitted successfully');
   $('#exampleModal').modal('hide');
   $('.modal-backdrop').remove();
   $('.rsvp-button').hide(); 

  }

}

var is_defer = $('#is_defer').val();
if(is_defer == 2){
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
  if(doc.exists == true)
  {
    var click_heart_like = doc.data().click_heart_like;
    if(click_heart_like != undefined){
      SWIRLHeartFlaws();
      SWIRLHeartFlaws();
      SWIRLHeartFlaws();
    }
  }
});

//poll questions
$(document).ready(function() 
{
  var database = $('#database').val();
  const bookRefid = db.collection("live_streams").doc(streamId);
  bookRefid.get().then((doc) => {
    console.log(doc.exists);
    if (doc.exists)
    {
      var base_url = $('#base_url').val();
      db.collection("polls_questions_stream").doc(streamId).onSnapshot((doc) => {
      if (doc.exists) 
      {
        var poll_question_id = doc.data().poll_question_id;
        if (poll_question_id != '' && poll_question_id != undefined) 
        {
          if (localStorage.getItem("poll_question_answer") != poll_question_id) 
          {
            if ($(window).width() > 768) {
              var pinheight = '50px';
            }else{
              var pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
            }
            if ($(".SLS-share-panel").is(":visible")) {
              $(".SLS-share-panel-close").click();
            }
            if ($(".SLS-offer-panel").is(":visible")) {
              $(".SLS-offer-panel-close").click();  
            }
            if ($(".SLS-products-panel").is(":visible")) {
              if ($(window).width() < 768) {
                $(".SLS-products-panel-close").click();
              }
            } 
            if ($(".SLS-comments-panel").is(":visible")) {
              if ($(window).width() < 768) {
                $(".SLS-comments-panel-close").click();
              }
            }
            if ($(".SLS-ask-panel").is(":visible")) {
              $(".SLS-ask-panel-close").click();
            }
            $('.SLS-poll-panel').css('bottom', pinheight);
            $(".SLS-poll-panel").show();
            setTimeout(() => {
              let transformVal = "translateY(0%)";
              $(".SLS-poll-panel").css("transform", transformVal);
            }, 10);

            
            $.ajax({
              type: "POST",
              dataType: "json",
              url: base_url+"index.php/Live/fetch_questions",
              data: "stream_id=" + encodeURIComponent(streamId) + "&poll_question_id=" + encodeURIComponent(poll_question_id) + "&database=" + encodeURIComponent(database),
              success: function (json) {
                console.log(json);
                $('#add-poll').empty();
                numbersString = json.data['options'];

                queAdd =
                '<div class="d-table" style="width: 100%;">'+
                '<p class="d-table-cell share-panel-title" style="font-weight: 500;">'+json.data['question_title']+'</p>'+
                '<div class="float-right d-table-cell">'+
                '<span class="SLS-poll-panel-close" ><i class="fas fa-close"></i></span>'+
                '</div>'+
                '</div>'+
                '<hr class="my-3" style="border: 1px solid #fff;"/>'+
                '<div class="share-btn text-center mcq">'+
                '<input type="hidden" id="poll-question-number" value="'+json.data['questions_id']+'">'+
                '<input type="hidden" id="poll-question-title" value="'+json.data['question_title']+'">';
                var numbersArray = numbersString.split(',');
                $.each(numbersArray, function(index, value) { 
                  index = index + 1;
                  queAdd += 
                  '<label class="mcq-answer">'+
                  '<input type="radio" name ="question1" id="answer'+index+'" value="'+value+'" onchange="switchbtn('+index+')">'+
                  '<div class="highlight highlight-answer'+index+'"></div>'+
                  '<p class="options-text" id="answer-text-'+index+'">'+value+'</p>'+
                  '<span class="feedback feedback-answer'+index+'"></span>'+
                  '</label>';
                });
                queAdd += 
                '<span class="float-left total_votes" style="display:none">Total <span id="totalVotes" style="font-weight: 700;">0</span> votes</span>'+
                '<span class="float-right question-timer">00:'+json.data['countdown_time']+'</span>'+
                '</div>';
                $('#add-poll').append(queAdd);
                startTimer(json.data['countdown_time']);
              }
            });
          }
        }else{
          let transformVal = "translateY(100%)";
          $(".SLS-poll-panel").css("transform", transformVal);
          setTimeout(() => {
            $(".SLS-poll-panel").hide();
          }, 500);
        }
      }
      });
    }
  });

  function startTimer(countdown_time) {
    countDownDate = new Date().getTime() + (1 * countdown_time * 1000); // Set the countdown time (5 minutes in this example)
    
    timer = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      // Calculate the minutes and seconds
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // Display the timer
      $(".question-timer").text(minutes + " : " + seconds);

      // Check if the countdown is finished
      if (distance < 0) {
        clearInterval(timer);
        let transformVal = "translateY(100%)";
          $(".SLS-poll-panel").css("transform", transformVal);
          setTimeout(() => {
            $(".SLS-poll-panel").hide();
          }, 500);
      }
    }, 1000); // Update the timer every second (1000 milliseconds)
  }
  $('body').on('click', '.SLS-poll-panel-close', function() {
    let transformVal = "translateY(100%)";
    $(".SLS-poll-panel").css("transform", transformVal);
    setTimeout(() => {
      $(".SLS-poll-panel").hide();
    }, 500);
  });
});

function switchbtn(e)
{
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
  else{
    $('#demo-modal-1').modal('hide');
    var ans = $('#answer-text-'+e).text();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: base_url+"index.php/Live/question_answer",
      data: "user_id=" + encodeURIComponent(user_id) + "&user_fname=" + encodeURIComponent(user_fname) + "&user_phone=" + encodeURIComponent(user_phone) + "&question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(ans) + "&question_title=" + encodeURIComponent(question_title) + "&stream_id=" + encodeURIComponent(stream_id) + "&database=" + encodeURIComponent(database),
      success: function (json) {
        console.log(json);
        $("input:radio[name=question1]").attr('disabled', true);
        $('.total_votes').show();
        $('.feedback').show();
        var numbersArray = json.data['percentage'];
        $('#totalVotes').text(json.data['total_votes']);
        $.each(numbersArray, function(index, value) { 
          index = index + 1;
          var per = value+'%';
          $('.highlight-answer'+index).css('width','0%');
          $(".highlight-answer"+index).animate({ width: per }, 1000);
          $('.highlight-answer'+index).css('background-color',options_bc);
          $('.feedback-answer'+index).text(per);
          localStorage.setItem("poll_question_answer", question);
          //console.log(value);
          if(value == 0)
          {
            $('#answer-text-'+index).addClass('options-text-add');
          }
          else{
            $('#answer-text-'+index).css('color','#fff');
          }
        });
      }
    });
  }
}

/* function sendTimeSL() {
  vdo = document.getElementById('livestreambro_html5_api');
  parent.postMessage({
      action: 'updateStreamTime',
      data: Math.floor(vdo.currentTime)
  }, "*");  //  `*` on any domain
  console.log(vdo.currentTime);
} */
function sendTimeSL() {
  //console.log('click 2');
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

let mybutton = document.getElementById("myBtn");
function topFunction() {
  $('.SLS-panel-scroll-mcustom').animate({
      scrollTop: $('.SLS-panel-scroll-mcustom').get(0).scrollHeight
  }, 0);
}

function isScrollBottom() {
  var element = $('.SLS-panel-scroll-mcustom');
  return element.scrollTop() + element.innerHeight() >= element[0].scrollHeight - 20;
}

$('.SLS-panel-scroll-mcustom').scroll(function() {
  if (isScrollBottom()) {
    $('#myBtn').css('display','none');
  }else{
    $('#myBtn').css('display','block');
  }
});

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