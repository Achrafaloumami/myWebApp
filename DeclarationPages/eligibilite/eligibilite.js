
        let isLoading = false;
        let currentEligibilityResult = null;

        // Base de données simulée des produits
        const productDatabase = {
            'SN123456789': {
                brand: 'Apple',
                model: 'iPhone 12',
                purchaseDate: '2023-01-15',
                warrantyExpiry: '2025-01-15',
                eligible: true
            },
            'SN987654321': {
                brand: 'Samsung',
                model: 'Galaxy S21',
                purchaseDate: '2022-06-10',
                warrantyExpiry: '2024-06-10',
                eligible: true
            },
            'SN456789123': {
                brand: 'Huawei',
                model: 'P30 Pro',
                purchaseDate: '2020-03-20',
                warrantyExpiry: '2022-03-20',
                eligible: false
            },
            'SN789123456': {
                brand: 'Xiaomi',
                model: 'Mi 11',
                purchaseDate: '2023-08-05',
                warrantyExpiry: '2025-08-05',
                eligible: true
            }
        };

        // Gestion du formulaire
        document.getElementById('eligibilityForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (isLoading) return;
            
            const serialNumber = document.getElementById('serialNumber').value.trim();
            
            if (!serialNumber) {
                showAlert('error', 'Erreur', 'Veuillez entrer un numéro de série.');
                return;
            }
            
            checkEligibility(serialNumber);
        });

        // Fonction de vérification d'éligibilité
        function checkEligibility(serialNumber) {
            startLoading();
            hideAlert();
            hideProductInfo();
            hideActionButtons();
            
            // Simulation d'appel API
            setTimeout(() => {
                const product = productDatabase[serialNumber];
                
                if (product) {
                    currentEligibilityResult = {
                        serialNumber: serialNumber,
                        ...product
                    };
                    
                    showProductInfo(product);
                    
                    if (product.eligible) {
                        showAlert('success', 'Produit Éligible', 'Ce produit est éligible au service de réparation. Vous pouvez procéder à la déclaration.');
                        showActionButtons();
                    } else {
                        showAlert('error', 'Produit Non Éligible', 'Ce produit n\'est pas éligible au service de réparation. La garantie a expiré ou le produit n\'est pas couvert.');
                    }
                } else {
                    showAlert('error', 'Produit Non Trouvé', 'Aucun produit trouvé avec ce numéro de série. Veuillez vérifier le numéro saisi.');
                }
                
                stopLoading();
                addToRecentChecks(serialNumber, product ? product.eligible : false);
            }, 2000);
        }

        // Fonctions d'interface
        function startLoading() {
            isLoading = true;
            const checkButton = document.getElementById('checkButton');
            checkButton.disabled = true;
            checkButton.innerHTML = `
                <div class="loading-spinner"></div>
                <span>Vérification en cours...</span>
            `;
        }

        function stopLoading() {
            isLoading = false;
            const checkButton = document.getElementById('checkButton');
            checkButton.disabled = false;
            checkButton.innerHTML = '<span class="button-text">Vérifier l\'éligibilité</span>';
        }

        function showAlert(type, title, message) {
            const alertContainer = document.getElementById('alertContainer');
            const iconSvg = type === 'success' 
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
            
            alertContainer.innerHTML = `
                <div class="alert alert-${type}">
                    <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${iconSvg}
                    </svg>
                    <div class="alert-content">
                        <div class="alert-title">${title}</div>
                        <div class="alert-message">${message}</div>
                    </div>
                </div>
            `;
        }

        function hideAlert() {
            document.getElementById('alertContainer').innerHTML = '';
        }

        function showProductInfo(product) {
            const productInfo = document.getElementById('productInfo');
            const warrantyStatus = new Date(product.warrantyExpiry) > new Date() ? 'Sous garantie' : 'Garantie expirée';
            
            document.getElementById('productBrand').textContent = product.brand;
            document.getElementById('productModel').textContent = product.model;
            document.getElementById('purchaseDate').textContent = formatDate(product.purchaseDate);
            document.getElementById('warrantyStatus').textContent = warrantyStatus;
            
            productInfo.style.display = 'block';
        }

        function hideProductInfo() {
            document.getElementById('productInfo').style.display = 'none';
        }

        function showActionButtons() {
            document.getElementById('actionButtons').style.display = 'flex';
        }

        function hideActionButtons() {
            document.getElementById('actionButtons').style.display = 'none';
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR');
        }

        function addToRecentChecks(serialNumber, eligible) {
            const recentChecksList = document.getElementById('recentChecksList');
            const statusClass = eligible ? 'status-eligible' : 'status-not-eligible';
            const statusText = eligible ? 'Éligible' : 'Non éligible';
            
            const newItem = document.createElement('div');
            newItem.className = 'recent-check-item';
            newItem.innerHTML = `
                <div class="recent-check-info">
                    <div class="recent-check-serial">${serialNumber}</div>
                    <div class="recent-check-time">À l'instant</div>
                </div>
                <span class="recent-check-status ${statusClass}">${statusText}</span>
            `;
            
            recentChecksList.insertBefore(newItem, recentChecksList.firstChild);
            
            // Limiter à 5 éléments
            const items = recentChecksList.querySelectorAll('.recent-check-item');
            if (items.length > 5) {
                items[items.length - 1].remove();
            }
        }

        // Actions
        function proceedToDeclaration() {
            if (currentEligibilityResult) {
                // Stocker les données pour la page suivante
                localStorage.setItem('eligibleProduct', JSON.stringify(currentEligibilityResult));
                window.location.href = 'new-declaration.html';
            }
        }

        function resetForm() {
            document.getElementById('eligibilityForm').reset();
            hideAlert();
            hideProductInfo();
            hideActionButtons();
            currentEligibilityResult = null;
        }

        // Auto-focus sur le champ de saisie
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('serialNumber').focus();
        });

        // Gestion des touches clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                resetForm();
            }
        });
