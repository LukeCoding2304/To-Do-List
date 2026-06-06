const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const STORAGE_KEY = 'simple_todos_v1';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render(){
  list.innerHTML = '';
  todos.forEach((t,i)=>{
    const li = document.createElement('li');
    li.className = 'todo-item' + (t.done ? ' completed' : '');
    const left = document.createElement('div');
    left.style.display = 'flex'; left.style.alignItems = 'center';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!t.done;
    checkbox.addEventListener('change', ()=>{ todos[i].done = checkbox.checked; save(); render(); });
    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = t.text;
    left.appendChild(checkbox); left.appendChild(span);
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', ()=>{ todos.splice(i,1); save(); render(); });
    li.appendChild(left); li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const value = input.value.trim();
  if(!value) return;
  todos.push({text:value,done:false});
  input.value = '';
  save(); render();
});

render();
