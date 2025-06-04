import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

////->Redux persist:-
// Redux Persist aapke Redux store ka data browser ke andar save kar deta hai — jaise 
// localStorage ya AsyncStorage mein — taake jab aap page reload karein, to aapka data 
// wapas mil jaye.

// Agar aap ek login system bana rahe hain aur user login karta hai:
// Redux ke state mein isLoggedIn: true set hota hai.
// Lekin agar page reload ho gaya, Redux ka state default ban jata hai (sab kuch reset).
// Redux Persist isko rokta hai — yeh state ko store karta hai aur wapas laata hai jab page reload hota hai.


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer =combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySlice,
    application:applicationSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer);





//Making of store:- 
const store = configureStore({
    // reducer: {
    //     auth: authSlice,
    //     job: jobSlice
    // },

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;