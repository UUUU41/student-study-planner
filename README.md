# 📚 Student Study Planner

A clean, beginner-friendly study planner web app that helps students organise their study tasks by subject, topic, due date and priority — right in the browser, with no sign-up and no server needed.

Tasks are saved in the browser's `localStorage`, so your plan is still there when you come back.

## ✨ Features

- **Add study tasks** with a subject, topic/task name, due date and priority (High / Medium / Low)
- **Form validation** with clear error messages so nothing important is missed
- **Tasks sorted by due date**, with pending tasks shown before completed ones
- **Mark tasks as done / undo** and **delete** tasks you no longer need
- **Priority badges** — colour-coded High (red), Medium (amber) and Low (green)
- **Overdue highlighting** — pending tasks past their due date are highlighted in red, and tasks due today are marked
- **Filters** — view All, Pending or Completed tasks, and filter by subject
- **Progress summary** — see "x of y tasks done" with a percentage progress bar
- **Persistent storage** — everything is saved automatically in `localStorage`
- **Fully responsive** — works nicely on mobile and desktop

## 🚀 How to Run

No installation or build step is needed:

1. Download or clone this repository.
2. Open `index.html` in any modern web browser (double-click the file, or use a simple local server such as VS Code's Live Server extension).

That's it — start adding your study tasks!

## 🛠️ Tech Stack

- **HTML5** — page structure and form
- **CSS3** — modern indigo/teal design, CSS grid, responsive layout
- **Vanilla JavaScript** — all app logic, DOM rendering and `localStorage` persistence (no libraries or frameworks)

## 📁 Project Structure

```
student-study-planner/
├── index.html   # Page structure: header, add-task form, filters, task list, footer
├── style.css    # All styling, priority badges, overdue/done states, responsive rules
├── app.js       # Task logic: add, complete, delete, filter, progress, localStorage
└── README.md    # This file
```

## 🔮 Future Improvements

- Edit an existing task instead of delete-and-re-add
- Reminder notifications before a task is due
- Weekly study timetable view
- Export / import tasks as a JSON or CSV file
- Dark mode toggle
- Drag-and-drop manual ordering of tasks

## 👤 Author

**Chandan Yadav** — BCA student and frontend developer from India.
GitHub: [@UUUU41](https://github.com/UUUU41)
