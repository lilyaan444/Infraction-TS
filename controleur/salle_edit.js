import { vueSalleEdit } from "../controleur/class_salle_edit.js";
vueSalleEdit.init({
    divDetail: document.querySelector('[id=div_salle_detail]'),
    edtNum: document.querySelector('[id=edt_salle_num]'),
    divTitre: document.querySelector('[id=div_salle_titre]'),
    edtLib: document.querySelector('[id=edt_salle_lib]'),
    edtEtage: document.querySelector('[id=edt_salle_etage]'),
    edtCodeDept: document.querySelector('[id=edt_salle_codedept]'),
    btnRetour: document.querySelector('[id=btn_salle_retour]'),
    btnValider: document.querySelector('[id=btn_salle_valider]'),
    btnAnnuler: document.querySelector('[id=btn_salle_annuler]'),
    lblDetailDept: document.querySelector('[id=lbl_salle_detail_dept]'),
    lblNumErreur: document.querySelector('[id=lbl_erreur_num]'),
    lblEtageErreur: document.querySelector('[id=lbl_erreur_etage]'),
    lblDeptErreur: document.querySelector('[id=lbl_erreur_dept]'),
    lblEquiptErreur: document.querySelector('[id=lbl_erreur_equipt]'),
    divSalleEquipt: document.querySelector('[id=div_salle_equipement]'),
    divSalleEquiptEdit: document.querySelector('[id=div_salle_equipement_edit]'),
    btnAjouterEquipt: document.querySelector('[id=btn_equipement_ajouter]'),
    lblTotal: document.querySelector('[id=lbl_equipement_total]'),
    tableEquipement: document.querySelector('[id=table_equipement]'),
    listeEquipt: document.querySelector('[id=select_equipement]'),
    edtQte: document.querySelector('[id=edt_equipement_qte]'),
    btnValiderEquipt: document.querySelector('[id=btn_equipement_valider]'),
    btnAnnulerEquipt: document.querySelector('[id=btn_equipement_annuler]'),
    lblSelectEquiptErreur: document.querySelector('[id=lbl_erreur_select_equipement]'),
    lblQteErreur: document.querySelector('[id=lbl_erreur_qte]')
});
// définition des événements
/*
vueSalleEdit.form.edtCodeDept.addEventListener  ('change',  function () { vueSalleEdit.detailDepartement(vueSalleEdit.form.edtCodeDept.value); });
vueSalleEdit.form.btnRetour.addEventListener    ('click',   function () { vueSalleEdit.retourClick(); });
vueSalleEdit.form.btnAnnuler.addEventListener   ('click',   function () { vueSalleEdit.retourClick(); });
vueSalleEdit.form.btnValider.addEventListener   ('click',   function () { vueSalleEdit.validerClick(); });
vueSalleEdit.form.btnAjouterEquipt.addEventListener   ('click',   function () { vueSalleEdit.ajouterEquiptClick(); });
vueSalleEdit.form.btnValiderEquipt.addEventListener   ('click',   function () { vueSalleEdit.validerEquiptClick(); });
vueSalleEdit.form.btnAnnulerEquipt.addEventListener   ('click',   function () { vueSalleEdit.annulerEquiptClick(); });
*/
//# sourceMappingURL=salle_edit.js.map