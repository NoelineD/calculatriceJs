let op1 = '';
let op2 = '';
let oper = '';

let resultat = '';

/**
 * fonction appelée sur un click d'un des boutons de la calculate
 * @param {Event} event
 */
function btnClick(event) {
    let touche = event.target.textContent; // récupération du contenu de la balise button cliquée
    console.log(touche,typeof touche);
    // à faire
  // resultat.innerText += e.target.innerText; pour en voyer le texte dans resultat?
    // envoi des 3 variables dans l'input text du resultat

   
//console.log(myinput);
    if (touche === "C"){
        btnClear ();
    } 
    
    else {
        if(touche === "←"){
        btnDelete ();
    
    }else {
        boutons[0].disabled=false;
        boutons[boutons.length - 1].disabled = false;

        if (touche === "="){
        resultat= effectuerCalcul (op1,op2,oper);
        op1=resultat;
        op2="";
        oper="";
        boutons[boutons.length - 1].disabled = true;
        
        } else if (touche === "%") {
        op1 /= 100; // Diviser op1 par 100 pour obtenir le pourcentage
        document.querySelector('input').value = op1; // Mettre à jour la valeur affichée
    
    }else {
        
        if (touche=== "+" || touche === "-" || touche === "/" || touche === "x" || touche === "%"){
            if (op1 !== "") {
            oper = "" +touche+ "";
            }

            } else{  

                if(resultat==="" || oper!=="" ){
                    if (oper === ""){
                    op1= op1 +touche;
              
                    } else{
                    op2 = op2 +touche;
                   // boutons[boutons.length - 1].disabled = false;
            }  
    }

            }
    }
}
        }
    document.querySelector('input').value= op1 + oper + op2;
}

/**
 * fonction de remise à zéro des 4 variables globales
 * et effacement de l-input résultat
 */
function btnClear() {

document.querySelector('input').value="";
op1 = '';
op2 = '';
oper = '';
resultat = '';
boutons[0].disabled=true;
    // à faire
}

 function btnDelete(){

 const input = document.querySelector('input[type="text"]');
  input.value = input.value.slice(0, -1);
//   const input = document.querySelector('input[type="text"]');
//   let inputValue = input.value;
  
//   if (inputValue.length > 0) {
//     inputValue = inputValue.slice(0, -1);
//     input.value = inputValue;
//   }
}
/**
 * fonction de calcul du résultat
 * @param {Number} nmb1
 * @param {Number} nmb2
 * @param {String} operator
 * @returns {Number}
 */
// parsefloat parsefloat(nmb1);

function effectuerCalcul(nmb1, nmb2, operator) {
resultat=0;
    switch(operator){
        case '+': 
        resultat =Number(nmb1) + Number(nmb2); 
        break;

        case '-': 
        resultat =nmb1 - nmb2; 
        break;

        case 'x': 
        resultat =nmb1 * nmb2; 
        break;

        case '%': 
        resultat =Number(nmb1) % Number(nmb2); 
        break;

        case '/':
            if(nmb2==0){
                return "erreur";
            } 
        resultat =nmb1 / nmb2; 
        break;
        
    }
 return resultat;
}

function init() {
    // la balise input pour l'affichage du résultat est dans une div de classe "resultat"
    // chaque balise button est dans une div de classe "bouton"

    // déclaration d'un tableau des codes de touche
    let codeTouches = ['C','←','%','+','7','8','9','-','4','5','6','x','1','2','3','/','0','.','',"="];
    // création du html pour l'affichage et les boutons
    let divs = '<div class="resultat"><input id="inputText" type="text" readonly="readonly" value=""/></div>';
    for (let codeTouche of codeTouches) {
        if (codeTouche === '') {    // pas de bouton
            divs += '<div class="bouton"></div>';
        }else if(codeTouche === '='){
            divs += '<div class="bouton"><button class="boutonEgale">'+codeTouche+'</button></div>';
        }else if(codeTouche === 'C'){
            divs += '<div class="bouton"><button class="boutonC">'+codeTouche+'</button></div>';
        } else if (codeTouche === '←') {
        divs += '<div class="bouton"><button class="boutonDelete blueButtons">' + codeTouche + '</button></div>';
        } else {
            divs += '<div class="bouton"><button class="blueButtons">'+codeTouche+'</button></div>';   
        }
        
    }
    // envoi de ce code html dans la div
    document.querySelector('div[class="grid-calculate calculate"]').innerHTML = divs;

    // récupération de tout les boutons pour leur assigner le gestionnaire d'évènement click
    boutons = document.querySelectorAll('button'); 
    for(let bouton of boutons){
        bouton.onclick = btnClick;
    }

    for (let bouton of boutons) {
    if (bouton.classList.contains("boutonDelete")) {
        bouton.onclick = btnDelete;
    } else {
        bouton.onclick = btnClick;
    }
}
    boutons[boutons.length-1].disabled=true;
    boutons[0].disabled=true;
}

document.addEventListener('DOMContentLoaded', function(){
    init();
});