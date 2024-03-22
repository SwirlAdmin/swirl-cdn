<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<?php header("Cache-Control: no cache"); ?>
<div id="page-loading" style="display:none;">
    <img src="<?php echo base_url() ?>assets/images/page-loading.gif">
</div>

<section class="content mb-3">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="w-100 border border-grey p-2" style="background-color: #ff6b35;border-radius: 20px;">
                    <div class="d-flex">
                        <div class="w-100">
                            <p class="m-0 text-muted h6 text-white">Last Month <br> &nbsp;</p>
                        </div>
                    </div>
                    <div class="d-flex my-2 justify-content-around">
                        <div class="text-center">
                            <p class="text-muted h6 m-0 text-white">Total views</p>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(isset($swirlsLastMonth[0]['views']) ? $swirlsLastMonth[0]['views'] : 0); ?>
                            </p>
                        </div>
                        <div class="text-center">
                            <p class="text-muted h6 m-0 text-white">Views(in mins)</p>
                            <?php if ($this->session->userdata('id')  == 23790  || $this->session->userdata('id')  == 23864) { ?>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(ceil(isset($swirlsLastMonth['cdn_playing_time']) ? $swirlsLastMonth['cdn_playing_time'] * 60 : 0)); ?>
                            </p>
                            <?php } else { ?>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(ceil(isset($swirlsLastMonth[0]['playing_time']) ? $swirlsLastMonth[0]['playing_time'] * 60 : 0)); ?>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="w-100 border border-grey p-2" style="background-color: #57C09C;border-radius: 20px;">
                    <div class="d-flex">
                        <div class="w-100">
                            <p class="m-0 text-muted h6 text-white">Current Month <br> &nbsp;</p>
                        </div>
                    </div>
                    <div class="d-flex my-2 justify-content-around">
                        <div class="text-center">
                            <p class="text-muted h6 m-0 text-white">Total views</p>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(isset($swirlsCurrentMonth[0]['views']) ? $swirlsCurrentMonth[0]['views'] : 0); ?>
                            </p>
                        </div>
                        <div class="text-center">
                            <p class="text-muted h6 m-0 text-white">Views(in mins)</p>
                            <?php if ($this->session->userdata('id')  == 23790  || $this->session->userdata('id') == 23864) { ?>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(ceil(isset($swirlsCurrentMonth['cdn_playing_time']) ? $swirlsCurrentMonth['cdn_playing_time'] * 60 : 0)); ?>
                            </p>
                            <?php } else { ?>
                            <p class="h1 m-0 font-weight-bold text-white">
                                <?php echo number_format_short(ceil(isset($swirlsCurrentMonth[0]['playing_time']) ? $swirlsCurrentMonth[0]['playing_time'] * 60 : 0)); ?>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="row">
    <div class="col-12">
        <div class="card card-info">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-list"></i> Short Video Analytics</h3>
            </div>
            <div class="card-body">
                <!-- <section class="content mb-3">
                    <div class="container-fluid">
                        <form id="chartSelectionForm" onsubmit="return fetchChart(this);">
                            <div class="row">
                                <div class="col-md-3">
                                    <select name="videoUrl" class="form-control select2" onchange="$(this).closest('form').submit();">
                                        <option disabled>Select video</option>
                                        <//?php foreach ($swirls as $swirl) { ?>
                                            <option value="<//?php echo $swirl['server_url'] ?>"><//?php echo $swirl['title'] ?></option>
                                        <//?php } ?>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select name="rangeFilter" class="form-control select2" onchange="$(this).closest('form').submit();">
                                        <option selected disabled>Select filter</option>
                                        <option data-val="daily" value="<//?php echo date('Y-m-d') . ';' . date('Y-m-d') . ';daily'; ?>">Today</option>
                                        <option data-val="daily" value="<//?php echo date('Y-m-d', strtotime('-1 day')) . ';' . date('Y-m-d', strtotime('-1 day')) . ';daily'; ?>">Yesterday</option>
                                        <option data-val="daily" value="<//?php echo date('Y-m-d', strtotime('-7 day')) . ';' . date('Y-m-d', strtotime('-1 day')) . ';daily'; ?>" selected>Last 7 Days</option>
                                        <option data-val="daily" value="<//?php echo date('Y-m-d', strtotime('-30 day')) . ';' . date('Y-m-d', strtotime('-1 day')) . ';daily'; ?>">Last 30 Days</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <div class="bg-white border border-grey rounded shadow-sm p-2">
                                    <p class="m-0 h5 ml-2">Total views vs. Unique views</p>

                                    <div class="p-2 bar-chart-outer-tuv">
                                        <div id="SVBarChartTUV" style="width: 100%; height: 250px;"></div>
                                        <script>
                                            google.charts.load("current", {
                                                packages: ['corechart']
                                            });
                                            google.charts.setOnLoadCallback(drawChartSVBarTUV);

                                            function drawChartSVBarTUV(chartData, noData) {
                                                
                                                var data = google.visualization.arrayToDataTable(chartData);

                                                var options = {
                                                    title: "",
                                                    bar: {
                                                        groupWidth: "50"
                                                    },
                                                    legend: {
                                                        position: "none"
                                                    },
                                                    vAxis: {
                                                        title: 'Video views',
                                                        titleTextStyle: {
                                                            fontSize: 15,
                                                            italic: false
                                                        },
                                                        gridlines: {
                                                            color: '#c7c7c7'
                                                        },
                                                        ticks: noData ? [1, 2, 3] : 'auto'
                                                    },
                                                    hAxis: {
                                                        title: 'Total vs Unique',
                                                        titleTextStyle: {
                                                            fontSize: 15,
                                                            italic: false
                                                        },
                                                    },
                                                    chartArea: {
                                                        // leave room for y-axis labels
                                                        width: '75%'
                                                    }
                                                };
                                                var chart = new google.visualization.ColumnChart(document.getElementById("SVBarChartTUV"));
                                                chart.draw(data, options);
                                            }
                                        </script>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div class="bg-white border border-grey rounded shadow-sm p-2">
                                    <p class="m-0 h5 ml-2">Users Dropout</p>

                                    <div class="p-2 bar-chart-outer-du">
                                        <div id="SVBarChartDU" style="width: 100%; height: 250px;"></div>
                                        <script>
                                            google.charts.load("current", {
                                                packages: ['corechart']
                                            });
                                            google.charts.setOnLoadCallback(drawChartSVBarDU);

                                            function drawChartSVBarDU(chartData, noData) {
                                            
                                                var data = google.visualization.arrayToDataTable(chartData);

                                                var options = {
                                                    title: "",
                                                    bar: {
                                                        groupWidth: "30",
                                                        color: '#008FFB'
                                                    },
                                                    legend: {
                                                        position: "none"
                                                    },
                                                    vAxis: {
                                                        title: 'No. of users',
                                                        titleTextStyle: {
                                                            fontSize: 15,
                                                            italic: false
                                                        },
                                                        gridlines: {
                                                            color: '#c7c7c7'
                                                        },
                                                        ticks: noData ? [1, 2, 3] : 'auto'
                                                    },
                                                    hAxis: {
                                                        title: 'Time interval',
                                                        titleTextStyle: {
                                                            fontSize: 15,
                                                            italic: false
                                                        },
                                                        textStyle: {
                                                            fontSize: 12,
                                                        },
                                                    },
                                                    chartArea: {
                                                        // leave room for y-axis labels
                                                        width: '85%'
                                                    }
                                                };
                                                var chart = new google.visualization.ColumnChart(document.getElementById("SVBarChartDU"));
                                                chart.draw(data, options);
                                            }
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> -->

                <!-- Last month/current month cards -->
                <!--  <section class="content mb-3">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="w-100 border border-grey p-2" style="background-color: #ff6b35;border-radius: 20px;">
                                    <div class="d-flex">
                                        <div class="w-100">
                                            <p class="m-0 text-muted h6 text-white">Last Month <br> &nbsp;</p>
                                        </div>
                                    </div>
                                    <div class="d-flex my-2 justify-content-around">
                                        <div class="text-center">
                                            <p class="text-muted h6 m-0 text-white">Total views</p>
                                            <p class="h1 m-0 font-weight-bold text-white"><?php echo number_format_short(isset($swirlsLastMonth[0]['views']) ? $swirlsLastMonth[0]['views'] : 0); ?></p>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-muted h6 m-0 text-white">Views(in mins)</p>
                                            <p class="h1 m-0 font-weight-bold text-white"><?php echo number_format_short(ceil(isset($swirlsLastMonth[0]['playing_time']) ? $swirlsLastMonth[0]['playing_time'] * 60 : 0)); ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="w-100 border border-grey p-2"  style="background-color: #57C09C;border-radius: 20px;">
                                    <div class="d-flex">
                                        <div class="w-100">
                                            <p class="m-0 text-muted h6 text-white">Current Month <br> &nbsp;</p>
                                        </div>
                                    </div>
                                    <div class="d-flex my-2 justify-content-around">
                                        <div class="text-center">
                                            <p class="text-muted h6 m-0 text-white">Total views</p>
                                            <p class="h1 m-0 font-weight-bold text-white"><?php echo number_format_short(isset($swirlsCurrentMonth[0]['views']) ? $swirlsCurrentMonth[0]['views'] : 0); ?></p>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-muted h6 m-0 text-white">Views(in mins)</p>
                                            <p class="h1 m-0 font-weight-bold text-white"><?php echo number_format_short(ceil(isset($swirlsCurrentMonth[0]['playing_time']) ? $swirlsCurrentMonth[0]['playing_time'] * 60 : 0)); ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> -->
                <!-- /. Last month/current month cards -->

                <!-- Monthly compare graph -->
                <section class="content mb-3" id="monthly-compare-graph">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- Div that will hold the comparison chart -->
                            <div class="col-4">
                                <div class="h-100 w-100 card p-3">
                                    <select class="metrics-select form-control w-50 mb-auto" name="metrics_select">
                                        <option value="1">Views</option>
                                        <option value="2">Unique Views</option>
                                        <option value="3">Playing Time</option>
                                    </select>
                                    <div id="metrics_chart_div"></div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div id="leads_chart_div" class="card p-3 h-100 w-100"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- /. Monthly compare graph -->

                <!-- Short Video Table content -->
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-light">
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <div class="col-md-3 ml-auto p-0">
                                                <div class="input-group">
                                                    <input type="text" id="SAdateRange" name="shortvideoreportrange"
                                                        value="" class="form-control">
                                                    <div class="input-group-append">
                                                        <label for="SAdateRange">
                                                            <div class="input-group-text">
                                                                <i class="fa fa-calendar"></i>&nbsp;
                                                                <span></span> <i class="fa fa-caret-down"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="table table-striped table-bordered" id="getSAList"
                                                style="width:100%">
                                                <thead>
                                                    <tr style="background: #ECE9FD;" class="text-center">
                                                        <th class="align-middle">S.no.</th>
                                                        <th>Video Upload Date</th>
                                                        <th class="align-middle">Video Title</th>
                                                        <th class="align-middle">Views</th>
                                                        <th>Unique Views</th>
                                                        <th>Watch Time (mins)</th>
                                                        <th>Add-to-Cart</th>
                                                        <th>Buy-Now </th>
                                                        <th>Ask Question
                                                            <!-- <a href="<?php //echo base_url(); 
                                                                            ?>admin/dashboard/viewAllAskQuestion" target="_blank" class="routeView badge badge-primary d-flex mx-auto" style="width:fit-content" onclick="viewAllAskQuestion()">View All</a> -->
                                                            <a href="<?php echo base_url(); ?>admin/dashboard/viewAllAskQuestion"
                                                                target="_blank" class="routeView"
                                                                onclick="viewAllAskQuestion()"><svg
                                                                    style="height:15px; margin-left:5px"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.5858 5H13V3H21V11H19V6.41421L12 13.4142L10.5858 12L17.5858 5Z"
                                                                        fill="#007bff"></path>
                                                                </svg></a>
                                                        </th>
                                                        <th>Attached Products</th>
                                                        <th class="align-middle">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colspan="3" style="text-align:right">Total:</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.card -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container-fluid -->
                </section>
                <!-- /.Short Video Table content -->

                <!-- Ask questions Modal -->
                <div class="modal fade" id="askQuestModal">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header" style="background: #ECE9FD;">
                                <h5 class="modal-title">Ask Questions</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="askQuestion">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /. Ask questions Modal -->

                <!-- Product worths -->
                <?php if ($this->session->userdata('user_role_id') == 9  && $this->session->userdata('is_super') == 1) { ?>
                <section class="content mt-3">
                    <div class="col-12 mt-3">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="h5">Product Worth</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row" style="padding: 0 7.5px;">
                                            <div class="col-md-3 mr-auto p-0 form-group">
                                                <p class="d-inline-block">Show Table for: </p>
                                                <div class="d-inline-block ml-3">
                                                    <select class="form-control" name="product_worth_table"
                                                        id="product-worth-table">
                                                        <option value="0">Buy Now</option>
                                                        <option value="1">Add to cart</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3 ml-auto p-0">
                                                <div class="input-group">
                                                    <input type="text" id="pw-report-range" name="pw_reportrange"
                                                        value="" class="form-control">
                                                    <input type="hidden" name="id"
                                                        value="<?php echo $this->session->userdata('id') ?>">
                                                    <div class="input-group-append">
                                                        <label for="pw-report-range">
                                                            <div class="input-group-text">
                                                                <i class="fa fa-calendar"></i>&nbsp;
                                                                <span></span> <i class="fa fa-caret-down"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="buynow-div">
                                            <table class="table table-striped table-bordered" id="get-buynow-table"
                                                style="width:100%">
                                                <thead>
                                                    <tr style="background: #ECE9FD;">
                                                        <th>S.no.</th>
                                                        <th>Date</th>
                                                        <!-- <th>Video ID</th> -->
                                                        <th>Video Title</th>
                                                        <!-- <th>Product ID</th> -->
                                                        <th>Product Title</th>
                                                        <!-- <th>Product Price [<//?php echo $this->session->userdata('curr') ?>]</th> -->
                                                        <th>Product Sell Price
                                                            [<?php echo $this->session->userdata('curr') ?>]</th>
                                                        <th>Buy Now Counts</th>
                                                        <!-- <th>Buynow Price [<//?php echo $this->session->userdata('curr') ?>]</th> -->
                                                        <th>Buynow Sell Price
                                                            [<?php echo $this->session->userdata('curr') ?>]</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colspan="4">Total:</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div id="addCart-div" style="display: none;">
                                            <table class="table table-striped table-bordered" id="get-addToCart-table"
                                                style="width:100%;">
                                                <thead>
                                                    <tr style="background: #ECE9FD;">
                                                        <th>S.no.</th>
                                                        <th>Date</th>
                                                        <th>Video Title</th>
                                                        <th>Product Title</th>
                                                        <!-- <th>Product Price [<//?php echo $this->session->userdata('curr') ?>]</th> -->
                                                        <th>Product Sell Price
                                                            [<?php echo $this->session->userdata('curr') ?>]</th>
                                                        <th>AddToCart Counts</th>
                                                        <!-- <th>AddToCart price</th> -->
                                                        <th>AddToCart Sell Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colspan="4">Total:</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <?php } ?>
                <!-- /. Product worths -->
            </div>
        </div>
    </div>
</div>

<script>
// ajax to fetch data total views and unique views
function fetchChart(form) {
    var formData = $(form).serializeArray();
    $.ajax({
        url: '<?php echo base_url(); ?>admin/dashboard/fetchSVChartDataPage',
        type: 'POST',
        data: formData,
        dataType: 'json',
        beforeSend: function() {
            $('#page-loading').show();
        },
        success: function(data) {

            //  Dropout data
            var uddata = [
                ['Element', 'Users', {
                    role: 'style'
                }]
            ];
            let noData = true;
            if (data['dropData']['completion_percent_by_views'].length) {
                //  ddata = [];
                data['dropData']['completion_percent_by_views'].reverse().forEach(element => {
                    uddata.push([element.rowid + '%', element.views, '#008FFB']);
                    if (element.views) {
                        noData = false;
                    }
                });
            } else {
                uddata.push(['No Data', 1, '#008FFB']);
            }
            //  console.log(uddata);
            $('#SVBarChartDU').remove();
            $('.bar-chart-outer-du').prepend(
                '<div id="SVBarChartDU" style="width: 100%; height: 400px;"></div>');
            drawChartSVBarDU(uddata, noData);


            //  Total vs Unique views
            var vdata = [
                ['Element', 'Views', {
                    role: 'style'
                }],
                // ['Total Views', data['totalViews']['views']['data'].length ? data['totalViews']['views']['data'][0]['value'] : 0, '#FEB019'],
                ['Total Views', data['totalViews'] ? data['totalViews'] : 0, '#FEB019'],
                // ['Unique Views', data['uniqueViews']['unique_views']['data'].length ? data['uniqueViews']['unique_views']['data'][0]['value'] : 0, '#008FFB']
                ['Unique Views', data['uniqueViews'] ? data['uniqueViews'] : 0, '#008FFB']
            ];
            // let noData1 = data['totalViews']['views']['data'].length && data['totalViews']['views']['data'][0]['value'] && data['uniqueViews']['unique_views']['data'].length && data['uniqueViews']['unique_views']['data'][0]['value'] ? false : true;
            let noData1 = data['totalViews'] && data['uniqueViews'] ? false : true;
            // alert(noData1);
            //  console.log(vdata);
            $('#SVBarChartTUV').remove();
            $('.bar-chart-outer-tuv').prepend(
                '<div id="SVBarChartTUV" style="width: 100%; height: 300px;"></div>');
            drawChartSVBarTUV(vdata, noData1);

        },
        error: function(request, error) {
            //  alert("Something went wrong!");
            //  location.reload();
        },
        complete: function() {
            $('#page-loading').hide();
        }
    });

    return false;
}

$(document).ready(function() {

    $('#chartSelectionForm').submit();

    getSATable(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format(
        'YYYY-MM-DD'));

    $('#SAdateRange').daterangepicker({ // Date range selection options
        startDate: moment().subtract(7, 'days'),
        endDate: moment().subtract(1, 'days'),
        maxDate: moment().subtract(1, 'days'),
        locale: {
            format: 'DD/MM/YYYY'
        },
        ranges: {
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
        }
    });

    $('#SAdateRange').on('apply.daterangepicker', function(ev, picker) { //Applying date range
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format(
            'DD/MM/YYYY'));
        getSATable(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
        $(".routeView").attr("href", "<?php echo base_url(); ?>admin/dashboard/viewAllAskQuestion");
    });

    $.ajax({ //Fetching monthly leads data for comparison graph
        type: "GET",
        url: base_url + "admin/Dashboard/monthlyDataComparison",
        dataType: "JSON",
        success: function(data) {
            if (data.status === true) {
                $("#monthly-compare-graph").show();
                google.charts.load('current', {
                    'packages': ['bar']
                });
                google.charts.setOnLoadCallback(function() {
                    drawLeadsChart(data.resp);
                });

                google.charts.setOnLoadCallback(function() {
                    drawMonthlyViews(data.resp);
                });
            } else if (data.status === false) {
                $("#monthly-compare-graph").hide();
            } else {
                toastr.error(data.msg);
            }
        },
    });

    //Monthly metrics comparison graph based on views,uniqueViews,playingtime selection
    $('.metrics-select').on('change', function() {
        let metricsSelect = $(this).val();
        switch (true) {
            case (metricsSelect == 1):
                $.ajax({ //Fetching monthly leads data for comparison graph
                    type: "GET",
                    url: base_url + "admin/Dashboard/monthlyDataComparison",
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status == true) {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyViews(data.resp);
                            });
                        } else {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyViews(data.resp);
                            });
                        }
                    },
                });
                break;
            case (metricsSelect == 2):
                $.ajax({ //Fetching monthly leads data for comparison graph
                    type: "GET",
                    url: base_url + "admin/Dashboard/monthlyDataComparison",
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status == true) {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyUniqueViews(data.resp);
                            });
                        } else {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyUniqueViews(data.resp);
                            });
                        }
                    },
                });
                break;
            case (metricsSelect == 3):
                $.ajax({ //Fetching monthly leads data for comparison graph
                    type: "GET",
                    url: base_url + "admin/Dashboard/monthlyDataComparison",
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status == true) {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyPlayingTime(data.resp);
                            });
                        } else {
                            google.charts.load('current', {
                                'packages': ['bar']
                            });
                            google.charts.setOnLoadCallback(function() {
                                drawMonthlyPlayingTime(data.resp);
                            });
                        }
                    },
                });
                break;
            default:
                console.log("Something went wrong...");
        }
    });

});

