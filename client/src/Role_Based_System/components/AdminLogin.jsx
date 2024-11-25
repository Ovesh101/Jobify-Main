import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";

import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import { Logo, FormRow } from "../../components";

import customFetch from "../../utils/customFetch";
import PermissionSystem from "../auth";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "Password is too short";
    return errors;
  }

  try {
    const response = await customFetch.post("/users/login", data);
    console.log("login data", response);

    if (PermissionSystem.hasPermission(response.data.user, "users", "view")) {
      return redirect("/admin/dashboard/users");
    }

    if (PermissionSystem.hasPermission(response.data.user, "roles", "view")) {
      return redirect("/admin/dashboard/roles");
    }

    // Redirect non-admins to a different dashboard or homepage
    return redirect("/not-authorized");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AdminLogin = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Admin Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Logging" : "Login"}
        </button>
        <Link to="/login" className="member-btn">
          back to Login
        </Link>
      </Form>
    </Wrapper>
  );
};

export default AdminLogin;
