export default (t) => ({
  string: {
    max: ({ max }) => t('fields.errors.max', { max }),
    min: ({ min }) => t('fields.errors.min', { min }),
  },
  mixed: {
    required: ({ path }) => t(`fields.${path}.errors.required`),
  },
});
