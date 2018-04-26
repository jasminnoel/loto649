var capital = 0;
var partiesJouees = 0;
var partiesGagnees = 0;
//Génère les nombres au hasard
function genNB(N) {
        return (Math.floor(N * Math.random() + 1));
}

//Trier le tableau
function triBulles(tab) {
    var aucunEchangeFait;
    var iDernier = tab.length - 1;
    var temp;

    do {
        aucunEchangeFait = true;
        for (var i = 0; i < iDernier; i++) {
            if (tab[i] > tab[i + 1]) {
                temp = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = temp;
                aucunEchangeFait = false;
            }
        }
        iDernier--;
    } while (aucunEchangeFait == false);
    return tab;
}

//Génère un tableau de nombres différents en ordre croissant
function genArray() {
    var tableau = new Array();
    for (var i = 0; i < 6; i++) {
        do {
            tableau[i] = genNB(49);
            for (var j = i - 1; j >= 0; j--) {
                if (tableau[i] == tableau[j]) {
                    i = j;     
                }
            }
        } while (tableau[i] == tableau[j]);
    }
   return triBulles(tableau);
}

//Récupère les valeurs de l'utilisateur et les convertit en tableau
function getArray() {
    var tableau = new Array();
    for (var i = 0; i < 6; i++) {
        tableau[i] = parseInt(document.usrForm.elements[i].value);
    }
    return triBulles(tableau);
}

//Change l'affichage de reglement
function affReglement() {
    document.getElementById("reglement").style.display = "none";
}
//Affiche le tableau dans les éléments du formulaire
function affTab(tab, form) {
    for (var i = 0; i < 6; i++) {
            form.elements[i].value = tab[i];
    }
}

//Affiche le nom du joueur
function affAccueil() {
    var query = window.location.search;
   // if (query.substring(0, 1) == "?") {
        query = query.substring(1);
   // }
    document.getElementById("accueil").innerHTML = "Bonjour " + query;
}

//Retourne l'age de l'utilisateur
function getAge(usrDate) {
    var ajd = new Date();
    var bday = new Date(usrDate);
    var age = ajd.getFullYear() - bday.getFullYear();
    var m = ajd.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && ajd.getDate() < bday.getDate())) {
        age--;
    }
    return age;
}

// Valide les informations du formmulaire et envoie à la page suivante
function validerProfil() {
    var dateNaiss = document.form1.dateNaissance.value;
    var age = getAge(dateNaiss);
    var usrNom = document.form1.prenom.value;
   if (document.form1.prenom.value == "") {
        window.alert("Entrez votre prénom");
        document.form1.prenom.className = "required";
        document.form1.prenom.focus();
   } else if (document.form1.dateNaissance.value == "" || document.form1.dateNaissance.value.length != 10) {
        window.alert("Entrez votre date de naissance sous le format suivant : \n AAAA-MM-JJ");
        document.form1.dateNaissance.className = "required";
        document.form1.dateNaissance.focus();
   } else if (age < 18) {
       window.alert("Vous n'êtes pas majeur. Revenez le jour de vos 18 ans.");
   } else {
       window.location = "page-2.html?" + usrNom;
   }
 }

// Valide le nombre entré par l'utilisateur. Le paramètre N appelle l'élément du formulaire et le paramètre P sa position
function validerNb(N,P) {
    var nb = parseInt(N.value);
    if (nb < 1 || nb > 49) {
        window.alert("Vous devez entrer un nombre entier de 1 à 49");
        N.value = "";
        N.focus();
    }
    for (var i = P - 1; i >= 0; i--) {
        if (parseInt(usrForm.elements[i].value) == nb && N.value != "") {
            window.alert("Tous les nombres doivent être différents");
            N.value = "";
            N.focus();
        } 
    }
}

