/**
 * deck.js — Alma Reveal.js deck controller
 *
 * Behaviour (Option A — slide-level advance):
 *  • Each slide holds one MP4 video clip.
 *  • When a slide becomes active the video resets to 0 and plays.
 *  • Navigating away pauses + resets the outgoing video.
 *  • → / Space / click always advance freely (don't wait for video to end).
 *  • ← always goes back.
 *  • Slides marked data-hold do NOT auto-advance when their video ends.
 *  • All other slides auto-advance 400 ms after the video finishes.
 *    (Set AUTO_ADVANCE = false below to disable this globally.)
 */

const AUTO_ADVANCE = false  // fully manual pacing
const AUTO_ADVANCE_DELAY_MS = 400  // pause after clip ends before advancing

// ── 1. Inject video elements + placeholders ─────────────────────────────────
document.querySelectorAll('section[data-video]').forEach((section, i) => {
  const src = section.getAttribute('data-video')

  const video = document.createElement('video')
  video.src = src
  // First slide preloads immediately; others preload lazily via load()
  video.preload = i === 0 ? 'auto' : 'none'
  video.muted = false          // change to true if autoplay is blocked by browser
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  video.style.display = 'block'

  // Placeholder shown while video hasn't loaded yet
  const placeholder = document.createElement('div')
  placeholder.className = 'placeholder'
  placeholder.innerHTML = `
    <div class="filename">${src.split('/').pop()}</div>
    <div class="hint">render this clip to see the slide</div>
  `

  // Show placeholder when video can't load (file missing)
  video.addEventListener('error', () => {
    placeholder.style.display = 'flex'
    video.style.display = 'none'
  })
  video.addEventListener('loadeddata', () => {
    placeholder.style.display = 'none'
    video.style.display = 'block'
  })

  section.appendChild(placeholder)
  section.appendChild(video)
})

// ── 2. Custom slide counter ─────────────────────────────────────────────────
const counter = document.createElement('div')
counter.id = 'slide-counter'
document.body.appendChild(counter)

function updateCounter() {
  const total = Reveal.getTotalSlides()
  const index = Reveal.getState().indexh + 1
  counter.textContent = `${index} / ${total}`
}

// ── 3. Keyboard hint (auto-hides after first key press) ─────────────────────
const hint = document.createElement('div')
hint.id = 'keyboard-hint'
hint.textContent = '→  advance      ←  back      F  fullscreen'
document.body.appendChild(hint)

function hideHint() {
  hint.classList.add('hidden')
  document.removeEventListener('keydown', hideHint)
}
document.addEventListener('keydown', hideHint)
// Also hide on first click inside the deck
document.querySelector('.reveal').addEventListener('click', hideHint, { once: true })

// ── 4. Helpers ──────────────────────────────────────────────────────────────
function videoOf(slide) {
  return slide ? slide.querySelector('video') : null
}

let autoAdvanceTimer = null

function cancelAutoAdvance() {
  if (autoAdvanceTimer !== null) {
    clearTimeout(autoAdvanceTimer)
    autoAdvanceTimer = null
  }
}

function playSlide(slide) {
  const video = videoOf(slide)
  if (!video) return

  cancelAutoAdvance()
  video.currentTime = 0

  // Trigger load for lazily-preloaded videos
  if (video.readyState === 0) {
    video.load()
  }

  const playPromise = video.play()
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked (common in some browsers without interaction).
      // The video will play on first user click via the click listener below.
      video.muted = true
      video.play().catch(() => {})
    })
  }

  // Auto-advance when clip ends (unless the slide opts out with data-hold)
  if (AUTO_ADVANCE && !slide.hasAttribute('data-hold')) {
    video.addEventListener('ended', function onEnded() {
      video.removeEventListener('ended', onEnded)
      autoAdvanceTimer = setTimeout(() => Reveal.next(), AUTO_ADVANCE_DELAY_MS)
    }, { once: true })
  }
}

function pauseSlide(slide) {
  const video = videoOf(slide)
  if (!video) return
  cancelAutoAdvance()
  video.pause()
  video.currentTime = 0
}

function preloadAdjacent(indexh) {
  // Preload the next slide's video so it's ready when we arrive
  const nextSlide = Reveal.getSlide(indexh + 1)
  const nextVideo = videoOf(nextSlide)
  if (nextVideo && nextVideo.preload === 'none') {
    nextVideo.preload = 'metadata'
    nextVideo.load()
  }
}

// ── 5. Initialise Reveal.js ─────────────────────────────────────────────────
Reveal.initialize({
  hash: false,
  transition: 'none',
  controls: false,
  progress: false,
  slideNumber: false,
  center: false,
  touch: false,          // disable swipe-to-advance on touch devices

  keyboard: {
    39: () => Reveal.next(),   // →
    32: () => Reveal.next(),   // Space
    37: () => Reveal.prev(),   // ←
  }
})

// ── 6. Slide lifecycle events ───────────────────────────────────────────────
Reveal.on('ready', ({ currentSlide, indexh }) => {
  playSlide(currentSlide)
  preloadAdjacent(indexh)
  updateCounter()
  // Reveal is ready — hide hint after 5 s even without interaction
  setTimeout(() => hint.classList.add('hidden'), 5000)
})

Reveal.on('slidechanged', ({ currentSlide, previousSlide, indexh }) => {
  pauseSlide(previousSlide)
  playSlide(currentSlide)
  preloadAdjacent(indexh)
  updateCounter()
})

// ── 7. One-time autoplay unlock on first user interaction ───────────────────
// Some browsers block autoplay until the user interacts with the page.
// The first keydown or click unmutes and plays the current video if it stalled.
function unlockAutoplay() {
  const curr = videoOf(Reveal.getCurrentSlide())
  if (curr && curr.paused && !curr.ended) {
    curr.muted = false
    curr.play().catch(() => {})
  }
  document.removeEventListener('keydown', unlockAutoplay)
  document.removeEventListener('click',   unlockAutoplay)
}
document.addEventListener('keydown', unlockAutoplay)
document.addEventListener('click',   unlockAutoplay)
