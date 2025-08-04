// const ModbusRTU = require("modbus-serial");

// const ips = [
//   "192.168.68.247",
//   "192.168.68.248",
//   "192.168.68.249",
//   "192.168.68.250",
//   "192.168.68.251",
//   "192.168.68.252",
//   "192.168.68.253",
//   "192.168.68.254",
//   "192.168.69.253",
//   "192.168.69.254",
// ];

// function timeoutPromise(ms) {
//   return new Promise((_, reject) =>
//     setTimeout(() => reject(new Error(`⏱ Timeout sau ${ms}ms`)), ms)
//   );
// }

// async function checkConnection(ip, timeout = 3000) {
//   const client = new ModbusRTU();

//   try {
//     await Promise.race([
//       client.connectTCP(ip, { port: 502 }),
//       timeoutPromise(timeout)
//     ]);
//     console.log(`✅ [${ip}] Đã kết nối với thiết bị`);
//   } catch (err) {
//     console.error(`❌ [${ip}] Không kết nối được: ${err.message}`);
//   } finally {
//     if (client.isOpen) client.close();
//   }
// }

// async function checkAllIPsSequentially() {
//   for (const ip of ips) {
//     await checkConnection(ip); // chạy tuần tự từng IP
//   }
// }

// async function loopCheck() {
//   console.log(`🕒 Bắt đầu quét lúc: ${new Date().toLocaleTimeString()}`);
//   await checkAllIPsSequentially();
//   setTimeout(loopCheck, 10000); // lặp lại sau 10 giây
// }

// loopCheck(); // bắt đầu lặp

const net = require("net");
const ModbusRTU = require("modbus-serial");

// Danh sách IP kiểm tra qua Modbus TCP (port 502)
const modbusIPs = [
  "192.168.68.247",
  "192.168.68.248",
  "192.168.68.249",
  "192.168.68.250",
  "192.168.68.251",
  "192.168.68.252",
  "192.168.68.253",
  "192.168.68.254",
  "192.168.69.253",
  "192.168.69.254",
];

// Danh sách IP kiểm tra qua TCP socket (ET69C02)
const socketIPs = [
  "192.168.72.40",
  "192.168.72.41",
  "192.168.72.43",
  "192.168.72.44"
];
const socketPort = 8989; // hoặc 8899 tùy thiết bị

// 💤 Hàm sleep delay (ms)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`⏱ Timeout sau ${ms}ms`)), ms)
  );
}

// Hàm kiểm tra Modbus TCP
async function checkModbusConnection(ip, timeout = 5000) {
  const client = new ModbusRTU();
  try {
    await Promise.race([
      client.connectTCP(ip, { port: 502 }),
      timeoutPromise(timeout)
    ]);
    console.log(`✅ [${ip}] Đã kết nối với thiết bị (Modbus TCP)`);
  } catch (err) {
    console.error(`❌ [${ip}] Không kết nối được (Modbus): ${err.message}`);
  } finally {
    if (client.isOpen) client.close();
  }
}

// Hàm kiểm tra TCP socket (ET69C02)
function checkSocketConnection(ip, port) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    const timeout = setTimeout(() => {
      client.destroy();
      console.error(`❌ [${ip}:${port}] Timeout sau 3s (TCP Socket)`);
      resolve();
    }, 3000);

    client.connect(port, ip, () => {
      clearTimeout(timeout);
      console.log(`✅ [${ip}:${port}] Kết nối TCP thành công (ET69C02)`);
      client.destroy();
      resolve();
    });

    client.on("error", (err) => {
      clearTimeout(timeout);
      console.error(`❌ [${ip}:${port}] Không kết nối được: ${err.message}`);
      resolve();
    });
  });
}

// Hàm kiểm tra tất cả IP
async function checkAllIPsSequentially() {
  for (const ip of modbusIPs) {
    await checkModbusConnection(ip);
    await sleep(1000); // ⏱ delay 0.5s sau mỗi IP
  }

  for (const ip of socketIPs) {
    await checkSocketConnection(ip, socketPort);
    await sleep(1000); // ⏱ delay 0.5s sau mỗi IP
  }
}

// Hàm lặp
async function loopCheck() {
  console.log(`\n🕒 Bắt đầu quét lúc: ${new Date().toLocaleTimeString()}`);
  await checkAllIPsSequentially();
  setTimeout(loopCheck, 10000);
}

// Khởi động
loopCheck();
