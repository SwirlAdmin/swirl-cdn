// SWIRL PDP AI SECTION V1 [KRISAH]
let svez_masterElm = null;
let svez_masterModalElm = null;
let svez_pdpId = '';
let svez_aiData = [];
let svez_swiperC = [];
let svez_swiperM = [];
let svez_sessionId = generateUUIDsvez();
let svez_mmc = 0;
let svez_curentMM = 0;
let svez_allOverElements = [];

(() => {
    // CSS    
    var jqTag = '';
    jqTag = document.createElement('link');
    jqTag.rel = 'stylesheet';
    jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/krisah/style-v1.min.css';
    document.head.appendChild(jqTag);

    // JS
    let JSLOAD1 = false;
    jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/short_video/v13/swiper.min.js';
    document.head.appendChild(jqTag);
    jqTag.onload = function () { JSLOAD1 = true; };

    let ScriptsLOADED = setInterval(() => {
        if (JSLOAD1) {
            initsvez();
            clearInterval(ScriptsLOADED);
        }
    }, 50);

    // Markdown CDN
    jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    document.head.appendChild(jqTag);

    // HLS
    // jqTag = document.createElement('script');
    // jqTag.rel = 'text/javascript';
    // jqTag.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    // document.head.appendChild(jqTag);
})();

function generateUUIDsvez() {
    var d = new Date().getTime();
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1e3) ||
        0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 3) | 8).toString(16);
    });
}

function initsvez() {
    svez_masterElm = document.querySelector('#swirl-pdp-ai-svez');
    if (svez_masterElm == null) {
        console.log('SVEZ: Div missing.');
        return;
    }

    svez_pdpId = svez_masterElm.dataset.id;

    // API CALL
    let requestOptions = {
        method: 'GET',
        headers: new Headers(),
        redirect: 'follow',
    };
    fetch(`https://krisah-api.goswirl.in/ai?query=&sessionId=${svez_sessionId}&productId=${svez_pdpId}&prompts=true`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                svez_aiData = result;
                generatesvez(result.data);
            } else {
                console.log('SVEZ: Data not found.');
            }
        })
        .catch(error => {
            console.log(error);
            console.log('SVEZ: Failed to fetch data.');
            return;
        });
}

