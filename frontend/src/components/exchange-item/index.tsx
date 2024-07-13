import { Card as NextCard, CardHeader, CardBody, Image, CardFooter, Link, Chip, Button } from "@nextui-org/react";
import { useGetUserByIdQuery, useGetUserInfoQuery } from '../../app/services/userApi';
import { CustomUser } from '../user';
import { useGetItemByIdQuery } from '../../app/services/itemApi';
import { BASE_URL } from '../../constants';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { TbArrowsExchange } from "react-icons/tb";
import { color } from "framer-motion";
import React, { useState } from "react";
import { useCreateSolutionToExchangeMutation } from "../../app/services/exchangeApi";

type Props = {
  id: number;
  requesterId: number;
  requesterItemId: number;
  offerId: number;
  offerOwnerId: number;
  offerOwnerItemId: number;
  status: 'no answer' | 'completed' | 'rejected' | 'offer expired';
};

const getColorChip = (status: string) => {
  switch (status) {
    case 'no answer':
      return 'default';
    case 'completed':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'offer expired':
      return 'warning';
    default:
      return 'default';
  }
};


export const ExchangeItem: React.FC<Props> = ({
  id,
  requesterId,
  requesterItemId,
  offerId,
  offerOwnerId,
  offerOwnerItemId,
  status: initialStatus = 'no answer',

}) => {
  const { data: requester, isError: requesterError, isLoading: requesterLoading } = useGetUserByIdQuery(requesterId.toString());
  const { data: owner, isError: ownerError, isLoading: ownerLoading } = useGetUserByIdQuery(offerOwnerId.toString());
  const { data: requesterItem, isError: requesterItemError, isLoading: requesterItemLoading } = useGetItemByIdQuery(requesterItemId);
  const { data: offerAuthorItem, isError: offerAuthorItemItemError, isLoading: offerAuthorItemItemLoading } = useGetItemByIdQuery(offerOwnerItemId);
  const { data: currentUser, isError: currentUserError, isLoading: currentUserLoading } = useGetUserInfoQuery();

  const [status, setStatus] = useState(initialStatus);
  const [colorChip, setColorChip] = React.useState(getColorChip(status));

  const exc_id = id;

  const [createSolutionToExchange, { isLoading: isMutationLoading }] = useCreateSolutionToExchangeMutation();

  const handleAccept = async () => {
    try {
      const response = await createSolutionToExchange({
        id, // идентификатор обмена
        decision: "true", // решение
      }).unwrap();
  
      console.log(response, '--ed--d-d-e-dw-e-d-ewd-e-d-w');
      setStatus('completed');
      setColorChip(getColorChip('completed'));
    } catch (error) {
      console.error('Ошибка при принятии:', error);
      if (error.data) {
        console.error('Данные ошибки:', error.data);
      }
      if (error.status) {
        console.error('Статус ошибки:', error.status);
      }
    }
  };
  

  const handleReject = async () => {
    try {
      setStatus('rejected');
      setColorChip(getColorChip('rejected'));
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    }
  };



  console.log('data exchanga', requester, owner, requesterItem, offerAuthorItem, currentUser)
  // console.log('data itema', item, item?.photos)

  if (requesterLoading || ownerLoading || requesterItemLoading || offerAuthorItemItemError) return <p>Loading...</p>;
  if (requesterError || ownerError || requesterItemError || offerAuthorItemItemLoading) return <p>Error.</p>;

  return (
    <NextCard className="mb-5 py-4 w-full">
      <CardHeader className="text-tiny uppercase font-bold">
        <Chip color={colorChip}>
          обмен № {id}
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-center space-x-4 items-center">
          <NextCard className="mb-5 py-4 w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{requesterItem?.name}</p>
              <small className="text-default-500">{requesterItem?.category}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={`${BASE_URL}${requesterItem?.photos}`}
                width={270}
              />
            </CardBody>
            <CardFooter>
              <Link href={`/users/${requesterId}`}>
                {requester && (
                  <CustomUser
                    username={requester.username}
                    firstName={requester.firstName}
                    lastName={requester.lastName}
                    avatarSrc={requester.avatar}
                  />
                )}
              </Link>
            </CardFooter>
          </NextCard>

          <div className="flex items-center justify-center">
            <TbArrowsExchange className="text-3xl" />
          </div>

          <NextCard className="mb-5 py-4 w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{offerAuthorItem?.name}</p>
              <small className="text-default-500">info</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={`${BASE_URL}${offerAuthorItem?.photos}`}
                width={270}
              />
            </CardBody>
            <CardFooter>
              <Link href={`/users/${offerOwnerId}`}>
                {owner && (
                  <CustomUser
                    username={owner.username}
                    firstName={owner.firstName}
                    lastName={owner.lastName}

                    avatarSrc={owner.avatar}
                  />
                )}
              </Link>
            </CardFooter>
          </NextCard>
        </div>
      </CardBody>
      <CardFooter className="text-tiny uppercase font-bold flex justify-between">
        <Chip color={colorChip}>
          статус обмена - {status}
        </Chip>
        {currentUser && currentUser.id === offerOwnerId && status === 'no answer' && (
          <div className="flex gap-0 mt-0 right">
            <Button size="sm" radius="full" color="success" onClick={handleAccept}>
              Принять
            </Button>
            <Button size="sm" radius="full" color="danger" onClick={handleReject}>
              Отклонить
            </Button>
          </div>
        )}
      </CardFooter>
    </NextCard>
  );
};

