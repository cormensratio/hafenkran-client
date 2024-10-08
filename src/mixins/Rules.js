
const RulesMixin = {
  data() {
    return {
      rules: {
        emailRegex: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
        positiveNumbers: value => value >= 1,
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRules:
        // eslint-disable-next-line no-useless-escape
          v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      },
    };
  },
};

export default RulesMixin;

