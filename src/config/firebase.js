
import { initializeApp } from "firebase/app";

export let firebaseApp = null;

export const initializeProject = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDM6UUJwW5lSUn5G6_d4ofg99dAiYguu8A",
    authDomain: "food-market-820f0.firebaseapp.com",
    projectId: "food-market-820f0",
    storageBucket: "food-market-820f0.appspot.com",
    messagingSenderId: "570604403740",
    appId: "1:570604403740:web:cde2197ff4bad66893f3d9",
    measurementId: "G-06EELSYDFJ"
  };

  console.log('initialize firebase');

  // Initialize Firebase
  firebaseApp = initializeApp(firebaseConfig);
}