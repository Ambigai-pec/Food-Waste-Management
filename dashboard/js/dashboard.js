// Read donor data (later this will come from donor page)
let donations = JSON.parse(localStorage.getItem("donations")) || [
    { meals: 100, expiry: "High", foodType: "Veg" },
    { meals: 50, expiry: "Low", foodType: "Non-Veg" },
    { meals: 200, expiry: "Medium", foodType: "Veg" }
];

// Meals Saved Chart
new Chart(document.getElementById("mealsChart"), {
    type: "bar",
    data: {
        labels: ["Donation 1", "Donation 2", "Donation 3"],
        datasets: [{
            label: "Meals Saved",
            data: donations.map(d => d.meals),
            backgroundColor: "#4caf50"
        }]
    }
});

// Expiry Priority Chart
let expiryCount = { High:0, Medium:0, Low:0 };
donations.forEach(d => expiryCount[d.expiry]++);

new Chart(document.getElementById("expiryChart"), {
    type: "doughnut",
    data: {
        labels: Object.keys(expiryCount),
        datasets: [{
            data: Object.values(expiryCount),
            backgroundColor: ["red", "orange", "green"]
        }]
    }
});

// Impact Chart (CO₂ reduction approx)
new Chart(document.getElementById("impactChart"), {
    type: "line",
    data: {
        labels: ["Saved Food"],
        datasets: [{
            label: "CO₂ Reduced (kg)",
            data: [donations.reduce((a,b)=>a+b.meals,0)*0.5],
            borderColor: "blue"
        }]
    }
});
