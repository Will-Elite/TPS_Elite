const fs = require('fs');

function runProcessing() {

  // Đọc file JSON
  const json = JSON.parse(fs.readFileSync('./Json/signalB.json', 'utf8'));
  
  // IP 192.168.69.253
  // Danh sách LNID cần xử lý
  const lnidsB253 = [
    378, //201
    376, //202
    375, //203
    294, //204
    379, //205
    438, //212
  ];
  
  const resultB253 = [];
  let indexB253 = 0;
  
  lnidsB253.forEach(lnid => {
    const entry = json.find(e => e.LNID === lnid);
    if (!entry) return;
  
    const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
    const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
  
    // Signal_B từ bit[0] đến bit[4] → index tăng
    bitsB.forEach((bit, i) => {
      resultB253.push({
        indexB253: indexB253++,
        signal: `LNID ${lnid} - Signal_B[${i}]`,
        value: bit
      });
    });
  
    // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
    bitsA.forEach((bit, i) => {
      resultB253.push({
        indexB253: indexB253++,
        signal: `LNID ${lnid} - Signal_A[${i}]`,
        value: bit
      });
    });
  });
  
  // Xuất kết quả ra bảng và ghi file
  //console.table(resultB253);
  fs.writeFileSync('./Json/BlockB/DataSignalB253.json', JSON.stringify(resultB253, null, 2), 'utf8');
  console.log('✅ Đã tạo file DataSignalB253.json');
  
  // IP 192.168.69.254
  // Danh sách LNID cần xử lý
  const lnidsB254 = [
    383, //208
    448, //209
    381, //210
    382, //211
    468, //207
    207  //206
  ];
  
  const resultB254 = [];
  let indexB254 = 0;
  
  lnidsB254.forEach(lnid => {
    const entry = json.find(e => e.LNID === lnid);
    if (!entry) return;
  
    const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
    const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
  
    // Signal_B từ bit[0] đến bit[4] → index tăng
    bitsB.forEach((bit, i) => {
      resultB254.push({
        indexB254: indexB254++,
        signal: `LNID ${lnid} - Signal_B[${i}]`,
        value: bit
      });
    });
  
    // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
    bitsA.forEach((bit, i) => {
      resultB254.push({
        indexB254: indexB254++,
        signal: `LNID ${lnid} - Signal_A[${i}]`,
        value: bit
      });
    });
  });
  
  // Xuất kết quả ra bảng và ghi file
  //console.table(resultB254);
  fs.writeFileSync('./Json/BlockB/DataSignalB254.json', JSON.stringify(resultB254, null, 2), 'utf8');
  console.log('✅ Đã tạo file DataSignalB254.json');
  
  //---------------------------------------------------
  const inputFile = './Json/signalB.json';
  
  function convertSignalBits(data) {
    const padBits = (bin) => bin.padStart(8, "0");
    const binA = padBits(data.Signal_A);
    const binB = padBits(data.Signal_B);
    const fullBinary = binB + binA;
    const hex = parseInt(fullBinary, 2).toString(16).toUpperCase().padStart(4, "0");
  
    return {
      LNID: data.LNID,
      Signal_A: data.Signal_A,
      Signal_B: data.Signal_B,
      signalA_B: hex,
      Created: data.Created
    };
  }
  
  // IP 192.168.72.40 Block B2 - B4
  
  const outputFile40 = './Json/BlockB/DataSignalB40.json';
  const lnids40 = [
    465, //228 - 1
    449, //227 - 2
    477, //226 - 3
    464, //225 - 4
    450, //224 - 5
    420, //223 - 6
    445, //222 - 7
    473, //221 - 8
    478, //220 - 9
    461, //219 - 10
    479, //238 - 11
    463, //239 - 12
    469, //240 - 13
    462, //241 - 14
    454, //237 - 15
    481, //236 - 16
    483  //235 - 17
  ];
  
  fs.readFile(inputFile, "utf8", (err, jsonString) => {
    if (err) {
      console.error("❌ Lỗi khi đọc file:", err);
      return;
    }
  
    try {
      const allData = JSON.parse(jsonString);
      const filtered40 = allData
        .filter((item) => lnids40.includes(item.LNID))
        .map(convertSignalBits);
  
      fs.writeFile(outputFile40, JSON.stringify(filtered40, null, 2), (err) => {
        if (err) {
          console.error("❌ Lỗi khi ghi file:", err);
        } else {
          console.log(`✅ Đã ghi ${filtered40.length} dòng vào ${outputFile40}`);
        }
      });
    } catch (err) {
      console.error("❌ Lỗi khi xử lý dữ liệu JSON:", err);
    }
  });
  
  // IP 192.168.72.41   Block B3
  const outputFile41 = './Json/BlockB/DataSignalB41.json';
  const lnids41 = [
    458, //214 - 1
    456, //215 - 2
    480, //216 - 3
    421, //218 - 4
         //    - 5
  ];
  fs.readFile(inputFile, "utf8", (err, jsonString) => {
    if (err) {
      console.error("❌ Lỗi khi đọc file:", err);
      return;
    }
  
    try {
      const allData = JSON.parse(jsonString);
      const filtered41 = allData
        .filter((item) => lnids41.includes(item.LNID))
        .map(convertSignalBits);
  
      fs.writeFile(outputFile41, JSON.stringify(filtered41, null, 2), (err) => {
        if (err) {
          console.error("❌ Lỗi khi ghi file:", err);
        } else {
          console.log(`✅ Đã ghi ${filtered41.length} dòng vào ${outputFile41}`);
        }
      });
    } catch (err) {
      console.error("❌ Lỗi khi xử lý dữ liệu JSON:", err);
    }
  });
};

// 🕒 Gọi lần đầu
runProcessing();

// 🔁 Sau đó lặp lại mỗi 5 giây
setInterval(runProcessing, 5000);
