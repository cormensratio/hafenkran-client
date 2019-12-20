
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
      emailRules: {
        required: v => !!v || 'E-mail is required',
        regex: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      },
    };
  },
};

export default RulesMixin;

