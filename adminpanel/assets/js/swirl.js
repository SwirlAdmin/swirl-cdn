$(document).ready(function () {


    var base_url = $('#base_url').val();

    if ($('#swirlResult').attr('src') == '') {
        $('#del-icon').hide();
    } else {
        $('#del-icon').show();
    }

    //Default "portrait" select for video orientation
    var is_landscape = $('input:radio[name=is_landscape]');
    if (is_landscape.is(':checked') === false) {
        is_landscape.filter('[value= "0"]').prop('checked', true);
    }

    $('.del_icon').css({
        'position': 'absolute',
        'top': '1%',
        'right': '1%',
        'z-index': '10'
    });

    if ($("input[type=hidden][name=platform]").val() == 2) {
        $("#existing-product").select2({
            maximumSelectionLength: 5,
            closeOnSelect: false,
            tags: false,
        });
    } else {
        $("#existing-product").select2({
            maximumSelectionLength: 7,
            closeOnSelect: false,
            tags: false,
        });
    }

    if ($('#product_ids').val() != '' && $('#product_ids').val() != undefined) {
        var product_ids = $('#product_ids').val().split(',');
        $('#edit-existing-product').val(product_ids);
        $('#edit-existing-product').trigger('change');

    }
    if ($('#filter_level').val() != '' && $('#filter_level').val() != undefined) {
        var filter_level = $('#filter_level').val().split(',');
        $('#edit-filter').val(filter_level);
        //console.log(filter_level);
        $('#edit-filter').trigger('change');

    }

    $("#existing-product").on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);
        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
        if ($('select#existing-product option:selected').length == 1) {
            var title = $('select#existing-product option:selected').text();
            $('#real-count').html(title.length);
            $('#swirl-title').val(title);
        }
        $('#product_id').val($('select#existing-product option:selected').val());

        var $dummyProductLink = $(element);
        var customDataValue = $dummyProductLink.data('product-link');
        if (customDataValue != '' && customDataValue != undefined && customDataValue != null) {
            $('#dummy-product-link').val(customDataValue);
            var dummy_product_id = $dummyProductLink.val();
            $('#existing-product').val(null).trigger('change');
            $('#existing-product').val(dummy_product_id).trigger('change');
            $("#existing-product").select2({
                maximumSelectionLength: 1,
                closeOnSelect: true,
                tags: false,
                language: {
                    maximumSelected: function (e) {
                        return "You can only select 1 dummy product";
                    }
                }
            });
        }
    });

    $("#existing-product").on("select2:unselect", function (evt) {
        let element = evt.params.data.element;
        let $dummyProductLink = $(element);
        let customDataValue = $dummyProductLink.data('product-link');
        if (customDataValue != '' && customDataValue != undefined && customDataValue != null) {
            $('#dummy-product-link').val('');
            if ($("input[type=hidden][name=platform]").val() == 2) {
                $("#existing-product").select2({
                    maximumSelectionLength: 5,
                    closeOnSelect: false,
                    tags: true,
                });
            } else {
                $("#existing-product").select2({
                    maximumSelectionLength: 7,
                    closeOnSelect: false,
                    tags: true,
                });
            }
        }
    });


    $("#connect-product").on('change', function () {
        var product_id = '';
        if ($('select#connect-product option:selected').length == 1) {
            var title = $('select#connect-product option:selected').text();
            $('#real-count').html(title.length);
            $('#swirl-title').val(title);
            product_id = $('select#connect-product option:selected').val();
            getSKUCode(product_id);
        }
        $('#product_id').val($('select#connect-product option:selected').val());

    });

    $("#swirl-playlist").select2({
        maximumSelectionLength:5,
        closeOnSelect: false,
        tags: false,
    });

    // $("#swirl-playlist").each(function() {
    //   $(this).attr('title', $(this).attr('title')); // Ensure title attribute is present
    //   $(this).tooltipster({
    //     content: $(this).attr('title')
    //   });
    // });



    $("#edit-existing-product").on("select2:select", function (evt) {
        evt.preventDefault();
        let dummy_product_array = $("#dummy-product-link").val().split(',').map(function (item) {
            return parseInt(item.trim(), 10);
        });
        var dataProductLinks = [];
        var dataProductIds = [];
        dummy_product_array.forEach(function (value) {
            let $matchedOption = $('#edit-existing-product').find('option[value="' + value + '"]');
            if ($matchedOption.length > 0 && $matchedOption.data("product-link")) {
                var dataProductId = value;
                var dataProductLink = $matchedOption.data("product-link");
                dataProductLinks.push(dataProductLink);
                dataProductIds.push(dataProductId);
            }
        });
        if (dataProductLinks.length > 0) {
            $("#edit-existing-product").select2({
                maximumSelectionLength: 1,
                closeOnSelect: true,
                tags: false,
                language: {
                    maximumSelected: function (e) {
                        return "You can only select 1 dummy product";
                    }
                },
            });
            $('#edit-existing-product').val(null).trigger('change');
            $('#edit-existing-product').val(dataProductIds[0]).trigger('change');
        } else {

            $("#dummy-product-link").val('');
            $("#productlink").val('');

            var element = evt.params.data.element;
            var $element = $(element);
            $element.detach();
            $(this).append($element);
            $(this).trigger("change");
            if ($('select#edit-existing-product option:selected').length == 1) {
                var title = $('select#edit-existing-product option:selected').text();
                $('#real-count').html(title.length);
                $('#swirl-title').val(title);
            }
            if ($("input[type=hidden][name=platform]").val() == 2) {
                $("#edit-existing-product").select2({
                    maximumSelectionLength: 5,
                    closeOnSelect: false,
                    tags: false,
                });
            } else {
                $("#edit-existing-product").select2({
                    maximumSelectionLength: 7,
                    closeOnSelect: false,
                    tags: false,
                });
            }

            let selectedOption = $('#edit-existing-product option:selected');
            let optionSelectedLink = selectedOption.data('product-link');
            let optionSelectedStatus = selectedOption.data('dummy-status');

            if (optionSelectedLink != '' && optionSelectedStatus == 0) {
                $("#dummy-product-link").val(optionSelectedLink);
                var defaultLink = $("#dummy-product-link").val();
                var $matchingOption = $(this).find('option[data-product-link="' + defaultLink + '"]').val();
                $("#edit-existing-product").select2({
                    maximumSelectionLength: 1,
                    closeOnSelect: true,
                    tags: false,
                    language: {
                        maximumSelected: function (e) {
                            return "You can only select 1 dummy product";
                        }
                    }
                });
                $('#edit-existing-product').val(null).trigger('change');
                $('#edit-existing-product').val($matchingOption).trigger('change');
            } else {
                var element = evt.params.data.element;
                var $element = $(element);
                $element.detach();
                $(this).append($element);
                $(this).trigger("change");
                if ($('select#edit-existing-product option:selected').length == 1) {
                    var title = $('select#edit-existing-product option:selected').text();
                    $('#real-count').html(title.length);
                    $('#swirl-title').val(title);
                }
                var $dummyProductLink = $(element);
                var customDataValue = $dummyProductLink.data('product-link');
                if (customDataValue != '' && customDataValue != undefined && customDataValue != null) {
                    $('#dummy-product-link').val(customDataValue);
                    var dummy_product_id = $dummyProductLink.val();
                    $('#edit-existing-product').val(null).trigger('change');
                    $('#edit-existing-product').val(dummy_product_id).trigger('change');
                    $("#edit-existing-product").select2({
                        maximumSelectionLength: 1,
                        closeOnSelect: true,
                        tags: false,
                        language: {
                            maximumSelected: function (e) {
                                return "You can only select 1 dummy product";
                            }
                        }
                    });
                }
            }
        }
    });

    $("#edit-existing-product").on("select2:unselect", function (evt) {
        let element = evt.params.data.element;
        let $dummyProductLink = $(element);
        let customDataValue = $dummyProductLink.data('product-link');
        if (customDataValue != '' && customDataValue != undefined && customDataValue != null) {
            $('#dummy-product-link').val('');
            $('#productlink').val('');
            if ($("input[type=hidden][name=platform]").val() == 2) {
                $("#edit-existing-product").select2({
                    maximumSelectionLength: 5,
                    closeOnSelect: false,
                    tags: false,
                });
            } else {
                $("#edit-existing-product").select2({
                    maximumSelectionLength: 7,
                    closeOnSelect: false,
                    tags: false,
                });
            }
        }
    });

    if ($("input[type=hidden][name=platform]").val() == 2) {
        $("#edit-existing-product").select2({
            maximumSelectionLength: 5,
            closeOnSelect: false,
            tags: false,
        });
    } else {
        $("#edit-existing-product").select2({
            maximumSelectionLength: 7,
            closeOnSelect: false,
            tags: false,
        });
    }


    if ($('#swirl-title').val() != '') {
        $('#real-count').html($('#swirl-title').val().length);
    }

    $('textarea').on('keypress paste', function (e) {
        var tval = $('textarea').val(),
            tlength = tval.length,
            set = 200,
            remain = parseInt(set - tlength);
        $('#real-count').text(remain);
        if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
            $('textarea').val((tval).substring(0, tlength - 1))
        }
    });


    $('#swirl-title').on('input propertychange', function () {
        charLimit(this, 200);
    });


    $('#productlink').bind('input propertychange', function () {
        getSwirlProductLinkData();
    });


    $('#swirls-cover').on('change', function () {
        swirlURL(this);
        $('.del_icon').show();
    });

    $('#swirl-trim-option').hide();
    $('#swirl-trim-time').hide();

    // Validate call land number
    $("#call-land").on('change', function () {
        var mobileNumber = $(this).val().trim();
        var selectedOption = $("#country-code").find('option:selected');
        var phoneCode = "+" + selectedOption.data('phone-code');
        var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);
        if (validationRespObject.isValid) {
            $(this).removeClass('is-invalid');
            error = false;
            $('#productlink').val('');
            $('#existing-product').val(null).trigger('change');
            $('#edit-existing-product').val(null).trigger('change');
            $('#connect-product').val(null).trigger('change');
            $('input[type=hidden][name=phone_code]').val(phoneCode);
        } else if (mobileNumber == '') {
            $(this).removeClass('is-invalid');
            error = false;
        } else {
            $(this).addClass('is-invalid');
            toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
            error = true;
            return false;
        }
    });

    $("#videoUpload").on('change', function (event) {

        var validExtensions = ["mp4", "MP4"]
        var ext = $(this).val().split('.').pop();
        if (validExtensions.indexOf(ext) == -1) {
            toastr.error('Only .mp4 file format allowed');
            $('#videoUpload').val('');
            return false;
        }

        var maxSize = 150 * 1024 * 1024; 
        var Upfile = event.target.files[0];

        if (Upfile.size > maxSize) {
            toastr.error('File size exceeds 150MB limit');
            $('#videoUpload').val('');
            return false;
        }

        $('#swirl-delete-icon').click(function () {
            $('#swirl-trim-option').hide();
            $('#start-offset').val('');
            $('#end-offset').val('');
        });

        var swirlVideo = document.getElementById('swirl-video');
        var duration = '';
        swirlVideo.addEventListener('loadedmetadata', function () {
            $('input[type=hidden][name=vid_height]').val(this.videoHeight);
            $('input[type=hidden][name=vid_width]').val(this.videoWidth);

            var duration = Math.round(swirlVideo.duration);
            if (duration < 5 || duration > 300) {
                $('#videoUpload').val('');
                toastr.error('Duration of the Swirl Video should range from 5 to 300 seconds');
                return false;
            } else {
                $('#swirl-trim-option').show();
            }
            $('#video-len').val(duration);
            $('input[type=radio][name=trim_video]').on('change', function () {
                if ($(this).val() == 1) {
                    $('#swirl-trim-time').fadeIn();
                } else {
                    $('#swirl-trim-time').fadeOut();
                }
            });
            $('#start-offset').val(0);
            $('#end-offset').val(duration);

            //Start offset Starts
            $('#start-offset').on('change', function () {
                let start_offset_val = $(this).val();
                let error = false;
                if (!$.isNumeric(start_offset_val) || (start_offset_val < 0) || (start_offset_val - Math.floor(start_offset_val) !== 0)) {
                    toastr.error('Only integer value is allowed');
                    $(this).addClass("is-invalid");
                    return error = true;
                } else if (start_offset_val > duration) {
                    toastr.error(`Offset can't exceed the video length ${duration} sec`);
                    $(this).addClass("is-invalid");
                    return error = true;
                } else {
                    if (error == false) {
                        $('#start-offset').removeClass("is-invalid");
                    }
                }
            });     //Start offset ends

            //End offset Starts
            $('#end-offset').on('change', function () {
                let start_offset_val = $('#start-offset').val();
                let end_offset_val = $(this).val();
                let time_diff = end_offset_val - start_offset_val;
                let error = false;

                if (!$.isNumeric(end_offset_val) || (end_offset_val < 0) || (end_offset_val - Math.floor(end_offset_val) !== 0)) {
                    toastr.error('Only integer value is allowed');
                    $(this).addClass("is-invalid");
                } else if (time_diff < 0 || (start_offset_val === end_offset_val)) {
                    toastr.error(`End offset can't be less than or equal to Start offset`);
                    $(this).addClass("is-invalid");
                } else if (end_offset_val > duration) {
                    toastr.error(`Offset can't exceed the video length ${duration} sec`);
                    $(this).addClass("is-invalid");
                }
                else {
                    if (error == false) {
                        $('#end-offset').removeClass("is-invalid");
                    }
                }
            }); //End offset ends
        });

        let file = event.target.files[0];
        let blobURL = URL.createObjectURL(file);
        $('.banner-upload').hide();
        $(".video-section").show();
        document.querySelector("video").src = blobURL;
    });    //Video Upload ends

    $("#videoUpload123").on('change', function (event) {

        var validExtensions = ["mp4"]
        var ext = $(this).val().split('.').pop();
        if (validExtensions.indexOf(ext) == -1) {
            toastr.error('Only .mp4 file format allowed');
            $('#videoUpload').val('');
            return false;
        }

        var swirlVideo = document.getElementById('swirl-video');
        swirlVideo.addEventListener('loadedmetadata', function () {
            var duration = Math.round(swirlVideo.duration);
            if (duration < 5 || duration > 300) {
                $('#videoUpload').val('');
                toastr.error('Duration of the Swirl Video should range from 5 to 300 seconds');
                return false;
            }
            $('#video-len').val(duration);
        });

        let file = event.target.files[0];
        let blobURL = URL.createObjectURL(file);
        $('.banner-upload').hide();
        $(".video-section").show();
        document.querySelector("video").src = blobURL;

    });

    // Colorpicker stored values
    $("#video-cta-color1,#video-cta-color2").colorpicker();
    $("#swirl-cta-color1").css("color", $("#video-cta-color1").val());
    $("#swirl-cta-color2").css("color", $("#video-cta-color2").val());
    // colorpicker on change values
    $("#video-cta-color1").on("colorpickerChange", function (event) { $("#swirl-cta-color1").css("color", event.color.toString()); });
    $("#video-cta-color2").on("colorpickerChange", function (event) { $("#swirl-cta-color2").css("color", event.color.toString()); });



    $('#edit-swirl-form').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#swirl-title').val() == '') {
            $('#swirl-title').addClass('is-invalid');
            error = true;
            return false;
        } else {
            $('#swirl-title').removeClass('is-invalid');
        }

        if ($("input[type=hidden][name=platform]").val() == 2) {
            if ($("#edit-existing-product").val() == '') {
                toastr.error('Please select product');
                error = true;
                return false;
            } else {
                error = false;
            }
        }

        /* var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
        if (video_cta_select == 3) {
            // Validate call land number
            var mobileNumber = $("#call-land").val();
            var selectedOption = $("#country-code option:selected");
            var phoneCode = "+" + selectedOption.data('phone-code');

            if (mobileNumber !== '') {
                var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);

                if (validationRespObject.isValid) {
                    $(this).removeClass('is-invalid');
                    error = false;
                    $('#productlink, #existing-product, #edit-existing-product, #connect-product').val(null).trigger('change');
                    $('input[type=hidden][name=phone_code]').val(phoneCode);
                } else {
                    $(this).addClass('is-invalid');
                    toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
                    error = true;
                    return false;
                }
            }
        } */
        var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
        if (video_cta_select == 3)
        {
            var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
            if (activeTab === "#tab-phone") {
                var mobileNumber = $("#call-land").val();
                if (mobileNumber == '') {
                    $('#call-land').addClass('is-invalid');
                    error = true;
                    return false;
                }
                else{
                    $('#call-land').removeClass('is-invalid');
                }
            } else if (activeTab === "#tab-toll") {
                var mobileNumber = $("#toll-land").val();
                if (mobileNumber == '') {
                    $('#toll-land').addClass('is-invalid');
                    error = true;
                    return false;
                }
                else{
                    if(mobileNumber.length === 11) {
                        $('#toll-land').removeClass('is-invalid');
                        var toll = $("#toll-land").val();
                        $("#call-land").val(toll);
                    }
                    else{
                        $('#toll-land').addClass('is-invalid');
                        toastr.error(`Enter valid 11 digit phone number`);
                        error = true;
                        return false;
                    }
                    
                }
            }
        }


        if ($('#edit-existing-product').val() != '') {
            $('#productlink').val('');
        }

        if ($('#productlink').val() != '') {
            $('#dummy-product-link').val('');
            $('#edit-existing-product').val(null).trigger('change');
        }

        if (error == false) {

            $.ajax({
                type: 'POST',
                url: base_url + "admin/swirl/updateSwirl",
                data: new FormData(this),
                dataType: 'JSON',
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: function () {
                    $('#page-loading').show();
                },
                complete: function () {
                    $('#page-loading').hide();

                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {


                    toastr.error('Something went wrong, Please try again!!');

                }

            });  //End Ajax   

        }
    });

    $('#fileupload-form-swirl').on('submit', function (e) {
        e.preventDefault();
        var error = false;

        //check short video selection
        if ($('input[type=radio][name=swirl_selection]:checked').val() == 1) {

            if ($("#videoUpload")[0].files.length == 0) {
                toastr.error('Please select Short Video');
                error = true;
                return false;
            }

        } else {

            if ($('#video-url').val() == '') {
                $('#video-url').addClass('is-invalid');
                error = true;
                return false;
            } else {

                if (isUrlValid($('#video-url').val())) {
                    $('#video-url').removeClass('is-invalid');
                    error = false;
                } else {
                    $('#video-url').addClass('is-invalid');
                    toastr.error('Please provide valid URL');
                    error = true;
                }

            }

        }

        if ($("input[type=hidden][name=platform]").val() == 2) {
            if ($("#existing-product").val() == '') {
                toastr.error('Please select product');
                error = true;
                return false;
            } else {
                error = false;
            }
        }

        if ($('#swirl-title').val() == '') {
            $('#swirl-title').addClass('is-invalid');
            error = true;
            return false;
        } else {
            $('#swirl-title').removeClass('is-invalid');
        }

        if ($("input[type=hidden][name=video_cta]").val() == 3) {
            // Validate call land number
            var mobileNumber = $("#call-land").val();
            var selectedOption = $("#country-code").find('option:selected');
            var phoneCode = "+" + selectedOption.data('phone-code');

            if (mobileNumber != '') {
                var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);
                if (validationRespObject.isValid) {
                    $(this).removeClass('is-invalid');
                    error = false;
                    $('#productlink').val('');
                    $('#existing-product').val(null).trigger('change');
                    $('#edit-existing-product').val(null).trigger('change');
                    $('#connect-product').val(null).trigger('change');
                    $('input[type=hidden][name=phone_code]').val(phoneCode);
                } else if (mobileNumber == '') {
                    $(this).removeClass('is-invalid');
                    error = false;
                } else {
                    $(this).addClass('is-invalid');
                    toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
                    error = true;
                    return false;
                }
            }
        }

        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/Swirluploads/store",
                data: new FormData(this),
                dataType: 'JSON',
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: function () {
                    $('#page-loading').show();
                },
                complete: function () {
                    $('#page-loading').hide();

                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Something went wrong, Please try again!!');

                }

            });  //End Ajax
        }
    });

    $('#fileupload-form').on('submit', function (e) {
        e.preventDefault();
        var error = false;

        //check short video selection
        if ($('input[type=radio][name=swirl_selection]:checked').val() == 1) {

            if ($("#videoUpload")[0].files.length == 0) {
                toastr.error('Please select Short Video');
                error = true;
                return false;
            }

        } else {

            if ($('#video-url').val() == '') {
                $('#video-url').addClass('is-invalid');
                error = true;
                return false;
            } else {

                if (isUrlValid($('#video-url').val())) {
                    $('#video-url').removeClass('is-invalid');
                    error = false;
                } else {
                    $('#video-url').addClass('is-invalid');
                    toastr.error('Please provide valid URL');
                    error = true;
                }

            }

        }

        if ($("input[type=hidden][name=platform]").val() == 2) {
            if ($("#existing-product").val() == '') {
                toastr.error('Please select product');
                error = true;
                return false;
            } else {
                error = false;
            }
        }



        if ($('#swirl-title').val() == '') {
            $('#swirl-title').addClass('is-invalid');
            error = true;
            return false;
        } else {
            $('#swirl-title').removeClass('is-invalid');
        }

        if ($("input[type=hidden][name=version]").val() == 3) {
            // Validate call land number
            var mobileNumber = $("#call-land").val();
            var selectedOption = $("#country-code").find('option:selected');
            var phoneCode = "+" + selectedOption.data('phone-code');

            if (mobileNumber != '') {
                var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);
                if (validationRespObject.isValid) {
                    $(this).removeClass('is-invalid');
                    error = false;
                    $('#productlink').val('');
                    $('#existing-product').val(null).trigger('change');
                    $('#edit-existing-product').val(null).trigger('change');
                    $('#connect-product').val(null).trigger('change');
                    $('input[type=hidden][name=phone_code]').val(phoneCode);
                } else if (mobileNumber == '') {
                    $(this).removeClass('is-invalid');
                    error = false;
                } else {
                    $(this).addClass('is-invalid');
                    toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
                    error = true;
                    return false;
                }
            }
        }
        
        var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
        if (video_cta_select == 3)
        {
            var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
            if (activeTab === "#tab-phone") {
                var mobileNumber = $("#call-land").val();
                if (mobileNumber == '') {
                    $('#call-land').addClass('is-invalid');
                    error = true;
                    return false;
                }
                else{
                    $('#call-land').removeClass('is-invalid');
                }
            } else if (activeTab === "#tab-toll") {
                var mobileNumber = $("#toll-land").val();
                if (mobileNumber == '') {
                    $('#toll-land').addClass('is-invalid');
                    error = true;
                    return false;
                }
                else{
                    if(mobileNumber.length === 11) {
                        $('#toll-land').removeClass('is-invalid');
                        var toll = $("#toll-land").val();
                        $("#call-land").val(toll);
                    }
                    else{
                        $('#toll-land').addClass('is-invalid');
                        toastr.error(`Enter valid 11 digit phone number`);
                        error = true;
                        return false;
                    }
                    
                }
            }
        }

        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/swirl/store",
                data: new FormData(this),
                dataType: 'JSON',
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: function () {
                    $('#page-loading').show();
                },
                complete: function () {
                    $('#page-loading').hide();

                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Something went wrong, Please try again!!');

                }

            });  //End Ajax
        }
    });

    $('#fileupload-form1234').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#swirl-title').val() == '') {
            $('#swirl-title').addClass('is-invalid');
            error = true;
            return false;
        } else {
            $('#swirl-title').removeClass('is-invalid');
        }

        if ($("#videoUpload")[0].files.length == 0) {
            toastr.error('Please select Short Video');
            error = true;
            return false;
        }
        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/swirl/store",
                data: new FormData(this),
                dataType: 'JSON',
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: function () {
                    $('#page-loading').show();
                },
                complete: function () {
                    $('#page-loading').hide();

                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Something went wrong, Please try again!!');

                }

            });  //End Ajax
        }
    });


    //check video section 
    $('input[type=radio][name=swirl_selection]').on('change', function () {
        if (this.value == 2) {
            $('#video-guide-section-file').hide();
            $('#video-guide-section').show();
            $('#video-url-section').show();

        } else {
            $('#video-guide-section').hide();
            $('#video-url-section').hide();
            $('#video-guide-section-file').show();

        }
    });

    //Search Product
    $('#search-product').on('keypress', function (e) {
        if (e.which == 13) {
            e.preventDefault();

            let search = $('#search-product').val();
            if (search.length < 5) {
                $('#search-error').html('Minimum search characters are 5');
                $('#search-error').fadeOut(3000);
                return false;
            }

            $.ajax({
                url: base_url + 'admin/Swirl/getProductFromShopifyByTitle',
                type: "POST",
                dataType: 'JSON',
                data: { "search": search },
                beforeSend: function () {
                    $('#page-loading').show();
                },
                complete: function () {
                    $('#page-loading').hide();
                },
                success: function (resp) {
                    if (resp != '') {
                        $('#select-product-section').show();
                        $('#connect-product').select2({ data: resp });
                        var title = $('select#connect-product option:selected').text();
                        $('#real-count').html(title.length);
                        $('#swirl-title').val(title);
                        product_id = $('select#connect-product option:selected').val();
                        getSKUCode(product_id);
                    } else {
                        $('#select-product-section').hide();
                        $('#search-error').html('No result found, try again');
                        $('#search-error').fadeOut(3000);
                    }

                }
            });
        }
    });

    // autpload product from shopify 
    if ($('#search-product').val() != '') {
        let search = $('#search-product').val();
        $.ajax({
            url: base_url + 'admin/Swirl/getProductFromShopifyByTitle',
            type: "POST",
            dataType: 'JSON',
            data: { "search": search },
            success: function (resp) {
                if (resp != '') {
                    $('#select-product-section').show();
                    $('#connect-product').select2({ data: resp });
                } else {
                    $('#select-product-section').hide();
                    $('#search-error').html('No result found, try again');
                    $('#search-error').fadeOut(3000);
                }

            }
        });
    }

    //Default "Yes" select for product price
    var video_cta = $('input:radio[name=video_cta]');
    if (video_cta.is(':checked') === false) {
        video_cta.filter('[value= "1"]').prop('checked', true);
        $("#connect-product-div").show();
        $("#product-link-div").hide();
        $("#call-now-div").hide();
    } else {
        let videoCta_checkedValue = $('input[name="video_cta"]:checked').val();
        switch (videoCta_checkedValue) {
            case "1":
                $("#connect-product-div").show();
                $("#product-link-div").hide();
                $("#call-now-div").hide();
                $('#productlink').val('');
                $("#call-land").val('');
                break;
            case "2":
                $("#product-link-div").show();
                $("#connect-product-div").hide();
                $("#call-now-div").hide();
                $('#edit-existing-product').val(null).trigger('change');
                $("#call-land").val('');
                break;
            case "3":
                $("#call-now-div").show();
                $("#connect-product-div").hide();
                $("#product-link-div").hide();
                $('#edit-existing-product').val(null).trigger('change');
                $('#productlink').val('');

                let prodURL = $('#prod-url').val();
                if (prodURL.includes("tel:+")) {
                    var modifiedString = prodURL.replace("tel:+", "");
                    let number = modifiedString.split('-');
                    let code = number[0]; // Value before hyphen
                    let phone = number[1];
                    $("#call-land").val(phone);
                    $('#country-code option').filter(function () {
                        return $(this).data('phone-code') == code;
                    }).prop('selected', true);
                } else {
                    let userCountry = $("#user-country").val();
                    $("#country-code").val(userCountry);
                }
                break;
            default:
                break;
        }
    }

    $("input[type=radio][name=video_cta]").on("change", function () {
        let videoCtaVal = $(this).val();
        switch (videoCtaVal) {
            case "1":
                $("#connect-product-div").show();
                $("#product-link-div").hide();
                $("#call-now-div").hide();
                $('#productlink').val('');
                $("#call-land").val('');
                $("#cta-button").val('Buy Now');
                break;
            case "2":
                $("#product-link-div").show();
                $("#connect-product-div").hide();
                $("#call-now-div").hide();
                $('#existing-product').val(null).trigger('change');
                $('#edit-existing-product').val(null).trigger('change');
                $("#call-land").val('');
                $("#cta-button").val('Buy Now');
                break;
            case "3":
                $("#call-now-div").show();
                $("#cta-button").val('Call Now');
                $("#connect-product-div").hide();
                $("#product-link-div").hide();
                $('#existing-product').val(null).trigger('change');
                $('#edit-existing-product').val(null).trigger('change');
                $('#productlink').val('');
                break;

            default:
                break;
        }
    });


});  // End DOM


