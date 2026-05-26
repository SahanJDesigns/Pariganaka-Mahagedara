import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'flier',
  title: 'Hero Flier',
  type: 'document',
  fields: [
    defineField({ name: 'title',         type: 'string',  title: 'Title (CMS label)', validation: (r) => r.required() }),
    defineField({ name: 'mobile_image',  type: 'image',   title: 'Mobile Image (< 768px)',  options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'tablet_image',  type: 'image',   title: 'Tablet Image (768px – 1023px)', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'desktop_image', type: 'image',   title: 'Desktop Image (≥ 1024px)', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt_text',      type: 'string',  title: 'Alt Text' }),
    defineField({ name: 'link_url',      type: 'url',     title: 'Link URL (optional)' }),
    defineField({ name: 'sort_order',    type: 'number',  title: 'Sort Order',  initialValue: 0 }),
    defineField({ name: 'is_active',     type: 'boolean', title: 'Active',      initialValue: true }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sort_orderAsc', by: [{ field: 'sort_order', direction: 'asc' }] }],
  preview: { select: { title: 'title', media: 'desktop_image' } },
})
