"use strict";
const DEFENCE_ZONES = [...document.querySelectorAll("input[name='defence-zone']")];
const ATTACK_BTN = document.querySelector(".js-attack-btn");

(function pick_enemy_on_load() {
  const enemy_img = document.querySelector(".js-enemy-img");
  const enemy_name = document.querySelector(".js-enemy-name");
  const max_health = document.querySelector(".js-enemy-max-health");
  const current_health = document.querySelector(".js-enemy-current-health");

  const enemies = {
    Galactus: { imgPath: "../../assets/img/enemies/enemy1.webp", health: 100 },
    Thanos: { imgPath: "../../assets/img/enemies/enemy2.webp", health: 111 },
    "Snow Troll": { imgPath: "../../assets/img/enemies/enemy3.jpg", health: 102 },
    Saruman: { imgPath: "../../assets/img/enemies/enemy4.jpg", health: 113 },
    Joker: { imgPath: "../../assets/img/enemies/enemy5.jpg", health: 104 },
    Octopus: { imgPath: "../../assets/img/enemies/enemy6.jpg", health: 115 },
    Goblin: { imgPath: "../../assets/img/enemies/enemy7.webp", health: 106 },
    Lizard: { imgPath: "../../assets/img/enemies/enemy8.jpg", health: 117 },
    Sandman: { imgPath: "../../assets/img/enemies/enemy9.jpg", health: 108 },
  };

  const enemies_keys = Object.keys(enemies);
  const random_name = enemies_keys[getRandomNumber(0, enemies_keys.length - 1)];
  const imgPath = enemies[random_name].imgPath;
  const health = enemies[random_name].health;

  enemy_img.setAttribute("src", imgPath);
  enemy_name.innerText = random_name;
  max_health.innerText = health;
  current_health.innerText = Math.ceil(health / 2);
})();

(function prevent_third_defence_zone() {
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

function check_number_of_defence_zones() {
  const counter = DEFENCE_ZONES.filter(input => input.checked).length;

  if (counter < 2) {
    ATTACK_BTN.setAttribute("disabled", "");
  } else {
    ATTACK_BTN.removeAttribute("disabled");
  }

  // console.log(counter);
}
check_number_of_defence_zones();

function attack() {
  const zones = {
    head: {
      damage: 5,
    },
    neck: {
      damage: 4,
    },
    body: {
      damage: 3,
    },
    belly: {
      damage: 2,
    },
    legs: {
      damage: 1,
    },
  };
}

ATTACK_BTN.addEventListener("click", () => {
  attack();
});

DEFENCE_ZONES.forEach(input => {
  input.addEventListener("click", () => {
    check_number_of_defence_zones();
  });
});

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
