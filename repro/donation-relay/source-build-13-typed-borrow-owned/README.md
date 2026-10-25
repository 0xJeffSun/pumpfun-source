# Relay build13: checked typed-borrow owned ProgramError

One isolated pinned build from accepted build12 source23 plus the reviewed checked-borrow failure conversion in src/idl.rs. Candidate e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244; symbols2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596. Complete source is source/; source-map.json binds all23 inputs. Exact build/static/runtime evidence is evidence/ (sealad1e7ad15f4dcf2814106dad9ec2d44a74952951bb789abb5a7e32602eb58b64).

Checked failed data borrow now owns the actual ProgramError in128byte existing framework allocation before outer account naming/log/lower. Failure acquires no guard and decrements none. Unchecked=false path remains lightweight. Source3002 line115→123 is natural, original line36 remains unmatched. No coordinate coercion, new compiler flags or guessed manual ABI.

Unchanged ordinary12 passes24signed submissions,50signature fields,12unique transactions,25unique signatures,24effects. New borrow-failure runtime coverage ZERO; no authority/source-origin probe or new fixture. Full492original/330candidate windows retain122normalized/33raw matches and370unmatched. No normalized gain, whole-original byte identity, historical compiler or full security equivalence is claimed. This checkpoint reuses the actual tested source/binary; there is no separate active Relay crate or fictitious main rebuild.

Saved-only portable verification: python3 -B verify.py. No VM/build/network. Requires pinned installed solders for saved signature checks.
