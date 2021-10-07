import { firestore } from "../../firebase";
import { Partnership } from "../../schemas/users/users";

export async function getPartnerAll(): Promise<Partnership[]> {
  const result = await firestore
    .collection("partnerships")
    .orderBy("name", "asc")
    .get();
  return result.docs.map(
    (ref: any) => Object.assign({ id: ref.id }, ref.data()) as Partnership
  );
}

export async function getPartnerBydId(partnerId: string): Promise<Partnership> {
  const result = await firestore
    .collection("partnerships")
    .doc(partnerId)
    .get();
  return Object.assign({ id: partnerId }, result.data()) as Partnership
}

export async function createPartnership(newPartnership: any) {
  try {
    await firestore.collection("partnerships").add(newPartnership);
  } catch (error) {
    return error
  }
}