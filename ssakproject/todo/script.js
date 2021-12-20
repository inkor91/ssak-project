window.onload = function () {
  rederingTodoList();

  // create 이벤트 처리
  var inputTodo = document.getElementById("input-todo");
  inputTodo.addEventListener("keydown", function (event) {
    var inputText = inputTodo.value;

    if (event.key == "Enter" && inputText) {
      createTodo(inputText);
    }
  });

  var createTodoButton = document.getElementById("create-todo");
  createTodoButton.addEventListener("click", function () {
    var inputText = document.getElementById("input-todo").value;

    if (inputText) {
      createTodo(inputText);
    }
  });

  // todoList 이벤트 위임
  var todoListUl = document.getElementById("todo-list");
  todoListUl.addEventListener("click", function (event) {
    var target = event.target;
    var targetClass = target.getAttribute("class");

    if (targetClass.includes("check-done")) {
      checkItsDone(target); // 완료표시 함수 호출
    } else if (targetClass.includes("update-todo")) {
      updateTodo(target);
    } else if (targetClass.includes("delete-todo")) {
      deleteTodo(target);
    }
  });
};

// todo create
function createTodo(inputText) {
  var todoId = Date.now();

  var todoObject = {
    todoId: todoId,
    todoText: inputText,
    checkDone: false
  };

  // localstorage에 저장
  appendTodoToLocalStorage(todoObject);

  // dom에 추가하기
  appendTodoToDom(todoObject);
  document.getElementById("input-todo").value = "";
}

function appendTodoToLocalStorage(todoObject) {
  var todoData = localStorage.getItem("todoList");

  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  todoData = JSON.parse(localStorage.getItem("todoList"));

  todoData.push(todoObject);

  localStorage.setItem("todoList", JSON.stringify(todoData));
}

function appendTodoToDom(todoObject) {
  // <li class="todo-item">
  //   <span class="check-text-container">
  //     <input type="checkbox" class="check-done" />
  //     <p class="todo-text">밥먹기222</p>
  //   </span>
  //   <span class="update-delete-container">
  //     <i class="update-todo fas fa-pen"></i>
  //     <i class="delete-todo fas fa-trash-alt"></i>
  //   </span>
  // </li>

  // 최상위 li 태그
  var li = document.createElement("li");
  li.setAttribute("id", todoObject.todoId);
  li.setAttribute("class", "todo-item");

  // 체크박스, 텍스트 표시 컨테이너 span
  var checkTextContainerSpan = document.createElement("span");
  checkTextContainerSpan.setAttribute("class", "check-text-container");

  // 체크박스
  var checkDoneInput = document.createElement("input");
  checkDoneInput.setAttribute("type", "checkbox");
  checkDoneInput.setAttribute("class", "check-done");

  // 텍스트 p
  var todoTextP = document.createElement("p");
  todoTextP.setAttribute("class", "todo-text");
  var todoText = document.createTextNode(todoObject.todoText);
  todoTextP.appendChild(todoText);

  checkTextContainerSpan.appendChild(checkDoneInput);
  checkTextContainerSpan.appendChild(todoTextP);

  // 수정, 삭제 아이콘 컨테이너 span
  var updateDeleteContainerSpan = document.createElement("span");
  updateDeleteContainerSpan.setAttribute("class", "update-delete-container");

  // 업데이트 아이콘
  var updateIcon = document.createElement("i");
  updateIcon.setAttribute("class", "fas");
  updateIcon.classList.add("fa-pen");
  updateIcon.classList.add("update-todo");

  // 삭제 아이콘
  var deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas");
  deleteIcon.classList.add("fa-trash-alt");
  deleteIcon.classList.add("delete-todo");

  updateDeleteContainerSpan.appendChild(updateIcon);
  updateDeleteContainerSpan.appendChild(deleteIcon);

  // li에 자식 노드로 추가
  li.appendChild(checkTextContainerSpan);
  li.appendChild(updateDeleteContainerSpan);

  // checkDone에 따른 처리
  if (todoObject.checkDone) {
    checkDoneInput.checked = true;
    todoTextP.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(li);
}

function rederingTodoList() {
  var todoData = localStorage.getItem("todoList");

  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  todoData = JSON.parse(localStorage.getItem("todoList"));

  todoData.forEach((todoObject) => {
    appendTodoToDom(todoObject);
  });
}

// done
function checkItsDone(target) {
  // dom 수정
  checkDoneFromDom(target);

  // localStorage 수정
  checkFromLocalStorage(target);
}

function checkDoneFromDom(target) {
  if (target.checked) {
    target.nextSibling.classList.add("done");
    return;
  }
  target.nextSibling.classList.remove("done");
}

function checkFromLocalStorage(target) {
  var todoId = target.closest("li.todo-item").getAttribute("id");

  var todoData = localStorage.getItem("todoList");
  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  todoData = JSON.parse(localStorage.getItem("todoList"));

  todoData.forEach((todoObject) => {
    if (todoObject.todoId == todoId) {
      todoObject.checkDone = target.checked;
    }
  });

  localStorage.setItem("todoList", JSON.stringify(todoData));
}

// update
function updateTodo(target) {
  var updatedTodoText = prompt("수정 내용");

  // dom 수정
  updateFromDom(target, updatedTodoText);

  // localStorage 수정
  updateFromLocalStorage(target, updatedTodoText);
}

function updateFromDom(target, updatedTodoText) {
  var todoTextP = target.closest("li.todo-item").firstChild.lastChild;
  todoTextP.innerText = updatedTodoText;
}

function updateFromLocalStorage(target, updatedTodoText) {
  var todoId = target.closest("li.todo-item").getAttribute("id");
  var todoData = localStorage.getItem("todoList");
  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  todoData = JSON.parse(localStorage.getItem("todoList"));

  todoData.forEach((todoObject) => {
    if (todoObject.todoId == todoId) {
      todoObject.todoText = updatedTodoText;
    }
  });
  localStorage.setItem("todoList", JSON.stringify(todoData));
}

// delete
function deleteTodo(target) {
  var todoId = target.closest("li.todo-item").getAttribute("id");

  // dom에서 삭제
  deleteFromDom(todoId);

  // localStorage에서 삭제
  deleteFromLocalStorage(todoId);
}

function deleteFromDom(todoId) {
  document.getElementById(todoId).remove();
}

function deleteFromLocalStorage(todoId) {
  var todoData = localStorage.getItem("todoList");
  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  todoData = JSON.parse(localStorage.getItem("todoList"));

  todoData.forEach((todoObject) => {
    if (todoObject.todoId == todoId) {
      var index = todoData.indexOf(todoObject);
      todoData.splice(index, 1);
    }
  });
  localStorage.setItem("todoList", JSON.stringify(todoData));
}
