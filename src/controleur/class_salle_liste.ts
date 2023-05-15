import {UneSalle, LesSalles, TSalles}	from "../modele/data_salle.js"
import {LesDepts}						from "../modele/data_departement.js"
import {LesTypEquiptsBySalle}			from "../modele/data_equipement.js"

// détail affiché dans le tableau
import { UnDept } from "../modele/data_departement.js"
import {UnTypEquiptBySalle, TTypEquiptsBySalle }			from "../modele/data_equipement.js"
// -------------------------------------------

type TSalleListeForm = { 
	divTitre:HTMLElement, btnAjouter:HTMLInputElement, tableSalle : HTMLTableElement 
}

class VueSalleListe {	// tableau contenant le résultat d'une requête retournant un tableau de lignes ; chaque ligne contenant un tableau associatif
	private _form   	: TSalleListeForm;
	
	constructor() {
	// rien								
    }

	get form()  :TSalleListeForm 	{ return this._form		}

	init(form : TSalleListeForm ):void {
		this._form   = form;

		const lesSalles = new LesSalles;
		const data : TSalles = lesSalles.all();	
		const lesDepts				= new LesDepts();
		const lesTypEquiptsBySalle	= new LesTypEquiptsBySalle();

		// construction du titre
		this.form.divTitre.textContent = 'Liste des Infractions';

		for (let num in data) {
			const uneSalle : UneSalle = data[num];
			const tr = this.form.tableSalle.insertRow();

			let balisea : HTMLAnchorElement; // déclaration balise <a>
			// création balise <a> pour appel page visualisation du détail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_visu')

		// détail affiché dans le tableau 	
			balisea.onclick = function():void { vueSalleListe.detailSalleClick(uneSalle.numSalle, tr.rowIndex); }
		// --------------------------------	

			tr.insertCell().appendChild(balisea)

			tr.insertCell().textContent = uneSalle.numSalle;
			tr.insertCell().textContent = uneSalle.libSalle;
			tr.insertCell().textContent = uneSalle.etage;
			tr.insertCell().textContent = uneSalle.codeDept;
			tr.insertCell().textContent = lesDepts.byCodeDept(uneSalle.codeDept).nomDept;	
			tr.insertCell().textContent = lesTypEquiptsBySalle.getTotalNbEquipt(lesTypEquiptsBySalle.byNumSalle(num));	

			// création balise <a> pour appel page modification du détail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_modification')
			balisea.onclick = function():void { vueSalleListe.modifierSalleClick(uneSalle.numSalle); }
			tr.insertCell().appendChild(balisea)
			// création balise <a> pour appel page suppression d'une salle
			balisea = document.createElement("a")
			balisea.classList.add('img_corbeille')
			balisea.onclick = function():void { vueSalleListe.supprimerSalleClick(uneSalle.numSalle); }
			tr.insertCell().appendChild(balisea)

		// détail affiché dans le tableau
			const trdetail	= this.form.tableSalle.insertRow();
			trdetail.hidden = true;
			trdetail.insertCell(); // 1ère colonne vide
			trdetail.insertCell(); // 2ème colonne vide
			const td 		= trdetail.insertCell();
			td.colSpan 		= 7;		
		// ----------------------------------------------------	
		
		}

		// définition événement onclick sur bouton "ajouter"  
		this.form.btnAjouter.onclick = function():void { vueSalleListe.ajouterSalleClick(); }

	}
	
	detailSalleClick(num : string,  noLigne = -1):void {
		if (noLigne === -1) {
			location.href = "salle_edit.html?affi&" +encodeURIComponent(num);
		}
		else {	
		// détail affiché dans le tableau
			const tr = this.form.tableSalle.rows[noLigne+1];
			if (tr.hidden) {
				const lesSalles = new LesSalles;
				const salle = lesSalles.byNumSalle(num);
				tr.hidden = false;

				const lesDepts = new LesDepts;
				const dept : UnDept = lesDepts.byCodeDept(salle.codeDept);
				let chaine = '';

				//	chaine += salle.numSalle +' - ' +salle.libSalle +' - étage : ' +salle.etage +'<br>';
				chaine += 'Département : '
					+dept.codeDept +' - ' +dept.nomDept +' - Responsable : ' +dept.respDept +'<br>'
					+'<b>Equipement installé</b><br>'

				const lesTypEquiptsBySalle = new LesTypEquiptsBySalle(); 
				const lesEquipts : TTypEquiptsBySalle = lesTypEquiptsBySalle.byNumSalle(num);
				for (let id in lesEquipts) {
					const unEquipt : UnTypEquiptBySalle = lesEquipts[id];
					chaine += '    > ' +unEquipt.unTypEquipt.libEquipt + ' x' +unEquipt.qte +'<br>';
				}
				tr.cells[2].innerHTML = chaine;  // innerHTML pour la prise en compte de la balise HTML <br>
			}
			else tr.hidden = true;
		// ----------------------------------------------------
		} 
	}
	
	modifierSalleClick(num : string):void {
		location.href = "salle_edit.html?modif&" +encodeURIComponent(num);		
	}
	supprimerSalleClick(num : string):void {
		location.href = "salle_edit.html?suppr&" +encodeURIComponent(num);		
	}
	ajouterSalleClick():void {
		location.href = "salle_edit.html?ajout";		
	}	
}	

let vueSalleListe = new VueSalleListe;

export {vueSalleListe}