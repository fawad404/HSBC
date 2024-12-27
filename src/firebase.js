import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe7OBUK3DXolfIhn3lhUGuCCA-kVtvKdM",
  authDomain: "hsbc-business-banking.firebaseapp.com",
  projectId: "hsbc-business-banking",
  storageBucket: "hsbc-business-banking.firebasestorage.app",
  messagingSenderId: "882285994495",
  appId: "1:882285994495:web:ac7e9fb962f26b7cf987ca",
  measurementId: "G-Q514Z8Z3WK"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCwZOeh_ohz9bysr7VhKbBUnR4PP330S-E",
//   authDomain: "otp-verificaiton-c345d.firebaseapp.com",
//   projectId: "otp-verificaiton-c345d",
//   storageBucket: "otp-verificaiton-c345d.firebasestorage.app",
//   messagingSenderId: "333081282673",
//   appId: "1:333081282673:web:4cd0ba1f1251482eecf3d0"
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
