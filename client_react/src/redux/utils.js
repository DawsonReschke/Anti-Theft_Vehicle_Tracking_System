/** 
 * @constant {Function} createMatcher
 * @param {AsyncThunkActionCreator} expectedAction the action that you want to match 
 * @returns {Function} function that compares {expectedAction} to the passed in action.type  
 * @example let a = createAsyncThunk(...); 
 * let fulfilledMatcher = createMatcher(a.fulfilled)
*/
// eslint-disable-next-line
export const createMatcher = (ExpectedAction) => (action) => action.type == ExpectedAction