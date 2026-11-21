import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'name', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'ageRange', type: 'string'}),
    defineField({name: 'summary', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string', validation: (rule) => rule.required()})],
    }),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'sortOrder', type: 'number', initialValue: 100}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'ageRange', media: 'image'},
  },
})
