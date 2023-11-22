import { twMerge } from "tailwind-merge";

interface InputLabelProps
    extends React.InputHTMLAttributes<HTMLDivElement> {
    text: string,
    className?: string
}

const InputLabel: React.FC<InputLabelProps> = ({
    text,
    className,
    ...props
}) => {
    return (
        <div
            {...props}
            className={twMerge(
                "mb-1",
                className
              )}
        ><span className="text-sm text-gray-500">{text}</span></div>
    );
};

export default InputLabel;
