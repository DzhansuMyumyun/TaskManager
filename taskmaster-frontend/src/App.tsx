import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import { useProjects } from "./features/projects/useProjects";
import TaskList from "./components/tasks/TaskList";
import TaskInfo from "./components/tasks/TaskInfo";
import { Toaster } from 'react-hot-toast';
// @ts-ignore
import logo from './assets/images/logo.png';
import UserRegisterForm from "./components/user/userRegisterForm";
import UserLoginForm from "./components/user/userLoginForm";
import ProjectForm from "./components/project/projectForm";
import { useUser } from "./features/user/useUser";
import type { User } from "./types/user";


export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(undefined);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(undefined);
  const { data: projects, isLoading } = useProjects(!!token, currentUserId);
  const { data: users } = useUser<User[]>(!!token);
  console.log("=== RUNTIME DEBUG ===", { token, isLoading, projectsLength: projects?.length, projectsData: projects });

useEffect(() => {
  if (isLoading || !projects || projects.length === 0 || !currentUserId) return;

  console.log("Projects data arrived! Here it is:", projects);

  if (currentProjectId === undefined) {
    const myFirstProject = projects.find((p: any) => p.userId === currentUserId || p.UserId === currentUserId);

    if (myFirstProject) {
      const resolvedId = (myFirstProject as any).Id || (myFirstProject as any).id;
      setCurrentProjectId(resolvedId);
    } else {
      setCurrentProjectId(undefined);
    }
  }
}, [projects, currentProjectId, isLoading, currentUserId]);

  useEffect(()=>{
    if (!users || !token || !userEmail) return;   

    console.log("Current tracking email:", userEmail);
    console.log("User array state:", users);

      const loggedUserEmail = localStorage.getItem("userEmail");
      const userList = Array.isArray(users) ? users : (users as any)?.Data || []; 
      console.log(loggedUserEmail);

      const currentUser = userList.find(
        (u: any) => u.Email?.toLowerCase() === userEmail.toLowerCase()
      );      
      
      console.log("Found User:", currentUser);
      if (userList.length > 0) {


          if (currentUser) {
            setCurrentUserId(currentUser.Id);
            console.log("3. Final Success! Found User ID:", currentUser.Id);
          }
        }
      }, [token, users, userEmail]);

  const handleLoginSuccess = (newToken: string,email: string) => {
    
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);

    setToken(newToken);
    setUserEmail(email);
  };

  return (
<div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-[75rem] mx-auto space-y-10">
        {!token ? (
          <div className="flex flex-col gap-4">
            <UserLoginForm onSuccess={handleLoginSuccess} />
            <UserRegisterForm onSuccess={() => {}}/>
          </div>
        ) : (
          <>
            <header className="-mb-6 -mt-6 max-w-[75rem] mx-auto flex items-center">
              <img src={logo} alt="Logo" className="w-11 h-11 object-contain" />
              <h1 className="text-3xl font-medium text-slate-900 ml-2">TaskFlow</h1>
              <div className="flex items-center gap-2 ml-8 px-3 py-1.5 bg-white border rounded-lg shadow-sm">
                <Folder size={16} className="text-slate-400" />
                <select 
                  value={currentProjectId || ""}
                  onChange={(e) => setCurrentProjectId(Number(e.target.value))}
                  className="appearance-none bg-transparent text-sm outline-none cursor-pointer"
                >
                  {isLoading && <option>Loading...</option>}
                  {projects
                    ?.filter((p: any) => p.UserId === currentUserId || p.userId === currentUserId)
                    ?.map((p: any) => (
                      <option key={p.Id} value={p.Id}>{p.Name}</option>
                    ))
                  }
                </select>
              </div>
            </header>

            <main className="max-w-[75rem] mx-auto">
              {!currentProjectId ? (
                  <div className="flex flex-col items-center py-20">
                    <h2 className="text-2xl font-bold mb-4">You don't have any projects yet</h2>
                    <ProjectForm 
                      userId={currentUserId!} 
                      onSuccess={() => {}} 
                    />
                  </div>
                ) : (
                  <>
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