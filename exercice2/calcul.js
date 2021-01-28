// Fonction de calcul globale
function Calcul(){

	// Récupération des données saisies
	var grossSalaryValue = parseFloat(document.getElementById('grossSalary').value); 
	var additionBonusValue = document.getElementById('additionBonus').checked; 
	var additionAllowanceValue = document.getElementById('additionAllowance').checked; 
	var genderValue = document.getElementById('gender').value; 
	var dependentsValue = document.getElementById('dependents').value; 

	if (verifySalary() && verifyDependents()) {

	// Création de variables pour le calcul
	var TotalReduc = 0 ;
	var finalSalary = 0 ; 
	var Impots = grossSalaryValue ; 

	// Calcul des frais
	var AssuranceEmploye = grossSalaryValue * 0.07 ; 
	var Pension = grossSalaryValue * 0.05 ;
	var Supplements = 0 ;
	var PourcentImpot = 0.18 ; 

	// Vérification des réductions
	if (additionBonusValue) Supplements += 100 ; 
	if (additionAllowanceValue) Supplements += 150 ; 
	if (genderValue=="F") PourcentImpot = PourcentImpot - 0.02 ;
	if (dependentsValue==3) PourcentImpot = PourcentImpot - 0.01 ; 
	if (dependentsValue>=4) PourcentImpot = PourcentImpot - 0.02 ; 

	// Calcul des impots à payer 
	Impots2 = Impots * PourcentImpot ; 
	Impots3 = Impots * 0.18  - Impots2;

	// Calcul du salaire net
	finalSalary = grossSalaryValue - (Impots2 + AssuranceEmploye + Pension) + Supplements ; 

	// Mise à jour des balises span après calcul
	document.getElementById("reducImpo").textContent=Impots3.toFixed(2)+' €';
	document.getElementById("incomeTaxResult").textContent=Impots2.toFixed(2)+' €'; 
	document.getElementById("employmentInsuranceResult").textContent=AssuranceEmploye.toFixed(2)+' €';
	document.getElementById("canadaPensionPlanResult").textContent=Pension.toFixed(2)+' €';
	document.getElementById("additionsResult").textContent=Supplements.toFixed(2)+' €';
	document.getElementById("finalSalaryResult").textContent=finalSalary.toFixed(2)+' €';
	return true ; 
	}
	else {
	return false ; 
	}
}

function verifySalary(){
	var grossSalaryValue = parseFloat(document.getElementById('grossSalary').value);
	if (grossSalaryValue < 0) {
		alert("Le salaire brut ne peux pas être négatif.");
		return false ;
	} else if ((isNaN(grossSalaryValue))) {
		alert("Vous devez saisir un salaire brut.");
		return false ;
	} else {
		return true ; 
	}
}

function verifyDependents() {
	var dependentsValue = document.getElementById('dependents').value; 
	if (dependentsValue < 0) {
		alert("Le nombre de personnes à charges ne peux pas être négatif.");
		return false ;
	} else {
		return true ; 
	}
}

function cleanForm(){
    document.getElementById("incomeTaxResult").textContent=""; 
    document.getElementById("reducImpo").textContent=""; 
    document.getElementById("employmentInsuranceResult").textContent="";
    document.getElementById("canadaPensionPlanResult").textContent="";
    document.getElementById("additionsResult").textContent="";
    document.getElementById("finalSalaryResult").textContent="";
}