// components/UpdateUserForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { useUpdateUserMutation } from '../../app/services/userApi';

type UpdateUserFormProps = {
  userId: string;
  onCancel: () => void;
};

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  number: string;
};

export const UpdateUserForm = ({ userId, onCancel }: UpdateUserFormProps) => {
  const { handleSubmit, control } = useForm<FormData>();
  const [error, setError] = useState('');

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateUser({ id: userId, userData: data }).unwrap();
      console.log(res)
      onCancel(); // После успешного обновления данных скрываем форму
    } catch (err) {
      console.error('Ошибка при обновлении данных:', err);
      setError('Ошибка при обновлении данных');
    }
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name='firstName'
        label='Имя'
        type='text'
      />
      <Input
        control={control}
        name='lastName'
        label='Фамилия'
        type='text'
      />
      <Input
        control={control}
        name='username'
        label='Username'
        type='text'
      />
      <Input
        control={control}
        name='number'
        label='Номер телефона'
        type='text'
      />
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color="primary" type='submit'>
          Сохранить изменения
        </Button>
        <Button fullWidth color="default" onClick={onCancel}>
          Отменить
        </Button>
      </div>
    </form>
  );
};