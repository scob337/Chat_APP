import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width, ...rest }: IProps) => {
  return (
    <button
      type="submit"
      className={`${className} ${width} border-0 uppercase p-3 rounded-3xl font-mono font-bold text-lg BtnColor`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
