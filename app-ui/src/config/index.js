import environments from 'config/environments';

const config = {
  env: process.env.NODE_ENV || 'development',
  csrfCookieName: 'PLAY_CSRF_TOKEN',
  route: {
    index: '/',
    event: {
      sse: '/sse'
    },
    auth: {
      index: '/auth',
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      passwordRecovery: '/auth/password/recovery',
      accountActivation: '/auth/account/activation',
    },
    /*admin: {
      index: '/admin',
    },*/
    coach: {
      game: '/games',
      app: '/coach/:username(/:team)',
      team: '/coach/:username/:team',
      appRaw: '/coach',
    },
    user: {
      account: '/account',
      friends: '/friends',
      settings: '/settings',
      profile: '/profile',
    },
    company: {
      dashboard: '/company/dashboard',
    }
  },
};

// ========================================================
// Environment Configuration
// ========================================================
const overrides = environments[config.env];
if (overrides) {
  Object.assign(config, overrides(config));
}

export default config;
