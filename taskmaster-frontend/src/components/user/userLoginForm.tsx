import { useState } from "react";
import { useUserMutations } from "../../features/user/useUserMutations";

interface LoginProps {
  onSuccess: (token: string, email: string) => void;
  onSwitchToRegister: () => void; // 🌟 Callback to toggle form views
}

export default function UserLoginForm({ onSuccess, onSwitchToRegister }: LoginProps) {
  const { login } = useUserMutations(); 
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login.mutateAsync(formData);
      if (result?.token) {
        localStorage.setItem("userEmail", formData.email);
        onSuccess(result.token, formData.email); 
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/40 p-10 shadow-xl transition-all"
    >
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-100 mb-4">
          TF
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
        <p className="text-slate-400 text-sm mt-1">Please enter your details to login</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-slate-50/60 border border-slate-200/60 rounded-2xl px-5 py-3.5 text-sm text-slate-800 outline-none placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-50/60 border border-slate-200/60 rounded-2xl px-5 py-3.5 text-sm text-slate-800 outline-none placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <button
        type="submit"
        disabled={login.isPending}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-2xl transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-[0.99]"
      >
        {login.isPending ? "Authenticating..." : "Login"}
      </button>

      {/* Switch Form Footer Toggle */}
      <div className="text-center text-xs text-slate-500 border-t border-slate-100/80 pt-5 mt-6">
        New to TaskFlow?{" "}
        <button 
          type="button"
          onClick={onSwitchToRegister}
          className="font-bold text-blue-600 hover:underline transition-all"
        >
          Create an account
        </button>
      </div>
    </form>
  );
}