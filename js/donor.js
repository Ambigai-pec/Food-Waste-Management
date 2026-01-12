const form = document.getElementById("foodForm");
const table = document.getElementById("donationTable");

// Slider display
const peopleSlider = document.getElementById("people");
const peopleCount = document.getElementById("peopleCount");
peopleSlider.oninput = () => {
    peopleCount.innerText = peopleSlider.value;
};

// Auto Location
function getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        document.getElementById("location").value =
            `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
    });
}

// Mock NGO data
const ngos = [
    { name: "Helping Hands", type: "Veg", distance: 2 },
    { name: "Food For All", type: "Non-Veg", distance: 4 },
    { name: "Care Foundation", type: "Veg", distance: 3 }
];

// Mock Volunteers
const volunteers = ["Volunteer A", "Volunteer B", "Volunteer C"];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodType = document.getElementById("foodType").value;
    const people = peopleSlider.value;
    const expiry = document.getElementById("expiry").value;
    const location = document.getElementById("location").value;
    const delivery = document.getElementById("delivery").value;

    // NGO Matching
    let matchedNGO = ngos
        .filter(ngo => ngo.type === foodType)
        .sort((a, b) => a.distance - b.distance)[0];

    let volunteer = "N/A";
    let status = "Pending";

    if (delivery === "yes") {
        status = "Donor Delivering";
    } else {
        volunteer = volunteers[Math.floor(Math.random() * volunteers.length)];
        status = "Assigned to Volunteer";
    }

    const row = `
        <tr>
            <td>${foodName}</td>
            <td>${foodType}</td>
            <td>${people}</td>
            <td>${expiry}</td>
            <td>${location}</td>
            <td>${matchedNGO.name}</td>
            <td>${volunteer}</td>
            <td>${status}</td>
        </tr>
    `;

    table.innerHTML += row;
    form.reset();
    peopleCount.innerText = "20";
});
