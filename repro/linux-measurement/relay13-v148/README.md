# Selected Relay13 Linux v1.48 controlled measurement

The reviewed source proposal under `record/` is preserved exactly. Its outside-checkout and no-installation statements describe the proposal phase. The new driver and manual-only workflow are installed byte-identically; installation itself performs no download, Cargo fetch/build, dispatch, target execution or promotion. The originating Relay12 driver/workflow and actual control remain unchanged.

The source is the exact selected Relay13 snapshot, with only src/idl.rs different from measured Linux Relay12 and the same lock/profile. The control parent b54b728c and inner d576fc96 are hard-pinned. The measured compiler archive SHA256 is now enforced in addition to official asset identity; its publisher digest remains null. Before any program build, selected native/sysroot/strip hashes and stock cfg/spec must agree with the actual Linux control. Host image/libc/loader observations do not establish full system-library identity.

This workflow allows one private offline program build after locked cache preparation, no inputs/retries/VM/transactions/deployment/default changes. It retains complete target ledgers, actual three-callee/data limits and a 492-row original-window transition table against Linux Relay12. Darwin Relay12 is a historical different-source reference, not a source-controlled OS comparison. Exact conditions and limits are in record/README.md.

Independent review and all 35 mocked/saved-byte checks pass. `installation.json` records the installation phase; later run observations must be recorded separately. The proposed candidate remains unselected.

```sh
python3 -B repro/linux-measurement/relay13-v148/verify_installation.py --repo .
```
