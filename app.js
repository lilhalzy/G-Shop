const tEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

// in progress
// leave and enter animation
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".img-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelector(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    tLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tLeave.fromTo(
      product,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -100, onComplete: done },
      "<"
    ),
    tLeave.fromTo(
      text,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 100, onComplete: done },
      "<"
    ),
    tLeave.fromTo(
      circles,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -200,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

const enterAnimation = (current, done) => {
  const product = current.querySelector(".img-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelector(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    tLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tLeave.fromTo(
      product,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, onComplete: done },
      "<"
    ),
    tLeave.fromTo(
      text,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, onComplete: done },
      "<"
    ),
    tLeave.fromTo(
      circles,
      { opacity: 0, y: -200 },
      { opacity: 1, y: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 },
      "<"
    )
  );
};
// Run animations
barba.init({
  preventRunning: true,
  transitions: [
    // showcase transitions
    {
      name: "default",
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        enterAnimation(next, done);
      },
    },
    // Product page animation
    {
      name: 'product-transition',
      sync: true,
      from: {namespace: ['ps5', 'product']},
      to: {namespace: ['product', 'ps5']},
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done)
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done)
      }
    },
  ],
});

function productEnterAnimation (next, done) {
  tEnter.fromTo(next, {y: '100%'}, {y: '0%'})
  tEnter.fromTo('.card', {opacity: 0, y: 50}, {opacity: 1, y: 0, stagger: .1, onComplete: done})
}

function productLeaveAnimation (current, done) {
  tLeave.fromTo(current, {opacity: 1}, {opacity: 0, onComplete: done})
}