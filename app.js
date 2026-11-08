// ===== Student Study Planner — app logic (vanilla JS + localStorage) =====

const STORAGE_KEY = "studyPlannerTasks";

const form = document.getElementById("taskForm");
const subjectInput = document.getElementById("subjectInput");
const topicInput = document.getElementById("topicInput");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const formError = document.getElementById("formError");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const subjectFilter = document.getElementById("subjectFilter");
const progressLabel = document.getElementById("progressLabel");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let statusFilter = "all"; // "all" | "pending" | "completed"

// ---------- Storage ----------
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Helpers ----------
function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}

function isOverdue(task) {
  return !task.done && task.dueDate < todayString();
}

function formatDate(isoDate) {
  const parts = isoDate.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function sortedTasks(list) {
  return list.slice().sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1; // pending first
    return a.dueDate.localeCompare(b.dueDate);      // earliest due first
  });
}

// ---------- Rendering ----------
function renderSubjectFilter() {
  const subjects = [...new Set(tasks.map(t => t.subject))].sort();
  const current = subjectFilter.value;
  subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);
  });
  // Keep the previous selection if that subject still exists
  subjectFilter.value = subjects.includes(current) ? current : "all";
}

function renderProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  progressLabel.textContent = done + " of " + total + (total === 1 ? " task" : " tasks") + " done";
  progressPercent.textContent = percent + "%";
  progressFill.style.width = percent + "%";
}

function visibleTasks() {
  return sortedTasks(tasks).filter(task => {
    if (statusFilter === "pending" && task.done) return false;
    if (statusFilter === "completed" && !task.done) return false;
    if (subjectFilter.value !== "all" && task.subject !== subjectFilter.value) return false;
    return true;
  });
}

function render() {
  renderSubjectFilter();
  renderProgress();

  const visible = visibleTasks();
  taskList.innerHTML = "";

  visible.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-card" + (task.done ? " done" : "") + (isOverdue(task) ? " overdue" : "");

    const main = document.createElement("div");
    main.className = "task-main";

    const topic = document.createElement("p");
    topic.className = "task-topic";
    topic.textContent = task.topic;

    const badge = document.createElement("span");
    badge.className = "badge badge-" + task.priority.toLowerCase();
    badge.textContent = task.priority;
    topic.appendChild(badge);

    const meta = document.createElement("p");
    meta.className = "task-meta";
    const subjectBadge = document.createElement("span");
    subjectBadge.className = "badge badge-subject";
    subjectBadge.textContent = task.subject;
    meta.appendChild(subjectBadge);

    const due = document.createElement("span");
    due.textContent = " Due: " + formatDate(task.dueDate);
    if (isOverdue(task)) {
      due.className = "due-overdue";
      due.textContent += " (Overdue!)";
    } else if (!task.done && task.dueDate === todayString()) {
      due.textContent += " (Today)";
    }
    meta.appendChild(due);

    main.appendChild(topic);
    main.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = task.done ? "btn-undo" : "btn-done";
    toggleBtn.textContent = task.done ? "↩ Undo" : "✓ Done";
    toggleBtn.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "🗑 Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(main);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  // Empty state messages
  if (tasks.length === 0) {
    emptyState.textContent = "No tasks yet. Add your first study task above and get started! 🎯";
    emptyState.style.display = "block";
  } else if (visible.length === 0) {
    emptyState.textContent = "No tasks match the current filters. Try a different filter above.";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

// ---------- Actions ----------
function addTask(subject, topic, dueDate, priority) {
  tasks.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    subject: subject,
    topic: topic,
    dueDate: dueDate,
    priority: priority,
    done: false,
    createdAt: new Date().toISOString()
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// ---------- Events ----------
form.addEventListener("submit", event => {
  event.preventDefault();
  const subject = subjectInput.value.trim();
  const topic = topicInput.value.trim();
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  if (!subject) {
    formError.textContent = "Please enter a subject.";
    subjectInput.focus();
    return;
  }
  if (!topic) {
    formError.textContent = "Please enter the topic or task name.";
    topicInput.focus();
    return;
  }
  if (!dueDate) {
    formError.textContent = "Please choose a due date.";
    dateInput.focus();
    return;
  }
  formError.textContent = "";
  addTask(subject, topic, dueDate, priority);
  form.reset();
  priorityInput.value = "Medium";
  subjectInput.focus();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    statusFilter = btn.dataset.status;
    render();
  });
});

subjectFilter.addEventListener("change", render);

// ---------- Start ----------
render();
