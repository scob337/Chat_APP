import { FaTimes ,FaPen} from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { IContact } from "../../../interfaces";
import { NavLink, useParams , useNavigate} from "react-router-dom";
import { SkeletonComponentLines } from "../../../Components/ui/Skeleton";
import { toggleSidebar, updateData } from "../../../Redux/reduxSlice";
import { axiosApi, baseURL } from "../../../Api/Api";
import { useEffect ,useState} from "react";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
interface IProps {
  handleToggleSidebar: () => void;
  isSidebar: boolean;
}
function classNames(...classe) {
  return classe.filter(Boolean).join(" ");
}

const SideNavOpen = ({ handleToggleSidebar, isSidebar }: IProps) => {
  const { mobile } = useParams();

  const { id } = useParams();

  const Selector = useSelector(
    (state: RootState) => state.user.record?.profile
  );
  const User: IContact = useSelector(
    (state: RootState) => state.userChat.getContactByPhone
  );
  const SelectorInfo = useSelector(
    (state: RootState) => state.settingGroup.SideInfo
  );
  const isLoading = useSelector(
    (state: RootState) => state.userChat.isLoading
  );
  const imageURL = `https://cvoxxmpp.dev.itvalues.site/CVOX-WS/public/storage/${Selector?.avatar}`;
  const dispatch = useDispatch();




// Fetch Members Group 
const [Members , setMembers] = useState([])

useEffect(()=>{
  

  const fetchMembers = async()=>{
    const res = await axios.get(`https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${id}/members`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }
    )
    setMembers(res.data.members)

  }
  fetchMembers()
},[id,Members])

// Fetch Members Group 


// Leave Group

const Navigate = useNavigate()

const Logout = async ()=>{
  
  const ConfirmLogOut = window.confirm("Do you Realy want to leave the group?")

  if(ConfirmLogOut){

    try{
      
      const res = await axiosApi.post(`${baseURL}/groups/${id}/leave_group`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });


        alert("You Has Left The Group Successfully")
        dispatch(updateData());
        dispatch(toggleSidebar())
        
        Navigate("groups")
        
    }
    catch(error){
      console.log(error)
      alert(error)

    }





  }
}

// Leave Group


const handleChangeRoleAdmin = async (mobileNumber) => {


  try{
      const res = await axios.post(`${baseURL}/groups/${id}/change_role`,{
        headers:{

        'Authorization': "Bearer " + localStorage.getItem("token")

        },

        members:mobileNumber.mobile,
        role:2
  })
  }
  catch(error){
    console.log(error)
  }
};




