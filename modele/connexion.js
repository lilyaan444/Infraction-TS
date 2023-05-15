import * as APIsql from "../modele/sqlWeb.js";
APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/INVENTAIRE/avec_bouton_sur_ligne/detail_hors_liste/vue/", "https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/");
var Connexion = /** @class */ (function () {
    function Connexion() {
        this.init();
    }
    Connexion.prototype.init = function () {
        // à adapter avec votre nom de base et vos identifiants de connexion
        APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr', '3306', 'projet_bdinventaire', 'projet_ihm', 'butinfoprojetihm', 'utf8');
    };
    return Connexion;
}());
var connexion = new Connexion;
export { connexion, APIsql };
//# sourceMappingURL=connexion.js.map