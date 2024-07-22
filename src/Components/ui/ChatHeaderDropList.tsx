import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/reduxSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { ToggleShowContactList } from "../../Redux/UserInfo/GroupSettingSlice";


import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function classNames(...classe) {
  return classe.filter(Boolean).join(" ");
}
export default function ChatHeaderDropList() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { id } = useParams();
  const Navigate = useNavigate()

  const DeleteGroup = async (id: string | number) => {
    try {
      await axios.delete(
        `https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${id}/delete_group`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      await MySwal.fire("Are you sure you want to delete this group?");

      dispatch(updateData());

      Navigate("/groups")

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <Menu as="div" className="relative z-0 inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md
        outline-none border-none 
         bg-white px-3 py-2 text-sm font-semibold
         text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <BsThreeDotsVertical className="cursor-pointer" size={20} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg z-11 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to={`/groups/editgroup/${id} `}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm font-[20px] cursor-pointer"
                  )}
                >
                  <FaEdit size={26} />
                  Modifica il gruppo
                </NavLink>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm font-[20px] cursor-pointer"
                  )}
                  onClick={() => dispatch(ToggleShowContactList(true))}
                >
                  <IoMdPersonAdd size={26} />
                  Aggiungi un membro

                </p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => DeleteGroup(id)}
                  className={classNames(
                    active ? "bg-gray-100 text-[red]" : "text-[red]",
                    "flex items-center gap-2 px-4 py-2 text-sm font-[20px] cursor-pointer text-[red]"
                  )}
                >
                  <FaRegTrashAlt size={26} />
                  Elimina il gruppo
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
