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
import { useUser } from "../context/useUser";
import { useEffect } from "react";

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

    console.log("response in admin login page", response.data);
   

    if (
      !(
        PermissionSystem.hasPermission(response.data.user, "users", "view") ||
        PermissionSystem.hasPermission(response.data.user, "roles", "view")
      )
    ) {

 
      return redirect("/not-authorized");
    }
    localStorage.setItem("token", response.data.token);

    if (PermissionSystem.hasPermission(response.data.user, "users", "view")) {
      console.log("user permission");

      return redirect("/admin/dashboard/users");
    }

    if (PermissionSystem.hasPermission(response.data.user, "roles", "view")) {
      console.log("roles permission");
      return redirect("/admin/dashboard/roles");
    }

    
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AdminLogin = () => {
  const errors = useActionData();
  const token = localStorage.getItem("token");
  console.log("token in local storage", token);

  useEffect(()=>{
    if(token){
      navigate("/admin/dashboard")
    }
  })

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>CMS Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Logging" : "Login"}
        </button>
        <Link to="/login" className="member-btn flex text-[12px] mt-5 ">
          back to user Login
        </Link>
      </Form>
    </Wrapper>
  );
};

export default AdminLogin;
