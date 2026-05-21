import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import { useProjects } from "./features/projects/useProjects";
import TaskList from "./components/tasks/TaskList";
import TaskInfo from "./components/tasks/TaskInfo";
import { Toaster } from "react-hot-toast";
// @ts-ignore
import logo from "./assets/images/logo.png";
import UserRegisterForm from "./components/user/userRegisterForm";
import UserLoginForm from "./components/user/userLoginForm";
import ProjectForm from "./components/project/projectForm";
import { useUser } from "./features/user/useUser";
import type { User } from "./types/user";
import Modal from "./components/ui/Modal";

export default function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem("userEmail"),
  );
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(
    undefined,
  );
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(
    undefined,
  );
  const { data: projects, isLoading } = useProjects(!!token, currentUserId);
  const { data: users } = useUser<User[]>(!!token);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  const handleLogout = () => {
    setCurrentUserId(undefined);
    setCurrentProjectId(undefined);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location.reload();
  };

  useEffect(() => {
    if (isLoading || !projects || projects.length === 0 || !currentUserId)
      return;

    if (currentProjectId === undefined) {
      const myFirstProject = projects.find(
        (p: any) => p.userId === currentUserId || p.UserId === currentUserId,
      );

      if (myFirstProject) {
        const resolvedId =
          (myFirstProject as any).Id || (myFirstProject as any).id;
        setCurrentProjectId(resolvedId);
      } else {
        setCurrentProjectId(undefined);
      }
    }
  }, [projects, currentProjectId, isLoading, currentUserId]);

  useEffect(() => {
    if (!users || !token || !userEmail) return;

    const userList = Array.isArray(users) ? users : (users as any)?.Data || [];
    const currentUser = userList.find(
      (u: any) => u.Email?.toLowerCase() === userEmail.toLowerCase(),
    );

    if (userList.length > 0) {
      if (currentUser) {
        setCurrentUserId(currentUser.Id);
      }
    }
  }, [token, users, userEmail]);

  const handleLoginSuccess = (newToken: string, email: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);

    setToken(newToken);
    setUserEmail(email);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-[75rem] mx-auto space-y-10">
        {!token ? (
          <div className="relative flex items-center justify-center min-h-[300px] w-full max-w-md mx-auto p-4 my-8 overflow-visible">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400/40 to-purple-500/30 blur-2xl animate-pulse duration-[6000ms]" />
            <div className="absolute -bottom-10 -left-14 w-56 h-56 rounded-full bg-gradient-to-tr from-blue-400/40 to-teal-400/20 blur-3xl animate-bounce duration-[8000ms] ease-in-out opacity-80" />
            <div className="absolute top-1/3 -left-16 w-24 h-24 rounded-full bg-amber-300/20 blur-xl mix-blend-multiply" />
            <div className="absolute bottom-8 -right-6 w-16 h-16 rounded-full bg-pink-400/30 blur-xl" />
            <div className="relative z-10 w-full flex items-center justify-center">
              {authView === "login" ? (
                <UserLoginForm
                  onSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => setAuthView("register")}
                />
              ) : (
                <UserRegisterForm
                  onSuccess={() => setAuthView("login")}
                  onSwitchToLogin={() => setAuthView("login")}
                />
              )}
            </div>
          </div>
        ) : (
          <>
            <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-11 h-11 object-contain"
                />
                <h1 className="text-3xl font-medium text-slate-900 ml-2">
                  TaskFlow
                </h1>
                <div className="flex items-center gap-2 ml-8 px-3 py-1.5 bg-white border rounded-lg shadow-sm">
                  <Folder size={16} className="text-slate-400" />
                  <select
                    value={currentProjectId || ""}
                    onChange={(e) =>
                      setCurrentProjectId(Number(e.target.value))
                    }
                    className="appearance-none bg-transparent text-sm outline-none cursor-pointer"
                  >
                    {isLoading && <option>Loading...</option>}
                    {projects
                      ?.filter(
                        (p: any) =>
                          p.UserId === currentUserId ||
                          p.userId === currentUserId,
                      )
                      ?.map((p: any) => (
                        <option key={p.Id} value={p.Id}>
                          {p.Name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="p-2 m-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm"
                  title="Create New Project"
                >
                  <span className="text-lg font-bold leading-none select-none">
                    +
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                      U{currentUserId}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:text-red-500 hover:border-red-200 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </header>

            <main className="max-w-[75rem] mx-auto">
              {!currentProjectId ? (
                <div className="flex flex-col items-center py-20">
                  <h2 className="text-2xl font-bold mb-4">
                    You don't have any projects yet
                  </h2>
                  <ProjectForm userId={currentUserId!} onSuccess={() => {}} />
                </div>
              ) : (
                <>
                  <Modal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                    title="Create New Project"
                  >
                    <ProjectForm
                      onSuccess={() => {
                        setIsProjectModalOpen(false);
                      }}
                      userId={currentUserId}
                    />
                  </Modal>
                  <TaskInfo projectId={currentProjectId} />
                  <TaskList projectId={currentProjectId} />
                </>
              )}
            </main>
          </>
        )}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}
