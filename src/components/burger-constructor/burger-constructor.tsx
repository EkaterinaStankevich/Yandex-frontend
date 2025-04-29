import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { makeOrder, removeCurrentOrder } from '../../services/features/orders';
import { clearConstructor } from '../../services/features/constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, items: ingredients } = useSelector(
    (state) => state.burgerConstructor
  );
  const constructorItems = { bun, ingredients };

  const orderRequest =
    useSelector((state) => state.orders.currentOrderStatus) === 'pending';

  const orderModalData = useSelector((state) => state.orders.currentOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');

      return;
    }

    dispatch(removeCurrentOrder());

    dispatch(
      makeOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(removeCurrentOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
