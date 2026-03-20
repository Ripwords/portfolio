import { ref, readonly } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'writing', 'projects', 'architecture', 'philosophy', 'contact'] as const

export type SectionId = typeof SECTION_IDS[number]

const activeSection = ref<SectionId>('hero')

export function useActiveSection() {
  function observeSections() {
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            activeSection.value = id
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' },
      )
    })
  }

  return {
    activeSection: readonly(activeSection),
    observeSections,
    SECTION_IDS,
  }
}
