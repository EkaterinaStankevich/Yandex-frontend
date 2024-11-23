// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = profilePopup.querySelector('.popup__close');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const captionElement = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

document.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

// @todo: Функция открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// @todo: Функция закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// @todo: Функция создания карточки
function createCard(data) {
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

// @todo: Вывести карточки на страницу
function renderCards(cards) {
  cards.forEach(cardData => {
    const card = createCard(cardData);
    placesList.append(card);
  });
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeButton.addEventListener('click', () => {
  closeModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  placeNameInput.value = '';
  linkInput.value = '';
  openModal(cardPopup);
});

closeCardButton.addEventListener('click', () => {
  closeModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const card = createCard(cardData);
  placesList.prepend(card);
  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

renderCards(initialCards);
