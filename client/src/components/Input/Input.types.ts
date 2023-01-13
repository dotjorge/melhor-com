import { FC } from 'types'
import { InputHTMLAttributes, RefObject } from 'react'

export type IInput = FC<IInputProps & DefaultInputProps>

export interface IInputProps {
  label?: string
  error?: { [key: string]: any }
}

export type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

export type Ref =
  | RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined
