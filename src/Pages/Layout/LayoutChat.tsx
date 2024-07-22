import { Outlet } from "react-router-dom";
// import SideNav from "./SideNav";
import SideNavOpen from "./Sides/SideNavOpen";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../Redux/reduxSlice";
import SideIcons from "./Sides/SideIcons";
import { RootState } from "../../Redux/store";


function LayoutChat() {
  

  // ** --------- ReduxSlice ---------
  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());

  };

  const isSidebar = useSelector((state: RootState) => state.app.isSidebarOpen);
  return (
    <div className="flex justify-between w-full lg:px-[70px] lg:md:py-[35px] h-screen bg-[#E5E5E5] overflow-hidden">
      <SideIcons />

      <Outlet />
      <SideNavOpen
        handleToggleSidebar={() => handleToggleSidebar()}
        isSidebar={isSidebar}
      />
    </div>
  );
}

export default LayoutChat;