function generatesvez(aiData) {
    // VEZ    
    let prompts = '';
    if (Object.keys(aiData.prompts).length) {
        aiData.prompts.forEach(p => {
            prompts += `
                <p class="ai-prompt-que-svez" data-pr="${p}" onclick="fetchPromptDatasvez(this);">${p}</p>
            `;
        });
    }
    let pdpHtml = `
        <div class="root-elm-svez pdp-ai-section-svez">
            <div class="heading-svez">
                <div class="head-left-svez">
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/vitural.gif"
                        width="1" height="1" class="head-animation-gif-svez" style="display: none;" alt="Gif" />                                            
                    <p class="head-title-svez">
                        <svg class="head-svg-svez" width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.999 5.71533C28.6914 5.71533 30.874 3.53271 30.874 0.840332H33.124C33.124 3.53271 35.3066 5.71533 37.999 5.71533V7.96533C35.3066 7.96533 33.124 10.148 33.124 12.8403H30.874C30.874 10.148 28.6914 7.96533 25.999 7.96533V5.71533ZM-0.000976562 18.8403C6.62644 18.8403 11.999 13.4678 11.999 6.84033H15.999C15.999 13.4678 21.3716 18.8403 27.999 18.8403V22.8403C21.3716 22.8403 15.999 28.2129 15.999 34.8403H11.999C11.999 28.2129 6.62644 22.8403 -0.000976562 22.8403V18.8403ZM7.75104 20.8403C10.3734 22.2955 12.5439 24.4659 13.999 27.0883C15.4542 24.4659 17.6247 22.2955 20.247 20.8403C17.6247 19.3851 15.4542 17.2147 13.999 14.5924C12.5439 17.2147 10.3734 19.3851 7.75104 20.8403ZM32.499 24.8403C32.499 28.4301 29.5888 31.3403 25.999 31.3403V34.3403C29.5888 34.3403 32.499 37.2505 32.499 40.8403H35.499C35.499 37.2505 38.4092 34.3403 41.999 34.3403V31.3403C38.4092 31.3403 35.499 28.4301 35.499 24.8403H32.499Z" fill="#02212D"/>
                        </svg>
                        Virtual experience zone
                    </p>
                </div>
            </div>

            <div class="ai-prompts-svez">
                ${prompts}
            </div>

            <div class="ask-question-svez">                
                <input type="text" onkeydown="if (event.key === 'Enter' && !event.shiftKey && !event.metaKey) {event.preventDefault(); document.querySelector('.ask-question-submit-svez').dispatchEvent(new Event('click'));}" oninput="if(this.value.trim() == '') {document.querySelector('.ask-question-submit-svez').style.display = 'none';} else {document.querySelector('.ask-question-submit-svez').style.display = 'block';} document.querySelector('.ask-question-submit-svez').dataset.pr = this.value" class="ask-question-input-svez" placeholder="" />
                <svg onclick="fetchPromptDatasvez(this)" data-pr="" style="display: none;" class="ask-question-submit-svez" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.488 0.87723L26.104 14.4159C26.2085 14.4734 26.2957 14.558 26.3564 14.6607C26.4171 14.7634 26.4491 14.8806 26.4491 14.9999C26.4491 15.1192 26.4171 15.2364 26.3564 15.3391C26.2957 15.4418 26.2085 15.5263 26.104 15.5839L1.488 29.1226C1.3865 29.1784 1.2722 29.2068 1.15636 29.205C1.04053 29.2032 0.927163 29.1713 0.827435 29.1124C0.727708 29.0534 0.645062 28.9695 0.587645 28.8689C0.530227 28.7683 0.50002 28.6544 0.5 28.5386V1.46123C0.50002 1.34538 0.530227 1.23154 0.587645 1.13092C0.645062 1.03031 0.727708 0.946388 0.827435 0.88744C0.927163 0.828491 1.04053 0.796548 1.15636 0.794757C1.2722 0.792967 1.3865 0.821392 1.488 0.87723ZM3.16667 16.3332V25.1559L21.6333 14.9999L3.16667 4.8439V13.6666H9.83333V16.3332H3.16667Z" fill="#8B8B8E"/>
                </svg>
            </div>            
        </div>        
    `;

    let pdpCustomStyle = svez_masterElm.dataset.theme == 'BYD' ? `
        <style>
            .pdp-ai-section-svez {
                background: linear-gradient(98.82deg, #D6F2FA -5.35%, #E0F4F5 57.97%, #C5F8D6 128.23%);
                backdrop-filter: none;
            }

            .head-title-svez {
                text-align: center;
                font-size: 28px;
                color: #02212C;
            }

            .head-svg-svez {                
                display: inline-block !important;
            }

            .ask-question-svez { 
                background: #FFFFFF50;
                box-shadow: none;
            }

            .ai-prompt-que-svez {
                border: 1px solid #BDD9D9;
                background: #FFFFFF60;
                border-radius: 30px;
            }
                
            .pdp-ai-section-modal-container-svez { 
                background-image: url("data:image/svg+xml,%3Csvg%20width%3D%221440%22%20height%3D%22214%22%20viewBox%3D%220%200%201440%20214%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20filter%3D%22url(%23filter0_f_7256_3138)%22%3E%3Cpath%20d%3D%22M0%203H1521.84L1597.36%2063.4514C1602.53%2067.5934%201600.71%2075.8702%201594.28%2077.4625L1495.3%20101.958L1342.37%2069.0724L1098.27%20124.132C1087.02%20126.669%201075.31%20126.304%201064.25%20123.072L884.767%2070.6571C881.198%2069.6149%20877.436%2069.416%20873.777%2070.0762L691.962%20102.883C681.043%20104.853%20669.85%20104.74%20658.972%20102.551L527.696%2076.1297C519.351%2074.4502%20510.722%2074.8449%20502.565%2077.279L365.33%20118.234L205.494%2076.2038C198.844%2074.4552%20192.013%2073.492%20185.139%2073.3338L7.81591%2069.2523C3.47051%2069.1522%200%2065.6009%200%2061.2544V3Z%22%20fill%3D%22url(%23paint0_linear_7256_3138)%22%20fill-opacity%3D%220.8%22/%3E%3C/g%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_f_7256_3138%22%20x%3D%22-88%22%20y%3D%22-85%22%20width%3D%221776.36%22%20height%3D%22298.798%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22/%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22shape%22/%3E%3CfeGaussianBlur%20stdDeviation%3D%2244%22%20result%3D%22effect1_foregroundBlur_7256_3138%22/%3E%3C/filter%3E%3ClinearGradient%20id%3D%22paint0_linear_7256_3138%22%20x1%3D%22101.953%22%20y1%3D%22135.739%22%20x2%3D%221623.79%22%20y2%3D%22135.739%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.124%22%20stop-color%3D%22%23D7F2F9%22/%3E%3Cstop%20offset%3D%220.749%22%20stop-color%3D%22%23D7F5EB%22/%3E%3Cstop%20offset%3D%220.929%22%20stop-color%3D%22%23E6FCFF%22/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-size: contain;
            }
            
            @media only screen and (max-width: 768px) {
                .head-svg-svez {
                    height: 22px;
                    width: 35px;
                    margin-top: -5px !important;
                }
            }
        </style>
    ` : '';

    svez_masterElm.innerHTML = pdpHtml + pdpCustomStyle;

    // VEZ Modal
    let mDiv = document.createElement('div');
    mDiv.id = 'swirl-pdp-ai-m-svez';
    document.body.appendChild(mDiv);
    svez_masterModalElm = mDiv;

    let modalHtml = `
        <div class="root-elm-svez pdp-ai-section-modal-svez">
            <div class="pdp-ai-section-modal-container-svez">
                <div class="heading-svez">
                    <div class="head-left-svez">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/vitural.gif"
                            width="1" height="1" class="head-animation-gif-svez" style="display: none;" alt="Gif" />
                        <p class="head-title-svez" style="text-align: left;">
                            <svg class="head-svg-svez" width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.999 5.71533C28.6914 5.71533 30.874 3.53271 30.874 0.840332H33.124C33.124 3.53271 35.3066 5.71533 37.999 5.71533V7.96533C35.3066 7.96533 33.124 10.148 33.124 12.8403H30.874C30.874 10.148 28.6914 7.96533 25.999 7.96533V5.71533ZM-0.000976562 18.8403C6.62644 18.8403 11.999 13.4678 11.999 6.84033H15.999C15.999 13.4678 21.3716 18.8403 27.999 18.8403V22.8403C21.3716 22.8403 15.999 28.2129 15.999 34.8403H11.999C11.999 28.2129 6.62644 22.8403 -0.000976562 22.8403V18.8403ZM7.75104 20.8403C10.3734 22.2955 12.5439 24.4659 13.999 27.0883C15.4542 24.4659 17.6247 22.2955 20.247 20.8403C17.6247 19.3851 15.4542 17.2147 13.999 14.5924C12.5439 17.2147 10.3734 19.3851 7.75104 20.8403ZM32.499 24.8403C32.499 28.4301 29.5888 31.3403 25.999 31.3403V34.3403C29.5888 34.3403 32.499 37.2505 32.499 40.8403H35.499C35.499 37.2505 38.4092 34.3403 41.999 34.3403V31.3403C38.4092 31.3403 35.499 28.4301 35.499 24.8403H32.499Z" fill="#02212D"/>
                            </svg>
                            Virtual experience zone
                        </p>
                        <svg class="close-modal-svez" onclick="closeModalsvez();" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99962 4.82178L10.1246 0.696777L11.303 1.87511L7.17796 6.00011L11.303 10.1251L10.1246 11.3034L5.99962 7.17844L1.87462 11.3034L0.696289 10.1251L4.82129 6.00011L0.696289 1.87511L1.87462 0.696777L5.99962 4.82178Z" fill="#454549"></path>
                        </svg>
                    </div>                   
                </div>

                <div class="modal-prompt-answer-svez"></div>

                <div class="modal-skeleton-container-svez">
                    <div class="skeleton-title-svez"></div>
    
                    <div class="skeleton-media-svez">
                        <div class="skeleton-card-svez"></div>
                        <div class="skeleton-card-svez"></div>
                        <div class="skeleton-card-svez"></div>
                    </div>
                    
                    <div class="skeleton-head-svez"></div>
                    <div class="skeleton-paragraph-svez"></div>
                    <div class="skeleton-paragraph-svez" style="width: 30%;"></div>
                    <div class="skeleton-head-svez" style="width: 40%;"></div>
                    <div class="skeleton-paragraph-svez" style="width: 80%;"></div>
                </div>

                <div class="modal-pa-askque-svez">
                    <div class="modal-pa-askque-input-outer-svez">
                        <input type="text" class="modal-pa-askque-input-svez" placeholder="Have questions? Ask here! 🤔" onkeydown="if (event.key === 'Enter' && !event.shiftKey && !event.metaKey) {event.preventDefault(); document.querySelector('.ask-question-modal-submit-svez').dispatchEvent(new Event('click'));}"
                            oninput="if(this.value.trim() == '') {document.querySelector('.ask-question-modal-submit-svez').style.display = 'none';} else {document.querySelector('.ask-question-modal-submit-svez').style.display = 'block';} document.querySelector('.ask-question-modal-submit-svez').dataset.pr = this.value" />
                        <svg onclick="fetchPromptDatasvez(this)" data-pr="" style="display: none;" class="ask-question-modal-submit-svez" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.488 0.87723L26.104 14.4159C26.2085 14.4734 26.2957 14.558 26.3564 14.6607C26.4171 14.7634 26.4491 14.8806 26.4491 14.9999C26.4491 15.1192 26.4171 15.2364 26.3564 15.3391C26.2957 15.4418 26.2085 15.5263 26.104 15.5839L1.488 29.1226C1.3865 29.1784 1.2722 29.2068 1.15636 29.205C1.04053 29.2032 0.927163 29.1713 0.827435 29.1124C0.727708 29.0534 0.645062 28.9695 0.587645 28.8689C0.530227 28.7683 0.50002 28.6544 0.5 28.5386V1.46123C0.50002 1.34538 0.530227 1.23154 0.587645 1.13092C0.645062 1.03031 0.727708 0.946388 0.827435 0.88744C0.927163 0.828491 1.04053 0.796548 1.15636 0.794757C1.2722 0.792967 1.3865 0.821392 1.488 0.87723ZM3.16667 16.3332V25.1559L21.6333 14.9999L3.16667 4.8439V13.6666H9.83333V16.3332H3.16667Z" fill="#8B8B8E"/>
                        </svg>
                    </div>
                </div>            
            </div>
        </div>
    `;
    svez_masterModalElm.innerHTML = modalHtml;

    // Loader
    let lDiv = document.createElement('div');
    lDiv.id = 'swirl-loader-svez';
    lDiv.classList.add('root-elm-svez');
    lDiv.style.display = 'none';
    lDiv.innerHTML = `
        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/spiner.svg" alt="Spinner">
    `;
    svez_masterElm.insertAdjacentElement('beforebegin', lDiv);

    // Type animation    
    let promptsToAnimate = Object.keys(aiData.prompts).length > 2 ? aiData.prompts.slice(0, 2) : aiData.prompts;
    let askElm = document.querySelector(".ask-question-input-svez");
    let aniTextIndex = 0;
    let aniCharIndex = 0;

    function typeWriterEffectsvez() {
        if (aniTextIndex < promptsToAnimate.length) {
            const currentText = promptsToAnimate[aniTextIndex];

            if (aniCharIndex < currentText.length) {
                // Add next character to placeholder
                askElm.placeholder += currentText[aniCharIndex];
                aniCharIndex++;
                setTimeout(typeWriterEffectsvez, 100); // Speed of typing
            } else {
                // Pause before clearing and moving to next text
                setTimeout(() => {
                    askElm.placeholder = ""; // Clear placeholder
                    aniCharIndex = 0;
                    aniTextIndex++;
                    typeWriterEffectsvez(); // Start typing next text
                }, 1000); // Pause duration after finishing a line
            }
        } else {
            aniTextIndex = 0; // Reset index for looping
            typeWriterEffectsvez(); // Restart animation
        }
    }
    // Start Type animation
    typeWriterEffectsvez();
}

