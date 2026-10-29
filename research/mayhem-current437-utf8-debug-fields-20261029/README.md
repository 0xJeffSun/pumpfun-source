# Utf8Error 调试字段

本包新增 `.rodata` **29 字节**：`[720219,720228)`（`Utf8Error`）、`[720228,720239)`（`valid_up_to`）和 `[720239,720248)`（`error_len`）。原始函数 646872 与候选函数 580552 中，分别检查重定位指针、长度及参数传递，再检查两者调用对应的 `debug_struct_field2_finish`（调试结构体格式化辅助函数）。长度来自立即数及栈上字段；检查止于调用，不推断运行时输出或相邻字节。候选数据地址分别为 700659、700668、700679。

基线是仓库已有的 bounded-error-strings 包：20,747 / 26,180 字节；本包后 20,776 / 26,180。此基线不含 #783，且本包新增区间不与 #783 的 `[720036,720219)` 相交。其他未证明区间不计入。

在仓库根目录运行：

```sh
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-utf8-debug-fields-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-utf8-debug-fields-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts /opt/homebrew/bin/python3.12 -B scripts/test_tooling.py
```
