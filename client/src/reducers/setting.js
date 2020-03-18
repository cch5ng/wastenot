const setting = (state = { hasButtonClicked: false }, action) => {
    switch (action.type) {
      case 'SETTING_FETCH':
        return {
          ...state,
          status: 'fetching'
        }
      case 'SETTING_FETCH_ERR':
        return {
          ...state,
          status: 'error',
          message: action.message
        }
      case 'SETTING_FETCH_SUCCESS':
        return {
            ...state,
            status: 'success',
            message: action.message,
            isUsingExpiration: action.isUsingExpiration
        }
      default:
        return state
    }
  }
  
  export default setting;
  