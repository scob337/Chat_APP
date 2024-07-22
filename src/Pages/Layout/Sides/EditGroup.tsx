import { FormEvent, useEffect, useState } from 'react'
import { axiosApi, baseURL, editGroup } from '../../../Api/Api';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IoArrowUndo } from 'react-icons/io5';
import ToggleBTNGroup from './ToggleBTNGroup';
import { IoMdCheckmark } from "react-icons/io";

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../../Redux/reduxSlice';
import { useDispatch } from 'react-redux';

const EditGroup = () => {
  const MySwal = withReactContent(Swal)
  const { id } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [isClickLoading, setisClickLoading] = useState(false)

  const [groupName, setgroupName] = useState("")
  const [groupStatus, setgroupStatus] = useState("")
  const [EditGroupy, setEditGroupy] = useState(true)
  const [SendMSG, setSendMSG] = useState(true)
  const [ADDOtherMember, setADDOtherMember] = useState(true)
  const [ApproveNewMember, setApproveNewMember] = useState(false)
  const [EditGroupAdmin, setgEditGroupAdmin] = useState(false)
  // Edit Group Function
  const dispatchFun = useDispatch();
  const navigate = useNavigate();


  const EditGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisClickLoading(true)
    try {
      const res = await axiosApi.post(`${baseURL}${editGroup}${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        name: groupName,
        status: groupStatus,
      }

      );

      await MySwal.fire({
        title: `${res.data.message}`,
      });
      dispatchFun(updateData());
      
      setisClickLoading(false)

      setgroupName("")
      setgroupStatus("")
      setEditGroupy(true)
      setSendMSG(true)
      setADDOtherMember(true)
      setApproveNewMember(false)
      setgEditGroupAdmin(false)
      navigate("/groups")
      
    } catch (err: unknown) {
      const errorData = err as Error;
      await MySwal.fire({
        title: `${errorData.message}`,
      });
      setisClickLoading(false)

    }

  };


  // Edit Group Function



  // Get Group Info   

  useEffect(() => {
    const GetData = async () => {

      setisLoading(true)
      const Req = await axios.get(`https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      },
      )
      const res = Req.data


      const { edit_group, send_message, add_other_member, approve_new_member, edit_group_admins } = res

      setEditGroupy(edit_group)
      setSendMSG(send_message)
      setADDOtherMember(add_other_member)
      setApproveNewMember(approve_new_member)
      setgEditGroupAdmin(edit_group_admins)
      setgroupName(res.group.name)
      setgroupStatus(res.group.status)
      setisLoading(false)

    }
    GetData()
  }, [id])

  // Get Group Info 




  return (
    <>
      <>
        <div className="relative flex flex-col justify-center flex-auto min-h-full px-4 py-12 bg-white lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div 
              onClick={()=> window.history.back()}
            className="absolute left-[10%]  top-8 w-[40px] h-[40px] rounded-full bg-indigo-600 flex justify-center items-center ">
              <IoArrowUndo
                size={30}
                color="#fff"
                cursor="pointer"
              />
            </div>
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
              Modifica il gruppo

            </h2>
          </div>
          {isLoading ? (
            <div role="status" className="w-[70%] m-auto  animate-pulse">
              <div className="w-48 h-6 mb-4 bg-gray-200 rounded-full dark:bg-gray-900"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 max-w-[360px] mb-2.5"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>

            </div>
          ) : (
            <form
              onSubmit={EditGroup}
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
                    onChange={(e) => setgroupName(e.target.value)}
                    value={groupName}
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
                    value={groupStatus}
                    onChange={(e) => setgroupStatus(e.target.value)}
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

              </div>

              <div>




                <ToggleBTNGroup
                  EDITGroup={EditGroupy}
                  SENDMSG={SendMSG}
                  ADDOtherMember={ADDOtherMember}
                  APProveNewMember={ApproveNewMember}
                  EDITGroupAdmin={EditGroupAdmin}
                />
                <br />
                <button
                  className={

                  `flex w-[60px] h-[60px] justify-center items-center rounded-full bg-indigo-600 
                  px-3 py-1.5  font-semibold leading-6 text-white shadow-sm
                  text-[26px]
                   hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600
                  m-auto
                 
                 ${isClickLoading ? "cursor-not-allowed opacity-[0.5]" :"cursor-pointer opacity-[1]"}
                 `}
                >
                  <IoMdCheckmark size={46} color="white"/>


                </button>
              </div>
            </form>)}

        </div>
      </>



    </>
  )
}

export default EditGroup
