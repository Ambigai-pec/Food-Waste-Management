// Firebase imports (browser safe)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCIfWAFvJis9H7R33cKIQbC0WlGQtMbqK8",
  authDomain: "food-waste-management-9e874.firebaseapp.com",
  projectId: "food-waste-management-9e874",
  storageBucket: "food-waste-management-9e874.firebasestorage.app",
  messagingSenderId: "973744619806",
  appId: "1:973744619806:web:5f73e68be332dd4edb490f"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Load NGO Requests
async function loadNGOs() {
  const ngoList = document.getElementById("ngoList");
  const ngoSelect = document.getElementById("selectedNgo");

  ngoList.innerHTML = "";
  ngoSelect.innerHTML = "";

  const snapshot = await getDocs(collection(db, "ngo_requests"));

  snapshot.forEach(doc => {
    const ngo = doc.data();

    // List view
    const li = document.createElement("li");
    li.innerText = `${ngo.ngoName} → Needs ${ngo.quantity} meals (${ngo.foodNeeded})`;
    ngoList.appendChild(li);

    // Dropdown
    const option = document.createElement("option");
    option.value = doc.id;
    option.text = ngo.ngoName;
    ngoSelect.appendChild(option);
  });

  if (snapshot.empty) {
    ngoList.innerHTML = "<li>No NGO requests available</li>";
  }
}

// 🔹 Post Donation
window.postDonation = async function () {

  const donorName = donorNameInput();
  const donorPhone = donorPhoneInput();
  const donorLocation = donorLocationInput();
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;
  const ngoId = document.getElementById("selectedNgo").value;
  const safety = document.getElementById("safetyCheck").checked;

  const foodSelect = document.getElementById("foodItems");
  const selectedFoods = Array.from(foodSelect.selectedOptions).map(o => o.value);
  const customFood = document.getElementById("customFood").value;

  if (customFood) selectedFoods.push(customFood);

  if (!donorName || !quantity || !expiry || !ngoId || !safety || selectedFoods.length === 0) {
    alert("Fill all fields and select NGO & food");
    return;
  }

  await addDoc(collection(db, "donations"), {
    donorName,
    donorPhone,
    donorLocation,
    foods: selectedFoods,
    quantity,
    expiry,
    ngoId,
    status: "Posted",
    createdAt: new Date()
  });

  document.getElementById("status").innerText = "✅ Donation sent to NGO";
  alert("Donation posted successfully!");
};

// Helpers
function donorNameInput() {
  return document.getElementById("donorName").value;
}
function donorPhoneInput() {
  return document.getElementById("donorPhone").value;
}
function donorLocationInput() {
  return document.getElementById("donorLocation").value;
}

// Load NGO data on page load
loadNGOs();
