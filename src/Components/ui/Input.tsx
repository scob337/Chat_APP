import { InputHTMLAttributes, Ref } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  border?: string;
  forwardedRef?: Ref<HTMLInputElement>;
}
const Input = ({ border,forwardedRef, ...rest }: IProps) => {
  return (
    <>
      <input
        className={`ps-2 w-[100%] bg-transparent ${border} placeholder:text-white-dark py-[8px] outline-none border  rounded-lg`}
        {...rest}
        ref={forwardedRef}
      />
    </>
  );
};

export default Input;
