#!/bin/bash
# var.sh NAME [FROM_SRC] : APFS-clone a source tree to var/NAME/src (default from L/src)
L=/Users/shawwalters/amm100-run/lanes/mg-A-raw; F=${2:-$L/src}
rm -rf $L/var/$1; mkdir -p $L/var/$1 && cp -c -R $F/. $L/var/$1/src && echo $L/var/$1/src
