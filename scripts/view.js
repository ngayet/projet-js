var view = {};

view.getTextZoneSaisie = function () {
  return $("input#zone_saisie").val();
};

view.getTitreRecherche = function (elt) {
  if (elt.tagName == "IMG") {
    return $(elt).prev().children(":first").text();
  } else {
    return $(elt).children(":first").text();
  }
};

view.setTextZoneSaisie = function (text) {
  return $("input#zone_saisie").val(text);
};

view.displayLoading = function () {
  $("#resultats").empty();
  $("#wait").css("display", "block");
};

view.toggleTriDate = function(){
  if($('#triDate').text() == "Trier par date plus ancienne"){
    $('#triDate').text("Trier par date plus récente");
  }else{
    $('#triDate').text("Trier par date plus ancienne");
  }
}

view.majResultats = function (tab) {
  $("#wait").css("display", "none");
  $("#resultats").empty();
  tab.sort(compareDate); //question 4.4 tri voir util.js pour compareDate

  if($('#triDate').text() == "Trier par date plus récente"){
    tab.reverse();
  }

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
  //question 4.4 titre résultats(20)
  $("#wait")
    .prev()
    .text("résultats (" + tab.length + ")");
};

view.ajouterRecherche = function (titre) {
  p = $("<p />", { class: "titre-recherche" })
    .css("display", "flex")
    .css("justify-content", "space-between");

  div = $("<div />", { onClick: "controler.selectionner_recherche(this)" })
    .css("display", "flex")
    .css("width", "90%");
  $("<label />").text(titre).appendTo(div);

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

view.refreshRecherchesStockees = function () {
  $("#recherches-stockees").empty();
  model.recherches.forEach((value) => {
    view.ajouterRecherche(value);
  });
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

  //draggable
  $( "#recherches-stockees" ).sortable();
  $( "#recherches-stockees" ).disableSelection();

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