function playVideo() {
    $('#swirl-video').get(0).play();
    $('#play-icon').hide();
    $('#pause-icon').show();

}
function pauseVideo() {
    $('#swirl-video').get(0).pause();
    $('#pause-icon').hide();
    $('#play-icon').show();

}
function deleteVideo() {
    $('#videoUpload').val('');
    $('.video-section').hide();
    $('.banner-upload').show();
}

function swirlURL(input) {

    var fileInput = $('#swirls-cover');
    var filePath = fileInput.val();
    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;

    if (!allowedExtensions.exec(filePath)) {
        toastr.error('Please select any of the Swirl Cover extension (jpg|jpeg|png|gif|webp)');
        fileInput.value = '';
        return false;
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#swirlResult').attr('src', e.target.result);
            $('#swirlResult').attr('width', 200);
            $('#swirlResult').attr('height', 200);
            $('#upload-label').text(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Checking valid url
function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
function getSwirlProductLinkData() {
    var image = '';
    var title = '';
    var url = $('#productlink').val();
    $.ajax({
        url: url,
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();
        },
    }).then(function (data) {
        response = $.parseHTML(data);
        $.each(response, function (i, el) {
            if (el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined") {
                if ($(el).attr("name") == 'twitter:image') {
                    image += $(el).attr("content");
                }
                if ($(el).attr("name") == 'twitter:title') {
                    title += $(el).attr("content");
                }


            }
        });
        var html = $(data);
        $('#swirl-title').val(title);
        if (image != '') {
            $('#cover-link').val(image);
            $('img#swirlResult').attr('src', image);
            $('img#swirlResult').style('width', '300');
            $('img#swirlResult').style('height', '300');
            $('#swirl_autofill').val('1');
        }

    });
}

function charLimit(input, maxChar) {
    var len = $(input).val().length;
    if (len > maxChar) {
        $(input).val($(input).val().substring(0, maxChar));
        $('#real-count').text(0);
    }
}
function deleteSwirl(swirl_id) {
    var base_url = $('#base_url').val();
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Swirl !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
    },
        function () {

            $.ajax({
                type: 'POST',
                url: base_url + "admin/swirl/delete",
                dataType: 'JSON',
                data: { 'swirl_id': swirl_id, 'action': 'delete' },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        window.setTimeout(function () {
                            window.location.reload();
                        }, 3000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Somethings went wrong, Please try again!');
                }
            });

        });

}

