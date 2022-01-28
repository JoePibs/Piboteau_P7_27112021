

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
    d.Express
    d.bcrypt
    g.no cache/ path /multer /JsonwebToken ...
    i. Multer

- Frontend
    a.Vuejs - NuxtJS
    b.Axios
    c.nuxt/colormode
    d.Boostrap Vue (icons)
    e.Day jS

## Contraintes techniques spécifiques
Un cahier des charges précis est disponible <p><a href= https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf> ici </a></p>

## pour lancer le projet

cd frontend && npm run dev
cd backend é&& nodemon 

==> http://localhost:8000/



# GROUPOMANIA
As a new develloper of the company, I have to set up an internal social network in order to allow a better cohesion within the Groupomania group.
I was given carte blanche to set up the back-end and the front-end with the objective to develloper an application close to Reddit or 9GAG.

## Context: 
Here are the requirements of the management committee:
- the presentation of the functionalities must be simple; 
- the creation of an account must be simple and possible from a cell phone;
- the profile must contain very little information so that its completion is fast; - the deletion of the account must be possible; 
- access to a forum where employees can publish multimedia content must be available;
- Access to a forum where employees publish texts must be present; users must be able to easily locate the latest contributions of employees ; 
- the Groupomania communication manager must be able to moderate interactions between employees and the Groupomania communication manager must be able to display the latest employee contributions
- The database must be manipulated with the SQL language
- The connection data must be secure
- The project must be inclusive by respecting the WACG standards 


## Functional reflections on the User & Moderation part

1. Lambda" user must be able to :
    - create an account with : name - first name - email - password ⇒ The network being internal only a groupomania.com address will be accepted
    - Log in with his email & password
    - Add an avatar (and a description to his profile)
    - The user must be able to post a text and/or an image or a link
    - User must be able to edit or delete their post 
    - The user must be able to see the posts of other users and easily find a post:
            1. Option A: Display the posts from the most recent to the oldest
            2. Option B : Post theme
            3.option C : Integration of a block "my commented posts
    - The user must be able to like a post
    - The user must be able to comment a post

2. The moderator must be able to:
    - create a post
    - delete a post
    - delete a comment
    - Comment on a post



## Technologies, software, languages, frameworks, plugins used
- Visual Studio Code
- Git, GitHubDesktop & Github
- HTML, CSS, JS

- Backend: 
    a. NodeJs
    b. Nodemon
    c. mySQL
    d.Express
    d.bcrypt
    g.no cache/ path /multer /JsonwebToken ...
    i. Multer

- Front-end
    a.Vuejs - NuxtJS
    b.Axios
    c.nuxt/colormode
    d.Boostrap Vue (icons)
    e.Day jS

## Specific technical constraints
A precise specification is available <p><a href= https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf> here </a ></p>

## to launch the project

cd frontend && npm run dev
cd backend && nodemon

==> http://localhost:8000/
