import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } }),
    defineField({ name: 'website_url', type: 'url', title: 'Website URL' }),
    defineField({ name: 'is_active', type: 'boolean', title: 'Active', initialValue: true }),
  ],
})
