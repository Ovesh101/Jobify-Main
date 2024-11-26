import { lazy, Suspense } from "react";
import {
  Error,
  Register,
  Login,
  Landing,
  Stats,
  AllJobs,
  Profile,
  AddJob,
  EditJob,
} from "./pages";

const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));

import AdminLogin from "./Role_Based_System/components/AdminLogin.jsx";

import HomeLayout from "./pages/HomeLayout.jsx";
import PermissionSystem from "./Role_Based_System/auth.js";
import ProtectedRoute from "./Role_Based_System/components/ProtectedRoute.jsx";

import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as adminLoginAction } from "./Role_Based_System/components/AdminLogin.jsx";
import { action as JobdataAction } from "./pages/AddJob";
import { loader as loadDashboard } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import AdminLayout from "./Role_Based_System/Admin.jsx";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import { useEffect, useState } from "react";
const UsersData = lazy(() =>
  import("./Role_Based_System/components/UsersData.jsx")
);
const RolesPermission = lazy(() =>
  import("./Role_Based_System/components/RolesPermission.jsx")
);
import { AuthProvider } from "./Role_Based_System/context/useUser.jsx";
import Loading from "./components/Loading.jsx";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
        action: adminLoginAction,
      },

      {
        path: "/admin/dashboard",
        element: (
          <AuthProvider>
            <AdminLayout isDarkThemeEnabled={isDarkThemeEnabled} />
          </AuthProvider>
        ),

        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard/users" replace />,
          },
          {
            index: true,
            path: "users", // Accessible at /admin/dashboard/users
            element: (
              <ProtectedRoute resource="users" action="view">
                <Suspense fallback={<Loading />}>
                  <UsersData />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "roles", // Accessible at /admin/dashboard/roles
            element: (
              <ProtectedRoute resource="roles" action="view">
                <Suspense fallback={<Loading />}>
                  <RolesPermission />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
          </Suspense>
        ),
        loader: loadDashboard,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: JobdataAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },

          {
            path: "edit-job/:id",
            loader: editJobLoader,
            action: editJobAction,
            element: <EditJob />,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  useEffect(() => {
    // Load permissions on app start
    const loadPermissions = async () => {
      await PermissionSystem.loadPermissions();
      setPermissionsLoaded(true); // Indicate permissions are loaded
    };

    loadPermissions();
  }, []);

  console.log("permission data", permissionsLoaded);

  if (!permissionsLoaded) {
    return <div>Loading permissions...</div>; // Render loading state
  }

  return <RouterProvider router={router} />;
};

export default App;
