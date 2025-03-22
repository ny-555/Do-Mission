import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axios";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginIndex() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    await axiosInstance.post("/users/login", { data });
    router.push("/users");
  };

  return (
    <>
      <div className={`text-center space-y-4 pt-10`}>
        <h1 className={`text-3xl font-semibold`}>ユーザー登録画面</h1>
        <p>メールアドレス、パスワードを入力してください</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="メールアドレス">メールアドレス</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: "メールアドレスは必須です",
            })}
            className={`border w-1/3 bg-white border-gray-300 p-1 rounded-lg`}
          />
          <p className={`font-normal text-red-500`}>{errors.email?.message}</p>

          <label htmlFor="パスワード">パスワード</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="パスワードを入力しよう"
            {...register("password", {
              required: "パスワードは必須です",
            })}
            className={`border w-1/3 bg-white border-gray-300 p-1 rounded-lg`}
          />
          <p className={`font-normal text-red-500`}>
            {errors.password?.message}
          </p>

          <div>
            <button type="submit" className={`primary-button mt-4`}>
              ログイン
            </button>
          </div>
        </form>

        <div>
          <Link href="/" className={`mx-auto underline`}>
            トップにもどる
          </Link>
        </div>
      </div>
    </>
  );
}
