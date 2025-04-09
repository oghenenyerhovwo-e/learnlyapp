import { gsap } from 'gsap'

export const animateFlip = (el: Element) => {
  gsap.to(el, {
    duration: 0.5,
    rotateY: 180,
    ease: 'power2.inOut'
  })
}
