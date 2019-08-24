# clock-helper

[![npm version](https://img.shields.io/npm/v/clock-helper.svg)](https://www.npmjs.com/package/clock-helper)

> A clock helper for querying the time of startup and shutdown

## Installation

```sh
$ npm install clock-helper
```

## Usage

```js
const { getShutdownDateList } = require('clock-helper');

(async () => {
  try {
    const osShutdownDateList = await getShutdownDateList();
    console.log(osShutdownDateList));
    // [ 2019-08-24T13:58:43.968Z,
    // 2019-08-24T04:51:14.941Z,
    // 2019-08-22T15:16:36.939Z,
    // 2019-08-21T15:43:08.332Z,
    // 2019-08-18T15:35:03.466Z ]
  } catch(err) {
    console.error(err);
  }
})();
```

## API

- getStartupDateList()
- getShutdownDateList()

## TODO

- [ ] Support for macOS
- [ ] CLI
- [ ] Add unit test cases

## License

MIT © Qingrong Ke

## References

- [Want To Write Wevtutil Output To A Text File... - Computing.Net](https://www.computing.net/answers/programming/want-to-write-wevtutil-output-to-a-text-fileplz-help/29349.html)
- [wevtutil - Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/wevtutil)
