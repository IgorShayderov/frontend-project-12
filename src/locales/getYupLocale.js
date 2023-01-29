export default (t) => ({
  string: {
    max: ({ max, min }) => t('fields.errors.max', { max, min }),
    min: ({ min, max }) => t('fields.errors.min', { min, max }),
  },
  mixed: {
    required: () => t('fields.errors.required'),
  },
});
