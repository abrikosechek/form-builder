import { type RefObject, useEffect, useRef } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
  const isMouseDownOutside = useRef(false)
  const activeEvent = useRef<MouseEvent | TouchEvent | null>(null)

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        isMouseDownOutside.current = false
        return
      }
      isMouseDownOutside.current = true
      activeEvent.current = event
    }

    const handleMouseUp = (event: MouseEvent | TouchEvent) => {
      if (isMouseDownOutside.current) {
        // Check again on mouseup to ensure the target is still outside
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return
        }
        handleOnClickOutside(activeEvent.current || event)
      }

      // Reset state
      isMouseDownOutside.current = false
      activeEvent.current = null
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('touchstart', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [ref, handleOnClickOutside])
}
