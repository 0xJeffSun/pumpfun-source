# Original OptionBool evidence

Original `0x6f4b0` (344 bytes) is the compact optional-bool decoder: it returns false on empty input, consumes one byte otherwise, recognizes 0/1, and formats the invalid byte on the remaining branch. The same error construction is inlined in CreatePool (`0xe31a0`), Buy (`0xe7648`), and BuyExactQuoteIn (`0xe7d88`). Every invalid-byte branch passes ErrorKind 21 to original shared `std::io::Error::new` at `0x84f8`.

Current `create.rs` passes the static string `Invalid bool representation` instead. The supported correction is to pass `format!("Invalid bool representation: {}", a[0])`, keeping InvalidData and EOF behavior. This evidence is not a build/runtime claim. Raw original bytes, table pointer encoding, source hash and bounded instructions are in original-evidence.json. The format-piece pointer is a type-8 relocation stored in the high 32 bits of its data word, following the original Solana ELF encoding.
