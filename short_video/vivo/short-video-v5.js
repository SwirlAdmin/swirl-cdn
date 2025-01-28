var ssv13_videoDataArray = [], ssv13_currentVideoTimer = null; function generateUUIDssv13() { var e = (new Date).getTime(), t = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0; return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (s) { var i = 16 * Math.random(); return e > 0 ? (i = (e + i) % 16 | 0, e = Math.floor(e / 16)) : (i = (t + i) % 16 | 0, t = Math.floor(t / 16)), ("x" === s ? i : 3 & i | 8).toString(16) })) } function getDeviceTypessv13() { const e = window.innerWidth; return e <= 767 ? "Mobile" : e >= 768 && e <= 1024 ? "Tablet" : "Desktop" } async function initializeVideoDatassv13(e, t, s) { let i = !1; const o = ssv13_videoDataArray.find((t => t.id === e)), n = localStorage.getItem("ssv13_responseData"), a = JSON.parse(n), r = document.getElementById(e), d = o || { id: e, url: t, unique_views: 0, watch_time: 0, brand_id: a.swirls.customization.brand_id, total_views: 0, duration: a.swirls[s] ? a.swirls[s]?.find((e => e.server_url == t))?.video_len : a.swirls.video?.find((e => e.server_url == t))?.video_len, video_title: a.swirls[s] ? a.swirls[s]?.find((e => e.server_url == t))?.video_title : a?.swirls.video?.find((e => e.server_url == t))?.video_title, drop_of_point: [], skip_points: [], segments: [], location_details: {}, system_detail: { swirl_machine_id: generateUUIDssv13(), device_type: getDeviceTypessv13() } }; initializeSegmentssv13(d), ssv13_currentVideoTimer && clearInterval(ssv13_currentVideoTimer), o && (d.watch_time = parseInt(o.watch_time || 0, 10)), r.addEventListener("timeupdate", (() => { const e = Math.floor(r.currentTime); d.segments.find((t => e >= t.start && e <= t.end)); 0 == e || i || (d.unique_views = 1, d.total_views += 1, i = !0, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), ssv13_currentVideoTimer = setInterval((() => { r.paused || (tenPercent = Math.floor(.1 * d.duration), d.watch_time += 1, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) }), 1e3), r.addEventListener("pause", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (d.drop_of_point.push({ segment_id: t.segment_id, timestamp: e }), localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), r.addEventListener("ended", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (d.drop_of_point.push({ segment_id: t.segment_id, timestamp: e }), localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), r.addEventListener("seeked", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (0 == d?.skip_points.length || d.skip_points[d.skip_points.length - 1].to ? d.skip_points.push({ from: { segmentId: t.segmentId, timeStamp: e }, to: null }) : d.skip_points[d.skip_points.length - 1].to = { segmentId: t?.segmentId, timeStamp: e }, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), o ? Object.assign(o, d) : ssv13_videoDataArray.push(d) } function initializeSegmentssv13(e) { for (let t = 0; t < Math.ceil(e.duration / 3); t++)e.segments.push({ segment_id: t + 1, start: 3 * t, end: Math.min(3 * (t + 1), e.duration) }) } function pushAnalyticsdatassv13() { substring_to_remove = "ssv13-video-m-"; const e = JSON.parse(localStorage.getItem("_all_video_data")), t = e?.map((async e => (e.video_id = e.id.replace(substring_to_remove, ""), e))); t.length > 0 && Promise.all(t).then((async e => { await fetch("https://analytics-api.goswirl.live/engagement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payloads: e }) }).then((e => { if (ssv13_videoDataArray = [], !e.ok) throw new Error("Network response was not ok"); localStorage.removeItem("_all_video_data") })).catch((e => { console.error("Error sending data:", e) })) })).catch((e => console.log(e))) } async function impressionCountssv13(e, t, s) { let i = window.location.href.split("?")[0]; const o = localStorage.getItem("uuid"), n = localStorage.getItem("timestamp"); if (o && n) { const e = 144e5; if ((new Date).getTime() - parseInt(n, 10) < e) return void console.log("Using existing UUID:", o) } const a = generateUUIDssv13(); localStorage.setItem("uuid", a), localStorage.setItem("timestamp", (new Date).getTime().toString()), e = parseInt(e); let r = await getUserGeossv13(), d = { id: a, playlistCode: t || "", url: i, brandId: e, videoIds: s, fingerprint: a, browserName: r.browserName, osName: r.osName, deviceType: r.deviceType, userAgent: r.userAgent, ipAddress: r.ipAddress, browserVersion: r.browserVersion, city: "", region: "", country: "" }; await fetch("https://analytics-api.goswirl.live/impression", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload: d }) }).then((e => { })).catch((e => { console.error("Error sending data:", e) })) } async function getUserGeossv13() { const e = {}; try { const t = await fetch("https://api.ipify.org?format=json"), s = await t.json(); e.ipAddress = s.ip } catch (t) { e.ipAddress = "Unable to fetch IP" } e.userAgent = navigator.userAgent; let t = "Unknown", s = "Unknown", i = "Unknown", o = "Desktop"; const n = e.userAgent; return n.includes("Chrome") ? (t = "Chrome", s = n.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown") : n.includes("Firefox") ? (t = "Firefox", s = n.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown") : n.includes("Safari") && !n.includes("Chrome") && (t = "Safari", s = n.match(/Version\/([\d.]+)/)?.[1] || "Unknown"), n.includes("Windows") ? i = "Windows" : /Android/i.test(n) ? (i = "Android", o = "Mobile") : /iPhone|iPad|iPod/i.test(n) ? (i = "iOS", o = "Mobile") : n.includes("Mac") ? i = "macOS" : n.includes("Linux") && (i = "Linux"), e.browserName = t, e.browserVersion = s, e.osName = i, e.deviceType = o, e } window.addEventListener("beforeunload", (() => { const e = localStorage.getItem("_all_video_data"); if (e) try { const t = JSON.parse(e); localStorage.removeItem("_all_video_data"); const s = t?.map((async e => (e.video_id = e.id.replace("ssv13-video-m-", ""), e))); if (s) try { navigator.sendBeacon("https://analytics-api.goswirl.live/engagement/onclose", JSON.stringify(t)) || console.log("Beacon transmission failed"), localStorage.removeItem("_all_video_data") } catch (e) { console.error("Error sending data:", e) } } catch (e) { localStorage.removeItem("_all_video_data"), console.error("Error parsing analytics data:", e) } }));

const urlSearchParamssv13 = new URLSearchParams(window.location.search);
const getParamssv13 = Object.fromEntries(urlSearchParamssv13.entries());

let ssv13_globalMute = true;
let ssv13_pipMode = false;
let ssv13_brandCustomizations = [];
let ssv13_storeURL = '';
let ssv13_storeType = '0';
let ssv13_storeCode = '';
let ssv13_storePlaylist = [];
let ssv13_storePdp = '';
let ssv13_responseData = [];
let ssv13_productIds = [];
let ssv13_productsAll = [];
let ssv13_pdppip = false;
let ssv13_pdppipURL = '';
let ssv13_swiper = [];
let ssv13_swiper_modal = [];
let ssv13_swiper_product = [];
let ssv13_swiper_review = [];
let ssv13_userData = null;
let ssv13_currentModal = 0;
let ssv13_modalState = 0;
let ssv13_commentsLoaded = [];
let ssv13_fsdb = [];
let ssv13_gptPrompt = [];
let ssv13_filters = [];
let ssv13_filterTheme = '0';
let ssv13_pageView = '2'; // 1 = Carousel, 2 = Grid

// Brand wise modifications [Conflicts]
// iCruze
let videoConflictClass = window.location.href.includes('icruze-digital') ? 'videoBackgroundFile' : '';

(() => {
    // CSS    
    var jqTag = '';
    jqTag = document.createElement('link');
    jqTag.rel = 'stylesheet';
    jqTag.href = 'https://apigoswirl.com/short_video/vivo/style.min.css';
    document.head.appendChild(jqTag);

    // JS
    let JSLOAD1 = false;
    jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://apigoswirl.com/assets/js/swiper.min.js';
    document.head.appendChild(jqTag);
    jqTag.onload = function () { JSLOAD1 = true; };

    let ScriptsLOADED = setInterval(() => {
        if (JSLOAD1) {
            initssv13();
            clearInterval(ScriptsLOADED);
        }
    }, 50);
})();

function initssv13() {
    let cUrl = window.location.href;

    // check PIP 
    if (localStorage.getItem('ssv13_pip') && document.querySelectorAll('.swirl-short-videos-c-ssv13').length == 0) {
        ssv13_pipMode = true;
        let cDiv = document.createElement('div');
        cDiv.style.display = 'none';
        cDiv.innerHTML = `
            <div class="swirl-short-videos-c-ssv13" data-code="${localStorage.getItem('ssv13_storeCode')}" data-playlist="${localStorage.getItem('ssv13_storePlaylist')}"
                data-pdp="${localStorage.getItem('ssv13_storePdp')}" data-wt="${localStorage.getItem('ssv13_storeType')}"></div>
        `;
        document.body.appendChild(cDiv);
    } else if (document.querySelectorAll('.swirl-short-videos-c-ssv13').length) {
        // PDP or Normal        
        let pSet = document.querySelectorAll('.swirl-short-videos-c-ssv13')[0].dataset.pdp;
        pSet.split(',').forEach(pVal => {
            if (cUrl.includes(pVal) || pVal.includes('/home')) ssv13_pdppip = true;
        });
    }

    if (document.querySelectorAll('.swirl-short-videos-c-ssv13').length == 0) {
        console.log('SSV: Div missing.');
        return;
    }

    let apiCall = ssv13_pdppip ? 'https://api.goswirl.live/index.php/ShortVideo/getPDPVideosv13' : 'https://api.goswirl.live/index.php/ShortVideo/getVideosFv13';

    document.querySelectorAll('.swirl-short-videos-c-ssv13').forEach(elm => {
        ssv13_storeCode = elm.dataset.code;
        if (elm.dataset.playlist) {
            ssv13_storePlaylist.push(elm.dataset.playlist);
        }
        ssv13_storeType = elm.dataset.wt;
        ssv13_storePdp = elm.dataset.pdp;
    });
    ssv13_storeURL = window.location.origin;
    ssv13_storePlaylist = ssv13_storePlaylist.join(',');
    ssv13_pdppipURL = cUrl;

    if (ssv13_pipMode && !ssv13_storePlaylist && localStorage.getItem('ssv13_pdppip')) {
        ssv13_pdppipURL = cUrl = localStorage.getItem('ssv13_pdppipURL');
        ssv13_storeCode = localStorage.getItem('ssv13_storeCode');
        ssv13_storeType = localStorage.getItem('ssv13_storeType');
        ssv13_storePlaylist = localStorage.getItem('ssv13_storePlaylist');
        ssv13_storePdp = localStorage.getItem('ssv13_storePdp');
        ssv13_pdppip = localStorage.getItem('ssv13_pdppip');
        apiCall = 'https://api.goswirl.live/index.php/ShortVideo/getPDPVideosv13';
    }

    localStorage.setItem('ssv13_storeCode', ssv13_storeCode);
    localStorage.setItem('ssv13_storePlaylist', ssv13_storePlaylist);
    localStorage.setItem('ssv13_storeType', ssv13_storeType);
    localStorage.setItem('ssv13_storePdp', ssv13_storePdp);
    localStorage.setItem('ssv13_pdppip', ssv13_pdppip);
    localStorage.setItem('ssv13_pdppipURL', ssv13_pdppipURL);

    ssv13_userData = localStorage.getItem('ssv13_user') ? JSON.parse(localStorage.getItem('ssv13_user')) : null;

    let myHeaders = new Headers();
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if (ssv13_storePlaylist || ssv13_pdppip || ssv13_pipMode) {
        fetch(`${apiCall}?sCode=${ssv13_storeCode}&pCodes=${ssv13_storePlaylist}&url=${cUrl}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result);
                if (Object.keys(data.swirls).length == 0) {
                    console.log('SSV: Videos missing.');
                    return;
                }

                ssv13_brandCustomizations = data.swirls.customization;
                ssv13_filters = data.swirls.filter;
                localStorage.setItem('ssv13_responseData', result);

                // Mail embed code copy    
                let jqTag = '';
                jqTag = document.createElement('script');
                jqTag.rel = 'text/javascript';
                jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js';
                document.body.insertBefore(jqTag, document.body.lastChild);

                if (ssv13_brandCustomizations.comment_mode == '1') {
                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);

                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);

                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);
                    jqTag.onload = () => {
                        firebase.initializeApp({
                            apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                            authDomain: 'swirl-short-vido.firebaseapp.com',
                            projectId: 'swirl-short-vido',
                            storageBucket: 'swirl-short-vido.appspot.com'
                        });
                        ssv13_fsdb = firebase.firestore();
                    };
                }

                let i = 0;
                document.querySelectorAll('.swirl-short-videos-c-ssv13').forEach(elm => {
                    if (!ssv13_pdppip) {
                        ssv13_responseData[elm.dataset.playlist] = data.swirls[elm.dataset.playlist];
                        generatessv13(data.swirls[elm.dataset.playlist], elm, i, true);
                        impressionCountssv13(data.swirls.customization.brand_id, elm.dataset.playlist, data.swirls[elm.dataset.playlist].map((item) => item.video_id));
                    } else {
                        ssv13_responseData['video'] = data.swirls.video;
                        generatessv13(data.swirls.video, elm, i, true);
                        impressionCountssv13(data.swirls.customization.brand_id, "", data.swirls.video.map((item) => item.video_id));
                    }
                    i++;
                });
            })
            .catch(error => {
                console.log(error);
                console.log('SSV: Video fetch failed.');
                return;
            });
    } else {
        console.log('SSV: No Playlist, No PDP.');
    }
}

function toggleSelectAllFilterssv13(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    var selectAllCheckbox = dropdown.querySelector(".select-all");
    var checkboxes = dropdown.querySelectorAll(".option");
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

function updateSelectAllFilterssv13(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    var selectAllCheckbox = dropdown.querySelector(".select-all");
    var checkboxes = dropdown.querySelectorAll(".option");
    var allChecked = true;
    checkboxes.forEach(function (checkbox) {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });
    selectAllCheckbox.checked = allChecked;
}

function expandFilterSearchssv13(no) {
    let fLBtn = document.querySelectorAll('.filters-filter-btn-ssv13')[no];
    let fRBtn = document.querySelectorAll('.filters-search-btn-ssv13')[no];
    let fL = document.querySelectorAll('.filters-left-ssv13')[no];
    let fR = document.querySelectorAll('.filters-right-ssv13')[no];

    if (fRBtn.style.display == 'block') {
        fL.style.width = '50px';
        fR.style.width = 'calc(100% - 50px)';
        setTimeout(() => {
            fR.querySelector('.filter-search-option-ssv13').style.display = 'block';
            fL.querySelector('.filters-ssv13').style.display = 'none';
            fLBtn.style.display = 'block';
        }, 300);
        fRBtn.style.display = 'none';
    } else {
        fL.querySelector('.filters-ssv13').style.display = 'flex';
        fR.querySelector('.filter-search-option-ssv13').style.display = 'none';
        fL.style.width = 'calc(100% - 50px)';
        fR.style.width = '50px';
        fRBtn.style.display = 'block';
        fLBtn.style.display = 'none';
    }
}

function toggleFilterDropssv13(id) {
    let btnPos = getElementPositionInMasterDivssv13(document.body, event.target);
    var rect = event.target.getBoundingClientRect();
    btnPos.top = rect.top;

    // Close all other dropdowns
    var dropdowns = document.getElementsByClassName("dropdown-content-ssv13");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.id !== id) {
            openDropdown.classList.remove('show-f-ssv13');
        }
    }

    let drp = document.getElementById(id);
    if (!drp.classList.contains('show-f-ssv13')) {
        drp.classList.add("show-f-ssv13");
        drp.style.top = `${(btnPos.top + 40)}px`;

        if (window.innerWidth > 768) {
            drp.style.left = `${btnPos.left}px`;

            if (!isElementVisiblessv13(drp)) {
                drp.style.left = `auto`;
                drp.style.right = `${btnPos.right}px`;
            }
        }

        document.querySelector('.filters-ssv13').style.overflow = 'hidden';
    } else {
        drp.classList.remove("show-f-ssv13");
        document.querySelector('.filters-ssv13').style.overflow = 'auto';
    }
}

function isFilterVisiblessv13(child, parent) {
    const childRect = child.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    return (
        childRect.top >= parentRect.top &&
        childRect.left >= parentRect.left &&
        childRect.bottom <= parentRect.bottom &&
        childRect.right <= parentRect.right
    );
}

let fVissible = [];
function checkFilterssv13(no) {
    let fHidden = 0;
    document.querySelectorAll('.filters-ssv13')[no].querySelectorAll('.dropbtn-ssv13').forEach(e => {
        if (!isFilterVisiblessv13(e, document.querySelectorAll('.filters-ssv13')[no])) {
            e.style.pointerEvents = 'none';
            fHidden = !fVissible.includes(e) ? (fHidden + 1) : fHidden;
        } else {
            e.style.pointerEvents = 'auto';
            if (!fVissible.includes(e)) fVissible.push(e);
        }
    });

    let fCount = document.querySelectorAll('.filter-plus-count-ssv13')[no];
    if (fHidden > 0) {
        fCount.innerHTML = '+' + fHidden;
    } else {
        fCount.style.display = 'none';
    }
}

function filterVideossv13(no, frm) {
    event.preventDefault();

    let target = document.querySelectorAll('.swirl-short-videos-c-ssv13')[no];
    let pCode = target.dataset.playlist;
    let vIds = '';
    if (ssv13_filterTheme == '1') {
        vIds = frm.querySelector('input[name="menuFilter"]:checked').value;
    } else {
        let filters = frm.querySelectorAll('input[name="menuFilter[]"]');
        if (filters.length) {
            let values = Array.from(filters).map(input => input.checked ? input.value : '');
            let finalVal = values.filter(item => item !== undefined && item !== null && item !== '');
            if (Object.keys(finalVal).length) {
                let cleanArray = finalVal.join(',').split(',');
                cleanArray = [...new Set(cleanArray)];
                vIds = cleanArray.join(',');
            }
        }
    }

    if (vIds) {
        // Filter API Call
        let myHeaders = new Headers();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`https://api.goswirl.live/index.php/ShortVideo/getFilteredVideosv13_2?brandId=${ssv13_brandCustomizations.brand_id}&videoIds=${vIds}&productIds=&limit=100&page=0`, requestOptions).then(response => response.text()).then(result => {
            let data = JSON.parse(result);
            if (Object.keys(data.data.video).length) {
                reGeneratessv13(no, target, data.data.video, pCode);
            } else {
                // ssv13_masterDiv.innerHTML = `<p style="text-align: center; margin: 80px 0 !important; color: #8B8B8E; font-size: 16px;">No videos found.</p>`
                reGeneratessv13(no, target, ssv13_responseData[pCode], pCode);
            }
        }).catch(error => {
            console.log(error);
            console.log('SSV: Filter video fetch failed.');
            return;
        });
    } else {
        reGeneratessv13(no, target, ssv13_responseData[pCode], pCode);
    }
}

function reGeneratessv13(no, target, videos, pCode) {
    ssv13_swiper[no] = [];
    ssv13_swiper_modal[no] = [];
    ssv13_swiper_product[no] = [];
    ssv13_swiper_review[no] = [];

    document.querySelector(`.JS-video-modal-div-ssv13-${no}`).remove();

    // LS
    let rData = localStorage.getItem('ssv13_responseData') ? JSON.parse(localStorage.getItem('ssv13_responseData')) : [];
    rData['swirls'][pCode] = videos;
    localStorage.setItem('ssv13_responseData', JSON.stringify(rData));

    generatessv13(videos, target, no);

    // Analytics code
    impressionCountssv13(ssv13_brandCustomizations.brand_id, "", videos.map((item) => item.video_id));
}

function generateFilterssv13(target, no) {
    let cDiv = document.createElement('div');
    // cDiv.style = 'z-index: 12; position: relative; width: calc(100% - 120px); margin: 0;';
    cDiv.classList.add('swirl-short-videos-f-ssv13');

    let filterHTML = `<form onsubmit="return filterVideossv13(${no}, this);" style="display: block; width: 100%; margin: 0; padding: 0;"><div class="filters-master-ssv13">`;

    // Left
    filterHTML += `<div class="filters-left-ssv13">        
        <svg class="filters-filter-btn-ssv13" style="display: none;" onclick="expandFilterSearchssv13(${no});" width="20" height="20" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z"></path><path fill="none" stroke="#111112" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M148 172H40M216 172h-28"></path><circle cx="168" cy="172" r="20" fill="none" stroke="#111112" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><path fill="none" stroke="#111112" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M84 84H40M216 84h-92"></path><circle cx="104" cy="84" r="20" fill="none" stroke="#111112" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
        </svg>
    `;
    if (Object.keys(ssv13_filters).length) {
        let fi = 0;
        filterHTML += `<div class="filters-ssv13" onscroll="checkFilterssv13(${no});">`;
        ssv13_filters.forEach(f => {
            fi++;
            if (Object.keys(f.sub).length) {
                filterHTML += `
                    <div class="dropdown-ssv13">
                        <button type="button" onclick="toggleFilterDropssv13('dropdown-ssv13-${no}-${fi}')" class="dropbtn-ssv13">${f.f_name}
                            <span class="arrow-ssv13"></span>
                        </button>
                        <div id="dropdown-ssv13-${no}-${fi}" class="dropdown-content-ssv13">
                        <label class="custom-checkbox-ssv13" style="display: none !important;">
                            <input onchange="" type="checkbox" class="select-all" onclick="toggleSelectAllFilterssv13('dropdown-ssv13-${no}-${fi}')">
                            Select all
                            <span class="checkmark-ssv13"></span>
                        </label>
                `;
                f.sub.forEach(sf => {
                    filterHTML += `
                        <label class="custom-checkbox-ssv13">
                            <input name="menuFilter[]" onchange="document.querySelectorAll('.filter-submit-btn-ssv13')[${no}].click();" type="checkbox" class="option" value="${sf.video_id}" onclick="updateSelectAllFilterssv13('dropdown-ssv13-${no}-${fi}')">
                            ${sf.f_name}
                            <span class="checkmark-ssv13"></span>
                        </label>
                    `;
                });
                filterHTML += `
                        </div>                        
                    </div>
                `;
            } else {
                filterHTML += `
                    <div class="dropdown-ssv13">
                        <button type="button" onclick="" class="dropbtn-ssv13">
                            <input name="${ssv13_filterTheme == '1' ? 'menuFilter' : 'menuFilter[]'}" onchange="document.querySelectorAll('.filter-submit-btn-ssv13')[${no}].click();" style="position: absolute; opacity: 0; cursor: pointer; left: 0; width: 100%; height: 100%; margin: 0;" type="${ssv13_filterTheme == '1' ? 'radio' : 'checkbox'}" class="option" value="${f.video_id}">
                            ${f.f_name}
                        </button>                        
                    </div>                        
                `;
            }
        });
        filterHTML += `</div>`;
    }
    filterHTML += `<p class="filter-plus-count-ssv13"></p></div>`;

    // Rigth
    // filterHTML += `<div class="filters-right-ssv13">
    //     <svg class="filters-search-btn-ssv13" style="display: block;" onclick="expandFilterSearchssv13(${no});" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M14.0259 12.8469L17.5951 16.4152L16.4159 17.5943L12.8476 14.0252C11.5199 15.0895 9.86842 15.6684 8.16675 15.666C4.02675 15.666 0.666748 12.306 0.666748 8.16602C0.666748 4.02602 4.02675 0.666016 8.16675 0.666016C12.3067 0.666016 15.6667 4.02602 15.6667 8.16602C15.6692 9.86768 15.0903 11.5191 14.0259 12.8469ZM12.3542 12.2285C13.4118 11.1409 14.0025 9.68304 14.0001 8.16602C14.0001 4.94268 11.3892 2.33268 8.16675 2.33268C4.94341 2.33268 2.33341 4.94268 2.33341 8.16602C2.33341 11.3885 4.94341 13.9993 8.16675 13.9993C9.68377 14.0017 11.1417 13.4111 12.2292 12.3535L12.3542 12.2285Z" fill="#454549"/>
    //     </svg>
    //     <div class="filter-search-option-ssv13" style="display: none;"></div>
    //     </div>
    // `;

    filterHTML += `
        <button tabindex="-1" style="display: none !important;" class="filter-submit-btn-ssv13"></button>
    </form>`

    // Custom css
    filterHTML += ssv13_filterTheme == '1' ? `
        <style>
            .filters-left-ssv13, .filters-right-ssv13 {
                border-top: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;
            }

            .dropbtn-ssv13 {
                border: none;
                border-radius: 0;
                color: #454549;
                height: 50px;
            }

            .dropdown-ssv13:has(input:checked) .dropbtn-ssv13 {
                background-color: transparent;
                border: none;
                color: #454549;
                border-bottom: 2px solid #454549 !important;
            }

            .filters-search-btn-ssv13 {
                height: 50px !important;
                width: 50px !important;
                padding: 14px !important;
            }

            .filters-filter-btn-ssv13 {
                height: 50px !important;
                width: 50px !important;
                padding: 10px !important;
            }

            .ssvmulti-select .ssvmulti-select-header {
                margin: 5px 0;
            }

            .filter-plus-count-ssv13 {
                height: 50px;
                line-height: 50px;
            }

            .filters-right-ssv13 {
                display: none;
            }

            .filters-left-ssv13 {
                width: 100%;
            }

            .filters-ssv13 {
                justify-content: center;
            }
        </style>
    ` : '';

    cDiv.innerHTML = filterHTML;
    target.insertAdjacentElement('beforebegin', cDiv);

    // Filter sub filter
    // Close the dropdown-ssv13 if the user clicks outside of it
    if (Object.keys(ssv13_filters).length) {
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn-ssv13') && !event.target.matches('.swirl-short-videos-f-ssv13') && !event.target.closest('.dropdown-content-ssv13')) {
                var dropdowns = document.getElementsByClassName("dropdown-content-ssv13");
                for (var i = 0; i < dropdowns.length; i++) {
                    var opendropdown = dropdowns[i];
                    if (opendropdown.classList.contains('show-f-ssv13')) {
                        opendropdown.classList.remove('show-f-ssv13');
                        document.querySelector('.filters-ssv13').style.overflow = 'auto';
                    }
                }
            }
        }

        setTimeout(() => {
            checkFilterssv13(no);
        }, 500);

        window.onscroll = (e) => {
            var dropdowns = document.getElementsByClassName("dropdown-content-ssv13");
            for (var i = 0; i < dropdowns.length; i++) {
                var opendropdown = dropdowns[i];
                if (opendropdown.classList.contains('show-f-ssv13')) {
                    let dBtn = opendropdown.closest('.dropdown-ssv13').querySelector('.dropbtn-ssv13');
                    let btnPos = getElementPositionInMasterDivssv13(document.body, dBtn);
                    var rect = dBtn.getBoundingClientRect();
                    btnPos.top = rect.top;

                    opendropdown.style.top = `${(btnPos.top + 40)}px`;
                }
            }
        }
    }
}

function generatessv13(videos, target, no, initial) {
    // testing
    ssv13_brandCustomizations.chat_bot = '0';
    ssv13_brandCustomizations.video_filter = '1';

    if (Object.keys(videos).length == 0) { console.log(`SSV: Div ${(no + 1)}, No videos`); return; }

    // Filters Load
    if (Object.keys(ssv13_filters).length && ssv13_brandCustomizations.video_filter == '1' && initial) {
        generateFilterssv13(target, no);
    }

    let carouselLoad = true;
    if (ssv13_pdppip && ssv13_brandCustomizations.pdppip_hidecarousel == '1') {
        target.style.display = 'none';
        carouselLoad = false;
    }

    ssv13_globalMute = ssv13_brandCustomizations.auto_play_mute_un == '1' ? true : false;

    let cSlides = '';
    let mSlides = '';
    let mRightBlocks = '';
    let mThumbs = '';
    let i = 0;

    let reviewStars = [];
    reviewStars[0] = ``;
    reviewStars[1] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStars[2] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStars[3] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStars[4] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStars[5] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    let reviewStarsSlider = [];
    reviewStarsSlider[0] = ``;
    reviewStarsSlider[1] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStarsSlider[2] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStarsSlider[3] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStarsSlider[4] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStarsSlider[5] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;

    let vcBadge = [];
    vcBadge[0] = ``;
    vcBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-bestseller-ssv13">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.49736 6.92923C2.38071 6.92923 2.24073 6.9059 2.1474 6.8359C1.8441 6.67259 1.47081 6.25264 1.47081 5.13276C1.47081 2.79969 0.210953 1.44651 0.210953 1.44651L0.000976562 1.2132L1.09752 0L1.28417 0.279969C1.3075 0.3033 1.89077 1.14321 2.80066 0.909899L2.91732 1.5165C2.00742 1.7498 1.35416 1.25986 1.02753 0.909899L0.794221 1.2132C1.19084 1.72647 2.03075 3.07966 2.03075 5.13276C2.03075 5.73936 2.1474 6.15931 2.38071 6.27597C2.54403 6.36929 2.80066 6.27597 3.03397 6.04266C3.64057 5.43606 4.08385 3.94289 4.08385 3.94289L4.59713 4.12954C4.5738 4.19953 4.10719 5.80935 3.38393 6.50927C3.08063 6.78924 2.77733 6.92923 2.49736 6.92923ZM11.503 6.92923C11.6197 6.92923 11.7597 6.9059 11.853 6.8359C12.1563 6.67259 12.5296 6.25264 12.5296 5.13276C12.5296 2.77636 13.7661 1.44651 13.7894 1.42317L13.9994 1.2132L12.9029 0L12.7162 0.279969C12.6929 0.3033 12.1096 1.14321 11.1997 0.909899L11.0831 1.5165C11.993 1.7498 12.6462 1.25986 12.9729 0.909899L13.2528 1.2132C12.8562 1.72647 12.0163 3.07966 12.0163 5.13276C12.0163 5.73936 11.8996 6.15931 11.6663 6.27597C11.503 6.36929 11.2464 6.27597 11.0131 6.04266C10.4065 5.43606 9.9632 3.94289 9.9632 3.94289L9.44992 4.12954C9.47325 4.19953 9.93987 5.80935 10.6631 6.50927C10.9198 6.78924 11.2231 6.92923 11.503 6.92923ZM6.30027 5.34274H7.72345V11.0588H6.30027V5.34274Z"
                        fill="#F2B200" />
                    <path d="M6.58008 5.34375H7.41998V11.0598H6.58008V5.34375Z" fill="#F3CE58" />
                    <path
                        d="M2.2876 0C2.68422 3.59293 4.644 6.46261 7.00041 6.46261C9.35681 6.46261 11.3166 3.59293 11.7132 0H2.2876Z"
                        fill="#F2B200" />
                    <path
                        d="M3.19482 0C3.52145 3.63959 5.10794 6.5326 6.99773 6.5326C8.88752 6.5326 10.474 3.63959 10.8006 0H3.19482Z"
                        fill="#F3CE58" />
                    <path
                        d="M10.6381 12.1315H3.35889C3.35889 12.1315 4.99204 10.0317 6.99848 10.0317C9.00492 10.0317 10.6381 12.1315 10.6381 12.1315Z"
                        fill="#F2B200" />
                    <path
                        d="M9.77635 12.1308H4.22363C4.22363 12.1308 5.46016 9.98438 6.99999 9.98438C8.53982 9.98438 9.77635 12.1308 9.77635 12.1308Z"
                        fill="#F3CE58" />
                    <path d="M2.2876 12.5991H11.7132V13.999H2.2876V12.5991Z" fill="#BC845E" />
                    <path d="M3.35889 12.1318H10.6614V12.5985H3.35889V12.1318Z" fill="#916140" />
                    <path d="M4.6665 12.9497H9.33265V13.6496H4.6665V12.9497Z" fill="#F2B200" />
                    <path d="M2.2876 12.5991H2.75421V13.999H2.2876V12.5991Z" fill="#CE9C7A" />
                    <path d="M11.2456 12.5991H11.7122V13.999H11.2456V12.5991Z" fill="#916140" />
                    <path d="M4.8999 12.9497H9.09943V13.6496H4.8999V12.9497Z" fill="#F3CE58" />
                </svg>
                Bestseller
            </p>
        </div>        
    ` : '';
    vcBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-hotdeal-ssv13">
                <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                        fill="#FF9D33" />
                    <path
                        d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                        fill="#FFCE31" />
                    <path
                        d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                        fill="#FFDF85" />
                    <path
                        d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                        fill="#FF9D33" />
                </svg>
                Hot deals
            </p>
        </div>
    ` : '';
    vcBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-newarrival-ssv13">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                        fill="white" />
                </svg>
            </p>
        </div>
    ` : '';
    let plBadge = [];
    plBadge[0] = ``;
    plBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-bestseller-ssv13">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.49736 6.92923C2.38071 6.92923 2.24073 6.9059 2.1474 6.8359C1.8441 6.67259 1.47081 6.25264 1.47081 5.13276C1.47081 2.79969 0.210953 1.44651 0.210953 1.44651L0.000976562 1.2132L1.09752 0L1.28417 0.279969C1.3075 0.3033 1.89077 1.14321 2.80066 0.909899L2.91732 1.5165C2.00742 1.7498 1.35416 1.25986 1.02753 0.909899L0.794221 1.2132C1.19084 1.72647 2.03075 3.07966 2.03075 5.13276C2.03075 5.73936 2.1474 6.15931 2.38071 6.27597C2.54403 6.36929 2.80066 6.27597 3.03397 6.04266C3.64057 5.43606 4.08385 3.94289 4.08385 3.94289L4.59713 4.12954C4.5738 4.19953 4.10719 5.80935 3.38393 6.50927C3.08063 6.78924 2.77733 6.92923 2.49736 6.92923ZM11.503 6.92923C11.6197 6.92923 11.7597 6.9059 11.853 6.8359C12.1563 6.67259 12.5296 6.25264 12.5296 5.13276C12.5296 2.77636 13.7661 1.44651 13.7894 1.42317L13.9994 1.2132L12.9029 0L12.7162 0.279969C12.6929 0.3033 12.1096 1.14321 11.1997 0.909899L11.0831 1.5165C11.993 1.7498 12.6462 1.25986 12.9729 0.909899L13.2528 1.2132C12.8562 1.72647 12.0163 3.07966 12.0163 5.13276C12.0163 5.73936 11.8996 6.15931 11.6663 6.27597C11.503 6.36929 11.2464 6.27597 11.0131 6.04266C10.4065 5.43606 9.9632 3.94289 9.9632 3.94289L9.44992 4.12954C9.47325 4.19953 9.93987 5.80935 10.6631 6.50927C10.9198 6.78924 11.2231 6.92923 11.503 6.92923ZM6.30027 5.34274H7.72345V11.0588H6.30027V5.34274Z"
                        fill="#F2B200" />
                    <path d="M6.58008 5.34375H7.41998V11.0598H6.58008V5.34375Z"
                        fill="#F3CE58" />
                    <path
                        d="M2.2876 0C2.68422 3.59293 4.644 6.46261 7.00041 6.46261C9.35681 6.46261 11.3166 3.59293 11.7132 0H2.2876Z"
                        fill="#F2B200" />
                    <path
                        d="M3.19482 0C3.52145 3.63959 5.10794 6.5326 6.99773 6.5326C8.88752 6.5326 10.474 3.63959 10.8006 0H3.19482Z"
                        fill="#F3CE58" />
                    <path
                        d="M10.6381 12.1315H3.35889C3.35889 12.1315 4.99204 10.0317 6.99848 10.0317C9.00492 10.0317 10.6381 12.1315 10.6381 12.1315Z"
                        fill="#F2B200" />
                    <path
                        d="M9.77635 12.1308H4.22363C4.22363 12.1308 5.46016 9.98438 6.99999 9.98438C8.53982 9.98438 9.77635 12.1308 9.77635 12.1308Z"
                        fill="#F3CE58" />
                    <path d="M2.2876 12.5991H11.7132V13.999H2.2876V12.5991Z"
                        fill="#BC845E" />
                    <path d="M3.35889 12.1318H10.6614V12.5985H3.35889V12.1318Z"
                        fill="#916140" />
                    <path d="M4.6665 12.9497H9.33265V13.6496H4.6665V12.9497Z"
                        fill="#F2B200" />
                    <path d="M2.2876 12.5991H2.75421V13.999H2.2876V12.5991Z"
                        fill="#CE9C7A" />
                    <path d="M11.2456 12.5991H11.7122V13.999H11.2456V12.5991Z"
                        fill="#916140" />
                    <path d="M4.8999 12.9497H9.09943V13.6496H4.8999V12.9497Z"
                        fill="#F3CE58" />
                </svg>
                Bestseller
            </p>
        </div>
    ` : '';
    plBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-hotdeal-ssv13">
                <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                        fill="#FF9D33" />
                    <path
                        d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                        fill="#FFCE31" />
                    <path
                        d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                        fill="#FFDF85" />
                    <path
                        d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                        fill="#FF9D33" />
                </svg>
                Hot deals
            </p>
        </div>
    ` : '';
    plBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-newarrival-ssv13">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                        fill="white" />
                </svg>
                New arrival
            </p>
        </div>
    ` : '';
    let pbBadge = [];
    pbBadge[0] = ``;
    pbBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-bestseller-ssv13">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.96167 6.08807C1.87 6.08807 1.76 6.06973 1.68667 6.01473C1.44833 5.8864 1.155 5.5564 1.155 4.6764C1.155 2.84307 0.165 1.77973 0.165 1.77973L0 1.5964L0.861667 0.643066L1.00833 0.863066C1.02667 0.8814 1.485 1.5414 2.2 1.35807L2.29167 1.83473C1.57667 2.01807 1.06333 1.63307 0.806667 1.35807L0.623333 1.5964C0.935 1.99973 1.595 3.06307 1.595 4.6764C1.595 5.15307 1.68667 5.48307 1.87 5.57473C1.99833 5.64807 2.2 5.57473 2.38333 5.3914C2.86 4.91473 3.20833 3.7414 3.20833 3.7414L3.61167 3.88807C3.59333 3.94307 3.22667 5.20807 2.65833 5.75807C2.42 5.97807 2.18167 6.08807 1.96167 6.08807ZM9.03833 6.08807C9.13 6.08807 9.24 6.06973 9.31333 6.01473C9.55167 5.8864 9.845 5.5564 9.845 4.6764C9.845 2.82473 10.8167 1.77973 10.835 1.7614L11 1.5964L10.1383 0.643066L9.99167 0.863066C9.97333 0.8814 9.515 1.5414 8.8 1.35807L8.70833 1.83473C9.42333 2.01807 9.93667 1.63307 10.1933 1.35807L10.4133 1.5964C10.1017 1.99973 9.44167 3.06307 9.44167 4.6764C9.44167 5.15307 9.35 5.48307 9.16667 5.57473C9.03833 5.64807 8.83667 5.57473 8.65333 5.3914C8.17667 4.91473 7.82833 3.7414 7.82833 3.7414L7.425 3.88807C7.44333 3.94307 7.81 5.20807 8.37833 5.75807C8.58 5.97807 8.81833 6.08807 9.03833 6.08807ZM4.95 4.8414H6.06833V9.33307H4.95V4.8414Z"
                    fill="#F2B200" />
                <path d="M5.1709 4.8418H5.8309V9.33346H5.1709V4.8418Z"
                    fill="#FFCE31" />
                <path
                    d="M1.79736 0.643066C2.10903 3.4664 3.64903 5.7214 5.5007 5.7214C7.35236 5.7214 8.89236 3.4664 9.20403 0.643066H1.79736Z"
                    fill="#F2B200" />
                <path
                    d="M2.51025 0.643066C2.76692 3.50307 4.01359 5.7764 5.49859 5.7764C6.98359 5.7764 8.23025 3.50307 8.48692 0.643066H2.51025Z"
                    fill="#FFCE31" />
                <path
                    d="M8.35916 10.1764H2.63916C2.63916 10.1764 3.92249 8.52637 5.49916 8.52637C7.07583 8.52637 8.35916 10.1764 8.35916 10.1764Z"
                    fill="#F2B200" />
                <path
                    d="M7.6812 10.1754H3.31787C3.31787 10.1754 4.28954 8.48877 5.49954 8.48877C6.70954 8.48877 7.6812 10.1754 7.6812 10.1754Z"
                    fill="#FFCE31" />
                <path d="M1.79736 10.5444H9.20403V11.6444H1.79736V10.5444Z"
                    fill="#BC845E" />
                <path d="M2.63916 10.1753H8.37749V10.542H2.63916V10.1753Z"
                    fill="#916140" />
                <path d="M3.66699 10.8184H7.33366V11.3684H3.66699V10.8184Z"
                    fill="#F2B200" />
                <path d="M1.79736 10.5444H2.16403V11.6444H1.79736V10.5444Z"
                    fill="#CE9C7A" />
                <path d="M8.83594 10.5444H9.2026V11.6444H8.83594V10.5444Z"
                    fill="#916140" />
                <path d="M3.84961 10.8184H7.14961V11.3684H3.84961V10.8184Z"
                    fill="#FFCE31" />
            </svg>
            Bestseller
        </p>
    ` : '';
    pbBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-hotdeal-ssv13">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                    fill="#FF9D33" />
                <path
                    d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                    fill="#FFCE31" />
                <path
                    d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                    fill="#FFDF85" />
                <path
                    d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                    fill="#FF9D33" />
            </svg>
            Hot deals
        </p>
    ` : '';
    pbBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-newarrival-ssv13">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="#9C150C"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                    fill="#9C150C" />
            </svg>
            New arrival
        </p>
    ` : '';
    let pcBadge = [];
    pcBadge[0] = ``;
    pcBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-bestseller-ssv13">
            <svg width="12" height="12" viewBox="0 0 12 12"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.31176 5.88445C2.2201 5.88445 2.1101 5.86612 2.03676 5.81112C1.79843 5.68279 1.5051 5.35279 1.5051 4.47279C1.5051 2.63945 0.515098 1.57612 0.515098 1.57612L0.350098 1.39279L1.21176 0.439453L1.35843 0.659453C1.37676 0.677786 1.8351 1.33779 2.5501 1.15445L2.64176 1.63112C1.92676 1.81445 1.41343 1.42945 1.15676 1.15445L0.973431 1.39279C1.2851 1.79612 1.9451 2.85945 1.9451 4.47279C1.9451 4.94945 2.03676 5.27945 2.2201 5.37112C2.34843 5.44445 2.5501 5.37112 2.73343 5.18779C3.2101 4.71112 3.55843 3.53779 3.55843 3.53779L3.96176 3.68445C3.94343 3.73945 3.57676 5.00445 3.00843 5.55445C2.7701 5.77445 2.53176 5.88445 2.31176 5.88445ZM9.38843 5.88445C9.4801 5.88445 9.5901 5.86612 9.66343 5.81112C9.90176 5.68279 10.1951 5.35279 10.1951 4.47279C10.1951 2.62112 11.1668 1.57612 11.1851 1.55779L11.3501 1.39279L10.4884 0.439453L10.3418 0.659453C10.3234 0.677786 9.8651 1.33779 9.1501 1.15445L9.05843 1.63112C9.77343 1.81445 10.2868 1.42945 10.5434 1.15445L10.7634 1.39279C10.4518 1.79612 9.79176 2.85945 9.79176 4.47279C9.79176 4.94945 9.7001 5.27945 9.51676 5.37112C9.38843 5.44445 9.18676 5.37112 9.00343 5.18779C8.52676 4.71112 8.17843 3.53779 8.17843 3.53779L7.7751 3.68445C7.79343 3.73945 8.1601 5.00445 8.72843 5.55445C8.9301 5.77445 9.16843 5.88445 9.38843 5.88445ZM5.3001 4.63779H6.41843V9.12945H5.3001V4.63779Z"
                    fill="#F2B200" />
                <path
                    d="M5.521 4.63806H6.181V9.12973H5.521V4.63806Z"
                    fill="#FFCE31" />
                <path
                    d="M2.14746 0.439453C2.45913 3.26279 3.99913 5.51779 5.85079 5.51779C7.70246 5.51779 9.24246 3.26279 9.55413 0.439453H2.14746Z"
                    fill="#F2B200" />
                <path
                    d="M2.86035 0.439453C3.11702 3.29945 4.36368 5.57279 5.84868 5.57279C7.33368 5.57279 8.58035 3.29945 8.83702 0.439453H2.86035Z"
                    fill="#FFCE31" />
                <path
                    d="M8.70926 9.97275H2.98926C2.98926 9.97275 4.27259 8.32275 5.84926 8.32275C7.42592 8.32275 8.70926 9.97275 8.70926 9.97275Z"
                    fill="#F2B200" />
                <path
                    d="M8.0313 9.97182H3.66797C3.66797 9.97182 4.63964 8.28516 5.84964 8.28516C7.05964 8.28516 8.0313 9.97182 8.0313 9.97182Z"
                    fill="#FFCE31" />
                <path
                    d="M2.14746 10.3406H9.55413V11.4406H2.14746V10.3406Z"
                    fill="#BC845E" />
                <path
                    d="M2.98926 9.97174H8.72759V10.3384H2.98926V9.97174Z"
                    fill="#916140" />
                <path
                    d="M4.01709 10.6145H7.68376V11.1645H4.01709V10.6145Z"
                    fill="#F2B200" />
                <path
                    d="M2.14746 10.3406H2.51413V11.4406H2.14746V10.3406Z"
                    fill="#CE9C7A" />
                <path
                    d="M9.18604 10.3406H9.5527V11.4406H9.18604V10.3406Z"
                    fill="#916140" />
                <path
                    d="M4.19971 10.6145H7.49971V11.1645H4.19971V10.6145Z"
                    fill="#FFCE31" />
            </svg>
            Bestseller
        </div>
    ` : '';
    pcBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-hotdeal-ssv13">
            <svg width="12" height="15" viewBox="0 0 12 15"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                    fill="#FF9D33" />
                <path
                    d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                    fill="#FFCE31" />
                <path
                    d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                    fill="#FFDF85" />
                <path
                    d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                    fill="#FF9D33" />
            </svg>
            Hot deals
        </div>
    ` : '';
    pcBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-newarrival-ssv13">
            <svg width="27" height="27" viewBox="0 0 27 27"
                fill="#9C150C" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                    fill="#ffffff" />
            </svg>
            New
        </div>
    ` : '';

    videos.forEach(video => {
        ssv13_productsAll[video.video_id] = video.product;

        // Carousel
        let cProduct = Object.keys(video.product).length ? `        
            <div class="video-bottom-product-ssv13" style="${ssv13_brandCustomizations.product_blog_img == '1' ? '' : 'display: none;'}">
                <div class="video-bp-img-block-ssv13">
                    <img height="20" width="20" class="video-bp-img-ssv13"
                        src="${productImagessv13(video.product[0].image, 60)}"
                        alt="Product thumbnail" title="Product thumbnail" />
                    <label class="video-bp-count-ssv13" style="${Object.keys(video.product).length > 1 ? '' : 'display: none !important;'}">${Object.keys(video.product).length}</label>
                </div>
                <div class="video-bp-detail-block-ssv13">
                    <p class="video-bp-title-ssv13">${video.product[0].title}</p>
                    <p class="video-bp-price-ssv13 JS-dynamic-price-${video.video_id}-${video.product[0].product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${video.product[0].currencysymbols}${formatCurrencyssv13(video.product[0].discount_price)}
                        <strike style="${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'display: none !important;'}">${video.product[0].currencysymbols}${formatCurrencyssv13(video.product[0].price)}</strike>
                        <label class="video-bp-off-ssv13" style="${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'display: none !important;'}">${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}%</label>
                    </p>
                </div>
            </div>` : ``;
        let cTitle = ssv13_brandCustomizations.product_blog_img == '1' && cProduct ? `` : `
            <p class="video-title-ssv13" title="${video.video_title}" style="${ssv13_brandCustomizations.video_title == '1' ? '' : 'display: none;'}">
                ${video.video_title}
            </p>`;
        cSlides += `
            <div class="swiper-slide" onclick="openVideoModalssv13(${i}, ${no});">
                <video data-src="${video.cover_video}" data-srcf="${video.server_url}" data-id="${video.video_id}" class="carousel-video-ssv13 ${video.is_landscape == '0' ? 'JS-cvideo-L-ssv13-off' : 'JS-cvideo-P-ssv13-off'} ${videoConflictClass}" onplay="this.closest('.swiper-slide').querySelector('.carousel-video-play-ssv13').style.display='none';"
                    poster="${video.cover_image}" loop playsinline muted>                    
                </video>
                <svg class="carousel-video-play-ssv13" width="61" height="61" viewBox="0 0 61 61" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.143066" width="60" height="60" rx="30" fill="#2E2E33" fill-opacity="0.5" />
                    <g clip-path="url(#clip0_622_61478)">
                        <path
                            d="M25.19 21.9416L38.325 29.6041C38.4191 29.6592 38.4972 29.738 38.5515 29.8326C38.6057 29.9273 38.6343 30.0344 38.6343 30.1435C38.6343 30.2526 38.6057 30.3598 38.5515 30.4544C38.4972 30.549 38.4191 30.6278 38.325 30.6829L25.19 38.3454C25.0948 38.4009 24.9867 38.4303 24.8765 38.4306C24.7663 38.4308 24.658 38.402 24.5626 38.3469C24.4672 38.2918 24.388 38.2125 24.3331 38.117C24.2782 38.0214 24.2495 37.9131 24.25 37.8029V22.4816C24.25 22.3717 24.279 22.2636 24.334 22.1684C24.3891 22.0733 24.4683 21.9943 24.5637 21.9395C24.659 21.8847 24.7672 21.8561 24.8771 21.8564C24.9871 21.8568 25.095 21.8862 25.19 21.9416Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_622_61478">
                            <rect width="30" height="30" fill="white" transform="translate(15.5 15.1431)" />
                        </clipPath>
                    </defs>
                </svg>
                <div class="video-top-gradiant-bg-ssv13" style="${ssv13_brandCustomizations.views == '1' ? '' : 'display: none;'}"></div>
                <div class="video-views-count-top-ssv13" style="${ssv13_brandCustomizations.views == '1' ? '' : 'display: none;'}">
                    <p>
                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.99978 0.398926C11.5944 0.398926 14.5851 2.98559 15.2124 6.39893C14.5858 9.81226 11.5944 12.3989 7.99978 12.3989C4.40511 12.3989 1.41444 9.81226 0.787109 6.39893C1.41378 2.98559 4.40511 0.398926 7.99978 0.398926ZM7.99978 11.0656C9.35942 11.0653 10.6787 10.6035 11.7417 9.7557C12.8047 8.90794 13.5484 7.72444 13.8511 6.39893C13.5473 5.07446 12.8031 3.89226 11.7402 3.04561C10.6773 2.19896 9.35865 1.73794 7.99978 1.73794C6.64091 1.73794 5.32224 2.19896 4.25936 3.04561C3.19648 3.89226 2.45229 5.07446 2.14844 6.39893C2.45117 7.72444 3.19489 8.90794 4.25787 9.7557C5.32085 10.6035 6.64013 11.0653 7.99978 11.0656ZM7.99978 9.39893C7.20413 9.39893 6.44107 9.08286 5.87846 8.52025C5.31585 7.95764 4.99978 7.19458 4.99978 6.39893C4.99978 5.60328 5.31585 4.84021 5.87846 4.27761C6.44107 3.715 7.20413 3.39893 7.99978 3.39893C8.79543 3.39893 9.55849 3.715 10.1211 4.27761C10.6837 4.84021 10.9998 5.60328 10.9998 6.39893C10.9998 7.19458 10.6837 7.95764 10.1211 8.52025C9.55849 9.08286 8.79543 9.39893 7.99978 9.39893ZM7.99978 8.06559C8.4418 8.06559 8.86573 7.89 9.17829 7.57744C9.49085 7.26488 9.66644 6.84095 9.66644 6.39893C9.66644 5.9569 9.49085 5.53298 9.17829 5.22041C8.86573 4.90785 8.4418 4.73226 7.99978 4.73226C7.55775 4.73226 7.13383 4.90785 6.82127 5.22041C6.5087 5.53298 6.33311 5.9569 6.33311 6.39893C6.33311 6.84095 6.5087 7.26488 6.82127 7.57744C7.13383 7.89 7.55775 8.06559 7.99978 8.06559Z"
                                fill="white" />
                        </svg>
                        ${numberToShorthandssv13(video.total_views)}
                    </p>
                </div>
                <div class="video-timer-top-ssv13">
                    <p>${video.video_len ? secondsToDurationssv13(video.video_len) : '00:00'}</p>
                </div>
                ${vcBadge[Object.keys(video.product).length ? video.product[0].product_tags : 0]}
                ${cProduct}
                ${cTitle}
            </div>
        `;

        // Modal        
        let pi = 0;
        let mProductSlider = '';
        let mReviewSlider = '';
        let mSliderReview = '';
        let mReviews = '';
        let mProductList = '';
        let mProducts = '';
        let mShareURL = window.location.href.split('?')[0] + '?ssv=' + window.btoa(video.video_id);

        let videoBuyBG = video.video_cta_bk ? video.video_cta_bk : ssv13_brandCustomizations.bk_color_buy_btn;
        let videoBuyFont = video.video_cta_fk ? video.video_cta_fk : ssv13_brandCustomizations.front_color_buy_btn;
        let videoCartFont = ssv13_brandCustomizations.front_color_add_to_cart_btn;

        let videoCTA = Object.keys(video.product).length == 0 && video.product_link ? true : false;

        video.product.forEach(prd => {
            // Product IDs for addtocart
            if (ssv13_brandCustomizations.add_to_cart == '1') {
                if (ssv13_storeType == '1') {
                    let productHandle = getHandlessv13(prd.url);
                    fetch(`${window.Shopify.routes.root}products/${productHandle}.js`).then(response => response.json()).then(ps => {
                        ssv13_productIds[prd.product_id] = ps.variants[0]['id'];
                    }).catch(error => {
                        // console.log('Shopify product fetch failed:', error);
                    });
                } else {
                    ssv13_productIds[prd.product_id] = prd.brand_product_id;
                }
            }

            mProductSlider += `
                <div class="swiper-slide" data-reviews="${Object.keys(prd.pReviews).length}">
                    <div class="video-modal-ps-card-ssv13"
                        onclick="openPhoneProductDetailssv13(this, ${i}, ${pi});"
                        style="${pcBadge[prd.product_tags] == '' ? '' : 'border-top-left-radius: 0;'} ${ssv13_brandCustomizations.product_price_status == '0' || ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 80px;' : ''} ${ssv13_brandCustomizations.product_price_status == '0' && ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 75px;' : ''}">
                        <div class="video-modal-ps-img-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' || ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 80px; width: 80px;' : ''} ${ssv13_brandCustomizations.product_price_status == '0' && ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 75px; width: 75px;' : ''}">
                            <img height="20" width="20" class="video-modal-ps-image-ssv13 JS-load-thumbs-ssv13"
                                src="" data-src="${productImagessv13(prd.image, 150)}"
                                alt="Product thumbnail"
                                title="Product thumbnail" />
                        </div>
                        <div class="video-modal-ps-detail-ssv13" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'padding-top: 10px;' : ''} ${ssv13_brandCustomizations.product_price_status == '0' || ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 80px; width: calc(100% - 80px);' : ''} ${ssv13_brandCustomizations.product_price_status == '0' && ssv13_brandCustomizations.cta_on_tile == '0' ? 'height: 75px; width: calc(100% - 75px);' : ''}">
                            <div class="video-modal-ps-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                                <svg width="13" height="12"
                                    viewBox="0 0 13 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.34814 0.440674L7.69523 4.58657H12.0545L8.52777 7.14888L9.87486 11.2948L6.34814 8.73247L2.82143 11.2948L4.16852 7.14888L0.641805 4.58657H5.00106L6.34814 0.440674Z"
                                        fill="#0B895C" />
                                </svg>
                                ${prd.avgRating}                                
                            </div>
                            <div class="video-modal-ps-ratting-ssv13" style="${prd.avgRating == 0 ? '' : 'display: none !important;'} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                                <svg style="margin-top: 4px !important;" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5814 12.6704L7.49974 10.477L11.4181 12.6704L10.9546 10.6798L9.69162 9.65549L9.85918 10.5242L7.49974 9.20369L5.14029 10.5242L5.66751 7.87257L3.68251 6.03646L4.90667 5.74971L3.83442 4.88553L2.72436 5.03691L1.15918 5.21702L4.4564 8.26591L3.5814 12.6704Z" fill="#5D5D60"/>
                                    <path d="M9.38085 4.68813L7.49974 0.610352C7.14917 1.50224 5.85402 3.24006 5.5166 3.95003L6.53916 4.7677L7.49974 3.26313L8.63196 5.71813L11.317 6.03646L10.3245 6.95452L9.8147 7.42783L10.7232 8.1505L11.3674 7.50368L12.1917 6.74146L13.8403 5.21702L9.38085 4.68813Z" fill="#5D5D60"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3029 11.3194L3.31738 4.04421L4.01656 3.18066L13.002 10.4558L12.3029 11.3194Z" fill="#5D5D60"/>
                                </svg>
                                no-review
                            </div>
                            <p class="video-modal-ps-title-ssv13" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'margin-bottom: 6px !important;' : ''} ${ssv13_brandCustomizations.product_price_status == '0' && ssv13_brandCustomizations.cta_on_tile == '0' && ssv13_brandCustomizations.product_reviews == '0' ? 'margin-top: 15px !important;' : ''} ${ssv13_brandCustomizations.product_price_status == '0' && ssv13_brandCustomizations.cta_on_tile == '0' && ssv13_brandCustomizations.product_reviews == '1' ? 'margin-top: 5px !important;' : ''}">${prd.title}</p>
                            <p class="video-modal-ps-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                <label class="video-modal-ps-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                            </p>
                            <div class="video-modal-ps-cta-ssv13" style="${ssv13_brandCustomizations.cta_on_tile == '0' ? 'display: none !important;' : ''}">
                                <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';"
                                    class="video-modal-ps-buynow-ssv13 JS-pc-ignore-ssv13">${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}</button>
                                <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important; border: 2px solid ' + videoCartFont + ' !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, 1);"
                                    class="video-modal-ps-addtocart-ssv13 JS-pc-ignore-ssv13">
                                    <svg class="JS-pc-ignore-ssv13" width="25"
                                        height="25" viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg" style="${ssv13_brandCustomizations.buy_now == '0' ? 'height: 21px !important;' : ''}">
                                        <path class="JS-pc-ignore-ssv13" 
                                            d="M4.2002 16.4407V4.44067H2.2002V2.44067H5.2002C5.46541 2.44067 5.71977 2.54603 5.9073 2.73357C6.09484 2.9211 6.2002 3.17546 6.2002 3.44067V15.4407H18.6382L20.6382 7.44067L21.1528 5.44067H21.9202C22.0722 5.44068 22.2222 5.47533 22.3588 5.54201C22.4954 5.60869 22.615 5.70563 22.7085 5.82546C22.802 5.9453 22.867 6.08487 22.8985 6.23358C22.93 6.38229 22.9271 6.53622 22.8902 6.68367L20.3902 16.6837C20.336 16.8999 20.2111 17.0919 20.0354 17.229C19.8597 17.3662 19.6431 17.4407 19.4202 17.4407H5.2002C4.93498 17.4407 4.68063 17.3353 4.49309 17.1478C4.30555 16.9602 4.2002 16.7059 4.2002 16.4407ZM6.2002 23.4407C5.66976 23.4407 5.16105 23.23 4.78598 22.8549C4.41091 22.4798 4.2002 21.9711 4.2002 21.4407C4.2002 20.9102 4.41091 20.4015 4.78598 20.0265C5.16105 19.6514 5.66976 19.4407 6.2002 19.4407C6.73063 19.4407 7.23934 19.6514 7.61441 20.0265C7.98948 20.4015 8.2002 20.9102 8.2002 21.4407C8.2002 21.9711 7.98948 22.4798 7.61441 22.8549C7.23934 23.23 6.73063 23.4407 6.2002 23.4407ZM18.2002 23.4407C17.6698 23.4407 17.1611 23.23 16.786 22.8549C16.4109 22.4798 16.2002 21.9711 16.2002 21.4407C16.2002 20.9102 16.4109 20.4015 16.786 20.0265C17.1611 19.6514 17.6698 19.4407 18.2002 19.4407C18.7306 19.4407 19.2393 19.6514 19.6144 20.0265C19.9895 20.4015 20.2002 20.9102 20.2002 21.4407C20.2002 21.9711 19.9895 22.4798 19.6144 22.8549C19.2393 23.23 18.7306 23.4407 18.2002 23.4407Z"
                                            fill="${videoCartFont}" />
                                        <path class="JS-pc-ignore-ssv13" 
                                            d="M12.4758 6.38245V2.72693H14.0453V6.28753H17.6187V8.0531H14.0453V11.7269H12.4758V8.0531H8.61865V6.38245H12.4758Z"
                                            fill="${videoCartFont}" />
                                    </svg>
                                    <label style="${ssv13_brandCustomizations.buy_now == '1' ? 'display: none !important;' : 'display: inline-block !important;'} color: ${videoCartFont} !important;">${ssv13_brandCustomizations.add_to_cart_btn}</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    ${pcBadge[prd.product_tags]}
                </div>
            `;

            mReviewSlider += `
                <div class="swiper-slide">
                    <div class="video-modal-pr-container-ssv13">
                        <div class="video-modal-pr-top-ssv13">
                            <div class="video-modal-pr-top-img-ssv13">
                                <img height="20" width="20" class="video-modal-pr-top-image-ssv13 JS-load-thumbs-ssv13"
                                    src="" data-src="${productImagessv13(prd.image, 80)}"
                                    alt="Product thumbnail"
                                    title="Product thumbnail" />
                            </div>
                            <div class="video-modal-pr-top-detail-ssv13">
                                <p class="video-modal-pr-top-bestseller-ssv13">
                                    <svg width="11" height="11"
                                        viewBox="0 0 11 11" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.96167 5.445C1.87 5.445 1.76 5.42667 1.68667 5.37167C1.44833 5.24333 1.155 4.91333 1.155 4.03333C1.155 2.2 0.165 1.13667 0.165 1.13667L0 0.953333L0.861667 0L1.00833 0.22C1.02667 0.238333 1.485 0.898333 2.2 0.715L2.29167 1.19167C1.57667 1.375 1.06333 0.99 0.806667 0.715L0.623333 0.953333C0.935 1.35667 1.595 2.42 1.595 4.03333C1.595 4.51 1.68667 4.84 1.87 4.93167C1.99833 5.005 2.2 4.93167 2.38333 4.74833C2.86 4.27167 3.20833 3.09833 3.20833 3.09833L3.61167 3.245C3.59333 3.3 3.22667 4.565 2.65833 5.115C2.42 5.335 2.18167 5.445 1.96167 5.445ZM9.03833 5.445C9.13 5.445 9.24 5.42667 9.31333 5.37167C9.55167 5.24333 9.845 4.91333 9.845 4.03333C9.845 2.18167 10.8167 1.13667 10.835 1.11833L11 0.953333L10.1383 0L9.99167 0.22C9.97333 0.238333 9.515 0.898333 8.8 0.715L8.70833 1.19167C9.42333 1.375 9.93667 0.99 10.1933 0.715L10.4133 0.953333C10.1017 1.35667 9.44167 2.42 9.44167 4.03333C9.44167 4.51 9.35 4.84 9.16667 4.93167C9.03833 5.005 8.83667 4.93167 8.65333 4.74833C8.17667 4.27167 7.82833 3.09833 7.82833 3.09833L7.425 3.245C7.44333 3.3 7.81 4.565 8.37833 5.115C8.58 5.335 8.81833 5.445 9.03833 5.445ZM4.95 4.19833H6.06833V8.69H4.95V4.19833Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M5.1709 4.19849H5.8309V8.69015H5.1709V4.19849Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M1.79785 0C2.10952 2.82333 3.64952 5.07833 5.50119 5.07833C7.35285 5.07833 8.89285 2.82333 9.20452 0H1.79785Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M2.50977 0C2.76643 2.86 4.0131 5.13333 5.4981 5.13333C6.9831 5.13333 8.22976 2.86 8.48643 0H2.50977Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M8.35867 9.5333H2.63867C2.63867 9.5333 3.92201 7.8833 5.49867 7.8833C7.07534 7.8833 8.35867 9.5333 8.35867 9.5333Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M7.68072 9.53237H3.31738C3.31738 9.53237 4.28905 7.8457 5.49905 7.8457C6.70905 7.8457 7.68072 9.53237 7.68072 9.53237Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M1.79785 9.90112H9.20452V11.0011H1.79785V9.90112Z"
                                            fill="#BC845E" />
                                        <path
                                            d="M2.63867 9.53223H8.37701V9.89889H2.63867V9.53223Z"
                                            fill="#916140" />
                                        <path
                                            d="M3.66699 10.175H7.33366V10.725H3.66699V10.175Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M1.79785 9.90112H2.16452V11.0011H1.79785V9.90112Z"
                                            fill="#CE9C7A" />
                                        <path
                                            d="M8.83594 9.90112H9.2026V11.0011H8.83594V9.90112Z"
                                            fill="#916140" />
                                        <path
                                            d="M3.84961 10.175H7.14961V10.725H3.84961V10.175Z"
                                            fill="#FFCE31" />
                                    </svg>
                                    Bestseller
                                </p>
                                <p class="video-modal-pr-top-title-ssv13">${prd.title}</p>
                                <p class="video-modal-pr-top-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                    <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                    <label class="video-modal-pr-top-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                                </p>
                                <div class="video-modal-pr-top-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''}">
                                    <p>
                                        <svg width="13" height="12"
                                            viewBox="0 0 13 12" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.34814 0.440674L7.69523 4.58657H12.0545L8.52777 7.14888L9.87486 11.2948L6.34814 8.73247L2.82143 11.2948L4.16852 7.14888L0.641805 4.58657H5.00106L6.34814 0.440674Z"
                                                fill="#0B895C" />
                                        </svg>
                                        ${prd.avgRating}
                                        <svg style="width: 7px !important;" width="1" height="12" viewBox="0 0 1 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="12" stroke="#A2A2A4"/>
                                        </svg>
                                        <svg style="height: 11px !important;" width="11" height="11"
                                            viewBox="0 0 11 11" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 11C0 9.93913 0.421427 8.92172 1.17157 8.17157C1.92172 7.42143 2.93913 7 4 7C5.06087 7 6.07828 7.42143 6.82843 8.17157C7.57857 8.92172 8 9.93913 8 11H7C7 10.2044 6.68393 9.44129 6.12132 8.87868C5.55871 8.31607 4.79565 8 4 8C3.20435 8 2.44129 8.31607 1.87868 8.87868C1.31607 9.44129 1 10.2044 1 11H0ZM4 6.5C2.3425 6.5 1 5.1575 1 3.5C1 1.8425 2.3425 0.5 4 0.5C5.6575 0.5 7 1.8425 7 3.5C7 5.1575 5.6575 6.5 4 6.5ZM4 5.5C5.105 5.5 6 4.605 6 3.5C6 2.395 5.105 1.5 4 1.5C2.895 1.5 2 2.395 2 3.5C2 4.605 2.895 5.5 4 5.5ZM8.142 7.3515C8.84467 7.66796 9.44099 8.18062 9.85929 8.82786C10.2776 9.47509 10.5001 10.2294 10.5 11H9.5C9.50011 10.422 9.33328 9.85625 9.01954 9.37079C8.70581 8.88534 8.25854 8.50083 7.7315 8.2635L8.1415 7.3515H8.142ZM7.798 1.7065C8.30176 1.91415 8.73248 2.26677 9.03551 2.71962C9.33853 3.17246 9.5002 3.70512 9.5 4.25C9.50021 4.93617 9.24385 5.59761 8.78127 6.10441C8.31869 6.61121 7.68333 6.92673 7 6.989V5.9825C7.37047 5.92944 7.71417 5.75901 7.98065 5.49623C8.24713 5.23345 8.42235 4.89216 8.48058 4.52247C8.53881 4.15277 8.47699 3.77415 8.30419 3.44218C8.13139 3.1102 7.85672 2.84237 7.5205 2.678L7.798 1.7065Z"
                                                fill="#5D5D60" />
                                        </svg>
                                        ${Object.keys(prd.pReviews).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                        
            `;

            mSliderReview += `
                <div class="video-modal-pr-bottom-ssv13" style="display: ${pi == 0 ? 'block' : 'none'};">                
            `;

            if (Object.keys(prd.pReviews).length) {
                prd.pReviews.forEach(review => {
                    mSliderReview += `
                        <div class="video-modal-pr-bottom-review-card-ssv13">
                            <div>
                                ${reviewStarsSlider[Math.round(review.c_rating)]}
                            </div>
                            <p class="video-modal-pr-bottom-rc-review-ssv13">${review.c_comment}</p>
                            <h4 class="video-modal-pr-bottom-rc-user-ssv13">
                                ${review.c_name}
                                <svg width="4" height="5" viewBox="0 0 4 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="4" height="4"
                                        rx="2" fill="#8B8B8E" />
                                </svg>
                                <label>${getTimeAgossv13((review.created_at_time * 1000))}</label>
                            </h4>
                        </div>
                    `;

                    mReviews += `
                        <div class="video-modal-sr-pb-pi-review-card-ssv13">
                            <div>
                                ${reviewStars[Math.round(review.c_rating)]}
                            </div>
                            <p class="video-modal-sr-pb-pi-rc-review-ssv13">${review.c_comment}</p>
                            <h4 class="video-modal-sr-pb-pi-rc-user-ssv13">
                                ${review.c_name}
                                <svg width="4" height="5" viewBox="0 0 4 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="4" height="4" rx="2" fill="#8B8B8E" />
                                </svg>
                                <label>${getTimeAgossv13((review.created_at_time * 1000))}</label>
                            </h4>
                        </div>
                    `;
                });
            } else {
                mSliderReview += `
                <p style="text-align: center; margin: 0 !important; color: #8B8B8E; font-size: 14px; position: absolute; width: 100%; top: calc(50% - 24px); left: 0;">
                    <svg style="display: block; margin: 0 auto;" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.153 23.6333L12.4999 19.5208L19.8467 23.6333L18.9778 19.901L16.6097 17.9804L16.9238 19.6094L12.4999 17.1333L8.07591 19.6094L9.06445 14.6375L5.34258 11.1948L7.63788 10.6571L5.6274 9.03676L3.54605 9.32061L0.611328 9.65831L6.79362 15.375L5.153 23.6333Z" fill="#8B8B8E"/>
                        <path d="M16.027 8.66665L12.4999 1.02081C11.8426 2.6931 9.41416 5.95152 8.78148 7.28272L10.6988 8.81584L12.4999 5.99477L14.6228 10.5979L19.6572 11.1948L17.7962 12.9161L16.8404 13.8036L18.5439 15.1586L19.7517 13.9458L21.2973 12.5166L24.3884 9.65831L16.027 8.66665Z" fill="#8B8B8E"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.506 21.1L4.6582 7.459L5.96916 5.83984L22.817 19.4808L21.506 21.1Z" fill="#8B8B8E"/>
                    </svg><br>            
                    No review has been recorded
                </p>`;
            }

            mSliderReview += `
                </div>
            `;

            let dpcHeight = 162;
            dpcHeight = ssv13_brandCustomizations.product_reviews == '0' && (ssv13_brandCustomizations.product_price_status == '0' || ssv13_brandCustomizations.cta_on_tile == '0') ? 142 : dpcHeight;
            mProductList += `
                <div class="video-modal-sr-pb-product-card-ssv13"
                    onclick="openProductDetailssv13(this, ${pi});" style="height: ${dpcHeight}px;">
                    <div class="video-modal-sr-pb-pc-img-ssv13">
                        <img height="20" width="20" class="video-modal-sr-pb-pc-pimage-ssv13 JS-load-thumbs-ssv13"
                            src="" data-src="${productImagessv13(prd.image, 110)}"
                            alt="Product thumbnail" title="Product thumbnail" style="${ssv13_brandCustomizations.product_reviews == '0' ? '' : 'border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}" />
                        <p class="video-modal-sr-pb-pc-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0.643066L9.79611 6.17093H15.6085L10.9062 9.58734L12.7023 15.1152L8 11.6988L3.29772 15.1152L5.09383 9.58734L0.391548 6.17093H6.20389L8 0.643066Z"
                                    fill="#0B895C" />
                            </svg>
                            ${prd.avgRating}
                            <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.408 13.072H0.26V0.00999963H1.408V13.072Z" fill="#A2A2A4"/>
                            </svg>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.166504 12.4766C0.166504 11.2389 0.658169 10.0519 1.53334 9.17673C2.40851 8.30156 3.59549 7.8099 4.83317 7.8099C6.07085 7.8099 7.25783 8.30156 8.133 9.17673C9.00817 10.0519 9.49984 11.2389 9.49984 12.4766H8.33317C8.33317 11.5483 7.96442 10.6581 7.30804 10.0017C6.65167 9.34531 5.76143 8.97656 4.83317 8.97656C3.90491 8.97656 3.01467 9.34531 2.3583 10.0017C1.70192 10.6581 1.33317 11.5483 1.33317 12.4766H0.166504ZM4.83317 7.22656C2.89942 7.22656 1.33317 5.66031 1.33317 3.72656C1.33317 1.79281 2.89942 0.226562 4.83317 0.226562C6.76692 0.226562 8.33317 1.79281 8.33317 3.72656C8.33317 5.66031 6.76692 7.22656 4.83317 7.22656ZM4.83317 6.0599C6.12234 6.0599 7.1665 5.01573 7.1665 3.72656C7.1665 2.4374 6.12234 1.39323 4.83317 1.39323C3.544 1.39323 2.49984 2.4374 2.49984 3.72656C2.49984 5.01573 3.544 6.0599 4.83317 6.0599ZM9.6655 8.21998C10.4853 8.58918 11.181 9.18729 11.669 9.94239C12.157 10.6975 12.4166 11.5775 12.4165 12.4766H11.2498C11.25 11.8022 11.0553 11.1422 10.6893 10.5758C10.3233 10.0095 9.80147 9.56086 9.18659 9.28398L9.66492 8.21998H9.6655ZM9.26417 1.63415C9.85189 1.8764 10.3544 2.28779 10.7079 2.81611C11.0615 3.34443 11.2501 3.96587 11.2498 4.60156C11.2501 5.40209 10.951 6.17378 10.4113 6.76504C9.87165 7.35631 9.13039 7.72442 8.33317 7.79706V6.62281C8.76539 6.56091 9.16637 6.36207 9.47727 6.0555C9.78816 5.74892 9.99257 5.35075 10.0605 4.91944C10.1284 4.48813 10.0563 4.0464 9.85473 3.6591C9.65313 3.2718 9.33268 2.95933 8.94042 2.76756L9.26417 1.63415Z"
                                    fill="#5D5D60" />
                            </svg>
                            ${Object.keys(prd.pReviews).length}
                        </p>
                        <p class="video-modal-sr-pb-pc-ratting-ssv13" style="${prd.avgRating == 0 ? '' : 'display: none !important;'} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <svg style="margin-top: 1px !important;" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5814 12.6704L7.49974 10.477L11.4181 12.6704L10.9546 10.6798L9.69162 9.65549L9.85918 10.5242L7.49974 9.20369L5.14029 10.5242L5.66751 7.87257L3.68251 6.03646L4.90667 5.74971L3.83442 4.88553L2.72436 5.03691L1.15918 5.21702L4.4564 8.26591L3.5814 12.6704Z" fill="#5D5D60"/>
                                <path d="M9.38085 4.68813L7.49974 0.610352C7.14917 1.50224 5.85402 3.24006 5.5166 3.95003L6.53916 4.7677L7.49974 3.26313L8.63196 5.71813L11.317 6.03646L10.3245 6.95452L9.8147 7.42783L10.7232 8.1505L11.3674 7.50368L12.1917 6.74146L13.8403 5.21702L9.38085 4.68813Z" fill="#5D5D60"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3029 11.3194L3.31738 4.04421L4.01656 3.18066L13.002 10.4558L12.3029 11.3194Z" fill="#5D5D60"/>
                            </svg>   
                            no-review                     
                        </p>
                    </div>
                    <div class="video-modal-sr-pb-pc-details-ssv13">
                        <p class="video-modal-sr-pb-pc-title-ssv13">${prd.title}</p>
                        <p class="video-modal-sr-pb-pc-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                            <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                            <label class="video-modal-sr-pb-pc-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                        </p>
                        <div class="video-modal-sr-pb-pc-cta-ssv13" style="${ssv13_brandCustomizations.cta_on_tile == '0' ? 'display: none !important;' : ''}">
                            <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin-right: 0px !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';" class="video-modal-sr-pb-pc-cta-buy-ssv13 JS-pc-ignore-ssv13">
                                ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                            </button>
                            <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} border: 2px solid ${videoCartFont} !important;" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, 1);" class="video-modal-sr-pb-pc-cta-cart-ssv13 JS-pc-ignore-ssv13">
                                <svg class="JS-pc-ignore-ssv13" width="21" height="22"
                                    viewBox="0 0 21 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="JS-pc-ignore-ssv13" 
                                        d="M2 14.6431V2.64307H0V0.643066H3C3.26522 0.643066 3.51957 0.748423 3.70711 0.93596C3.89464 1.1235 4 1.37785 4 1.64307V13.6431H16.438L18.438 5.64307H18V3.64307H19.0796H19.72C19.872 3.64307 20.022 3.67773 20.1586 3.7444C20.2952 3.81108 20.4148 3.90802 20.5083 4.02785C20.6019 4.14769 20.6668 4.28727 20.6983 4.43598C20.7298 4.58469 20.7269 4.73862 20.69 4.88607L18.19 14.8861C18.1358 15.1023 18.011 15.2943 17.8352 15.4314C17.6595 15.5686 17.4429 15.6431 17.22 15.6431H3C2.73478 15.6431 2.48043 15.5377 2.29289 15.3502C2.10536 15.1626 2 14.9083 2 14.6431ZM4 21.6431C3.46957 21.6431 2.96086 21.4324 2.58579 21.0573C2.21071 20.6822 2 20.1735 2 19.6431C2 19.1126 2.21071 18.6039 2.58579 18.2289C2.96086 17.8538 3.46957 17.6431 4 17.6431C4.53043 17.6431 5.03914 17.8538 5.41421 18.2289C5.78929 18.6039 6 19.1126 6 19.6431C6 20.1735 5.78929 20.6822 5.41421 21.0573C5.03914 21.4324 4.53043 21.6431 4 21.6431ZM16 21.6431C15.4696 21.6431 14.9609 21.4324 14.5858 21.0573C14.2107 20.6822 14 20.1735 14 19.6431C14 19.1126 14.2107 18.6039 14.5858 18.2289C14.9609 17.8538 15.4696 17.6431 16 17.6431C16.5304 17.6431 17.0391 17.8538 17.4142 18.2289C17.7893 18.6039 18 19.1126 18 19.6431C18 20.1735 17.7893 20.6822 17.4142 21.0573C17.0391 21.4324 16.5304 21.6431 16 21.6431Z"
                                        fill="${videoCartFont}" />
                                    <path class="JS-pc-ignore-ssv13" 
                                        d="M9.74728 6.25806V2.60254H11.3168V6.16314H14.8901V7.92871H11.3168V11.6025H9.74728V7.92871H5.89014V6.25806H9.74728Z"
                                        fill="${videoCartFont}" />
                                </svg>
                                <label class="JS-pc-ignore-ssv13" style="${ssv13_brandCustomizations.buy_now == '1' ? 'display: none !important;' : 'display: inline-block !important;'} color: ${videoCartFont} !important;">${ssv13_brandCustomizations.add_to_cart_btn}</label>
                            </button>
                        </div>
                        ${plBadge[prd.product_tags]}
                    </div>
                </div>
            `;

            let pbhCut = 0;
            if (window.innerWidth > 768) {
                pbhCut += Object.keys(video.product).length > 1 ? 27 : 0;
                pbhCut += prd.avgRating > 0 && ssv13_brandCustomizations.product_reviews == '1' ? 57 : 0;
                pbhCut += ssv13_brandCustomizations.buy_now == '0' && ssv13_brandCustomizations.add_to_cart == '0' ? 0 : 60;
            } else {
                pbhCut += prd.avgRating > 0 && ssv13_brandCustomizations.product_reviews == '1' ? 87 : 30;
                pbhCut += ssv13_brandCustomizations.buy_now == '0' && ssv13_brandCustomizations.add_to_cart == '0' ? 0 : 60;
            }
            mProducts += `
                <div class="video-modal-sr-pb-product-info-ssv13" style="transform: none; ${Object.keys(video.product).length > 1 ? 'display: none;' : ''}">
                    <div class="video-modal-sr-pb-pi-header-ssv13">
                        <svg class="video-modal-sr-pb-pi-drager-ssv13" width="33" height="4"
                            viewBox="0 0 33 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                fill="#1A1A1A" fill-opacity="0.25" />
                        </svg>

                        <p class="video-modal-sr-pb-pi-back-ssv13"
                            onclick="closeProductDetailssv13(this);" style="${Object.keys(video.product).length == 1 ? 'display: none;' : ''}">
                            <svg width="6" height="11" viewBox="0 0 6 11" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.121 5.64312L5.8335 9.35562L4.773 10.4161L0 5.64312L4.773 0.870117L5.8335 1.93062L2.121 5.64312Z"
                                    fill="#454549" />
                            </svg>
                            Back
                        </p>
                        <div class="video-modal-sr-pb-pi-review-btn-ssv13" onclick="this.querySelector('.CSS-review-toogler-D-ssv13').dispatchEvent(new Event('click'));" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <div class="video-modal-sr-pb-pi-review-btnL-ssv13">
                                <p class="video-modal-sr-pb-pi-review-title-ssv13">Reviews</p>
                                <p class="video-modal-sr-pb-pi-review-count-ssv13">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.643066L9.79611 6.17093H15.6085L10.9062 9.58734L12.7023 15.1152L8 11.6988L3.29772 15.1152L5.09383 9.58734L0.391548 6.17093H6.20389L8 0.643066Z"
                                            fill="#0B895C" />
                                    </svg>
                                    ${prd.avgRating}
                                    <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.908 13.072H0.76V0.00999963H1.908V13.072Z" fill="#A2A2A4"/>
                                    </svg>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.166504 12.4766C0.166504 11.2389 0.658169 10.0519 1.53334 9.17673C2.40851 8.30156 3.59549 7.8099 4.83317 7.8099C6.07085 7.8099 7.25783 8.30156 8.133 9.17673C9.00817 10.0519 9.49984 11.2389 9.49984 12.4766H8.33317C8.33317 11.5483 7.96442 10.6581 7.30804 10.0017C6.65167 9.34531 5.76143 8.97656 4.83317 8.97656C3.90491 8.97656 3.01467 9.34531 2.3583 10.0017C1.70192 10.6581 1.33317 11.5483 1.33317 12.4766H0.166504ZM4.83317 7.22656C2.89942 7.22656 1.33317 5.66031 1.33317 3.72656C1.33317 1.79281 2.89942 0.226562 4.83317 0.226562C6.76692 0.226562 8.33317 1.79281 8.33317 3.72656C8.33317 5.66031 6.76692 7.22656 4.83317 7.22656ZM4.83317 6.0599C6.12234 6.0599 7.1665 5.01573 7.1665 3.72656C7.1665 2.4374 6.12234 1.39323 4.83317 1.39323C3.544 1.39323 2.49984 2.4374 2.49984 3.72656C2.49984 5.01573 3.544 6.0599 4.83317 6.0599ZM9.6655 8.21998C10.4853 8.58918 11.181 9.18729 11.669 9.94239C12.157 10.6975 12.4166 11.5775 12.4165 12.4766H11.2498C11.25 11.8022 11.0553 11.1422 10.6893 10.5758C10.3233 10.0095 9.80147 9.56086 9.18659 9.28398L9.66492 8.21998H9.6655ZM9.26417 1.63415C9.85189 1.8764 10.3544 2.28779 10.7079 2.81611C11.0615 3.34443 11.2501 3.96587 11.2498 4.60156C11.2501 5.40209 10.951 6.17378 10.4113 6.76504C9.87165 7.35631 9.13039 7.72442 8.33317 7.79706V6.62281C8.76539 6.56091 9.16637 6.36207 9.47727 6.0555C9.78816 5.74892 9.99257 5.35075 10.0605 4.91944C10.1284 4.48813 10.0563 4.0464 9.85473 3.6591C9.65313 3.2718 9.33268 2.95933 8.94042 2.76756L9.26417 1.63415Z"
                                            fill="#5D5D60" />
                                    </svg>
                                    ${Object.keys(prd.pReviews).length}
                                </p>
                            </div>
                            <div class="video-modal-sr-pb-pi-review-btnR-ssv13">
                                <svg class="CSS-review-toogler-D-ssv13" onclick="openReviewssv13(this);" style="pointer-events: none;" width="18" height="19"
                                    viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z"
                                        fill="#5D5D60" />
                                </svg>
                                <svg class="CSS-review-toogler-P-ssv13" onclick="openReviewssv13(this);" style="pointer-events: none;" width="12" height="8" 
                                    viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.99962 4.97656L10.1246 0.851562L11.303 2.0299L5.99962 7.33323L0.696289 2.0299L1.87462 0.851562L5.99962 4.97656Z" fill="#454549"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="video-modal-sr-pb-pi-middle-ssv13" style="height: calc(100% - ${pbhCut}px);">
                        <div class="video-modal-sr-pb-pi-reviews-ssv13">
                            ${mReviews}
                        </div>
                        <div class="video-modal-sr-pb-pi-pclosed-ssv13" onclick="this.querySelector('.CSS-product-toogler-ssv13').dispatchEvent(new Event('click'));">
                            <div class="video-modal-sr-pb-pic-pimg-ssv13">
                                <img height="20" width="20" class="JS-load-thumbs-ssv13" src="" data-src="${productImagessv13(prd.image, 80)}"
                                    alt="Product thumbnail" title="Product thumbnail" />
                            </div>
                            <div class="video-modal-sr-pb-pic-title-ssv13">
                                <p>${prd.title}</p>
                            </div>
                            <div class="video-modal-sr-pb-pic-btn-ssv13">
                                <svg style="pointer-events: none;" class="CSS-product-toogler-ssv13" onclick="closeReviewssv13(this);"
                                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z"
                                        fill="#5D5D60" />
                                </svg>
                            </div>
                        </div>
                        <div class="video-modal-sr-pb-pi-pdetails-ssv13">
                            <div class="video-modal-sr-pb-pi-pimage-ssv13">
                                <img height="20" width="20" class="video-modal-sr-pb-pi-pimg-ssv13 JS-load-thumbs-ssv13"
                                    src="" data-src="${productImagessv13(prd.image, 500)}"
                                    alt="Product thumbnail" title="Product thumbnail" />
                            </div>

                            ${pbBadge[prd.product_tags]}                           

                            <h3 class="video-modal-sr-pb-pi-ptitle-ssv13">${prd.title}</h3>

                            <p class="video-modal-sr-pb-pi-pprice-ssv13 JS-PB-dynamic-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                <label class="video-modal-sr-pb-pi-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                            </p>

                            <div class="JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13" style="display: none;">
                            </div>                            

                            <div class="JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13" style="display: none;">
                            </div>                            

                            <div class="JS-product-quantity-ssv13" style="${ssv13_brandCustomizations.add_to_cart == '0' || ssv13_brandCustomizations.product_qty == '0' ? 'display: none !important;' : ''}">
                                <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Qty.</h3>
                                <div class="video-modal-sr-pb-pi-qty-ssv13">
                                    <button tabindex="-1" class="qty-minus-ssv13" onclick="changeQtyssv13('minus', this);" disabled="disabled">
                                        <svg width="12" height="3" viewBox="0 0 12 3" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.166504 0.811035H11.8332V2.4777H0.166504V0.811035Z"
                                                fill="#8B8B8E" />
                                        </svg>
                                    </button>
                                    <input tabindex="-1" type="text" class="qty-val-ssv13" value="1" readonly />
                                    <button tabindex="-1" class="qty-plus-ssv13" onclick="changeQtyssv13('plus', this);">
                                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.1665 5.81104V0.811035H6.83317V5.81104H11.8332V7.4777H6.83317V12.4777H5.1665V7.4777H0.166504V5.81104H5.1665Z"
                                                fill="#8B8B8E" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">${ssv13_brandCustomizations.product_desc_title}</h3>
                            <div class="video-modal-sr-pb-pi-pdesc-master-ssv13">
                                <section class="video-modal-sr-pb-pi-pdesc-ssv13">
                                    ${prd.desription}
                                </section>
                                <label class="video-modal-sr-pb-pi-pdesc-toggle-ssv13" for="desc-toggle-${video.video_id}-${prd.product_id}"></label>
                                <input type="checkbox" class="desc-toggle-input-ssv13" id="desc-toggle-${video.video_id}-${prd.product_id}" style="display: none !important;">
                            </div>
                        </div>
                    </div>
                    <div class="video-modal-sr-pb-pi-footer-ssv13">                        
                        <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important; margin: 0 !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''} border: 2px solid ${videoCartFont} !important; color: ${videoCartFont} !important;" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, ${ssv13_brandCustomizations.product_qty == '0' ? 1 : 0});" class="video-modal-sr-pb-pi-cta-cart-ssv13">
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 14.6431V2.64307H0V0.643066H3C3.26522 0.643066 3.51957 0.748423 3.70711 0.93596C3.89464 1.1235 4 1.37785 4 1.64307V13.6431H16.438L18.438 5.64307H18V3.64307H19.0796H19.72C19.872 3.64307 20.022 3.67773 20.1586 3.7444C20.2952 3.81108 20.4148 3.90802 20.5083 4.02785C20.6019 4.14769 20.6668 4.28727 20.6983 4.43598C20.7298 4.58469 20.7269 4.73862 20.69 4.88607L18.19 14.8861C18.1358 15.1023 18.011 15.2943 17.8352 15.4314C17.6595 15.5686 17.4429 15.6431 17.22 15.6431H3C2.73478 15.6431 2.48043 15.5377 2.29289 15.3502C2.10536 15.1626 2 14.9083 2 14.6431ZM4 21.6431C3.46957 21.6431 2.96086 21.4324 2.58579 21.0573C2.21071 20.6822 2 20.1735 2 19.6431C2 19.1126 2.21071 18.6039 2.58579 18.2289C2.96086 17.8538 3.46957 17.6431 4 17.6431C4.53043 17.6431 5.03914 17.8538 5.41421 18.2289C5.78929 18.6039 6 19.1126 6 19.6431C6 20.1735 5.78929 20.6822 5.41421 21.0573C5.03914 21.4324 4.53043 21.6431 4 21.6431ZM16 21.6431C15.4696 21.6431 14.9609 21.4324 14.5858 21.0573C14.2107 20.6822 14 20.1735 14 19.6431C14 19.1126 14.2107 18.6039 14.5858 18.2289C14.9609 17.8538 15.4696 17.6431 16 17.6431C16.5304 17.6431 17.0391 17.8538 17.4142 18.2289C17.7893 18.6039 18 19.1126 18 19.6431C18 20.1735 17.7893 20.6822 17.4142 21.0573C17.0391 21.4324 16.5304 21.6431 16 21.6431Z"
                                    fill="${videoCartFont}"></path>
                                <path
                                    d="M9.74728 6.25806V2.60254H11.3168V6.16314H14.8901V7.92871H11.3168V11.6025H9.74728V7.92871H5.89014V6.25806H9.74728Z"
                                    fill="${videoCartFont}"></path>
                            </svg>
                            ${ssv13_brandCustomizations.add_to_cart_btn}
                        </button>
                        <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';" class="video-modal-sr-pb-pi-cta-buy-ssv13">
                            ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                        </button>
                    </div>
                </div>
            `;

            pi++;
        });

        mThumbs += i == 0 ? `
            <div class="video-modal-sl-thumb-toggler-ssv13" style="display: none !important;" onclick="toggleVideoThumbssv13(this)">
                <img height="20" width="20" class="JS-load-thumbs-ssv13" src="" data-src="${video.cover_image}"
                    alt="Video thumbnail">
            </div>
            <div class="video-modal-sl-thumb-container-ssv13">
                <img height="20" width="20" class="video-modal-sl-thumb-ssv13 CSS-img-thumb-ssv13 active-ssv13 JS-load-thumbs-ssv13" onclick="changeModalVideossv13(${i})"
                    src="" data-src="${video.cover_image}" alt="Video thumbnail">
                <div class="CSS-img-thumb-ssv13" onclick="this.previousElementSibling.dispatchEvent(new Event('click'));"></div>
            </div>
        ` : `
            <div class="video-modal-sl-thumb-container-ssv13">
                <img height="20" width="20" class="video-modal-sl-thumb-ssv13 CSS-img-thumb-ssv13 JS-load-thumbs-ssv13" onclick="changeModalVideossv13(${i})"
                    src="" data-src="${video.cover_image}" alt="Video thumbnail">
                <div class="CSS-img-thumb-ssv13" onclick="this.previousElementSibling.dispatchEvent(new Event('click'));"></div>
            </div>
        `;

        mSlides += `
            <div class="swiper-slide swiper-slide-m">
                <div class="video-modal-sl-video-container-ssv ${!Object.keys(video.product).length ? 'no-products-slide-ssv13' : ''}">
                    <video id="ssv13-video-m-${video.video_id}" data-src="${video.server_url}" data-products="${Object.keys(video.product).length}" data-id="${video.video_id}" class="video-modal-sl-video-ssv13 ${video.is_landscape == '0' ? 'JS-mvideo-L-ssv13-off' : 'JS-mvideo-P-ssv13-off'} ${videoConflictClass}"
                        ontimeupdate="updateProgressbarssv13(this);"
                        onclick="videoPlayPausessv13(this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13 svg'));" 
                        onpause="this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13').style.display = 'flex';" 
                        onplay="this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13').style.display = 'none';" 
                        poster="${video.cover_image}"
                        loop playsinline muted>                        
                    </video>
                    <div class="video-modal-sl-controls-ssv13" onclick="this.querySelector('.video-modal-sl-controls-ssv13 svg').dispatchEvent(new Event('click'));">
                        <svg onclick="videoPlayPausessv13(this);" style="pointer-events: none;" 
                            class="video-modal-sl-video-play-ssv13" width="32" height="38"
                            viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 0.916626H5.66667V37.0833H0.5V0.916626ZM26.3333 0.916626H31.5V37.0833H26.3333V0.916626Z"
                                fill="#F5F5F5" />
                        </svg>
                    </div>
                    <div class="video-modal-sl-top-controls-ssv13">
                        <label class="cart-count-ssv13" style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">0</label>
                        <svg style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'" class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-cart-ssv13"
                            width="18" height="19" viewBox="0 0 18 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.83336 4.34494L0.130859 1.64328L1.31003 0.464111L4.01169 3.16661H16.7134C16.8433 3.1666 16.9713 3.19696 17.0874 3.25525C17.2035 3.31354 17.3043 3.39817 17.3819 3.50236C17.4594 3.60655 17.5116 3.72743 17.5341 3.85535C17.5566 3.98327 17.549 4.11469 17.5117 4.23911L15.5117 10.9058C15.4602 11.0775 15.3548 11.2281 15.211 11.3351C15.0671 11.4422 14.8926 11.5 14.7134 11.4999H4.50003V13.1666H13.6667V14.8333H3.66669C3.44568 14.8333 3.23372 14.7455 3.07744 14.5892C2.92116 14.4329 2.83336 14.221 2.83336 13.9999V4.34494ZM4.50003 4.83328V9.83328H14.0934L15.5934 4.83328H4.50003ZM4.08336 18.1666C3.75184 18.1666 3.4339 18.0349 3.19948 17.8005C2.96506 17.5661 2.83336 17.2481 2.83336 16.9166C2.83336 16.5851 2.96506 16.2671 3.19948 16.0327C3.4339 15.7983 3.75184 15.6666 4.08336 15.6666C4.41488 15.6666 4.73282 15.7983 4.96724 16.0327C5.20166 16.2671 5.33336 16.5851 5.33336 16.9166C5.33336 17.2481 5.20166 17.5661 4.96724 17.8005C4.73282 18.0349 4.41488 18.1666 4.08336 18.1666ZM14.0834 18.1666C13.7518 18.1666 13.4339 18.0349 13.1995 17.8005C12.9651 17.5661 12.8334 17.2481 12.8334 16.9166C12.8334 16.5851 12.9651 16.2671 13.1995 16.0327C13.4339 15.7983 13.7518 15.6666 14.0834 15.6666C14.4149 15.6666 14.7328 15.7983 14.9672 16.0327C15.2017 16.2671 15.3334 16.5851 15.3334 16.9166C15.3334 17.2481 15.2017 17.5661 14.9672 17.8005C14.7328 18.0349 14.4149 18.1666 14.0834 18.1666Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-toggle-ssv13"
                            onclick="openSharePopupssv13(this);" width="3" height="16"
                            viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.5 0.5C0.8125 0.5 0.25 1.0625 0.25 1.75C0.25 2.4375 0.8125 3 1.5 3C2.1875 3 2.75 2.4375 2.75 1.75C2.75 1.0625 2.1875 0.5 1.5 0.5ZM1.5 13C0.8125 13 0.25 13.5625 0.25 14.25C0.25 14.9375 0.8125 15.5 1.5 15.5C2.1875 15.5 2.75 14.9375 2.75 14.25C2.75 13.5625 2.1875 13 1.5 13ZM1.5 6.75C0.8125 6.75 0.25 7.3125 0.25 8C0.25 8.6875 0.8125 9.25 1.5 9.25C2.1875 9.25 2.75 8.6875 2.75 8C2.75 7.3125 2.1875 6.75 1.5 6.75Z"
                                fill="white" />
                        </svg>
                        
                        <svg style="${ssv13_brandCustomizations.pip_mode == '1' ? '' : 'display: none !important;'}" class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-pip-ssv13" onclick="openPIPssv13();"
                            width="20" height="19" viewBox="0 0 20 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 0.356445C19.2652 0.356445 19.5196 0.461802 19.7071 0.649338C19.8946 0.836875 20 1.09123 20 1.35645V8.35645H18V2.35645H2V16.3564H8V18.3564H1C0.734784 18.3564 0.48043 18.2511 0.292893 18.0636C0.105357 17.876 0 17.6217 0 17.3564V1.35645C0 1.09123 0.105357 0.836875 0.292893 0.649338C0.48043 0.461802 0.734784 0.356445 1 0.356445H19ZM19 10.3564C19.2652 10.3564 19.5196 10.4618 19.7071 10.6493C19.8946 10.8369 20 11.0912 20 11.3564V17.3564C20 17.6217 19.8946 17.876 19.7071 18.0636C19.5196 18.2511 19.2652 18.3564 19 18.3564H11C10.7348 18.3564 10.4804 18.2511 10.2929 18.0636C10.1054 17.876 10 17.6217 10 17.3564V11.3564C10 11.0912 10.1054 10.8369 10.2929 10.6493C10.4804 10.4618 10.7348 10.3564 11 10.3564H19ZM18 12.3564H12V16.3564H18V12.3564ZM4.707 3.64945L6.957 5.89945L9 3.85645V9.35645H3.5L5.543 7.31345L3.293 5.06345L4.707 3.64945Z" fill="white"/>
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-volume-ssv13"
                            onclick="videoVolumessv13(this);" width="25" height="19"
                            viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-share-ssv13"
                            onclick="openSharePopupssv13(this);" width="23" height="19"
                            viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.0833 12.8104H8.91667C7.13957 12.8097 5.39608 13.2948 3.8747 14.2132C2.35331 15.1316 1.1119 16.4484 0.284668 18.0212C0.261416 17.7293 0.249851 17.4366 0.250001 17.1437C0.250001 11.1605 5.10008 6.31038 11.0833 6.31038V0.352051L22.4583 9.56038L11.0833 18.7687V12.8104ZM8.91667 10.6437H13.25V14.2274L19.0144 9.56038L13.25 4.89338V8.47705H11.0833C9.83777 8.47565 8.60661 8.74335 7.47409 9.26184C6.34157 9.78033 5.33443 10.5374 4.52158 11.4811C5.92051 10.9267 7.41188 10.6425 8.91667 10.6437Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-close-ssv13"
                            onclick="closeVideoModalssv13(true);" width="11" height="12"
                            viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.49962 4.82178L9.62462 0.696777L10.803 1.87511L6.67796 6.00011L10.803 10.1251L9.62462 11.3034L5.49962 7.17844L1.37462 11.3034L0.196289 10.1251L4.32129 6.00011L0.196289 1.87511L1.37462 0.696777L5.49962 4.82178Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="video-modal-sl-bottom-controls-ssv13 ${ssv13_brandCustomizations.buy_now == '1' && videoCTA ? 'video-CTA-on' : ''}">
                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-volume-ssv13"
                            onclick="videoVolumessv13(this);" width="25" height="19"
                            viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-reviews-ssv13"
                            onclick="openReviewSliderssv13(this);" width="25" height="22"
                            viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <path
                                d="M4.13024 18.9615L0.960941 21.8479L0.960938 1.65385C0.960938 1.34783 1.0825 1.05434 1.29889 0.837954C1.51528 0.621566 1.80876 0.5 2.11478 0.5H22.884C23.19 0.5 23.4835 0.621566 23.6999 0.837954C23.9163 1.05434 24.0379 1.34783 24.0379 1.65385V17.8077C24.0379 18.1137 23.9163 18.4072 23.6999 18.6236C23.4835 18.84 23.19 18.9615 22.884 18.9615H4.13024ZM4.13024 16.6538H21.7302V2.80769H3.26863V17.4036L4.13024 16.6538Z"
                                fill="white" />
                            <path
                                d="M12.8743 12.6006L9.48317 14.3833L10.1305 10.6079L7.38778 7.93333L11.1793 7.38179L12.8743 3.94679L14.5705 7.38179L18.3609 7.93333L15.6182 10.6079L16.2643 14.3833L12.8743 12.6006Z"
                                fill="white" />
                        </svg>
                        <p class="video-modal-sl-vc-reviews-count-ssv13" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">${Object.keys(video.product).length ? Object.keys(video.product[0].pReviews).length : 0}</p>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-comments-ssv13" style="${ssv13_brandCustomizations.comment_mode == '0' ? 'display: none !important;' : ''}" 
                            onclick="openCommentssv13(this, ${i}); loadCommentssv13('${video.video_id}');" width="22" height="19"
                            viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 11.676V11.614C9 9.10595 11.016 6.99595 13.753 6.38095C13.389 4.07895 10.959 2.19995 7.9 2.19995C4.58 2.19995 2 4.41295 2 6.97995C2 7.94895 2.36 8.87995 3.04 9.67795C3.072 9.71595 3.123 9.77195 3.192 9.84295C3.7799 10.4472 4.13488 11.24 4.194 12.081C4.90809 11.6681 5.74197 11.5122 6.557 11.639C6.723 11.665 6.859 11.685 6.962 11.699C7.63908 11.7869 8.32518 11.7788 9 11.675V11.676ZM9.457 13.627C8.54728 13.7832 7.61924 13.8017 6.704 13.682C6.5524 13.6614 6.40106 13.6391 6.25 13.615C5.87628 13.5567 5.49398 13.6318 5.17 13.827L3.266 14.975C3.11936 15.0653 2.94764 15.1063 2.776 15.092C2.67219 15.0841 2.57095 15.0559 2.47809 15.0088C2.38522 14.9618 2.30255 14.8969 2.23483 14.8178C2.1671 14.7387 2.11565 14.6471 2.08341 14.5481C2.05118 14.4491 2.03881 14.3447 2.047 14.241L2.197 12.46C2.21569 12.2365 2.18617 12.0117 2.11043 11.8007C2.03469 11.5897 1.9145 11.3975 1.758 11.237C1.67488 11.1522 1.5945 11.0648 1.517 10.975C0.563 9.85495 0 8.47295 0 6.97895C0 3.23495 3.537 0.199951 7.9 0.199951C11.96 0.199951 15.303 2.82695 15.75 6.20795C19.122 6.36095 21.8 8.72295 21.8 11.614C21.8 12.807 21.344 13.91 20.571 14.804C20.52 14.864 20.455 14.934 20.376 15.014C20.2496 15.1412 20.1523 15.2944 20.0909 15.4629C20.0294 15.6314 20.0052 15.8112 20.02 15.99L20.141 17.413C20.1471 17.4964 20.1367 17.5802 20.1103 17.6596C20.084 17.739 20.0422 17.8124 19.9873 17.8756C19.9325 17.9388 19.8657 17.9905 19.7909 18.0278C19.716 18.0651 19.6345 18.0872 19.551 18.093C19.4121 18.1043 19.2731 18.0714 19.154 17.999L17.611 17.082C17.348 16.9263 17.0391 16.8666 16.737 16.913C16.59 16.936 16.467 16.9529 16.369 16.966C16.053 17.006 15.729 17.028 15.4 17.028C12.706 17.028 10.402 15.62 9.457 13.627ZM16.434 14.937C16.9983 14.8501 17.5755 14.91 18.11 15.111C18.2502 14.5438 18.5408 14.0249 18.951 13.609C19.001 13.559 19.038 13.519 19.057 13.497C19.546 12.932 19.8 12.284 19.8 11.614C19.8 9.80995 17.897 8.19995 15.4 8.19995C12.903 8.19995 11 9.80995 11 11.614C11 13.418 12.903 15.028 15.4 15.028C15.641 15.028 15.88 15.012 16.114 14.982C16.194 14.972 16.302 14.957 16.434 14.936V14.937Z"
                                fill="white" />
                        </svg>

                        <svg onclick="openAIChatMssv13(this);" class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-AI-chat-ssv13" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="${ssv13_brandCustomizations.chat_bot == '0' ? 'display: none !important;' : ''}">
                            <path d="M11.3333 2.46484C12.4552 2.46484 13.3646 1.55542 13.3646 0.433594H14.3021C14.3021 1.55542 15.2115 2.46484 16.3333 2.46484V3.40234C15.2115 3.40234 14.3021 4.31177 14.3021 5.43359H13.3646C13.3646 4.31177 12.4552 3.40234 11.3333 3.40234V2.46484ZM0.5 7.93359C3.26143 7.93359 5.5 5.69502 5.5 2.93359H7.16667C7.16667 5.69502 9.40525 7.93359 12.1667 7.93359V9.60026C9.40525 9.60026 7.16667 11.8388 7.16667 14.6003H5.5C5.5 11.8388 3.26143 9.60026 0.5 9.60026V7.93359ZM3.73001 8.76693C4.82264 9.37326 5.72702 10.2776 6.33333 11.3703C6.93964 10.2776 7.84402 9.37326 8.93667 8.76693C7.84402 8.16059 6.93964 7.25626 6.33333 6.1636C5.72702 7.25626 4.82264 8.16059 3.73001 8.76693ZM14.0417 10.4336C14.0417 11.9293 12.8291 13.1419 11.3333 13.1419V14.3919C12.8291 14.3919 14.0417 15.6045 14.0417 17.1003H15.2917C15.2917 15.6045 16.5042 14.3919 18 14.3919V13.1419C16.5042 13.1419 15.2917 11.9293 15.2917 10.4336H14.0417Z" fill="url(#paint0_linear_3443_24708)"/>
                            <path d="M11.3333 2.46484C12.4552 2.46484 13.3646 1.55542 13.3646 0.433594H14.3021C14.3021 1.55542 15.2115 2.46484 16.3333 2.46484V3.40234C15.2115 3.40234 14.3021 4.31177 14.3021 5.43359H13.3646C13.3646 4.31177 12.4552 3.40234 11.3333 3.40234V2.46484ZM0.5 7.93359C3.26143 7.93359 5.5 5.69502 5.5 2.93359H7.16667C7.16667 5.69502 9.40525 7.93359 12.1667 7.93359V9.60026C9.40525 9.60026 7.16667 11.8388 7.16667 14.6003H5.5C5.5 11.8388 3.26143 9.60026 0.5 9.60026V7.93359ZM3.73001 8.76693C4.82264 9.37326 5.72702 10.2776 6.33333 11.3703C6.93964 10.2776 7.84402 9.37326 8.93667 8.76693C7.84402 8.16059 6.93964 7.25626 6.33333 6.1636C5.72702 7.25626 4.82264 8.16059 3.73001 8.76693ZM14.0417 10.4336C14.0417 11.9293 12.8291 13.1419 11.3333 13.1419V14.3919C12.8291 14.3919 14.0417 15.6045 14.0417 17.1003H15.2917C15.2917 15.6045 16.5042 14.3919 18 14.3919V13.1419C16.5042 13.1419 15.2917 11.9293 15.2917 10.4336H14.0417Z" fill="url(#paint1_linear_3443_24708)"/>
                            <defs>
                            <linearGradient id="paint0_linear_3443_24708" x1="-2.55556" y1="-4.2219" x2="-3.30625" y2="20.6917" gradientUnits="userSpaceOnUse">
                            <stop offset="0.265224" stop-color="#D0CDAB"/>
                            <stop offset="0.435" stop-color="#E9E1FF"/>
                            <stop offset="0.878722" stop-color="#473D87"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_3443_24708" x1="-2.67333" y1="25.3748" x2="19.7611" y2="25.1981" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D7E1FA"/>
                            <stop offset="0.879067" stop-color="#C6F1FF"/>
                            </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div class="video-modal-sl-thumb-toggler-ssv13" onclick="toggleVideoThumbssv13(this)">
                        <img height="20" width="20" class="JS-load-thumbs-ssv13" src="" data-src="${video.cover_image}"
                            alt="Video thumbnail">
                    </div>
                    <div class="video-modal-sl-progressbar-ssv13">
                        <progress min='0' max='100' value='0'></progress>
                    </div>   
                    <div class="video-modal-product-slider-ssv13">
                        <div class="swiper swiper-product-ssv13 swiper-product-ssv13-${video.video_id}-${no}">
                            <div class="swiper-wrapper">
                                ${mProductSlider}
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="video-modal-product-reviews-ssv13">
                        <div class="video-modal-pr-drager-ssv13">
                            <svg width="33" height="4" viewBox="0 0 33 4" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                    fill="#1A1A1A" fill-opacity="0.25" />
                            </svg>
                        </div>
                        <div class="video-modal-pr-top-outer-ssv13">
                            <div class="swiper swiper-review-ssv13 swiper-review-ssv13-${video.video_id}-${no}">
                                <div class="swiper-wrapper">   
                                    ${mReviewSlider}
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        <div class="video-modal-pr-bottom-outer-ssv13">
                            ${mSliderReview}
                        </div>
                    </div>            
                    <div class="video-model-marquee-ssv13" style="${ssv13_brandCustomizations.marque_txt == '0' ? 'display: none !important;' : ''}" onanimationend="hideMarqueessv13(this)">
                        <span>${ssv13_brandCustomizations.disclaimer_text}</span>
                    </div>        
                    <div class="video-modal-fade-white-L-ssv13" onclick="closePopupssv13(this);"
                        style="display: none;"></div>
                    <div class="video-modal-share-popup-ssv13">
                        <svg class="video-modal-sp-drager-ssv13" width="33" height="4"
                            viewBox="0 0 33 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                fill="#E8E8E8" />
                        </svg>
                        <p class="video-modal-sp-pip-ssv13" onclick="openPIPssv13();" style="${ssv13_brandCustomizations.pip_mode == '1' ? '' : 'display: none !important;'}">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_897_10050)">
                                    <path
                                        d="M15.75 2.25C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V8.25H15V3.75H3V14.25H7.5V15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H15.75ZM15.75 9.75C15.9489 9.75 16.1397 9.82902 16.2803 9.96967C16.421 10.1103 16.5 10.3011 16.5 10.5V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H9.75C9.55109 15.75 9.36032 15.671 9.21967 15.5303C9.07902 15.3897 9 15.1989 9 15V10.5C9 10.3011 9.07902 10.1103 9.21967 9.96967C9.36032 9.82902 9.55109 9.75 9.75 9.75H15.75ZM15 11.25H10.5V14.25H15V11.25ZM5.03025 4.71975L6.71775 6.40725L8.25 4.875V9H4.125L5.65725 7.46775L3.96975 5.78025L5.03025 4.71975Z"
                                        fill="#454549" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_897_10050">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Picture in picture
                        </p>
                        <p class="video-modal-sp-download-ssv13" style="display: none;">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.75 9.129L10.773 5.106L11.8335 6.1665L6 12L0.166504 6.1665L1.227 5.106L5.25 9.129V0H6.75V9.129Z"
                                    fill="#454549" />
                            </svg>
                            Download video
                        </p>                        
                        <div class="video-modal-sp-social-ssv13">
                            <div class="video-modal-sp-social-icon-ssv13" onclick="this.querySelector('input').dispatchEvent(new Event('click'));">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" width="36" height="36" rx="18"
                                        fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61405)">
                                        <path
                                            d="M23.2143 20.3568L22.036 19.1785L23.2143 18.0002C23.5238 17.6906 23.7694 17.3232 23.9369 16.9187C24.1044 16.5143 24.1906 16.0808 24.1906 15.6431C24.1906 15.2053 24.1044 14.7719 23.9369 14.3674C23.7694 13.963 23.5238 13.5955 23.2143 13.286C22.9048 12.9765 22.5373 12.7309 22.1329 12.5634C21.7284 12.3959 21.295 12.3097 20.8572 12.3097C20.4195 12.3097 19.986 12.3959 19.5816 12.5634C19.1771 12.7309 18.8097 12.9765 18.5001 13.286L17.3218 14.4643L16.1435 13.286L17.3218 12.1077C18.2621 11.1826 19.5298 10.6665 20.8488 10.6719C22.1678 10.6773 23.4313 11.2036 24.364 12.1363C25.2967 13.069 25.823 14.3325 25.8284 15.6515C25.8338 16.9705 25.3177 18.2382 24.3926 19.1785L23.2143 20.3568ZM20.8568 22.7143L19.6785 23.8927C19.2156 24.3632 18.6641 24.7374 18.0559 24.9937C17.4476 25.25 16.7946 25.3833 16.1346 25.386C15.4746 25.3887 14.8206 25.2607 14.2102 25.0093C13.5999 24.758 13.0454 24.3883 12.5787 23.9216C12.112 23.4549 11.7423 22.9004 11.491 22.2901C11.2396 21.6797 11.1116 21.0257 11.1143 20.3657C11.117 19.7057 11.2503 19.0527 11.5066 18.4444C11.7629 17.8362 12.1371 17.2847 12.6076 16.8218L13.786 15.6435L14.9643 16.8218L13.786 18.0002C13.4764 18.3097 13.2309 18.6772 13.0634 19.0816C12.8959 19.486 12.8096 19.9195 12.8096 20.3572C12.8096 20.795 12.8959 21.2285 13.0634 21.6329C13.2309 22.0373 13.4764 22.4048 13.786 22.7143C14.0955 23.0239 14.463 23.2694 14.8674 23.4369C15.2718 23.6044 15.7053 23.6907 16.1431 23.6907C16.5808 23.6907 17.0143 23.6044 17.4187 23.4369C17.8231 23.2694 18.1906 23.0239 18.5001 22.7143L19.6785 21.536L20.8568 22.7143ZM20.8568 14.4643L22.036 15.6435L16.1435 21.5352L14.9643 20.3568L20.8568 14.4652V14.4643Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61405">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8.5 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Copy link</p>
                                <input tabindex="-1" type="text" value="${mShareURL}" style="display: none;" onclick="copyLinkssv13(this);">
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://api.whatsapp.com/send?text=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61408)">
                                        <path
                                            d="M14.0445 23.4115L14.6478 23.764C15.6653 24.3574 16.8225 24.6689 18.0003 24.6665C19.3189 24.6665 20.6078 24.2755 21.7041 23.543C22.8005 22.8104 23.655 21.7692 24.1595 20.5511C24.6641 19.3329 24.7961 17.9924 24.5389 16.6992C24.2817 15.406 23.6467 14.2181 22.7144 13.2858C21.782 12.3534 20.5941 11.7185 19.3009 11.4613C18.0077 11.204 16.6673 11.3361 15.4491 11.8406C14.2309 12.3452 13.1897 13.1997 12.4572 14.296C11.7247 15.3924 11.3337 16.6813 11.3337 17.9998C11.3337 19.1965 11.6478 20.344 12.237 21.3532L12.5887 21.9565L12.0445 23.9573L14.0445 23.4115ZM9.67034 26.3332L10.797 22.1932C10.0546 20.9205 9.66458 19.4732 9.667 17.9998C9.667 13.3973 13.3978 9.6665 18.0003 9.6665C22.6028 9.6665 26.3337 13.3973 26.3337 17.9998C26.3337 22.6023 22.6028 26.3332 18.0003 26.3332C16.5277 26.3355 15.0809 25.9458 13.8087 25.204L9.67034 26.3332ZM14.9928 14.0898C15.1045 14.0815 15.217 14.0815 15.3287 14.0865C15.3737 14.0898 15.4187 14.0948 15.4637 14.0998C15.5962 14.1148 15.742 14.1957 15.7912 14.3073C16.0395 14.8707 16.2812 15.4382 16.5145 16.0073C16.5662 16.134 16.5353 16.2965 16.437 16.4548C16.3694 16.5619 16.2962 16.6654 16.2178 16.7648C16.1237 16.8857 15.9212 17.1073 15.9212 17.1073C15.9212 17.1073 15.8387 17.2057 15.8703 17.3282C15.882 17.3748 15.9203 17.4423 15.9553 17.499L16.0045 17.5782C16.2178 17.934 16.5045 18.2948 16.8545 18.6348C16.9545 18.7315 17.052 18.8307 17.157 18.9232C17.547 19.2673 17.9887 19.5482 18.4653 19.7565L18.4695 19.7582C18.5403 19.789 18.5762 19.8057 18.6795 19.8498C18.7312 19.8715 18.7845 19.8907 18.8387 19.9048C18.8946 19.9191 18.9536 19.9164 19.008 19.8971C19.0625 19.8778 19.11 19.8428 19.1445 19.7965C19.7478 19.0657 19.8028 19.0182 19.8078 19.0182V19.0198C19.8498 18.9807 19.8995 18.9511 19.9539 18.9328C20.0082 18.9146 20.0658 18.9081 20.1228 18.914C20.1728 18.9173 20.2237 18.9265 20.2703 18.9473C20.7128 19.1498 21.437 19.4657 21.437 19.4657L21.922 19.6832C22.0037 19.7223 22.0778 19.8148 22.0803 19.904C22.0837 19.9598 22.0887 20.0498 22.0695 20.2148C22.0428 20.4307 21.9778 20.6898 21.9128 20.8257C21.8683 20.9184 21.8092 21.0033 21.7378 21.0773C21.6538 21.1656 21.5617 21.246 21.4628 21.3173C21.4286 21.3431 21.3939 21.3681 21.3587 21.3923C21.255 21.4581 21.1485 21.5193 21.0395 21.5757C20.8249 21.6896 20.588 21.7551 20.3453 21.7673C20.1912 21.7757 20.037 21.7873 19.882 21.779C19.8753 21.779 19.4087 21.7065 19.4087 21.7065C18.2239 21.3949 17.1282 20.8111 16.2087 20.0015C16.0203 19.8357 15.8462 19.6573 15.6678 19.4798C14.9262 18.7423 14.3662 17.9465 14.0262 17.1948C13.8521 16.8259 13.7581 16.4243 13.7503 16.0165C13.7469 15.5105 13.9123 15.0179 14.2203 14.6165C14.2812 14.5382 14.3387 14.4565 14.4378 14.3623C14.5437 14.2623 14.6103 14.209 14.6828 14.1723C14.7792 14.124 14.8844 14.0957 14.992 14.089L14.9928 14.0898Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61408">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Whatsapp</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61411)">
                                        <path
                                            d="M19.6663 19.2498H21.7497L22.583 15.9165H19.6663V14.2498C19.6663 13.3915 19.6663 12.5832 21.333 12.5832H22.583V9.78317C22.3113 9.74734 21.2855 9.6665 20.2022 9.6665C17.9397 9.6665 16.333 11.0473 16.333 13.5832V15.9165H13.833V19.2498H16.333V26.3332H19.6663V19.2498Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61411">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Facebook</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://twitter.com/share?url=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8"/>
                                    <path d="M15.222 11.0555H10.3608L16.0975 18.7045L10.6733 24.9444H12.5136L16.9499 19.841L20.7775 24.9444H25.6386L19.6606 16.9738L24.8054 11.0555H22.9651L18.8083 15.8373L15.222 11.0555ZM21.472 23.5555L13.1386 12.4444H14.5275L22.8608 23.5555H21.472Z" fill="#747477"/>
                                </svg>                            
                                <p>X</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="copyEmailEmbedssv13('${mShareURL}', '${video.cover_image}', this);">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61417)">
                                        <path
                                            d="M10.5003 10.5H25.5003C25.7213 10.5 25.9333 10.5878 26.0896 10.7441C26.2459 10.9004 26.3337 11.1123 26.3337 11.3333V24.6667C26.3337 24.8877 26.2459 25.0996 26.0896 25.2559C25.9333 25.4122 25.7213 25.5 25.5003 25.5H10.5003C10.2793 25.5 10.0674 25.4122 9.91107 25.2559C9.75479 25.0996 9.66699 24.8877 9.66699 24.6667V11.3333C9.66699 11.1123 9.75479 10.9004 9.91107 10.7441C10.0674 10.5878 10.2793 10.5 10.5003 10.5ZM24.667 14.0317L18.0603 19.9483L11.3337 14.0133V23.8333H24.667V14.0317ZM11.7595 12.1667L18.0512 17.7183L24.252 12.1667H11.7595Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61417">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Mail</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13 video-modal-sp-sms-ssv13" onclick="window.open('sms:?body=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61420)">
                                        <path
                                            d="M15.2225 17.5923C15.0816 17.5933 14.9419 17.5663 14.8115 17.5129C14.6812 17.4594 14.5627 17.3806 14.4631 17.2809C14.3634 17.1813 14.2846 17.0628 14.2311 16.9325C14.1777 16.8021 14.1507 16.6624 14.1517 16.5215C14.1517 15.9232 14.6242 15.4498 15.2225 15.4498C15.82 15.4498 16.2933 15.9232 16.2933 16.5215C16.2933 17.119 15.82 17.5923 15.2225 17.5923ZM20.7775 17.5923C20.6366 17.5933 20.4969 17.5663 20.3665 17.5129C20.2362 17.4594 20.1177 17.3806 20.0181 17.2809C19.9184 17.1813 19.8396 17.0628 19.7861 16.9325C19.7327 16.8021 19.7057 16.6624 19.7067 16.5215C19.7067 15.9232 20.18 15.4498 20.7775 15.4498C21.3758 15.4498 21.8483 15.9232 21.8483 16.5215C21.8483 17.119 21.3758 17.5923 20.7775 17.5923ZM13.6858 24.0123L14.2817 23.649C14.9564 23.2376 15.7553 23.0793 16.5358 23.2023C16.7125 23.2298 16.8575 23.2515 16.9692 23.2657C17.3075 23.3107 17.6525 23.3332 18 23.3332C21.6833 23.3332 24.5833 20.8148 24.5833 17.8332C24.5833 14.8515 21.6833 12.3332 18 12.3332C14.3167 12.3332 11.4167 14.8515 11.4167 17.8332C11.4167 18.9715 11.8333 20.0607 12.61 20.984C12.65 21.0315 12.71 21.0982 12.7883 21.1798C13.1159 21.521 13.3671 21.9279 13.5253 22.3736C13.6835 22.8193 13.745 23.2935 13.7058 23.7648L13.685 24.0123H13.6858ZM13.1608 26.2848C13.0298 26.3668 12.8785 26.4108 12.7239 26.4117C12.5692 26.4126 12.4174 26.3705 12.2854 26.2901C12.1533 26.2097 12.0463 26.0941 11.9761 25.9563C11.906 25.8185 11.8756 25.6639 11.8883 25.5098L12.045 23.6265C12.0647 23.3909 12.034 23.1538 11.9549 22.9309C11.8759 22.7081 11.7504 22.5046 11.5867 22.334C11.4993 22.2443 11.4148 22.1517 11.3333 22.0565C10.3383 20.8723 9.75 19.4123 9.75 17.8332C9.75 13.8748 13.4433 10.6665 18 10.6665C22.5567 10.6665 26.25 13.8748 26.25 17.8332C26.25 21.7915 22.5567 24.9998 18 24.9998C17.575 24.9998 17.1583 24.9723 16.7508 24.9182C16.5925 24.8968 16.4344 24.8734 16.2767 24.8482C15.8862 24.7866 15.4866 24.8657 15.1492 25.0715L13.16 26.2848H13.1608Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61420">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>SMS</p>
                            </div>
                        </div>
                    </div>                    
                    <button tabindex="-1" class="video-cta-redi-button-ssv13" style="background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' || !videoCTA ? 'display: none !important;' : ''}" onclick="CTAClickssv13('0', ${video.designer_id}, ${video.video_id}, '1'); window.open('${video.product_link}', '_blank');">
                        ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                    </button>                      
                    <p class="video-modal-alert-L-ssv13"></p>
                </div>
            </div>
        `;

        mRightBlocks += `
            <div class="video-modal-sr-product-block-ssv13 JS-product-master-ssv13" style="${i == 0 ? 'display: block;' : ''}">
                <div class="video-modal-sr-pb-header-ssv13">
                    <div class="video-modal-sr-pb-tabs-btn-ssv13">
                        <p class="JS-modal-PC-tab-ssv13 JS-modal-Product-tab-ssv13 active-ssv13"
                            onclick="changePCTabssv13(this, '.JS-product-section-ssv13');" style="${Object.keys(video.product).length == 0 ? 'display: none !important;' : ''}">
                            Product</p>
                        <p class="JS-modal-PC-tab-ssv13 JS-modal-comment-tab-ssv13" style="${ssv13_brandCustomizations.comment_mode == '0' ? 'display: none !important;' : ''}" 
                            onclick="changePCTabssv13(this, '.JS-comment-section-ssv13'); loadCommentssv13('${video.video_id}');">Comments</p>
                    </div>
                    <div class="video-modal-sr-pb-cart-btn-ssv13" style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'">
                        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.99984 5.0569L0.756836 1.8149L2.17184 0.399902L5.41384 3.6429H20.6558C20.8117 3.64289 20.9654 3.67932 21.1047 3.74927C21.244 3.81922 21.365 3.92077 21.4581 4.0458C21.5511 4.17083 21.6137 4.31589 21.6407 4.46939C21.6678 4.62289 21.6586 4.78059 21.6138 4.9299L19.2138 12.9299C19.1521 13.136 19.0255 13.3167 18.853 13.4451C18.6804 13.5736 18.471 13.6429 18.2558 13.6429H5.99984V15.6429H16.9998V17.6429H4.99984C4.73462 17.6429 4.48027 17.5375 4.29273 17.35C4.10519 17.1625 3.99984 16.9081 3.99984 16.6429V5.0569ZM5.99984 5.6429V11.6429H17.5118L19.3118 5.6429H5.99984ZM5.49984 21.6429C5.10201 21.6429 4.72048 21.4849 4.43918 21.2036C4.15787 20.9223 3.99984 20.5407 3.99984 20.1429C3.99984 19.7451 4.15787 19.3635 4.43918 19.0822C4.72048 18.8009 5.10201 18.6429 5.49984 18.6429C5.89766 18.6429 6.27919 18.8009 6.5605 19.0822C6.8418 19.3635 6.99984 19.7451 6.99984 20.1429C6.99984 20.5407 6.8418 20.9223 6.5605 21.2036C6.27919 21.4849 5.89766 21.6429 5.49984 21.6429ZM17.4998 21.6429C17.102 21.6429 16.7205 21.4849 16.4392 21.2036C16.1579 20.9223 15.9998 20.5407 15.9998 20.1429C15.9998 19.7451 16.1579 19.3635 16.4392 19.0822C16.7205 18.8009 17.102 18.6429 17.4998 18.6429C17.8977 18.6429 18.2792 18.8009 18.5605 19.0822C18.8418 19.3635 18.9998 19.7451 18.9998 20.1429C18.9998 20.5407 18.8418 20.9223 18.5605 21.2036C18.2792 21.4849 17.8977 21.6429 17.4998 21.6429Z"
                                fill="#454549" />
                        </svg>
                        <label class="cart-count-ssv13">0</label>
                    </div>
                </div>
                <div class="video-modal-sr-pb-middle-ssv13 JS-pc-tab-content-ssv13 JS-product-section-ssv13">
                    <div class="video-modal-sr-pb-product-list-ssv13">
                        ${mProductList}
                    </div>
                    ${mProducts}

                </div>
                <div class="video-modal-sr-pb-middle-ssv13 JS-pc-tab-content-ssv13 JS-comment-section-ssv13" style="display: none;">
                    <div class="video-modal-sr-pb-comments-ssv13 JS-comments-${video.video_id}-ssv13" onscroll="pinCommentsFoldssv13(this);">
                        <div class="video-modal-sr-pb-cc-drager-ssv13">
                            <svg width="33" height="4" viewBox="0 0 33 4" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                    fill="#1A1A1A" fill-opacity="0.25" />
                            </svg>
                        </div>
                        <div class="video-modal-sr-pb-cc-title-ssv13">
                            <p>Comments</p>
                        </div>
                        <div class="video-modal-sr-pb-pin-card-ssv13" onclick="scrolltoPinssv13(this);">
                            <p>
                                Pinned comment
                                <label class="JS-pinned-comment-counter-ssv13">0</label>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.8764 5.78136L11.9331 6.72402L11.4618 6.25269L8.63377 9.08069L8.16244 11.438L7.2191 12.3807L4.3911 9.55202L1.0911 12.852L0.148438 11.9094L3.44844 8.60936L0.619771 5.78136L1.56244 4.83802L3.92044 4.36669L6.74844 1.53869L6.2771 1.06736L7.21977 0.124023L12.8764 5.78136Z"
                                        fill="#334499" />
                                </svg>
                            </p>
                        </div>
                        <p class="JS-pinned-comment-loading-ssv13" style="text-align: center; margin-top: 80px;"><i>Loading comments...</i></p>                        
                    </div>
                    <div class="video-modal-sr-pb-comment-form-ssv13">
                        <div class="video-modal-sr-pb-cf-input-ssv13">
                            <form onsubmit="return addCommentssv13('${video.video_id}', this);">
                                <input tabindex="-1" type="text" oninput="charLimitssv13(this);" placeholder="Add a comment" required autocomplete="off" />
                            </form>
                        </div>
                        <div class="video-modal-sr-pb-cf-btn-ssv13">
                            <button tabindex="-1" onclick="this.closest('.video-modal-sr-pb-comment-form-ssv13').querySelector('form').dispatchEvent(new Event('submit'));">
                                <svg width="17" height="19" viewBox="0 0 17 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.5 10.4762H5.5V8.80958H0.5V1.18124C0.500012 1.10884 0.518892 1.03769 0.554778 0.974802C0.590664 0.911916 0.642317 0.859467 0.704647 0.822625C0.766977 0.785782 0.837832 0.765817 0.910228 0.764698C0.982623 0.763579 1.05406 0.781345 1.1175 0.816244L16.5025 9.27791C16.5678 9.31388 16.6223 9.36672 16.6602 9.43092C16.6982 9.49513 16.7182 9.56833 16.7182 9.64291C16.7182 9.71749 16.6982 9.79069 16.6602 9.8549C16.6223 9.9191 16.5678 9.97194 16.5025 10.0079L1.1175 18.4696C1.05406 18.5045 0.982623 18.5222 0.910228 18.5211C0.837832 18.52 0.766977 18.5 0.704647 18.4632C0.642317 18.4264 0.590664 18.3739 0.554778 18.311C0.518892 18.2481 0.500012 18.177 0.5 18.1046V10.4762Z"
                                        fill="#8B8B8E" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        i++;
    });

    let gridCSS = ssv13_pageView == '2' ? `
        <style>
            .masonry-column-ssv13 {
                /* flex: 1; */
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .swiper-ssv13-c .swiper-wrapper {
                gap: 15px;
            }

            .swiper-button-next-ssv13-c, 
            .swiper-button-prev-ssv13-c {
                display: none!important;
            }
        </style>
    ` : '';

    target.innerHTML = `
        ${gridCSS}
        <div class="swiper swiper-ssv13-c swiper-ssv13-c${no}">
            <div class="swiper-wrapper">
                ${cSlides}
            </div>
            <div class="swiper-button-next-ssv13-c">
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
            <div class="swiper-button-prev-ssv13-c">
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
    `;

    let swiperWrapper = document.querySelector(`.swiper-ssv13-c${no} .swiper-wrapper`);
    let slides = Array.from(swiperWrapper.children);

    // Function to calculate column count based on screen width
    function getColumnCountssv13() {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 768) return 2; // Mobile view
        if (screenWidth <= 1024) return 3; // iPad view
        if (screenWidth <= 1366) return 4; // iPad rotate
        if (screenWidth <= 1550) return 5; // Laptop/MacBook
        return 5; // Big screens
    }

    // Function to update masonry layout
    function updateMasonryLayoutssv13() {
        let columnCount = getColumnCountssv13();
        let columns = Array.from({ length: columnCount }, () => {
            let column = document.createElement('div');
            column.style.width = (100 / columnCount) + '%';
            column.classList.add('masonry-column-ssv13');
            return column;
        });

        // Distribute slides into columns
        slides.forEach((slide, index) => {
            let column = columns[index % columnCount];
            column.appendChild(slide);
        });

        // Clear and append updated columns
        swiperWrapper.innerHTML = '';
        columns.forEach(column => column.children.length ? swiperWrapper.appendChild(column) : '');

        // Check if columns are more than videos
        if (columnCount > slides.length) {
            swiperWrapper.style.justifyContent = 'center';
        } else {
            swiperWrapper.style.justifyContent = 'space-evenly';
        }
    }

    // Initialize masonry layout
    updateMasonryLayoutssv13();

    // Update masonry layout on window resize
    window.addEventListener('resize', updateMasonryLayoutssv13);

    let chatBot = ssv13_brandCustomizations.chat_bot == '1' ? `
        <div class="AI-chatbox-ssv13">                                
            <div class="AI-chatbox-header-ssv13">
                <svg class="AI-chatbox-header-back-ssv13" onclick="closeAIChatssv13();" style="display: none !important;" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.828 7.00072L7.778 11.9507L6.364 13.3647L0 7.00072L6.364 0.636719L7.778 2.05072L2.828 7.00072Z" fill="white"/>
                </svg>
                <svg class="AI-chatbox-header-icon-ssv13" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6654 2.69727C12.7872 2.69727 13.6966 1.78784 13.6966 0.666016H14.6341C14.6341 1.78784 15.5435 2.69727 16.6654 2.69727V3.63477C15.5435 3.63477 14.6341 4.54419 14.6341 5.66602H13.6966C13.6966 4.54419 12.7872 3.63477 11.6654 3.63477V2.69727ZM0.832031 8.16602C3.59346 8.16602 5.83203 5.92744 5.83203 3.16602H7.4987C7.4987 5.92744 9.73728 8.16602 12.4987 8.16602V9.83268C9.73728 9.83268 7.4987 12.0713 7.4987 14.8327H5.83203C5.83203 12.0713 3.59346 9.83268 0.832031 9.83268V8.16602ZM4.06204 8.99935C5.15467 9.60568 6.05906 10.51 6.66536 11.6027C7.27167 10.51 8.17606 9.60568 9.2687 8.99935C8.17606 8.39302 7.27167 7.48868 6.66536 6.39602C6.05906 7.48868 5.15467 8.39302 4.06204 8.99935ZM14.3737 10.666C14.3737 12.1618 13.1611 13.3743 11.6654 13.3743V14.6243C13.1611 14.6243 14.3737 15.8369 14.3737 17.3327H15.6237C15.6237 15.8369 16.8363 14.6243 18.332 14.6243V13.3743C16.8363 13.3743 15.6237 12.1618 15.6237 10.666H14.3737Z" fill="white"/>
                </svg>
                Ask anything
            </div>
            <div class="AI-chatbox-chat-ssv13">
                <div class="AI-chatbox-chat-card-ssv13 card-L">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="17" fill="#EBECF5"/>
                        <g clip-path="url(#clip0_3399_38954)">
                        <path d="M20 12.0176C21.0096 12.0176 21.8281 11.1991 21.8281 10.1895H22.6719C22.6719 11.1991 23.4903 12.0176 24.5 12.0176V12.8613C23.4903 12.8613 22.6719 13.6798 22.6719 14.6895H21.8281C21.8281 13.6798 21.0096 12.8613 20 12.8613V12.0176ZM10.25 16.9395C12.7353 16.9395 14.75 14.9247 14.75 12.4395H16.25C16.25 14.9247 18.2647 16.9395 20.75 16.9395V18.4395C18.2647 18.4395 16.25 20.4542 16.25 22.9395H14.75C14.75 20.4542 12.7353 18.4395 10.25 18.4395V16.9395ZM13.157 17.6895C14.1404 18.2352 14.9543 19.0491 15.5 20.0325C16.0457 19.0491 16.8596 18.2352 17.843 17.6895C16.8596 17.1438 16.0457 16.3299 15.5 15.3465C14.9543 16.3299 14.1404 17.1438 13.157 17.6895ZM22.4375 19.1895C22.4375 20.5356 21.3462 21.627 20 21.627V22.752C21.3462 22.752 22.4375 23.8433 22.4375 25.1895H23.5625C23.5625 23.8433 24.6538 22.752 26 22.752V21.627C24.6538 21.627 23.5625 20.5356 23.5625 19.1895H22.4375Z" fill="url(#paint0_linear_3399_38954)"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_3399_38954" x1="9.99213" y1="23.8258" x2="26.2139" y2="23.8654" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4568DC"/>
                        <stop offset="1" stop-color="#B06AB3" stop-opacity="0.98"/>
                        </linearGradient>
                        <clipPath id="clip0_3399_38954">
                        <rect width="18" height="18" fill="white" transform="translate(8 8)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <p>👋 Hi there! How can I help?</p>
                </div>                                    
            </div>
            <div class="AI-chatbox-form-ssv13">
                <form onsubmit="return sendAIChatssv13(this);">
                    <input tabindex="-1" type="text" onkeyup="this.value ? this.closest('.AI-chatbox-form-ssv13').querySelector('.AI-cf-btn-ssv13').setAttribute('fill', '#4757A3') : this.closest('.AI-chatbox-form-ssv13').querySelector('.AI-cf-btn-ssv13').setAttribute('fill', '#A2A2A4')" placeholder="Type a reply..." required />
                    <button tabindex="-1">
                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="AI-cf-btn-ssv13" d="M1.05275 0.526058L21.0532 11.5262C21.1382 11.573 21.209 11.6417 21.2583 11.7251C21.3076 11.8086 21.3337 11.9038 21.3337 12.0007C21.3337 12.0977 21.3076 12.1928 21.2583 12.2763C21.209 12.3598 21.1382 12.4285 21.0532 12.4752L1.05275 23.4754C0.97028 23.5208 0.87741 23.5439 0.783296 23.5424C0.689181 23.5409 0.59707 23.515 0.516041 23.4671C0.435012 23.4192 0.367863 23.351 0.321211 23.2693C0.27456 23.1875 0.250016 23.095 0.25 23.0009V1.00056C0.250016 0.906432 0.27456 0.813935 0.321211 0.732184C0.367863 0.650433 0.435012 0.582249 0.516041 0.534353C0.59707 0.486458 0.689181 0.460504 0.783296 0.459049C0.87741 0.457594 0.97028 0.48069 1.05275 0.526058ZM2.41667 13.0841V20.2525L17.4208 12.0007L2.41667 3.74897V10.9174H7.83333V13.0841H2.41667Z" fill="#A2A2A4"/>
                        </svg>
                    </button
                </form>
            </div>
        </div>
    ` : '';

    let mDiv = document.createElement('div');
    mDiv.classList.add(`JS-video-modal-div-ssv13-${no}`);
    let previewThumbCSS = ssv13_brandCustomizations.next_previous_preview == '0' && window.innerWidth > 768 ? `
        .swirl-short-videos-m-ssv13-${no} .swiper-ssv13-m .swiper-slide-m:not(.swiper-slide-fully-visible) {                
            opacity: 0;                          
        }
    ` : ``;
    let iOSImpCSS = getMobileOSssv13() == 'iOS' ? `
        .video-modal-sl-top-controls-ssv13, .video-modal-sl-bottom-controls-ssv13, .video-modal-product-slider-ssv13, .video-modal-sl-controls-ssv13, .video-modal-sl-progressbar-ssv13, .video-modal-product-reviews-ssv13, .video-modal-fade-white-L-ssv13, .video-modal-share-popup-ssv13, .video-model-marquee-ssv13, .video-cta-redi-button-ssv13, .video-modal-alert-P-ssv13, .video-modal-alert-L-ssv13, .video-modal-alert-R-ssv13, .video-modal-sl-thumbs-block-ssv13 {                
            will-change: transform;
        }
    ` : '';
    let shareToggleCSS = ssv13_brandCustomizations.pip_mode == '1' ? '' : `
        @media only screen and (max-width: 768px) {
            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-toggle-ssv13 {
                display: none !important;
            }

            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-share-ssv13 {
                display: inline-block !important;
            }
        }
    `;
    let fontCSS = `
        @font-face {
            font-family: cs-book-ssv13;
            font-style: normal;
            src: url(https://apigoswirl.com/assets/font/fonts/Greycliff/GreycliffCF-Medium.ttf);
        }
    `;
    fontCSS = '';
    mDiv.innerHTML = `
        <style>
            .hide-over-ssv13 {
                display: none !important;
            }
            ${previewThumbCSS}
            ${iOSImpCSS}
            ${shareToggleCSS}
            ${fontCSS}
            .JS-load-thumbs-ssv13 {
                height: 0;
            }
        </style>
        <div class="swirl-short-videos-m-ssv13 swirl-short-videos-m-ssv13-${no}">
            <div class="video-modal-ssv13">
                <div class="video-modal-container-ssv13">
                    <svg class="video-modal-close-btn-ssv13" onclick="closeVideoModalssv13(true);" width="37" height="37"
                        viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.40332" y="0.643066" width="36" height="36" rx="18" fill="#2E2E33" fill-opacity="0.6" />
                        <g clip-path="url(#clip0_323_30588)">
                            <path
                                d="M18.4029 17.4648L22.5279 13.3398L23.7063 14.5182L19.5813 18.6432L23.7063 22.7682L22.5279 23.9465L18.4029 19.8215L14.2779 23.9465L13.0996 22.7682L17.2246 18.6432L13.0996 14.5182L14.2779 13.3398L18.4029 17.4648Z"
                                fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_323_30588">
                                <rect width="20" height="20" fill="white" transform="translate(8.40332 8.64307)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="video-modal-structure-ssv13">
                        <div class="video-modal-structure-left-ssv13">
                            <div class="video-modal-sl-thumbs-block-ssv13">
                                ${mThumbs}
                            </div>
                            <div class="video-modal-sl-video-block-ssv13">
                                <div class="swiper swiper-ssv13-m swiper-ssv13-m${no}">
                                    <div class="swiper-wrapper">
                                        ${mSlides}
                                    </div>
                                    <div class="swiper-button-next-ssv13-m">
                                        <svg width="52" height="53" viewBox="0 0 52 53" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                            <g clip-path="url(#clip0_455_23499)">
                                                <path
                                                    d="M27.1717 26.6433L22.2217 21.6933L23.6357 20.2793L29.9997 26.6433L23.6357 33.0073L22.2217 31.5933L27.1717 26.6433Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_455_23499">
                                                    <rect width="24" height="24" fill="white"
                                                        transform="translate(14 14.6431)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="swiper-button-prev-ssv13-m">
                                        <svg width="52" height="53" viewBox="0 0 52 53" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                            <g clip-path="url(#clip0_455_23488)">
                                                <path
                                                    d="M24.7307 26.6429L30.0932 32.0054L28.5613 33.5372L21.667 26.6429L28.5613 19.7485L30.0932 21.2804L24.7307 26.6429Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_455_23488">
                                                    <rect width="26" height="26" fill="white"
                                                        transform="translate(13 13.6431)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>   
                            <div class="AI-chatbox-toggle-btn-ssv13" onclick="openAIChatssv13();" style="${ssv13_brandCustomizations.chat_bot == '0' ? 'display: none;' : ''}">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint0_linear_3709_42110)"/>
                                    <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint1_linear_3709_42110)"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_3709_42110" x1="-2.55556" y1="-3.7219" x2="-3.30625" y2="21.1917" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.265224" stop-color="#D0CDAB"/>
                                    <stop offset="0.435" stop-color="#E9E1FF"/>
                                    <stop offset="0.878722" stop-color="#473D87"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_3709_42110" x1="-2.67333" y1="25.8748" x2="19.7611" y2="25.6981" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D7E1FA"/>
                                    <stop offset="0.879067" stop-color="#C6F1FF"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <label>Ask anything</label>
                            </div>                                                     
                        </div>
                        <div class="video-modal-structure-right-ssv13">
                            ${mRightBlocks}
                            <div class="video-modal-fade-white-R-ssv13" style="display: none;"></div>
                            ${chatBot}
                            <div class="user-verification-form-ssv13">
                                <svg class="uvf-close-btn-ssv13" onclick="closeUserVerificationssv13();" width="12"
                                    height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.99962 4.82178L10.1246 0.696777L11.303 1.87511L7.17796 6.00011L11.303 10.1251L10.1246 11.3034L5.99962 7.17844L1.87462 11.3034L0.696289 10.1251L4.82129 6.00011L0.696289 1.87511L1.87462 0.696777L5.99962 4.82178Z"
                                        fill="#454549" />
                                </svg>
                                <form></form>
                                <form onsubmit="return addUserssv13(this);">
                                    <input tabindex="-1" type="text" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required placeholder="Full name" class="uvf-input-ssv13 uvf-input-fname-ssv13"
                                        autocomplete="off">
                                    <div class="uvf-phone-country-ssv13">
                                        <div class="uvf-country-ssv13">
                                            <div class="country-selected-ssv13">
                                                <i class="uvf-country-flag-icon uvf-cfi-in" data-code="+91"></i>
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.99956 3.879L8.71206 0.166504L9.77256 1.227L4.99956 6L0.226562 1.227L1.28706 0.166504L4.99956 3.879Z"
                                                        fill="#A2A2A4" />
                                                </svg>
                                            </div>
                                            <div class="country-drop-ssv13" style="display: none;">
                                                <ul>
                                                    <li data-code="IN" data-name="India" data-cid="c124" data-code="+91"><i
                                                            class="uvf-country-flag-icon uvf-cfi-in"></i>India (+91)</li>
                                                    <li data-code="US" data-name="United States" data-cid="c255" data-code="+1"><i
                                                            class="uvf-country-flag-icon uvf-cfi-us"></i>United States(+1)</li>
                                                    <li data-code="GB" data-name="United Kingdom" data-cid="c254" data-code="+44"><i
                                                            class="uvf-country-flag-icon uvf-cfi-gb"></i>United Kingdom (+44)
                                                    </li>
                                                    <li data-code="AE" data-name="United Arab Emirates" data-cid="c253" data-code="+971"><i
                                                            class="uvf-country-flag-icon uvf-cfi-ae"></i>United Arab Emirates
                                                        (+971)</li>
                                                    <li data-code="PK" data-name="Pakistan" data-cid="c189" data-code="+92"><i
                                                            class="uvf-country-flag-icon uvf-cfi-pk"></i>Pakistan (+92)</li>
                                                    <li data-code="QA" data-name="Qatar" data-cid="c201" data-code="+974"><i
                                                            class="uvf-country-flag-icon uvf-cfi-qa"></i>Qatar (+974)</li>
                                                    <li data-code="SA" data-name="Saudi Arabia" data-cid="c216" data-code="+966"><i
                                                            class="uvf-country-flag-icon uvf-cfi-sa"></i>Saudi Arabia(+966)</li>
                                                    <li data-code="KW" data-name="Kuwait" data-cid="c140" data-code="+965"><i
                                                            class="uvf-country-flag-icon uvf-cfi-kw"></i>Kuwait (+965)</li>
                                                    <li data-code="OM" data-name="Oman" data-cid="c188" data-code="+968"><i
                                                            class="uvf-country-flag-icon uvf-cfi-om"></i>Oman (+968)</li>
                                                    <li data-code="YE" data-name="Yemen" data-cid="c264" data-code="+967"><i
                                                            class="uvf-country-flag-icon uvf-cfi-ye"></i>Yemen (+967)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="uvf-phone-ssv13">
                                            <input tabindex="-1" type="text" placeholder="Phone number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' 
                                                class="uvf-input-ssv13 uvf-input-phone-ssv13" required autocomplete="off">
                                        </div>
                                    </div>
                                    <button tabindex="-1" class="uvf-submit-ssv13">Subscribe
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.9763 6.16689L6.50634 1.69689L7.68467 0.518555L14.1663 7.00022L7.68467 13.4819L6.50634 12.3036L10.9763 7.83355H0.833008V6.16689H10.9763Z"
                                                fill="#454549" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div class="video-modal-cart-popup-ssv13">
                                <svg class="cart-popup-btn-close-ssv13" onclick="closeCartPopupssv13();" width="12"
                                    height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.99962 4.82178L10.1246 0.696777L11.303 1.87511L7.17796 6.00011L11.303 10.1251L10.1246 11.3034L5.99962 7.17844L1.87462 11.3034L0.696289 10.1251L4.82129 6.00011L0.696289 1.87511L1.87462 0.696777L5.99962 4.82178Z"
                                        fill="#454549" />
                                </svg>
                                <p class="cart-popup-msg-ssv13">${ssv13_brandCustomizations.cart_success_message}</p>
                                <div class="cart-popup-flex-ssv13">
                                    <button tabindex="-1" class="cart-popup-btn-viewcart-ssv13" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'">
                                        ${ssv13_brandCustomizations.view_cart_txt}
                                    </button>
                                    <button tabindex="-1" class="cart-popup-btn-continue-ssv13" onclick="closeCartPopupssv13();" style="background: ${ssv13_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv13_brandCustomizations.front_color_buy_btn} !important;">
                                        ${ssv13_brandCustomizations.shopping_text}
                                    </button>
                                </div>
                            </div>                            
                            <p class="video-modal-alert-R-ssv13"></p>
                        </div>
                        <p class="video-modal-alert-P-ssv13"></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(mDiv);

    // pip append
    if (no == 0 && ssv13_brandCustomizations.pip_mode == '1') {
        let pDiv = document.createElement('div');
        pDiv.innerHTML = `
            <div class="swirl-short-video-pip-ssv13" onclick="fsPIPssv13();">
                <video class="ssv-pip-video-ssv13 ${videoConflictClass}" poster="" loop playsinline muted>                    
                </video>
                <svg class="ssv-pip-close-ssv13 JS-ignore-fs-click" onclick="closePIPssv13(true);" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect class="JS-ignore-fs-click" x="0.40332" y="0.643066" width="36" height="36" rx="18" fill="#2E2E33" fill-opacity="0.6"></rect>
                    <g class="JS-ignore-fs-click" clip-path="url(#clip0_323_30588)">
                        <path class="JS-ignore-fs-click" d="M18.4029 17.4648L22.5279 13.3398L23.7063 14.5182L19.5813 18.6432L23.7063 22.7682L22.5279 23.9465L18.4029 19.8215L14.2779 23.9465L13.0996 22.7682L17.2246 18.6432L13.0996 14.5182L14.2779 13.3398L18.4029 17.4648Z" fill="white"></path>
                    </g>
                    <defs class="JS-ignore-fs-click">
                        <clipPath class="JS-ignore-fs-click" id="clip0_323_30588">
                            <rect class="JS-ignore-fs-click" width="20" height="20" fill="white" transform="translate(8.40332 8.64307)"></rect>
                        </clipPath>
                    </defs>
                </svg>
                <svg class="ssv-pip-volume-ssv13 JS-ignore-fs-click"
                    onclick="pipVolumessv13(this);" width="25" height="19"
                    viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="JS-ignore-fs-click" 
                        d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                        fill="white" />
                </svg>
                <div class="ssv-pip-fullscreen-ssv13"></div>
            </div>
        `;
        document.body.appendChild(pDiv);
    }

    countryDropdownssv13(`.swirl-short-videos-m-ssv13-${no} .country-selected-ssv13`, `.swirl-short-videos-m-ssv13-${no} .country-drop-ssv13`);

    // Looping contents
    videos.forEach(video => {
        ssv13_swiper_product[`sw${video.video_id}-${no}`] = new Swiper(`.swiper-product-ssv13-${video.video_id}-${no}`, {
            slidesPerView: 1.1,
            direction: 'horizontal',
            spaceBetween: 0,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            on: {
                slideChange: function () {
                    let activeInd = ssv13_swiper_product[`sw${video.video_id}-${no}`].activeIndex;
                    let slide = document.querySelectorAll(`.swiper-product-ssv13-${video.video_id}-${no} .swiper-slide`)[activeInd];
                    let reviews = slide.dataset.reviews;
                    slide.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-count-ssv13').innerHTML = reviews;
                }
            }
        });

        if (ssv13_brandCustomizations.product_reviews == '1') {
            ssv13_swiper_review[`sw${video.video_id}-${no}`] = new Swiper(`.swiper-review-ssv13-${video.video_id}-${no}`, {
                slidesPerView: 1,
                direction: 'horizontal',
                spaceBetween: 0,
                centeredSlidesBounds: true,
                centerInsufficientSlides: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                on: {
                    init: function () {
                        setTimeout(() => {
                            if (!ssv13_swiper_review[`sw${video.video_id}-${no}`].slides.length) {
                                document.querySelector(`.swiper-review-ssv13-${video.video_id}-${no}`).closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-ssv13').setAttribute('style', 'display: none!important;');
                                document.querySelector(`.swiper-review-ssv13-${video.video_id}-${no}`).closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-count-ssv13').setAttribute('style', 'display: none!important;');
                            }
                        }, 1000);
                    },
                    slideChange: function () {
                        let activeInd = ssv13_swiper_review[`sw${video.video_id}-${no}`].activeIndex;
                        let slide = ssv13_swiper_review[`sw${video.video_id}-${no}`].slides[activeInd];
                        let reviewDivs = slide.closest('.video-modal-product-reviews-ssv13').querySelectorAll('.video-modal-pr-bottom-ssv13');
                        reviewDivs.forEach(e => {
                            e.style.display = 'none';
                        });
                        reviewDivs[activeInd].style.display = 'block';
                        reviewDivs[activeInd].scrollTop = 0;
                    }
                }
            });
        }

        // NNNow cart option           
        // if (typeof video.product[0] != 'undefined' && ssv13_storeType == '6' && ssv13_brandCustomizations.add_to_cart == '1') {
        //     video.product.forEach(prd => {
        //         const settings = {
        //             url: `https://api.omuni.com/d/api/productSearch/albl/${prd.sku_code}`,
        //             method: "GET",
        //             timeout: 0,
        //             headers: {
        //                 "Authorization": "Basic U3dpcmw6MzExamZaRGtLMEFVM2lE"
        //             }
        //         };

        //         fetch(settings.url, {
        //             method: settings.method,
        //             headers: settings.headers
        //         }).then(response => response.json()).then(response => {
        //             if (typeof response.data !== 'undefined') {
        //                 if (Object.keys(response.data.skus).length) {
        //                     let i = null;
        //                     let sel = false;
        //                     let staticOption = `
        //                         <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Color</h3>
        //                         <p class="video-modal-sr-pb-pi-attrvalue-ssv13">${response.data.primaryColor}</p>                                
        //                     `;

        //                     let dynamicOption = `
        //                         <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Size</h3>
        //                         <div class="video-modal-sr-pb-pi-attrselection-ssv13">
        //                     `;
        //                     response.data.skus.forEach((sku, s) => {
        //                         i = (i === null && sku.quantity > 0) ? s : i;
        //                         dynamicOption += `
        //                             <p onclick="selectProductOptionssv13(this); updatePriceBySKUssv13(this, '${prd.currencysymbols}');" data-sku="${sku.skuId}" data-mrp="${sku.mrp}" data-selling="${sku.sellingPrice}" class="${sku.quantity > 0 && !sel ? 'selected-ssv13' : ''} ${sku.quantity === 0 ? 'disabled-ssv13' : ''}">${sku.size}</p>                                    
        //                         `;
        //                         sel = sku.quantity > 0 && !sel ? true : sel;
        //                     });

        //                     dynamicOption += `
        //                         </div>
        //                     `;

        //                     document.querySelector(`.JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13`).innerHTML = staticOption;
        //                     document.querySelector(`.JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13`).style.display = 'block';
        //                     document.querySelector(`.JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13`).innerHTML = dynamicOption;
        //                     document.querySelector(`.JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13`).style.display = 'block';

        //                     i = i === null ? 0 : i;

        //                     ssv13_productIds[prd.product_id] = response.data.skus[i].skuId;

        //                     document.querySelectorAll(`.JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13`).forEach(p => {
        //                         let dis = parseFloat(response.data.skus[i].mrp) > parseFloat(response.data.skus[i].sellingPrice) ? true : false;

        //                         let strk = p.querySelector('strike');
        //                         strk.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
        //                         strk.innerHTML = prd.currencysymbols + '' + formatCurrencyssv13(response.data.skus[i].mrp);

        //                         let lbl = p.querySelector('label');
        //                         lbl.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
        //                         lbl.innerHTML = `${parseFloat(response.data.skus[i].mrp) > parseFloat(response.data.skus[i].sellingPrice) ? Math.round(((response.data.skus[i].mrp - response.data.skus[i].sellingPrice) * 100) / response.data.skus[i].mrp) : ''}% OFF`;

        //                         let finalPrice = prd.currencysymbols + '' + formatCurrencyssv13(response.data.skus[i].sellingPrice);
        //                         finalPrice += strk ? strk.outerHTML : '';
        //                         finalPrice += lbl ? lbl.outerHTML : '';
        //                         p.innerHTML = finalPrice;
        //                     });
        //                 }
        //             }
        //         }).catch(error => console.log('NNNow cart option fetch failed:', error));
        //     });
        // }
    });

    if (!ssv13_pipMode && carouselLoad && ssv13_pageView == '1') {
        ssv13_swiper[no] = new Swiper(`.swiper-ssv13-c${no}`, {
            slidesPerView: 2,
            direction: 'horizontal',
            spaceBetween: 15,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,
            // centeredSlides: true,
            cssMode: true,
            breakpoints: {
                600: {
                    slidesPerView: 2,
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
                    slidesPerView: 5,
                    centeredSlides: false,
                    cssMode: false
                }
            },
            navigation: {
                nextEl: '.swiper-button-next-ssv13-c',
                prevEl: '.swiper-button-prev-ssv13-c',
            },
            on: {
                init: function () {
                    if (ssv13_brandCustomizations.auto_play == '1') {
                        let pff = window.innerWidth > 768 ? 5 : 2;
                        document.querySelectorAll(`.swiper-ssv13-c${no} .carousel-video-ssv13`).forEach(elm => {
                            if (pff > 0) {
                                elm.src = elm.dataset.src;
                                elm.load();
                                elm.play();
                            }
                            pff--;
                        });
                    }

                    setTimeout(() => {
                        updateCarouselVideoHeightssv13(no);
                    }, 1000);
                },
                slideChange: function () {
                    if (ssv13_brandCustomizations.auto_play == '1') {
                        this.slides.forEach(s => {
                            let vdo = s.querySelector('.carousel-video-ssv13');
                            if (vdo.src == '') {
                                vdo.src = vdo.dataset.src;
                                vdo.load();
                                vdo.play();
                            }
                        });
                    }
                }
            }

        });
    } else {
        if (ssv13_brandCustomizations.auto_play == '1') {
            document.querySelectorAll(`.swiper-ssv13-c${no} .carousel-video-ssv13`).forEach(vdo => {
                if (vdo.src == '') {
                    vdo.src = vdo.dataset.src;
                    vdo.load();
                    vdo.play();
                }
            });
        }
    }

    ssv13_swiper_modal[no] = new Swiper(`.swiper-ssv13-m${no}`, {
        slidesPerView: 1,
        direction: "vertical",
        spaceBetween: 0,
        clickable: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next-ssv13-m',
            prevEl: '.swiper-button-prev-ssv13-m',
        },
        breakpoints: {
            768: {
                direction: "horizontal",
                slidesPerView: 1.2,
            },
        },
        effect: window.innerWidth > 768 ? 'coverflow' : '',
        coverflowEffect: {
            depth: 600,
            modifier: 1,
            rotate: 0,
            scale: 1.2,
            slideShadows: false,
            stretch: 10
        },
        on: {
            init: function () {
                if (ssv13_pipMode) {
                    ssv13_globalMute = true;
                    openPIPssv13(true);
                }

                if (typeof getParamssv13['ssv'] != 'undefined') {
                    setTimeout(() => {
                        ssv13_globalMute = true;
                        let videoId = window.atob(getParamssv13['ssv']);
                        let slide = document.querySelector(`video[data-id="${videoId}"]`).closest('.swiper-slide');
                        slide.dispatchEvent(new Event('click'));
                    }, 500);
                }

                if (ssv13_pdppip && ssv13_brandCustomizations.pdppip == '1' && ssv13_brandCustomizations.pip_mode == '1') {
                    ssv13_globalMute = true;
                    let pipData = JSON.stringify({
                        src: videos[0].server_url,
                        poster: videos[0].cover_image
                    });

                    localStorage.setItem('ssv13_pip', pipData);
                    localStorage.setItem('ssv13_storePlaylist', '');

                    openPIPssv13(true);
                }

                setTimeout(() => {
                    updateModalVideoHeightssv13(no);
                }, 1000);

                // Product detail line clamp
                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sr-pb-pi-pdesc-ssv13`).forEach(elm => {
                    let observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Logic
                                setTimeout(() => {
                                    let lineHeight = parseInt(window.getComputedStyle(elm).lineHeight, 10);
                                    let textHeight = elm.scrollHeight;

                                    let btnT = elm.closest('.video-modal-sr-pb-pi-pdesc-master-ssv13').querySelector('.video-modal-sr-pb-pi-pdesc-toggle-ssv13');
                                    if (textHeight <= lineHeight * 3) {
                                        btnT.style.display = 'none';
                                    } else {
                                        btnT.style.display = 'block';
                                    }
                                }, 300);

                                observer.disconnect(); // Stop observing after the element becomes visible
                            }
                        });
                    }, {
                        root: null,
                        threshold: 0
                    });

                    observer.observe(elm);
                });
            },
            slideChange: function () {
                let activeInd = ssv13_swiper_modal[no].activeIndex;

                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`).forEach(elm => {
                    elm.classList.remove('active-ssv13');
                });
                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`)[activeInd].classList.add('active-ssv13');
                document.querySelector(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-toggler-ssv13 img`).src = document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`)[activeInd].src;

                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`).forEach(elm => {
                    elm.style.display = 'none';
                    // fadeOutssv13(elm);
                });
                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[activeInd].style.display = 'block';
                // fadeInssv13(document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[activeInd]);

                pauseAllModalVideossv13();

                playModalVideossv13(activeInd);

                if (window.innerWidth > 768) {
                    // close events
                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .uvf-close-btn-ssv13`).dispatchEvent(new Event('click'));
                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .cart-popup-btn-close-ssv13`).dispatchEvent(new Event('click'));
                    if (ssv13_brandCustomizations.chat_bot == '1' && window.innerWidth > 768) document.querySelector(`.swirl-short-videos-m-ssv13-${no} .AI-chatbox-header-back-ssv13`).dispatchEvent(new Event('click'));
                }
            },
            slideNextTransitionEnd: function () {
                if (window.innerWidth > 768) {
                    let activeInd = ssv13_swiper_modal[no].activeIndex;

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-fade-white-L-ssv13`)[(activeInd - 1)].dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd - 1)].querySelector('.JS-modal-PC-tab-ssv13').dispatchEvent(new Event('click'));

                    if (document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd - 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').length > 1) {
                        document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd - 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
                            // elm.style.transform = 'translateX(110%)';
                            elm.style.display = 'none';
                        });
                    }
                }
            },
            slidePrevTransitionEnd: function () {
                if (window.innerWidth > 768) {
                    let activeInd = ssv13_swiper_modal[no].activeIndex;

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-fade-white-L-ssv13`)[(activeInd + 1)].dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd + 1)].querySelector('.JS-modal-PC-tab-ssv13').dispatchEvent(new Event('click'));

                    if (document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd + 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').length > 1) {
                        document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd + 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
                            // elm.style.transform = 'translateX(110%)';
                            elm.style.display = 'none';
                        });
                    }
                }
            }
        }
    });
}

