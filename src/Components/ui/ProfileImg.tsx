import { HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icons?: string;
  width?: string;
  hight?: string;
  isTrue?: boolean;
  Icon:IconType
}
const ProfileImg = ({
  Icons,
  Icon,
  width = "w-[50px]",
  hight = "h-[50px]",
  isTrue = true,
  ...rest
}: IProps) => {
  return (
    <div
      className={`relative ${width} ${hight} bg-[#C4C4C4] flex justify-center items-center rounded-full`}
      {...rest}
    >
      {Icons === "" ? (
        <FaUser />
      ) : Icons ? (
        <img src={Icons} alt={Icons} />
      ) : (
        <Icon size={22} />
      )}
      {isTrue ? (
        <span className="absolute right-[4%] bottom-[2%] border-[2px] border-white bg-[#09AD2D] w-[12px] h-[12px] rounded-full "></span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileImg;
