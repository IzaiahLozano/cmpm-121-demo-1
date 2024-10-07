import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName =
  "My totally awesome spectacular rambuctious incredible mind blowing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
