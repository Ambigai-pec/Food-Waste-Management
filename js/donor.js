const form = document.getElementById("foodForm");
const foodList = document.getElementById("foodList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodType = document.getElementById("foodType").value;
    const quantity = document.getElementById("quantity").value;
    const expiry = document.getElementById("expiry").value;
    const location = document.getElementById("location").value;

    const row = `
        <tr>
            <td>${foodName}</td>
            <td>${foodType}</td>
            <td>${quantity}</td>
            <td>${expiry}</td>
            <td>${location}</td>
            <td>Available</td>
        </tr>
    `;

    foodList.innerHTML += row;
    form.reset();
});
