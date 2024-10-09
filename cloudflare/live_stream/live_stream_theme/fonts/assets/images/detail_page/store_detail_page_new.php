<!doctype html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- <link rel="icon" type="image/png" href="<?php echo base_url(); ?>assets/live/logo_fv.png"> -->
		<link rel="icon" type="image/png" href="<?php echo $brand_details['data']['user_profile']; ?>">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/storedetails_style.css">
		<script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=602254a51e16b800121b00a9&product=inline-share-buttons' async='async'></script>
		<title><?php echo $brand_details['data']['designer_brand_name']; ?> virtual store</title>
		<meta property="og:url" content="" />
		<meta property="og:type" content="" />
		<meta property="og:title" content="" />
		<meta property="og:description" content="" />
		<meta property="og:image" content="<?php echo $brand_details['data']['user_profile']; ?>" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/build/css/intlTelInput.css" />
		<link rel="stylesheet" type="text/css" href="https://store.goswirl.live/swirl-embed/short-videos-carousel/v2/swiper-bundle.min.css">
		<link rel="stylesheet" type="text/css" href="https://store.goswirl.live/swirl-embed/short-videos-carousel/v2/short-videos.css">


		<style type="text/css">
		.SSV-video-timer-top{
			padding: 1px 5px;
		}
		.SSV-video-timer-top p {
			height: unset;
			line-height: unset;
		}
		.tab-content{
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
		}
		.tab-content hr {
		    background-color: #cac8c8;
		    border: none;
		    display: block;
		    height: 2px;
		    overflow: visible;
		    position: relative;
		    width: 100%;
		}

		.tab-content hr:before {
		    background-color: #6251c4;
		    content: '';
		    display: block;
		    height: 2px;
		    left: 0;
		    position: absolute;
		    top: 0px;
		    width: 15%;
		    z-index: 1;
		}
		.nav-tabs{
			border-bottom: unset;
			font-size: 20px;
		}
		.swiper-wrapper{
			height: 70% !important;
		}
		.swiper-slide video{
			object-fit: cover;
		}


		/*//new*/
		.left-sidebar{
			background-color: #6251c4;
			background-image: unset;
    		color: #fff;
		}
		.brand-logo img{
			border: 4px solid #f6f6f6;
		}
		.brand-name, .brand-logo{
			margin-bottom: 10px;
		}
		.left-sidebar hr{
			margin: 15px 0px;
		}
		.sidebar-nav > ul > li {
		    margin-bottom: 10px;
		    list-style: none;
		    width: 100%;
		}
		#sidebarnav{
			padding: 0px;
		}
		.content{
			height: 100%;
		}
		.nav-tabs li a {
			text-decoration: none;
		    color: #fff;
		    padding: 8px 35px 8px 15px;
		    display: block;
		    font-size: 15px;
		    border-radius: 4px;
		    white-space: nowrap;
		}
		.sidebar-nav > ul > li > a.active{
			box-shadow: 0 0 10px rgb(0 0 0 / 20%);
		}
		.sidebar-nav > ul > li > a.active, .sidebar-nav > ul > li:hover > a.active {
		    color: #6251c4;
		    background: #fff;
		    text-decoration: none;
		}
		.sidebar-nav > ul > li:hover > a {
		    color: #6251c4;
		    background: #fff;
		    text-decoration: none;
		}
		.btn-div button {
		    border: 1px solid #fff;
		    border-radius: 10px;
		}
		.svg-img{
			width: 15%;
		}
	</style>
	<?php
	if($analyticscode['data']['codeType'] == '1')
	{
		$code = $analyticscode['data']['code'];
		?>
		<!-- Facebook Pixel Code -->
		<script>
			!function(f,b,e,v,n,t,s)
			{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window,document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '<?php echo $code; ?>'); 
				fbq('track', 'PageView');
			</script>
			<noscript>
				<img height="1" width="1" 
				src="https://www.facebook.com/tr?id=<?php echo $code; ?>&ev=PageView
				&noscript=1"/>
			</noscript>
			<!-- End Facebook Pixel Code -->
			<?php
		}
		?>
	</head>
	<body>
		<?php
		$pro_url = $this->input->get('swirl');
		?>
		<div id="mySidenav" class="sidenav">
			<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
			<div class="left-sidebar">
				<div class="content">
					<div class="brand-logo">
						<a href="<?php echo !empty($brand_details['data']['logo_link'])? $brand_details['data']['logo_link']:'';  ?>">
							<img src="<?php echo $brand_details['data']['user_profile']; ?>" class="img-responsive">
						</a>
					</div>
					<h4 class="brand-name"><?php echo $brand_details['data']['designer_brand_name']; ?></h4>
					<?php 
					if($brand_details['data']['companyLink'] != '')
					{
						$website_link = $brand_details['data']['companyLink'];
						$org_link =  parse_url($brand_details['data']['companyLink']);
						if(empty($org_link['scheme']))
						{
							$website_link = 'https://'.$brand_details['data']['companyLink'];
						}

						?>
						<a href="<?php echo $website_link; ?>" target="_blank"><p class="website-link">Website Link</p></a>
					<?php } ?>
				<!-- <div class="swirls-tag">
					<span class="badge badge-pill badge-default"><?php echo $brand_details['data']['designer_specialist_in']; ?></span>
					<span class="badge badge-pill badge-default"><?php echo $brand_details['data']['designer_parent_specialist_in']; ?></span>
				</div>   -->
				<hr>
				<div class="designer_details">
					<label>ABOUT</label>
					<p class="first_bio" id="first_bio"><?php 
					$string = $brand_details['data']['designer_bio'];
					echo strlen($string) >= 100 ? 
					substr($string, 0, 99) . ' <a onclick="bio(1)">Read more</a>' : 
					$string;
				?></p>
				<p class="second_bio" id="second_bio">
					<?php echo $brand_details['data']['designer_bio'];
					?>
					<a onclick="bio(2)">Less more</a>
				</p>
				<?php 
				if($brand_details['data']['facebookLink'] != '' || $brand_details['data']['twitterLink'] != '' || $brand_details['data']['instagramLink'] != '' || $brand_details['data']['pinterestLink'] != '')
				{
					?>
					<label>SOCIAL LINKS</label>
				<?php } ?>
				<p class="social-icon">
					<?php 
					if($brand_details['data']['facebookLink'] != '')
					{
						?>
						<a href="<?php echo $brand_details['data']['facebookLink']; ?>" target="_blank"><i class="fa fa-facebook-f" style="font-size:24px;padding-right: 8px;color: #000;"></i></a>
					<?php } ?>
					<?php 
					if($brand_details['data']['twitterLink'] != '')
					{
						?>
						<a href="<?php echo $brand_details['data']['twitterLink']; ?>" target="_blank"><i class="fa fa-twitter" style="font-size:24px;padding-right: 8px;color: #000;"></i></a>
					<?php } ?>
					<?php 
					if($brand_details['data']['instagramLink'] != '')
					{
						?>
						<a href="<?php echo $brand_details['data']['instagramLink']; ?>" target="_blank"><i class="fa fa-instagram" style="font-size:24px;padding-right: 8px;color: #000;"></i></a>
					<?php } ?>
					<?php 
					if($brand_details['data']['pinterestLink'] != '')
					{
						?>
						<a href="<?php echo $brand_details['data']['pinterestLink']; ?>" target="_blank"><i class="fa fa-pinterest" style="font-size:24px;padding-right: 8px;    color: #000;"></i></a>
					<?php } ?>
				</p>
			</div>
		</div>
		<div class="bottom-div">
			<div class="btn-div">
				<?php 
				if(isset($this->session->userdata['user_id']))
				{
					?>
					<button class="con-btn contact-btn-mo" onclick="contact_brand_click(<?php echo $this->session->userdata('user_id'); ?>)">Contact <!-- Brand --></button>
				<?php }else {?>
					<button class="con-btn contact-btn-mo" onclick="showme_btn()">Contact<!--  Brand --></button>
				<?php } ?>
				<button class="share-btn"><img src="<?php echo base_url(); ?>assets/live/share.png" class="img-responsive"> SHARE</button>
			</div>
		</div>
	</div>
