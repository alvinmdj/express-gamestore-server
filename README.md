# Express Game Store Server

Back-end for Game Store project, consists of admin pages and API for front-end needs.

Admin can performs:

- Login & logout (session based).
- View dashboard, players, and transaction history.
- CRUD category, nominal, voucher, bank, payment method.
- Upload & preview image.
- Activate or deactivate voucher.
- Activate or deactivate payment method.
- Reject or confirm payments.

API: [API Documentation (Postman)](https://documenter.getpostman.com/view/16534190/UyrDCb4j)

Deployed on Heroku: [Game Store Server](https://vin-gamestore.herokuapp.com/)

## Links

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [ESLint](https://eslint.org/)
- [AdminLTE](https://adminlte.io/docs/3.2/)
- [Express - method-override](http://expressjs.com/en/resources/middleware/method-override.html)
- [express-session](http://expressjs.com/en/resources/middleware/session.html)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- [multer](https://www.npmjs.com/package/multer)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [env-cmd](https://www.npmjs.com/package/env-cmd)

## Requirements

- Node.js
- NPM
- MongoDB

## Installation

- Clone this repository:

```sh
git clone https://github.com/alvinmdj/express-gamestore-server.git
```

- Go inside the directory:

```sh
cd express-gamestore-server
```

- Install dependencies:

```sh
npm install
```

- Add .env.local and setup the local environment variables (for development):

```sh
cp .env.example .env.local
```

- Run (development):

```sh
# using nodemon
npm run dev
```

## Additionals

- Test account:

```sh
# first, import config/json/users.json to users collection in database (I use MongoDB Compass)

# login with this credentials:
email: alvin@admin.com
password: rahasia
```

- Dummy data:
  
  Import each json file from ```config/json/<collection-name>.json``` to each collection in database (I use MongoDB Compass).

## [Express Generator](https://expressjs.com/en/starter/generator.html)

- Install globally (first time only):

```sh
npm i -g express-generator
```

- View help:

```sh
express -h
```

- Generate express app:

```sh
express <app-name>

# with view engine
express --view=<view-engine> <app-name>

# example
express --view=ejs my-app
```

- Install dependencies:

```sh
npm install
```

- Copy .env.example to .env and setup the environment variable:

```sh
cp .env.example .env

# default .env setup
MODE=dev
SERVICE_NAME=express-gamestore-server
MONGO_URL=mongodb://127.0.0.1:27017/db_gamestore
SESSION_KEY=secretkey
```

- Run:

```sh
# open in localhost:3000 by default
npm run dev # development with .env.local

#

npm run prod # production with .env
```

## [MongoDB Commands](https://www.mongodb.com/docs/)

- Check version: ```mongo --nodb```

- Get inside mongo: ```mongo --quiet```

- Show databases: ```show dbs;```

- Show current db (by default will use test db): ```db```

- Create database: ```use <dbname>;```

- Show all collections: ```show collections;```

- insert one object into a collection:

```sh
# insert into 'users' collection
db.users.insertOne({ name: 'Alvin', age: 20, role: 'admin' });
```

- insert many objects:

```sh
# insert into 'users' collection
db.users.insertMany([
 { name: 'Martin', age: 20, role: 'member' },
 { name: 'Veiros', age: 15, role: 'admin' }
]);
```

- get all collection objects:

```sh
# get all data from 'users' collection
db.getCollection('users').find();

# or for better readability
db.users.find().pretty();
```

- get collection data with condition:

```sh
db.collection.find({ field: 'value' });

# example, show only admin in 'users' collection
db.users.find({ status: 'admin' });
```

- get single data by object id:

```sh
db.<collection>.find({ _id: ObjectId(<object-id>) });
```

- get single object and only show certain field:

```sh
db.<collection>.find({ _id: ObjectId(<object-id>) }, { field });

# example, show object-id and name only
db.users.find({ _id: ObjectId(<object-id>) }, {
 name: true,
});
```

- sort collection objects:

```sh
# ascending
db.collection.find().sort({ fieldName: 1 });
db.users.find().sort({ age: 1 });

#descending
db.collection.find().sort({ fieldName: -1 });
db.users.find().sort({ age: -1 });
```

- limit:

```sh
db.users.find().limit(<limit-count>);

# example limit only 2 first objects in 'users' collection
db.users.find().sort({ age: 1 }).limit(2);
```

- find one:

```sh
db.<collection>.findOne({ name: 'value' });

# example
db.users.findOne({ name: 'alvin' });
```

- get objects count:

```sh
db.<collection>.count();

# example
db.users.count();
```

- update one:

```sh
db.collection.updateOne(
 { field: 'value' },
 { $set: { field: 'value' } }
);

# example
db.users.updateOne(
 { _id: ObjectId(<object-id>) },
 { $set: { name: 'alvin martin' } }
);
```

- delete one:

```sh
db.collection.deleteOne({ field: 'value' });

# example
db.users.deleteOne({ _id: ObjectId(<object-id>) });
```

## MongoDB Atlas Setup

- Login to [MongoDB](https://www.mongodb.com/)

- Create ```new project``` (choose free tier)

- Create ```database access``` (user who can read & write)

- Create ```network access (from anywhere)```

- After database created, click ```Connect to Cluster > Connect your application```

- Copy the ```connection string url```, which looks like this: ```mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority``` and edit the username, password, and dbname

- Paste the url to ```.env``` for ```MONGO_URL```

- Paste the url to MongoDB Compass, then create database (db name & collections)

- Import json file in ```config/json``` to each collection.

## Heroku Setup

- Login to [Heroku](https://dashboard.heroku.com/)

- Create new app

- Go to ```Settings``` and setup the ```config vars``` with variables from ```.env```

- Choose deployment method ```Heroku Git``` (or ```GitHub```)

- Using ```Heroku Git```, run ```heroku login``` from root dir

- Run ```heroku git:remote -a <app-name>``` and check with ```git remote -v```

- Push to heroku with ```git push heroku main``` (run this to deploy every changes to Heroku)
