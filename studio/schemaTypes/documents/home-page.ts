import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'heroHeading', type: 'string'}),
    defineField({name: 'heroText', type: 'text', rows: 4}),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string', validation: (rule) => rule.required()})],
    }),
    defineField({name: 'aboutHeading', type: 'string'}),
    defineField({name: 'aboutText', type: 'text', rows: 6}),
  ],
})
