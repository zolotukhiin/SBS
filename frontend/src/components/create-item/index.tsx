import { useCreateItemMutation, useLazyGetAllItemsQuery } from '../../app/services/itemApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea, Input } from '@nextui-org/react';
import { ErrorMessage } from '../error-message';
import { MdAddCircleOutline } from "react-icons/md"
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import { User } from '../../app/types/userTypes';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  description: string;
  category: string;
  photos: string;
}

export const CreateItem = () => {
  const [createItem] = useCreateItemMutation();
  const [triggerAllItems] = useLazyGetAllItemsQuery();
  const navigate = useNavigate();

  const currentUser: User | null = useSelector(selectCurrentUser);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    if (!currentUser) {
      console.log('Пользователь не авторизован');
      return;
    }

    try {

      await createItem({
        name: data.name,
        description: data.description,
        category: data.category,
        photos: data.photos,
        authorId: currentUser.id,
      }).unwrap();

      setValue('name', '');
      setValue('description', '');
      setValue('category', '');
      setValue('photos', '');
      await triggerAllItems().unwrap(); // Вызываем функцию для получения всех элементов
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className='flex-grow' onSubmit={onSubmit}>
      <Controller
        name='name'
        control={control}
        defaultValue=''
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement='outside'
            placeholder='Введите название предмета'
            className='mb-5'
          />
        )}
      />
      {errors?.name && <ErrorMessage error={errors.name.message as string} />}

      <Controller
        name='description'
        control={control}
        defaultValue=''
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement='outside'
            placeholder='Введите описание предмета'
            className='mb-5'
          />
        )}
      />
      {errors?.description && <ErrorMessage error={errors.description.message as string} />}

      <Controller
        name='category'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement='outside'
            placeholder='Введите категорию предмета'
            className='mb-5'
          />
        )}
      />
      {errors?.category && <ErrorMessage error={errors.category.message as string} />}

      <Controller
        name='photos'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement='outside'
            placeholder='Введите ссылки на фотографии через запятую'
            className='mb-5'
          />
        )}
      />
      {errors?.photos && <ErrorMessage error={errors.photos.message as string} />}

      <Button
        color='success'
        className='flex-end'
        // endContent={<MdAddCircleOutline />}
        type='submit'
      >
        Добавить предмет
      </Button>
    </form>
  );
};