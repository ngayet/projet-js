var view = {};

/**
 * return text of input text zone
 */
view.getTextZoneSaisie = function () {
  return $("input#zone_saisie").val();
};

/**
 * return title of recherche in recherches enregistrées
 */
view.getTitreRecherche = function (elt) {
  if (elt.tagName == "IMG") {
    return $(elt).prev().children(":first").text();
  } else {
    return $(elt).children(":first").text();
  }
};

/**
 * print text on input text zone
 */
view.setTextZoneSaisie = function (text) {
  return $("input#zone_saisie").val(text);
};

/**
 * Display Loading gif in result zone
 */
view.displayLoading = function () {
  $("#resultats").empty();
  $("#wait").css("display", "block");
};

/**
 * Toggle the text of the date sort
 */
view.toggleTriDate = function () {
  if ($("#triDate").text() == "Trier par date plus ancienne") {
    $("#triDate").text("Trier par date plus récente");
  } else {
    $("#triDate").text("Trier par date plus ancienne");
  }

  nouvellesAffichees = [];
  $("#resultats")
    .children()
    .each(function () {
      nouvelle = {
        titre: $(this).children(".titre_news").text(),
        date: $(this).children(".date_news").text(),
        url: $(this).children(".titre_news").attr("href"),
      };
      nouvellesAffichees.push(nouvelle);
    });
  view.majResultats(nouvellesAffichees);
};

view.majResultats = function (tab) {
  // on vide notre zone
  $("#wait").css("display", "none");
  $("#resultats").empty();

  tab.sort(compareDate); //question 4.4 tri voir util.js pour compareDate
  // question 4.4 Tri inverse
  if ($("#triDate").text() == "Trier par date plus récente") {
    tab.reverse();
  }
  //on remplit notre zone en fonction de tab
  tab.forEach((element) => {
    element.date = formatDate(element["date"]);
    element.titre = decodeHtmlEntities(element["titre"]);
    var p = $("<p />", { class: "titre_result" });

    $("<a />", {
      class: "titre_news",
      href: decodeHtmlEntities(element["url"]),
      target: "_blank",
    })
      .text(element.titre)
      .appendTo(p);

    $("<span  />", { class: "date_news" }).text(element.date).appendTo(p);

    b = indexOfResultat(model.recherche_courante_news, element);
    $("<img  />", {
      src: b != -1 ? "img/disk15.jpg" : "img/horloge15.jpg",
    }).appendTo(
      $("<span  />", {
        class: "action_news",
        onclick:
          b != -1
            ? "controler.supprimer_nouvelle(this)"
            : "controler.sauver_nouvelle(this)",
      }).appendTo(p)
    );

    $("#resultats").append(p);
  });
  //question 4.4 pour afficher le titre "résultats(20)"
  $("#wait")
    .prev()
    .text("résultats (" + tab.length + ")");
};

/**
 * affiche une recherche dans recherche enregistrée
 */
view.ajouterRecherche = function (titre) {
  p = $("<p />", { class: "titre-recherche" })
    .css("display", "flex")
    .css("justify-content", "space-between");

  div = $("<div />", { onClick: "controler.selectionner_recherche(this)" })
    .css("display", "flex")
    .css("width", "90%");
  $("<label />").text(titre).appendTo(div);

  // question 4.4 -> affichage nombre de recherches enregistrées
  // ajout en fin de TP
  // avec le recul et nos nouvelles connaissances
  // nous aurions pu faire ça plus proprement
  // en analysant ce besoin dès le début du TP
  $("<label />")
    .css("margin-left", "5px")
    .text(" (" + model.getNbNouvellesSave(titre) + ")")
    .appendTo(div);

  div.appendTo(p);

  $("<img  />", {
    src: "img/croix30.jpg",
    class: "icone-croix",
    onClick: "controler.supprimer_recherche(this)",
  })
    .css("align-self", "center")
    .appendTo(p);
  $("#recherches-stockees").append(p);
};

/**
 * question 4.4 -> affichage nombre de recherches enregistrées (suite)
 * voir note si dessus
 */
view.refreshRecherchesStockees = function () {
  $("#recherches-stockees").empty();
  model.recherches.forEach((value) => {
    view.ajouterRecherche(value);
  });
};

/**
 * onload
 */
view.init = function () {
  //question 4.2 "OK" quand on press "entrée"
  $("#zone_saisie").keypress(function (event) {
    if (event.which == "13") {
      controler.rechercher_nouvelles();
    }
  });
  //question 4.3 autocomplete tag
  $("#zone_saisie").autocomplete({
    source: model.tags,
  });

  //question 4.4 draggable en 2 lignes ez gg wp
  $("#recherches-stockees").sortable();
  $("#recherches-stockees").disableSelection();

  model.recherches.forEach((value) => {
    view.ajouterRecherche(value);
  });
};

/**
 * delete recherche
 */
view.supprimerRecherche = function (elt) {
  $(elt).parent().remove();
};

/**
 * Print résults by pressing enter or OK button
 */
view.rechercherNouvelles = function () {
  view.displayLoading();
  $.ajax({
    url:
      "https://carl-vincent.fr/search-internships.php?data=" +
      decodeHtmlEntities(model.recherche_courante),
    method: "GET",
    dataType: "json",
    success: function (data) {
      view.majResultats(data);
    },
  });
};

/**
 * return result of the clicked element
 */
view.getNouvelle = function (elt) {
  nouvelle = {
    titre: view.getTitreNouvelle(elt),
    date: view.getDateNouvelle(elt),
    url: view.getUrlNouvelle(elt),
  };
  return nouvelle;
};

/**
 * return title result of the clicked element
 */
view.getTitreNouvelle = function (elt) {
  return $(elt).prev().prev().text();
};
/**
 * return date result of the clicked element
 */
view.getDateNouvelle = function (elt) {
  return $(elt).prev().text();
};
/**
 * return url result of the clicked element
 */
view.getUrlNouvelle = function (elt) {
  return $(elt).prev().prev().attr("href");
};

/**
 * change image when click
 */
view.toggleSaveImage = function (elt) {
  if (elt.getAttribute("onclick") == "controler.supprimer_nouvelle(this)") {
    elt.firstChild.setAttribute("src", "img/horloge15.jpg");
    elt.setAttribute("onclick", "controler.sauver_nouvelle(this)");
  } else {
    elt.firstChild.setAttribute("src", "img/disk15.jpg");
    elt.setAttribute("onclick", "controler.supprimer_nouvelle(this)");
  }
};
