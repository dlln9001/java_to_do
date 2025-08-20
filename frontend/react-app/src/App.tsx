import { useState, useEffect } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const base_url: string = "http://localhost:8080"

  useEffect(() => {
    fetch(base_url + "/tasks", {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setTodos(data))

  }, [])

  const addTodo = () => {
    if (newTodo.trim() === '') return
    
    fetch(base_url + "/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": newTodo,
        "completed": false
      })
    })
    .then(res => res.json())
    .then(data => {
      setTodos([...todos, { id: data.id, title: data.title, completed: data.completed }])
    }
)

    setNewTodo('')
  }

  const deleteTodo = (id: number) => {
    
    fetch(base_url + `/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        setTodos(todos.filter(todo => todo.id !== id))
      }
    })
  }

  const toggleTodo = (new_todo: Todo) => {

    fetch(base_url + `/tasks/${new_todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": new_todo.title,
        "completed": !new_todo.completed
      })
    })
    .then(res => {
       if (res.ok) {
         setTodos(todos.map(todo =>
           todo.id === new_todo.id ? { ...todo, completed: !todo.completed } : todo
         ))
       }
    })
    
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>

        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} className="cursor-pointer">Add</Button>
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <Card key={todo.id}>
              <CardContent className="px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo)}
                  />
                  <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                    {todo.title}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App