const handleremoveAdmin =async (member)=>{
  console.log(member)

  try {
    const response = await fetch(`https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${id}/change_role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        mobile_number: member,
        role:3
      }),
    });
    
  } catch (error) {
    console.log(error)
  }

}



const HandleRemoveMember = async (mobileNumber) => {
  try {
    const response = await fetch(`https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${id}/delete_member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        mobile: mobileNumber,
      }),
    });
    
  } catch (error) {
    console.log(error)
  }
};

  return (
    <aside
      className={`relative flex flex-col bg-white shadow-lg z-10 rounded-r-2xl transition-all duration-300 ${
        isSidebar
          ? " w-[25%] py-[60px] px-[26px] visible opacity-100 "
          : "w-0 px-0 py-0 invisible opacity-0"
      }`}
    >
      <div className="cursor-pointer">
        <FaTimes size={24} onClick={handleToggleSidebar} />
      </div>
      <div className="w-full border-b-[#9AACB5] border-b pb-[16px]">
        <div className=" relative w-[200px] m-auto h-[200px] bg-[#C4C4C4] flex justify-center items-center rounded-full">
          {mobile ? (
            User?.avatar ? (
              <img
                className="object-cover w-full h-full rounded-full"
                src={imageURL}
                alt="Profile"
              />
            ) : (
              <TbPhoto size={22} />
            )
          ) : User?.avatar ? (
            <img
              className="object-cover w-full h-full rounded-full"
              src={imageURL}
              alt="Profile"
            />
          ) : (
            <img
            className="object-cover w-full h-full rounded-full"
            src={imageURL}
            alt="Profile"
          />
          )}
          <span className="absolute right-[11%] bottom-[8%] border-[3px] border-white bg-[#09AD2D] w-[18px] h-[18px] rounded-full "></span>
        </div>
        <div className="text-center mt-[16px]">
          {isLoading ? (
            <SkeletonComponentLines />
          ) : (
            <>
            
              <p className="text-[18px] font-bold flex items-center
               justify-center gap-2">
                {mobile ? User?.name : SelectorInfo?.name} 
                <NavLink
                 onClick={()=> dispatch(toggleSidebar())} 
                 to={`groups/editgroup/${id}`}><FaPen size={20} /></NavLink>
              </p>

              <p className="font-medium text-[#807f81]">
                {mobile ? User?.my_status : SelectorInfo?.status}
              </p>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-[24px]">
          <p className="font-bold text-[18px]">Media</p>
          <p className="font-medium text-primary">Vedere Tutto</p>
        </div>




{/* Group Members */}



{Members.map((i)=>{


  return(
    
          <div 
          
          key={i.name}
          className="relative  border-0 rounded-none 
          w-[100%]  group 
          cursor-pointer
          hover:bg-[#e7e7e7] transition-all duration-300 "> 
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[1px] bg-[#9AACB5]"></div>
          <div className="p-1 ">
           
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                </div>
                <div className="grid gap-1.5">
                  <div className="font-semibold">
                    {i.name}</div>
                  <div className="flex gap-[1px] items-center ">
                    
                    <div className="text-sm leading-none text-gray-500 max-w-[150px] ">
                    {i.my_status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto text-xs text-gray-500 ">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium  
              px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{i.role}</span>
              </div>
              
              

      {i.role !=="Owner" && 
              <Menu as="div" className="absolute right-0 z-10 text-left none">
      <div>
        <Menu.Button 
          className=" w-full justify-center gap-x-1.5  rounded-md
        outline-none border-none 
        hidden
        transition-all duration-400
         bg-white
        p-1 text-sm font-semibold
         group-hover:inline-block
         text-gray-900  hover:bg-gray-50"
        >
          <BsThreeDotsVertical className="cursor-pointer " size={20} />
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
        <Menu.Items className="absolute right-0 z-30 mt-2 origin-top-right bg-white rounded-md shadow-lg w-[250px] z-12 z-11 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">


            <Menu.Item >
              {({ active }) => (
                <p
                onClick={()=> i.role === "Member" ? handleChangeRoleAdmin(i) : handleremoveAdmin(i.mobile)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900  z-15" : "text-gray-700 z-15",
                    "flex items-center gap-2 px-4 py-2 text-m font-[600] cursor-pointer z-[999]"
                  )}

                  
>
                  {i.role === "Member" ? "Change as administrator" : "Change as member" }


                </p>
              )}
            </Menu.Item>
            <Menu.Item >
              {({ active }) => (
                <p
                onClick={()=> HandleRemoveMember(i.mobile)}
                  className={classNames(
                    active ? "bg-gray-100 text-red-500  z-15" : "text-red-500  z-15",
                    "flex items-center gap-2 px-4 py-2 text-m font-[600] cursor-pointer z-[999]"
                  )}

                  
>
                  Remove User


                </p>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    }






            </div>
          </div>
        </div>
        )
})}



<footer className="flex items-center gap-3 p-3 text-red-500 cursor-pointer groupsFooter"
onClick={()=> Logout()}
>
  
<IoIosLogOut size={20}/>
Leave Group
</footer>


          {/* Group Member */}

        
      </div>
    </aside>
  );
};

export default SideNavOpen;
