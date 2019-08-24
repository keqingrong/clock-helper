'use strict';
const { exec } = require('child_process');
const readline = require('readline');

const env = process.env.NODE_ENV;
const startupQuery = '"*[System[Provider[@Name=\'Microsoft-Windows-Kernel-General\'] and EventID=1]]"';
const shutdownQuery = '"*[System[Provider[@Name=\'Microsoft-Windows-Kernel-Power\'] and EventID=107]]"';

/**
 * 获取系统事件的历史发生时间
 * @param {string} query
 * @returns {string[]}
 */
function getSystemEventDateList(query) {
  return new Promise((resolve, reject) => {
    const command = 'wevtutil qe System /rd:true /f:text /q:' + query;
    const subprocess = exec(command, {
      encoding: 'buffer'
    })
    const rl = readline.createInterface({
      input: subprocess.stdout,
      crlfDelay: Infinity
    });
    const dateList = [];
    rl.on('line', (line) => {
      if (line.includes('Date:')) {
        // 这里的 Date 格式为 "2019-05-25T21:15:53.500"，
        // 对应的 ISO 时间为 "2019‎-‎05‎-‎25T13:15:53.500000000Z"，
        // 也就是 Windows 默认输出当前系统所在时区的时间。
        // 如果使用 `Date.parse()` 方法解析 "2019-05-25T21:15:53.500"
        // 格式时间，会默认设置为当前系统所在时区，不需要做额外处理。
        dateList.push(line.replace(/\s*Date:\s*/, ''));
      }
    });

    subprocess.stderr.on('data', (data) => {
      env === 'dev' && console.error(`stderr: ${data}`);
    });

    subprocess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
        return;
      }

      resolve(dateList);
    });
  });
}

/**
 * 获取系统历史开机时间，包括通电开机和从睡眠状态唤醒
 * @returns {Date[]}
 */
async function getWin32StartupDateList() {
  const startupDateList = await getSystemEventDateList(startupQuery);
  return startupDateList.map(item => new Date(item));
}

/**
 * 获取系统历史关机时间，包括休眠和关闭电源
 * @returns {Date[]}
 */
async function getWin32ShutdownDateList() {
  const shutdownDateList = await getSystemEventDateList(shutdownQuery);
  return shutdownDateList.map(item => new Date(item));
}

module.exports = {
  getWin32StartupDateList,
  getWin32ShutdownDateList
};
