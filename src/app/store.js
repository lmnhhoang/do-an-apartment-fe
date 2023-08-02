import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { apartmentApi } from "./services/apartment.service";
import { personApi } from "./services/person.service";
import { billApi } from "./services/bill.service";
import authReducer from "./slices/auth.slice";
import { feeApi } from "./services/fee.service";

const store = configureStore({
    reducer : {
        [apartmentApi.reducerPath] : apartmentApi.reducer,
        [personApi.reducerPath] : personApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [billApi.reducerPath] : billApi.reducer,
        [feeApi.reducerPath] : feeApi.reducer,
        auth : authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apartmentApi.middleware, personApi.middleware, authApi.middleware, billApi.middleware, feeApi.middleware),
})

export default store;