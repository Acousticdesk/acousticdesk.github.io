# acousticdesk.github.io
Animated fullscreen mobile ad, that contains logo, download btn, title and description - [Live demo](https://acousticdesk.github.io/)

## API
**createAd** - global function

### Usage

Open your browser console and create new ads, using this method:

```javascript
createAd({
  src: 'https://path-to-pic.com',
  downloadHref: 'https://path-to-app.com',
  title: 'Some Title',
  description: 'Some Description'
});
```

Check responsiveness with built-in Chrome Device Toggler

### Additional features

If broken link would be passed to src, image will be replaced with placeholder text, that will be equal to **options.title**
