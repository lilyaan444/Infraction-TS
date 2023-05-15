import { UneSalle, LesSalles } from "../modele/data_salle.js";
import { LesDepts } from "../modele/data_departement.js";
import { UnTypEquiptBySalle, LesTypEquiptsBySalle, LesTypEquipts } from "../modele/data_equipement.js";
var VueSalleEdit = /** @class */ (function () {
    function VueSalleEdit() {
    }
    Object.defineProperty(VueSalleEdit.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueSalleEdit.prototype, "params", {
        get: function () { return this._params; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueSalleEdit.prototype, "grille", {
        get: function () { return this._grille; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueSalleEdit.prototype, "erreur", {
        get: function () { return this._erreur; },
        enumerable: false,
        configurable: true
    });
    VueSalleEdit.prototype.initMsgErreur = function () {
        // pour chaque champ à contrôler (événement onChange), création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = { edtNum: { statut: 'vide', msg: { correct: "", vide: "Le numéro de salle doit être renseigné.", inconnu: "Le numéro ne peut contenir que des lettres et des chiffres.", doublon: "Le numéro de salle est déjà attribué." } },
            edtEtage: { statut: 'vide', msg: { correct: "", vide: "L'étage doit être renseigné.", inconnu: "", doublon: "" } },
            edtCodeDept: { statut: 'vide', msg: { correct: "", vide: "Le département doit être renseigné.", inconnu: "Département inconnu.", doublon: "" } },
            equipt: { statut: 'vide', msg: { correct: "", vide: "La salle doit contenir au moins un équipement.", inconnu: "", doublon: "" } },
            listeEquipt: { statut: 'vide', msg: { correct: "", vide: "Aucun équipement choisi", inconnu: "", doublon: "" } },
            edtQte: { statut: 'vide', msg: { correct: "", vide: "La quantité doit être un nombre entier supérieur à 0", inconnu: "", doublon: "" } } };
    };
    VueSalleEdit.prototype.init = function (form) {
        var _this = this;
        this._form = form;
        this._params = location.search.substring(1).split('&');
        // params[0] :  mode affi, modif, suppr, ajout
        // params[1] : id en mode affi, modif, suppr
        this.form.divSalleEquiptEdit.hidden = true;
        this.initMsgErreur();
        var titre;
        switch (this.params[0]) {
            case 'suppr':
                titre = "Suppression d'une salle";
                break;
            case 'ajout':
                titre = "Nouvelle infraction";
                break;
            case 'modif':
                titre = "Modification d'une salle";
                break;
            default: titre = "Détail d'une salle";
        }
        this.form.divTitre.textContent = titre;
        var lesSalles = new LesSalles;
        var affi = this.params[0] === 'affi';
        if (this.params[0] !== 'ajout') { // affi ou modif ou suppr
            var salle = lesSalles.byNumSalle(this._params[1]);
            this.form.edtNum.value = salle.numSalle;
            this.form.edtLib.value = salle.libSalle;
            this.form.edtEtage.value = salle.etage;
            this.form.edtCodeDept.value = salle.codeDept;
            this.form.edtNum.readOnly = true;
            this.form.edtLib.readOnly = affi;
            this.form.edtEtage.readOnly = affi;
            this.form.edtCodeDept.readOnly = affi;
            this.erreur.edtNum.statut = "correct";
            this.detailDepartement(salle.codeDept);
        }
        this.affiEquipement();
        if (this.params[0] === 'suppr') {
            // temporisation 1 seconde pour afficher les données de la salle avant demande de confirmation de la supression
            setTimeout(function () { _this.supprimer(_this.params[1]); }, 1000);
        }
        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterEquipt.hidden = affi;
        // définition des événements   
        this.form.edtCodeDept.onchange = function () { vueSalleEdit.detailDepartement(vueSalleEdit.form.edtCodeDept.value); };
        this.form.btnRetour.onclick = function () { vueSalleEdit.retourClick(); };
        this.form.btnAnnuler.onclick = function () { vueSalleEdit.retourClick(); };
        this.form.btnValider.onclick = function () { vueSalleEdit.validerClick(); };
        this.form.btnAjouterEquipt.onclick = function () { vueSalleEdit.ajouterEquiptClick(); };
        this.form.btnValiderEquipt.onclick = function () { vueSalleEdit.validerEquiptClick(); };
        this.form.btnAnnulerEquipt.onclick = function () { vueSalleEdit.annulerEquiptClick(); };
    };
    VueSalleEdit.prototype.detailDepartement = function (valeur) {
        var err = this.erreur.edtCodeDept;
        var lesDepts = new LesDepts;
        var detail = this.form.lblDetailDept;
        detail.textContent = "";
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length > 0) {
            var dept = lesDepts.byCodeDept(chaine);
            if (dept.codeDept !== "") { // département trouvé 
                detail.textContent
                    = dept.nomDept + "\r\n" + "Responsable : " + dept.respDept;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else
            err.statut = 'vide';
    };
    VueSalleEdit.prototype.affiEquipement = function () {
        var lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
        this._grille = lesTypEquiptsBySalle.byNumSalle(this.params[1]);
        this.affiGrilleEquipement();
    };
    VueSalleEdit.prototype.affiGrilleEquipement = function () {
        while (this.form.tableEquipement.rows.length > 1) {
            this.form.tableEquipement.rows[1].remove();
        }
        var total = 0;
        var _loop_1 = function (id) {
            var unTypEquiptBySalle = this_1.grille[id];
            var tr = this_1.form.tableEquipement.insertRow();
            tr.insertCell().textContent = unTypEquiptBySalle.unTypEquipt.libEquipt;
            tr.insertCell().textContent = unTypEquiptBySalle.qte;
            var affi = this_1.params[0] === 'affi';
            if (!affi) {
                var balisea = void 0; // déclaration balise <a>
                // création balise <a> pour appel modification équipement dans salle
                balisea = document.createElement("a");
                balisea.classList.add('img_modification');
                balisea.onclick = function () { vueSalleEdit.modifierEquiptClick(id); };
                tr.insertCell().appendChild(balisea);
                // création balise <a> pour appel suppression équipement dans salle
                balisea = document.createElement("a");
                balisea.classList.add('img_corbeille');
                balisea.onclick = function () { vueSalleEdit.supprimerEquiptClick(id); };
                tr.insertCell().appendChild(balisea);
            }
            total += Number(unTypEquiptBySalle.qte);
        };
        var this_1 = this;
        for (var id in this._grille) {
            _loop_1(id);
        }
        this.form.lblTotal.textContent = total.toString();
    };
    VueSalleEdit.prototype.supprimer = function (numSalle) {
        if (confirm("Confirmez-vous la suppression de la salle " + numSalle)) {
            var lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
            lesTypEquiptsBySalle["delete"](numSalle); // suppression dans la base des equipements de la salle
            var lesSalles = new LesSalles;
            lesSalles["delete"](numSalle); // suppression dans la base de la salle	
        }
        this.retourClick();
    };
    VueSalleEdit.prototype.verifNum = function (valeur) {
        var lesSalles = new LesSalles;
        var err = this.erreur.edtNum;
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length > 0) {
            if (!chaine.match(/^([a-zA-Z0-9]+)$/)) {
                // expression régulière qui teste si la chaîne ne contient rien d'autre que des caractères alphabétiques minuscules ou majuscules et des chiffres	
                this.erreur.edtNum.statut = 'inconnu';
            }
            else if ((this.params[0] === 'ajout') && (lesSalles.idExiste(chaine))) {
                this.erreur.edtNum.statut = 'doublon';
            }
        }
        else
            err.statut = 'vide';
    };
    VueSalleEdit.prototype.verifEtage = function (valeur) {
        var err = this.erreur.edtEtage;
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length === 0) {
            err.statut = 'vide';
        }
    };
    VueSalleEdit.prototype.traiteErreur = function (uneErreur, zone) {
        var correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") { // non correct ==> erreur 
            if (uneErreur.msg[uneErreur.statut] !== '') { // erreur 
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    };
    VueSalleEdit.prototype.validerClick = function () {
        var correct = true;
        this.verifNum(this._form.edtNum.value);
        this.verifEtage(this._form.edtEtage.value);
        if (JSON.stringify(this.grille) === '{}') {
            this._erreur.equipt.statut = 'vide';
        }
        else
            this._erreur.equipt.statut = "correct";
        correct = this.traiteErreur(this._erreur.edtNum, this.form.lblNumErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtEtage, this.form.lblEtageErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtCodeDept, this.form.lblDeptErreur) && correct;
        correct = this.traiteErreur(this._erreur.equipt, this.form.lblEquiptErreur) && correct;
        var lesSalles = new LesSalles;
        var salle = new UneSalle;
        if (correct) {
            salle.numSalle = this.form.edtNum.value;
            salle.libSalle = this.form.edtLib.value;
            salle.etage = this.form.edtEtage.value;
            salle.codeDept = this.form.edtCodeDept.value;
            if (this._params[0] === 'ajout') {
                lesSalles.insert(salle);
            }
            else {
                lesSalles.update(salle);
            }
            var lesTypEquiptsBySalle = new LesTypEquiptsBySalle;
            lesTypEquiptsBySalle["delete"](salle.numSalle);
            lesTypEquiptsBySalle.insert(salle.numSalle, this.grille);
            this.retourClick();
        }
    };
    VueSalleEdit.prototype.retourClick = function () {
        location.href = "salle_liste.html";
    };
    // gestion des équipements de la salle
    VueSalleEdit.prototype.ajouterEquiptClick = function () {
        this.afficherEquitpEdit();
        // réinitialiser la liste des équipements à choisir
        this.form.listeEquipt.length = 0;
        var lesTypEquipts = new LesTypEquipts;
        var data = lesTypEquipts.all();
        var idEquipts = [];
        for (var i in this._grille) {
            idEquipts.push(this._grille[i].unTypEquipt.idEquipt);
        }
        for (var i in data) {
            var id = data[i].idEquipt;
            if (idEquipts.indexOf(id) === -1) { // pas dans la liste des équipements déjà dans la salle
                this._form.listeEquipt.options.add(new Option(data[i].libEquipt, id)); // text, value
            }
        }
    };
    VueSalleEdit.prototype.modifierEquiptClick = function (id) {
        this.afficherEquitpEdit();
        var lesTypEquipts = new LesTypEquipts();
        var unTypEquipt = lesTypEquipts.byIdEquipt(id);
        this.form.listeEquipt.length = 0;
        this.form.listeEquipt.options.add(new Option(unTypEquipt.libEquipt, id)); // text, value = 0;
        this.form.listeEquipt.selectedIndex = 0;
        this.form.edtQte.value = this._grille[id].qte;
    };
    VueSalleEdit.prototype.supprimerEquiptClick = function (id) {
        if (confirm("Confirmez-vous le retrait de l'équipement de la salle ")) {
            delete (this._grille[id]);
            this.affiGrilleEquipement();
        }
    };
    VueSalleEdit.prototype.afficherEquitpEdit = function () {
        this.form.divSalleEquiptEdit.hidden = false;
        this.form.divDetail.style.pointerEvents = 'none';
        this.form.divSalleEquiptEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    };
    VueSalleEdit.prototype.cacherEquitpEdit = function () {
        this.form.divSalleEquiptEdit.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    };
    VueSalleEdit.prototype.verifListeEquipt = function () {
        var err = this._erreur.listeEquipt;
        err.statut = "correct";
        var cible = this._form.listeEquipt;
        if (cible.value === "") {
            err.statut = 'vide';
        }
    };
    VueSalleEdit.prototype.verifQte = function () {
        var err = this._erreur.edtQte;
        err.statut = "correct";
        var valeur = this._form.edtQte.value;
        if (!((Number.isInteger(Number(valeur))) && (Number(valeur) > 0))) {
            err.statut = 'vide';
        }
    };
    VueSalleEdit.prototype.validerEquiptClick = function () {
        var correct = true;
        this.verifListeEquipt();
        this.verifQte();
        correct = this.traiteErreur(this._erreur.listeEquipt, this.form.lblSelectEquiptErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;
        if (correct) {
            var lesTypEquipts = new LesTypEquipts;
            // ajout visuel de la ligne dans la grille tabulaire de la liste des équipements d'une salle
            var unTypEquipt = lesTypEquipts.byIdEquipt(this._form.listeEquipt.value);
            var unTypEquiptBySalle = new UnTypEquiptBySalle(unTypEquipt, this._form.edtQte.value);
            this._grille[unTypEquipt.idEquipt] = unTypEquiptBySalle;
            this.affiGrilleEquipement();
            this.annulerEquiptClick();
        }
    };
    VueSalleEdit.prototype.annulerEquiptClick = function () {
        this.cacherEquitpEdit();
    };
    return VueSalleEdit;
}());
var vueSalleEdit = new VueSalleEdit;
export { vueSalleEdit };
//# sourceMappingURL=class_salle_edit.js.map