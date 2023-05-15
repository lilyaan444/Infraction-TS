import { connexion, APIsql } from "../modele/connexion.js";
var UnTypEquipt = /** @class */ (function () {
    function UnTypEquipt(id_equipt, lib_equipt, commentaire) {
        if (id_equipt === void 0) { id_equipt = ""; }
        if (lib_equipt === void 0) { lib_equipt = ""; }
        if (commentaire === void 0) { commentaire = ""; }
        this._idEquipt = id_equipt;
        this._libEquipt = lib_equipt;
        this._commentaire = commentaire;
    }
    Object.defineProperty(UnTypEquipt.prototype, "idEquipt", {
        get: function () {
            return this._idEquipt;
        },
        set: function (id_equipt) {
            this._idEquipt = id_equipt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTypEquipt.prototype, "libEquipt", {
        get: function () {
            return this._libEquipt;
        },
        set: function (lib_equipt) {
            this._libEquipt = lib_equipt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTypEquipt.prototype, "commentaire", {
        get: function () {
            return this._commentaire;
        },
        set: function (commentaire) {
            this._commentaire = commentaire;
        },
        enumerable: false,
        configurable: true
    });
    UnTypEquipt.prototype.toArray = function () {
        var tableau = { 'idEquipt': this._idEquipt, 'libEquipt': this._libEquipt,
            'commentaire': this._commentaire };
        return tableau;
    };
    return UnTypEquipt;
}());
var LesTypEquipts = /** @class */ (function () {
    function LesTypEquipts() {
        // rien
    }
    LesTypEquipts.prototype.load = function (result) {
        var typEquipts = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var typEquipt = new UnTypEquipt(item['id_equipt'], item['lib_equipt'], item['commentaire']);
            typEquipts[typEquipt.idEquipt] = typEquipt;
        }
        return typEquipts;
    };
    LesTypEquipts.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT id_equipt, lib_equipt, commentaire";
        sql += " FROM TYPE_EQUIPT";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY lib_equipt ASC ";
        return sql;
    };
    LesTypEquipts.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesTypEquipts.prototype.byIdEquipt = function (id_equipt) {
        var typEquipt = new UnTypEquipt;
        var typEquipts = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_equipt	= ?"), [id_equipt]));
        var lesCles = Object.keys(typEquipts);
        if (lesCles.length > 0) {
            typEquipt = typEquipts[lesCles[0]];
        }
        return typEquipt;
    };
    LesTypEquipts.prototype.toArray = function (typEquipts) {
        var T = [];
        for (var id in typEquipts) {
            T.push(typEquipts[id].toArray());
        }
        return T;
    };
    return LesTypEquipts;
}());
// Classe représentant la relation « contient » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « TypEquiptBySalle ». 
// Cela indique que l’accès aux données de la relation détail « TYPE_EQUIPT » 
// se fait par l’identifiant « num_salle » de la relation maître « SALLE »
var UnTypEquiptBySalle = /** @class */ (function () {
    function UnTypEquiptBySalle(unTypEquipt, qte) {
        if (unTypEquipt === void 0) { unTypEquipt = null; }
        if (qte === void 0) { qte = ""; }
        this._unTypEquipt = unTypEquipt;
        this._qte = qte;
    }
    Object.defineProperty(UnTypEquiptBySalle.prototype, "qte", {
        // définition des « getters » et des « setters » pour les attributs privés de la classe
        get: function () { return this._qte; },
        set: function (qte) { this._qte = qte; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTypEquiptBySalle.prototype, "unTypEquipt", {
        get: function () { return this._unTypEquipt; },
        set: function (unTypEquipt) { this._unTypEquipt = unTypEquipt; },
        enumerable: false,
        configurable: true
    });
    UnTypEquiptBySalle.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = this.unTypEquipt.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        tableau['qte'] = this.qte;
        return tableau;
    };
    return UnTypEquiptBySalle;
}());
var LesTypEquiptsBySalle = /** @class */ (function () {
    function LesTypEquiptsBySalle() {
        // rien
    }
    LesTypEquiptsBySalle.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        var typEquiptsBySalle = {};
        var lesTypEquipts = new LesTypEquipts();
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var unTypEquipt = lesTypEquipts.byIdEquipt(item['id_equipt']);
            var typEquiptBySalle = new UnTypEquiptBySalle(unTypEquipt, item['qte']);
            typEquiptsBySalle[typEquiptBySalle.unTypEquipt.idEquipt] = typEquiptBySalle;
        }
        return typEquiptsBySalle;
    };
    LesTypEquiptsBySalle.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT id_equipt, qte";
        sql += " FROM	contient";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    /*
        private load(result : APIsql.TdataSet) :	TTypEquiptsBySalle	{
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
            let typEquiptsBySalle : TTypEquiptsBySalle = {};
            for (let i=0; i<result.length; i++) {
                const item:APIsql.TtabAsso = result[i];
                const typEquiptBySalle = new UnTypEquiptBySalle(new UnTypEquipt(item['id_equipt'], item['lib_equipt'] , item['commentaire'])
                                                                , item['qte']);
                typEquiptsBySalle[typEquiptBySalle.unTypEquipt.idEquipt] = typEquiptBySalle;
            }
            return typEquiptsBySalle;
        }
    
        private prepare(where:string):string {
            let sql : string;
            sql	= "SELECT contient.id_equipt as id_equipt, lib_equipt, commentaire, qte";
            sql += " FROM	contient  JOIN  TYPE_EQUIPT  ON contient.id_equipt=TYPE_EQUIPT.id_equipt";
            if (where.trim() !== "")
            {
                sql	+= " WHERE " +where;
            }
            sql	+= " ORDER BY lib_equipt ";
            return sql;
        }
    */
    LesTypEquiptsBySalle.prototype.byNumSalle = function (num_salle) {
        // renvoie le tableau d’objets contenant tous les équipements de la salle num salle
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle]));
    };
    LesTypEquiptsBySalle.prototype.byNumSalleIdEquipt = function (num_salle, id_equipt) {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        var typEquiptBySalle = new UnTypEquiptBySalle;
        var typEquiptsBySalle = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ? and id_equipt = ?"), [num_salle, id_equipt]));
        if (!typEquiptsBySalle[0] === undefined) {
            typEquiptBySalle = typEquiptsBySalle[0];
        }
        return typEquiptBySalle;
    };
    LesTypEquiptsBySalle.prototype.toArray = function (typEquipts) {
        var T = [];
        for (var id in typEquipts) {
            T.push(typEquipts[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    };
    LesTypEquiptsBySalle.prototype.getTotalNbEquipt = function (typEquipts) {
        // renvoie la quantité totale d’équipements d’une salle
        var total = 0;
        for (var id in typEquipts) {
            total += Number(typEquipts[id].qte);
        }
        return total.toString();
    };
    LesTypEquiptsBySalle.prototype["delete"] = function (num_salle) {
        var sql;
        sql = "DELETE	FROM	contient	WHERE	num_salle = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    };
    LesTypEquiptsBySalle.prototype.insert = function (num_salle, typEquipts) {
        // requête d’ajout d’un équipement avec une quantité dans « contient » pour la salle num_salle
        var sql;
        var separateur = "";
        sql = "INSERT INTO contient(num_salle,id_equipt, qte) VALUES ";
        for (var cle in typEquipts) {
            sql += separateur + "('" + num_salle + "','" + typEquipts[cle].unTypEquipt.idEquipt + "','" + typEquipts[cle].qte + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    };
    return LesTypEquiptsBySalle;
}());
export { connexion };
export { UnTypEquipt };
export { LesTypEquipts };
export { UnTypEquiptBySalle };
export { LesTypEquiptsBySalle };
//# sourceMappingURL=data_equipement.js.map