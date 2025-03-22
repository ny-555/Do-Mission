import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { axiosInstance } from "../../../utils/axios";
import { getAllMissionIds } from "@/functions/getAllMissionIds";
import { Mission } from "@/types/mission";
import { Params } from "@/types/params";
import { DataForm } from "@/types/dataFrom";

export async function getStaticProps({ params }: Params) {
  const res = await axiosInstance.get(`/missions/${params.id}`);
  const missionData: Mission = res.data;
  return {
    props: {
      missionData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllMissionIds();
  return {
    paths,
    fallback: false,
  };
}

export default function MissionEdit({ missionData }: { missionData: Mission }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>();

  const onSubmit = async (data: DataForm) => {
    const { title, summary } = data;
    await axiosInstance.put(`/missions/${missionData.id}`, {
      title,
      summary,
    });
    router.push("/missions");
  };

  return (
    <>
      <div className={`text-center space-y-4 pt-10`}>
        <h1 className={`headingMd`}>ミッション編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-2`}>
          <label htmlFor="タイトル">タイトル</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="タイトルを入力しよう"
            defaultValue={missionData.title}
            {...register("title", {
              required: "タイトルは必須です",
              maxLength: { value: 20, message: "20文字以内にしてください" },
            })}
            className={`input stdWidth`}
          />
          <p className={`error`}>{errors.title?.message}</p>

          <label htmlFor="概要">概要</label>
          <br />
          <textarea
            id="summary"
            placeholder="具体的な内容を入力しよう"
            defaultValue={missionData.summary}
            {...register("summary", {
              required: "概要は必須です",
              maxLength: { value: 60, message: "60文字以内にしてください" },
            })}
            className={`input stdWidth h-40 resize-none`}
          />
          <p className={`error`}>{errors.summary?.message}</p>

          <div>
            <button type="submit" className={`primary-button`}>
              ミッションを編集する
            </button>
          </div>
        </form>

        <div>
          <Link href="/missions/" className={`link`}>
            ← 戻る
          </Link>
        </div>
      </div>
    </>
  );
}
