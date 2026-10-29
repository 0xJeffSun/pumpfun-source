# Qualified437 grapheme lookup byte ranges

本证据包新增 **751 字节**：原始 `.rodata`（只读数据段）`[722528, 723279)`，对应候选二进制 `[702968, 703719)`；两边逐字节相同。区间右端不包含在内。上一证据包是 `mayhem-current437-rust-panic-messages-20261029`，没有重复计入其相邻区间。

原始函数 `[696640, 697736)` 与候选函数 `[630320, 631416)` 的完整指令分别固定校验。函数从 34 项四字节索引表读取起点，取每项高 11 位作为字节偏移；起点严格递增，从 0 到 747。对于最后一项，指令 `697416` 使用立即数 751 作为结束偏移；其他项使用下一索引的起点。函数用 `697528` 载入表地址，再于 `697600` 按字节读取，并以 `697656` 控制循环。验证两份二进制中指令、重定位（地址修正记录）、全部索引和值、表内每个字节和段边界。34 个相邻非空片段的合并范围恰为 `[0, 751)`；长度来自指令与索引，不依赖邻接字符串或猜测二进制内容。

索引表本身仅作为边界证据，不在本包计数；不宣称运行时每个分支都被访问，也不宣称 Unicode 分类语义或整个程序一致。原有函数证据仍为 437 个标准化函数、141 个原始函数、431 个闭合窗口、581 对候选、0 对拒绝。原有覆盖 19,880 / 26,180 字节，新增后为 **20,631 / 26,180**；仍有 5,549 字节未证明。

验证：

```sh
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-grapheme-ranges-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-grapheme-ranges-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/test_tooling.py
```

测试逐字节修改两份表、逐项修改索引，并修改地址、末尾索引、分支和读取指令；也检查区间后一字节不被吸收、文件清单、特殊文件及重新封存的伪造报告。
