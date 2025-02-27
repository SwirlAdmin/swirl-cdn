$(document).ready(function () {



    var base_url = $('#base_url').val();
    $("#tag-cta-color1,#tag-cta-color2").colorpicker();
    $("#product-cta-color1").css("color", $("#tag-cta-color1").val());
    $("#product-cta-color2").css("color", $("#tag-cta-color2").val());
    // colorpicker on change values
    $("#tag-cta-color1").on("colorpickerChange", function (event) { $("#product-cta-color1").css("color", event.color.toString()); });
    $("#tag-cta-color2").on("colorpickerChange", function (event) { $("#product-cta-color2").css("color", event.color.toString()); });

    $("#product-link").on('change', function () {   // url link Validation

        if ($('#product-link').val() != "" && isUrlValid($('#product-link').val())) {
            let temp = $('#product-link').val();
            let count = (temp.match(/\?/g) || []).length;
            if (count > 1) {
                $('#product-link').addClass('is-invalid');
                toastr.error("Invalid Url");
            } else {
                $('#product-link').removeClass('is-invalid');
            }
        }
    });

    $('#product-list').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': base_url + 'admin/Product/getProductList'
        },
        dom: 'Bfrtip',
        buttons: [
            {
                "extend": 'excel',
                "titleAttr": 'Excel',
                "action": newexportaction
            },
            {
                "extend": 'copy',
                "titleAttr": 'Copy',
                "action": newexportaction
            },
            {
                "extend": 'csv',
                "titleAttr": 'CSV',
                "action": newexportaction
            },
            {
                "extend": 'pdf',
                "titleAttr": 'PDF',
                "action": newexportaction
            },
            {
                "extend": 'print',
                "titleAttr": 'Print',
                "action": newexportaction
            },
            // 'copy', 'csv', 'pdf', 'print'
        ],
        'columns': [
            { data: 'product_id' },
            { data: 'product_createdat' },
            { data: 'image' },
            { data: 'product_title' },
            { data: 'product_desc' },
            { data: 'product_price' },
            { data: 'product_sell_price' },
            { data: 'sku_code' },
            { data: 'status' },
            { data: 'action' },
        ]
    });


    // $('#product-img').on('change', function () {
    //     let ext = $(this).val().split('.').pop();
    //     readURL(input,ext);
    // });
    // // show the page link for edit mode
    // if($('#product-page-link').prop('checked')){

    //     $('#product-link-dev').show();  
    // }
    //Page link enable or disabled
    // $('#product-page-link').on('change', function(){
    //     if($('#product-page-link').prop('checked'))
    //     {
    //     $('#product-link-dev').show();
    //     }  else {
    //         $('#product-link-dev').hide();
    //     }
    // });


    // add product page submission

    $('.checkDigit').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && ((event.which < 48 || event.which > 57) && (event.which != 0 && event.which != 8))) {
            event.preventDefault();
        }
        var text = $(this).val();
        if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2) && (event.which != 0 && event.which != 8) && ($(this)[0].selectionStart >= text.length - 2)) {
            event.preventDefault();
        }
    });


    $('#add-product-form').submit(function (e) {
        e.preventDefault();
        $('#add-product').prop('disable', true);
        $error = false;

        var p_price = $('#product-price').val();
        var d_price = $('#discount-price').val();

        if (p_price != '') {
            if (!$.isNumeric(p_price) || p_price == '') {
                //$error = true;
                toastr.error('Prices can only be integer or float value');
                $('#product-price').addClass('is-invalid');
                return false;
            } else {
                $('#product-price').removeClass('is-invalid');
            }
        }

       /* if(p_price !='')
        {

            if (d_price > p_price) {
                $error = true;
                toastr.error("Discount price can't exceed from Product Price");
                $('#discount-price').addClass('is-invalid');
                return false;
            } else {
                $('#discount-price').removeClass('is-invalid');

            }
        }*/

        let temp = $('#product-link').val();
        let count = (temp.match(/\?/g) || []).length;
        if (count > 1) {
            $('#product-link').addClass('is-invalid');
            toastr.error("Invalid Url");
            $error = true;
            return false;
        } else {
            $('#product-link').removeClass('is-invalid');
            $error = false;
        }

        if ($('#product-name').val() == '') {
            $('#product-name').addClass('is-invalid');
            $error = true;
        } else {
            $('#product-name').removeClass('is-invalid');
        }

        if ($('#product-desc').val() == '') {
            $('#product-desc').addClass('is-invalid');
            $error = true;
        } else {
            $('#product-desc').removeClass('is-invalid');
        }

        if ($('#product-price').val() == '') {
            $('#product-price').addClass('is-invalid');
            $error = true;
        } else {
            $('#product-price').removeClass('is-invalid');
        }

        // if($('#product-sku').val()!='')
        // {
        //     var product_sku =  $('#product-sku').val().length;
        //     if(product_sku < 3 || product_sku > 16 )
        //     {
        //         $('#product-sku').addClass('is-invalid');
        //         toastr.error('Product SKU number between the 4 and 16 characters');
        //         $error = true;
        //         return false;

        //     } else {
        //         $('#product-sku').removeClass('is-invalid');
        //     }
        // }

        if ($('#product_id').val() == '') {
            if ($('#product-img').val() == '') {
                if ($('#product-autofill').val() == 0) {
                    $('#product-img').addClass('is-invalid');
                    $error = true;
                } else {
                    $('#product-img').removeClass('is-invalid');

                }

            } else {
                $('#product-img').removeClass('is-invalid');
            }

        }
        // if($('#product-page-link').prop('checked'))
        // {  
        //    if($('#product-link').val() == ''){
        //        $('#product-link').addClass('is-invalid');
        //        $error = true;
        //    } else {
        //         if(isUrlValid($('#product-link').val())){
        //            $('#product-link').removeClass('is-invalid');
        //         } else {
        //             $('#product-link').addClass('is-invalid');
        //             $error = true;
        //             toastr.error('Please enter valid product url');
        //             return false;
        //         }
        //    }
        // }


        if ($('#product-link').val() == '') {
            $('#product-link').addClass('is-invalid');
            $error = true;
        } else {
            if (isUrlValid($('#product-link').val())) {
                $('#product-link').removeClass('is-invalid');
            } else {
                $('#product-link').addClass('is-invalid');
                $error = true;
                toastr.error('Please enter valid product url');
                return false;
            }
        }

        if ($('#user-platform').val() == '2' || $('#user-platform').val() == '4') {
            let brandProductId = $('#brand-product-id').val();
            if (brandProductId == '') {
                $('#brand-product-id').addClass('is-invalid');
                toastr.error('Please add brand product ID');
                $error = true;
                return false;
            } else {
                $('#brand-product-id').removeClass('is-invalid');
                $error = false;
            }
        }

        if ($error == true) {

            toastr.error('All the fields are mandatory');
            return false;
        }
        if ($error == false) {
            $.ajax({
                type: 'POST',
                url: base_url + "admin/product/save",
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
                    // $('#add-product').prop('disable',false);
                    // $('#loading-btn').hide();
                    // $('#add-product').show();
                    //  $('#add-product').show();
                    //  $('#loading-btn').hide();
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        setTimeout(function () { window.location.reload(); }, 4000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Something went wrong, Please try again!!');
                    // $('#add-product').prop('disable',true);
                    // $('#loading-btn').hide();
                    // $('#add-product').show();
                }

            });  //End Ajax 
        }


    });   // End Add product

    $('#product-link').bind('input propertychange', function () {
        getProductLinkData();
    });


    $('#product-list tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $(document).on('click', '.product-delete', function () {

        if (0) {
            // if(!$(this).prop('checked')){
            toastr.error('Please select checkbox before deleting the product.');
            return false;
        } else {
            var _id = $(this).data('id');
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this product!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!"
            },
                function () {

                    $.ajax({
                        type: 'POST',
                        url: "product/delete",
                        data: { 'id': _id, 'action': 'delete' },
                        dataType: 'JSON',
                        success: function (data) {
                            if (data.status == 1) {
                                toastr.success(data.msg);
                                //$('#product-list').row('.selected').remove().draw( false );
                                window.setTimeout(function () { window.location.reload(); }, 3000);
                            } else {
                                toastr.error(data.msg);
                            }
                        },
                        error: function () {
                            toastr.error('Somethings went wrong, Please try again!!');
                        }
                    });

                });
        }
    });


    $('#upload-bulk-product').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: base_url + "admin/product/uploadBulkProducts",
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
                    $('#product-result').html(' <div class="col-md-12"> <div class="alert alert-info" role="alert"> <div class="row"> <div class="col-md-4"> <span>Total Products: ' + data.total_products + ' </span> </div> <div class="col-md-4"> <span>Upload Products: ' + data.add_product + ' </span> </div> <div class="col-md-4"> <span>Failure Products: ' + data.failure + ' </span> </div> </div> </div> </div>');
                } else {
                    toastr.error(data.msg);
                }
            },
            // error:function(){
            //     toastr.error('Something went wrong, Please try again!!');

            // }

        });  //End Ajax 
    });


    $('#upload-bulk-videos').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: base_url + "admin/Product/uploadBulkVideo",
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


                if (data.status) {
                    toastr.success(data.msg);
                    //$('#product-result').html(' <div class="col-md-12"> <div class="alert alert-info" role="alert"> <div class="row"> <div class="col-md-4"> <span>Total Products: '+data.total_products+' </span> </div> <div class="col-md-4"> <span>Upload Products: '+data.add_product+' </span> </div> <div class="col-md-4"> <span>Failure Products: '+data.failure+' </span> </div> </div> </div> </div>'); 
                } else {
                    toastr.error(data.msg);
                }
            },
            // error:function(){
            //     toastr.error('Something went wrong, Please try again!!');

            // }

        });  //End Ajax 
    });

    $('#product-img').on('change', function () {
        productCoverImg(this);
    });


    function newexportaction(e, dt, button, config) {
        var self = this;
        var oldStart = dt.settings()[0]._iDisplayStart;
        dt.one('preXhr', function (e, s, data) {
            data.start = 0;
            data.length = 2147483647;
            dt.one('preDraw', function (e, settings) {
                // Call the original action function
                if (button[0].className.indexOf('buttons-copy') >= 0) {
                    $.fn.dataTable.ext.buttons.copyHtml5.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-excel') >= 0) {
                    $.fn.dataTable.ext.buttons.excelHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.excelHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.excelFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-csv') >= 0) {
                    $.fn.dataTable.ext.buttons.csvHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.csvHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.csvFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-pdf') >= 0) {
                    $.fn.dataTable.ext.buttons.pdfHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.pdfHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.pdfFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-print') >= 0) {
                    $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
                }
                dt.one('preXhr', function (e, s, data) {
                    settings._iDisplayStart = oldStart;
                    data.start = oldStart;
                });
                setTimeout(dt.ajax.reload, 0);
                return false;
            });
        });
        dt.ajax.reload();
    }

    //Default "No" select for Dummy Product
    let dummy_product = $('input:radio[name=dummy_product]');
    if (dummy_product.is(':checked') === false) {
        dummy_product.filter('[value="1"]').prop('checked', true);
    }
});   // End DOM


