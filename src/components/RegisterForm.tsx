"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";
import TextField from "./TextField";
import Button from "./Button";
import FormAlert from "./FormAlert";

type Errors = { name?: string; email?: string; tel?: string; password?: string; form?: string };

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "กรุณากรอกชื่อ";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "อีเมลไม่ถูกต้อง";
    if (!tel) next.tel = "กรุณากรอกเบอร์โทร";
    else if (!/^\d{10}$/.test(tel)) next.tel = "เบอร์โทรต้องเป็นตัวเลข 10 หลัก";
    if (password.length < 6) next.password = "รหัสผ่านอย่างน้อย 6 ตัว";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    const json = await userRegister({ name, email, tel, password });
    setLoading(false);
    if (!json.success) {
      const isDuplicateEmail = /E11000|duplicate/i.test(json.error ?? "");
      setErrors({ form: isDuplicateEmail ? "อีเมลนี้ถูกใช้แล้ว" : json.error });
      return;
    }
    router.push("/signin");
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-10">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-2xl leading-[1.4] font-bold">สมัครสมาชิก</h1>
        <p className="m-0 text-sm text-muted">กรอกข้อมูลให้ครบทุกช่อง</p>
      </div>
      <TextField id="r-name" label="ชื่อ" value={name} onChange={setName} error={errors.name} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        <TextField id="r-email" label="อีเมล" type="email" placeholder="name@example.com" value={email} onChange={setEmail} error={errors.email} />
        <TextField id="r-tel" label="เบอร์โทร" type="tel" placeholder="0812345678" value={tel} onChange={setTel} error={errors.tel} />
      </div>
      <TextField id="r-pass" label="รหัสผ่าน" type="password" placeholder="อย่างน้อย 6 ตัว" value={password} onChange={setPassword} error={errors.password} />
      <FormAlert message={errors.form} />
      <Button type="submit" full disabled={loading}>
        สมัครสมาชิก
      </Button>
      <p className="m-0 text-center text-sm text-muted">
        มีบัญชีแล้ว?{" "}
        <Link href="/signin" className="font-semibold text-primary">
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
}
