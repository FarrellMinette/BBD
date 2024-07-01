document.addEventListener("DOMContentLoaded", function () {
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
    // Do stuff with the new orientation data
    a.textContent = "Alpha: " + alpha;
    b.textContent = "Beta: " + beta;
    c.textContent = "Gamma: " + gamma;

    console.log("Orientation data updated.");
  }
});
