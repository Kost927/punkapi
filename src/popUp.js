import refs from "./refs.js";
import { IS_OPEN, VISIBLE } from "./constants.js";

export const modalModule = (markup, listeners) => {
  function openBackdrop() {
    refs.lightbox.classList.add(IS_OPEN);
    refs.body.style.overflow = "hidden";
    refs.backdrop.style.overflow = "scroll";
  }

  refs.backdrop.addEventListener("click", ({ target, currentTarget }) => {
    if (target === currentTarget || target.classList.contains("close-icon") || target.classList.contains("icon-wrapper")) {
      closeBackdrop();
    }
  });

  function closeBackdrop() {
    refs.lightbox.classList.remove(IS_OPEN);
    refs.body.style.overflow = VISIBLE;
    refs.backdrop.style.overflow = VISIBLE;
  }

  window.addEventListener("keydown", ({ code }) => {
    if (code === "Escape") {
      closeBackdrop();
    }
  });

  openBackdrop();

  const modalContent = document.querySelector(".modal-wrapper");

  modalContent.innerHTML = markup();
};
