const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
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
  
  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
  const rotate = 'rotate(' + angle +'deg)';
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
  curosrModifier.addEventListener('mouseenter', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });
  
  curosrModifier.addEventListener('mouseleave', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});

gsap.from(
    ".hero, .divider, .container .grid-container ",
    2,
    {
  y: "-200",
  opacity: 0,
  ease: Expo.easeInOut,
  delay: 0.4,
  stagger: 0.03,
}
  );

  gsap.from(
    ".subhero",
    2,
    {
  y: "-100",
  opacity: 0,
  ease: Expo.easeInOut,
  delay: 0.4,
  stagger: 0.03,
}
  );

  gsap.from(
    ".navbar",
    2,
    {
  y: "-30",
  opacity: 0,
  ease: Expo.easeInOut,
  delay: 0.4,
  stagger: 0.03,
}
  );

  /*

  var html = document.documentElement;
  var body = document.body;
  
  var scroller = {
    target: document.querySelector("#scroll-container"),
    ease: 0.05, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
  };
  
  var requestId = null;
  
  TweenLite.set(scroller.target, {
    rotation: 0.01,
    force3D: true
  });
  
  window.addEventListener("load", onLoad);
  
  function onLoad() {    
    updateScroller();  
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll); 
  }
  
  function updateScroller() {
    
    var resized = scroller.resizeRequest > 0;
    
    if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
    }
      
    var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
  
    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;
  
    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
    }
    
    TweenLite.set(scroller.target, { 
    y: -scroller.y 
    });
    
    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
  }
  
  function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
    }
  }
  
  function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
    }
  }

  */

  /* https://codepen.io/231afsgdh231/pen/vYxvrOP */

