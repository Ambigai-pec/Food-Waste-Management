const form = document.getElementById("foodForm");
const foodList = document.getElementById("foodList");

// Example NGO list (mock data)
const ngos = [
    { name: "Helping Hands", type: "Veg", location: "Location A", distance: 2 },
    { name: "Food For All", type: "Non-Veg", location: "Location B", distance: 5 },
    { name: "Care NGO", type: "Veg", location: "Location C", distance: 3 }
];

// Example volunteer list (mock data)
const volunteers = [
    { name: "Volunteer 1", location: "Location X" },
    { name: "Volunteer 2", location: "Location Y" }
];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodType = document.getElementById("foodType").value;
    const numPeople = document.getElementById("numPeople").value;
    const location = document.getElementById("location").value;
    const selfDeliver = document.getElementById("selfDeliver").value;

    // Find matching NGOs
    let matchingNGOs = ngos.filter(ngo => ngo.type === foodType);
    matchingNGOs.sort((a, b) => a.distance - b.distance);

    let assignedVolunteer = "N/A";
    let status = "Pending";

    if (selfDeliver === "no") {
        // Assign nearest volunteer
        assignedVolunteer = volunteers[0].name;
        status = "Assigned to Volunteer";
        alert(`Volunteer ${assignedVolunteer} will deliver the food to ${matchingNGOs[0].name}`);
    } else {
        status = "Donor will deliver";
        alert(`You chose to deliver food to ${matchingNGOs[0].name}`);
    }

    const row = `
        <tr>
            <td>${foodName}</td>
            <td>${foodType}</td>
            <td>${numPeople}</td>
            <td>${location}</td>
            <td>${matchingNGOs[0].name}</td>
            <td>${assignedVolunteer}</td>
            <td>${status}</td>
        </tr>
    `;

    foodList.innerHTML += row;
    form.reset();
});
