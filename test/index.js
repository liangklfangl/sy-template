// const MT = require('mark-twain');
// const fs = require('fs');
// const jsonML = MT(fs.readFileSync('something.md').toString());
// console.log(jsonML);


// const MT = require('mark-twain');
// const fs = require('fs');
// const jsonML = MT(fs.readFileSync('h.md').toString());
// console.log(jsonML);

// const MT = require('mark-twain');
// const fs = require('fs');
// const jsonML = MT(fs.readFileSync('table.md').toString());
// console.log(jsonML);

// const MT = require('mark-twain');
// const fs = require('fs');
// const jsonML = MT(fs.readFileSync('code.md').toString());
// console.log(jsonML);


// const filter = require("./filter.js");
// const MT = require('mark-twain');
// const fs = require('fs');
// const jsonML = MT(fs.readFileSync('filter.md').toString());
// console.log(jsonML);
// console.log("筛选后:",filter(jsonML.content));

const highlight = require("./prisme.js");
const MT = require('mark-twain');
const fs = require('fs');
const jsonML = MT(fs.readFileSync('prisme.md').toString());
console.log(jsonML);
const util = require('util');

console.log("筛选后:",util.inspect(highlight(jsonML),{showHidden:true,depth:3}));

