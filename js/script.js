// a bandera, la capital, la población, el lado de la carretera por el que se circula.
/* BANDERA:
"flags": [
    "https://flagcdn.com/gi.svg",
    "https://flagcdn.com/w320/gi.png" */

/* NOMBRE
     "name": {
        "common": "Gibraltar",
        "official": "Gibraltar", */

/* POBLACION
         "population": 33691, */

/* CAPITAL
 "capital": [
    "Gibraltar"
  ], */

/* LADO CARRETERA
   "car": {
    "signs": [
      "GBZ"
    ],
    "side": "right" */


const getPais = async () => {
    try {
        const response = await fetch ("https://restcountries.com/v3/all")
        if (!response.ok) {
            throw new Error("Ha existido un error al recuperar los datos del fetch")
        }
        const data = await response.json()
        const paisesOrdenado = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        return paisesOrdenado
    }
    catch(error) {
        console.log("Ha ocurrido un error", error)
    }
}

const template = (paises) => {
    const divLista = document.getElementById("countries-list")
    paises.forEach((pais) => {
        const divPais = document.createElement("div")
        divPais.classList.add("div-Pais")
        divPais.innerHTML +=
        `
            <img src="${pais.flags[1]}" alt="bandera de ${pais.name.common}"></img>
            <p>${pais.name.common}</p>
        `
        divPais.addEventListener("click", () => {
            mostrarModal(pais)
        })
        divLista.appendChild(divPais)
    });
}

const mostrarModal = (pais) => {

    const overlay = document.getElementById("overlay")
    const modal = document.getElementById("country-modal")

    document.getElementById("modal-title").textContent = pais.name.common
    document.getElementById("modal-flag").src = pais.flags[1]
    document.getElementById("modal-flag").alt = `Bandera de ${pais.name.common}`
    document.getElementById("modal-capital").textContent = pais.capital ? pais.capital[0] : "No disponible"
    document.getElementById("modal-population").textContent = pais.population.toLocaleString();
    document.getElementById("modal-side").textContent = pais.car ? pais.car.side : "No disponible"

    overlay.style.display = "block"
    modal.style.display = "block"

    document.getElementById("close-modal").addEventListener("click", cerrarModal)

    overlay.addEventListener("click", cerrarModal)
}


const cerrarModal = () => {
    document.getElementById("overlay").style.display = "none"
    document.getElementById("country-modal").style.display = "none"
  }


getPais().then((dataPaises) => template(dataPaises))