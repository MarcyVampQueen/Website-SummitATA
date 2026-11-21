import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'schoolName', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 3}),
    defineField({name: 'trialUrl', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'platform', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', type: 'url', validation: (rule) => rule.required().uri({scheme: ['http', 'https']})}),
          ],
        },
      ],
    }),
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string', validation: (rule) => rule.required()})],
    }),
  ],
})
