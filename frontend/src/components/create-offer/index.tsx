import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useMyItemsQuery } from '../../app/services/itemApi';
import { useCreateOfferMutation } from '../../app/services/offerApi';

interface Offer {
  itemId: number;
  duration: string;
}

interface CreateOfferProps {
  onClose?: () => void;
}

export const CreateOffer: React.FC<CreateOfferProps> = ({ onClose }) => {
  const { data: items, isError: itemError, isLoading: itemLoading } = useMyItemsQuery();
  const [createOffer] = useCreateOfferMutation();
  const { control, handleSubmit, reset } = useForm<Offer>();

  const handleReset = () => {
    reset();
  };

  const onSubmit = handleSubmit(async ({ itemId, duration }) => {
    try {
      const result = await createOffer({
        itemId,
        duration
      }).unwrap();
      if (onClose) onClose();
    } catch (error) {
      console.error('Ошибка при создании предложения:', error);
    }
  });

  return (
    <form className='flex-grow' onSubmit={onSubmit}>
      <div className="flex flex-wrap w-full">
        <div className="flex w-full font-bold mb-5">Создание предложения</div>

        <Controller
          name="itemId"
          control={control}
          render={({ field }) => (
            <Select
              label="Выберите свой предмет"
              className="w-full mb-5"
              {...field}
            >
              {items ? (
                items.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id.toString()}
                  >
                    {item.id.toString()}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>Нет предметов для обмена</SelectItem>
              )}
            </Select>
          )}
        />
        <Controller
          name="duration"
          control={control}
          defaultValue="1"
          render={({ field }) => (
            <Input
              label="Введите срок действия предложения (дни)"
              placeholder="Введите срок действия предложения (дни)"
              className="w-full mb-5"
              {...field}
            />
          )}
        />

        <div className="flex justify-center gap-4">
          <Button color="danger" variant="flat" onClick={handleReset}>
            Сброс
          </Button>
          <Button color="success" type="submit">
            Создать предложение
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateOffer;