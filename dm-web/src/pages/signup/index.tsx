import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axios";

type UserForm = {
  name: string;
  email: string;
};

export default function SignupIndex() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit = async (data: UserForm) => {
    const { name, email } = data;
    await axiosInstance.post("/users", { name, email });
    router.push("/users");
  };

  return (
    <>
      <div className={`text-center space-y-4 pt-10`}>
        <h1 className={`text-2xl`}>ユーザー登録画面</h1>
        <p>ユーザーネーム、メールアドレスを入力してください</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="ユーザーネーム">ユーザーネーム</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="ユーザーネームを入力しよう"
            {...register("name", {
              required: "ユーザーネームは必須です",
              minLength: { value: 2, message: "2文字以上にしてください" },
              maxLength: { value: 16, message: "16文字以内にしてください" },
            })}
            className={`border w-1/3 bg-white border-gray-300 p-1 rounded-lg`}
          />
          <p className={`font-normal text-lg text-red-500`}>
            {errors.name?.message}
          </p>

          <label htmlFor="メールアドレス">メールアドレス</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="メールアドレスを入力しよう"
            {...register("email", {
              required: "メールアドレスは必須です",
            })}
            className={`border w-1/3 bg-white border-gray-300 p-1 rounded-lg`}
          />
          <p className={`font-normal text-lg text-red-500`}>
            {errors.email?.message}
          </p>

          <div>
            <button type="submit" className={`primary-button mt-4`}>
              ユーザー登録
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
