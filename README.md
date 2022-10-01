# FitHub

## Motivation
Build an end-all solution to workout tracking and incorporate the social aspect of going to the gym with friends.

## Installation
1. Install nodeJS v.16.17.0 from their [official website](https://nodejs.org/en/download/)
2. Clone the repository
`git clone https://github.com/UTSCCSCC01/finalprojectf22-fithub.git`
3. Go to the repository directory
`cd finalprojectf22-fithub`
4. Go to the backend directory
`cd backend`
5. Install backend node modules
`npm install`
6. Go to the frontend directory
`cd ../frontend`
7. Install frontend node modules
`npm install`
8. Register your local IP with Mongo to allow access to the DB (you will have to ask Andres)

## Quickstart
1. Go to the backend directory
`cd backend`
2. Start the server
`nodemon server`
3. Open a new terminal, go to the frontend directory
`cd frontend`
4. Start the server
`npm start`
5. (Optional) If you'd like to view the DB using a GUI, download and install [MongoDB Compass](https://www.mongodb.com/products/compass) and connect to the URI provided in the `backend/.env` file

You should now have the website running locally at the address specified by the `npm start` command.
Any changes you make should be automatically reflected on your browser.

## Contribution
1. Pull and checkout develop from repository
`git fetch origin develop`
`git checkout develop`
2. Create a branch off of `develop`
`git checkout -b <your_name>/<feature_name>`
3. Work on your changes. Make sure to follow the terms outlined in the team contract
4. Commit your changes with a commit message that explains them
`git commit -m "Message goes here"`
5. Push your changes to your branch
`git push origin <your_name>/<feature_name>`
6. Repeat steps 2-4 until you have finished all work for your branch
7. Open GitHub on your browser, create a pull request (PR), and make sure the base of your PR (the branch you want to merge into) is "develop". It'll auto-populate with a template
8. Fill out the PR template, create the pull request. Request a review from someone on the team
9. Resolve any requested changes, if there are none, you can merge once you get an approval
10. Once develop has been thouroughly tested, and contains all the completed features for one release, create a PR to merge "develop" into "main"

## Resources
- [Figma](https://www.figma.com/file/TSdxgEqzZrpvNsVz6VeQoi/FitHub-C01?node-id=0%3A1)
- [Jira](https://mcsapps.utm.utoronto.ca/jira/projects/FIT/issues/FIT-4?filter=allopenissues)
