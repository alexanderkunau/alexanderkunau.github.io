const boxes = gsap.utils.toArray('.box');
const images = gsap.utils.toArray('.image');

// Set up animations for boxes
gsap.set(boxes, {
  autoAlpha: 0,
  y: 75
});
boxes.forEach((box, i) => {
  const anim = gsap.to(box, {
    duration: 1,
    autoAlpha: 1,
    y: 0,
    delay: 0.4,
    paused: true
  });
  ScrollTrigger.create({
    trigger: box,
    end: "bottom bottom",
    once: true,
    onEnter: self => {
      self.progress === 1 ? anim.progress(1) : anim.play()
    }
  });
});

// Set up animations for images with small delay
gsap.set(images, {
  autoAlpha: 0,
  y: 75
});
images.forEach((img, i) => {
  const anim = gsap.to(img, {
    duration: 1,
    autoAlpha: 1,
    y: 0,
    delay: i * 0.1,
    paused: true
  });
  ScrollTrigger.create({
    trigger: img,
    end: "bottom bottom",
    once: true,
    onEnter: self => {
      self.progress === 1 ? anim.progress(1) : anim.play()
    }
  });
});

const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = {
  x: -100,
  y: -100
}; // mouse pointer's coordinates
const pos = {
  x: 0,
  y: 0
}; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
  const rotate = 'rotate(' + angle + 'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);



const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', function () {
    const className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener('mouseleave', function () {
    const className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Get scroll value
  lenis.on('scroll', ({
    scroll,
    limit,
    velocity,
    direction,
    progress
  }) => {
    // Hier war die Console-Log-Zeile, die entfernt wurde
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});



document.addEventListener("DOMContentLoaded", function () {
  const stickyButton = document.getElementById("stickyBtn");
  let triggerHeight = 5000; // Standardwert für Desktop

  // Überprüfen Sie die Bildschirmgröße und passen Sie die triggerHeight entsprechend an
  function adjustTriggerHeight() {
    if (window.innerWidth <= 768) { // Hier können Sie die Breite anpassen, um mobile Geräte zu erkennen
      triggerHeight = 2500; // Hier können Sie die gewünschte Höhe für mobile Geräte festlegen
    } else {
      triggerHeight = 5000; // Standardwert für Desktop
    }
  }

  adjustTriggerHeight(); // Rufen Sie die Funktion einmal auf, um die triggerHeight beim Laden der Seite festzulegen

  window.addEventListener("resize", adjustTriggerHeight); // Aktualisieren Sie die triggerHeight, wenn sich die Bildschirmgröße ändert

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll >= triggerHeight) {
      stickyButton.classList.add("show");
    } else {
      stickyButton.classList.remove("show");
    }
  });

  stickyButton.addEventListener("click", function () {
    // Scroll to the top of the screen when the sticky button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Use smooth scrolling for a nice animation
    });
  });
});

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      fadeAwayOverlay();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue + "%";

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

