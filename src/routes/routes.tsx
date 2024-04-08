/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";

const ErrorNotLink = Loadable({ loader: () => import("../pages/error/Error") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Unauthorized = Loadable({
  loader: () => import("../pages/error/Unauthorized"),
});

const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
// const ViewSyllabus = Loadable({
//   loader: () => import("../pages/syllabus/ViewSyllabus"),
// });
// const CreateSyllabus = Loadable({
//   loader: () => import("../pages/syllabus/CreateSyllabus"),
// });
// const UpdateSyllabus = Loadable({
//   loader: () => import("../pages/syllabus/UpdateSyllabus"),
// });
// const SyllabusDetail = Loadable({
//   loader: () => import("../pages/syllabus/SyllabusDetail"),
// });

// const token = selectToken;
// console.log(token);
// const token = useSelector(selectToken);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard
        allowedRoles={["ROLE_ADMIN", "ROLE_TRAINER", "ROLE_SUPER_ADMIN"]}
      />
    ),
    children: [
      {
        element: <AuthGuard />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: Home,
          },
          {
            path: "dashboard",
            element: Dashboard,
          },
          {
            path: "/admin",
            element: Admin,
          },

          // {
          //   path: "create-syllabus",
          //   element: CreateSyllabus,
          // },
          {
            path: "/",
            element: <AuthGuard permissionSyllabusRoles={[1, 2, 3]} />,
            children: [
              // {
              //   path: "create-syllabus",
              //   element: CreateSyllabus,
              // },
            ],
          },

          // {
          //   path: "view-syllabus",
          //   element: ViewSyllabus,
          // },
          {
            path: "/",
            element: <AuthGuard permissionSyllabusRoles={[1, 2, 3, 4]} />,
            children: [
              // {
              //   path: "view-syllabus",
              //   element: ViewSyllabus,
              // },
            ],
          },

          // {
          //   path: "detail-syllabus/:id/edit",
          //   element: UpdateSyllabus,
          // },
          {
            path: "/",
            element: <AuthGuard permissionSyllabusRoles={[1, 2, 3]} />,
            children: [
              // {
              //   path: "detail-syllabus/:id/edit",
              //   element: UpdateSyllabus,
              // },
            ],
          },
          // {
          //   path: "detail-syllabus",
          //   element: SyllabusDetail,
          // },
          {
            path: "/",
            element: <AuthGuard permissionSyllabusRoles={[1, 2, 3, 4]} />,
            children: [
              // {
              //   path: "detail-syllabus/:id",
              //   element: SyllabusDetail,
              // },
            ],
          },

          {
            path: "404",
            element: ErrorNotLink,
          },
          {
            path: "403",
            element: Unauthorized,
          },
        ],
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: Login,
  // },
  // {
  //   path: "forget-password",
  //   element: ForgotPassword,
  // },

  {
    path: "403",
    element: Unauthorized,
  },

  {
    path: "/*",
    element: ErrorNotLink,
  },
]);
