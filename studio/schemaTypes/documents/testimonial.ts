import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({name: 'quote', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({name: 'author', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'relationship', type: 'string'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'author', subtitle: 'quote'},
  },
})
