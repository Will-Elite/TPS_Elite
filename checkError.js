const Modbus = require('jsmodbus');
const net = require('net');

let client = null;
let socket = null;

function connectModbus() {
  socket = new net.Socket();
  client = new Modbus.client.TCP(socket, 1); // Unit ID = 1

  socket.on('connect', () => {
    console.log('✅ Đã kết nối Modbus TCP!');
    // Đọc thử 10 coil tại địa chỉ 0
    client.readCoils(0, 10)
      .then((resp) => {
        console.log('📦 Dữ liệu:', resp.response._body._valuesAsArray);
        // Bạn có thể đóng lại sau khi đọc nếu cần:
        // socket.end();
      })
      .catch((err) => {
        console.error('❌ Lỗi đọc dữ liệu:', err.message);
        socket.destroy(); // Đóng socket nếu lỗi
      });
  });

  socket.on('error', (err) => {
    console.error('🚨 Lỗi kết nối:', err.message);
    socket.destroy(); // Đảm bảo socket được đóng
  });

  socket.on('close', () => {
    console.log('🔁 Mất kết nối, thử lại sau 5 giây...');
    setTimeout(connectModbus, 5000); // Tự động reconnect sau 5s
  });

  socket.setTimeout(5000); // timeout nếu không phản hồi
  socket.on('timeout', () => {
    console.log('⌛ TIMEOUT – socket sẽ bị đóng.');
    socket.destroy();
  });

  socket.connect({ host: '192.168.0.100', port: 502 });
}

// Gọi kết nối ban đầu
connectModbus();
