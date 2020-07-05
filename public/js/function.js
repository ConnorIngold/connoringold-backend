if (mq.matches) {
new SimpleBar(document.querySelector("article"), { overflowX: false })
}

document.addEventListener("DOMContentLoaded", () => {
  // Creating waypoint
  anime({
    targets: ".sidebar",
    // [start, finish]
    translateX: [-100, 0],
    delay: 100,
  })

  anime({
    targets: ".purple-bg",
    // [start, finish]
    translateY: [-1000, 0],
    delay: 100,
    easing: "easeInOutQuad",
    duration: 500,
  }).finished.then(function () {
    anime({
      targets: ".image",
      // [start, finish]
      translateY: [-1000, 0],
      delay: 350,
      easing: "easeInOutQuad",
      duration: 500,
    })
  })

  anime({
    targets: "article",
    // [start, finish]
    translateY: [1000, 0],
    delay: 100,
    easing: "easeInOutQuad",
  }).finished.then(function () {
    anime({
      targets: ".search, .headline-wrapper, .text-wrapper",
      // [start, finish]
      translateY: [1000, 0],
      delay: 350,
      easing: "easeInOutQuad",
      duration: 400,
    })
  })
})
