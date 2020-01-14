
const RulesMixin = {
  data() {
    return {
      rules: {
        positiveNumbers: value => value >= 0,
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
        matchWithConfirm: v => v === this.confirmPassword || 'Passwords must match',
        matchWithPassword: v => v === this.password || 'Passwords must match',
      },
      emailRules:
      // eslint-disable-next-line no-useless-escape
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    };
  },
};

export default RulesMixin;

