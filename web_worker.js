// web_worker.js
let intervalId = null;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// หาสีตัวอักษรที่ contrast กับ bg
function getContrastColor(bgColor) {
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#FFFFFF";
}

onmessage = function(e) {
    const command = e.data.command;

    if (command === 'start') {
        if (!intervalId) {
            intervalId = setInterval(() => {
                const now = new Date();
                const timeString = now.toString();

                const bgColor = getRandomColor();
                const textColor = getContrastColor(bgColor);

                postMessage({ timeString, bgColor, textColor });
            }, 1000);
        }
    } else if (command === 'stop') {
        clearInterval(intervalId);
        intervalId = null;
        postMessage({ reset: true });
    }
};
