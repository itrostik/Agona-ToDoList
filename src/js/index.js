function ready() {
  const addTaskButton = document.querySelector(".main__addTask-button");
  const inputTask = document.querySelector(".main__addTask-input");
  const tasksItems = document.querySelector(".main__tasks");

  addTaskButton.classList.add("disabled");
  addTaskButton.setAttribute("disabled", "disabled");

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    localStorage.setItem("tasks", "[]");
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  inputTask.addEventListener("input", () => {
    if (inputTask.value.length > 0) {
      addTaskButton.classList.remove("disabled");
      addTaskButton.removeAttribute("disabled");
    } else {
      addTaskButton.classList.add("disabled");
      addTaskButton.setAttribute("disabled", "disabled");
    }
  });

  addTaskButton.addEventListener("click", () => {
    if (inputTask.value.length > 0) {
      const task = {
        id: tasks.length,
        text: inputTask.value,
        done: false,
      };
      tasks.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
    }
  });

  let tasksHTMLString = "";

  for (let i = 0; i < tasks.length; i++) {
    const valueId = tasks[i].id;
    if (tasks[i].done) {
      tasksHTMLString +=
        '<div class="main__tasks-block task-block task__done"><p class="task-block__text">' +
        tasks[i].text +
        '</p><div class="task-block__buttons"><div class="task-button__done"><img src="./img/check.svg" alt="" /></div><div class="task-button__delete" id="' +
        valueId +
        '"><img src="./img/times.svg" alt="" /></div></div></div>';
    } else {
      tasksHTMLString +=
        '<div class="main__tasks-block task-block"><p class="task-block__text">' +
        tasks[i].text +
        '</p><div class="task-block__buttons"><div class="task-button__done"><img src="./img/check.svg" alt="" /></div><div class="task-button__delete" id="' +
        valueId +
        '"><img src="./img/times.svg" alt="" /></div></div></div>';
    }
  }

  tasksItems.innerHTML = tasksHTMLString;

  const deleteTaskButtons = document.querySelectorAll(".task-button__delete");

  deleteTaskButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.target.parentNode.parentNode.parentNode.remove();
      tasks = tasks.filter((item) => item.id !== +event.target.parentNode.id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });

  const doneTaskButtons = document.querySelectorAll(".task-button__done");

  doneTaskButtons.forEach((doneButton) => {
    doneButton.addEventListener("click", (event) => {
      tasks.forEach((item) => {
        if (item.id === +event.target.parentNode.id) {
          item.done = true;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.target.parentNode.parentNode.parentNode.classList.add("task__done");
    });
  });
}

document.addEventListener("DOMContentLoaded", ready());
