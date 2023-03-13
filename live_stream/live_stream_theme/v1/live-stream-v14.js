$(document).ready(function () {
  if ($(window).width() > 768) {
    setTimeout(() => {
      $(".SLS-control-panel .SLS-show-products").click();
      $(".SLS-show-comments").click();
    }, 5000);
  }
  else{  
   /*  $('#tabs-nav').hide(); */  
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
var actionbar_size = 56;
var end_time = $('#end_time').val();
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
    }
    $(".SLS-products-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-products-panel").css("transform", transformVal);
    }, 10);
    let panelheight = $(window).width() > 768 ? "100%" : "50%";
    $('.SLS-products-panel').css('height', panelheight);
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

$(".last-comments").click(function () {
  if ($(".SLS-comments-panel").is(":visible")) {
    $(".SLS-comments-panel-close").click();
  } else {
    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-comments-panel').css('bottom', pinheight);
      $(".SLS-products-panel-close").click();
      $(".SLS-share-panel-close").click();
      $(".SLS-ask-panel-close").click();
    }
    $(".SLS-comments-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-comments-panel").css("transform", transformVal);
    }, 10);
    updateScrollbar();
  }
});

$(".SLS-show-comments").click(function () {
  if ($(".SLS-comments-panel").is(":visible")) {
    $(".SLS-comments-panel-close").click();
  } else {
    if ($(window).width() < 768) {
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.SLS-comments-panel').css('bottom', pinheight);
      $(".SLS-products-panel-close").click();
      $(".SLS-share-panel-close").click();
      $(".SLS-ask-panel-close").click();
      $(".SLS-offer-panel-close").click();
    }
    $(".SLS-comments-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-comments-panel").css("transform", transformVal);
    }, 10);
    updateScrollbar();
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
      console.log(user_code);
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
    
  }else{
    var msg = $('.message-input-mobile').val();
  }
  if ($.trim(msg) == '') {
    msg.focus();
    return false;
  }
  sendMessage();
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
firebase.initializeApp({
  apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
  authDomain: 'getnatty-1547727043139.firebaseapp.com',
  projectId: 'getnatty-1547727043139',
  storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();

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
        $('.live-status').html('<span class="recording-icon">RECORDED</span>');
      } else {
        $('.live-status').html('<span class="live-icon"> LIVE</span>');
      }
    }else{
      if(is_defer == 2)
      {
        $('.live-status').html('<span class="live-icon upcoming-flag" style="background: gray;"> Upcoming</span>');
      }
    }
  });
