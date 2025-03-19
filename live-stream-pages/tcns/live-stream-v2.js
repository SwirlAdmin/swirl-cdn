var targetElm = null;
var fullDataSL = [];
var allStreamsSL = [];
var currentStreamSL = '';
var currentTimeSL = 0;
var allOverElementsLS = [];
var allOverElementsLSSticky = [];
var pipMovable = false;
var latestStream = '';

document.addEventListener("DOMContentLoaded", function () {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('link');
    jqTag.rel = 'stylesheet';
    jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/live-stream-pages/tcns/live-stream-v1.min.css';
    headTag.insertBefore(jqTag, headTag.lastChild);

    executeSLiveNow();
});

async function executeSLiveNow() {
    document.body.insertAdjacentHTML("beforeend", `
        <div class="SL-iframe-live" style="display:none;">
            <iframe id="SL-iframe-tag" style="width: 100%;height: 100%;border: none;display: block;" src="" allow="clipboard-read; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture"></iframe>
            <img class="SL-popup-n-pip-btn" onclick="turnToPIPSL();" src="https://apigoswirl.com/assets/vivo/arrow-down-s-line-black.webp">
            <img class="SL-popup-n-close-btn JS-pip-controls-SL" style="display: none;" onclick="unloadStreamSL();" src="https://apigoswirl.com/assets/vivo/close-black.webp">
            <img class="SL-popup-n-fs-btn JS-pip-controls-SL" style="display: none;" onclick="turnToFullSL();" src="https://apigoswirl.com/assets/vivo/arrow-up-s-line-black.webp">            
            <div class="SL-popup-n-overlay JS-SL-pip-drag JS-pip-controls-SL" style="display: none;"></div>
            <div class="SL-popup-n-overlay2 JS-SL-pip-drag JS-pip-controls-SL" style="display: none;"></div>
        </div>        
    `);

    if (document.getElementById('swirl-live-streams') == null) {
        if (localStorage.getItem('_pipSL')) {
            let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));
            allStreamsSL[btoa(pipStreamData.streamURL)] = pipStreamData;
            openPIPSL();
        }
        return;
    } else {
        targetElm = document.querySelector('#swirl-live-streams');
    }

    targetElm.insertAdjacentHTML("beforeend", `
        <div class="SL-streams-list"></div>
    `);

    let code = targetElm.dataset.code;
    const url = `https://goswirl-livestream-configs.s3.ap-south-1.amazonaws.com/static-assets/${code}.json?timestamp=${(Math.floor(Date.now() / 1000))}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`SL : HTTP error! Status: ${response.status}`);
    }
    fullDataSL = await response.json();
    // console.log(fullDataSL);
    let { completed, scheduled, data } = fullDataSL;

    completed.forEach(c => {
        allStreamsSL[btoa(c.streamURL)] = c;
    });

    scheduled.forEach(c => {
        allStreamsSL[btoa(c.streamURL)] = c;
    });

    if (Object.keys(scheduled).length) {
        latestStream = scheduled[0].streamURL;
    } else if (Object.keys(completed).length) {
        latestStream = completed[0].streamURL;
    }

    setTimeout(() => {
        watchStream(latestStream);
    }, 2000);
}

// Iframe post listener
var eventMethodSL = window.addEventListener ? "addEventListener" : "attachEvent";
var eventerSL = window[eventMethodSL];
var messageEventSL = eventMethodSL == "attachEvent" ? "onmessage" : "message";
eventerSL(messageEventSL, async function (e) {
    const { action, data } = await e.data;
    let sData = allStreamsSL[btoa(currentStreamSL)];
    if (action == 'updateStreamTime') {
        localStorage.setItem('_pipSecondsSL', data);
        localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(currentStreamSL)]));
    }

    if (action == 'updateStreamPlayingStatus') {
        let img = $('.SL-popup-n-playpause-btn')[0];
        img.src = data ? 'https://apigoswirl.com/assets/vivo/pause-black.webp' : 'https://apigoswirl.com/assets/vivo/play-icon-black.webp';
    }

    if (action == 'updateStreamVolume') {
        let img = $('.SL-popup-n-muteunmute-btn')[0];
        img.src = data ? 'https://apigoswirl.com/assets/vivo/mute-black.webp' : 'https://apigoswirl.com/assets/vivo/unmute-black.webp';
    }

    if (action == 'pipToModal') {
        turnToFullSL();
    }

    if (action == 'refreshStreamPage') {
        location.reload();
    }
    if (action == 'documentfullscreen') {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
            if (screen.orientation && screen.orientation.lock && sData.video_orientation == '1') {
                screen.orientation.lock('portrait').catch(function (error) {
                    console.warn('Orientation lock failed: ', error);
                });
            }
        }
    }
    if (action == 'documentexitfullscreen') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            if (screen.orientation && screen.orientation.unlock && sData.video_orientation == '1') {
                screen.orientation.unlock();
            }
        }
    }
    if (action == "open" && e.data.url) {
        // const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|Vivo|BlackBerry/i.test(navigator.userAgent);
        // if (isMobile) window.location.href = event.data.url;
        // else window.open(event.data.url, "_blank");
        window.location.href = e.data.url;
    }
}, false);

function watchStream(stream) {
    const slIframeLive = document.querySelector('.SL-iframe-live');
    if (!slIframeLive) return;

    slIframeLive.style.height = '100vh';
    slIframeLive.style.width = '100%';
    slIframeLive.style.top = '0';
    slIframeLive.style.left = '0';
    slIframeLive.style.bottom = 'unset';
    slIframeLive.style.right = 'unset';
    slIframeLive.style.borderRadius = '0';

    document.querySelector('.SL-popup-n-pip-btn').style.display = 'block';
    document.querySelectorAll('.JS-pip-controls-SL').forEach(el => {
        el.style.display = 'none';
    });

    window.history.pushState({}, null, null);
    currentStreamSL = stream;
    localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(stream)]));

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    let startFrom = currentTimeSL ? `&time=${currentTimeSL}` : '';
    slsFrame.contentWindow.location.replace(stream + '&close=false' + startFrom);

    disableScrollSL();
    slIframeLive.style.display = 'block';
    SLFrameHeight();
}

function turnToPIPSL() {
    if (!localStorage.getItem('_pipSL')) {
        unloadStreamSL();
        return;
    }

    let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));
    if (pipStreamData.is_live == '0' && pipStreamData.recording_preview == '') {
        unloadStreamSL();
        return;
    }

    let pW = window.innerWidth > 768 ? 180 : 158;
    let pH = window.innerWidth > 768 ? 320 : 280;
    let slIframeLive = document.querySelector('.SL-iframe-live');

    if (pipStreamData.video_orientation == '1') {
        slIframeLive.style.height = `${pH}px`;
        slIframeLive.style.width = `${pW}px`;
    } else {
        slIframeLive.style.height = `${pW}px`;
        slIframeLive.style.width = `${pH}px`;
    }

    slIframeLive.style.top = 'unset';
    slIframeLive.style.left = 'unset';
    slIframeLive.style.bottom = '55px';
    slIframeLive.style.right = '20px';
    slIframeLive.style.borderRadius = '10px';

    document.querySelector('.SL-popup-n-pip-btn').style.display = 'none';
    document.querySelectorAll('.JS-pip-controls-SL').forEach(el => {
        el.style.display = 'block';
    });

    enableScrollSL();

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    pipMovableSL();
}

function turnToFullSL() {
    let slIframeLive = document.querySelector('.SL-iframe-live');
    slIframeLive.style.height = '100vh';
    slIframeLive.style.width = '100%';
    slIframeLive.style.top = '0';
    slIframeLive.style.left = '0';
    slIframeLive.style.bottom = 'unset';
    slIframeLive.style.right = 'unset';
    slIframeLive.style.borderRadius = '0';

    document.querySelector('.SL-popup-n-pip-btn').style.display = 'block';
    document.querySelectorAll('.JS-pip-controls-SL').forEach(el => {
        el.style.display = 'none';
    });

    disableScrollSL();
    SLFrameHeight();
}

function unloadStreamSL() {
    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    slsFrame.src = 'about:blank';

    document.querySelector('.SL-iframe-live').style.display = 'none';
    localStorage.setItem('_pipSL', '');

    enableScrollSL();
}

function disableScrollSL() {
    let scrollPosition = [window.scrollX, window.scrollY];
    let html = document.documentElement;

    html.dataset.scrollPosition = JSON.stringify(scrollPosition);
    html.dataset.previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    allOverElementsLS = [];
    allOverElementsLSSticky = [];
    document.querySelectorAll('*').forEach(element => {
        let computedStyle = window.getComputedStyle(element);
        if (computedStyle.position == 'fixed' && element.offsetParent !== null) {
            if (!element.classList.contains('SL-iframe-live')) {
                element.style.display = 'none';
                allOverElementsLS.push(element);
            }
        }

        if (computedStyle.position == 'sticky' && element.offsetParent !== null) {
            if (!element.classList.contains('SL-iframe-live')) {
                element.style.display = 'none';
                allOverElementsLS.push(element);
            }
        }
    });
}

function enableScrollSL() {
    let html = document.documentElement;
    let scrollPosition = JSON.parse(html.dataset.scrollPosition || "[0,0]");

    html.style.overflow = html.dataset.previousOverflow || '';
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    allOverElementsLS.forEach(element => element.style.display = '');
    allOverElementsLSSticky.forEach(element => element.style.display = '');
}

function openPIPSL() {
    if (!localStorage.getItem('_pipSL')) return;

    let pipStartTime = localStorage.getItem('_pipSecondsSL') || 0;
    let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));

    if (pipStreamData.is_live == '0' && pipStreamData.recording_preview == '') return;

    let pW = window.innerWidth > 768 ? 180 : 158;
    let pH = window.innerWidth > 768 ? 320 : 280;

    let slIframeLive = document.querySelector('.SL-iframe-live');

    if (pipStreamData.video_orientation == '1') {
        slIframeLive.style.height = `${pH}px`;
        slIframeLive.style.width = `${pW}px`;
    } else {
        slIframeLive.style.height = `${pW}px`;
        slIframeLive.style.width = `${pH}px`;
    }

    Object.assign(slIframeLive.style, {
        top: 'unset',
        left: 'unset',
        bottom: '55px',
        right: '20px',
        borderRadius: '10px',
        display: 'block'
    });

    document.querySelector('.SL-popup-n-pip-btn').style.display = 'none';
    document.querySelectorAll('.JS-pip-controls-SL').forEach(el => {
        el.style.display = 'block';
    });

    window.history.pushState({}, '', '');

    currentStreamSL = pipStreamData.streamURL;
    allStreamsSL[btoa(currentStreamSL)] = pipStreamData;

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    let startFrom = pipStartTime ? `&time=${pipStartTime}` : '';
    slsFrame.contentWindow.location.replace(currentStreamSL + '&close=false' + startFrom);

    pipMovableSL(); // Call function for movable functionality
}

function pipMovableSL() {
    if (pipMovable) return;
    let movableDiv = document.querySelector('.SL-iframe-live');
    let dragHandles = document.querySelectorAll('.JS-SL-pip-drag');

    let isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|Vivo|BlackBerry/i.test(navigator.userAgent);
    let offsetX = 0, offsetY = 0, isDragging = false, hasMoved = false;
    let activeHandle = null;

    function startDrag(e) {
        isDragging = true;
        hasMoved = false;
        activeHandle = e.target;
        activeHandle.style.cursor = "grabbing";

        let clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - movableDiv.offsetLeft;
        offsetY = clientY - movableDiv.offsetTop;

        if (isMobile) document.body.style.overflow = "hidden";
    }

    function moveDrag(e) {
        if (!isDragging) return;
        hasMoved = true;
        let clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let divWidth = movableDiv.offsetWidth;
        let divHeight = movableDiv.offsetHeight;

        newX = Math.max(0, Math.min(newX, screenWidth - divWidth));
        newY = Math.max(0, Math.min(newY, screenHeight - divHeight));

        movableDiv.style.left = `${newX}px`;
        movableDiv.style.top = `${newY}px`;

        if (isMobile) e.preventDefault();
    }

    function stopDrag() {
        isDragging = false;
        setTimeout(() => hasMoved = false, 50);
        if (activeHandle) {
            activeHandle.style.cursor = "grab";
            activeHandle = null;
        }

        if (isMobile) document.body.style.overflow = "";
    }

    dragHandles.forEach(handle => {
        handle.addEventListener("mousedown", startDrag);
        handle.addEventListener("touchstart", startDrag);

        handle.addEventListener("click", function (e) {
            if (hasMoved) {
                e.stopPropagation();
                e.preventDefault();
            } else {
                turnToFullSL();
            }
        });
    });

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);

    pipMovable = true;
}

function SLFrameHeight() {
    let slIframeLive = document.querySelector('.SL-iframe-live');
    if (slIframeLive && slIframeLive.offsetWidth > 321) {
        slIframeLive.style.height = `${window.innerHeight}px`;
    }
}

// Close the dropdown if clicked outside
window.addEventListener('resize', () => {
    SLFrameHeight();
});

document.addEventListener('streamOpenSL', function () {
    if (latestStream) watchStream(latestStream);
});