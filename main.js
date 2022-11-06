/* Mendeklarasikan custom event untuk memunculkan yang harus dilakukan,
checkButoon, undoButtn, dan segala hal yang belum muncul di web */
const RENDER_EVENT = "render-todo";
// array ini akan di isi oleh todoObject yang berisi inputan dari user
const todos = [];

// event untuk memmuat seluruh document html mejadi DOM yang utuh.
document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan element form dengan ID form.
  const submitForm = document.getElementById("form");
  // Menerapkan event Submit pada form (yang akan terjadi ketika tombol submit pada form ditekan.)
  submitForm.addEventListener("submit", function (event) {
    // Mencegah hilangnya data saat web memuat ulang.
    event.preventDefault();
    // fungsi utama, function untuk menambahkan Todo baru
    addTodo();
  });

  // Membuat deklarasi fungsi dari addTodo.
  function addTodo() {
    // Mendapatkan nilai dari element yang berisi inputan user.
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
    //fungsi untuk mendapatkan id unik untuk setiap element todo.
    const generatedID = generatedId();

    // ini adalah object yang digunakan sebagai wadah dari nilai yang di input oleh user.
    const todoObject = generateTodoObject(
      generatedID,
      textTodo,
      timestamp,
      false
    );
    // object yang berfungsi sebagai wadah akan dimasukan ke dalam array( data dari object disimpan).
    todos.push(todoObject);
    // event ini yang akan menampilkan segala yang di buat.
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // ini adalah deklarasi fungsi yang membuat Id unik(mengkonversikan date menajdi angka unik dengan [+])
  function generatedId() {
    return +new Date();
  }

  // deklarasi dari function todoObject dimana dia akan mengembalikan seluruh nilai dari parameter todoObject.
  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  document.addEventListener(RENDER_EVENT, function () {
    // Menangkap data yang ada pada element todos.
    const uncompletedTODOList = document.getElementById("todos");
    // Memastikan data kosong agar tidak terjadi duplikai data.
    uncompletedTODOList.innerHTML = "";
    const completedTODOList = document.getElementById("completed-todos");
    completedTODOList.innerHTML = "";

    // Memasukan array todos ke dalam todoitem(disini sudah berubah menjadi bentuk object saja bukan array lagi.)
    for (const todoItem of todos) {
      // Setiap iterasi akan membuat satu element DOM.
      // Memasukan  pada variabel DOM yang sudah ada pada tampilan web
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) 
        uncompletedTODOList.append(todoElement);
       else 
        // tods yang telah selesai
        completedTODOList.append(todoElement);
      }
      // console.log(todoItem);
      // console.log(todos)
    }
  );

  // fungsi untuk membuat todo baru, degan mengambil data dari  todoObject
  function makeTodo(todoObject) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.task;

    const textTimestime = document.createElement("p");
    textTimestime.innerText = todoObject.timestamp;

    // Membuat pembungkus dalam untuk judul dan waktu todo.
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimestime);

    // Membuat pembungkus luar untuk textContainer.
    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");

      undoButton.addEventListener("click", function () {
        undoTaskFromCompleted(todoObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");

      trashButton.addEventListener("click", function () {
        removeTaskFromCompleted(todoObject.id);
      });

      function removeTaskFromCompleted(todoId) {
        const todoTarget = findTodoIndex(todoId);
       
        if (todoTarget === -1) return;
       
        todos.splice(todoTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
      }

      function undoTaskFromCompleted(todoId) {
        const todoTarget = findTodo(todoId);
       
        if (todoTarget == null) return;
       
        todoTarget.isCompleted = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
      }

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");

      // fungsi untuk memindahkan dari rak yang belum ke yang sudah.
      checkButton.addEventListener("click", function () {
        addTaskToCompleted(todoObject.id);
      });
      container.append(checkButton);

      //deklarasi
      function addTaskToCompleted(todoId) {
        // mengembalikan nilai todoItem jika true;
        const todoTarget = findTodo(todoId);

        if (todoTarget == null) return;

        // jika todoitem isCompleted berinilai true maka pindahkan.
        todoTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
      }

      // mencari todo dengan id yang sama.
      function findTodo(todoId) {
        for (const todoItem of todos) {
          if (todoItem.id === todoId) {
            return todoItem;
          }
        }
        return null;
      }
    }

    return container;
  }
});
