

const net = require("net");

function buildCommand(value) {
  const buffer = Buffer.alloc(8);
  buffer.writeUInt8(0x01, 0); // Slave ID
  buffer.writeUInt8(0x06, 1); // Function code: Write single register
  buffer.writeUInt16BE(0x0070, 2); // Register address (CH1–CH16 output)
  buffer.writeUInt16BE(value, 4); // Value: 0xFFFF = tất cả bật
  const crc = calculateCRC(buffer.slice(0, 6));
  buffer.writeUInt16LE(crc, 6);
  return buffer;
}

function calculateCRC(buf) {
  let crc = 0xFFFF;
  for (let b of buf) {
    crc ^= b;
    for (let i = 0; i < 8; i++) {
      crc = (crc & 1) ? (crc >> 1) ^ 0xA001 : crc >> 1;
    }
  }
  return crc;
}

function sendCommand(value) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.connect(8989, "192.168.72.40", () => {
      const label = value === 0xFFFF ? "BẬT" : "TẮT";
      console.log(`➡️ Gửi lệnh ${label} toàn bộ output (0x${value.toString(16).padStart(4, '0').toUpperCase()})`);
      client.write(buildCommand(value));
    });

    client.on("data", (data) => {
      console.log(`📥 Phản hồi: ${data.toString("hex").toUpperCase()}`);
      client.destroy();
      resolve();
    });

    client.on("error", (err) => {
      console.error("❌ Lỗi:", err.message);
      client.destroy();
      resolve();
    });
  });
}

async function loopControl() {
  while (true) {
    await sendCommand(0x0002); // Bật CH1–CH16
    await new Promise((r) => setTimeout(r, 1000)); // Delay 1s
    await sendCommand(0x0000); // Tắt CH1–CH16
    await new Promise((r) => setTimeout(r, 5000)); // Delay 5s
  }
}

loopControl();
