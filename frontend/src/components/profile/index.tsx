import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/user/userSlice'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { BsFillTelephoneFill } from "react-icons/bs";

import supportImage from '../../static-only-dev/support.jpg';


export const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log("Current User:", currentUser);


  if (!currentUser) {
    return null
  };

  const { firstName, lastName, username, number, id } = currentUser;

  return (
    <Card className='py-4 w-[302px]'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
        <Image 
          alt='Card profile'
          className='object-cover rounded-xl'
          src={supportImage}
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={'/user-profile'}>
          <h4 className='font-bold text-large mb-2'>{firstName} {lastName}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <BsFillTelephoneFill />
          {number}
        </p>
      </CardBody>
    </Card>
  )
};