import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { useQuery } from "react-query";

export const saveItem = async (data) => {
  await setDoc(doc(db, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(db, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const fetchQuery = () => {
  return useQuery("foodItems", getAllFoodItems);
};
