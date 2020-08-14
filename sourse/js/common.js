const JSCCommon = {
	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.form-wrap__title-h');
					// setValue(data.text, '.after-headline');
					// setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	//JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	//JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.CustomInputFile();
	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	let screenName;
	screenName = '07.jpg';
	screenName
		? $(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`)
		: '';
	// /добавляет подложку для pixel perfect


	function whenResize() {

		const topH = document.querySelector('header').scrollHeight;
		let stickyElement = document.querySelector('.top-nav')
		window.onscroll = () => {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyone Js

	//svg
	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	});

	//stop sidebar before footer
	function fixedStip(){
		let footer = document.querySelector('.footer');
		if (!footer) return;

		let fixedStrip = document.querySelector('.sAside');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(max-width: 1280px)").matches) {
				$(fixedStrip).removeClass('absolute');
				fixedStrip.style.top = '';
			}
		});
		window.setTimeout(function () {
			toggleFixedStrip(fixedStrip);
		}, 0);
	}
	fixedStip();
	function toggleFixedStrip(fixedStrip){
		let footerTop = $('.footer')[0].getBoundingClientRect().top + $(window)['scrollTop']();
		let windowHeight = calcVh(100);

		//console.log(footerTop);
		if (windowHeight + window.scrollY > footerTop){
			$(fixedStrip).addClass('absolute');
			fixedStrip.style.top = (footerTop - fixedStrip.offsetHeight) + 'px';
		}
		else{
			$(fixedStrip).removeClass('absolute');
			fixedStrip.style.top = '';
		}
	}

	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}

	// custom select
	$('.custom-select2').select2({
		minimumResultsForSearch: Infinity,
		dropdownCssClass: "drop-down-full-grey",
	});

	//mob menu
	$('.burger-js').click(function () {
		$(this).toggleClass('active');
		$('body').toggleClass('fixed-on-filter-js');
		$('.sAside').toggleClass('active');
	});

	$(window).resize(function () {
		if (window.matchMedia("(min-width: 1280px)").matches) {
			$('.burger-js').removeClass('active');
			$('body').removeClass('fixed-on-filter-js');
			$('.sAside').removeClass('active');
		}
	});


	//map
	$('.hide-map-js, .show-map-js').click(function () {
		$('.hide-map-js, .show-map-js, .map-block-js').toggleClass('active');
	});
	//catalog item slider
	$(".catalog-row__slider").each(function () {
		let articalsSlider = new Swiper($(this).find(".catalog-item-sl-js"), {
			slidesPerView: 1,
			spaceBetween: 10,
			loop: true,

			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 2,
			},
			//nav
			navigation: {
				nextEl: $(this).find('.catalog-item-next'),
				prevEl: $(this).find('.catalog-item-prev'),
			},

			//pugination
			pagination: {
				el: $(this).find('.catalog-item-pugin-js'),
				clickable: true,
			},

		});
	});


	//
	let dayInCompanySlider = new Swiper('.day-in-company-js', {
		effect: 'coverflow',
		spaceBetween: 0,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',

		//breakpoints
		breakpoints: {
			//xxl
			1525: {
				coverflowEffect: {
					rotate: 0,
					stretch: -364,
					depth: 1350,
					modifier: 1,
					slideShadows: false
				},
			},
			//xl
			1280 : {
				coverflowEffect: {
					rotate: 0,
					stretch: -344,
					depth: 1350,
					modifier: 1,
					slideShadows: false
				},
			},
			//lg
			992 : {
				coverflowEffect: {
					rotate: 0,
					stretch: -305,
					depth: 1350,
					modifier: 1,
					slideShadows: false
				},
			},
		},

		loop: true,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
		//nav
		navigation: {
			nextEl: $(this).find('.day-in-company-next'),
			prevEl: $(this).find('.day-in-company-prev'),
		},
		//pugination
		pagination: {
			el: $(this).find('.day-in-company-pugin'),
			clickable: true,
		},
	});

	//
	let employeeSlider = new Swiper('.employee-slider-js', {
		effect: 'coverflow',
		spaceBetween: 0,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		slideToClickedSlide: true,

		//breakpoints
		breakpoints: {
			//lg
			992 : {
				coverflowEffect: {
					rotate: 0,
					stretch: -110,
					depth: 460,
					modifier: 1,
					slideShadows: false
				},
			},
			//md
			768 : {
				coverflowEffect: {
					rotate: 0,
					stretch: -30,
					depth: 160,
					modifier: 1,
					slideShadows: false
				},
			},
			//md
			576 : {
				coverflowEffect: {
					rotate: 0,
					stretch: -30,
					depth: 160,
					modifier: 1,
					slideShadows: false
				},
			},
		},

		loop: true,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
		//nav
		navigation: {
			nextEl: $(this).find('.employee-next'),
			prevEl: $(this).find('.employee-prev'),
		},
		//pugination
		pagination: {
			el: $(this).find('.employee-pugin'),
			clickable: true,
		},
	});

	//office slider
	let officeSlider = new Swiper('.office-slider-js', {
		slidesPerView: 'auto',

		breakpoints : {
			992: {
				spaceBetween: 30,
			},
			320: {
				spaceBetween: 20,
			},
		},


		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
		//pugination
		pagination: {
			el: $(this).find('.office-slider-pugin'),
			clickable: true,
		},
	});


	//partners slider
	let partners = new Swiper('.partners-slider-js', {
		slidesPerView: 'auto',
		loop: true,

		breakpoints : {
			992: {
				spaceBetween: 30,
			},
			320: {
				spaceBetween: 25,
			},
		},


		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 7,
		},
		//nav
		navigation: {
			nextEl: $(this).find('.partners-next'),
			prevEl: $(this).find('.partners-prev'),
		},
		//pugination
		pagination: {
			el: $(this).find('.partners-slider-pugin'),
			clickable: true,
		},
	});

	let reviewSlider = new Swiper('.review-slider-js', {
		spaceBetween: 30,
		slidesPerView: 1,
		// grabCursor: true,
		// centeredSlides: true,

		//breakpoints
		breakpoints: {
			//lg
			992 : {
				slidesPerView: 3
			},
			768 : {
				slidesPerView: 2
			},
		},

		loop: true,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
		//nav
		navigation: {
			nextEl: $(this).find('.review-slider-next'),
			prevEl: $(this).find('.review-slider-prev'),
		},
		//pugination
		pagination: {
			el: $(this).find('.review-slider-pugin'),
			clickable: true,
		},
	});


	// rangle sliders for main page
	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
	}

	$(".range-wrap").each(function () {
		let _this = $(this);
		var $range= _this.find(".slider-js");
		var $inputFrom = _this.find(".input_from");
		var $inputTo = _this.find(".input_to");
		var instance, from, to,
			min = $range.data('min'),
			max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;

			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to));
			// InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +($(this).prop("value").replace(/\s/g, ''));
			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val)
		});

		$inputTo.on("change input ", function () {
			var val = +($(this).prop("value").replace(/\s/g, ''));

			// validate
			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});

	});
	// widgets custom js
	$('.pop-up-header-js').click(function () {
		let self = this;
		document.body.removeEventListener('click', widgetsPopupsMissclick);


		$(this).toggleClass('active');
		$(this.parentElement).find('.pop-up-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});

		// close everything but this pop up, dont let to be opened 2 popup at the same time
		if (window.matchMedia("(max-width: 992px)").matches) {
			//self
			let allWidgetsPopups = document.querySelectorAll('.pop-up-wrap-js');
			for (let wrap of allWidgetsPopups){

				let header = wrap.querySelector('.pop-up-header-js');
				let content = wrap.querySelector('.pop-up-content-js');

				if (self !== header){
					$(header).removeClass('active');
					$(content).slideUp(function () {
						$(this).removeClass('active');
					});
				}

			}
		}
		//

		event.stopPropagation();
		document.body.addEventListener('click', widgetsPopupsMissclick);
	});

	//fix
	window.addEventListener('resize', function () {
		if (window.matchMedia("(max-width: 768px)").matches) {
			document.body.removeEventListener('click', widgetsPopupsMissclick);
			openWidgetsPopup();
		}
		else{
			closeWidgetsPopup();
		}

		//
		$('.more-filters-btn-js').removeClass('active');
		$('.more-filters-cont').slideUp();
	});


	function widgetsPopupsMissclick() {
		if (event.target.closest('.pop-up-wrap-js')) return

		closeWidgetsPopup();
		document.body.removeEventListener('click', widgetsPopupsMissclick);
	}

	function closeWidgetsPopup() {
		//close all popups
		let allWidgetsPopups = document.querySelectorAll('.pop-up-wrap-js');
		for (let wrap of allWidgetsPopups){
			let header = wrap.querySelector('.pop-up-header-js');
			let content = wrap.querySelector('.pop-up-content-js');

			$(header).removeClass('active');
			$(content).slideUp(function () {
				$(this).removeClass('active');
			});
		}
	}
	function openWidgetsPopup() {
		//close all popups
		let allWidgetsPopups = document.querySelectorAll('.pop-up-wrap-js');
		for (let wrap of allWidgetsPopups){
			let header = wrap.querySelector('.pop-up-header-js');
			let content = wrap.querySelector('.pop-up-content-js');

			$(header).addClass('active');
			$(content).slideDown(function () {
				$(this).addClass('active');
			});
		}
	}
	//for more filters btn
	$('.more-filters-btn-js').click(function () {
		event.preventDefault();
		$(this).toggleClass('active');
		$('.more-filters-cont').slideToggle();
	})

	//multiple select
	$('.multiple-select-js').select2({
		dropdownCssClass: "checkbox-list",
	});

	//prod card slider
	let prodCardThumb = new Swiper('.prod-card-thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 10,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 9,
		},
	});

	let prodCardSlider = new Swiper('.prod-card-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,

		//
		navigation: {
			nextEl: '.prod-card-next',
			prevEl: '.prod-card-prev',
		},
		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
		//pagination
		pagination: {
			el: $(this).find('.prod-card-pugin-js'),
			clickable: true,
		},
	});
	//popular slider
	let popularSlider = new Swiper('.popular-objects-slider', {
		spaceBetween: 30,
		slidesPerView: 'auto',

		//loop: true,
		//nav
		navigation: {
			nextEl: $(this).find('.popular-slider-next'),
			prevEl: $(this).find('.popular-slider-prev'),
		},
		//pugination
		pagination: {
			el: $(this).find('.popular-slider-pugin'),
			clickable: true,
		},
	});
	//calc credit js
	$('.credit-show-js, .credit-hide-js').click(function () {
		$('.credit-block-js, .credit-show-js').slideToggle(function () {
			$(this).toggleClass('visiable');
		});
	});

	//range
	$(".range-slider-single-js").ionRangeSlider({
		skin: "round",
		//type: "double",
		grid: false,
		grid_snap: false,
		hide_min_max: true,
		//hide_from_to: true,
		//onStart: updateInputs,
		//onChange: updateInputs,
		//onFinish: updateInputs
	});
	//instance = $range.data("ionRangeSlider");

	//11,12 .examples-slider-js
	let examplesThumb = new Swiper('.examples-thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 30,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 9,
		},
	});

	let examplesSlider = new Swiper('.examples-slider-js', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,

		//
		navigation: {
			nextEl: '.examples-next',
			prevEl: '.examples-prev',
		},
		thumbs: {
			swiper: examplesThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
		//pagination
		pagination: {
			el: $(this).find('.example-pugin'),
			clickable: true,
		},
	});
	//scroll-vanilla-js
	function smoothScroll(qSelector){
		let elements = document.querySelectorAll(qSelector);
		if (elements.length === 0) return

		for (let elem of elements){
			elem.addEventListener('click', function () {
				event.preventDefault();
				let destinyID = this.getAttribute('href'); //this.attributes.href.nodeValue

				let destinyElem = document.querySelector(destinyID);
				if (!destinyElem) return

				let destinyTop = getCoords(destinyElem).top;

				window.scrollTo({
					top: destinyTop - 100, //consider top nav height
					behavior: "smooth"
				});

			});
		}
	}
	smoothScroll('.scroll-vanilla-js');
	function getCoords(elem) { // crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}


	//prod card description js
	$('.read-more-btn-js').click(function () {
		$(this).fadeOut(function () {
			$('.desctiption-txt-js').addClass('active');
		})
	});


	//your city js
	$('.location-link-js').click(function () {
		//prevent multiple listeners
		document.body.removeEventListener('click', locationPupUpMissclick);

		//regular toggle
		$(this.parentElement).find('.your-city').fadeToggle(function () {
			$(this).toggleClass('active');
		});

		//tiny bug fix
		event.stopPropagation();

		//close on missclick
		document.body.addEventListener('click', locationPupUpMissclick);
	});

	//close on btn clicks
	$('.your-city__yes-btn, .your-city__no-btn').click(function () {

		$(this.closest('.your-city')).fadeOut(function () {
			$(this).removeClass('active');
		});
	})

	//close on missclick
	function locationPupUpMissclick(){
		if (!event.target.closest('.your-city')) {
			document.body.removeEventListener('click', locationPupUpMissclick);

			closeAllLocationPopUps();
		}
	}

	//close on resize, scroll
	window.addEventListener('resize', closeAllLocationPopUps, {passive: true});
	window.addEventListener('scroll', closeAllLocationPopUps, {passive: true});
	function closeAllLocationPopUps() {
		$('.your-city').fadeOut(function () {
			$(this).removeClass('active');
		});
	}


	//end luckyone JS

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
