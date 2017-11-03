// ES5 style
(function () {
	'use strict';

	var adContainer = document.getElementById('ad-acceptic-postfix-9ghc1q'),
		imageTimeoutMS = 1000;

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
		// we can't 
		var imageTimeout;

		options.image = image;

		document.documentElement.firstElementChild.append(styles);
		
		image.onload = function (e) {
			clearTimeout(imageTimeout);
		};
		
		// We can't use this approach, as it implies huge timeout - ~30seconds, that
		// is unaccaptable for banner ad case.

		// image.onerror = function (e) {};

		// If there is an issue with getting image - put placeholder
		styles.onload = function () {
			appendAd(options);
			// If image would not load within 5 sec. - replace it with placeholder
			imageTimeout = setTimeout(
				replaceImageWithPlaceholder.bind(null, image, options.title), 
				imageTimeoutMS
			);
		};
	}

	function replaceImageWithPlaceholder(image, placeholderText) {
		var placeholder = document.createElement('div');
		placeholder.className = 'ad-image';
		placeholder.textContent = placeholderText + ' ' + '👍';
		image.parentElement.prepend(placeholder);
		image.remove();
	}

	function appendAd(options) {
		var footer = createFooter(options);
		adContainer.innerHTML = '';
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


































