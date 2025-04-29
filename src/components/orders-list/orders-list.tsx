import { FC, memo, useEffect } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/features/ingredients';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
