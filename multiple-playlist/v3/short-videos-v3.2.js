// Global declarations
let productsAll = [];
let addedtoCart = [];
let globalMute = true;

let brandCustomizations = [];

let SSVallURL = [];
let SSVallBreakURL = [];

let SSVCurrentURL = '';

let isVerified = false;
let SWIRLuser = null;
if (localStorage.getItem('SWIRLVerifiedUser')) {
    isVerified = true;
    SWIRLuser = JSON.parse(localStorage.getItem('SWIRLVerifiedUser'));
}

let live_stream_phone = '0';
let live_stream_phone_otp = '0';

let SSVvideosAll = '';

let store = 'satyamgandhidev.com';

var headTag = document.getElementsByTagName("head")[0];

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// window.onload = function () {
(function () {
    // console.log('SSVInitiated');
    if (localStorage.getItem('SSVallURL') && localStorage.getItem('SSVlastPlayed') && document.querySelector('#swirl-short-videos') == null) {
        // console.log('SSVPIP');

        SSVvideosAll = JSON.parse(localStorage.getItem('SSVallURL'));

        // // Global declarations
        // let productsAll = [];
        // let addedtoCart = [];
        // let globalMute = true;

        // let SSVallURL = [];

        // let SSVCurrentURL = '';

        // let isVerified = false;
        // let SWIRLuser = null;
        // if (localStorage.getItem('SWIRLVerifiedUser')) {
        //     isVerified = true;
        //     SWIRLuser = JSON.parse(localStorage.getItem('SWIRLVerifiedUser'));
        // }

        // let live_stream_phone = '0';
        // let live_stream_phone_otp = '0';

        // let store = 'satyamgandhidev.com';

        // var headTag = document.getElementsByTagName("head")[0];

        let SET1, SET2 = false;

        var jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/js/v8.4/swiper-bundle.min.js';
        // jqTag.onload = function () { executeNow1(); };
        jqTag.onload = function () { SET1 = true; };
        headTag.insertBefore(jqTag, headTag.lastChild);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/multiple-playlist/v3/short-videos-v3.2.min.css';
        // jqTag.href = 'short-videos.css';
        // headTag.insertBefore(jqTag, headTag.firstChild);
        document.body.appendChild(jqTag);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/css/v8.4/swiper-bundle.min.css';
        headTag.insertBefore(jqTag, headTag.firstChild);

        if (typeof jQuery == 'undefined') {
            var jqTag = document.createElement('script');
            jqTag.rel = 'text/javascript';
            jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
            headTag.insertBefore(jqTag, headTag.lastChild);
            // jqTag.onload = function () {
            //     if (typeof Swiper != 'undefined') {
            //         executeNow1();
            //     }
            // }
            jqTag.onload = function () { SET2 = true; };
        } else {
            // jQuery(document).ready(function () {
            //     if (typeof Swiper != 'undefined') {
            //         executeNow1();
            //     }
            // });
            SET2 = true;
        }

        let SSVScriptsLOADED = setInterval(() => {
            if (SET1 && SET2) {
                executeNow1();
                clearInterval(SSVScriptsLOADED);
            }
        }, 1000);

        function executeNow1() {

            // Fetch all SWIRLS on page load
            jQuery(document).ready(function () {
                jQuery('body').prepend(`
                <div id="SSV-short-videos">
                    <div class="swiper" style="display: none!important;">
                        <div class="swiper-wrapper">
                            <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>
                        </div>
                        <div class="swiper-button-next">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                        </div>
                        <div class="swiper-button-prev">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                        </div>
                    </div>

                    <div class="SSV-powered-by">
                        <label><i>Powered by</i></label>
                        <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
                            <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> 
                        </a>
                    </div>

                    <div class="SSV-play-modal">                
                        <div class="SSV-play-modal-video-container">
                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >
                                <source src="" type="video/mp4">
                            </video>

                            <div class="SSV-play-modal-top-shadow"></div>

                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg" alt="Share icon" height="" width="">
                            </button>
                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/share.svg" alt="Share icon" height="" width="">
                            </button>
                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg" alt="Play/Pause icon" height="" width="">
                            </button>                    
                            <button type="button" class="SSV-play-modal-askaque SSV-play-modal-operation-btns" title="Ask Question">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/ask-question.svg" alt="Ask Question icon" height="" width="">
                            </button>

                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">
                                Buy Now
                            </button>

                            <div class="SSV-video-popup-progress">
                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>
                            </div>

                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>
                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pip.svg" alt="Share icon" height="" width="">
                            </button>

                            <p class="SSV-video-popup-title"></p>

                            <div class="SSV-video-popup-product">
                                <img src="" alt="Product Image" height="" width="">
                                <div>
                                    <p></p>
                                    <label></label>
                                </div>
                            </div>

                            <div class="SSV-video-product-open">
                                <b style="font-family: arial;" title="Close">&times;</b>
                                <img src="" alt="Product Image" height="" width="">
                                <div>
                                    <p></p>
                                    <label></label>
                                </div>
                                <br>
                                <span>Description</span>
                                <section></section>
                                <center>
                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>
                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>
                                </center>
                            </div>

                            <div class="SSV-video-popup-product-multi" onclick="jQuery('.SSV-video-popup-product-list-multi').show();">
                                <img src="" alt="Product Image" height="" width="">                                
                                <p class="counter"></p>
                            </div>

                            <div class="SSV-video-popup-product-list-multi">                                
                                <p class="SSV-video-popup-product-list-multi-title">
                                    <label style="font-family: arial;" title="Back">&#8249;</label>
                                    Shop
                                    <b style="font-family: arial;" title="Close">&times;</b>
                                </p>
                                <div class="SSV-video-popup-product-list-multi-append">                                    
                                </div>
                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    
                                    <img src="" alt="Product Image" height="" width="">
                                    <div>
                                        <p></p>
                                        <label></label>
                                    </div>
                                    <br>
                                    <span>Description</span>
                                    <section></section>
                                    <center>
                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>
                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>
                                    </center>
                                </div>
                            </div>

                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/toggle.png" alt="Toggle icon" height="" width="">
                            </button>
                            <div class="SSV-video-popup-brand-info">
                                <label style="font-family: arial;" title="Close">&times;</label>                        
                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />
                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>
                                <p class="SSV-video-popup-brand-info-brand-about">About</p>
                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>
                                <div class="SSV-video-popup-brand-info-powered">
                                    <span>Powered by</span>
                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> 
                                    </a>
                                </div>
                            </div>

                            <div class="SSV-video-popup-share">
                                <p>Share to</p>
                                <label style="font-family: arial;">&times;</label>
                                <img class="SSV-facebook" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">
                                <img class="SSV-twitter" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">
                                <img class="SSV-whatsapp" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">
                                <img class="SSV-copy" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">
                                <span>Link Copied!</span>
                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">
                            </div>

                            <div class="SSV-CTA-modal">          
                                <div class="SSV-OTP-send SSV-CTA-modal-inner">
                                    <label>Register Yourself <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVsendOTP(this);">
                                    <input type="text" name="SSVuserName" placeholder="Name" autocomplete="off" pattern=".{3,20}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 32' title="Minimum 3 character, Maximum 20 character, No special characters." required>                                    
                                    <div style="position: relative;" class="phone-and-code">
                                        <select name="SSVcountryCode">
                                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                                        <option data-countryCode="AD" value="376">Andorra (+376)</option>
                                        <option data-countryCode="AO" value="244">Angola (+244)</option>
                                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                        <option data-countryCode="AR" value="54">Argentina (+54)</option>
                                        <option data-countryCode="AM" value="374">Armenia (+374)</option>
                                        <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                        <option data-countryCode="AU" value="61">Australia (+61)</option>
                                        <option data-countryCode="AT" value="43">Austria (+43)</option>
                                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                                        <option data-countryCode="BY" value="375">Belarus (+375)</option>
                                        <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                        <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                        <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                        <option data-countryCode="BW" value="267">Botswana (+267)</option>
                                        <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                        <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                                        <option data-countryCode="BI" value="257">Burundi (+257)</option>
                                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                                        <option data-countryCode="CA" value="1">Canada (+1)</option>
                                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                                        <option data-countryCode="CL" value="56">Chile (+56)</option>
                                        <option data-countryCode="CN" value="86">China (+86)</option>
                                        <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                        <option data-countryCode="KM" value="269">Comoros (+269)</option>
                                        <option data-countryCode="CG" value="242">Congo (+242)</option>
                                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                                        <option data-countryCode="HR" value="385">Croatia (+385)</option>
                                        <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                                        <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                                        <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                                        <option data-countryCode="EE" value="372">Estonia (+372)</option>
                                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                        <option data-countryCode="FI" value="358">Finland (+358)</option>
                                        <option data-countryCode="FR" value="33">France (+33)</option>
                                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                                        <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                        <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                                        <option data-countryCode="DE" value="49">Germany (+49)</option>
                                        <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                                        <option data-countryCode="GR" value="30">Greece (+30)</option>
                                        <option data-countryCode="GL" value="299">Greenland (+299)</option>
                                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                                        <option data-countryCode="GU" value="671">Guam (+671)</option>
                                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                                        <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                                        <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                        <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                        <option data-countryCode="HN" value="504">Honduras (+504)</option>
                                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                                        <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                        <option data-countryCode="IS" value="354">Iceland (+354)</option>
                                        <option data-countryCode="IN" value="91" selected>India (+91)</option>
                                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                                        <option data-countryCode="IR" value="98">Iran (+98)</option>
                                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                        <option data-countryCode="IE" value="353">Ireland (+353)</option>
                                        <option data-countryCode="IL" value="972">Israel (+972)</option>
                                        <option data-countryCode="IT" value="39">Italy (+39)</option>
                                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                                        <option data-countryCode="JP" value="81">Japan (+81)</option>
                                        <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                        <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                                        <option data-countryCode="KP" value="850">Korea North (+850)</option>
                                        <option data-countryCode="KR" value="82">Korea South (+82)</option>
                                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                                        <option data-countryCode="LA" value="856">Laos (+856)</option>
                                        <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                                        <option data-countryCode="LR" value="231">Liberia (+231)</option>
                                        <option data-countryCode="LY" value="218">Libya (+218)</option>
                                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                                        <option data-countryCode="MO" value="853">Macao (+853)</option>
                                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                                        <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                        <option data-countryCode="MV" value="960">Maldives (+960)</option>
                                        <option data-countryCode="ML" value="223">Mali (+223)</option>
                                        <option data-countryCode="MT" value="356">Malta (+356)</option>
                                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                                        <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                                        <option data-countryCode="MD" value="373">Moldova (+373)</option>
                                        <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                                        <option data-countryCode="MA" value="212">Morocco (+212)</option>
                                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                        <option data-countryCode="NA" value="264">Namibia (+264)</option>
                                        <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                        <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                                        <option data-countryCode="NE" value="227">Niger (+227)</option>
                                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                                        <option data-countryCode="NU" value="683">Niue (+683)</option>
                                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                                        <option data-countryCode="NO" value="47">Norway (+47)</option>
                                        <option data-countryCode="OM" value="968">Oman (+968)</option>
                                        <option data-countryCode="PW" value="680">Palau (+680)</option>
                                        <option data-countryCode="PA" value="507">Panama (+507)</option>
                                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                                        <option data-countryCode="PE" value="51">Peru (+51)</option>
                                        <option data-countryCode="PH" value="63">Philippines (+63)</option>
                                        <option data-countryCode="PL" value="48">Poland (+48)</option>
                                        <option data-countryCode="PT" value="351">Portugal (+351)</option>
                                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                                        <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                        <option data-countryCode="RE" value="262">Reunion (+262)</option>
                                        <option data-countryCode="RO" value="40">Romania (+40)</option>
                                        <option data-countryCode="RU" value="7">Russia (+7)</option>
                                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                        <option data-countryCode="SM" value="378">San Marino (+378)</option>
                                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                                        <option data-countryCode="SN" value="221">Senegal (+221)</option>
                                        <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                                        <option data-countryCode="SG" value="65">Singapore (+65)</option>
                                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                                        <option data-countryCode="SO" value="252">Somalia (+252)</option>
                                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                                        <option data-countryCode="ES" value="34">Spain (+34)</option>
                                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                                        <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                        <option data-countryCode="SR" value="597">Suriname (+597)</option>
                                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                                        <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                                        <option data-countryCode="SI" value="963">Syria (+963)</option>
                                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                        <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                        <option data-countryCode="TG" value="228">Togo (+228)</option>
                                        <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                                        <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                        <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                        <option data-countryCode="GB" value="44">UK (+44)</option>
                                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                                        <option data-countryCode="US" value="1">USA (+1)</option>
                                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                                        </select>
                                        <input type="number" name="SSVphoneNumber" placeholder="Phone Number" autocomplete="off" pattern=".{8,16}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required>
                                    </div>
                                    <input type="email" name="SSVuserEmail" placeholder="Email address" required autocomplete="off">
                                    <select name="SSVincome" required>
                                        <option value="" disabled selected>Select Income</option>
                                        <option value="1Lac - 2Lac">1Lac - 2Lac</option>
                                        <option value="2Lac - 3Lac">2Lac - 3Lac</option>
                                        <option value="3Lac - 4Lac">3Lac - 4Lac</option>
                                        <option value="4Lac - 5Lac">4Lac - 5Lac</option>
                                        <option value="5Lac - 6Lac">5Lac - 6Lac</option>
                                    </select>
                                    <button>Register<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                </div>
                                <div class="SSV-OTP-verification SSV-CTA-modal-inner">
                                    <label>Verify Yourself <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVregisterOTP(this);">
                                    <input type="number" name="SSVotp" placeholder="OTP" autocomplete="off" required>
                                    <button>Verify<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                </div>
                                <div class="SSV-ask-question SSV-CTA-modal-inner">
                                    <div>
                                    <label>Ask Question <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVaskQuestion(this);">
                                    <textarea placeholder="Type here" name="SSVaskQue" rows="3" autocomplete="off" required></textarea>
                                    <button>Send<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="SSV-popup-video-loader"><p></p></div>

                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">
                    </div>

                    <div class="SSV-PIP" id="SSV-PIP">
                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>
                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);">
                            <source src="" type="video/mp4">
                        </video>
                        <span class="SSV-PIP-fullscreen"></span>
                    </div>
                </div>
            `);

                var url = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
                url = url.replace('#SSV-short-videos', '');
                url = url.replace('#', '');
                url = url.substring(0, url.indexOf('/', 8));
                let code = '';
                let shopify = localStorage.getItem('SSVshopify');
                let domain = (new URL(url));
                store = domain.hostname;
                store = shopify ? store : 'satyamgandhidev.com';

                var jqTag = document.createElement('script');
                jqTag.rel = 'text/javascript';
                jqTag.src = 'https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js';
                headTag.insertBefore(jqTag, headTag.lastChild);

                if (typeof SSVvideosAll['swilrs']['video'] != 'undefined') {
                    let brandData = SSVvideosAll['swilrs']['data'];
                    brandCustomizations = brandData;
                    let firstFive = 0;
                    let append = '';

                    globalMute = brandCustomizations['auto_play_mute_un'] == '0' ? false : true;

                    live_stream_phone = brandData['live_stream_phone'];
                    live_stream_phone_otp = brandData['live_stream_phone_otp'];

                    if (live_stream_phone === '0') {
                        jQuery('.phone-and-code').hide();
                        jQuery('input[name="SSVphoneNumber"]').attr('disabled', 'true');
                    }

                    if (brandCustomizations['dropdown'] === 0) {
                        jQuery('select[name="SSVincome"]').hide();
                        jQuery('select[name="SSVincome"]').attr('disabled', 'true');
                    }

                    if (brandCustomizations['email'] === 0) {
                        jQuery('input[name="SSVuserEmail"]').hide();
                        jQuery('input[name="SSVuserEmail"]').attr('disabled', 'true');
                    }

                    // console.log('Phone: ' + live_stream_phone + ' OTP: ' + live_stream_phone_otp);

                    SSVvideosAll['swilrs']['video'].forEach(swirl => {
                        let firstFivePlay = '';
                        firstFive++;
                        if (brandData['auto_play'] === '1') {
                            firstFivePlay = firstFive > 6 ? '' : 'loop autoplay';
                        }

                        SSVallURL.push(swirl['video_url']);
                        let coverPoster = swirl['image'] ? swirl['image'] : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/default-video-thumbnail.jpg';

                        let product_id = '';
                        let product_link = '';
                        let productImage = '';
                        if (Object.keys(swirl['product']).length > 0) {
                            product_id = swirl['product'][0]['product_id'];
                            product_link = swirl['product'][0]['url'];
                            productImage = `<img src="${swirl['product'][0]['image']}" class="SSV-video-prod-image-c" alt="Product Thumbnail" />`;
                        }

                        let videoViewsTop = '';
                        if (brandData['views'] === '1') {
                            videoViewsTop = `<div class="SSV-video-views-count-top">
                                                <p><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon" height="" width=""> ${swirl['total_views']}</p>                            
                                            </div>`;
                        }

                        let videoTimerTop = '';
                        if (brandData['time_sec'] === '1') {
                            videoTimerTop = `<div class="SSV-video-timer-top">
                                                <p>00:00</p>                            
                                            </div>`;
                        }

                        let videoTitleShow = '';
                        if (brandData['video_title'] == 1) {
                            videoTitleShow = `<p class="full-t">${swirl['video_title']}</p>`;
                        }

                        product_link = product_link ? product_link : swirl['product_link'];

                        productsAll[swirl['video_id']] = swirl['product'];

                        append += `<div class="swiper-slide">
                        <video poster="${coverPoster}" ontimeupdate="updateSSVProgressBar(this);" ${brandData['time_sec'] === '1' ? 'onloadeddata="updateSSVDurations(this);"' : ''} playsinline preload="metadata" data-setup="{}" muted ${firstFivePlay} width="100%" height="100%" data-product="${product_link}" data-title="${swirl['video_title']}" data-cover="${swirl['image']}" data-link="${swirl['link']}" data-vid="${swirl['video_id']}" data-did="${swirl['designer_id']}" data-productid="${product_id}" data-productlink="${product_link}" data-gumletassetid="${swirl['gumletAssetId']}" data-totalviews="${swirl['total_views']}" data-buynow="${swirl['cta_customization']}">
                            <source src="${swirl['video_url']}" type="video/mp4">
                        </video>
                        <div class="SSV-play-btn">
                            <label></label>
                        </div>
                        <div class="SSV-video-progress">
                            <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>
                        </div>
                        <div class="SSV-video-playing">
                            <label>Preview mode</label>
                        </div>
                        <div class="SSV-video-title-bottom">
                            ${videoTitleShow}
                            <a href="https://www.goswirl.live/" target="_blank" rel="nofollow" style="display:none;">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> 
                            </a>
                        </div>
                        ${videoTimerTop}
                        ${videoViewsTop}
                        ${productImage}
                    </div>`;
                    });

                    jQuery('#SSV-short-videos .swiper-wrapper').empty();
                    jQuery('#SSV-short-videos .swiper-wrapper').append(append);

                    // Initialize Swiper
                    // var swiper = new Swiper('.swiper', {
                    //     slidesPerView: 5,
                    //     // loop: true,
                    //     direction: 'horizontal',
                    //     spaceBetween: 10,
                    //     centeredSlides: true,
                    //     centeredSlidesBounds: true,
                    //     centerInsufficientSlides: true,
                    //     // autoplay: {
                    //     //   delay: 5000,
                    //     //   disableOnInteraction: true,
                    //     // },
                    //     breakpoints: {
                    //         // when window width is >= 320px
                    //         320: {
                    //             slidesPerView: 2,
                    //         },
                    //         // when window width is >= 640px
                    //         640: {
                    //             slidesPerView: 5,
                    //         }
                    //     },
                    //     navigation: {
                    //         nextEl: '.swiper-button-next',
                    //         prevEl: '.swiper-button-prev',
                    //     }
                    // });

                    // on hover play
                    if (brandData['auto_play_video'] == 1) {
                        jQuery('#SSV-short-videos .swiper-slide').hover(function () {
                            SSVpauseAll(jQuery(this).children('video'));

                            // jQuery(this).children('video').get(0).play();
                        });
                    }

                    // hide show play button
                    jQuery('#SSV-short-videos .swiper-slide video').on('play', function () {
                        jQuery(this).next().hide();
                        jQuery(this).next().next().show();
                    });

                    jQuery('#SSV-short-videos .swiper-slide video').on('pause', function () {
                        jQuery(this).next().show();
                        jQuery(this).next().next().hide();
                    });

                    jQuery('#SSV-short-videos .swiper-slide').click(function () {
                        window.location = '#SSV-short-videos';

                        // jQuery(this).children('video').get(0).pause();
                        jQuery(this).children('.SSV-video-playing').show();

                        // open modal
                        jQuery('.SSV-play-modal').show();

                        // get video URL and set to popup      
                        let video = jQuery(this).children('video').children('source').attr('src');
                        let poster = jQuery(this).children('video').attr('data-cover');

                        SSVCurrentURL = video;
                        jQuery('.SSV-play-modal video source').attr('src', video);
                        jQuery('.SSV-play-modal video').attr('poster', poster);
                        jQuery('.SSV-play-modal video').get(0).load();
                        if (brandData['auto_play_mute_un'] === '0') {
                            jQuery('.SSV-play-modal video').prop('muted', true);
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                        } else {
                            jQuery('.SSV-play-modal video').prop('muted', false);
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                        }
                        ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));

                        // share set                    
                        jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(video));

                        jQuery('.SSV-video-popup-share').hide();
                        jQuery('.SSV-CTA-modal-inner').hide();
                        jQuery('.close-SSV-PIP').click();

                        disableScroll();
                    });

                    let currentTimePIP = 0;

                    jQuery('.close-SSV-modal').click(function () {
                        currentTimePIP = jQuery('.SSV-play-modal video').get(0).currentTime;

                        SSVpauseAll();
                        jQuery('.SSV-play-modal video').get(0).pause();
                        jQuery('.SSV-play-modal').hide();
                        jQuery('.SSV-video-playing').hide();

                        // jQuery('.SSV-PIP video source').attr('src', jQuery('.SSV-play-modal video source').attr('src'));
                        // jQuery('.SSV-PIP video').get(0).load();
                        // jQuery('.SSV-PIP video').get(0).currentTime = currentTimePIP;
                        // ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                        // jQuery('.SSV-PIP').show();

                        enableScroll();

                        localStorage.setItem('SSVlastPlayed', '');
                        localStorage.setItem('SSVlastPlayedTime', '');
                    });

                    jQuery('.close-SSV-PIP').click(function () {
                        jQuery('.SSV-PIP video').get(0).pause();
                        jQuery('.SSV-PIP').hide();

                        localStorage.setItem('SSVlastPlayed', '');
                        localStorage.setItem('SSVlastPlayedTime', '');
                    });

                    jQuery('.SSV-play-modal-play-pause').click(function () {
                        let video = jQuery('.SSV-play-modal video').get(0);

                        if (video.paused) {
                            // jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
                            video.play();
                        } else {
                            // jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
                            video.pause();
                        }
                    });

                    jQuery('.SSV-play-modal-mute-unmute').click(function () {
                        if (jQuery('.SSV-play-modal video').prop('muted')) {
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                            jQuery('.SSV-play-modal video').prop('muted', false);

                            globalMute = false;
                        } else {
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                            jQuery('.SSV-play-modal video').prop('muted', true);

                            globalMute = true;
                        }
                    });

                    // hide show play button
                    jQuery('.SSV-play-modal video').on('play', function () {
                        jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
                        jQuery('.SSV-play-modal-play-pause').hide();
                    });

                    jQuery('.SSV-play-modal video').on('pause', function () {
                        jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
                    });

                    // Next previous on modal
                    jQuery('.SSV-modal-left').click(function () {
                        let currentVideo = jQuery('.SSV-play-modal video source').attr('src');
                        let n = SSVallURL.indexOf(currentVideo);
                        if (typeof SSVallURL[(n - 1)] != 'undefined') {
                            SSVCurrentURL = SSVallURL[(n - 1)];

                            let poster = jQuery(`.swiper-wrapper source[src="${SSVallURL[(n - 1)]}"]`).parent('video').attr('data-cover');
                            jQuery('.SSV-play-modal video').attr('poster', poster);

                            jQuery('.SSV-play-modal video source').attr('src', SSVallURL[(n - 1)]);
                            jQuery('.SSV-play-modal video').get(0).load();
                            if (brandData['auto_play_mute_un'] === '0') {
                                jQuery('.SSV-play-modal video').prop('muted', true);
                                jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                            } else {
                                jQuery('.SSV-play-modal video').prop('muted', false);
                                jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                            }
                            ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                            jQuery('.SSV-video-popup-share').hide();
                            jQuery('.SSV-CTA-modal-inner').hide();

                            // share set                        
                            jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(SSVallURL[(n - 1)]));
                        }
                    });

                    jQuery('.SSV-modal-right').click(function () {
                        let currentVideo = jQuery('.SSV-play-modal video source').attr('src');
                        let n = SSVallURL.indexOf(currentVideo);
                        if (typeof SSVallURL[(n + 1)] != 'undefined') {
                            SSVCurrentURL = SSVallURL[(n + 1)];

                            let poster = jQuery(`.swiper-wrapper source[src="${SSVallURL[(n + 1)]}"]`).parent('video').attr('data-cover');
                            jQuery('.SSV-play-modal video').attr('poster', poster);

                            jQuery('.SSV-play-modal video source').attr('src', SSVallURL[(n + 1)]);
                            jQuery('.SSV-play-modal video').get(0).load();
                            if (brandData['auto_play_mute_un'] === '0') {
                                jQuery('.SSV-play-modal video').prop('muted', true);
                                jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                            } else {
                                jQuery('.SSV-play-modal video').prop('muted', false);
                                jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                            }
                            ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                            jQuery('.SSV-video-popup-share').hide();
                            jQuery('.SSV-CTA-modal-inner').hide();

                            // share set
                            jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(SSVallURL[(n + 1)]));
                        }
                    });

                    // share open
                    jQuery('.SSV-play-modal-share').click(function () {
                        jQuery('.SSV-video-popup-share').show();
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-share').addClass('SSV-video-popup-share-cover');
                        }, 100);
                    });

                    jQuery('.SSV-video-popup-share label').click(function () {
                        jQuery('.SSV-video-popup-share').removeClass('SSV-video-popup-share-cover');
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-share').hide();
                        }, 500);
                    });

                    jQuery('.SSV-facebook').click(function () {
                        let link = jQuery(this).attr('data-sharelink');

                        window.open('https://www.facebook.com/sharer/sharer.php?u=' + link, '_blank');
                    });

                    jQuery('.SSV-twitter').click(function () {
                        let link = jQuery(this).attr('data-sharelink');

                        window.open('https://twitter.com/share?url=' + link, '_blank');
                    });

                    jQuery('.SSV-whatsapp').click(function () {
                        let link = jQuery(this).attr('data-sharelink');

                        // var a = document.createElement('a');                                        
                        // a.href = "whatsapp://send?text="+link;
                        // a.data = "action : share/whatsapp/share";
                        // document.body.appendChild(a);
                        // a.click();

                        window.open('whatsapp://send?text=' + link);
                    });

                    jQuery('.SSV-copy').click(function () {
                        let link = jQuery(this).attr('data-sharelink');

                        jQuery('.SSV-copylink-input').val(link);
                        jQuery('.SSV-copylink-input').click();
                        jQuery('.SSV-video-popup-share span').fadeIn().delay(3000).fadeOut();
                    });

                    // if video play                    
                    if (typeof params['ssv'] != 'undefined') {
                        // jQuery('video source[src="'+params['ssv']+'"]').parent('video').parent('.swiper-slide').click();

                        // open modal
                        jQuery('.SSV-play-modal').show();

                        // get video URL and set to popup      
                        let video = params['ssv'];
                        SSVCurrentURL = window.atob(video);

                        jQuery('.SSV-play-modal video source').attr('src', window.atob(video));
                        jQuery('.SSV-play-modal video').get(0).load();
                        jQuery('.SSV-play-modal video').prop('muted', true);
                        ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');

                        // share set
                        jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + video);

                        setTimeout(() => {
                            var elmnt = document.getElementById("SSV-short-videos");
                            elmnt.scrollIntoView();
                            disableScroll();
                        }, 2000);
                    }

                    // Hover play/pause                
                    jQuery('.SSV-play-modal video').hover(function () {
                        jQuery('.SSV-play-modal-play-pause').show();
                    });

                    jQuery('.SSV-play-modal video').mouseleave(function () {
                        jQuery('.SSV-play-modal-play-pause').hide();
                    });

                    jQuery('.SSV-play-modal-play-pause').mouseenter(function () {
                        jQuery('.SSV-play-modal-play-pause').show();
                    });

                    // Drag element
                    dragElement(document.getElementById("SSV-PIP"));

                    jQuery('.SSV-CTA-modal label span').click(function () {
                        jQuery('.SSV-CTA-modal-inner').hide();
                    });

                    jQuery('.SSV-play-modal-askaque').click(function () {
                        // if (isVerified) {
                        //     // open ask que
                        //     jQuery('.SSV-CTA-modal-inner').hide();
                        //     jQuery('.SSV-ask-question').show();

                        // } else {
                        //     // open OTP verification
                        //     jQuery('.SSV-CTA-modal-inner').hide();
                        //     jQuery('.SSV-OTP-send').show();
                        // }

                        jQuery('.SSV-CTA-modal-inner').hide();
                        jQuery('.SSV-ask-question').show();
                    });

                    // Add to cart click
                    jQuery('.SSV-play-modal-addtocart').click(function () {
                        let btn = jQuery(this);
                        let action = jQuery(this).attr('data-action');
                        let pId = jQuery(this).attr('data-pid');
                        // let link = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-product');
                        let link = jQuery(this).attr('data-link');
                        if (action == '2') {
                            if (brandCustomizations['pip_mode'] === '1') {
                                jQuery('.SSV-play-modal-pip').click();
                            }
                            // window.open(link, '_blank');
                            SSVCTAClicksTrack(pId, '1');
                            window.location = link;
                        } else if (action == '1') {
                            SSVaddToCart(link, btn);
                            SSVCTAClicksTrack(pId, '2');
                        } else if (action == '3') {
                            // window.open('https://' + store + '/cart', '_blank');
                            window.location = 'https://' + store + '/cart';
                        }
                    });

                    jQuery(document).keydown(function (event) {
                        if (jQuery('.SSV-play-modal').is(":visible")) {
                            if (event.keyCode == 37 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                jQuery('.SSV-play-modal .SSV-modal-left').click(); //on left arrow
                            } else if (event.keyCode == 39 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                jQuery('.SSV-play-modal .SSV-modal-right').click();; //on right arrow
                            } else if (event.key === 'Escape') {
                                if (jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                    jQuery('.SSV-CTA-modal-inner').hide();
                                } else if (jQuery('.SSV-video-product-open').is(":visible")) {
                                    jQuery('.SSV-video-product-open b').click();
                                } else if (jQuery('.SSV-video-popup-brand-info').is(":visible")) {
                                    jQuery('.SSV-video-popup-brand-info label').click();
                                } else {
                                    jQuery('.SSV-play-modal .close-SSV-modal').click(); //on escape
                                }
                            }
                        }
                    });

                    jQuery('.SSV-play-modal-pip').click(function () {
                        currentTimePIP = jQuery('.SSV-play-modal video').get(0).currentTime;

                        SSVpauseAll();
                        jQuery('.SSV-play-modal video').get(0).pause();
                        jQuery('.SSV-play-modal').hide();
                        jQuery('.SSV-video-playing').hide();

                        jQuery('.SSV-PIP video source').attr('src', jQuery('.SSV-play-modal video source').attr('src'));
                        jQuery('.SSV-PIP video').get(0).load();
                        jQuery('.SSV-PIP video').get(0).currentTime = currentTimePIP;
                        ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                        jQuery('.SSV-PIP').show();

                        enableScroll();
                    });

                    jQuery('.SSV-PIP-fullscreen').click(function () {
                        // get video URL and set to popup      
                        let video = jQuery('.SSV-PIP video source').attr('src');

                        SSVCurrentURL = video;
                        jQuery('.SSV-play-modal video source').attr('src', video);
                        jQuery('.SSV-play-modal video').get(0).load();
                        if (brandData['auto_play_mute_un'] === '0') {
                            jQuery('.SSV-play-modal video').prop('muted', true);
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                        } else {
                            jQuery('.SSV-play-modal video').prop('muted', false);
                            jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                        }
                        ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));

                        // share set                    
                        jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(video));

                        jQuery('.SSV-video-popup-share').hide();
                        jQuery('.SSV-CTA-modal-inner').hide();

                        //close pip
                        jQuery('.close-SSV-PIP').click();
                        // open modal
                        jQuery('.SSV-play-modal').show();

                        disableScroll();
                    });

                    if (brandData['powered_by'] === '1') {
                        // jQuery('.SSV-powered-by').show();
                        // jQuery('.SSV-video-title-bottom a').show();
                        jQuery('.SSV-video-popup-brand-info-powered').show();
                    } else {
                        // jQuery('.SSV-powered-by').hide();
                        // jQuery('.SSV-video-title-bottom a').hide();                        
                        jQuery('.SSV-video-popup-brand-info-powered').hide();
                    }

                    jQuery(document).on('click touch', function (event) {
                        if (jQuery('.SSV-video-popup-brand-info').is(":visible")) {
                            if (jQuery(event.target).is('.SSV-play-modal') || jQuery(event.target).is('.SSV-play-modal-video-container video')) {
                                jQuery('.SSV-video-popup-brand-info label').click();
                            }
                        } else if (jQuery('.SSV-play-modal').is(":visible")) {
                            if (jQuery(event.target).is('.SSV-play-modal')) {
                                // jQuery('.SSV-play-modal .close-SSV-modal').click();
                            }
                        }
                    });

                    // browser back press
                    window.onpopstate = function (event) {
                        if (jQuery('.SSV-play-modal').is(":visible")) {
                            jQuery('.SSV-play-modal .close-SSV-modal').click();
                        }
                    };

                    jQuery('#SSV-PIP video').click(function () {
                        jQuery('.SSV-PIP-fullscreen').click();
                    });

                    // Product detail open
                    jQuery('.SSV-video-popup-product').click(function () {
                        jQuery('.SSV-video-product-open').show();
                        setTimeout(() => {
                            jQuery('.SSV-video-product-open').addClass('SSV-video-product-open-cover');
                        }, 100);
                    });

                    jQuery('.SSV-video-product-open b').click(function () {
                        jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
                        setTimeout(() => {
                            jQuery('.SSV-video-product-open').hide();
                        }, 500);
                    });

                    // Brand detail open
                    jQuery('.SSV-video-popup-brand-info-btn').click(function () {
                        jQuery('.SSV-video-popup-brand-info').show();
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-brand-info').addClass('SSV-video-popup-brand-info-cover');
                        }, 100);
                    });

                    jQuery('.SSV-video-popup-brand-info label').click(function () {
                        jQuery('.SSV-video-popup-brand-info').removeClass('SSV-video-popup-brand-info-cover');
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-brand-info').hide();
                        }, 500);
                    });

                    // Brand data update
                    if (brandData['user_profile']) {
                        jQuery('.SSV-video-popup-brand-info-brand-logo').attr('src', brandData['user_profile']);
                        jQuery('.SSV-video-popup-brand-info-brand-logo').show();
                    } else {
                        jQuery('.SSV-video-popup-brand-info-brand-logo').hide();
                    }

                    jQuery('.SSV-video-popup-brand-info-brand-name').html(brandData['designer_brand_name']);

                    if (brandData['designer_bio']) {
                        jQuery('.SSV-video-popup-brand-info-brand-description').html(brandData['designer_bio']);
                        jQuery('.SSV-video-popup-brand-info-brand-description').show();
                        jQuery('.SSV-video-popup-brand-info-brand-about').show();
                    } else {
                        jQuery('.SSV-video-popup-brand-info-brand-description').hide();
                        jQuery('.SSV-video-popup-brand-info-brand-about').hide();
                    }

                    // on swipe left rigght on phone
                    document.addEventListener('touchstart', handleTouchStart, false);
                    document.addEventListener('touchmove', handleTouchMove, false);

                    // if last playing - Play again
                    if (localStorage.getItem('SSVlastPlayed')) {
                        // currentTimePIP = localStorage.getItem('SSVlastPlayedTime') ? localStorage.getItem('SSVlastPlayedTime') : 0;
                        SSVCurrentURL = localStorage.getItem('SSVlastPlayed');

                        jQuery('.SSV-PIP video source').attr('src', localStorage.getItem('SSVlastPlayed'));
                        jQuery('.SSV-PIP video').get(0).load();
                        // jQuery('.SSV-PIP video').get(0).currentTime = Math.round(parseInt(currentTimePIP));
                        ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                        jQuery('.SSV-PIP video').attr('loop', true);
                        setTimeout(() => {
                            jQuery('.SSV-PIP').show();
                        }, 1000);
                    }

                    // PIP continue
                    // window.addEventListener('beforeunload', function (event) {
                    //     if (jQuery('.SSV-play-modal').is(":visible")) {
                    //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-play-modal').find('video').children('source').attr('src'));
                    //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                    //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-play-modal').find('video').get(0).currentTime);
                    //     }
                    //     if (jQuery('.SSV-PIP').is(":visible")) {
                    //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-PIP').find('video').children('source').attr('src'));
                    //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                    //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-PIP').find('video').get(0).currentTime);
                    //     }
                    // });

                    jQuery(document).on('click', '.SSV-P-see-more', function () {
                        jQuery(this).parent().next().show();
                        jQuery(this).parent().hide();
                    });

                    jQuery(document).on('click', '.SSV-P-see-less', function () {
                        jQuery(this).parent().prev().show();
                        jQuery(this).parent().hide();
                    });

                    jQuery('.SSV-play-modal video').on('loadstart', function (event) {
                        // jQuery('.SSV-popup-video-loader').show();
                        jQuery('.SSV-play-modal-video-container').addClass('SSV-popup-video-blur-load');
                    });
                    jQuery('.SSV-play-modal video').on('canplay', function (event) {
                        // jQuery('.SSV-popup-video-loader').hide();
                        jQuery('.SSV-play-modal-video-container').removeClass('SSV-popup-video-blur-load');
                    });

                    // Product multiple open
                    jQuery('.SSV-video-popup-product-multi').click(function () {
                        jQuery('.SSV-video-popup-product-list-multi').show();
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-product-list-multi').addClass('SSV-video-popup-product-list-multi-cover');
                        }, 100);
                    });

                    jQuery('.SSV-video-popup-product-list-multi-title b').click(function () {
                        jQuery('.SSV-video-popup-product-list-multi').removeClass('SSV-video-popup-product-list-multi-cover');
                        setTimeout(() => {
                            jQuery('.SSV-video-popup-product-list-multi').hide();
                        }, 500);
                    });

                    // Product multiple back
                    jQuery('.SSV-video-popup-product-list-multi-title label').click(function () {
                        if (jQuery('.SSV-video-popup-product-list-multi-product-detail').is(":visible")) {
                            jQuery('.SSV-video-popup-product-list-multi-product-detail').hide();
                            jQuery('.SSV-video-popup-product-list-multi-append').show();
                        } else if (jQuery('.SSV-video-popup-product-list-multi-append').is(":visible")) {
                            jQuery('.SSV-video-popup-product-list-multi-title b').click();
                        }
                    });

                } else {
                    // let append = `<p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 17px; color: #999;display: block;width: 100%;">Looks like you didn't enable SWIRL <-> Shopify yet, or You don't have short videos created yet.</p>`;
                    let append = ``;

                    jQuery('#SSV-short-videos .swiper-wrapper').empty();
                    jQuery('#SSV-short-videos .swiper-wrapper').append(append);
                }

                SSVsetPopupHight();
            });
        }

    } else if (document.querySelector('#swirl-short-videos') != null) {
        // console.log('SSVNew');

        // Global declarations

        // let productsAll = [];
        // let addedtoCart = [];
        // let globalMute = true;

        // let SSVallURL = [];

        // let SSVCurrentURL = '';

        // let isVerified = false;
        // let SWIRLuser = null;
        // if (localStorage.getItem('SWIRLVerifiedUser')) {
        //     isVerified = true;
        //     SWIRLuser = JSON.parse(localStorage.getItem('SWIRLVerifiedUser'));
        // }

        // let live_stream_phone = '0';
        // let live_stream_phone_otp = '0';

        // let store = 'satyamgandhidev.com';

        // var headTag = document.getElementsByTagName("head")[0];

        let SET1, SET2 = false;

        var jqTag = document.createElement('script');
        jqTag.rel = 'text/javascript';
        jqTag.src = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/js/v8.4/swiper-bundle.min.js';
        // jqTag.onload = function () { executeNow(); };
        jqTag.onload = function () { SET1 = true; };
        headTag.insertBefore(jqTag, headTag.lastChild);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/multiple-playlist/v3/short-videos-v3.2.min.css';
        // jqTag.href = 'short-videos.css';
        // headTag.insertBefore(jqTag, headTag.firstChild);
        document.body.appendChild(jqTag);

        var jqTag = document.createElement('link');
        jqTag.rel = 'stylesheet';
        jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/css/v8.4/swiper-bundle.min.css';
        headTag.insertBefore(jqTag, headTag.firstChild);

        if (typeof jQuery == 'undefined') {
            var jqTag = document.createElement('script');
            jqTag.rel = 'text/javascript';
            jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
            headTag.insertBefore(jqTag, headTag.lastChild);
            // jqTag.onload = function () {
            //     if (typeof Swiper != 'undefined') {
            //         executeNow();
            //     }
            // }
            jqTag.onload = function () { SET2 = true; };
        } else {
            // jQuery(document).ready(function () {
            //     if (typeof Swiper != 'undefined') {
            //         executeNow();
            //     }
            // });
            SET2 = true;
        }

        let SSVScriptsLOADED = setInterval(() => {
            if (SET1 && SET2) {
                executeNow();
                clearInterval(SSVScriptsLOADED);
            }
        }, 1000);

        function executeNow() {

            // Fetch all SWIRLS on page load
            jQuery(document).ready(function () {
                jQuery('#swirl-short-videos').html(`
                <div id="SSV-short-videos">
                    <div class="SSV-play-modal">                
                        <div class="SSV-play-modal-video-container">
                            <video id="gumlet-video-count" loop ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" onloadstart="gumletVideoCount();" playsinline preload="metadata" data-setup="{}" >
                                <source src="" type="video/mp4">
                            </video>

                            <div class="SSV-play-modal-top-shadow"></div>

                            <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg" alt="Share icon" height="" width="">
                            </button>
                            <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/share.svg" alt="Share icon" height="" width="">
                            </button>
                            <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg" alt="Play/Pause icon" height="" width="">
                            </button>                    
                            <button type="button" class="SSV-play-modal-askaque SSV-play-modal-operation-btns" title="Ask Question">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/ask-question.svg" alt="Ask Question icon" height="" width="">
                            </button>

                            <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2">
                                Buy Now
                            </button>

                            <div class="SSV-video-popup-progress">
                                <div class="SSV-video-popup-progress-inner" style="width: 0%;">&nbsp;</div>
                            </div>

                            <label class="close-SSV-modal" style="font-family: arial;" title="Close">&times;</label>
                            <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pip.svg" alt="Share icon" height="" width="">
                            </button>

                            <p class="SSV-video-popup-title"></p>

                            <div class="SSV-video-popup-product">
                                <img src="" alt="Product Image" height="" width="">
                                <div>
                                    <p></p>
                                    <label></label>
                                </div>
                            </div>

                            <div class="SSV-video-product-open">
                                <b style="font-family: arial;" title="Close">&times;</b>
                                <img src="" alt="Product Image" height="" width="">
                                <div>
                                    <p></p>
                                    <label></label>
                                </div>
                                <br>
                                <span>Description</span>
                                <section></section>
                                <center>
                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1">Add to Cart</button>
                                    <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2">Buy Now</button>
                                </center>
                            </div>

                            <div class="SSV-video-popup-product-multi" onclick="jQuery('.SSV-video-popup-product-list-multi').show();">
                                <img src="" alt="Product Image" height="" width="">                                
                                <p class="counter"></p>
                            </div>

                            <div class="SSV-video-popup-product-list-multi">                                
                                <p class="SSV-video-popup-product-list-multi-title">
                                    <label style="font-family: arial;" title="Back">&#8249;</label>
                                    Shop
                                    <b style="font-family: arial;" title="Close">&times;</b>
                                </p>
                                <div class="SSV-video-popup-product-list-multi-append">                                    
                                </div>
                                <div class="SSV-video-popup-product-list-multi-product-detail">                                    
                                    <img src="" alt="Product Image" height="" width="">
                                    <div>
                                        <p></p>
                                        <label></label>
                                    </div>
                                    <br>
                                    <span>Description</span>
                                    <section></section>
                                    <center>
                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1">Add to Cart</button>
                                        <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2">Buy Now</button>
                                    </center>
                                </div>
                            </div>

                            <button type="button" class="SSV-video-popup-brand-info-btn" title="More">
                                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/toggle.png" alt="Toggle icon" height="" width="">
                            </button>
                            <div class="SSV-video-popup-brand-info">
                                <label style="font-family: arial;" title="Close">&times;</label>                        
                                <img src="" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="" />
                                <p class="SSV-video-popup-brand-info-brand-name">SWIRL</p>
                                <p class="SSV-video-popup-brand-info-brand-about">About</p>
                                <p class="SSV-video-popup-brand-info-brand-description">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos & Live streaming</p>
                                <div class="SSV-video-popup-brand-info-powered">
                                    <span>Powered by</span>
                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width="" /> 
                                    </a>
                                </div>
                            </div>

                            <div class="SSV-video-popup-share">
                                <p>Share to</p>
                                <label style="font-family: arial;">&times;</label>
                                <img class="SSV-facebook" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/facebook.png" data-sharelink="" alt="Facebook icon" title="Share on Facebook" height="" width="">
                                <img class="SSV-twitter" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/twitter.png" data-sharelink="" alt="Twitter icon" title="Share on Twitter" height="" width="">
                                <img class="SSV-whatsapp" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/whatsapp.png" data-sharelink="" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">
                                <img class="SSV-copy" src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/copy-link.png" data-sharelink="" alt="Copy link icon" title="Copy Link" height="" width="">
                                <span>Link Copied!</span>
                                <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">
                            </div>

                            <div class="SSV-CTA-modal">          
                                <div class="SSV-OTP-send SSV-CTA-modal-inner">
                                    <label>Register Yourself <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVsendOTP(this);">
                                    <input type="text" name="SSVuserName" placeholder="Name" autocomplete="off" pattern=".{3,20}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 32' title="Minimum 3 character, Maximum 20 character, No special characters." required>                                    
                                    <div style="position: relative;" class="phone-and-code">
                                        <select name="SSVcountryCode">
                                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                                        <option data-countryCode="AD" value="376">Andorra (+376)</option>
                                        <option data-countryCode="AO" value="244">Angola (+244)</option>
                                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                        <option data-countryCode="AR" value="54">Argentina (+54)</option>
                                        <option data-countryCode="AM" value="374">Armenia (+374)</option>
                                        <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                        <option data-countryCode="AU" value="61">Australia (+61)</option>
                                        <option data-countryCode="AT" value="43">Austria (+43)</option>
                                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                                        <option data-countryCode="BY" value="375">Belarus (+375)</option>
                                        <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                        <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                        <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                        <option data-countryCode="BW" value="267">Botswana (+267)</option>
                                        <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                        <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                                        <option data-countryCode="BI" value="257">Burundi (+257)</option>
                                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                                        <option data-countryCode="CA" value="1">Canada (+1)</option>
                                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                                        <option data-countryCode="CL" value="56">Chile (+56)</option>
                                        <option data-countryCode="CN" value="86">China (+86)</option>
                                        <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                        <option data-countryCode="KM" value="269">Comoros (+269)</option>
                                        <option data-countryCode="CG" value="242">Congo (+242)</option>
                                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                                        <option data-countryCode="HR" value="385">Croatia (+385)</option>
                                        <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                                        <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                                        <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                                        <option data-countryCode="EE" value="372">Estonia (+372)</option>
                                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                        <option data-countryCode="FI" value="358">Finland (+358)</option>
                                        <option data-countryCode="FR" value="33">France (+33)</option>
                                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                                        <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                        <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                                        <option data-countryCode="DE" value="49">Germany (+49)</option>
                                        <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                                        <option data-countryCode="GR" value="30">Greece (+30)</option>
                                        <option data-countryCode="GL" value="299">Greenland (+299)</option>
                                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                                        <option data-countryCode="GU" value="671">Guam (+671)</option>
                                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                                        <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                                        <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                        <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                        <option data-countryCode="HN" value="504">Honduras (+504)</option>
                                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                                        <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                        <option data-countryCode="IS" value="354">Iceland (+354)</option>
                                        <option data-countryCode="IN" value="91" selected>India (+91)</option>
                                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                                        <option data-countryCode="IR" value="98">Iran (+98)</option>
                                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                        <option data-countryCode="IE" value="353">Ireland (+353)</option>
                                        <option data-countryCode="IL" value="972">Israel (+972)</option>
                                        <option data-countryCode="IT" value="39">Italy (+39)</option>
                                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                                        <option data-countryCode="JP" value="81">Japan (+81)</option>
                                        <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                        <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                                        <option data-countryCode="KP" value="850">Korea North (+850)</option>
                                        <option data-countryCode="KR" value="82">Korea South (+82)</option>
                                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                                        <option data-countryCode="LA" value="856">Laos (+856)</option>
                                        <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                                        <option data-countryCode="LR" value="231">Liberia (+231)</option>
                                        <option data-countryCode="LY" value="218">Libya (+218)</option>
                                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                                        <option data-countryCode="MO" value="853">Macao (+853)</option>
                                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                                        <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                        <option data-countryCode="MV" value="960">Maldives (+960)</option>
                                        <option data-countryCode="ML" value="223">Mali (+223)</option>
                                        <option data-countryCode="MT" value="356">Malta (+356)</option>
                                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                                        <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                                        <option data-countryCode="MD" value="373">Moldova (+373)</option>
                                        <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                                        <option data-countryCode="MA" value="212">Morocco (+212)</option>
                                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                        <option data-countryCode="NA" value="264">Namibia (+264)</option>
                                        <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                        <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                                        <option data-countryCode="NE" value="227">Niger (+227)</option>
                                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                                        <option data-countryCode="NU" value="683">Niue (+683)</option>
                                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                                        <option data-countryCode="NO" value="47">Norway (+47)</option>
                                        <option data-countryCode="OM" value="968">Oman (+968)</option>
                                        <option data-countryCode="PW" value="680">Palau (+680)</option>
                                        <option data-countryCode="PA" value="507">Panama (+507)</option>
                                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                                        <option data-countryCode="PE" value="51">Peru (+51)</option>
                                        <option data-countryCode="PH" value="63">Philippines (+63)</option>
                                        <option data-countryCode="PL" value="48">Poland (+48)</option>
                                        <option data-countryCode="PT" value="351">Portugal (+351)</option>
                                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                                        <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                        <option data-countryCode="RE" value="262">Reunion (+262)</option>
                                        <option data-countryCode="RO" value="40">Romania (+40)</option>
                                        <option data-countryCode="RU" value="7">Russia (+7)</option>
                                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                        <option data-countryCode="SM" value="378">San Marino (+378)</option>
                                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                                        <option data-countryCode="SN" value="221">Senegal (+221)</option>
                                        <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                                        <option data-countryCode="SG" value="65">Singapore (+65)</option>
                                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                                        <option data-countryCode="SO" value="252">Somalia (+252)</option>
                                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                                        <option data-countryCode="ES" value="34">Spain (+34)</option>
                                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                                        <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                        <option data-countryCode="SR" value="597">Suriname (+597)</option>
                                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                                        <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                                        <option data-countryCode="SI" value="963">Syria (+963)</option>
                                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                        <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                        <option data-countryCode="TG" value="228">Togo (+228)</option>
                                        <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                                        <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                        <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                        <option data-countryCode="GB" value="44">UK (+44)</option>
                                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                                        <option data-countryCode="US" value="1">USA (+1)</option>
                                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                                        </select>
                                        <input type="text" name="SSVphoneNumber" placeholder="Phone Number" autocomplete="off" pattern=".{8,16}" title="Only numbers allowed, Minimum 8, Maximum 16" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required>
                                    </div>
                                    <input type="email" name="SSVuserEmail" placeholder="Email address" required autocomplete="off">
                                    <select name="SSVincome" required>
                                        <option value="" disabled selected>Select Income</option>
                                        <option value="1Lac - 2Lac">1Lac - 2Lac</option>
                                        <option value="2Lac - 3Lac">2Lac - 3Lac</option>
                                        <option value="3Lac - 4Lac">3Lac - 4Lac</option>
                                        <option value="4Lac - 5Lac">4Lac - 5Lac</option>
                                        <option value="5Lac - 6Lac">5Lac - 6Lac</option>
                                    </select>
                                    <button>Register<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                </div>
                                <div class="SSV-OTP-verification SSV-CTA-modal-inner">
                                    <label>Verify Yourself <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVregisterOTP(this);">
                                    <input type="number" name="SSVotp" placeholder="OTP" autocomplete="off" required>
                                    <button>Verify<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                </div>
                                <div class="SSV-ask-question SSV-CTA-modal-inner">
                                    <div>
                                    <label>Ask Question <span style="font-family: arial;" title="Close">&times;</span></label>
                                    <p class="SSV-CTA-message"></p>
                                    <form onsubmit="return SSVaskQuestion(this);">
                                    <textarea placeholder="Type here" name="SSVaskQue" rows="3" autocomplete="off" required></textarea>
                                    <button>Send<p class="SSV-CTA-loader"></p></button>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="SSV-popup-video-loader"><p></p></div>

                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="">
                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">
                    </div>

                    <div class="SSV-PIP" id="SSV-PIP">
                        <label class="close-SSV-PIP" style="font-family: arial;" title="Close">&times;</label>
                        <video loop muted playsinline preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);" >
                            <source src="" type="video/mp4">
                        </video>
                        <span class="SSV-PIP-fullscreen"></span>
                    </div>
                </div>
            `);

                var url = window.location.href.split('?')[0] ? window.location.href.split('?')[0] : window.location.href;
                url = url.replace('#SSV-short-videos', '');
                url = url.replace('#', '');
                let code = jQuery('#swirl-short-videos').data('code');
                let shopify = jQuery('#swirl-short-videos').data('sw');
                let domain = (new URL(url));
                store = domain.hostname;
                store = shopify ? store : 'satyamgandhidev.com';

                var jqTag = document.createElement('script');
                jqTag.rel = 'text/javascript';
                jqTag.src = 'https://cdn.jsdelivr.net/npm/@gumlet/insights-js-core@1.0/gumlet-insights.min.js';
                headTag.insertBefore(jqTag, headTag.lastChild);

                let urlPass = '';
                urlPass = "https://api.goswirl.live/index.php/shopify/videolistingV2?user=" + code;

                if (typeof jQuery('#swirl-short-videos').data('byshopify') != 'undefined') {
                    urlPass = 'https://api.goswirl.live/shopify-app/swirl_short_videos.php';
                }

                // Multiple Playlist
                let playlistCodes = [];
                if (document.querySelector('.swirl-short-videos-M') != null) {
                    jQuery('.swirl-short-videos-M').each(function () {
                        let cElem = jQuery(this);
                        jQuery(this).append(
                            `
                            <div class="swiper">
                                <div class="swiper-wrapper">
                                    <p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 20px; color: #999;display: block;width: 100%;">Loading Videos...</p>
                                </div>
                                <div class="swiper-button-next">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/next-btn.svg" height="" width="" alt="Next icon">
                                </div>
                                <div class="swiper-button-prev">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/back-btn.svg" height="" width="" alt="Previous icon">
                                </div>
                            </div>

                            <div class="SSV-powered-by">
                                <label><i>Powered by</i></label>
                                <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
                                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> 
                                </a>
                            </div>
                            `
                        );

                        playlistCodes.push(jQuery(cElem).data('playlist'));
                        urlPass = "https://api.goswirl.live/index.php/shopify/videolistingV3?user=" + code + "&playlist=" + playlistCodes;
                    });
                }

                jQuery.ajax({
                    type: "POST",
                    dataType: "json",
                    url: urlPass,
                    data: "store=" + encodeURIComponent(store),
                    success: function (data) {
                        if (data) {
                            // settings
                            let brandData = data['swilrs']['data'];
                            brandCustomizations = brandData;

                            globalMute = brandCustomizations['auto_play_mute_un'] == '0' ? false : true;

                            live_stream_phone = brandData['live_stream_phone'];
                            live_stream_phone_otp = brandData['live_stream_phone_otp'];

                            if (live_stream_phone === '0') {
                                jQuery('.phone-and-code').hide();
                                jQuery('input[name="SSVphoneNumber"]').attr('disabled', 'true');
                            }

                            if (brandCustomizations['dropdown'] === 0) {
                                jQuery('select[name="SSVincome"]').hide();
                                jQuery('select[name="SSVincome"]').attr('disabled', 'true');
                            }

                            if (brandCustomizations['email'] === 0) {
                                jQuery('input[name="SSVuserEmail"]').hide();
                                jQuery('input[name="SSVuserEmail"]').attr('disabled', 'true');
                            }

                            // console.log('Phone: ' + live_stream_phone + ' OTP: ' + live_stream_phone_otp);

                            jQuery('.swirl-short-videos-M').each(function () {
                                let cElem = jQuery(this);
                                SSVallBreakURL[jQuery(cElem).data('playlist')] = [];

                                if (Object.keys(data['swilrs'][jQuery(cElem).data('playlist')]).length > 0) {
                                    let firstFive = 0;
                                    let append = '';
                                    data['swilrs'][jQuery(cElem).data('playlist')].forEach(swirl => {
                                        let firstFivePlay = '';
                                        firstFive++;
                                        if (brandData['auto_play'] === '1') {
                                            firstFivePlay = firstFive > 6 ? '' : 'loop autoplay';
                                        }

                                        SSVallURL.push(swirl['video_url']);
                                        SSVallBreakURL[jQuery(cElem).data('playlist')].push(swirl['video_url']);
                                        let coverPoster = swirl['image'] ? swirl['image'] : 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/default-video-thumbnail.jpg';

                                        let product_id = '';
                                        let product_link = '';
                                        let productImage = '';
                                        if (Object.keys(swirl['product']).length > 0) {
                                            product_id = swirl['product'][0]['product_id'];
                                            product_link = swirl['product'][0]['url'];
                                            productImage = `<img src="${swirl['product'][0]['image']}" class="SSV-video-prod-image-c" alt="Product Thumbnail" />`;
                                        }

                                        let videoViewsTop = '';
                                        if (brandData['views'] === '1') {
                                            videoViewsTop = `<div class="SSV-video-views-count-top">
                                                        <p><img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/views-icon.svg" alt="Views icon" height="" width=""> ${swirl['total_views']}</p>                            
                                                    </div>`;
                                        }

                                        let videoTimerTop = '';
                                        if (brandData['time_sec'] === '1') {
                                            videoTimerTop = `<div class="SSV-video-timer-top">
                                                        <p>00:00</p>                            
                                                    </div>`;
                                        }

                                        let videoTitleShow = '';
                                        if (brandData['video_title'] == 1) {
                                            videoTitleShow = `<p class="full-t">${swirl['video_title']}</p>`;
                                        }

                                        product_link = product_link ? product_link : swirl['product_link'];

                                        productsAll[swirl['video_id']] = swirl['product'];

                                        append += `<div class="swiper-slide">
                                                <video poster="${coverPoster}" ontimeupdate="updateSSVProgressBar(this);" ${brandData['time_sec'] === '1' ? 'onloadeddata="updateSSVDurations(this);"' : ''} playsinline preload="metadata" data-setup="{}" muted ${firstFivePlay} width="100%" height="100%" data-product="${product_link}" data-title="${swirl['video_title']}" data-cover="${swirl['image']}" data-link="${swirl['link']}" data-vid="${swirl['video_id']}" data-did="${swirl['designer_id']}" data-productid="${product_id}" data-productlink="${product_link}" data-gumletassetid="${swirl['gumletAssetId']}" data-totalviews="${swirl['total_views']}" data-buynow="${swirl['cta_customization']}">
                                                    <source src="${swirl['video_url']}" type="video/mp4">
                                                </video>
                                                <div class="SSV-play-btn">
                                                    <label></label>
                                                </div>
                                                <div class="SSV-video-progress">
                                                    <div class="SSV-video-progress-inner" style="width: 0%;">&nbsp;</div>
                                                </div>
                                                <div class="SSV-video-playing">
                                                    <label>Preview mode</label>
                                                </div>
                                                <div class="SSV-video-title-bottom">
                                                    ${videoTitleShow}
                                                    <a href="https://www.goswirl.live/" target="_blank" rel="nofollow" style="display:none;">
                                                        <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> 
                                                    </a>
                                                </div>
                                                ${videoTimerTop}
                                                ${videoViewsTop}
                                                ${productImage}
                                            </div>`;
                                    });
                                    jQuery(cElem).find('.swiper-wrapper').html(append);
                                } else {
                                    jQuery(cElem).empty();
                                }
                            });

                            // PIP continue
                            localStorage.setItem('SSVallURL', JSON.stringify(data));
                            localStorage.setItem('SSVlastPlayed', '');
                            localStorage.setItem('SSVlastPlayedTime', '');
                            localStorage.setItem('SSVshopify', shopify);

                            // Initialize Swiper
                            // if (typeof Swiper != 'undefined') {
                            var swiper = new Swiper('.swiper', {
                                slidesPerView: 5,
                                // loop: true,
                                direction: 'horizontal',
                                spaceBetween: 10,
                                centeredSlides: true,
                                centeredSlidesBounds: true,
                                centerInsufficientSlides: true,
                                // autoplay: {
                                //   delay: 5000,
                                //   disableOnInteraction: true,
                                // },
                                breakpoints: {
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 5,
                                    }
                                },
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }
                            });
                            // } else { location.reload(); }

                            updateSSVSwiperNavigation();

                            // on hover play
                            if (brandData['auto_play_video'] == 1) {
                                jQuery('.swirl-short-videos-M .swiper-slide').hover(function () {
                                    SSVpauseAll(jQuery(this).children('video'));

                                    // jQuery(this).children('video').get(0).play();
                                });
                            }

                            // hide show play button
                            jQuery('.swirl-short-videos-M .swiper-slide video').on('play', function () {
                                jQuery(this).next().hide();
                                jQuery(this).next().next().show();
                            });

                            jQuery('.swirl-short-videos-M .swiper-slide video').on('pause', function () {
                                jQuery(this).next().show();
                                jQuery(this).next().next().hide();
                            });

                            jQuery('.swirl-short-videos-M .swiper-slide').click(function () {
                                window.location = '#SSV-short-videos';

                                // jQuery(this).children('video').get(0).pause();
                                jQuery(this).children('.SSV-video-playing').show();

                                // open modal
                                jQuery('.SSV-play-modal').show();

                                // get video URL and set to popup      
                                let video = jQuery(this).children('video').children('source').attr('src');
                                let poster = jQuery(this).children('video').attr('data-cover');

                                SSVCurrentURL = video;
                                jQuery('.SSV-play-modal video source').attr('src', video);
                                jQuery('.SSV-play-modal video').attr('poster', poster);
                                jQuery('.SSV-play-modal video').get(0).load();
                                if (brandData['auto_play_mute_un'] === '0') {
                                    jQuery('.SSV-play-modal video').prop('muted', true);
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                                } else {
                                    jQuery('.SSV-play-modal video').prop('muted', false);
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                                }
                                ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));

                                // share set                    
                                jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(video));

                                jQuery('.SSV-video-popup-share').hide();
                                jQuery('.SSV-CTA-modal-inner').hide();
                                jQuery('.close-SSV-PIP').click();

                                disableScroll();
                            });

                            let currentTimePIP = 0;

                            jQuery('.close-SSV-modal').click(function () {
                                currentTimePIP = jQuery('.SSV-play-modal video').get(0).currentTime;

                                SSVpauseAll();
                                jQuery('.SSV-play-modal video').get(0).pause();
                                jQuery('.SSV-play-modal').hide();
                                jQuery('.SSV-video-playing').hide();

                                // jQuery('.SSV-PIP video source').attr('src', jQuery('.SSV-play-modal video source').attr('src'));
                                // jQuery('.SSV-PIP video').get(0).load();
                                // jQuery('.SSV-PIP video').get(0).currentTime = currentTimePIP;
                                // ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                                // jQuery('.SSV-PIP').show();

                                enableScroll();

                                localStorage.setItem('SSVlastPlayed', '');
                                localStorage.setItem('SSVlastPlayedTime', '');
                            });

                            jQuery('.close-SSV-PIP').click(function () {
                                jQuery('.SSV-PIP video').get(0).pause();
                                jQuery('.SSV-PIP').hide();

                                localStorage.setItem('SSVlastPlayed', '');
                                localStorage.setItem('SSVlastPlayedTime', '');
                            });

                            jQuery('.SSV-play-modal-play-pause').click(function () {
                                let video = jQuery('.SSV-play-modal video').get(0);

                                if (video.paused) {
                                    // jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
                                    video.play();
                                } else {
                                    // jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
                                    video.pause();
                                }
                            });

                            jQuery('.SSV-play-modal-mute-unmute').click(function () {
                                if (jQuery('.SSV-play-modal video').prop('muted')) {
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                                    jQuery('.SSV-play-modal video').prop('muted', false);

                                    globalMute = false;
                                } else {
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                                    jQuery('.SSV-play-modal video').prop('muted', true);

                                    globalMute = true;
                                }
                            });

                            // hide show play button
                            jQuery('.SSV-play-modal video').on('play', function () {
                                jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/pause.svg');
                                jQuery('.SSV-play-modal-play-pause').hide();
                            });

                            jQuery('.SSV-play-modal video').on('pause', function () {
                                jQuery('.SSV-play-modal-play-pause').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/play.svg');
                            });

                            // Next previous on modal
                            jQuery('.SSV-modal-left').click(function () {
                                let currentVideo = jQuery('.SSV-play-modal video source').attr('src');
                                let n = SSVallURL.indexOf(currentVideo);
                                if (typeof SSVallURL[(n - 1)] != 'undefined') {
                                    SSVCurrentURL = SSVallURL[(n - 1)];

                                    let poster = jQuery(`.swiper-wrapper source[src="${SSVallURL[(n - 1)]}"]`).parent('video').attr('data-cover');
                                    jQuery('.SSV-play-modal video').attr('poster', poster);

                                    jQuery('.SSV-play-modal video source').attr('src', SSVallURL[(n - 1)]);
                                    jQuery('.SSV-play-modal video').get(0).load();
                                    if (brandData['auto_play_mute_un'] === '0') {
                                        jQuery('.SSV-play-modal video').prop('muted', true);
                                        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                                    } else {
                                        jQuery('.SSV-play-modal video').prop('muted', false);
                                        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                                    }
                                    ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                                    jQuery('.SSV-video-popup-share').hide();
                                    jQuery('.SSV-CTA-modal-inner').hide();

                                    // share set                        
                                    jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(SSVallURL[(n - 1)]));
                                }
                            });

                            jQuery('.SSV-modal-right').click(function () {
                                let currentVideo = jQuery('.SSV-play-modal video source').attr('src');
                                let n = SSVallURL.indexOf(currentVideo);
                                if (typeof SSVallURL[(n + 1)] != 'undefined') {
                                    SSVCurrentURL = SSVallURL[(n + 1)];

                                    let poster = jQuery(`.swiper-wrapper source[src="${SSVallURL[(n + 1)]}"]`).parent('video').attr('data-cover');
                                    jQuery('.SSV-play-modal video').attr('poster', poster);

                                    jQuery('.SSV-play-modal video source').attr('src', SSVallURL[(n + 1)]);
                                    jQuery('.SSV-play-modal video').get(0).load();
                                    if (brandData['auto_play_mute_un'] === '0') {
                                        jQuery('.SSV-play-modal video').prop('muted', true);
                                        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                                    } else {
                                        jQuery('.SSV-play-modal video').prop('muted', false);
                                        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                                    }
                                    ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                                    jQuery('.SSV-video-popup-share').hide();
                                    jQuery('.SSV-CTA-modal-inner').hide();

                                    // share set
                                    jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(SSVallURL[(n + 1)]));
                                }
                            });

                            // share open
                            jQuery('.SSV-play-modal-share').click(function () {
                                jQuery('.SSV-video-popup-share').show();
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-share').addClass('SSV-video-popup-share-cover');
                                }, 100);
                            });

                            jQuery('.SSV-video-popup-share label').click(function () {
                                jQuery('.SSV-video-popup-share').removeClass('SSV-video-popup-share-cover');
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-share').hide();
                                }, 500);
                            });

                            jQuery('.SSV-facebook').click(function () {
                                let link = jQuery(this).attr('data-sharelink');

                                window.open('https://www.facebook.com/sharer/sharer.php?u=' + link, '_blank');
                            });

                            jQuery('.SSV-twitter').click(function () {
                                let link = jQuery(this).attr('data-sharelink');

                                window.open('https://twitter.com/share?url=' + link, '_blank');
                            });

                            jQuery('.SSV-whatsapp').click(function () {
                                let link = jQuery(this).attr('data-sharelink');

                                // var a = document.createElement('a');                                        
                                // a.href = "whatsapp://send?text="+link;
                                // a.data = "action : share/whatsapp/share";
                                // document.body.appendChild(a);
                                // a.click();

                                window.open('whatsapp://send?text=' + link);
                            });

                            jQuery('.SSV-copy').click(function () {
                                let link = jQuery(this).attr('data-sharelink');

                                jQuery('.SSV-copylink-input').val(link);
                                jQuery('.SSV-copylink-input').click();
                                jQuery('.SSV-video-popup-share span').fadeIn().delay(3000).fadeOut();
                            });

                            // if video play                            
                            if (typeof params['ssv'] != 'undefined') {
                                // jQuery('video source[src="'+params['ssv']+'"]').parent('video').parent('.swiper-slide').click();

                                // open modal
                                jQuery('.SSV-play-modal').show();

                                // get video URL and set to popup      
                                let video = params['ssv'];
                                SSVCurrentURL = window.atob(video);

                                jQuery('.SSV-play-modal video source').attr('src', window.atob(video));
                                jQuery('.SSV-play-modal video').get(0).load();
                                jQuery('.SSV-play-modal video').prop('muted', true);
                                ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));
                                jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');

                                // share set
                                jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + video);

                                setTimeout(() => {
                                    var elmnt = document.getElementById("SSV-short-videos");
                                    elmnt.scrollIntoView();
                                    disableScroll();
                                }, 2000);
                            }

                            // Hover play/pause                
                            jQuery('.SSV-play-modal video').hover(function () {
                                jQuery('.SSV-play-modal-play-pause').show();
                            });

                            jQuery('.SSV-play-modal video').mouseleave(function () {
                                jQuery('.SSV-play-modal-play-pause').hide();
                            });

                            jQuery('.SSV-play-modal-play-pause').mouseenter(function () {
                                jQuery('.SSV-play-modal-play-pause').show();
                            });

                            // Drag element
                            dragElement(document.getElementById("SSV-PIP"));

                            jQuery('.SSV-CTA-modal label span').click(function () {
                                jQuery('.SSV-CTA-modal-inner').hide();
                            });

                            jQuery('.SSV-play-modal-askaque').click(function () {
                                // if (isVerified) {
                                //     // open ask que
                                //     jQuery('.SSV-CTA-modal-inner').hide();
                                //     jQuery('.SSV-ask-question').show();

                                // } else {
                                //     // open OTP verification
                                //     jQuery('.SSV-CTA-modal-inner').hide();
                                //     jQuery('.SSV-OTP-send').show();
                                // }

                                jQuery('.SSV-CTA-modal-inner').hide();
                                jQuery('.SSV-ask-question').show();
                            });

                            // Add to cart click
                            jQuery('.SSV-play-modal-addtocart').click(function () {
                                let btn = jQuery(this);
                                let action = jQuery(this).attr('data-action');
                                let pId = jQuery(this).attr('data-pid');
                                // let link = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-product');
                                let link = jQuery(this).attr('data-link');
                                if (action == '2') {
                                    if (brandCustomizations['pip_mode'] === '1') {
                                        jQuery('.SSV-play-modal-pip').click();
                                    }
                                    // window.open(link, '_blank');
                                    SSVCTAClicksTrack(pId, '1');
                                    window.location = link;
                                } else if (action == '1') {
                                    SSVaddToCart(link, btn);
                                    SSVCTAClicksTrack(pId, '2');
                                } else if (action == '3') {
                                    // window.open('https://' + store + '/cart', '_blank');
                                    window.location = 'https://' + store + '/cart';
                                }
                            });

                            jQuery(document).keydown(function (event) {
                                if (jQuery('.SSV-play-modal').is(":visible")) {
                                    if (event.keyCode == 37 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                        jQuery('.SSV-play-modal .SSV-modal-left').click(); //on left arrow
                                    } else if (event.keyCode == 39 && !jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                        jQuery('.SSV-play-modal .SSV-modal-right').click();; //on right arrow
                                    } else if (event.key === 'Escape') {
                                        if (jQuery('.SSV-CTA-modal-inner').is(":visible")) {
                                            jQuery('.SSV-CTA-modal-inner').hide();
                                        } else if (jQuery('.SSV-video-product-open').is(":visible")) {
                                            jQuery('.SSV-video-product-open b').click();
                                        } else if (jQuery('.SSV-video-popup-brand-info').is(":visible")) {
                                            jQuery('.SSV-video-popup-brand-info label').click();
                                        } else {
                                            jQuery('.SSV-play-modal .close-SSV-modal').click(); //on escape
                                        }
                                    }
                                }
                            });

                            jQuery('.SSV-play-modal-pip').click(function () {
                                currentTimePIP = jQuery('.SSV-play-modal video').get(0).currentTime;

                                SSVpauseAll();
                                jQuery('.SSV-play-modal video').get(0).pause();
                                jQuery('.SSV-play-modal').hide();
                                jQuery('.SSV-video-playing').hide();

                                jQuery('.SSV-PIP video source').attr('src', jQuery('.SSV-play-modal video source').attr('src'));
                                jQuery('.SSV-PIP video').get(0).load();
                                jQuery('.SSV-PIP video').get(0).currentTime = currentTimePIP;
                                ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                                jQuery('.SSV-PIP').show();

                                enableScroll();
                            });

                            jQuery('.SSV-PIP-fullscreen').click(function () {
                                // get video URL and set to popup      
                                let video = jQuery('.SSV-PIP video source').attr('src');

                                SSVCurrentURL = video;
                                jQuery('.SSV-play-modal video source').attr('src', video);
                                jQuery('.SSV-play-modal video').get(0).load();
                                if (brandData['auto_play_mute_un'] === '0') {
                                    jQuery('.SSV-play-modal video').prop('muted', true);
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
                                } else {
                                    jQuery('.SSV-play-modal video').prop('muted', false);
                                    jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
                                }
                                ssvPlayWithPromise(jQuery('.SSV-play-modal video').get(0));

                                // share set                    
                                jQuery('.SSV-video-popup-share img').attr('data-sharelink', url + '?ssv=' + window.btoa(video));

                                jQuery('.SSV-video-popup-share').hide();
                                jQuery('.SSV-CTA-modal-inner').hide();

                                //close pip
                                jQuery('.close-SSV-PIP').click();
                                // open modal
                                jQuery('.SSV-play-modal').show();

                                disableScroll();
                            });

                            if (brandData['powered_by'] === '1') {
                                // jQuery('.SSV-powered-by').show();
                                // jQuery('.SSV-video-title-bottom a').show();
                                jQuery('.SSV-video-popup-brand-info-powered').show();
                            } else {
                                // jQuery('.SSV-powered-by').hide();
                                // jQuery('.SSV-video-title-bottom a').hide();                        
                                jQuery('.SSV-video-popup-brand-info-powered').hide();
                            }

                            jQuery(document).on('click touch', function (event) {
                                if (jQuery('.SSV-video-popup-brand-info').is(":visible")) {
                                    if (jQuery(event.target).is('.SSV-play-modal') || jQuery(event.target).is('.SSV-play-modal-video-container video')) {
                                        jQuery('.SSV-video-popup-brand-info label').click();
                                    }
                                } else if (jQuery('.SSV-play-modal').is(":visible")) {
                                    if (jQuery(event.target).is('.SSV-play-modal')) {
                                        // jQuery('.SSV-play-modal .close-SSV-modal').click();
                                        if (brandCustomizations['pip_mode'] === '1') {
                                            jQuery('.SSV-play-modal-pip').click();
                                        }
                                    }
                                }
                            });

                            // browser back press
                            window.onpopstate = function (event) {
                                if (jQuery('.SSV-play-modal').is(":visible")) {
                                    jQuery('.SSV-play-modal .close-SSV-modal').click();
                                }
                            };

                            jQuery('#SSV-PIP video').click(function () {
                                jQuery('.SSV-PIP-fullscreen').click();
                            });

                            // Product detail open
                            jQuery('.SSV-video-popup-product').click(function () {
                                jQuery('.SSV-video-product-open').show();
                                setTimeout(() => {
                                    jQuery('.SSV-video-product-open').addClass('SSV-video-product-open-cover');
                                }, 100);
                            });

                            jQuery('.SSV-video-product-open b').click(function () {
                                jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
                                setTimeout(() => {
                                    jQuery('.SSV-video-product-open').hide();
                                }, 500);
                            });

                            // Brand detail open
                            jQuery('.SSV-video-popup-brand-info-btn').click(function () {
                                jQuery('.SSV-video-popup-brand-info').show();
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-brand-info').addClass('SSV-video-popup-brand-info-cover');
                                }, 100);
                            });

                            jQuery('.SSV-video-popup-brand-info label').click(function () {
                                jQuery('.SSV-video-popup-brand-info').removeClass('SSV-video-popup-brand-info-cover');
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-brand-info').hide();
                                }, 500);
                            });

                            // Brand data update
                            if (brandData['user_profile']) {
                                jQuery('.SSV-video-popup-brand-info-brand-logo').attr('src', brandData['user_profile']);
                                jQuery('.SSV-video-popup-brand-info-brand-logo').show();
                            } else {
                                jQuery('.SSV-video-popup-brand-info-brand-logo').hide();
                            }

                            jQuery('.SSV-video-popup-brand-info-brand-name').html(brandData['designer_brand_name']);

                            if (brandData['designer_bio']) {
                                jQuery('.SSV-video-popup-brand-info-brand-description').html(brandData['designer_bio']);
                                jQuery('.SSV-video-popup-brand-info-brand-description').show();
                                jQuery('.SSV-video-popup-brand-info-brand-about').show();
                            } else {
                                jQuery('.SSV-video-popup-brand-info-brand-description').hide();
                                jQuery('.SSV-video-popup-brand-info-brand-about').hide();
                            }

                            // on swipe left rigght on phone
                            document.addEventListener('touchstart', handleTouchStart, false);
                            document.addEventListener('touchmove', handleTouchMove, false);

                            if (localStorage.getItem('SSVlastPlayed')) {
                                // currentTimePIP = localStorage.getItem('SSVlastPlayedTime') ? localStorage.getItem('SSVlastPlayedTime') : 0;
                                SSVCurrentURL = localStorage.getItem('SSVlastPlayed');

                                jQuery('.SSV-PIP video source').attr('src', localStorage.getItem('SSVlastPlayed'));
                                jQuery('.SSV-PIP video').get(0).load();
                                // jQuery('.SSV-PIP video').get(0).currentTime = Math.round(parseInt(currentTimePIP));
                                ssvPlayWithPromise(jQuery('.SSV-PIP video').get(0));
                                jQuery('.SSV-PIP video').attr('loop', true);
                                setTimeout(() => {
                                    jQuery('.SSV-PIP').show();
                                }, 1000);
                            }

                            // PIP continue
                            // window.addEventListener('beforeunload', function (event) {
                            //     console.log('Satam');
                            //     console.log(jQuery('.SSV-play-modal').find('video').children('source').attr('src'));
                            //     if (jQuery('.SSV-play-modal').is(":visible")) {
                            //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-play-modal').find('video').children('source').attr('src'));
                            //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                            //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-play-modal').find('video').get(0).currentTime);
                            //     }
                            //     if (jQuery('.SSV-PIP').is(":visible")) {
                            //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-PIP').find('video').children('source').attr('src'));
                            //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                            //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-PIP').find('video').get(0).currentTime);
                            //     }
                            // });

                            // window.addEventListener('unload', function (event) {
                            //     console.log('Gandhi');
                            //     console.log(jQuery('.SSV-play-modal').find('video').children('source').attr('src'));
                            //     if (jQuery('.SSV-play-modal').is(":visible")) {
                            //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-play-modal').find('video').children('source').attr('src'));
                            //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                            //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-play-modal').find('video').get(0).currentTime);
                            //     }
                            //     if (jQuery('.SSV-PIP').is(":visible")) {
                            //         // localStorage.setItem('SSVlastPlayed', jQuery('.SSV-PIP').find('video').children('source').attr('src'));
                            //         localStorage.setItem('SSVlastPlayed', SSVCurrentURL);
                            //         localStorage.setItem('SSVlastPlayedTime', jQuery('.SSV-PIP').find('video').get(0).currentTime);
                            //     }
                            // });  

                            jQuery(document).on('click', '.SSV-P-see-more', function () {
                                jQuery(this).parent().next().show();
                                jQuery(this).parent().hide();
                            });

                            jQuery(document).on('click', '.SSV-P-see-less', function () {
                                jQuery(this).parent().prev().show();
                                jQuery(this).parent().hide();
                            });

                            if (brandCustomizations['pip_mode'] === '0') {
                                jQuery('.SSV-play-modal-pip').hide();
                            }

                            jQuery('.SSV-play-modal video').on('loadstart', function (event) {
                                // jQuery('.SSV-popup-video-loader').show();
                                jQuery('.SSV-play-modal-video-container').addClass('SSV-popup-video-blur-load');
                            });
                            jQuery('.SSV-play-modal video').on('canplay', function (event) {
                                // jQuery('.SSV-popup-video-loader').hide();
                                jQuery('.SSV-play-modal-video-container').removeClass('SSV-popup-video-blur-load');
                            });

                            // Product multiple open
                            jQuery('.SSV-video-popup-product-multi').click(function () {
                                jQuery('.SSV-video-popup-product-list-multi').show();
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-product-list-multi').addClass('SSV-video-popup-product-list-multi-cover');
                                }, 100);
                            });

                            jQuery('.SSV-video-popup-product-list-multi-title b').click(function () {
                                jQuery('.SSV-video-popup-product-list-multi').removeClass('SSV-video-popup-product-list-multi-cover');
                                setTimeout(() => {
                                    jQuery('.SSV-video-popup-product-list-multi').hide();
                                }, 500);
                            });

                            // Product multiple back
                            jQuery('.SSV-video-popup-product-list-multi-title label').click(function () {
                                if (jQuery('.SSV-video-popup-product-list-multi-product-detail').is(":visible")) {
                                    jQuery('.SSV-video-popup-product-list-multi-product-detail').hide();
                                    jQuery('.SSV-video-popup-product-list-multi-append').show();
                                } else if (jQuery('.SSV-video-popup-product-list-multi-append').is(":visible")) {
                                    jQuery('.SSV-video-popup-product-list-multi-title b').click();
                                }
                            });

                        } else {
                            // let append = `<p style="margin: 50px 0; padding: 10px; text-align: center; font-size: 17px; color: #999;display: block;width: 100%;">Looks like you didn't enable SWIRL <-> Shopify yet, or You don't have short videos created yet.</p>`;
                            let append = ``;

                            // jQuery('#SSV-short-videos .swiper-wrapper').empty();
                            jQuery('#SSV-short-videos .swiper-wrapper').html(append);
                        }
                    }
                });

                SSVsetPopupHight();
            });
        }
    }

})();
// }

