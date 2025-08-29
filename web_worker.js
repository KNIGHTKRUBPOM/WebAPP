let colors = ['red', 'green', 'blue', 'orange', 'purple', 'brown'];
let colorIndex = 0;
let intervalId = null;

onmessage = function(e) {
    const command = e.data.command;
    if (command === 'start') {
        if (!intervalId) {
            intervalId = setInterval(() => {
                const now = new Date();
                const timeString = now.toLocaleString('en-US', { timeZoneName: 'short' });
                const color = colors[colorIndex % colors.length];
                colorIndex++;
                postMessage({ timeString, color });
            }, 1000);
        }
    } else if (command === 'stop') {
        clearInterval(intervalId);
        intervalId = null;
        colorIndex = 0;
        postMessage({ reset: true });
    }
};
