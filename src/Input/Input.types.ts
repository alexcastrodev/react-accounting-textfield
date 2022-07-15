import React from 'react'

export interface IInputProps {
  defaultValue?: string | number
  value?: string | number
  testID?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
export interface IInputComponentProps {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  testID?: string
}

export interface IUncontrolledProps extends IInputComponentProps {
  defaultValue: string
}
