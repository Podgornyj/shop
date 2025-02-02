'use client'
import { useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string
  password: string
}


export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const { mutate } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      router.push(callbackUrl);
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  };

  return (
    <div className="min-h-[450px] flex justify-center items-center">
      <form className="flex flex-col shadow-lg w-[200px] p-4" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" {...register("email", { required: true })} />
        <input placeholder="password" {...register("password", { required: true })} />
        {errors.email && <span>Email is required</span>}
        {errors.password && <span>Password is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
}