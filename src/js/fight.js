"use strict";
const DEFENCE_ZONES = [...document.querySelectorAll("input[name='defence-zone']")];
const ATTACK_BTN = document.querySelector(".js-attack-btn");
const LOG_SCREEN = document.querySelector(".js-log-screen");
const zones = {
  head: {
    damage: 10,
  },
  neck: {
    damage: 8,
  },
  body: {
    damage: 6,
  },
  belly: {
    damage: 4,
  },
  legs: {
    damage: 2,
  },
};

function get_selected_zones() {
  const attack_zone = document.querySelector("input[name='attack-zone']:checked").previousElementSibling.innerText.toLowerCase();

  const defence_zones = [...document.querySelectorAll("input[name='defence-zone']:checked")].map(zone => {
    return zone.nextElementSibling.innerText.toLowerCase();
  });

  return [attack_zone, defence_zones];
}

(function pick_enemy_on_load() {
  const enemy_img = document.querySelector(".js-enemy-img");
  const enemy_name = document.querySelector(".js-enemy-name");
  const max_health = document.querySelector(".js-enemy-max-health");
  const current_health = document.querySelector(".js-enemy-current-health");

  const enemies = {
    Galactus: { imgPath: "../../not-fight-club/assets/img/enemies/enemy1.webp", health: 100 },
    Thanos: { imgPath: "../../not-fight-club/assets/img/enemies/enemy2.webp", health: 111 },
    "Snow Troll": { imgPath: "../../not-fight-club/assets/img/enemies/enemy3.jpg", health: 102 },
    Saruman: { imgPath: "../../not-fight-club/assets/img/enemies/enemy4.jpg", health: 113 },
    Joker: { imgPath: "../..not-fight-club//assets/img/enemies/enemy5.jpg", health: 104 },
    Octopus: { imgPath: "../../not-fight-club/assets/img/enemies/enemy6.jpg", health: 115 },
    Goblin: { imgPath: "../../not-fight-club/assets/img/enemies/enemy7.webp", health: 106 },
    Lizard: { imgPath: "../../not-fight-club/assets/img/enemies/enemy8.jpg", health: 117 },
    Sandman: { imgPath: "../../not-fight-club/assets/img/enemies/enemy9.jpg", health: 108 },
  };

  const enemies_keys = Object.keys(enemies);
  const random_name = enemies_keys[getRandomNumber(0, enemies_keys.length - 1)];
  const imgPath = enemies[random_name].imgPath;
  const health = enemies[random_name].health;

  enemy_img.setAttribute("src", imgPath);
  enemy_name.innerText = random_name;
  max_health.innerText = health;
  current_health.innerText = health;
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
  (function hit_enemy() {
    const attack_zone = get_selected_zones()[0];
    const defence_zones = get_selected_zones()[1];

    const damage = zones[attack_zone].damage;

    (function log_player_attack() {
      const attacker = localStorage.getItem("characterName");
      const defender = document.querySelector(".js-enemy-name").innerText;

      const sentence = `<p class="log-paragraph"><span class="log-key-words--player">${attacker}</span> attacked <span class="log-key-words--player">${defender}</span> to <span class="log-key-words--player">${attack_zone}</span> and deal <span class="log-damage">${damage} damage</span></p>`;
      LOG_SCREEN.appendChild(elementFromHtml(sentence));
    })();

    (function update_enemy_health_points() {
      const points_enemy = document.querySelector(".js-enemy-current-health");
      const points_left = (points_enemy.innerText -= damage);

      points_enemy.innerText = points_left < 0 ? 0 : points_left;
    })();

    (function update_enemy_health_bar() {
      // const bar_player = document.querySelector(".js-current-health-bar");
      const bar_enemy = document.querySelector(".js-current-health-bar-enemy");

      // const points_player = document.querySelector(".js-player-current-health");
      const current_points_enemy = document.querySelector(".js-enemy-current-health").innerText;
      const max_points_enemy = document.querySelector(".js-enemy-max-health").innerText;
      const percents_left_enemy = document.querySelector(".js-percents-left-enemy");

      const percents_left = Math.round((current_points_enemy / max_points_enemy) * 100);
      percents_left_enemy.innerText = percents_left < 0 ? `0 %` : `${percents_left} %`;

      bar_enemy.style.width = percents_left < 0 ? `0` : `${percents_left}%`;
    })();
  })();
  (function hit_player() {
    const attack_zone = Object.keys(zones)[getRandomNumber(0, Object.keys(zones).length - 1)];
    const defence_zones = [
      Object.keys(zones)[getRandomNumber(0, Object.keys(zones).length - 1)],
      Object.keys(zones)[getRandomNumber(0, Object.keys(zones).length - 1)],
    ];

    const damage = zones[attack_zone].damage;

    const player_defence_zones = get_selected_zones()[1];
    // console.log(player_defence_zones);
    // const defence_zones = get_selected_zones()[1];

    (function log_enemy_attack() {
      const attacker = document.querySelector(".js-enemy-name").innerText;
      const defender = localStorage.getItem("characterName");

      const sentence = `<p class="log-paragraph"><span class="log-key-words--enemy">${attacker}</span> attacked <span class="log-key-words--enemy">${defender}</span> to <span class="log-key-words--enemy">${attack_zone}</span> and deal <span class="log-damage">${damage} damage</span></p>`;
      LOG_SCREEN.appendChild(elementFromHtml(sentence));
      LOG_SCREEN.appendChild(elementFromHtml("<p>---</p>"));

      scroll_down();
    })();

    (function log_player_defence() {})();

    (function update_player_health_points() {
      const points_player = document.querySelector(".js-player-current-health");
      const points_left = (points_player.innerText -= damage);

      points_player.innerText = points_left < 0 ? 0 : points_left;
    })();

    (function update_player_health_bar() {
      // const bar_player = document.querySelector(".js-current-health-bar");
      const bar_player = document.querySelector(".js-current-health-bar-player");

      // const points_player = document.querySelector(".js-player-current-health");
      const current_points_player = document.querySelector(".js-player-current-health").innerText;
      const max_points_player = document.querySelector(".js-player-max-health").innerText;
      const percents_left_player = document.querySelector(".js-percents-left-player");

      const percents_left = Math.round((current_points_player / max_points_player) * 100);
      percents_left_player.innerText = percents_left < 0 ? `0 %` : `${percents_left} %`;

      bar_player.style.width = percents_left < 0 ? `0` : `${percents_left}%`;
    })();
  })();
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

function elementFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function scroll_down() {
  LOG_SCREEN.scrollTop = LOG_SCREEN.scrollHeight;
}
