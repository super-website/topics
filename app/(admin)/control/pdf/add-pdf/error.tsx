'use client'
import React from 'react'

export default function error({ error }: { error: string }) {
  return <span>{error || 'An error occurred'}</span>
}
