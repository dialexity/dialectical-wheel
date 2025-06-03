// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  ENDPOINTS: {
    SESSION: '/session',
    WHEEL_AUTO: '/session/{sessionId}/wheel/auto',
    WHEEL_MANUAL: '/session/{sessionId}/wheel',
    WISDOM_UNITS: '/session/{sessionId}/wheel/{wheelId}/wisdom-units',
    CYCLES: '/session/{sessionId}/wheels/cycles/structured'
  }
};

export default API_CONFIG; 