import { useEffect, useRef, useState } from 'react'

export default function CountUp({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numeric = parseFloat(end.toString().replace(/[^0-9.]/g, ''))
          const isFloat = end.toString().includes('.')
          let start = 0
          const step = numeric / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= numeric) {
              setCount(isFloat ? numeric.toFixed(1) : Math.floor(numeric))
              clearInterval(timer)
            } else {
              setCount(isFloat ? start.toFixed(1) : Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}