function sendMessage(e) {
  var user_id = $('#user_id').val();
  var user_fname = $('#user_fname').val();
  var user_phone = $('#user_phone').val();
  var d = new Date();
  var current_d = d.getTime();
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
    flag: '0'
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
$messages.mCustomScrollbar();
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "asc")
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
            let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
            $('.last-comments').css('bottom', pinheight);
            console.log('#message-' + change.doc.id);
            $('#message-' + change.doc.id).remove();
          }
          else {
            //get designer id
            var des_id = $('#designer_id').val();
            var time = convertMsToTime(change.doc.data().created_time);
            if (change.doc.data().from == des_id) {
              var changecolor = 'col-change';
              var fillcolor = 'fillcolor';
              var brand_time = 'brand-time';
            }
            else {
              var changecolor = '';
              var fillcolor = '';
              var brand_time = '';
            }
            var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            if ((change.doc.data().message).match(regex)) {
              var string_link = urlify(change.doc.data().message);
              $('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + string_link+'<span class="time '+brand_time+'">' + time +'</span></p></div>').appendTo($('.SLS-comments-all')).addClass('new');
            }
            else {
              $('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + change.doc.data().message + '<span class="time '+brand_time+'">' + time +'</span></p></div>').appendTo($('.SLS-comments-all')).addClass('new');
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
if ($(window).width() < 768) {
  db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "desc").limit(1)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        $('.last-comments').empty();
        $('<div id="message-' + change.doc.id + '"><p><span>' + change.doc.data().name + ' </span>: ' + change.doc.data().message + '</p></div>').appendTo($('.last-comments')).addClass('new');
      })
    });
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
      $('.offer-icon').hide();
      if ($(window).width() > 768) {
      $('.SLS-products-panel-close .fas').hide();
      $('.SLS-comments-panel-close .fas').hide();
      }
      $("#SLS-comment-mobile").prop("disabled", true);
      $(".last-comments").hide();
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
    /* console.log(pin); */
 
    if (pin != '' && pin != undefined) {
      var docRef = db.collection("messages").doc(streamId).collection("messages").doc(pin);
      docRef.get().then((doc) => {
       
        if (doc.exists) {
          $(".messages-pin").empty();
          $(".messages-pin-mobile").empty();
          var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
          if ((doc.data().message).match(regex)) {
            console.log('1'); 
            var string_link = urlify(doc.data().message);
            
            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + string_link + '</p></div>').appendTo($('.messages-pin')).addClass('new');

            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + string_link + '</p></div>').appendTo($('.messages-pin-mobile')).addClass('new');
          }
          else {
            console.log('2'); 
            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + doc.data().message + '</p></div>').appendTo($('.messages-pin')).addClass('new');

            $('<div id="message-' + doc.id + '"><p><i class="icon-pushpin"></i><span>' + doc.data().name + ' </span>: ' + doc.data().message + '</p></div>').appendTo($('.messages-pin-mobile')).addClass('new');
          }
        }
        else{
          $(".messages-pin").empty();
          $(".messages-pin-mobile").empty();
        }

        let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
        $('.last-comments').css('bottom', pinheight);
        if ($(window).width() > 768) {
          pinheightweb();
        }

      });
    } else {
      $(".messages-pin").empty();
      $(".messages-pin-mobile").empty();
      let pinheight = $(".messages-pin-mobile").height() + actionbar_size + recordingcontrol_size;
      $('.last-comments').css('bottom', pinheight);
      /*  pinheightweb = 'calc(100% - 80px)';
       $('.SLS-panel-scroll-mcustom').css('height',pinheightweb); */
    }
    if ($(window).width() > 768) {
      pinheightweb();
    }
    //product updates
    if(doc.data().is_live == true){ 
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
          if (json['status_code'] == '1') {
            $("#product_count").text(json['data']['product_count']);
            $('.SLS-added-products-static').hide();
            $('.SLS-added-products-dynamic').empty();
            $('#static-img').hide();
            $('#dynamic-img').empty();
            for (var k = 0; k < json['data']['product'].length; k++) {
              var link = json['data']['product'][k]['link'];
              if (json['data']['product_count'] != '0') {

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
                  var discount_price = '<s class="pl-2 cl-red">'+json['data']['currencysymbols']+' '+json['data']['product'][k]['product_price']+'</s> ';
                }
                if(json['data']['product'][k]['is_star'] == 1){
                 $('#dynamic-img').append('<div class="product-img-div"><img src="' + json['data']['product'][k]['product_img_url'] + '" alt="..." class="img-fluid product-img showcase-products"  data-proid="' + json['data']['product'][k]['product_id'] + '" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + link + '" data-desid="' + brand_id + '" onclick="showcase_products(this)"></div>');
                }

                $('.SLS-added-products-dynamic').append('<div class="d-flex align-items-start SLS-product-tile '+ is_star + '" id="pro-detail-pro-' + json['data']['product'][k]['product_id'] + '"><div class="SLS-product-image"><img src="' + json['data']['product'][k]['product_img_url'] + '" alt="Product Image" title="Product Image"></div><div class="SLS-product-content"><p class="m-0" title="' + json['data']['product'][k]['product_title'] + '">' + json['data']['product'][k]['product_title'] + '</p><label class="m-0 mb-2 d-block">' + json['data']['currencysymbols'] + '' + json['data']['product'][k]['product_sell_price'] + '<del>'+discount_price+'</del></label><button type="button" class="SLS-product-buynow-btn" onclick="buynow_firbase(this)" data-protitle="' + json['data']['product'][k]['product_title'] + '" data-proimg="' + json['data']['product'][k]['product_img_url'] + '" data-proid="' + json['data']['product'][k]['product_id'] + '" data-redirection="' + link + '" data-desid="' + brand_id + '">BUY NOW</button></div><div class="'+ is_star_class +'"><img class="star-animation" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/star-animation.gif" class="setproduct"></div></div>');
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
      $('.SL-schedule-timer').show();
    }
    else{
      $('#remote-media').hide();
      $('#black-screen').show();
      $('.live-status').hide();
    }
    $('.product-img-list').hide();
   // $('.SLS-control-panel').hide();

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
function urlify(text) {
  var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return text.replace(urlRegex, function (url) {

    var pattern = /^((http|https|ftp):\/\/)/;

    if (!pattern.test(url)) {
      url = "https://" + url;
    }
    return '<a style="word-break:break-all" href="' + url + '" target="_blank">' + url + '</a>';
  })

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
    } else {
      $('.SLS-comment-form').hide();
      $('.message-textbox-div').css('display','none !important');
    }
    var fire_status = doc.data().fire_status; 
    if(fire_status == true)
    {
      $('#gif').show();
    } else {
      $('#gif').hide();
    }
    });
  }
  else{
    $('.SLS-comment-form').hide();
    $('.message-textbox-div').css('display','none !important');
    $('#gif').hide();
  }
});

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
      $('.SLS-panel-scroll-mcustom').show();  
      $('.SLS-comment-post').show();

    } else {
      $('.SLS-panel-scroll-mcustom').hide();  
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