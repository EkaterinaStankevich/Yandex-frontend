import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getFeedOrder } from '../../services/features/feed';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/features/orders';

export const OrderInfo: FC = () => {
  const { number: feedNumber } = useParams();
  /** TODO: взять переменные orderData и ingredients из стора */
  let orderData = useSelector((state) =>
    getFeedOrder(state, parseInt(feedNumber!))
  );

  if (orderData === undefined) {
    orderData = useSelector((state) => getOrder(state, parseInt(feedNumber!)));
  }

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
