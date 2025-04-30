import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import notesSlice from "./notes.slice";
import userSlice from "./user.slice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    notes: notesSlice.reducer,
});

const persistedReducer = persistReducer({
    key: "root",
    storage,
}, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat()
})
setupListeners(store.dispatch);
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;