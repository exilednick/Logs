
const parse = (date,delimiter) => {
  /*parse the string date of format dd/mm/yyyy
    and creates an object */

  let i = date.indexOf(delimiter);

  let dd = date.slice(0, i);
  let mm = date.slice(i+1,date.indexOf(delimiter,i+1));
  let yyyy = date.slice(date.indexOf(delimiter, i+1)+1);

  return {'year':parseInt(yyyy),
          'month':parseInt(mm),
          'day': parseInt(dd)
        }
}

const parseRev = (date,delimiter) => {
  /*parse the string date of format yyyy/mm/dd
    and returns an object */
  let i = date.indexOf(delimiter);

  let yyyy = date.slice(0, i);
  let mm = date.slice(i+1,date.indexOf(delimiter,i+1));
  let dd = date.slice(date.indexOf(delimiter, i+1)+1);

  return {'year':parseInt(yyyy),
          'month':parseInt(mm),
          'day': parseInt(dd)
        }
}

const check = date => {
  //checks if the given date object as returned from parse is valid
  // Parameter -> String
  //Returns Boolean

  if(isNaN(date['day']) || isNaN(date['month']) || isNaN(date['year'])) {
    return false;
  }

  if(date['day']<0 || date['day']>31 || date['month']<0 || date['month']>12)
    return false;

  return true;
}

module.exports.check = check;
module.exports.parse = parse;
module.exports.parseRev = parseRev;
