var url = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
url = url.replace('#', '');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let SET1, SET2 = false;

var headTag = document.getElementsByTagName("head")[0];

if (typeof jQuery == 'undefined') {
    var jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    headTag.insertBefore(jqTag, headTag.lastChild);
    jqTag.onload = function () { SET2 = true; };
} else {
    SET2 = true;
}

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://goswirl.shop/swirl-embed/live-stream-page/v2/live-streams.css';
// jqTag.href = 'live-streams.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('script');
jqTag.rel = 'text/javascript';
jqTag.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
headTag.insertBefore(jqTag, headTag.lastChild);
jqTag.onload = function () { SET1 = true; };

let SLScriptsLOADED = setInterval(() => {
    if (SET1 && SET2) {
        executeSLiveNow();
        clearInterval(SLScriptsLOADED);
    }
}, 500);

function executeSLiveNow() {
    $('#swirl-live-streams').append(`
        <div class="SL-streams-list"></div>
        
        <div class="SL-iframe-live" style="display:none;">
            <iframe style="width: 100%;height: 100vh;border: none;position: fixed;top: 0;left: 0;z-index: 1211;" src=""></iframe>
            <span onclick="closeLiveStreamPop();" style="position: fixed;top: 15px;right: 15px;background: #fff;color: #6f4cd0;z-index: 1211;font-family: sans-serif;font-size: 25px;line-height: 25px;height: 25px;width: 25px;text-align: center;border-radius: 50%;cursor: pointer;">&times;</span>
        </div>
                    
        <div class="modal fade" id="shareStreamModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                
                <div class="modal-header px-0 mx-3">
                    <h6 class="modal-title">Share</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                
                <div class="modal-body text-center SL-share">
                    <span class="SL-link-copied">Link Copied!</span>
                    <img class="SL-facebook" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook">
                    <img class="SL-twitter" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter">
                    <img class="SL-whatsapp" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp">
                    <img class="SL-copy" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy link">
                    <input type="text" class="SL-copylink-input d-none" value="" onclick="SLcopyLink(this);">
                </div>                    

                </div>
            </div>
        </div>            
    `);

    let code = $('#swirl-live-streams').data('code');
    let domain = (new URL(url));
    let store = domain.hostname;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://goswirl.shop/admin/api/LiveAPI/streamlisting?user=" + code,
        success: function (data) {
            if (Object.keys(data).length && (data['scheduled'].length || data['completed'].length)) {
                let append = '<div class="row">';
                if (data['scheduled'].length) {
                    data['scheduled'].forEach(scheduled => {
                        var onDT = new Date(`${scheduled.starting_time}`);
                        onDT = ""+onDT.getDate()+" "+monthNames[`${onDT.getMonth()}`]+", "+onDT.getFullYear()+" "+onDT.getHours()+":"+onDT.getMinutes()+"";
                        append += `                                
                                <div class="col-md-2 mb-2 px-1">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="event.target.className != 'SL-share-img' ? watchStream('${scheduled.streamURL}') : '';">
                                        <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.png" class="SL-play-btn" alt="Play icon"
                                            title="Play">                                                                                
                                        <p class="SL-stream-title scroll_on_hover ellipsis">Scheduled</p>
                                        <div class="SL-stream-info-container">
                                            <div class="SL-stream-info">
                                                <p class="scroll_on_hover ellipsis">${scheduled.title}</p>
                                                <label>${onDT}</label>
                                            </div>
                                            <div class="SL-stream-share">
                                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/share.png" alt="Share icon"
                                                title="Play" onclick="shareStream('${scheduled.streamURL}')" class="SL-share-img">
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                            `;
                    });
                }

                if (data['completed'].length) {
                    data['completed'].forEach(completed => {
                        var onDT = new Date(`${completed.starting_time}`);
                        onDT = ""+onDT.getDate()+" "+monthNames[`${onDT.getMonth()}`]+", "+onDT.getFullYear()+" "+onDT.getHours()+":"+onDT.getMinutes()+"";
                        append += `
                                <div class="col-md-2 mb-2 px-1">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="event.target.className != 'SL-share-img' ? watchStream('${completed.streamURL}') : '';">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.png" class="SL-play-btn" alt="Play icon"
                                            title="Play">                                        
                                        <p class="SL-stream-title scroll_on_hover ellipsis">Completed</p>
                                        <div class="SL-stream-info-container">
                                            <div class="SL-stream-info">
                                                <p class="scroll_on_hover ellipsis">${completed.title}</p>
                                                <label>${onDT}</label>
                                            </div>
                                            <div class="SL-stream-share">
                                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/share.png" alt="Share icon"
                                                title="Share" onclick="shareStream('${completed.streamURL}')" class="SL-share-img">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

                    });
                }

                $('.SL-streams-list').html(append);

                // Shared link autoplay
                const urlSearchParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlSearchParams.entries());
                if (typeof params['stream'] != 'undefined') {
                    $(`div[data-stream="${window.atob(params['stream'])}"]`).click();
                }

                // share clicks
                $('.SL-facebook').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('https://www.facebook.com/sharer/sharer.php?u=' + link, '_blank');
                });

                $('.SL-twitter').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('https://twitter.com/share?url=' + link, '_blank');
                });

                $('.SL-whatsapp').click(function () {
                    let link = $(this).attr('data-sharelink');

                    window.open('whatsapp://send?text=' + link);
                });

                $('.SL-copy').click(function () {
                    let link = $(this).attr('data-sharelink');

                    $('.SL-copylink-input').val(link);
                    $('.SL-copylink-input').click();
                    $('.SL-link-copied').fadeIn().delay(3000).fadeOut();
                });

                // for stuff that scrolls left on hover
                $(".scroll_on_hover").mouseover(function () {
                    $(this).removeClass("ellipsis");
                    var maxscroll = $(this).width();
                    var speed = maxscroll * 15;
                    $(this).animate({
                        scrollLeft: maxscroll
                    }, speed, "linear");
                });

                $(".scroll_on_hover").mouseout(function () {
                    $(this).stop();
                    $(this).addClass("ellipsis");
                    $(this).animate({
                        scrollLeft: 0
                    }, 'slow');
                });
            }
            else {
                $('#swirl-live-streams').html(`
                        <p class="h5 text-muted text-center my-5">No Live Stream yet!</p>
                    `);
            }
        }
    });
}

function closeLiveStreamPop() {
    let sls = document.querySelector('.SL-iframe-live');

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    slsFrame.src = '';

    sls.style.display = 'none';
}

function watchStream(stream) {
    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    // slsFrame.src = stream+'?plugin=1';
    let link = btoa(url + '?stream=' + window.btoa(stream));
    slsFrame.src = stream + '?plugin=' + link;

    $('.SL-iframe-live').show();
}

function shareStream(stream) {
    $('.SL-share img').attr('data-sharelink', url + '?stream=' + window.btoa(stream));

    $('#shareStreamModal').modal('toggle');
}

function SLcopyLink(inp) {
    /* Get the text field */
    var copyText = inp;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    return;
}

function checkLive(streamId) {
    return false;
}        