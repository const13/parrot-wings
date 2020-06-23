import { useSelector } from "react-redux";

export const useAuth = () => {
  const isAuth = useSelector((state: any) => {
    return state.auth.isAuth || !!localStorage.getItem('id_token');
  });

  return isAuth;
};