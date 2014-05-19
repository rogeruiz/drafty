To Stick Or To Bullshit
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
  titlePosition = (scrollY > -1) ? (titleY - scrollY) : titleY;
  isVisible = (titlePosition < (containerHeight + scrollY));
});

```

###### Affixing titles to the scroll y position
```js
$title.css({
  position: 'fixed',
  top: titlePosition,
  left: 0,
  zIndex: currentZIndex++
});
```
