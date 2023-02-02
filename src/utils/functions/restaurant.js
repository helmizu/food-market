import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import getDistance from 'geolib/es/getDistance';
import { getUserLocation } from '../storage';

export const addRestaurant = async (data = {}) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "restaurants"), data);
  return docRef;
}

export const getRestaurants = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "restaurants"));
  const data = [];
  const userCoords = getUserLocation();
  await querySnapshot.forEach((doc) => {
    const item = doc.data();
    const restoCoords = item.latlng ? { latitude: item.latlng.split(',')[0], longitude: item.latlng.split(',')[1] } : null;
    const distanceInMeters = restoCoords && userCoords ? getDistance(userCoords, restoCoords) : 0;
    const distance = `${(distanceInMeters / 1000).toFixed(1)} km`;
    data.push({ id: doc.id, ...item, distance })
  });
  return data;
}
export const getRestaurant = async (restaurantId = '') => {
  const db = getFirestore();

  const docRef = doc(db, "restaurants", restaurantId);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() };
}