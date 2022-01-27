

# GROUPOMANIA
En tant que nouveau devellopeur de la société, je dois mettre en place un reseau social interne de manière à permettre une meilleure cohésion au sein du groupe Groupomania.
Il m'a été donné carte blanche pour mettre en place le back-end et le front-end avec pour objectif de develloper une application proche de Reddit ou 9GAG.

## Contexte : 
Voici les exigences du comité de direction :
- la présentation des fonctionnalités doit être simple ; 
- la création d’un compte doit être simple et possible depuis un téléphone mobile ;
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;- - la suppression du compte doit être possible ; 
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent ;
- L’accès à un forum où les salariés publient des textes doit être présent ; les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ; 
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre le ou la chargé-e de communication Groupomania doit pouvoir afficher les dernières participations des employés salariés
- La base de données doit se manipuler avec le language SQL
- Les données de connexion doivent être sécurisées
- Le projet doit être inclusif en respectant les standards du WACG 


## Reflexions fonctionnelles sur la partie User & Modération

1. Utilisateur “lambda” doit pouvoir :
    - créer un compte avec : nom - prénom - email - mot de passe ⇒ Le réseau étant interne seul une adresse groupomania.com sera accepté
    - Se logger à partir de son email & mot de passe
    - Ajouter un avatar (et une description à son profil)
    - L’utilisateur doit pouvoir poster un texte et/ou une image ou un lien
    - L’utilisateur doit pouvoir modifier ou supprimer son post 
    - L’utilisateur doit pouvoir voir les posts des autres utilisateurs et retrouver simplement un post :
            1. Option A : Faire apparaitre les posts du plus récent au plus anciens
            2. Option B : thématique de post
            3.Option C : Intégration d’un bloc “ mes posts commentés”
    - L’utilisateur doit pouvoir liker un post
    - L’utilisateur doit pouvoir commenter un post

2. Le modérateur doit pouvoir : 
    - créer un post 
    - supprimer un post 
    - supprimer un commentaire 
    - Commenter un post 



## Technologies, logiciels,langages,frameworks, plugins utilisés
- Visual Studio Code
- Git, GitHubDesktop & Github
- Html, CSS , JS

- Backend :
    a. NodeJs
    b. Nodemon
    c. mySQL
    d. Sequelize
    e.Express
    f.bcrypt
    g. Rate limit / helmet / path /multer /JsonwebToken ...
    i. Multer

- Frontend
    a.Vuejs
    b.Vuerouter
    c.Vueex
    d.vueUI
    e.vuetify

## Contraintes techniques spécifiques
Un cahier des charges précis est disponible <p><a href= https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf> ici </a></p>

