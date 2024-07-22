import SidesComponents from "../../../Components/ui/SidesComponents";
import { FaPencil } from "react-icons/fa6";
import useApiChat from "../../../Hooks/useAxios";
import {
  ChangeAvatar,
  axiosApi,
  baseURL,
  editProfile,
  getPROFILE,
} from "../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { toggleEdit } from "../../../Redux/reduxSlice";
import { IUser } from "../../../interfaces";
import { RootState, UseAppDispatch } from "../../../Redux/store";
import Input from "../../../Components/ui/Input";
import Button from "../../../Components/ui/Button";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchUserData } from "../../../Redux/UserInfo/userSlice";
import { FaCamera } from "react-icons/fa";

const EditSide = () => {
    const MySwal = withReactContent(Swal)
  // ----------- Api Hook --------------
  const userProfile: IUser | null = useApiChat(`${baseURL}${getPROFILE}`);
  //** ------------ Redux -------------
  const dispatch = useDispatch();
  const Dispatch = UseAppDispatch();
  const isEditOpen = useSelector((state: RootState) => state.app.isEditOpen);

  // ------------ State -----------------
  const [userEdit, setUserEdit] = useState({
    name: userProfile?.name,
    my_status: userProfile?.my_status,
    avatar: userProfile?.avatar,
  });
  const [avatar, setAvatar] =
    useState<SetStateAction<File | undefined>>(undefined);

  // ------------- Ref ---------------
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------- Effect ---------------
  useEffect(() => {
    if (userProfile) {
      setUserEdit({
        name: userProfile.name || "",
        my_status: userProfile.my_status || "",
        avatar: userProfile.avatar || "",
      });
    }
  }, [userProfile]);

  // ---------- Handler --------------
  const changeProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserEdit({ ...userEdit, [name]: value });
  };
  const EditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosApi.post(`${baseURL}${editProfile}`, userEdit);

      dispatch(toggleEdit(""));
      await MySwal.fire({
        title: `${res.data.message}`,
      });
    } catch (err: unknown) {
      const errorData = err as Error;
      await MySwal.fire({
        title: `${errorData.message}`,
      });
    }
  };
  function inputClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  async function upLoadImg(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData();
    if (avatar instanceof File) {
      form.append("avatar", avatar);
    }
    try {
      const res = await axiosApi.post(`${baseURL}${ChangeAvatar}`, form);
      await MySwal.fire({
        title: `${res.data.message}`,
      });
    } catch (err: unknown) {
      const errorData = err as Error;
      await MySwal.fire({
        title: `${errorData.message}`,
      });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditOpen === "avatar") {
        await upLoadImg(e);
      }
      if (isEditOpen === "name" || isEditOpen === "status") {
        await EditProfile(e);
      }
      Dispatch(fetchUserData());
    } catch (err: unknown) {
      const errorData = err as Error;
      await MySwal.fire({
        title: `${errorData.message}`,
      });
    }
  };

  const imageURL = `https://cvoxxmpp.dev.itvalues.site/CVOX-WS/public/storage/${userEdit.avatar}`;

  return (
    <SidesComponents>
      <div className="px-[26px] relative">
        <div className="w-full border-b-[#9AACB5] border-b pb-[16px]">
          <form className="mt-[16px]" onSubmit={handleSubmit}>
            {/* Profile Img */}
            <div
              onClick={() => dispatch(toggleEdit("avatar"))}
              className="relative overflow-hidden cursor-pointer group  text-white w-[180px] h-[180px] mx-auto bg-[#C4C4C4] flex justify-center items-center rounded-full   "
            >
              <div className="absolute w-full h-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={
                    avatar instanceof File
                      ? URL.createObjectURL(avatar)
                      : imageURL
                  }
                  alt="profile"
                />
              </div>
              <Input
                type="file"
                onChange={(e) => setAvatar(e.target.files?.[0] ?? undefined)}
                hidden={true}
                forwardedRef={fileInputRef}
                className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]`}
              />

              <div
                onClick={inputClick}
                className="z-10 opacity-0 w-full h-full group-hover:bg-[#00000060] transition-all duration-300 group-hover:opacity-100 uppercase flex justify-center items-center flex-col text-center"
              >
                <FaCamera  size={30} />
                <p className="text-[14px] w-[80%] font-medium">
                  Change Profile Photo
                </p>
              </div>
            </div>
            <p className="font-medium text-center mt-4 text-[#807f81]">
              {userProfile?.mobile}
            </p>
            {/* Name */}
            <div className="my-[16px]">
              <span className="text-primary text-[14px] font-medium">
                Your Name
              </span>
              <div className="flex justify-between  items-center gap-[16px]">
                {isEditOpen === "name" ? (
                  <Input
                    value={userEdit.name}
                    onChange={changeProfile}
                    name="name"
                  />
                ) : (
                  <p className="text-[18px] font-bold"> {userEdit.name}</p>
                )}
                <FaPencil
                  onClick={() => dispatch(toggleEdit("name"))}
                  className="cursor-pointer hover:text-primary transition-all duration-300"
                />
              </div>
            </div>
            {/* Bio */}
            <div className="my-[16px]">
              <span className="text-primary text-[14px] font-medium">
                About
              </span>
              <div className="flex justify-between items-center gap-[16px]">
                {isEditOpen === "status" ? (
                  <Input
                    value={userEdit.my_status}
                    onChange={changeProfile}
                    name="my_status"
                  />
                ) : (
                  <p className="text-[18px] font-bold">{userEdit.my_status}</p>
                )}
                <FaPencil
                  onClick={() => dispatch(toggleEdit("status"))}
                  className="cursor-pointer hover:text-primary transition-all duration-300"
                />
              </div>
            </div>
            <div className="w-[70%] mx-auto">
              <Button className=" bg-primary py-2 text-white" width="w-full">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SidesComponents>
  );
};

export default EditSide;
