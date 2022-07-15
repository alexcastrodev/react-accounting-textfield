import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import Component from '../Input'

export default {
  title: 'Component/Input',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
)

export const InputCurrency = Template.bind({})


InputCurrency.args = {
  inputProps: {
    placeholder: '0,00',
  },
}

InputCurrency.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('react-currency-input-uncontrolled'), '1240,24')
}

export const Controlled = Template.bind({})

Controlled.args = {
  value: '10,24',
  inputProps: {
    placeholder: '0,00',
  },
}

export const Uncontrolled = Template.bind({})

Uncontrolled.args = {
  defaultValue: '10',
  inputProps: {
    placeholder: '0,00',
  },
}

export const Empty = Template.bind({})

Empty.args = {
  value: '',
  inputProps: {
    placeholder: '0,00',
  },
}
