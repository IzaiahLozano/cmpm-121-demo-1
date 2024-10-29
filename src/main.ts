import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let totalPats: number = 0;
let PatsPerSec: number = 0;

interface Item {
  upg_name: string;
  cost: number;
  boost: number;
  inf_rate: number;
  inflation: number;
  purchases: number;
  disabled: boolean;
  description: string;
  button?: HTMLButtonElement;
}

const multipliers: Item[] = [
  {
    upg_name: "👋 Belly Rubs 👋",
    cost: 10,
    boost: 0.5,
    inf_rate: 1.15,
    inflation: 1,
    purchases: 0,
    disabled: true,
    description: "What's better than a head pat? BELLY RUBS!"
  },
  {
    upg_name: "🦠 Chew Toys 🦠",
    cost: 100,
    boost: 5,
    inf_rate: 1.5,
    inflation: 1,
    purchases: 0,
    disabled: true,
    description: "Better than your shoes"
  },
  {
    upg_name: "🦴 Treats 🦴",
    cost: 1000,
    boost: 50,
    inf_rate: 1.7,
    inflation: 1,
    purchases: 0,
    disabled: true,
    description: "What's a Good Boy without some Good Treats"
  },
  {
    upg_name: "🥏 Play Catch 🥏",
    cost: 10000,
    boost: 500,
    inf_rate: 1.9,
    inflation: 1,
    purchases: 0,
    disabled: true,
    description: "THROW THE FRISBEE ALREADY!"
  },
  {
    upg_name: "🚶🏽‍♂️ Go for a Walk 🚶🏽‍♂️",
    cost: 100000,
    boost: 1000,
    inf_rate: 2.2,
    inflation: 1,
    purchases: 0,
    disabled: true,
    description: "Even Good Boys needa touch grass sometimes"
  },
];

const how_many_pats = document.createElement("div");
const what_lvl = document.createElement("div");
const BellyRub_lvl = document.createElement("div");
const Toy_lvl = document.createElement("div");
const Treat_lvl = document.createElement("div");
const Catch_lvl = document.createElement("div");
const Walk_lvl = document.createElement("div");
const btn_shell = document.createElement("div");

function GameUI_Setup() {

  const DisplayTextSize = "18px";
  const BtnTextSize = "10px"
  const MarginTopDifference = "20px"

  //Counter Settings
  how_many_pats.style.marginTop = MarginTopDifference;
  how_many_pats.style.fontSize = DisplayTextSize;

  //Upgrade level Settings
  what_lvl.style.marginTop = MarginTopDifference;
  what_lvl.style.fontSize = DisplayTextSize;

  //toy level Settings
  Toy_lvl.style.marginTop = MarginTopDifference;
  Toy_lvl.style.fontSize = BtnTextSize;

  //Belly level Settings
  BellyRub_lvl.style.marginTop = MarginTopDifference;
  BellyRub_lvl.style.fontSize = BtnTextSize;

  //Treat Level Settings
  Treat_lvl.style.marginTop = MarginTopDifference;
  Treat_lvl.style.fontSize = BtnTextSize;

  //Catch Level Settings
  Catch_lvl.style.marginTop = MarginTopDifference;
  Catch_lvl.style.fontSize = BtnTextSize;

  //Walk Level Settings
  Walk_lvl.style.marginTop = MarginTopDifference;
  Walk_lvl.style.fontSize = BtnTextSize;

  //Hover Message Settings
  const descriptionDisplay = document.createElement("div");
  descriptionDisplay.style.marginTop = MarginTopDifference;
  descriptionDisplay.style.fontSize = DisplayTextSize;
  document.body.appendChild(descriptionDisplay);


  //Main Button Settings
  const Pat_btn = document.createElement("button");
  Pat_btn.textContent = "🐶";
  Pat_btn.classList.add("main-button");

  //Main Button Behavior
  Pat_btn.addEventListener("click", () => {
    totalPats++;
    UpdatePatDisplay();
  });

  //Upgrade Button Factory:
  multipliers.forEach((item) => {
    const btn_type = document.createElement("button");
    btn_type.textContent = `${item.upg_name} - Cost: ${Math.floor(item.cost * item.inflation)}`;
    btn_type.classList.add("upgrade-button", "tooltip");
    btn_type.disabled = true;
    btn_shell.appendChild(btn_type);

    item.button = btn_type;

    // Create the tooltip container
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    const tooltipText = document.createElement("span");
    tooltipText.classList.add("tooltiptext");
    tooltipText.textContent = item.description;

    // Add tooltip to button
    btn_type.appendChild(tooltip);
    tooltip.appendChild(tooltipText);

    //Main Button Behavior
    btn_type.addEventListener("click", () => {
      Upgrades(item);
    });
  });

  UpdatePatDisplay(); //Inital value -> 0

  document.body.appendChild(Pat_btn);
  document.body.appendChild(how_many_pats);
  document.body.appendChild(what_lvl);
  document.body.appendChild(btn_shell);
  document.body.appendChild(BellyRub_lvl);
  document.body.appendChild(Toy_lvl);
  document.body.appendChild(Treat_lvl);
  document.body.appendChild(Catch_lvl);
  document.body.appendChild(Walk_lvl);

  // Initialize messages for purchase counts
  BellyRub_lvl.textContent = "0 belly rubs given";
  Toy_lvl.textContent = "0 chew toys chewed";
  Treat_lvl.textContent = "0 treats eaten";
  Catch_lvl.textContent = "0 games of catch played";
  Walk_lvl.textContent = "0 walks around town";
}

