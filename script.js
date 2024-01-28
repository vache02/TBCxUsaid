const menuBtn = document.querySelector(".menu-btn");
const navitems = document.querySelector(".nav-items");
const navbar = document.querySelector(".nav-container");
const sliderContainer = document.querySelector(".partners-carousel_container");
const box = document.querySelectorAll(".slides-box");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");
const accordions = document.querySelectorAll(".faq-wrapper_header-info");
const faqInfo = document.querySelectorAll(".faq-wrapper_header-info-container");

// Function to check if the clicked element is within the button container or navigation menu
const isClickInsideMenu = (element) => {
  return menuBtn.contains(element) || navitems.contains(element);
};
let menuOpen = false;
let prevScrollPos = window.pageYOffset;

document.addEventListener("DOMContentLoaded", () => {
  /* >>>>>>>>> burger menu<<<<<*/
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuBtn.classList.add("open");
      navitems.classList.add("open");
      menuOpen = true;
    } else {
      menuBtn.classList.remove("open");
      navitems.classList.remove("open");
      menuOpen = false;
    }
  });

  /* >>>>>>>>>>Scroll Function <<<<<<<<<<<< */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      navbar.style.backgroundColor = "rgba(40, 40, 40, 0.9)";
    } else {
      navbar.style.backgroundColor = "#1a1e1f";
    }
  });
  // Event listener to close the menu when clicking outside of the button container or navigation menu
  document.addEventListener("click", (e) => {
    if (!isClickInsideMenu(e.target) && menuOpen) {
      menuBtn.classList.remove("open");
      navitems.classList.remove("open");
      menuOpen = false;
    }
  });
  // Event listener for scroll events
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) {
      const currentScrollPos = window.pageYOffset;

      // Check if scrolling down
      if (prevScrollPos < currentScrollPos) {
        navbar.style.transform = "translateY(-100%)";
        menuBtn.classList.remove("open");
        navitems.classList.remove("open");
        menuOpen = false;
        // Hide the navbar
      } else {
        navbar.style.transform = "translateY(0)"; // Show the navbar
      }

      prevScrollPos = currentScrollPos;
    }
  });

  let index = 0;
  let intervalId;
  // adding active class for the carousel box and for dot slider
  const showSlide = () => {
    box.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  };
  //depending on the box length incrementing index
  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      index = (index + 1) % box.length;
      showSlide();
    }, 3000);
  };
  //clearing interval
  const stopAutoSlide = () => {
    clearInterval(intervalId);
  };
  //catching  index of the currnent slide and stopping
  const navigate = (newIndex) => {
    index = newIndex;
    showSlide();
    stopAutoSlide();
  };
  //handling mouseover and mouseout
  const handleMouseOver = () => {
    stopAutoSlide();
  };
  const handleMouseOut = () => {
    startAutoSlide();
  };
  sliderContainer.addEventListener("mouseover", handleMouseOver);
  sliderContainer.addEventListener("mouseout", handleMouseOut);
  //changing dot slideshow with click event
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      navigate(i);
    });
  });
  //changing slideshow with button arrows(left && right)
  prev.addEventListener("click", () => {
    index = (index - 1 + box.length) % box.length;
    showSlide();
    stopAutoSlide();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % box.length;
    showSlide();
    stopAutoSlide();
  });

  // Initial setup
  showSlide();
  startAutoSlide();

  accordions.forEach((acco, index) => {
    acco.addEventListener("click", () => {
      // Toggle "active" class on the clicked accordion
      acco.classList.toggle("active");

      // Toggle "active" class on the corresponding faqInfo
      faqInfo[index].classList.toggle("active");

      // Loop through other accordions and faqInfo to remove "active" class
      accordions.forEach((otherAcco, otherIndex) => {
        if (otherIndex !== index && otherAcco.classList.contains("active")) {
          otherAcco.classList.remove("active");
          faqInfo[otherIndex].classList.remove("active");
        }
      });
    });
  });
});
