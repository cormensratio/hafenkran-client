
const RulesMixin = {
  data() {
    return {
      rules: {
        positiveNumbers: value => value >= 0,
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The emails you entered don\'t match'),
      },
    };
  },
};

export default RulesMixin;

