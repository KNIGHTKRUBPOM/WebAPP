// web_worker.js
let intervalId = null;
let colorIndex = 0;

// กำหนด 6 สี
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#1ABC9C'];

// ฟังก์ชันหาสีตัวอักษร contrast กับพื้นหลัง
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
        colorIndex = 0; // เริ่มจากสีแรกเสมอ
        if (!intervalId) {
            intervalId = setInterval(() => {
                const now = new Date();
                const timeString = now.toString();

                const bgColor = colors[colorIndex];
                const textColor = getContrastColor(bgColor);

                postMessage({ timeString, bgColor, textColor });

                colorIndex = (colorIndex + 1) % colors.length; // วนไปเรื่อยๆ
            }, 1000);
        }
    } else if (command === 'stop') {
        clearInterval(intervalId);
        intervalId = null;
        postMessage({ reset: true });
    }
};
