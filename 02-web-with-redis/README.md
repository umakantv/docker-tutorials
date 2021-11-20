# Lesson 2 - Multiple Containers with docker-compose
In this lesson we require a node app and redis server. We could choose to install redis server in the same container as our node app, but that would not be ideal if we were to scale the application and if we required to create multiple instances of the container to handle large number of requests.  
So we create two different containers, where our `node-app` containers needs to communicate to `redis-server` container.

## Using Docker-compose to connect multiple containers
Although it's possible to configure networking between containers, we instead make use of docker-compose to handle that for us.  
We just define the services and they will then be hosted on the same network.  
Services can communicate with each other using the service name itself. For eg. We use `redis-server` to create a redis client in our node app and the redis host is automatically resolved by docker.

## Docker-compose commands
1. `docker-compose up` will run the containers.
2. `docker-compose up --build` will build it again before running the containers. We don't need to specify the name of the image as with `docker run umakantv/docker-t-01`, because well there is no a single image and docker-compose will create and figure out the name of the images from the services.
3. `docker-compose up -d` will run the containers in background.
4. `docker-compose down` will stop all the containers.

## Restart policies
Servers crash. Based on the error code, we can choose a restart policy for a container/service from the following: on, always, on-failure, unless-stopped.

## More
For fun I used apache benchmark to test the count in case of concurrency with the command `ab -n 5000 -c 500 http://localhost:4001/`. Obviously the count is wrong. And you can see the redis server complaining about something.  
The individual images created for each service will be listed in `docker images`.