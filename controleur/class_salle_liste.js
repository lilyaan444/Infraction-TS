import { LesSalles } from "../modele/data_salle.js";
import { LesDepts } from "../modele/data_departement.js";
import { LesTypEquiptsBySalle } from "../modele/data_equipement.js";
var VueSalleListe = /** @class */ (function () {
    function VueSalleListe() {
        // rien								
    }
    Object.defineProperty(VueSalleListe.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    VueSalleListe.prototype.init = function (form) {
        this._form = form;
        var lesSalles = new LesSalles;
        var data = lesSalles.all();
        var lesDepts = new LesDepts();
        var lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
        // construction du titre
        this.form.divTitre.textContent = 'Liste des Infractions';
        var _loop_1 = function (num) {
            var uneSalle = data[num];
            var tr = this_1.form.tableSalle.insertRow();
            var balisea = void 0; // déclaration balise <a>
            // création balise <a> pour appel page visualisation du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_visu');
            // détail affiché dans le tableau 	
            balisea.onclick = function () { vueSalleListe.detailSalleClick(uneSalle.numSalle, tr.rowIndex); };
            // --------------------------------	
            tr.insertCell().appendChild(balisea);
            tr.insertCell().textContent = uneSalle.numSalle;
            tr.insertCell().textContent = uneSalle.libSalle;
            tr.insertCell().textContent = uneSalle.etage;
            tr.insertCell().textContent = uneSalle.codeDept;
            tr.insertCell().textContent = lesDepts.byCodeDept(uneSalle.codeDept).nomDept;
            tr.insertCell().textContent = lesTypEquiptsBySalle.getTotalNbEquipt(lesTypEquiptsBySalle.byNumSalle(num));
            // création balise <a> pour appel page modification du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_modification');
            balisea.onclick = function () { vueSalleListe.modifierSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
            // création balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a");
            balisea.classList.add('img_corbeille');
            balisea.onclick = function () { vueSalleListe.supprimerSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
            // détail affiché dans le tableau
            var trdetail = this_1.form.tableSalle.insertRow();
            trdetail.hidden = true;
            trdetail.insertCell(); // 1ère colonne vide
            trdetail.insertCell(); // 2ème colonne vide
            var td = trdetail.insertCell();
            td.colSpan = 7;
        };
        var this_1 = this;
        for (var num in data) {
            _loop_1(num);
        }
        // définition événement onclick sur bouton "ajouter"  
        this.form.btnAjouter.onclick = function () { vueSalleListe.ajouterSalleClick(); };
    };
    VueSalleListe.prototype.detailSalleClick = function (num, noLigne) {
        if (noLigne === void 0) { noLigne = -1; }
        if (noLigne === -1) {
            location.href = "salle_edit.html?affi&" + encodeURIComponent(num);
        }
        else {
            // détail affiché dans le tableau
            var tr = this.form.tableSalle.rows[noLigne + 1];
            if (tr.hidden) {
                var lesSalles = new LesSalles;
                var salle = lesSalles.byNumSalle(num);
                tr.hidden = false;
                var lesDepts = new LesDepts;
                var dept = lesDepts.byCodeDept(salle.codeDept);
                var chaine = '';
                //	chaine += salle.numSalle +' - ' +salle.libSalle +' - étage : ' +salle.etage +'<br>';
                chaine += 'Département : '
                    + dept.codeDept + ' - ' + dept.nomDept + ' - Responsable : ' + dept.respDept + '<br>'
                    + '<b>Equipement installé</b><br>';
                var lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
                var lesEquipts = lesTypEquiptsBySalle.byNumSalle(num);
                for (var id in lesEquipts) {
                    var unEquipt = lesEquipts[id];
                    chaine += '    > ' + unEquipt.unTypEquipt.libEquipt + ' x' + unEquipt.qte + '<br>';
                }
                tr.cells[2].innerHTML = chaine; // innerHTML pour la prise en compte de la balise HTML <br>
            }
            else
                tr.hidden = true;
            // ----------------------------------------------------
        }
    };
    VueSalleListe.prototype.modifierSalleClick = function (num) {
        location.href = "salle_edit.html?modif&" + encodeURIComponent(num);
    };
    VueSalleListe.prototype.supprimerSalleClick = function (num) {
        location.href = "salle_edit.html?suppr&" + encodeURIComponent(num);
    };
    VueSalleListe.prototype.ajouterSalleClick = function () {
        location.href = "salle_edit.html?ajout";
    };
    return VueSalleListe;
}());
var vueSalleListe = new VueSalleListe;
export { vueSalleListe };
//# sourceMappingURL=class_salle_liste.js.map