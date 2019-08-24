'use strict';
const { exec } = require('child_process');
const readline = require('readline');

const env = process.env.NODE_ENV;
const queryStartupCommand = 'last | grep reboot';
const querryShutdownCommand = 'last | grep shutdown';

/**
 * 获取系统事件的历史发生时间
 * @param {string} command
 * @returns {string[]}
 */
function getDateListByCommand(command) {
  return new Promise((resolve, reject) => {
    const subprocess = exec(command, {
      encoding: 'buffer'
    })
    const rl = readline.createInterface({
      input: subprocess.stdout,
      crlfDelay: Infinity
    });
    const dateList = [];
    rl.on('line', (line) => {
      // TODO: 解析时间字符串
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
async function getPosixStartupDateList() {
  const startupDateList = await getDateListByCommand(queryStartupCommand);
  return startupDateList.map(item => new Date(item));
}

/**
 * 获取系统历史关机时间，包括休眠和关闭电源
 * @returns {Date[]}
 */
async function getPosixShutdownDateList() {
  const shutdownDateList = await getDateListByCommand(querryShutdownCommand);
  return shutdownDateList.map(item => new Date(item));
}

module.exports = {
  getPosixStartupDateList,
  getPosixShutdownDateList
};
