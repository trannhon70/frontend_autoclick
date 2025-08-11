import { useEffect, useState } from "react";
import { userAPI } from "../apis/user.api";

const useGetByIdUser = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Nếu không có token thì không gọi API, set loading false luôn
    if (!token) {
      setLoading(false);
      return;
    }

    // Kiểm tra xem localStorage có dữ liệu chưa
    const localData = localStorage.getItem('data');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi parse dữ liệu localStorage:', error);
        fetchUserData();
      }
    } else {
      fetchUserData();
    }

    async function fetchUserData() {
      try {
        const result = await userAPI.getByIdUser();
        setData(result.data.data);
        localStorage.setItem('data', JSON.stringify(result.data.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  }, []);

  return {
    role: data?.role,
    user: data,
    loading,
  };
};

export default useGetByIdUser;
