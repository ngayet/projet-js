!()[websit.png]

# Fonctionnalité

- Ajout d'une recherche (1.1.) :  
La chaîne saisie dans la zone de saisie (le champ de recherche) est recopiée dans la zone “recherches stockées” (si pas déjà présente)
- Sélection d'une recherche (1.1.) :  
La recherche sélectionnée dans la zone "recherches stockées" est recopiée dans la zone de saisie
- Suppression d'une recherche (1.1.) :  
La recherche supprimée dans la zone "recherches stockées" disparaît de cette zone
- Sauvegarde des recherches avec cookies (ou localstorage) (1.2.) :  
Lorsque la page est rechargée, on retrouve les recherches stockées
- Déclenchement d'une recherche (1.3.) :  
Le clic sur OK déclenche l'affichage de l'icône de chargement puis l'affichage des nouveaux résultats (cliquables)
- Changement d'icône (2.1.) :  
Le clic sur l'icône horloge fait afficher une icône disquette (et inversement)
- Sauvegarde des nouvelles (2.1.) :  
Un cookie (par recherche) est déposé, contenant la description de toutes les nouvelles sauvegardées
- Rechargement des nouvelles sauvegardées (2.2.) :  
Le clic sur une des recherches stockées permet de faire afficher les nouvelles sauvegardées pour cette recherche
- Affichage des résultats avec nouvelles déjà sauvegardées (2.2.) :  
Si une recherche est de nouveau lancée et qu'elle retourne des résultats déjà sauvegardés auparavant, ceux-ci apparaissent avec l'icône disque
- Structuration MVC du code (3.)
- Retour chariot comme clic sur OK (4.2.)
- Auto-complétion (4.3.)
- Amélioration jQuery UI (4.4.) :  
Ordonner par défaut les résultats par date (avec possiblement en plus, la possibilité de changer l'ordre de tri quand on clique sur un bouton à ajouter dans l'interface) - Il faut cliquer sur le texte en bas à droite.
- Amélioration jQuery UI (4.4.) :  
Réorganiser la liste des recherches stockées en les déplaçant par glisser-déposer dans la liste
- Autre amélioration (4.4) :  
Afficher dans l'entête "résultats", le nombre de résultats retournés par une recherche (Par exemple sous la forme : "résultats (20)")
- Autre amélioration (4.4) :  
Afficher le nombre de nouvelles sauvegardées à côté de leur recherche stockée associée (Par exemple : "web grenoble (3)" s'il y a 3 offres sauvegardées associées à la recherche stockée "web grenoble")
