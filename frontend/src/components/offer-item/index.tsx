import React from 'react'
import { Card as NextCard, CardHeader, CardBody, Image, CardFooter, Link } from "@nextui-org/react";
import { useGetUserByIdQuery } from '../../app/services/userApi';
import { CustomUser } from '../user';
import { useGetItemByIdQuery } from '../../app/services/itemApi';
import { BASE_URL } from '../../constants';
import { formatToClientDate } from '../../utils/format-to-client-date';

type Props = {
  id: number,
  userId: number,
  itemId: number,
  expirationDate: Date
}

export const OfferItem: React.FC<Props> = ({
  id,
  userId,
  itemId,
  expirationDate = Date,
}) => {
  console.log('itemId', itemId) 
  const { data: user, isError: userError, isLoading: userLoading } = useGetUserByIdQuery(userId.toString());
  const { data: item, isError: itemError, isLoading: itemLoading} = useGetItemByIdQuery(itemId);
  console.log('data usera', user) 
  console.log('data itema', item, item?.photos) 

  if (userLoading || itemLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user data</p>;
  if (itemError) return <p>Error loading item data</p>;


  return (
    <NextCard className="mb-5 py-4 w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{item?.name}</p>
        <small className="text-default-500">Действителен до: {formatToClientDate(expirationDate)}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${item?.photos}`}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Link href={`/users/${user?.id}`}>
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
}
