import { connexion, APIsql } from "../modele/connexion.js";
var UneSalle = /** @class */ (function () {
    function UneSalle(num_salle, lib_salle, etage, code_dept) {
        if (num_salle === void 0) { num_salle = ""; }
        if (lib_salle === void 0) { lib_salle = ""; }
        if (etage === void 0) { etage = ""; }
        if (code_dept === void 0) { code_dept = ""; }
        this._numSalle = num_salle;
        this._libSalle = lib_salle;
        this._etage = etage;
        this._codeDept = code_dept;
    }
    Object.defineProperty(UneSalle.prototype, "numSalle", {
        // définition des « getters » et des « setters » pour attribut privé de la classe
        get: function () { return this._numSalle; },
        set: function (num_salle) { this._numSalle = num_salle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneSalle.prototype, "libSalle", {
        get: function () { return this._libSalle; },
        set: function (lib_salle) { this._libSalle = lib_salle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneSalle.prototype, "etage", {
        get: function () { return this._etage; },
        set: function (etage) { this._etage = etage; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneSalle.prototype, "codeDept", {
        get: function () { return this._codeDept; },
        set: function (code_dept) { this._codeDept = code_dept; },
        enumerable: false,
        configurable: true
    });
    UneSalle.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = { 'numSalle': this._numSalle, 'libSalle': this._libSalle,
            'etage': this.etage, 'codeDept': this._codeDept };
        return tableau;
    };
    return UneSalle;
}());
var LesSalles = /** @class */ (function () {
    function LesSalles() {
        // rien
    }
    LesSalles.prototype.idExiste = function (num_salle) {
        // renvoie le test d’existence d’une salle dans la table
        // sert pour l’ajout d’une nouvelle salle
        return (APIsql.sqlWeb.SQLloadData("SELECT num_salle FROM salle WHERE num_salle=?", [num_salle]).length > 0);
    };
    LesSalles.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UneSalle
        var salles = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var salle = new UneSalle(item['num_salle'], item['lib_salle'], item['etage'], item['code_dept']);
            salles[salle.numSalle] = salle; // clé d’un élément du tableau : num salle
        }
        return salles;
    };
    LesSalles.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	num_salle, lib_salle, etage, code_dept ";
        sql += " FROM	SALLE";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesSalles.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesSalles.prototype.byNumSalle = function (num_salle) {
        var salle = new UneSalle;
        var salles = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle]));
        var lesCles = Object.keys(salles);
        // affecte les clés du tableau associatif « salles » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            salle = salles[lesCles[0]]; // récupérer le 1er élément du tableau associatif « salles »
        }
        return salle;
    };
    LesSalles.prototype.toArray = function (salles) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in salles) {
            T.push(salles[id].toArray());
        }
        return T;
    };
    LesSalles.prototype["delete"] = function (num_salle) {
        var sql = "DELETE	FROM	SALLE	WHERE	num_salle = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    };
    LesSalles.prototype.insert = function (salle) {
        var sql = "INSERT	INTO	SALLE(num_salle,	lib_salle,	etage, code_dept ) VALUES	(?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [salle.numSalle, salle.libSalle, salle.etage, salle.codeDept]);
    };
    LesSalles.prototype.update = function (salle) {
        var sql = "UPDATE SALLE SET lib_salle = ?, etage = ?, code_dept = ? ";
        sql += " WHERE	num_salle	= ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [salle.libSalle, salle.etage, salle.codeDept, salle.numSalle]);
    };
    return LesSalles;
}());
export { connexion };
export { UneSalle };
export { LesSalles };
//# sourceMappingURL=data_salle.js.map