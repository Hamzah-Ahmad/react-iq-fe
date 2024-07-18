import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoginSchema, { LoginSchemaType } from "../schema/login.schema";
import axios from "../../../shared/config/axios";
import { useAuth } from "../../auth/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({
          email: data.email, // passport localstrategy expects property name username. More info here: https://stackoverflow.com/questions/45250545/how-to-authenticate-via-email-rather-than-username-in-passport-js
          password: data.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { user, accessToken, refreshToken } = response?.data || {};
      setAuth({ user, accessToken, refreshToken });
      navigate(from, { replace: true });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} type="email" />
        {errors.email && (
          <small className="error">{errors.email.message}</small>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" {...register("password")} type="password" />
        {errors.password && (
          <small className="error">{errors.password.message}</small>
        )}
      </div>

      <button>Submit</button>
    </form>
  );
};

export default LoginForm;
