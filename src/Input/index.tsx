import React from 'react'
import { IInputProps } from './Input.types'
import accounting from 'accounting'
import { CurrencyInputControlled } from './Controlled'
import { CurrencyInputUncontrolled } from './Uncontrolled'

export const CurrencyInput: React.FC<IInputProps> = ({
  inputProps,
  defaultValue,
  value,
  testID,
}) => {
  const [inputValue, setInputValue] = React.useState<string>('')

  React.useEffect(() => {
    if (!value) {
      return
    }
    const localValue = accounting.unformat(String(value) || '0', ',').toString()

    setInputValue(accounting.formatMoney(localValue, '', 2, '.', ','))
  }, [value])

  React.useEffect(() => {
    if (defaultValue && value) {
      console.warn(
        'You are trying to use controlled and uncontrolled at the same time. Just used inputProps.value or just defaultValue'
      )
    }
  }, [])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)

    inputProps?.onChange && inputProps.onChange(event)
  }

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!inputValue) return
      let localValue = accounting.unformat(event.target.value, ',').toString()
      setInputValue(accounting.formatMoney(localValue, '', 2, '.', ','))

      inputProps?.onBlur && inputProps.onBlur(event)
    },
    [inputValue]
  )

  if (value) {
    return (
      <CurrencyInputControlled
        inputProps={inputProps}
        value={String(inputValue)}
        handleBlur={handleBlur}
        handleChange={handleChange}
        data-testid={testID}
        setInputValue={setInputValue}
      />
    )
  }

  return (
    <CurrencyInputUncontrolled
      inputProps={inputProps}
      defaultValue={String(defaultValue)}
      value={String(inputValue)}
      handleBlur={handleBlur}
      handleChange={handleChange}
      data-testid={testID}
      setInputValue={setInputValue}
    />
  )
}

export default CurrencyInput
