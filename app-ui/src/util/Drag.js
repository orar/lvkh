/**
 * A simple drag and drop function. Not used anywhere in the app
 *
 * @deprecated
 * @param onDrag
 * @param onStop
 * @constructor
 */
export function Drag(onDrag, onStop) {
  let startX = 0;
  let startY = 0;
  let el = this;
  let dragging = false;

  function move(e) {
    el.style.left = (e.pageX - startX ) + 'px';
    el.style.top = (e.pageY - startY ) + 'px';
    onDrag && onDrag(el, e.pageX, startX, e.pageY, startY);
  }

  function startDragging(e) {
    if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
      dragging = true;
      var left = el.style.left ? parseInt(el.style.left) : 0;
      var top = el.style.top ? parseInt(el.style.top) : 0;
      startX = e.pageX - left;
      startY = e.pageY - top;
      window.addEventListener('mousemove', move);
    }
    else {
      throw new Error("Your target must be an html element");
    }
  }

  this.addEventListener('mousedown', startDragging);
  window.addEventListener('mouseup', function (e) {
    if (true === dragging) {
      dragging = false;
      window.removeEventListener('mousemove', move);
      onStop && onStop(el, e.pageX, startX, e.pageY, startY);
    }
  });
}

Element.prototype.simpleDrag = Drag;