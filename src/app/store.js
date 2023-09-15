import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { apartmentApi } from "./services/apartment.service";
import { personApi } from "./services/person.service";
import { billApi } from "./services/bill.service";
import authReducer from "./slices/auth.slice";
import { feeApi } from "./services/fee.service";
import { devicesApi } from "./services/device.service";
import { newsApi } from "./services/news.service";
import { servicesApi } from "./services/services.service";
import { fileUploadApi } from "./services/fileUpload.service"
import { userApi } from "./services/user.service"

const store = configureStore({
    reducer : {
        [apartmentApi.reducerPath] : apartmentApi.reducer,
        [personApi.reducerPath] : personApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [billApi.reducerPath] : billApi.reducer,
        [feeApi.reducerPath] : feeApi.reducer,
        [devicesApi.reducerPath] : devicesApi.reducer,
        [newsApi.reducerPath] : newsApi.reducer,
        [servicesApi.reducerPath] : servicesApi.reducer,
        [fileUploadApi.reducerPath] : fileUploadApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        auth : authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apartmentApi.middleware, personApi.middleware, authApi.middleware, billApi.middleware, feeApi.middleware,devicesApi.middleware, newsApi.middleware, servicesApi.middleware,fileUploadApi.middleware, userApi.middleware),
})

export default store;