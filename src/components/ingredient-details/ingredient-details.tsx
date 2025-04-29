import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredient } from '../../services/features/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  /** TODO: взять переменную из стора */
  const ingredientData = useSelector((state) => getIngredient(state, id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
