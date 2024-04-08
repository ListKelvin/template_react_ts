import { URL_API_LOCAL } from "../config";
import { User } from "./../types/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "users",
  tagTypes: ["UserList"],
  baseQuery: fetchBaseQuery({ baseUrl: URL_API_LOCAL }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `users`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserList" as const, id })),
              { type: "UserList", id: "LIST" },
            ]
          : [{ type: "UserList", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = userApi;
