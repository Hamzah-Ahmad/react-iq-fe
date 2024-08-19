import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RegisterSchema, { RegisterSchemaType } from "../schema/register.schema";
import axios from "shared/config/axios";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Label } from "shared/components/ui/label";
import { Input } from "shared/components/ui/input";
import { Button } from "shared/components/ui/button";
import { useState } from "react";
import { returnErrorString } from "shared/lib/utils";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
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
      setIsLoading(false); // setting isLoding false here to prevent data leak in case user navigates to homepage
      setAuth({ user, accessToken, refreshToken });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(returnErrorString(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 border-2 border-muted  rounded-lg p-8 w-96"
      >
        <h1 className="text-2xl">Create an account</h1>
        <div>{error && <div className="mb-0 text-red-400">{error}</div>}</div>
        <div className="flex flex-col  gap-y-8">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              className="mt-2"
            />
            {errors.name && (
              <small className="block mt-2 text-red-500">
                {errors.name.message}
              </small>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              className="mt-2"
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
              className="mt-2"
            />
            {errors.password && (
              <small className="block mt-2 text-red-500">
                {errors.password.message}
              </small>
            )}
          </div>
          <Button
            type="submit"
            className="mt-2 text-secondary-foreground block w-full"
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            variant="link"
            asChild
            className="text-xs pl-0 w-full justify-end"
          >
            <Link to="/login">Already have an account? Log in</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