// Function to fade away the overlay after content is loaded
function fadeAwayOverlay() {
  const loader = document.querySelector(".loader");
  const content = document.querySelector(".content");

  // Use GSAP or any other animation library for smooth transitions
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      // Hide the loader once the animation is complete
      loader.style.display = "none";
      // Fade in the content
      gsap.to(content, {
        opacity: 1,
        duration: 1,
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
    const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

    const images = Array.from(document.querySelectorAll(".slider-item img"));

    function preloadImages() {
      return Promise.all(
        images.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    }

    preloadImages().then(() => {
      class DragScroll {
        constructor(obj) {
          this.el = document.querySelector(obj.el);
          this.wrap = this.el.querySelector(obj.wrap);
          this.items = this.el.querySelectorAll(obj.item);
          this.bar = this.el.querySelector(obj.bar);
          this.init();
        }

        init() {
          this.progress = 0;
          this.speed = 0;
          this.oldX = 0;
          this.x = 0;
          this.playrate = 0;

          this.bindings();
          this.events();
          this.calculate();
          this.raf();
        }

        bindings() {
          [
            "events",
            "calculate",
            "raf",
            "handleWheel",
            "move",
            "raf",
            "handleTouchStart",
            "handleTouchMove",
            "handleTouchEnd",
            "handlePrevArrowClick",
            "handleNextArrowClick",
          ].forEach((method) => {
            this[method] = this[method].bind(this);
          });
        }

        calculate() {
          this.progress = 0;
          this.wrapWidth = this.items[0].clientWidth * this.items.length;
          this.wrap.style.width = `${this.wrapWidth}px`;
          this.maxScroll = this.wrapWidth - this.el.clientWidth;
        }

        handleWheel(e) {
          this.progress += e.deltaY;
          this.move();
        }

        handleTouchStart(e) {
          if (!this.el.contains(e.target)) return; // Check if the event occurred within the slider
          e.preventDefault();
          this.dragging = true;
          this.startX = e.clientX || e.touches[0].clientX;
          this.el.classList.add("dragging");
        }

        handleTouchMove(e) {
          if (!this.dragging) return false;
          const x = e.clientX || e.touches[0].clientX;
          this.progress += (this.startX - x) * 1.5;
          this.startX = x;
          this.move();
        }

        handleTouchEnd() {
          if (!this.dragging) return;
          this.dragging = false;
          this.el.classList.remove("dragging");
        }

        handlePrevArrowClick(e) {
          e.preventDefault();
          this.progress -= this.el.clientWidth * 0.5;
          this.move();
        }

        handleNextArrowClick(e) {
          e.preventDefault();
          this.progress += this.el.clientWidth * 0.5;
          this.move();
        }

        move() {
          this.progress = clamp(this.progress, 0, this.maxScroll);
        }

        events() {
          window.addEventListener("resize", this.calculate);

          // Ändere hier die Event-Listener für das Drücken, Ziehen und Loslassen der Maustaste
          this.wrap.addEventListener("touchstart", this.handleTouchStart);
          window.addEventListener("touchmove", this.handleTouchMove);
          window.addEventListener("touchend", this.handleTouchEnd);

          this.wrap.addEventListener("mousedown", this.handleTouchStart);
          window.addEventListener("mousemove", this.handleTouchMove);
          window.addEventListener("mouseup", this.handleTouchEnd);
          this.wrap.addEventListener("mouseleave", this.handleTouchEnd);

          if (this.prevArrow) {
            this.prevArrow.addEventListener("click", this.handlePrevArrowClick);
          }

          if (this.nextArrow) {
            this.nextArrow.addEventListener("click", this.handleNextArrowClick);
          }
        }

        raf() {
          this.x = lerp(this.x, this.progress, 0.1);
          this.playrate = this.x / this.maxScroll;

          this.wrap.style.transform = `translateX(${-this.x}px)`;
          this.bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;

          this.speed = Math.min(100, this.oldX - this.x);
          this.oldX = this.x;

          this.scale = lerp(this.scale, this.speed, 0.1);
          this.items.forEach((item) => {
            item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
            item.querySelector("img").style.transform = `scaleX(${
            1 + Math.abs(this.speed) * 0.004
          })`;
          });
        }
      }

      const scroll = new DragScroll({
        el: ".slider",
        wrap: ".slider-wrapper",
        item: ".slider-item",
        bar: ".slider-progress-bar",
      });

      const animateScroll = () => {
        requestAnimationFrame(animateScroll);
        scroll.raf();
      };
      animateScroll();
    });
  }
});

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      fadeAwayOverlay();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue + "%";

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  const content = document.querySelector(".content");

  loader.style.display = "none";
  gsap.to(content, {
    opacity: 1,
    duration: 1,
  });
}

function simulateSiteLoading() {
  if (localStorage.getItem("loaderShown") === "true") {
    hideLoader();
  } else {
    setTimeout(() => {
      startLoader();
      localStorage.setItem("loaderShown", "true");
    }, 300); // Only show the loader on the first visit (3 seconds delay)
  }
}

// Check if the script should run on this page (index.html)
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
  // Manually trigger the site loading simulation
  simulateSiteLoading();
}

document.addEventListener("DOMContentLoaded", function () {
  let tl = gsap.timeline({ paused: true });

  tl.to(".menu-overlay", {
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
  });

  tl.from(
    ".menu-link",
    {
      opacity: 0,
      y: 60,
      stagger: 0.05,
      duration: 0.75,
      ease: "power1.inOut",
    },
    "<",
  );

  // Überprüfe die Fensterbreite und setze die Höhe entsprechend
  let videoPreviewHeight = window.innerWidth < 900 ? "150px" : "300px";

  tl.to(
    ".video-preview",
    {
      duration: 1,
      height: videoPreviewHeight,
      ease: "power2.out",
    },
    "<",
  );

  tl.to(
    ".menu-divider",
    {
      duration: 1.5, 
      width: "100%",
      ease: "power4.out",
    },
    "<",
  );

  function openMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "all";
    tl.play();
  }

  function closeMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "none";
    tl.reverse();
  }

  document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
  document
    .querySelector(".menu-close-btn")
    .addEventListener("click", closeMenu);
  tl.reverse();
});
