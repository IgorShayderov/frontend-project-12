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
          required: 'Имя пользователя обязателено',
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
        max: 'Должно быть максимум {{ max }} символов',
        min: 'Должно быть минимум {{ min }} символа',
        required: '{{ field }} обязательное поле',
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