// play with promise
function ssvPlayWithPromise(player) {
    var playPromise = player.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
        })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }
}

// update all durations on ready
function updateSSVDurations(player) {
    var minutes = String(Math.floor(parseInt(player.duration / 60, 10))).padStart(2, '0');
    var seconds = String(Math.floor(player.duration % 60)).padStart(2, '0');

    jQuery(player).parent('.swiper-slide').children('.SSV-video-timer-top').children('p').html(minutes + ':' + seconds);
}

// Update the progress bar
function updateSSVProgressBar(player) {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    jQuery(player).parent('.swiper-slide').children('.SSV-video-progress').children('.SSV-video-progress-inner').css('width', percentage + '%');

    var minutes = String(Math.floor(parseInt(player.duration - player.currentTime) / 60, 10)).padStart(2, '0');
    var seconds = String(Math.floor(parseInt(player.duration - player.currentTime) % 60)).padStart(2, '0');

    jQuery(player).parent('.swiper-slide').children('.SSV-video-timer-top').children('p').html(minutes + ':' + seconds);
}

function SSVpauseAll(player = '') {
    jQuery('#SSV-short-videos .swiper-slide video').each(function () {
        jQuery(this).get(0).pause();
    });

    if (player) {
        var playPromise = player.get(0).play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
            })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                });
        }
    }
}

