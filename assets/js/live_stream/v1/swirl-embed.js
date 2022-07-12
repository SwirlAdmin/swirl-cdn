var url = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
url = url.replace('#', '');
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let SET1 , SET2 = false;

var headTag = document.getElementsByTagName("head")[0];

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
headTag.insertBefore(jqTag, headTag.firstChild);

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/css/live_stream/v1/live-streams.min.css';
// jqTag.href = 'live-streams.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('script');
jqTag.rel = 'text/javascript';
jqTag.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
headTag.insertBefore(jqTag, headTag.lastChild);
jqTag.onload = function () { SET1 = true; };

if (typeof jQuery == 'undefined') {
    var jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    headTag.insertBefore(jqTag, headTag.lastChild);
    jqTag.onload = function () { SET2 = true; };
} else {
    SET2 = true;
}

let SLScriptsLOADED = setInterval(() => {
    if(SET1 && SET2) {
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
                        append += `                                
                                <div class="col-md-2 mb-2 px-1">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="watchStream('${scheduled.streamURL}');">
                                        <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.png" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">
                                        <p class="SL-stream-label ${checkLive(scheduled.streram_id) ? 'LL' : 'SL'}">${checkLive(scheduled.streram_id) ? 'Live' : 'Coming'}</p>
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${scheduled.title}</p>
                                    </div>
                                </div>                                    
                            `;
                    });
                }

                if (data['completed'].length) {
                    data['completed'].forEach(completed => {
                        append += `
                                <div class="col-md-2 mb-2 px-1">
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="watchStream('${completed.streamURL}');">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" title="Stream Thumbnail">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.png" class="SL-play-btn" alt="Play icon"
                                            title="Play icon">
                                        <p class="SL-stream-label CL">Ended</p>
                                        <p class="SL-stream-title scroll_on_hover ellipsis">${completed.title}</p>
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
function checkLive(streamId) {    
    return false;
}