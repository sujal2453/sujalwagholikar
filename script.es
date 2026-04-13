document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBg = document.querySelector('.hero-bg');
    const progressFill = document.querySelector('.progress-fill');
    const currentPage = document.querySelector('.current-page');
    const totalPages = document.querySelector('.total-pages');

    const destinations = [
        {
            title: "Explore the<br>Italian Alps",
            subtitle: "Pragser Wildsee, Italy",
            image: "assets/pragser-wildsee.jpg"
        },
        {
            title: "Discover the<br>Swiss Alps",
            subtitle: "Zermatt, Switzerland",
            image: "assets/swiss-alps.jpg"
        },
        {
            title: "Serenity at<br>Lake Como",
            subtitle: "Bellagio, Italy",
            image: "assets/lake-como.jpg"
        }
    ];

    let currentIndex = 0;

    function updateHero(index) {
        const data = destinations[index];
        
        // Fade out
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Update content
            heroTitle.innerHTML = data.title;
            heroSubtitle.textContent = data.subtitle;
            heroBg.style.backgroundImage = `url('${data.image}')`;
            
            // Fade in
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);

        // Update pagination
        const progress = ((index + 1) / destinations.length) * 100;
        progressFill.style.width = `${progress}%`;
        currentPage.textContent = `0${index + 1}`;
        
        // Update active card
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (currentIndex !== index) {
                currentIndex = index;
                updateHero(currentIndex);
            }
        });
    });

    // Auto-scroll functionality (optional, but requested in animations)
    let autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % destinations.length;
        updateHero(currentIndex);
    }, 8000);

    // Stop auto-scroll on user interaction
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => clearInterval(autoScroll));
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    });

    // Initialize total pages
    totalPages.textContent = `0${destinations.length}`;
});
