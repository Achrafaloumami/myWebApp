function checkEligibility() {
    const serial = document.getElementById("serialNumber").value;

    if (!serial) {
        alert("Veuillez entrer le code barre du produit");
        return;
    }

    fetch(`https://localhost:7009/VerifyEligibility?BarCode=${serial}`)
        .then(response => {
            if (!response.ok) {
                alert("Produit non trouvé ou non éligible");
                throw new Error("Réponse non OK");
            }
            return response.json();
        })
        .then(data => {
            if (!data.result) {
                alert("Produit non éligible à la garantie.");
                //document.getElementById("productInfoBanner").style.display = "none";
                return;
            }

            //document.getElementById("productInfoBanner").style.display = "flex";

            // const purchaseDate = data.purchaseDate.substring(0, 10);
            // const warrantyEnd = data.exprirationGarantie.substring(0, 10);
            // document.getElementById("purchaseDate").value = purchaseDate;
            // document.getElementById("EndWarranty").value = warrantyEnd;

            alert("Produit éligible à la garantie");
        })
        .catch(error => {
            console.error(error);
            alert("Une erreur est survenue lors de la vérification.");
            document.getElementById("productInfoBanner").style.display = "none";
        });
}



document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.declarationForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // ????
    

        const codeBare = document.getElementById('serialNumber').value;


        const nomProduit = document.getElementById('productName').value;
        const details = document.getElementById('defectDescription').value;
        const prenomClient = document.getElementById('clientFirstName').value;
        const nomCleint = document.getElementById('clientLastName').value;
        const emailClient = document.getElementById('clientEmail').value;
        const teleClient = document.getElementById('clientPhone').value;

        const addressClient = document.getElementById('clientAddress').value;

        if (!codeBare || !nomProduit || !details || !prenomClient || !nomCleint || !emailClient || !teleClient || !addressClient) { 
            alert("Veuillez remplir tous les champs");
            return;
        }
        alert("Envoi de la déclaration...");

        try {
            const response = await fetch("https://localhost:7009/declareProduct", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    BarCode: codeBare,
                    ProductName: nomProduit,
                    DeclarationPurpose: details,
                    ClientDTO: {
                        ClientFirstName: prenomClient,
                        ClientLastName: nomCleint,
                        ClientEmail: emailClient,
                        ClientPhone: teleClient,
                        ClientAdress: addressClient
                    }
                })
            });
            
            const result = await response.text();

            if (response.ok) {
                alert("Déclaration envoyée avec succès !");
                window.location.href = "./newdeclaration.html";
            } else {
                alert(result);
            }


        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur de connexion au serveur");
        }



    })
})
