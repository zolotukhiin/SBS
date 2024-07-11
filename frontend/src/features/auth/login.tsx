import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input'
import { Button, Link } from '@nextui-org/react';
import { useLoginMutation } from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';
import { ErrorMessage } from '../../components/error-message';
import { useLazyGetUserInfoQuery } from '../../app/services/userApi';

type Login = {
  identifier: string,
  password: string
};

type Props = {
  setSelected: (value: string) => void;
};


export const Login: React.FC<Props> = ({
  setSelected
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Login>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerGetUserInfo] = useLazyGetUserInfoQuery();

  const onSubmit = async (data: Login) => {
    try {
      console.log('Отправка данных для входа:', data); // Лог отладки
      await login(data).unwrap();
      await triggerGetUserInfo().unwrap();
      navigate('/');
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      };
    };
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
      control={control}
      name='identifier'
      label='Имя пользователя или номер телефона'
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
        Нет аккаунта?{' '}
        <Link
         size='sm'
         className='cursor-pointer'
         onPress={() => setSelected('registration')}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className='flex gap-2 justify-end'>
        <Button fullWidth color="primary" type='submit' isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
};