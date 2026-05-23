import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'icon', type: 'string', title: 'Icon' }),
    defineField({ name: 'sort_order', type: 'number', title: 'Sort Order', initialValue: 0 }),
    defineField({ name: 'is_active', type: 'boolean', title: 'Active', initialValue: true }),
  ],
})
