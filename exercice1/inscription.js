// Fonction exécutée au Submit
// Vérifie les proprietés de chaque champ avant de return True
function validateForm() {
  if ((validateNom() && validatePrenom() && validateCIN() && 
    validateEmail() && validateFormation()) == true) {
    alert ("Inscription achevée !");
  return true ; 
  }else {
    return false;
  }
}

// Fonction pour vérifier que le nom respecte certains critères : 
// Champ non-nul ; seulement des lettres 
function validateNom() {
  var y = document.forms["contact_form"]["nom"].value;
  var letters = /^[[a-zA-Z\s]+$/;

  if (y.length == 0 ) {
    alert("Le champ 'Nom' est obligatoire.");
    return false;
  } else if(!(y.match(letters)))
  {
    alert("Le champ 'Nom' ne peux pas contenir de chiffres, de caractères spéciaux ou d'accents.");
    return false ;
  } else {
    return true ; 
  }
}

// Fonction pour vérifier que le Prenom respecte certains critères : 
// Champ non-nul ; seulement des lettres 
function validatePrenom() {
  var testPrenom = document.forms["contact_form"]["prénom"].value;
  var letters = /^[[a-zA-Z\s]+$/;
  if (testPrenom.length == 0 ) {
    alert("Le champ 'Prénom' est obligatoire.");
    return false;
  } else if(!(testPrenom.match(letters)))
  {
    alert("Le champ 'Prénom' ne peux pas contenir de chiffres, de caractères spéciaux ou d'accents.");
    return false ;
  } else {
    return true ; 
  }
}

// Fonction pour vérifier que le CIN respecte certains critères : 
// Champ non-nul ; seulement des chiffres ; longueur égale à 8 
function validateCIN() {
  var cinvalue = document.forms["contact_form"]["CIN"].value;
  
  for (i in cinvalue) {
      if (!(cinvalue.match("^[0-9]*$"))) {
          alert("Le champ 'CIN' ne peux pas contenir de lettres ou de caractères spéciaux.");
          return false ; 
      }
}
  if (cinvalue < 0) {
    alert("Le CIN ne peux pas être négatif.");
    return false;
  } 
  else if (cinvalue.toString().length != 8) {
    alert("Le CIN doit être composé de 8 chiffres.");
    return false;
  }

  else {
    return true ;
  }
}

// Fonction pour vérifier que le Mail respecte certains critères : 
// Champ non-nul ; contient un @
function validateEmail(){
  var mail = document.forms["contact_form"]["email"].value;
  if (mail.length == 0) {
    alert("Le champ 'e-mail' est obligatoire.");
  }else 

  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return true
  } else {
    alert("Vous avez saisi une adresse e-mail invalide.")
    return false
  }
}

// Fonction pour vérifier que la Formation respecte certains critères : 
// Non-obligatoire ; Maximum 2 modules
function validateFormation(){
  var values = getSelectValues(formations);
  if (values.length > 2) {
    alert("Vous ne pouvez choisir que deux modules de formation.");
    return false ;
  } else {
    return true ; 
  }
}

// Pour calculer le nombre de modules selectionner
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}