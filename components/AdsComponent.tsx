'use client'

import React, { useEffect, useRef } from 'react'

interface AdSlotProps {
  adClient: string
  adSlot: string
  format?: string
  responsive?: boolean
  style?: React.CSSProperties
}

const AdSlot: React.FC<AdSlotProps> = ({
  adClient,
  adSlot,
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
}) => {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const adContainer = adRef.current

    const loadAd = () => {
      if (!adContainer) return

      const ins = adContainer.querySelector('ins.adsbygoogle') as HTMLElement

      if (ins && ins.getAttribute('data-adsbygoogle-status') !== 'done') {
        try {
          // @ts-ignore
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
          console.error('AdSense push error:', err)
        }
      }
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          loadAd()
        }
      }
    })

    if (adContainer) observer.observe(adContainer)

    return () => {
      if (adContainer) observer.unobserve(adContainer)
    }
  }, [])

  return (
    <div ref={adRef}>
      <ins
        className='adsbygoogle'
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  )
}

export default AdSlot
