document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registrer-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // ????

        const option = document.getElementById('options').value;
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!prenom || !nom || !email || !password) { 
            alert("Veuillez remplir tous les champs");
            return;
        }

        try {
            const response = await fetch("https://localhost:7009/api/Admin/registrer-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Type : Number(option), Firstname: prenom, LastName : nom, email, password})
            });
            
            const result = await response.text();

            if (response.ok) {
                window.location.href = "../utilisateurs/users.html";
            } else {
                alert(result);
            }


        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur de connexion au serveur");
        }





    })







})