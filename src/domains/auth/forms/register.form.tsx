import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RegisterSchema, {
  RegisterSchemaType,
} from "../schema/register.schema";
import axios from "../../../shared/config/axios";
import { useAuth } from "../../auth/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({
          name: data.name,
          email: data.email,
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
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} type="text" />
        {errors.name && <small className="error">{errors.name.message}</small>}
      </div>
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

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
        {errors.confirmPassword && (
          <small className="error">{errors.confirmPassword.message}</small>
        )}
      </div>

      <button>Submit</button>
    </form>
  );
};

export default RegisterForm;
