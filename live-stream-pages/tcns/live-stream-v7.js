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
    jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/live-stream-pages/tcns/live-stream-v5.min.css';
    headTag.insertBefore(jqTag, headTag.lastChild);

    executeSLiveNow();
});

async function executeSLiveNow() {
    const isExactDomain = window.location.hostname === 'wforwoman.com';
    const isProductPage = window.location.pathname.includes('/products/');
    let customStyle = isExactDomain && isProductPage ? `
        <style>
            .SL-trigger-floating-icon {
                bottom: 155px !important;
            }
        </style>
    ` : '';
    document.body.insertAdjacentHTML("beforeend", `
        <div class="SL-iframe-live SL-root-elm" style="display:none;">
            <iframe id="SL-iframe-tag" style="width: 100%;height: 100%;border: none;display: block;" src="" allow="clipboard-read; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture"></iframe>
            <img class="SL-popup-n-pip-btn" onclick="turnToPIPSL();" src="https://apigoswirl.com/assets/vivo/arrow-down-s-line-black.webp">
            <img class="SL-popup-n-close-btn JS-pip-controls-SL" style="display: none;" onclick="unloadStreamSL();" src="https://apigoswirl.com/assets/vivo/close-black.webp">
            <img class="SL-popup-n-fs-btn JS-pip-controls-SL" style="display: none;" onclick="turnToFullSL();" src="https://apigoswirl.com/assets/vivo/arrow-up-s-line-black.webp">            
            <div class="SL-popup-n-overlay JS-SL-pip-drag JS-pip-controls-SL" style="display: none;"></div>
            <div class="SL-popup-n-overlay2 JS-SL-pip-drag JS-pip-controls-SL" style="display: none;"></div>
        </div>        

        <div class="SL-trigger-floating-icon SL-root-elm" style="display: none;" onclick="document.dispatchEvent(new Event('streamOpenSL'));">
            <svg width="55" height="41" viewBox="0 0 55 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.4059 0.621094C38.0672 0.621094 38.7014 0.883798 39.169 1.35141C39.6366 1.81903 39.8993 2.45325 39.8993 3.11456V13.5871L52.8978 4.48596C53.0847 4.35495 53.3039 4.27775 53.5317 4.2628C53.7595 4.24785 53.987 4.29571 54.1894 4.40117C54.3918 4.50663 54.5614 4.66564 54.6797 4.86086C54.798 5.05609 54.8604 5.28003 54.8601 5.50828V35.6293C54.8604 35.8576 54.798 36.0815 54.6797 36.2768C54.5614 36.472 54.3918 36.631 54.1894 36.7364C53.987 36.8419 53.7595 36.8898 53.5317 36.8748C53.3039 36.8599 53.0847 36.7827 52.8978 36.6516L39.8993 27.5505V38.0231C39.8993 38.6844 39.6366 39.3186 39.169 39.7862C38.7014 40.2538 38.0672 40.5165 37.4059 40.5165H2.49737C1.83606 40.5165 1.20184 40.2538 0.734225 39.7862C0.26661 39.3186 0.00390625 38.6844 0.00390625 38.0231V3.11456C0.00390625 2.45325 0.26661 1.81903 0.734225 1.35141C1.20184 0.883798 1.83606 0.621094 2.49737 0.621094H37.4059ZM34.9124 5.60802H4.99083V35.5296H34.9124V5.60802ZM15.9621 12.662C16.1518 12.6615 16.3378 12.7151 16.4982 12.8166L27.3572 19.7285C27.4983 19.8187 27.6143 19.9429 27.6947 20.0898C27.7752 20.2367 27.8173 20.4014 27.8173 20.5688C27.8173 20.7362 27.7752 20.901 27.6947 21.0478C27.6143 21.1947 27.4983 21.3189 27.3572 21.4091L16.4982 28.3235C16.3469 28.4199 16.1725 28.4737 15.9932 28.4793C15.8139 28.4849 15.6365 28.4421 15.4795 28.3553C15.3225 28.2685 15.1919 28.141 15.1013 27.9862C15.0107 27.8314 14.9635 27.6551 14.9647 27.4757V13.6619C14.9647 13.1109 15.4135 12.662 15.9621 12.662ZM49.8732 12.6895L39.8993 19.6712V21.4615L49.8732 28.4432V12.6895Z" fill="white"/>
            </svg>
        </div>       
        
        ${customStyle}
    `);

    if (document.getElementById('swirl-live-streams')) targetElm = document.querySelector('#swirl-live-streams');
    else return;

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
        // c.streamURL = c.streamURL.replace('live', 'jawa');
        allStreamsSL[btoa(c.streamURL)] = c;
    });

    scheduled.forEach(c => {
        // c.streamURL = c.streamURL.replace('live', 'jawa');
        allStreamsSL[btoa(c.streamURL)] = c;
    });

    if (Object.keys(scheduled).length) {
        latestStream = scheduled[0].streamURL;
    } else if (Object.keys(completed).length) {
        latestStream = completed[0].streamURL;
    }

    if (latestStream) {
        document.querySelector('.SL-trigger-floating-icon').style.display = 'block';

        setTimeout(() => {
            if (localStorage.getItem("onLoadmakePip")) {
                initPIPSL();
                localStorage.removeItem("onLoadmakePip");
            } else {
                const isAtDomainRoot = location.pathname === '/';

                if (isAtDomainRoot) watchStream(latestStream);
                else initPIPSL();
            }
        }, 2000);
    } else {
        initPIPSL();
    }
}

