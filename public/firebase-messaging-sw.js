// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB_gIx9o3CEWslOdGz9P3lAbbK1mjIRLf0",
  authDomain: "webackend-7454d.firebaseapp.com",
  projectId: "webackend-7454d",
  storageBucket: "webackend-7454d.appspot.com",
  messagingSenderId: "645113398515",
  appId: "1:645113398515:web:31a2ba7edf06423dd42386",
  measurementId: "G-1STGBMWT6S",
  databaseURL: "https://webackend-7454d.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

// messaging?.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "./logo.png",
//     default: false,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener("push", (event) => {
  const payload = event.data.json();
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
