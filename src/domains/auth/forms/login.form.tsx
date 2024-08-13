import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoginSchema, { LoginSchemaType } from "../schema/login.schema";
import axios from "shared/config/axios";
import { useAuth } from "domains/auth/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "shared/components/ui/button";
import { notifyError } from "shared/lib/utils";
import { Input } from "shared/components/ui/input";
import { Label } from "shared/components/ui/label";

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
      notifyError(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10 border-2 border-muted  rounded-lg p-8"
      >
        <h1 className="text-2xl">Login to your account</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            className="w-72 mt-2"
          />
          {errors.email && (
            <small className="block mt-2 text-red-500">
              {errors.email.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            className="w-72 mt-2"
          />
          {errors.password && (
            <small className="block mt-2 text-red-500">
              {errors.password.message}
            </small>
          )}
        </div>

        <div>
          <Button className="mt-2 text-secondary-foreground block w-full">
            Login
          </Button>
          <Button variant="link" className="text-xs pl-0 w-full justify-end">
            <span className="text-left">Create an account</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
