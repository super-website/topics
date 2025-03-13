import React from 'react'
import ContentWrapper from '@/components/ContentWrapper' // New client component

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  return <ContentWrapper searchParams={searchParams} />
}
