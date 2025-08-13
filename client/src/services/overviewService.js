import api from './api';

export const getOverview = (page, limit, role, rating) => {
    return api.get('/overview', {
        params: {
          page,
          limit,
          role,
          rating
        }
      })
    }
