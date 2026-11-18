"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/features/cartSlice";
import TextField from "./TextField";
import Button from "./Button";
import FormAlert from "./FormAlert";
import isValidEmail from "@/libs/isValidEmail";

export default function SignInForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") ?? "/";
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email) next.email = "กรุณากรอกอีเมล";
    else if (!isValidEmail(email)) next.email = "อีเมลไม่ถูกต้อง";
    if (!password) next.password = "กรุณากรอกรหัสผ่าน";
    setErrors(next);
    if (next.email || next.password) return;

    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (!result?.ok) {
      setErrors({ form: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      return;
    }
    dispatch(clearCart());
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-line bg-white p-10"
    >
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-2xl leading-[1.4] font-bold">เข้าสู่ระบบ</h1>
        <p className="m-0 text-sm text-muted">ใช้อีเมลและรหัสผ่านที่สมัครไว้</p>
      </div>
      <TextField id="l-email" label="อีเมล" type="email" placeholder="name@example.com" value={email} onChange={setEmail} error={errors.email} />
      <TextField id="l-pass" label="รหัสผ่าน" type="password" value={password} onChange={setPassword} error={errors.password} />
      <FormAlert message={errors.form} />
      <Button type="submit" full disabled={loading}>
        เข้าสู่ระบบ
      </Button>
      <p className="m-0 text-center text-sm text-muted">
        ยังไม่มีบัญชี?{" "}
        <Link href="/register" className="font-semibold text-primary">
          สมัครสมาชิก
        </Link>
      </p>
    </form>
  );
}
