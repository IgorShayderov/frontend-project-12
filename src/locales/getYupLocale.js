export default (t) => ({
  string: {
    max: ({ max }) => t('fields.errors.max', { max }),
    min: ({ min }) => t('fields.errors.min', { min }),
  },
  mixed: {
    required: () => t('fields.errors.required'),
  },
});
