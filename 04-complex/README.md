
# Multi-container Applications with Docker compose and Travis CI

In this tutorial, 
* We first "dockerize" multiple services using `Dockerfile.dev` and `Dockerfile`.
* We then setup a development environment for multiple services using `docker-compose`.  
    This file is entirely for development purpose and has nothing to do with deployment. We can ensure this as `docker-compose` uses `environment`, `ports`, `volumnes` blocks that we need to run the services together in the development environment. In prod, these configurations could be different.   
    For deployment we will use `Dockerfile` from each service and build and deploy each service independently.  
* After the development is done, we setup Travis CI for the application to test and build the images
* Once the images are built, Travis CI pushes the images for each service to docker hub