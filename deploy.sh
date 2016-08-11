#! /bin/bash

# Use this script to deploy the app to heroku.
# This first sets the required buildpacks then pushes to heroku
# This will remove old data, populate it with some seed data and create 2 default users
# admin@useriq.com - useriq16
# user@userq.com - useriq16

heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/ruby
git push heroku master
heroku pg:reset DATABASE_URL --confirm sales-seed
heroku run rails db:migrate
heroku run rails setup:seed_db
