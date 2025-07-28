function setActiveTab(tab) {
            // Simulation de navigation - dans une vraie app, cela redirigerait
            console.log('Navigation vers:', tab);
            if (tab === 'dashboard') {
                window.location.href = '/admin';
            } else if (tab === 'users') {
                window.location.href = '/admin#users';
            }
        }

        // Fonction de filtrage
        function applyFilters() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const statusFilter = document.getElementById('statusFilter').value;
            const technicianFilter = document.getElementById('technicianFilter').value;
            
            const rows = document.querySelectorAll('#declarationsTableBody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const id = cells[0].textContent.toLowerCase();
                const product = cells[1].textContent.toLowerCase();
                const client = cells[2].textContent.toLowerCase();
                const technician = cells[3].textContent.toLowerCase();
                const status = cells[5].querySelector('.status-badge').textContent.toLowerCase();
                
                let showRow = true;
                
                // Filtre de recherche
                if (searchTerm && !id.includes(searchTerm) && !product.includes(searchTerm) && !client.includes(searchTerm)) {
                    showRow = false;
                }
                
                // Filtre de statut
                if (statusFilter && !status.includes(statusFilter.replace('-', ' '))) {
                    showRow = false;
                }
                
                // Filtre de technicien
                if (technicianFilter && !technician.toLowerCase().includes(technicianFilter.replace('-', ' '))) {
                    showRow = false;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        // Fonction pour voir les détails
        function viewDetails(declarationId) {
            alert(`Affichage des détails pour la déclaration ${declarationId}`);
            // Dans une vraie application, cela ouvrirait une modal ou redirigerait vers une page de détails
        }

        // Filtrage en temps réel sur la recherche
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        document.getElementById('statusFilter').addEventListener('change', applyFilters);
        document.getElementById('technicianFilter').addEventListener('change', applyFilters);

        fetch("https://localhost")
        document.getElementById('total').textContent = somme