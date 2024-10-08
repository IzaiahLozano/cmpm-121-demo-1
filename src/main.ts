import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName =
  "Goodest Boy Ever";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);



function createButton() {

  const btn = document.createElement('button');
  btn.textContent = '🐶';

  btn.style.position = 'absolute';
  btn.style.bottom = "160px";
  btn.style.left = "600px";

  btn.addEventListener('click', () => {
    alert('I woof you!');
  });

  document.body.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', createButton);