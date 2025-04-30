import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user_key: "",
    settings: {
        defaultHomepage: "",
    },
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setKey: (state, action) => {
            state.user_key = action.payload;
        },
        setDefaultHomepage: (state, action) => {
            state.settings.defaultHomepage = action.payload;
        },
    }
})
export const { setKey } = userSlice.actions;
export default userSlice;