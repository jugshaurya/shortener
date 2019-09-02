# urlShortner
Lets Build a Full Stack Url Shortner 


- npm init
- npm install express( Fast, unopinionated, minimalist web framework for node).
- npm install morgan(HTTP request logger middleware for node.js)

- Building an Express App

- serving a html page from public folder for form inputs
- calling backend to take the form-data

- adding mongo as db  and mongodb as driver
- npm install mongodb
- make a connection to db
- grab the collection out of db
- use collection to figure out if mapping exist or not 
 - if exist throw error
 - else add a new entry to database 


##  Database Creation for testing

- use dbname => create a db in mongodb
-switched to db shau_shortner
> db
shau_shortner
> db.createCollection('mapped_urls')
{ "ok" : 1 }


## Deployment with Zeit's now.sh

```
Add a now.json File
{
    "name": "project-name",
    "version": 2,
    "builds" : [
        
        // Serving server from index.js
        {
            "src": "index.js",
            "use" : "@now/node-server"
        },
        
        // for serving static files from public folder
        {
            "src" : "public/*",
            "use" : "@now/static"
        }
    ],
    "routes": [
        { "src": "/.*", "dest": "index.js" }
]
}

```

