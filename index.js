// Simple scroll animations
document.addEventListener("DOMContentLoaded", function() {
  // Testimonial slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".nav-dot");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });
  });

  // Auto-rotate testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);

  // Scroll animations
  function checkScroll() {
    const elements = document.querySelectorAll("[data-aos]");
    elements.forEach(el => {
      const position = el.getBoundingClientRect();
      // If element is in viewport
      if (position.top < window.innerHeight * 0.75) {
        el.classList.add("aos-animate");
      }
    });
  }

  // Initial check
  checkScroll();

  // Check on scroll
  window.addEventListener("scroll", checkScroll);
});
