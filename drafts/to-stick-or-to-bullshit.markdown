To stick or to bullshit
===

Sticky elements are easier on native devices, and they need to be faked in a
browser. This is just that kind of trickery.

###### Abstract
> Fix the position of titles within the container based on their static position
> in the document. Maintain title's static position when changing it to fixed.
> With the title's x and y coordinates, update it's position to follow the scrollbar.
> The position of the elements are directed by subtracting its current y position
> with the scrollbar position and applying it to the top CSS property.

###### Loop through all the titles and store some helpful data
```js
$titles.each(function (i, el) {
  $title = $(el);
  titleY = $title.offset().top;
  $container = $el.parents('.js-scroll');
  scrollY = $container.scrollTop();
  containerHeight = $container.height();
  titlePosition = (titleY - scrollY);
  isVisible = (titlePosition < (containerHeight + scrollY));
});

```

###### Allowing titles to stick to top
```js
// withinLoop
if (i === 0) {
  $title.css({
    position: 'fixed',
    top: titleY - scrollY,
    zIndex: currentZIndex
  });
}
```

###### Allowing titles to move with the scroll position
```js
// withinLoop
if ($title.offset().top > $('.js-scroll').scrollTop()) {
  $title.css({
    position: 'fixed',
    top: (),
    left: 0,
    zIndex: currentZIndex++
  });
}
```
