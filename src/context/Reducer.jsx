const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.userData,
        isFetching: false,
        error: false,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        token: null,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        token: state.token,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
        token: state.token,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        token: null,
      };

    default:
      return state;
  }
};
// Reducer current page
// const ReducerPage = (state, action) => {
//   switch (action.type) {
//     case "ARTICLES":
//       return {
//         page: "articles",
//       };
//     default:
//       return state;
//   }
export default Reducer;
