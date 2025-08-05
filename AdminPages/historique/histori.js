fetch("https://localhost:7009/api/Admin/Declarations")
.then(response => response.json())
.then(data => {
    const tbody = document.querySelector("#declarations-table tbody");
    data.forEach(declaration => {
        const row = document.createElement("tr");
        const stateLabel = {
            0: "En Cours",
            1: "Refusé",
            2: "Réparé"
        }

        row.innerHTML = `
        <td>${declaration.barCode}</td>
        <td>${declaration.productName}</td>
        <td>${declaration.clientName}</td>
        <td><span class = "status-badge">${stateLabel[declaration.state]}</span></td>
        <td>${declaration.productName} DH</td>
        <td>${declaration.declarationPurpose}</td>
        `;

        tbody.appendChild(row);
        
    });
    
})
.catch(error => {
    console.error("Erreur lors de la récupération des déclarations :", error);
  });


fetch("https://localhost:7009/api/Admin/Statistiques")
.then(response => response.json())
.then(data => {
    document.getElementById("totaldeclaration").innerHTML = `${data.totalDeclaration}`
    document.getElementById("Repare").innerHTML = `${data.reparedProduct}`
    document.getElementById("enCours").innerHTML = `${data.inProgress}`
    document.getElementById("totalPrix").innerHTML = `${data.totalPrice} DH`

})


document.getElementById('logout-btn').addEventListener('click', function() {
    window.location.href = '../../index.html'
})

function setActiveTab(tab) {
    if (tab === 'users') {
        window.location.href = '../utilisateurs/users.html'
    }

}


