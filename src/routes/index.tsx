import { $, component$, useStore, useClientEffect$, JSXChildren } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Swal from 'sweetalert2'
import 'animate.css';

import DragonScales from '~/svg/dragon-scales.svg'

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
      <div class="fixed h-screen w-screen">
        {/* <svg class="scale-105" xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 800 400'><rect fill='#330000' width='800' height='400'/><defs><radialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'><stop  offset='0' stop-color='#D18'/><stop  offset='1' stop-color='#330000'/></radialGradient><linearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'><stop offset='0'  stop-color='#FA3' stop-opacity='0'/><stop offset='1'  stop-color='#FA3' stop-opacity='0.5'/></linearGradient></defs><rect fill='url(#a)' width='800' height='400'/><g fill-opacity='0.4'><circle fill='url(#b)' cx='267.5' cy='61' r='300'/><circle fill='url(#b)' cx='532.5' cy='61' r='300'/><circle fill='url(#b)' cx='400' cy='30' r='300'/></g></svg> */}
        {/* <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#F4FF4A' width='1600' height='800'/><g fill-opacity='1'><path fill='#fdff3b'  d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/><path fill='#fff62c'  d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/><path fill='#ffe91e'  d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/><path fill='#ffdb0f'  d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/><path fill='#ffcc00'  d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/><path fill='#ffd914'  d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/><path fill='#ffe529'  d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/><path fill='#ffef3d'  d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/><path fill='#fff852'  d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/><path fill='#ffff66'  d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/></g></svg> */}
        {/* <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#330000' width='1600' height='800'/><g fill-opacity='1'><path fill='#57010b'  d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/><path fill='#7a041f'  d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/><path fill='#9c073b'  d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/><path fill='#bd0b5e'  d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/><path fill='#DD1188'  d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/><path fill='#e40ed1'  d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/><path fill='#b40aea'  d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/><path fill='#6b07f1'  d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/><path fill='#1c04f8'  d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/><path fill='#003BFF'  d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/></g></svg> */}
        {/* <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 100 60'><rect fill='#cc5577' width='100' height='60'/><g fill-opacity='1'><rect  fill='#cc5577' width='11' height='11'/><rect  fill='#ce5776' x='10' width='11' height='11'/><rect  fill='#d05a76' y='10' width='11' height='11'/><rect  fill='#d15c75' x='20' width='11' height='11'/><rect  fill='#d35f74' x='10' y='10' width='11' height='11'/><rect  fill='#d46174' y='20' width='11' height='11'/><rect  fill='#d66473' x='30' width='11' height='11'/><rect  fill='#d76673' x='20' y='10' width='11' height='11'/><rect  fill='#d96972' x='10' y='20' width='11' height='11'/><rect  fill='#da6c72' y='30' width='11' height='11'/><rect  fill='#db6e71' x='40' width='11' height='11'/><rect  fill='#dc7171' x='30' y='10' width='11' height='11'/><rect  fill='#dd7471' x='20' y='20' width='11' height='11'/><rect  fill='#de7671' x='10' y='30' width='11' height='11'/><rect  fill='#df7971' y='40' width='11' height='11'/><rect  fill='#e07c71' x='50' width='11' height='11'/><rect  fill='#e17e71' x='40' y='10' width='11' height='11'/><rect  fill='#e28171' x='30' y='20' width='11' height='11'/><rect  fill='#e38471' x='20' y='30' width='11' height='11'/><rect  fill='#e38771' x='10' y='40' width='11' height='11'/><rect  fill='#e48972' y='50' width='11' height='11'/><rect  fill='#e58c72' x='60' width='11' height='11'/><rect  fill='#e58f73' x='50' y='10' width='11' height='11'/><rect  fill='#e69173' x='40' y='20' width='11' height='11'/><rect  fill='#e69474' x='30' y='30' width='11' height='11'/><rect  fill='#e79775' x='20' y='40' width='11' height='11'/><rect  fill='#e79a75' x='10' y='50' width='11' height='11'/><rect  fill='#e89c76' x='70' width='11' height='11'/><rect  fill='#e89f77' x='60' y='10' width='11' height='11'/><rect  fill='#e8a278' x='50' y='20' width='11' height='11'/><rect  fill='#e9a47a' x='40' y='30' width='11' height='11'/><rect  fill='#e9a77b' x='30' y='40' width='11' height='11'/><rect  fill='#e9aa7c' x='20' y='50' width='11' height='11'/><rect  fill='#e9ac7e' x='80' width='11' height='11'/><rect  fill='#eaaf7f' x='70' y='10' width='11' height='11'/><rect  fill='#eab281' x='60' y='20' width='11' height='11'/><rect  fill='#eab482' x='50' y='30' width='11' height='11'/><rect  fill='#eab784' x='40' y='40' width='11' height='11'/><rect  fill='#eaba86' x='30' y='50' width='11' height='11'/><rect  fill='#ebbc88' x='90' width='11' height='11'/><rect  fill='#ebbf8a' x='80' y='10' width='11' height='11'/><rect  fill='#ebc18c' x='70' y='20' width='11' height='11'/><rect  fill='#ebc48e' x='60' y='30' width='11' height='11'/><rect  fill='#ebc790' x='50' y='40' width='11' height='11'/><rect  fill='#ebc992' x='40' y='50' width='11' height='11'/><rect  fill='#ebcc94' x='90' y='10' width='11' height='11'/><rect  fill='#ebce97' x='80' y='20' width='11' height='11'/><rect  fill='#ebd199' x='70' y='30' width='11' height='11'/><rect  fill='#ecd39c' x='60' y='40' width='11' height='11'/><rect  fill='#ecd69e' x='50' y='50' width='11' height='11'/><rect  fill='#ecd8a1' x='90' y='20' width='11' height='11'/><rect  fill='#ecdba4' x='80' y='30' width='11' height='11'/><rect  fill='#ecdda6' x='70' y='40' width='11' height='11'/><rect  fill='#ece0a9' x='60' y='50' width='11' height='11'/><rect  fill='#ede2ac' x='90' y='30' width='11' height='11'/><rect  fill='#ede4af' x='80' y='40' width='11' height='11'/><rect  fill='#ede7b2' x='70' y='50' width='11' height='11'/><rect  fill='#ede9b5' x='90' y='40' width='11' height='11'/><rect  fill='#eeecb8' x='80' y='50' width='11' height='11'/><rect  fill='#EEB' x='90' y='50' width='11' height='11'/></g></svg> */}
        {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='#330055' width='100' height='100'/><g fill-opacity='1'><circle  fill='#330055' cx='50' cy='0' r='50'/><g fill='#3a015d' ><circle cx='0' cy='50' r='50'/><circle cx='100' cy='50' r='50'/></g><circle  fill='#410165' cx='50' cy='100' r='50'/><g fill='#48026e' ><circle cx='0' cy='150' r='50'/><circle cx='100' cy='150' r='50'/></g><circle  fill='#500376' cx='50' cy='200' r='50'/><g fill='#57047e' ><circle cx='0' cy='250' r='50'/><circle cx='100' cy='250' r='50'/></g><circle  fill='#5f0587' cx='50' cy='300' r='50'/><g fill='#67068f' ><circle cx='0' cy='350' r='50'/><circle cx='100' cy='350' r='50'/></g><circle  fill='#6f0798' cx='50' cy='400' r='50'/><g fill='#7707a0' ><circle cx='0' cy='450' r='50'/><circle cx='100' cy='450' r='50'/></g><circle  fill='#8008a9' cx='50' cy='500' r='50'/><g fill='#8909b1' ><circle cx='0' cy='550' r='50'/><circle cx='100' cy='550' r='50'/></g><circle  fill='#9109ba' cx='50' cy='600' r='50'/><g fill='#9a09c3' ><circle cx='0' cy='650' r='50'/><circle cx='100' cy='650' r='50'/></g><circle  fill='#a309cb' cx='50' cy='700' r='50'/><g fill='#ad09d4' ><circle cx='0' cy='750' r='50'/><circle cx='100' cy='750' r='50'/></g><circle  fill='#b608dc' cx='50' cy='800' r='50'/><g fill='#c007e5' ><circle cx='0' cy='850' r='50'/><circle cx='100' cy='850' r='50'/></g><circle  fill='#c905ee' cx='50' cy='900' r='50'/><g fill='#d303f6' ><circle cx='0' cy='950' r='50'/><circle cx='100' cy='950' r='50'/></g><circle  fill='#D0F' cx='50' cy='1000' r='50'/></g></svg> */}
        {/* <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#828A95' width='1600' height='800'/><g fill-opacity='1'><path fill='#889cb1'  d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/><path fill='#93b0ca'  d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/><path fill='#a2c4dd'  d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/><path fill='#b6d8ec'  d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/><path fill='#CEEAF7'  d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/><path fill='#cde6f4'  d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/><path fill='#cce2f0'  d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/><path fill='#ccdeed'  d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/><path fill='#ccdae8'  d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/><path fill='#CCD7E4'  d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/></g></svg> */}
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><rect fill='#000000' width='1600' height='800'/><g fill-opacity='1'><polygon  fill='#220000' points='1600 160 0 460 0 350 1600 50'/><polygon  fill='#440000' points='1600 260 0 560 0 450 1600 150'/><polygon  fill='#660000' points='1600 360 0 660 0 550 1600 250'/><polygon  fill='#880000' points='1600 460 0 760 0 650 1600 350'/><polygon  fill='#A00' points='1600 800 0 800 0 750 1600 450'/></g></svg>
      </div>
      <div class="w-screen h-screen relative flex flex-col">
        <div class="w-full flex justify-center py-6">
          <form preventdefault:submit
            onSubmit$={e => addItem(e)}>
            <input class="rounded w-64 md:w-96 p-2 text-slate-100 bg-slate-100 outline-none placeholder:text-slate-100 bg-opacity-40 backdrop-blur"
                  id="TodoAdd"
                  type="text"
                  name="addedItem"
                  placeholder="Enter something to do" />

            <button class="transition-all rounded p-2 text-slate-100 hover:text-slate-800 bg-slate-200 hover:bg-green-400
                            hover:shadow hover:shadow-slate-600 px-4 ml-4 bg-opacity-40 backdrop-blur">
              Add
            </button>
          </form>
        </div>
        <div class="w-full h-full flex flex-col items-center overflow-x-hidden">
          {
            // take each item in the list and give it certain design
            todo.items?.map(
              (item: String, index: number) => 
              <div contentEditable='true'
                    onFocusout$={(e) => {
                      todo.items![index] = (e.target.textContent as string);
                      localStorage.setItem('todo', JSON.stringify(todo.items));
                    }}
                    class="rounded w-11/12 md:w-1/2 h-fit p-2 mb-4 relative text-slate-100 bg-red-50 focus:bg-cyan-50 outline-none first:mt-2 bg-opacity-40 backdrop-blur focus:bg-opacity-40 focus:backdrop-blur whitespace-pre-wrap"
                    key={index}>
                      <p class="mr-8">
                        {item as JSXChildren}
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg"
                          class="rounded w-7 h-7 p-1 cursor-pointer bg-red-600 hover:bg-red-500 text-slate-200
                                  absolute top-1 right-1"
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
