import React from 'react'
import { IUncontrolledProps } from './Input.types'
import accounting from 'accounting'

export const CurrencyInputUncontrolled: React.FC<IUncontrolledProps> = ({
  inputProps,
  defaultValue,
  value,
  handleBlur,
  handleChange,
  setInputValue,
  testID = 'react-currency-input-uncontrolled',
}) => {
  React.useEffect(() => {
    if (defaultValue !== 'undefined') {
      const localValue = accounting
        .unformat(String(defaultValue), ',')
        .toString()
      setInputValue(accounting.formatMoney(localValue, '', 2, '.', ','))
    }
  }, [])

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

export default CurrencyInputUncontrolled
