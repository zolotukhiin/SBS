import { Card, CardBody, CardHeader, Image, Tabs, Tab, Button } from '@nextui-org/react';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/user/userSlice';
import { BASE_URL } from '../../constants';
import { useMyItemsQuery } from '../../app/services/itemApi';
import { useMyOffersQuery } from '../../app/services/offerApi';
import { useGetMyCreatedExchangesQuery } from '../../app/services/exchangeApi';
import { useState } from 'react';
import { UpdateUserForm } from '../../components/updt-user';

export const UserProfile = () => {

  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return null
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const { firstName, lastName, username, number, id, avatar } = currentUser;

  const { data: items, isError: itemsError, isLoading: itemsLoading } = useMyItemsQuery(id);
  console.log(items, 'itrms')
  const { data: offers, isError: offersError, isLoading: offersLoading } = useMyOffersQuery(id);
  const { data: exchanges, isError: exchangesError, isLoading: exchangesLoading } = useGetMyCreatedExchangesQuery(id);

  if (itemsLoading || offersLoading || exchangesLoading) return <div>Loading...</div>;
  if (itemsError || offersError || exchangesError) return <div>Error loading user data...</div>;


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
                      src={`${BASE_URL}${avatar}`}
                    />
                  </div>
                  <div className='flex-1 flex flex-col justify-center gap-5 p-5'>
                    <div>Имя: {firstName}</div>
                    <div>Фамилия: {lastName}</div>
                    <div>Юзернейм: {username}</div>
                    <div>Номер: {number}</div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="stat" title="Статистика">
              <Card>
                <CardBody className='p-5'>
                  <div>Кол-во предметов: {items?.length}</div>
                  <div>Кол-во офферов: {offers?.length}</div>
                  <div>Кол-во обменов: {exchanges?.length}</div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="settings" title="Настройки">
              <Card>
                <CardBody className='p-3'>
                  {!isEditing && (
                    <Button color="warning" onClick={handleEditClick}>
                      Редактировать данные
                    </Button>
                  )}
                  {isEditing && (
                    <UpdateUserForm userId={id} onCancel={handleCancelEdit} />
                  )}
                </CardBody>
                <CardBody className='p-3'>
                  <Button color="danger">
                    Удалить аккаунт
                  </Button>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </CardHeader>
    </Card >
  )
};