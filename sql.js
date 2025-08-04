const fs = require('fs');
const sql = require('mssql');

// Cấu hình kết nối SQL Server
const config = {
  user: 'tps',
  password: 'TPS@Elt2018',
  server: '192.168.64.4',
  database: 'TPS_DB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Danh sách LNID nhóm 43 và 44 thuộc signalA.json
const LNIDsA_43 = [
  389, //131 - 1
  336, //132 - 3
  225, //129 - 4
  447, //130 - 5
  246, //128 - 6
  405, //133 - 7
  355, //127 - 9
  428, //136 - 10
  443, //135 - 11
  442, //137 - 12
  446, //138 - 13
  387, //139 - 14
];

const LNIDsA_44 = [
  359, //126 - 1
  352, //125 - 2
  357, //124 - 3
  265, //123 - 4
  399, //122 - 5
  219, //121 - 6
  395, //119 - 8
  370, //118 - 9
  195, //117 - 10
  398, //116 - 11
  192, //115 - 12
  358, //114 - 13
];
// Danh sách LNID nhóm 253 và 254 thuộc signalA.json
const LNIDsA_247 = [
  356, //147
  249, //149
  429, //150
  251, //151
  384, //152
];
const LNIDsA_248 = [
  361, //142
  430, //143
  419, //144
  408, //145
  457, //146
];
const LNIDsA_249 = [
  460, //159
  241, //154
  427, //153
];
const LNIDsA_250 = [
  273, //101
  371, //102
  364, //103
  360, //104
  198, //105
  363, //106
];
const LNIDsA_251 = [
  415, //112
  240, //111
  367, //110
  388, //109
  472, //108
  386, //107
];
const LNIDsA_252 = [
  362, //163
  0, 
  365, //162
  366, //161
  0, 
  368, //160
];
const LNIDsA_253 = [
  374, //174
  372, //173
  373, //172
  264, //171
  434, //170
];
const LNIDsA_254 = [
  351, //169
  453, //168
  353, //165
  354, //164
];

const LNIDsA_All = [
    ...LNIDsA_43,
    ...LNIDsA_44,
    ...LNIDsA_247,
    ...LNIDsA_248,
    ...LNIDsA_249,
    ...LNIDsA_250,
    ...LNIDsA_251,
    ...LNIDsA_252,
    ...LNIDsA_253,
    ...LNIDsA_254
].filter(id => id !== 0); 

// Danh sách LNID nhóm 40 và 41 thuộc signalB.json
const LNIDsB_40 = [
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

const LNIDsB_41 = [
  458, //214 - 1
  456, //215 - 2
  480, //216 - 3
  421, //218 - 4
       //    - 5
];
// Danh sách LNID nhóm 253 và 254 thuộc signalB.json
const LNIDsB_253 = [
  378, //201
  376, //202
  375, //203
  294, //204
  379, //205
  438, //212
];
const LNIDsB_254 = [
  383, //208
  448, //209
  381, //210
  382, //211
  468, //207
  207  //206
];
const LNIDsB_All = [...LNIDsB_40, ...LNIDsB_41, ...LNIDsB_253, ...LNIDsB_254];

// Truy vấn dữ liệu mới nhất từ bảng Light_Alarm
async function getLatestSignals(idsArray) {
  try {
    const ids = idsArray.join(',');
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT * FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY LNID ORDER BY Created DESC) AS rn
        FROM Light_Alarm
        WHERE LNID IN (${ids})
      ) AS sub
      WHERE rn = 1
    `);
    return result.recordset;
  } catch (err) {
    console.error('❌ DB Error:', err);
    return [];
  }
}

// Ghi ra file JSON cho cả nhóm A và B
async function exportToJsonFile() {
  const [dataA, dataB] = await Promise.all([
    getLatestSignals(LNIDsA_All),
    getLatestSignals(LNIDsB_All)
  ]);

  // Chỉ giữ các field cần thiết
  const cleanedA = dataA.map(row => ({
    LNID: row.LNID,
    Signal_A: row.Signal_A.trim(),
    Signal_B: row.Signal_B.trim(),
    Created: row.Created,
  }));

  const cleanedB = dataB.map(row => ({
    LNID: row.LNID,
    Signal_A: row.Signal_A.trim(),
    Signal_B: row.Signal_B.trim(),
    Created: row.Created,
  }));

  fs.writeFileSync('./Json/signalA.json', JSON.stringify(cleanedA, null, 2), 'utf-8');
  console.log('✅ File signalA.json đã được tạo thành công!');

  fs.writeFileSync('./Json/signalB.json', JSON.stringify(cleanedB, null, 2), 'utf-8');
  console.log('✅ File signalB.json đã được tạo thành công!');
}

// Thực thi
exportToJsonFile();

// Cập nhật mỗi 10 giây
// setInterval(() => {
//   exportToJsonFile();
// }, 10000); // 10 giây
