export default {
  translation: {
    channels: 'Channels',
    actions: {
      channel: {
        add: 'Channel has been successfully added',
        rename: 'Channel has been successfully renamed',
        remove: 'Channel has been successfully removed',
      },
    },
    header: {
      signOut: 'Sign out',
    },
    login: {
      title: 'Login',
      errors: {
        401: 'Password or login is incorrect',
        request: 'Server error',
      },
      signUpText: 'Don\'t have an account? ',
      signUpLink: 'Sign up',

      submit: 'Log in',
    },
    signUp: {
      title: 'Sign up',
      submit: 'Sign up',
    },
    error: {
      title: 'Oops!',
      description: 'Sorry, an unexpected error has occurred.',
    },
    modals: {
      addModal: {
        title: 'Add channel',
        submit: 'Submit',
        errors: {
          uniqueness: 'Name already exists!',
        },
      },
      removeModal: {
        title: 'Remove channel',
        submit: 'Submit',
      },
      renameModal: {
        title: 'Rename channel',
        submit: 'Submit',
        errors: {
          uniqueness: 'Name already exists!',
        },
      },
    },
    fields: {
      login: {
        placeholder: 'Login',
        errors: {
          required: 'Login is required',
        },
      },
      password: {
        placeholder: 'Password',
        errors: {
          required: 'Password is required',
        },
      },
      passwordConfirmation: {
        placeholder: 'Password confirmation',
        errors: {
          required: 'Password confirmation is required',
          diferrent: 'Password confirmation should not differs from password',
        },
      },
      message: {
        placeholder: 'Type your message...',
      },
      errors: {
        max: 'Must be {{ max }} characters or less',
        min: 'Must be at least {{ min }} characters',
        required: '{{ field }} is required',
      },
    },
    channel: {
      rename: 'Rename',
      remove: 'Remove',
    },
    errors: {
      dataLoad: 'Unexpected error occurs while downloading the data',
    },
  },
};