</div>

<div class="main-content">
	<div class="row main-row main-row1">
		<div class="col-lg-2 left-sidebar-space">
			<div class="mobile-view">
				<img src="<?php echo base_url(); ?>assets/live/menu.png" class="img-responsive menu-icon" onclick="openNav()" >
				<img src="<?php echo $brand_details['data']['user_profile']; ?>" alt="<?php echo $brand_details['data']['designer_brand_name']; ?>" class="img-responsive de-icon">
				<h4 class="brand-name"><?php echo $brand_details['data']['designer_brand_name']; ?></h4>
			</div>
			<div class="left-sidebar left-dis">
				<div class="content">
					<div class="brand-logo">
						<a href="<?php echo !empty($brand_details['data']['logo_link'])? $brand_details['data']['logo_link']:'';  ?>">
							<img src="<?php echo $brand_details['data']['user_profile']; ?>" alt="<?php echo $brand_details['data']['designer_brand_name']; ?>" class="img-responsive">
						</a>
					</div>
					<h4 class="brand-name"><?php echo $brand_details['data']['designer_brand_name']; ?></h4>
					<hr>
					<div class="designer_details">
						<nav class="sidebar-nav active">
		                    <ul id="sidebarnav" class="nav nav-tabs">
		                    	<li class=""><a data-toggle="tab" href="#livestreams" class="active show">
		                    		<img src="<?php echo base_url(); ?>assets/images/detail_page/live_stream.svg" class="img-responsive svg-img"><span class="hide-menu pl-3 align-middle">Live Streams </span>
		                    	</a></li>
								<li><a data-toggle="tab" href="#SWIRL-short-videos">
									<img src="<?php echo base_url(); ?>assets/images/detail_page/swirl.svg" class="img-responsive svg-img"><span class="hide-menu pl-3 align-middle">Short Videos </span>
								</a></li>
								<li><a data-toggle="tab" href="#about-us">
									<img src="<?php echo base_url(); ?>assets/images/detail_page/information.svg" class="img-responsive svg-img"><span class="hide-menu pl-3 align-middle">About Us</span>
								</a></li>
		                        
		                    </ul>
		                </nav>
					</div>
				</div>
				<div class="bottom-div">
					<div class="btn-div">
						<?php 
						if(isset($this->session->userdata['user_id']))
						{
							?>
							<button class="con-btn contact-btn-mo" onclick="contact_brand_click(<?php echo $this->session->userdata('user_id'); ?>)">Contact <!-- Brand --></button>
						<?php }else {?>
							<button class="con-btn contact-btn-mo" onclick="showme_btn()">Contact <!-- Brand --></button>
						<?php } ?>
						<button class="share-btn" data-toggle="modal" data-target="#sharemodal"><img src="<?php echo base_url(); ?>assets/live/share.png" class="img-responsive" > SHARE</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-10 right-sidebar-space">
			<div class="right-sidebar">
				<div class="swirls-block row main-row">
					<div class="tab-content">
						<div id="livestreams" class="tab-pane fade in active show">
							<h4>Live Streams</h4>
							<hr>
							<div class="swirls-block row main-row">
								<?php
								for($i=0;$i<count($stream);$i++)
								{
									?>
									<div class="col-lg-3 col-md-4 col-6">
										<div class="swirls-block">
											<a href="<?php echo base_url(); ?>index.php/<?php echo $stream[$i]['streram_id']; ?>">
												<div class="swirls-img">
													<?php
													if($stream[$i]['cover_img'] != '')
													{
														?>
														<img src="<?php echo $stream[$i]['cover_img']; ?>" class="img-responsive  jw-img">
													<?php } else{?>
														<img src="<?php echo base_url(); ?>assets/video/image/rectangle-place-holder (1).jpg" class="img-responsive  jw-img">
													<?php } ?>

													<div class="tag-top">
														<span class="live">
															<img src="<?php echo base_url(); ?>assets/live/i_live.png" class="img-responsive"> 
														Live Stream</span>
													</div>
													<div class="gal-item-last">
														<img src="https://ams3.digitaloceanspaces.com/gn-static01/assets/css/swirl_play.png" class="designer-sm-img">
														<?php
														$position=20; 
														$pro = $stream[$i]['title'];
														if (strlen($pro) > 20)
														{
															$product_title = substr($pro, 0, $position)."..."; 
														}
														else
														{
															$product_title = $pro; 
														}
														?>
														<p><?php echo $product_title; ?></p>
													</div>
												</div>
											</a>
										</div>
									</div>
								<?php } ?>
							</div>
						</div>
						<div id="SWIRL-short-videos" class="tab-pane fade">
							<h4>Short Videos</h4>
							<hr>
							<div class="swiper">
								<div class="swiper-wrapper">
									<?php
									for($i=0;$i<count($swilrs);$i++)
										{?>
										<div class="swiper-slide">
												<video poster="<?php echo $swilrs[$i]['image']; ?>" ontimeupdate="updateSSVProgressBar(this);" onloadeddata="updateSSVDurations(this);" playsinline="playsinline" preload="metadata" data-setup="{}" muted width="100%" height="100%" data-title="<?php echo $swilrs[$i]['video_title']; ?>" data-cover="<?php echo $swilrs[$i]['image']; ?>" data-vid="<?php echo $swilrs[$i]['video_id']; ?>" data-did="<?php echo $swilrs[$i]['designer_id']; ?>">
													<source src="<?php echo $swilrs[$i]['video_url']; ?>" type="video/mp4">
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
														<?php
														$position=20; 
														$pro = $swilrs[$i]['video_title'];
														if (strlen($pro) > 20)
														{
															$product_title = substr($pro, 0, $position)."..."; 
														}
														else
														{
															$product_title = $pro; 
														}
														?>
														<p><?php echo $product_title; ?></p>
												<!-- <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
													<img src="https://store.goswirl.live/short-video-embed-assets/swirl-powered-by.png" alt="SWIRL logo" title="SWIRL logo" height="" width="" /> 
												</a> -->
											</div>
											<div class="SSV-video-timer-top">
												<p>00:00</p>                            
											</div>
										</div>
									<?php } ?>
								</div>
								<div class="swiper-button-next">
									<img src="https://store.goswirl.live/short-video-embed-assets/next-btn.svg" height="" width="" alt="Next icon">
								</div>
								<div class="swiper-button-prev">
									<img src="https://store.goswirl.live/short-video-embed-assets/back-btn.svg" height="" width="" alt="Previous icon">
								</div>

								<div class="SSV-play-modal" style="display: none;">                
                                <div class="SSV-play-modal-video-container">
                                    <video loop="" ontimeupdate="updateSSVModalProgressBar(this);" onloadeddata="updateSSVModalInfos(this);" playsinline="playsinline" preload="metadata" data-setup="{}" poster="https://store.goswirl.live/assets/video/image/1639811453.jpeg">
                                        <source src="https://content.jwplatform.com/videos/oFOzmatA.mp4" type="video/mp4">
                                        </video>

                                        <div class="SSV-play-modal-top-shadow"></div>

                                        <button type="button" class="SSV-play-modal-mute-unmute SSV-play-modal-operation-btns" title="Mute/Unmute">
                                            <img src="https://goswirl.shop/swirl-embed/assets/unmute.svg" alt="Share icon" height="" width="">
                                        </button>
                                        <button type="button" class="SSV-play-modal-share SSV-play-modal-operation-btns" title="Share">
                                            <img src="https://goswirl.shop/swirl-embed/assets/share.svg" alt="Share icon" height="" width="">
                                        </button>
                                        <button type="button" class="SSV-play-modal-play-pause SSV-play-modal-operation-btns" title="Play/Pause" style="display: none;">
                                            <img src="https://goswirl.shop/swirl-embed/assets/play.svg" alt="Play/Pause icon" height="" width="">
                                        </button>                    
                                        <button type="button" class="SSV-play-modal-askaque SSV-play-modal-operation-btns" title="Ask Question">
                                            <img src="https://goswirl.shop/swirl-embed/assets/ask-question.svg" alt="Ask Question icon" height="" width="">
                                        </button>

                                        <button type="button" class="SSV-play-modal-buynow-on SSV-play-modal-addtocart" data-action="2" data-link="https://getnatty-live.myshopify.com/products/apple-ipad-pro-2021" data-pid="16320" style="display: none;">
                                            Buy Now
                                        </button>

                                        <div class="SSV-video-popup-progress">
                                            <div class="SSV-video-popup-progress-inner" style="width: 58%;">&nbsp;</div>
                                        </div>

                                        <label class="close-SSV-modal" style="font-family: arial;" title="Close">×</label>
                                        <button type="button" class="SSV-play-modal-pip SSV-play-modal-operation-btns" title="PIP Mode">
                                            <img src="https://goswirl.shop/swirl-embed/assets/pip.svg" alt="Share icon" height="" width="">
                                        </button>

                                        <p class="SSV-video-popup-title">APPLE iPad Pro 2021 3rd Generation</p>

                                        <div class="SSV-video-popup-product" style="display: block;">
                                            <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1639811156mhqr3hn-a-apple-original-imag2ujneawpdgzs.jpeg" alt="Product Image" height="" width="">
                                            <div>
                                                <p>APPLE iPad Pro 2021 (3rd Generation)</p>
                                                <label>₹ 80000</label>
                                            </div>
                                        </div>

                                        <div class="SSV-video-product-open SSV-video-product-open-cover" style="">
                                            <b style="font-family: arial;" title="Close">×</b>
                                            <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1639811156mhqr3hn-a-apple-original-imag2ujneawpdgzs.jpeg" alt="Product Image" height="" width="">
                                            <div>
                                                <p>APPLE iPad Pro 2021 (3rd Generation)</p>
                                                <label>₹ 80000</label>
                                            </div>
                                            <br>
                                            <span style="display: none;">Description</span>
                                            <section style="display: none;"></section>
                                            <center>
                                                <button type="button" class="SSV-play-modal-addtocart SSV-pm-add-to-cart" data-action="1" data-link="https://getnatty-live.myshopify.com/products/apple-ipad-pro-2021" data-pid="16320" style="display: none;">Add to Cart</button>
                                                <button type="button" class="SSV-play-modal-addtocart SSV-pm-buy-now" data-action="2" data-link="https://getnatty-live.myshopify.com/products/apple-ipad-pro-2021" data-pid="16320">Buy Now</button>
                                            </center>
                                        </div>

                                        <div class="SSV-video-popup-product-multi" onclick="$('.SSV-video-popup-product-list-multi').show();" style="display: none;">
                                            <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1640167076.png" alt="Product Image" height="" width="">                                
                                            <p class="counter">3</p>
                                        </div>

                                        <div class="SSV-video-popup-product-list-multi" style="display: none;">                                
                                            <p class="SSV-video-popup-product-list-multi-title">
                                                <label style="font-family: arial;" title="Back">‹</label>
                                                Shop
                                                <b style="font-family: arial;" title="Close">×</b>
                                            </p>
                                            <div class="SSV-video-popup-product-list-multi-append" style="">
                                                <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">
                                                    <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1640167076.png" alt="Product Image" height="" width="">
                                                    <div>
                                                        <p data-pid="16332" data-desc="">Dusty Pink Fleece Set</p>
                                                        <label data-link="https://kicaactive.com/collections/co-ord-set/products/dusty-pink-fleece-set">₹ 2900.0</label>
                                                    </div>
                                                </div>
                                                
                                                <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">
                                                    <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1643353695.png" alt="Product Image" height="" width="">
                                                    <div>
                                                        <p data-pid="16688" data-desc="Shop for electronics, apparels &amp; more using our Flipkart app Free shipping &amp; COD.">realme C21Y ( 64 GB Storage, 4 GB RAM ) Online at Best Price On Flipkart.com</p>
                                                        <label data-link="https://dl.flipkart.com/s/d4TUyyuuuN">₹ 34000</label>
                                                    </div>
                                                </div>
                                                
                                                <div class="SSV-video-popup-product-item-multi" onclick="openMultiProductDetail(this)">
                                                    <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/61fc356aec4151643029618477-search_full.jpg" alt="Product Image" height="" width="">
                                                    <div>
                                                        <p data-pid="16765" data-desc="meta charset=utf-8" <span="">Flared one shoulder dress.Â&nbsp;<br>
                                                        </p><ul>
                                                            <li>
                                                                <span>Fitted-RegularÂ&nbsp;</span><span></span><span>fit</span>
                                                            </li>
                                                            <li><span>Asymmetrical neckline</span></li>
                                                            <li><span>Close neck band fastening from centre back</span></li>
                                                            <li><span>Paneling in the front highlighted by contrast piping</span></li>
                                                            <li><span>One side full sleeve with piping and pleat detail</span></li>
                                                            <li><span>Material -Rayon Nylon Blend</span></li>
                                                        </ul>"&gt;Red Dress<p></p>
                                                        <label data-link="https://stylenook-live.myshopify.com/products/red-dress">₹ 2000</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="SSV-video-popup-product-list-multi-product-detail" style="display: none;">                                    
                                                <img src="https://gn-static01.ams3.digitaloceanspaces.com/assets/files/medium/1643353695.png" alt="Product Image" height="" width="">
                                                <div>
                                                    <p>realme C21Y ( 64 GB Storage, 4 GB RAM ) Online at Best Price On Flipkart.com</p>
                                                    <label>₹ 34000</label>
                                                </div>
                                                <br>
                                                <span style="">Description</span>
                                                <section style="">Shop for electronics, apparels &amp; more using our Flipkart app Free shipping &amp; COD.</section>
                                                <center>
                                                    <button type="button" class="SSV-play-modal-addtocart SSV-pmm-add-to-cart" data-action="1" data-link="https://getnatty-live.myshopify.com/products/apple-ipad-pro-2021" data-pid="16320" style="display: none;">Add to Cart</button>
                                                    <button type="button" class="SSV-play-modal-addtocart SSV-pmm-buy-now" data-action="2" data-link="https://getnatty-live.myshopify.com/products/apple-ipad-pro-2021" data-pid="16320">Buy Now</button>
                                                </center>
                                            </div>
                                        </div>

                                        <button type="button" class="SSV-video-popup-brand-info-btn" title="More">
                                            <img src="https://goswirl.shop/swirl-embed/assets/toggle.png" alt="Toggle icon" height="" width="">
                                        </button>
                                        <div class="SSV-video-popup-brand-info" style="display: none;">
                                            <label style="font-family: arial;" title="Close">×</label>                        
                                            <img src="https://swirl-assets.s3.ap-south-1.amazonaws.com/brand_logo/design_v_logo.png" class="SSV-video-popup-brand-info-brand-logo" alt="Logo" height="" width="">
                                            <p class="SSV-video-popup-brand-info-brand-name">Design Vortex</p>
                                            <p class="SSV-video-popup-brand-info-brand-about" style="display: none;">About</p>
                                            <p class="SSV-video-popup-brand-info-brand-description" style="display: none;">Use storytelling and hyper-engagement to get 400% lift in Add-to-cart with Short Videos &amp; Live streaming</p>
                                            <div class="SSV-video-popup-brand-info-powered">
                                                <span>Powered by</span>
                                                <a href="https://www.goswirl.live/" target="_blank" rel="nofollow">
                                                    <img src="https://goswirl.shop/swirl-embed/assets/swirl-powered-by.png" alt="SWIRL Logo" title="SWIRL Logo" height="" width=""> 
                                                </a>
                                            </div>
                                        </div>

                                        <div class="SSV-video-popup-share" style="display: none;">
                                            <p>Share to</p>
                                            <label style="font-family: arial;">×</label>
                                            <img class="SSV-facebook" src="https://goswirl.shop/swirl-embed/assets/facebook.png" data-sharelink="file:///C:/Users/alm/Desktop/swirl.html?ssv=aHR0cHM6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL3ZpZGVvcy9vRk96bWF0QS5tcDQ=" alt="Facebook icon" title="Share on Facebook" height="" width="">
                                            <img class="SSV-twitter" src="https://goswirl.shop/swirl-embed/assets/twitter.png" data-sharelink="file:///C:/Users/alm/Desktop/swirl.html?ssv=aHR0cHM6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL3ZpZGVvcy9vRk96bWF0QS5tcDQ=" alt="Twitter icon" title="Share on Twitter" height="" width="">
                                            <img class="SSV-whatsapp" src="https://goswirl.shop/swirl-embed/assets/whatsapp.png" data-sharelink="file:///C:/Users/alm/Desktop/swirl.html?ssv=aHR0cHM6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL3ZpZGVvcy9vRk96bWF0QS5tcDQ=" alt="Whatsapp icon" title="Share on Whatsapp" height="" width="">
                                            <img class="SSV-copy" src="https://goswirl.shop/swirl-embed/assets/copy-link.png" data-sharelink="file:///C:/Users/alm/Desktop/swirl.html?ssv=aHR0cHM6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL3ZpZGVvcy9vRk96bWF0QS5tcDQ=" alt="Copy link icon" title="Copy Link" height="" width="">
                                            <span>Link Copied!</span>
                                            <input type="text" class="SSV-copylink-input" value="" style="display: none;" onclick="SSVcopyLink(this);">
                                        </div>

                                        <div class="SSV-CTA-modal">          
                                            <div class="SSV-OTP-send SSV-CTA-modal-inner" style="display: none;">
                                                <label>Register Yourself <span style="font-family: arial;" title="Close">×</span></label>
                                                <p class="SSV-CTA-message"></p>
                                                <form onsubmit="return SSVsendOTP(this);">
                                                    <input type="text" name="SSVuserName" placeholder="Name" autocomplete="off" required="">
                                                    <div style="position: relative; display: none;" class="phone-and-code">
                                                        
                                                        <input type="number" name="SSVphoneNumber" placeholder="Phone Number" autocomplete="off" required="" disabled="disabled">
                                                    </div>
                                                    <button>Register<p class="SSV-CTA-loader"></p></button>
                                                </form>
                                            </div>
                                            <div class="SSV-OTP-verification SSV-CTA-modal-inner" style="display: none;">
                                                <label>Verify Yourself <span style="font-family: arial;" title="Close">×</span></label>
                                                <p class="SSV-CTA-message"></p>
                                                <form onsubmit="return SSVregisterOTP(this);">
                                                    <input type="number" name="SSVotp" placeholder="OTP" autocomplete="off" required="">
                                                    <button>Verify<p class="SSV-CTA-loader"></p></button>
                                                </form>
                                            </div>
                                            <div class="SSV-ask-question SSV-CTA-modal-inner" style="display: none;">
                                                <div>
                                                    <label>Ask Question <span style="font-family: arial;" title="Close">×</span></label>
                                                    <p class="SSV-CTA-message"></p>
                                                    <form onsubmit="return SSVaskQuestion(this);">
                                                        <textarea placeholder="Type here" name="SSVaskQue" rows="3" autocomplete="off" required=""></textarea>
                                                        <button>Send<p class="SSV-CTA-loader"></p></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="SSV-popup-video-loader"><p></p></div>

                                    <img src="https://goswirl.shop/swirl-embed/assets/back-btn.svg" class="SSV-modal-left" alt="Previous icon" height="" width="" style="">
                                    <img src="https://goswirl.shop/swirl-embed/assets/next-btn.svg" class="SSV-modal-right" alt="Next icon" height="" width="">
                                </div>

                                <div class="SSV-PIP" id="SSV-PIP" style="display: none;">
                                    <label class="close-SSV-PIP" style="font-family: arial;" title="Close">×</label>
                                    <video loop="" muted="" playsinline="playsinline" preload="metadata" data-setup="{}" onloadeddata="updateSSVPIPInfos(this);">
                                        <source src="https://content.jwplatform.com/videos/oFOzmatA.mp4" type="video/mp4">
                                        </video>
                                        <span class="SSV-PIP-fullscreen"></span>
                                    </div>
                                </div>
                        </div>
                        <div id="about-us" class="tab-pane fade">
							<h4>About Us</h4>
							<hr>
						</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php
	if($brand_details['data']['designer_id'] != '17724')
	{
		?>
		<form class="modal multi-step" id="demo-modal-1">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title step-1" data-step="1">Verify</h4>
						<h4 class="modal-title step-2" data-step="2">Verify</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
					</div>
					<div class="modal-body step step-1 modal-btm">
						<input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Full Name" style="margin-bottom: 20px;">
						<!-- <input type="text" class="form-control" id="mobile" aria-describedby="emailHelp" placeholder="Mobile Number"> -->
						<input type="tel" id="mobile" class="form-control" style="width: 100%;" />
					</div>
					<div class="modal-body step step-2 modal-btm">
						<p class="tag-line-otp">We have sent an OTP on registered mobile number. Please enter</p>
						<input type="text" class="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter OTP">
						<input type="hidden" class="form-control" id="otp_confirm" aria-describedby="emailHelp" placeholder="Enter OTP">
					</div>
					<p class="error_msg err_user_cpassword" style="text-align: center;color: red;"></p>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary close1 btn-pro" onclick="otpcheck()">ENTER</button>
						<button type="button" class="btn btn-primary step step-1 btn-pro" data-step="1" onclick="sendEvent('#demo-modal-1', 2)">PROCEED</button>
						<p class="resend-link" style="display: none;" onclick="sendEvent('#demo-modal-1', 2)">Resend</p>
					</div>
				</div>
			</div>
		</form>
	<?php }else{ ?>
		<form class="modal multi-step" id="demo-modal-1">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title step-1" data-step="1">Verify</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
					</div>
					<div class="modal-body step step-1 modal-btm">
						<input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Full Name" style="margin-bottom: 20px;">
						<input type="tel" id="mobile" class="form-control" style="width: 100%;" />
					</div>
					<p class="error_msg err_user_cpassword" style="text-align: center;color: red;"></p>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-pro" onclick="otpcheck_without()">ENTER</button>
					</div>
				</div>
			</div>
		</form>
	<?php } ?>

	<div id="myModal" class="modal bottom fade" role="dialog">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body" >
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<div class="contact-body-header">
						<img src="<?php echo $brand_details['data']['user_profile']; ?>" class="img-responsive">
						<div class="contact-body-brand">
							<p><?php echo $brand_details['data']['designer_brand_name']; ?></p>
							<p>Inquiry form</p>
						</div>
					</div>
					<div class="">
						<form class="" id="inquiry_form" method="post">
							<input type="text" name="subject" id="subject" class="form-control" placeholder="Subject">
							<textarea  maxlength="280" style="width: 100%;margin-bottom: 0px;" rows="4" cols="50" name="inquiry_text" id="inquiry_text" placeholder="Message.." class="form-control"></textarea>
							<p style="float: right;margin-bottom: 20px;"><span id="charNum">280</span> Character(s) Remaining</p>
							<p class="error_msg err_user_cpassword" style="text-align: center;color: red;"></p>
							<button type="button" class="btn-pro" onclick="inquiry_form_submit(<?php echo $this->session->userdata('user_id'); ?>,<?php echo $brand_details['data']['designer_id']; ?>)">SEND</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="sharemodal" class="modal bottom fade" role="dialog">
		<div class="modal-dialog modal-dialog-centered">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title">Share</h6>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body" >
					<!-- ShareThis BEGIN --><div class="sharethis-inline-share-buttons"></div><!-- ShareThis END -->
				</div>
			</div>
		</div>
	</div>

	<!-- video call short code -->
	<div id="swirl-video-call" data-identity="Zm9yZWxza2V0" data-did="Mw=="></div>
	<!-- End -->
	
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
	
	<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
	<script src="https://store.goswirl.live/swirl-embed/short-videos-carousel/v2/swiper-bundle.min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="https://www.ngzhian.com/multi-step-modal/multi-step-modal.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/css/build/js/intlTelInput-jquery.min.js"></script>
	<!-- video call short code -->
	<script src="https://goswirl.shop/swirl-embed/video-call/swirl-embed.js"></script>
	<script src="<?php echo base_url(); ?>assets/js/swirl-embed-nilesh.js"></script>
	<!-- video call short code -->
	<script type="text/javascript">
		
		$(function () {
		    var code = "<?php echo '+'.$brand_details['data']['phoneCode']?>"; // Assigning value from model.
		    $('#mobile').val(code);
		    $('#mobile').intlTelInput({
		    	autoHideDialCode: true,
		    	autoPlaceholder: "ON",
		    	dropdownContainer: document.body,
		    	formatOnDisplay: true,
		    	hiddenInput: "full_number",
		    	initialCountry: "auto",
		    	nationalMode: true,
		    	placeholderNumberType: "MOBILE",
		    	preferredCountries: ['in'],
		    	separateDialCode: true
		    });
		});
