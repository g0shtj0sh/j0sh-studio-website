// Animation d'entrée des projets
gsap.from('.projet-card', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    stagger: 0.3,
    ease: "bounce.out"
});

// Effet de survol sur les projets
document.querySelectorAll('.projet-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.5,
            boxShadow: '0 0 30px rgba(0, 191, 255, 1)',
            scale: 1.1
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.3)',
            scale: 1
        });
    });
});

// Sélection des éléments du formulaire
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

// Fonction pour afficher les messages avec animation
function showResponseMessage(message, isSuccess) {
    formResponse.textContent = message;
    formResponse.classList.remove('hidden');
    formResponse.style.opacity = '1';
    
    // Ajout de classes CSS en fonction du succès/erreur
    if (isSuccess) {
        formResponse.classList.add('success');
        formResponse.classList.remove('error');
    } else {
        formResponse.classList.add('error');
        formResponse.classList.remove('success');
    }
    
    // Disparition progressive du message après 5 secondes
    setTimeout(() => {
        gsap.to(formResponse, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                formResponse.textContent = '';
                formResponse.classList.add('hidden');
            }
        });
    }, 5000);
}

// Gestion de la soumission du formulaire
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Afficher un message d'attente
    showResponseMessage('Envoi en cours...', true);
    
    // Récupération des données du formulaire
    const formData = new FormData(contactForm);
    
    try {
        // Envoi des données à l'API Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Succès
            showResponseMessage('Message envoyé avec succès !', true);
            contactForm.reset();
            
            // Animation de succès
            gsap.fromTo(formResponse, {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            // Erreur
            showResponseMessage(result.message || 'Une erreur est survenue', false);
        }
    } catch (error) {
        // Erreur réseau
        showResponseMessage('Erreur de connexion. Veuillez réessayer.', false);
    }
});

// Animation d'entrée des éléments du formulaire
gsap.from('.glow-form input, .glow-form textarea, .glow-form button', {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 0.5
});