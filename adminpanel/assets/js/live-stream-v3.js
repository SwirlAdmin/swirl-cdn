$(document).ready(function () {
    var base_url = $('#base_url').val();
    $('.download-stream').on('click', function () {
        var url = $(this).data('id');
        window.location.href = 'livestream/download?stream_url=' + url;

    });

    //Date and time picker
    $('#reservationdatetime').datetimepicker({

        format: 'YYYY-MM-DD HH:mm:ss',
        pick12HourFormat: false,
        minDate: new Date(),
        icons: { time: 'far fa-clock' }

    });

    //color picker
    $('.my-colorpicker2').colorpicker();
    $('.my-colorpicker2').on('colorpickerChange', function (event) {
        $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    })


    $('#completed-live-stream').on('change', function () {
        var stream_id = $('#completed-live-stream option:selected').val();
        $.ajax({
            type: 'POST',
            url: base_url + "admin/LiveStream/getLiveDataById",
            dataType: 'JSON',
            data: { 'stream_id': stream_id },
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();
            },
            success: function (response) {
                if (response.status == 1) {
                    $('#title').val(response.data.title);
                    $('#cover_img').val(response.data.cover_img);
                    $('#rtmp_url').val(response.data.rtmp_url);
                    $('#product_ids').val(response.data.product_ids);
                    $('#stream_platform').val(response.data.stream_platform);
                    $('#banner_url').val(response.data.banner_url);
                    $('#stream_key').val(response.data.stream_key);
                    $('#banner_content_color').val(response.data.banner_content_color);

                } else {
                    toastr.error('Something went wrong, Please try again!!');
                }
            },
            error: function () {
                //toastr.error('Something went wrong, Please try again!!');
            }

        });


    });



    $('#embeded-live-stream').on('change', function () {


        var stream_id = $('#embeded-live-stream option:selected').val();
        var pip_mode = $("input[name='pip_mode']:checked").val();
        liveStreamEmbededCode(stream_id, pip_mode);
        // $.ajax({
        //             type:'POST',
        //             url: base_url+"admin/LiveStream/getStreamDataById",
        //             dataType:'JSON',
        //             data:{'stream_id':stream_id},
        //             beforeSend:function(){
        //                 $('#page-loading').show(); 
        //             },
        //             complete:function(){
        //                 $('#page-loading').hide(); 
        //             },                
        //             success:function(data){ 
        //                 // console.log(data);
        //                 if(data.status == 1){
        //                     $('#embeded-code').show();
        //                     document.getElementById('script').innerHTML='<script src="https://api.goswirl.live/swirl-embed/live-stream/v3/swirl-embed.js"></script>';
        //                     document.getElementById('live-btn').innerHTML='<button id="swirlLiveStream" style="margin: 20px auto; display: block;">Watch Now</button> <div id="swirl-live-stream" style="display: none;" data-stream="'+data.url+'"></div>';

        //                 } else {
        //                     $('#embeded-code').hide();
        //                     toastr.error(data.msg);

        //                 }
        //             },
        //             error:function(){
        //                 $('#embeded-code').hide();
        //             }

        // });


    });

    $("input[name=pip_mode]").on('change', function () {

        var pip_mode = $("input[name='pip_mode']:checked").val();
        var stream_id = $('#embeded-live-stream option:selected').val();
        liveStreamEmbededCode(stream_id, pip_mode);

    });

    // auto selected

    // var livestream_version = $("input[name='live_stream_version']:checked").val();  
    // if(livestream_version==1) {
    //     $("#live-stream-preview img").attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/live-stream-v6.png');   
    // }
    $('input:radio[name="live_stream_version"]').filter('[value="1"]').attr('checked', true); //Livestream version default selection    
    if ($("input[name='live_stream_version']:checked").val() == 1) {
        $("#select-thumbnail-div").show();
    } else {
        $("#select-thumbnail-div").hide();
    }
    $("input[name=live_stream_version]").on('change', function () { //Livestream version selection starts   
        var livestream_version = $("input[name='live_stream_version']:checked").val();
        if (livestream_version == '1') {
            $("#live-stream-preview img").attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/live-stream-v6.png');
            $("#multiple-live-stream-script").text('<script type="text/javascript" async src="https://apigoswirl.com/live_stream_pages/v6.1/live-streams.min.js"></script>')
            $("#select-thumbnail-div").show();
        } else {
            $("#live-stream-preview img").attr('src', 'https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/live-stream-v5.png');
            $("#multiple-live-stream-script").text('<script async src="https://apigoswirl.com/live_stream_pages/v5/swirl-live-stream-v2.min.js"></script>')
            $("#select-thumbnail-div").hide();
        }
    }); //Livestream version selection ends


    $('#live-custom-banner').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#schedule-live-stream option:selected').val() == '') {
            error = true;
        } else {
            error = false;

        }
        if ($('#swirl-cover').val() == '') {
            error = true;
        } else {
            error = false;
        }
        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/storeBanner",
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
                    console.log(data);
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
        else {
            toastr.error('All the Fields are mandatory');
            return false;
        }
    });

    $('#defer-live-stream').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#completed-live-stream option:selected').val() == '') {
            error = true;
        } else {
            error = false;

        }
        if ($('#start-time').val() == '') {
            error = true;
        } else {
            error = false;
        }

        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/createDeferLiveStream",
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
                success: function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        // $('#stream-result').show();
                        // $('#live-stream-link').html(response.data.live_stream_link);
                        // $('#rtmp-url').html(response.data.rtmp_url);
                        // $('#stream-key').html(response.data.stream_key);
                        toastr.success(response.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        //$('#stream-result').hide();
                        toastr.error('Something went wrong, Please try again!!');
                    }
                },
                error: function () {
                    //$('#stream-result').hide();
                    toastr.error('Something went wrong, Please try again!!');
                }

            });  //End Ajax
        } else {
            toastr.error('All the Fields are mandatory');
            return false;
        }
    });

    $('#defer-live-stream-ivs').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#completed-live-stream option:selected').val() == '') {
            error = true;
        } else {
            error = false;
    
        }
        if ($('#start-time').val() == '') {
            error = true;
        } else {
            error = false;
        }
    
        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/createDeferLiveStreamIVS",
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
                success: function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        // $('#stream-result').show();
                        // $('#live-stream-link').html(response.data.live_stream_link);
                        // $('#rtmp-url').html(response.data.rtmp_url);
                        // $('#stream-key').html(response.data.stream_key);
                        toastr.success(response.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        //$('#stream-result').hide();
                        toastr.error('Something went wrong, Please try again!!');
                    }
                },
                error: function () {
                    //$('#stream-result').hide();
                    toastr.error('Something went wrong, Please try again!!');
                }
    
            });  //End Ajax
        } else {
            toastr.error('All the Fields are mandatory');
            return false;
        }
    });

    // $("#edit-livestream-title").hide();
    // $('#edit-live-stream-dropdown').on('change', function () {
    //     var stream_id = $('#edit-live-stream-dropdown option:selected').val();
    //     $("#edit-livestream-title").show();
    //     $.ajax({
    //         type: 'POST',
    //         url: base_url + "admin/LiveStream/checkStreamIsSchedule",
    //         dataType: 'JSON',
    //         data: { 'stream_id': stream_id },
    //         beforeSend: function () {
    //             $('#page-loading').show();
    //         },
    //         complete: function () {
    //             $('#page-loading').hide();
    //         },
    //         success: function (response) {
    //             if (response.status == 1) {

    //                 if (response.data.is_schedule == 1) {
    //                     $('#is-schedule').val(response.data.is_schedule);
    //                     $('#stream-title').val(response.data.title);
    //                     $('#start-time').val(response.data.starting_time);
    //                     $('#date-time').show();
    //                     $('#pre-record-section').show();
    //                     $("#summernote").summernote("code", response.data.offers);
    //                 } else {
    //                     $('#is-schedule').val(response.data.is_schedule);
    //                     $('#stream-title').val(response.data.title);
    //                     $('#start-time').val(response.data.starting_time);
    //                     $('#date-time').hide();
    //                     $('#pre-record-section').hide();

    //                 }

    //                 $('#livestream-offers').show();
    //                 $('#cover-image').show();
    //                 $('#on-screen-section').show();
    //                 $('#banner-content-section').show();
    //                 $('#rsvp-section').show();
    //                 $('#viewer-count').show();
    //                 $('#hide-live-stream').show();
    //                 $('#product-price').show();
    //                 $('#close-btn-link').show();
    //                 $('#cta-btn-div').show();

    //                 $('input:radio[name="create_gif"]').filter('[value="0"]').prop('checked', true);
    //                 $("#start-gif-time").removeClass("is-invalid");
    //                 let selected_gif_thumbnails = response.data.gif_thumbnails;
    //                 if (selected_gif_thumbnails) {
    //                     const parts = selected_gif_thumbnails.split('&');
    //                     const startValue = parts.find(part => part.includes('start='));
    //                     if (startValue) {
    //                         const [, value] = startValue.split('=');
    //                         $("#start-gif-time").val(value);
    //                         $('input:radio[name="create_gif"][value="1"]').prop('checked', true);
    //                     } else {
    //                         $('input:radio[name="create_gif"][value="0"]').prop('checked', true);
    //                         $("#start-gif-time").val('');
    //                     }
    //                 } else {
    //                     $('input:radio[name="create_gif"][value="0"]').prop('checked', true);
    //                     $("#start-gif-time").val('');
    //                 }

    //                 let selectedRecordingUrl = $("#edit-live-stream-dropdown").find('option:selected').data('recording-url');
    //                 let recording_duration = $("#edit-live-stream-dropdown").find('option:selected').data('recording-duration');
    //                 if (selectedRecordingUrl != '') {
    //                     $('#create-gif-div').show();
    //                     $("#convert-to-gif-link").val(selectedRecordingUrl);
    //                     $("#video-duration").val(recording_duration);
    //                     if ($('input[name=create_gif]:checked').val() == 1) {
    //                         $("#start-gif-time-div").show();
    //                     } else {
    //                         $("#start-gif-time-div").hide();
    //                     }
    //                 } else {
    //                     $('#create-gif-div').hide();
    //                     $("#video-duration").val('');
    //                     $("#start-gif-time-div").hide();
    //                 }


    //                 let schedule_setting = JSON.parse(response.data.schedule_setting)
    //                 if (schedule_setting != '' && schedule_setting != null) {
    //                     if (schedule_setting.on_screen == 1) {
    //                         $('#on-screen-yes').prop("checked", true);
    //                     } else {
    //                         $('#on-screen-no').prop("checked", true);
    //                     }
    //                     if (schedule_setting.banner_content == 1) {
    //                         $('#banner-content-yes').prop("checked", true);
    //                     } else {
    //                         $('#banner-content-no').prop("checked", true);
    //                     }

    //                     if (schedule_setting.rsvp == 1) {
    //                         $('#rsvp-yes').prop("checked", true);
    //                     } else {
    //                         $('#rsvp-no').prop("checked", true);
    //                     }
    //                     if (schedule_setting.live_count == 1) {
    //                         $('#viewer-count-yes').prop("checked", true);
    //                     } else {
    //                         $('#viewer-count-no').prop("checked", true);
    //                     }
    //                     if (response.data.is_test == 2) {
    //                         $('#hide-live-stream-yes').prop("checked", true);
    //                     } else {
    //                         $('#hide-live-stream-no').prop("checked", true);
    //                     }

    //                     if (schedule_setting.is_product_price == 1) {
    //                         $('#product-price-yes').prop("checked", true);
    //                     } else {
    //                         $('#product-price-no').prop("checked", true);
    //                     }

    //                     if (schedule_setting.show_preview == 1) {
    //                         $('#show-preview-yes').prop("checked", true);
    //                         $('#recording-url-section').show();
    //                         $('input[type=hidden][name=recording_url_exist]').val(response.data.recording_url);
    //                         if ($('input[type=hidden][name=recording_url_exist]').val() == '') {
    //                             $('#recording-label').text('Choose file');
    //                         } else {
    //                             $('#recording-label').text(response.data.recording_url);
    //                         }
    //                     } else {
    //                         $('#show-preview-no').prop("checked", true);
    //                         $('#recording-url-section').hide();
    //                         $('input[type=hidden][name=recording_url_exist]').val(response.data.recording_url);
    //                         if ($('input[type=hidden][name=recording_url_exist]').val() == '') {
    //                             $('#recording-label').text('Choose file');
    //                         } else {
    //                             $('#recording-label').text(response.data.recording_url);
    //                         }
    //                     }

    //                     if ('orientation' in schedule_setting) {
    //                         if (schedule_setting.orientation == '') {
    //                             $('#orientation').val("1");
    //                         } else {
    //                             $('#orientation').val(schedule_setting.orientation);
    //                         }
    //                     } else {
    //                         $('#orientation').val("1");
    //                     }
    //                 }
    //                 if (response.data.cls_btn_link != '') {
    //                     $("#cls-btn-link").val(response.data.cls_btn_link);
    //                 }
    //                 $('#livestream-offers').show();
    //                 $('#cover-image').show();

    //                 if (response.data.cover_img != '') {
    //                     $('#swirlResult').attr('src', response.data.cover_img);
    //                     $('#del_livecover_icon').show();
    //                 } else {
    //                     $('#swirlResult').attr('src', '');
    //                     $('#del_livecover_icon').hide();
    //                 }
    //                 if (schedule_setting.cta_btn != '') {
    //                     $("#cta-btn").val(schedule_setting.cta_btn);
    //                 }

    //             } else {
    //                 $('#date-time').hide();
    //             }
    //         },
    //         error: function () {
    //             //toastr.error('Something went wrong, Please try again!!');
    //         }

    //     });


    // });

    $('#edit-live-stream-dropdown').on('change', function () {
        var stream_id = $('#edit-live-stream-dropdown option:selected').val();
        let stream_link = $('#edit-live-stream-dropdown option:selected').data('stream');

        $.ajax({
            type: 'POST',
            url: base_url + "admin/LiveStream/checkStreamIsSchedule",
            dataType: 'JSON',
            data: { 'stream_id': stream_id },
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();
            },
            success: function (response) {
                console.log(response);
                if (response.status == 1) {
                    if (response.data.is_schedule == 1) {
                        $('#is-schedule').val(response.data.is_schedule);
                        $('#stream-title').val(response.data.title);
                        $('#start-time').val(response.data.starting_time);
                        $("#summernote").summernote("code", response.data.offers);
                    } else {
                        $('#is-schedule').val(response.data.is_schedule);
                        $('#stream-title').val(response.data.title);
                        $('#start-time').val(response.data.starting_time);
                        $("#summernote").summernote("code", response.data.offers);
                    }
                    $('#is-live').val(response.data.is_live);
                    $('#end-time').val(response.data.end_time);
                    if (response.data.is_schedule == 1 && response.data.is_live == 1) {
                        $('#livestream-offers').hide();
                        $('#cover-image').hide();
                        $('#on-screen-section').hide();
                        $('#banner-content-section').hide();
                        $('#rsvp-section').hide();
                        $('#viewer-count').hide();
                        $('#hide-live-stream').hide();
                        $('#product-price').hide();
                        $('#close-btn-link').hide();
                        $('#cta-btn-div').hide();
                        $('#pre-record-section').hide();
                        $("#edit-livestream-title").hide();
                        $('#date-time').hide();
                        $('#edit-live-submit').hide();
                        $('#recording-url-section').hide();
                        $('#create-gif-div').hide();
                        //$('#start-gif-time-div').hide();
                        $('#live-show-started').show();

                        if (stream_link != '' && stream_link != undefined) {
                             let liveSubdomain = $('#live-subdomain').val();
                             let newHref = liveSubdomain + stream_link+"?flag=true";
                             $('#watch-live').attr('href', newHref);
                        }

                    } else if (response.data.is_schedule == 0 && response.data.ending_time != "0000-00-00 00:00:00") {
                        $('#livestream-offers').show();
                        $('#cover-image').show();
                        $('#on-screen-section').show();
                        $('#viewer-count').show();
                        $('#hide-live-stream').show();
                        $('#product-price').show();
                        $('#close-btn-link').show();
                        $('#cta-btn-div').show();
                        $('#banner-content-section').hide();
                        $('#rsvp-section').hide();
                        $('#pre-record-section').hide();
                        $("#edit-livestream-title").show();
                        $('#date-time').hide();
                        $('#edit-live-submit').show();
                        $('#live-show-started').hide();
                        $('#recording-url-section').hide();
                        $('#create-gif-div').show();
                    } else {
                        $('#livestream-offers').show();
                        $('#cover-image').show();
                        $('#on-screen-section').show();
                        $('#banner-content-section').show();
                        $('#rsvp-section').show();
                        $('#viewer-count').show();
                        $('#hide-live-stream').show();
                        $('#product-price').show();
                        $('#close-btn-link').show();
                        $('#cta-btn-div').show();
                        $('#pre-record-section').show();
                        $("#edit-livestream-title").show();
                        $('#date-time').show();
                        $('#edit-live-submit').show();
                        $('#live-show-started').hide();
                        /* $('#recording-url-section').show(); */
                        /* $('#create-gif-div').show(); */
                    }

                    if(response.data.is_test == 2)
                    {
                        $('#hide-live-stream-no').val('0');
                    }
                    else{
                        $('#hide-live-stream-no').val(response.data.is_test);
                    }
                    $('input:radio[name="create_gif"]').filter('[value="0"]').prop('checked', true);
                    $("#start-gif-time").removeClass("is-invalid");
                    let selected_gif_thumbnails = response.data.gif_thumbnails;
                    if (selected_gif_thumbnails) {
                        const parts = selected_gif_thumbnails.split('&');
                        const startValue = parts.find(part => part.includes('start='));
                        if (startValue) {
                            const [, value] = startValue.split('=');
                            $("#start-gif-time").val(value);
                            $('input:radio[name="create_gif"][value="1"]').prop('checked', true);
                        } else {
                            $('input:radio[name="create_gif"][value="0"]').prop('checked', true);
                            $("#start-gif-time").val('');
                        }
                    } else {
                        $('input:radio[name="create_gif"][value="0"]').prop('checked', true);
                        $("#start-gif-time").val('');
                    }

                    let selectedRecordingUrl = $("#edit-live-stream-dropdown").find('option:selected').data('recording-url');
                    let recording_duration = $("#edit-live-stream-dropdown").find('option:selected').data('recording-duration');
                    if (selectedRecordingUrl != '') {
                        // $('#create-gif-div').show();
                        $("#convert-to-gif-link").val(selectedRecordingUrl);
                        $("#video-duration").val(recording_duration);
                        if ($('input[name=create_gif]:checked').val() == 1) {
                            $("#start-gif-time-div").show();
                        } else {
                            $("#start-gif-time-div").hide();
                        }
                    } else {
                        // $('#create-gif-div').hide();
                        $("#video-duration").val('');
                        $("#start-gif-time-div").hide();
                    }

                    let schedule_setting = JSON.parse(response.data.schedule_setting)
                    if (schedule_setting != '' && schedule_setting != null) {
                        if (schedule_setting.on_screen == 1) {
                            $('#on-screen-yes').prop("checked", true);
                        } else {
                            $('#on-screen-no').prop("checked", true);
                        }
                        if (schedule_setting.banner_content == 1) {
                            $('#banner-content-yes').prop("checked", true);
                        } else {
                            $('#banner-content-no').prop("checked", true);
                        }

                        if (schedule_setting.rsvp == 1) {
                            $('#rsvp-yes').prop("checked", true);
                        } else {
                            $('#rsvp-no').prop("checked", true);
                        }
                        if (schedule_setting.live_count == 1) {
                            $('#viewer-count-yes').prop("checked", true);
                        } else {
                            $('#viewer-count-no').prop("checked", true);
                        }
                        if (response.data.is_test == 2) {
                            $('#hide-live-stream-yes').prop("checked", true);
                        } else {
                            $('#hide-live-stream-no').prop("checked", true);
                        }

                        if (schedule_setting.is_product_price == 1) {
                            $('#product-price-yes').prop("checked", true);
                        } else {
                            $('#product-price-no').prop("checked", true);
                        }

                        if (schedule_setting.show_preview == 1) {
                            $('#show-preview-yes').prop("checked", true);
                            if (response.data.is_schedule == 1 && response.data.is_live == 1)
                            {
                                $('#recording-url-section').hide();
                            }
                            else{
                                $('#recording-url-section').show();
                            }
                           
                            $('input[type=hidden][name=recording_url_exist]').val(response.data.recording_url);
                            if ($('input[type=hidden][name=recording_url_exist]').val() == '') {
                                $('#recording-label').text('Choose file');
                            } else {
                                $('#recording-label').text(response.data.recording_url);
                            }
                        } else {
                            $('#show-preview-no').prop("checked", true);
                            $('#recording-url-section').hide();
                            $('input[type=hidden][name=recording_url_exist]').val(response.data.recording_url);
                            if ($('input[type=hidden][name=recording_url_exist]').val() == '') {
                                $('#recording-label').text('Choose file');
                            } else {
                                $('#recording-label').text(response.data.recording_url);
                            }
                        }

                        if ('orientation' in schedule_setting) {
                            if (schedule_setting.orientation == '') {
                                $('#orientation').val("1");
                            } else {
                                $('#orientation').val(schedule_setting.orientation);
                            }
                        } else {
                            $('#orientation').val("1");
                        }
                    }
                    if (response.data.cls_btn_link != '') {
                        $("#cls-btn-link").val(response.data.cls_btn_link);
                    }

                    if (response.data.cover_img != '') {
                        $('#swirlResult').attr('src', response.data.cover_img);
                        $('#cover-link').val(response.data.cover_img);
                        $('#del_livecover_icon').show();
                    } else {
                        $('#swirlResult').attr('src', '');
                        $('#cover-link').val('');
                        $('#del_livecover_icon').hide();
                    }
                    if (schedule_setting.cta_btn != '') {
                        $("#cta-btn").val(schedule_setting.cta_btn);
                    }
                } else {
                    $('#date-time').hide();
                }
            },
            error: function () {
                //toastr.error('Something went wrong, Please try again!!');
            }
        });
    });

    //Default "No" select for create gif
    var create_gif = $('input:radio[name=create_gif]');
    if (create_gif.is(':checked') === false) {
        create_gif.filter('[value= "0"]').prop('checked', true);
    }
    $('input:radio[name="create_gif"]').on('change', function (event) {
        let create_gif_selection = $(this).val();
        if (create_gif_selection == 1) {
            $("#start-gif-time-div").show();
            $("#start-gif-time").val('');
        } else {
            $("#start-gif-time-div").hide();
            $("#start-gif-time").val('');
        }
    });

    $("#start-gif-time").on("change", function () {
        const start_gif_time = parseFloat($(this).val()); // Parse as float
        const recording_duration = parseFloat($("#video-duration").val()); // Parse as float

        const isInvalid = !isNaN(start_gif_time) && !isNaN(recording_duration) && start_gif_time > recording_duration;

        $(this).toggleClass("is-invalid", isInvalid);

        if (isInvalid) {
            toastr.error(`Start time for GIF exceeds video length ${recording_duration} seconds`);
        }
    });

    // RecordingURL
    $('#recordingURLInputFile').on('change', function (event) {

        var validExtensions = ["mp4"]
        var ext = $(this).val().split('.').pop();
        if (validExtensions.indexOf(ext) == -1) {
            toastr.error('Only .mp4 file format allowed');
            $('#recordingURLInputFile').val('');
            return false;
        }
        var recordingVideo = document.getElementById('recording-url-video');
        var duration = '';
        recordingVideo.addEventListener('loadedmetadata', function () {
            duration = Math.round(recordingVideo.duration);
            if (duration < 1 || duration > 180) {
                $('#recordingURLInputFile').val('');
                toastr.error('Duration of the Video should range from 1 to 180 seconds');
                return false;
            }
        });
        let file = event.target.files[0];
        let blobURL = URL.createObjectURL(file);
        document.querySelector("video").src = blobURL;
        $('#recording-label').text(file.name);
        $('input[type=hidden][name=recording_url_exist]').val('');
    });

    $('input:radio[name="is_product_price"]').filter('[value="1"]').attr('checked', true); //Product Price default selection

    $('#edit-live-stream').on('submit', function (e) {
        e.preventDefault();
        var error = false;
        if ($('#edit-live-stream-dropdown option:selected').val() == '') {
            toastr.error('Select live stream');
            error = true;
            return false;
        } else {
            error = false;
        }

        if ($('#stream-title').val() == '') {
            error = true;
        } else {
            error = false;
        }

        if ($('input[name=show_preview]:checked').val() == 1) {
            if ($('#recordingURLInputFile').get(0).files.length === 0 && $('input[type=hidden][name=recording_url_exist]').val() == '') {
                toastr.error('Enter recording URL');
                $("#recordingURLInputFile").addClass("is-invalid");
                error = true;
                return false;
            } else {
                $("#recordingURLInputFile").removeClass("is-invalid");
                error = false;
            }

        }

        if ($('#cls-btn-link').val() == '') {
            $('#cls-btn-link').addClass('is-invalid');
            error = true;
            return false;
        } else {
            if (isUrlValid($('#cls-btn-link').val().trim())) {
                $('#cls-btn-link').removeClass('is-invalid');
            } else {
                $('#cls-btn-link').addClass('is-invalid');
                error = true;
                toastr.error('Please enter valid url');
                return false;
            }
        }

        if ($('input[name=create_gif]:checked').val() == 1) {
            let video_duration = parseFloat($("#video-duration").val()); // Parse as float
            let start_gif_time = parseFloat($("#start-gif-time").val()); // Parse as float

            if (!isNaN(video_duration) && !isNaN(start_gif_time)) {
                if (start_gif_time > video_duration) {
                    $("#start-gif-time").addClass('is-invalid');
                    error = true;
                    toastr.error(`Start time for GIF exceeds video length ${video_duration} seconds`);
                } else if (start_gif_time == '') {
                    $("#start-gif-time").addClass('is-invalid');
                    error = true;
                    toastr.error(`Please add start time for GIF`);
                } else {
                    $("#start-gif-time").removeClass('is-invalid');
                }
            } else {
                $("#start-gif-time").addClass('is-invalid');
                error = true;
                toastr.error(`Invalid input. Please provide valid start time and video duration.`);
            }
            if (error) {
                return false;
            }
        }

        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/updateLiveStream",
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
                    console.log(data);
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
        } else {
            // toastr.error('All the Fields are mandatory');
            return false;
        }
    });


    // Summernote settings Starts
    $('#summernote').summernote({
        placeholder: 'Enter offers here...',
        tabsize: 2,
        height: 225,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onBlur: function (contents) {
                $('p').each(function () {
                    if ($(this).text() === '') {
                        $(this).remove();
                    }
                });
            },
            onEnter: function (contents) {
                $('p').each(function () {
                    if ($(this).text() === '') {
                        $(this).remove();
                    }
                });
            }
        }

    });
    // Summernote settings Ends 

    $('#swirl-cover').on('change', function () {
        liveStreamBanner(this);
        $('#del_livecover_icon').show();
    });

    // Live stream user permission 
    // Live stream user permission Starts
    var default_select = $("input[name='user_permission']:checked").val();
    if (default_select == $('#permission1').val()) {
        $("#name_block").addClass('bg-info');
    }
    if (default_select == $('#permission2').val()) {
        $("#name_mobile_block").addClass('bg-info');
    }
    if (default_select == $('#permission3').val()) {
        $("#name_mobileotp_block").addClass('bg-info');
    }
    $('input[type=radio][name=user_permission]').on('change', function () {
        if ($('#permission1').is(':checked')) {
            $("#name_block").addClass('bg-info');
            $("#name_mobile_block").removeClass('bg-info');
            $("#name_mobileotp_block").removeClass('bg-info');
        }
        if ($('#permission2').is(':checked')) {
            $("#name_mobile_block").addClass('bg-info');
            $("#name_block").removeClass('bg-info');
            $("#name_mobileotp_block").removeClass('bg-info');
        }
        if ($('#permission3').is(':checked')) {
            $("#name_mobileotp_block").addClass('bg-info');
            $("#name_mobile_block").removeClass('bg-info');
            $("#name_block").removeClass('bg-info');
        }
    });

    $('#ls_user_permission').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: base_url + "admin/LiveStream/updatePermission",
            data: $('#ls_user_permission').serialize(),
            dataType: 'JSON',
            beforeSend: function () {
                $('#page-loading').show();
            },
            complete: function () {
                $('#page-loading').hide();
            },
            success: function (data) {
                console.log(data);
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
        });
    });

    // Live stream User permission ends


    // CTA Button customization starts
    $("#txt-color,#bg-color").colorpicker();
    $("#txt-color").on("colorpickerChange", function (event) {
        $("#txt-color-view").css("color", event.color.toString());
    });
    $("#bg-color").on("colorpickerChange", function (event) {
        $("#bg-color-view").css("color", event.color.toString());
    });

    $("#cta_btn_custom").on("submit", function (e) {
        e.preventDefault();
        $error = false;

        var title = $("#title").val();

        if (title.length == "" || title.length < 3 || title.length > 20) {
            $("#title_error").fadeIn();
            $("#title").addClass("is-invalid");
            $("#title_error").text("*Length must be between 3 to 20 characters.").addClass("red-star");
            $error = true;
            return $error;
        } else {
            $("#title_error").fadeOut();
            $("#title").removeClass("is-invalid");
        }
        if ($error == false) {
            $.ajax({
                type: "POST",
                url: base_url + "admin/LiveStream/createUpdateCtaBtn",
                data: $("#cta_btn_custom").serialize(),
                dataType: "JSON",
                beforeSend: function () {
                    $("#page-loading").show();
                },
                complete: function () {
                    $("#page-loading").hide();
                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () {
                            window.location.reload();
                        }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error("Something went wrong, Please try again!!");
                },
            }); //End Ajax
        }
    });

    var color1 = $("#txt-color").val();
    $("#txt-color-view").css({ color: color1, cursor: "pointer" }).click(function () { $("#txt-color").focus(); });
    var color2 = $("#bg-color").val();
    $("#bg-color-view").css({ color: color2, cursor: "pointer" }).click(function () { $("#bg-color").focus(); });

    // CTA Button customization ends


    // Live stream embeded code Starts

    var status = false;
    var lssc_id = $("#lssc-id").val();
    var lssc_code = $("#lssc-code").val();

    if ($("#lssc-status").val() == 1) {
        status = true;
    }

    if (lssc_id != "") {
        $(".lssc-toggle").bootstrapSwitch({
            state: status,
            onSwitchChange: function (e, state) {
                if (state == true) {
                    $("#livestream-card-body").show();
                    $('.live_stream_accordion').show();
                    updateLiveStreamStatus(status, 1);
                } else {
                    $("#livestream-card-body").hide();
                    $('.live_stream_accordion').hide();
                    updateLiveStreamStatus(status, 0);
                }
            }
        });

        if (status) {
            $("#livestream-card-body").show();
            $('.live_stream_accordion').show();
        } else {
            $("#livestream-card-body").hide();
            $('.live_stream_accordion').hide();
        }
    } else {
        $(".lssc-toggle").bootstrapSwitch({
            state: status,
            onSwitchChange: function (e, state) {
                if (state == true) {
                    $("#livestream-card-body").show();
                    $('.live_stream_accordion').show();
                    updateLiveStreamStatus(status, 1);
                } else {
                    $("#livestream-card-body").hide();
                    $('.live_stream_accordion').hide();
                    updateLiveStreamStatus(status, 0);
                }
            },
        });
    }
    // Live stream embeded code ends

    // Live stream Setting starts
    var header_setting = 0;
    $(".header-setting-toggle").bootstrapSwitch({
        onSwitchChange: function (event, state) {
            if (state == true) {
                header_setting = 1;
            } else {
                header_setting = 0;
            }
        }
    });
    $("#date-bk-color,#date-fk-color").colorpicker();
    $("#date-bk-color").on("colorpickerChange", function (event) { $("#date-bk-color-box").css("color", event.color.toString()); });
    $("#date-fk-color").on("colorpickerChange", function (event) { $("#date-fk-color-box").css("color", event.color.toString()); });
    var date_bk_color = $("#date-bk-color").val();
    var date_fk_color = $("#date-fk-color").val();
    $("#date-bk-color-box").css({ color: date_bk_color, cursor: "pointer" }).click(function () { $("#date-bk-color").focus(); });
    $("#date-fk-color-box").css({ color: date_fk_color, cursor: "pointer" }).click(function () { $("#date-fk-color").focus(); });

    $("#live-stream-setting").on("submit", function (e) {
        e.preventDefault();
        $error = false;

        var schedule_text = $("#schedule-text").val();
        var completed_text = $("#completed-text").val();
        var date_bk_color = $("#date-bk-color").val();
        var date_fk_color = $("#date-fk-color").val();
        var total_view = $("input[type=radio][name=total_view]:checked").val();
        var format = $("input[type=radio][name=format]:checked").val();
        var lssc_id = $("#lssc-id").val();


        if (schedule_text.length == "" || schedule_text.length < 3 || schedule_text.length > 20) {
            $("#schedule_text_error").fadeIn();
            $("#schedule_text_error").addClass("is-invalid");
            $("#schedule_text_error").text("*Length must be between 3 and 20 characters.").addClass("red-star");
            $error = true;
            return $error;
        } else {
            $("#schedule_text_error").fadeOut();
            $("#schedule_text_error").removeClass("is-invalid");
        }

        if (completed_text.length == "" || completed_text.length < 3 || completed_text.length > 20) {
            $("#completed_text_error").fadeIn();
            $("#completed_text_error").addClass("is-invalid");
            $("#completed_text_error").text("*Length must be between 3 and 20 characters.").addClass("red-star");
            $error = true;
            return $error;
        } else {
            $("#completed_text_error").fadeOut();
            $("#completed_text_error").removeClass("is-invalid");
        }

        if ($error == false) {
            $.ajax({
                type: "POST",
                url: base_url + "admin/LiveStream/updateLiveStreamFormat",
                data: { lssc_id: lssc_id, schedule_text: schedule_text, completed_text: completed_text, date_bk_color: date_bk_color, date_fk_color: date_fk_color, format: format, total_view: total_view, header_setting: header_setting },
                dataType: "JSON",
                beforeSend: function () {
                    $("#page-loading").show();
                },
                complete: function () {
                    $("#page-loading").hide();
                },
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () {
                            window.location.reload();
                        }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error("Something went wrong, Please try again!!");
                },
            }); //End Ajax
        }
    });
    // Live stream Setting endsss





    $('#select-theme-form').on('submit', function (e) {
        e.preventDefault();
        // let des_id = $('#des-id').val();
        // let theme_val = $('input[name=select_theme]:checked', '#select-theme-form').val();

        $.ajax({
            type: "POST",
            url: base_url + "admin/LiveStream/updateTheme",
            data: $("#select-theme-form").serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $("#page-loading").show();
            },
            complete: function () {
                $("#page-loading").hide();
            },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    setTimeout(function () {
                        window.location.reload();
                    }, 4000);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {
                toastr.error("Something went wrong, Please try again!!");
            },
        }); //End Ajax
    });

    $('input[name=show_preview]').on('change', function () {
        if ($("input[name=show_preview]:checked").val() == 1) {
            $('#recording-url-section').show();
        } else {
            $('#recording-url-section').hide();

        }
    });

    //create live stream start

    $("input[name=live]").on('change', function () {
        if ($(this).val() == 2) {
            $('#live-stream-date').show();
        } else {
            $('#live-stream-date').hide();
            $('#start-time').val('');

        }
    });

    $('#live-stream-listing').DataTable();
    $("#live-stream-products").select2({ closeOnSelect: false });

    $('.shareable-link').click(function () {
        var text = $(this).val();
        var key = $(this).data("id");
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        $('#live-copied-code-' + key).html('<span class="text-center" style="color:#17a2b8">Copied Code</span>');
        $("#live-copied-code-" + key).fadeIn();
        window.setTimeout(function () {
            $("#live-copied-code-" + key).fadeOut();
        }, 2000)
        document.body.removeChild(input);
    });

    $('#create-live-stream').submit(function (e) {
        e.preventDefault();
        error = false;
        let live_sel = $('input[name=live]:checked').val();
        if ($('#title').val() == '') {
            $('#title').addClass('is-invalid');
            error = true;
        } else {
            $('#title').removeClass('is-invalid');
        }

        if (live_sel == 2) {
            if ($('#start-time').val() == '') {
                $('#start-time').addClass('is-invalid');
                error = true;
            } else {
                $('#start-time').removeClass('is-invalid');
            }
        }
        if (error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/createLive",
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
                    if (data.success == 1) {
                        toastr.success(data.message);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.message);
                    }
                },
                error: function () {
                    toastr.error('Something went wrong, Please try again!!');

                }

            });  //End Ajax 
        }

    });

    $('.live-stream-copy-link').on('click', function () {
        var id = $(this).data('id');
        var copyText = $(this).val();
        var brand_id = $(this).data('brand-id');
        $('#live-copied-code-' + id).html('Copied');
        $('#live-copied-code-' + id).css('color', '#17a2b8');
         navigator.clipboard.writeText(copyText).then(() => {
            window.setTimeout(function () {
                $('#live-copied-code-' + id).html('');
            }, 1000);

            }); 
      
    });
    $('.test-stream-copy-link').on('click', function () {
        var id = $(this).data('id');
        var copyText = $(this).val();
        $('#test-copied-code-' + id).html('Copied');
        $('#test-copied-code-' + id).css('color', '#17a2b8');
        navigator.clipboard.writeText(copyText).then(() => {
            window.setTimeout(function () {
                $('#test-copied-code-' + id).html('');
            }, 1000);
        });
    });

    // Code for deferred test live
    $('#test-deferred').change(function () {
        if ($(this).is(':checked')) {
            $('#test-deferred-status').val('1');
            $('#deferred-live').html(`<h3 class="card-title" id="deferred-live"><i class="fas fa-video"></i> Deferred Test</h3>`);
            $('#live-stream-result').hide();
            $('#test-stream-result').show();
        } else {
            $('#test-deferred-status').val('0');
            $('#deferred-live').html(`<h3 class="card-title" id="deferred-live"><i class="fas fa-video"></i> Deferred Live</h3>`);
            $('#test-stream-result').hide();
            $('#live-stream-result').show();
        }
    });

    $('#copytoclip-livestream').css({ "position": "absolute", "right": "30px", "top": "60%" });
    $('#copytoclip-livestream').on('click', function () {
        $(this).css({ "position": "absolute", "right": "30px", "top": "65%" });
        setTimeout(function () { $('#copytoclip-livestream').css({ "position": "absolute", "right": "30px", "top": "60%" }) }, 2400);
    });

    $("input[name=thumbnail]").on('change', function () { //Livestream version selection starts   
        var thumbnail = $(this).val();
        $.ajax({
            type: 'POST',
            url: base_url + "admin/LiveStream/updateThumbnail",
            dataType: 'JSON',
            data: { 'thumbnail': thumbnail },
            success: function (data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                    if (data.thumbnail == 2) {
                        $('input:radio[name="thumbnail"]').filter('[value="2"]').attr('checked', true);
                    } else {
                        $('input:radio[name="thumbnail"]').filter('[value="1"]').attr('checked', true);
                    }
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function () {
                toastr.error('Somethings went wrong, Please try again!');
            }
        });

    });

    //Default "portrait" select for livestream cover orientation
    var orientation = $('input:radio[name=orientation]');
    if (orientation.is(':checked') === false) {
        orientation.filter('[value= "1"]').prop('checked', true);
    }

});  // End DOM
function deleteLiveStream(live_id) {
    var base_url = $('#base_url').val();
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Live Stream !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
    },
        function () {

            $.ajax({
                type: 'POST',
                url: base_url + "admin/LiveStream/delete",
                dataType: 'JSON',
                data: { 'live_id': live_id, 'action': 'delete' },
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

function liveStreamEmbededCode(stream_id = '', pip_mode = 1, base_url) {
    var base_url = $('#base_url').val();
    var brand_id = $('#live-stream-brand-id').val();

    $.ajax({
        type: 'POST',
        url: base_url + "admin/LiveStream/getStreamDataById",
        dataType: 'JSON',
        data: { 'stream_id': stream_id, 'pip_mode': pip_mode },
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();
        },
        success: function (data) {
            // console.log(data);
            if (data.status == 1) {
                $('#iframe-code').show();
                $('#warning-msg').show();

                if (data.pip_mode == 0) {
    
                    document.getElementById('iframe-code-url').innerHTML = '<textarea  style="width:100%!important;height:150px !important;"><iframe src="' + data.iframe + '" class="SwirlBlock_Iframe-w8ymkp-1 swirl-demo" allow="clipboard-read; clipboard-write;fullscreen" sandbox="allow-scripts allow-popups allow-same-origin allow-forms"></iframe> <script>;window.addEventListener("message",(event)=>{if(event.data.action==="open"&&event.data.url){window.open(event.data.url,"_blank")}});const handleFullscreenEvent=(e)=>{const{action};=e.data;if(action==='documentfullscreen'&&!document.fullscreenElement){document.body.requestFullscreen()};if(action==="documentexitfullscreen"&&document.fullscreenElement){document.exitFullscreen()}};window.addEventListener("message",handleFullscreenEvent,!1);</script> </textarea>'

                } else {
                
                  document.getElementById('iframe-code-url').innerHTML = '<textarea  style="width:100%!important;height:150px !important;"><iframe src="' + data.iframe + '" class="SwirlBlock_Iframe-w8ymkp-1 swirl-demo" allow="clipboard-read; clipboard-write;fullscreen" sandbox="allow-scripts allow-popups allow-same-origin allow-forms"></iframe> <script>;window.addEventListener("message",(event)=>{if(event.data.action==="open"&&event.data.url){window.open(event.data.url,"_blank")}});const handleFullscreenEvent=(e)=>{const{action};=e.data;if(action==='documentfullscreen'&&!document.fullscreenElement){document.body.requestFullscreen()};if(action==="documentexitfullscreen"&&document.fullscreenElement){document.exitFullscreen()}};window.addEventListener("message",handleFullscreenEvent,!1);</script> </textarea>';

                }
            } else {
                toastr.error(data.msg);
                $('#iframe-code').hide();
                $('#warning-msg').hide();


            }
        },
        error: function () {
            $('#iframe-code').hide();
            $('#warning-msg').hide();

            // toastr.error('Something went wrong, Please try again!!');
        }

    });
}


function updateLiveStreamStatus(status = "", flag = 0) {
    var base_url = $("#base_url").val();
    var id = $("#lssc-id").val();
    var code = $("#lssc-code").val();
    $.ajax({
        type: "POST",
        url: base_url + "admin/LiveStream/setupLiveStream",
        data: { id: id, code: code, status: status, current_status: flag },
        dataType: "JSON",
        success: function (data) {
            if (data.status == 1) {
                if (data.flag == 1) {
                    $("#code").val(data.code);
                    $("#lssc-id").val(data.lssc_id);
                    $("#live-btn").text('<div id="swirl-live-streams" data-code="' + data.code + '"></div>');
                }
                toastr.success(data.msg);
            } else {
                toastr.error(data.msg);
            }
        },
        error: function () {
            toastr.error("Something went wrong, Please try again!!");
        },
    });
}

function lssc_copyToClipboard() {
    var text = $("#lssc-code").val();
    var input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    $("#copied-code").html(
        '<span class="text-center" style="color:#17a2b8">Copied Code</span>'
    );
    $("#copied-code").fadeIn();
    window.setTimeout(function () {
        $("#copied-code").fadeOut();
    }, 2000);
    document.body.removeChild(input);
}
function liveStreamBanner(input) {

    var fileInput = $('#swirl-cover');
    var filePath = fileInput.val();
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
    if (!allowedExtensions.exec(filePath)) {
        toastr.error('Please select any of the image extension (jpg|jpeg|png|gif|webp)');
        fileInput.value = '';
        error = false;
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#swirlResult').attr('src', e.target.result);
            $('#swirlResult').attr('width', 200);
            $('#swirlResult').attr('height', 200);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $('#swirl-autofill').val(0);
}
/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('swirl-cover');
var infoArea = document.getElementById('upload-label');
input.addEventListener('change', showFileName);
function showFileName(event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = fileName;
}


function isVideoByURL(url) {
    var filename = url.split('/').pop().split('#')[0].split('?')[0];

    if (filename) {
        var ext = filename.split('.').pop();
        var mimeType = mime.getType(ext);

        return mimeType.startsWith('video');
    }

    return false;
}

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function delLiveCover() {
    $('#swirl-cover').val('');
    $('#cover-link').val('');
    $('#swirlResult').attr({
        src: '',
        width: 0,
        height: 0
    });
    $('#upload-label').text('');
    $('#del_livecover_icon').hide();
}