// Update the progress bar
function updateSSVModalProgressBar(player) {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / player.duration) * player.currentTime);

    jQuery(player).parent('.SSV-play-modal-video-container').children('.SSV-video-popup-progress').children('.SSV-video-popup-progress-inner').css('width', percentage + '%');
}

// Update Product Info
function updateSSVModalInfos(player) {
    // Buy now and add to cart btn text change
    jQuery('.SSV-play-modal-buynow-on').html(brandCustomizations['buy_btn']);
    jQuery('.SSV-pm-buy-now').html(brandCustomizations['buy_btn']);
    jQuery('.SSV-pmm-buy-now').html(brandCustomizations['buy_btn']);

    jQuery('.SSV-pm-add-to-cart').html(brandCustomizations['add_to_cart_btn']);
    jQuery('.SSV-pmm-add-to-cart').html(brandCustomizations['add_to_cart_btn']);

    // all btn border color
    jQuery('.SSV-play-modal-addtocart').css('border-color', brandCustomizations['bk_color_buy_btn']);

    // background color buy now
    jQuery('.SSV-play-modal-buynow-on').css('background', brandCustomizations['bk_color_buy_btn']);
    jQuery('.SSV-pm-buy-now').css('background', brandCustomizations['bk_color_buy_btn']);
    jQuery('.SSV-pmm-buy-now').css('background', brandCustomizations['bk_color_buy_btn']);

    jQuery('.SSV-play-modal-buynow-on')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');
    jQuery('.SSV-pm-buy-now')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');
    jQuery('.SSV-pmm-buy-now')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');

    // background add to cart
    jQuery('.SSV-pm-add-to-cart').css('border-color', brandCustomizations['bk_color_add_to_cart_btn']);
    jQuery('.SSV-pmm-add-to-cart').css('border-color', brandCustomizations['bk_color_add_to_cart_btn']);

    jQuery('.SSV-pm-add-to-cart')[0].style.setProperty('color', brandCustomizations['front_color_add_to_cart_btn'], 'important');
    jQuery('.SSV-pmm-add-to-cart')[0].style.setProperty('color', brandCustomizations['front_color_add_to_cart_btn'], 'important');

    // background of asq que modal headers and btns
    jQuery('.SSV-CTA-modal-inner label').css('background', brandCustomizations['bk_color_buy_btn']);
    jQuery('.SSV-CTA-modal-inner label')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');

    jQuery('.SSV-CTA-modal-inner button').css('background', brandCustomizations['bk_color_buy_btn']);
    jQuery('.SSV-CTA-modal-inner button')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');

    // modify product count    
    jQuery('.SSV-video-popup-product-multi .counter')[0].style.setProperty('background', brandCustomizations['bk_color_buy_btn'], 'important');
    jQuery('.SSV-video-popup-product-multi .counter')[0].style.setProperty('color', brandCustomizations['front_color_buy_btn'], 'important');
    jQuery('.SSV-video-popup-product-multi img')[0].style.setProperty('border-color', brandCustomizations['bk_color_buy_btn'], 'important');

    // hide default buy now
    jQuery('.SSV-play-modal-buynow-on').hide();

    // hide opens
    jQuery('.SSV-video-popup-brand-info').hide();
    jQuery('.SSV-video-product-open').hide();
    jQuery('.SSV-video-popup-share').hide();
    jQuery('.SSV-video-popup-product').hide();
    jQuery('.SSV-video-popup-product-multi').hide();
    jQuery('.SSV-video-popup-product-list-multi').hide();

    jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
    jQuery('.SSV-video-popup-brand-info').removeClass('SSV-video-popup-brand-info-cover');
    jQuery('.SSV-video-popup-share').removeClass('SSV-video-popup-share-cover');
    jQuery('.SSV-video-popup-product-list-multi').removeClass('SSV-video-popup-product-list-multi-cover');

    // multi detail show/hide
    jQuery('.SSV-video-popup-product-list-multi-product-detail').hide();
    jQuery('.SSV-video-popup-product-list-multi-append').show();

    // title
    let video = jQuery(player).children('source').attr('src');
    let title = jQuery(`.swiper-wrapper source[src="${video}"]`).parent('video').attr('data-title');
    jQuery(player).parent('.SSV-play-modal-video-container').children('.SSV-video-popup-title').html(title);

    // data of modal carousel
    let currentPlaylistCode = (jQuery(`.swiper-wrapper source[src="${video}"]`).closest('.swirl-short-videos-M').data('playlist'));
    SSVallURL = SSVallBreakURL[currentPlaylistCode] ? SSVallBreakURL[currentPlaylistCode] : SSVallURL;

    // Product if attached
    let vid = jQuery(`.swiper-wrapper source[src="${video}"]`).parent('video').attr('data-vid');
    let products = productsAll[vid];
    if (Object.keys(products).length > 0) {
        if (Object.keys(products).length === 1) {
            let product = products[0];
            // add product info bottom        
            product['desription'] = product['desription'].trim();
            let strikePrice = parseFloat(product['price']) > parseFloat(product['discount_price']) ? `${product['currencysymbols'] + '' + product['discount_price']} <strike style="color: #727272; margin-left: 10px;">${product['currencysymbols'] + '' + product['price']}</strike>` : product['currencysymbols'] + ' ' + product['price'];
            jQuery('.SSV-video-popup-product p').html(product['title']);
            jQuery('.SSV-video-popup-product label').html(strikePrice);
            jQuery('.SSV-video-popup-product img').attr('src', product['image']);

            setTimeout(() => {
                jQuery('.SSV-video-popup-product').show();
            }, 100);

            // product detail and add to cart and buynow
            jQuery('.SSV-video-product-open p').html(product['title']);
            if (product['desription']) {
                let description = product['desription'].length > 200 ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + product['desription'].substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + product['desription'] + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See less</a></h6>' : product['desription'];
                jQuery('.SSV-video-product-open section').html(description);
                jQuery('.SSV-video-product-open section').show();
                jQuery('.SSV-video-product-open span').show();
            } else {
                jQuery('.SSV-video-product-open section').hide();
                jQuery('.SSV-video-product-open span').hide();
            }
            strikePrice = parseFloat(product['price']) > parseFloat(product['discount_price']) ? `${product['currencysymbols'] + '' + product['discount_price']} <strike style="color: #bfbfbf; margin-left: 10px;">${product['currencysymbols'] + '' + product['price']}</strike>` : product['currencysymbols'] + ' ' + product['price'];
            jQuery('.SSV-video-product-open label').html(strikePrice);
            jQuery('.SSV-video-product-open img').attr('src', product['image']);

            if (brandCustomizations['auto_show_cta_btn'] === '1') {
                jQuery('.SSV-video-product-open').show();
                jQuery('.SSV-video-product-open').addClass('SSV-video-product-open-cover');
            }

            // let prodLink = jQuery(`.swiper-wrapper source[src="${video}"]`).parent('video').attr('data-product');
            let prodLink = product['url'];
            if (prodLink) {
                jQuery('.SSV-play-modal-addtocart').attr('data-link', prodLink);
                jQuery('.SSV-play-modal-addtocart').attr('data-pid', product['product_id']);
                if (addedtoCart.includes(prodLink)) {
                    jQuery('.SSV-pm-add-to-cart').html('View Cart');
                    jQuery('.SSV-pm-add-to-cart').attr('data-action', '3');
                } else {
                    jQuery('.SSV-pm-add-to-cart').html(brandCustomizations['add_to_cart_btn']);
                    jQuery('.SSV-pm-add-to-cart').attr('data-action', '1');
                }

                if (prodLink.search(store) >= 0) {
                    jQuery('.SSV-pm-add-to-cart').show();
                } else {
                    jQuery('.SSV-pm-add-to-cart').hide();
                }
            } else {
                jQuery('.SSV-play-modal-addtocart').hide();
            }
        } else {
            jQuery('.SSV-video-popup-product-multi img').attr('src', products[0]['image']);
            jQuery('.SSV-video-popup-product-multi .counter').html(products.length);

            let appendProds = '';
            products.forEach(product => {
                let strikePrice = parseFloat(product['price']) > parseFloat(product['discount_price']) ? `${product['currencysymbols'] + '' + product['discount_price']} <strike style="color: #bfbfbf; margin-left: 10px;">${product['currencysymbols'] + '' + product['price']}</strike>` : product['currencysymbols'] + ' ' + product['price'];
                appendProds += `
                    <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">
                        <img src="${product['image']}" alt="Product Image" height="" width="">
                        <div>
                            <p data-pid="${product['product_id']}" data-desc="${product['desription'].replace('"', '').replace('<', '').replace('>', '')}">${product['title']}</p>
                            <label data-link="${product['url']}">${strikePrice}</label>
                        </div>
                    </div>
                `;
            });
            jQuery('.SSV-video-popup-product-list-multi-append').html(appendProds);

            setTimeout(() => {
                jQuery('.SSV-video-popup-product-multi').show();
            }, 100);
        }
    } else {
        jQuery('.SSV-play-modal-buynow-on').show();
        jQuery('.SSV-play-modal-buynow-on').attr('data-link', jQuery(`.swiper-wrapper source[src="${video}"]`).parent('video').attr('data-productlink'));

        jQuery('.SSV-video-popup-product').hide();
        jQuery('.SSV-video-product-open').hide();
        jQuery('.SSV-video-product-open').removeClass('SSV-video-product-open-cover');
    }

    // CTA updates
    let buynow = jQuery(`.swiper-wrapper source[src="${video}"]`).parent('video').attr('data-buynow');
    if (buynow != '' && buynow !== 'null') {
        jQuery('.SSV-play-modal-buynow-on').html(buynow);
        jQuery('.SSV-pm-buy-now').html(buynow);
        jQuery('.SSV-pmm-buy-now').html(buynow);
    }

    // next prev button show hide
    let n = SSVallURL.indexOf(video);
    jQuery('.SSV-modal-left').show();
    jQuery('.SSV-modal-right').show();
    if (typeof SSVallURL[(n + 1)] === 'undefined') {
        jQuery('.SSV-modal-right').hide();
    }
    if (typeof SSVallURL[(n - 1)] === 'undefined') {
        jQuery('.SSV-modal-left').hide();
    }

    // global mute apply
    if (globalMute == true) {
        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/mute.svg');
        jQuery('.SSV-play-modal video').prop('muted', globalMute);
    } else {
        jQuery('.SSV-play-modal-mute-unmute').children('img').attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/unmute.svg');
        jQuery('.SSV-play-modal video').prop('muted', globalMute);
    }

    if (brandCustomizations['pip_mode'] === '1') {
        localStorage.setItem('SSVlastPlayed', video);
    }

    // hide show addtocart and buynow btn
    if (!brandCustomizations['add_to_cart_btn']) {
        jQuery('.SSV-pm-add-to-cart').hide();
        jQuery('.SSV-pmm-add-to-cart').hide();
    }
}

