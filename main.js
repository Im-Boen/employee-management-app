// ================================================================
//  Employee Management System — main.js
//  Shared utilities: navbar toggle, toast notifications
// ================================================================

// ── Hamburger / Mobile Nav ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
});

// ── Toast Notifications ───────────────────────────────────────
/**
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} title
 * @param {string} [message]
 * @param {number} [duration=3500]
 */
function showToast(type, title, message, duration) {
  duration = duration || 3500;
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: '<i class="fa-solid fa-circle-check" style="color:var(--green)"></i>',
    error:   '<i class="fa-solid fa-circle-xmark" style="color:var(--red)"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation" style="color:var(--amber)"></i>',
    info:    '<i class="fa-solid fa-circle-info" style="color:var(--blue-muted)"></i>'
  };

  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML =
    '<span class="toast-icon">' + (icons[type] || icons.info) + '</span>' +
    '<div class="toast-body">' +
      '<div class="toast-title">' + title + '</div>' +
      (message ? '<div class="toast-msg">' + message + '</div>' : '') +
    '</div>' +
    '<button class="toast-close" onclick="this.parentElement.remove()">' +
      '<i class="fa-solid fa-xmark"></i>' +
    '</button>';

  container.appendChild(toast);

  setTimeout(function () {
    toast.style.animation = 'toastOut 0.25s ease forwards';
    setTimeout(function () { toast.remove(); }, 250);
  }, duration);
}
