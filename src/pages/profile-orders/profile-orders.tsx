import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/features/orders';
import { Preloader } from '@ui';
import { getIngredients } from '../../services/features/ingredients';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.orders.items);
  const ordersStatus = useSelector((state) => state.orders.status);

  const ingredientsStatus = useSelector((state) => state.ingredients.status);

  useEffect(() => {
    if (ordersStatus === 'initial') dispatch(getOrders());
    if (ingredientsStatus === 'initial') dispatch(getIngredients());
  }, []);

  if (ordersStatus === 'pending') return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
