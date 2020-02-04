'use strict';
const {
  getDarwinStartupDateList,
  getDarwinShutdownDateList
} = require('./lib/darwin');
const {
  getLinuxStartupDateList,
  getLinuxShutdownDateList
} = require('./lib/linux');
const {
  getWin32StartupDateList,
  getWin32ShutdownDateList
} = require('./lib/win32');

/**
 * 获取系统历史开机时间，包括通电开机和从睡眠状态唤醒
 */
async function getStartupDateList() {
  switch (process.platform) {
    case 'win32':
      return getWin32StartupDateList();
    case 'darwin':
      return getDarwinStartupDateList();
    case 'linux':
      return getLinuxStartupDateList();
    default:
      return [];
  }
}

/**
 * 获取系统历史关机时间，包括休眠和关闭电源
 */
async function getShutdownDateList() {
  switch (process.platform) {
    case 'win32':
      return getWin32ShutdownDateList();
    case 'darwin':
      return getDarwinShutdownDateList();
    case 'linux':
      return getLinuxShutdownDateList();
    default:
      return [];
  }
}

module.exports = {
  getStartupDateList,
  getShutdownDateList,
  posix: {
    getStartupDateList: getStartupDateList,
    getShutdownDateList: getShutdownDateList
  },
  win32: {
    getStartupDateList: getWin32StartupDateList,
    getShutdownDateList: getWin32ShutdownDateList
  }
}
