
const RulesMixin = {
  data() {
    return {
      rules: {
        positiveNumbers: value => value >= 0,
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The emails you entered don\'t match'),
        emailRegex: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      },
    };
  },
};

export default RulesMixin;

