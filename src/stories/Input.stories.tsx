import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Component from '../Input'
import '../../public/styles.css'
import '../../public/theme/flecto.css'

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
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '1240,24'
  )
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

export const UncontrolledWithCurrencyIcon = Template.bind({})

UncontrolledWithCurrencyIcon.args = {
  defaultValue: '10',
  showCurrencyIcon: true,
  inputProps: {
    placeholder: '0,00',
  },
}

export const UncontrolledWithLabel = Template.bind({})

UncontrolledWithLabel.args = {
  defaultValue: '10',
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

export const UncontrolledWithHelperText = Template.bind({})

UncontrolledWithHelperText.args = {
  defaultValue: '10',
  helperText: 'Enter with your name',
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

export const UncontrolledMaxValue = Template.bind({})

UncontrolledMaxValue.args = {
  helperText: 'Enter with your name',
  maxValue: 12.5,
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

UncontrolledMaxValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '2,24'
  )
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,24'
  )
  await userEvent.clear(canvas.getByTestId('react-currency-input-uncontrolled'))
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '1'
  )
  await canvas.getByTestId('react-currency-input-uncontrolled').blur()
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '1,00'
  )
}

export const UncontrolledMinValue = Template.bind({})

UncontrolledMinValue.args = {
  helperText: 'Enter with your name',
  minValue: 2,
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

UncontrolledMinValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '2,24'
  )
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,24'
  )
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '1'
  )
  await canvas.getByTestId('react-currency-input-uncontrolled').blur()
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,24'
  )
}

export const UncontrolledMinAndMaxValue = Template.bind({})

UncontrolledMinAndMaxValue.args = {
  helperText: 'Enter with your name',
  minValue: 2,
  maxValue: 12,
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

UncontrolledMinAndMaxValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '2,24'
  )
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,24'
  )

  await userEvent.clear(canvas.getByTestId('react-currency-input-uncontrolled'))

  await userEvent.keyboard('{backspace}')
  await userEvent.keyboard('{backspace}')
  await canvas.getByTestId('react-currency-input-uncontrolled').blur()
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,00'
  )

  await userEvent.clear(canvas.getByTestId('react-currency-input-uncontrolled'))
  expect(canvas.getByTestId('react-currency-input-uncontrolled')).toHaveValue(
    '2,00'
  )
}
