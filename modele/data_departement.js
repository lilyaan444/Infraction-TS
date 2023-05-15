import { connexion, APIsql } from "../modele/connexion.js";
var UnDept = /** @class */ (function () {
    function UnDept(code_dept, nom_dept, resp_dept) {
        if (code_dept === void 0) { code_dept = ""; }
        if (nom_dept === void 0) { nom_dept = ""; }
        if (resp_dept === void 0) { resp_dept = ""; }
        // initialisation à l’instanciation
        this._codeDept = code_dept;
        this._nomDept = nom_dept;
        this._respDept = resp_dept;
    }
    Object.defineProperty(UnDept.prototype, "codeDept", {
        // définition des « getters » et des « setters » pour attribut privé de la classe
        get: function () { return this._codeDept; },
        set: function (code_dept) { this._codeDept = code_dept; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnDept.prototype, "nomDept", {
        get: function () { return this._nomDept; },
        set: function (nom_dept) { this._nomDept = nom_dept; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnDept.prototype, "respDept", {
        get: function () { return this._respDept; },
        set: function (resp_dept) { this._respDept = resp_dept; },
        enumerable: false,
        configurable: true
    });
    UnDept.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = { 'codeDept': this.codeDept, 'nomDept': this.nomDept, 'respDept': this.respDept };
        return tableau;
    };
    return UnDept;
}());
var LesDepts = /** @class */ (function () {
    function LesDepts() {
        // rien
    }
    LesDepts.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDept 
        var depts = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var dept = new UnDept(item['code_dept'], item['nom_dept'], item['resp_dept']);
            depts[dept.codeDept] = dept; // clé d’un élément du tableau : code dépt 
        }
        return depts;
    };
    LesDepts.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	code_dept, nom_dept, resp_dept  FROM  DEPARTEMENT ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesDepts.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesDepts.prototype.byCodeDept = function (code_dept) {
        var dept = new UnDept;
        var depts = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("code_dept = ?"), [code_dept]));
        var lesCles = Object.keys(depts);
        // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            dept = depts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
        }
        return dept;
    };
    LesDepts.prototype.toArray = function (depts) {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs 
        // pour un affichage dans un tableau HTML
        var T = [];
        for (var id in depts) {
            T.push(depts[id].toArray());
        }
        return T;
    };
    return LesDepts;
}());
export { connexion };
export { UnDept };
export { LesDepts };
//# sourceMappingURL=data_departement.js.map