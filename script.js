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
document.addEventListener("DOMContentLoaded", function() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Show/hide portfolio items based on filter
      portfolioItems.forEach(item => {
        if (filterValue === "all") {
          item.classList.remove("hidden");
        } else {
          if (item.getAttribute("data-type") === filterValue) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        }
      });
    });
  });

  // Auto-play videos on hover
  const videoItems = document.querySelectorAll(".portfolio-item video");

  videoItems.forEach(video => {
    video.addEventListener("mouseenter", function() {
      this.play();
    });

    video.addEventListener("mouseleave", function() {
      this.pause();
      this.currentTime = 0;
    });
  });

  // Lightbox functionality for portfolio items
  portfolioItems.forEach(item => {
    item.addEventListener("click", function() {
      // You can expand this to open a lightbox with the full media
      console.log("Portfolio item clicked - would open lightbox");
    });
  });
});

// Update current year in footer
const yearSpan = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// // Form submission
// const contactForm = document.querySelector(".contact-form");
// contactForm.addEventListener("submit", function(e) {
//   e.preventDefault();
//   alert("Thank you for your message! We will get back to you soon.");
//   this.reset();
// });

document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const successMessage = document.getElementById("successMessage");

  // Form validation function
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    let isValid = true;

    // Reset errors
    document.getElementById("nameError").classList.add("hidden");
    document.getElementById("emailError").classList.add("hidden");
    document.getElementById("messageError").classList.add("hidden");

    // Validate name
    if (name === "") {
      document.getElementById("nameError").classList.remove("hidden");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    }

    // Validate message
    if (message === "") {
      document.getElementById("messageError").classList.remove("hidden");
      isValid = false;
    }

    return isValid;
  }

  // Email submission using FormSubmit.co (Free & Fast)
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(contactForm);

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;

    // Using FormSubmit.co
    fetch("https://formsubmit.co/ajax/6af3dd6f37c1d0cb334a1f43f7f5b60f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        _subject: "New Contact Form Submission - Leorus Studios"
      })
    })
      .then(response => response.json())
      .then(data => {
        // Show success message
        successMessage.classList.remove("hidden");
        contactForm.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add("hidden");
        }, 5000);
      })
      .catch(error => {
        console.error("Error:", error);
        alert(
          "There was an error sending your message. Please try again or use the WhatsApp option."
        );
      })
      .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });

  // WhatsApp submission
  whatsappBtn.addEventListener("click", function() {
    if (!validateForm()) {
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Format message for WhatsApp
    const whatsappMessage = `Hello Leorus Studios!%0A%0A*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:*%0A${message}%0A%0A_Sent via Website Contact Form_`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/+2348109184351?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    successMessage.classList.remove("hidden");
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const navbar = document.getElementById("navbar");

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // --- [REMOVED] ---
    // The code that changed the hamburger icon's innerHTML
    // was removed from here. It's not needed because you
    // have a separate close button (closeMobileMenu).
    // --- [REMOVED] ---
  }

  // Open mobile menu
  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Close mobile menu
  closeMobileMenu.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      // Smooth scroll to section
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu first
          toggleMobileMenu();

          // Then scroll to section
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth"
            });
          }, 300);
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener("click", function(e) {
    if (e.target === mobileMenu) {
      toggleMobileMenu();
    }
  });

  // Navigation scroll effect
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

  // Smooth scrolling for desktop navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      // Skip if it's a mobile nav link (handled above)
      if (this.classList.contains("mobile-nav-link")) return;

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
});