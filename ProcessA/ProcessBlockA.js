const fs = require('fs');

function runProcessingA() {

    // Đọc file JSON
    const json = JSON.parse(fs.readFileSync('./Json/signalA.json', 'utf8'));

    // Danh sách LNID cần xử lý
    // IP 192.168.68.247
    const lnidsA247 = [
        356, //147
        0,   //Không có line
        249, //149
        429, //150
        251, //151
        384, //152
    ];
    const resultA247 = [];
    let indexA247 = 0;

    lnidsA247.forEach(lnid => {
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        //if (!entry) return;

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] -> bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] -> bit[4]

        // Signal_B từ bit[0] đền bit[4] -> index tăng
        bitsB.forEach((bit, i) => {
            resultA247.push({
                indexA247: indexA247++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] -> index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA247.push({
                indexA247: indexA247++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA247);
    fs.writeFileSync('./Json/BlockA/DataSignalA247.json', JSON.stringify(resultA247, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA247.json');

    // IP 192.168.68.248
    // Danh sách LNID cần xử lý
    const lnidsA248 = [
        0,   //Không có line
        361, //142
        430, //143
        419, //144
        408, //145
        457, //146
    ];

    const resultA248 = [];
    let indexA248 = 0;

    lnidsA248.forEach(lnid => {
        //const entry = json.find(e => e.LNID === lnid);
        //if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] -> bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] -> bit[4]

        // Signal_B từ bit[0] đến bit[4] -> index tăng
        bitsB.forEach((bit, i) => {
            resultA248.push({
                indexA248: indexA248,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] -> index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA248.push({
                indexA248: indexA248++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA248);
    fs.writeFileSync('./Json/BlockA/DataSignalA248.json', JSON.stringify(resultA248, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA248.json');


    // IP 192.168.68.249
    // Danh sách LNID cần xử lý
    const lnidsA249 = [
        460, //159
        0,   //Không có Line
        241, //154
        427, //153
        0,   //Không có Line
        0,   //Không có Line
    ];

    const resultA249 = [];
    let indexA249 = 0;

    lnidsA249.forEach(lnid => {
        // const entry = json.find(e => e.LNID === lnid);
        // if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA249.push({
                indexA249: indexA249++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA249.push({
                indexA249: indexA249++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA249);
    fs.writeFileSync('./Json/BlockA/DataSignalA249.json', JSON.stringify(resultA249, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA249.json');


    // IP 192.168.68.250
    // Danh sách LNID cần xử lý
    const lnidsA250 = [
        273, //101
        371, //102
        364, //103
        360, //104
        198, //105
        363, //106
    ];

    const resultA250 = [];
    let indexA250 = 0;

    lnidsA250.forEach(lnid => {
        // const entry = json.find(e => e.LNID === lnid);
        // if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA250.push({
                indexA250: indexA250++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA250.push({
                indexA250: indexA250++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });
    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA250);'
    fs.writeFileSync('./Json/BlockA/DataSignalA250.json', JSON.stringify(resultA250, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA250.json');

    // IP 192.168.68.251
    // Danh sách LNID cần xử lý
    const lnidsA251 = [
        415, //112
        240, //111
        367, //110
        388, //109
        472, //108
        386, //107
    ];

    const resultA251 = [];
    let indexA251 = 0;

    lnidsA251.forEach(lnid => {
        // const entry = json.find(e => e.LNID === lnid);
        // if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA251.push({
                indexA251: indexA251++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA251.push({
                indexA251: indexA251++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA251);
    fs.writeFileSync('./Json/BlockA/DataSignalA251json', JSON.stringify(resultA251, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA251.json');


    // IP 192.168.68.252
    // Danh sách LNID cần xử lý
    const lnidsA252 = [
        362, //163
        0,   //Không có Line
        365, //162
        366, //161
        0,   //Không có Line
        368, //160
    ];

    const resultA252 = [];
    let indexA252 = 0;

    lnidsA252.forEach(lnid => {
        // const entry = json.find(e => e.LNID === lnid);
        // if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA252.push({
                indexA252: indexA252++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA252.push({
                indexA252: indexA252++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA252);
    fs.writeFileSync('./Json/BlockA/DataSignalA252json', JSON.stringify(resultA252, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA252.json');


    // IP 192.168.68.253
    // Danh sách LNID cần xử lý
    const lnidsA253 = [
        0,   //Không có Line
        374, //174
        372, //173
        373, //172
        264, //171
        434, //170
    ];

    const resultA253 = [];
    let indexA253 = 0;

    lnidsA253.forEach(lnid => {
        // const entry = json.find(e => e.LNID === lnid);
        // if (!entry) return;
        let entry = json.find(e => e.LNID === lnid);

        // Nếu không tìm thấy, tạo bản ghi mặc định (toàn 0)
        if (!entry) {
            entry = {
                LNID: lnid,
                Signal_A: "00000",
                Signal_B: "00000"
            };
        }

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA253.push({
                indexA253: indexA253++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA253.push({
                indexA253: indexA253++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA253);
    fs.writeFileSync('./Json/BlockA/DataSignalA253json', JSON.stringify(resultA253, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA253.json');


    // IP 192.168.68.254
    // Danh sách LNID cần xử lý
    const lnidsA254 = [
        351, //169
        453, //168
        353, //165
        0,   //Không có Line
        354, //164
        0,   //Không có Line
    ];

    const resultA254 = [];
    let indexA254 = 0;

    lnidsA254.forEach(lnid => {
        const entry = json.find(e => e.LNID === lnid);
        if (!entry) return;

        const bitsB = entry.Signal_B.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]
        const bitsA = entry.Signal_A.padStart(5, '0').split('').reverse(); // bit[0] → bit[4]

        // Signal_B từ bit[0] đến bit[4] → index tăng
        bitsB.forEach((bit, i) => {
            resultA254.push({
                indexA254: indexA254++,
                signal: `LNID ${lnid} - Signal_B[${i}]`,
                value: bit
            });
        });

        // Signal_A từ bit[0] đến bit[4] → index tiếp tục tăng
        bitsA.forEach((bit, i) => {
            resultA254.push({
                indexA254: indexA254++,
                signal: `LNID ${lnid} - Signal_A[${i}]`,
                value: bit
            });
        });
    });

    // Xuất kết quả ra bảng và ghi file
    //console.table(resultA254);
    fs.writeFileSync('./Json/BlockA/DataSignalA254json', JSON.stringify(resultA254, null, 2), 'utf8');
    console.log('✅ Đã tạo file DataSignalA254.json');

    //-------------------------------------------------
    const inputFile = './Json/signalA.json';

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

    // IP 192.168.72.43 Block A3
    const outputFile43 = './Json/BlockA/DataSignalB43.json';
    const lnids43 = [
        389,//131 - 1
            //0   - 2
        336,//132 - 3
        225,//129 - 4
        447,//130 - 5
        246,//128 - 6
        405,//133 - 7
            //0   - 8
        355,//127 - 9
        428,//136 - 10
        443,//135 - 11
        442,//137 - 12
        446,//138 - 13
        387,//139 - 14
    ];
    fs.readFile(inputFile, "utf8", (err, jsonString) => {
        if (err) {
            console.error("❌ Lỗi khi đọc file:", err);
            return;
        }

        try {
            const allData = JSON.parse(jsonString);
            const filtered43 = allData
                .filter((item) => lnids43.includes(item.LNID))
                .map(convertSignalBits);

            fs.writeFile(outputFile43, JSON.stringify(filtered43, null, 2), (err) => {
                if (err) {
                    console.error("❌ Lỗi khi ghi file:", err);
                } else {
                    console.log(`✅ Đã ghi ${filtered43.length} dòng vào ${outputFile43}`);
                }
            });
        } catch (err) {
            console.error("❌ Lỗi khi xử lý dữ liệu JSON:", err);
        }
    });

    // IP 192.168.72.44 Block A2
    const outputFile44 = './Json/BlockA/DataSignalB44.json';
    const lnids44 = [
        359,//126 - 1
        352,//125 - 2
        357,//124 - 3
        265,//123 - 4
        399,//122 - 5
        219,//121 - 6
            //120 - 7
        395,//119 - 8
        370,//118 - 9
        195,//117 - 10
        398,//116 - 11
        192,//115 - 12
        358,//114 - 13
            //113 - 14
    ];

    fs.readFile(inputFile, "utf8", (err, jsonString) => {
        if (err) {
          console.error("❌ Lỗi khi đọc file:", err);
          return;
        }
      
        try {
          const allData = JSON.parse(jsonString);
          const filtered44 = allData
            .filter((item) => lnids44.includes(item.LNID))
            .map(convertSignalBits);
      
          fs.writeFile(outputFile44, JSON.stringify(filtered44, null, 2), (err) => {
            if (err) {
              console.error("❌ Lỗi khi ghi file:", err);
            } else {
              console.log(`✅ Đã ghi ${filtered44.length} dòng vào ${outputFile44}`);
            }
          });
        } catch (err) {
          console.error("❌ Lỗi khi xử lý dữ liệu JSON:", err);
        }
    });
};

// 🕒 Gọi lần đầu
runProcessingA();

// 🔁 Sau đó lặp lại mỗi 5 giây
setInterval(runProcessingA, 5000);
