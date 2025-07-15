import { useEffect, useState } from 'react'
import { supabaseV1 } from '../supabase-client'
import { Header } from '../components/text'

function DBLOGS() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    supabaseV1
    .from("tasks")
    .on("*", (payload) => setLogs((prev) => [payload, ...prev]))
    .subscribe((_status, err) => {
      if (err) alert("Subscription " + err)
    })
  }, [])
  
  return (
    <div className="h-56 aspect-video flex flex-col gap-4">
      <Header heading="Database logs" />
      <div className="overflow-y-auto">
        <ul className="list-disc flex flex-col gap-2 px-5">
        { logs.map((item, index) => {
          return (
            <li key={index}>
              <div>{item.eventType} - <b>{item.table}</b></div>
              <div className="text-xs">{Date(item.commit_timestamp).toString()}</div>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default DBLOGS