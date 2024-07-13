import { useGetAllItemsQuery } from '../../app/services/itemApi';
import { CreateItem } from '../../components/create-item';
import { ItemAllCard } from '../../components/item-card';


export const MainPage = () => {
  const { data } = useGetAllItemsQuery();
  console.log(data, 'data')

  return (
    <>
      <div className='mb-10 w-full'>
        <CreateItem />
      </div>
    </>
  )
};
