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
//let upgrade_cost: number = 10;
let upgrade_inflation: number = 1;
const how_many_pats = document.createElement("div");
const btn = document.createElement("button");
const upg_btn = document.createElement("button");

function Game_setup() {
  //Button Settings
  btn.textContent = "🐶";

  //Upgrade Button Settings
  upg_btn.textContent = "🦴 Extra Treats 🦴";
  upg_btn.disabled = true;
  /*upg_btn.style.position = 'absolute';
  upg_btn.style.bottom = "200px";*/

  //Counter Settings
  how_many_pats.style.marginTop = "20px";
  how_many_pats.style.fontSize = "18px";

  Count_display(); //Inital value -> 0

  document.body.appendChild(btn);
  document.body.appendChild(upg_btn);
  document.body.appendChild(how_many_pats);
}

function Count_display() {
  how_many_pats.textContent = `${Math.floor(head_pat)} head pats for the goodest boy ever`;
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

    if (Math.floor(head_pat) >= 10 * upgrade_inflation) {
      upg_btn.disabled = false;
    } else {
      upg_btn.disabled = true;
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

  //Upgrade Button
  upg_btn.addEventListener("click", () => {
    if (Math.floor(head_pat) >= 10 * upgrade_inflation) {
      head_pat -= 10 * upgrade_inflation;
      upgrade_level++;
      //upgrade_cost *= u;
      upgrade_inflation *= 1.5;

      Count_display();

      upg_btn.disabled = Math.floor(head_pat) < 10 * upgrade_inflation;
    }
  });
}

document.addEventListener("DOMContentLoaded", Game_setup);
document.addEventListener("DOMContentLoaded", Count_Behavior);
document.addEventListener("DOMContentLoaded", ButtonBehvior);
