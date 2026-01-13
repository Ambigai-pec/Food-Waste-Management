// ---------- SAMPLE NGO REQUESTS (SIMULATES NGO PAGE) ----------
if (!localStorage.getItem("ngoRequests")) {
  localStorage.setItem("ngoRequests", JSON.stringify([
    { id: 1, name: "Helping Hands", food: "Rice", quantity: 200, location: "Chennai" },
    { id: 2, name: "Food For All", food: "Chapati", quantity: 100, location: "Bangalore" }
  ]));
}

let donations = JSON.parse(localStorage.getItem("donations")) || [];
let mealsSaved = Number(localStorage.getItem("mealsSaved")) || 0;

// ---------- LOAD NGO REQUESTS ----------
function loadNGOs() {
  const ngoList = document.getElementById("ngoList");
  ngoList.innerHTML = "";

  const ngos = JSON.parse(localStorage.getItem("ngoRequests"));

  ngos.forEach(ngo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${ngo.name}</strong><br>
      Needs: ${ngo.food} (${ngo.quantity} meals)<br>
      Location: ${ngo.location}<br>
      <button onclick="selectNGO(${ngo.id})">Donate to this NGO</button>
    `;
    ngoList.appendChild(li);
  });
}

// ---------- POST DONATION ----------
function postDonation() {
  let foods = [];
  document.querySelectorAll(".checkbox-group input[type=checkbox]:checked")
    .forEach(cb => foods.push(cb.value));

  if (document.getElementById("otherFoodCheck").checked) {
    foods.push(document.getElementById("otherFoodInput").value);
  }

  const donation = {
    foods,
    quantity: document.getElementById("quantity").value,
    expiry: document.getElementById("expiry").value,
    location: document.getElementById("location").value,
    delivery: document.querySelector("input[name=delivery]:checked").value,
    status: "Posted"
  };

  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  mealsSaved += Number(donation.quantity);
  localStorage.setItem("mealsSaved", mealsSaved);

  alert("Donation Posted Successfully!");
  updateStatus();
  updateImpact();
}

// ---------- SELECT NGO ----------
function selectNGO(id) {
  donations[donations.length - 1].status = "Assigned to NGO";
  localStorage.setItem("donations", JSON.stringify(donations));
  alert("NGO selected successfully!");
  updateStatus();
}

// ---------- UPDATE STATUS ----------
function updateStatus() {
  const list = document.getElementById("donationStatus");
  list.innerHTML = "";

  donations.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.foods.join(", ")} → ${d.status}`;
    list.appendChild(li);
  });
}

// ---------- UPDATE IMPACT ----------
function updateImpact() {
  document.getElementById("impact").textContent =
    `Meals Saved: ${mealsSaved}`;
}

// ---------- INIT ----------
loadNGOs();
updateStatus();
updateImpact();
