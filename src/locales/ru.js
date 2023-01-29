export default {
  translation: {
    channels: 'Каналы',
    actions: {
      channel: {
        add: 'Канал был успешно добавлен',
        rename: 'Канал был успешно переименован',
        remove: 'Канал был успешно удалён',
      },
    },
    header: {
      signOut: 'Выход',
    },
    login: {
      title: 'Вход',
      errors: {
        401: 'Пароль или логин неверен',
        request: 'Ошибка сервера',
      },
      signUpText: 'Нет аккаунта? ',
      signUpLink: 'Регистрация',
      submit: 'Войти',
    },
    signUp: {
      title: 'Регистрация',
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
        placeholder: 'Имя пользователя',
        errors: {
          max: 'От {{ min }} до {{ max }} символов',
          min: 'От {{ min }} до {{ max }} символов',
        },
      },
      password: {
        placeholder: 'Пароль',
        errors: {
          max: 'Не более {{ max }} символов',
          min: 'Не менее {{ min }} символов',
        },
      },
      passwordConfirmation: {
        placeholder: 'Подтвердите пароль',
        errors: {
          different: 'Пароли должны совпадать',
        },
      },
      message: {
        placeholder: 'Введите ваше сообщение...',
      },
      errors: {
        required: 'Обязательное поле',
      },
    },
    channel: {
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    errors: {
      dataLoad: 'Произошла ошибка при загрузке данных',
    },
  },
};