function openMultiProductDetail(prodElem) {
    jQuery('.SSV-video-popup-product-list-multi-product-detail p').html(jQuery(prodElem).find('p').html());
    let desc = jQuery(prodElem).find('p').attr('data-desc')
    if (desc) {
        let description = desc.length > 200 ? '<h6 style="margin:0 !important;font-size: 14px; font-weight: normal;color: #fff!important;line-height: normal;">' + desc.substr(0, 196) + '... <a class="SSV-P-see-more" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See more</a></h6><h6 style="margin:0 !important;font-size: 14px;display:none; font-weight: normal;color: #fff!important;line-height: normal;">' + desc + ' <a class="SSV-P-see-less" style="cursor: pointer;font-weight: bold;text-decoration: none; color: #2196f3 !important;">See less</a></h6>' : desc;
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').html(description);
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').show();
        jQuery('.SSV-video-popup-product-list-multi-product-detail span').show();
    } else {
        jQuery('.SSV-video-popup-product-list-multi-product-detail section').hide();
        jQuery('.SSV-video-popup-product-list-multi-product-detail span').hide();
    }
    jQuery('.SSV-video-popup-product-list-multi-product-detail label').html(jQuery(prodElem).find('label').html());
    jQuery('.SSV-video-popup-product-list-multi-product-detail img').attr('src', jQuery(prodElem).find('img').attr('src'));

    if (brandCustomizations['auto_show_cta_btn'] === '1') {
        jQuery('.SSV-video-popup-product-list-multi').show();
        jQuery('.SSV-video-popup-product-list-multi').addClass('SSV-video-popup-product-list-multi-cover');
    }

    let prodLink = jQuery(prodElem).find('label').attr('data-link');
    if (prodLink) {
        jQuery('.SSV-play-modal-addtocart').attr('data-link', prodLink);
        jQuery('.SSV-play-modal-addtocart').attr('data-pid', jQuery(prodElem).find('p').attr('data-pid'));
        if (addedtoCart.includes(prodLink)) {
            jQuery('.SSV-pmm-add-to-cart').html('View Cart');
            jQuery('.SSV-pmm-add-to-cart').attr('data-action', '3');
        } else {
            jQuery('.SSV-pmm-add-to-cart').html(brandCustomizations['add_to_cart_btn']);
            jQuery('.SSV-pmm-add-to-cart').attr('data-action', '1');
        }

        if (prodLink.search(store) >= 0) {
            jQuery('.SSV-pmm-add-to-cart').show();
        } else {
            jQuery('.SSV-pmm-add-to-cart').hide();
        }
    } else {
        jQuery('.SSV-play-modal-addtocart').hide();
    }

    jQuery('.SSV-video-popup-product-list-multi-append').hide();
    jQuery('.SSV-video-popup-product-list-multi-product-detail').show();

    // hide show addtocart and buynow btn
    if (!brandCustomizations['add_to_cart_btn']) {
        jQuery('.SSV-pm-add-to-cart').hide();
        jQuery('.SSV-pmm-add-to-cart').hide();
    }
}

