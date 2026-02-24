
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
  (function () {
    const openButton = document.getElementById("openProModal");
    const closeButton = document.getElementById("closeProModal");
    const overlay = document.getElementById("proModalOverlay");

    if (!openButton || !closeButton || !overlay) return;

    const openModal = () => {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    };

    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeModal();
      }
    });
  })();
});
