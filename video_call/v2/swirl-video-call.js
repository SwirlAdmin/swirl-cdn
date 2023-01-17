let brandCustonization = [];

(function () {
  if (document.querySelector('#swirl-video-call') != null) {
    var headTag = document.getElementsByTagName("head")[0];

    var jqTag = document.createElement('link');
    jqTag.rel = 'stylesheet';
    jqTag.href = 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/video_call/v2/swirl-video-call.min.css';
    // jqTag.href = 'style.css';
    headTag.insertBefore(jqTag, headTag.firstChild);

    var jqTag = document.createElement('script');
    jqTag.rel = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    headTag.insertBefore(jqTag, headTag.lastChild);
    jqTag.onload = () => { SVCexecuteNow(); }

    function SVCexecuteNow() {
      let svc = document.querySelector('#swirl-video-call');
      let identity = atob(svc.dataset.identity);
      let did = atob(svc.dataset.did);
      var dropdown = '';
      var dropdown2 = '';

      let todaysScheduled = [];
      let tomorrowsScheduled = [];
      let DtomorrowsScheduled = [];

      jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: 'https://api.goswirl.live/index.php/shopify/videocall_categories?user=' + did,
        success: function (data) {
          // console.log(data['customization']);
          brandCustonization = data['customization'];

          if (typeof data['categories']['0'] != 'undefined') {
            if (typeof data['categories']['0']['category_users'][0] != 'undefined') {
              dropdown += `<select id="callTo" class="swirl-video-call-popup-select">
                <option value="0" data-name=" " selected disabled>Select ${data['categories']['0']['name']}</option>
              `;

              data['categories']['0']['category_users'].forEach(VCuser => {
                dropdown += `<option value="${VCuser['brand_id']}" data-name="${VCuser['name']}">${VCuser['name']}</option>`;
              });

              dropdown += `</select>`;
            }
          }

          if (typeof data['categories']['1'] != 'undefined') {
            if (typeof data['categories']['1']['category_users'][1] != 'undefined') {
              dropdown2 += `<select id="SVCdrop2" class="swirl-video-call-popup-select">
                <option value="0" data-name=" " selected disabled>Select ${data['categories']['1']['name']}</option>
              `;

              data['categories']['1']['category_users'].forEach(VCuser => {
                dropdown2 += `<option value="${VCuser['brand_id']}" data-name="${VCuser['name']}">${VCuser['name']}</option>`;
              });

              dropdown2 += `</select>`;
            }
          }

          if (data['videocall']['today'].length && brandCustonization['slot_autofill'] === 1) {
            data['videocall']['today'].forEach(vt => {
              todaysScheduled.push(vt['startingTime'].split(' ')[1].substring(0, 5));
            });
          }

          if (data['videocall']['tomorrow'].length && brandCustonization['slot_autofill'] === 1) {
            data['videocall']['tomorrow'].forEach(vt => {
              tomorrowsScheduled.push(vt['startingTime'].split(' ')[1].substring(0, 5));
            });
          }

          if (data['videocall']['datomorrow'].length && brandCustonization['slot_autofill'] === 1) {
            data['videocall']['datomorrow'].forEach(vt => {
              DtomorrowsScheduled.push(vt['startingTime'].split(' ')[1].substring(0, 5));
            });
          }
        }
      }).done(function () {
        let body = document.querySelector('body');
        let div = document.createElement('div');

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var todayDate = new Date();
        var minDate = todayDate.getFullYear() + '-' + String(todayDate.getMonth() + 1).padStart(2, '0') + '-' + String(todayDate.getDate()).padStart(2, '0');

        let cd = new Date();
        let today = "" + cd.getFullYear() + "-"
          + (cd.getMonth() + 1) + "-"
          + cd.getDate();
        // + " "
        // + cd.getHours() + ":"
        // + cd.getMinutes() + ":"
        // + cd.getSeconds();
        let todays = "" + cd.getDate() + " " + month[cd.getMonth()];

        let td = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let tomorrow = "" + td.getFullYear() + "-"
          + (td.getMonth() + 1) + "-"
          + td.getDate();
        // + " "
        // + td.getHours() + ":"
        // + td.getMinutes() + ":"
        // + td.getSeconds();
        let tomorrows = "" + td.getDate() + " " + month[td.getMonth()];

        let dtd = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
        let Dtomorrow = "" + dtd.getFullYear() + "-"
          + (dtd.getMonth() + 1) + "-"
          + dtd.getDate();
        // + " "
        // + dtd.getHours() + ":"
        // + dtd.getMinutes() + ":"
        // + dtd.getSeconds();
        let Dtomorrows = "" + dtd.getDate() + " " + month[dtd.getMonth()];

        let startingTime = 10;
        let endingTime = 18;

        let timesAppend = '';
        let timesAppendTomorrow = '';
        let timesAppendDTomorrow = '';

        for (var bt = startingTime; bt <= endingTime; bt++) {
          if (bt > cd.getHours()) {
            timesAppend += `<div class="svc-timeslot-time-selection">
                              <p class="${todaysScheduled.includes(bt + ':00') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:00:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:00</p>
                            </div>`;

            timesAppend += `<div class="svc-timeslot-time-selection">
                              <p class="${todaysScheduled.includes(bt + ':30') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:30:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:30</p>
                            </div>`;
          }

          timesAppendTomorrow += `<div class="svc-timeslot-time-selection">
                                    <p class="${tomorrowsScheduled.includes(bt + ':00') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:00:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:00</p>
                                  </div>`;

          timesAppendTomorrow += `<div class="svc-timeslot-time-selection">
                                    <p class="${tomorrowsScheduled.includes(bt + ':30') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:30:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:30</p>
                                  </div>`;

          timesAppendDTomorrow += `<div class="svc-timeslot-time-selection">
                                    <p class="${DtomorrowsScheduled.includes(bt + ':00') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:00:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:00</p>
                                  </div>`;

          timesAppendDTomorrow += `<div class="svc-timeslot-time-selection">
                                    <p class="${DtomorrowsScheduled.includes(bt + ':30') ? 'svc-t-disabled' : ''}" onclick="$('#SVCRTime').val('${bt}:30:00'); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected'); $(this).addClass('svc-t-selected');">${bt}:30</p>
                                  </div>`;
        }

        timesAppend = timesAppend ? timesAppend : '<p style="padding: 10px 25px; text-align:center;">No time slots available.</p>';
        timesAppendTomorrow = timesAppendTomorrow ? timesAppendTomorrow : '<p style="padding: 10px 25px; text-align:center;">No time slots available.</p>';
        timesAppendDTomorrow = timesAppendDTomorrow ? timesAppendDTomorrow : '<p style="padding: 10px 25px; text-align:center;">No time slots available.</p>';

        let countryDrop = brandCustonization['country_dropdown'] == 1 ? `
          <div class="SVC-phone-code">
            <select id="SVCRCountryCode" class="swirl-video-call-popup-select">                  
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
              <option data-countryCode="IN" value="91">India (+91)</option>
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
          </div> 
        ` : `<input type="hidden" id="SVCRCountryCode" value="${brandCustonization['country_code']}">`;

        let defaultIndian = brandCustonization['country_dropdown'] == 0 ? `<p class="default-indian">+${brandCustonization['country_code']}</p>` : ``;

        let emailDynamic = brandCustonization['email'] == 1 ? `<input type="email" id="SVCREmail" class="swirl-video-call-popup-input" placeholder="Email address" required autocomplete="off">` : `<input type="hidden" id="SVCREmail" value="email">`;

        dropdown = brandCustonization['category_dropdown'] == 1 ? dropdown : '';
        dropdown2 = brandCustonization['category_dropdown_second'] == 1 ? dropdown2 : '';

        div.innerHTML = `
            <div class="swirl-video-call-floating">
              <div class="SVC-float-icon" onclick="openVCPopup();" style="background: ${brandCustonization['video_call_bk_color']} !important;">
                <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/videocall.png" alt="Video call icon">              
              </div>
              <div class="swirl-video-call-popup">
                <div class="swirl-video-call-popup-head" style="background: ${brandCustonization['video_call_bk_color']} !important; color: ${brandCustonization['video_call_fk_color']} !important;">${brandCustonization['video_header_txt']} <span style="font-family:arial; " onclick="closeVCPopup();">&times;</span></div>
                <div class="swirl-video-call-popup-container">                              
                  <div class="swirl-video-call-instant swirl-video-call-all-blocks">
                    <form id="SWIRLstartVC" onsubmit="return SWIRLstartVC();" autocomplete="off">
                      <input type="text" id="SVCRName" class="swirl-video-call-popup-input" placeholder="Name" required autocomplete="off" pattern=".{3,20}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 character, No special characters, No Digits.">                      
                      <div class="SVC-phone-block">    
                      ${countryDrop}
                      <div class="SVC-phone-number" ${brandCustonization['country_dropdown'] == 0 ? 'style="width: 100%; padding-left: 0;"' : ''}>
                        ${defaultIndian}
                        <input type="text" id="SVCRPhone" class="swirl-video-call-popup-input" placeholder="Phone Number" required autocomplete="off" pattern=".{${brandCustonization['mob_no_min']},${brandCustonization['mob_no_max']}}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' title="Minimum ${brandCustonization['mob_no_min']} and maximim ${brandCustonization['mob_no_max']} digits." ${brandCustonization['country_dropdown'] == 0 ? 'style="padding-left: 45px;"' : ''}>
                      </div>
                      </div>
                      ${emailDynamic}
                      ${dropdown}
                      ${dropdown2}
                      <p class="SVC-wa-note"><span>*</span>The Video Call link will be sent to you on WhatsApp</p>
                      <p class="SVC-alert-message" style="color: ${brandCustonization['video_call_bk_color']} !important;"></p>                                            
                      <button class="svc-action-btns swirl-video-call-popup-next-btn" style="background: ${brandCustonization['video_call_bk_color']} !important; color: ${brandCustonization['video_call_fk_color']} !important;">${brandCustonization['schedule_btn_text']}</button>
                    </form>
                  </div>
                  <div class="swirl-video-call-schedule swirl-video-call-all-blocks">
                    <form id="SWIRLscheduleVC" onsubmit="return SWIRLscheduleVC();">
                      <div class="svc-timeslot-selection">
                        <p>Select date and time slot</p>
                        <div class="svc-timeslot-selection-tab-container">
                          <div class="svc-timeslot-selection-tabs">
                            <style>
                            .svc-d-selected, .svc-t-selected {
                              background: ${brandCustonization['video_call_bk_color']} !important; border-color: ${brandCustonization['video_call_bk_color']} !important; color: ${brandCustonization['video_call_fk_color']} !important;
                            }
                            </style>
                            <p class="svc-d-selected" onclick="$('#SVCRDate').val('${today}'); $('.svc-timeslot-selection-tabs p').removeClass('svc-d-selected'); $(this).addClass('svc-d-selected'); $('.svc-timeslot-selection-times').hide(); $('.${todays.replace(' ', '')}').show(); $('#SVCRTime').val(''); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected');">
                              ${todays}
                            </p>
                          </div>
                          <div class="svc-timeslot-selection-tabs">
                            <p onclick="$('#SVCRDate').val('${tomorrow}');  $('.svc-timeslot-selection-tabs p').removeClass('svc-d-selected'); $(this).addClass('svc-d-selected'); $('.svc-timeslot-selection-times').hide(); $('.${tomorrows.replace(' ', '')}').show(); $('#SVCRTime').val(''); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected');">
                              ${tomorrows}
                            </p>
                          </div>
                          <div class="svc-timeslot-selection-tabs">
                            <p onclick="$('#SVCRDate').val('${Dtomorrow}');  $('.svc-timeslot-selection-tabs p').removeClass('svc-d-selected'); $(this).addClass('svc-d-selected'); $('.svc-timeslot-selection-times').hide(); $('.${Dtomorrows.replace(' ', '')}').show(); $('#SVCRTime').val(''); $('.svc-timeslot-time-selection p').removeClass('svc-t-selected');">
                              ${Dtomorrows}
                            </p>
                          </div>
                          <input id="SVCRDate" type="hidden" value="${today}">
                        </div>
                        <div class="svc-timeslot-selection-times ${todays.replace(' ', '')}">
                          ${timesAppend}
                        </div>
                        <div class="svc-timeslot-selection-times ${tomorrows.replace(' ', '')}" style="display:none;">                          
                          ${timesAppendTomorrow}
                        </div>
                        <div class="svc-timeslot-selection-times ${Dtomorrows.replace(' ', '')}" style="display:none;">                          
                          ${timesAppendDTomorrow}
                        </div>
                        <input id="SVCRTime" type="hidden" value="">
                      </div>
                      <p class="SVC-alert-message" style="color: ${brandCustonization['video_call_bk_color']} !important;"></p>
                      <button type="button" class="svc-action-btns" style="width: 49% !important; display: inline-block; background: ${brandCustonization['video_call_bk_color']} !important; color: ${brandCustonization['video_call_fk_color']} !important;" onclick="SVCCallSteps('.swirl-video-call-instant');">Back</button>
                      <button class="svc-action-btns swirl-video-call-popup-schedule-btn" style="width: 49% !important; display: inline-block; padding: 8px 0 !important; background: ${brandCustonization['video_call_bk_color']} !important; color: ${brandCustonization['video_call_fk_color']} !important;">${brandCustonization['book_now_txt']} <p class="SWIRL-VC-loader" style="margin-right: 8px;"></p></button>
                    </form>
                  </div>                  
                  <div class="swirl-video-call-schedule-success swirl-video-call-all-blocks">
                    <div class="SVC-success-check-outer">
                      <div class="SVC-success-check"></div>
                    </div>
                    <p>Call is scheduled, our team member will reach you before call time.</p>              
                  </div>
                </div>    
              </div>
            </div>      
        `;

        body.insertBefore(div, body.lastChild);

        if (brandCustonization['country_dropdown'] == 1) {
          document.querySelector('#SVCRCountryCode').value = brandCustonization['country_code'] ? brandCustonization['country_code'] : '91';
        }
      });

      $(document).ready(function () {
        setTimeout(() => {
          if ($('.swirl-video-call-popup').is(":hidden")) {
            openVCPopup();
          }
        }, 30000);
      });
    }
  }
})();