function updateSSVPIPInfos(player) {
    let video = jQuery(player).children('source').attr('src');
    if (brandCustomizations['pip_mode'] === '1') {
        localStorage.setItem('SSVlastPlayed', video);
    }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function SSVcopyLink(inp) {
    /* Get the text field */
    var copyText = inp;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    return;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 38: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

let allOverElements = [];
let allOverElementsSticky = [];
// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    // hide all fixed visible elements
    allOverElements = [];
    allOverElementsSticky = [];
    jQuery('*').each(function () {
        if (jQuery(this).css('position') == 'fixed' && jQuery(this).is(":visible")) {
            if (!jQuery(this).is('.SSV-play-modal') && !jQuery(this).is('.SSV-PIP')) {
                jQuery(this).hide();
                allOverElements.push(jQuery(this));
            }
        }

        if (jQuery(this).css('position') == 'sticky' && jQuery(this).is(":visible")) {
            if (!jQuery(this).is('.SSV-play-modal') && !jQuery(this).is('.SSV-PIP')) {
                jQuery(this).hide();
                allOverElements.push(jQuery(this));
            }
        }
    });
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);

    // Show again all hidden fixed elements
    allOverElements.forEach(element => {
        jQuery(element).show();
    });

    // Show again all hidden fixed elements
    allOverElementsSticky.forEach(element => {
        jQuery(element).show();
    });
}

