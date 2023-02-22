export default {
  translation: {
    channels: 'Channels',
    actions: {
      channel: {
        add: 'Channel has been successfully added',
        rename: 'Channel has been successfully renamed',
        remove: 'Channel has been successfully removed',
      },
      message: {
        submit: 'Submit',
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
        label: 'Channel name',
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
        placeholder2: 'Login',
        errors: {
          max: 'From {{ min }} to {{ max }} characters',
          min: 'From {{ min }} to {{ max }} characters',
        },
      },
      password: {
        placeholder: 'Password',
        errors: {
          max: 'Not more than {{ max }} characters',
          min: 'Not lesser than {{ min }} characters',
        },
      },
      passwordConfirmation: {
        placeholder: 'Password confirmation',
        errors: {
          diferrent: 'Password confirmation should not differs from password',
        },
      },
      message: {
        placeholder: 'Type your message...',
      },
      errors: {
        required: 'Is required',
        unique: 'Value should be unique',
      },
    },
    channel: {
      rename: 'Rename',
      remove: 'Remove',
      management: 'Channel management',
    },
    errors: {
      dataLoad: 'Unexpected error occurs while downloading the data',
    },
  },
};
