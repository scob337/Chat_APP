import { useSelector } from "react-redux"
import { UseAppDispatch } from "../../../Redux/store"
import { toggleEditGroup , toggleSendMessage, ToggleAddOtherMember, ToggleApproveNewMember, ToggleEditGroupAdmins } from "../../../Redux/UserInfo/GroupSettingSlice"
import { RootState } from "@reduxjs/toolkit/query"
interface IProps{
    EDITGroup:boolean,
    SENDMSG:boolean,
    ADDOtherMember:boolean,
    APProveNewMember:boolean,
    EDITGroupAdmin:boolean

}
const ToggleBTNGroup = ({
    EDITGroup , SENDMSG ,ADDOtherMember,
    APProveNewMember , EDITGroupAdmin

}:IProps) => {
    const dispatch = UseAppDispatch()
    const{EditGroup,SendMessage,AddOtherMember,ApproveNewMember,EditGroupAdmins} = useSelector((state:RootState)=>state.settingGroup)
    return (
    <div className="flex flex-wrap  justify-between items-center p-1 gap-3 w-full ">

        <div className="w-[48%]">
    <label className="inline-flex items-center cursor-pointer" >
    <input type="checkbox" value="" className="sr-only peer" 
    checked={EDITGroup? EDITGroup : EditGroup}

    onChange={()=>dispatch(toggleEditGroup())}
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">EditGroup</span>
    </label>
        </div>


    <div className="w-[48%]">
    <label className="inline-flex items-center cursor-pointer "  >
    <input type="checkbox" value="" className="sr-only peer"
    checked={SENDMSG? SENDMSG : SendMessage}
    
    onChange={()=>dispatch(toggleSendMessage())}
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">SendMessage</span>
    </label>
        </div>
        <div className="w-[48%]">
    <label className="inline-flex items-center cursor-pointer" >
    <input type="checkbox" value="" className="sr-only peer"
    checked={ADDOtherMember? ADDOtherMember : AddOtherMember}
    onChange={()=>dispatch(ToggleAddOtherMember())}
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">AddOtherMember</span>
    </label>
        </div>
        <div className="w-[48%]">
    <label className="inline-flex items-center cursor-pointer" >
    <input type="checkbox" value="" className="sr-only peer" 
    checked={APProveNewMember? APProveNewMember : ApproveNewMember}
    onChange={()=>dispatch(ToggleApproveNewMember())}
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">ApproveNewMember</span>
    </label>
        </div>

        <div className="w-[48%]">
    <label className="inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" checked={EDITGroupAdmin? EDITGroupAdmin : EditGroupAdmins}
    onChange={()=>dispatch(ToggleEditGroupAdmins())}
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">EditGroupAdmins</span>
    </label>
        </div>
    </div>
    )
}

export default ToggleBTNGroup
