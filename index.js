// ES5 style
(function () {
	'use strict';

	var placeholderImage = 'https://lh3.googleusercontent.com/Dl1P4zNfAfr4EsU-mLYhYGSmhYZIM190rccSnnUQr6m3tRqsDL1owHgLor30O3Mk4e0=w100-rw',
		adContainer = document.getElementById('ad');

	function createAdImage(src) {
		var image = new Image();
		image.src = src;
		image.className = 'ad-image';
		return image;
	}

	function createDonwloadBtn(href) {
		var button = document.createElement('a');
		button.href = href;
		button.textContent = 'Download';
		button.className = 'ad-download'
		return button;
	}

	function createTitle(titleText) {
		var title = document.createElement('div');
		title.textContent = titleText;
		return title;
	}

	function createFooter(options) {
		var footer = document.createElement('footer');
		var downloadBtn = createDonwloadBtn(options.downloadHref);
		var title = createTitle(options.title);
		var description = createTitle(options.description);

		title.className = 'ad-title';
		description.className = 'ad-description';

		footer.append(downloadBtn);
		footer.append(title);
		footer.append(description);

		return footer;
	}

	function createStyles() {
		var link = document.createElement('link');

		link.rel = 'stylesheet';
		// could be CDN
		link.href = './styles.css';

		return link;
	}

	function createAd(options) {
		var image = createAdImage(options.src);
		var styles = createStyles();

		adContainer.innerHTML = '';

		document.documentElement.firstElementChild.append(styles);
		// If there is an issue with getting image - put placeholder
		image.onerror = function(e) {
			e.target.src = placeholderImage;
		};
		styles.onload = function() {
			var o = {
				downloadHref: options.downloadHref,
				title: options.title,
				description: options.description,
				image: image
			};
			appendAd(o);
		};
	}

	function appendAd(options) {
		var footer = createFooter(options);
		adContainer.append(options.image);
		adContainer.append(footer);
	}

	createAd({
		src: 'https://lh3.googleusercontent.com/i4k5nBnHP35uPXKIqGLu7Gv9F7X4_9kJByL-jKUzO8agGJ4QGa2AGpJYIWe07GE81Z4=w100-rw',
		downloadHref: 'https://play.google.com/store/apps/details?id=com.halfbrick.jetpackjoyride',
		title: 'Jetpack Joyride',

		description: 'Bullet-powered jetpacks! \
		 Giant mechanical dragons! Birds that poop money! \
		  Suit up with a selection of the coolest jetpacks ever made and test \
		   your skills as legendary action hero Barry Steakfries.'
	});

	// providing global API for easy testing
	window.createAd = createAd;
})();


































