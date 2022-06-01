import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { bilgiMesaj, onayMesaj ,olumsuzMesaj} from "../helper/toast";

const firebaseConfig = {
  apiKey: "AIzaSyA62meaMDXn6WMQYRCaGewI4SMU6ja8QII",
  authDomain: "ecommarce-altas.firebaseapp.com",
  projectId: "ecommarce-altas",
  storageBucket: "ecommarce-altas.appspot.com",
  messagingSenderId: "1030207312761",
  appId: "1:1030207312761:web:9149042518d17180a155a8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const yeniKullaniciKayit = (email, password, isimSoyisim, navigate) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate("/");
      onayMesaj("Kayıt Başarılı");
      updateProfile(auth.currentUser, {
        displayName: isimSoyisim,
      })
        .then(() => {})
        .catch((error) => {});
    })
    .catch((error) => {});
};

export const kullaniciGiris = (email, password, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      onayMesaj("Giriş Başarılı");
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      olumsuzMesaj("Email veya Şifre yanlış!!!")
    });
};

export const kullaniciCikis = () => {
  signOut(auth);
  bilgiMesaj("Çıkış yapıldı");
};

export const mevcutKullanici = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      setCurrentUser(false);
    }
  });
};
