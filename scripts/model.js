var model = {};
model.recherche_courante = "";
model.recherches = [];
model.recherche_courante_news = [];
model.tags = []; //question 4.3

model.addRecherche = function (titre) {
  if (model.recherches.indexOf(titre) != -1) return false;
  model.recherches.push(titre);
  model.commitRecherches();
  return true;
};

model.removeRecherche = function (titre) {
  if (model.recherches.indexOf(titre) == -1) return false;
  model.recherches.splice(model.recherches.indexOf(titre), 1);
  model.commitRecherches();
  return true;
};

model.addNouvelle = function (nouvelle) {
  if (indexOfResultat(model.recherche_courante_news, nouvelle) != -1)
    return false;
  model.recherche_courante_news.push(nouvelle);
  model.commitRechercheCouranteNews();
  return true;
};

model.removeNouvelle = function (nouvelle) {
  if (indexOfResultat(model.recherche_courante_news, nouvelle) == -1)
    return false;
  model.recherche_courante_news.splice(
    indexOfResultat(model.recherche_courante_news, nouvelle),
    1
  );
  model.commitRechercheCouranteNews();
  return true;
};

 //question 4.3
model.addTag = function (titre) {
  if (model.tags.indexOf(titre) != -1) return false;
  model.tags.push(titre);
  model.commitTags();
  return true;
};

 //question 4.3
model.removeTag = function (titre) {
  if (model.tags.indexOf(titre) == -1) return false;
  model.tags.splice(model.tags.indexOf(titre), 1);
  model.commitTags();
  return true;
};

/**
 * commit recherches in local storage
 */
model.commitRecherches = function () {
  localStorage.setItem("recherches", JSON.stringify(model.recherches));
};

/**
 * pull recherches in local storage
 */
model.pullRecherches = function () {
  model.recherches = JSON.parse(localStorage.getItem("recherches")) || [];
};

/**
 * commit recherche_courante_news in local storage
 */
model.commitRechercheCouranteNews = function () {
  localStorage.setItem(
    model.recherche_courante,
    JSON.stringify(model.recherche_courante_news)
  );
};

/**
 * pull recherche_courante_news in local storage
 */
model.pullRechercheCouranteNews = function () {
  model.recherche_courante_news =
    JSON.parse(localStorage.getItem(model.recherche_courante)) || [];
};

/**
 * commit tags in local storage
 *  question 4.3
 */
model.commitTags = function () {
  localStorage.setItem("tags", JSON.stringify(model.tags));
};

/**
 * pull tags in local storage
 *  question 4.3
 */
model.pullTags = function () {
  model.tags = JSON.parse(localStorage.getItem("tags")) || [];
};
