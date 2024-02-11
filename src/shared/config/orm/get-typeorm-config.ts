import config from './orm.config';

export const getTypeormConfig = () => {
  return {
    inject: [],
    useFactory: async () => {
      return config;
    },
  };
};
