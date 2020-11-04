onmessage = function (e) {
  let workerResult = eval(e.data);
  postMessage(workerResult);
  console.log('Worker');
}