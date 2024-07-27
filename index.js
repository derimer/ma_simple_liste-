const date = document.querySelector("#date");
const liste = document.querySelector("#liste");
const listeTerminer = document.querySelector("#listeTerminer");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#boton-enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let LIST = [];
let id = 0;

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString("fr-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

function ajoutertache(tache, id, realizer, eliminer) {
  if (eliminer) {
    return;
  }

  const REALIZER = realizer ? check : uncheck;
  const LINE = realizer ? lineThrough : "";

  const element = `
    <li id="element">
      <i class="far ${REALIZER}" data="realizer" id="${id}"></i>
      <p class="text ${LINE}">${tache}</p>
      
      <i class="fas fa-trash de" data="eliminer" id="${id}"></i>
    </li>
  `;
  liste.insertAdjacentHTML("beforeend", element);
}

function tacheRealizer(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizer = !LIST[element.id].realizer;

  const listItem = element.parentNode;

  if (LIST[element.id].realizer) {
    listeTerminer.appendChild(listItem);
    listItem.classList.add("checked");
  } else {
    liste.appendChild(listItem);
    listItem.classList.add("unchecked");
  }
}

function tacheeliminer(element) {
  const listItem = element.parentNode;
  listItem.classList.add("explode"); // Ajoute la classe pour l'animation d'explosion
  setTimeout(() => {
    listItem.parentNode.removeChild(listItem); // Supprime l'élément après l'animation
  }, 300); // Temps correspondant à la durée de l'animation (300ms dans cet exemple)
  LIST[element.id].eliminer = true;
}

botonEnter.addEventListener("click", () => {
  const tache = input.value;
  if (tache) {
    ajoutertache(tache, id, false, false);
    LIST.push({
      nombre: tache,
      id: id,
      realizer: false,
      eliminer: false,
    });
    id++;
    input.value = "";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tache = input.value;
    if (tache) {
      ajoutertache(tache, id, false, false);
      LIST.push({
        nombre: tache,
        id: id,
        realizer: false,
        eliminer: false,
      });
      input.value = "";
      id++;
    }
  }
});

liste.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData == "realizer") {
    tacheRealizer(element);
  } else if (elementData == "eliminer") {
    tacheeliminer(element);
  }
});

listeTerminer.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData == "realizer") {
    tacheRealizer(element);
  } else if (elementData == "eliminer") {
    tacheeliminer(element);
  }
});
