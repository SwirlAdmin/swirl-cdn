var urlSL = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
urlSL = urlSL.replace('#', '');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var displaySL = 12;
let allStreamsSL = [];
let currentStreamSL = '';

let SET1, SET2 = false;

var headTag = document.getElementsByTagName("head")[0];

if (typeof jQuery == 'undefined') {
    var jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    headTag.insertBefore(jqTag, headTag.lastChild);
    jqTag.onload = function () { SET1 = true; };
} else {
    SET1 = true;
}

var jqTag = document.createElement('script');
jqTag.rel = 'text/javascript';
jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/v13/swiper.min.js';
headTag.insertBefore(jqTag, headTag.lastChild);
jqTag.onload = function () { SET2 = true; };

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
headTag.insertBefore(jqTag, headTag.lastChild);

var jqTag = document.createElement('link');
jqTag.rel = 'stylesheet';
jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/live-stream-pages/vivo-json/style.css';
// jqTag.href = 'live-streams.css';
headTag.insertBefore(jqTag, headTag.lastChild);

let SLScriptsLOADED = setInterval(() => {
    if (SET1 && SET2) {
        executeSLiveNow();
        clearInterval(SLScriptsLOADED);
    }
}, 500);

function executeSLiveNow() {
    $('body').append(`
        <div class="SL-iframe-live" style="display:none;">
            <iframe id="SL-iframe-tag" style="width: 100%;height: 100vh;border: none;position: fixed;top: 0;left: 0;z-index: 1211;" src="" allow="clipboard-read; clipboard-write; fullscreen"></iframe>
            <img class="SL-popup-close-btn SL-popup-close-btn-P" onclick="closeLiveStreamPop(true);" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/svg/arrow-down-s-line.svg">          
            <img class="SL-popup-close-btn SL-popup-close-btn-L" style="display: none;" onclick="closeLiveStreamPop(true);" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/landscape/close.webp">       
        </div> 

        <div class="SL-pip-live" style="display: none;">
            <video class="" onplaying="hideLoaderSL();" id="id-video-pip-SL" width="320" height="180" style="width: 320px; height: 180px;" playsinline="playsinline" preload="auto" data-setup="{}" autoplay muted loop>
                <source src="" type=""></source>
            </video> 
            <img class="SL-pip-close-btn" onclick="closePIPSL();" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/live-close-icon.svg">  
            <div class="SL-pip-fullscreen-btn" onclick="fullScreenPIPSL(event);"></div>
            <div class="SL-pip-loader">
                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg" alt="Spinner">
            </div>
        </div>

        <input type="text" class="SL-copylink-input" value="" style="display: none !important;" onclick="SLcopyLink(this);">
    `);

    if (document.getElementById('swirl-live-streams') == null) {
        if (localStorage.getItem('_pipSL')) {
            let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));
            allStreamsSL[btoa(pipStreamData.streamURL)] = pipStreamData;
            openPIPSL();
        }
        return;
    }

    $('#swirl-live-streams').append(`
        <div class="SL-streams-list"></div>        
    `);

    let code = $('#swirl-live-streams').data('code');
    let domain = (new URL(urlSL));
    let store = domain.hostname;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://goswirl-livestream-configs.s3.ap-south-1.amazonaws.com/static-assets/${code}.json?timestamp=${Math.floor(Date.now() / 1000)}`,
        success: function (data) {
            $('.SLS-loader').remove();
            if (Object.keys(data).length && (data['scheduled'].length || data['completed'].length)) {
                customization = data['data'];
                // console.log(customization);
                let append = '';
                let pastShows = '';
                let playThis = '';
                var scounts = 0;

                // append += '<style>.row{margin: 0;}</style><div class="row">';

                if (data['scheduled'].length) {
                    data['scheduled'].forEach(scheduled => {
                        scheduled.cover_img = customization.show_img == '2' ? scheduled.gif_img : scheduled.cover_img;
                        allStreamsSL[btoa(scheduled.streamURL)] = scheduled;
                        scounts++;
                        var onDT = new Date(`${(scheduled.starting_time).replaceAll('-', '/')}`);
                        var onTime = (onDT.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })).toUpperCase();
                        onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " - " + onTime;
                        let scheduleTimeUp = false;
                        if (scounts == 1) {
                            append += `                                
                                <div class="SL-full-card" style="background: #b3bdff !important;" data-stream="${scheduled.streamURL}">
                                    <div class="row m-auto justify-content-center">
                                        <div class="col-12 col-md-3 col-lg-3 col-md-offset-1 col-lg-offset-3 p-0 px-5 px-sm-0 position-relative">
                                            <img src="${scheduled.cover_img}" class="SL-vdo-thmub-full" alt="Stream Thumbnail" >
                                            <label class="SL-stream-badge" style="display: none!important; ${scheduled.is_live == '1' ? 'color: #ffffff !important; background: #FF0101 !important;' : ''}">${scheduled.is_live == '1' ? 'LIVE' : 'UPCOMING'}</label>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-4 px-sm-3 pt-4 pt-sm-0 ${customization.scheduled_grid == '0' ? 'order-md-first' : ''}">
                                            <p class="SL-stream-tag-full">${scheduled.is_live == '1' ? 'Currently <span>Live</span>' : 'Starting Soon'}</p>
                                            <p class="SL-stream-title-full">${scheduled.title}</p>
                                            <p class="SL-stream-desc-full">${onDT}</p>

                                            <div class="SL-schedule-timer">                                                
                                                <div class="SL-active-stream-video-content mb-4">
                                                    <b id="${scheduled.id}day"></b>
                                                    <b id="${scheduled.id}hour"></b>
                                                    <b id="${scheduled.id}min"></b>
                                                    <b id="${scheduled.id}sec"></b>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <button class="SL-watch-live-btn streamClick SL-watch-now-btn" onclick="watchStream('${scheduled.streamURL}');" style="display: none;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1.5"><path d="M12 2C6.487 2 2 6.487 2 12s4.487 10 10 10 10-4.487 10-10S17.513 2 12 2m0 1.5c4.703 0 8.5 3.797 8.5 8.5s-3.797 8.5-8.5 8.5A8.49 8.49 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5M9.706 7.589c-.628.039-1.206.56-1.206 1.24v6.343c0 .909 1.029 1.529 1.83 1.107l6.03-3.172c.85-.448.85-1.766 0-2.214l-6.03-3.172a1.2 1.2 0 0 0-.624-.132M10 9.242 15.24 12 10 14.758z"></path></svg>
                                                    Watch Now
                                                </button>
                                                <div class="SLdropdown-container SL-remindme-btn" style="display: none;">
                                                    <button onclick="SLtoggleDropdown('SLRemind')" class="SL-watch-live-btn SLdropdown-button">                                    
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px" fill-rule="nonzero"><g fill="#FFFFFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,0c-2.19922,0 -4,1.80078 -4,4c0,0.51563 0.10156,1.01563 0.28125,1.46875c-5.625,1.46094 -9.28125,6.34766 -9.28125,12.53125c0,7.83203 -1.92187,11.39844 -3.75,13.40625c-0.91406,1.00391 -1.81641,1.61328 -2.59375,2.1875c-0.39062,0.28516 -0.74609,0.57031 -1.0625,0.9375c-0.31641,0.36719 -0.59375,0.89063 -0.59375,1.46875c0,1.375 0.84375,2.54297 2.03125,3.3125c1.1875,0.76953 2.74609,1.26563 4.625,1.65625c2.4375,0.50391 5.44531,0.76953 8.75,0.90625c-0.25,0.66406 -0.40625,1.37891 -0.40625,2.125c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-0.75 -0.15234,-1.46484 -0.40625,-2.125c3.30469,-0.13672 6.3125,-0.40234 8.75,-0.90625c1.87891,-0.39062 3.4375,-0.88672 4.625,-1.65625c1.1875,-0.76953 2.03125,-1.9375 2.03125,-3.3125c0,-0.57812 -0.27734,-1.10156 -0.59375,-1.46875c-0.31641,-0.36719 -0.67187,-0.65234 -1.0625,-0.9375c-0.77734,-0.57422 -1.67969,-1.18359 -2.59375,-2.1875c-1.82812,-2.00781 -3.75,-5.57422 -3.75,-13.40625c0,-6.17969 -3.66406,-11.0625 -9.28125,-12.53125c0.17969,-0.45312 0.28125,-0.95312 0.28125,-1.46875c0,-2.19922 -1.80078,-4 -4,-4zM25,2c1.11719,0 2,0.88281 2,2c0,1.11719 -0.88281,2 -2,2c-1.11719,0 -2,-0.88281 -2,-2c0,-1.11719 0.88281,-2 2,-2zM27.34375,7.1875c5.33203,0.94922 8.65625,5.07031 8.65625,10.8125c0,8.16797 2.07813,12.36328 4.25,14.75c1.08594,1.19141 2.18359,1.9375 2.90625,2.46875c0.35938,0.26563 0.62891,0.48828 0.75,0.625c0.12109,0.13672 0.09375,0.125 0.09375,0.15625c0,0.625 -0.28906,1.08203 -1.125,1.625c-0.83594,0.54297 -2.19531,1.04688 -3.9375,1.40625c-3.48437,0.72266 -8.44531,0.96875 -13.9375,0.96875c-5.49219,0 -10.45312,-0.24609 -13.9375,-0.96875c-1.74219,-0.35937 -3.10156,-0.86328 -3.9375,-1.40625c-0.83594,-0.54297 -1.125,-1 -1.125,-1.625c0,-0.03125 -0.02734,-0.01953 0.09375,-0.15625c0.12109,-0.13672 0.39063,-0.35937 0.75,-0.625c0.72266,-0.53125 1.82031,-1.27734 2.90625,-2.46875c2.17188,-2.38672 4.25,-6.58203 4.25,-14.75c0,-5.73828 3.32813,-9.82812 8.65625,-10.78125c0.66406,0.48828 1.46484,0.78125 2.34375,0.78125c0.88672,0 1.67969,-0.31641 2.34375,-0.8125zM21.5625,41.9375c1.12109,0.02344 2.26172,0.0625 3.4375,0.0625c1.17578,0 2.31641,-0.03906 3.4375,-0.0625c0.35547,0.60156 0.5625,1.3125 0.5625,2.0625c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-0.75781 0.19922,-1.46094 0.5625,-2.0625z"/></g></g></svg>
                                                        Remind me
                                                    </button>
                                                    <div class="SLdropdown-menu" id="SLRemind">
                                                        <a onclick="SLdownloadICS(this)" data-stime="${scheduled.starting_time}" data-title="${scheduled.title}" data-loc="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}">
                                                            <svg width="15px" height="15px" viewBox="-29.5 0 315 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249" fill="#000000"> </path> </g> </g></svg>
                                                            Apple
                                                        </a>
                                                        <a onclick="SLaddToGoogleCalendar(this)" data-stime="${scheduled.starting_time}" data-title="${scheduled.title}" data-loc="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}">
                                                            <svg width="15px" height="15px" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
                                                            Google
                                                        </a>
                                                        <a onclick="SLaddToOutlook(this)" data-stime="${scheduled.starting_time}" data-title="${scheduled.title}" data-loc="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}">
                                                            <svg width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_outlook</title><path d="M19.484,7.937v5.477L21.4,14.619a.489.489,0,0,0,.21,0l8.238-5.554a1.174,1.174,0,0,0-.959-1.128Z" style="fill:#0072c6"></path><path d="M19.484,15.457l1.747,1.2a.522.522,0,0,0,.543,0c-.3.181,8.073-5.378,8.073-5.378V21.345a1.408,1.408,0,0,1-1.49,1.555H19.483V15.457Z" style="fill:#0072c6"></path><path d="M10.44,12.932a1.609,1.609,0,0,0-1.42.838,4.131,4.131,0,0,0-.526,2.218A4.05,4.05,0,0,0,9.02,18.2a1.6,1.6,0,0,0,2.771.022,4.014,4.014,0,0,0,.515-2.2,4.369,4.369,0,0,0-.5-2.281A1.536,1.536,0,0,0,10.44,12.932Z" style="fill:#0072c6"></path><path d="M2.153,5.155V26.582L18.453,30V2ZM13.061,19.491a3.231,3.231,0,0,1-2.7,1.361,3.19,3.19,0,0,1-2.64-1.318A5.459,5.459,0,0,1,6.706,16.1a5.868,5.868,0,0,1,1.036-3.616A3.267,3.267,0,0,1,10.486,11.1a3.116,3.116,0,0,1,2.61,1.321,5.639,5.639,0,0,1,1,3.484A5.763,5.763,0,0,1,13.061,19.491Z" style="fill:#0072c6"></path></g></svg>
                                                            Outlook
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="SLdropdown-container">
                                                    <button onclick="SLtoggleDropdown('SLShare')" class="SL-share-drp-btn SLdropdown-button" onclick="watchStream('${scheduled.streamURL}');">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1.5"><path d="M17.742 3a.75.75 0 0 0-.523 1.29l1.221 1.218h-.69C11.823 5.508 7 10.33 7 16.258c-.003.27.138.52.372.659a.76.76 0 0 0 .756 0 .75.75 0 0 0 .372-.66 9.24 9.24 0 0 1 9.25-9.25h.69l-1.221 1.22a.76.76 0 0 0-.206.731.75.75 0 0 0 .536.537.76.76 0 0 0 .732-.206l2.435-2.437a.75.75 0 0 0-.005-1.193l-2.43-2.432A.76.76 0 0 0 17.742 3M6.25 3.008A3.26 3.26 0 0 0 3 6.258v11.5a3.26 3.26 0 0 0 3.25 3.25h11.5a3.26 3.26 0 0 0 3.25-3.25v-4a.752.752 0 1 0-1.5 0v4a1.74 1.74 0 0 1-1.75 1.75H6.25a1.74 1.74 0 0 1-1.75-1.75v-11.5c0-.974.776-1.75 1.75-1.75h4a.753.753 0 0 0 .659-1.128.75.75 0 0 0-.659-.372z"></path></svg>
                                                        Share
                                                    </button>
                                                    <div class="SLdropdown-menu" id="SLShare">
                                                        <a class="SL-facebook" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" title="Share on Facebook">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/facebook.webp" alt="Facebook icon">
                                                            Facebook
                                                        </a>
                                                        <a class="SL-twitter" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" title="Share on Twitter">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/twitter-x-logo.webp" alt="Twitter icon">
                                                            Twitter
                                                        </a>
                                                        <a class="SL-whatsapp" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" title="Share on Whatsapp">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/whatsapp.webp" alt="Whatsapp icon">
                                                            Whatsapp
                                                        </a>
                                                        <a class="SL-copy" data-sharelink="${urlSL + '?stream=' + window.btoa(scheduled.streamURL)}" title="Copy link">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/copy-link.webp" alt="Copy link icon">
                                                            Copy Link
                                                        </a>                                                                                                                                                                                                
                                                    </div>
                                                </div>
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
                                    scheduleTimeUp = true;
                                    clearInterval(x[scheduled.id]);
                                    document.getElementById(`${scheduled.id}day`).innerHTML = '00';
                                    document.getElementById(`${scheduled.id}hour`).innerHTML = '00';
                                    document.getElementById(`${scheduled.id}min`).innerHTML = '00';
                                    document.getElementById(`${scheduled.id}sec`).innerHTML = '00';

                                    // location.reload();
                                    // watchStream(`${scheduled.streamURL}`);
                                    playThis = scheduled.streamURL;
                                    $('.SL-schedule-timer').html(``);

                                    $('.SL-remindme-btn').hide();
                                    $('.SL-watch-now-btn').show();
                                } else {
                                    $('.SL-remindme-btn').show();
                                    $('.SL-watch-now-btn').hide();
                                }
                            }, 1000);
                            setTimeout(() => {
                                if (!scheduleTimeUp) playThis = scheduled.streamURL; //watchStream(`${scheduled.streamURL}`);
                            }, 2000);
                        }
                    });
                }

                if (data['completed'].length) {
                    data['completed'].forEach(completed => {
                        completed.cover_img = customization.show_img == '2' ? completed.gif_img : completed.cover_img;
                        allStreamsSL[btoa(completed.streamURL)] = completed;
                        scounts++;
                        var onDT = new Date(`${(completed.starting_time).replaceAll('-', '/')}`);
                        var onTime = (onDT.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })).toUpperCase();
                        onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " - " + onTime;
                        if (scounts == 1) {
                            append += `                                
                                <div class="SL-full-card" style="background: #b3bdff !important;" data-stream="${completed.streamURL}">
                                    <div class="row m-auto justify-content-center">
                                        <div class="col-12 col-md-3 col-lg-3 col-md-offset-1 col-lg-offset-3 p-0 px-5 px-sm-0 position-relative">
                                            <img src="${completed.cover_img}" class="SL-vdo-thmub-full" alt="Stream Thumbnail" >
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-4 px-sm-3 pt-4 pt-sm-0 ${customization.scheduled_grid == '0' ? 'order-md-first' : ''}"">
                                            <p class="SL-stream-tag-full">Watch Again</p>
                                            <p class="SL-stream-title-full">${completed.title}</p>
                                            <p class="SL-stream-desc-full">${onDT}</p>                                            

                                            <div>
                                                <button class="SL-watch-live-btn streamClick" onclick="watchStream('${completed.streamURL}');">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1.5"><path d="M12 2C6.487 2 2 6.487 2 12s4.487 10 10 10 10-4.487 10-10S17.513 2 12 2m0 1.5c4.703 0 8.5 3.797 8.5 8.5s-3.797 8.5-8.5 8.5A8.49 8.49 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5M9.706 7.589c-.628.039-1.206.56-1.206 1.24v6.343c0 .909 1.029 1.529 1.83 1.107l6.03-3.172c.85-.448.85-1.766 0-2.214l-6.03-3.172a1.2 1.2 0 0 0-.624-.132M10 9.242 15.24 12 10 14.758z"></path></svg>
                                                    Watch Now
                                                </button>
                                                <div class="SLdropdown-container">
                                                    <button onclick="SLtoggleDropdown('SLShare')" class="SL-share-drp-btn SLdropdown-button" onclick="watchStream('${completed.streamURL}');">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1.5"><path d="M17.742 3a.75.75 0 0 0-.523 1.29l1.221 1.218h-.69C11.823 5.508 7 10.33 7 16.258c-.003.27.138.52.372.659a.76.76 0 0 0 .756 0 .75.75 0 0 0 .372-.66 9.24 9.24 0 0 1 9.25-9.25h.69l-1.221 1.22a.76.76 0 0 0-.206.731.75.75 0 0 0 .536.537.76.76 0 0 0 .732-.206l2.435-2.437a.75.75 0 0 0-.005-1.193l-2.43-2.432A.76.76 0 0 0 17.742 3M6.25 3.008A3.26 3.26 0 0 0 3 6.258v11.5a3.26 3.26 0 0 0 3.25 3.25h11.5a3.26 3.26 0 0 0 3.25-3.25v-4a.752.752 0 1 0-1.5 0v4a1.74 1.74 0 0 1-1.75 1.75H6.25a1.74 1.74 0 0 1-1.75-1.75v-11.5c0-.974.776-1.75 1.75-1.75h4a.753.753 0 0 0 .659-1.128.75.75 0 0 0-.659-.372z"></path></svg>
                                                        Share
                                                    </button>
                                                    <div class="SLdropdown-menu" id="SLShare">
                                                        <a class="SL-facebook" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" title="Share on Facebook">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/facebook.webp" alt="Facebook icon">
                                                            Facebook
                                                        </a>
                                                        <a class="SL-twitter" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" title="Share on Twitter">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/twitter-x-logo.webp" alt="Twitter icon">
                                                            Twitter
                                                        </a>
                                                        <a class="SL-whatsapp" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" title="Share on Whatsapp">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/whatsapp.webp" alt="Whatsapp icon">
                                                            Whatsapp
                                                        </a>
                                                        <a class="SL-copy" data-sharelink="${urlSL + '?stream=' + window.btoa(completed.streamURL)}" title="Copy link">
                                                            <img class="SL-share-images" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/copy-link.webp" alt="Copy link icon">
                                                            Copy Link
                                                        </a>                                                                                                                                                                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>                                    
                            `;

                            // watchStream(`${completed.streamURL}`);
                            playThis = completed.streamURL;
                        }
                        // Past shows slider
                        else {
                            var onDT = new Date(`${(completed.starting_time).replaceAll('-', '/')}`);
                            var onTime = (onDT.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })).toUpperCase();
                            onDT = "" + onDT.getDate() + " " + monthNames[`${onDT.getMonth()}`] + ", " + onDT.getFullYear() + " - " + onTime;
                            pastShows += `
                                <div class="swiper-slide" data-stream="${completed.streamURL}" onclick="!event.target.className.includes('SL-share-images') ? watchStream('${completed.streamURL}') : '';">
                                    <div class="SL-active-stream-video-container position-relative">
                                        <img src="${completed.cover_img}" class="SL-vdo-thmub" alt="Stream Thumbnail" >
                                        <img style="display: none;" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp" class="SL-play-btn" alt="Play icon">
                                        <p class="rec-badge-past-shows"><span></span> REC</p>
                                    </div>
                                    <div class="SL-active-stream-info-container">
                                        <p class="SL-stream-title">${completed.title}</p>
                                        <p class="SL-date-top">${onDT}</p>
                                        <div class="SL-views-and-like">
                                            <div>
                                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/heart-fill.svg" alt="Heart icon">
                                                <label>${completed.total_like ? completed.total_like : '0'}</label>
                                            </div>
                                            <div>
                                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/eye-fill.svg" alt="Views icon">    
                                                <label>${completed.total_views ? completed.total_views : '0'}</label>
                                            </div>
                                        </div>                                                                
                                    </div>
                                </div>
                            `;
                        }
                    });
                }

                pastShows = pastShows ? `
                    <div class="past-shows-master">
                        <div class="swiper past-shows-slider">
                            <div class="swiper-wrapper">
                                ${pastShows}
                            </div>
                            <div class="past-shows-slider-next">
                                <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                    <g clip-path="url(#clip0_455_23499)">
                                        <path
                                            d="M27.1717 26.6433L22.2217 21.6933L23.6357 20.2793L29.9997 26.6433L23.6357 33.0073L22.2217 31.5933L27.1717 26.6433Z"
                                            fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_455_23499">
                                            <rect width="24" height="24" fill="white" transform="translate(14 14.6431)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="past-shows-slider-prev">
                                <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                    <g clip-path="url(#clip0_455_23488)">
                                        <path
                                            d="M24.7307 26.6429L30.0932 32.0054L28.5613 33.5372L21.667 26.6429L28.5613 19.7485L30.0932 21.2804L24.7307 26.6429Z"
                                            fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_455_23488">
                                            <rect width="26" height="26" fill="white" transform="translate(13 13.6431)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                ` : '';

                // append += '</div>';
                // if (scounts > displaySL) {
                //     append += `<button class="SL-stream-load-more mb-1" onclick="loadMoreSL(this);" style="color: ${customization.date_bk_color} !important; border-color: ${customization.date_bk_color} !important;">LOAD MORE <p class="SL-loader" style="border-color: ${customization.date_bk_color}25 !important; border-top-color: ${customization.date_bk_color} !important;"></p></button>`;
                // }

                append += pastShows;

                $('.SL-streams-list').html(append);

                if (pastShows) {
                    pShowSwiper = new Swiper(`.past-shows-slider`, {
                        slidesPerView: 1.2,
                        direction: 'horizontal',
                        spaceBetween: 15,
                        centeredSlidesBounds: true,
                        centerInsufficientSlides: true,
                        // centeredSlides: true,
                        cssMode: true,
                        breakpoints: {
                            600: {
                                slidesPerView: 1.2,
                            },
                            768: {
                                slidesPerView: 3,
                                centeredSlides: false,
                            },
                            1080: {
                                slidesPerView: 4,
                                centeredSlides: false,
                                cssMode: false
                            },
                            1366: {
                                slidesPerView: 4.5,
                                centeredSlides: false,
                                cssMode: false
                            }
                        },
                        navigation: {
                            nextEl: '.past-shows-slider-next',
                            prevEl: '.past-shows-slider-prev',
                        }
                    });
                }

                // Shared link autoplay
                setTimeout(() => {
                    const urlSearchParams = new URLSearchParams(window.location.search);
                    const params = Object.fromEntries(urlSearchParams.entries());
                    if (typeof params['stream'] != 'undefined' || typeof params['live'] != 'undefined') {
                        setTimeout(() => {
                            if ($(`div[data-stream="${window.atob(typeof params['stream'] != 'undefined' ? params['stream'] : params['live'])}"]`).find('.streamClick').length) {
                                $(`div[data-stream="${window.atob(typeof params['stream'] != 'undefined' ? params['stream'] : params['live'])}"]`).find('.streamClick').click();
                            } else {
                                $(`div[data-stream="${window.atob(typeof params['stream'] != 'undefined' ? params['stream'] : params['live'])}"]`).click();
                            }
                        }, 500);
                    } else if (playThis) {
                        watchStream(playThis);
                    }
                }, 2000);

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

                    window.open('https://api.whatsapp.com/send?text=' + link);
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

// Iframe post listener
var eventMethodSL = window.addEventListener ? "addEventListener" : "attachEvent";
var eventerSL = window[eventMethodSL];
var messageEventSL = eventMethodSL == "attachEvent" ? "onmessage" : "message";

// Listen message from child window
eventerSL(messageEventSL, function (e) {
    const { action, data } = e.data;
    if (action == 'updateStreamTime') {
        // console.log('Called from SATYAM ' + data);
        localStorage.setItem('_pipSecondsSL', data);
        localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(currentStreamSL)]));
    }

    if (action == 'refreshStreamPage') {
        // console.log(data);
        location.reload();
    }
    if (action == 'documentfullscreen') {
        // console.log(data);
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
        }
    }
    if (action == 'documentexitfullscreen') {
        // console.log(data);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
}, false);

window.addEventListener("message", (event) => {
    if (event.data.action === "open" && event.data.url) {
        window.open(event.data.url, "_blank");
    }
});

let allOverElementsLS = [];
let allOverElementsLSSticky = [];

function closeLiveStreamPop(closed = false) {
    // localStorage.setItem('_pipSL', '');
    if (closed) openPIPSL();

    let sls = document.querySelector('.SL-iframe-live');

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    // slsFrame.src = '';
    slsFrame.contentWindow.location.replace('');

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

    // Full screen exit
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

window.addEventListener('popstate', () => {
    if ($('.SL-iframe-live').is(':visible')) closeLiveStreamPop();
});

function watchStream(stream, fromPIP = false) {
    if ($('.SL-iframe-live').is(':visible')) return;

    window.history.pushState({}, null, null);

    currentStreamSL = stream;

    let startTimeQ = '';
    if (fromPIP) {
        startTimeQ = '&start_time=' + Math.floor($('.SL-pip-live video')[0].currentTime);
    }

    if (!fromPIP) {
        localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(stream)]));
    }

    let streamData = allStreamsSL[btoa(stream)];
    $('.SL-popup-close-btn').hide();
    if (streamData.video_orientation == '2') {
        $('.SL-popup-close-btn-L').show();
        if (streamData.live_preview == '0') {
            $('.SL-popup-close-btn-L').css('filter', 'invert(1)');
        } else {
            $('.SL-popup-close-btn-L').css('filter', 'none');
        }
    } else {
        $('.SL-popup-close-btn-P').show();
    }

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    // slsFrame.src = stream+'?plugin=1';
    let link = btoa(urlSL + '?stream=' + window.btoa(stream));
    // slsFrame.src = stream.includes("?flag") ? stream + '&plugin=' + link + '&page=listing' + startTimeQ : stream + '?plugin=' + link + '&page=listing' + startTimeQ;
    // slsFrame.contentWindow.location.replace(stream.includes("?flag") ? stream + '&plugin=' + link + '&page=listing' + startTimeQ : stream + '?plugin=' + link + '&page=listing' + startTimeQ);
    slsFrame.contentWindow.location.replace(stream + '&close=false');
    // slsFrame.contentWindow.location.replace(stream + startTimeQ);

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