/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
function productCoverImg(input) {
    //console.log(ext);
    var fileInput = $('#product-img');
    var filePath = fileInput.val();
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
    if (!allowedExtensions.exec(filePath)) {
        toastr.error('Please select any of the image extension (jpg|jpeg|png|gif|webp)');
        fileInput.value = '';
        return false;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult').attr('src', e.target.result);
            $('#imageResult').attr('width', 200);
            $('#imageResult').attr('height', 200);
        };
        $('#product-autofill').val(0);
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL(input) {
    //console.log(ext);
    var fileInput = $('#product-img');
    var filePath = fileInput.val();
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
    if (!allowedExtensions.exec(filePath)) {
        toastr.error('Please select any of the image extension (jpg|jpeg|png|gif|webp)');
        fileInput.value = '';
        return false;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
            $('#imageResult').attr('width', 200);
            $('#imageResult').attr('height', 200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


$(document).on('click', '.product-status', function () {
    var _id = $(this).data('id');
    var _status = $(this).data('action');
    var title = "You want a product make a live";
    if (_status == '1') {
        title = "You want a product save as draft";
    }
    swal({
        title: "Are you sure?",
        text: title,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes"
    },
        function () {

            $.ajax({
                type: 'POST',
                url: "product/updateStatus",
                data: { 'id': _id, 'action': 'updatestatus', 'status': _status },
                dataType: 'JSON',
                success: function (data) {
                    if (data.status == 1) {
                        toastr.success(data.msg);
                        window.setTimeout(function () { window.location.reload(); }, 3000);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('Somethings went wrong, Please try again!!');
                }
            });

        });



});   //End DOM


/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('product-img');
var infoArea = document.getElementById('upload-label');
input.addEventListener('change', showFileName);
function showFileName(event) {
    var input = event.srcElement;

    console.log(input);
    var fileName = input.files[0].name;
    infoArea.textContent = 'Product Image: ' + fileName;
}

function fileValidation(el) {
    var regex = new RegExp("(.*?)\.(csv)$");
    if (!(regex.test(el.value.toLowerCase()))) {
        el.value = '';
        toastr.error('Only CSV file format allowed');
        return false;
    }
}

function extractContent(value) {
    var div = document.createElement('div')
    div.innerHTML = value;
    var text = div.textContent;
    return text;
}

function getMetaContent(html, name) {
    return html.filter(
        (index, tag) => tag && tag.name && tag.name == name).attr('content');
}
function checkImage(src) {
    var img = new Image();
    console.log(img);
    img.onload = function() {
        // Image exists and is valid
        //console.log('Image exists and is valid');
        $('#image-link').val(src);
        $('img#imageResult').attr('src', src);
        $('#product-autofill').val('1');
        $('.p-invalid').hide();
        var link = '<a href="' + src + '" target="_blank">' + src + '</a>';
        $('#invalid-image-url').html(link);
    };
    img.onerror = function() {
        // Image doesn't exist or is not valid
        //console.log('No valid');
        toastr.error("The image is not valid for security reasons. Please manually check the image.");
        $('#image-link').val('');
        $('img#imageResult').attr('src', '');
        $('#product-autofill').val('0');
        $('.p-invalid').show();
        var link = '<a href="' + src + '" target="_blank">' + src + '</a>';
        $('#invalid-image-url').html(link);
    };
    img.src = src;
}
function getFileExtension(url) {
    // Use a regular expression to extract the file extension
    var match = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
    return match ? match[1] : null;
}
function getProductLinkData() {
    var base_url = $('#base_url').val();

    var image = '';
    var title = '';
    var price = '';
    var description = '';
    var link = $('#product-link').val();

    $.ajax({
        type: 'POST',
        url: base_url + "admin/Product/getMetaData",
        data: { 'link': link },
        dataType: 'JSON',
        beforeSend: function () {
            $('#page-loading').show();
        },
        complete: function () {
            $('#page-loading').hide();

        },
        success: function (response) {
            if (response.status == 1) {

                title += response.data.title;
                description += response.data.description;
                image += response.data.image;
                if (response.data.title == '') {
                    $('#product-name').val('');

                } else {
                    $('#product-name').val(response.data.title);
                }

                if (response.data.image != '') {
                    var extension = getFileExtension(response.data.image);
                    if (extension) {
                        checkImage(response.data.image);
                    }
                    else {
                        $('#image-link').val('');
                        $('img#imageResult').attr('src', '');
                        $('#product-autofill').val('0');
                    }
                    /* $('#image-link').val(response.data.image);
                    $('img#imageResult').attr('src', response.data.image);
                    $('#product-autofill').val('1'); */
                }
                else {
                    $('#image-link').val('');
                    $('img#imageResult').attr('src', '');
                    $('#product-autofill').val('0');
                }
                if (response.data.product_price != '') {
                    $('#product-price').val(response.data.product_price);
                    $('#discount-price').val(response.data.selling_price);

                } else {
                    $('#product-price').val('');
                    $('#discount-price').val('');

                }

                if (response.data.description == '') {
                    $('#product-desc').val('');
                } else {
                    $('#product-desc').val(response.data.description);
                }


            } else {
                toastr.error(data.msg);
            }
        },
    });

    if (title == '' || description == '' || image == '') {
        var product_name = '';
        var product_image = '';
        var product_description = '';
        $.ajax({

            "crossDomain": true,
            "url": $('#product-link').val(),


        }).then(function (data) {
            response = $.parseHTML(data);
            $.each(response, function (i, el) {
                if (el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined") {

                    if ($(el).attr("name") == 'twitter:image') {
                        product_image += $(el).attr("content");
                    }

                    if ($(el).attr("name") == 'twitter:title') {
                        product_name += $(el).attr("content");
                    }

                    if ($(el).attr("property") == 'og:title') {

                        product_name += $(el).attr("content");


                    }

                    //alert(title);

                    if ($(el).attr("name") == 'twitter:description') {
                        product_description += $(el).attr("content");
                    }

                    if ($(el).attr("name") == 'twitter:data1' || $(el).attr("property") == 'og:price:amount') {
                        price += $(el).attr("content");
                    }


                }
            });

            if (product_name != '') {
                $('#product-name').val(product_name);
            } else {
                $('#product-name').val('');

            }

            if (product_description != '') {
                $('#product-desc').val(product_description);
            } else {
                $('#product-desc').val('');

            }
            if (product_image != '') {
                $('#image-link').val(product_image);
                $('img#imageResult').attr('src', product_image);
                $('#product-autofill').val('1');
            } else {
                $('#image-link').val('');
                $('img#imageResult').attr('src', '');
                $('#product-autofill').val('0');
            }
            if (price != '') {
                $('#product-price').val(price);
            } else {
                $('#product-price').val('');

            }


        });
    }


}
function getProductLinkData_old() {
    var image = '';
    var title = '';
    var price = '';

    var url = $('#product-link').val();
    $.ajax({
        url: url
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
                if ($(el).attr("name") == 'twitter:data1' || $(el).attr("property") == 'og:price:amount') {
                    price += $(el).attr("content");
                }


            }
        });
        // var title = data.match(/<title>(.*?)<\/title>/);    
        // var title = extractContent(title[0]);
        var html = $(data);
        $('#product-name').val(title);
        $('#product-price').val(price);

        $('#product-desc').html(getMetaContent(html, 'description') || 'no description found');
        if (image != '') {
            $('#image-link').val(image);
            $('img#imageResult').attr('src', image);
            $('#product-autofill').val('1');
        }

    });

}