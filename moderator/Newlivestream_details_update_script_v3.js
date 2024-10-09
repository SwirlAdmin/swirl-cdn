$(document).ready(function () {
  SLSsetHeight();
    setTimeout(() => {
      SLSshowproducts();
      SLSshowcomments();
    }, 5000);
});

$(window).resize(function () {
  SLSsetHeight();
});

function SLSsetHeight() {
  let currentHeight = window.innerHeight;
  $(".SLS-main-conatiner").height(currentHeight);
}

function SLSshowproducts() {
    $(".SLS-products-panel").show();
    setTimeout(() => {
      let transformVal =
        $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-products-panel").css("transform", transformVal);
    }, 10);
}

function SLSshowcomments() {
    $(".SLS-comments-panel").show();
    setTimeout(() => {
      let transformVal =
      $(window).width() > 768 ? "translateX(0%)" : "translateY(0%)";
      $(".SLS-comments-panel").css("transform", transformVal);
    }, 10);
    var scrollableDiv = $(".SLS-panel-scroll-mcustom")[0];
    var hasVerticalScrollbar = scrollableDiv.scrollHeight > scrollableDiv.clientHeight;
    if (hasVerticalScrollbar) {
      $('#myBtn').css('display','block');
    } else {
      $('#myBtn').css('display','none');
    }
};

firebase.initializeApp({
  apiKey: 'AIzaSyCWTGwzrHuwJY2yrmDcMm3Sm8Qfq1BtOw0',
  authDomain: 'getnatty-1547727043139.firebaseapp.com',
  projectId: 'getnatty-1547727043139',
  storageBucket: 'getnatty-1547727043139.appspot.com'
});
var db = firebase.firestore();
var stream_id = $('#stream_id').val();
var base_url = $('#base_url').val();
var end_time_stream = $('#ending_time').val();
var cover_img = $('#cover_img').val();
var title = $('#title').val();


db.collection("live_streams").doc(stream_id).onSnapshot((doc) => {
  if (doc.exists) {
      console.log(doc.data());
      console.log(doc.data().is_paused);
      $('#html-video-tag').css('display','block');
      $('.webplayer-icon-bar').css('display','block');
      $('#black-screen').hide();
      $('#card-header').css('display','block');
      $('.product-img-list').css('display','block');
      if(doc.data().is_paused == true){
          $('.product-img-list').css('display','none');
          $('#card-header').css('display','none');
          $('#html-video-tag').css('display','none');
          $('.webplayer-icon-bar').css('display','none');
          $('.bottom-bar').css('display','none');
          $('#black-screen').show();
          $('#strem_p').html('Livestream is paused & <br><span>will resume shortly</span>');
      }
  } else {
      if(end_time_stream == '0000-00-00 00:00:00'){
          $('.product-img-list').css('display','none');
          $('#card-header').css('display','none');
          $('#html-video-tag').css('display','none');
          $('.webplayer-icon-bar').css('display','none');
          $('.bottom-bar').css('display','none');
          $('.vjs-modal-dialog-content').empty();
          $('.vjs-modal-dialog-content').text('Stream will start playing automatically. when it is live');
      } else {
          $('#html-video-tag').css('display','block');
          $('.webplayer-icon-bar').css('display','block');
          $('#black-screen').hide();
          $('#card-header').css('display','block');
          $('.product-img-list').css('display','block');
      }
  }
});

const fbLS = async () => {
  let LS = db.collection('live_streams').doc(stream_id);
  let LSSnap = await LS.get();
  var pin = LSSnap.data().pin_comment_id;
  var multiple_views_factor = LSSnap.data().multiple_views_factor;
  multiple_views_factor = (multiple_views_factor == undefined) ? 1 : multiple_views_factor;
  $("#multiple_views_factor").val(multiple_views_factor);
  $('#pin_cmmt').val(pin);
}
fbLS();

