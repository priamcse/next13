import Link from "next/link";
import React from "react";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  return todos;
};

async function TodosList() {
  const todos = await fetchTodos();
  //   console.log(todos);
  return (
    <div>
      {todos.map((todo: { id: number; title: string }) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
        </p>
      ))}
    </div>
  );
}

export default TodosList;
