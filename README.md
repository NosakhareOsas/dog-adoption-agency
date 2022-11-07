# DOG-ADOPTION-AGENCY

This is a full stack React-Rails application that allows users to submit their dogs
for adoption and adopt other users' dogs if interested.

## User Stories
https://docs.google.com/document/d/1-1V6f13rlXRBsmCC9mOQy1ugjt6dg_D2nyRX9vIopMU/edit?usp=sharing

## Production deployment link
https://powerful-headland-48083.herokuapp.com/

## Install Rails

    bundle install

## Install React

    npm install --prefix client

## Run the app

    rails s
    npm start --prefix client


## test association methods and custom methods with console

    rails c

# REST API

The REST API to the dog-adoption-agency React App is described below.

## Get list of Dogs

### Request

`GET /api/dogs`

    curl -i -H 'Accept: application/json' http://localhost:9292/api/dogs

### Response

    HTTP/1.1 200 OK
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    []

## Get a specific dog

### Request

`GET /api/dogs/:id`

    curl -i -H 'Accept: application/json' http://localhost:9292/api/dogs/87

### Response

    HTTP/1.1 200 OK
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {}

## Get a non-existent dog

### Request

`GET /api/dogs/:id"`

    curl -i -H 'Accept: application/json' http://localhost:9292/api/dogs/106698383

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json

    {errors: ["Dog not Found"]}

## Create new dog profile

### Request

`POST /api/dogs/new`

    curl -i -H 'Accept: application/json' -d '{}' http://localhost:3000/api/dogs/new

### Response

    HTTP/1.1 201 Created
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

## permited parameters
    params.permit(:name, :gender, :breed, :image_url, :size, :age).with_defaults(user_id: session[:user_id], is_adopted: false)

## Adopt a Dog

### Request

`PATCH /api/dogs/:id`

    curl -i -H 'Accept: application/json' -X PATCH -d 'is_adopted=true, adopted_by=sam234' http://localhost:9292/api/dogs/9

### Response

    HTTP/1.1 200 OK
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {is_adopted: true, adopted_by: currentUser}

## Delete a dog profile

### Request

`DELETE /api/dogs/:id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:9292//api/dogs/89

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 16 Sept 2022 12:36:30 GMT
    Status: 204 No Content
    Connection: close