function updateDropout(selectedDate) {
    let formData = $('#chartSelectionForm').serialize();

    $.ajax({
        url: '<?php echo base_url(); ?>admin/dashboard/fetchSVChartDropout',
        type: 'POST',
        data: formData,
        dataType: 'json',
        beforeSend: function() {
            $('#page-loading').show();
        },
        success: function(data) {
            // console.log(data['totalViews']['views']['data']);
            // console.log(data['uniqueViews']['unique_views']['data']);
            // console.log(data['dropData']['completion_percent_by_views']);

            //  Dropout data
            var uddata = [
                ['Element', 'Users', {
                    role: 'style'
                }]
            ];
            let noData = true;
            if (data['dropData']['completion_percent_by_views'].length) {
                //  ddata = [];
                data['dropData']['completion_percent_by_views'].reverse().forEach(element => {
                    uddata.push([element.rowid + '%', element.views, '#008FFB']);
                    if (element.views) {
                        noData = false;
                    }
                });
            } else {
                uddata.push(['No Data', 1, '#008FFB']);
            }
            //  console.log(uddata);
            $('#SVBarChartDU').remove();
            $('.bar-chart-outer-du').prepend(
                '<div id="SVBarChartDU" style="width: 100%; height: 300px;"></div>');
            drawChartSVBarDU(uddata, noData);

        },
        error: function(request, error) {
            //  alert("Something went wrong!");
            //  location.reload();
        },
        complete: function() {
            $('#page-loading').hide();
        }
    });
}

