import {defineArrayMember} from 'sanity'

export default {
  name: 'misc',
  title: 'Misc',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Project Category',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    },
    {
      name: 'contact',
      title: 'Contact Details',
      type: 'document',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
      ],
    },
  ],
}
