import { mapGetters } from 'vuex';
import { isNil, filter } from 'lodash';

const UsersMixin = {
  computed: {
    ...mapGetters(['user', 'userList']),
  },
  methods: {
    getUserNameFromId(ownerId) {
      if (!isNil(ownerId)) {
        const matching = filter(this.userList, user => user.id === ownerId);

        if (!isNil(matching) && matching.length > 0) {
          if (matching[0].name === this.user.name) {
            return 'Me';
          }
          return matching[0].name;
        }
      }
      return 'User not found';
    },
  },
};

export default UsersMixin;
