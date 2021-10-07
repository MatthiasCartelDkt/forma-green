import * as functions from 'firebase-functions';
import * as admin from './admin'


admin.init()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const sendUserData = functions.auth.user().onCreate((user) => {
    console.log(user)
    try {
        // admin.firestore().collection("users").doc(user.uid).set({ email: user.email})    
        console.log('Hey new user registered wanna send and welcoming email ?')
    } catch (error) {
        return error
    }
})