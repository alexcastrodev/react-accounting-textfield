import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Component from '../Input'
import '../../public/styles.css'
import '../../public/theme/flecto.css'

export default {
  title: 'States/Input',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Component>

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Empty = Template.bind({})

Empty.args = {
  value: '',
  inputProps: {
    placeholder: '0,00',
  },
}

export const UncontrolledWithError = Template.bind({})

UncontrolledWithError.args = {
  defaultValue: '10',
  error: true,
  label: 'Name',
  helperText: 'Required',
  inputProps: {
    placeholder: '0,00',
  },
}
