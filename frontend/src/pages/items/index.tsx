import { useGetAllItemsQuery } from '../../app/services/itemApi';
import { CreateItem } from '../../components/create-item';
import { ItemAllCard } from '../../components/item-card';

export const Items = () => {
  const { data } = useGetAllItemsQuery();
  console.log(data, 'data')

  return (
    <>
      <div className='mb-10 w-full'>
        <CreateItem />
      </div>
      {
        data && data.length > 0
          ? data.map(({
            name,
            description,
            id,
            createdAt,
            isActive,
            authorId,
          }) => (
            <ItemAllCard
              key={id}
              id={id}
              name={name}
              description={description}
              createdAt={createdAt}
              isActive={isActive}
              authorId={authorId}
            ></ItemAllCard>
          )) : null
      }
    </>
  )
};