// Common

function charLimitssv13(inp) {
    if (inp.value.length > 250) {
        inp.value = inp.value.substring(0, 250);
        videoAlertssv13('Max 250 character.', 2000, inp);
    }
}

function updateCarouselVideoHeightssv13(no) {
    if (document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-P-ssv13`).length && document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-L-ssv13`).length) {
        let maxHeight = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-P-ssv13`), function (e) {
            return e.offsetHeight;
        });
        maxHeight = Math.max.apply(null, maxHeight);

        document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-L-ssv13`).forEach(e => {
            e.style.height = maxHeight + 'px';
        });
    }
}

function updateModalVideoHeightssv13(no) {
    if (document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`).length && document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-L-ssv13`).length) {
        let maxHeight = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`), function (e) {
            return e.offsetHeight;
        });
        let maxWidth = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`), function (e) {
            return e.offsetWidth;
        });
        maxWidth = Math.max.apply(null, maxWidth);
        maxHeight = Math.max.apply(null, maxHeight);

        document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-L-ssv13`).forEach(e => {
            e.style.width = maxWidth + 'px';
            e.style.height = maxHeight + 'px';
        });
    }
}

function productImagessv13(img, w) {
    if (img.includes('cdn-product-images')) return img;
    if (img.includes('imagekit')) return img;
    if (img.includes('coverimages')) {
        let imgParts = img.split('coverimages');
        return imgParts[0] + `coverimages/tr:w-${w}` + imgParts[1];
    }
    return img
}

function getHandlessv13(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle ? handle.split('#')[0] : '';
    handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

    return handle;
}

function formatCurrencyssv13(number) {
    // Add thousands separator    
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Format the number as a currency string
    return formattedNumber;
}

function secondsToDurationssv13(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    return String(m).padStart(2, "0") + ':' + String(s).padStart(2, "0");
}

function fadeInssv13(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    requestAnimationFrame(function () {
        element.style.transition = 'opacity 2s';
        element.style.opacity = 1;
    });
}

function fadeOutssv13(element) {
    element.style.display = 'none';
    element.style.opacity = 1;
    requestAnimationFrame(function () {
        element.style.transition = 'opacity 2s';
        element.style.opacity = 0;
    });
}

function isElementVisiblessv13(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getElementPositionInMasterDivssv13(masterDiv, element) {
    const masterRect = masterDiv.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const position = {
        top: elementRect.top - masterRect.top,
        left: elementRect.left - masterRect.left,
        right: masterRect.right - elementRect.right
    };

    return position;
}

function setCookiessv13(cname, cvalue, exdays, domain = '') {
    domain = domain ? 'domain=' + domain + ';' : '';
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain;
}

function getCookiessv13(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getTimeAgossv13(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 0) {
        return interval == 1 ? interval + " year ago" : interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
        return interval == 1 ? interval + " month ago" : interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
        return interval == 1 ? interval + " day ago" : interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
        return interval == 1 ? interval + " hour ago" : interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
        return interval == 1 ? interval + " minute ago" : interval + " minutes ago";
    }
    if (Math.floor(seconds) < 10) {
        return "Just now";
    }
    return Math.floor(seconds) + " seconds ago";
}

function getMobileOSssv13() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function updatePriceBySKUssv13(op, cSymbol) {
    let p = op.closest('.video-modal-sr-pb-pi-pdetails-ssv13').querySelector('.JS-PB-dynamic-price-ssv13');
    let mrp = parseFloat(op.dataset.mrp);
    let selling = parseFloat(op.dataset.selling);
    let dis = mrp > selling ? true : false;

    let strk = p.querySelector('strike');
    strk.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
    strk.innerHTML = cSymbol + '' + formatCurrencyssv13(mrp);

    let lbl = p.querySelector('label');
    lbl.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
    lbl.innerHTML = `${mrp > selling ? Math.round(((mrp - selling) * 100) / mrp) : ''}% OFF`;

    let finalPrice = cSymbol + '' + formatCurrencyssv13(selling);
    finalPrice += strk ? strk.outerHTML : '';
    finalPrice += lbl ? lbl.outerHTML : '';
    p.innerHTML = finalPrice;
}

function replaceUrlsWithAnchorssv13(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a target="_blank" class="break-words-ssv13" href="$1">$1</a>');
}

function numberToShorthandssv13(number) {
    number = parseInt(number);
    if (number >= 10000000) {
        return (number / 10000000).toFixed(1) + 'Cr'; // Cr for Crore (10 million)
    } else if (number >= 100000) {
        return (number / 100000).toFixed(1) + 'L'; // L for Lakh (100 thousand)
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // K for Thousand
    } else {
        return number.toString(); // Return the number as is if it's less than 1000
    }
}

// Functions

function selectProductOptionssv13(op) {
    op.closest('.video-modal-sr-pb-pi-attrselection-ssv13').querySelectorAll('p').forEach(o => {
        o.classList.remove('selected-ssv13');
    });

    op.classList.add('selected-ssv13');
}

function openVideoModalssv13(slideNo, mNo) {
    closePIPssv13();

    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${mNo} .video-modal-sl-video-ssv13`).forEach(element => {
        if (element.src == '') {
            element.src = element.dataset.src;
            element.load();
        }
    });

    // Load thumbs
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${mNo} img.JS-load-thumbs-ssv13`).forEach(element => {
        if (element.getAttribute('src') == '') {
            element.setAttribute('src', element.dataset.src);
            element.classList.remove('JS-load-thumbs-ssv13');
        }
    });

    ssv13_currentModal = mNo;
    ssv13_modalState = 1;

    let activeInd = ssv13_swiper_modal[ssv13_currentModal].activeIndex;
    ssv13_swiper_modal[ssv13_currentModal].slideTo(slideNo);

    if (slideNo == activeInd) {
        playModalVideossv13(activeInd);
    }

    setPopupHightssv13();
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-ssv13`).style.transform = 'scaleY(1)';

    if (ssv13_storeType == '1') updateShopifyCartssv();

    // Animate AI chat
    if (window.innerWidth > 768 && ssv13_brandCustomizations.chat_bot == '1') {
        document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-toggle-btn-ssv13`).classList.add('AI-animate-ssv13');
    }

    disableScrollssv13();
}

function closeVideoModalssv13(byUser = false) {
    ssv13_modalState = 0;

    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-ssv13`).style.transform = 'scaleY(0)';
    pauseAllModalVideossv13();

    if (byUser) {
        localStorage.setItem('ssv13_pip', '');
    }

    enableScrollssv13();

    // close popups
    let activeInd = ssv13_swiper_modal[ssv13_currentModal].activeIndex;
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-L-ssv13`)[activeInd].dispatchEvent(new Event('click'));

    // Analytics code
    pushAnalyticsdatassv13();
}

function playModalVideossv13(slideNo) {
    let vdo = document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sl-video-ssv13`)[slideNo];

    // if (vdo.src == '') {
    //     vdo.src = vdo.dataset.src;
    //     vdo.load();
    // }

    vdo.currentTime = 0;
    vdo.muted = true;
    // ssv13_globalMute = getMobileOSssv13() == 'iOS' ? true : ssv13_globalMute;
    let playPromise = vdo.play();
    playPromise.then(_ => {
        let btn = vdo.closest('.video-modal-sl-video-container-ssv').querySelectorAll('.video-modal-sl-vc-volume-ssv13');
        vdo.muted = ssv13_globalMute;
        btn[0].innerHTML = btn[1].innerHTML = vdo.muted ? `
            <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        ` : `
            <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;

        // Analytics code
        initializeVideoDatassv13(vdo.id, vdo.src, document.querySelectorAll(`.swirl-short-videos-c-ssv13`)[ssv13_currentModal].dataset.playlist);
    }).catch(error => { });

    // no product
    let pc = vdo.dataset.products;
    let ms = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-ssv13`);
    ms.classList.remove('no-product-ssv13');
    if (pc == '0' && ssv13_brandCustomizations.comment_mode == '0') ms.classList.add('no-product-ssv13');
    if (pc == '0' && ssv13_brandCustomizations.comment_mode == '1') document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .JS-modal-comment-tab-ssv13`)[slideNo].dispatchEvent(new Event('click'));

    // Pip
    if (ssv13_brandCustomizations.pip_mode == '1') {
        let pipData = JSON.stringify({
            src: vdo.src,
            poster: vdo.poster
        });
        let cPlaylist = document.querySelector(`video[data-srcf="${vdo.src}"]`).closest('.swirl-short-videos-c-ssv13').dataset.playlist;

        localStorage.setItem('ssv13_pip', pipData);
        localStorage.setItem('ssv13_storePlaylist', cPlaylist);
    }

    // Navigation icon position
    if (window.innerWidth > 768) setNavigationIconssv13(vdo);

    // AI CHAT
    if (window.innerWidth > 768 && ssv13_brandCustomizations.chat_bot == '1') {
        let v = ssv13_swiper_modal[ssv13_currentModal].slides[ssv13_swiper_modal[ssv13_currentModal].activeIndex].querySelector('.video-modal-sl-video-ssv13');
        let pc = v.dataset.products;
        let rSide = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-right-ssv13`);
        let aiBox = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`);
        rSide.removeAttribute('style');
        aiBox.removeAttribute('style');
        setTimeout(() => {
            if (pc == '0' && ssv13_brandCustomizations.comment_mode == '0') {
                let pos = getElementPositionInMasterDivssv13(v.closest('.video-modal-sl-video-block-ssv13'), v);
                rSide.style.width = `${pos.right - 30}px`;
                rSide.style.position = 'absolute';
                rSide.style.right = '10px';
                rSide.style.bottom = '70px';
                rSide.style.borderRadius = '10px';
                rSide.style.height = '60%';
                rSide.style.zIndex = '6';

                aiBox.style.height = '100%';
            } else {
                rSide.removeAttribute('style');
                aiBox.removeAttribute('style');
            }
        }, 400);
    }
}

function pauseAllModalVideossv13() {
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sl-video-ssv13`).forEach(elm => {
        elm.pause();
    });
}

