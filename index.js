'use strict';
const {
  getPosixStartupDateList,
  getPosixShutdownDateList
} = require('./lib/posix');
const {
  getWin32StartupDateList,
  getWin32ShutdownDateList
} = require('./lib/win32');

/**
 * 获取系统历史开机时间，包括通电开机和从睡眠状态唤醒
 */
async function getStartupDateList() {
  if (process.platform === 'win32') {
    return getWin32StartupDateList();
  }
  return getPosixStartupDateList();
}

/**
 * 获取系统历史关机时间，包括休眠和关闭电源
 */
async function getShutdownDateList() {
  if (process.platform === 'win32') {
    return getWin32ShutdownDateList();
  }
  return getPosixShutdownDateList();
}

module.exports = {
  getStartupDateList,
  getShutdownDateList,
  posix: {
    getStartupDateList: getPosixStartupDateList,
    getShutdownDateList: getPosixShutdownDateList
  },
  win32: {
    getStartupDateList: getWin32StartupDateList,
    getShutdownDateList: getWin32ShutdownDateList
  }
}
