import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "Enter message sender Id from config here"
  });

  navigator.serviceWorker
  .register('/my-sw.js')
  .then((registration) => {
    firebase.messaging().useServiceWorker(registration);
  });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token:', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }