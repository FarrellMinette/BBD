function createRoom(event) {
    event.preventDefault();
    const roomName = document.getElementById('roomName').value;
    // Handle room creation logic here
    console.log('Creating room:', roomName);
    // Redirect to the game page
    window.location.href = 'maze.html?room=' + encodeURIComponent(roomName);
}

function joinRoom(event) {
    event.preventDefault();
    const roomCode = document.getElementById('roomCode').value;
    // Handle room joining logic here
    console.log('Joining room:', roomCode);
    // Redirect to the game page
    window.location.href = 'maze.html?room=' + encodeURIComponent(roomCode);
}