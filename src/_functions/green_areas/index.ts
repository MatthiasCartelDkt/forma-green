import { firestore } from "../../firebase";
import { Green_Areas } from "../../schemas/green_areas/green_areas";

export async function getGreenAreas(): Promise<Green_Areas[]> {
  const result = await firestore
    .collection("green_areas")
    .orderBy("site_name", "asc")
    .get();
  return result.docs.map(
    (ref) => Object.assign({ id: ref.id }, ref.data()) as Green_Areas
  );
}

export async function addArea(newGreenArea: Green_Areas[]) {
  try {
    await firestore.collection("green_areas").add(newGreenArea);
  } catch (error) {
    return error;
  }
}
