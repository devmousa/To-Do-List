import { $, component$, useStore, useClientEffect$, JSXChildren } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Swal from 'sweetalert2'
import 'animate.css';

// type 'Data' for our data array
type Data = {
  items: string[]
}

export default component$(() => {

  // make a new store to the constant 'todo' and give it one array 'items'
  const todo = useStore<Data>({
    items: []
  });

  // use 'useClientEffect$' to recieve todo list items from local storage and make sure they are not null
  useClientEffect$(() => {
    const todoItems = localStorage.getItem('todo')
    if(todoItems !== null){
      todo.items = JSON.parse(todoItems)
    }
  })

  // function to notify the user that the item is added successfully
  const notifySuccess = $(() => {
    Swal.fire({
      title: 'Added Successfully',
      html: 'To-Do item was added successfully',
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
    })
  })

  // function to add the new item to the to-do list
  const addItem = $((e: Event) => {
    const addedItem: string = (e.target as HTMLFormElement).addedItem.value;
    todo.items = [...todo.items, addedItem];
    localStorage.setItem('todo', JSON.stringify(todo.items));
    (e.target as HTMLFormElement).addedItem.value = "";
    notifySuccess()
  })

  // function to remove a specific item from to-do list
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
        todo.items !== null ? todo.items = todo.items.filter((_, i) => i !== index) : null;
        localStorage.setItem('todo', JSON.stringify(todo.items));
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

  // the website interface
  return (
    <div>
      <div class="w-screen flex flex-col">
        <div class="w-full fixed flex justify-center z-10 bg-sky-100  py-6">
          <form preventdefault:submit
            onSubmit$={e => addItem(e)}>
            <input class="rounded w-64 md:w-96 p-2 text-sky-900 bg-white outline-none placeholder:text-sky-900 backdrop-blur"
                  id="TodoAdd"
                  type="text"
                  name="addedItem"
                  placeholder="Enter something to do" />

            <button class="transition-all rounded p-2 text-slate-100 hover:text-slate-800 bg-sky-400 hover:bg-sky-200
                            hover:shadow hover:shadow-slate-600 px-4 ml-4 backdrop-blur">
              Add
            </button>
          </form>
        </div>
        <div class="w-full mt-20 flex flex-col items-center overflow-x-hidden overflow-y-auto">
          {
            // take each item in the list and give it certain design
            todo.items?.map(
              (item: String, index: number) => 
              <div contentEditable='true'
                    onFocusout$={(e) => {
                      todo.items![index] = (e.target.textContent as string);
                      localStorage.setItem('todo', JSON.stringify(todo.items));
                    }}
                    class="rounded w-11/12 md:w-1/2 h-fit p-2 mb-4 flex flex-row justify-between items-center text-teal-900 bg-white focus:bg-stone-50 outline-none first:mt-2 backdrop-blur focus:backdrop-blur"
                    key={index}>
                      <p>
                        {item as JSXChildren}
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg"
                          class="rounded w-7 h-7 p-1 cursor-pointer bg-red-600 hover:bg-red-500 text-slate-200"
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
    </div>
  );
});

// simple SEO
export const head: DocumentHead = {
  title: 'Qwik To-Do List',
  meta: [
    {
      name: 'description',
      content: 'simple to-do list app using qwik and tailwindcss',
    },
  ],
};