function getSKUCode(product_id) {
    $.ajax({
        type: 'POST',
        url: base_url + "admin/swirl/getSKUByProductId",
        data: { "product_id": product_id },
        dataType: 'JSON',
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();

        },
        success: function (resp) {
            if (resp != '') {
                $('#select-sku-section').show();
                $('#sku-code').select2({ data: resp });
            } else {
                $('#select-sku-section').hide();
            }
        },
        error: function () {
            toastr.error('Something went wrong, Please try again!!');

        }

    });  //End Ajax    
}

function isValidMobileNumber(mobileNumber) {
    var regex = /^\d{10}$/;
    return regex.test(mobileNumber);
}

// Function to validate mobile number

function validateMobileNumber(countryCode, phoneNumber) {
    // Define regex patterns for different country codes
    var regexPatterns = {
        "+91": /^\d{10}$/,
        "+358": /^\d{7}$/,
        "+355": /^\d{10}$/,
        "+213": /^\d{4}$/,
        "+1684": /^\d{10}$/,
        "+376": /^\d{10}$/,
        "+244": /^\d{10}$/,
        "+1264": /^\d{10}$/,
        "+672": /^\d{6}$/,
        "+1268": /^\d{10}$/,
        "+54": /^\d{10}$/,
        "+374": /^\d{20}$/,
        "+297": /^\d{7}$/,
        "+61": /^\d{9}$/,
        "+43": /^\d{11}$/,
        "+994": /^\d{9}$/,
        "+1242": /^\d{8}$/,
        "+973": /^\d{8}$/,
        "+880": /^\d{10}$/,
        "+1246": /^\d{8}$/,
        "+375": /^\d{9}$/,
        "+32": /^\d{9}$/,
        "+501": /^\d{7}$/,
        "+229": /^\d{9}$/,
        "+1441": /^\d{8}$/,
        "+975": /^\d{10}$/,
        "+591": /^\d{10}$/,
        "+387": /^\d{8}$/,
        "+267": /^\d{8}$/,
        "+55": /^\d{11}$/,
        "+246": /^\d{7}$/,
        "+673": /^\d{10}$/,
        "+359": /^\d{9}$/,
        "+226": /^\d{8}$/,
        "+257": /^\d{8}$/,
        "+855": /^\d{9}$/,
        "+237": /^\d{9}$/,
        "+238": /^\d{8}$/,
        "+1345": /^\d{8}$/,
        "+236": /^\d{8}$/,
        "+235": /^\d{8}$/,
        "+56": /^\d{9}$/,
        "+86": /^\d{11}$/,
        "+57": /^\d{10}$/,
        "+269": /^\d{8}$/,
        "+242": /^\d{8}$/,
        "+682": /^\d{5}$/,
        "+506": /^\d{8}$/,
        "+225": /^\d{8}$/,
        "+385": /^\d{9}$/,
        "+53": /^\d{10}$/,
        "+599": /^\d{10}$/,
        "+357": /^\d{8}$/,
        "+420": /^\d{9}$/,
        "+45": /^\d{8}$/,
        "+253": /^\d{8}$/,
        "+1767": /^\d{8}$/,
        "+1809": /^\d{8}$/,
        "+593": /^\d{9}$/,
        "+20": /^\d{10}$/,
        "+503": /^\d{8}$/,
        "+240": /^\d{8}$/,
        "+291": /^\d{8}$/,
        "+372": /^\d{8}$/,
        "+251": /^\d{8}$/,
        "+500": /^\d{5}$/,
        "+298": /^\d{5}$/,
        "+679": /^\d{8}$/,
        "+33": /^\d{9}$/,
        "+594": /^\d{8}$/,
        "+689": /^\d{6}$/,
        "+262": /^\d{10}$/,
        "+241": /^\d{7}$/,
        "+220": /^\d{10}$/,
        "+995": /^\d{9}$/,
        "+49": /^\d{10}$/,
        "+233": /^\d{9}$/,
        "+350": /^\d{10}$/,
        "+30": /^\d{10}$/,
        "+299": /^\d{6}$/,
        "+1473": /^\d{8}$/,
        "+590": /^\d{10}$/,
        "+1671": /^\d{8}$/,
        "+502": /^\d{8}$/,
        "+44": /^\d{10}$/,
        "+224": /^\d{10}$/,
        "+245": /^\d{10}$/,
        "+592": /^\d{10}$/,
        "+509": /^\d{10}$/,
        "+39": /^\d{9}$/,
        "+504": /^\d{8}$/,
        "+852": /^\d{8}$/,
        "+36": /^\d{9}$/,
        "+354": /^\d{10}$/,
        "+62": /^\d{10}$/,
        "+98": /^\d{10}$/,
        "+964": /^\d{10}$/,
        "+353": /^\d{9}$/,
        "+962": /^\d{9}$/,
        "+7": /^\d{10}$/,
        "+254": /^\d{10}$/,
        "+686": /^\d{8}$/,
        "+850": /^\d{10}$/,
        "+82": /^\d{10}$/,
        "+381": /^\d{9}$/,
        "+965": /^\d{8}$/,
        "+996": /^\d{9}$/,
        "+856": /^\d{10}$/,
        "+371": /^\d{8}$/,
        "+961": /^\d{8}$/,
        "+266": /^\d{10}$/,
        "+231": /^\d{8}$/,
        "+218": /^\d{10}$/,
        "+370": /^\d{8}$/,
        "+352": /^\d{9}$/,
        "+853": /^\d{10}$/,
        "+389": /^\d{8}$/,
        "+261": /^\d{10}$/,
        "+265": /^\d{10}$/,
        "+60": /^\d{8}$/,
        "+960": /^\d{7}$/,
        "+223": /^\d{8}$/,
        "+356": /^\d{8}$/,
        "+692": /^\d{7}$/,
        "+596": /^\d{12}$/,
        "+222": /^\d{10}$/,
        "+230": /^\d{8}$/,
        "+269": /^\d{10}$/,
        "+52": /^\d{10}$/,
        "+691": /^\d{7}$/,
        "+373": /^\d{8}$/,
        "+377": /^\d{8}$/,
        "+976": /^\d{8}$/,
        "+382": /^\d{8}$/,
        "+1664": /^\d{8}$/,
        "+212": /^\d{10}$/,
        "+258": /^\d{12}$/,
        "+95": /^\d{10}$/,
        "+264": /^\d{10}$/,
        "+674": /^\d{10}$/,
        "+977": /^\d{10}$/,
        "+31": /^\d{8}$/,
        "+599": /^\d{10}$/,
        "+687": /^\d{6}$/,
        "+64": /^\d{9}$/,
        "+505": /^\d{8}$/,
        "+227": /^\d{8}$/,
        "+234": /^\d{8}$/,
        "+683": /^\d{4}$/,
        "+1670": /^\d{8}$/,
        "+47": /^\d{8}$/,
        "+968": /^\d{10}$/,
        "+92": /^\d{10}$/,
        "+680": /^\d{7}$/,
        "+970": /^\d{9}$/,
        "+507": /^\d{8}$/,
        "+675": /^\d{8}$/,
        "+595": /^\d{9}$/,
        "+974": /^\d{8}$/,
        "+351": /^\d{9}$/,
        "+65": /^\d{8}$/,
        "+27": /^\d{9}$/,
        "+34": /^\d{9}$/,
        "+94": /^\d{7}$/,
        "+66": /^\d{9}$/,
        "+231": /^\d{8}$/,
        "+256": /^\d{10}$/,
        "+1340": /^\d{8}$/,
        "+1": /^\d{10}$/,
        "+44": /^\d{10}$/,
        "+93": /^\d{9}$/,
        "+971": /^\d{7,9}$/,
    };

    // Get the regex pattern based on the country code
    var regexPattern = regexPatterns[countryCode];

    // Retrieve the value of d
    var d = regexPattern.source.match(/\d+/)[0];

    // Validate the phone number against the regex pattern
    var isValid = regexPattern.test(phoneNumber);

    // Return an object with validation result and value of d
    return {
        isValid: isValid,
        d: d
    };
}

