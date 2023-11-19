import { tv, VariantProps } from "tailwind-variants";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: React.ReactNode;
}

const buttonVariants = tv({
  base: "rounded-md p-2 border",
  variants: {
    variant: {
      primary: "bg-green-800 border-green-900 text-white",
      secondary: "bg-lime-500 border-lime-600 text-white",
    },
  },
});

const Button: React.FC<ButtonProps> = ({ children, variant = "primary" }) => {
  return <button className={buttonVariants({ variant })}>{children}</button>;
};

export default Button;
