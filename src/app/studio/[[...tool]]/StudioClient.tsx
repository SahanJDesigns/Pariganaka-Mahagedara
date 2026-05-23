'use client'

import NextDynamic from 'next/dynamic'

const Studio = NextDynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import('next-sanity/studio'),
      import('../../../../sanity.config'),
    ])
    return function StudioEmbed() {
      return <NextStudio config={config} />
    }
  },
  { ssr: false }
)

export default function StudioClient() {
  return <Studio />
}
