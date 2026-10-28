# Failed controls

All failures stopped before acceptance and are retained to prevent accidental promotion or repetition.

- The first builder invocation placed its output outside the repository; the builder rejected that staging path before compilation.
- The first in-repository offline build stopped on a missing `generic-array 0.14.9` archive. The isolated registry was then populated with `cargo fetch --locked`; the untouched L24 rebuild subsequently reproduced both parent hashes.
- Full runtime attempt 1 stopped because sparse checkout omitted the captured Mayhem dependency required by `create_v2`.
- Full runtime attempt 2 stopped because the Tokenkeg adapter's historical harness was not materialized.
- Full runtime attempt 3 stopped because Tokenkeg correctly rejected the input crate path against the build record's staged-source manifest. A focused control passed with the staged source directory, and the final unchanged aggregate runner then passed all 44 suites.

The corresponding machine-readable builder and aggregate-run failure reports are in this directory. No failed receipt is used by `verify.py`.
