import { $, component$, useStore, useClientEffect$, JSXChildren } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Swal from 'sweetalert2'
import 'animate.css';

type Data = {
  data: String[]
}

export default component$(() => {
  const todoData = useStore<Data>({
    data: [] //'hi', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k']
  });

  useClientEffect$(() => {
    const todoItems = localStorage.getItem('todo')
    if(todoItems !== null){
      todoData.data = JSON.parse(todoItems)
    }
  })

  const notify = $(() => {
    Swal.fire({
      title: 'Added Successfully',
      html: 'To-Do item was added successfully',
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
    })
  })

  const addItem = $((e: Event) => {
    const AddedData: String = ((e.target as HTMLFormElement).addedData as HTMLInputElement).value;
    todoData.data = [...todoData.data, AddedData];
    localStorage.setItem('todo', JSON.stringify(todoData.data));
    ((e.target as HTMLFormElement).addedData as HTMLInputElement).value = "";
    notify()
  })

  const removeItem = $((index: number) => {
    Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I finished it!'
    }).then((result) => {
      if(result.isConfirmed) {
        todoData.data = todoData.data.filter((_, i) => i !== index)
        localStorage.setItem('todo', JSON.stringify(todoData.data));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your to-do item has been deleted.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
        })
      }
    })    
  })

  return (
    <div class="w-screen h-screen bg-slate-800 flex flex-col">
      <div class="w-full flex justify-center py-6 shadow-lg shadow-slate-800 z-10">
        <form preventdefault:submit
          onSubmit$={e => addItem(e)}>
          <input class="rounded w-64 md:w-96 p-2 bg-slate-200 text-slate-900 outline-none placeholder:text-slate-500"
                id="TodoAdd"
                type="text"
                name="addedData"
                placeholder="Enter something to do" />

          <button class="transition-all rounded p-2 bg-green-500 hover:bg-green-400
                          hover:shadow hover:shadow-slate-600 px-4 ml-4">
            Add
          </button>
        </form>
      </div>
      <div class="w-full h-full flex flex-col items-center overflow-x-hidden">
        {
          todoData.data.map(
            (item: String, index: number) => 
            <div contentEditable='true'
                  onFocusout$={(e) => {
                    todoData.data[index] = (e.target.textContent as String)
                    localStorage.setItem('todo', JSON.stringify(todoData.data));
                  }}
                  class="rounded w-11/12 md:w-1/2 h-fit p-2 mb-4 flex flex-row justify-between items-center bg-red-50 focus:bg-cyan-50 outline-none first:mt-2"
                  key={index}>
                    <p>
                      {item as JSXChildren}
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="rounded w-7 h-7 p-1 cursor-pointer bg-red-600 hover:bg-red-400 text-slate-200 hover:text-slate-600"
                        viewBox="0 0 512 512"
                        onClick$={() => removeItem(index)}>
                          <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                          <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/>
                          <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                    </svg>
            </div>
          )
        }
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik To-Do List',
  meta: [
    {
      name: 'description',
      content: 'simple to-do list app using qwik and tailwindcss',
    },
  ],
};
