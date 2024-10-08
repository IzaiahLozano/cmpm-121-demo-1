import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let head_pat: number = 0;

function createButton() {
  
  //Button Settings
  const btn = document.createElement("button");
  btn.textContent = "🐶";
  btn.style.position = "absolute";
  btn.style.bottom = "160px";
  btn.style.left = "600px";

  //Counter Settings
  const how_many_pats = document.createElement('div');
  how_many_pats.style.marginTop = '20px';
  how_many_pats.style.fontSize = '18px';
  how_many_pats.textContent = `${head_pat} head pats for the goodest boy ever`;
  how_many_pats.style.position = "absolute";
  how_many_pats.style.bottom = "130px";
  how_many_pats.style.left = "475px";

  btn.addEventListener("click", () => {
    head_pat++;
    how_many_pats.textContent = `${head_pat} head pats for the goodest boy ever`;
  });

  document.body.appendChild(btn);
  document.body.appendChild(how_many_pats)
}

document.addEventListener("DOMContentLoaded", createButton);
