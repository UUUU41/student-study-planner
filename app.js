// Student Study Planner - tasks are saved in localStorage.
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const subjectInput = document.getElementById('subject-input');
const dateInput = document.getElementById('date-input');
const priorityInput = document.getElementById('priority-input');
const taskList = document.getElementById('task-list');
const summary = document.getElementById('summary');
const filterSubject = document.getElementById('filter-subject');
const hideDone = document.getElementById('hide-done');

let tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');

function save() {
  localStorage.setItem('studyTasks', JSON.stringify(tasks));
}

function isOverdue(task) {
  return !task.done && new Date(task.date) < new Date(new Date().toDateString());
}

function render() {
  const subjects = [...new Set(tasks.map((t) => t.subject))].sort();
  const selected = filterSubject.value;
  filterSubject.innerHTML = '<option value="">All subjects</option>' +
    subjects.map((s) => `<option ${s === selected ? 'selected' : ''}>${s}</option>`).join('');
  const shown = tasks
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((t) => (!selected || t.subject === selected) && !(hideDone.checked && t.done));
  taskList.innerHTML = '';
  shown.forEach((task) => {
    const li = document.createElement('li');
    if (task.done) li.className = 'done';
    const label = document.createElement('span');
    label.textContent = `${task.text} - ${task.subject} - due ${task.date} (${task.priority})`;
    if (isOverdue(task)) label.className = 'overdue';
    const doneBtn = document.createElement('button');
    doneBtn.textContent = task.done ? 'Undo' : 'Complete';
    doneBtn.onclick = () => { task.done = !task.done; save(); render(); };
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => { tasks = tasks.filter((t) => t !== task); save(); render(); };
    li.append(' ', label, ' ', doneBtn, ' ', delBtn);
    taskList.appendChild(li);
  });
  const doneCount = tasks.filter((t) => t.done).length;
  const overdueCount = tasks.filter(isOverdue).length;
  summary.textContent = `${doneCount} of ${tasks.length} tasks complete` +
    (overdueCount ? ` - ${overdueCount} overdue` : '');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tasks.push({
    text: taskInput.value.trim(),
    subject: subjectInput.value.trim(),
    date: dateInput.value,
    priority: priorityInput.value,
    done: false,
  });
  save();
  form.reset();
  render();
});

filterSubject.addEventListener('change', render);
hideDone.addEventListener('change', render);
render();
