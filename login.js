document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.login-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7009/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.text(); // l'API retourne juste un string

      if (response.ok) {
        // Redirection selon le message retourné par le back-end
        if (result.includes("Admin")) {
          window.location.href= 'AdminPages/historique/historique.html';
        } else if (result.includes("Declaration")) {
          window.location.href = "responsable-home.html";
        } else if (result.includes("Technical")) {
          window.location.href = "technicien-home.html";
        } else {
          alert("Utilisateur non reconnu");
        }
      } else {
        alert(result); // message d'erreur (ex: "Email invalid" ou "Password invalid")
      }

    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur de connexion au serveur");
    }
  });
});
