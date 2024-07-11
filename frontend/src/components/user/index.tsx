import { User as NextUser } from '@nextui-org/react'

type Props = {
  username: string,
  className?: string,
  description?: string
}

export const CustomUser: React.FC<Props> = ({
  username = '',
  className = '',
  description = ''
}) => {
  return (
    <NextUser
      name={username}
      className={className}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
      description={description}
    />
  )
}
