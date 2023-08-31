import React from "react";

import { notFound } from "next/navigation";
type PageProps = {
  params: {
    todoId: string;
  };
};

const fetchTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  );
  //   if (!res.ok) {
  //     throw new Error("Ticket not found");
  //   }
  const todo = res.json();
  return todo;
};
async function page({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId);
  console.log(todo);
  if (!todo.id) return notFound();

  return (
    <div>
      <p>{todoId}</p>
      <p>
        {todo.id} - {todo.title}
      </p>
    </div>
  );
}

export default page;

// Static Site Generation
export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  const trimmedTodos = todos.splice(0, 10);

  return trimmedTodos.map((todo: { id: string }) => ({
    todoId: todo.id.toString(),
  }));
  // [{todo:Id: '1}, {todoId: '2'}]
}
