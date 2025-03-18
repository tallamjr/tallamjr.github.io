---
draft: true
date:
  created: 2017-11-06
  updated: 2024-01-02
authors: [tallamjr]
categories:
  - Conferences
  - Embedded Systems
  - Life
  - Opinionated
  - RSW Engineering
  - Tooling
  - tinyML + Edge A.I.
tags:
  - unix
  - vim
---

# 👾 **Title ..**

A while ago I worked on a method to allow local writing of development logs in markdown, which I
could then upload to Github where my supervisor could take a look. Here are the steps..

<!-- more -->

```bash
15:12:17 ✘ ~  :: diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *1.0 TB     disk0
   1:             Apple_APFS_ISC Container disk1         524.3 MB   disk0s1
   2:                 Apple_APFS Container disk3         994.7 GB   disk0s2
   3:        Apple_APFS_Recovery Container disk2         5.4 GB     disk0s3

/dev/disk3 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +994.7 GB   disk3
                                 Physical Store disk0s2
   1:                APFS Volume Macintosh HD            10.3 GB    disk3s1
   2:              APFS Snapshot com.apple.os.update-... 10.3 GB    disk3s1s1
   3:                APFS Volume Preboot                 6.6 GB     disk3s2
   4:                APFS Volume Recovery                1.1 GB     disk3s3
   5:                APFS Volume Macintosh HD - Data     889.0 GB   disk3s5
   6:                APFS Volume VM                      4.3 GB     disk3s6

/dev/disk4 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     Apple_partition_scheme                        +527.1 MB   disk4
   1:        Apple_partition_map                         32.3 KB    disk4s1
   2:                  Apple_HFS Dropbox Offline Inst... 527.1 MB   disk4s2

/dev/disk5 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +8.3 GB     disk5
   1:                        EFI EFI                     209.7 MB   disk5s1
   2:                  Apple_HFS KiCad                   8.0 GB     disk5s2

/dev/disk6 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *62.6 GB    disk6
   1:             Windows_FAT_32 bootfs                  536.9 MB   disk6s1
   2:                      Linux                         62.1 GB    disk6s2


```

```bash
14:41:38 ✔ ~  :: ls /dev/tty.*
/dev/tty.Bluetooth-Incoming-Port  /dev/tty.usbmodem2102


19:17:23 ✔ ~  :: screen /dev/tty.usbmodem2102 115200
```
