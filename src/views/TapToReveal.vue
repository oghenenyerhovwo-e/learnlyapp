<template>
  <div class="screen">
    <Navbar lesson="2.1" :currentStep="4" :totalSteps="10" />

    <h2 class="heading">Tap to discover states of matter</h2>

    <div class="card-grid">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card-wrapper"
        @click="flipCard(index)"
      >
        <div
          class="card"
          :class="{ flipped: card.isFlipped }"
          ref="cardRefs"
        >
          <!-- Front -->
          <div class="card-face card-front" :style="{ background: card.bgGradient }">
            <div class="card-content">
              <component :is="card.icon" class="icon" />
              <p class="card-title">{{ card.title }}</p>
            </div>
          </div>

          <!-- Back -->
          <div class="card-face card-back">
            <div class="card-content">
              <h3>{{ card.backTitle }}</h3>
              <p>{{ card.backText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="next-btn">
      Next <span>&rarr;</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
    import Navbar from '../components/Navbar.vue'
    import { ref, onMounted, nextTick } from 'vue'
    import { gsap } from 'gsap'

    // Import icons (you can replace with your icon set or svg paths)
    import { FaSteam, FaTint, FaSnowflake, FaBolt } from 'react-icons/fa'

    const cardRefs = ref<HTMLDivElement[]>([])

    const cards = ref([
      {
        title: 'Steam',
        icon: FaSteam,
        bgGradient: 'linear-gradient(135deg, #6DD5FA, #2980B9)',
        isFlipped: false,
        backTitle: 'Gas',
        backText: 'A gas expands to fill any container, Its particles move freely and spread apart.',
      },
      {
        title: 'Water',
        icon: FaTint,
        bgGradient: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
        isFlipped: false,
        backTitle: 'Liquid',
        backText: 'A Liquid takes the shape of its container but keeps its volume. Its particles are close together.',
      },
      {
        title: 'Ice',
        icon: FaSnowflake,
        bgGradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        isFlipped: false,
        backTitle: 'Solid',
        backText: 'A solid has a fixed shape and volume. Its particles vibrate but do not move freely.',
      },
      {
        title: 'Lightning',
        icon: FaBolt,
        bgGradient: 'linear-gradient(135deg, #f6d365, #fda085)',
        isFlipped: false,
        backTitle: 'Lightning',
        backText: 'Fixed shape and volume, its particles vibrate but do not move freely.',
      },
    ])

    const flipCard = async (index: number) => {
      const card = cardRefs.value[index]
      if (!card) return

      const flipTl = gsap.timeline()
      flipTl
        .to(card, {
          rotateY: 90,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            cards.value[index].isFlipped = !cards.value[index].isFlipped
          },
        })
        .to(card, {
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
    }

    onMounted(() => {
      nextTick(() => {
        cardRefs.value = document.querySelectorAll('.card') as any
      })
    })
</script>

<style scoped>

.heading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  justify-content: center;
}

.card-wrapper {
  perspective: 1000px;
}

.card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.card-front {
  color: white;
}

.card-back {
  background: white;
  color: #333;
  transform: rotateY(180deg);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.card-title {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: bold;
}

.icon {
  font-size: clamp(2rem, 5vw, 3rem);
}

.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 2rem;
  font-weight: bold;
  margin: 2rem auto 0;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.next-btn:hover {
  background-color: #4338ca;
}
</style>