function openVCPopup() {
  var style = window.getComputedStyle(document.querySelector('.swirl-video-call-popup'));
  if (style.display === 'none') {
    document.querySelector('.swirl-video-call-popup').style.display = "block";
    beep();
  } else {
    document.querySelector('.swirl-video-call-popup').style.display = "none";
  }
}

function beep() {
  var snd = new Audio("data:audio/mpeg;base64,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RE/iRSDgu46TPw+fNKC4ogICGxcYGadrbd0RW6Num4c3+7/u/qq2/O95F6lThKBISkAzbJ7J1mTQfdRLSfU48TpgSgygQESa4dEoShKMl2HRkZBSTkSNEq15IkUaeTSM56mc/aqODRaDURPBXzsSnfsxEHStk6Cz/U/lizIie7yq3d19t8sePZHEQoAzCsTRkfOjkB5eJJitGAqCrgaBlwNB2WBp5UTHpL/q87rBX9NX+d1/kiXWNv87/+9MQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSZOyIhJprwauGHbA9YiimBeMoDBh/BiywzoDGhCGIELAIVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUMaw1hhaTUmpNDWOsMKDRlRqTAnVnVnKkyoaw2pNSbVYaw1htSakywm1ZyamqGsNYTUmpMFdWNYahkZSZUNTVnVqQaClhqgoKDGak1INDWGsNaTVGpBgTqzrDUGgSBAjSULRTEkspoVMVRVBnGakSxyZUNahrDLzWOTKh/ykyhkHWOU1qGrOQoKDJlzpM1Q1ZyaGsMmsJqhrDKkywxIYLRmpNSYE5MsNQ0NYaw1WOTLDLVqTK1cmpTVoatUZQSGudIUFBoOJaZvGGimTVJbIoRIcEyKkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7kkSqj/NXWzWAYxtyaEuWsAwDIEAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=");
  snd.play();
}

