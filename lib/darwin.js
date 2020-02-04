'use strict';
const { exec } = require('child_process');
const readline = require('readline');
const { parseDate } = require('./utils');

const env = process.env.NODE_ENV;
const queryStartupCommand = 'last reboot';
const querryShutdownCommand = 'last shutdown';

/**
 * 获取系统事件的历史发生时间
 * @param {string} command
 * @returns {Date[]}
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
      if (!line.includes('wtmp')) {
        const date = parseDate(line);
        if (date) {
          dateList.push(date);
        }
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
async function getDarwinStartupDateList() {
  return await getDateListByCommand(queryStartupCommand);
}

/**
 * 获取系统历史关机时间，包括休眠和关闭电源
 * @returns {Date[]}
 */
async function getDarwinShutdownDateList() {
  return await getDateListByCommand(querryShutdownCommand);
}

module.exports = {
  getDarwinStartupDateList,
  getDarwinShutdownDateList
};
