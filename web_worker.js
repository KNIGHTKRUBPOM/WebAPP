// web_worker.js
let intervalId = null;
let colorIndex = 0;

// กำหนด 6 สี แดง เขียว เหลือง น้ำเงิน ม่วง ชมพู
const colors = ['#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#800080', '#FFC0CB'];

// ฟังก์ชันหาสีตัวอักษร contrast กับพื้นหลัง
function getContrastColor(bgColor) {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#FFFFFF";
}

onmessage = function(e) {
    const command = e.data.command;

    if (command === 'start') {
        colorIndex = 0; // เริ่มจากสีแรกเสมอ (แดง)

        if (!intervalId) {
            // ส่งข้อความทันที (ไม่ต้องรอ 1 วินาทีแรก)
            const now = new Date();
            const bgColor = colors[colorIndex];
            const textColor = getContrastColor(bgColor);
            postMessage({ timeString: now.toString(), bgColor, textColor });

            // แล้วค่อยเริ่ม interval
            intervalId = setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length; // เปลี่ยนเป็นสีถัดไป

                const now2 = new Date();
                const bgColor2 = colors[colorIndex];
                const textColor2 = getContrastColor(bgColor2);

                postMessage({ timeString: now2.toString(), bgColor: bgColor2, textColor: textColor2 });
            }, 1000);
        }
    } else if (command === 'stop') {
        clearInterval(intervalId);
        intervalId = null;
        postMessage({ reset: true });
    }
};
