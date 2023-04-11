$(document).ready(function () {
  SLSsetHeight();
});

$(window).resize(function () {
  SLSsetHeight();
});

function SLSsetHeight() {
  let currentHeight = window.innerHeight - 1;
  $(".SLS-main-conatiner").height(currentHeight);
}


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
        flag : '0'
    });
    //viewcount();
    updateScrollbar();
    $('.message-input').val(null);
}

var $messages = $('.SLS-panel-scroll-mcustom');
//get stream id
var streamId = $('#stream_id').val();
$messages.mCustomScrollbar();
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
          if ((change.doc.data().message).match(regex)) {
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
          //$( '#delete' + i).remove();
          $('#message-' + change.doc.id).remove();
        }
        if (change.doc.id == pin_comment) { $('#pin_cmt' + change.doc.id).parent().parent().addClass('active'); }
    });
    updateScrollbar();
  });


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