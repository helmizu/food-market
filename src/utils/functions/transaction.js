import { collection, addDoc, getDocs, getFirestore, serverTimestamp, query, updateDoc, where, doc } from "firebase/firestore";

export const addTransaction = async (data = {}) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "transactions"), { ...data, createdAt: serverTimestamp(), status: 'In Progress' });
  return docRef;
}

export const getTransactions = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "transactions"));
  const data = [];;
  await querySnapshot.forEach((doc) => {
    const item = doc.data();
    data.push({ id: doc.id, ...item })
  });
  return data;
}

export const getTransactionsByUser = async (uid = '') => {
  const db = getFirestore();
  const ref = collection(db, "transactions");
  const q = query(ref, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const data = [];
  await querySnapshot.forEach((doc) => {
    const item = { id: doc.id, ...doc.data() };
    data.push(item)
  });
  return data;
}

export const updateTransactionStatus = async (id = '', status = '') => {
  const db = getFirestore();
  const docRef = doc(db, "transactions", id);
  const docSnap = await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
  return { ...docSnap, id }
}
