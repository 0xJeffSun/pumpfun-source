#!/usr/bin/env bash
# Local SDK fixtures only. Input hashes are checked before validator startup.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$HERE/start_localnet.py" "$@"
