function setActiveTab(tab) {
    if (tab === 'history') {
        window.location.href = '../historique/historique.html'
    }
}

document.getElementById("addUser-btn").addEventListener('click', function() {
    window.location.href = '../registrer/registrer.html'
})

fetch("https://localhost:7009/api/Admin/Historique")
.then(response => response.json())
.then(data => {
    const tbody = document.querySelector("#users-table tbody");
    data.forEach(user => {
        const row = document.createElement("tr")
        const typeLabel = {
            0 : "Admin",
            1 : "Responsable déclaration",
            2 : "Technicien"
        }

        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${typeLabel[user.type]}</td>
        `

        tbody.appendChild(row);
    });

}
)
.catch(error => {
    alert("error lors de la récupération des utilissateurs");
})