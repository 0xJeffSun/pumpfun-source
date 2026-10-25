#!/bin/sh
set -eu
candidate=${1:?pass candidate ELF}
result_dir=${2:?pass a new output directory}
test_python=${3:-work/test-env/bin/python}
mkdir "$result_dir"
"$test_python" scripts/fees_validate_all.py --candidate "$candidate" --output "$result_dir/all-differential.json"
"$test_python" scripts/fees_external_codec_differential.py --candidate "$candidate" --output "$result_dir/codec-rejections.json"
"$test_python" repro/pump_fees/initializer-history/replay_history.py --candidate "$candidate" --output "$result_dir/historical-replay.json"
"$test_python" repro/pump_fees/initializer-history/negative_differential.py --candidate "$candidate" --output "$result_dir/initializer-rejections.json"
"$test_python" scripts/fees_error_messages_differential.py --candidate "$candidate" --output "$result_dir/error-literals.json"
"$test_python" scripts/fees_donation_sequence.py --candidate "$candidate" --output "$result_dir/donation-sequence.json"
"$test_python" repro/pump_fees/authority-guard-v144/compared_values.py --candidate "$candidate" --output "$result_dir/compared-values.json"
"$test_python" repro/pump_fees/authority-guard-v144/authority_logs.py --candidate "$candidate" --output "$result_dir/authority-logs.json"
