// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

function ajouter_recherche() {
  var value = $("input#zone_saisie").val();
  if (recherches.indexOf(value) == -1) {
    recherches.push(value);

    var p = $("<p />", { class: "titre-recherche" });
    $("<label />", { onClick: "selectionner_recherche(this)" })
      .text(value)
      .appendTo(p);
    $("<img  />", {
      src: "img/croix30.jpg",
      class: "icone-croix",
      onClick: "supprimer_recherche(this)",
    }).appendTo(p);
    $("#recherches-stockees").append(p);
  }

  localStorage.setItem("recherches", JSON.stringify(recherches));
}

function supprimer_recherche(elt) {
  recherches.splice(recherches.indexOf($(elt).prev().text()), 1);
  $(elt).parent().remove();
  localStorage.setItem("recherches", JSON.stringify(recherches));
}

function selectionner_recherche(elt) {
  recherche_courante = $(elt).text();
  $("input#zone_saisie").val(recherche_courante);
  recherches = JSON.parse(localStorage.getItem("recherches"));

  $("#resultats").empty();
  recherche_courante_news = JSON.parse(
    localStorage.getItem(recherche_courante)
  );
  recherche_courante_news.forEach((element) => {
    var p = $("<p />", { class: "titre_result" });

    $("<a />", {
      class: "titre_news",
      href: decodeHtmlEntities(element["url"]),
      target: "_blank",
    })
      .text(decodeHtmlEntities(element["titre"]))
      .appendTo(p);

    $("<span  />", { class: "date_news" })
      .text(decodeHtmlEntities(element["date"]))
      .appendTo(p);

    $("<img  />", { src: "img/disk15.jpg" }).appendTo(
      $("<span  />", {
        class: "action_news",
        onclick: "supprimer_nouvelle(this)",
      }).appendTo(p)
    );

    $("#resultats").append(p);
  });
}

function init() {
  recherches = JSON.parse(localStorage.getItem("recherches"));
  recherches.forEach((value) => {
    var p = $("<p />", { class: "titre-recherche" });
    $("<label />", { onClick: "selectionner_recherche(this)" })
      .text(value)
      .appendTo(p);
    $("<img  />", {
      src: "img/croix30.jpg",
      class: "icone-croix",
      onClick: "supprimer_recherche(this)",
    }).appendTo(p);
    $("#recherches-stockees").append(p);
  });
}

function rechercher_nouvelles() {
  recherche_courante = $("#zone_saisie").val();
  recherche_courante_news = JSON.parse(
    localStorage.getItem(recherche_courante)
  );
  $("#resultats").empty();
  $("#wait").css("display", "block");
  $.ajax({
    url:
      "https://carl-vincent.fr/search-internships.php?data=" +
      decodeHtmlEntities($("input#zone_saisie").val()),
    method: "GET",
    dataType: "json",
    success: function (data) {
      maj_resultats(data);
    },
  });
}

function maj_resultats(res) {
  $("#wait").css("display", "none");

  res.forEach((element) => {
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

    $("<span  />", { class: "date_news" })
      .text(element.date)
      .appendTo(p);

    b = indexOfResultat(recherche_courante_news, element);

    $("<img  />", {
      src: (b != -1 ? "img/disk15.jpg" : "img/horloge15.jpg"),
    }).appendTo(
      $("<span  />", {
        class: "action_news",
        onclick: (b != -1 ? "supprimer_nouvelle(this)" : "sauver_nouvelle(this)"),
      }).appendTo(p)
    );

    $("#resultats").append(p);
  });
}

function sauver_nouvelle(elt) {
  elt.firstChild.setAttribute("src", "img/disk15.jpg");
  elt.setAttribute("onclick", "supprimer_nouvelle(this)");

  var recherche = {
    titre: $(elt).prev().prev().text(),
    date: $(elt).prev().text(),
    url: $(elt).prev().prev().attr("href"),
  };

  if (indexOfResultat(recherche_courante_news, recherche) == -1) {
    recherche_courante_news.push(recherche);
  }
  localStorage.setItem(
    recherche_courante,
    JSON.stringify(recherche_courante_news)
  );
}

function supprimer_nouvelle(elt) {
  elt.firstChild.setAttribute("src", "img/horloge15.jpg");
  elt.setAttribute("onclick", "sauver_nouvelle(this)");

  var recherche = {
    titre: $(elt).prev().prev().text(),
    date: $(elt).prev().text(),
    url: $(elt).prev().prev().attr("href"),
  };

  if (indexOfResultat(recherche_courante_news, recherche) != -1) {
    recherche_courante_news.splice(
      indexOfResultat(recherche_courante_news, recherche),
      1
    );
  }

  localStorage.setItem(
    recherche_courante,
    JSON.stringify(recherche_courante_news)
  );
}
