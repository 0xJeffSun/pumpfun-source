# Official Linux v1.48 Relay compiler measurement

The installed controller and manual-only workflow are byte-identical to the reviewed V2 proposal. Its source-only report describes the review stage; `installation.json` records the subsequent installation. Actual dispatch/build results, if any, belong to their separate run receipts. This directory does not claim that a Linux build has already run.

The experiment holds the frozen Relay12 source/lock/profile fixed while selecting authentic Linux compiler/sysroot and Linux v1.52 strip artifacts. It investigates the observed `/home/runner` versus `/Users/runner` diagnostic-data difference. Native tools/OS/strip bytes differ explicitly; it is not the same full recipe or historical-OS proof. No source-coordinate rewriting, VM, transaction, deployment or artifact promotion is part of this workflow.

`python3 -B repro/linux-measurement/verify_installation.py --repo .` validates the installation and reruns the 27 compiler-free QA checks. Only an explicit workflow dispatch can start the one-program-build measurement; failure receipts retain actual subprocess and integrity results.
