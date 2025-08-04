const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

async function writeZeros() {
  try {
    await client.connectTCP("192.168.68.249", { port: 502 });
    console.log("✅ Đã kết nối với ARIO-C-MT");

    client.setID(1); // nếu thiết bị cần ID
    client.setTimeout(2000);

    // Ghi giá trị 0 vào 4 thanh ghi: 2000, 2001, 2002, 2003
    const zeros = [0, 0, 0, 0];
    await client.writeRegisters(2000, zeros);

    console.log("✅ Đã ghi giá trị 0 vào các thanh ghi 2000–2003");

    // Kiểm tra lại
    const check = await client.readHoldingRegisters(2000, 4);
    console.log("📦 Giá trị sau khi ghi:", check.data);

    client.close();
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
    client.close();
  }
}

writeZeros();
