import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCr6GBPVqhWbuUgpB9eqhcO56HRAcDcn0c",
  authDomain: "forma-green-c67a8.firebaseapp.com",
  projectId: "forma-green-c67a8",
  storageBucket: "forma-green-c67a8.appspot.com",
  messagingSenderId: "947524285779",
  appId: "1:947524285779:web:8bcb58aa7dd62db0a91da6",
  measurementId: "G-BK2L86PM0T"
})

export const authInit = app.auth()
export const firestore = app.firestore()
export default app
