// Navigation scroll effect
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.classList.add("nav-hidden");
  } else {
    // Scrolling up
    navbar.classList.remove("nav-hidden");
    navbar.classList.add("nav-visible");
  }

  lastScrollTop = scrollTop;
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInOnScroll = () => {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
// Initial check in case elements are already in view
fadeInOnScroll();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});


    // Portfolio filtering functionality
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                    } else {
                        if (item.getAttribute('data-type') === filterValue) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
            });
        });
        
        // Auto-play videos on hover
        const videoItems = document.querySelectorAll('.portfolio-item video');
        
        videoItems.forEach(video => {
            video.addEventListener('mouseenter', function() {
                this.play();
            });
            
            video.addEventListener('mouseleave', function() {
                this.pause();
                this.currentTime = 0;
            });
        });
        
        // Lightbox functionality for portfolio items
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // You can expand this to open a lightbox with the full media
                console.log('Portfolio item clicked - would open lightbox');
            });
        });
    });


// Form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  this.reset();
});
