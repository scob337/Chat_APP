import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface IProps {
  children: ReactNode;
  name:string;
  link:string;
  center:"text-center" | "text-start"
}
const BodyAuth = ({ children,name,link,center }: IProps) => {
  return (
    <div className="h-auto bg-white w-[60%] py-16 px-16 mx-auto my-[-80px] rounded-md shadow-lg">
      {children}
      <div className={`${center} mt-6` }>
          <Link
            to={link}
            className="text-primary text-[18px] border-b-[1px] border-primary font-semibold hover:text-secondary hover:border-secondary transition-all duration-300"
          >
            {name}
          </Link>
        </div>
    </div>
  );
};

export default BodyAuth;
