import React from 'react';
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useGetOffersQuery } from '../../app/services/offerApi';
import { useMyItemsQuery } from '../../app/services/itemApi';
import { useCreateExchangeMutation } from '../../app/services/exchangeApi';

interface FormData {
  offer: string;
  item: string;
}

export const CreateExchange = ({ onClose }) => {
  const { control, handleSubmit } = useForm<FormData>();
  const [createExchange] = useCreateExchangeMutation();
  const { data: offers, isLoading: offersLoading, isError: offersError } = useGetOffersQuery();
  const { data: items, isLoading: itemsLoading, isError: itemsError } = useMyItemsQuery();

  if (offersLoading || itemsLoading) {
    return <div>Загрузка...</div>;
  }

  if (offersError || itemsError) {
    return <div>Ошибка загрузки данных</div>;
  }

  const onSubmit = handleSubmit(async ({ offer, item }) => {
    try {
      const result = await createExchange({
        offer,
        item,
      }).unwrap();
      console.log('Успешно создан обмен:', result);
      if (onClose) onClose();
    } catch (error) {
      console.error('Ошибка при создании обмена:', error);
    }
  });

  return (
    <form className='flex-grow' onSubmit={onSubmit}>
      <div className="flex flex-wrap w-full">
        <div className="flex w-full font-bold mb-5">Создание обмена</div>

        <Controller
          name="offer"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label="Выберите номер предложения обмена"
              className="w-full mb-5"
              {...field}
            >
              {offers ? (
                offers.map((offer) => (
                  <SelectItem
                    key={offer.id}
                    value={offer.id.toString()}
                  >
                    {offer.id.toString()}
                  </SelectItem>
                ))
              ) : (
                <div>Нет доступных предложений</div>
              )}
            </Select>
          )}
        />

        <Controller
          name="item"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label="Выберите предмет для обмена"
              className="w-full mb-5"
              {...field}
            >
              {items ? (
                items.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                ))
              ) : (
                <div>Нет доступных предметов</div>
              )}
            </Select>
          )}
        />

        <div className="flex justify-center gap-4">
          <Button color="danger" variant="flat">
            Сброс
          </Button>
          <Button color="success" type="submit">
            Создать обмен
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateExchange;