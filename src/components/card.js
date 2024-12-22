import { closeModal } from './modal.js';
import { deleteCard, handleLike } from './api.js';

// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Функция создания карточки
export function createCard(data, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Инициализация лайков (проверяем, что это массив)
  const likes = Array.isArray(data.likes) ? data.likes : [];
  likeButton.dataset.like = likes.length;

  // Проверяем, поставил ли текущий пользователь лайк
  const userLiked = data.likes.some(like => like._id === currentUserId);
  if (userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Если это не карточка текущего пользователя, скрываем кнопку удаления
  if (data.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => {
    imageElement.src = cardImage.src;
    captionElement.textContent = cardTitle.textContent;
    openModal(imagePopup);
  });

   // Обработчик для кнопки лайка
  likeButton.addEventListener('click', () => {
    handleLike(data._id, likeButton);
  });

  deleteButton.addEventListener('click', () => {
    openModal(confirmPopup);

    // Добавляем обработчик на кнопку "Да"
    confirmPopup.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();

      // Отправляем запрос на удаление карточки
      deleteCard(data._id)
        .then(() => {
          cardElement.remove();
          closeModal(confirmPopup);
        })
        .catch((err) => {
          console.error('Ошибка при удалении карточки:', err);
          closeModal(confirmPopup);
        });
    });
  });

  return cardElement;
}

// Функция рендера карточек
export function renderCards(cards, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup) {
  if (Array.isArray(cards)) {
    cards.forEach(cardData => {
      const card = createCard(cardData, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup);
      placesList.append(card);
    });
  }
}
