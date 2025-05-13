import API from "./api";

export const login = (email: string, password: string) => {
  return API.post("/login", { email, password });
};

export const signup = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return API.post("/signup", {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  });
};
