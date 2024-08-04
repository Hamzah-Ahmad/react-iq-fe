import { clsx, type ClassValue } from "clsx";
import { SetURLSearchParams } from "react-router-dom";
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
