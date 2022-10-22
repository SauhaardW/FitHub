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
`git fetch origin dev`
`git checkout dev`
2. Create a branch off of `dev`
`git checkout -b <your_name>/<ticketnumber>` (Make sure ticket number matches the associated ticket, i.e. `andres/FIT-27`)
3. Work on your changes. Make sure to follow the terms outlined in the team contract
4. Add the files you want to commit to your stage
`git add <filepath>`
5. Commit your changes with a commit message that explains them
`git commit -m "[<ticketnumber>] Message goes here"`
6. Push your changes to your branch
`git push origin <your_name>/<ticketnumber>`
7. Repeat steps 2-4 until you have finished all work for your branch
8. Open GitHub on your browser, create a pull request (PR), and make sure the base of your PR (the branch you want to merge into) is "dev". It'll auto-populate with a template
9. Fill out the PR template, create the pull request. Request a review from someone on the team
10. Resolve any requested changes, if there are none, you can merge once you get an approval. Make sure to solve any merge conflicts
11. Once dev has been thouroughly tested, and contains all the completed features for one release, create a PR to merge "dev" into "main"

## Resources
- [Figma](https://www.figma.com/file/TSdxgEqzZrpvNsVz6VeQoi/FitHub-C01?node-id=0%3A1)
- [Jira](https://mcsapps.utm.utoronto.ca/jira/projects/FIT/) 
- [Trello](https://trello.com/invite/b/WhcprWrB/ATTIc5b158f589ed9a8d565d0a1f0c5b3c21392ACC39/sprint-2)


## FAQ
`I get a package missing error when I try running the frontend/backend, what's wrong?`
You are missing a package. `cd` into the directory which is failing to run, and run `npm install`.
If this doesn't fix it, try installing the package directly. `npm install <packagename>`.

`How do I install a new package I want to use?`
Use `npm install --save <packagename>`. This will install the package and save it in the `package.json`, that way others will have it automatically installed whenever they run `npm install`.