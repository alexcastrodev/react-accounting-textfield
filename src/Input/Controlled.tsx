import React from 'react'
import { IInputComponentProps } from './Input.types'

export const CurrencyInputControlled: React.FC<IInputComponentProps> = ({
  inputProps,
  handleBlur,
  handleChange,
  value,
  testID = 'react-currency-input-controlled',
}) => {
  return (
    <input
      {...inputProps}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      data-testid={testID}
    />
  )
}

export default CurrencyInputControlled
