"use strict";

(function pick_enemy_on_load() {
  const enemy_img = document.querySelector(".js-enemy-img");
  const enemy_name = document.querySelector(".js-enemy-name");

  const enemies = {
    Galactus: { imgPath: "../../assets/img/enemies/enemy1.webp" },
    Thanos: { imgPath: "../../assets/img/enemies/enemy2.webp" },
    "Snow Troll": { imgPath: "../../assets/img/enemies/enemy3.jpg" },
    Saruman: { imgPath: "../../assets/img/enemies/enemy4.jpg" },
    Joker: { imgPath: "../../assets/img/enemies/enemy5.jpg" },
    Octopus: { imgPath: "../../assets/img/enemies/enemy6.jpg" },
    Goblin: { imgPath: "../../assets/img/enemies/enemy7.webp" },
    Lizard: { imgPath: "../../assets/img/enemies/enemy8.jpg" },
    Sandman: { imgPath: "../../assets/img/enemies/enemy9.jpg" },
  };

  const enemies_keys = Object.keys(enemies);
  const random_name = enemies_keys[getRandomNumber(0, enemies_keys.length - 1)];
  const imgPath = enemies[random_name].imgPath;

  enemy_img.setAttribute("src", imgPath);
  enemy_name.innerText = random_name;
})();

(function prevent_third_defence_zone() {
  const DEFENCE_ZONES = [...document.querySelectorAll("input[name='defence-zone']")];
  function check_marked_defence_zones(e) {
    let counter = 0;

    for (const input of DEFENCE_ZONES) {
      if (input.checked) {
        counter += 1;
      }
      if (counter === 3) {
        e.preventDefault();
        return;
      }
    }
  }

  DEFENCE_ZONES.forEach(input => {
    input.addEventListener("click", function (e) {
      check_marked_defence_zones(e);
    });
  });
})();

//
//
//
//
//
//
//
//
//
//
//
//
//
//

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
