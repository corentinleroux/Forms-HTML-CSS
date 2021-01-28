
// Notre classe Personne avec les attributs nom, age, sexe et nationalité
class Personne {
	constructor(No, A, S, Na){
		this.nom = No ;
		this.âge = A ;
		this.sexe = S ;
		this.nationalité = Na ;
	}
}

// Notre liste contenant les individus que l'utilisateur créé
var listeIndividus = [] ;


// Fonction pour s'assurer que l'ajout peut être fait 
function VerifyAll(){
	if (VerifyNom() && VerifyAge()) {
		createPersonne(); // On créé une personne via la fonction 
		document.getElementById("myForm").reset(); // On reset les champs du formulaire
		displayPersonne(); // On affiche le tableau
	}
	else return false ; // Si une des conditions n'est pas vérifier, on ne traite pas l'ajout
}


// On vérifie que le nom répond certains critères
function VerifyNom(){
	var nomValue = document.getElementById('name').value;
	var letters = /^[[a-zA-Z\s]+$/;

	// Non-nul
	if (nomValue.length == 0 ) {
		alert("Le champ 'NOM' est obligatoire.");
		return false;
	} 
	// Pas de chiffres ou d'accents
	else if(!(nomValue.match(letters)))
	{
		alert("Le champ 'NOM' ne peux pas contenir de chiffres ou d'accents.");
		return false ;
	} 

	else {
		return true ; 
	}
}

// On vérifie que l'âge répond certains critères 
function VerifyAge(){
	var ageValue = document.getElementById('age').value; 

	// Non-nul
	if (ageValue == ""){
		alert("Le champ 'ÂGE' est obligatoire.");
		return false;
	}

	// Positif 
	if (ageValue < 0) {
		alert("Le champ 'ÂGE' ne peux pas être négatif.");
		return false;
	}

	// Pas de lettres 
	else if(!(ageValue.match("^[0-9]*$")))
	{
		alert("Le champ 'ÂGE' ne peux pas contenir de lettres.");
		return false ;
	} 

	// Age compris entre 18 et 100 ans 
	else if (ageValue > 100 || ageValue < 18) {
		alert("Soyons raisonnables. Ce service ne prend en charge que les personnes ayant entre 18 et 99 ans.");
		return false;
	} 

	else return true ;
}


// Fonction pour créer un nouvel individu
function createPersonne(){

	// Récupération des données du formulaire
	var nomValue = document.getElementById('name').value;
	var ageValue = document.getElementById('age').value; 
	var sexeValue = document.getElementById('sexe').value;
	var sel = document.getElementById("nationality");

	// Pour avoir la valeur du texte et non pas de la value
	var nationalityValue= sel.options[sel.selectedIndex].text;
	PersonneTmp = new Personne(nomValue, ageValue, sexeValue,nationalityValue);

	for (let i = 0 ; i < listeIndividus.length ; i++) {
		if (isEquivalent(listeIndividus[i],PersonneTmp)) {
			if (confirm("Un individu identique existe déjà."+"\n"+"Confirmez-vous malgré tout l'ajout ?") == true) {
				listeIndividus.push(new Personne(nomValue, ageValue, sexeValue,nationalityValue));
				return true ; 
			} else return false ; 
		} 
	}
	listeIndividus.push(new Personne(nomValue, ageValue, sexeValue,nationalityValue));
	return true ;   	
}


// Cacher / Afficher le tableau
function hideToggle() {
	var x = document.getElementById("hide");
	if (x.style.display === "none") {
		document.getElementById("buttonHide").innerHTML = "Cacher le tableau";
		x.style.display = "block";
	} else {
		document.getElementById("buttonHide").innerHTML = "Afficher le tableau";
		x.style.display = "none";
	}
}

// Réinitialiser le tableau
function resetTab() {

	if (listeIndividus.length != 0) {

		if (confirm("Êtes-vous sûr de vouloir reinitialiser le tableau ?") == true) {
			listeIndividus = [] ;
			var Parent = document.getElementById("tableData");
			while(Parent.hasChildNodes())
			{
				Parent.removeChild(Parent.firstChild);
			}
			alert("Le tableau a été reinitialisé.");
			return true ; 
		} else {
			return false ; 
		}
	} else {
		return false ; 
	}


}


// Annuler le dernier ajout
function removeLast() {

	if (listeIndividus.length != 0) {
		if (confirm("Êtes-vous sûr de vouloir supprimer le dernier ajout ?") == true) {
			deleted = listeIndividus.pop() ;
			var Parent = document.getElementById("tableData");
			if(Parent.hasChildNodes())
			{
				Parent.removeChild(Parent.lastChild);
				alert("L'element '"+deleted.nom+"' a été retiré.");
				console.log(listeIndividus);
				return true ; 
			} else
			{
				return false ; 
			}

		} else {
			return false ; 
		}
	} else return false ; 

}

// Fonction pour afficher le tableau
function displayPersonne(){
	var k = '<tbody>'
	for(i = 0;i < listeIndividus.length; i++){
		k+= '<tr>';
		k+= '<td>' + listeIndividus[i].nom + '</td>';
		k+= '<td>' + listeIndividus[i].âge + '</td>';
		k+= '<td>' + listeIndividus[i].sexe + '</td>';
		k+= '<td>' + listeIndividus[i].nationalité + '</td>';
		k+= '</tr>';
	}
	k+='</tbody>';
	document.getElementById('tableData').innerHTML = k;
}


// Vérifier si deux objects ont les mêmes propriétés
function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
    	return false;
    }

    for (var i = 0; i < aProps.length; i++) {
    	var propName = aProps[i];
    	if (a[propName] !== b[propName]) {
    		return false;
    	}
    }
    return true;
}