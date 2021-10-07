import { firestore } from "../../firebase";
import { Partnership } from "../../schemas/users/users";

export async function getPartnerAll(): Promise<Partnership[]> {
  const result = await firestore
    .collection("partnerships")
    .orderBy("name", "asc")
    .get();
  return result.docs.map(
    (ref) => Object.assign({ id: ref.id }, ref.data()) as Partnership
  );
}

export async function getPartnerBydId(partnerId: string): Promise<Partnership> {
  const result = await firestore
    .collection("partnerships")
    .doc(partnerId)
    .get();
  if (!result.exists) throw { code: 404, message: `Course doesn't exist in database with id ${partnerId}` }
  return Object.assign({ id: partnerId }, result.data()) as Partnership
}

export async function createPartnership(newPartnership: any) {
  try {
    await firestore.collection("partnerships").add(newPartnership);
  } catch (error) {
    return error
  }
}