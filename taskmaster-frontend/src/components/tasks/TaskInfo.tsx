import type { Task } from "../../types/taskTypes";
import checkIcon from "../../assets/images/icons8-check-all-48.png";

interface Props {
  task: Task;
}

export default function TaskInfo({ task}: Props) {


  return (
    <div className="flex group cursor-pointer relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md hover:bg-white/80">
      <div className="w-14 flex-none ">
        <img src={checkIcon}  alt="" />
      </div>
      <div className="w-64 flex-auto ">{task.title}</div>
      <div className="w-32 flex-auto ">03</div>
    </div>

  );
}
