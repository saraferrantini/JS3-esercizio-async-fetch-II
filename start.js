// A) SOSTITUISCO LE CARD ESISTENTI CON LE IMMAGINI FORNITE DA PEXELS

// 1.☑️URL E API-KEY
const PEXELS_URL = "https://api.pexels.com/v1/search?query=";
const API_KEY = "oc7q1gbJ2ey8Q9JKpvMFiEwcYjV72k4WEUquGuYr5PJnDe9LzU9LYPdD";

// 2.☑️prendo tutti gli elementi img che hanno la classe card-img-top
let immage_list = document.getElementsByClassName("card-img-top");

// in questa funzione gli passiamo il parametro query che cambia a ogni chiamata
function cambiaImg(query) {
  // 3.☑️FETCH per avere accesso all'url e autorizzazione APY-KEY
  fetch(PEXELS_URL + query, {
    headers: {
      authorization: API_KEY,
    },
  })
    // utilizza un metodo .then sulla promise del fetch per gestire la risposta
    .then((response) => {
      if (response.ok) {
        // se abbiamo una risposta positiva e lo status è da 100 ~ 399
        // mi devi trasformare il flusso dati in un jason, altrimenti mi lanci errore

        return response.json();
      } else {
        throw new Error("ERRORE NEL REPERIMENTO DATI");
      }
    })

    .then((jsonData) => {
      console.log(jsonData);
      //4.☑️ciclo for sulle img card cani che abbiamo già per cambiare l'src con quello che arriva da jsonData
      for (let i = 0; i <= immage_list.length - 1; i++) {
        immage_list[i].src = jsonData.photos[i].src.tiny;
        // per far apparire l'id
        text_muted_list[i].textContent = jsonData.photos[i].id;
      }
    });
}

window.onload = function () {
  let primoBottone = document.getElementById("btn_primo");
  //  ☑️ ASCOLTATORE SUL BOTTONE LOAD IMAGES
  primoBottone.addEventListener("click", function () {
    cambiaImg("cat");
    cambiaEditInHide();
  });

  let secondoBottone = document.getElementById("btn_secondo");
  //  ☑️ASCOLTATORE SUL BOTTONE LOAD SECONDARY IMAGES
  secondoBottone.addEventListener("click", function () {
    cambiaImg("horse");
  });

  // ☑️ E)RICERCA
  let terzoBottone = document.getElementById("ricerca_btn");
  terzoBottone.addEventListener("click", function () {
    let inputRicerca = document.getElementById("ricerca").value;

    cambiaImg(inputRicerca);
  });
};

// B)SOSTITUIRE TASTO EDIT CON TASTO HIDE
// C)FAR SPARIRE LA CARD

//☑️prendiamo tutti i bottoni edit
let hide_btn_list = document.getElementsByClassName("sostituisci");

function cambiaEditInHide() {
  //☑️ciclo for per fare in modo che a ogni bottone edit me lo deve sostituire con hide
  for (let i = 0; i < hide_btn_list.length; i++) {
    hide_btn_list[i].textContent = "Hide";
    //☑️ascoltatore sul bottone hide
    hide_btn_list[i].addEventListener("click", function () {
      //☑️ Risali al genitore del bottone (la card) e rimuovila
      // closest(".card") è un metodo che risale lungo l'albero DOM a partire dall'elemento corrente (this) e trova il primo elemento genitore che corrisponde al selettore specificato
      let card = this.closest(".col-md-4");
      // se è stata trovata un'istanza di una card la rimuovi
      if (card) {
        card.remove();
      }
    });
  }
}

// D)SOSTITUIRE I MINUTI CON L'ID DELL'IMG

//☑️prendiamo tutti i text dei minuti
let text_muted_list = document.getElementsByClassName("text-muted");

// E)CAMPO DI RICERCA
