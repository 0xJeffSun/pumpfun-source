# Qualified437 ErrorKind Debug selected tables

This packet proves **42 explicitly selected table entries and their 542 counted name bytes** for the matched `std::io::ErrorKind::fmt` body. It adds 336 exactly compared length bytes, 168 exactly compared pointer-zero bytes and 168 mapped pointer bytes: **1,214 new payload bytes** total.

Original owner O0345 is `[668424, 668536)`; candidate owner is `[602104, 602216)`. The existing relation remains **437 normalized functions / 141 raw functions / 431 closed windows / 581 candidate pairs**. All prior ErrorCode and ProgramError message obligations are preserved. There is no new function match.

## Bounded use and provenance

The 112-byte owner loads a one-byte tag, multiplies it by eight, indexes a length table and an encoded relocated-pointer table, loads both values, and passes them to `Formatter::write_str`. The verifier checks every instruction, operand register, load width, index shift, relocation and direct target. Its 48-byte writer helper is checked again: the pointer and length remain in r2 and r3 through the unresolved callback boundary. No callback target or runtime effect is claimed.

The selected domain is the 42 variants in the archived installed compiler-sysroot `std/src/io/error.rs`. Every observed index 0–41 must yield the corresponding source name with exactly that byte length in both saved images. This is an observed mapping for these images, not a stable Rust enum ABI promise. Index 42 is rejected before a table read.

The source copy's path is tied to the compiler path in the qualified437 launch and the recorded compiler hash. This is **installed source context**, not an attestation that the original program was built from that file, and not a Cargo.lock-authenticated dependency source. The actual byte comparisons and fixed instruction path establish the narrow evidence here. The copied source and its license files are sealed in the packet.

## Exact intervals and limits

Only these selected entries are read: original lengths `[722056, 722392)` and original pointers `[732104, 732440)`. The matching candidate addresses are recorded for every entry. Length slots have no relocation; every pointer slot must have the observed zero low word and a type-8, symbol-index-zero relocation. Its high word is compared as pointer correspondence to the counted name, not numerical address equality. All name intervals are inside `.rodata` and have no relocation.

These intervals are **not inferred full-array or allocation extents**. The neighboring entries are deliberately outside the claim; no NUL, address adjacency or allocator assumption supplies a bound. Tests mutate the byte immediately after each selected table and confirm that the selected entries do not silently expand to include it.

The function assumes a valid `ErrorKind`. This proof checks the explicit source-supported indices only; it makes no claim for arbitrary byte tags, undefined behavior, generic dispatch, runtime output or whole-ELF identity. The artifact remains bound to the qualified437 image pair.

## Coverage and checks

Measured payload coverage becomes **15,229 / 26,180 bytes (58.2%)**, leaving **10,951 bytes unproved**. The delta keeps exact raw bytes separate from mapped pointer fields and adds no relocation-table coverage. Existing packets and coverage ledgers remain immutable.

```sh
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-kind-tables-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-kind-tables-20261028/test_verify.py
```

Tests corrupt all 42 actual names, lengths and pointers; check failure propagation; reject tag 42, changed tag width/index shift/count register, pointer zero words and relocation metadata; and check table-end bounds, packet inventory, special files, and resealed source/report/coverage edits.

## Entry mapping

Each slot is eight bytes. Addresses below are original / candidate, and byte intervals have exclusive ends.