function delSwirlCover() {
    $('#swirl-cover').val('');
    $('#swirlResult').attr({
        src: '',
        width: 0,
        height: 0
    });
    $('#upload-label').text('');
    $('.del_icon').hide();
}
$('#upload-bulk-swirl').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: base_url + "admin/swirl/uploadBulkSwirls",
        data: new FormData(this),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        cache: false,
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();

        },

        success: function (data) {


            if (data.status == 1) {
                toastr.success(data.msg);
            } else {
                toastr.error(data.msg);
            }
        }
    });  //End Ajax 
});


$('#updategif-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: base_url + "admin/swirl/updategif_process",
        data: new FormData(this),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        cache: false,
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();

        },
        success: function (data) {
            if (data.status == 1) {
                toastr.success(data.msg);
                setTimeout(function () { window.location.reload(); }, 4000);
            } else {
                toastr.error(data.msg);
            }
        },
        error: function () {
            toastr.error('Something went wrong, Please try again!!');

        }

    });  //End Ajax
});

$('#vyrill-fileupload-form').on('submit', function (e) {
    e.preventDefault();
    var error = false;

    //check short video selection
    if ($('input[type=radio][name=swirl_selection]:checked').val() == 1) {

        if ($("#videoUpload")[0].files.length == 0) {
            toastr.error('Please select Short Video');
            error = true;
            return false;
        }

    } else {

        if ($('#video-url').val() == '') {
            $('#video-url').addClass('is-invalid');
            error = true;
            return false;
        } else {

            if (isUrlValid($('#video-url').val())) {
                $('#video-url').removeClass('is-invalid');
                error = false;
            } else {
                $('#video-url').addClass('is-invalid');
                toastr.error('Please provide valid URL');
                error = true;
            }

        }

    }

    if ($("input[type=hidden][name=platform]").val() == 2) {
        if ($("#existing-product").val() == '') {
            toastr.error('Please select product');
            error = true;
            return false;
        } else {
            error = false;
        }
    }



    if ($('#swirl-title').val() == '') {
        $('#swirl-title').addClass('is-invalid');
        error = true;
        return false;
    } else {
        $('#swirl-title').removeClass('is-invalid');
    }

    if ($("input[type=hidden][name=version]").val() == 3) {
        // Validate call land number
        var mobileNumber = $("#call-land").val();
        var selectedOption = $("#country-code").find('option:selected');
        var phoneCode = "+" + selectedOption.data('phone-code');

        if (mobileNumber != '') {
            var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);
            if (validationRespObject.isValid) {
                $(this).removeClass('is-invalid');
                error = false;
                $('#productlink').val('');
                $('#existing-product').val(null).trigger('change');
                $('#edit-existing-product').val(null).trigger('change');
                $('#connect-product').val(null).trigger('change');
                $('input[type=hidden][name=phone_code]').val(phoneCode);
            } else if (mobileNumber == '') {
                $(this).removeClass('is-invalid');
                error = false;
            } else {
                $(this).addClass('is-invalid');
                toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
                error = true;
                return false;
            }
        }
    }

    var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
    if (video_cta_select == 3)
    {
        var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
        if (activeTab === "#tab-phone") {
            var mobileNumber = $("#call-land").val();
            if (mobileNumber == '') {
                $('#call-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                $('#call-land').removeClass('is-invalid');
            }
        } else if (activeTab === "#tab-toll") {
            var mobileNumber = $("#toll-land").val();
            if (mobileNumber == '') {
                $('#toll-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                if(mobileNumber.length === 11) {
                    $('#toll-land').removeClass('is-invalid');
                    var toll = $("#toll-land").val();
                    $("#call-land").val(toll);
                }
                else{
                    $('#toll-land').addClass('is-invalid');
                    toastr.error(`Enter valid 11 digit phone number`);
                    error = true;
                    return false;
                }
                
            }
        }
    }

    if (error == false) {
        $.ajax({
            type: 'POST',
            url: base_url + "admin/Vyrill/store",
            data: new FormData(this),
            dataType: 'JSON',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();

            },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    setTimeout(function () { window.location.reload(); }, 4000);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {
                toastr.error('Something went wrong, Please try again!!');

            }

        });  //End Ajax
    }
});

