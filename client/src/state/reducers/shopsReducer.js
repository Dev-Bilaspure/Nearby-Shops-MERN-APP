const reducer = (state=[], action) => {
    if(action.type==='setShops') {
        return(action.payload);
    }
    else if(action.type==='addShop') {
        return([action.payload, ...state]);
    }
    else {
        return(state);
    }
}

export default reducer