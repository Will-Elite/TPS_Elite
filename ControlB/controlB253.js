const net = require('net');
const Modbus = require('jsmodbus');
const fs = require('fs');

const socket = new net.Socket();
const client = new Modbus.client.TCP(socket, 1); // Unit ID = 1
const options = {
    host: '192.168.69.253',
    port: 502
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Lưu trạng thái trước
let prevState = {}; // key = coil address, value = boolean

// Hàm xử lý
async function writeIfChanged() {
    const data = JSON.parse(fs.readFileSync('./Json/BlockB/DataSignalB253.json', 'utf8'));

    for (let item of data) {
        const coilAddress = 2000 + item.index253;
        const value = item.value === "1";

        // Kiểm tra nếu giá trị khác lần trước thì mới ghi
        if (prevState[coilAddress] !== value) {
            try {
                await client.writeSingCoil(coilAddress, value);
                console.log(`🔁 Gửi lệnh ${value ? 'BẬT' : 'TẮT'} coil ${coilAddress} (${item.signal})`);
                prevState[coilAddress] = value; // cập nhật trạng thái mới
                await delay(100);
            } catch (err) {
                console.error(`❌ Lỗi tại coil ${coilAddress}:`, err.message);
            }
        } else {
            // Không thay đổi, bỏ qua
            console.log(`⏭ Giữ nguyên coil ${coilAddress} (${item.signal})`);
        }
    }
}

// Chạy lặp sau mỗi 5 giây
async function loopWrite() {
  while (true) {
    await writeIfChanged();
    console.log('⏳ Chờ 5 giây...');
    await delay(5000);
  }
}

socket.on('connect', async () => {
  console.log('✅ Đã kết nối Modbus TCP');
  await loopWrite(); // bắt đầu vòng lặp
});

socket.on('error', err => {
  console.error('❌ Lỗi kết nối:', err.message);
});

socket.connect(options);
