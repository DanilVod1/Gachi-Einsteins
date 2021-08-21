export default function ScrollZoom(
  container,
  max_scale,
  factor,
  containerWidth,
  containerHeight,
  scalePast = 1
) {
  console.log(scalePast);
  let target = container.firstElementChild;
  let size = { w: target.scrollWidth, h: target.scrollWidth };
  let pos = { x: 0, y: 0 };
  let zoom_target = { x: 0, y: 0 };
  let zoom_point = { x: 0, y: 0 };
  console.log(target.style);
  let scale = scalePast | 1;
  let history = [{ x: 0, y: 0 }];
  let prevX = 0;
  target.style.transformOrigin = '0 0';
  target.addEventListener('mousewheel', scrolled);
  target.addEventListener('DOMMouseScroll', scrolled);
  container.style.width = containerWidth * scale + 'px';
  container.style.height = containerHeight * scale + 'px';
  container.style.top = `calc(50% - ${containerHeight * scale}px / 2) `;
  container.style.left = `calc(50% - ${containerWidth * scale}px / 2) `;
  update();

  function scrolled(e) {
    if (e.shiftKey) {
      let offset = container.getBoundingClientRect();

      zoom_point.x = e.pageX - offset.left;
      zoom_point.y = e.pageY - offset.top;

      e.preventDefault();
      let delta = e.delta || e.wheelDelta;
      if (delta === undefined) {
        //we are on firefox
        delta = e.detail;
      }
      delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

      // determine the point on where the slide is zoomed in
      zoom_target.x = (zoom_point.x - pos.x) / scale;
      zoom_target.y = (zoom_point.y - pos.y) / scale;

      // apply zoom
      scale += delta * factor * scale;
      scale = Math.max(0.1, Math.min(max_scale, scale));
      let scaleMult = scale < 1 ? 1 : scale;
      // calculate x and y based on zoom

      pos.x = -zoom_target.x * scale + zoom_point.x;
      pos.y = -zoom_target.y * scale + zoom_point.y;
      // Make sure the slide stays in its container area when zooming out
      if (pos.x + size.w * scaleMult < size.w)
        pos.x = -size.w * (scaleMult - 1);

      if (pos.y + size.h * scaleMult < size.h)
        pos.y = -size.h * (scaleMult - 1);
      if (pos.x <= 0 && pos.x < prevX) history.push({ x: pos.x, y: pos.y });
      if (pos.x <= 0 && pos.x > prevX) {
        if (history.length >= 2) {
          pos.x = history[history.length - 2]?.x;
          pos.y = history[history.length - 2]?.y;
          history.pop();
        }
      }
      prevX = pos.x;
      update();
    }
  }

  function update() {
    container.style.width = containerWidth * scale + 'px';
    container.style.height = containerHeight * scale + 'px';
    container.style.top = `calc(50% - ${containerHeight * scale}px / 2) `;
    container.style.left = `calc(50% - ${containerWidth * scale}px / 2) `;
    target.style.width = containerWidth;
    target.style.height = containerHeight;
    target.style.transform = ' scale(' + scale + ')';
    return scale;
  }
  return scale;
}
