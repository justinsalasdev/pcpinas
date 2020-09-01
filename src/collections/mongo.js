const { MongoClient } = require("mongodb")

const dbName = "pcpinas"

const uri =
	process.env.MONGODB_URI ||
	`mongodb://127.0.0.1:27017/${dbName}compressors=zlib&gssapiServiceName=mongodb`
const newClient = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const getConnectedClient = new Promise((resolve, reject) => {
	console.log("connecting..")
	newClient.connect((error, connectedClient) => {
		//createdb and
		error ? reject(error) : resolve(connectedClient)
	})
})

const getCollection = collectionName =>
	new Promise((resolve, reject) => {
		getConnectedClient
			.then(connectedClient => {
				connectedClient
					.db(dbName)
					.collection(collectionName, (error, collection) => {
						// console.log(`got ${collectionName} collection`);
						error ? reject(error) : resolve(collection)
					})
			})
			.catch(error => reject(error))
	})

getCollection("users").then(users => {
	users.indexExists("email-index", (error, indexExist) => {
		if (error) {
			console.log("check index-name error", error)
			return
		} else if (indexExist) {
			return
		} else {
			users.createIndex(
				{ email: 1 },
				{ unique: true, name: "email-index" },
				(error, result) => {
					console.log(error, result)
				}
			)
		}
	})
})

// getCollection("categories").then((categories) => {
//   categories.indexExists("catname-index", (error, indexExist) => {
//     if (error) {
//       console.log("check index-name error", error);
//       return;
//     } else if (indexExist) {
//       return;
//     } else {
//       categories.createIndex(
//         { name: 1 },
//         { unique: true, name: "catname-index" },
//         (error, result) => {
//           console.log(error, result);
//         }
//       );
//     }
//   });
// });

module.exports = { getCollection }