let userName = '';
let userCode = '';
let userMobile = '';
let generatedOTP = '';
let userEmail = '';
let userIncome = '';

function SSVsendOTP(form) {
    let formData = jQuery(form).serializeArray();

    userEmail = brandCustomizations['email'] === 1 ? formData[3]['value'] : '';
    userIncome = brandCustomizations['dropdown'] === 1 ? formData[4]['value'] : '';

    if (live_stream_phone === '1' && live_stream_phone_otp === '1') {
        let name = formData[0]['value']; userName = name;
        let code = formData[1]['value']; userCode = code;
        let mobile = formData[2]['value']; userMobile = mobile;

        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/Shopify/otp",
            data: "code=" + encodeURIComponent(code) + "&mobile=" + encodeURIComponent(mobile),
            beforeSend: function () {
                jQuery('.SSV-CTA-loader').show();
            },
            success: function (response) {
                if (response.success == true) {
                    generatedOTP = response.data;
                    jQuery('.SSV-CTA-modal-inner').hide();
                    jQuery('.SSV-OTP-verification').show();
                } else {
                    jQuery('.SSV-OTP-send button').click();
                }
            },
            error: function (request, error) {
                alert("Something went wrong! Please try again later.");
            },
            complete: function () {
                jQuery('.SSV-CTA-loader').hide();
            }
        });
    } else if (live_stream_phone === '1') {
        let name = formData[0]['value']; userName = name;
        let mobile = formData[2]['value']; userMobile = mobile;

        jQuery('.SSV-OTP-verification form').submit();
    } else {
        let name = formData[0]['value']; userName = name;

        jQuery('.SSV-OTP-verification form').submit();
    }

    return false;
}

