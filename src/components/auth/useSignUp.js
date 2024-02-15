import { useMutation, useQueryClient } from "@tanstack/react-query";
import signUpApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
export default function useSignUp() {
  const navigate = useNavigate();
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: (user) => signUpApi(user),
    onSuccess: () => {
      console.log("User successfully created");
      navigate("/auth");
    },
    onError: (err) => {
      console.error("User was not created");
      console.log(err, "Error");
    },
  });

  return { isLoading, signUp };
}
