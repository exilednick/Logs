/* Recieves the dates object and two dates
   and returns the first and last index
   from where the value should be fetched */

const dateVerify = require('./dateVerify');
const comp = require('./comp');
function extract(dates, date1, date2) {

  let mn = Infinity, mx = -1;

  for(let i of Object.keys(dates)) {
    const logDates = dateVerify.parseRev(i,'-');

    if(comp.lt(date1, logDates) && comp.gt(date2, logDates)) {
      mn = Math.min(mn,dates[i][0]);
      mx = Math.max(mx,dates[i][1]);
    }
  }
  return [mn,mx];
}

module.exports = extract;
