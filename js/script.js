"usestrict";
document.addEventListener('DOMContentLoaded', function() {

    // --- Interactive Particle Background Initialization ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80, // Number of particles
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Particle color
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.5,
                "random": false,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, // Movement speed
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse" // Particles move away on hover
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Add particles on click
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
            }
        },
        "retina_detect": true
    });


    // --- GSAP Scroll-Triggered Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Animate general elements with the 'gsap-reveal' class
    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%', // Start animation when element is 85% from the top
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate timeline items specifically
    gsap.utils.toArray('.gsap-timeline-item').forEach(item => {
        const isRight = item.classList.contains('right-timeline');
        gsap.fromTo(item, 
            { opacity: 0, x: isRight ? 100 : -100 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate the timeline's vertical line
    gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });

    // Staggered animation for project cards
    gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2, // Stagger the start of each animation by 0.2s
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#projects-grid',
            start: 'top 80%'
        }
    });
    
    // Staggered animation for skill cards
    gsap.from('.skill-card', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%'
        }
    });


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const highlightNavLinks = (id) => {
        const allLinks = [...navLinks, ...mobileNavLinks];
        allLinks.forEach(link => {
            link.classList.remove('text-cyan-400', 'font-bold');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('text-cyan-400', 'font-bold');
            }
        });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                highlightNavLinks(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);   // “Observer! In sab sections ko track karo, jab bhi koi bhi section viewport me dikhne lage, mujhe callback me batana.”
    });
    
    highlightNavLinks('home');


    // --- Project Image Sliders ---
    const sliders = document.querySelectorAll('.project-image-slider');
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.project-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('opacity-100');
                img.classList.add('opacity-0');
                if (i === index) {
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                }
            });
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        showImage(currentIndex);
    });


    // --- Projects Section: Show More / Show Less ---
    const toggleProjectsBtn = document.getElementById('toggle-projects-btn');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    const projectsToShowInitially = 3;
    let projectsAreHidden = true;

    projectCards.slice(projectsToShowInitially).forEach(card => card.classList.add('hidden'));

    if (projectCards.length <= projectsToShowInitially) {
        toggleProjectsBtn.style.display = 'none';
    }

    toggleProjectsBtn.addEventListener('click', () => {
        projectsAreHidden = !projectsAreHidden;

        projectCards.slice(projectsToShowInitially).forEach(card => {
            card.classList.toggle('hidden');
        });

        toggleProjectsBtn.textContent = projectsAreHidden ? 'Show More' : 'Show Less';
    });



    
});