function UpdatePatDisplay() {
  how_many_pats.textContent = `${Math.floor(totalPats)} head pats for the Goodest Boy Ever`;
  what_lvl.textContent = `${PatsPerSec} head pats/sec`;
}

function Upgrades(item: Item) {
  if (totalPats >= item.cost * item.inflation) {
    totalPats -= item.cost * item.inflation;
    PatsPerSec += item.boost;

    item.inflation *= item.inf_rate;
    item.purchases++;

    UpdatePatDisplay();

    // Update messages for purchase counts
    if (item.upg_name === "👋 Belly Rubs 👋") {
      BellyRub_lvl.textContent = `${item.purchases} belly rubs given`;
    } else if (item.upg_name === "🦠 Chew Toys 🦠") {
      Toy_lvl.textContent = `${item.purchases} chew toys chewed`;
    } else if (item.upg_name === "🦴 Treats 🦴") {
      Treat_lvl.textContent = `${item.purchases} treats eaten`;
    } else if (item.upg_name === "🥏 Play Catch 🥏") {
      Catch_lvl.textContent = `${item.purchases} games of catch played`;
    } else if (item.upg_name === "🚶🏽‍♂️ Go for a Walk 🚶🏽‍♂️") {
      Walk_lvl.textContent = `${item.purchases} walks around town`;
    }

    // Update button text with new inflated cost
    item.button!.textContent = `${item.upg_name} - Cost: ${Math.floor(item.cost * item.inflation)}`;

    item.disabled = Math.floor(totalPats) >= item.cost * item.inflation;
  }
}

function PatCount_Behavior() {
  let start = 0;

  function Update_Count(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    const time_passed = timestamp - start;
    const increase = (time_passed / 1000) * PatsPerSec;

    totalPats += increase;
    UpdatePatDisplay();

    multipliers.forEach((item) => {
      if (Math.floor(totalPats) >= item.cost * item.inflation) {
        item.button!.disabled = false;
      } else {
        item.button!.disabled = true;
      }
    });

    start = timestamp;

    requestAnimationFrame(Update_Count);
  }

  //Frame increments
  requestAnimationFrame(Update_Count);
}

document.addEventListener("DOMContentLoaded", GameUI_Setup);
document.addEventListener("DOMContentLoaded", PatCount_Behavior);
