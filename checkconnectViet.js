const net = require("net");

const client = new net.Socket();
const ip = "192.168.72.43";
const port = 8989; // hoặc 8899 tùy cấu hình của ET69C02

client.connect(port, ip, function () {
  console.log("✅ Kết nối TCP thành công với ET69C02!");
  client.destroy(); // đóng sau khi test
});

client.on("error", function (err) {
  console.log("❌ Không kết nối được: ", err.message);
});



