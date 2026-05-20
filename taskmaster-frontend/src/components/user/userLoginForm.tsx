import { useState } from "react";
import { useUserMutations } from "../../features/user/useUserMutations";

export default function UserLoginForm({ onSuccess }: { onSuccess: (token: string,email: string) => void }) {
  const { login } = useUserMutations(); 
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login.mutateAsync(formData);
      if (result?.token) {
      localStorage.setItem("userEmail", formData.email);
      onSuccess(result.token, formData.email); 
    }
    } catch (err) {
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-soft">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
        <p className="text-slate-400 text-sm">Please enter your details to login</p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
      >
        {login.isPending ? "Authenticating..." : "Login"}
      </button>
    </form>
  );
}