$('#vyrill-edit-swirl-form').on('submit', function (e) {
    e.preventDefault();
    var error = false;
    if ($('#swirl-title').val() == '') {
        $('#swirl-title').addClass('is-invalid');
        error = true;
        return false;
    } else {
        $('#swirl-title').removeClass('is-invalid');
    }

    if ($("input[type=hidden][name=platform]").val() == 2) {
        if ($("#edit-existing-product").val() == '') {
            toastr.error('Please select product');
            error = true;
            return false;
        } else {
            error = false;
        }
    }
    var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
    if (video_cta_select == 3)
    {
        var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
        if (activeTab === "#tab-phone") {
            var mobileNumber = $("#call-land").val();
            if (mobileNumber == '') {
                $('#call-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                $('#call-land').removeClass('is-invalid');
            }
        } else if (activeTab === "#tab-toll") {
            var mobileNumber = $("#toll-land").val();
            if (mobileNumber == '') {
                $('#toll-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                if(mobileNumber.length === 11) {
                    $('#toll-land').removeClass('is-invalid');
                    var toll = $("#toll-land").val();
                    $("#call-land").val(toll);
                }
                else{
                    $('#toll-land').addClass('is-invalid');
                    toastr.error(`Enter valid 11 digit phone number`);
                    error = true;
                    return false;
                }
                
            }
        }
    }


    if ($('#edit-existing-product').val() != '') {
        $('#productlink').val('');
    }

    if ($('#productlink').val() != '') {
        $('#dummy-product-link').val('');
        $('#edit-existing-product').val(null).trigger('change');
    }

    if (error == false) {

        $.ajax({
            type: 'POST',
            url: base_url + "admin/Vyrill/updateSwirl",
            data: new FormData(this),
            dataType: 'JSON',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();

            },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    setTimeout(function () { window.location.reload(); }, 4000);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {


                toastr.error('Something went wrong, Please try again!!');

            }

        });  //End Ajax   

    }
});
$('#vyrill-fileupload-form-New').on('submit', function (e) {
    e.preventDefault();
    var error = false;  

    //check short video selection
    if ($('input[type=radio][name=swirl_selection]:checked').val() == 1) {

        if ($("#videoUpload")[0].files.length == 0) {
            toastr.error('Please select Short Video');
            error = true;
            return false;
        }

    } else {

        if ($('#video-url').val() == '') {
            $('#video-url').addClass('is-invalid');
            error = true;
            return false;
        } else {

            if (isUrlValid($('#video-url').val())) {
                $('#video-url').removeClass('is-invalid');
                error = false;
            } else {
                $('#video-url').addClass('is-invalid');
                toastr.error('Please provide valid URL');
                error = true;
            }

        }

    }

    if ($("input[type=hidden][name=platform]").val() == 2) {
        if ($("#existing-product").val() == '') {
            toastr.error('Please select product');
            error = true;
            return false;
        } else {
            error = false;
        }
    }



    if ($('#swirl-title').val() == '') {
        $('#swirl-title').addClass('is-invalid');
        error = true;
        return false;
    } else {
        $('#swirl-title').removeClass('is-invalid');
    }

    if ($("input[type=hidden][name=version]").val() == 3) {
        // Validate call land number
        var mobileNumber = $("#call-land").val();
        var selectedOption = $("#country-code").find('option:selected');
        var phoneCode = "+" + selectedOption.data('phone-code');

        if (mobileNumber != '') {
            var validationRespObject = validateMobileNumber(phoneCode, mobileNumber);
            if (validationRespObject.isValid) {
                $(this).removeClass('is-invalid');
                error = false;
                $('#productlink').val('');
                $('#existing-product').val(null).trigger('change');
                $('#edit-existing-product').val(null).trigger('change');
                $('#connect-product').val(null).trigger('change');
                $('input[type=hidden][name=phone_code]').val(phoneCode);
            } else if (mobileNumber == '') {
                $(this).removeClass('is-invalid');
                error = false;
            } else {
                $(this).addClass('is-invalid');
                toastr.error(`Enter valid ${validationRespObject.d} digit phone number`);
                error = true;
                return false;
            }
        }
    }

    var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
    if (video_cta_select == 3)
    {
        var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
        if (activeTab === "#tab-phone") {
            var mobileNumber = $("#call-land").val();
            if (mobileNumber == '') {
                $('#call-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                $('#call-land').removeClass('is-invalid');
            }
        } else if (activeTab === "#tab-toll") {
            var mobileNumber = $("#toll-land").val();
            if (mobileNumber == '') {
                $('#toll-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                if(mobileNumber.length === 11) {
                    $('#toll-land').removeClass('is-invalid');
                    var toll = $("#toll-land").val();
                    $("#call-land").val(toll);
                }
                else{
                    $('#toll-land').addClass('is-invalid');
                    toastr.error(`Enter valid 11 digit phone number`);
                    error = true;
                    return false;
                }
                
            }
        }
    }

    if ($("#filter").val() == '') {
        toastr.error('Please select filter');
        error = true;
        return false;
    }
    

    if (error == false) {
        $.ajax({
            type: 'POST',
            url: base_url + "admin/Vyrill/storeNew",
            data: new FormData(this),
            dataType: 'JSON',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();

            },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    setTimeout(function () { window.location.reload(); }, 4000);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {
                toastr.error('Something went wrong, Please try again!!');

            }

        });  //End Ajax
    }
});

