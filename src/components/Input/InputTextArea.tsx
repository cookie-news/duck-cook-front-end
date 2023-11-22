interface InputTextAreaProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    register?: any;
    name: string;
    value?: string;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
    register,
    value,
    ...props
}) => {

    return (
        <textarea
            {...props}
            {...(register && register(props.name))}
            className="bg-transparent outline-none w-full"
        >
            {value}
        </textarea>
    );
};

export default InputTextArea;