//Remet les classes de champs à la valeur initiale
function resetClass() {
    for (var i = 0; i < 6; i++) {
        if (document.usrForm.elements[i].className == "gagnant") {
            document.usrForm.elements[i].classList.remove("gagnant");
            document.usrForm.elements[i].classList.add("round");
        }
        if (document.autoForm.elements[i].className == "gagnant") {
            document.autoForm.elements[i].classList.remove("gagnant");
            document.autoForm.elements[i].classList.add("round");
        }
    }
}
//Valide si l'utilisateur a complété le formulaire
function fullForm(formulaire) {
    for (var i = 0; i <= formulaire.elements.length - 1; i++) {
        if (formulaire.elements[i].value == "") {
            window.alert("Entrez d'abord 6 nombres différents compris entre 1 et 49 \n Le bouton \"Mise Automatique\" choisit les nombres pour vous ;)")
            formulaire.elements[i].focus();
            return false;
        }
    }
    return true;
}

//Compare les nombres de 2 tableaux et retourne le resultat
function compareTab(tab1, tab2) {
    var resultat = 0;
    for (i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            if (tab1[i] == tab2[j]) {
                resultat += 1;
                document.usrForm.elements[j].className = "gagnant";
                document.autoForm.elements[i].className = "gagnant";

            }
        }
    }
    return resultat;
}
// Exécute les différentes fonctions. Envoie les résultats du jeu 
function jouer() { 
    resetClass();
    var tableau1 = genArray();
    var tableau2 = getArray();
    var resultat = compareTab(tableau1, tableau2);
    capital = parseInt(document.form2.miseDepart.value);

    if (partiesJouees == 0 && capital < 100) {
        window.alert("Entrez un capital minimal de 100");
        document.form2.miseDepart.focus();
        document.form2.miseDepart.className = "required";
    } else if (capital < 0) {
        window.alert("Fonds insuffisants \n Contactez votre institution bancaire");
        document.getElementById("usrId1").disabled = true;
        document.getElementById("usrId2").disabled = true;
        document.getElementById("usrId3").disabled = true;
        document.getElementById("usrId4").disabled = true;
        document.getElementById("usrId5").disabled = true;
        document.getElementById("usrId6").disabled = true;
        document.autoForm.btnGenerer.disabled = true;
        document.getElementById("usrId1").className = "required";
        document.getElementById("usrId2").className = "required";
        document.getElementById("usrId3").className = "required";
        document.getElementById("usrId4").className = "required";
        document.getElementById("usrId5").className = "required";
        document.getElementById("usrId6").className = "required";
    } else if (fullForm(document.usrForm) == true) {
        fullForm(document.usrForm);
    }
    affTab(tableau1, document.autoForm);
    affTab(tableau2, document.usrForm);
    document.form2.miseDepart.value = capital - 10;
    partiesJouees = parseInt(document.getElementById("partiesId").value) + 1;
    document.getElementById("partiesId").value = partiesJouees;
    switch (resultat) {
        case (0):
        case (1):
        case (2):
            break;
        case (3):
            document.form2.miseDepart.value = capital + 10;
            partiesGagnees = parseInt(document.getElementById("winsId").value) + 1;
            document.getElementById("winsId").value = partiesGagnees;
            break;
        case (4):
            document.form2.miseDepart.value = capital + 85;
            partiesGagnees = parseInt(document.getElementById("winsId").value) + 1;
            document.getElementById("winsId").value = partiesGagnees;
            break;
        case (5):
            document.form2.miseDepart.value = capital + 2450;
            partiesGagnees = parseInt(document.getElementById("winsId").value) + 1;
            document.getElementById("winsId").value = partiesGagnees;
            break;
        case (6):
            document.form2.miseDepart.value = capital + 2050000;
            partiesGagnees = parseInt(document.getElementById("winsId").value) + 1;
            document.getElementById("winsId").value = partiesGagnees;
            break;
     }
}

//Sélectionne des nombres à la place de l'utilisateur
function miseAuto(){
    if (document.getElementById("btnAutoId").checked == false) {
        for (var i = 0; i <= document.usrForm.elements.length; i++) {
                document.usrForm.elements[i].value = "";
        }
    } else {
        affTab(genArray(), document.usrForm);
    }
}

//Ajoute 100 au capital de départ
function ajouterCapital() {
    capital = parseInt(document.form2.miseDepart.value) + 100;
    document.form2.miseDepart.value = capital;
}



