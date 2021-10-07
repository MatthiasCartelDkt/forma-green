import { config } from 'firebase-functions'
import * as admin from 'firebase-admin'

export const init = () => {
  admin.initializeApp(config().firebase)
}
export const storage = () => admin.storage()
export const firestore = () => admin.firestore()
export const auth = () => admin.auth()

export type Auth = admin.auth.Auth
export type UserRecord = admin.auth.UserRecord
export type Firestore = admin.firestore.Firestore
