import React from 'react'
import { IInputProps } from './Input.types'
import accounting from 'accounting'

export const CurrencyInput: React.FC<IInputProps> = ({
  inputProps,
  testID = 'currency-input',
}) => {
  const [inputValue, setInputValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)

    inputProps?.onChange && inputProps.onChange(event)
  }

  const handleBlur = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    let localValue = accounting.unformat(inputValue, ",")
    setInputValue(accounting.formatMoney(localValue, "", 2, ".", ","))

    inputProps?.onBlur && inputProps.onBlur(event)
  }, [inputValue])

  return (
    <div>
      <input
        {...inputProps}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        data-testid={testID}
      />
    </div>
  )
}

export default CurrencyInput