$('#vyrill-edit-swirl-form-New').on('submit', function (e) {
    e.preventDefault();
    var error = false;
    if ($('#swirl-title').val() == '') {
        $('#swirl-title').addClass('is-invalid');
        error = true;
        return false;
    } else {
        $('#swirl-title').removeClass('is-invalid');
    }

    if ($("input[type=hidden][name=platform]").val() == 2) {
        if ($("#edit-existing-product").val() == '') {
            toastr.error('Please select product');
            error = true;
            return false;
        } else {
            error = false;
        }
    }
    var video_cta_select = $("input[type=radio][name=video_cta]:checked").val();
    if (video_cta_select == 3)
    {
        var activeTab = $('#call-now-div .nav-pills li a.active').attr('href'); 
        if (activeTab === "#tab-phone") {
            var mobileNumber = $("#call-land").val();
            if (mobileNumber == '') {
                $('#call-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                $('#call-land').removeClass('is-invalid');
            }
        } else if (activeTab === "#tab-toll") {
            var mobileNumber = $("#toll-land").val();
            if (mobileNumber == '') {
                $('#toll-land').addClass('is-invalid');
                error = true;
                return false;
            }
            else{
                if(mobileNumber.length === 11) {
                    $('#toll-land').removeClass('is-invalid');
                    var toll = $("#toll-land").val();
                    $("#call-land").val(toll);
                }
                else{
                    $('#toll-land').addClass('is-invalid');
                    toastr.error(`Enter valid 11 digit phone number`);
                    error = true;
                    return false;
                }
                
            }
        }
    }


    if ($('#edit-existing-product').val() != '') {
        $('#productlink').val('');
    }

    if ($('#productlink').val() != '') {
        $('#dummy-product-link').val('');
        $('#edit-existing-product').val(null).trigger('change');
    }

    if ($("#edit-filter").val() == '') {
        toastr.error('Please select filter');
        error = true;
        return false;
    }
    if (error == false) {

        $.ajax({
            type: 'POST',
            url: base_url + "admin/Vyrill/updateSwirlNew",
            data: new FormData(this),
            dataType: 'JSON',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();

            },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    setTimeout(function () { window.location.reload(); }, 4000);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {


                toastr.error('Something went wrong, Please try again!!');

            }

        });  //End Ajax   

    }
});