function changeModalVideossv13(slideNo) {
    ssv13_swiper_modal[ssv13_currentModal].slideTo(slideNo);
}

function openPIPssv13(mode = false) {
    if (!localStorage.getItem('ssv13_pip')) return;
    let pipData = JSON.parse(localStorage.getItem('ssv13_pip'));

    if (!mode) closeVideoModalssv13();

    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    vdo.src = pipData.src;
    vdo.poster = pipData.poster;

    vdo.load();

    document.querySelector('.swirl-short-video-pip-ssv13').style.transform = 'scaleY(1)';
    setTimeout(() => {
        let playPromise = vdo.play();
        playPromise.then(_ => {
            vdo.muted = ssv13_globalMute;
            document.querySelector('.ssv-pip-volume-ssv13').innerHTML = vdo.muted ? `
                <path class="JS-ignore-fs-click" d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
            ` : `
                <path class="JS-ignore-fs-click" d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
            `;

            // Analytics code
            let vId = document.querySelector(`.video-modal-sl-video-ssv13[data-src="${pipData.src}"]`).dataset.id;
            vdo.id = vId;
            initializeVideoDatassv13(vId, pipData.src, document.querySelectorAll(`.swirl-short-videos-c-ssv13`)[ssv13_currentModal].dataset.playlist);
        }).catch(error => {
        });
    }, 500);
}

