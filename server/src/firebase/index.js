var admin = require('firebase-admin')

var serviceAccount = require('../config/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommeres-8666c.firebaseio.com',
})
