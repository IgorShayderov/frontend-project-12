export default {
  translation: {
    title: 'Чат Хекслета',
    channels: 'Каналы',
    header: {
      chatLink: 'Чат Хекслета',
      signOut: 'Выход',
    },
    login: {
      title: 'Вход',
      errors: {
        401: 'Пароль или логин неверен',
        request: 'Ошибка сервера',
      },
      signUpLink: 'Нет аккаунта? Регистрация',
      submit: 'Войти',
    },
    signUp: {
      submit: 'Зарегистрироваться',
    },
    error: {
      title: 'Уупс!',
      description: 'Извините, возникла неожиданная ошибка.',
    },
    modals: {
      addModal: {
        title: 'Добавить канал',
        submit: 'Отправить',
        errors: {
          uniqueness: 'Имя уже существует!',
        },
      },
      removeModal: {
        title: 'Удалить канал',
        submit: 'Отправить',
      },
      renameModal: {
        title: 'Переименовать channel',
        submit: 'Отправить',
        errors: {
          uniqueness: 'Имя уже существует!',
        },
      },
    },
    fields: {
      login: {
        placeholder: 'Логин',
        errors: {
          required: 'Логин обязателен',
        },
      },
      password: {
        placeholder: 'Пароль',
        errors: {
          required: 'Пароль обязателен',
        },
      },
      passwordConfirmation: {
        placeholder: 'Подтверждение пароля',
        errors: {
          required: 'Подтверждение пароля обязательно',
          different: 'Подтверждение пароля не должно отличаться от пароля',
        },
      },
      message: {
        placeholder: 'Введите ваше сообщение...',
      },
      errors: {
        max: 'Должно быть максимум 15 символов',
        min: 'Должно быть минимум 3 символа',
      },
    },
    channel: {
      rename: 'Переименовать',
      remove: 'Удалить',
    },
  },
};