function getSATable(start_date = '', end_date = '') {
    var dataTable = $('#getSAList').DataTable({
        destroy: true,
        searching: true,
        ordering: false,
        dom: 'Bftlip',
        buttons: [{
                extend: "excel",
                title: 'Short Video Analytics Report',
                className: "btn btn-primary",
                titleAttr: 'Export in Excel',
                text: 'Excel',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }, {
                extend: "copy",
                className: "btn btn-primary",
                titleAttr: 'Copy to clipboard',
                text: 'Copy',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            },
            {
                extend: "csv",
                title: 'Short Video Analytics Report',
                className: "btn btn-primary",
                titleAttr: 'Export in CSV',
                text: 'CSV',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }
        ],
        "lengthChange": false,
        "pageLength": 10,
        "responsive": true,
        'ajax': {
            url: base_url + 'admin/dashboard/shortVideoAnalyticsList',
            type: "POST",
            data: {
                start_date: start_date,
                end_date: end_date
            }
        },
        'language': {
            'search': '',
            'paginate': {
                'previous': 'Previous',
                'next': 'Next'
            },
            searchPlaceholder: "Search",
        },
        'columns': [{
                "title": "S.No.",
                data: null,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                data: 'created_date',
            },
            {
                data: 'video_title'
            },
            {
                data: 'total_views'
            },
            {
                data: 'total_unique_views'
            },
            <?php if ($this->session->userdata('id')  == 23790  || $this->session->userdata('id') == 23864) { ?> {
                data: 'cdn_playing_time',
            },
            <?php } else { ?> {
                data: 'playing_time',
            },
            <?php } ?> {
                data: 'total_addtocart'
            },
            {
                data: 'total_buynow'
            },
            {
                data: null,
                render: function(data, type, row) {
                    if (data.total_askquestion > 0) {
                        return `<a href="javascript:void(0)" class="badge badge-pill badge-primary" onclick="getAskQuestion(${data.video_id})">${data.total_askquestion}</a>`
                    } else {
                        return data.total_askquestion;
                    }
                }
            },
            {
                data: 'product_id',
            },
            {
                "title": "Status",
                data: null,
                render: function(data, type, row) {
                    if (data.status == 1) {
                        return '<td class="text-center"> <span class="badge badge-sm badge-success">Active</span> </td>'
                    } else {
                        return '<td class="text-center"> <span class="badge badge-sm badge-danger">Deleted</span> </td>'
                    }
                }
            },
        ],
        "columnDefs": [{
            "targets": [0, 3, 4, 5, 6, 7, 8, 9],
            "className": "text-center"
        }],
        footerCallback: function(row, data, start, end, display) {

            var api = this.api(),
                data;

            //Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ? i * 1 : typeof i === 'number' ? i : 0;
            };

            // Total over all pages


            var total_askquestion = 0; //Total for ask_question
            for (var i = 0; i < data.length; i++) {
                total_askquestion += data[i].total_askquestion;
            }

            var total_views = api.column(3, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_unique_views = api.column(4, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_view_time = api.column(5, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_addtocart = api.column(6, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_buynow = api.column(7, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_product = api.column(9, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            // Update footer
            $(api.column(0).footer()).html('Total');
            $(api.column(3).footer()).html(total_views);
            $(api.column(4).footer()).html(total_unique_views);
            $(api.column(5).footer()).html(total_view_time);
            $(api.column(6).footer()).html(total_addtocart);
            $(api.column(7).footer()).html(total_buynow);
            $(api.column(8).footer()).html(total_askquestion);
            $(api.column(9).footer()).html(total_product);

        },
    });
}

function getSATable_old(start_date = '', end_date = '') {
    var dataTable = $('#getSAList').DataTable({
        destroy: true,
        searching: true,
        ordering: false,
        dom: 'Bftlip',
        buttons: [{
                extend: "excel",
                className: "btn btn-primary",
                titleAttr: 'Export in Excel',
                text: 'Excel',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }, {
                extend: "copy",
                className: "btn btn-primary",
                titleAttr: 'Copy to clipboard',
                text: 'Copy',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            },
            {
                extend: "csv",
                className: "btn btn-primary",
                titleAttr: 'Export in CSV',
                text: 'CSV',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }
        ],
        "lengthChange": false,
        "responsive": true,
        'ajax': {
            url: base_url + 'admin/dashboard/shortVideoAnalyticsList',
            type: "POST",
            data: {
                start_date: start_date,
                end_date: end_date
            }
        },
        'language': {
            'search': 'Search',
            'paginate': {
                'previous': 'Previous',
                'next': 'Next'
            },
            searchPlaceholder: "Search",
        },
        'columns': [{
                "title": "S.No.",
                data: null,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                data: 'created_date',
            },
            {
                data: 'video_title'
            },
            {
                data: 'total_views'
            },
            {
                data: 'total_unique_views'
            },
            {
                data: 'playing_time',
            },
            {
                data: 'total_addtocart'
            },
            {
                data: 'total_buynow'
            },
            {
                "title": "Ask Question",
                data: null,
                render: function(data, type, row) {
                    if (data.total_askquestion > 0) {
                        return `<a href="javascript:void(0)" class="badge badge-pill badge-primary" onclick="getAskQuestion(${data.video_id})">${data.total_askquestion}</a>`
                    } else {
                        return data.total_askquestion;
                    }
                }
            },
            {
                data: 'product_id',
            },
            {
                "title": "Status",
                data: null,
                render: function(data, type, row) {
                    if (data.status == 1) {
                        return '<td class="text-center"> <span class="badge badge-sm badge-success">Active</span> </td>'
                    } else {
                        return '<td class="text-center"> <span class="badge badge-sm badge-danger">Deleted</span> </td>'
                    }
                }
            },
        ],
        "columnDefs": [{
            "targets": [0, 3, 4, 5, 6, 7, 8, 9],
            "className": "text-center"
        }],
        footerCallback: function(row, data, start, end, display) {

            var api = this.api(),
                data;

            //Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ? i * 1 : typeof i === 'number' ? i : 0;
            };

            // Total over this page
            var total_views = api.column(3, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_unique_views = api.column(4, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_view_time = api.column(5, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_addtocart = api.column(6, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_buynow = api.column(7, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_askquestion = api.column(8, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var total_product = api.column(9, {
                page: 'current'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            // Update footer
            $(api.column(0).footer()).html('Total');
            $(api.column(3).footer()).html(total_views);
            $(api.column(4).footer()).html(total_unique_views);
            $(api.column(5).footer()).html(total_view_time);
            $(api.column(6).footer()).html(total_addtocart);
            $(api.column(7).footer()).html(total_buynow);
            $(api.column(8).footer()).html(total_askquestion);
            $(api.column(9).footer()).html(total_product);

        },
    });
}

function getAskQuestion(params) { //Ask Questions List
    let video_id = params;
    let sDate = $('#SAdateRange').data('daterangepicker').startDate.format('YYYY-MM-DD');
    let eDate = $('#SAdateRange').data('daterangepicker').endDate.format('YYYY-MM-DD');

    $('#askQuestModal').modal('toggle');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "<?php echo base_url(); ?>admin/Dashboard/getAskQuestion",
        data: {
            id: video_id,
            startDate: sDate,
            endDate: eDate
        },
        success: function(response) {
            $('.askQuestion').empty();
            var s_no = 1;
            response.forEach(resp => {
                $('.askQuestion').append(`                    
                        <tr>
                            <td>${s_no++})</td>
                            <td>${resp.created_date}</td>
                            <td>${resp.name}</td>
                            <td>${resp.mobile}</td>
                            <td>${resp.message}</td>
                        </tr>
                    `);
            });
            $('#askQuestModal').modal('toggle');
        },
    });
}


function drawLeadsChart(chart_data) {
    let jsonData = chart_data;
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Add to cart', 'Buy Now', 'Ask Questions'],
        ['Current Month', jsonData.swirlsCurrentMonth.current_addtocart, jsonData.swirlsCurrentMonth
            .current_buy_now, jsonData.swirlsCurrentMonth.current_ask_question
        ],
        ['Last Month', jsonData.swirlsLastMonth.lastmonth_addtocart, jsonData.swirlsLastMonth.lastmonth_buy_now,
            jsonData.swirlsLastMonth.lastmonth_askquestion
        ],
    ]);

    var options = {
        chart: {
            title: 'Leads',
        },
        bars: 'vertical',
        bar: {
            groupWidth: "30%"
        },
        vAxis: {
            format: 'decimal',
        },
        height: 500,
    };

    var chart = new google.charts.Bar(document.getElementById('leads_chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawMonthlyViews(chart_data) {
    let jsonData = chart_data;
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Views'],
        ['Current Month', jsonData.swirlsCurrentMonth[0].views],
        ['Last Month', jsonData.swirlsLastMonth[0].views],
    ]);

    var options = {
        legend: {
            position: 'none'
        },
        bars: 'vertical',
        vAxis: {
            title: 'Views',
            format: 'decimal',
        },
        height: 400,
        bar: {
            groupWidth: "30%"
        }, // width of bars here
        colors: ['#f4b400', '#4285f4']
    };

    var chart = new google.charts.Bar(document.getElementById('metrics_chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawMonthlyUniqueViews(chart_data) {
    let jsonData = chart_data;
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Unique Views'],
        ['Current Month', jsonData.swirlsCurrentMonth[0].unique_views],
        ['Last Month', jsonData.swirlsLastMonth[0].unique_views],
    ]);

    var options = {
        legend: {
            position: 'none'
        },
        bars: 'vertical',
        vAxis: {
            title: 'Views',
            format: 'decimal',
        },
        height: 400,
        bar: {
            groupWidth: "30%"
        },
        colors: ['#f4b400', '#4285f4']
    };

    var chart = new google.charts.Bar(document.getElementById('metrics_chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawMonthlyPlayingTime(chart_data) {
    let jsonData = chart_data;
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Playing Time'],

        <?php if ($this->session->userdata('id')  == 23790 || $this->session->userdata('id') == 23864) { ?>[
            'Current Month', Math.ceil((jsonData.swirlsCurrentMonth.cdn_playing_time) * 60)],
        ['Last Month', Math.ceil((jsonData.swirlsLastMonth.cdn_playing_time) * 60)],
        <?php } else { ?>['Current Month', Math.ceil((jsonData.swirlsCurrentMonth[0].playing_time) * 60)],
        ['Last Month', Math.ceil((jsonData.swirlsLastMonth[0].playing_time) * 60)],
        <?php } ?>
    ]);

    var options = {
        legend: {
            position: 'none'
        },
        bars: 'vertical',
        vAxis: {
            title: 'Time (in mins)',
            format: 'decimal',
        },
        height: 400,
        bar: {
            groupWidth: "30%"
        },
        colors: ['#f4b400', '#4285f4'],
    };

    var chart = new google.charts.Bar(document.getElementById('metrics_chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function viewAllAskQuestion() {

    let startdate = $('#SAdateRange').data('daterangepicker').startDate.format('YYYY-MM-DD');
    let enddate = $('#SAdateRange').data('daterangepicker').endDate.format('YYYY-MM-DD');
    let sDate = `"${startdate}"`;
    let eDate = `"${enddate}"`;
    var link = $('.routeView');
    var url = link.attr('href');
    // Check if the query parameter already exists
    if (url.indexOf('?') === -1) {
        // Append the query parameter to the URL
        url += `?startDate=${sDate}&endDate=${eDate}`;
    }
    // Update the href attribute with the modified URL
    link.attr('href', url);
}
</script>

<!-- Script for product worths -->
<script>
$(document).ready(function() {

    $("#product-worth-table").on("change", function() {
        if ($(this).val() == 0) {
            $("#buynow-div").show();
            $("#addCart-div").hide();
        } else {
            $("#buynow-div").hide();
            $("#addCart-div").show();
        }
    });

    getBuyNowTable(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    getAddToCartTable(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    $('#pw-report-range').daterangepicker({ // Date range selection options
        startDate: moment().subtract(7, 'days'),
        endDate: moment(),
        maxDate: moment(),
        locale: {
            format: 'DD/MM/YYYY'
        },
        ranges: {
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(7, 'days'), moment()],
            'Last 30 Days': [moment().subtract(30, 'days'), moment()],
        }
    });

    $('#pw-report-range').on('apply.daterangepicker', function(ev, picker) { //Applying date range
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format(
            'DD/MM/YYYY'));
        getBuyNowTable(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
        getAddToCartTable(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
    });
});

function getBuyNowTable(start_date = '', end_date = '') {
    var dataTable = $('#get-buynow-table').DataTable({
        destroy: true,
        searching: true,
        ordering: false,
        dom: 'Bftlip',
        buttons: [{
                extend: "excel",
                title: 'Short Video Buy Now Report',
                className: "btn btn-primary",
                titleAttr: 'Export in Excel',
                text: 'Excel',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }, {
                extend: "copy",
                className: "btn btn-primary",
                titleAttr: 'Copy to clipboard',
                text: 'Copy',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            },
            {
                extend: "csv",
                title: 'Short Video Buy Now Report',
                className: "btn btn-primary",
                titleAttr: 'Export in CSV',
                text: 'CSV',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }
        ],
        "lengthChange": false,
        "pageLength": 10,
        "responsive": true,
        'ajax': {
            url: base_url + 'admin/dashboard/getBuyNowProductWorth',
            type: "POST",
            data: {
                start_date: start_date,
                end_date: end_date
            },
        },
        'columns': [{
                "title": "S.No.",
                data: null,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                data: 'created_time',
            },
            {
                data: 'video_title'
            },
            {
                data: 'product_title'
            },
            // {
            //     data: 'product_price'
            // },
            {
                data: 'product_sell_price'
            },
            {
                data: 'buynow_count'
            },
            // {
            //     data: 'buynow_product_price'
            // },
            {
                data: 'buynow_product_sell_price'
            },
        ],
        "columnDefs": [{
            "targets": [4, 5, 6],
            "className": "text-center"
        }],
        footerCallback: function(row, data, start, end, display) {

            var api = this.api(),
                data;

            //Remove the formatting to get integer data for summation
            // var intVal = function(i) {
            //     return typeof i === 'string' ? i * 1 : typeof i === 'number' ? i : 0;
            // };
            var intVal = function(i) {
                return typeof i === 'string' && i !== "-" ? parseFloat(i) : typeof i === 'number' ? i :
                    0;
            };

            // Total over all pages
            // var product_price = api.column(4, {page: 'all'}).data().reduce(function(a, b) {return intVal(a) + intVal(b);}, 0);
            var discount_price = api.column(4, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var buy_counts = api.column(5, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            // var buynow_price = api.column(7, {page: 'all'}).data().reduce(function(a, b) {return intVal(a) + intVal(b);}, 0);
            var buynow_discount = api.column(6, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            // Update footer
            $(api.column(0).footer()).html('Total');
            // $(api.column(4).footer()).html(product_price);
            $(api.column(4).footer()).html(discount_price);
            $(api.column(5).footer()).html(buy_counts);
            // $(api.column(7).footer()).html(buynow_price);
            $(api.column(6).footer()).html(buynow_discount);
        },
    });
}

function getAddToCartTable(start_date = '', end_date = '') {
    var dataTable = $('#get-addToCart-table').DataTable({
        destroy: true,
        searching: true,
        ordering: false,
        dom: 'Bftlip',
        buttons: [{
                extend: "excel",
                title: 'Short Video Add to cart Report',
                className: "btn btn-primary",
                titleAttr: 'Export in Excel',
                text: 'Excel',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }, {
                extend: "copy",
                className: "btn btn-primary",
                titleAttr: 'Copy to clipboard',
                text: 'Copy',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            },
            {
                extend: "csv",
                title: 'Short Video Add to cart Report',
                className: "btn btn-primary",
                titleAttr: 'Export in CSV',
                text: 'CSV',
                init: function(api, node, config) {
                    $(node).removeClass('dt-button btn-default buttons-excel buttons-html5')
                }
            }
        ],
        "lengthChange": false,
        "pageLength": 10,
        "responsive": true,
        'ajax': {
            url: base_url + 'admin/dashboard/getAddToCartProductWorth',
            type: "POST",
            data: {
                start_date: start_date,
                end_date: end_date
            },
        },
        'columns': [{
                "title": "S.No.",
                data: null,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                data: 'created_time',
            },
            {
                data: 'video_title'
            },
            {
                data: 'product_title'
            },
            // {
            //     data: 'product_price'
            // },
            {
                data: 'product_sell_price'
            },
            {
                data: 'addCart_count'
            },
            // {
            //     data: 'addCart_product_price'
            // },
            {
                data: 'addCart_product_sell_price'
            },
        ],
        "columnDefs": [{
            "targets": [4, 5, 6],
            "className": "text-center"
        }],
        footerCallback: function(row, data, start, end, display) {

            var api = this.api(),
                data;

            //Remove the formatting to get integer data for summation
            // var intVal = function(i) {
            //     return typeof i === 'string' ? i * 1 : typeof i === 'number' ? i : 0;
            // };
            var intVal = function(i) {
                return typeof i === 'string' && i !== "-" ? parseFloat(i) : typeof i === 'number' ? i :
                    0;
            };

            // Total over all pages
            // var product_price = api.column(4, {page: 'all'}).data().reduce(function(a, b) {return intVal(a) + intVal(b);}, 0);
            var discount_price = api.column(4, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            var addCart_counts = api.column(5, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            // var addCart_price = api.column(7, {page: 'all'}).data().reduce(function(a, b) {return intVal(a) + intVal(b);}, 0);
            var addCart_discount = api.column(6, {
                page: 'all'
            }).data().reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            // Update footer
            $(api.column(0).footer()).html('Total');
            // $(api.column(4).footer()).html(product_price);
            $(api.column(4).footer()).html(discount_price);
            $(api.column(5).footer()).html(addCart_counts);
            // $(api.column(7).footer()).html(addCart_price);
            $(api.column(6).footer()).html(addCart_discount);
        },
    });
}
</script>
<!-- /. Script for product worths -->