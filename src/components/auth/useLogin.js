import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: (user) => loginApi(user),

    onSuccess: ({ user, token }) => {
      console.log("User successfully logged in");
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.setQueryData(["user"], user);
      navigate("/articles");
    },
    onError: () => {
      console.log("User was not logged in");
    },
  });

  return { isLoading, login };
}
