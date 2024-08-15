React Softuni App is an application that has been developed for the exam at the end of the React course.

# Food-Hunt

The application represents a SPA application where users could see/post/edit/delete/buy offers.
For the purpose of Front-End development it was used React.js with a building tool Vite.
For the purpose of storing information and authentication/authorization it was used Firestore.
Using Firebase Google cloud storage as a storage to file uploads and downloads.

# Roles

Non-authenticated users can visit the application and are authorized to see and use:

    * Register - allows the user to Register and perform authenticated operations afterwards
    * Login - allows the user to Login with an existing account and perform authenticated operations afterwards
    * Recipes - allows the user to see all created recipes that have been added
    * Recipes details - allows the user to see more details of a recipe such as its ingredients and preparation.
    
Authenticated users (non-owners) can visit the application and are authorized to see and use:

    * Profile - allows the user to see who is logged in currently (with avatar which can be changed) and User information like e-mail/name as well as the recipes that have been liked by the current user and own ones in different tabs.
    * Recipes - allows the user to see all created recipes that have been listed.
    * Recipes details - allows the user to see more details of a recipe as well it is possible to add it to own favorite list.
    * Recipe create - allows the user to create own recipes.

Authenticated users (owners) can visit the application and are authorized to see and use:

    * Profile - allows the user to see who is logged in currently (with avatar which can be changed) and User information like e-mail/name as well as the recipes that have been liked by the current user and own ones in different tabs.
    * Recipes - allows the user to see all created recipes that have been listed.
    * Recipes details - allows the user to see more details of a recipe as well it is possible to EDIT/DELETE it.
    * Recipe details edit - functionality that allows the user to change the details of an recipe that is under their ownership;
    * Recipe details delete - functionality that allows the user to delete an recipe that is under their ownership;
    
# Routes

* Routes
    * / - Displays home page;
    * /recipes - Displays all recipes;
    * /login - Displays Login page;
    * /register - Displays Register page;
    * /recipes/:id - Displays specific recipe's details
    * /profile - Displays user's profile data and the recipes that have been liked or owned so far;
    * /recipes/:id/edit - Displays a form in which the the owner of the offer could edit the offer's details
    * /recipes/:id/delete - Deletes the respective recipe (only for owners)
    * /add - Displays a form in which authenticated users could create a recipe



# How to run the project

In order to run the project on your own, you need to run the following commands:

* npm init - to initializer the project
* npm run build - to make changes in dist folder
* npm run dev - to host it locally in dev

Once the "npn run dev" command has been exectued, the terminal will display the port at which you could access the application.

#Firebase hosting

* npm run build - to make changes in dist folder before deploy
* firebase serve - to check locally if everything is correct
* firebase deploy - just to show last version online

The applications has also been published on a free hosting provided by Firebase.
URL: https://food-recipes-d564f.web.app/

Please note that the application stored on Firebase might differ from the source code in GitHub as we cannot ensure that the latest version will be available as soon as developed.
