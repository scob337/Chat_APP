import { FormEvent, useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { axiosApi, baseURL, GROUPS, Create } from "../../../Api/Api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { updateData } from "../../../Redux/reduxSlice";
import { useDispatch, useSelector } from "react-redux";
import ToggleBTNGroup from "./ToggleBTNGroup";
import Button from "../../../Components/ui/Button";
import { FaCamera } from "react-icons/fa";




const CreateGroup = () => {

  const MySwal = withReactContent(Swal);
  const{EditGroup,SendMessage,AddOtherMember,ApproveNewMember,EditGroupAdmins} = useSelector((state:RootState)=>state.settingGroup)


  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [Addnumber, setAddnumber] = useState("");
  const [Avatar, setAvatar] = useState("");
  const dispatch = useDispatch();


  const POSTGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosApi.post(`${baseURL}${GROUPS}${Create}`, {
        group_name: name,
        status: status,
        avatar:Avatar,
        settings: {
          edit_group: EditGroup,
          send_message: SendMessage,
          add_other_member: AddOtherMember,
          approve_new_member: ApproveNewMember,
          edit_group_admins: EditGroupAdmins,
        },
        members: [
          {
            real_name: "lol",
            name: "",
            mobile: Addnumber,
            avatar: "",
            my_status: "Hey, i am using Cvox",
          },
        ],
      });
      await MySwal.fire({
        title: `${res.data.message}`,
      });
      dispatch(updateData());
      setName("");
      setStatus("");
      setAddnumber("");
    } catch (err: unknown) {
      const errorData = err as Error;
      await MySwal.fire({
        title: `${errorData.message}`,
      });
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(Addnumber);
  }, [Addnumber]);


  return (
    <div className="flex-auto flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white relative">
      <div className="sm:mx-auto ">
        <div 
        onClick={
          ()=>{
            window.history.back()
          }
        }
        className="absolute left-[10%]  top-8 w-[40px] h-[40px] rounded-full bg-indigo-600 flex justify-center items-center ">
          <IoArrowUndo size={30} color="#fff" cursor="pointer" />
        </div>
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Crea il gruppo
        </h2>
      </div>
          <div className="img group w-[150px] h-[150px] rounded-full bg-gray-400 m-auto flex justify-center items-center">
          <input type="file"id="img" className="hidden"
          onChange={(e) => setAvatar(e.target.files?.[0] ?? undefined)}
          />
                <FaCamera  size={30} />

          <label htmlFor="img" className="absolute">
            

          <div
                
                className="z-10 opacity-0 w-[150px] h-[150px] cursor-pointer rounded-full group-hover:bg-[#00000060] transition-all duration-300 group-hover:opacity-100 uppercase flex justify-center items-center flex-col text-center"
              >
                <FaCamera  size={30} />
                <p className="text-[14px] w-[80%] font-medium">
                  Change Profile Photo
                </p>
              </div>
            
          </label>
          </div>
      <form
        onSubmit={POSTGroup}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div>
          <label
            htmlFor="Name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            nome del gruppo
          </label>
          <div className="mt-2">
            <input
              id="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Descrizione del gruppo
            </label>
          </div>

          <div className="mt-2">
            <input
              id="password"
              type="text"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              required
              className=" p-2 max-w-[100%] min-h-[20px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Aggiungi un numero
            </label>
          </div>

          <div className="mt-2">
            <input
              id="phone"
              type="text"
              onChange={(e) => setAddnumber(e.target.value)}
              value={Addnumber}
              placeholder=""
              required
              className=" p-2 max-w-[100%] min-h-[20px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
      <ToggleBTNGroup/>



          <br />
          <Button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crea il gruppo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
