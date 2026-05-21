import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserRegisterDto } from "../../types/user";
import { useUserMutations } from "../../features/user/useUserMutations";
import { useState } from "react";


export default function UserRegisterForm({ onSuccess, onSwitchToLogin, initialData }: {
    onSuccess: () => void;
    onSwitchToLogin: () => void; 
    initialData?: UserRegisterDto | null;
}) {
    const {create} = useUserMutations();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        firstName :"",
        lastName:"",
        email:"",
        password:""
    })

    const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();

    try {
            await create.mutateAsync(formData);
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
        } catch (err) {
            console.error("Registration failed:", err);
        }
    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50">
                <h2 className="text-xl font-bold text-slate-800">Create Account</h2>
                <p className="text-sm text-slate-400">Join TaskMaster to manage your projects</p>
            </div>

            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        placeholder="First Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Last Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
            </div>

            <div className="p-6 bg-slate-50">
                <button
                    type="submit"
                    disabled={create.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition-all disabled:opacity-50"
                >
                    {create.isPending ? "Creating Account..." : "Register"}
                </button>
            </div>
            <div className="text-center text-xs text-slate-500 mt-4 mb-6">
                Already have an account?{" "}
                <button 
                    type="button"
                    onClick={onSwitchToLogin} 
                    className="font-bold text-blue-600 hover:underline transition-all"
                >
                    Sign in here
                </button>
            </div>
        </form>
    )
}