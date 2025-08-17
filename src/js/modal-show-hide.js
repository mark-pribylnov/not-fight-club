"use strict";

const MODAL_ELEMENT = document.querySelector(".characters-modal");
const OVERLAY = document.querySelector(".overlay");

// const BTN_CLOSE_FORM = document.querySelector(".booking-form__close-btn");
const OPEN_ELEMENT = document.querySelector(".js-current-character-img");

export function hideShowModal() {
  if (MODAL_ELEMENT.classList.contains("characters-modal--is-hidden")) {
    MODAL_ELEMENT.classList.remove("characters-modal--is-hidden");
    OVERLAY.classList.remove("overlay--is-hidden");
    document.querySelector("body").classList.add("stop-scrolling");
  } else {
    MODAL_ELEMENT.classList.add("characters-modal--is-hidden");
    OVERLAY.classList.add("overlay--is-hidden");
    document.querySelector("body").classList.remove("stop-scrolling");

    OVERLAY.removeEventListener("click", hideShowModal);
  }
}

// BTN_CLOSE_FORM.addEventListener("click", hideShowForm);

OPEN_ELEMENT.addEventListener("click", () => {
  hideShowModal();
  OVERLAY.addEventListener("click", hideShowModal);
});

// hideShowModal();
