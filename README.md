# Express Game Store Server

Back-end app for Game Store project, consists of admin side pages and API.

Admin can performs:

- Login & logout (session based).
- View dashboard, players, and transaction history.
- CRUD category, nominal, voucher, bank, payment method.
- Upload & preview image.
- Activate or deactivate voucher.
- Activate or deactivate payment method.
- Reject or confirm payments.

## Links

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [ESLint](https://eslint.org/)
- [AdminLTE](https://adminlte.io/docs/3.2/)
- [Express - method-override](http://expressjs.com/en/resources/middleware/method-override.html)
- [express-session](http://expressjs.com/en/resources/middleware/session.html)
- [connect-flash](https://www.npmjs.com/package/connect-flash)

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

- Add .env and setup environment variables:

```sh
cp .env.example .env
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

- Run (development):

```sh
# open in localhost:3000 by default
npm run start
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