function openPIPSL() {
    let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));
    let pipStartTime = localStorage.getItem('_pipSecondsSL') || 0;

    if (pipStreamData.is_live == '0' && pipStreamData.recording_preview == '') return;

    // Video height width    
    if (pipStreamData.video_orientation == '1') $('.SL-pip-live video').attr('height', '320'), $('.SL-pip-live video').attr('width', '180');
    if (pipStreamData.video_orientation == '1') $('.SL-pip-live video').css('height', '320px'), $('.SL-pip-live video').css('width', '180px');

    // application/x-mpegURL  ,  video/mp4
    if (pipStreamData.recording_preview && pipStreamData.is_live == '0') {
        if (pipStreamData.video_orientation == '1') $('.SL-pip-live').addClass('SL-pip-live-P');
        $('.SL-pip-live video source').attr('type', 'video/mp4');
        $('.SL-pip-live video source').attr('src', pipStreamData.recording_preview);
        // $('.SL-pip-live video').attr('poster', pipStreamData.cover_img);
        $('.SL-pip-live video')[0].load();
        $('.SL-pip-live video')[0].play();
    } else if (pipStreamData.recording_url && pipStreamData.recording_url != '' && pipStreamData.recording_url.includes('.mp4')) {
        if (pipStreamData.video_orientation == '1') $('.SL-pip-live').addClass('SL-pip-live-P');
        $('.SL-pip-live video source').attr('type', 'video/mp4');
        $('.SL-pip-live video source').attr('src', pipStreamData.recording_url + '#t=' + pipStartTime);
        // $('.SL-pip-live video').attr('poster', pipStreamData.cover_img);
        $('.SL-pip-live video')[0].load();
        $('.SL-pip-live video')[0].play();
    } else {
        var jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://vjs.zencdn.net/8.16.1/video.min.js';
        headTag.insertBefore(jqTag, headTag.lastChild);
        jqTag.onload = function () {
            if (pipStreamData.video_orientation == '1') $('.SL-pip-live').addClass('SL-pip-live-P');
            let vWidth = pipStreamData.video_orientation == '1' ? '180px' : '250px';
            $('.SL-pip-live video').attr('height', 'auto');
            $('.SL-pip-live video').attr('width', vWidth);
            $('.SL-pip-live video source').attr('type', 'application/x-mpegURL');
            $('.SL-pip-live video source').attr('src', pipStreamData.recording_url != '' ? pipStreamData.recording_url : pipStreamData.mogi_accessurl);
            $('.SL-pip-live video').addClass('video-js');
            // $('.SL-pip-live video').attr('poster', pipStreamData.cover_img);
            var player = videojs('id-video-pip-SL');
            if (pipStreamData.recording_url != '') {
                player.on('loadedmetadata', function () {
                    // Seek to the specified time
                    player.currentTime(pipStartTime);
                });
            }
            player.play();
        };
    }

    $('.SL-pip-loader').css('display', 'flex');
    $('.SL-pip-live').show();
}

