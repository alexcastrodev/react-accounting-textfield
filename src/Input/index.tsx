import React from 'react'
import { IInputProps } from './Input.types'
import accounting from 'accounting'
import { CurrencyInputControlled } from './Controlled'
import { CurrencyInputUncontrolled } from './Uncontrolled'
import { EuroSignIcon } from '../assets/icons/euro'
import classnames from 'classnames'
import { ExclamationCircleIcon } from '../assets/icons/exclamationCircle'

export const CurrencyInput: React.FC<IInputProps> = ({
  inputProps,
  defaultValue,
  value,
  testID,
  onChangeCurrency,
  showCurrencyIcon,
  size = 'md',
  label,
  error,
  helperText,
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
    const { value } = event.target
    setInputValue(value)

    const localValue = accounting.unformat(String(value) || '0', ',').toString()
    const parsedValue = accounting.formatMoney(localValue, '', 2, '.', ',')

    inputProps?.onChange && inputProps.onChange(event)

    onChangeCurrency &&
      onChangeCurrency({
        float: accounting.unformat(String(value) || '0', ','),
        formatted: parsedValue,
        cents: Number(parsedValue.replace(/[.,\s]/g, '')),
      })
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

  const renderInput = React.useMemo(() => {
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
  }, [
    value,
    inputProps,
    defaultValue,
    setInputValue,
    testID,
    inputValue,
    handleBlur,
    handleChange,
  ])

  return (
    <fieldset
      className={classnames({
        'react-accounting-textfield--fieldset': true,
        'react-accounting-textfield--fieldset--with-error':
          typeof error === 'boolean' ? error : false,
      })}
    >
      {label && (
        <label className='react-accounting-textfield--label'> {label}</label>
      )}
      <div
        className={classnames({
          'react-accounting-textfield--container': true,
          'react-accounting-textfield--container-with-adorment':
            showCurrencyIcon,
          'react-accounting-textfield--container-sm': size === 'sm',
          'react-accounting-textfield--container-md': size === 'md',
          'react-accounting-textfield--container-lg': size === 'lg',
          'react-accounting-textfield--container--with-label': !!label,
        })}
      >
        {showCurrencyIcon && (
          <div
            className={classnames({
              'react-accounting-textfield-with-adorment': showCurrencyIcon,
            })}
          >
            <EuroSignIcon />
          </div>
        )}
        {renderInput}
      </div>
      {helperText && (
        <div className='react-accounting-textfield--helperText-container'>
          {error && (
            <i className='react-accounting-textfield--helperText-icon-error'>
              <ExclamationCircleIcon />
            </i>
          )}
          <span className='react-accounting-textfield--helperText'>
            {helperText}
          </span>
        </div>
      )}
    </fieldset>
  )
}

export default CurrencyInput
