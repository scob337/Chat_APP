import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { ToggleShowContactList } from "../../Redux/UserInfo/GroupSettingSlice";
import { RootState } from "../../Redux/store";
import {
  addContactGroup,
  deselectPerson,
  selectPerson,
} from "../../Redux/AddGroupSlice";
import Button from "./Button";
import { IContact } from "../../interfaces";

export default function CheckListContact() {
  const GetContact: IContact[] = useSelector(
    (state: RootState) => state.addGroup.getContact
  );
  const addContact: IContact[] = useSelector(
    (state: RootState) => state.addGroup.AddContact
  );

  const dispatch = useDispatch();
  
  const selectedPeopleData: IContact[] =  addContact.map((phone) =>
    GetContact.find((person) => person.phone === phone)
  );
  const handleAddToGroup = () => {
    dispatch(addContactGroup(selectedPeopleData));
  };

  const handleCheckboxChange = (phone:string) => {
    if (addContact.some((contact) => contact === phone)) {
      dispatch(deselectPerson(phone));
    } else {
      dispatch(selectPerson(phone));
    }
  };
  return (
    <div>
      <div>
        <div className="relative  border-0 rounded-none  ">
          <header className=" w-[100%] min-h-[80px] flex flex-col  gap-4  mb-2">
            <div className="flex items-center h-[50px] p-2  gap-3 border-b-2 border-b-black bg-indigo-600 w-[100%]">
              <span
                onClick={() => dispatch(ToggleShowContactList(false))}
                className="text-[#eee] cursor-pointer"
              >
                <IoClose size={26} />
              </span>

              <p
                className="
      flex items-center justify-start
      h-full 
      text-[#eee] font-bold
      "
              >
                Aggiungi un membro
              </p>
            </div>

            <div className="array flex w-full flex-wrap flex-row gap-2 ">
              {selectedPeopleData?.map((i) => {
                return (
                  <>
                    <span
                      key={i.phone}
                      className="bg-blue-100 text-blue-800 text-xs 
            font-medium me-2 px-2.5 py-0.5 rounded
            flex items-center gap-2 w-[fit-content]
             dark:bg-blue-900 dark:text-blue-300"
                    >
                      {i.name}
                      <span
                        className="font-bold text-[16px] h-full cursor-pointer"
                        onClick={() =>
                          handleCheckboxChange(
                            i.phone !== undefined
                              ? i.phone
                              : "No phone number available"
                          )
                        }
                      >
                        x
                      </span>
                    </span>
                  </>
                );
              })}
            </div>
          </header>
          {GetContact.map((i: IContact) => {
            return (
              <div
                key={i.phone}
                className="
                        cursor-pointer
                        group
                        relative w-full  hover:bg-[#aba8e0] transition-all duration-200 "
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[1px] bg-[#9AACB5]"></div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="grid gap-1.5">
                        <div className="font-semibold group-hover:text-white transition-all duration-200">
                          {i.name}
                        </div>
                        <div className="flex gap-[1px] items-center">
                          <div className="text-sm leading-none text-gray-500 transition-all duration-200 group-hover:text-white ">
                            {i.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <input
                      checked={addContact.some(
                        (contact) => contact === i.phone
                      )}
                      onChange={() => handleCheckboxChange(i.phone !== undefined ? i.phone : "No phone number available" )}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button className="bg-primary" width="w-full" onClick={handleAddToGroup}>
        Aggiunge Al Gruppo
      </Button>
    </div>
  );
}