function pipVolumessv13(btn) {
    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    if (vdo.muted) {
        vdo.muted = false;
        ssv13_globalMute = false;
        btn.innerHTML = `
            <path class="JS-ignore-fs-click" d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;
    } else {
        vdo.muted = true;
        ssv13_globalMute = true;
        btn.innerHTML = `
            <path class="JS-ignore-fs-click" d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        `;
    }
}

function closePIPssv13(analytics = false) {
    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    if (!vdo) return;

    vdo.pause();

    document.querySelector('.swirl-short-video-pip-ssv13').style.transform = 'scaleY(0)';

    localStorage.setItem('ssv13_pip', '');

    if (analytics) {
        // Analytics code
        pushAnalyticsdatassv13();
    }
}

function fsPIPssv13() {
    if (event.target.classList.contains('JS-ignore-fs-click')) return;

    let src = document.querySelector('.ssv-pip-video-ssv13').src;
    let slide = document.querySelector(`video[data-srcf="${src}"]`).closest('.swiper-slide');

    closePIPssv13();

    slide.dispatchEvent(new Event('click'));
}

function showMarqueessv13(vdo) {
    setTimeout(() => {
        if (window.getComputedStyle(vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13')).display == 'none') {
            var marquee = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13 span');
            var mContainer = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13');
            mContainer.style.display = "block";
            var mContentWidth = marquee.offsetWidth;
            var mSpeedFactor = 70; // Adjust this value to control the speed
            var mAnimationDurations = (mContentWidth / mSpeedFactor) + "s";
            marquee.style.animationDuration = mAnimationDurations;
            marquee.style.transform = `translateX(${mContainer.clientWidth}px)`;

            // elements taken up
            // ['.video-modal-product-slider-ssv13', '.video-modal-sl-bottom-controls-ssv13', '.video-cta-redi-button-ssv13'].forEach(e => {
            //     let elm = vdo.closest('.video-modal-sl-video-container-ssv').querySelector(e);
            //     let btm = parseInt(window.getComputedStyle(elm).getPropertyValue('bottom').replace('px', ''));
            //     elm.style.bottom = (btm + 45) + 'px';
            // });
        }
    }, 600);
}

function hideMarqueessv13(m) {
    m.style.display = "none";
    // ['.video-modal-product-slider-ssv13', '.video-modal-sl-bottom-controls-ssv13', '.video-cta-redi-button-ssv13'].forEach(e => {
    //     let elm = m.closest('.video-modal-sl-video-container-ssv').querySelector(e);
    //     let btm = parseInt(window.getComputedStyle(elm).getPropertyValue('bottom').replace('px', ''));
    //     elm.style.bottom = (btm - 45) + 'px';
    // });
}

function changePCTabssv13(tab, target) {
    tab.closest('.video-modal-sr-pb-tabs-btn-ssv13').querySelectorAll('p').forEach(elm => {
        elm.classList.remove('active-ssv13');
    });
    tab.classList.add('active-ssv13');

    tab.closest('.JS-product-master-ssv13').querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    tab.closest('.JS-product-master-ssv13').querySelector(target).style.display = 'block';
}

function openProductDetailssv13(pc, n) {
    if (event.target.classList.contains('JS-pc-ignore-ssv13')) return;
    pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
        // elm.style.transform = 'translateX(110%)';
        elm.style.display = 'none';
    });

    // pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[n].style.transform = 'translateX(0%)';
    pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[n].style.display = 'block';
}

function closeProductDetailssv13(btn) {
    // btn.closest('.video-modal-sr-pb-product-info-ssv13').style.transform = 'translateX(110%)';
    btn.closest('.video-modal-sr-pb-product-info-ssv13').style.display = 'none';

    let reviewDiv = btn.closest('.video-modal-sr-pb-pi-header-ssv13').querySelector('.video-modal-sr-pb-pi-review-btn-ssv13');
    if (reviewDiv.classList.contains('open-ssv13')) {
        reviewDiv.dispatchEvent(new Event('click'));
    }
}

function openReviewssv13(btn) {
    if (!btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.contains('open-ssv13')) {
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').style.maxHeight = 'calc(100% - 80px)';
        btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.add('open-ssv13');
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-D-ssv13').innerHTML = `
            <path d="M9.25 0.643126H7.75V5.89314H13V4.39313H10.3106L13.5303 1.17345L12.4697 0.112793L9.25 3.33246V0.643126ZM1.00006 8.89307H3.68939L0.469727 12.1127L1.53038 13.1734L4.75006 9.95372V12.6431H6.25007V7.39307H1.00006V8.89307Z" fill="#5D5D60"/>
        `;
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-P-ssv13').innerHTML = `
            <path d="M5.99962 3.02329L1.87462 7.14829L0.696289 5.96996L5.99962 0.666626L11.303 5.96996L10.1246 7.14829L5.99962 3.02329Z" fill="#454549"/>
        `;
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-pclosed-ssv13').style.display = 'flex';

        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').scrollTop = 0;
    } else {
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').style.maxHeight = '0%';
        btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.remove('open-ssv13');
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-D-ssv13').innerHTML = `
            <path d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z" fill="#5D5D60" />
        `;
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-P-ssv13').innerHTML = `
            <path d="M5.99962 4.97656L10.1246 0.851562L11.303 2.0299L5.99962 7.33323L0.696289 2.0299L1.87462 0.851562L5.99962 4.97656Z" fill="#454549"/>
        `;
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-pclosed-ssv13').style.display = 'none';
    }
}

function closeReviewssv13(btn) {
    btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-review-btnR-ssv13 svg').dispatchEvent(new Event('click'));
}

function updateProgressbarssv13(vdo) {
    let percentage = vdo.duration > 0 ? Math.floor((100 / vdo.duration) * vdo.currentTime) : 0;
    vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-progressbar-ssv13 progress').value = percentage;

    // marquee
    if (ssv13_brandCustomizations.marque_txt == '1') {
        var halfwayPoint = vdo.duration / 2;
        var halfwayBeetween = halfwayPoint + 1;
        if ((vdo.currentTime >= halfwayPoint && vdo.currentTime <= halfwayBeetween) || (vdo.currentTime > 0 && vdo.currentTime <= 1)) {
            showMarqueessv13(vdo);
        }
    }
}

function openUserVerificationssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'block';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .user-verification-form-ssv13`).style.transform = 'translateY(0%)';
}

