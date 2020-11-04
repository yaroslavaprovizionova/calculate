const back = document.querySelector('#back');
const clean = document.querySelector('#clean');
const equal = document.querySelector('#equal');
const turnOn = document.querySelector('#turnOn');
const turnOff = document.querySelector('#turnOff');
let worker;

clean.addEventListener('click', cleanValue );
back.addEventListener('click', backValue);

// Выполняем операции через Worker
equal.addEventListener('click', function () {
  let worker;
  worker = new Worker("worker2.js");
  worker.postMessage(document.form.textview.value);

  worker.onmessage = function (e) {
    document.form.textview.value = e.data;
  }

});

//Добавляем Worker на секундомер
turnOn.addEventListener('click', function () {

  if (window.Worker) {
    if (typeof (worker) == "undefined") {
      worker = new Worker("worker1.js");
    }
    worker.onmessage = function (e) {
      document.getElementById("secRes").innerHTML = e.data;
    };
  }
});

turnOff.addEventListener('click', function () {
  worker.terminate();
  worker = undefined;
});


//Добавляем на кнопки обработчик событий на клик
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', function () {
    insert(this.dataset.value)
  })
});

//Добавляем на кнопки обработчик событий на ввод с клавиатуры,
// ограничивая нужными символами
document.addEventListener('keydown', function (event) {
  if ((event.key).match(/[0-9%\/*\-+\(\)=]/)) {
    insert(event.key);
  }
});

//Ввод цифр нажатием
function insert(num){
  document.form.textview.value = document.form.textview.value + num;
}

//Очистить значение
function cleanValue() {
  document.form.textview.value = "";
}

//Удалить последнюю цифру
function backValue() {
  let exp = document.form.textview.value;
  document.form.textview.value = exp.substring(0, exp.length-1);
}


