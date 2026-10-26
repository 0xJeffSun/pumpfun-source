#!/usr/bin/env bash
# Reproduce the independent sBPF cross-check. Read-only; standard library only.
set -euo pipefail
cd "$(dirname "$0")"

echo "== ATA reserve_for_push ordering cross-check =="
python3 verify_ata_order.py

echo
echo "== Local binary inventory =="
python3 inventory.py

cat <<'NOTE'

Optional Ghidra oracle (independent engine). Requires an extracted Ghidra
12.1.x and a JDK 21+; Ghidra/JDK are bring-your-own and not installed here:

  export JAVA_HOME=/absolute/path/to/jdk-21
  export GHIDRA_HEADLESS_MAXMEM=8G
  "$GHIDRA_INSTALL_DIR/support/analyzeHeadless" /tmp/p ata \
    -import /path/to/evidence/dependencies/associated_token/deployed.so \
    -processor "eBPF:LE:64:default" \
    -loader ElfLoader -loader-applyRelocations false \
    -scriptPath "$PWD/ghidra_scripts" -postScript DumpText.java -deleteProject
NOTE
