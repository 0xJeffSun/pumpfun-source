# Mayhem 有界编码名称和错误字符串

主目标 `[719929, 720376)` 新证明 **183 字节**，范围为 `[720036, 720219)`。十处指令在原始和候选映像中分别装入地址与立即数长度，指向的字节逐一相同；此证明只覆盖这些静态指令和指定字节，不声称程序运行输出、整个函数或整份二进制相等，不用 NUL 或邻接关系确定长度。指令地址与文本见 `observations.json.gz`，每条长度均独立验证。

覆盖基线为 #750、#756、#758 的已有覆盖并集，以及 #770 的三处既有证据；后者在检查时尚未合入最新 upstream/main（主分支），故在本包中根据公开提交 `57fa31774027c426a0a68c18344d523f1e85ff98` 的证明逻辑独立复核，再并入基线，绝不算作新增。基线为 20,747 / 26,180 字节；本包后为 **20,930 / 26,180**，其中 `.rodata` 14,218 / 18,396，`.data.rel.ro` 6,712 / 7,784。主缺口其余字节未证明，包含零填充与未经长度约束的数据。

在仓库根目录运行：

```sh
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-bounded-encoding-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B research/mayhem-current437-bounded-encoding-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 /opt/homebrew/bin/python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts /opt/homebrew/bin/python3.12 -B scripts/test_tooling.py
```

provider=OpenAI model=gpt-6.1-terra client=codex-cli reasoning=high

Made via @slopdotcash
