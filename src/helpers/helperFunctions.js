export const convertDateToYMDH = (date) => {
  // 2018-05-20 19:05
  let dateObj = {};
  const dateSplited = date.split('-');
  dateObj.year = parseInt(dateSplited[0]);
  dateObj.month = parseInt(dateSplited[1]);
  dateObj.day = parseInt(dateSplited[2].split(' ')[0]);
  dateObj = { ...dateObj, time: {} };
  dateObj.time.hours = parseInt(dateSplited[2].split(' ')[1].split(':')[0]);
  dateObj.time.minutes = parseInt(dateSplited[2].split(' ')[1].split(':')[1]);
  return dateObj;
};