</script>
<script type="text/javascript">
	$(document).ready(function() {    
		var id = 0;
		var s = 10;
		var designer_id = "<?php echo $brand_details['data']['designer_id']; ?>";
		var pageURL = $(location).attr("href");
		var type = 1;
		setInterval(function(){
			$.ajax({
				type: "POST",
				dataType : "json",
				url: "<?php echo base_url(); ?>index.php/BrandController/user_time_count",    
				data: "page_url="+encodeURIComponent(pageURL)+"&ts="+encodeURIComponent(s)+"&id="+encodeURIComponent(id)+"&page_type="+encodeURIComponent(type)+"&designer_id="+encodeURIComponent(designer_id), 
				beforeSend: function(){
				},       
				success: function(json)
				{            
					console.log(json);
					if(json)
					{   
						id = json['data'];
						s = 12;
					}
					else
					{
						alert('Somethings went wrong, try again later.');                                                    
					}
				}
			});
		}, 10000);    
	});

	var maxLength = 280;
	$('#inquiry_text').keyup(function() {
		var textlen = maxLength - $(this).val().length;
		$('#charNum').text(textlen);
	});
	function contact_brand_click()
	{
		$('#myModal').modal('show');
	}
	function showme_btn(e)
	{
		$('#demo-modal-1').modal('show');
		$('.close1').css('display','none');
	}
	function sendEvent(sel, step)
	{
		var name = document.getElementById("name").value;  
		var mobile = document.getElementById("mobile").value;
		var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode; 
		if(name == '')
		{
			$('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
			$('#name').focus();
			return false;
		}
		else if(mobile == '')
		{
			$('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
			$('#mobile').focus();
			return false;
		}
		else
		{
			$('.resend-link').css('display','block');
			$('.close1').css('display','block');
			var mobile = $('#mobile').val();
			var message = Math.floor(1000 + Math.random() * 9000);
			$('#otp_confirm').val(message);

			$.ajax({
				type: "POST",
				dataType : "json",
				url: "<?php echo base_url(); ?>index.php/Live/otp",
				data: "mobile="+encodeURIComponent(mobile)+"&otp="+encodeURIComponent(message)+"&code="+encodeURIComponent(code),
				success: function(json)
				{

				}
			});
			$(sel).trigger('next.m.' + step);
		}
	}
	function otpcheck()
	{
		var otp = document.getElementById("otp").value;  
		var otp_confirm = document.getElementById("otp_confirm").value; 
		var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
		if(otp == otp_confirm)
		{
			$('#demo-modal-1').modal('toggle');
			var name = document.getElementById("name").value;  
			var mobile = document.getElementById("mobile").value;
			$.ajax({
				type: "POST",
				dataType : "json",
				url: "<?php echo base_url(); ?>index.php/Live/user_register_live_stream",
				data: "mobile="+encodeURIComponent(mobile)+"&name="+encodeURIComponent(name)+"&code="+encodeURIComponent(code),
				success: function(json)
				{
					console.log(json);
					if(json.status_code == '1')
					{
						location.reload();
					}
				}
			});
		}
		else
		{
			$('.err_user_cpassword').html("OTP should be same.").fadeIn().delay(3000).fadeOut();
			$('#otp').focus();
			return false;
		}
	}
	function otpcheck_without()
	{
		var code = $("#mobile").intlTelInput("getSelectedCountryData").dialCode;
		$('#demo-modal-1').modal('toggle');
		var name = document.getElementById("name").value;  
		var mobile = document.getElementById("mobile").value;
		$.ajax({
			type: "POST",
			dataType : "json",
			url: "<?php echo base_url(); ?>index.php/Live/user_register_live_stream",
			data: "mobile="+encodeURIComponent(mobile)+"&name="+encodeURIComponent(name)+"&code="+encodeURIComponent(code),
			success: function(json)
			{
				console.log(json);
				if(json.status_code == '1')
				{
					location.reload();
				}
			}
		});
	}
	function inquiry_form_submit(a,b)
	{
		var subject = document.getElementById("subject").value; 
		var msg = document.getElementById("inquiry_text").value; 
		if(subject == '')
		{
			$('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
			$('#subject').focus();
			return false;
		}
		else if(msg == '')
		{
			$('.err_user_cpassword').html("This is a required field.").fadeIn().delay(3000).fadeOut();
			$('#inquiry_text').focus();
			return false;
		}
		else
		{
			$.ajax({
				type: "POST",
				dataType : "json",
				url: "<?php echo base_url(); ?>index.php/Live/inquiry_form_submit",
				data: "user_id="+encodeURIComponent(a)+"&designer_id="+encodeURIComponent(b)+"&msg="+encodeURIComponent(msg)+"&subject="+encodeURIComponent(subject),
				success: function(json)
				{
					console.log(json);
					$('#myModal').modal('hide');
					$('#subject').val('');
					$('#inquiry_text').val('');
					$('#charNum').text('280');
					alert(json.message);
				}
			});
		}
	}
	var pageURL = $(location).attr("href");
	const shareButton = document.querySelector('.share-btn');
	const shareDialog = document.querySelector('.share-dialog');
	const closeButton = document.querySelector('.close-button');

	shareButton.addEventListener('click', event => {
		if (navigator.share) { 
			navigator.share({
				title: 'Designer Details',
				url: pageURL
			}).then(() => {
				console.log('Thanks for sharing!');
			})
			.catch(console.error);
		} else {
			shareDialog.classList.add('is-open');
		}
	});

	closeButton.addEventListener('click', event => {
		shareDialog.classList.remove('is-open');
	});

	function bio(ed)
	{
		if(ed == 1)
		{
			document.getElementById("first_bio").style.display = "none";
			document.getElementById("second_bio").style.display = "block";
		}
		else
		{
			document.getElementById("second_bio").style.display = "none";
			document.getElementById("first_bio").style.display = "block";
		}
	}
	function bio1(ed)
	{
		if(ed == 1)
		{
			document.getElementById("first_bio1").style.display = "none";
			document.getElementById("second_bio1").style.display = "block";
		}
		else
		{
			document.getElementById("second_bio1").style.display = "none";
			document.getElementById("first_bio1").style.display = "block";
		}
	}
	function openNav() {
		document.getElementById("mySidenav").style.width = "320px";
		$('.main-content').css('opacity','0.5');
	}

	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
		$('.main-content').css('opacity','1');
	}
</script>
</body>
</html>	