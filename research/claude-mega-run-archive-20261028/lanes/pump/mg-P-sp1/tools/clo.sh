#!/bin/bash
# clo.sh in.ll out.o : run clang -O3 (opt pipeline + SBF codegen with rustc's target features) on an IR file
CL=~/.cache/solana/v1.44/platform-tools/llvm/bin/clang
$CL -O3 -target sbf -Xclang -target-feature -Xclang +store-imm -Xclang -target-feature -Xclang +jmp-ext -ffunction-sections -Wno-override-module -c "$1" -o "$2" "${@:3}"
