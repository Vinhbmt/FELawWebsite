export const initialState = {
    search:null,
};
const lawyerReducer = (state=initialState,action) => {
    switch (action.type){
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};

export default lawyerReducer;