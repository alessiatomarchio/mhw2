/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function restartGame() {
    for(let divImage of listaDivImages){
        divImage.addEventListener("click", chooseAnswer);
        divImage.classList.remove("checked");
        divImage.classList.add("stile");
        divImage.querySelector(".checkbox").src = "images/unchecked.png";
        divImage.classList.remove("unchecked");
    }
    let sectionResult = document.querySelector("#risultato"); 
    sectionResult.classList.add("hidden"); 
    for ( key in SaveId )
        delete SaveId[key]; 

}

function isFinished() {
    let i =0; 
    for(key in SaveId){              
        i++; 
    }

    if( i === 3 )  {
        return true; 
    }
    else 
        return false; 
    
}


function updateNotSelected(id, immagine) {
    let lista = [];
    for(let divImage of listaDivImages) {
        let image = divImage.querySelector("img");
        if((divImage.dataset.questionId === id) && (image !== immagine)) {
            lista.unshift(divImage);
        }
    }
    for(let divImage of lista){
        divImage.classList.remove("checked");
        divImage.classList.remove("stile");
        divImage.querySelector(".checkbox").src = "images/unchecked.png";
        divImage.classList.add("unchecked");
        divImage.addEventListener("click",chooseAnswer);
    }
}

function ShowPersonalities( ) {
    let choice1 = SaveId["one"];
    let choice2 = SaveId["two"];
    let choice3 = SaveId["three"];
    let realChoice; 
    if( choice1 === choice2 || choice1 === choice3 ) {
        realChoice = choice1; 
     }
     else if (choice2 === choice1 || choice2 === choice3){
        realChoice= choice2;
     }
     else if (choice3 === choice1 || choice3 ===choice2) {
        realChoice= choice3; 
     }
     else realChoice= choice1; 
     let titleResult = RESULTS_MAP[realChoice].title; 
     let description= RESULTS_MAP [realChoice].contents; 
     /* abbiamo salvato in due variabili il titolo e la descrizione della scelta più frequente, quella da visualizzare*/ 
     let sectionResult= document.querySelector("#risultato"); 
     /* accedo ad h1 ed inserisco il titolo trovato */ 
     let sectionH1 = sectionResult.querySelector("h1"); 
     let sectionContent = sectionResult.querySelector("p");
     sectionH1.textContent = titleResult; 
     sectionContent.textContent = description; 
     sectionResult.classList.remove("hidden"); 
     for(let divImage of listaDivImages) {
        divImage.removeEventListener("click", chooseAnswer);
    }
    let buttonRestart = sectionResult.querySelector("button"); 
    buttonRestart.addEventListener("click", restartGame); 
    
}

function chooseAnswer(event) {
    const divImage = event.currentTarget;
    divImage.classList.remove("unchecked");
    divImage.classList.remove("stile");
    divImage.classList.add("checked");
    divImage.removeEventListener("click",chooseAnswer);
    let image = divImage.querySelector("img");
    updateNotSelected(divImage.dataset.questionId, image);
    divImage.querySelector(".checkbox").src = "images/checked.png";
    const idRequest = divImage.dataset.questionId; 
    const IdResponse = divImage.dataset.choiceId; 
    SaveId[idRequest] = IdResponse; 
    /* Riempio una mappa di Id, creata per salvare gli id di domanda e di risposta selezionati, con una coppia chiave ( IdQuestion) e valore (IdResponse)*/
    if( isFinished() )
        ShowPersonalities();
}

let listaDivImages = document.querySelectorAll(".choice-grid div");

for(let divImage of listaDivImages) {
    divImage.addEventListener("click", chooseAnswer);
}

const SaveId = {};