async function fetchPromptDatasvez(pr) {
    openModalsvez();
    loadersvez(true);
    let cPrompt = pr.dataset.pr;
    svez_aiData[svez_sessionId] = [];
    let requestOptions = {
        method: 'GET',
        headers: new Headers(),
        redirect: 'follow',
    };
    await fetch(`https://krisah-api.goswirl.in/ai?query=${cPrompt}&sessionId=${svez_sessionId}&productId=${svez_pdpId}&prompts=false`, requestOptions)
        .then(response => response.json())
        .then(result => {
            loadersvez(false);
            svez_aiData[svez_sessionId].push(result);

            if (result.success) {
                generateAnswersvez(cPrompt, result.data, mmNo = svez_mmc);
                svez_mmc++;
            } else {
                console.log('SVEZ: No prompt data found.');
            }
        })
        .catch(error => {
            loadersvez(false);
            console.log(error);
            console.log('SVEZ: Failed to fetch prompt data.');
            return;
        });
}

async function generateAnswersvez(cPrompt, data, mmNo) {
    // Media
    let mediaHtml = '';
    let modalMediaHtml = '';
    let i = 0;
    data.media.forEach(m => {
        m.url = `https://goswirl-pdp-reviews-stage.s3.ap-south-1.amazonaws.com/${m.assetKey}`;
        m.hls = `https://goswirl-pdp-reviews-stage.s3.ap-south-1.amazonaws.com/${m.hls}`;
        m.clip = `https://goswirl-pdp-reviews-stage.s3.ap-south-1.amazonaws.com/${m.clip}`;
        // Carousel
        let mediaElm = m.type == 'video' ? `
            <video loop muted autoplay playsinline preload="auto" src="${m.clip}"></video>
        ` : `
            <img src="${m.url}" alt="Product image">
        `;
        mediaHtml += `
            <div class="swiper-slide">
                <div class="modal-pa-swiper-slide-svez" onclick="openMediaModalsvez(${i}, ${mmNo});">
                    ${mediaElm}
                </div>
            </div>
        `;

        // Media Modal
        let modalMediaElm = m.type == 'video' ? `
            <video data-src="${m.url}" data-hls="${m.hls}" data-stime="${m.startTime}" data-etime="${m.endTime}" loop muted playsinline controls preload="none" onloadedmetadata="modalVideoOrientationsvez(this)" ontimeupdate="modalVideoTimeUpdate(this)"></video>
        ` : `
            <img data-src="${m.url}" alt="Product image">
        `;
        let modalMediaControl = `
            <div class="media-top-controls-svez">
                ${m.type == 'video' ? '<svg class="media-top-controls-svg-svez media-top-control-volume-svez" onclick="mediaVolumesvez(this);" width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" /></svg>' : ''}

                <svg class="media-top-controls-svg-svez media-top-control-share-svez" onclick="mediaSharesvez(this);" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0833 12.8104H8.91667C7.13957 12.8097 5.39608 13.2948 3.8747 14.2132C2.35331 15.1316 1.1119 16.4484 0.284668 18.0212C0.261416 17.7293 0.249851 17.4366 0.250001 17.1437C0.250001 11.1605 5.10008 6.31038 11.0833 6.31038V0.352051L22.4583 9.56038L11.0833 18.7687V12.8104ZM8.91667 10.6437H13.25V14.2274L19.0144 9.56038L13.25 4.89338V8.47705H11.0833C9.83777 8.47565 8.60661 8.74335 7.47409 9.26184C6.34157 9.78033 5.33443 10.5374 4.52158 11.4811C5.92051 10.9267 7.41188 10.6425 8.91667 10.6437Z" fill="white"></path>
                </svg>

                <svg class="media-top-controls-svg-svez media-top-control-close-svez" onclick="closeMediaModalsvez();" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.49962 4.82178L9.62462 0.696777L10.803 1.87511L6.67796 6.00011L10.803 10.1251L9.62462 11.3034L5.49962 7.17844L1.37462 11.3034L0.196289 10.1251L4.32129 6.00011L0.196289 1.87511L1.37462 0.696777L5.49962 4.82178Z" fill="white"></path>
                </svg>
            </div>
        `;
        modalMediaHtml += `
            <div class="swiper-slide">
                <div class="media-modal-swiper-slide-svez" data-type="${m.type}">
                    ${modalMediaElm}
                    ${modalMediaControl}
                </div>
            </div>
        `;

        i++;
    });

    // Key Points
    let aiText = '';
    // svez_aiData.text.forEach(t => {
    //     if (t.type == 'header') {
    //         let points = '<ul>';
    //         t.text.forEach(p => {
    //             points += `
    //                 <li>${p}</li>
    //             `;
    //         });
    //         points += '</ul>';
    //         aiText += `
    //             <div class="modal-pa-keypoints-svez">
    //                 <h4>${t.name}</h4>
    //                 ${points}
    //             </div>
    //         `;
    //     } else if (t.type == 'text') {
    //         aiText += `
    //             <div class="modal-pa-keypoints-svez">
    //                 <p>${t.text}</p>
    //             </div>
    //         `
    //     }
    // });

    // aiText += `
    //     <div class="modal-pa-keypoints-svez">
    //         <p>${data.answer}</p>
    //     </div>
    // `;

    aiText += `
        <div class="modal-pa-keypoints-svez modal-pa-keypoints-svez-${mmNo}"></div>
    `;

    // Releated Questions
    let queHtml = '';
    if (typeof data.followupquestions != 'undefined' && Object.keys(data.followupquestions).length) {
        data.followupquestions.forEach(q => {
            queHtml += `
                <p class="modal-pa-prompt-svez" data-pr="${q}" onclick="fetchPromptDatasvez(this);">
                    ${q}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.1665 5.16748V0.16748H6.83317V5.16748H11.8332V6.83415H6.83317V11.8341H5.1665V6.83415H0.166504V5.16748H5.1665Z"
                            fill="#323232" />
                    </svg>
                </p>
            `;
        });
    }

    let ansHtml = `
        <div class="modal-prompt-answer-container-svez">
            <p class="modal-pa-que-svez">
                <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.4995 3.04681C18.1823 3.04681 19.5464 1.68268 19.5464 -6.10352e-05H20.9526C20.9526 1.68268 22.3168 3.04681 23.9995 3.04681V4.45306C22.3168 4.45306 20.9526 5.8172 20.9526 7.49994H19.5464C19.5464 5.8172 18.1823 4.45306 16.4995 4.45306V3.04681ZM0.249512 11.2499C4.39165 11.2499 7.74951 7.89208 7.74951 3.74994H10.2495C10.2495 7.89208 13.6074 11.2499 17.7495 11.2499V13.7499C13.6074 13.7499 10.2495 17.1078 10.2495 21.2499H7.74951C7.74951 17.1078 4.39165 13.7499 0.249512 13.7499V11.2499ZM5.09452 12.4999C6.73347 13.4094 8.09005 14.7659 8.99951 16.4049C9.90897 14.7659 11.2655 13.4094 12.9045 12.4999C11.2655 11.5904 9.90897 10.2339 8.99951 8.59495C8.09005 10.2339 6.73347 11.5904 5.09452 12.4999ZM20.562 14.9999C20.562 17.2436 18.7431 19.0624 16.4995 19.0624V20.9374C18.7431 20.9374 20.562 22.7563 20.562 24.9999H22.437C22.437 22.7563 24.2559 20.9374 26.4995 20.9374V19.0624C24.2559 19.0624 22.437 17.2436 22.437 14.9999H20.562Z"
                        fill="url(#paint0_linear_6760_66442)" />
                    <defs>
                        <linearGradient id="paint0_linear_6760_66442" x1="13.3745" y1="-6.10352e-05"
                            x2="13.3745" y2="24.9999" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#39393D" />
                            <stop offset="1" stop-color="#9898A3" />
                        </linearGradient>
                    </defs>
                </svg>
                ${cPrompt}
            </p>

            <div class="modal-pa-media-svez">
                <p class="modal-pa-media-title-svez">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.46474 23.3902L14.6949 14.3333L18.8156 21.4698C16.8318 22.9017 14.4465 23.6705 11.9999 23.6667C11.1296 23.6667 10.2814 23.571 9.46474 23.3902ZM7.2049 22.64C5.70597 21.9623 4.3668 20.9761 3.27482 19.7458C2.18283 18.5155 1.36256 17.0688 0.867569 15.5H11.3267L7.2049 22.6388V22.64ZM0.391569 13.1667C0.224613 11.5301 0.406899 9.87679 0.92638 8.31594C1.44586 6.75508 2.2907 5.32226 3.40507 4.11217L8.63057 13.1667H0.391569ZM5.1854 2.53017C7.16887 1.09853 9.55373 0.329705 11.9999 0.333333C12.8702 0.333333 13.7184 0.429 14.5351 0.609833L9.3049 9.66667L5.1854 2.53017ZM16.7949 1.36C18.2938 2.0377 19.633 3.02388 20.725 4.25418C21.817 5.48447 22.6372 6.93123 23.1322 8.5H12.6731L16.7949 1.36117V1.36ZM23.6082 10.8333C23.7752 12.4699 23.5929 14.1232 23.0734 15.6841C22.5539 17.2449 21.7091 18.6777 20.5947 19.8878L15.3692 10.8333H23.6106H23.6082Z"
                            fill="#39393D" />
                    </svg>
                    Media sources
                </p>

                <div class="modal-pa-swiper-svez modal-pa-swiper-svez-${mmNo} swiper">
                    <div class="swiper-wrapper">
                        ${mediaHtml}
                    </div>
                    <!-- Navigation -->
                    <div class="modal-pa-swiper-prev-svez">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.785 8.75H20V11.25H4.785L11.49 17.955L9.7225 19.7225L0 10L9.7225 0.277496L11.49 2.045L4.785 8.75Z"
                                fill="#454549" />
                        </svg>
                    </div>
                    <div class="modal-pa-swiper-next-svez">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.215 8.75L8.51 2.045L10.2775 0.277496L20 10L10.2775 19.7225L8.51 17.955L15.215 11.25H0V8.75H15.215Z"
                                fill="#454549" />
                        </svg>
                    </div>
                    <!-- Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>

            ${aiText}            

            <div class="modal-pa-perks-svez" style="display: none;">
                <div class="modal-pa-perks-head-svez">
                    <div class="modal-pa-perks-head-l-svez">
                        <p class="modal-pa-perks-title-svez">🎯 Buy it if you are looking for</p>
                    </div>
                    <div class="modal-pa-perks-head-r-svez">
                        <button class="modal-pa-perks-buynow-svez">Buy now</button>
                    </div>
                </div>    

                <div class="modal-pa-perks-cards-svez">
                    <div class="modal-pa-perks-card-svez">
                        <p class="modal-pa-perks-card-title-svez">🤗 Buy it if you are looking for</p>
                        <p class="modal-pa-perks-card-description-svez">Bose's proprietary technology delivers immersive and distortion-free sound.</p>
                    </div>
                    <div class="modal-pa-perks-card-svez">
                        <p class="modal-pa-perks-card-title-svez">🔇 Advanced Noise Cancellation</p>
                        <p class="modal-pa-perks-card-description-svez">Bose’s proprietary technology delivers immersive and distortion-free sound.</p>
                    </div>
                </div>
            </div>

            <div class="modal-pa-more-prompts-svez">
                <p class="modal-pa-related-svez">                    
                    Related
                </p>
                ${queHtml}
            </div>
        </div>

        <div class="media-modal-svez">
            <svg onclick="closeMediaModalsvez();" class="media-modal-close-svez" width="49" height="48" viewBox="0 0 49 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.208984" width="48" height="48" rx="24" fill="#2E2E33" fill-opacity="0.6" />
                <g clip-path="url(#clip0_6765_69826)">
                    <path
                        d="M24.2088 22.4682L29.5713 17.1057L31.1031 18.6375L25.7406 24L31.1031 29.3625L29.5713 30.8943L24.2088 25.5318L18.8463 30.8943L17.3145 29.3625L22.677 24L17.3145 18.6375L18.8463 17.1057L24.2088 22.4682Z"
                        fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_6765_69826">
                        <rect width="26" height="26" fill="white" transform="translate(11.209 11)" />
                    </clipPath>
                </defs>
            </svg>
            <div class="media-modal-container-svez">
                <div class="media-modal-swiper-svez media-modal-swiper-svez-${mmNo} swiper">
                    <div class="swiper-wrapper">
                        ${modalMediaHtml} 
                    </div>
                    <!-- Navigation -->
                    <div class="media-modal-swiper-prev-svez">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="52" height="52" rx="26" fill="#2E2E33" />
                            <g clip-path="url(#clip0_6765_69809)">
                                <path
                                    d="M24.7307 26L30.0932 31.3625L28.5613 32.8943L21.667 26L28.5613 19.1057L30.0932 20.6375L24.7307 26Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6765_69809">
                                    <rect width="26" height="26" fill="white" transform="translate(13 13)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="media-modal-swiper-next-svez">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="52" height="52" rx="26" fill="#2E2E33" />
                            <g clip-path="url(#clip0_6765_69825)">
                                <path
                                    d="M27.1717 26L22.2217 21.05L23.6357 19.636L29.9997 26L23.6357 32.364L22.2217 30.95L27.1717 26Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6765_69825">
                                    <rect width="24" height="24" fill="white" transform="translate(14 14)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <!-- Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    `;

    let aElm = document.querySelector('.modal-prompt-answer-svez');
    if (mmNo == 0) {
        aElm.innerHTML = ansHtml;
    } else {
        document.querySelectorAll('.modal-pa-more-prompts-svez').forEach(elm => {
            elm.remove();
        });

        aElm.insertAdjacentHTML('beforeend', ansHtml);
    }

    // Markdown
    if (data.answer) document.querySelector(`.modal-pa-keypoints-svez-${mmNo}`).innerHTML = marked.parse(`${data.answer}`);
    // document.querySelector(`.modal-pa-keypoints-svez-${mmNo}`).innerHTML = marked.parse(``);


    svez_swiperC[mmNo] = new Swiper(`.modal-pa-swiper-svez-${mmNo}`, {
        slidesPerView: 1,
        direction: 'horizontal',
        spaceBetween: 15,
        // centeredSlidesBounds: true,
        // centerInsufficientSlides: true,
        // centeredSlides: true,
        cssMode: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            600: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                // centeredSlides: false,
            },
            1080: {
                slidesPerView: 3,
                // centeredSlides: false,
                cssMode: false
            },
            1366: {
                slidesPerView: 3,
                // centeredSlides: false,
                cssMode: false
            }
        },
        navigation: {
            nextEl: '.modal-pa-swiper-next-svez',
            prevEl: '.modal-pa-swiper-prev-svez',
        }
    });

    svez_swiperM[mmNo] = new Swiper(`.media-modal-swiper-svez-${mmNo}`, {
        slidesPerView: 1,
        direction: "vertical",
        spaceBetween: 0,
        clickable: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.media-modal-swiper-next-svez',
            prevEl: '.media-modal-swiper-prev-svez',
        },
        breakpoints: {
            768: {
                direction: "horizontal",
                slidesPerView: 1.2,
            },
        },
        // effect: window.innerWidth > 768 ? 'coverflow' : '',
        // coverflowEffect: {
        //     depth: 600,
        //     modifier: 1,
        //     rotate: 0,
        //     scale: 1.2,
        //     slideShadows: false,
        //     stretch: 10
        // },
        on: {
            slideChange: function () {
                let activeInd = svez_swiperM[mmNo].activeIndex;
                playMediasvez(activeInd);
            }
        }
    });

    if (mmNo > 0) {
        let masterDiv = document.querySelector('.modal-prompt-answer-svez');
        let latestDiv = document.querySelectorAll('.modal-prompt-answer-container-svez');
        latestDiv = latestDiv[latestDiv.length - 1];
        let topAt = 0;
        masterDiv.scrollTo({
            top: latestDiv.offsetTop - masterDiv.offsetTop - topAt,
            behavior: 'smooth',
        });
    }

    // Reset both ask question
    document.querySelector('.modal-pa-askque-input-svez').value = '';
    document.querySelector('.ask-question-input-svez').value = '';
    document.querySelector('.ask-question-submit-svez').style.display = 'none';
    document.querySelector('.ask-question-modal-submit-svez').style.display = 'none';
}

