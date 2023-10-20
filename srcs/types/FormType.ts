import { ComponentProps } from "react";

export interface FormType extends ComponentProps<"input"> {
  fullWidth?: boolean;
  label?: string;
}
