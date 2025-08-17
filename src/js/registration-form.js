"use strict";
const NAME_INPUT = document.querySelector("#character-name");
const REGISTER_BUTTON = document.querySelector(".registration-form__button");
const CHARACTER_NAME = [...document.querySelectorAll(".js-character-name")];

(function loadName() {
  CHARACTER_NAME.forEach(elem => {
    elem.innerText = localStorage.getItem("characterName");
  });
})();

function changeName() {
  localStorage.setItem("characterName", NAME_INPUT.value);
  CHARACTER_NAME.forEach(elem => {
    elem.innerText = localStorage.getItem("characterName");
  });
}

REGISTER_BUTTON.addEventListener("click", changeName);
