import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/INVENTAIRE/avec_bouton_sur_ligne/detail_hors_liste/vue/",
						"https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")
class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec votre nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','projet_bdinventaire', 'projet_ihm','butinfoprojetihm', 'utf8')
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