function SSVregisterOTP(form) {
    let formData = jQuery(form).serializeArray();
    let OTP = formData[0]['value'];

    if (OTP == generatedOTP || live_stream_phone_otp === '0') {
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/Shopify/user_register",
            data: "name=" + encodeURIComponent(userName) + "&code=" + encodeURIComponent(userCode) + "&mobile=" + encodeURIComponent(userMobile),
            beforeSend: function () {
                jQuery('.SSV-CTA-loader').show();
            },
            success: function (response) {
                if (response.success == true) {
                    localStorage.setItem('SWIRLVerifiedUser', JSON.stringify(response.data));
                    isVerified = true;
                    SWIRLuser = response.data;
                    // jQuery('.SSV-CTA-modal-inner').hide();
                    // jQuery('.SSV-ask-question').show();

                    jQuery('.SSV-OTP-verification input').val('');
                    jQuery('.SSV-ask-question button').click();
                } else {
                    jQuery('.SSV-OTP-verification button').click();
                }
            },
            error: function (request, error) {
                alert("Something went wrong! Please try again later.");
            },
            complete: function () {
                jQuery('.SSV-CTA-loader').hide();
            }
        });
    } else {
        jQuery('.SSV-CTA-message').css('color', '#bb2124');
        jQuery('.SSV-CTA-message').html('Incorrect OTP!').fadeIn().delay(2000).fadeOut();
    }

    return false;
}

