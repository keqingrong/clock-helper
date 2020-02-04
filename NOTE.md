# Note

Windows

```bat
wevtutil qe System /rd:true /f:text /q:"*[System[Provider[@Name='Microsoft-Windows-Kernel-Power'] and EventID=107]]"

Event[24]:
  Log Name: System
  Source: Microsoft-Windows-Kernel-Power
  Date: 2019-05-26T10:21:11.251
  Event ID: 107
  Task: N/A
  Level: 信息
  Opcode: 信息
  Keyword: N/A
  User: N/A
  User Name: N/A
  Computer: DESKTOP-ONE
  Description:
系统已从睡眠状态恢复。

Event[25]:
  Log Name: System
  Source: Microsoft-Windows-Kernel-Power
  Date: 2019-05-25T21:20:05.036
  Event ID: 107
  Task: N/A
  Level: 信息
  Opcode: 信息
  Keyword: N/A
  User: N/A
  User Name: N/A
  Computer: DESKTOP-ONE
  Description:
系统已从睡眠状态恢复。

Event[26]:
  Log Name: System
  Source: Microsoft-Windows-Kernel-Power
  Date: 2019-05-25T20:59:58.630
  Event ID: 107
  Task: N/A
  Level: 信息
  Opcode: 信息
  Keyword: N/A
  User: N/A
  User Name: N/A
  Computer: DESKTOP-ONE
  Description:
系统已从睡眠状态恢复。
```

Linux

```sh
$ last -x reboot
reboot   system boot  4.15.0-72-generi Tue Feb  4 21:04   still running
reboot   system boot  4.15.0-72-generi Tue Feb  4 21:02 - 13:04  (-7:58)

$ last -x shutdown
shutdown system down  4.15.0-72-generi Tue Feb  4 13:04 - 21:04  (08:00)
shutdown system down  4.15.0-72-generi Tue Feb  4 13:02 - 21:02  (08:00)
```

macOS

```sh
$ last reboot
reboot    ~                         Tue Feb  4 09:16
reboot    ~                         Sun Feb  2 21:12
reboot    ~                         Sun Feb  2 17:18
reboot    ~                         Sun Feb  2 16:49
reboot    ~                         Fri Jan 31 19:31

$ last shutdown
shutdown  ~                         Mon Feb  3 23:22
shutdown  ~                         Sun Feb  2 21:10
shutdown  ~                         Sun Feb  2 17:18
```
