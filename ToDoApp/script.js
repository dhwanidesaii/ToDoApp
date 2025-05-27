function getFormattedDate(type) {
  const today = new Date();
  let targetDate = new Date(today);
  if (type === 'yesterday') targetDate.setDate(today.getDate() - 1);
  if (type === 'tomorrow') targetDate.setDate(today.getDate() + 1);

  const key = targetDate.toISOString().split('T')[0];

  const label = (type === 'today') ? "Today" :
                (type === 'yesterday') ? "Yesterday" :
                (type === 'tomorrow') ? "Tomorrow" :
                key;

  return { key, label };
}

function createNoteIfNotExist(type) {
  const { key, label } = getFormattedDate(type);
  if (!document.getElementById(key)) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.id = key;

    const title = document.createElement('h3');
    title.textContent = `🗓️ ${label}`;

    const taskList = document.createElement('div');
    taskList.className = 'task-list';

    note.appendChild(title);
    note.appendChild(taskList);
    document.getElementById('notesContainer').appendChild(note);
  }
}

function addTask(dayType) {
  const input = document.getElementById('taskInput');
  const tag = document.getElementById('tagSelect').value;
  const taskText = input.value.trim();
  if (taskText === '') return;

  createNoteIfNotExist(dayType);

  const { key } = getFormattedDate(dayType);
  const note = document.getElementById(key).querySelector('.task-list');

  const task = document.createElement('div');
  task.className = 'task-item';
  task.innerHTML = `
    <div>
      ${taskText}
      <div class="tag-label">#${tag}</div>
    </div>
  `;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => task.classList.toggle('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => task.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  task.appendChild(actions);
  note.appendChild(task);

  input.value = '';
}

function clearAll() {
  document.getElementById('notesContainer').innerHTML = '';
}
