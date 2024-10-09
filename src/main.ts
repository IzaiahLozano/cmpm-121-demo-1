import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let head_pat: number = 0;
const how_many_pats = document.createElement("div");
const btn = document.createElement("button");

function Game_setup() {
  //Button Settings
  btn.textContent = "🐶";

  //Counter Settings
  how_many_pats.style.marginTop = "20px";
  how_many_pats.style.fontSize = "18px";
  how_many_pats.textContent = `${head_pat} head pats for the goodest boy ever`; //Inital value -> 0

  document.body.appendChild(btn);
  document.body.appendChild(how_many_pats);
}



function Count_Behavior() {
  
  let start = 0;

  function updateCounter(timestamp: number) {

    if (start === undefined) {
      start = timestamp;
    } 

    const time_passed = timestamp - start;
    const increase = time_passed/1000;

    //console.log(time_passed);
    //console.log(increase); #Ensuring proper behavior 

    head_pat += increase; 
    
    how_many_pats.textContent = `${Math.floor(head_pat)} head pats for the goodest boy ever`;

    start = timestamp;

    requestAnimationFrame(updateCounter);
  }


  btn.addEventListener("click", () => {
    head_pat++;
    how_many_pats.textContent = `${Math.floor(head_pat)} head pats for the goodest boy ever`;
  });

  //Frame increments
  requestAnimationFrame(updateCounter);
}


document.addEventListener("DOMContentLoaded", Game_setup);
document.addEventListener("DOMContentLoaded", Count_Behavior);
