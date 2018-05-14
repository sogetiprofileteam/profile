# Sogeti Portfolio
The Sogeti Portfolio project is an attempt at using an open source project model to deliver bottom-up value to the organization.

To contribute please contact Larry Foulkrod or Dave Gardner to be added to the repository.

## How to contribute.
1. Locate a task on the [project board](https://github.com/DavidMGardner/sogeti-portfolio/projects/7) and assign it to yourself.
2. Create a new branch and complete the task
3. Submit a pull request to master.

## Running the API
1. `cd server`  
2. `DB_USER="{username}" DB_PWD="{pwd}" npm run dev`    
The #portfolio-ato-proj Slack channel has the values for the environment variables which you can use to connect to the mlab database. You could run mongodb locally in which case you can override the database connection string with the DB_CONN environment variable.

## Running the UI
1. `cd ui`  
2. `npm run start`