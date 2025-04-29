import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/features/feed';
import { getIngredients } from '../../services/features/ingredients';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.feed.items);

  const ordersStatus = useSelector((state) => state.feed.status);
  const ingredientsStatus = useSelector((state) => state.ingredients.status);

  useEffect(() => {
    if (ordersStatus === 'initial') dispatch(getFeed());
    if (ingredientsStatus === 'initial') dispatch(getIngredients());
  }, []);

  if (ordersStatus === 'pending') {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
