import { useRef, useState } from "react"

export const Input = () => {}
Input.Title = ({ ref, defaultValue }) => <input ref={ref} className="focus:!outline-none border-b-[1px] rounded-xs mb-2 ml-2" placeholder="Title" defaultValue={defaultValue} type="text" name="title" id="title" />
Input.Description = ({ ref, defaultValue }) => <input ref={ref} className="focus:!outline-none border-b-[1px] rounded-xs mb-2 ml-2" placeholder="Description" defaultValue={defaultValue} type="text" name="description" id="description" />
Input.File = ({ btnName, setBtnName }) => {
  const fileInputRef = useRef(null)
  const handleClick = () => () => {
    fileInputRef?.current?.click();
  };
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    setBtnName(file ? "File Uploaded" : "Upload a file");
  };

  return (
    <div className="ml-2 cursor-pointer">
      <Button text={btnName} color="bg-sky-400" onClickFn={handleClick} />
      <input ref={fileInputRef} className="hidden" type="file" accept="image/*" name="file_input" id="file_input" onChange={handleOnChange} />
    </div>
  )
}

Input.Username = ({ ref, defaultValue }) => <input ref={ref} className="focus:!outline-none border-b-[1px] rounded-xs mb-2 ml-2" placeholder="Username" defaultValue={defaultValue} type="email" name="username" id="username" />
Input.Password = ({ ref, defaultValue }) => <input ref={ref} className="focus:!outline-none border-b-[1px] rounded-xs mb-2 ml-2" placeholder="Password" defaultValue={defaultValue} type="password" name="password" id="password" />

export const Button = ({ text, color, onClickFn }) => (<button className={`px-2 rounded-xs w-full text-sm hover:cursor-pointer ${color} text-black`} type="button" onClick={onClickFn()}>{text}</button>)