function closePIPSL() {
    $('.SL-pip-live video').get(0).pause();
    $('.SL-pip-live').hide();

    localStorage.setItem('_pipSL', '');
}

function hideLoaderSL() {
    if ($('.SL-pip-loader').is(':visible')) {
        $('.SL-pip-loader').hide();
    }
}

function fullScreenPIPSL(e) {
    let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));

    if (e.target.classList == 'SL-pip-close-btn') return;

    $('.SL-pip-live video').get(0).pause();
    $('.SL-pip-live').hide();
    watchStream(pipStreamData.streamURL, true);
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

function SLaddToGoogleCalendar(elm) {
    const title = encodeURIComponent(elm.dataset.title);
    const startTime = encodeURIComponent(elm.dataset.stime.replaceAll('-', '').replaceAll(':', '').replaceAll(' ', 'T')); // Format: YYYYMMDDTHHmmssZ
    const endTime = encodeURIComponent(elm.dataset.stime.replaceAll('-', '').replaceAll(':', '').replaceAll(' ', 'T'));     // Format: YYYYMMDDTHHmmssZ
    const details = encodeURIComponent('Live stream');
    const location = encodeURIComponent(elm.dataset.loc);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;

    window.open(url, "_blank");
}

function SLaddToOutlook(elm) {
    const title = encodeURIComponent(elm.dataset.title);
    const startTime = encodeURIComponent(elm.dataset.stime.replaceAll(' ', 'T')); // Format: YYYY-MM-DDTHH:mm:ss
    const endTime = encodeURIComponent(elm.dataset.stime.replaceAll(' ', 'T'));     // Format: YYYY-MM-DDTHH:mm:ss
    const details = encodeURIComponent('Live stream');
    const location = encodeURIComponent(elm.dataset.loc);

    const url = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&subject=${title}&body=${details}&startdt=${startTime}&enddt=${endTime}&location=${location}`;

    window.open(url, "_blank");
}

function SLdownloadICS(elm) {
    const title = elm.dataset.title;
    const startTime = elm.dataset.stime.replaceAll('-', '').replaceAll(':', '').replaceAll(' ', 'T'); // UTC format
    const endTime = elm.dataset.stime.replaceAll('-', '').replaceAll(':', '').replaceAll(' ', 'T'); // UTC format
    const description = elm.dataset.loc;

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${startTime}
DTEND:${endTime}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent.trim()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "event.ics";
    link.click();

    URL.revokeObjectURL(url);
}

function SLtoggleDropdown(id) {
    event.stopPropagation();
    document.querySelectorAll('.SLdropdown-menu').forEach(elm => {
        elm.style.display = 'none';
    });
    const dropdown = document.getElementById(id);
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Close the dropdown if clicked outside
addEventListener('click', (event) => {
    if (!event.target.matches('.SLdropdown-button')) {
        const dropdown = document.getElementById('SLShare');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }

        const remind = document.getElementById('SLRemind');
        if (remind.style.display === 'block') {
            remind.style.display = 'none';
        }
    }
});

// if (performance.navigation.type === 2) {
//     console.log("User navigated using the back or forward button");
// }

addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeLiveStreamPop();
    }
});