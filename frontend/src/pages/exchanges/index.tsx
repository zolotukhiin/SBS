import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useGetOffersQuery } from '../../app/services/offerApi';
import { useGetExchangesQuery, useGetExchangesForMeQuery, useGetMyCreatedExchangesQuery } from '../../app/services/exchangeApi';
import { ExchangeItem } from '../../components/exchange-item';
import CreateExchange from '../../components/create-exchange';

export const Exchanges = () => {
  const [exchangesType, setExchangesType] = useState('all');
  const { data: allExchanges, refetch: refetchAllExchanges } = useGetExchangesQuery();
  const { data: myExchanges, refetch: refetchMyExchanges } = useGetMyCreatedExchangesQuery();
  const { data: exchangesForMe, refetch: refetchExchangesForMe } = useGetExchangesForMeQuery();

  const handleClose = () => {
    setExchangesType('my');
    refetchExchanges();
  };

  const handleExchangesTypeChange = (type: string) => {
    setExchangesType(type);
  };

  const getExchanges = () => {
    switch (exchangesType) {
      case 'my':
        return myExchanges;
      case 'forMe':
        return exchangesForMe;
      default:
        return allExchanges;
    }
  };

  const refetchExchanges = () => {
    switch (exchangesType) {
      case 'my':
        refetchMyExchanges();
        break;
      case 'forMe':
        refetchExchangesForMe();
        break;
      default:
        refetchAllExchanges();
        break;
    }
  };

  useEffect(() => {
    refetchExchanges();
  }, [exchangesType]);

  const data = getExchanges();

  return (
    <div>
      <ButtonGroup className='flex center mb-10'>
        <Button color="secondary" onClick={() => handleExchangesTypeChange('all')}>Все обмены</Button>
        <Button color="primary" onClick={() => handleExchangesTypeChange('my')}>Обмены со мной</Button>
        <Button color="warning" onClick={() => handleExchangesTypeChange('forMe')}>Обмены для меня</Button>
        <Button color="success" onClick={() => handleExchangesTypeChange('create')}>Создать обмен</Button>
      </ButtonGroup>

      {exchangesType === 'create' && <CreateExchange onClose={handleClose} />}

      {exchangesType !== 'create' && (
        <div className="flex flex-wrap gap-5 center">
          {data && data.length > 0
            ? data.map(({
              id,
              requesterId,
              requesterItemId,
              offerId,
              offerOwnerId,
              offerOwnerItemId,
              status
            }) => (
              <ExchangeItem
                key={id}
                id={id}
                requesterId={requesterId}
                requesterItemId={requesterItemId}
                offerId={offerId}
                offerOwnerId={offerOwnerId}
                offerOwnerItemId={offerOwnerItemId}
                status={status}
              />
            ))
            : <p>Нет обменов для отображения.</p>
          }
        </div>
      )}
    </div>
  );
};

export default Exchanges;