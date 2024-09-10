// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/messaging";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB_gIx9o3CEWslOdGz9P3lAbbK1mjIRLf0",
  authDomain: "webackend-7454d.firebaseapp.com",
  projectId: "webackend-7454d",
  storageBucket: "webackend-7454d.appspot.com",
  messagingSenderId: "645113398515",
  appId: "1:645113398515:web:31a2ba7edf06423dd42386",
  measurementId: "G-1STGBMWT6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firebase Messaging and get a reference to the service
const messaging = async () => (await isSupported()) && getMessaging(app);

export { getToken, messaging };

export default app;

export const getDeviceToken = async () => {
  // const permission = await Notification.requestPermission();

  // if (permission === "granted") {
  // }
  try {
    const message = await messaging();
    if (!message) return;

    const token = await getToken(message, {
      vapidKey: import.meta.env.VITE_CLOUD_MESSAGE_VAPIDKEY,
    });

    return token;
  } catch (error) {
    console.error("Error: ", error);
  }
};
export const onMessageListener = async () => {
  const message = await messaging();
  if (!message) return;
  return new Promise((resolve) => {
    onMessage(message, (payload) => {
      resolve(payload);
    });
  });
};

async function requestPermission() {
  try {
    await Notification.requestPermission();
    console.log('Notification permission granted.');
  } catch (error) {
    console.error('Error requesting notification permission', error);
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Call function to request permission
requestPermission();