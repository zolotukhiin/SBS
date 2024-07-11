// запрос текущего пользоателя при регистрации приложения
import { Spinner } from "@nextui-org/react";
import { useGetUserInfoQuery } from "../../app/services/userApi";

export const AuthGuard = ({
  children
}: {children: JSX.Element}) => {
  const { isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return <Spinner />
  }
  return (
    children
  )
};