| Index | Source name | Length slots | Pointer slots | Original name interval | Candidate name interval | Count |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `NotFound` | 722056 / 702496 | 732104 / 712544 | 707160–707168 | 689520–689528 | 8 |
| 1 | `PermissionDenied` | 722064 / 702504 | 732112 / 712552 | 710632–710648 | 691344–691360 | 16 |
| 2 | `ConnectionRefused` | 722072 / 702512 | 732120 / 712560 | 721534–721551 | 701974–701991 | 17 |
| 3 | `ConnectionReset` | 722080 / 702520 | 732128 / 712568 | 721551–721566 | 701991–702006 | 15 |
| 4 | `HostUnreachable` | 722088 / 702528 | 732136 / 712576 | 721566–721581 | 702006–702021 | 15 |
| 5 | `NetworkUnreachable` | 722096 / 702536 | 732144 / 712584 | 721581–721599 | 702021–702039 | 18 |
| 6 | `ConnectionAborted` | 722104 / 702544 | 732152 / 712592 | 721599–721616 | 702039–702056 | 17 |
| 7 | `NotConnected` | 722112 / 702552 | 732160 / 712600 | 721616–721628 | 702056–702068 | 12 |
| 8 | `AddrInUse` | 722120 / 702560 | 732168 / 712608 | 721628–721637 | 702068–702077 | 9 |
| 9 | `AddrNotAvailable` | 722128 / 702568 | 732176 / 712616 | 710664–710680 | 691376–691392 | 16 |
| 10 | `NetworkDown` | 722136 / 702576 | 732184 / 712624 | 721637–721648 | 702077–702088 | 11 |
| 11 | `BrokenPipe` | 722144 / 702584 | 732192 / 712632 | 721648–721658 | 702088–702098 | 10 |
| 12 | `AlreadyExists` | 722152 / 702592 | 732200 / 712640 | 721658–721671 | 702098–702111 | 13 |
| 13 | `WouldBlock` | 722160 / 702600 | 732208 / 712648 | 721499–721509 | 701939–701949 | 10 |
| 14 | `NotADirectory` | 722168 / 702608 | 732216 / 712656 | 721671–721684 | 702111–702124 | 13 |
| 15 | `IsADirectory` | 722176 / 702616 | 732224 / 712664 | 721684–721696 | 702124–702136 | 12 |
| 16 | `DirectoryNotEmpty` | 722184 / 702624 | 732232 / 712672 | 721696–721713 | 702136–702153 | 17 |
| 17 | `ReadOnlyFilesystem` | 722192 / 702632 | 732240 / 712680 | 721713–721731 | 702153–702171 | 18 |
| 18 | `FilesystemLoop` | 722200 / 702640 | 732248 / 712688 | 721731–721745 | 702171–702185 | 14 |
| 19 | `StaleNetworkFileHandle` | 722208 / 702648 | 732256 / 712696 | 721745–721767 | 702185–702207 | 22 |
| 20 | `InvalidInput` | 722216 / 702656 | 732264 / 712704 | 721767–721779 | 702207–702219 | 12 |
| 21 | `InvalidData` | 722224 / 702664 | 732272 / 712712 | 721779–721790 | 702219–702230 | 11 |
| 22 | `TimedOut` | 722232 / 702672 | 732280 / 712720 | 707168–707176 | 689528–689536 | 8 |
| 23 | `WriteZero` | 722240 / 702680 | 732288 / 712728 | 721790–721799 | 702230–702239 | 9 |
| 24 | `StorageFull` | 722248 / 702688 | 732296 / 712736 | 721799–721810 | 702239–702250 | 11 |
| 25 | `NotSeekable` | 722256 / 702696 | 732304 / 712744 | 721810–721821 | 702250–702261 | 11 |
| 26 | `QuotaExceeded` | 722264 / 702704 | 732312 / 712752 | 721821–721834 | 702261–702274 | 13 |
| 27 | `FileTooLarge` | 722272 / 702712 | 732320 / 712760 | 721834–721846 | 702274–702286 | 12 |
| 28 | `ResourceBusy` | 722280 / 702720 | 732328 / 712768 | 721846–721858 | 702286–702298 | 12 |
| 29 | `ExecutableFileBusy` | 722288 / 702728 | 732336 / 712776 | 721858–721876 | 702298–702316 | 18 |
| 30 | `Deadlock` | 722296 / 702736 | 732344 / 712784 | 707248–707256 | 689608–689616 | 8 |
| 31 | `CrossesDevices` | 722304 / 702744 | 732352 / 712792 | 721876–721890 | 702316–702330 | 14 |
| 32 | `TooManyLinks` | 722312 / 702752 | 732360 / 712800 | 721890–721902 | 702330–702342 | 12 |
| 33 | `InvalidFilename` | 722320 / 702760 | 732368 / 712808 | 721902–721917 | 702342–702357 | 15 |
| 34 | `ArgumentListTooLong` | 722328 / 702768 | 732376 / 712816 | 721917–721936 | 702357–702376 | 19 |
| 35 | `Interrupted` | 722336 / 702776 | 732384 / 712824 | 721936–721947 | 702376–702387 | 11 |
| 36 | `Unsupported` | 722344 / 702784 | 732392 / 712832 | 721947–721958 | 702387–702398 | 11 |
| 37 | `UnexpectedEof` | 722352 / 702792 | 732400 / 712840 | 721958–721971 | 702398–702411 | 13 |
| 38 | `OutOfMemory` | 722360 / 702800 | 732408 / 712848 | 721971–721982 | 702411–702422 | 11 |
| 39 | `InProgress` | 722368 / 702808 | 732416 / 712856 | 721982–721992 | 702422–702432 | 10 |
| 40 | `Other` | 722376 / 702816 | 732424 / 712864 | 721992–721997 | 702432–702437 | 5 |
| 41 | `Uncategorized` | 722384 / 702824 | 732432 / 712872 | 721997–722010 | 702437–702450 | 13 |
