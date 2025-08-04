const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

async function checkConnection() {
  try {
    await client.connectTCP("192.168.68.250", { port: 502 });
    console.log("✅ Đã kết nối với ARIO-C-MT");

    // Đọc thử 1 thanh ghi (hoặc 2) để kiểm tra phản hồi từ thiết bị
    //const data = await client.readHoldingRegisters(2000, 4);
    //console.log("📦 Phản hồi từ thiết bị:", data.data);

    client.close();
  } catch (err) {
    console.error("❌ Lỗi kết nối hoặc thiết bị không phản hồi:", err.message);
  }
}

checkConnection();