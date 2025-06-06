const token = '2c901c71-49c3-4b49-a4d0-5ad59a3f71d7';
const cohortId = 'apf-cohort-202';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

// Загрузка информации о пользователе
export function getUserInfo() {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при загрузке информации о пользователе:', error);
  });
}

// Загрузка карточек
export function getCards() {
  return fetch(`${baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return Promise.reject('Ответ не является массивом');
    }
  })
  .catch(error => {
    console.error('Ошибка при получении карточек:', error);
  });
}

// Функция для обновления данных пользователя
export function updateUserInfo(name, about) {
  const submitButton = document.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(updatedUser => {
      if (!updatedUser || !updatedUser.name || !updatedUser.about || !updatedUser.avatar) {
        return Promise.reject('Некорректный ответ от сервера');
      }
      return updatedUser;
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных пользователя:', error);
      return Promise.reject(error);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Функция для добавления новой карточки
export function addCard(name, link) {
  const submitButton = document.querySelector('.popup__button-new-card');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Создание...";

  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Ошибка при добавлении новой карточки:', error);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Функция для удаления карточки
export function deleteCard(cardId) {
  const submitButton = document.querySelector('.popup__button_confirm');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Удаление...";

  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при добавлении новой карточки:', error);
  })
  .finally(() => {
    submitButton.textContent = originalButtonText;
  });
}

// Функция для постановки или снятия лайка с учетом цвета
export function handleLike(cardId, likeButton) {
  const method = likeButton.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';

  fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: token,
    },
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeButton.dataset.like = updatedCard.likes.length;
      const likeCountElement = likeButton.querySelector('.card__like-count');
      if (likeCountElement) {
        likeCountElement.textContent = updatedCard.likes.length;
      }
    })
    .catch(error => console.error('Ошибка при обновлении лайка:', error));
}

// Функция для обновления аватара на сервере
export function updateAvatar(avatarUrl) {
  const submitButton = document.querySelector('.popup__button-change-avatar');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при добавлении новой карточки:', error);
  })
  .finally(() => {
    submitButton.textContent = originalButtonText;
  });
}


