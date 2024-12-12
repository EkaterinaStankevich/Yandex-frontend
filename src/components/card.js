export const initialCards = [
{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
},
{
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
},
{
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
},
{
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
},
{
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
},
{
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
}
];

// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Функция создания карточки
export function createCard(data, openModal, imagePopup, imageElement, captionElement) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    imageElement.src = data.link;
    imageElement.alt = data.name;
    captionElement.textContent = data.name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Функция рендера карточек
export function renderCards(cards, openModal, imagePopup, imageElement, captionElement) {
  cards.forEach(cardData => {
    const card = createCard(cardData, openModal, imagePopup, imageElement, captionElement);
    placesList.append(card);
  });
}
