interface InputTextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  name: string;
}

const InputTextfield: React.FC<InputTextfieldProps> = ({
  register,
  ...props
}) => {
  return (
    <input
      {...props}
      {...(register && register(props.name))}
      className="bg-transparent outline-none w-full"
    />
  );
};

export default InputTextfield;
