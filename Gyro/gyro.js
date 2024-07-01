if (typeof DeviceMotionEvent.requestPermission === 'function') {
  DeviceOrientationEvent.requestPermission()
  .then(response => {
    if (response == 'granted') {
      window.addEventListener('deviceorientation', (e) => {
        // do something with e
      })
    }
  })
  .catch(console.error)
}


function loadDataWithBaseUrl() {
  const a = document.getElementById("a");
  const b = document.getElementById("b");
  const c = document.getElementById("c");

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation, true);
  } else {
    console.log("Device orientation not supported.");
  }

  function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    a.textContent = "Alpha: " + alpha;
    b.textContent = "Beta: " + beta;
    c.textContent = "Gamma: " + gamma;

    console.log("Orientation data updated.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadDataWithBaseUrl();
});
