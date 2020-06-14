var view = {};

view.getTextZoneSaisie = function () {
  return $("input#zone_saisie").val();
};

view.getTitreRecherche = function (elt) {
  if (elt.tagName == "IMG") {
    return $(elt).prev().text();
  } else {
    return $(elt).text();
  }
};

view.setTextZoneSaisie = function (text) {
  return $("input#zone_saisie").val(text);
};

view.displayLoading = function () {
  $("#resultats").empty();
  $("#wait").css("display", "block");
};

view.majResultats = function (tab) {
  $("#wait").css("display", "none");
  $("#resultats").empty();
  tab.sort(compareDate); //question 4.4 tri voir util.js pour compareDate
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
};

view.ajouterRecherche = function (value) {
  var p = $("<p />", { class: "titre-recherche" });
  $("<label />", { onClick: "controler.selectionner_recherche(this)" })
    .text(value)
    .appendTo(p);
  $("<img  />", {
    src: "img/croix30.jpg",
    class: "icone-croix",
    onClick: "controler.supprimer_recherche(this)",
  }).appendTo(p);
  $("#recherches-stockees").append(p);
};

view.init = function () {
  //question 4.2
  $("#zone_saisie").keypress(function (event) {
    if (event.which == "13") {
      controler.rechercher_nouvelles();
    }
  });
  //question 4.3
  $("#zone_saisie").autocomplete({
    source: model.tags,
  });

  model.recherches.forEach((value) => {
    view.ajouterRecherche(value);
  });
};

view.supprimerRecherche = function (elt) {
  $(elt).parent().remove();
};

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

view.getNouvelle = function (elt) {
  nouvelle = {
    titre: view.getTitreNouvelle(elt),
    date: view.getDateNouvelle(elt),
    url: view.getUrlNouvelle(elt),
  };
  return nouvelle;
};

view.getTitreNouvelle = function (elt) {
  return $(elt).prev().prev().text();
};

view.getDateNouvelle = function (elt) {
  return $(elt).prev().text();
};

view.getUrlNouvelle = function (elt) {
  return $(elt).prev().prev().attr("href");
};

view.toggleSaveImage = function (elt) {
  if (elt.getAttribute("onclick") == "controler.supprimer_nouvelle(this)") {
    elt.firstChild.setAttribute("src", "img/horloge15.jpg");
    elt.setAttribute("onclick", "controler.sauver_nouvelle(this)");
  } else {
    elt.firstChild.setAttribute("src", "img/disk15.jpg");
    elt.setAttribute("onclick", "controler.supprimer_nouvelle(this)");
  }
};
