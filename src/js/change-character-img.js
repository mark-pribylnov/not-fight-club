"use strict";

import { hideShowModal } from "./modal-show-hide.js";

const CURRENT_IMG = document.querySelector(".js-current-character-img");
const ALL_IMAGES = [...document.querySelectorAll(".characters-modal img")];

(function loadImg() {
  const savedImg = localStorage.getItem("currentCharacterImgPath");

  if (savedImg) {
    CURRENT_IMG.setAttribute("src", savedImg);
  }
})();

function changeImg(img) {
  const src = img.getAttribute("src");
  CURRENT_IMG.setAttribute("src", src);

  localStorage.setItem("currentCharacterImgPath", src);
}

ALL_IMAGES.forEach(img => {
  img.addEventListener("click", () => {
    changeImg(img);
    hideShowModal();
  });
});

// CURRENT_IMG.click();