function closeVCPopup() {
  document.querySelector('.swirl-video-call-popup').style.display = "none";
}

function SVCCallSteps(activate) {
  $('.swirl-video-call-all-blocks').hide();

  document.querySelector(activate).style.display = "block";
}

function SWIRLstartVC() {
  if (document.querySelector('#callTo') != null) {
    let did = document.querySelector('#callTo').value;
    let callReceiver = document.querySelector('#callTo').options[document.querySelector('#callTo').selectedIndex].dataset.name;

    if (did == '0') {
      $('.SVC-alert-message').html('Please ' + document.querySelector('#callTo').options[0].text).fadeIn().delay(3000).fadeOut();
      return false;
    }
  }

  if (document.querySelector('#SVCdrop2') != null) {
    let drop2 = document.querySelector('#SVCdrop2').value;

    if (drop2 == '0') {
      $('.SVC-alert-message').html('Please ' + document.querySelector('#SVCdrop2').options[0].text).fadeIn().delay(3000).fadeOut();
      return false;
    }
  }

  SVCCallSteps('.swirl-video-call-schedule');

  return false;
}

function SWIRLscheduleVC() {
  let svc = document.querySelector('#swirl-video-call');
  let identity = atob(svc.dataset.identity);
  let did = atob(svc.dataset.did);
  let superdid = did;
  let callReceiver = ' ';
  let drop2 = ' ';

  if (document.querySelector('#callTo') != null) {
    did = document.querySelector('#callTo').value;
    callReceiver = document.querySelector('#callTo').options[document.querySelector('#callTo').selectedIndex].dataset.name;
  }

  if (document.querySelector('#SVCdrop2') != null) {
    drop2 = document.querySelector('#SVCdrop2').options[document.querySelector('#SVCdrop2').selectedIndex].dataset.name;
  }

  let SVCRName = document.querySelector('#SVCRName').value;
  let SVCREmail = document.querySelector('#SVCREmail').value;
  let SVCRPhone = document.querySelector('#SVCRPhone').value;
  let SVCRCountryCode = document.querySelector('#SVCRCountryCode').value;
  let SVCRDate = document.querySelector('#SVCRDate').value;
  let SVCRTime = document.querySelector('#SVCRTime').value;
  // let SVCRStoreLocation = document.querySelector('#SVCRStoreLocation').value;
  let SVCRStoreLocation = 'Location';

  if (!SVCRTime) {
    $('.SVC-alert-message').html('Please select time slot.').fadeIn().delay(3000).fadeOut();
    return false;
  }

  let datetime = SVCRDate + ' ' + SVCRTime;

  $.ajax({
    type: "POST",
    dataType: "json",
    url: "https://api.goswirl.live/index.php/api/designer/CTOBotoaccesstoken",
    data: "ending_time=&starting_time=" + encodeURIComponent(datetime) + "&identity=" + encodeURIComponent(identity) + "&name=" + encodeURIComponent(SVCRName) + "&product_ids=&title=&designer_id=" + encodeURIComponent(did) + "&mobile=" + encodeURIComponent(SVCRPhone) + "&code=" + encodeURIComponent(SVCRCountryCode) + "&is_schedule=" + encodeURIComponent('1') + "&sDate=" + encodeURIComponent(SVCRDate) + "&sTime=" + encodeURIComponent(SVCRTime) + "&store_location=" + encodeURIComponent(SVCRStoreLocation) + "&superdid=" + encodeURIComponent(superdid) + "&email=" + encodeURIComponent(SVCREmail) + "&callReceiver=" + encodeURIComponent(callReceiver) + "&drop2=" + encodeURIComponent(drop2),
    beforeSend: function () {
      $('.SWIRL-VC-loader').show();
      $('.swirl-video-call-popup-btn').attr('disabled', 'disabled');
    },
    success: function (response) {
      if (response.success === true) {
        SVCCallSteps('.swirl-video-call-schedule-success');
      } else {
        alert("Something went wrong! Please try again later.");
        location.reload();
      }
    },
    error: function (request, error) {
      alert("Something went wrong! Please try again later.");
    },
    complete: function () {
      $('.SWIRL-VC-loader').hide();
      $('.swirl-video-call-popup-btn').removeAttr('disabled');
    }
  });

  return false;
}