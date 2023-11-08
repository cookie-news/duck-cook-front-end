import { ComponentProps } from "react";

export interface FormType extends ComponentProps<"input"> {
  fullWidth?: boolean;
  label?: string;
  isChanging?: boolean;
  validates?: ValidadeType;
  options?: Array<any>;
  ref?: any;
  multiline?: boolean,
  rows?: number
}

export interface ValidadeType
{
    required?: string;
    min?: NumberValidateType;
}

export interface NumberValidateType
{
  value: number;
  message: string;
}