const defaultState = {
  articles: [],
  currentArticle: {},
};

export default function articleReducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_ARTICLES":
      return { ...state, articles: action.payload };

    case "SET_CURRENT_ARTICLE":
      return { ...state, currentArticle: action.payload };

    default:
      return state;
  }
}
