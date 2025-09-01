const mostrar = (foto) => {
    let adopcion = document.getElementById("adopcion1");
    adopcion.style.display = "none";

    let caja = document.getElementById("cajafoto");
    caja.hidden = false;
    caja.style.backgroundColor = "#ddffdd57";

    let contenido = document.getElementById("cajafoto-content");
    contenido.textContent = "";

    let imgGrande = document.createElement("img");
    imgGrande.src = foto.target.src; 
    imgGrande.style.width = "800px";
    imgGrande.style.height = "600px";

    contenido.appendChild(imgGrande);
    let espacio = document.createElement("br");

    contenido.appendChild(espacio);
    let backButton = document.createElement("button");
    backButton.innerText = "Volver";
    backButton.addEventListener("click", () => {
        adopcion.style.display = "block";
        caja.hidden = true;
    });
    contenido.appendChild(backButton);
};

// Asociar eventos
document.getElementById("gatitos1").addEventListener("click", mostrar);
document.getElementById("gatitos2").addEventListener("click", mostrar);