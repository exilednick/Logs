function lt(date1, date2) {
  //returns whether date1<=date2
  if(date1['year']<date2['year'])
    return true;
  else if(date1['year'] == date2['year']) {
    if(date1['month']<date2['month'])
      return true;
    else if(date1['month']==date2['month']) {
      return date1['day']<=date2['day'];
    }
  }
  return false;
}

function gt(date1, date2) {
  //returns whether date1<=date2
  if(date1['year']>date2['year'])
    return true;
  else if(date1['year'] == date2['year']) {
    if(date1['month']>date2['month'])
      return true;
    else if(date1['month']==date2['month']) {
      return date1['day']>=date2['day'];
    }
  }
  return false;
}

module.exports.lt = lt;
module.exports.gt = gt;
