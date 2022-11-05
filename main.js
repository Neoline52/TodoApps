// Memmuat seluruh element HTML menjadi DOM yang utuh
document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan element form
  const submitForm = document.getElementById("form");
  // Memasangkan element form dengan event submit
  submitForm.addEventListener("submit", function (event) {
    // Mencegah hilangnya data saat memuat ulang
    event.preventDefault();
    // function untuk menambahkan todo(belum dibuat)
    addTodo();
  });

  // Membuat event handler untuk addTodo
  function addTodo() {
    // medapatkan nilai yang dimasukan oleh user pada judul dan tanggal
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    // function untuk mendapatkan identitas unik (belum dideklarasikan)
    const generatedID = generateId();

    // Membuat object baru 
    const todoObject = generateTodoObject(
      // wadah untuk odentitas unik
      generatedID,
      // wadah unutk judul
      textTodo,
      // wadah unutk tanggal
      timestamp,
      // apakah sudah selesai atau belum
      false
    );
    // object dimasukan ke dalam array todos dengan metode push
    todos.push(todoObject);

    // custom event yang akan memunculkan tampilan pada web(belum dideklarasikan)
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // deklarasi dari generateId
  function generateId() {
    return +new Date();
  }

  // deklarasi dari generateTodoObject
  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  // deklarasi dari array todos
  const todos = [];
  // deklarasi custom event 
  const RENDER_EVENT = "render-todo";

// deklarasi fungsi untuk custom event 
  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
    // Memunculkan todo ke web
    // medapatkan array todos
    const uncompletedTODOList  = document.getElementById('todos');
    //  memastikan agar container dari todo bersih sebelum diperbarui.
    uncompletedTODOList.innerHTML = '';
// Menyimpan data dari todos ke todosItem

for (const todoItem of todos) {
  const todoElement = makeTodo(todoItem);
  if (!todoItem.isCompleted) {
    uncompletedTODOList.append(todoElement);
  }
}
    // for(todoItem of todos){
    //   //Setiap iterasi yang dilakukan akan membuat satu elemen DOM, yakni sebagai hasil dari fungsi makeTodo() yang kemudian dimasukkan pada variabel DOM yang sudah ada pada tampilan web (uncompletedTODOList) melalui fungsi append(). Sehingga, elemen tersebut bisa langsung di-render oleh webpage.
    //   const todoElement = makeTodo(todoItem);
    //   uncompletedTODOList.append(todoElement);
    // }

    
  });
});


// membuat function makeTodo

function makeTodo(todoObject) {
  //membuat h2 untuk judul Todo
  const textTitle = document.createElement('h2');
  // Membuat judul berasal dari variabel todoObject key task(yang di input user)
  textTitle.innerText = todoObject.task;

  const textTimestime = document.createElement('p');
  textTimestime.innerText = todoObject.timestamp;

  // Membaut wadah atau pembungkus bagian dalam untuk data di atas
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  // Memasukan textTitle dan textTimestime ke dalam pembungkus bagian dalam
  textContainer.append(textTitle, textTimestime);

  // Membuat pembungkus paling luar untuk data di atas

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  // Memasukan textContainer ke dalam pembungkus paling luar
  container.append(textContainer);
  // Menambahkan attribute id pada todoObject ke pembungkus paling luar agar ssetiap pembungkus memiliki Id yang berbeda
  container.setAttribute('id', `todo-${todoObject.id}`);

  // Membuat tombol check, unchek, dan remove

  if(todoObject.isCompleted){
    //membuat tombol uncheck

    const undoButton = document.createElement('button');
    // memasangkan style yang telah disediakan di css
    undoButton.classList.add('undo-button')

    // membaut event listener untuk undo button
    undoButton.addEventListener('click', function(){
      undoTaskFromCompleted(todoObject.id);
    })
    
    // membuat tombol hapus 
    const trashButton = document.createElement('button')
    // memasangkan style 
    trashButton.classList.add('trash-button')

    trashButton.addEventListener('click', function(){
      removeTaskFromCompleted(todoObject.id);

     
    })
    container.append(undoButton, trashButton);
  }else{
    // membaut tombol selesai
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function(){
      addTaskToCompleted(todoObject.id);

      function addTaskToCompleted (todoId) {
        const todoTarget = findTodo(todoId);
       
        if (todoTarget == null) return;
       
        todoTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
        
      }
       function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }
    })
    container.append(checkButton)
  }


 
  
  

  // mengembalikan pembungkus paling luar agar fungsi dapat berjalan.
  return container;

};








/* pada perintah pertama kita membuat listener sebuah event DOMContentLoaded, dimana event ini berfungsi untuk memuat seluruh element hmtl menjadi DOM yang utuh agar dapat dibaca oleh browser dengan baik. di dalam function (setelah seluruh DOM didapatkan), kita harus mendapatkan element form, setelah mendapatkan form (yang sekarang ada di dalam variable submitForm), harus menangani event submit yang mana dijalankan oleh custom event addTodo (disini addTodo belum dideklarasikan, hanya baru di buat), kita juga harus menambahkan prevendefault agar seteah nanti form disubmit data tidak hilang karena dimuat ulang.

pada perintah ke dua kita mendeklarasikan event addTodo, yang didalamnya kita membuat dua variable yaitu texttodo dan timestamp unutuk mendapatkan nilai dari inputan user. pada variable generatId diisikan oleh sebuah funngsi yang nantinya akan membuat identitas unik untuk setiap todo. variable todoObject berisi object baru yaitu generateTodoObject yang akan dimasukan ke dalam array todos dengan metode push, terakhir kita memanggil custom event RENDER_EVENT, unutk selanjutnya tinggal mendeklarasikan.*/
