type InputErrorProps = {
  children: React.ReactNode;
};

const InputError: React.FC<InputErrorProps> = ({ children }) => {
  return <span className="text-red-900">{children}</span>;
};

export default InputError;
