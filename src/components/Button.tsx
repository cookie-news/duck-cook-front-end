import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: React.ReactNode;
  className?: string
}

const buttonVariants = tv({
  base: "rounded-md p-2 border flex flex-row justify-center items-center",
  variants: {
    variant: {
      primary: "bg-green-800 border-green-900 text-white",
      secondary: "bg-transparent border-green-800 text-green-800",
      none: "border-none"
    },
  },
});

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className, ...props }) => {
  return <button className={twMerge(
    buttonVariants({ variant }),
    className
  )} {...props}>{children}</button>;
};

export default Button;
