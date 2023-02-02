import { collection, addDoc, getDocs, getFirestore, updateDoc, doc, getDoc, deleteDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addMenu = async (data = {}) => {
  const db = getFirestore();
  const imageName = data.image.name;
  const docRef = await addDoc(collection(db, "menu"), { ...data, image: imageName });
  if (docRef.id) {
    const storage = getStorage();
    const imagePath = `/images/menu/${docRef.id}_${imageName}`
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, data.image);
    const imageUrl = await getDownloadURL(storageRef)
    await updateDoc(docRef, { imageUrl, imagePath })
  }
  return docRef;
}

export const getAllMenu = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "menu"));
  const data = [];
  await querySnapshot.forEach((doc) => {
    const item = { id: doc.id, ...doc.data() };
    data.push(item)
  });
  return data;
}

export const getMenuByRestaurant = async (restaurantId = '') => {
  const db = getFirestore();
  const ref = collection(db, "menu");
  const q = query(ref, where("restaurantId", "==", restaurantId));
  const querySnapshot = await getDocs(q);
  const data = [];
  await querySnapshot.forEach((doc) => {
    const item = { id: doc.id, ...doc.data() };
    data.push(item)
  });
  return data;
}

export const getMenu = async (menuId = '') => {
  const db = getFirestore();

  const docRef = doc(db, "menu", menuId);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() };
}

export const updateMenu = async (data = {}) => {
  const db = getFirestore();
  const { id = '', ...dataUpdate } = data;
  const docRef = doc(db, "menu", id);
  if (typeof data.image !== 'string') {
    const storage = getStorage();
    const imageName = data.image.name;
    const imagePath = `/images/menu/${docRef.id}_${imageName}`
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, data.image);
    const imageUrl = await getDownloadURL(storageRef)
    return await updateDoc(docRef, { ...dataUpdate, image: imageName, imageUrl, imagePath })
  }
  return await updateDoc(docRef, dataUpdate);
}

export const deleteMenu = async (menuId = '') => {
  const db = getFirestore();
  const docRef = doc(db, "menu", menuId);
  return await deleteDoc(docRef);
}