import { useState } from "react";
import { Card as NextCard, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { useLazyGetAllItemsQuery } from "../../app/services/itemApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { CustomUser } from "../user";
import { formatToClientDate } from "../../utils/format-to-client-date";
import { RootState } from "../../app/store";

type Props = {
  id: number,
  name: string,
  description: string,
  category?: string,
  photos?: string[],
  createdAt: Date,
  isActive: boolean,
  authorId: number
};

export const ItemAllCard: React.FC<Props> = ({
  id,
  name = '',
  description = '',
  category = '',
  photos = [],
  createdAt,
  isActive,
  authorId,
}) => {
  const [triggerAllItems] = useLazyGetAllItemsQuery();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => selectUser(authorId)(state));
  console.log(user, 'opl')

  return (
    <NextCard className="mb-5 py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{name}</p>
        <small className="text-default-500">{description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Link to={`/users/${authorId}`}>
          
        </Link>
      </CardFooter>
    </NextCard>
  );
};

{/* <Link to={`/users/${authorId}`}>
            <User
              username={username}
              className="text-small font-semibold leading-non text-default-600"
              description={ createdAt && formatToClientDate(createdAt)}
            />
        </Link> */}