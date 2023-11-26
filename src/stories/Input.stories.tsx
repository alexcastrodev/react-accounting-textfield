import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent, fireEvent } from '@storybook/testing-library'
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
} as Meta<typeof Component>

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

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

const TemplateControlled: StoryFn<typeof Component> = (args) => {
  const [value, setValue] = React.useState('0')
  return (
    <Component
      value={value}
      onChangeCurrency={({ value }) => {
        setValue(value)
      }}
      inputProps={{
        placeholder: '0,00',
        onChange: (event) => {
          setValue(event.target.value)
        },
      }}
    />
  )
}

export const Controlled = TemplateControlled.bind({})

Controlled.args = {}

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

export const InputWithDecimalValues = Template.bind({})

InputWithDecimalValues.args = {
  helperText: 'Enter with your name',
  label: 'Name',
  inputProps: {
    placeholder: '0,00',
  },
}

InputWithDecimalValues.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '2,2412'
  )

  await canvas.getByTestId('react-currency-input-uncontrolled').blur()

  expect(args.onBlurCurrency).toHaveBeenCalledWith({
    cents: 224,
    float: 2.24,
    formatted: '2,24',
    value: '2,2412',
  })

  // cleanup
  await userEvent.clear(canvas.getByTestId('react-currency-input-uncontrolled'))
  await fireEvent.input(
    canvas.getByTestId('react-currency-input-uncontrolled'),
    '2,2412'
  )
  expect(args.onChangeCurrency).toHaveBeenCalledWith({
    cents: 224,
    float: 2.24,
    formatted: '2,24',
    value: '2,2412',
  })
}