function initPIPSL() {
    if (localStorage.getItem('_pipSL')) {
        let pipStreamData = JSON.parse(localStorage.getItem('_pipSL'));
        allStreamsSL[btoa(pipStreamData.streamURL)] = pipStreamData;
        openPIPSL();
    }
}

// Iframe post listener
var eventMethodSL = window.addEventListener ? "addEventListener" : "attachEvent";
var eventerSL = window[eventMethodSL];
var messageEventSL = eventMethodSL == "attachEvent" ? "onmessage" : "message";
eventerSL(messageEventSL, async function (e) {
    const { action, data, url } = await e.data;
    let sData = allStreamsSL[btoa(currentStreamSL)];
    if (action == 'updateStreamTime') {
        localStorage.setItem('_pipSecondsSL', data);
        localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(currentStreamSL)]));
    }

    if (action == 'updateStreamPlayingStatus') {
        let img = $('.SL-popup-n-playpause-btn')[0];
        img.src = data ? 'https://apigoswirl.com/assets/vivo/pause-black.webp' : 'https://apigoswirl.com/assets/vivo/play-icon-black.webp';
    }

    if (action == 'openVerificationPopupModel') {
        if (url) {
            localStorage.setItem("onLoadmakePip", true);
            fetch(url).then(() => console.log('Background link opened')).catch((err) => console.error('Error:', err));
        }
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
            setTimeout(() => {
                SLFrameHeight();
            }, 300);
        }
    }
    if (action == 'documentexitfullscreen') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            if (screen.orientation && screen.orientation.unlock && sData.video_orientation == '1') {
                screen.orientation.unlock();
            }
            setTimeout(() => {
                SLFrameHeight();
            }, 300);
        }
    }
    if (action == "open" && e.data.url) {
        window.location.href = e.data.url;
        localStorage.setItem('_pipTS', (new Date().getTime() / 1000));
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

    currentStreamSL = stream;
    localStorage.setItem('_pipSL', JSON.stringify(allStreamsSL[btoa(stream)]));

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    let startFrom = currentTimeSL ? `&time=${currentTimeSL}` : '';
    slsFrame.contentWindow.location.replace(stream + '&close=false' + startFrom);

    slsFrame.onload = setTimeout(checkClientLoginSL, 1000);

    disableScrollSL();
    slIframeLive.style.display = 'block';
    SLFrameHeight();
}

function turnToPIPSL() {
    setTimeout(() => {
        if (localStorage.getItem("onLoadmakePip")) {
            window.location.reload()
        }
    }, 2000);

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

function openPIPSL(checkLoggedIn = false) {
    if (!localStorage.getItem('_pipSL')) return;

    let pipStartTime = localStorage.getItem('_pipSecondsSL') || 0;

    let pipTS = localStorage.getItem('_pipTS');
    let pipRecent = false;
    if (pipTS && ((new Date().getTime() / 1000) - pipTS) <= 15) pipRecent = true;
    pipRecent = checkLoggedIn ? true : pipRecent;

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

    currentStreamSL = pipStreamData.streamURL;
    allStreamsSL[btoa(currentStreamSL)] = pipStreamData;

    let slsFrame = document.querySelector('.SL-iframe-live iframe');
    let startFrom = pipStartTime ? `&time=${pipStartTime}` : '';
    let isPip = pipRecent ? '&isPip=true' : '';
    slsFrame.contentWindow.location.replace(currentStreamSL + '&close=false' + startFrom + isPip);

    slsFrame.onload = setTimeout(checkClientLoginSL, 1000);

    pipMovableSL(); // Call function for movable functionality
}

function checkClientLoginSL() {
    const targetDivs = document.querySelectorAll(".customer__loggedin");
    let selectedDiv = null;
    // Loop through the divs to find one that has both 'name' and 'phone' attributes
    targetDivs.forEach(div => {
        if (div.hasAttribute("name") && div.hasAttribute("phone")) {
            selectedDiv = div;
        }
    });

    if (selectedDiv) {
        // Get name and phone attributes
        const name = selectedDiv.getAttribute("name") || null;
        const phone = selectedDiv.getAttribute("phone") || null;
        const iframe = document.getElementById("SL-iframe-tag");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                { action: "checkLoggedInOrNot", isLoggedIn: name || phone ? true : false, name: name ? name : null, phone: phone ? phone : null },
                "*"
            );
        }
    }
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

// Handle fullscreen exit
function handleFullscreenChangeSL() {
    const isFullScreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

    if (!isFullScreen) {
        const iframe = document.getElementById("SL-iframe-tag");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ action: "fullScreenExitDone" }, '*');
        }
    }
}

// Add listener to document (not body!)
document.addEventListener('fullscreenchange', handleFullscreenChangeSL);
document.addEventListener('webkitfullscreenchange', handleFullscreenChangeSL);
document.addEventListener('mozfullscreenchange', handleFullscreenChangeSL);
document.addEventListener('MSFullscreenChange', handleFullscreenChangeSL);