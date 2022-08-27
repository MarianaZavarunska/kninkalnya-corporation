const apiURL = 'http://localhost:3001';

export default apiURL;

export const urls = {
  registration: '/auth/registration',
  login: '/auth/login',
  googleLogin: '/auth/google/login',
  geolocation: '/auth/google/geolocation',
  refresh: '/auth/refresh',
  user: '/user',
  logout: '/auth/logout',
  dish: '/dish',
  popularDish: '/dish/popular',
  locality: '/locality',
  restaurants: '/restaurants',
  order: '/order',
  reviews: '/reviews',
  promotions: '/promotions',
  frequentOrder: 'user/frequentOrder',
};