function openModalsvez() {
    disableScrollsvez();
    document.querySelector('.pdp-ai-section-modal-svez').style.display = 'block';
}

function closeModalsvez() {
    enableScrollsvez();
    document.querySelector('.pdp-ai-section-modal-svez').style.display = 'none';
    svez_sessionId = generateUUIDsvez();
    svez_mmc = 0;
}

function openMediaModalsvez(n, mno) {
    svez_curentMM = mno;
    document.querySelectorAll(`.media-modal-swiper-svez-${svez_curentMM} .media-modal-swiper-slide-svez video`).forEach(vdo => {
        if (!vdo.src) {
            vdo.src = vdo.dataset.src;
            vdo.load();

            // fetch(vdo.dataset.hls, { method: 'HEAD' }).then(response => {
            //     if (response.ok) {
            //         var hls = new Hls({
            //             testBandwidth: true,
            //             startLevel: -1,
            //             recover: -1
            //         });
            //         hls.loadSource(vdo.dataset.hls);
            //         hls.attachMedia(vdo);
            //         hls.on(Hls.Events.MANIFEST_PARSED, function () { });

            //         // console.log('Loaded HLS');
            //     } else {
            //         vdo.src = vdo.dataset.src;
            //         vdo.load();

            //         // console.log('Loaded MP4');
            //     }
            // }).catch(error => {
            //     vdo.src = vdo.dataset.src;
            //     vdo.load();
            // });
        }
    });
    document.querySelectorAll(`.media-modal-swiper-svez-${svez_curentMM} .media-modal-swiper-slide-svez img`).forEach(im => {
        if (!im.src) {
            im.src = im.dataset.src;
        }
    });

    if (n == svez_swiperM[svez_curentMM].activeIndex) playMediasvez(n);
    svez_swiperM[svez_curentMM].slideTo(n);

    document.querySelectorAll('.media-modal-svez')[svez_curentMM].style.transform = 'scaleY(1)';
}

