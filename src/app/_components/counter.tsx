'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount((count) => count + 1)}>Click me</Button>
      <p>You clicked {count} times</p>
    </>
  )
}
