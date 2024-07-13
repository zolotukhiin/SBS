import React from 'react';
import { Card, CardBody, CardHeader, Image, Tabs, Tab } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../app/services/userApi';
import { BASE_URL } from '../../constants';
import { useOtherUserItemsQuery } from '../../app/services/itemApi';
import { useGetOffersByUserQuery } from '../../app/services/offerApi';

export const UserProfileId = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user, isError: userError, isLoading: userLoading } = useGetUserByIdQuery(id || "");
  const { data: items, isError: itemsError, isLoading: itemsLoading } = useOtherUserItemsQuery(parseInt(id || ""));
  const { data: offers, isError: offersError, isLoading: offersLoading } = useGetOffersByUserQuery(parseInt(id || ""));
  const { data: exchanges, isError: exchangesError, isLoading: exchangesLoading } = useGetOffersByUserQuery(parseInt(id || ""));

  if (userLoading || itemsLoading || offersLoading || exchangesLoading) return <div>Loading...</div>;
  if (userError || itemsError || offersError || exchangesError) return <div>Error loading user data...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key="main" title="Основная информация">
              <Card>
                <CardBody className='flex flex-row'>
                  <div className='flex-1 flex'>
                    <Image
                      isZoomed
                      width={240}
                      alt="User Image"
                      src={`${BASE_URL}${user?.avatar}`}
                    />
                  </div>
                  <div className='flex-1 flex flex-col justify-center gap-5 p-5'>
                    <div>Имя: {user?.firstName}</div>
                    <div>Фамилия: {user?.lastName}</div>
                    <div>Юзернейм: {user?.username}</div>
                    <div>Номер: {user?.number}</div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="stat" title="Статистика">
              <Card>
                <CardBody className='p-5'>
                  <div>Кол-во предметов: {items?.length}</div>
                  <div>Кол-во офферов: {offers?.length}</div>
                  <div>Кол-во обменов: in dev</div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </CardHeader>
    </Card>
  );
};