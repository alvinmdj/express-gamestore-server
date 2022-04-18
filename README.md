# Express Game Store Server

## Links

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [ESLint](https://eslint.org/)

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

- Run (development):

```sh
# using nodemon
npm run dev
```

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

- Run:

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
