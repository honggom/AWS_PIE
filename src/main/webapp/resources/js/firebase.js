/*
파일명: firebase.js
설명: 파이어베이스 계정 생성
작성일: 2021-01-17
기능구현: 도재구
*/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCdHidf9NRo0bO3u_PkkvuDEITZSv6zD6U",
  authDomain: "project-pie-1.firebaseapp.com",
  databaseURL: "https://project-pie-1-default-rtdb.firebaseio.com/",
  projectId: "project-pie-1",
  storageBucket: "project-pie-1.appspot.com",
  messagingSenderId: "915296979109",
  appId: "1:915296979109:web:728d97cbf2fa188342654c",
  measurementId: "G-KJHDHQ0QJC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();