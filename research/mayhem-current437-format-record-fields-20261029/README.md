# Mayhem 格式化记录的有界字段

本包新增证明 `.rodata` **18 字节**：`[720328,720330)`、`[720344,720348)` 和 `[720360,720372)`。原始程序中的记录地址为 720328，对应候选程序中的地址为 700768；每个字段的实际读取宽度由指令限定，内容逐字节相等。

`ProgramError` 的 Custom 分支把记录指针和数量 1 传给格式化函数；该函数读取记录偏移 16 的两字节值 2，因此跳至读取偏移 18；然后读取偏移 0 的两字节值 2，接着读取偏移 32 的八字节和偏移 40 的四字节。若前面的写入回调被调用，此路径以回调成功为条件。证明止于静态指令和读取字段，不声称回调行为、实际输出、整个记录或整个程序相等。未读取的 30 字节和可选的 `[719929,719932)` 均不计入；不凭相邻内容、零值或结构大小推断覆盖。

基线验证使用已合并的 ProgramError 消息证据包，仅以本包列出的三个区间作为新增范围，不对其他未合并工作作覆盖统计。`observations.json.gz` 记录两份映像中的地址、字段和读取指令偏移；`inputs.json` 与 `manifest.json` 固定输入和包内文件的哈希值。

归属：OpenAI / gpt-6.1-terra / codex-cli / high。

在仓库根目录执行：

```sh
export PATH=/Library/Developer/CommandLineTools/usr/bin:/opt/homebrew/bin:$PATH
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-format-record-fields-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-format-record-fields-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts /opt/homebrew/bin/python3.12 -B scripts/test_tooling.py
```
