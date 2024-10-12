import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Global variables for buttons and pat counting
/*let head_pat: number = 0;
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
const Treat_btn = document.createElement("button");*/


interface Item{
  upg_name: string;
  cost: number;
  boost: number;
  inf_rate: number;
  inflation: number;
  purchases: number;
  disabled: boolean;
  button? : HTMLButtonElement;
}


const multipliers: Item[] = [
  {upg_name: "👋 Belly Rubs 👋", cost: 10, boost: 0.5, inf_rate: 1.15, inflation: 1, purchases: 0, disabled: true},
  {upg_name: "🦠 Chew Toys 🦠", cost: 100, boost: 5, inf_rate: 1.5, inflation: 1, purchases: 0, disabled: true},
  {upg_name: "🦴 Treats 🦴", cost: 1000, boost: 50, inf_rate: 1.7, inflation: 1, purchases: 0, disabled: true}
]

let head_pat: number = 0;
let pats_per_sec: number = 0;

const how_many_pats = document.createElement("div");
const what_lvl = document.createElement("div");
const BR_lvl = document.createElement("div");
const TY_lvl = document.createElement("div");
const TrT_lvl = document.createElement("div");
const btn_shell = document.createElement("div");



function Game_setup() {

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


  //Main Button Settings
  const Pat_btn = document.createElement("button");
  Pat_btn.textContent = "🐶";

  //Main Button Behavior
  Pat_btn.addEventListener("click", () => {
    head_pat++;
    Count_display();
  })

  //Upgrade Button Factory:
  multipliers.forEach((item) => {
    const btn_type = document.createElement("button");
    btn_type.textContent = `${item.upg_name}`;
    btn_type.disabled = true;
    btn_shell.appendChild(btn_type);

    item.button = btn_type;

    //Behavior
    btn_type.addEventListener("click", () => {
      Upgrades(item);
    });


  });

  Count_display(); //Inital value -> 0

  document.body.appendChild(Pat_btn);
  document.body.appendChild(how_many_pats);
  document.body.appendChild(what_lvl);
  document.body.appendChild(btn_shell);
  document.body.appendChild(BR_lvl); 
  document.body.appendChild(TY_lvl); 
  document.body.appendChild(TrT_lvl); 

  // Initialize messages for purchase counts
  BR_lvl.textContent = "0 belly rubs given";
  TY_lvl.textContent = "0 chew toys chewed";
  TrT_lvl.textContent = "0 treats eaten";
  
}

function Count_display() {
  how_many_pats.textContent = `${Math.floor(head_pat)} head pats for the Goodest Boy Ever`;
  what_lvl.textContent = `${pats_per_sec} head pats/sec`;  
}

function Count_Behavior() {
  let start = 0;

  function updateCounter(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    const time_passed = timestamp - start;
    const increase = (time_passed / 1000) * pats_per_sec;

    head_pat += increase;
    Count_display();

    multipliers.forEach((item) => {
      if (Math.floor(head_pat) >= item.cost * item.inflation) {
        item.button!.disabled = false;
      } else {
        item.button!.disabled = true;
      }
    });

    start = timestamp;

    requestAnimationFrame(updateCounter);
  }

  //Frame increments
  requestAnimationFrame(updateCounter);
}

function Upgrades(item: Item) {

    if (head_pat >= item.cost * item.inflation) {
      head_pat -= item.cost * item.inflation;
      pats_per_sec += item.boost;
      
      item.inflation *= item.inf_rate;
      item.purchases++;

    Count_display();

    // Update messages for purchase counts
    if (item.upg_name === "👋 Belly Rubs 👋") {
      BR_lvl.textContent = `${item.purchases} belly rubs given`;
    } else if (item.upg_name === "🦠 Chew Toys 🦠") {
      TY_lvl.textContent = `${item.purchases} chew toys chewed`;
    } else if (item.upg_name === "🦴 Treats 🦴") {
      TrT_lvl.textContent = `${item.purchases} treats eaten`;
    }

    item.disabled = Math.floor(head_pat) >= item.cost * item.inflation;
  }
}

document.addEventListener("DOMContentLoaded", Game_setup);
document.addEventListener("DOMContentLoaded", Count_Behavior);

