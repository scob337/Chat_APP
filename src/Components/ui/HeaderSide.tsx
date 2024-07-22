import { TbPhoto } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../../Redux/UserInfo/userSlice";
import { RootState, UseAppDispatch } from "../../Redux/store";
const HeaderSide = () => {
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="flex items-center gap-[16px]">
      <div className=" relative w-[60px] h-[60px] bg-[#C4C4C4] flex justify-center items-center rounded-full">

          <TbPhoto size={22} />
       
        <span className="absolute right-[4%] bottom-[2%] border-[2px] border-white bg-[#09AD2D] w-[12px] h-[12px] rounded-full "></span>
      </div>
      <div>
        <h3 className="font-medium text-[18px] w-[200px] ">Hello</h3>
        <span className="text-[14px] text-[#180A29]">online</span>
      </div>
    </div>
  );
};

export default HeaderSide;
