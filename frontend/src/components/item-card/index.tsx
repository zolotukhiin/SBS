import { useState } from "react";
import { Card as NextCard, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { useLazyGetAllItemsQuery } from "../../app/services/itemApi";
import { useGetUserByIdQuery } from "../../app/services/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { CustomUser } from "../user";
import { formatToClientDate } from "../../utils/format-to-client-date";
import { RootState } from "../../app/store";
import { BASE_URL } from "../../constants";
import { BiTrash } from 'react-icons/bi';
import { useGetUserInfoQuery } from "../../app/services/userApi";
import { useDeleteItemMutation } from "../../app/services/itemApi";

type Props = {
  id: number,
  name: string,
  description: string,
  category?: string,
  photos?: string,
  createdAt: Date,
  isActive: boolean,
  authorId: number
};

export const ItemAllCard: React.FC<Props> = ({
  id,
  name = '',
  description = '',
  category = '',
  photos,
  createdAt,
  isActive,
  authorId,
}) => {
  const { data: user, isError, isLoading } = useGetUserByIdQuery(authorId.toString());
  const { data: currentUser, isError: currentUserError, isLoading: currentUserLoading } = useGetUserInfoQuery();
  const deleteItem = useDeleteItemMutation();

  const handleDelete = async (itemId: number) => {
    try {
        await deleteItem(itemId);
    } catch (error) {
        console.error('Ошибка удаления:', error);
    }
};


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user</div>;

  return (
    <NextCard className="mb-5 py-4 w-[300px] h-[410px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{name}</p>
        <small className="text-default-500">{description}</small>
        {
          currentUser && (currentUser.id === authorId) && (
            <BiTrash className="float-right text-red-500 cursor-pointer flex-beetween" onClick={() => handleDelete(id)} />
          )
        }
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${photos}`}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Link to={`/users/${authorId}`}>
          {user && (
            <CustomUser
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              avatarSrc={user.avatar}
            />
          )}
        </Link>
      </CardFooter>
    </NextCard>
  );
};

