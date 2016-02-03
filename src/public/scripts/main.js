'use strict';

/*
 *Limo HTML5 E-Commerce Template v1.4
 *Copyright 2015 8Guild.com
 *All scripts for Limo HTML5 E-Commerce Template
 */

/*Document Ready*/ ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {
	/*Global Variables
	 *******************************************/
	var $searchBtn = $('.search-btn');
	var $searchForm = $('.search-form');
	var $closeSearch = $('.close-search');
	var $subscrForm = $('.subscr-form');
	var $nextField = $('.subscr-next');
	var $loginBtn = $('.login-btn');
	var $loginForm = $('.modal .login-form');
	var $loginForm2 = $('.checkout .login-form');
	var $loginForm3 = $('.log-reg .login-form');
	var $regForm = $('.registr-form');
	var $qcForm = $('.quick-contact');
	var $contForm = $('.contact-form');
	var $checkoutForm = $('#checkout-form');
	var $cartTotal1 = $('.cart-dropdown .total');
	var $header = $('header');
	var $headerOffsetTop = $header.data('offset-top');
	var $headerStuck = $header.data('stuck');
	var $menuToggle = $('.menu-toggle');
	var $menu = $('.menu');
	var $submenuToggle = $('.menu .has-submenu > a > i');
	var $submenu = $('.menu .submenu');
	var $featureTab = $('.feature-tabs .tab');
	var $featureTabPane = $('.feature-tabs .tabs-pane');
	var $brandCarousel = $('.brand-carousel .inner');
	var $shareBtn1 = $('.tile .share-btn i');
	var $offersTabs = $('.offer-tabs .tab-navs a');
	var $offersTabsCarousel = $('.offer-tabs .tab-navs');
	var $sortToggle = $('.sorting a');
	var $activePage = $('.pagination li.active a');
	var $subcatToggle = $('.filter-section .categories .has-subcategory > a');
	var $filterToggle = $('.filter-toggle');
	var $scrollTopBtn = $('#scrollTop-btn');
	var $qcfBtn = $('#qcf-btn');
	var $addToCartBtn = $('#addItemToCart');
	var $addedToCartMessage = $('.cart-message');
	var $promoLabels = $('.promo-labels div');
	var $panelToggle = $('.panel-toggle');
	var $accordionToggle = $('.accordion .panel-heading a');

	/*Search Form Toggle
	 *******************************************/
	$searchBtn.click(function() {
		$searchForm.removeClass('closed').addClass('open');
	});

	$closeSearch.click(function() {
		$searchForm.removeClass('open').addClass('closed');
	});

	$('.page-content, .subscr-widget, footer').click(function() {
		$searchForm.removeClass('open').addClass('closed');
	});

	/*Login Forms
	 *******************************************/
	$loginForm.validate();
	$loginForm2.validate();
	$loginForm3.validate();

	$('#log-password').focus(function() {
		$(this).attr('type', 'password');
	});

	/*Quick Contact Form Validation
	 *******************************************/
	$qcForm.validate();

	/*Contact Form Validation
	 *******************************************/
	$contForm.validate();

	/*Registration Form Validation
	 *******************************************/
	$regForm.validate();

	/*Checkout Form Validation
	 *******************************************/
	$checkoutForm.validate({
		rules: {
			co_postcode: {
				required: true,
				number: true
			},
			co_phone: {
				required: true,
				number: true
			}
		}
	});

	/*Adding Placeholder Support in Older Browsers
	 ************************************************/
	$('input, textarea').placeholder();

	/*Shopping Cart Dropdown
	 *******************************************/
	//Deleting Items
	$(document).on('click', '.cart-dropdown .delete', function() {
		var $target = $(this).parent().parent();
		var $positions = $('.cart-dropdown .item');
		var $positionQty = parseInt($('.cart-btn a span').text());

		$target.hide(300, function() {
			$.when($target.remove()).then(function() {
				$positionQty = $positionQty - 1;
				$('.cart-btn a span').text($positionQty);
				if ($positions.length === 1) {
					$('.cart-dropdown .body').html('<h3>Cart is empty!</h3>');
				}
			});
		});
	});

	/*Catalog 3-rd Level Submenu positioning
	 *******************************************/
	$('.catalog .submenu .has-submenu').hover(function() {
		var $offseTop = $(this).position().top;
		$('.catalog .submenu .offer .col-1 p').hide();
		$(this).find('.sub-submenu').css({
			top: -$offseTop + 'px'
		}).show();
	}, function() {
		$(this).find('.sub-submenu').hide();
		$('.catalog .submenu .offer .col-1 p').show();
	});

	/*Small Header slide down on scroll
	 *******************************************/
	if ($(window).width() >= 500) {
		$(window).on('scroll', function() {
			if ($(window).scrollTop() > $headerOffsetTop) {
				$header.addClass('small-header');
			}
			else {
				$header.removeClass('small-header');
			}
			if ($(window).scrollTop() > $headerStuck) {
				$header.addClass('stuck');
			}
			else {
				$header.removeClass('stuck');
			}
		});
	}

	/*Mobile Navigation
	 *******************************************/
	//Mobile menu toggle
	$menuToggle.click(function() {
		$menu.toggleClass('expanded');
	});

	//Submenu Toggle
	$submenuToggle.click(function(e) {
		$(this).toggleClass('open');
		$(this).parent().parent().find('.submenu').toggleClass('open');

	});

	/*Subscription Form Widget
	 *******************************************/
	$subscrForm.validate();

	$nextField.click(function(e) {
		var $target = $(this).parent();
		if ($subscrForm.valid() === true) {
			$target.hide('drop', 300, function() {
				$target.next().show('drop', 300);
			});
		}

	});

	/*Parallax Backgrounds
	 *******************************************/
	$(window).on('load', function() {
		/*Checking if it's touch device we disable parallax feature due to inconsistency*/
		$('.parallax').stellar({
			horizontalScrolling: false,
			responsive: true
		});
	});

	/*Features Tabs
	 *******************************************/
	$featureTab.on('mouseover', function() {
		$featureTab.removeClass('active');
		$(this).addClass('active');
		var $curTab = $(this).attr('data-tab');
		$featureTabPane.removeClass('current');
		$('.feature-tabs .tabs-pane' + $curTab).addClass('current');
	});

	/*Expandable Panels
	 *******************************************/
	$panelToggle.click(function(e) {
		$(this).toggleClass('active');
		var $target = $(this).attr('href');
		$($target).toggleClass('expanded');
	});

	/*Accordion Widget
	 *******************************************/
	$accordionToggle.click(function() {
		$accordionToggle.parent().removeClass('active');
		$(this).parent().addClass('active');
	});

	/*Sticky Buttons
	 *******************************************/
	//Scroll to Top Button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 500) {
			$scrollTopBtn.parent().addClass('scrolled');
		}
		else {
			$scrollTopBtn.parent().removeClass('scrolled');
		}
	});

	$scrollTopBtn.click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, {
			duration: 700,
			easing: 'easeOutExpo'
		});
	});
});