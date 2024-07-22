import { useEffect, useState } from "react";
import { axiosApi } from "../Api/Api";

const UseApiChatGetArray = (url: string ,isCreateGroup:boolean) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosApi.get(url);
      setData(res.data.groups);
    };
    fetchData();
  }, [url, isCreateGroup]);

  
  return data;
};


export default UseApiChatGetArray;