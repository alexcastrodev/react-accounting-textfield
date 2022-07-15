import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import Component from '../Input'
import '../../public/styles.css'
import '../../public/theme/flecto.css'

export default {
  title: 'States/Input',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

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
