import { useEffect, useState } from "react";
import { axiosApi } from "../Api/Api";
import { IUser } from "../interfaces";

const useApiChat = (url: string) => {
  const [data, setData] = useState<IUser| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosApi.get(url);
      setData(res.data.groups || res.data.profile);
    };
    fetchData();
  }, [url]);
  return data;
};
export default useApiChat;


