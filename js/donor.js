let donor = "";
let donations = JSON.parse(localStorage.getItem("donations")) || [];

let ngos = [
    {name:"Helping Hands", food:"Veg", meals:300, urgency:"High"},
    {name:"Hope Trust", food:"Non-Veg", meals:150, urgency:"Medium"},
    {name:"Smile Foundation", food:"Veg", meals:500, urgency:"High"}
];

function login(){
    donor = donorName.value;
    if(donor==="") return alert("Enter name");
    loginBox.style.display="none";
    dashboard.style.display="block";
    loadNGOs();
    loadHistory();
}

function autoLocation(){
    location.value = "Current Location (Auto)";
}

function loadNGOs(){
    ngoList.innerHTML="";
    ngos.forEach((n,i)=>{
        ngoList.innerHTML+=`
        <tr>
        <td>${n.name}</td>
        <td>${n.food}</td>
        <td>${n.meals}</td>
        <td>${n.urgency}</td>
        <td><button onclick="selectNGO('${n.name}')">Select</button></td>
        </tr>`;
    });
}

let selectedNGO="";

function selectNGO(name){
    selectedNGO=name;
    alert("Selected NGO: "+name);
}

function postDonation(){
    if(!safety.checked) return alert("Accept safety guidelines");

    let d = {
        donor,
        food: foodName.value,
        type: foodType.value,
        qty: quantity.value,
        ngo: selectedNGO,
        status: "Pending"
    };

    donations.push(d);
    localStorage.setItem("donations",JSON.stringify(donations));
    loadHistory();
    alert("Donation Posted Successfully!");
}

function loadHistory(){
    history.innerHTML="";
    donations.filter(d=>d.donor===donor)
    .forEach((d,i)=>{
        history.innerHTML+=`
        <li>
        ${d.food} → ${d.ngo || "Not Assigned"} 
        [${d.status}]
        <button onclick="cancel(${i})">Cancel</button>
        </li>`;
    });
}

function cancel(i){
    donations.splice(i,1);
    localStorage.setItem("donations",JSON.stringify(donations));
    loadHistory();
}
