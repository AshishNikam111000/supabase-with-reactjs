import { useState } from "react";
import { Input } from "../components/form";
import { supabase } from "../supabase-client";

export const TaskForm = ({ submitTrigger, setSubmitTrigger }) => {
  const [btnName, setBtnName] = useState("Upload a file")
  
  async function onAddTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const title = formData.get("title")
    const description = formData.get("description")
    const file = formData.get("file_input");

    const filePath = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from("task-bucket").upload(filePath, file, { contentType: file.type })
    
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("task-bucket").getPublicUrl(filePath)

      if (title.trim() === "") alert("Title is empty")
      else {
        const { error } = await supabase.from("tasks").insert({ title, description, image: {url: publicUrl, path: filePath} }).single()
        if (!error) alert("Task added successfully")
        else alert("Failed to add task")
      }
      setSubmitTrigger(!submitTrigger)
    } else alert("Failed to upload file")
    setBtnName("Upload a file")
    e.target.reset()
  }

  return (
    <form className="flex flex-col items-center" method="post" onSubmit={onAddTask}>
      <table>
        <tbody>
          <tr><td>Title :</td><td><Input.Title /></td></tr>
          <tr><td>Description :</td><td><Input.Description /></td></tr>
          <tr><td>Reference Image :</td><td><Input.File btnName={btnName} setBtnName={setBtnName} /></td></tr>
        </tbody>
      </table>
      <button className="mt-3 self-end w-fit px-2 rounded-xs hover:cursor-pointer bg-emerald-600 text-black" type="submit">Add Task</button>
    </form>
  )
}

export const SignInOrUpForm = ({ isSignUp, setIsSignUp }) => {
  async function onSignInOrUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const password = formData.get("password")

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email: username, password })
      if (!error) alert("Sign up successful")
      else alert("Failed to signing up")
      setIsSignUp(false)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: username, password })
      if (!error) alert("Login successful")
      else alert("Login failed: Invalid credentials")
    }
    e.target.reset()
  }

  return (
    <form className="flex flex-col items-center" method="post" onSubmit={onSignInOrUp}>
      <Input.Username />
      <Input.Password />
      <button className="mt-3 self-end w-fit px-2 rounded-xs hover:cursor-pointer bg-emerald-600 text-black" type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
    </form>
  )
}