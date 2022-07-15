const timeline = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
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
    tLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 200 }),
    tLeave.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: -100, onComplete: done })
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
        gsap.fromTo(
          next,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, onComplete: done }
        );
      },
    },
  ],
});
