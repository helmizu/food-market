import { collection, addDoc, getDocs, getFirestore, serverTimestamp } from "firebase/firestore";

export const addTransaction = async (data = {}) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "transactions"), { ...data, createdAt: serverTimestamp() });
  return docRef;
}

export const getTransactions = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "restaurants"));
  const data = [];;
  await querySnapshot.forEach((doc) => {
    const item = doc.data();
    data.push({ id: doc.id, ...item })
  });
  return data;
}

