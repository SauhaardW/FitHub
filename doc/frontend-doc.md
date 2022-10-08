# Frontend Documentation

## Frameworks
- We use React as our frontend framework
- We use Tailwind as our CSS framework

## index.js
The entrypoint for the React application. Simply references App.js

## App.js
This routes all URLs to their corresponding pages, i.e. `/login` to the `Login.js` page. Also performs other actions like setting `axios`'s default values.

## Pages
All of our pages are inside the `src/pages` directory. These pages are what the `App.js` routes different URLs to. We are using the functional style of React, so the definition of the pages are not components.  

These `.js` files are self-contained, they handle everything from returning the HTML to render the website (majorly using Tailwind for styling), to handling events like `onClick`. Functions are defined at the top, such as functions that send request to the backend to get data from the database. These requests are made using the `axios` library. 

## Components
The `src/components` directory contains `.js` files for elements of our website that are not standalone, they are included in other pages. This can range from complex multi-step forms like registration, to the navigation bar which is included on most of the pages.

### Others
#### public Directory
This directory contains all public files, like our favicon and others.
There should not be many changes made here.

#### strings.js
Contains strings that are commonly used throughout the application so we can make reference to them throughout the code. If we want to change a string referenced in lots of places, instead of manually changing it everywhere, you can change it here.

#### tailwind.config.js
Contains the configuration for tailwind. Can be used to define CSS styling for the "theme", which can be referenced throughout the code so that it only has to be changed in one place, similar to `strings.js`.