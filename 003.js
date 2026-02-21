
// Click + hover tilt movement effect for tracks
document.addEventListener('DOMContentLoaded', function () {
  const tracks = document.querySelectorAll('.track');

  function setVars(el, rx, ry, tx, scale) {
    el.style.setProperty('--rx', rx + 'deg');
    el.style.setProperty('--ry', ry + 'deg');
    el.style.setProperty('--tx', tx + 'px');
    el.style.setProperty('--scale', scale);
  }

  tracks.forEach((t) => {
    // Click active pulse
    t.addEventListener('click', (e) => {
      t.classList.add('active');
      setTimeout(() => t.classList.remove('active'), 420);
      const a = t.querySelector('a');
      if (a) a.focus();
    });

    // Tilt on mouse move
    t.addEventListener('mousemove', (ev) => {
      const rect = t.getBoundingClientRect();
      const px = (ev.clientX - rect.left) / rect.width; // 0..1
      const py = (ev.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 8; // rotateX
      const ry = (px - 0.5) * 10; // rotateY
      const tx = (px - 0.5) * 8; // translateX subtle
      setVars(t, rx, ry, tx, 1.02);
    });

    t.addEventListener('mouseleave', () => {
      // reset smoothly
      setVars(t, 0, 0, 0, 1);
    });

    t.addEventListener('mouseenter', () => {
      // slightly lift on enter
      setVars(t, 0, 0, 0, 1.01);
    });
  });
});
