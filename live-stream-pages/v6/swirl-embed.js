var urlSL = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
urlSL = urlSL.replace('#', '');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var displaySL = 9;

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
jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/live-stream-pages/v6/live-streams.min.css';
// jqTag.href = 'live-streams.css';
headTag.insertBefore(jqTag, headTag.lastChild);

// var jqTag = document.createElement('script');
// jqTag.rel = 'text/javascript';
// jqTag.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
// headTag.insertBefore(jqTag, headTag.lastChild);
// jqTag.onload = function () { SET1 = true; };
SET1 = true;

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
            <img onclick="closeLiveStreamPop();" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/live-close-icon.svg" style="position: fixed;top: 15px;right: 15px;z-index: 1211;height: 30px;width: 30px;cursor: pointer;">            
        </div> 
        
        <input type="text" class="SL-copylink-input" value="" style="display: none !important;" onclick="SLcopyLink(this);">
    `);
        
    let code = $('#swirl-live-streams').data('code');
    let domain = (new URL(urlSL));
    let store = domain.hostname;
    let serverURL = typeof $('#swirl-live-streams').attr('swirltest') != 'undefined' ? 'https://livevideoshopping.in/admin/api/LiveAPI/streamlisting?user=' : 'https://goswirl.shop/admin/api/LiveAPI/streamlisting?user=';
    $.ajax({
        type: "POST",
        dataType: "json",
        // url: "https://livevideoshopping.in/admin/api/LiveAPI/streamlisting?user=" + code,
        // url: "https://goswirl.shop/admin/api/LiveAPI/streamlisting?user=" + code,
        url: serverURL + code,
        success: function (data) {
            if (Object.keys(data).length && (data['scheduled'].length || data['completed'].length)) {
                customization = data['data'];
                // console.log(customization);

                let append = '';
                if (customization.format == 0) {

                    var scounts = 0;

                    append += '<div class="row">';
                    // if (data['live'].length) {
                    //     data['live'].forEach(live => {
                    //         append += `                                
                    //                 <div class="col-md-2 mb-3">
                    //                     <div class="SL-active-stream-video-container position-relative" data-stream="${live.streamURL}" onclick="watchStream('${live.streamURL}');">
                    //                         <img src="${live.cover_img}" class="SL-vdo-thmub"
                    //                             alt="Stream Thumbnail" >
                    //                         <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                    //                             >
                    //                         <p class="SL-stream-label LL">Live</p>
                    //                         <p class="SL-stream-title scroll_on_hover ellipsis">${live.title}</p>
                    //                     </div>
                    //                 </div>                                                              
                    //             `;
                    //     });
                    // }

                    if (data['scheduled'].length) {
                        data['scheduled'].forEach(scheduled => {
                            scounts++;
                            var onDT = new Date(`${(scheduled.starting_time).replaceAll('-', '/')}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            if (scounts == 1) {
                                append += `                                
                                    <div class="col-md-12 mb-5 SL-full-card" style="background: #fff8fc !important;">
                                        <div class="row align-items-center justify-content-center">
                                            <div class="col-md-4 p-0">
                                                <img src="${scheduled.cover_img}" class="SL-vdo-thmub-full" alt="Stream Thumbnail" >
                                            </div>
                                            <div class="col-md-8 py-3 order-md-first">
                                                <p class="SL-stream-title-full">${scheduled.title}</p>
                                                <p class="SL-stream-desc-full">${scheduled.description ? scheduled.description : ''}</p>
                                                <button class="SL-stream-play-action-full d-none" onclick="watchStream('${scheduled.streamURL}');" style="color: ${customization.date_bk_color} !important; border-color: ${customization.date_bk_color} !important;">Watch Now</button>

                                                <div class="SL-schedule-timer">
                                                    <p class="SL-schedule-on-date">Scheduled for ${onDT}</p>
                                                    <div class="SL-active-stream-video-content mb-3">
                                                        <b id="${scheduled.id}day"></b>
                                                        <b id="${scheduled.id}hour"></b>
                                                        <b id="${scheduled.id}min"></b>
                                                        <b id="${scheduled.id}sec"></b>
                                                    </div>                                                
                                                </div>

                                                <div class="SL-share mt-4">
                                                    <p class="SL-link-copied" style="color: ${customization.date_bk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>                                                
                                            </div>                                            
                                        </div>                                        
                                    </div>                                    
                                `;

                                var countDownDate = [];
                                var x = [];
                                var now = [];
                                var distance = [];
                                var days = [];
                                var hours = [];
                                var minutes = [];
                                var seconds = [];
                                // countDownDate[scheduled.id] = new Date("2022-10-17 20:25:00").getTime();
                                countDownDate[scheduled.id] = new Date((scheduled.starting_time).replaceAll('-', '/')).getTime();
                                x[scheduled.id] = setInterval(function () {
                                    // Get today's date and time
                                    now[scheduled.id] = new Date().getTime();

                                    // Find the distance between now and the count down date
                                    distance[scheduled.id] = countDownDate[scheduled.id] - now[scheduled.id];

                                    // Time calculations for days, hours, minutes and seconds
                                    days[scheduled.id] = Math.floor(distance[scheduled.id] / (1000 * 60 * 60 * 24));
                                    hours[scheduled.id] = Math.floor((distance[scheduled.id] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                    minutes[scheduled.id] = Math.floor((distance[scheduled.id] % (1000 * 60 * 60)) / (1000 * 60));
                                    seconds[scheduled.id] = Math.floor((distance[scheduled.id] % (1000 * 60)) / 1000);
                                    
                                    // Output the result in an element with id="demo"
                                    document.getElementById(`${scheduled.id}day`).innerHTML = String(days[scheduled.id]).padStart(2, '0');
                                    document.getElementById(`${scheduled.id}hour`).innerHTML = String(hours[scheduled.id]).padStart(2, '0');
                                    document.getElementById(`${scheduled.id}min`).innerHTML = String(minutes[scheduled.id]).padStart(2, '0');
                                    document.getElementById(`${scheduled.id}sec`).innerHTML = String(seconds[scheduled.id]).padStart(2, '0');

                                    // If the count down is over, write some text 
                                    if (distance[scheduled.id] < 0) {
                                        clearInterval(x[scheduled.id]);
                                        document.getElementById(`${scheduled.id}day`).innerHTML = '00';
                                        document.getElementById(`${scheduled.id}hour`).innerHTML = '00';
                                        document.getElementById(`${scheduled.id}min`).innerHTML = '00';
                                        document.getElementById(`${scheduled.id}sec`).innerHTML = '00';

                                        // location.reload();
                                        watchStream(`${scheduled.streamURL}`);
                                        $('.SL-schedule-timer').html(`
                                            <style>
                                                .SL-watch-live-btn::before {
                                                    background-color: ${customization.date_bk_color} !important;
                                                }
                                            </style>
                                            <button class="SL-watch-live-btn" onclick="watchStream('${scheduled.streamURL}');" style="color: ${customization.date_fk_color} !important; background: ${customization.date_bk_color} !important;">WATCH LIVE</button>
                                        `);
                                    }
                                }, 1000);
                            } else {
                                append += `                                
                                    <div class="col-md-4 mb-3 px-md-5 loading-SL" ${scounts > (displaySL+1) ? 'style="display: none;"' : ''}>
                                        <p class="SL-stream-title">${scheduled.title}</p>
                                        <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${scheduled.streamURL}') : '';">
                                            <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                                alt="Stream Thumbnail" >
                                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                                >                                                                                
                                            <p class="SL-date-top">${onDT.split(',')[0]}</p>                                        
                                            <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                                <div class="SL-stream-info">                                                    
                                                    <div class="text-left SL-share">
                                                        <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                        <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                        <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                        <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                        <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>
                                        <p class="SL-stream-desc">${scheduled.description ? scheduled.description : ''}</p>
                                        <button class="SL-stream-play-action" style="background: ${customization.date_bk_color} !important; color: ${customization.date_fk_color} !important;" onclick="watchStream('${scheduled.streamURL}');">Watch Now</button>
                                    </div>                                    
                                `;
                            }
                        });
                    }

                    if (data['completed'].length) {
                        data['completed'].forEach(completed => {
                            scounts++;
                            var onDT = new Date(`${(completed.starting_time).replaceAll('-', '/')}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            if (scounts == 1) {
                                append += `                                
                                    <div class="col-md-12 mb-5 SL-full-card" style="background: #fff8fc !important;">
                                        <div class="row align-items-center justify-content-center">
                                            <div class="col-md-4 p-0">
                                                <img src="${completed.cover_img}" class="SL-vdo-thmub-full" alt="Stream Thumbnail" >
                                            </div>
                                            <div class="col-md-8 py-3 order-md-first">
                                                <p class="SL-stream-title-full">${completed.title}</p>
                                                <p class="SL-stream-desc-full">${completed.description ? completed.description : ''}</p>
                                                <button class="SL-stream-play-action-full" onclick="watchStream('${completed.streamURL}');" style="color: ${customization.date_bk_color} !important; border-color: ${customization.date_bk_color} !important;">Watch Now</button>

                                                <div class="SL-share mt-4">
                                                    <p class="SL-link-copied" style="color: ${customization.date_bk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>                                    
                                `;
                            } else {
                                append += `
                                    <div class="col-md-4 mb-3 px-md-5 loading-SL" ${scounts > (displaySL+1) ? 'style="display: none;"' : ''}>
                                        <p class="SL-stream-title">${completed.title}</p>
                                        <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${completed.streamURL}') : '';">
                                            <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                                alt="Stream Thumbnail" >
                                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                                >                                        
                                            <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                            ${customization.total_view_set ? `<p class="SL-views-top"><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon"> ${completed.total_views}</p>` : ''}                                        
                                            <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                                <div class="SL-stream-info">                                                    
                                                    <div class="text-left SL-share">
                                                        <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                        <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                        <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                        <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                        <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>
                                        <p class="SL-stream-desc">${completed.description ? completed.description : ''}</p>
                                        <button class="SL-stream-play-action" style="background: ${customization.date_bk_color} !important; color: ${customization.date_fk_color} !important;" onclick="watchStream('${completed.streamURL}');">Watch Now</button>
                                    </div>
                                `;
                            }
                        });
                    }

                    append += '</div>';
                    if (scounts > displaySL) {
                        append += `<button class="SL-stream-load-more mb-4" onclick="loadMoreSL(this);" style="color: ${customization.date_bk_color} !important; border-color: ${customization.date_bk_color} !important;">LOAD MORE <p class="SL-loader" style="border-color: ${customization.date_bk_color}25 !important; border-top-color: ${customization.date_bk_color} !important;"></p></button>`;
                    }

                } else {

                    if (data['scheduled'].length) {
                        append += `<p class="m-0 mb-1 mt-4 pb-2 h5 SL-break-title ${customization.header_setting ? 'text-center' : ''}">${customization.schedule_text}</p><hr class="SL-title-border ${customization.header_setting ? 'm-auto mb-3' : ''}" style="background: ${customization.date_bk_color} !important;"><div class="row px-2">`;
                        data['scheduled'].forEach(scheduled => {
                            var onDT = new Date(`${(scheduled.starting_time).replaceAll('-', '/')}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `                                
                                <div class="col-md-4 mb-3 px-md-5">
                                    <p class="SL-stream-title">${scheduled.title}</p>
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${scheduled.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${scheduled.streamURL}') : '';">
                                        <img src="${scheduled.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" >
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            >                                                                                
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">                                                
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <p class="SL-stream-desc">${scheduled.description ? scheduled.description : ''}</p>
                                    <button class="SL-stream-play-action" style="background: ${customization.date_bk_color} !important; color: ${customization.date_fk_color} !important;" onclick="watchStream('${scheduled.streamURL}');">Watch Now</button>
                                </div>                                    
                            `;
                        });
                        append += '</div>';
                    }

                    if (data['completed'].length) {
                        append += `<p class="m-0 mb-1 mt-4 pb-2 h5 SL-break-title ${customization.header_setting ? 'text-center' : ''}">${customization.completed_text}</p><hr class="SL-title-border ${customization.header_setting ? 'm-auto mb-3' : ''}" style="background: ${customization.date_bk_color} !important;"><div class="row px-2">`;
                        data['completed'].forEach(completed => {
                            var onDT = new Date(`${(completed.starting_time).replaceAll('-', '/')}`);
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " " + onDT.getHours() + ":" + onDT.getMinutes() + "";
                            append += `
                                <div class="col-md-4 mb-3 px-md-5">
                                    <p class="SL-stream-title">${completed.title}</p>
                                    <div class="SL-active-stream-video-container position-relative" data-stream="${completed.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${completed.streamURL}') : '';">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub"
                                            alt="Stream Thumbnail" >
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg" class="SL-play-btn" alt="Play icon"
                                            >                                        
                                        <p class="SL-date-top">${onDT.split(',')[0]}</p>
                                        ${customization.total_view_set ? `<p class="SL-views-top"><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon"> ${completed.total_views}</p>` : ''}
                                        <div class="SL-stream-info-container" style="background: ${customization.date_bk_color} !important;">
                                            <div class="SL-stream-info">                                                
                                                <div class="text-left SL-share">
                                                    <p class="SL-link-copied" style="color: ${customization.date_fk_color} !important;">Link Copied!</p>
                                                    <img class="SL-facebook SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Facebook icon" title="Share on Facebook">
                                                    <img class="SL-twitter SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Twitter icon" title="Share on Twitter">
                                                    <img class="SL-whatsapp SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Whatsapp icon" title="Share on Whatsapp">
                                                    <img class="SL-copy SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" alt="Copy link icon" title="Copy link">                                                
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <p class="SL-stream-desc">${completed.description ? completed.description : ''}</p>
                                    <button class="SL-stream-play-action" style="background: ${customization.date_bk_color} !important; color: ${customization.date_fk_color} !important;" onclick="watchStream('${completed.streamURL}');">Watch Now</button>
                                </div>
                            `;

                        });
                        append += '</div>';
                    }

                }

                $('.SL-streams-list').html(append);

                window.addEventListener('load', (event) => {
                    // Shared link autoplay
                    const urlSearchParams = new URLSearchParams(window.location.search);
                    const params = Object.fromEntries(urlSearchParams.entries());
                    if (typeof params['stream'] != 'undefined') {
                        window.scrollTo(0, 500);
                        setTimeout(() => {
                            $(`div[data-stream="${window.atob(params['stream'])}"]`).click();
                        }, 500);
                    }
                });

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
                    $(this).parent('.SL-share').find('.SL-link-copied').fadeIn().delay(3000).fadeOut();
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

                $(window).resize(function () {
                    SLFrameHeight();
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

let allOverElementsLS = [];
let allOverElementsLSSticky = [];

function closeLiveStreamPop() {
    let sls = document.querySelector('.SL-iframe-live');

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    slsFrame.src = '';

    sls.style.display = 'none';

    // Scroll and over items
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    allOverElementsLS.forEach(element => {
        $(element).show();
    });

    // Show again all hidden fixed elements
    allOverElementsLSSticky.forEach(element => {
        $(element).show();
    });
}

function watchStream(stream) {
    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    // slsFrame.src = stream+'?plugin=1';
    let link = btoa(urlSL + '?stream=' + window.btoa(stream));
    slsFrame.src = stream + '?plugin=' + link;

    // Scroll and over items
    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // hide all fixed visible elements
    allOverElementsLS = [];
    allOverElementsLSSticky = [];
    $('*').each(function () {
        if ($(this).css('position') == 'fixed' && $(this).is(":visible")) {
            if (!$(this).is('.SSV-play-modal') && !$(this).is('.SSV-PIP')) {
                $(this).hide();
                allOverElementsLS.push($(this));
            }
        }

        if ($(this).css('position') == 'sticky' && $(this).is(":visible")) {
            if (!$(this).is('.SSV-play-modal') && !$(this).is('.SSV-PIP')) {
                $(this).hide();
                allOverElementsLS.push($(this));
            }
        }
    });

    SLFrameHeight();
    $('.SL-iframe-live').show();
}

function SLcopyLink(inp) {
    /* Get the text field */
    var copyText = inp;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    return;
}

function loadMoreSL(btn) {    
    $('.SL-loader').show();
    setTimeout(() => {
        var showCount = 0;
        $('.loading-SL:hidden').each(function () {
            showCount++;
            if (showCount <= displaySL) {
                $(this).show();
            }
        });

        if ($('.loading-SL:hidden').length == 0) {
            $('.SL-stream-load-more').hide();
        }

        $('.SL-loader').hide();
    }, 2000);
}

function SLFrameHeight() {
    $('.SL-iframe-live iframe').height(window.innerHeight); //set full height
}

function checkLive(streamId) {
    return false;
}