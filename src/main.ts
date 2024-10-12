import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Global variables for buttons and pat counting
let head_pat: number = 0;
let upgrade_level: number = 0;
let belly_rubs: number = 0;
let chew_toys: number = 0;
let treats: number = 0;

let Belly_inflation: number = 1;
let Toy_inflation: number = 1;
let Treat_inflation: number = 1;

const how_many_pats = document.createElement("div");
const what_lvl = document.createElement("div");
const BR_lvl = document.createElement("div");
const TY_lvl = document.createElement("div");
const TrT_lvl = document.createElement("div");

const btn = document.createElement("button");
const Belly_btn = document.createElement("button");
const Toy_btn = document.createElement("button");
const Treat_btn = document.createElement("button");

function Game_setup() {
  //Button Settings
  btn.textContent = "🐶";

  //Upgrade Belly Button Settings
  Belly_btn.textContent = "👋 Belly Rubs 👋";
  Belly_btn.disabled = true;

  //Upgrade Toy Button Settings
  Toy_btn.textContent = "🦠 Chew Toys 🦠";
  Toy_btn.disabled = true;

  //Upgrade Treats Button Settings
  Treat_btn.textContent = "🦴 Treats 🦴";
  Treat_btn.disabled = true;

  //Counter Settings
  how_many_pats.style.marginTop = "20px";
  how_many_pats.style.fontSize = "18px";

  //Upgrade level Settings
  what_lvl.style.marginTop = "20px";
  what_lvl.style.fontSize = "18px";

  //toy level Settings
  TY_lvl.style.marginTop = "20px";
  TY_lvl.style.fontSize = "18px";

  //Belly level Settings
  BR_lvl.style.marginTop = "20px";
  BR_lvl.style.fontSize = "18px";

  //Treat Level Settings
  TrT_lvl.style.marginTop = "20px";
  TrT_lvl.style.fontSize = "18px";

  Count_display(); //Inital value -> 0

  document.body.appendChild(btn);
  document.body.appendChild(Belly_btn);
  document.body.appendChild(Toy_btn);
  document.body.appendChild(Treat_btn);
  document.body.appendChild(how_many_pats);
  document.body.appendChild(what_lvl);
  document.body.appendChild(BR_lvl);
  document.body.appendChild(TY_lvl);
  document.body.appendChild(TrT_lvl);
}

function Count_display() {
  how_many_pats.textContent = `${Math.floor(head_pat)} head pats for the Goodest Boy Ever`;
  what_lvl.textContent = `${upgrade_level} head pats/sec`;
  BR_lvl.textContent = `${Math.floor(belly_rubs)} bellys rubbed`;
  TY_lvl.textContent = `${Math.floor(chew_toys)} chew toys chewed`;
  TrT_lvl.textContent = `${Math.floor(treats)} treats eaten`;
}

function Count_Behavior() {
  let start = 0;

  function updateCounter(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    const time_passed = timestamp - start;
    const increase = (time_passed / 1000) * upgrade_level;

    head_pat += increase;
    Count_display();

    if (Math.floor(head_pat) >= 10 * Belly_inflation) {
      Belly_btn.disabled = false;
    } else {
      Belly_btn.disabled = true;
    }

    if (Math.floor(head_pat) >= 100 * Toy_inflation) {
      Toy_btn.disabled = false;
    } else {
      Toy_btn.disabled = true;
    }

    if (Math.floor(head_pat) >= 1000 * Treat_inflation) {
      Treat_btn.disabled = false;
    } else {
      Treat_btn.disabled = true;
    }

    start = timestamp;

    requestAnimationFrame(updateCounter);
  }

  //Frame increments
  requestAnimationFrame(updateCounter);
}

function ButtonBehvior() {
  //Headpat button
  btn.addEventListener("click", () => {
    head_pat++;
    Count_display();
  });

  //Upgrade Belly Button
  Belly_btn.addEventListener("click", () => {
    Upgrades(10, Belly_inflation, 0.5, Belly_btn);
    Belly_inflation *= 1.15;
    belly_rubs++;
  });

  //Upgrade Toy Button
  Toy_btn.addEventListener("click", () => {
    Upgrades(100, Toy_inflation, 5, Toy_btn);
    Toy_inflation *= 1.5;
    chew_toys++;
  });

  //Upgrade Treats Button
  Treat_btn.addEventListener("click", () => {
    Upgrades(1000, Treat_inflation, 50, Treat_btn);
    Treat_inflation *= 1.7;
    treats++;
  });
}

function Upgrades(
  cost: number,
  inflation: number,
  boost: number,
  button_type: HTMLButtonElement,
) {
  if (Math.floor(head_pat) >= cost * inflation) {
    head_pat -= cost * inflation;
    upgrade_level += boost;
    //inflation *= inf_rate;

    Count_display();

    button_type.disabled = Math.floor(head_pat) >= cost * inflation;
  }
}

document.addEventListener("DOMContentLoaded", Game_setup);
document.addEventListener("DOMContentLoaded", Count_Behavior);
document.addEventListener("DOMContentLoaded", ButtonBehvior);
