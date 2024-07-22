import { ReactNode } from "react";
export interface IProps {
  children: ReactNode;
  title: string;
  description?: string;
}
const AuthComponent = ({
  children,
  description,

  title,
}: IProps) => {
  return (
    <div>
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="relative  border border-1 shadow-md  flex w-full max-w-full lg:max-w-[670px] flex-col overflow-hidden rounded-md bg-white/60 backdrop-blur-lg  lg:min-h-[400px] lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative flex w-full flex-col items-center mx-auto justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-5">
                <h1 className="rounded-lg text-3xl font-extrabold uppercase !leading-snug text-white bg-[#7b52d3] mb-2 w-fit px-2 py-1 md:text-4xl">
                  {title}
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  {description}
                </p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