db.collection("live_streams").doc(stream_id)
.onSnapshot({
    includeMetadataChanges: true
}, (doc) => {
if(doc.exists == true)
{
  var livestream = doc.data().is_recorded; 
  /* Solved mirror image issue*/
  var camera_flip = doc.data().camera;
  if(end_time_stream != '0000-00-00 00:00:00'){
      //$('#livestreambro_html5_api').css('-webkit-transform','rotateY(180deg)');
  } else {
    //   if(camera_flip == 1) {
    //     $('#livestreambro').addClass('video-mirror-img');
    // } else {
    //     $('#livestreambro').removeClass('video-mirror-img');
    // }
  }
  if(livestream == true) {
     /*  $('.live-status').html('<span class="recording-icon">RECORDED</span>');
      $('.mux_views_div').hide(); */
      $('#livestatus').text('RECORDED');
      $('#livestatus').addClass('recordingflag');
      $('#viewcount').hide();
  } else {
      /* $('.live-status').html('<span class="live-icon"> LIVE</span>'); */
      $('#livestatus').text('LIVE');
      $('#livestatus').addClass('liveflag');
  }
}
});



function nFormatter(num) {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

$(document).ready(function() {
  db.collection("live_streams").doc(stream_id).onSnapshot((doc) => {
      if (!doc.exists) {
          reloadOnceLive();
      }
  });
});

function reloadOnceLive() {                
  db.collection("live_streams").doc(stream_id).onSnapshot((doc) => {
    var live_stream_status ='idle';  
    $('.product-img-list').css('display','none');
    $('#card-header').css('display','none');
    $('#livestreambro').css('display','none');
    $('.webplayer-icon-bar').css('display','none');
    $('.bottom-bar').css('display','none');
    $('#black-screen').show();
    $('.flag').hide();
    $('.mux_views_div').hide();
    var mix_live_stream_id = stream_id;
    if (doc.exists) { 
      let docInterval = setInterval(function() {
      if(live_stream_status == 'idle')
      {
        $.ajax({
                url:'https://store.goswirl.live/index.php/api/Mogicon/muxLiveStreamStatus',
                method:'POST',
                dataType:'JSON',
                data:{'stream_id':mix_live_stream_id},
                success:function(response){
                  console.log('auto-refresh response'+response);
                    if(response.status =='active')
                    {
                    live_stream_status= 'active';
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

$(".SLS-add-pro-btn").click(function () {
  $(this).toggleClass("main");
  $(".drag-text").addClass("d-none");
  $(".SLS-added-products-static").toggleClass("d-none");
  $(".SLS-all-product-list").toggleClass("d-none");
  $("#btn-done").toggleClass("d-none");
  $("#checkAll-span").toggleClass("d-none");
  $("#productSearchDiv").toggleClass("d-none");
  $("#delete-all").toggleClass("d-none");
  $(".dynamicproductlist").toggleClass("d-none");
});
$("#checkAll").click(function () {
  if($('.allproducts').css("display") == 'block')
  {
    $('.chk:checkbox').not(this).prop('checked', this.checked);
  }
  else{
    $('.searchproducts .chk:checkbox').not(this).prop('checked', this.checked);
  }
});

$("#btn-done").on("click", function () {
  var dbproductids = $("#dbproductids").val();
  var star_products = $('#star_products').val();
  var checkedIds = $(".chk:checked").map(function () {
    return this.id;
  }).toArray();
  var productids = checkedIds.join(", ");
  $.ajax({
    type: "POST",
    dataType: "json",
    url: base_url + "index.php/Welcome/addproducts_process",
    data: "productids=" + encodeURIComponent(productids) + "&stream_id=" + encodeURIComponent(stream_id) + "&dbproductids=" + encodeURIComponent(dbproductids)  + "&star_products=" + encodeURIComponent(star_products),
    success: function (json) {
      console.log(json);
      if (json.status_code == '1') {
        if(json.data != ''){
          $('#save-done').attr("data-type", "dynamic");
          var dbproductids = $("#dbproductids").val(json['out']);
          var star_products = $("#star_products").val(json['star_products']);
          db.collection("live_streams").doc(stream_id).update({
            'product_status': true,
            'product_counter' : checkedIds.length
          });
          $(".drag-text").removeClass("d-none");
          $('.dynamicproductlist').empty();
          $(".SLS-all-product-list").toggleClass("d-none");
          $(".dynamicproductlist").removeClass("d-none");
          $(".dynamicproductlist").css("display", "block");
          $("#btn-done").toggleClass("d-none");
          $('.SLS-add-pro-btn').toggleClass("main");
          $(".SLS-added-products-static").hide();
          $("#checkAll-span").toggleClass("d-none");
          $("#productSearchDiv").toggleClass("d-none");
          $('#delete-all').removeClass('d-none');
          $('.allproducts').show();
          $('.allproducts .SLS-product-tile').addClass("d-flex");
          $('.searchproducts').hide();
          $('#checkAll').prop('checked', false);
          $('#product_search').val('');
          var currency = $('#currency_sym').val();
          for (var k = 0; k < json['data'].length; k++) {
            var setproduct = (json['data'][k]['is_star'] == 1) ? 'setproduct' : '';
            var unsetproduct_css = (json['data'][k]['is_star'] == 1) ? 'none' : 'inline';
            var setproduct_css = (json['data'][k]['is_star'] == 1) ? 'inline' : 'none';
            $('.dynamicproductlist').append('<div class="card-drag-pl"  draggable="true"><div id="' + json['data'][k]['product_id'] + '"  class="d-flex align-items-start SLS-product-tile '+ setproduct +' productblock-' + json['data'][k]['product_id'] + '"><div class="SLS-product-image"><img src="' + json['data'][k]['images'] + '" alt="' + json['data'][k]['product_title'] + '" title="' + json['data'][k]['product_title'] + '" /></div><div class="SLS-product-content"><p class="m-0" title="' + json['data'][k]['product_title_full'] + '">' + json['data'][k]['product_title'] + '</p><label class="m-0 mb-2 d-block">' + currency + json['data'][k]['product_sell_price'] + '</label></div><label class="actions mx-2 starproducts '+ setproduct +'" data-productid="' + json['data'][k]['product_id'] + '"><img src="'+ base_url +'assets/images/star_black.png" class="unsetproduct" style="display:'+ unsetproduct_css +'" value="0"><img src="'+ base_url +'assets/images/star_fill.png" class="setproduct" style="display:'+ setproduct_css +'" value="1"></label><label class="actions mx-2"><img src="https://shop.goswirl.live/assets/live/delete-button.png" onclick="deleteproduct(' + json['data'][k]['product_id'] + ')"></label></div></div>');
            
            intiateDrag();
          }
        }
        else{
          $('.SLS-add-pro-btn').toggleClass("main");
          $(".SLS-added-products-static").toggleClass("d-none");
          $(".SLS-all-product-list").toggleClass("d-none");
          $("#btn-done").toggleClass("d-none");
          $("#checkAll-span").toggleClass("d-none");
          $("#productSearchDiv").toggleClass("d-none");
          $("#delete-all").toggleClass("d-none");
        }
      }
      else {
        $('.SLS-add-pro-btn').toggleClass("main");
        $(".SLS-added-products-static").toggleClass("d-none");
        $(".SLS-all-product-list").toggleClass("d-none");
        $("#btn-done").toggleClass("d-none");
        $("#checkAll-span").toggleClass("d-none");
        $("#productSearchDiv").toggleClass("d-none");
        $("#delete-all").toggleClass("d-none");

      }
    }
  });
});
function deleteproduct(id) {
  swal({
    title: "Are you sure?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
    closeOnConfirm: false,
    closeOnCancel: false
  }).then(function (isConfirm) {
    if (isConfirm.value == true) {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url + "index.php/Welcome/deleteproduct",
        data: "productid=" + encodeURIComponent(id) + "&stream_id=" + encodeURIComponent(stream_id),
        success: function (json) {
          console.log(json);
          if (json.status_code == '1') {
            var dbproductids = $("#dbproductids").val(json['out']['product_ids']);
            var dbproductids = $("#star_products").val(json['out']['star_products']);
            if(json['out']['product_ids'] != '')
            {
              var product_counter = json['out']['product_ids'].split(', ');
              product_counter = product_counter.length;
              console.log(product_counter);
            }
            else{
              var product_counter = 0;
              $(".drag-text").addClass("d-none");
            }
            db.collection("live_streams").doc(stream_id).update({
              'product_status': true,
              'product_counter' : product_counter
            });
            $(".checkbox-" + id).prop( "checked", false );
            $(".checkbox-" + id).removeAttr('checked');
            $(".productblock-" + id).remove();
          }
        }
      });
    }
    else {
      swal("Cancelled", "", "error");
    }
  });
}
function deleteallproduct() {
  swal({
    title: "Are you sure?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
    closeOnConfirm: false,
    closeOnCancel: false
  }).then(function (isConfirm) {
    if (isConfirm.value == true) {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url + "index.php/Welcome/deleteallproduct",
        data: "stream_id=" + encodeURIComponent(stream_id),
        success: function (json) {
          console.log(json);
          if (json.status_code == '1') {
            var dbproductids = $("#dbproductids").val('');
            var dbproductids = $("#star_products").val('');
            db.collection("live_streams").doc(stream_id).update({
              'product_status': true,
              'product_counter' : 0
            });
            $(".chk").prop( "checked", false );
            $(".drag-text").addClass("d-none");
            $('.chk').removeAttr('checked');
            $(".dynamicproductlist").css("display", "none");
            $(".SLS-added-products-static").css("display", "none");
          }
        }
      });
    }
    else {
      swal("Cancelled", "", "error");
    }
  });
}
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
$('.message-submit').click(function() {
  var user_id = $('#user_id').val();
  insertMessage();
});
function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        $('#SLS-comment').focus();
        return false;
    }
    sendMessage();
}
$(".message-input").keyup(function(event) {

    if (event.keyCode === 13) {
        msg = $('.message-input').val();
        if ($.trim(msg) == '') {
            $('#SLS-comment').focus();
            return false;
        }
        else
        {
            sendMessage();
        }
    }
});
function sendMessage(e) {
    var user_id = $('#user_id').val();
    var user_fname = $('#user_fname').val();
    var user_phone = $('#user_phone').val();
    var d = new Date();
    var current_d = d.getTime();
    var message = document.getElementById("SLS-comment").value;
    db.collection('messages').doc(stream_id).collection("messages").get().then(snap => 
    {
        size = snap.size 
    });
    db.collection("messages").doc(stream_id).collection("messages").add({
        cover_img:cover_img,
        created_time: current_d,
        from: user_id,
        is_designer : false,
        is_designer_seen : false,
        message : message,
        name : user_fname,
        profile : '',
        title : title,
        type : 'text',
        user_percentage : '20',
        user_phone :user_phone,
        flag : '1'
    });
    //viewcount();
    //updateScrollbar();
    $('.message-input').val(null);
}

var $messages = $('.SLS-panel-scroll-mcustom');
//get stream id
var streamId = $('#stream_id').val();
//$messages.mCustomScrollbar();
var i = 0;
var comment_count = 0;
db.collection("messages").doc(streamId).collection("messages").orderBy("created_time", "asc")
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        //get designer id
        var des_id = $('#user_id').val();
        let param = " '" + change.doc.id + "' ";
        let deleteparam = " 'delete" + i + "' ";
        if (change.type === "added") {
          if (change.doc.data().from == des_id) {
            var pin_comment = $('#pin_cmmt').val();
            console.log(pin_comment);
            if (change.doc.id == pin_comment) {
              var pin = '<i id="pin_cmt' + change.doc.id +
                '" class="pr-3 icon-pushpin " title="Pin" onclick="unpin_cmt(' + param +
                ', ' + i + ')"></i>';
            } else {
              var pin = '<i id="pin_cmt' + change.doc.id +
                '" class="pr-3 icon-pushpin pin-color" title="Un-pin" onclick="pin_cmt(' +
                param + ', ' + i + ')"></i>';
            }
            var changecolor = 'col-change';
            var fillcolor = 'fillcolor';
          }
          else {
            var changecolor = '';
            var fillcolor = '';
            var pin = '';
          }
          i++;

          var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
          if(isValidUrl(change.doc.data().message) == true )
          {
         /*  if ((change.doc.data().message).match(regex)) { */
            var string_link = urlify(change.doc.data().message);
            $('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + string_link + '<label class="actions">' + pin +
              '<img src="https://shop.goswirl.live/assets/live/delete-button.png" id="btn' +
              i + '" onclick="myFunction(' + param + ', ' + deleteparam +
              ')"></label></p></div>').appendTo($('.SLS-comments-all')).addClass('new');
          }
          else {
            $('<div id="message-' + change.doc.id + '"><p class="' + fillcolor + '"><span>' + change.doc.data().name + ' </span>: ' + change.doc.data().message + '<label class="actions">' + pin +
              '<img src="https://shop.goswirl.live/assets/live/delete-button.png" id="btn' +
              i + '" onclick="myFunction(' + param + ', ' + deleteparam +
              ')"></label></p></div>').appendTo($('.SLS-comments-all')).addClass('new');
          }
        }
        if (change.type === "removed") {
          $('#message-' + change.doc.id).remove();
          $( '#delete' + i).remove();
        }
        if (change.doc.id == pin_comment) { $('#pin_cmt' + change.doc.id).parent().parent().addClass('active'); }
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
    let url;
    try { 
      url =new URL(string); 
    }
    catch(e){ 
      return false; 
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
function updateScrollbar() {
  var $messages = $('.SLS-panel-scroll-mcustom');
  $messages.mCustomScrollbar();
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0
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
/* new js */

function pin_cmt(e, i) {
  db.collection("live_streams").doc(stream_id).update({
    'pin_comment_id': e
  });
  $('#pin_cmmt').val(e);
  unpincommet(e, i);
  $('#pin_cmt' + e).parent().parent().addClass('active');
  $('#pin_cmt' + e).removeClass('pin-color');
  $('#pin_cmt' + e).attr('title', 'Un-Pin');
  let r = " '" + e + "' ";
  $('#pin_cmt' + e).attr('onclick', 'unpin_cmt(' + r + ', ' + i + ')');
}

function unpin_cmt(e, i) {
  db.collection("live_streams").doc(stream_id).update({
    'pin_comment_id': ''
  });
  $('#pin_cmt' + e).addClass('pin-color');
  $('#pin_cmt' + e).parent().parent().removeClass('active');
  $('#pin_cmt' + e).attr('title', 'Pin');
  let r = " '" + e + "' ";
  $('#pin_cmt' + e).attr('onclick', 'pin_cmt(' + r + ', ' + i + ')');
}
function unpincommet(e, i) {
  db.collection("messages").doc(stream_id).collection("messages").get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.id != e) {
          let r = " '" + doc.id + "' ";
          $('#pin_cmt' + doc.id).addClass('pin-color');
          $('#pin_cmt' + doc.id).parent().parent().removeClass('active');
          $('#pin_cmt' + doc.id).attr('onclick', 'pin_cmt(' + r + ', ' + i + ')');
        }
      });
    });
}
function myFunction(e, cmnt) {
  var pin = $('#pin_cmmt').val();
  if (pin == e) {
    db.collection("live_streams").doc(stream_id).update({
      'pin_comment_id': ''
    });
  }
  var docRef = db.collection("messages").doc(stream_id).collection("messages");
  docRef.doc(e).delete();
  $('#message-' + e).remove();
}

function endStream() 
{
  swal({
    text: "Are you sure you want to end this Live Stream?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: false
  }).then(function(isConfirm) 
  {
    if (isConfirm.value == true) 
    {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;

      db.collection("live_streams").doc(stream_id).update({
          'ending_time': dateTime,
          'is_live': false,
          'is_recorded': true,
          'camera': 0
      });
      var multiple_views_factor = $("#multiple_views_factor").val();
      var starting_time = $('#starting_time').val();
      $.ajax({
          type: "POST",
          dataType: "json",
          url: base_url + "index.php/Welcome/endStream",
          data: "stream_id=" + encodeURIComponent(stream_id) + "&datetime=" + dateTime + "&multiple_views_factor=" +"&starting_time="+starting_time+encodeURIComponent(multiple_views_factor),
          success: function(data) {
            
            swal({
              title: "Success!",
              text: data.msg,
              type: "success",
              confirmButtonText: "OK"
            }).then(function(isConfirm) 
            {
              if (isConfirm) 
              {
                location.reload(true);
              }
            });
            //swal("", data.msg, "success"); 
                
          }
      });
    }
    else {
        swal("Cancelled", "", "error");
    }
  });   
}

function youtube_social(id)
{
    var key = document.getElementById("youtbestream_key_"+id).value;
    var url = document.getElementById("youtbeurl_"+id).value;  
    $.ajax({
      type: "POST",
      dataType : "json",
      url: base_url + "index.php/Welcome/add_youtube_rtmp",
      data: "stream_id="+encodeURIComponent(id)+"&rtmpUrl="+encodeURIComponent(url)+"&stream_name="+encodeURIComponent(key),
      success: function(json)
      {
          $('.error_msg').html(json.message).fadeIn().delay(3000).fadeOut();
          if(json.status_code == '1')
          {
              //$('#youtube-submit').hide();
          }
      }
    });
}

function fb_social(id)
{
  var key = document.getElementById("fbstream_key_"+id).value;
  var url = document.getElementById("fburl_"+id).value;  
  if (url == '') {
      $('.error_msg').addClass('text-danger');
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#fburl_'+id).focus();
      return false;
  } else if (key == '') {
    $('.error_msg').addClass('text-danger');
    $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#fbstream_key_'+id).focus();
    return false;
  } 
  else{
    $('.error_msg').removeClass('text-danger');
    $('.error_msg').addClass('text-success');
    $.ajax({
        type: "POST",
        dataType : "json",
        url: base_url + "index.php/Welcome/add_fb_rtmp",
        data: "stream_id="+encodeURIComponent(id)+"&rtmpUrl="+encodeURIComponent(url)+"&stream_name="+encodeURIComponent(key),
        success: function(json)
        {
            $('.error_msg').html(json.message).fadeIn().delay(3000).fadeOut();
        }
    });
  }
}

function duck_insta(id)
{
  var key = document.getElementById("stream_key_"+id).value;
  var url = document.getElementById("url_"+id).value;
  if (url == '') {
      $('.error_msg').addClass('text-danger');
      $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
      $('#url_'+id).focus();
      return false;
  } else if (key == '') {
    $('.error_msg').addClass('text-danger');
    $('.error_msg').html("This is a required field.").fadeIn().delay(3000).fadeOut();
    $('#stream_key_'+id).focus();
    return false;
  } 
  else{
    $('.error_msg').removeClass('text-danger');
    $('.error_msg').addClass('text-success');  
    $.ajax({
        type: "POST",
        dataType : "json",
        url: base_url + "index.php/Welcome/add_insta_rtmp",
        data: "stream_id="+encodeURIComponent(id)+"&rtmpUrl="+encodeURIComponent(url)+"&stream_name="+encodeURIComponent(key),
        success: function(json)
        {
            $('.error_msg').html(json.message).fadeIn().delay(3000).fadeOut();
        }
    });
  }
}

db.collection("live_streams").doc(stream_id).onSnapshot((doc) => {
  if (doc.exists) 
  {
      var value = doc.data().comments_status;
      $('#toggle-event').prop('checked', value).change();
  }
  else
  {
      $('#toggle-event').prop('checked', true).change();
  }
});
$('#toggle-event').change(function() {
  var value = $(this).prop('checked');
  db.collection("live_streams").doc(stream_id).update({
    'comments_status' : value
  });
})

function copy_text(e) {
  var copyText = document.getElementById("copy-text-" + e);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}
$(document).on('click', ".starproducts", function() {

  var star_products = $('#star_products').val();
  var myArray = star_products.split(", ");
  var length = myArray.length;
  console.log(myArray);
  console.log(length);

  
  var productId = $(this).data("productid");
  var stream_id = $('#stream_id').val();
  var visible = $(this).children('img:visible').attr('value');
  if(visible == '0')
  {
    if(length >= 3)
    {
      swal("", "Exceeded maximum star products ", "error");
    }else{
      $(this).find("img").toggle();
      $('.productblock-'+productId).toggleClass('setproduct');
      $(this).toggleClass('setproduct');
      var status = $(this).hasClass("setproduct");

      $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url + "index.php/Welcome/addstar_products",
        data: "productid=" + encodeURIComponent(productId) + "&status=" + encodeURIComponent(status) + "&stream_id=" + encodeURIComponent(stream_id),
        success: function (json) {
          console.log(json);
          if (json.status_code == '1') {
            var star_products = $("#star_products").val(json['value']);
          }
        }
      }); 
    }
  }else{
    $(this).find("img").toggle();
    $('.productblock-'+productId).toggleClass('setproduct');
    $(this).toggleClass('setproduct');
    var status = $(this).hasClass("setproduct");

    $.ajax({
      type: "POST",
      dataType: "json",
      url: base_url + "index.php/Welcome/addstar_products",
      data: "productid=" + encodeURIComponent(productId) + "&status=" + encodeURIComponent(status) + "&stream_id=" + encodeURIComponent(stream_id),
      success: function (json) {
        console.log(json);
        if (json.status_code == '1') {
          var star_products = $("#star_products").val(json['value']);
        }
      }
    }); 
  }
});
db.collection("live_streams").doc(streamId).onSnapshot((doc) => {
  if (doc.exists) {
    var pin = doc.data().pin_comment_id;
    console.log(pin);
    /* var i = 1;
    if (pin != '' && pin != undefined) {   
      pin_cmt(pin, i); 
    }else{
      unpincommet(pin, i);
    } */
  }
});

/* if ((end_time_stream == '0000-00-00 00:00:00')) {
  db.collection("live_streams").doc(stream_id).onSnapshot((doc) => {
    if (doc.exists) {
      setInterval(function() {
          $.ajax({
              type: "POST",
              dataType: "json",
              url: base_url+"index.php/Welcome/getMuxtotalviews",
              async: false,
              data: "stream_id=" + encodeURIComponent(stream_id),
              beforeSend: function() {},
              success: function(json) {
                  //multiple views factor
                  if (json.total_views != null) {
                    var multiple_views_factor = $("#multiple_views_factor").val();
                    var total_views = json.total_views + 1;
                    multiple_views = (total_views * multiple_views_factor);
                    var unique_viewers = json.value;
                    result = nFormatter(multiple_views);
                    $('.mux_total_views').html('<i class="fa fa-eye pr-2" aria-hidden="true"></i>' + result);
                    db.collection("live_streams").doc(stream_id).update({
                        'ivs_viewer_count': multiple_views,
                        'unique_viewers': json.value,
                        'total_watch_time': json.total_watch_time,
                        'total_playing_time': json.total_playing_time
                    });  
                  } else {
                      multiple_views = 0;
                      $('.mux_total_views').html('<i class="fa fa-eye pr-2" aria-hidden="true"></i>' + multiple_views);
                      db.collection("live_streams").doc(stream_id).update({
                          'ivs_viewer_count': multiple_views
                      });
                  }
              }
          });
      }, 120000);
    } else {
      multiple_views = 0;
      $('.mux_total_views').html('<i class="fa fa-eye pr-2" aria-hidden="true"></i>' +multiple_views);
      db.collection("live_streams").doc(stream_id).update({
          'ivs_viewer_count': multiple_views
      });
    }
  });
} */

if ((end_time_stream == '0000-00-00 00:00:00')) {
  setInterval(function() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: base_url+"index.php/Welcome/getMuxtotalviews",
        data: "stream_id=" + encodeURIComponent(stream_id),
        beforeSend: function() {},
        success: function(json) {
            //multiple views factor
            if (json.total_views != null) {
              var multiple_views_factor = $("#multiple_views_factor").val();
              var total_views = json.total_views + 1;
              multiple_views = (total_views * multiple_views_factor);
              var unique_viewers = json.value;
              result = nFormatter(multiple_views);
             /*  $('.mux_total_views').html('<i class="fa fa-eye pr-2" aria-hidden="true"></i>' + result); */
              $('#view-count').text(result);
              db.collection("live_streams").doc(stream_id).update({
                  'ivs_viewer_count': multiple_views,
                  'unique_viewers': json.value,
                  'total_watch_time': json.total_watch_time,
                  'total_playing_time': json.total_playing_time
              });  
            } else {
                multiple_views = 0;
                /* $('.mux_total_views').html('<i class="fa fa-eye pr-2" aria-hidden="true"></i>' + multiple_views); */
                $('#view-count').text(multiple_views);
                db.collection("live_streams").doc(stream_id).update({
                    'ivs_viewer_count': multiple_views
                });
            }
        }
    });
  }, 120000);
}

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


