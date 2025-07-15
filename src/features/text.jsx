import { useRef, useState } from "react";
import { Button, Input } from "../components/form";
import { supabase } from "../supabase-client";

export const IndividualTask = ({ index, data, submitTrigger, setSubmitTrigger }) => {
  const [isEditable, setIsEditable] = useState(false);

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  async function onEditTask(id) {
    if (isEditable) {
      if (titleRef.current.value.trim() === "") alert("Title is empty")
      else {
        const { error } = await supabase.from("tasks").update({ title: titleRef.current.value, description: descriptionRef.current.value }).eq("id", id)
        if (!error) alert("Task updated successfully")
        else alert("Failed to update task")
        setIsEditable(false)
      }
    } else {
      setIsEditable(true)
    }
    setSubmitTrigger(!submitTrigger)
  }
  async function onDeleteTask(id) {
    if (isEditable) {
      setIsEditable(false)
    } else {
      const { error: storeError } = await supabase.storage.from("task-bucket").remove([data.image.path])
      if (!storeError) {
        alert("Image deleted from store successfully")
        const { error } = await supabase.from("tasks").delete().eq("id", id)
        if (!error) alert("Task deleted successfully")
        else alert("Failed to delete task")
      }
      else alert("Failed to delete image from store")
    }
    setSubmitTrigger(!submitTrigger)
  }
  
  return (
    <div key={index} className="flex gap-10 justify-between items-start mb-4 mr-4">
      <div className="flex items-baseline">
        <div>{index+1}. </div>
        <div className="grow">
          {isEditable ? <div><Input.Title ref={titleRef} defaultValue={data.title} /></div> : <div className="text-xl">{data.title}</div>}
          {isEditable ? <div><Input.Description ref={descriptionRef} defaultValue={data.description} /></div> : <div className="text-xs w-48 wrap-anywhere hyphens-auto">{data.description}</div>}
          <img className="h-12 aspect-video" src={data.image.url} alt="Image" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Button text={isEditable ? "Update" : "Edit"} color="bg-gray-400" onClickFn={() => () => onEditTask(data.id)} />
        <Button text={isEditable ? "Cancel" : "Delete"} color="bg-red-400" onClickFn={() => () => onDeleteTask(data.id)} />
      </div>
    </div>
  )
}