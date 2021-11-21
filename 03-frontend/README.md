# Lesson 3 - React Project with Docker
> In the tutorial, instructor used `node:alpine` as baseimage but some of the dependencies of `create-react-app <project-name> --template typescript` failed on node version 17(alpine version at the time of writing this). So we used the node version to 12-alpine explicitly.

## Development with docker
* `docker build -f Dockerfile.dev -t <tag> .` will use the specified file for building the image.
* We will want to make change to our source code and have the changes reflected on the browser. For that we will instruct docker to use the files on our local machine while running that container.  
`docker run -p 3000:3000 -v $(pwd):/app <tag>` will overwrite the path `/app` in the container to `$(pwd)` on the local machine. To get comfortable with this idea, try running the container in shell mode with and without mapping the directories using the commands `docker run -it -p 3000:3000 -v $(pwd):/app <tag> sh` and `docker run -it -p 3000:3000 -v <tag> sh` while having the different file contents in the directories.
* We can map multiple directories. And we can also instruct docker to use a directory inside the container without using the colon, eg, `docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <tag>`.

### Duplicate dependencies
Copying over `node_modules` doesn't make sense and slows down the build process.
So we can delete the folder from our local machine and keep them on the docker container only.  
One problem with that is our code editor can't find the modules it needs.

## Using docker-compose
As you can see the `docker run` command is getting a little complicated, so we can setup docker-compose to run the container with all these settings for us. Notice the changes made to `build` config and new setting called `volumes`.

Use `docker-compose up` to get the server running.

## Running tests
1. One way to run tests is to run the container with docker-compose and then using `docker exec -it <container id> npm run tests` command. The downside for this is that we have to run `docker ps` to get the id. But we can use the different commands provided to us to manipulate the tests.
2. The other way is to create another service in docker-compose by providing a `command: ["npm", "run", "test"]`. But there is no way to manage tests manually.

## Building and hosting with nginx
React project on build spits out static files that we can server using a http server, in our case nginx. Earlier the hosting was handled by react development server itself.  
So we need to have a multi-step build configuration to build and host our project.  
We created a `Dockerfile` with these configuration. Note that all the files related to building will be dropped by docker once we copy the files from the previous build stage using `--from builder` flag.