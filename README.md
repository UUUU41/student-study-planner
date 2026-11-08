# Student Study Planner

A study planner web app to add subjects, tasks and deadlines.

## Features

- Add subjects with a colour for easy identification
- Add study tasks with a subject, due date and priority
- Mark tasks as complete and delete finished or unwanted tasks
- See upcoming deadlines at a glance, sorted by due date
- Filter tasks by subject or show only incomplete tasks
- Progress summary showing how many tasks are done
- Data saved in the browser with localStorage, so tasks survive a refresh

## Tech Stack

- HTML5 - structure and forms
- CSS3 - layout, responsive design and styling
- JavaScript - task management, filtering and localStorage
- No build tools, frameworks or server required

## How to Run / Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/UUUU41/student-study-planner.git
   cd student-study-planner
   ```

2. Open `index.html` in any modern web browser, or serve the folder:

   ```bash
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

3. Type a task, choose a subject and a due date, then click Add Task. Tick the checkbox to complete a task, or use Delete to remove it.

## Project Structure

```text
student-study-planner/
- index.html   (page structure and forms)
- app.js       (task logic, filtering and localStorage)
- README.md    (project documentation)
```

## Future Improvements

- Add reminders and a study timer (Pomodoro)
- Add a weekly calendar view
- Add subject-wise progress charts
- Sync tasks across devices with a backend
- Export tasks to CSV or PDF

## Author

Chandan Yadav (UUUU41) - https://github.com/UUUU41
