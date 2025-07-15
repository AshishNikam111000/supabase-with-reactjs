import { useMemo, useState } from "react";
import { Header } from "../components/text";
import { TaskForm } from "../features/form";
import { IndividualTask } from "../features/text";
import { supabase } from "../supabase-client";
import { Logout } from "./auth";
import DBLOGS from "./db_logs";

function TaskManager(props) {
  const [data, setData] = useState([]);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  
  useMemo(async () => {
    const { data: supadata } = await supabase.from("tasks").select("*").order("id", { ascending: true });
    if (supadata.length != 0) setData(supadata)
    else setData(false)
  }, [submitTrigger]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Logout {...props} />
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4 justify-center w-fit h-fit px-3 pr-10 border-r-2">
          <Header heading="Task Manager" />
          <TaskForm submitTrigger={submitTrigger} setSubmitTrigger={setSubmitTrigger} />
        </div>
        <div className="w-fit h-60 flex flex-col gap-4 justify-center px-3 pl-10">
          <Header heading="List of tasks" />
          <div className="overflow-y-auto overflow-x-hidden">
            { data
              ? data.map((item, index) => <IndividualTask key={index} index={index} data={item} submitTrigger={submitTrigger} setSubmitTrigger={setSubmitTrigger} />)
              : <div className="text-emerald-600">Hooray!!! All tasks done.</div> 
            }
          </div>
        </div>
      </div>
      <DBLOGS />
    </div>
  );
}

export default TaskManager;