import { twMerge } from "tailwind-merge";

interface InputRootProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const InputRoot: React.FC<InputRootProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        "flex gap-2 border-neutral-dark border shadow-md bg-neutral-default rounded-md p-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default InputRoot;
