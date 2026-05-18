import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProductBySlug } from '@/lib/queries'
import { ProductDetailClient } from '@/components/product/ProductDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.meta_title ?? product.name,
    description: product.meta_description ?? product.short_description ?? undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
