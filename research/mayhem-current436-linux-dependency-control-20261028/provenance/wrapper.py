#!/usr/bin/env python3
import os,sys
a=sys.argv[2:]
if "--crate-name" in a and a[a.index("--crate-name")+1]=="curve_accounts":a += ["--extern",'historical_anchor_program=/home/shawwalters.guest/amm436-linux/full436-01/macro-target/release/libanchor_attribute_program.so',"-L",'dependency=/home/shawwalters.guest/amm436-linux/full436-01/macro-target/release/deps']
os.execv(sys.argv[1],[sys.argv[1],*a])
