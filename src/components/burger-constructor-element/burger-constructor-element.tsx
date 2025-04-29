import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteConstructorIngredient,
  moveConstructorIngredient
} from '../../services/features/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        moveConstructorIngredient({
          id: ingredient.id,
          to: 'down'
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        moveConstructorIngredient({
          id: ingredient.id,
          to: 'up'
        })
      );
    };

    const handleClose = () => {
      dispatch(deleteConstructorIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
