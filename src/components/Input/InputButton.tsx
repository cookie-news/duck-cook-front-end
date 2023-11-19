interface InputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const InputButton: React.FC<InputButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default InputButton;
