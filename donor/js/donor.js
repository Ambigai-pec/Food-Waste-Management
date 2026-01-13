// 🔹 Import Firebase SDKs (Browser-compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firebase configuration (YOUR PROJECT)
const firebaseConfig = {
  apiKey: "AIzaSyCIfWAFvJis9H7R33cKIQbC0WlGQtMbqK8",
  authDomain: "food-waste-management-9e874.firebaseapp.com",
  projectId: "food-waste-management-9e874",
  storageBucket: "food-waste-management-9e874.firebasestorage.app",
  messagingSenderId: "973744619806",
  appId: "1:973744619806:web:5f73e68be332dd4edb490f"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Function called when "Post Donation" button is clicked
window.postDonation = async function () {

  const donorName = document.getElementById("donorName").value;
  const donorPhone = document.getElementById("donorPhone").value;
  const donorLocation = document.getElementById("donorLocation").value;
  const foodName = document.getElementById("foodName").value;
  const foodType = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;
  const deliveryMode = document.getElementById("delivery").value;
  const safetyChecked = document.getElementById("safetyCheck").checked;

  // 🔸 Basic validation
  if (
    !donorName || 
    !donorPhone || 
    !donorLocation || 
    !foodName || 
    !quantity || 
    !expiry || 
    !safetyChecked
  ) {
    alert("Please fill all fields and accept food safety guidelines.");
    return;
  }

  try {
    // 🔹 Save donation to Firestore
    await addDoc(collection(db, "donations"), {
      donorName: donorName,
      donorPhone: donorPhone,
      donorLocation: donorLocation,
      foodName: foodName,
      foodType: foodType,
      quantity: quantity,
      expiryTime: expiry,
      deliveryMode: deliveryMode,
      status: "Posted",
      createdAt: new Date()
    });

    alert("✅ Donation posted successfully!");
    document.getElementById("status").innerText =
      "Status: Posted → Waiting for NGO / Volunteer";

  } catch (error) {
    console.error("Error saving donation:", error);
    alert("❌ Error posting donation. Check console.");
  }
};
