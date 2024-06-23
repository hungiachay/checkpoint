// Lớp Stopwatch để tạo đồng hồ bấm giờ
class Stopwatch {
    constructor(display) {
        // Khởi tạo các biến cần thiết cho đối tượng Stopwatch
        this.running = false; // Biến kiểm tra trạng thái chạy của đồng hồ
        this.display = display; // Thẻ HTML để hiển thị thời gian
        this.reset(); // Đặt lại thời gian
        this.print(this.times); // In thời gian ban đầu (00:00:00) lên thẻ hiển thị
    }

    reset() {
        // Đặt lại thời gian về 0
        this.times = [0, 0, 0, 0]; // Mảng lưu trữ giờ, phút, giây và mili giây
    }

    start() {
        // Bắt đầu đồng hồ
        if (!this.running) {
            this.running = true; // Đặt trạng thái chạy là true
            this.startTime = performance.now(); // Lấy thời gian bắt đầu từ khi gọi hàm
            this.update(); // Bắt đầu cập nhật thời gian
        }
    }

    pause() {
        // Tạm dừng đồng hồ
        this.running = false; // Đặt trạng thái chạy là false
        this.previousTime = performance.now(); // Lưu lại thời gian khi tạm dừng
    }

    stop() {
        // Dừng đồng hồ và đặt lại thời gian
        this.running = false; // Đặt trạng thái chạy là false
        this.reset(); // Đặt lại thời gian về 0
        this.print(this.times); // In thời gian đã đặt lại lên thẻ hiển thị
    }

    update() {
        // Cập nhật thời gian liên tục khi đồng hồ đang chạy
        if (!this.running) return; // Nếu đồng hồ không chạy, thoát hàm
        const diff = performance.now() - this.startTime; // Tính thời gian đã trôi qua từ lần cập nhật trước
        this.calculate(diff); // Tính toán và cập nhật thời gian mới
        this.print(this.times); // In thời gian mới lên thẻ hiển thị
        requestAnimationFrame(() => this.update()); // Yêu cầu cập nhật lần tiếp theo
    }

    calculate(diff) {
        // Tính toán và cập nhật thời gian mới
        this.times[3] += diff / 10; // Cộng mili giây đã trôi qua (1/10 giây)
        this.startTime = performance.now(); // Cập nhật thời gian bắt đầu mới

        if (this.times[3] >= 100) {
            this.times[2] += 1; // Cộng 1 giây
            this.times[3] -= 100; // Trừ đi 100 mili giây đã cộng
        }

        if (this.times[2] >= 60) {
            this.times[1] += 1; // Cộng 1 phút
            this.times[2] -= 60; // Trừ đi 60 giây đã cộng
        }

        if (this.times[1] >= 60) {
            this.times[0] += 1; // Cộng 1 giờ
            this.times[1] -= 60; // Trừ đi 60 phút đã cộng
        }
    }

    print(times) {
        // In thời gian lên thẻ hiển thị
        this.display.innerText = this.format(times); // Định dạng và in thời gian
    }

    format(times) {
        // Định dạng thời gian thành chuỗi "HH:MM:SS"
        return `${pad0(times[0], 2)}:${pad0(times[1], 2)}:${pad0(Math.floor(times[2]), 2)}`;
    }
}

// Hàm để thêm số 0 vào trước nếu số có độ dài nhỏ hơn count
function pad0(value, count) {
    let result = value.toString(); // Chuyển số thành chuỗi
    while (result.length < count) {
        result = '0' + result; // Thêm số 0 vào trước
    }
    return result; // Trả về chuỗi đã thêm số 0
}

// Mảng lưu trữ tất cả các đồng hồ bấm giờ
const stopwatches = [];

// Tạo các đồng hồ bấm giờ cho mỗi thẻ HTML có class "stopwatch"
document.querySelectorAll('.stopwatch').forEach((element, index) => {
    const display = element.querySelector('.time'); // Lấy thẻ hiển thị thời gian
    const stopwatch = new Stopwatch(display); // Tạo đối tượng Stopwatch mới
    stopwatches.push(stopwatch); // Thêm đồng hồ vào mảng

    // Thêm sự kiện click cho nút bắt đầu
    element.querySelector('.start').addEventListener('click', () => stopwatch.start());
    // Thêm sự kiện click cho nút tạm dừng
    element.querySelector('.pause').addEventListener('click', () => stopwatch.pause());
    // Thêm sự kiện click cho nút dừng
    element.querySelector('.stop').addEventListener('click', () => stopwatch.stop());
});

// Thêm sự kiện click cho nút bắt đầu tất cả đồng hồ
document.getElementById('startAll').addEventListener('click', () => {
    stopwatches.forEach(stopwatch => stopwatch.start()); // Bắt đầu tất cả đồng hồ
});

// Thêm sự kiện click cho nút dừng tất cả đồng hồ
document.getElementById('stopAll').addEventListener('click', () => {
    stopwatches.forEach(stopwatch => stopwatch.stop()); // Dừng tất cả đồng hồ
});
