import { clsx, type ClassValue } from "clsx";
import { SetURLSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function isValidUUIDV4(uuid: string): boolean {
  return uuidRegex.test(uuid);
}

export function updateQueryParams(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  newParams: Record<string, string>
) {
  const updatedParams = new URLSearchParams(searchParams);

  Object.keys(newParams).forEach((key) => {
    updatedParams.set(key, newParams[key]);
  });

  setSearchParams(updatedParams);
}

export function removeQueryParam(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  paramToRemove: string
) {
  const updatedParams = new URLSearchParams(searchParams);

  // Remove the specific parameter
  updatedParams.delete(paramToRemove);

  // Set the updated query params
  setSearchParams(updatedParams);
}

export function notifyError(error: any) {
  let respData = error?.response?.data;
  if ([401, 403]?.includes(respData?.statusCode)) {
    toast.warning("Please log in to continue with this action.");
    return;
  }
  let message = "";

  if (respData?.statusCode >= 500) {
    // Show generic message for server errors
    message = "Something went wrong";
  } else {
    if (typeof error === "string") {
      message = error;
    } else if (error.message) {
      message = error.message;
    } else {
      let responseMsg = respData?.message;
      if (Array.isArray(responseMsg)) {
        message = responseMsg[0];
      } else {
        message = responseMsg;
      }
    }
  }

  toast.error(message || "Something went wrong");
}
