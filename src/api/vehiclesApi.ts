import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, VehiclesResponse } from "../types/types";

export const vehiclesApi = createApi({
    reducerPath: "vehiclesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints: (builder) => ({
        getVehicles: builder.query<VehiclesResponse, void>({
            query: () => "products/category/vehicle",
        }),
        getVehicle: builder.query<Car, string | undefined>({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetVehiclesQuery, useGetVehicleQuery } = vehiclesApi;