function closeUserVerificationssv13() {
    let fadeOff = true;
    if (ssv13_brandCustomizations.chat_bot == '1') {
        if (window.getComputedStyle(document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`)).transform == 'matrix(1, 0, 0, 1, 0, 0)' && window.innerWidth > 768) {
            fadeOff = false;
        }
    }

    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .user-verification-form-ssv13`).style.transform = 'translateY(110%)';
    if (fadeOff) document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';
}

function openAIChatssv13() {
    let aiBox = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`);
    let aiBoxBtn = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-toggle-btn-ssv13`);
    if (!document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13.opened-ssv13`)) {
        document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'block';

        aiBox.classList.add('opened-ssv13');
        aiBox.style.transform = 'translateY(0%)';
        aiBoxBtn.classList.add('AI-opened-ssv13');

        aiBoxBtn.querySelector('svg').innerHTML = `
            <path d="M6.9998 5.85664L12.3623 0.494141L13.8941 2.02597L8.53164 7.38847L13.8941 12.751L12.3623 14.2828L6.9998 8.92031L1.6373 14.2828L0.105469 12.751L5.46797 7.38847L0.105469 2.02597L1.6373 0.494141L6.9998 5.85664Z" fill="#F5F5F5"/>
        `;

        if (document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-ssv13.no-product-ssv13`)) {
            document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-right-ssv13`).style.display = 'block';
        }
    } else {
        document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';

        aiBox.classList.remove('opened-ssv13');
        aiBox.style.transform = 'translateY(110%)';
        aiBoxBtn.classList.remove('AI-opened-ssv13');

        aiBoxBtn.querySelector('svg').innerHTML = `
            <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint0_linear_3709_42110)"/>
            <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint1_linear_3709_42110)"/>
            <defs>
            <linearGradient id="paint0_linear_3709_42110" x1="-2.55556" y1="-3.7219" x2="-3.30625" y2="21.1917" gradientUnits="userSpaceOnUse">
            <stop offset="0.265224" stop-color="#D0CDAB"/>
            <stop offset="0.435" stop-color="#E9E1FF"/>
            <stop offset="0.878722" stop-color="#473D87"/>
            </linearGradient>
            <linearGradient id="paint1_linear_3709_42110" x1="-2.67333" y1="25.8748" x2="19.7611" y2="25.6981" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D7E1FA"/>
            <stop offset="0.879067" stop-color="#C6F1FF"/>
            </linearGradient>
            </defs>
        `;

        if (document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-ssv13.no-product-ssv13`)) {
            document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-right-ssv13`).style.display = 'none';
        }
    }
}

function closeAIChatssv13() {
    let aiBox = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`);
    let aiBoxBtn = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-toggle-btn-ssv13`);

    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';

    aiBox.classList.remove('opened-ssv13');
    aiBox.style.transform = 'translateY(110%)';
    aiBoxBtn.classList.remove('AI-opened-ssv13');

    aiBoxBtn.querySelector('svg').innerHTML = `
        <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint0_linear_3709_42110)"/>
        <path d="M11.3333 2.96484C12.4552 2.96484 13.3646 2.05542 13.3646 0.933594H14.3021C14.3021 2.05542 15.2115 2.96484 16.3333 2.96484V3.90234C15.2115 3.90234 14.3021 4.81177 14.3021 5.93359H13.3646C13.3646 4.81177 12.4552 3.90234 11.3333 3.90234V2.96484ZM0.5 8.43359C3.26143 8.43359 5.5 6.19502 5.5 3.43359H7.16667C7.16667 6.19502 9.40525 8.43359 12.1667 8.43359V10.1003C9.40525 10.1003 7.16667 12.3388 7.16667 15.1003H5.5C5.5 12.3388 3.26143 10.1003 0.5 10.1003V8.43359ZM3.73001 9.26693C4.82264 9.87326 5.72702 10.7776 6.33333 11.8703C6.93964 10.7776 7.84402 9.87326 8.93667 9.26693C7.84402 8.66059 6.93964 7.75626 6.33333 6.6636C5.72702 7.75626 4.82264 8.66059 3.73001 9.26693ZM14.0417 10.9336C14.0417 12.4293 12.8291 13.6419 11.3333 13.6419V14.8919C12.8291 14.8919 14.0417 16.1045 14.0417 17.6003H15.2917C15.2917 16.1045 16.5042 14.8919 18 14.8919V13.6419C16.5042 13.6419 15.2917 12.4293 15.2917 10.9336H14.0417Z" fill="url(#paint1_linear_3709_42110)"/>
        <defs>
        <linearGradient id="paint0_linear_3709_42110" x1="-2.55556" y1="-3.7219" x2="-3.30625" y2="21.1917" gradientUnits="userSpaceOnUse">
        <stop offset="0.265224" stop-color="#D0CDAB"/>
        <stop offset="0.435" stop-color="#E9E1FF"/>
        <stop offset="0.878722" stop-color="#473D87"/>
        </linearGradient>
        <linearGradient id="paint1_linear_3709_42110" x1="-2.67333" y1="25.8748" x2="19.7611" y2="25.6981" gradientUnits="userSpaceOnUse">
        <stop stop-color="#D7E1FA"/>
        <stop offset="0.879067" stop-color="#C6F1FF"/>
        </linearGradient>
        </defs>
    `;

    if (document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-ssv13.no-product-ssv13`)) {
        document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-right-ssv13`).style.display = 'none';
    }
}

function openCartPopupssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'block';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-cart-popup-ssv13`).style.transform = 'translateY(0%)';
}

function closeCartPopupssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-cart-popup-ssv13`).style.transform = 'translateY(110%)';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';
}

function videoVolumessv13(btn) {
    let vdo = btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-video-ssv13');
    if (vdo.muted) {
        vdo.muted = false;
        ssv13_globalMute = false;
        btn.innerHTML = `
            <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;
    } else {
        vdo.muted = true;
        ssv13_globalMute = true;
        btn.innerHTML = `
            <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        `;
    }
}

function openSharePopupssv13(btn) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';
    if (window.innerWidth > 768) {
        btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.display = 'block';
    } else {
        btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.transform = 'translateY(0%)';
    }

    disableSwiperssv13();
}

function closePopupssv13(bg) {
    if (window.getComputedStyle(bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        if (window.innerWidth > 768) {
            bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.display = 'none';
        } else {
            bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.transform = 'translateY(110%)';
        }
        bg.style.display = 'none';
    }

    if (window.getComputedStyle(bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(110%)';
        bg.style.display = 'none';

        bg.closest('.video-modal-structure-ssv13').querySelector('.uvf-close-btn-ssv13').dispatchEvent(new Event('click'));
        bg.closest('.video-modal-structure-ssv13').querySelector('.cart-popup-btn-close-ssv13').dispatchEvent(new Event('click'));

        setTimeout(() => {
            document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`).style.display = 'none';
        }, 500);

        let reviewDiv = bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-sr-pb-pi-review-btn-ssv13.open-ssv13');
        if (reviewDiv) reviewDiv.dispatchEvent(new Event('click'));
    }

    if (window.getComputedStyle(bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13').style.transform = 'translateY(110%)';
        bg.style.display = 'none';
    }

    enableSwiperssv13();
}

function pinCommentsFoldssv13(elm) {
    if (elm.querySelectorAll('.pinned-ssv13').length) {
        // let lastPin = elm.querySelectorAll('.pinned-ssv13')[(elm.querySelectorAll('.pinned-ssv13').length - 1)];
        // let isVisible = isElementVisiblessv13(lastPin);
        let firstPin = elm.querySelectorAll('.pinned-ssv13')[0];
        let isVisible = isElementVisiblessv13(firstPin);

        if (isVisible) {
            elm.querySelector('.video-modal-sr-pb-pin-card-ssv13').style.display = 'none';
        } else {
            elm.querySelector('.video-modal-sr-pb-pin-card-ssv13').style.display = 'block';
        }
    }
}

function scrolltoPinssv13(elm) {
    elm.closest('.video-modal-sr-pb-comments-ssv13').scrollTo(0, 0);
}

function showControlssv13(vdo) {
    let controls = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13');
    controls.style.display = 'flex';
    setTimeout(() => {
        controls.style.display = 'none';
    }, 3000);
}

function videoPlayPausessv13(btn) {
    let vdo = btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-video-ssv13');
    if (vdo.paused) {
        vdo.play();
        btn.innerHTML = `
            <path d="M0.5 0.916626H5.66667V37.0833H0.5V0.916626ZM26.3333 0.916626H31.5V37.0833H26.3333V0.916626Z" fill="#F5F5F5" />
        `;
    } else {
        vdo.pause();
        btn.innerHTML = `                
            <path d="M30.055 21.0747L2.67424 39.3285C2.47973 39.458 2.25375 39.5322 2.02038 39.5434C1.787 39.5546 1.55497 39.5022 1.34899 39.3919C1.14301 39.2816 0.970802 39.1176 0.850702 38.9172C0.730603 38.7167 0.667113 38.4875 0.666992 38.2539V1.7462C0.667113 1.51256 0.730603 1.28332 0.850702 1.08291C0.970802 0.8825 1.14301 0.718416 1.34899 0.608137C1.55497 0.497857 1.787 0.445512 2.02038 0.456676C2.25375 0.46784 2.47973 0.542096 2.67424 0.671534L30.055 18.9254C30.2319 19.0433 30.3769 19.2031 30.4773 19.3906C30.5776 19.5781 30.6301 19.7874 30.6301 20C30.6301 20.2127 30.5776 20.422 30.4773 20.6095C30.3769 20.7969 30.2319 20.9567 30.055 21.0747Z" fill="#F5F5F5"/>
        `;
    }
}

function videoAlertssv13(msg, sec, btn, side = '') {
    let cModal = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal}`);
    let btnPos = btn ? getElementPositionInMasterDivssv13(cModal.querySelector(`${window.innerWidth > 768 ? '.video-modal-structure-right-ssv13' : '.video-modal-structure-ssv13'}`), btn) : '';
    let aElm = cModal.querySelector(`${window.innerWidth > 768 ? '.video-modal-alert-R-ssv13' : '.video-modal-alert-P-ssv13'}`);
    aElm = side && window.innerWidth > 768 ? cModal.querySelectorAll('.video-modal-alert-L-ssv13')[(ssv13_swiper_modal[ssv13_currentModal].activeIndex)] : aElm;
    aElm.innerHTML = msg;
    aElm.style.display = 'block';
    aElm.style.top = btnPos != '' ? (btnPos.top - 80) + "px" : '50%';
    setTimeout(() => {
        aElm.style.display = 'none';
    }, sec);
}

function copyLinkssv13(inp) {
    inp.select();
    inp.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inp.value);

    videoAlertssv13('Link copied!', 2000, '', 'L');

    return;
}

function copyEmailEmbedssv13(link, poster, elm) {
    let tc = document.createElement('div');
    tc.innerHTML = ` <textarea class="email-share-txt-ssv13" style="display: none !important;" onclick="copyFormatedssv(this);"></textarea>`;
    document.body.appendChild(tc);

    let tArea = document.querySelector('.email-share-txt-ssv13');

    tArea.value = `
        <center>
            <a href="${link}">
            <table cellpadding="0" cellspacing="0" border="0" style="min-height: 640px; min-width: 360px">
                <tbody>
                <tr>
                    <td aria-label="videoPreviewImage" style="background-image: url(${poster}); background-repeat: no-repeat; background-size: cover; background-position: center; border-radius: 25px; min-width: 100%;">
                    <span style="display: none">.</span>
                    <!--[if gte mso 9]>
                        <v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPreview" src="${poster}" style="behavior: url(#default#VML); height: {@height}; width: {@width}; top: 0; left: 0; border: 0; z-index: 1;"/>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="false" stroke="false" style="position: relative;">
                        <![endif]-->
                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="min-width: 100%">
                        <tbody>
                        <tr>
                            <td height="640" width="360" background="https://apigoswirl.com/assets/vivo/play-icon.webp" style="background-image: url(https://apigoswirl.com/assets/vivo/play-icon.webp); background-repeat: no-repeat; background-position: center; position: relative; display: inline-block; height: 640px; width:360px; min-width: 100%;">
                            <!--[if gte mso 9]><v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPlayButton" src={@button_url} style="behavior: url(#default#VML); position: absolute; top: {floor((@height/2)-40)}px; left:  {floor((@width/2)-40)}px; height: 80px; width: 80px; "/><![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--[if gte mso 9]></v:rect><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
            </a>
        </center>
    `;

    let htmlEditor = CodeMirror.fromTextArea(tArea, {
        mode: 'text/html'
    });
    copyFormattedHtmlssv13(htmlEditor.getValue());
    document.body.removeChild(tc);

    videoAlertssv13('Embed code copied!', 2000, '', 'L');
}

function copyFormattedHtmlssv13(html) {
    // Create an iframe (isolated container) for the HTML
    let container = document.createElement('div');
    container.innerHTML = html;

    // Hide element
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = 0;

    // Detect all style sheets of the page
    let activeSheets = Array.prototype.slice.call(document.styleSheets)
        .filter(function (sheet) {
            return !sheet.disabled;
        })

    // Mount the iframe to the DOM to make `contentWindow` available
    document.body.appendChild(container);

    // Copy to clipboard
    window.getSelection().removeAllRanges();

    let range = document.createRange();
    range.selectNode(container);
    window.getSelection().addRange(range);

    document.execCommand('copy');
    // for (let i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
    document.execCommand('copy');
    // for (let i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false

    // Remove the iframe
    document.body.removeChild(container);
}

function toggleVideoThumbssv13(btn) {
    let sBoard = btn.closest('.video-modal-structure-ssv13').querySelector('.video-modal-sl-thumbs-block-ssv13');
    sBoard.style.width = '100%';
    sBoard.style.overflowY = 'scroll';
    sBoard.style.transform = 'translateX(0)';
    btn.style.display = 'none';
    setTimeout(() => {
        sBoard.style.width = 'auto';
        sBoard.style.width = 'max-content';
        sBoard.style.overflowY = 'visible';
        sBoard.style.transform = 'translateX(-100%)';
        btn.style.display = 'block';
    }, 4000);
}

function openAIChatMssv13(btn) {

    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';

    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-ssv13`).style.display = 'block';

    btn.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(0%)';

    disableSwiperssv13();
}

function openPhoneProductDetailssv13(pc, n, pn) {
    if (event.target.classList.contains('JS-pc-ignore-ssv13')) return;

    pc.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';

    let pMaster = pc.closest('.video-modal-structure-ssv13').querySelectorAll('.JS-product-master-ssv13')[n];

    pMaster.querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelector('.JS-product-section-ssv13').style.display = 'block';

    pMaster.querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[pn].style.display = 'block';

    pc.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(0%)';

    disableSwiperssv13();
}

function openCommentssv13(btn, n) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';

    let pMaster = btn.closest('.video-modal-structure-ssv13').querySelectorAll('.JS-product-master-ssv13')[n];

    pMaster.querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelector('.JS-comment-section-ssv13').style.display = 'block';

    btn.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(0%)';

    disableSwiperssv13();
}

function addCommentsListnerssv13(vId) {
    ssv13_commentsLoaded.push(vId);
    ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).collection('comments').orderBy('isPinned', 'desc').orderBy('createdAt', 'desc').limit(30).onSnapshot((snapshot) => {
        if (snapshot.size) {
            let commentsAll = snapshot.docChanges().reverse();
            commentsAll.forEach((change) => {
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).style.display = 'none';
                let comment = change.doc.data();
                let cId = change.doc.id;
                let cMaster = document.querySelector(`.JS-comments-${vId}-ssv13`);
                if (change.type === "added") {
                    // console.log("New document: ", change.doc.data());                                                    
                    comment.comment = replaceUrlsWithAnchorssv13(comment.comment);

                    let cProfile = typeof comment.brand_logo != 'undefined' ? `
                        <img src="${comment.brand_logo}" alt="Brand logo" title="Brand logo" />
                        ` : `
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_284_9460)">
                                <circle cx="15" cy="15.6431" r="15" fill="#E8E8E8" />
                            </g>
                            <g clip-path="url(#clip0_284_9460)">
                                <path
                                    d="M9.66699 22.3096C9.66699 20.8951 10.2289 19.5385 11.2291 18.5383C12.2293 17.5381 13.5858 16.9762 15.0003 16.9762C16.4148 16.9762 17.7714 17.5381 18.7716 18.5383C19.7718 19.5385 20.3337 20.8951 20.3337 22.3096H19.0003C19.0003 21.2487 18.5789 20.2313 17.8288 19.4811C17.0786 18.731 16.0612 18.3096 15.0003 18.3096C13.9395 18.3096 12.922 18.731 12.1719 19.4811C11.4218 20.2313 11.0003 21.2487 11.0003 22.3096H9.66699ZM15.0003 16.3096C12.7903 16.3096 11.0003 14.5196 11.0003 12.3096C11.0003 10.0996 12.7903 8.30957 15.0003 8.30957C17.2103 8.30957 19.0003 10.0996 19.0003 12.3096C19.0003 14.5196 17.2103 16.3096 15.0003 16.3096ZM15.0003 14.9762C16.4737 14.9762 17.667 13.7829 17.667 12.3096C17.667 10.8362 16.4737 9.6429 15.0003 9.6429C13.527 9.6429 12.3337 10.8362 12.3337 12.3096C12.3337 13.7829 13.527 14.9762 15.0003 14.9762Z"
                                    fill="#747477" />
                            </g>
                            <defs>
                                <filter id="filter0_b_284_9460" x="-10" y="-9.35693" width="50"
                                    height="50" filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
                                    <feComposite in2="SourceAlpha" operator="in"
                                        result="effect1_backgroundBlur_284_9460" />
                                    <feBlend mode="normal" in="SourceGraphic"
                                        in2="effect1_backgroundBlur_284_9460" result="shape" />
                                </filter>
                                <clipPath id="clip0_284_9460">
                                    <rect width="16" height="16" fill="white"
                                        transform="translate(7 7.64307)" />
                                </clipPath>
                            </defs>
                        </svg>
                    `;
                    let cCard = `
                        <div class="video-modal-sr-pb-comment-card-ssv13">
                            <div class="video-modal-sr-pb-cc-profile-ssv13">
                                ${cProfile}
                            </div>
                            <div class="video-modal-sr-pb-cc-content-ssv13">
                                <h4 class="video-modal-sr-pb-cc-user-ssv13">
                                    ${comment.uName}
                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.643066" width="4" height="4" rx="2" fill="#8B8B8E" />
                                    </svg>
                                    <label>${getTimeAgossv13(comment.createdAt)}</label>
                                </h4>
                                <p class="video-modal-sr-pb-cc-comment-ssv13">${comment.comment}</p>
                                <svg class="video-modal-sr-pb-cc-pin-ssv13" width="13" height="14"
                                    viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.8764 6.42442L11.9331 7.36709L11.4618 6.89576L8.63377 9.72376L8.16244 12.0811L7.2191 13.0238L4.3911 10.1951L1.0911 13.4951L0.148438 12.5524L3.44844 9.25242L0.619771 6.42442L1.56244 5.48109L3.92044 5.00976L6.74844 2.18176L6.2771 1.71042L7.21977 0.76709L12.8764 6.42442Z"
                                        fill="#334499" />
                                </svg>
                            </div>
                        </div>
                    `;

                    let cDiv = document.createElement('div');
                    cDiv.classList.add('JS-r-comment');
                    cDiv.classList.add('JS-comments-all');
                    cDiv.id = `JS-comment-${cId}`;
                    cDiv.innerHTML = cCard;
                    cMaster.appendChild(cDiv);

                    if (comment.isPinned == '1') {
                        // Clone same div
                        let oComment = document.querySelector(`#JS-comment-${cId}`);
                        let pComment = oComment.cloneNode(true);
                        pComment.classList.remove('JS-r-comment');
                        pComment.classList.add('JS-p-comment');
                        pComment.classList.add('JS-comments-all');
                        pComment.id = `JS-comment-p-${cId}`;
                        pComment.querySelector('.video-modal-sr-pb-comment-card-ssv13').classList.add('pinned-ssv13');

                        let rCommentsAll = document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-r-comment`);
                        if (rCommentsAll.length) {
                            cMaster.insertBefore(pComment, rCommentsAll[0]);
                        } else {
                            cMaster.appendChild(pComment);
                        }

                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) + 1);
                    }

                    let elmHeight = cMaster.scrollHeight;
                    cMaster.scrollTop = elmHeight;
                }
                if (change.type === "modified") {
                    // console.log("Modified document: ", change.doc.data());
                    if (comment.isPinned == '1') {
                        // Clone same div
                        let oComment = document.querySelector(`#JS-comment-${cId}`);
                        let pComment = oComment.cloneNode(true);
                        pComment.classList.remove('JS-r-comment');
                        pComment.classList.add('JS-p-comment');
                        pComment.classList.add('JS-comments-all');
                        pComment.id = `JS-comment-p-${cId}`;
                        pComment.querySelector('.video-modal-sr-pb-comment-card-ssv13').classList.add('pinned-ssv13');

                        let rCommentsAll = document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-r-comment`);
                        if (rCommentsAll.length) {
                            cMaster.insertBefore(pComment, rCommentsAll[0]);
                        } else {
                            cMaster.appendChild(pComment);
                        }

                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) + 1);
                    }

                    if (comment.isPinned == '0') {
                        document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-p-${cId}`).remove();
                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) - 1);
                    }
                }
                if (change.type === "removed") {
                    // console.log("Removed document: ", change.doc.data());                    
                    let cr = document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-${cId}`);
                    let cp = document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-p-${cId}`);
                    if (cr) cr.remove();
                    if (cp) cp.remove();
                }
            });
            if (document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-comments-all`).length == 0) {
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).style.display = 'block';
            }
        } else {
            document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
        }
    }, (error) => {
        console.log(`Video ${vId}: Comments fetch failed: ${error}`);
    });
}

function loadCommentssv13(vId) {
    // Check if the document exists
    ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            // Listner
            if (!ssv13_commentsLoaded.includes(vId)) {
                addCommentsListnerssv13(vId);
            }
        } else {
            document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
        }
    }).catch((error) => {
        console.log(`Video ${vId}: Comments fetch failed: ${error}`);
    });
}

let postUserVerificationAction = 0;
function addUserssv13(frm) {
    event.preventDefault();
    let uName = frm.querySelector('.uvf-input-fname-ssv13').value;
    let uPhone = frm.querySelector('.uvf-input-phone-ssv13').value;
    let uPhoneCode = frm.querySelector('.country-selected-ssv13 i').dataset.code;

    let regName = /^[a-zA-Z ]+$/;
    if (!uName.match(regName)) {
        videoAlertssv13('Please enter valid name.', 2000, frm);
        return false;
    }
    let regPhone = /^\d{10}$/;
    if (!uPhone.match(regPhone)) {
        videoAlertssv13('Please enter valid phone number.', 2000, frm);
        return false;
    }

    let uData = {
        uName: uName,
        uPhone: uPhone,
        uPhoneCode: uPhoneCode
    }

    ssv13_userData = uData;
    localStorage.setItem('ssv13_user', JSON.stringify(uData));
    frm.closest('.user-verification-form-ssv13').querySelector('.uvf-close-btn-ssv13').dispatchEvent(new Event('click'));

    if (postUserVerificationAction === 1) {
        document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sr-pb-cf-btn-ssv13 button`)[ssv13_swiper_modal[ssv13_currentModal].activeIndex].dispatchEvent(new Event('click'));
    } else if (postUserVerificationAction === 2) {
        document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-form-ssv13 button`).click();
    }

    return false;
}

function addCommentssv13(vId, frm) {
    let inp = frm.querySelector('input');
    if (inp.value == '') { inp.reportValidity(); return false; }

    if (ssv13_userData) {
        let cData = {
            uName: ssv13_userData.uName,
            uPhone: ssv13_userData.uPhone,
            uPhoneCode: ssv13_userData.uPhoneCode,
            comment: inp.value,
            createdAt: new Date().getTime(),
            isPinned: 0
        }

        try {
            ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).set({}).then(() => {
                ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).collection("comments").add(cData).then((vcref) => {
                    if (!ssv13_commentsLoaded.includes(vId)) {
                        addCommentsListnerssv13(vId);
                    }
                }).catch((error) => {
                    console.log("Error adding video comment document: ", error);
                });
            }).catch((error) => {
                console.log("Error adding video comment document: ", error);
            });
        } catch (error) {
            console.log("Error adding video comment document: ", error);
        }
        inp.value = '';
    } else {
        postUserVerificationAction = 1;
        openUserVerificationssv13();
    }

    return false;
}

function openReviewSliderssv13(btn) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13').style.transform = 'translateY(0%)';

    btn.closest('.video-modal-sl-video-container-ssv').querySelectorAll('.video-modal-pr-bottom-ssv13').forEach(e => {
        e.scrollTop = 0;
    });

    let slide = ssv13_swiper_modal[ssv13_currentModal].slides[ssv13_swiper_modal[ssv13_currentModal].activeIndex];
    let vId = slide.querySelector('video').dataset.id;
    ssv13_swiper_review[`sw${vId}-${ssv13_currentModal}`].slideTo(ssv13_swiper_product[`sw${vId}-${ssv13_currentModal}`].activeIndex);

    disableSwiperssv13();
}

function changeQtyssv13(action, btn) {
    let qtyLimit = 10;
    let qInp = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-val-ssv13');
    let minus = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-minus-ssv13');
    let plus = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-plus-ssv13');
    let cVal = parseInt(qInp.value);
    if (action == 'minus') {
        qInp.value = (cVal - 1);
    } else if (action == 'plus') {
        qInp.value = (cVal + 1);
    }
    if (qInp.value == 1) { minus.disabled = true; } else { minus.disabled = false; }
    if (qInp.value == qtyLimit) { plus.disabled = true; } else { plus.disabled = false; }
}

let graphqlCartId = '';
function addtocartssv13(videoId, productId, skuCode, btn, qty = 0) {
    productId = ssv13_productIds[productId];

    let quantity = qty ? qty : btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.qty-val-ssv13').value;

    let aPopup = btn.classList.contains('video-modal-sr-pb-pi-cta-cart-ssv13') ? true : false;

    let btnText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `
        <svg style="height: 35px; width: 35px; padding: 0;" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <path fill="#131306" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
    `;

    if (ssv13_storeType == '1') {  // Shopify        
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            })
        }).then(response => {
            if (!response.ok) {
                console.log('SSV Add to cart: Network response was not ok');
                btn.innerHTML = btnText;
                btn.disabled = false;
                videoAlertssv13('Failed to add.', 2000, btn);
            }
            return response.json();
        }).then(response => {
            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
            updateShopifyCartssv();
        }).catch(error => {
            // Handle error
            console.log('SSV Add to cart: There was a problem with the fetch operation: ' + error);
            btn.innerHTML = btnText;
            btn.disabled = false;
            videoAlertssv13('Sold out.', 2000, btn);
        });
    } if (ssv13_storeType == '2') {  // Woo commerse
        if (ssv13_brandCustomizations.ajax_cart_class == '') {
            // if ('undefined' === typeof wc_add_to_cart_params) {
            //     return false;
            // }
            // let data = {
            //     product_id: productId,
            //     quantity: quantity,
            // };
            // jQuery.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), data, function (response) {
            //     if (!response) {
            //         videoAlertssv13('Faied to add.', 2000, btn);
            //         return;
            //     }
            //     if (response.error && response.product_url) {
            //         videoAlertssv13('Out of stock.', 2000, btn);
            //     } else {
            //         videoAlertssv13('Added to cart.', 2000, btn);                    
            //         jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash]);
            //         if (ssv13_brandCustomizations.dot_class) {
            //             if (jQuery(`.${ssv13_brandCustomizations.dot_class}`).length > 0) {
            //                 jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv13_brandCustomizations.dot_class}`).html()));
            //             }
            //         }
            //     }
            //     jQuery(btn).html(ssv13_brandCustomizations.add_to_cart_btn);
            //     jQuery(btn).removeAttr('disabled');
            //     jQuery('.quantity-inp-ssv').val('1');
            //     return
            // });
            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
        } else {
            let aTag = document.createElement('a');
            aTag.href = '/?add-to-cart=' + productId;
            aTag.setAttribute('data-quantity', quantity);
            aTag.setAttribute('data-product_id', productId);

            document.body.appendChild(aTag);

            aTag.dispatchEvent(new Event('click'));

            document.body.removeChild(aTag);

            setTimeout(() => {
                btn.innerHTML = btnText;
                btn.disabled = false;
                if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                    openCartPopupssv13();
                } else {
                    videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
                }
            }, 1500);
        }
    } if (ssv13_storeType == '6') {  // NNNow                 
        let sOp = !qty ? btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-attrselection-ssv13 p.selected-ssv13') : '';
        skuCode = qty ? productId : sOp.dataset.sku;

        if (getCookiessv13('accessToken')) { // logged in              
            let accessT = getCookiessv13('accessToken');

            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessT}`);
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Module", "odin");

            let raw = JSON.stringify({
                "products": [
                    {
                        "skuId": skuCode,
                        "qty": quantity
                    }
                ]
            });

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.nnnow.com/d/api/myBag/v3", requestOptions).then(response => response.text()).then(result => {
                if (result.status == true) {
                    btn.innerHTML = btnText;
                    btn.disabled = false;
                    if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                        openCartPopupssv13();
                    } else {
                        videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
                    }
                    updateVideoCartCountssv13(response.data.bagTotalItemCount);
                } else {
                    videoAlertssv13('Faied to add.', 2000, btn);
                }
            }).catch(error => { videoAlertssv13('Faied to add.', 2000, btn); });
        } else { // logout            
            let cg = '';
            let bagC = 0;
            let newCG = [];
            let cgMatch = false;
            if (getCookiessv13('cart-guest')) {
                cg = JSON.parse(getCookiessv13('cart-guest'));
                cg.forEach(cgi => {
                    bagC += cgi.qty;
                    if (cgi.skuId == skuCode) {
                        cgi.qty += quantity;
                        cgMatch = true;
                    }
                    newCG.push(cgi);
                });
                if (!cgMatch) {
                    newCG.push({ skuId: skuCode, qty: quantity });
                }
                cg = newCG;
                cg = JSON.stringify(cg);
                bagC += quantity;
            } else {
                cg = JSON.stringify([{ skuId: skuCode, qty: quantity }]);
                bagC = quantity;
            }

            setCookiessv13('cart-guest', cg, 365, '.nnnow.com');

            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
            updateVideoCartCountssv13(bagC);
        }
    }

    // setTimeout(() => {
    //     btn.innerHTML = btnText;
    //     btn.disabled = false;
    // }, 2000);
}

function updateVideoCartCountssv13(cnt) {
    document.querySelectorAll('.cart-count-ssv13').forEach(elm => {
        elm.innerHTML = cnt;
    });
}
function updateShopifyCartssv() {
    fetch('/cart.js', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('SSV fetch cart: Network response was not ok');
        }
        return response.json();
    }).then(data => {
        updateVideoCartCountssv13(data.item_count);
    }).catch(error => {
        console.log('SSV fetch cart: There was a problem with the fetch operation:' + error);
    });
}

function countryDropdownssv13(selector, drp) {
    let Selected = document.querySelector(selector);
    let Drop = document.querySelector(drp);
    let DropItem = Drop.querySelectorAll('li');

    Selected.addEventListener('click', function () {
        Selected.classList.toggle('open-ssv13');
        if (Drop.style.display === 'none') {
            Drop.style.display = 'block';
        } else {
            Drop.style.display = 'none';
        }
    });

    Drop.querySelectorAll('li').forEach(function (item) {
        item.addEventListener('click', function () {
            Selected.classList.remove('open-ssv13');
            Drop.style.display = 'none';
            Selected.innerHTML = `
                <i class="${item.querySelector('i').getAttribute('class')}" data-code="${item.dataset.code}"></i>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.99956 3.879L8.71206 0.166504L9.77256 1.227L4.99956 6L0.226562 1.227L1.28706 0.166504L4.99956 3.879Z"
                        fill="#A2A2A4" />
                </svg>
            `;
        });
    });
}

function CTAClickssv13(pId, dId, vId, cType) {
    let requestData = new URLSearchParams();
    requestData.append('designer_id', dId);
    requestData.append('product_id', pId);
    requestData.append('user_id', '');
    requestData.append('video_id', vId);
    requestData.append('type', cType);

    // Send the POST request using Fetch API
    fetch('https://api.goswirl.live/index.php/shopify/actionbuttons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestData.toString()
    }).then(response => {
        if (!response.ok) {
            console.log('SSV CTA store: Network response was not ok');
        }
        return response.json();
    }).then(data => { }).catch(error => {
        console.error('SSV CTA store: Track failed!' + error);
    });
}

function sendAIChatssv13() {
    event.preventDefault();

    if (ssv13_userData) {
        let inp = event.target.querySelector('input');
        let msg = inp.value;
        let chat = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .AI-chatbox-chat-ssv13`);

        inp.value = '';
        chat.querySelector('.AI-chatbox-chat-card-temp-ssv13')?.remove();
        msg = replaceUrlsWithAnchorssv13(msg);

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();

        chat.innerHTML += `
            <div class="AI-chatbox-chat-card-ssv13 card-R">                                        
                <p>${msg}</p>
                <label>${h}:${m}</label>
            </div>
        `;

        chat.innerHTML += `
            <div class="AI-chatbox-chat-card-ssv13 AI-chatbox-chat-card-temp-ssv13 card-L">   
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="34" rx="17" fill="#EBECF5"/>
                    <g clip-path="url(#clip0_3399_38954)">
                    <path d="M20 12.0176C21.0096 12.0176 21.8281 11.1991 21.8281 10.1895H22.6719C22.6719 11.1991 23.4903 12.0176 24.5 12.0176V12.8613C23.4903 12.8613 22.6719 13.6798 22.6719 14.6895H21.8281C21.8281 13.6798 21.0096 12.8613 20 12.8613V12.0176ZM10.25 16.9395C12.7353 16.9395 14.75 14.9247 14.75 12.4395H16.25C16.25 14.9247 18.2647 16.9395 20.75 16.9395V18.4395C18.2647 18.4395 16.25 20.4542 16.25 22.9395H14.75C14.75 20.4542 12.7353 18.4395 10.25 18.4395V16.9395ZM13.157 17.6895C14.1404 18.2352 14.9543 19.0491 15.5 20.0325C16.0457 19.0491 16.8596 18.2352 17.843 17.6895C16.8596 17.1438 16.0457 16.3299 15.5 15.3465C14.9543 16.3299 14.1404 17.1438 13.157 17.6895ZM22.4375 19.1895C22.4375 20.5356 21.3462 21.627 20 21.627V22.752C21.3462 22.752 22.4375 23.8433 22.4375 25.1895H23.5625C23.5625 23.8433 24.6538 22.752 26 22.752V21.627C24.6538 21.627 23.5625 20.5356 23.5625 19.1895H22.4375Z" fill="url(#paint0_linear_3399_38954)"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_3399_38954" x1="9.99213" y1="23.8258" x2="26.2139" y2="23.8654" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#4568DC"/>
                    <stop offset="1" stop-color="#B06AB3" stop-opacity="0.98"/>
                    </linearGradient>
                    <clipPath id="clip0_3399_38954">
                    <rect width="18" height="18" fill="white" transform="translate(8 8)"/>
                    </clipPath>
                    </defs>
                </svg>    
                <p>     
                    <svg class="AI-chatbox-boat-typing-ssv13" height="15" width="40" class="loader">
                        <circle class="AI-chatbox-boat-typing-dot-ssv13" cx="10" cy="10" r="3" style="fill:grey;" />
                        <circle class="AI-chatbox-boat-typing-dot-ssv13" cx="20" cy="10" r="3" style="fill:grey;" />
                        <circle class="AI-chatbox-boat-typing-dot-ssv13" cx="30" cy="10" r="3" style="fill:grey;" />
                    </svg>
                </p>
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

        // API CALL
        let pr = {};
        let video = ssv13_swiper_modal[ssv13_currentModal].slides[ssv13_swiper_modal[ssv13_currentModal].activeIndex];
        let videoId = video.querySelector('.video-modal-sl-video-ssv13').dataset.id;
        pr.product_details = ssv13_productsAll[videoId];
        pr.message = msg;
        let prId = typeof ssv13_productsAll[videoId][0] != 'undefined' ? ssv13_productsAll[videoId][0].product_id : 0;

        const xhr = new XMLHttpRequest();
        const url = "https://v5ywnvc7ve.execute-api.ap-south-1.amazonaws.com/api/swirl/completions?prefix=swirlsales&phone_no=911234500010&product_id=" + prId;
        const data = JSON.stringify(pr);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === "success") {
                        let reply = replaceUrlsWithAnchorssv13(response.data);
                        chat.innerHTML += `
                            <div class="AI-chatbox-chat-card-ssv13 card-L">   
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="34" height="34" rx="17" fill="#EBECF5"/>
                                    <g clip-path="url(#clip0_3399_38954)">
                                    <path d="M20 12.0176C21.0096 12.0176 21.8281 11.1991 21.8281 10.1895H22.6719C22.6719 11.1991 23.4903 12.0176 24.5 12.0176V12.8613C23.4903 12.8613 22.6719 13.6798 22.6719 14.6895H21.8281C21.8281 13.6798 21.0096 12.8613 20 12.8613V12.0176ZM10.25 16.9395C12.7353 16.9395 14.75 14.9247 14.75 12.4395H16.25C16.25 14.9247 18.2647 16.9395 20.75 16.9395V18.4395C18.2647 18.4395 16.25 20.4542 16.25 22.9395H14.75C14.75 20.4542 12.7353 18.4395 10.25 18.4395V16.9395ZM13.157 17.6895C14.1404 18.2352 14.9543 19.0491 15.5 20.0325C16.0457 19.0491 16.8596 18.2352 17.843 17.6895C16.8596 17.1438 16.0457 16.3299 15.5 15.3465C14.9543 16.3299 14.1404 17.1438 13.157 17.6895ZM22.4375 19.1895C22.4375 20.5356 21.3462 21.627 20 21.627V22.752C21.3462 22.752 22.4375 23.8433 22.4375 25.1895H23.5625C23.5625 23.8433 24.6538 22.752 26 22.752V21.627C24.6538 21.627 23.5625 20.5356 23.5625 19.1895H22.4375Z" fill="url(#paint0_linear_3399_38954)"/>
                                    </g>
                                    <defs>
                                    <linearGradient id="paint0_linear_3399_38954" x1="9.99213" y1="23.8258" x2="26.2139" y2="23.8654" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4568DC"/>
                                    <stop offset="1" stop-color="#B06AB3" stop-opacity="0.98"/>
                                    </linearGradient>
                                    <clipPath id="clip0_3399_38954">
                                    <rect width="18" height="18" fill="white" transform="translate(8 8)"/>
                                    </clipPath>
                                    </defs>
                                </svg>    
                                <p>     
                                    ${reply}
                                </p>
                            </div>
                        `;
                    }
                } else {
                    // Handle error
                    chat.innerHTML += `
                        <div class="AI-chatbox-chat-card-ssv13 card-L">   
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="34" height="34" rx="17" fill="#EBECF5"/>
                                <g clip-path="url(#clip0_3399_38954)">
                                <path d="M20 12.0176C21.0096 12.0176 21.8281 11.1991 21.8281 10.1895H22.6719C22.6719 11.1991 23.4903 12.0176 24.5 12.0176V12.8613C23.4903 12.8613 22.6719 13.6798 22.6719 14.6895H21.8281C21.8281 13.6798 21.0096 12.8613 20 12.8613V12.0176ZM10.25 16.9395C12.7353 16.9395 14.75 14.9247 14.75 12.4395H16.25C16.25 14.9247 18.2647 16.9395 20.75 16.9395V18.4395C18.2647 18.4395 16.25 20.4542 16.25 22.9395H14.75C14.75 20.4542 12.7353 18.4395 10.25 18.4395V16.9395ZM13.157 17.6895C14.1404 18.2352 14.9543 19.0491 15.5 20.0325C16.0457 19.0491 16.8596 18.2352 17.843 17.6895C16.8596 17.1438 16.0457 16.3299 15.5 15.3465C14.9543 16.3299 14.1404 17.1438 13.157 17.6895ZM22.4375 19.1895C22.4375 20.5356 21.3462 21.627 20 21.627V22.752C21.3462 22.752 22.4375 23.8433 22.4375 25.1895H23.5625C23.5625 23.8433 24.6538 22.752 26 22.752V21.627C24.6538 21.627 23.5625 20.5356 23.5625 19.1895H22.4375Z" fill="url(#paint0_linear_3399_38954)"/>
                                </g>
                                <defs>
                                <linearGradient id="paint0_linear_3399_38954" x1="9.99213" y1="23.8258" x2="26.2139" y2="23.8654" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4568DC"/>
                                <stop offset="1" stop-color="#B06AB3" stop-opacity="0.98"/>
                                </linearGradient>
                                <clipPath id="clip0_3399_38954">
                                <rect width="18" height="18" fill="white" transform="translate(8 8)"/>
                                </clipPath>
                                </defs>
                            </svg>    
                            <p>  
                                Sorry,<br>   
                                Unable to process you request now, try again or latter.
                            </p>
                        </div>
                    `;
                }
            }
            chat.querySelector('.AI-chatbox-chat-card-temp-ssv13')?.remove();
            chat.scrollTop = chat.scrollHeight;
        };

        xhr.send(data);
    } else {
        postUserVerificationAction = 2;
        openUserVerificationssv13();
    }
}

function disableSwiperssv13() {
    if (window.innerWidth <= 768) {
        ssv13_swiper_modal[ssv13_currentModal].allowSlideNext = false;
        ssv13_swiper_modal[ssv13_currentModal].allowSlidePrev = false;
        ssv13_swiper_modal[ssv13_currentModal].allowTouchMove = false;
    }
}

function enableSwiperssv13() {
    if (window.innerWidth <= 768) {
        ssv13_swiper_modal[ssv13_currentModal].allowSlideNext = true;
        ssv13_swiper_modal[ssv13_currentModal].allowSlidePrev = true;
        ssv13_swiper_modal[ssv13_currentModal].allowTouchMove = true;
    }
}

let allOverElements = [];
function disableScrollssv13() {
    let scrollPosition = [
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    let html = document.querySelector('html');
    html.setAttribute('data-scroll-position', JSON.stringify(scrollPosition));
    html.setAttribute('data-previous-overflow', html.style.overflow);
    html.style.overflow = 'hidden';
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Exclude
    let clientImpClasses = [];
    if (ssv13_storeType == '1' && ssv13_brandCustomizations.dot_class) {
        ssv13_brandCustomizations.dot_class.split(',').forEach(cls => {
            clientImpClasses.push(cls.trim());
        });
    }

    // hide all fixed visible elements
    allOverElements = [];
    document.querySelectorAll('*').forEach(function (el) {
        if (window.getComputedStyle(el).position === 'fixed' && el.offsetParent !== null && el.offsetWidth > 0 && el.offsetHeight > 0) {
            let classof = el.classList.length > 0 ? el.classList[0] : 'NoClass';
            if (!el.classList.contains('video-modal-ssv13') && !el.classList.contains('swirl-short-video-pip-ssv13') && !clientImpClasses.includes(classof)) {
                el.classList.add('hide-over-ssv13');
                allOverElements.push(el);
            }
        }

        if (window.getComputedStyle(el).position === 'sticky' && el.offsetParent !== null && el.offsetWidth > 0 && el.offsetHeight > 0) {
            let classof = el.classList.length > 0 ? el.classList[0] : 'NoClass';
            if (!el.classList.contains('video-modal-ssv13') && !el.classList.contains('swirl-short-video-pip-ssv13') && !clientImpClasses.includes(classof)) {
                el.classList.add('hide-over-ssv13');
                allOverElements.push(el);
            }
        }
    });
}

function enableScrollssv13() {
    let html = document.querySelector('html');
    let scrollPosition = JSON.parse(html.getAttribute('data-scroll-position'));
    html.style.overflow = html.getAttribute('data-previous-overflow');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    allOverElements.forEach(function (el) {
        el.classList.remove('hide-over-ssv13');
    });
}

function setPopupHightssv13() {
    document.querySelectorAll('.video-modal-ssv13').forEach(elm => {
        elm.style.height = window.innerHeight + 'px';
        elm.style.width = window.innerWidth + 'px';
    });
}

function setNavigationIconssv13(vdo) {
    if (ssv13_brandCustomizations.next_previous_preview == '0') {
        let btnNext = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-next-ssv13-m`);
        let btnPrev = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-prev-ssv13-m`);
        let half = Math.floor(vdo.clientWidth / 2) + 15;
        btnNext.style.right = `calc(50% - ${half}px - 50px)`;
        btnPrev.style.left = `calc(50% - ${half}px - 50px)`;
    } else {
        let btnNext = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-next-ssv13-m`);
        let btnPrev = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-prev-ssv13-m`);
        let half = Math.floor(vdo.clientWidth / 2) + 15;
        btnNext.style.right = `0`;
        btnNext.style.width = `calc(50% - ${half}px)`;
        btnNext.style.top = `0`;
        btnNext.style.margin = `0`;
        btnNext.style.height = `100%`;
        btnNext.style.justifyContent = `left`;
        btnNext.style.cursor = `default`;
        btnNext.querySelector('svg').style.width = `auto`;
        btnNext.querySelector('svg').style.cursor = `pointer`;

        btnPrev.style.left = `0`;
        btnPrev.style.width = `calc(50% - ${half}px)`;
        btnPrev.style.top = `0`;
        btnPrev.style.margin = `0`;
        btnPrev.style.height = `100%`;
        btnPrev.style.justifyContent = `right`;
        btnPrev.style.cursor = `default`;
        btnPrev.querySelector('svg').style.width = `auto`;
        btnPrev.querySelector('svg').style.cursor = `pointer`;
    }
}

addEventListener('keydown', function (event) {
    if (event.key === "Escape" && ssv13_modalState) {
        closeVideoModalssv13(true);
    } else if (event.keyCode == 37 && ssv13_modalState) {
        ssv13_swiper_modal[ssv13_currentModal].slidePrev(); //on left arrow
    } else if (event.keyCode == 39 && ssv13_modalState) {
        ssv13_swiper_modal[ssv13_currentModal].slideNext(); //on right arrow
    }
});

addEventListener('resize', (event) => {
    setPopupHightssv13();
    updateCarouselVideoHeightssv13(ssv13_currentModal);
    updateModalVideoHeightssv13(ssv13_currentModal);
});