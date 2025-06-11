// Scroll Progress Bar
function updateScrollProgress() {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  document.getElementById("scrollProgress").style.width = scrollPercent + "%"
}

// Animate on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Animate Counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(counter)
  })
}

// Animate Skill Bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width")
        entry.target.style.width = width + "%"
        observer.unobserve(entry.target)
      }
    })
  })

  skillBars.forEach((bar) => observer.observe(bar))
}

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  animateCounters()
  animateSkillBars()
  animateOnScroll()

  window.addEventListener("scroll", () => {
    updateScrollProgress()
    animateOnScroll()
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
