import { ReactElement } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactElement | string;
    className?: string;
    onClick?: () => void;
}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <div
            {...props}
            className={`py-2 px-4 cursor-pointer hover:opacity-80 focus:opacity-100 select-none border rounded-md border-gray-200 bg-black text-white ml-4 flex items-center gap-2 ${props.className}`}
        >
            {children}
        </div>
    );
}