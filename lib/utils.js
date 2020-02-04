
/**
 * 格式化时间
 * @param {string} date
 * @returns {string}
 */
function formatDate(date) {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const re = /(\w+)\s+(\w+)\s+(\d+)\s+(\d+)\:(\d+)/;
/**
 * 解析时间
 * @param {string} date
 * @returns {string}
 * "Tue Feb  4 21:04" 即 "ddd MMM  D HH:mm"
 * "Fri Jan 31 19:31" 即 "ddd MMM DD HH:mm"
 */
function parseDate(str) {
  const result = re.exec(str);
  if (result) {
    const weekdayStr = result[1];
    const monthStr = result[2];
    const day = parseInt(result[3], 10); // 1-31
    const hours = parseInt(result[4], 10);
    const minutes = parseInt(result[5], 10);
    const weekday = weekdays
      .map(item => item.toLowerCase())
      .indexOf(weekdayStr.toLowerCase()); // 0-6
    const month = months
      .map(item => item.toLowerCase())
      .indexOf(monthStr.toLowerCase()); // 0-11
    // 根据 "Tue Feb  4 09:16" 即 "02月04日 周二" 推算出 "2020-02-04"
    const date = findDate(month, day, weekday);
    if (date) {
      date.setHours(hours, minutes, 0);
      return date;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

/**
 * 查找符合条件的日期
 * @param {number} month - 月 0-11
 * @param {number} day - 日 1-31
 * @param {number} weekday - 星期 0-6
 * @returns {Date}
 */
function findDate(month, day, weekday) {
  const baseDate = new Date();
  let startYear = baseDate.getFullYear();
  // 从当前年份向前找，找到一个符合条件的日期则返回
  while (startYear > 0) {
    baseDate.setFullYear(startYear, month, day);
    if (baseDate.getDay() === weekday) {
      return baseDate;
    } else {
      startYear--;
    }
  }

  startYear = new Date().getFullYear() + 1;
  const endYear = 5000;
  // 从当前年份向后找，到公元5000年截止
  while (startYear < endYear) {
    baseDate.setFullYear(startYear, month, day);
    if (baseDate.getDay() === weekday) {
      return baseDate;
    } else {
      startYear++;
    }
  }

  return null;
}

module.exports = {
  formatDate,
  parseDate
}
