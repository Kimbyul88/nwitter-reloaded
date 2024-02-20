import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//여러가지 키값들이 주어진 개체
const firebaseConfig = {
  apiKey: "AIzaSyDjpHp_cSyaPzdLjMGrGpgQ3EU5zQ-gQ14",
  authDomain: "twitter-clone-b91f7.firebaseapp.com",
  projectId: "twitter-clone-b91f7",
  storageBucket: "twitter-clone-b91f7.appspot.com",
  messagingSenderId: "6083563077",
  appId: "1:6083563077:web:5651a4949c3789c6ed1d2c",
};

//위의 개체로부터 앱을 생성+초기화했다.
const app = initializeApp(firebaseConfig);

//이 앱에 대한 인증 서비스를 사용하기
export const auth = getAuth(app);
