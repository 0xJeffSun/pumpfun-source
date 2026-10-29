# Custom 错误前缀的有界覆盖

新增 `.rodata` **22 字节**：`[720306, 720328)`，内容为 `Custom program error: `。原程序的描述符位于 731784，候选程序对应位置为 712224；两者均有重定位指针和明确的 22 字节长度，所指文本逐字节相同。此前已闭合的 ProgramError Display 函数在两侧均引用该描述符。本证据只证明静态数据及引用，不声称运行输出或相邻空间的含义。

基线使用 `mayhem-current437-bounded-error-strings-20261029`，覆盖 20,747 / 26,180 字节；本包后为 20,769 / 26,180 字节。`[719929, 719932)` 和 `[720328, 720376)` 缺少足够的边界证据，不计入。其他分支的未合并工作未纳入基线或重复计算。

在仓库根目录运行：

```sh
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-custom-error-prefix-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-custom-error-prefix-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts /opt/homebrew/bin/python3.12 -B scripts/test_tooling.py
```
