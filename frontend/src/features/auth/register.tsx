import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Button } from '@nextui-org/react';
import { Input } from '../../components/input';
import { useLoginMutation } from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';
import { ErrorMessage } from '../../components/error-message';

type Register = {
  firstname: string,
  lastname: string,
  username: string,
  number: string,
  password: string,
}

type Props = {
  setSelected: (value: string) => void;
};

export const Register: React.FC<Props> = ({
  setSelected
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      number: '',
      password: ''
    }
  });

  const [reqister, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data: Register) => {
    try {
      await reqister(data).unwrap();
      setSelected('login');
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      };
    }
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name='firstname'
        label='Имя'
        type='text'
        required='Обязательное поле'
      />
      <Input
        control={control}
        name='lastname'
        label='Фамилия'
        type='text'
        required='Обязательное поле'
      />
      <Input
        control={control}
        name='username'
        label='Username'
        type='text'
        required='Обязательное поле'
      />
      <Input
        control={control}
        name='number'
        label='Номер телефона'
        type='text'
        required='Обязательное поле'
      />
      <Input
        control={control}
        name='password'
        label='Пароль'
        type='password'
        required='Обязательное поле'
      />
      <ErrorMessage error={error}/>
      <p>
        Уже есть аккаунт?{' '}
        <Link
          size='sm'
          className='cursor-pointer'
          onPress={() => setSelected('login')}
        >
          Войдите
        </Link>
      </p>
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color="primary" type='submit' isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
