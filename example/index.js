const {
  getStartupDateList,
  getShutdownDateList,
} = require('../');
const { formatDate } = require('../lib/utils');

(async () => {
  try {
    const shutdownDateList = await getShutdownDateList();
    console.log('Shutdown history');
    console.log(shutdownDateList.map(item => formatDate(item)));

    const startupDateList = await getStartupDateList();
    console.log('Startup history');
    console.log(startupDateList.map(item => formatDate(item)));
  } catch(err) {
    console.error(err);
  }
})();
