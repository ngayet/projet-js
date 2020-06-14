var controler = {};

controler.ajouter_recherche = function () {
  titre = view.getTextZoneSaisie();
  if (model.addRecherche(titre)) {
      model.addTag(titre); //question 4.3
    view.ajouterRecherche(titre);
  }
};

controler.supprimer_recherche = function (elt) {
  model.removeRecherche( view.getTitreRecherche(elt));
  view.supprimerRecherche(elt);
};

/**
 * onclick sur une recherche enregistrée
 */
controler.selectionner_recherche = function(elt) {
  model.recherche_courante = view.getTitreRecherche(elt);
  model.pullRechercheCouranteNews();

  view.setTextZoneSaisie(model.recherche_courante);
  view.majResultats(model.recherche_courante_news);
}

controler.init = function() {
  model.pullRecherches();
  model.pullTags();
  view.init();
}

controler.rechercher_nouvelles = function() {
  model.recherche_courante = view.getTextZoneSaisie();
  model.addTag(model.recherche_courante); //question 4.3

  model.pullRechercheCouranteNews();
  view.rechercherNouvelles();
}

controler.sauver_nouvelle = function(elt) {
  view.toggleSaveImage(elt);

  model.addNouvelle(view.getNouvelle(elt));
}

controler.supprimer_nouvelle = function(elt) {
  view.toggleSaveImage(elt);

  model.removeNouvelle(view.getNouvelle(elt));
}