function SSVaskQuestion(form) {
    let formData = jQuery(form).serializeArray();
    let question = formData[0]['value'];

    if (SWIRLuser) {
        let userId = SWIRLuser.user_id;
        let designerId = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-did');
        let swirlId = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-vid');

        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/Shopify/askque",
            data: "user_id=" + encodeURIComponent(userId) + "&designer_id=" + encodeURIComponent(designerId) + "&msg=" + encodeURIComponent(question) + "&swirls_id=" + encodeURIComponent(swirlId),
            beforeSend: function () {
                jQuery('.SSV-CTA-loader').show();
            },
            success: function (response) {
                if (response.success == true) {
                    jQuery('.SSV-CTA-message').css('color', '#22bb33');
                    jQuery('.SSV-CTA-message').html('Your query is submitted. Thank you!').fadeIn().delay(2500).fadeOut();
                    jQuery('.SSV-ask-question textarea').val('');
                    setTimeout(() => {
                        jQuery('.SSV-CTA-modal-inner').hide();
                        jQuery('.SSV-ask-question').hide();
                    }, 3000);
                } else {
                    jQuery('.SSV-ask-question button').click();
                }
            },
            error: function (request, error) {
                alert("Something went wrong! Please try again later.");
            },
            complete: function () {
                jQuery('.SSV-CTA-loader').hide();
            }
        });
    } else {
        jQuery('.SSV-CTA-modal-inner').hide();
        jQuery('.SSV-OTP-send').show();
    }

    return false;
}

// check product is shopify
function SSVaddToCart(link, btn) {
    // var url = link;    
    var url = link.split('?')[0] ? link.split('?')[0] : link;
    var handle = url.substring(url.lastIndexOf('/') + 1);
    var productId = '';

    // fetch product from handle
    jQuery.ajax({
        url: '/products/' + handle + '.js',
        dataType: 'json'
    }).done(function (product) {
        if (product) {
            productId = product.variants[0]['id'];

            jQuery(btn).html('Adding...');

            var exist = false;
            // fetch cart
            jQuery.ajax({
                url: '/cart.js',
                dataType: 'json'
            }).done(function (data) {
                // console.log(data);
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i]['id'] == productId) {
                        exist = true;
                    }
                }

                if (exist == false) {
                    jQuery.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        dataType: 'json',
                        data: {
                            items: [
                                {
                                    id: productId,
                                    quantity: 1
                                }
                            ]
                        }
                    }
                    ).done(function (response) {
                        jQuery(btn).html('View Cart');
                        jQuery(btn).attr('data-action', '3');
                        // setTimeout(() => {
                        //     jQuery(btn).html('Add to Cart')
                        // }, 2000);
                        addedtoCart.push(link);
                        const event = new Event('SwirlAddtoCart');
                        document.getElementById('swirl-short-videos').dispatchEvent(event);
                    });
                } else {
                    jQuery(btn).html('View Cart');
                    jQuery(btn).attr('data-action', '3');
                    // setTimeout(() => {
                    //     jQuery(btn).html('Add to Cart')
                    // }, 2000);
                    addedtoCart.push(link);
                    const event = new Event('SwirlAddtoCart');
                    document.getElementById('swirl-short-videos').dispatchEvent(event);
                }
            });
        } else {
            jQuery(btn).html('Failed').delay(3000).html(brandCustomizations['add_to_cart_btn']);
        }
    });
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* right swipe */
            if (jQuery('.SSV-play-modal').is(":visible")) {
                jQuery('.SSV-modal-right').click();
            }
        } else {
            /* left swipe */
            if (jQuery('.SSV-play-modal').is(":visible")) {
                jQuery('.SSV-modal-left').click();
            }
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
        } else {
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

function SSVsetPopupHight() {
    let currentHeight = window.innerHeight;
    jQuery('.SSV-play-modal').height(currentHeight);
    // let currentHeight = document.documentElement.clientHeight;

    // let currentWidth = document.documentElement.clientWidth;
    // jQuery('.SSV-play-modal').width(currentWidth);
}

// Track clicks
function SSVCTAClicksTrack(pId, type) {
    let vid = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-vid');
    let did = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-did');
    let pid = pId;
    let cType = type;
    let uid = SWIRLuser ? SWIRLuser.user_id : '';

    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.goswirl.live/index.php/shopify/actionbuttons",
        data: "designer_id=" + encodeURIComponent(did) + "&product_id=" + encodeURIComponent(pid) + "&user_id=" + encodeURIComponent(uid) + "&video_id=" + encodeURIComponent(vid) + "&type=" + encodeURIComponent(cType),
        beforeSend: function () {
        },
        success: function (response) {
        },
        error: function (request, error) {
        },
        complete: function () {
        }
    });
}

// Gumlet video count
let gumletVideoCountCall = 0;
function gumletVideoCount() {
    gumletVideoCountCall++;
    let gumletAssetId = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-gumletassetid');
    if (gumletAssetId != null && gumletVideoCountCall > 1) {
        // alert('Init');
        var gumletConfig = {
            property_id: 'jYfkUIVL', // required:  please replace with correct property id.
        };
        var player = document.getElementById('gumlet-video-count');
        var gumletInsights = gumlet.insights(gumletConfig);
        gumletInsights.register(player);

        vid = jQuery(`.swiper-wrapper source[src="${SSVCurrentURL}"]`).parent('video').attr('data-vid');
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://api.goswirl.live/index.php/BrandController/getShortVideoAnalytics",
            data: "vid=" + encodeURIComponent(vid),
            success: function (response) {
                // console.log(response);
            }
        });
    }
}

function updateSSVSwiperNavigation() {
    jQuery(".swiper").each(function () {
        if (jQuery(window).width() >= 640 && jQuery(this).find(".swiper-slide").length < 6) {
            jQuery(this).find('.swiper-button-next').addClass("swiper-button-disabled");
            jQuery(this).find('.swiper-button-prev').addClass("swiper-button-disabled");
        } else if (jQuery(window).width() < 640 && jQuery(this).find(".swiper-slide").length < 3) {
            jQuery(this).find('.swiper-button-next').addClass("swiper-button-disabled");
            jQuery(this).find('.swiper-button-prev').addClass("swiper-button-disabled");
        }
    });

}

addEventListener('resize', (event) => {
    updateSSVSwiperNavigation();
    SSVsetPopupHight();
});