function closeMediaModalsvez() {
    pauseAllMediasvez();
    document.querySelectorAll('.media-modal-svez')[svez_curentMM].style.transform = 'scaleY(0)';
}

function playMediasvez(n) {
    pauseAllMediasvez();
    let vdo = document.querySelectorAll(`.media-modal-swiper-svez-${svez_curentMM} .media-modal-swiper-slide-svez`)[n].querySelector('video');
    if (vdo) {
        vdo.currentTime = vdo.dataset.stime ? vdo.dataset.stime : 0;
        vdo.muted = false;
        let playPromise = vdo.play();
        playPromise.then(_ => {
            let btn = vdo.closest('.media-modal-swiper-slide-svez').querySelector('.media-top-control-volume-svez');
            btn.innerHTML = vdo.muted ? `
                <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
            ` : `
                <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
            `;
        }).catch(error => {
        });
    }
}

function pauseAllMediasvez() {
    document.querySelectorAll(`.media-modal-swiper-svez-${svez_curentMM} .media-modal-swiper-slide-svez video`).forEach(vdo => {
        vdo.pause();
    });
}

function mediaVolumesvez(elm) {
    let vdo = elm.closest('.media-modal-swiper-slide-svez').querySelector('video');
    if (vdo.muted) {
        vdo.muted = false;
        elm.innerHTML = `
            <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;
    } else {
        vdo.muted = true;
        elm.innerHTML = `
            <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        `;
    }
}

function modalVideoTimeUpdate(vdo) {
    if (vdo.currentTime > vdo.dataset.etime) {
        vdo.currentTime = vdo.dataset.stime;
    }
}

async function mediaSharesvez(elm) {
    // let vdo = elm.closest('.media-modal-swiper-slide-svez').querySelector('video');
    const shareData = {
        title: "Product Title",
        text: "Product Description",
        url: window.location.href,
    };

    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log('SVEZ: Sharing failed.')
    }
}

function loadersvez(flag) {
    // document.getElementById('swirl-loader-svez').style.display = `${flag ? 'flex' : 'none'}`;

    document.querySelector('.modal-skeleton-container-svez').style.display = `${flag ? 'block' : 'none'}`;
    document.querySelector('.modal-prompt-answer-svez').style.display = `${flag ? 'none' : 'block'}`;
}

function modalVideoOrientationsvez(vElm) {
    vElm.classList.add(vElm.videoWidth > vElm.videoHeight ? 'landscape-video-svez' : 'portrait-video-svez');
}

function disableScrollsvez() {
    let scrollPosition = [
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    let html = document.querySelector('html');
    html.setAttribute('data-scroll-position', JSON.stringify(scrollPosition));
    html.setAttribute('data-previous-overflow', html.style.overflow);
    html.style.overflow = 'hidden';
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // hide all fixed visible elements
    svez_allOverElements = [];
    document.querySelectorAll('*').forEach(function (el) {
        if (window.getComputedStyle(el).position === 'fixed' && el.offsetWidth > 0 && el.offsetHeight > 0) {
            if (!el.classList.contains('swirl-loader-svez') && !el.classList.contains('pdp-ai-section-modal-svez') && !el.classList.contains('media-modal-svez')) {
                el.classList.add('hide-over-svez');
                svez_allOverElements.push(el);
            }
        }

        if (window.getComputedStyle(el).position === 'sticky' && el.offsetWidth > 0 && el.offsetHeight > 0) {
            if (!el.classList.contains('swirl-loader-svez') && !el.classList.contains('pdp-ai-section-modal-svez') && !el.classList.contains('media-modal-svez')) {
                el.classList.add('hide-over-svez');
                svez_allOverElements.push(el);
            }
        }
    });
}

function enableScrollsvez() {
    let html = document.querySelector('html');
    let scrollPosition = JSON.parse(html.getAttribute('data-scroll-position'));
    html.style.overflow = html.getAttribute('data-previous-overflow');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    svez_allOverElements.forEach(function (el) {
        el.classList.remove('hide-over-svez');
    });
}

addEventListener('resize', (event) => {
    // Modal height Width
    let svezModal = document.querySelector('.pdp-ai-section-modal-svez');
    svezModal.style.height = window.innerHeight + 'px';
    svezModal.style.width = window.innerWidth + 'px';
});