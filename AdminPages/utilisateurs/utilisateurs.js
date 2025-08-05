let editingUserId = null;

        // Navigation entre les onglets
        function setActiveTab(tab) {
            console.log('Navigation vers:', tab);
            if (tab === 'dashboard') {
                window.location.href = '/admin';
            } else if (tab === 'history') {
                window.location.href = '/admin#history';
            }
        }

        // Ouvrir la modal d'ajout d'utilisateur
        function openAddUserModal() {
            editingUserId = null;
            document.getElementById('modalTitle').textContent = 'Nouvel Utilisateur';
            document.getElementById('modalDescription').textContent = 'Ajoutez un nouveau responsable ou technicien au système.';
            document.getElementById('userForm').reset();
            document.querySelector('.modal-btn.primary').textContent = 'Créer l\'utilisateur';
            document.getElementById('userModal').classList.add('active');
        }

        // Fermer la modal
        function closeModal() {
            document.getElementById('userModal').classList.remove('active');
            editingUserId = null;
        }

        // Fermer la modal en cliquant sur l'overlay
        document.getElementById('userModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Sauvegarder l'utilisateur
        function saveUser() {
            const form = document.getElementById('userForm');
            const formData = new FormData(form);
            
            const userData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                type: document.getElementById('userType').value,
                specialty: document.getElementById('userSpecialty').value,
                phone: document.getElementById('userPhone').value
            };

            // Validation basique
            if (!userData.name || !userData.email || !userData.type || !userData.specialty) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            if (editingUserId) {
                console.log('Modification utilisateur:', editingUserId, userData);
                alert('Utilisateur modifié avec succès!');
            } else {
                console.log('Création utilisateur:', userData);
                alert('Utilisateur créé avec succès!');
                
                // Ajouter l'utilisateur au tableau (simulation)
                addUserToTable(userData);
            }

            closeModal();
        }

        // Ajouter un utilisateur au tableau
        function addUserToTable(userData) {
            const tbody = document.getElementById('usersTableBody');
            const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${initials}</div>
                        <div class="user-details">
                            <h3>${userData.name}</h3>
                            <p>${userData.email}</p>
                        </div>
                    </div>
                </td>
                <td><span class="user-type-badge type-${userData.type}">${userData.type === 'responsable' ? 'Responsable' : 'Technicien'}</span></td>
                <td>${userData.specialty}</td>
                <td><span class="status-badge status-active">Actif</span></td>
                <td>À l'instant</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="editUser(${Date.now()})">Modifier</button>
                        <button class="action-btn toggle" onclick="toggleUserStatus(${Date.now()})">Désactiver</button>
                        <button class="action-btn delete" onclick="deleteUser(${Date.now()})">Supprimer</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        }

        // Modifier un utilisateur
        function editUser(userId) {
            editingUserId = userId;
            document.getElementById('modalTitle').textContent = 'Modifier l\'Utilisateur';
            document.getElementById('modalDescription').textContent = 'Modifiez les informations de l\'utilisateur.';
            document.querySelector('.modal-btn.primary').textContent = 'Sauvegarder les modifications';
            
            // Pré-remplir le formulaire avec les données existantes (simulation)
            // Dans une vraie application, vous récupéreriez les données depuis votre base de données
            
            document.getElementById('userModal').classList.add('active');
        }

        // Basculer le statut d'un utilisateur
        function toggleUserStatus(userId) {
            const confirmed = confirm('Êtes-vous sûr de vouloir changer le statut de cet utilisateur ?');
            if (confirmed) {
                console.log('Basculement statut utilisateur:', userId);
                alert('Statut de l\'utilisateur modifié!');
                // Ici vous mettriez à jour l'interface
            }
        }

        // Supprimer un utilisateur
        function deleteUser(userId) {
            const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.');
            if (confirmed) {
                console.log('Suppression utilisateur:', userId);
                alert('Utilisateur supprimé!');
                // Ici vous supprimeriez la ligne du tableau
            }
        }

        // Fonction de filtrage
        function applyFilters() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const typeFilter = document.getElementById('typeFilter').value;
            
            const rows = document.querySelectorAll('#usersTableBody tr');
            
            rows.forEach(row => {
                const userInfo = row.querySelector('.user-details');
                const name = userInfo.querySelector('h3').textContent.toLowerCase();
                const email = userInfo.querySelector('p').textContent.toLowerCase();
                const type = row.querySelector('.user-type-badge').textContent.toLowerCase();
                
                let showRow = true;
                
                // Filtre de recherche
                if (searchTerm && !name.includes(searchTerm) && !email.includes(searchTerm)) {
                    showRow = false;
                }
                
                // Filtre de type
                if (typeFilter && !type.includes(typeFilter)) {
                    showRow = false;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        // Filtrage en temps réel
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        document.getElementById('typeFilter').addEventListener('change', applyFilters);

        // Gestion des touches clavier pour la modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('userModal').classList.contains('active')) {
                closeModal();
            }
        });