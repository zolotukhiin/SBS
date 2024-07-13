// компонент отображения пользователя в карточках предметов
import { User as NextUser } from '@nextui-org/react';
import { BASE_URL } from '../../constants';

type Props = {
  username: string,
  firstName: string,
  lastName: string,
  className?: string,
  avatarSrc?: string
}

export const CustomUser: React.FC<Props> = ({
  username = '',
  firstName = '',
  lastName = '',
  className = '',
  avatarSrc = ''
}) => {
  return (
    <NextUser
      name={`${firstName} ${lastName}`}
      className={className}
      description={username}
      avatarProps={{
        src: `${BASE_URL}${avatarSrc}`,
      }}
    />
  );
};