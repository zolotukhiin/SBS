import React, { useState } from 'react';
import { CreateOffer } from '../../components/create-offer';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useGetOffersQuery, useMyOffersQuery } from '../../app/services/offerApi';
import { OfferItem } from '../../components/offer-item';

export const Offers = () => {
  const [offerType, setOfferType] = useState('all');
  const { data: allOffers } = useGetOffersQuery();
  const { data: myOffers, refetch: refetchMyOffers } = useMyOffersQuery();

  const handleClose = () => {
    setOfferType('my');
    refetchMyOffers();
  };

  const handleOfferTypeChange = (type: string) => {
    setOfferType(type);
  };

  const getOffers = () => {
    return offerType === 'my' ? myOffers : allOffers;
  };

  const data = getOffers();

  console.log(data, 'offer');

  return (
    <div>
      <ButtonGroup className='flex center mb-10'>
        <Button color="secondary" onClick={() => handleOfferTypeChange('all')}>Все предложения</Button>
        <Button color="warning" onClick={() => handleOfferTypeChange('my')}>Мои предложения</Button>
        <Button color="success" onClick={() => handleOfferTypeChange('create')}>Создать предложение</Button>
      </ButtonGroup>
      {offerType === 'create' && <CreateOffer onClose={handleClose}/>}
      
      {offerType !== 'create' && (
        <div className="flex flex-wrap gap-5 center">
          {data && data.length > 0
            ? data.map(({ id, userId, itemId, expirationDate }) => (
              <OfferItem
                key={id}
                id={id}
                userId={userId}
                itemId={itemId}
                expirationDate={expirationDate}
              />
            ))
            : <p>Нет предложений для отображения.</p>
          }
        </div>
      )}
    </div>
  );
};

export default Offers;
