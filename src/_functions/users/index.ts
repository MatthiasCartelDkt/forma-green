import { firestore } from "../../firebase";

import { Volunteer, Member } from "../../schemas/users/users";

export async function getAllMembers(): Promise<Member[]> {
  const result = await firestore
    .collection("users")
    .where("type", "==", "members")
    .orderBy("name", "asc")
    .get();
  return result.docs.map(
    (ref) => Object.assign({ id: ref.id }, ref.data()) as Member
  );
}

export async function getAllVolunteers(): Promise<Volunteer[]> {
  const result = await firestore
    .collection("users")
    .where("type", "==", "volunteers")
    .orderBy("name", "asc")
    .get();
  return result.docs.map(
    (ref) => Object.assign({ id: ref.id }, ref.data()) as Volunteer
  );
}

export async function removeVolunteer(id: string): Promise<void> {
  return await firestore
  .collection("users")
  .doc(id)
  .delete();
}

export async function getAllUsers(): Promise<Object[]> {
  const result = await firestore
    .collection("users")
    .orderBy("name", "asc")
    .get();
  return result.docs.map((ref) => Object.assign({ id: ref.id }, ref.data()));
}

export async function getAll(): Promise<Member[]> {
  const result = await firestore
    .collection("users")
    .orderBy("name", "asc")
    .get();
  return result.docs.map(
    (ref) => Object.assign({ id: ref.id }, ref.data()) as Member
  );
}

export async function createMember(newUser: Member) {
  try {
    await firestore.collection("users").add(newUser);
  } catch (error) {
    return error
  }
}

export async function createVolunteer(newUser: any) {
  try {
    await firestore.collection("users").doc(newUser.uid).set(newUser, { merge: true });
  } catch (error) {
    return error
  }
}

export async function getRoleMember(currentUser: any){
  try {
    if(currentUser){
      const userRef = await firestore.collection("users").doc(currentUser.uid).get()
      const userData = userRef.data()!
      return userData.type as Array<string>
    }
  } catch (error) {
    return error
    
  }
}