import { ReactNode, useState } from "react";
import { FaPlus } from "react-icons/fa";
import HeaderSide from "./HeaderSide";
import { BsSearch } from "react-icons/bs";
import Input from "./Input";
import { NavLink } from "react-router-dom";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

interface IProps {
  children: ReactNode;
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SidesComponents = ({ children }: IProps) => {
  // ----- State ---------
  const [isOpen, setIsOpen] = useState(false);
  // ---------- Handler ----------------
  const handleOpenInput = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside
      className={` rounded-l-2xl w-full relative bg-white shadow-lg z-10  flex transition-all duration-500`}
    >
      <div
        className="fixed cursor-pointer z-10 text-white bg-[#180A29] w-[60px] h-[60px] flex justify-center
       items-center rounded-full bottom-20 left-[29%]"
      >
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center 
        
        gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  "
            >
              <FaPlus size={20} />
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
            <Menu.Items className="absolute top-[-120px] right-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Nuovo messaggio
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="addgroup"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Nuovo gruppo
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Any Setting
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="bg-white flex-1 py-[26px] flex flex-col gap-[26px]">
        <div className="border-b border-[#9AACB5] pb-[20px] flex justify-between items-center px-[26px]">
          <HeaderSide />
          <div>
            <BsSearch
              className="cursor-pointer"
              size={22}
              onClick={handleOpenInput}
            />
            <div
              className={`z-10 absolute w-[80%] left-[57%] translate-x-[-50%] transition-all duration-300 ${
                isOpen
                  ? "top-[12%] visible opacity-100"
                  : "top-[8%] invisible opacity-0"
              } `}
            >
              <Input
                placeholder="Search Contact...."
                className={`bg-[#e9e8e8] w-full px-[18px] rounded-lg outline-none  transition-all duration-300  ${
                  isOpen ? "py-[10px]" : "py-0 h-0"
                }`}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </aside>
  );
};

export default SidesComponents;
