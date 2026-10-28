#!/bin/bash
# exact native build (bytes == authenticated Linux v1.44); same arguments as native_build.sh
EXACT=1 exec "$(dirname "$0")/native_build.sh" "$@"
