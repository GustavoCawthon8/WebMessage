// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmZT0ps5RZjmbtyi_H_wX_lrAeJSGAhYI",
  authDomain: "webmessage-bf138.firebaseapp.com",
  projectId: "webmessage-bf138",
  storageBucket: "webmessage-bf138.firebasestorage.app",
  messagingSenderId: "592947940618",
  appId: "1:592947940618:web:ea71c6ac92abb8f16cbef3",
  measurementId: "G-XVMFYX58TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const mensagensRef = ref(db, "mensagens");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const msg = document.getElementById("message").value;

  push(mensagensRef, { nome: name, mensagem: msg })
    .then(() => {
      document.getElementById("message").value = "";
    })
    .catch((erro) => {
      console.error(erro);
    })

});

onValue(mensagensRef, (snapshot) => {
  const data = snapshot.val();
  const campoMessage = document.getElementById("campoMessage");

  for (const id in data) {
    const mensagem = data[id];
    const div = document.createElement("div");
    div.setAttribute("class", "alert alert-success w-100 p-3 maxWidth");
    
    
    div.textContent = `${mensagem.nome}: ${mensagem.mensagem}`;
    
    campoMessage.appendChild(div);
  }
}); 
