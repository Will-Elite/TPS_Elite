const fs = require('fs');
const net = require('net');

// 🧮 Hàm tính CRC16 Modbus
function calcCRC16(buf) {
  let crc = 0xFFFF;
  for (let pos = 0; pos < buf.length; pos++) {
    crc ^= buf[pos];
    for (let i = 0; i < 8; i++) {
      const lsb = crc & 0x0001;
      crc >>= 1;
      if (lsb) crc ^= 0xA001;
    }
  }
  return crc;
}

// 🗺️ Ánh xạ LNID → slaveID
const lnidMap = {
  207: 0x01,
  375: 0x02,
  294: 0x03,
  // Thêm các LNID khác nếu cần
};

// 📤 Hàm gửi lệnh Modbus tới thiết bị
function sendModbusCommand(buffer, lnid, slaveID) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.connect(8989, '192.168.72.40', () => {
      console.log(`\n➡️ LNID ${lnid} (slaveID: ${slaveID}) – Gửi gói: ${buffer.toString('hex').toUpperCase()}`);
      client.write(buffer);
    });

    client.on('data', (data) => {
      console.log(`📥 Phản hồi: ${data.toString('hex').toUpperCase()}`);
      client.destroy();
      resolve();
    });

    client.on('error', (err) => {
      console.error(`❌ Lỗi khi gửi đến LNID ${lnid}:`, err.message);
      client.destroy();
      resolve();
    });

    client.on('close', () => {
      console.log('🔌 Kết nối đã đóng.');
    });
  });
}

// 🧠 Hàm chính xử lý và gửi dữ liệu
async function run() {
  try {
    const data = JSON.parse(fs.readFileSync('./Json/BlockB/DataSignalB40.json', 'utf-8'));

    for (const item of data) {
      const lnid = item.LNID;
      const slaveID = lnidMap[lnid];

      if (!slaveID) {
        console.warn(`⚠️ Bỏ qua LNID ${lnid} vì chưa ánh xạ slaveID`);
        continue;
      }

      const value = parseInt(item.signalA_B, 16);
      const functionCode = 0x06;
      const registerAddress = 0x0070;

      const payload = Buffer.from([
        slaveID,
        functionCode,
        (registerAddress >> 8) & 0xFF,
        registerAddress & 0xFF,
        (value >> 8) & 0xFF,
        value & 0xFF,
      ]);

      const crc = calcCRC16(payload);
      const buffer = Buffer.concat([
        payload,
        Buffer.from([crc & 0xFF, (crc >> 8) & 0xFF]),
      ]);

      await sendModbusCommand(buffer, lnid, slaveID);
      await new Promise(res => setTimeout(res, 1000)); // ⏱️ chờ 1s giữa các lệnh
    }

    console.log('\n✅ Đã gửi xong tất cả các lệnh từ JSON.');
  } catch (err) {
    console.error('❌ Lỗi khi đọc hoặc xử lý JSON:', err.message);
  }
}

// ▶️ Gọi lần đầu
run();

// 🔁 Sau đó lặp lại sau mỗi 5 giây
setInterval(run, 5000);
