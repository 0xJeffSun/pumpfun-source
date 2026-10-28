// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(753887),
    n = e.i(489442),
    a = e.i(424509),
    i = e.i(353110),
    s = e.i(971370),
    o = e.i(959719),
    r = e.i(575281),
    u = e.i(619290),
    d = e.i(574941),
    c = e.i(47446),
    p = class e extends Error {
      name = "BountiesError";
      code;
      numericCode;
      logs;
      cause;
      constructor(e) {
        (super(e.error.errorMessage || e.message),
          (this.code = e.error.errorCode.code),
          (this.numericCode = e.error.errorCode.number),
          (this.logs = e.logs ?? []),
          (this.cause = e));
      }
      isCode(e) {
        return this.code === e;
      }
      static fromUnknown(t) {
        return t instanceof i.x ? new e(t) : null;
      }
      static rethrow(t) {
        throw e.fromUnknown(t) ?? t;
      }
    },
    m = {
      address: "goGzNYTYkSEe4hUqz6dPmY5uf3CTt36AQAoujXDrKiV",
      metadata: {
        name: "pump_bounties",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Pump Bounties escrow and dispute Solana program",
      },
      docs: ["Anchor entrypoints for bounty lifecycle and configuration."],
      instructions: [
        {
          name: "claim_award",
          docs: [
            "Winner pulls their award amount; closes the [`Award`](crate::awards::state::Award)",
            "PDA (rent refunded to claimant).",
          ],
          discriminator: [171, 180, 56, 47, 60, 0, 25, 205],
          accounts: [
            {
              name: "claimant",
              docs: [
                "Must equal [`Award::recipient`]; receives the payout and the rent refunded from `award`.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "award",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [97, 119, 97, 114, 100] },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "award.submission_commitment",
                    account: "Award",
                  },
                  { kind: "account", path: "award.mint", account: "Award" },
                ],
              },
            },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "claimant_token_account", writable: !0 },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "claim_bounty_fee_refund",
          docs: [
            "Payer pulls their earmarked fee refund, closes the escrow token vault, and",
            "closes the [`BountyFeeEscrow`](crate::fees::state::BountyFeeEscrow) PDA",
            "(rent back to the payer). Callable with a zero refund to reclaim rent.",
          ],
          discriminator: [86, 117, 22, 99, 35, 151, 230, 97],
          accounts: [
            {
              name: "payer",
              docs: [
                "Must equal [`BountyFeeEscrow::payer`]; receives the refund + reclaimed rent.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            { name: "fee_mint" },
            {
              name: "bounty_fee_escrow",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [98, 111, 117, 110, 116, 121, 95, 102, 101, 101],
                  },
                  {
                    kind: "account",
                    path: "bounty_fee_escrow.bounty",
                    account: "BountyFeeEscrow",
                  },
                  { kind: "account", path: "payer" },
                  {
                    kind: "account",
                    path: "bounty_fee_escrow.quote_nonce",
                    account: "BountyFeeEscrow",
                  },
                ],
              },
            },
            {
              name: "escrow_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bounty_fee_escrow" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "fee_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "payer_token_account", writable: !0 },
            { name: "token_program" },
          ],
          args: [],
        },
        {
          name: "claim_dispute_refund",
          docs: [
            "Opener pulls their earmarked dispute-fee refund; closes the",
            "[`Dispute`](crate::decision::state::Dispute) PDA and routes all remaining lamports",
            "(refund + rent) to the opener.",
          ],
          discriminator: [22, 202, 39, 12, 42, 145, 135, 68],
          accounts: [
            {
              name: "opener",
              docs: [
                "Must equal [`Dispute::opener`]; receives the refunded escrow and the PDA rent.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "dispute",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [100, 105, 115, 112, 117, 116, 101] },
                  { kind: "account", path: "bounty" },
                  { kind: "account", path: "opener" },
                ],
              },
            },
          ],
          args: [],
        },
        {
          name: "claim_refund",
          docs: [
            "Depositor pulls their pro-rata refund of the unawarded remainder.",
          ],
          discriminator: [15, 16, 30, 161, 255, 228, 97, 60],
          accounts: [
            {
              name: "depositor",
              docs: [
                "The depositor pulling their pro-rata refund of the unawarded remainder.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "depositor_ledger",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 101, 112, 111, 115, 105, 116, 111, 114, 95, 108, 101,
                      100, 103, 101, 114,
                    ],
                  },
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "depositor" },
                ],
              },
            },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "depositor_token_account", writable: !0 },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "close_bounty",
          docs: [
            "Poster or multisig marks bounty finalized when terminal conditions hold and all",
            "reward pools have been closed via [`close_reward_pool`].",
          ],
          discriminator: [90, 33, 205, 110, 210, 22, 247, 49],
          accounts: [
            {
              name: "closer",
              docs: ["Poster or [`Config::multisig_authority`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
          ],
          args: [],
        },
        {
          name: "close_reward_pool",
          docs: [
            "Closes an empty reward pool to `closer`; refunds PDA rent and decrements",
            "[`Bounty::reward_pool_count`](crate::bounty::state::Bounty::reward_pool_count).",
            "Requires",
            "[`RewardVault::remaining_amount`](crate::bounty::state::RewardVault::remaining_amount)",
            "`== 0`.",
          ],
          discriminator: [132, 11, 178, 150, 41, 107, 204, 187],
          accounts: [
            {
              name: "closer",
              docs: [
                "Poster or [`Config::multisig_authority`]; receives reclaimed vault +",
                "ATA rent.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
          ],
          args: [],
        },
        {
          name: "crank_claim_award",
          docs: [
            "Permissionless crank of an award claim: any caller may submit the tx and",
            "fund ATA rent, but the payout and award-PDA rent refund are forced to go",
            "to the award's recorded recipient.",
          ],
          discriminator: [197, 94, 142, 221, 54, 182, 92, 238],
          accounts: [
            {
              name: "caller",
              docs: ["Anyone can crank; also funds ATA rent if needed."],
              writable: !0,
              signer: !0,
            },
            {
              name: "recipient",
              docs: [
                "The award recipient. Not required to sign, but must match `award.recipient`.",
              ],
              writable: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "award",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [97, 119, 97, 114, 100] },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "award.submission_commitment",
                    account: "Award",
                  },
                  { kind: "account", path: "award.mint", account: "Award" },
                ],
              },
            },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "recipient_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "recipient" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "create_bounty_and_publish",
          docs: [
            "Publishes a new bounty: publish fee → publish_fee_vault, initial reward into vault,",
            "bounty + vault + poster ledger PDAs.",
          ],
          discriminator: [93, 190, 16, 39, 217, 8, 31, 10],
          accounts: [
            {
              name: "poster",
              docs: [
                "Bounty owner; funds the publish fee, the initial reward, signs the SPL",
                "transfer into the vault, and pays rent for every `init` account below.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            { name: "publish_fee_vault", writable: !0 },
            { name: "reward_mint" },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "arg", path: "args.bounty_id" },
                ],
              },
            },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  { kind: "account", path: "reward_mint" },
                ],
              },
            },
            {
              name: "depositor_ledger",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 101, 112, 111, 115, 105, 116, 111, 114, 95, 108, 101,
                      100, 103, 101, 114,
                    ],
                  },
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "poster" },
                ],
              },
            },
            { name: "source_token_account", writable: !0 },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "CreateBountyAndPublishArgs" } },
            },
          ],
        },
        {
          name: "create_reward_pool",
          docs: [
            "Permissionlessly opens a new reward pool (new mint) on an existing bounty while it",
            "accepts deposits. The caller funds the initial amount; the vault + creator's",
            "[`DepositorLedger`](crate::bounty::state::DepositorLedger) are initialised and",
            "[`Bounty::reward_pool_count`](crate::bounty::state::Bounty::reward_pool_count) is",
            "incremented.",
          ],
          discriminator: [199, 136, 155, 69, 28, 136, 237, 214],
          accounts: [
            {
              name: "creator",
              docs: [
                "Funds the initial pool amount, signs the SPL transfer into the vault,",
                "and pays rent for every `init` account below.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  { kind: "account", path: "reward_mint" },
                ],
              },
            },
            {
              name: "depositor_ledger",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 101, 112, 111, 115, 105, 116, 111, 114, 95, 108, 101,
                      100, 103, 101, 114,
                    ],
                  },
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "creator" },
                ],
              },
            },
            { name: "source_token_account", writable: !0 },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "CreateRewardPoolArgs" } },
            },
          ],
        },
        {
          name: "deposit_reward",
          docs: [
            "Adds reward to an existing vault while the bounty is depositable; updates",
            "[`DepositorLedger`](crate::bounty::state::DepositorLedger).",
          ],
          discriminator: [245, 216, 9, 179, 237, 49, 165, 181],
          accounts: [
            { name: "depositor", writable: !0, signer: !0 },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "reward_mint" },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "depositor_ledger",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 101, 112, 111, 115, 105, 116, 111, 114, 95, 108, 101,
                      100, 103, 101, 114,
                    ],
                  },
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "depositor" },
                ],
              },
            },
            { name: "source_token_account", writable: !0 },
            {
              name: "reward_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "reward_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "reward_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [{ name: "amount", type: "u64" }],
        },
        {
          name: "finalize_disputes",
          docs: [
            "Moderator settles a *batch* of disputes and, on the call that sweeps the",
            "last outstanding dispute, locks in the round. Chunked finalize: callable",
            "repeatedly until",
            "[`Bounty::disputes_swept_count`](crate::bounty::state::Bounty::disputes_swept_count)",
            "equals",
            "[`Bounty::total_disputes_opened`](crate::bounty::state::Bounty::total_disputes_opened).",
            "",
            "Preconditions on every call: `bounty.status == Disputed`,",
            "`active_dispute_count == 0` (every passed dispute resolved), and",
            "`now > bounty.dispute_open_until_ts` (no opener can race the finalize).",
            "Each batch walks the [`Dispute`](crate::decision::state::Dispute) PDAs in",
            "`remaining_accounts`, debits each one's `punishment_amount` into",
            "[`Config::dispute_fee_vault`](crate::config::state::Config::dispute_fee_vault),",
            "flips",
            "[`Dispute::punishment_swept`](crate::decision::state::Dispute::punishment_swept)",
            "true, and increments",
            "[`Bounty::disputes_swept_count`](crate::bounty::state::Bounty::disputes_swept_count).",
            "",
            "Status stays `Disputed` for partial batches; the final batch transitions",
            "back to",
            "[`BountyStatus::DecisionPendingTimelock`](crate::shared::enums::BountyStatus::DecisionPendingTimelock)",
            "with `dispute_open_until_ts = now`, optionally applies an",
            "`args.final_decision_hash` override (rejected on non-final batches with",
            "`FinalDecisionHashOnNonFinalBatch`), and emits",
            "[`DisputesFinalizedEvent`](crate::decision::events::DisputesFinalizedEvent).",
            "Every batch emits a",
            "[`DisputesBatchSweptEvent`](crate::decision::events::DisputesBatchSweptEvent).",
            "",
            "Callers MUST pre-pend a `ComputeBudgetProgram::set_compute_unit_limit`",
            "ix sized for the batch, and MUST eventually sweep every opened dispute",
            "(any short-finalize leaves the bounty in `Disputed`).",
          ],
          discriminator: [147, 70, 198, 54, 31, 228, 210, 67],
          accounts: [
            {
              name: "authority",
              docs: ["Must match [`Config::moderator_authority`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            { name: "dispute_fee_vault", writable: !0 },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "FinalizeDisputesArgs" } },
            },
          ],
        },
        {
          name: "finalize_expired",
          docs: [
            "Bounty-level shortcut for expired-no-decision: flips the bounty to Finalized so",
            "every pool's depositors can pull their full pro-rata refund. Fails if",
            "`decision_hash` is set or the bounty has not expired.",
          ],
          discriminator: [21, 150, 28, 185, 252, 241, 109, 117],
          accounts: [
            { name: "payer", signer: !0 },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
          ],
          args: [],
        },
        {
          name: "initialize_config",
          docs: [
            "Creates the global [`Config`](crate::config::state::Config) PDA: fee vaults, multisig",
            "authority, dispute window.",
          ],
          discriminator: [208, 127, 21, 1, 194, 190, 196, 70],
          accounts: [
            {
              name: "admin",
              docs: ["Pays rent for the new [`Config`] PDA."],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "InitializeConfigArgs" } },
            },
          ],
        },
        {
          name: "initialize_fee_schedule",
          docs: [
            "Creates the [`FeeSchedule`](crate::config::state::FeeSchedule) PDA: the",
            "admin-governed percentage ladder the off-chain quote engine reads. Signer",
            "must be [`Config::admin`](crate::config::state::Config::admin).",
          ],
          discriminator: [125, 35, 60, 135, 23, 192, 56, 185],
          accounts: [
            {
              name: "authority",
              docs: [
                "Must match [`Config::admin`]; pays rent for the new [`FeeSchedule`] PDA.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "fee_schedule",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 95, 115, 99, 104, 101, 100, 117, 108, 101,
                    ],
                  },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "InitializeFeeScheduleArgs" } },
            },
          ],
        },
        {
          name: "open_dispute",
          docs: [
            "Escrows the dispute fee on a per-`(bounty, opener)`",
            "[`Dispute`](crate::decision::state::Dispute) PDA and creates the dispute. Accepted",
            "while `status == DecisionPendingTimelock` (first opener) or `status == Disputed`",
            "(subsequent openers), as long as `now <= dispute_open_until_ts`. Snapshots",
            "[`Config::dispute_slash_bps`](crate::config::state::Config::dispute_slash_bps) onto",
            "the dispute so later config changes do not retroactively affect this opener's",
            "refund. Increments",
            "[`Bounty::active_dispute_count`](crate::bounty::state::Bounty::active_dispute_count)",
            "and [`Bounty::total_disputes_opened`](crate::bounty::state::Bounty::total_disputes_opened).",
          ],
          discriminator: [137, 25, 99, 119, 23, 223, 161, 42],
          accounts: [
            { name: "opener", writable: !0, signer: !0 },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "dispute",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [100, 105, 115, 112, 117, 116, 101] },
                  { kind: "account", path: "bounty" },
                  { kind: "account", path: "opener" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            { name: "args", type: { defined: { name: "OpenDisputeArgs" } } },
          ],
        },
        {
          name: "pay_bounty_fee",
          docs: [
            "Escrows an off-chain-quoted percentage fee for a bounty on a per-payment",
            "[`BountyFeeEscrow`](crate::fees::state::BountyFeeEscrow) PDA. Used for the",
            "publish fee and for adding/topping up reward pools; the backend verifies",
            "the escrow before marking the bounty (or pool) live.",
          ],
          discriminator: [189, 1, 99, 46, 233, 220, 66, 218],
          accounts: [
            { name: "payer", writable: !0, signer: !0 },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "fee_mint" },
            {
              name: "bounty_fee_escrow",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [98, 111, 117, 110, 116, 121, 95, 102, 101, 101],
                  },
                  { kind: "account", path: "bounty" },
                  { kind: "account", path: "payer" },
                  { kind: "arg", path: "args.quote_nonce" },
                ],
              },
            },
            { name: "source_token_account", writable: !0 },
            {
              name: "escrow_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bounty_fee_escrow" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "fee_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            { name: "args", type: { defined: { name: "PayBountyFeeArgs" } } },
          ],
        },
        {
          name: "pay_submission_fee",
          docs: [
            "Pays submission fee (to `config.submission_fee_vault`) and creates a",
            "[`SubmissionFeeReceipt`](crate::submission::state::SubmissionFeeReceipt) while the",
            "bounty is published.",
          ],
          discriminator: [12, 2, 71, 23, 233, 0, 253, 120],
          accounts: [
            { name: "payer", writable: !0, signer: !0 },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            { name: "submission_fee_vault", writable: !0 },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "submission_fee_receipt",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 117, 98, 109, 105, 115, 115, 105, 111, 110, 95, 102,
                      101, 101,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  { kind: "arg", path: "args.submission_commitment" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "PaySubmissionFeeArgs" } },
            },
          ],
        },
        {
          name: "publish_awards",
          docs: [
            "Multisig materializes [`Award`](crate::awards::state::Award) PDAs for one reward pool",
            "per call. `args.entries` carries only the chunk of winners paid by this call (entries",
            "are filtered to `ctx.accounts.reward_vault.mint`); a pool may be published across",
            "several chunked calls so each transaction stays within size limits.",
            "[`RewardVault::total_awarded`](crate::bounty::state::RewardVault::total_awarded)",
            "accumulates across chunks, and",
            "[`RewardVault::decision_applied`](crate::bounty::state::RewardVault::decision_applied)",
            "(which unlocks `claim_refund`) is set only on the chunk passing",
            "`args.finalize_pool = true`. The first call across any pool flips the bounty to",
            "Finalized. Gated solely on `config.multisig_authority`; `bounty.decision_hash` is no",
            "longer re-verified here.",
          ],
          discriminator: [31, 85, 125, 161, 203, 18, 239, 217],
          accounts: [
            {
              name: "authority",
              docs: [
                "Must match [`Config::multisig_authority`] (main multisig — funds-directing);",
                "pays rent for each new [`crate::awards::state::Award`] PDA.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "reward_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      114, 101, 119, 97, 114, 100, 95, 118, 97, 117, 108, 116,
                    ],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "reward_vault.mint",
                    account: "RewardVault",
                  },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [
            { name: "args", type: { defined: { name: "PublishAwardsArgs" } } },
          ],
        },
        {
          name: "record_decision",
          docs: [
            "Multisig records the *initial* decision hash and opens the single dispute window.",
          ],
          discriminator: [13, 153, 150, 233, 19, 198, 102, 140],
          accounts: [
            {
              name: "authority",
              docs: [
                "Must match [`Config::moderator_authority`] (lower-assurance moderator",
                "multisig). Reversible: a subsequent",
                "[`finalize_disputes`](crate::pump_bounties::finalize_disputes) may",
                "override `bounty.decision_hash`, and `publish_awards` (main multisig)",
                "is the irreversible commit point.",
              ],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
          ],
          args: [
            { name: "args", type: { defined: { name: "RecordDecisionArgs" } } },
          ],
        },
        {
          name: "resolve_disputes",
          docs: [
            "Moderator-batched resolution of one-or-more",
            "[`Dispute`](crate::decision::state::Dispute) PDAs. **Pure state write** —",
            "no lamports move. Per entry, an `outcome` (`Accepted` / `Rejected`) is",
            "recorded as an informational tag and an orthogonal `slash` bool stores",
            "the per-dispute split: `slash = true` records",
            "`punishment_amount = floor(fee * dispute.slash_bps_snapshot / 10_000)`",
            "(lamports stay on the `Dispute` PDA; they only flow to",
            "[`Config::dispute_fee_vault`](crate::config::state::Config::dispute_fee_vault)",
            "when [`finalize_disputes`] runs); `slash = false` records full refund.",
            "The bounty stays in",
            "[`BountyStatus::Disputed`](crate::shared::enums::BountyStatus::Disputed) until",
            "[`finalize_disputes`] is called; the moderator may also call",
            "[`unresolve_dispute`] to revert a per-dispute resolution. Dispute PDAs",
            "are passed via `remaining_accounts` in the same order as `args.entries`.",
            "Callers MUST pre-pend a `ComputeBudgetProgram::set_compute_unit_limit` ix",
            "sized for the batch.",
          ],
          discriminator: [138, 226, 118, 243, 70, 34, 144, 193],
          accounts: [
            {
              name: "authority",
              docs: ["Must match [`Config::moderator_authority`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "ResolveDisputesArgs" } },
            },
          ],
        },
        {
          name: "settle_bounty_fee",
          docs: [
            "Moderator settles an escrowed fee: routes the platform slice to",
            "`publish_fee_vault` and earmarks `refund_bps` of the fee for the payer.",
            "Allowed once the bounty is finalized/expired, or at any time for a full",
            "(100%) refund. Mirrors the dispute-slash refund model.",
          ],
          discriminator: [36, 139, 171, 200, 2, 139, 26, 83],
          accounts: [
            {
              name: "authority",
              docs: ["Must match [`Config::moderator_authority`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            { name: "fee_mint" },
            {
              name: "bounty_fee_escrow",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [98, 111, 117, 110, 116, 121, 95, 102, 101, 101],
                  },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "bounty_fee_escrow.payer",
                    account: "BountyFeeEscrow",
                  },
                  {
                    kind: "account",
                    path: "bounty_fee_escrow.quote_nonce",
                    account: "BountyFeeEscrow",
                  },
                ],
              },
            },
            {
              name: "escrow_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bounty_fee_escrow" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "fee_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "publish_fee_vault" },
            {
              name: "publish_fee_vault_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "publish_fee_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "fee_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "SettleBountyFeeArgs" } },
            },
          ],
        },
        {
          name: "unresolve_dispute",
          docs: [
            "Moderator reverts a single",
            "[`Dispute`](crate::decision::state::Dispute) PDA's resolution while the",
            "bounty is still in",
            "[`BountyStatus::Disputed`](crate::shared::enums::BountyStatus::Disputed).",
            "Pure state write: clears `outcome`, `slash`, `opener_refund_owed`,",
            "`punishment_amount`, `resolved`, and `resolved_at`, and increments",
            "[`Bounty::active_dispute_count`](crate::bounty::state::Bounty::active_dispute_count).",
            "Re-resolving via [`resolve_disputes`] re-arms the dispute. Callable only",
            "before [`finalize_disputes`] locks in the round.",
          ],
          discriminator: [43, 6, 71, 65, 63, 228, 30, 231],
          accounts: [
            {
              name: "authority",
              docs: ["Must match [`Config::moderator_authority`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "bounty",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [98, 111, 117, 110, 116, 121] },
                  { kind: "account", path: "bounty.id", account: "Bounty" },
                ],
              },
            },
            {
              name: "dispute",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [100, 105, 115, 112, 117, 116, 101] },
                  { kind: "account", path: "bounty" },
                  {
                    kind: "account",
                    path: "dispute.opener",
                    account: "Dispute",
                  },
                ],
              },
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "UnresolveDisputeArgs" } },
            },
          ],
        },
        {
          name: "update_config",
          docs: [
            "Patches [`Config`](crate::config::state::Config) fields; signer must be",
            "[`Config::admin`](crate::config::state::Config::admin).",
          ],
          discriminator: [29, 158, 252, 191, 10, 83, 219, 99],
          accounts: [
            {
              name: "authority",
              docs: [
                "Must match [`Config::admin`]; only the current admin may mutate config",
                "fields, including rotating [`Config::admin`] and",
                "[`Config::moderator_authority`].",
              ],
              signer: !0,
            },
            {
              name: "config",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
          ],
          args: [
            { name: "args", type: { defined: { name: "UpdateConfigArgs" } } },
          ],
        },
        {
          name: "update_fee_schedule",
          docs: [
            "Patches the [`FeeSchedule`](crate::config::state::FeeSchedule) tiers and/or",
            "fee-exempt mint. Signer must be",
            "[`Config::admin`](crate::config::state::Config::admin).",
          ],
          discriminator: [190, 103, 25, 122, 142, 37, 230, 81],
          accounts: [
            {
              name: "authority",
              docs: ["Must match [`Config::admin`]."],
              signer: !0,
            },
            {
              name: "config",
              pda: {
                seeds: [
                  { kind: "const", value: [99, 111, 110, 102, 105, 103] },
                ],
              },
            },
            {
              name: "fee_schedule",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 95, 115, 99, 104, 101, 100, 117, 108, 101,
                    ],
                  },
                ],
              },
            },
          ],
          args: [
            {
              name: "args",
              type: { defined: { name: "UpdateFeeScheduleArgs" } },
            },
          ],
        },
      ],
      accounts: [
        {
          name: "Award",
          discriminator: [189, 239, 181, 244, 124, 28, 66, 194],
        },
        {
          name: "Bounty",
          discriminator: [237, 16, 105, 198, 19, 69, 242, 234],
        },
        {
          name: "BountyFeeEscrow",
          discriminator: [248, 233, 150, 228, 252, 244, 182, 5],
        },
        {
          name: "Config",
          discriminator: [155, 12, 170, 224, 30, 250, 204, 130],
        },
        {
          name: "DepositorLedger",
          discriminator: [16, 107, 114, 139, 56, 213, 199, 25],
        },
        { name: "Dispute", discriminator: [36, 49, 241, 67, 40, 36, 241, 74] },
        {
          name: "FeeSchedule",
          discriminator: [250, 80, 88, 27, 206, 216, 50, 199],
        },
        {
          name: "RewardVault",
          discriminator: [201, 22, 221, 167, 208, 16, 210, 33],
        },
        {
          name: "SubmissionFeeReceipt",
          discriminator: [33, 240, 166, 162, 244, 132, 156, 175],
        },
      ],
      events: [
        {
          name: "AwardClaimedEvent",
          discriminator: [3, 61, 60, 212, 33, 132, 26, 20],
        },
        {
          name: "AwardsPublishedEvent",
          discriminator: [148, 230, 160, 189, 132, 154, 216, 117],
        },
        {
          name: "BountyFeePaidEvent",
          discriminator: [46, 146, 247, 93, 28, 163, 119, 93],
        },
        {
          name: "BountyFeeRefundClaimedEvent",
          discriminator: [90, 106, 127, 108, 65, 149, 154, 101],
        },
        {
          name: "BountyFeeSettledEvent",
          discriminator: [185, 8, 170, 19, 17, 248, 62, 30],
        },
        {
          name: "BountyFinalizedEvent",
          discriminator: [105, 223, 30, 184, 113, 132, 143, 102],
        },
        {
          name: "BountyPublishedEvent",
          discriminator: [100, 26, 5, 144, 248, 175, 47, 158],
        },
        {
          name: "DecisionRecordedEvent",
          discriminator: [90, 78, 73, 131, 242, 195, 23, 142],
        },
        {
          name: "DisputeOpenedEvent",
          discriminator: [91, 164, 118, 191, 199, 195, 118, 21],
        },
        {
          name: "DisputeRefundClaimedEvent",
          discriminator: [62, 116, 76, 204, 64, 8, 163, 108],
        },
        {
          name: "DisputeResolvedEvent",
          discriminator: [152, 37, 98, 245, 229, 39, 150, 78],
        },
        {
          name: "DisputeUnresolvedEvent",
          discriminator: [178, 127, 123, 3, 35, 158, 104, 200],
        },
        {
          name: "DisputesBatchSweptEvent",
          discriminator: [192, 26, 36, 219, 188, 84, 110, 93],
        },
        {
          name: "DisputesFinalizedEvent",
          discriminator: [74, 8, 228, 72, 246, 88, 193, 22],
        },
        {
          name: "RefundClaimedEvent",
          discriminator: [77, 83, 172, 123, 235, 58, 154, 233],
        },
        {
          name: "RewardDepositedEvent",
          discriminator: [3, 209, 161, 69, 207, 181, 189, 207],
        },
        {
          name: "RewardPoolClosedEvent",
          discriminator: [92, 131, 16, 83, 106, 60, 89, 150],
        },
        {
          name: "RewardPoolCreatedEvent",
          discriminator: [251, 98, 202, 109, 133, 154, 58, 206],
        },
        {
          name: "SubmissionFeePaidEvent",
          discriminator: [52, 216, 110, 84, 88, 214, 142, 115],
        },
      ],
      errors: [
        { code: 6e3, name: "Unauthorized", msg: "Unauthorized operation." },
        {
          code: 6001,
          name: "UnauthorizedMainAuthority",
          msg: "Signer does not match Config.multisig_authority.",
        },
        {
          code: 6002,
          name: "UnauthorizedModerator",
          msg: "Signer does not match Config.moderator_authority.",
        },
        {
          code: 6003,
          name: "AmountMustBePositive",
          msg: "Amount must be positive.",
        },
        { code: 6004, name: "MathOverflow", msg: "Math overflow." },
        {
          code: 6005,
          name: "ProgramPaused",
          msg: "Program is paused for this operation.",
        },
        {
          code: 6006,
          name: "InvalidTokenAccount",
          msg: "Invalid token account.",
        },
        {
          code: 6007,
          name: "InvalidMintAccount",
          msg: "Invalid mint account.",
        },
        { code: 6008, name: "MintMismatch", msg: "Mint mismatch." },
        { code: 6009, name: "InvalidTokenOwner", msg: "Invalid token owner." },
        {
          code: 6010,
          name: "InvalidFeeReceiver",
          msg: "Fee receiver account mismatch.",
        },
        {
          code: 6011,
          name: "BountyConfigMismatch",
          msg: "Bounty config pubkey mismatch.",
        },
        {
          code: 6012,
          name: "UnsupportedMintExtension",
          msg: "Reward mint carries an unsupported Token-2022 extension.",
        },
        { code: 6013, name: "InvalidFee", msg: "Invalid fee configuration." },
        {
          code: 6014,
          name: "DisputeWindowTooShort",
          msg: "Dispute window is too short.",
        },
        {
          code: 6015,
          name: "InvalidSlashBps",
          msg: "dispute_slash_bps must be between 0 and 10_000 (inclusive).",
        },
        {
          code: 6016,
          name: "MetadataUriTooLong",
          msg: "Metadata URI is too long.",
        },
        {
          code: 6017,
          name: "InvalidExpiry",
          msg: "Expiry timestamp is invalid.",
        },
        { code: 6018, name: "BountyExpired", msg: "Bounty has expired." },
        {
          code: 6019,
          name: "BountyNotDepositable",
          msg: "Bounty is not depositable in current state.",
        },
        {
          code: 6020,
          name: "BountyAlreadyFinalized",
          msg: "Bounty is already finalized.",
        },
        {
          code: 6021,
          name: "CannotCloseBounty",
          msg: "Cannot close bounty in current state.",
        },
        {
          code: 6022,
          name: "VaultMustBeEmpty",
          msg: "Reward vault must be empty before close.",
        },
        {
          code: 6023,
          name: "InsufficientVaultBalance",
          msg: "Insufficient vault balance.",
        },
        {
          code: 6024,
          name: "RewardPoolAlreadyExists",
          msg: "Reward pool with this mint already exists on the bounty.",
        },
        {
          code: 6025,
          name: "RewardPoolNotEmpty",
          msg: "Reward pool is not empty.",
        },
        {
          code: 6026,
          name: "AllPoolsMustBeClosed",
          msg: "All reward pools must be closed before close_bounty.",
        },
        {
          code: 6027,
          name: "BountyNotExpired",
          msg: "Bounty has not expired yet for finalize_expired.",
        },
        {
          code: 6028,
          name: "BountyHasDecision",
          msg: "Bounty has a recorded decision; finalize_expired is not applicable.",
        },
        {
          code: 6029,
          name: "MintMismatchForVault",
          msg: "Award mint does not match reward vault mint.",
        },
        {
          code: 6030,
          name: "InvalidSubmissionReceipt",
          msg: "Submission fee receipt is invalid for this award entry.",
        },
        {
          code: 6031,
          name: "InvalidStatusTransition",
          msg: "Invalid status transition.",
        },
        {
          code: 6032,
          name: "ExecutionNotAllowed",
          msg: "Execution not allowed yet.",
        },
        {
          code: 6033,
          name: "DisputeWindowClosed",
          msg: "Dispute window is closed.",
        },
        {
          code: 6034,
          name: "DisputeAlreadyResolved",
          msg: "Dispute already resolved.",
        },
        {
          code: 6035,
          name: "DisputeAlreadyUnresolved",
          msg: "Dispute is not currently resolved; nothing to unresolve.",
        },
        {
          code: 6036,
          name: "DisputeNotResolved",
          msg: "Dispute has not been resolved yet.",
        },
        {
          code: 6037,
          name: "BountyStillDisputed",
          msg: "Bounty is still in Disputed; refund unavailable until disputes are finalized.",
        },
        {
          code: 6038,
          name: "DisputeRefundAlreadyClaimed",
          msg: "Dispute refund has already been claimed.",
        },
        {
          code: 6039,
          name: "InvalidDisputeOutcome",
          msg: "Dispute outcome must be Accepted or Rejected.",
        },
        {
          code: 6040,
          name: "DisputeEscrowInconsistent",
          msg: "Dispute escrow accounting is inconsistent.",
        },
        {
          code: 6041,
          name: "ResolveEntriesMismatch",
          msg: "resolve_disputes: entries.len() must equal remaining_accounts.len() (>0).",
        },
        {
          code: 6042,
          name: "InvalidDisputePda",
          msg: "Dispute PDA does not match expected seeds.",
        },
        {
          code: 6043,
          name: "DisputesStillOpen",
          msg: "Cannot finalize: at least one dispute is still unresolved.",
        },
        {
          code: 6044,
          name: "DisputeWindowStillOpen",
          msg: "Cannot finalize: the dispute window is still open.",
        },
        {
          code: 6045,
          name: "DisputeAlreadySwept",
          msg: "Dispute punishment already swept; cannot unresolve.",
        },
        {
          code: 6046,
          name: "FinalDecisionHashOnNonFinalBatch",
          msg: "final_decision_hash may only be set on the batch that sweeps the last dispute.",
        },
        {
          code: 6047,
          name: "DuplicateDisputeInBatch",
          msg: "Dispute PDA passed more than once in remaining_accounts.",
        },
        {
          code: 6048,
          name: "EmptyBatch",
          msg: "finalize_disputes batch must contain at least one Dispute PDA.",
        },
        {
          code: 6049,
          name: "AwardsAlreadyPublished",
          msg: "Awards have already been published for this bounty.",
        },
        {
          code: 6050,
          name: "AwardsNotPublished",
          msg: "Awards have not been published yet.",
        },
        {
          code: 6051,
          name: "AwardExceedsVault",
          msg: "Sum of award amounts exceeds the reward vault total.",
        },
        {
          code: 6052,
          name: "DecisionHashMismatch",
          msg: "Decision hash does not match the award breakdown preimage.",
        },
        {
          code: 6053,
          name: "InvalidAwardPda",
          msg: "Award PDA does not match expected seeds.",
        },
        {
          code: 6054,
          name: "InvalidRemainingAccounts",
          msg: "Remaining accounts must be exactly two per award entry (receipt + award).",
        },
        {
          code: 6055,
          name: "DuplicateAwardEntry",
          msg: "Duplicate submission commitment in award list.",
        },
        {
          code: 6056,
          name: "AwardEntriesNotSorted",
          msg: "Award entries must be sorted by submission_commitment ascending.",
        },
        {
          code: 6057,
          name: "RewardPoolDecisionAlreadyApplied",
          msg: "Reward pool decision has already been applied.",
        },
        { code: 6058, name: "NothingToClaim", msg: "Nothing to claim." },
        {
          code: 6059,
          name: "InvalidClaimant",
          msg: "Signer is not the award recipient.",
        },
        {
          code: 6060,
          name: "InvalidDepositorLedger",
          msg: "Depositor ledger does not belong to the signer.",
        },
        {
          code: 6061,
          name: "InvalidTokenVaultOwner",
          msg: "Invalid reward token vault owner.",
        },
        {
          code: 6062,
          name: "InvalidSubmissionIdLength",
          msg: "Submission ID length exceeds maximum allowed.",
        },
        {
          code: 6063,
          name: "SubmissionCommitmentMismatch",
          msg: "Submission doesn't belong to the user paying.",
        },
        {
          code: 6064,
          name: "ZeroDecisionHash",
          msg: "Decision hash must not be all zeros.",
        },
        {
          code: 6065,
          name: "BountyHasSubmissions",
          msg: "Bounty has submissions; auto-refund requires a moderator decision.",
        },
        {
          code: 6066,
          name: "InvalidRefundBps",
          msg: "refund_bps must be between 0 and 10_000 (inclusive).",
        },
        {
          code: 6067,
          name: "FeeSettleNotAllowed",
          msg: "Fee settlement not allowed yet for this bounty state.",
        },
        {
          code: 6068,
          name: "FeeEscrowAlreadySettled",
          msg: "Bounty fee escrow has already been settled.",
        },
        {
          code: 6069,
          name: "FeeEscrowNotSettled",
          msg: "Bounty fee escrow has not been settled yet.",
        },
        {
          code: 6070,
          name: "FeeRefundAlreadyClaimed",
          msg: "Bounty fee refund has already been claimed.",
        },
        {
          code: 6071,
          name: "InvalidFeeSchedule",
          msg: "Fee schedule tiers are invalid.",
        },
      ],
      types: [
        {
          name: "Award",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "bounty", type: "pubkey" },
              {
                name: "submission_commitment",
                docs: [
                  "Matches the [`crate::submission::state::SubmissionFeeReceipt::submission_commitment`]",
                  "seed of the winning submission.",
                ],
                type: { array: ["u8", 32] },
              },
              {
                name: "mint",
                docs: [
                  "The mint this award is denominated in; matches the parent",
                  "[`crate::bounty::state::RewardVault::mint`].",
                ],
                type: "pubkey",
              },
              {
                name: "recipient",
                docs: [
                  "The user who paid the submission fee (copied from",
                  "[`crate::submission::state::SubmissionFeeReceipt::payer`] at publish time).",
                ],
                type: "pubkey",
              },
              {
                name: "amount",
                docs: [
                  "Amount owed to `recipient` from the matching reward vault.",
                ],
                type: "u64",
              },
            ],
          },
        },
        {
          name: "AwardClaimedEvent",
          docs: ["Emitted after a winner pulls their award."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "award", type: "pubkey" },
              { name: "recipient", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "claimed_at", type: "i64" },
            ],
          },
        },
        {
          name: "AwardEntry",
          docs: [
            "One award entry in a [`publish_awards`](crate::pump_bounties::publish_awards) call.",
            "An entry names a specific `(submission, mint)` payout amount.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "submission_commitment", type: { array: ["u8", 32] } },
              { name: "mint", type: "pubkey" },
              { name: "amount", type: "u64" },
            ],
          },
        },
        {
          name: "AwardsPublishedEvent",
          docs: [
            "Emitted by each [`crate::pump_bounties::publish_awards`] call. A pool may be published",
            "across several chunked calls, so this fires once per chunk; sum `chunk_awarded` /",
            "`winner_count` across a pool's events, and treat `pool_finalized = true` as the",
            'definitive "this pool is sealed" signal.',
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              {
                name: "reward_vault",
                docs: ["The reward pool (vault) this call materialized."],
                type: "pubkey",
              },
              {
                name: "reward_mint",
                docs: ["The mint this pool is denominated in."],
                type: "pubkey",
              },
              {
                name: "chunk_awarded",
                docs: [
                  "Amount awarded by *this* call (a single chunk of the pool's payout).",
                ],
                type: "u64",
              },
              {
                name: "cumulative_awarded_in_pool",
                docs: [
                  "Running total awarded for this pool after applying this chunk",
                  "(`reward_vault.total_awarded`).",
                ],
                type: "u64",
              },
              {
                name: "winner_count",
                docs: [
                  "Number of winning entries materialized on *this* call.",
                ],
                type: "u32",
              },
              {
                name: "pool_finalized",
                docs: [
                  "`true` when this call sealed the pool (`decision_applied` flipped to `true`),",
                  "i.e. the final chunk. Unlocks `claim_refund` for this pool.",
                ],
                type: "bool",
              },
              { name: "published_at", type: "i64" },
            ],
          },
        },
        {
          name: "Bounty",
          docs: [
            "One bounty; status drives which instructions are valid.",
            "",
            "Reward pools (one [`RewardVault`] per mint) are mutable containers that live below",
            "the bounty — they do not carry their own lifecycle state. The bounty has one",
            "finalization moment ([`Bounty::awards_finalized_at`]) which flips on the first",
            "[`publish_awards`](crate::pump_bounties::publish_awards) call (any pool) or on",
            "[`finalize_expired`](crate::pump_bounties::finalize_expired).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "id", type: "u64" },
              { name: "config", type: "pubkey" },
              {
                name: "poster",
                docs: [
                  "Original publisher; may [`close_bounty`](crate::pump_bounties::close_bounty) when allowed.",
                ],
                type: "pubkey",
              },
              { name: "status", type: { defined: { name: "BountyStatus" } } },
              {
                name: "expiry_ts",
                docs: [
                  "`0` means no expiry; otherwise Unix time after which the bounty is expired for deposits/refunds.",
                ],
                type: "i64",
              },
              { name: "metadata_hash", type: { array: ["u8", 32] } },
              { name: "metadata_uri", type: "string" },
              {
                name: "decision_hash",
                docs: [
                  "Commitment to the current multisig decision (updated on record / resolve).",
                ],
                type: { array: ["u8", 32] },
              },
              {
                name: "dispute_open_until_ts",
                docs: [
                  "Inclusive deadline for opening a dispute while in timelock; execution requires `now >=` this after timelock.",
                ],
                type: "i64",
              },
              {
                name: "active_dispute_count",
                docs: [
                  "Number of [`crate::decision::state::Dispute`] PDAs that have been opened on this",
                  "bounty but not yet resolved by [`crate::pump_bounties::resolve_disputes`]. While",
                  "`> 0`, [`Bounty::can_execute`] is false even if the timelock passed. Decremented",
                  "as disputes are resolved; once it hits `0` and the original dispute window",
                  "has closed, [`crate::pump_bounties::finalize_disputes`] can re-enter",
                  "[`BountyStatus::DecisionPendingTimelock`] for publish.",
                ],
                type: "u16",
              },
              {
                name: "total_disputes_opened",
                docs: [
                  "Monotonic count of disputes ever opened on this bounty. Informational;",
                  "surfaced by [`crate::decision::events::DisputesFinalizedEvent`] for off-chain analytics.",
                ],
                type: "u16",
              },
              {
                name: "disputes_swept_count",
                docs: [
                  "Monotonic count of disputes whose `punishment_amount` slice has been swept",
                  "to [`crate::config::state::Config::dispute_fee_vault`] by",
                  "[`crate::pump_bounties::finalize_disputes`]. Equals",
                  "[`Bounty::total_disputes_opened`] once the dispute round is fully settled",
                  "and the bounty re-enters [`crate::shared::enums::BountyStatus::DecisionPendingTimelock`].",
                  "Drives chunked finalize: `finalize_disputes` may be invoked multiple times,",
                  "each call sweeping a batch of [`crate::decision::state::Dispute`] PDAs.",
                ],
                type: "u16",
              },
              {
                name: "reward_pool_count",
                docs: [
                  "Authoritative count of open [`RewardVault`] PDAs parented to this bounty.",
                  "Incremented by [`create_bounty_and_publish`](crate::pump_bounties::create_bounty_and_publish)",
                  "and [`create_reward_pool`](crate::pump_bounties::create_reward_pool); decremented by",
                  "[`close_reward_pool`](crate::pump_bounties::close_reward_pool). Must be `0` to",
                  "[`close_bounty`](crate::pump_bounties::close_bounty).",
                ],
                type: "u16",
              },
              {
                name: "total_awarded",
                docs: [
                  "Informational aggregate of amounts committed across all pools'",
                  "[`crate::awards::state::Award`] PDAs. Not read for gating; refund math lives per",
                  "vault on [`RewardVault::total_awarded`].",
                ],
                type: "u64",
              },
              {
                name: "awards_finalized_at",
                docs: [
                  "Non-zero once the bounty becomes finalized: either the first",
                  "[`publish_awards`](crate::pump_bounties::publish_awards) call across any pool,",
                  "or [`finalize_expired`](crate::pump_bounties::finalize_expired).",
                ],
                type: "i64",
              },
              {
                name: "submission_count",
                docs: [
                  "Monotonic count of [`crate::submission::state::SubmissionFeeReceipt`]s created via",
                  "[`pay_submission_fee`](crate::pump_bounties::pay_submission_fee). While `> 0`,",
                  "[`finalize_expired`](crate::pump_bounties::finalize_expired) is blocked: a bounty",
                  "with submissions must wait for a moderator decision and can never be auto-refunded.",
                ],
                type: "u64",
              },
            ],
          },
        },
        {
          name: "BountyFeeEscrow",
          docs: [
            'One escrowed fee payment. PDA seeds: `[b"bounty_fee", bounty, payer, quote_nonce_le]`.',
            "",
            "`payer` is part of the seeds because reward-pool creation and top-ups are",
            "permissionless (any depositor can be the fee payer), and `quote_nonce` lets the",
            "same payer escrow multiple independent fee payments against one bounty.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "bounty", type: "pubkey" },
              { name: "payer", type: "pubkey" },
              {
                name: "quote_nonce",
                docs: [
                  "Binds this escrow to the off-chain quote the backend issued and later",
                  "verifies against.",
                ],
                type: "u64",
              },
              { name: "purpose", type: { defined: { name: "FeePurpose" } } },
              {
                name: "mint",
                docs: [
                  "Fee mint (wSOL for SOL fees, same convention as reward vaults).",
                ],
                type: "pubkey",
              },
              {
                name: "token_vault",
                docs: [
                  "SPL / Token-2022 token account (ATA) owned by this PDA that custodies the fee.",
                ],
                type: "pubkey",
              },
              { name: "amount", type: "u64" },
              { name: "paid_at", type: "i64" },
              {
                name: "settled",
                docs: [
                  "`true` once a moderator has run [`crate::pump_bounties::settle_bounty_fee`].",
                ],
                type: "bool",
              },
              { name: "settled_at", type: "i64" },
              {
                name: "refund_bps",
                docs: [
                  "Basis points of `amount` earmarked as a refund to `payer` at settlement.",
                ],
                type: "u16",
              },
              {
                name: "refund_owed",
                docs: [
                  "Token amount the payer may pull via",
                  "[`crate::pump_bounties::claim_bounty_fee_refund`] after settlement.",
                ],
                type: "u64",
              },
              {
                name: "refund_claimed",
                docs: ["Flips true on refund claim; prevents double refund."],
                type: "bool",
              },
            ],
          },
        },
        {
          name: "BountyFeePaidEvent",
          docs: [
            "Emitted after a fee is escrowed by",
            "[`pay_bounty_fee`](crate::pump_bounties::pay_bounty_fee).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "escrow", type: "pubkey" },
              { name: "payer", type: "pubkey" },
              { name: "quote_nonce", type: "u64" },
              { name: "purpose", type: { defined: { name: "FeePurpose" } } },
              { name: "mint", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "paid_at", type: "i64" },
            ],
          },
        },
        {
          name: "BountyFeeRefundClaimedEvent",
          docs: [
            "Emitted after the payer pulls a refund via",
            "[`claim_bounty_fee_refund`](crate::pump_bounties::claim_bounty_fee_refund).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "escrow", type: "pubkey" },
              { name: "payer", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "claimed_at", type: "i64" },
            ],
          },
        },
        {
          name: "BountyFeeSettledEvent",
          docs: [
            "Emitted after a moderator settles a fee via",
            "[`settle_bounty_fee`](crate::pump_bounties::settle_bounty_fee).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "escrow", type: "pubkey" },
              { name: "refund_bps", type: "u16" },
              {
                name: "platform_amount",
                docs: ["Amount routed to `publish_fee_vault`."],
                type: "u64",
              },
              {
                name: "refund_owed",
                docs: ["Amount earmarked for the payer to claim."],
                type: "u64",
              },
              { name: "settled_at", type: "i64" },
            ],
          },
        },
        {
          name: "BountyFinalizedEvent",
          docs: ["Emitted when a bounty is closed / finalized on-chain."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "finalized_at", type: "i64" },
            ],
          },
        },
        {
          name: "BountyPublishedEvent",
          docs: ["Emitted when a bounty is created and published."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "poster", type: "pubkey" },
              { name: "reward_mint", type: "pubkey" },
              { name: "initial_reward_amount", type: "u64" },
              { name: "created_at", type: "i64" },
            ],
          },
        },
        {
          name: "BountyStatus",
          docs: ["High-level bounty state machine label."],
          type: {
            kind: "enum",
            variants: [
              { name: "Published" },
              { name: "DecisionPendingTimelock" },
              { name: "Disputed" },
              { name: "Finalized" },
              { name: "Expired" },
            ],
          },
        },
        {
          name: "Config",
          docs: ["Global program configuration (single PDA per deployment)."],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              {
                name: "admin",
                docs: [
                  "Set at init; enforced as the signer for `update_config`.",
                ],
                type: "pubkey",
              },
              {
                name: "multisig_authority",
                docs: [
                  "High-assurance multisig that may publish awards and use the multisig side",
                  "of close paths.",
                ],
                type: "pubkey",
              },
              {
                name: "moderator_authority",
                docs: [
                  "Lower-assurance multisig delegated to operational moderation (`record_decision`,",
                  "`resolve_disputes`, `unresolve_dispute`, `finalize_disputes`). Every action it",
                  "authorizes is reversible up until the next [`Config::multisig_authority`]-gated",
                  "step (publish or finalize lock-in). Rotated only by [`Config::admin`] via",
                  "`update_config`.",
                ],
                type: "pubkey",
              },
              {
                name: "publish_fee_vault",
                docs: [
                  "Destination (Squads v4 vault address) for publish fees.",
                ],
                type: "pubkey",
              },
              {
                name: "dispute_fee_vault",
                docs: [
                  "Destination (Squads v4 vault address) for dispute fees.",
                ],
                type: "pubkey",
              },
              {
                name: "submission_fee_vault",
                docs: [
                  "Destination (Squads v4 vault address) for submission fees.",
                ],
                type: "pubkey",
              },
              { name: "publish_fee_lamports", type: "u64" },
              { name: "dispute_fee_lamports", type: "u64" },
              { name: "submission_fee_lamports", type: "u64" },
              {
                name: "dispute_window_seconds",
                docs: [
                  "Added to `now` when entering",
                  "[`crate::shared::enums::BountyStatus::DecisionPendingTimelock`] from",
                  "[`record_decision`](crate::pump_bounties::record_decision).",
                ],
                type: "i64",
              },
              {
                name: "dispute_slash_bps",
                docs: [
                  "Share of the escrowed dispute fee routed to [`Config::dispute_fee_vault`] when the",
                  "moderator slashes a dispute in [`crate::pump_bounties::resolve_disputes`]. Expressed",
                  "in basis points (0 = no slash, 10_000 = full slash). Snapshotted onto each",
                  "[`crate::decision::state::Dispute::slash_bps_snapshot`] at",
                  "[`crate::pump_bounties::open_dispute`] time, so in-flight disputes are immune to",
                  "later [`crate::pump_bounties::update_config`] tweaks.",
                ],
                type: "u16",
              },
              {
                name: "paused_flags",
                docs: ["Bitmask of [`PauseFlag`]; see [`Config::is_paused`]."],
                type: "u16",
              },
            ],
          },
        },
        {
          name: "CreateBountyAndPublishArgs",
          docs: [
            "Instruction data for [`create_bounty_and_publish`](crate::pump_bounties::create_bounty_and_publish).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty_id", type: "u64" },
              { name: "metadata_hash", type: { array: ["u8", 32] } },
              { name: "metadata_uri", type: "string" },
              { name: "expiry_ts", type: "i64" },
              { name: "initial_reward_amount", type: "u64" },
            ],
          },
        },
        {
          name: "CreateRewardPoolArgs",
          docs: [
            "Instruction data for [`create_reward_pool`](crate::pump_bounties::create_reward_pool).",
          ],
          type: {
            kind: "struct",
            fields: [{ name: "initial_amount", type: "u64" }],
          },
        },
        {
          name: "DecisionRecordedEvent",
          docs: [
            "Emitted when multisig records an initial decision and dispute window end time.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "decision_hash", type: { array: ["u8", 32] } },
              { name: "dispute_open_until_ts", type: "i64" },
            ],
          },
        },
        {
          name: "DepositorLedger",
          docs: [
            "Running total of contributions per depositor per reward vault.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "reward_vault", type: "pubkey" },
              { name: "depositor", type: "pubkey" },
              { name: "total_contributed", type: "u64" },
              {
                name: "total_claimed",
                docs: [
                  "Running total of refund already pulled by the depositor; prevents double-claims.",
                ],
                type: "u64",
              },
              { name: "created_at", type: "i64" },
            ],
          },
        },
        {
          name: "Dispute",
          docs: [
            "One dispute PDA per `(bounty, opener)`, so many submitters can dispute the same",
            'bounty decision. PDA seeds: `[b"dispute", bounty, opener]`.',
            "",
            "Custodies the escrowed dispute fee as excess lamports above the rent-exempt",
            "minimum:",
            "1. [`crate::pump_bounties::open_dispute`] deposits the fee.",
            "2. [`crate::pump_bounties::resolve_disputes`] is a *pure state write*: it",
            "decides the split (`opener_refund_owed`, `punishment_amount`) but moves",
            "no lamports.",
            "3. [`crate::pump_bounties::unresolve_dispute`] (moderator-only, while the",
            "bounty is still in `Disputed`) clears the resolution.",
            "4. [`crate::pump_bounties::finalize_disputes`] iterates each `Dispute` PDA",
            "via `remaining_accounts` and moves `punishment_amount` to",
            "[`crate::config::state::Config::dispute_fee_vault`], setting",
            "[`Dispute::punishment_swept`] true.",
            "5. [`crate::pump_bounties::claim_dispute_refund`] (gated post-finalize)",
            "closes the PDA to the opener.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "bounty", type: "pubkey" },
              { name: "opener", type: "pubkey" },
              { name: "evidence_hash", type: { array: ["u8", 32] } },
              { name: "evidence_uri", type: "string" },
              { name: "opened_at", type: "i64" },
              {
                name: "resolved_at",
                docs: [
                  "Last successful [`crate::pump_bounties::resolve_disputes`] timestamp; reset",
                  "to `0` by [`crate::pump_bounties::unresolve_dispute`].",
                ],
                type: "i64",
              },
              {
                name: "resolved",
                docs: [
                  "`true` after a moderator [`crate::pump_bounties::resolve_disputes`] call,",
                  "cleared back to `false` by [`crate::pump_bounties::unresolve_dispute`].",
                  "Locked in when the bounty leaves `Disputed` via",
                  "[`crate::pump_bounties::finalize_disputes`].",
                ],
                type: "bool",
              },
              {
                name: "fee_escrowed_lamports",
                docs: [
                  "Snapshot of [`crate::config::state::Config::dispute_fee_lamports`] at open time.",
                  "Immune to later config changes; drives the refund split at resolution.",
                ],
                type: "u64",
              },
              {
                name: "slash_bps_snapshot",
                docs: [
                  "Snapshot of [`crate::config::state::Config::dispute_slash_bps`] at open time.",
                  "Drives the slash math in [`crate::pump_bounties::resolve_disputes`]; mid-flight",
                  "config changes do not retroactively affect the punishment on this dispute.",
                ],
                type: "u16",
              },
              {
                name: "outcome",
                docs: [
                  "Explicit outcome set by the moderator at",
                  "[`crate::pump_bounties::resolve_disputes`]; informational on-chain record of",
                  "whether the dispute claim was accepted or rejected. Does not drive the fee",
                  "split — the separate `slash` arg + [`Dispute::slash_bps_snapshot`] do.",
                ],
                type: { defined: { name: "DisputeOutcome" } },
              },
              {
                name: "opener_refund_owed",
                docs: [
                  "Lamports the opener may pull via [`crate::pump_bounties::claim_dispute_refund`]",
                  "after [`crate::pump_bounties::finalize_disputes`]. Stays custodied on the",
                  "PDA indefinitely if the opener never claims.",
                ],
                type: "u64",
              },
              {
                name: "punishment_amount",
                docs: [
                  "Lamports routed to [`crate::config::state::Config::dispute_fee_vault`] when",
                  "`finalize_disputes` runs.",
                ],
                type: "u64",
              },
              {
                name: "refund_claimed",
                docs: ["Flips true on claim; prevents double refund."],
                type: "bool",
              },
              {
                name: "punishment_swept",
                docs: [
                  "Flips true inside [`crate::pump_bounties::finalize_disputes`] once the",
                  "`punishment_amount` slice has been moved to",
                  "[`crate::config::state::Config::dispute_fee_vault`]. Stays `false` while the",
                  "bounty is in `Disputed` (resolution is reversible until finalize).",
                ],
                type: "bool",
              },
            ],
          },
        },
        {
          name: "DisputeOpenedEvent",
          docs: [
            "Emitted when a user opens a dispute during the timelock window.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "dispute", type: "pubkey" },
              { name: "opener", type: "pubkey" },
              {
                name: "slash_bps_snapshot",
                docs: [
                  "Snapshot of [`crate::config::state::Config::dispute_slash_bps`] captured on this dispute.",
                ],
                type: "u16",
              },
              {
                name: "active_dispute_count_after",
                docs: [
                  "[`crate::bounty::state::Bounty::active_dispute_count`] after this open.",
                ],
                type: "u16",
              },
              { name: "opened_at", type: "i64" },
            ],
          },
        },
        {
          name: "DisputeOutcome",
          docs: [
            "Outcome tag set by the multisig in [`crate::pump_bounties::resolve_disputes`] —",
            "informational only. The fee split is driven by the independent `slash` bool in",
            "[`crate::decision::args::ResolveDisputeEntry`] plus [`Dispute::slash_bps_snapshot`].",
          ],
          type: {
            kind: "enum",
            variants: [
              { name: "Unresolved" },
              { name: "Accepted" },
              { name: "Rejected" },
            ],
          },
        },
        {
          name: "DisputeRefundClaimedEvent",
          docs: ["Emitted when the opener pulls their dispute-fee refund."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "dispute", type: "pubkey" },
              { name: "opener", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "claimed_at", type: "i64" },
            ],
          },
        },
        {
          name: "DisputeResolvedEvent",
          docs: [
            "Emitted once per dispute inside the",
            "[`crate::pump_bounties::resolve_disputes`] batch loop.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "dispute", type: "pubkey" },
              { name: "resolved_at", type: "i64" },
              {
                name: "outcome",
                docs: [
                  "Informational multisig ruling. Does NOT drive the fee split.",
                ],
                type: { defined: { name: "DisputeOutcome" } },
              },
              {
                name: "slash",
                docs: [
                  "`true` when the multisig applied the slash to this dispute.",
                ],
                type: "bool",
              },
              {
                name: "slash_bps_snapshot",
                docs: ["Snapshot bps that drove the slash math."],
                type: "u16",
              },
              {
                name: "opener_refund_owed",
                docs: [
                  "Lamports the opener may pull via [`crate::pump_bounties::claim_dispute_refund`].",
                ],
                type: "u64",
              },
              {
                name: "punishment_amount",
                docs: [
                  "Lamports routed to [`crate::config::state::Config::dispute_fee_vault`].",
                ],
                type: "u64",
              },
              {
                name: "active_dispute_count_after",
                docs: [
                  "[`crate::bounty::state::Bounty::active_dispute_count`] after this resolution.",
                ],
                type: "u16",
              },
            ],
          },
        },
        {
          name: "DisputeUnresolvedEvent",
          docs: [
            "Emitted once per dispute reverted by",
            "[`crate::pump_bounties::unresolve_dispute`]. Indicates the moderator rolled",
            "the dispute back to its post-`open_dispute` state; the `Dispute` PDA stays",
            "alive with its original escrow.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "dispute", type: "pubkey" },
              { name: "unresolved_at", type: "i64" },
              {
                name: "active_dispute_count_after",
                docs: [
                  "[`crate::bounty::state::Bounty::active_dispute_count`] after this revert.",
                ],
                type: "u16",
              },
            ],
          },
        },
        {
          name: "DisputesBatchSweptEvent",
          docs: [
            "Emitted by every [`crate::pump_bounties::finalize_disputes`] call (chunked or",
            "single-shot). Indexers should sum `batch_punishment_settled` across all",
            "events for a given bounty to reconstruct the cumulative punishment routed",
            "to [`crate::config::state::Config::dispute_fee_vault`] for the round.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              {
                name: "batch_settled",
                docs: [
                  "Number of [`crate::decision::state::Dispute`] PDAs swept in this call.",
                ],
                type: "u16",
              },
              {
                name: "batch_punishment_settled",
                docs: [
                  "Lamports debited from the swept PDAs into",
                  "[`crate::config::state::Config::dispute_fee_vault`] in this call.",
                ],
                type: "u64",
              },
              {
                name: "swept_count_after",
                docs: [
                  "[`crate::bounty::state::Bounty::disputes_swept_count`] after this batch.",
                ],
                type: "u16",
              },
              {
                name: "total_disputes_opened",
                docs: [
                  "[`crate::bounty::state::Bounty::total_disputes_opened`] (frozen for the",
                  "round since the original dispute window has elapsed).",
                ],
                type: "u16",
              },
              {
                name: "is_final",
                docs: [
                  "`true` when this batch swept the final outstanding dispute and the",
                  "bounty transitioned back to",
                  "[`crate::shared::enums::BountyStatus::DecisionPendingTimelock`].",
                ],
                type: "bool",
              },
              { name: "finalized_at", type: "i64" },
            ],
          },
        },
        {
          name: "DisputesFinalizedEvent",
          docs: [
            "Emitted by [`crate::pump_bounties::finalize_disputes`] on the call that sweeps",
            "the last outstanding dispute and re-enters",
            "[`crate::shared::enums::BountyStatus::DecisionPendingTimelock`]. Indexers",
            "should reconstruct the cumulative punishment from the per-batch",
            "[`DisputesBatchSweptEvent`] stream — this event does not carry it.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "final_decision_hash", type: { array: ["u8", 32] } },
              {
                name: "overridden",
                docs: [
                  "`true` when the moderator supplied a new decision hash on the final",
                  "batch; `false` when the prior hash was kept.",
                ],
                type: "bool",
              },
              { name: "total_disputes_opened", type: "u16" },
              { name: "finalized_at", type: "i64" },
            ],
          },
        },
        {
          name: "FeePurpose",
          docs: [
            "Why a fee was paid. Informational tag for off-chain accounting/analytics; the",
            "program treats every purpose identically.",
          ],
          type: {
            kind: "enum",
            variants: [
              { name: "Publish" },
              { name: "RewardPoolCreate" },
              { name: "TopUp" },
            ],
          },
        },
        {
          name: "FeeSchedule",
          docs: [
            'Admin-governed fee ladder (single PDA per deployment, `seeds = [b"fee_schedule"]`).',
            "",
            "`tiers[0..tier_count]` are active and must be strictly ascending by",
            "`min_value_usd`, starting at `0`. `fee_exempt_mint` is our own token: reward",
            "value denominated in it counts toward the ladder total (a discount) but is",
            'charged no fee. `Pubkey::default()` means "no exempt mint".',
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "tier_count", type: "u8" },
              {
                name: "tiers",
                type: { array: [{ defined: { name: "FeeTier" } }, 8] },
              },
              { name: "fee_exempt_mint", type: "pubkey" },
            ],
          },
        },
        {
          name: "FeeTier",
          docs: [
            "One rung of the fee ladder: reward pools valued at or above `min_value_usd`",
            "(and below the next tier's threshold) are charged `fee_bps`.",
            "",
            "Thresholds are whole US dollars. This schedule is **declarative**: the chain",
            "cannot value a reward pool in USD, so the off-chain quote engine reads this",
            "PDA and applies the ladder. Storing it on-chain makes the ladder transparent",
            "and governs it with the same admin authority as [`Config`].",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "min_value_usd", type: "u64" },
              { name: "fee_bps", type: "u16" },
            ],
          },
        },
        {
          name: "FinalizeDisputesArgs",
          docs: [
            "Instruction data for",
            "[`finalize_disputes`](crate::pump_bounties::finalize_disputes).",
            "",
            "When `final_decision_hash` is `None` the prior `bounty.decision_hash` is kept;",
            "when `Some`, the bounty's decision hash is overwritten with the provided value.",
            "Either way the bounty transitions back to",
            "[`crate::shared::enums::BountyStatus::DecisionPendingTimelock`] with",
            "`dispute_open_until_ts = now`, so [`publish_awards`](crate::pump_bounties::publish_awards)",
            "can run immediately. Per-dispute punishment lamports flow to",
            "[`crate::config::state::Config::dispute_fee_vault`] inside this same call (one",
            "`Dispute` PDA per opened dispute, in any order, supplied via `remaining_accounts`).",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "final_decision_hash",
                type: { option: { array: ["u8", 32] } },
              },
            ],
          },
        },
        {
          name: "InitializeConfigArgs",
          docs: [
            "Instruction data for [`initialize_config`](crate::pump_bounties::initialize_config).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "multisig_authority", type: "pubkey" },
              { name: "moderator_authority", type: "pubkey" },
              { name: "publish_fee_vault", type: "pubkey" },
              { name: "dispute_fee_vault", type: "pubkey" },
              { name: "submission_fee_vault", type: "pubkey" },
              { name: "publish_fee_lamports", type: "u64" },
              { name: "dispute_fee_lamports", type: "u64" },
              { name: "submission_fee_lamports", type: "u64" },
              { name: "dispute_window_seconds", type: "i64" },
              {
                name: "dispute_slash_bps",
                docs: [
                  "Basis points (0..=10_000) of the escrowed dispute fee routed to",
                  "`dispute_fee_vault` when the moderator sets `slash = true` in",
                  "[`crate::pump_bounties::resolve_disputes`].",
                ],
                type: "u16",
              },
            ],
          },
        },
        {
          name: "InitializeFeeScheduleArgs",
          docs: [
            "Instruction data for",
            "[`initialize_fee_schedule`](crate::pump_bounties::initialize_fee_schedule).",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "tiers",
                docs: [
                  "Ascending fee ladder; first tier must start at `min_value_usd == 0`.",
                ],
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              {
                name: "fee_exempt_mint",
                docs: [
                  "Our token; `Pubkey::default()` for none. Value in this mint counts toward",
                  "the ladder total but is charged no fee.",
                ],
                type: "pubkey",
              },
            ],
          },
        },
        {
          name: "OpenDisputeArgs",
          docs: [
            "Instruction data for [`open_dispute`](crate::pump_bounties::open_dispute).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "evidence_hash", type: { array: ["u8", 32] } },
              { name: "evidence_uri", type: "string" },
            ],
          },
        },
        {
          name: "PayBountyFeeArgs",
          docs: [
            "Instruction data for [`pay_bounty_fee`](crate::pump_bounties::pay_bounty_fee).",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "quote_nonce",
                docs: [
                  "Correlates with the off-chain quote; part of the escrow PDA seeds.",
                ],
                type: "u64",
              },
              { name: "purpose", type: { defined: { name: "FeePurpose" } } },
              { name: "amount", type: "u64" },
            ],
          },
        },
        {
          name: "PaySubmissionFeeArgs",
          type: {
            kind: "struct",
            fields: [
              { name: "submission_commitment", type: { array: ["u8", 32] } },
              { name: "submission_id", type: "string" },
            ],
          },
        },
        {
          name: "PublishAwardsArgs",
          docs: [
            "Instruction data for [`publish_awards`](crate::pump_bounties::publish_awards).",
            "",
            "`entries` carries only the winners materialized by *this* call — a chunk of a single",
            "pool's payouts. Each call's entries must match `reward_vault.mint`; entries for other",
            "mints are filtered out. A pool may be published across multiple calls (chunking keeps",
            "each transaction within size limits); `reward_vault.total_awarded` accumulates across",
            "chunks. Set `finalize_pool` on the final chunk to seal the pool",
            "(`reward_vault.decision_applied = true`), which is what unlocks `claim_refund` for that",
            "pool's depositors. The committed `bounty.decision_hash` is no longer re-verified here —",
            "`publish_awards` is gated solely on `config.multisig_authority`.",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "entries",
                type: { vec: { defined: { name: "AwardEntry" } } },
              },
              {
                name: "finalize_pool",
                docs: [
                  "When `true`, seal this pool: set `reward_vault.decision_applied = true` after applying",
                  "this chunk. Leave `false` on intermediate chunks so refunds stay blocked until the",
                  "pool's full payout has been materialized.",
                ],
                type: "bool",
              },
            ],
          },
        },
        {
          name: "RecordDecisionArgs",
          docs: [
            "Instruction data for [`record_decision`](crate::pump_bounties::record_decision).",
          ],
          type: {
            kind: "struct",
            fields: [{ name: "decision_hash", type: { array: ["u8", 32] } }],
          },
        },
        {
          name: "RefundClaimedEvent",
          docs: ["Emitted after a depositor pulls their pro-rata refund."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "reward_vault", type: "pubkey" },
              { name: "reward_mint", type: "pubkey" },
              { name: "depositor", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "claimed_at", type: "i64" },
            ],
          },
        },
        {
          name: "ResolveDisputeEntry",
          docs: [
            "One per-dispute ruling in a [`resolve_disputes`](crate::pump_bounties::resolve_disputes) batch.",
            "",
            "`outcome` is an informational tag on the dispute (was the claim valid or not);",
            "it does NOT drive the fee split. `slash` is the independent knob that records",
            "`punishment_amount = floor(fee * dispute.slash_bps_snapshot / 10_000)` on the",
            "dispute. Lamports are NOT moved by `resolve_disputes`; they only flow to",
            "[`crate::config::state::Config::dispute_fee_vault`] when",
            "[`finalize_disputes`](crate::pump_bounties::finalize_disputes) runs, so a",
            "moderator [`unresolve_dispute`](crate::pump_bounties::unresolve_dispute) is",
            "guaranteed not to need to claw funds back.",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "outcome",
                docs: [
                  "Must be [`DisputeOutcome::Accepted`] or [`DisputeOutcome::Rejected`].",
                ],
                type: { defined: { name: "DisputeOutcome" } },
              },
              {
                name: "slash",
                docs: [
                  "When `true`, slash per the snapshotted bps; when `false`, full refund.",
                ],
                type: "bool",
              },
            ],
          },
        },
        {
          name: "ResolveDisputesArgs",
          docs: [
            "Instruction data for [`resolve_disputes`](crate::pump_bounties::resolve_disputes).",
            "",
            "`entries` is paired 1:1 with the [`crate::decision::state::Dispute`] PDAs passed",
            "in `remaining_accounts`, in the same order. Fails with",
            "[`crate::decision::errors::BountyError::ResolveEntriesMismatch`] on length",
            "mismatch.",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "entries",
                type: { vec: { defined: { name: "ResolveDisputeEntry" } } },
              },
            ],
          },
        },
        {
          name: "RewardDepositedEvent",
          docs: ["Emitted after a successful additional deposit."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "reward_vault", type: "pubkey" },
              { name: "reward_mint", type: "pubkey" },
              { name: "depositor", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "deposited_at", type: "i64" },
            ],
          },
        },
        {
          name: "RewardPoolClosedEvent",
          docs: ["Emitted when a reward pool is closed to the `closer`."],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "reward_vault", type: "pubkey" },
              { name: "reward_mint", type: "pubkey" },
              { name: "closer", type: "pubkey" },
              { name: "closed_at", type: "i64" },
            ],
          },
        },
        {
          name: "RewardPoolCreatedEvent",
          docs: [
            "Emitted when a new reward pool (new mint) is opened on an existing bounty.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "reward_vault", type: "pubkey" },
              { name: "creator", type: "pubkey" },
              { name: "reward_mint", type: "pubkey" },
              { name: "initial_amount", type: "u64" },
              { name: "created_at", type: "i64" },
            ],
          },
        },
        {
          name: "RewardVault",
          docs: [
            "One reward pool per `(bounty, mint)`. Mutable container with no lifecycle state of its",
            "own — the per-vault flags below are mechanical anti-replay / accounting, not",
            '"finalization" state.',
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "bounty", type: "pubkey" },
              {
                name: "mint",
                docs: [
                  "SPL / Token-2022 mint for this pool. SOL-denominated bounties use wrapped SOL",
                  "(`So11111111111111111111111111111111111111112`); the program itself is mint-agnostic.",
                ],
                type: "pubkey",
              },
              {
                name: "token_vault",
                docs: [
                  "SPL / Token-2022 token account owned by this vault PDA (canonical ATA).",
                ],
                type: "pubkey",
              },
              { name: "total_amount", type: "u64" },
              {
                name: "remaining_amount",
                docs: [
                  "Token amount still custodied; must be zero before",
                  "[`close_reward_pool`](crate::pump_bounties::close_reward_pool).",
                ],
                type: "u64",
              },
              {
                name: "total_awarded",
                docs: [
                  "Amount awarded from this pool by [`publish_awards`](crate::pump_bounties::publish_awards).",
                  "Refund pro-rata reads this. `0` until the pool's slice of the decision is applied,",
                  "including the expired-no-decision path where it stays `0`.",
                ],
                type: "u64",
              },
              {
                name: "decision_applied",
                docs: [
                  "One-shot flag: `true` once [`publish_awards`](crate::pump_bounties::publish_awards)",
                  "has materialized this pool's slice of the decision. Prevents double-apply.",
                ],
                type: "bool",
              },
            ],
          },
        },
        {
          name: "SettleBountyFeeArgs",
          docs: [
            "Instruction data for [`settle_bounty_fee`](crate::pump_bounties::settle_bounty_fee).",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "refund_bps",
                docs: [
                  "Basis points (0..=10_000) of the escrowed `amount` refunded to the payer.",
                  "`0` keeps the whole fee; `10_000` refunds everything.",
                ],
                type: "u16",
              },
            ],
          },
        },
        {
          name: "SubmissionFeePaidEvent",
          docs: [
            "Emitted after a successful submission fee payment and receipt account init.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bounty", type: "pubkey" },
              { name: "submission_commitment", type: { array: ["u8", 32] } },
              { name: "payer", type: "pubkey" },
              { name: "paid_at", type: "i64" },
            ],
          },
        },
        {
          name: "SubmissionFeeReceipt",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "bounty", type: "pubkey" },
              {
                name: "submission_commitment",
                docs: [
                  "Same 32-byte value used in the PDA seeds; correlates with off-chain submission identity.",
                ],
                type: { array: ["u8", 32] },
              },
              { name: "payer", type: "pubkey" },
              { name: "paid_at", type: "i64" },
            ],
          },
        },
        {
          name: "UnresolveDisputeArgs",
          docs: [
            "Instruction data for",
            "[`unresolve_dispute`](crate::pump_bounties::unresolve_dispute).",
            "",
            "No payload today; kept as an explicit struct so a future revision can add",
            "per-call metadata (audit reason hash, etc.) without breaking the IDL.",
          ],
          type: { kind: "struct", fields: [] },
        },
        {
          name: "UpdateConfigArgs",
          docs: [
            "Partial update payload for [`update_config`](crate::pump_bounties::update_config); unset fields unchanged.",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "multisig_authority", type: { option: "pubkey" } },
              {
                name: "admin",
                docs: [
                  "New config admin. If set, subsequent `update_config` calls must be",
                  "signed by this key.",
                ],
                type: { option: "pubkey" },
              },
              { name: "moderator_authority", type: { option: "pubkey" } },
              { name: "publish_fee_vault", type: { option: "pubkey" } },
              { name: "dispute_fee_vault", type: { option: "pubkey" } },
              { name: "submission_fee_vault", type: { option: "pubkey" } },
              { name: "publish_fee_lamports", type: { option: "u64" } },
              { name: "dispute_fee_lamports", type: { option: "u64" } },
              { name: "submission_fee_lamports", type: { option: "u64" } },
              { name: "dispute_window_seconds", type: { option: "i64" } },
              {
                name: "dispute_slash_bps",
                docs: [
                  "Basis points (0..=10_000). Only applies to future disputes — existing",
                  "[`crate::decision::state::Dispute`] rows keep their `slash_bps_snapshot`.",
                ],
                type: { option: "u16" },
              },
              { name: "paused_flags", type: { option: "u16" } },
            ],
          },
        },
        {
          name: "UpdateFeeScheduleArgs",
          docs: [
            "Partial update payload for",
            "[`update_fee_schedule`](crate::pump_bounties::update_fee_schedule); unset",
            "fields unchanged.",
          ],
          type: {
            kind: "struct",
            fields: [
              {
                name: "tiers",
                type: { option: { vec: { defined: { name: "FeeTier" } } } },
              },
              { name: "fee_exempt_mint", type: { option: "pubkey" } },
            ],
          },
        },
      ],
    },
    l = m.address,
    h = new s.PublicKey(l),
    y = {
      CONFIG: t.Buffer.from("config"),
      BOUNTY: t.Buffer.from("bounty"),
      REWARD_VAULT: t.Buffer.from("reward_vault"),
      DEPOSITOR_LEDGER: t.Buffer.from("depositor_ledger"),
      DISPUTE: t.Buffer.from("dispute"),
      SUBMISSION_FEE: t.Buffer.from("submission_fee"),
      AWARD: t.Buffer.from("award"),
      BOUNTY_FEE: t.Buffer.from("bounty_fee"),
      FEE_SCHEDULE: t.Buffer.from("fee_schedule"),
    };
  function f(e) {
    var t;
    return ((t = e), s.PublicKey.findProgramAddressSync([y.CONFIG], t ?? h))[0];
  }
  function b(e, n) {
    let i = a.default.isBN(e) ? e : new a.default(e.toString());
    return s.PublicKey.findProgramAddressSync(
      [y.BOUNTY, i.toArrayLike(t.Buffer, "le", 8)],
      n ?? h,
    );
  }
  function g(e, t) {
    return b(e, t)[0];
  }
  function _(e, t, n) {
    return s.PublicKey.findProgramAddressSync(
      [y.REWARD_VAULT, e.toBuffer(), t.toBuffer()],
      n ?? h,
    );
  }
  function w(e, t, n) {
    return _(e, t, n)[0];
  }
  function k(e, t, n) {
    var a, i, o;
    return ((a = e),
    (i = t),
    (o = n),
    s.PublicKey.findProgramAddressSync(
      [y.DEPOSITOR_LEDGER, a.toBuffer(), i.toBuffer()],
      o ?? h,
    ))[0];
  }
  function v(e, t, n) {
    var a, i, o;
    return ((a = e),
    (i = t),
    (o = n),
    s.PublicKey.findProgramAddressSync(
      [y.DISPUTE, a.toBuffer(), i.toBuffer()],
      o ?? h,
    ))[0];
  }
  function P(e, n, a) {
    var i, o, r;
    return ((i = e),
    (o = n),
    (r = a),
    s.PublicKey.findProgramAddressSync(
      [y.SUBMISSION_FEE, i.toBuffer(), t.Buffer.from(o)],
      r ?? h,
    ))[0];
  }
  function A(e, n, a, i) {
    return s.PublicKey.findProgramAddressSync(
      [y.AWARD, e.toBuffer(), t.Buffer.from(n), a.toBuffer()],
      i ?? h,
    );
  }
  function D(e, n, i, o) {
    var r, u, d, c;
    let p;
    return ((r = e),
    (u = n),
    (d = i),
    (c = o),
    (p = a.default.isBN(d) ? d : new a.default(d.toString())),
    s.PublicKey.findProgramAddressSync(
      [
        y.BOUNTY_FEE,
        r.toBuffer(),
        u.toBuffer(),
        p.toArrayLike(t.Buffer, "le", 8),
      ],
      c ?? h,
    ))[0];
  }
  function B(e) {
    var t;
    return ((t = e),
    s.PublicKey.findProgramAddressSync([y.FEE_SCHEDULE], t ?? h))[0];
  }
  function I(e) {
    return a.default.isBN(e) ? e : new a.default(e.toString());
  }
  function S(e) {
    return {
      rewardMint: e.mint,
      sourceTokenAccount: e.sourceTokenAccount,
      rewardTokenVault: e.rewardTokenVault,
      tokenProgramId: e.tokenProgramId ?? o.z,
    };
  }
  function F(e) {
    return {
      rewardMint: e.mint,
      rewardTokenVault: e.rewardTokenVault,
      destinationTokenAccount: e.destinationTokenAccount,
      tokenProgramId: e.tokenProgramId ?? o.z,
    };
  }
  function E(e) {
    let t = e.tokenProgramId ?? o.z,
      n = e.rewardTokenVault ?? (0, r.h)(e.rewardMint, e.rewardVault, !0, t);
    return (0, u.f)(e.payer, n, e.rewardVault, e.rewardMint, t);
  }
  async function C(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = t.rewardMintAccounts.mint,
      o = w(a, i, e.programId),
      r = A(a, t.submissionCommitment, i, e.programId)[0],
      u = F(t.rewardMintAccounts);
    return {
      instruction: await e.methods
        .claimAward()
        .accountsStrict({
          claimant: t.claimant,
          config: n,
          bounty: a,
          rewardVault: o,
          award: r,
          rewardMint: u.rewardMint,
          rewardTokenVault: u.rewardTokenVault,
          claimantTokenAccount: u.destinationTokenAccount,
          tokenProgram: u.tokenProgramId,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a, rewardVaultPda: o, awardPda: r },
    };
  }
  async function R(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = D(a, t.payer, t.quoteNonce, e.programId),
      s = t.tokenProgramId ?? o.z,
      u = t.escrowTokenVault ?? (0, r.h)(t.feeMint, i, !0, s);
    return {
      instruction: await e.methods
        .claimBountyFeeRefund()
        .accountsStrict({
          payer: t.payer,
          config: n,
          feeMint: t.feeMint,
          bountyFeeEscrow: i,
          escrowTokenVault: u,
          payerTokenAccount: t.payerTokenAccount,
          tokenProgram: s,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: n,
        bountyPda: a,
        bountyFeeEscrowPda: i,
        escrowTokenVault: u,
      },
    };
  }
  async function z(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = v(a, t.opener, e.programId);
    return {
      instruction: await e.methods
        .claimDisputeRefund()
        .accountsStrict({ opener: t.opener, config: n, bounty: a, dispute: i })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a, disputePda: i },
    };
  }
  async function T(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = w(a, t.rewardMintAccounts.mint, e.programId),
      o = k(i, t.depositor, e.programId),
      r = F(t.rewardMintAccounts);
    return {
      instruction: await e.methods
        .claimRefund()
        .accountsStrict({
          depositor: t.depositor,
          config: n,
          bounty: a,
          rewardVault: i,
          depositorLedger: o,
          rewardMint: r.rewardMint,
          rewardTokenVault: r.rewardTokenVault,
          depositorTokenAccount: r.destinationTokenAccount,
          tokenProgram: r.tokenProgramId,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: n,
        bountyPda: a,
        rewardVaultPda: i,
        depositorLedgerPda: o,
      },
    };
  }
  async function M(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId);
    return {
      instruction: await e.methods
        .closeBounty()
        .accountsStrict({ closer: t.closer, config: n, bounty: a })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a },
    };
  }
  async function V(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = w(a, t.rewardMint, e.programId),
      s = t.tokenProgramId ?? o.z,
      u = t.rewardTokenVault ?? (0, r.h)(t.rewardMint, i, !0, s);
    return {
      instruction: await e.methods
        .closeRewardPool()
        .accountsStrict({
          closer: t.closer,
          config: n,
          bounty: a,
          rewardMint: t.rewardMint,
          rewardVault: i,
          rewardTokenVault: u,
          tokenProgram: s,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: n,
        bountyPda: a,
        rewardVaultPda: i,
        rewardTokenVault: u,
      },
    };
  }
  async function x(e, t) {
    if (32 !== t.metadataHash.length)
      throw Error(
        `metadataHash must be 32 bytes, got ${t.metadataHash.length}`,
      );
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = w(a, t.rewardMintAccounts.mint, e.programId),
      o = k(i, t.poster, e.programId),
      r = S(t.rewardMintAccounts);
    return {
      instruction: await e.methods
        .createBountyAndPublish({
          bountyId: I(t.bountyId),
          metadataHash: Array.from(t.metadataHash),
          metadataUri: t.metadataUri,
          expiryTs: I(t.expiryTs),
          initialRewardAmount: I(t.initialRewardAmount),
        })
        .accountsStrict({
          poster: t.poster,
          config: n,
          publishFeeVault: t.publishFeeVault,
          bounty: a,
          rewardVault: i,
          depositorLedger: o,
          rewardMint: r.rewardMint,
          sourceTokenAccount: r.sourceTokenAccount,
          rewardTokenVault: r.rewardTokenVault,
          tokenProgram: r.tokenProgramId,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: n,
        bountyPda: a,
        rewardVaultPda: i,
        depositorLedgerPda: o,
      },
    };
  }
  async function L(e, t) {
    let n = await x(e, t),
      a = S(t.rewardMintAccounts);
    return {
      prefixInstructions: [
        E({
          payer: t.poster,
          rewardMint: a.rewardMint,
          rewardVault: n.pdas.rewardVaultPda,
          tokenProgramId: a.tokenProgramId,
          rewardTokenVault: a.rewardTokenVault,
        }),
      ],
      mainInstruction: n.instruction,
      signers: n.signers,
      pdas: n.pdas,
    };
  }
  async function N(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = w(a, t.rewardMintAccounts.mint, e.programId),
      o = k(i, t.creator, e.programId),
      r = S(t.rewardMintAccounts);
    return {
      instruction: await e.methods
        .createRewardPool({ initialAmount: I(t.initialAmount) })
        .accountsStrict({
          creator: t.creator,
          config: n,
          bounty: a,
          rewardVault: i,
          depositorLedger: o,
          rewardMint: r.rewardMint,
          sourceTokenAccount: r.sourceTokenAccount,
          rewardTokenVault: r.rewardTokenVault,
          tokenProgram: r.tokenProgramId,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: n,
        bountyPda: a,
        rewardVaultPda: i,
        depositorLedgerPda: o,
      },
    };
  }
  async function U(e, t) {
    let n = await N(e, t),
      a = S(t.rewardMintAccounts);
    return {
      prefixInstructions: [
        E({
          payer: t.creator,
          rewardMint: a.rewardMint,
          rewardVault: n.pdas.rewardVaultPda,
          tokenProgramId: a.tokenProgramId,
          rewardTokenVault: a.rewardTokenVault,
        }),
      ],
      mainInstruction: n.instruction,
      signers: n.signers,
      pdas: n.pdas,
    };
  }
  async function O(e, t, n = "deposit") {
    let a = f(e.programId),
      i = g(t.bountyId, e.programId),
      o = w(i, t.rewardMintAccounts.mint, e.programId),
      r = k(o, t.depositor, e.programId),
      u = S(t.rewardMintAccounts),
      d = I(t.amount);
    return {
      instruction: await e.methods
        .depositReward(d)
        .accountsStrict({
          depositor: t.depositor,
          config: a,
          bounty: i,
          rewardVault: o,
          depositorLedger: r,
          rewardMint: u.rewardMint,
          sourceTokenAccount: u.sourceTokenAccount,
          rewardTokenVault: u.rewardTokenVault,
          tokenProgram: u.tokenProgramId,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: a,
        bountyPda: i,
        rewardVaultPda: o,
        depositorLedgerPda: r,
      },
    };
  }
  async function q(e, t) {
    if (t.finalDecisionHash && 32 !== t.finalDecisionHash.length)
      throw Error(
        `finalDecisionHash must be 32 bytes, got ${t.finalDecisionHash.length}`,
      );
    if (0 === t.disputes.length)
      throw Error(
        "finalize_disputes batch must contain at least one Dispute PDA",
      );
    W(t.disputes);
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = t.finalDecisionHash ? Array.from(t.finalDecisionHash) : null;
    return {
      instruction: await e.methods
        .finalizeDisputes({ finalDecisionHash: i })
        .accountsStrict({
          authority: t.authority,
          config: n,
          disputeFeeVault: t.disputeFeeVault,
          bounty: a,
          systemProgram: s.SystemProgram.programId,
        })
        .remainingAccounts(
          t.disputes.map((e) => ({ pubkey: e, isSigner: !1, isWritable: !0 })),
        )
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a },
    };
  }
  async function H(e, t) {
    if (0 === t.disputes.length)
      throw Error("buildFinalizeDisputesAll requires at least one dispute");
    if (t.finalDecisionHash && 32 !== t.finalDecisionHash.length)
      throw Error(
        `finalDecisionHash must be 32 bytes, got ${t.finalDecisionHash.length}`,
      );
    W(t.disputes);
    let n = t.disputesPerBatch ?? 10;
    if (!Number.isInteger(n) || n <= 0)
      throw Error(`disputesPerBatch must be a positive integer, got ${n}`);
    let a = [];
    for (let e = 0; e < t.disputes.length; e += n)
      a.push(t.disputes.slice(e, e + n));
    let i = [];
    for (let [n, s] of a.entries()) {
      let o = n === a.length - 1;
      i.push(
        await q(e, {
          authority: t.authority,
          bountyId: t.bountyId,
          disputeFeeVault: t.disputeFeeVault,
          disputes: s,
          finalDecisionHash: o ? (t.finalDecisionHash ?? null) : null,
        }),
      );
    }
    return i;
  }
  function W(e) {
    let t = new Set();
    for (let n of e) {
      let e = n.toBase58();
      if (t.has(e))
        throw Error(`Duplicate Dispute PDA in finalize_disputes batch: ${e}`);
      t.add(e);
    }
  }
  async function K(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId);
    return {
      instruction: await e.methods
        .finalizeExpired()
        .accountsStrict({ payer: t.payer, config: n, bounty: a })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a },
    };
  }
  async function $(e, t) {
    let n = f(e.programId);
    return {
      instruction: await e.methods
        .initializeConfig({
          multisigAuthority: t.multisigAuthority,
          moderatorAuthority: t.moderatorAuthority,
          publishFeeVault: t.publishFeeVault,
          disputeFeeVault: t.disputeFeeVault,
          submissionFeeVault: t.submissionFeeVault,
          publishFeeLamports: I(t.publishFeeLamports),
          disputeFeeLamports: I(t.disputeFeeLamports),
          submissionFeeLamports: I(t.submissionFeeLamports),
          disputeWindowSeconds: I(t.disputeWindowSeconds),
          disputeSlashBps: t.disputeSlashBps,
        })
        .accountsStrict({
          admin: t.admin,
          config: n,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n },
    };
  }
  function j(e) {
    return e.map((e) => ({ minValueUsd: I(e.minValueUsd), feeBps: e.feeBps }));
  }
  async function G(e, t) {
    let n = f(e.programId),
      a = B(e.programId),
      i = t.feeExemptMint ?? s.SystemProgram.programId;
    return {
      instruction: await e.methods
        .initializeFeeSchedule({ tiers: j(t.tiers), feeExemptMint: i })
        .accountsStrict({
          authority: t.authority,
          config: n,
          feeSchedule: a,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n, feeSchedulePda: a },
    };
  }
  async function Y(e, t) {
    if (32 !== t.evidenceHash.length)
      throw Error(
        `evidenceHash must be 32 bytes, got ${t.evidenceHash.length}`,
      );
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = v(a, t.opener, e.programId);
    return {
      instruction: await e.methods
        .openDispute({
          evidenceHash: Array.from(t.evidenceHash),
          evidenceUri: t.evidenceUri,
        })
        .accountsStrict({
          opener: t.opener,
          config: n,
          bounty: a,
          dispute: i,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a, disputePda: i },
    };
  }
  async function Q(e, t) {
    let n,
      a = f(e.programId),
      i = g(t.bountyId, e.programId),
      u = D(i, t.payer, t.quoteNonce, e.programId),
      { escrowTokenVault: d, tokenProgramId: c } =
        ((n = t.feeMintAccounts.tokenProgramId ?? o.z),
        {
          escrowTokenVault:
            t.feeMintAccounts.escrowTokenVault ??
            (0, r.h)(t.feeMintAccounts.mint, u, !0, n),
          tokenProgramId: n,
        });
    return {
      instruction: await e.methods
        .payBountyFee({
          quoteNonce: I(t.quoteNonce),
          purpose: t.purpose,
          amount: I(t.amount),
        })
        .accountsStrict({
          payer: t.payer,
          config: a,
          bounty: i,
          feeMint: t.feeMintAccounts.mint,
          bountyFeeEscrow: u,
          sourceTokenAccount: t.feeMintAccounts.sourceTokenAccount,
          escrowTokenVault: d,
          tokenProgram: c,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: a,
        bountyPda: i,
        bountyFeeEscrowPda: u,
        escrowTokenVault: d,
      },
    };
  }
  async function Z(e, t) {
    var n;
    let a,
      i,
      s = await Q(e, t);
    return {
      prefixInstructions: [
        ((a =
          (n = {
            payer: t.payer,
            mint: t.feeMintAccounts.mint,
            escrow: s.pdas.bountyFeeEscrowPda,
            tokenProgramId: t.feeMintAccounts.tokenProgramId,
            escrowTokenVault: s.pdas.escrowTokenVault,
          }).tokenProgramId ?? o.z),
        (i = n.escrowTokenVault ?? (0, r.h)(n.mint, n.escrow, !0, a)),
        (0, u.f)(n.payer, i, n.escrow, n.mint, a)),
      ],
      mainInstruction: s.instruction,
      signers: s.signers,
      pdas: s.pdas,
    };
  }
  async function J(e, t) {
    if (32 !== t.submissionCommitment.length)
      throw Error(
        `submissionCommitment must be 32 bytes, got ${t.submissionCommitment.length}`,
      );
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = P(a, t.submissionCommitment, e.programId);
    return {
      instruction: await e.methods
        .paySubmissionFee({
          submissionCommitment: Array.from(t.submissionCommitment),
          submissionId: t.submissionId,
        })
        .accountsStrict({
          payer: t.payer,
          config: n,
          submissionFeeVault: t.submissionFeeVault,
          bounty: a,
          submissionFeeReceipt: i,
          systemProgram: s.SystemProgram.programId,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a, submissionFeeReceiptPda: i },
    };
  }
  async function X(e, n) {
    var i, o;
    let r,
      u = f(e.programId),
      d = g(n.bountyId, e.programId),
      c = w(d, n.vaultMint, e.programId),
      { filtered: p } =
        ((i = n.entries),
        (o = n.vaultMint),
        {
          filtered: (r = [...i].sort((e, n) => {
            let a = t.Buffer.compare(
              t.Buffer.from(e.submissionCommitment),
              t.Buffer.from(n.submissionCommitment),
            );
            return 0 !== a
              ? a
              : t.Buffer.compare(e.mint.toBuffer(), n.mint.toBuffer());
          })).filter((e) => e.mint.equals(o)),
          canonical: r,
        }),
      m = p.map((t) => {
        var n;
        return {
          submissionCommitment: t.submissionCommitment,
          receipt: P(d, t.submissionCommitment, e.programId),
          award:
            ((n = t.submissionCommitment), A(d, n, t.mint, e.programId)[0]),
        };
      }),
      l = m.flatMap(({ receipt: e, award: t }) => [
        { pubkey: e, isSigner: !1, isWritable: !1 },
        { pubkey: t, isSigner: !1, isWritable: !0 },
      ]);
    return {
      instruction: await e.methods
        .publishAwards({
          entries: p.map((e) => ({
            submissionCommitment: Array.from(e.submissionCommitment),
            mint: e.mint,
            amount: new a.default(e.amount.toString()),
          })),
          finalizePool: n.finalizePool ?? !0,
        })
        .accountsStrict({
          authority: n.authority,
          config: u,
          bounty: d,
          rewardVault: c,
          systemProgram: s.SystemProgram.programId,
        })
        .remainingAccounts(l)
        .instruction(),
      signers: [],
      pdas: { configPda: u, bountyPda: d, rewardVaultPda: c, filteredPdas: m },
    };
  }
  async function ee(e, t) {
    if (32 !== t.decisionHash.length)
      throw Error(
        `decisionHash must be 32 bytes, got ${t.decisionHash.length}`,
      );
    let n = f(e.programId),
      a = g(t.bountyId, e.programId);
    return {
      instruction: await e.methods
        .recordDecision({ decisionHash: Array.from(t.decisionHash) })
        .accountsStrict({ authority: t.authority, config: n, bounty: a })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a },
    };
  }
  async function et(e, t) {
    if (0 === t.entries.length)
      throw Error("resolveDisputes requires at least one entry");
    ea(t.entries);
    let n = f(e.programId),
      a = g(t.bountyId, e.programId);
    return {
      instruction: await e.methods
        .resolveDisputes({
          entries: t.entries.map((e) => ({
            outcome: e.outcome,
            slash: e.slash,
          })),
        })
        .accountsStrict({ authority: t.authority, config: n, bounty: a })
        .remainingAccounts(
          t.entries.map((e) => ({
            pubkey: e.dispute,
            isSigner: !1,
            isWritable: !0,
          })),
        )
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a },
    };
  }
  async function en(e, t) {
    if (0 === t.entries.length)
      throw Error("buildResolveDisputesAll requires at least one entry");
    ea(t.entries);
    let n = t.disputesPerBatch ?? 10;
    if (!Number.isInteger(n) || n <= 0)
      throw Error(`disputesPerBatch must be a positive integer, got ${n}`);
    let a = [];
    for (let e = 0; e < t.entries.length; e += n)
      a.push(t.entries.slice(e, e + n));
    let i = [];
    for (let n of a)
      i.push(
        await et(e, {
          authority: t.authority,
          bountyId: t.bountyId,
          entries: n,
        }),
      );
    return i;
  }
  function ea(e) {
    let t = new Set();
    for (let n of e) {
      let e = n.dispute.toBase58();
      if (t.has(e))
        throw Error(`Duplicate Dispute PDA in resolve_disputes batch: ${e}`);
      t.add(e);
    }
  }
  async function ei(e, t) {
    let n,
      a,
      i,
      s,
      u,
      d,
      {
        cfg: c,
        bounty: p,
        escrow: m,
        tokenProgramId: l,
        escrowTokenVault: h,
        publishFeeVaultTokenAccount: y,
      } = ((n = f(e.programId)),
      (i = D(
        (a = g(t.bountyId, e.programId)),
        t.payer,
        t.quoteNonce,
        e.programId,
      )),
      (s = t.tokenProgramId ?? o.z),
      (u = t.escrowTokenVault ?? (0, r.h)(t.feeMint, i, !0, s)),
      (d =
        t.publishFeeVaultTokenAccount ??
        (0, r.h)(t.feeMint, t.publishFeeVault, !0, s)),
      {
        cfg: n,
        bounty: a,
        escrow: i,
        tokenProgramId: s,
        escrowTokenVault: u,
        publishFeeVaultTokenAccount: d,
      });
    return {
      instruction: await e.methods
        .settleBountyFee({ refundBps: t.refundBps })
        .accountsStrict({
          authority: t.authority,
          config: c,
          bounty: p,
          feeMint: t.feeMint,
          bountyFeeEscrow: m,
          escrowTokenVault: h,
          publishFeeVault: t.publishFeeVault,
          publishFeeVaultTokenAccount: y,
          tokenProgram: l,
        })
        .instruction(),
      signers: [],
      pdas: {
        configPda: c,
        bountyPda: p,
        bountyFeeEscrowPda: m,
        escrowTokenVault: h,
        publishFeeVaultTokenAccount: y,
      },
    };
  }
  async function es(e, t) {
    let n = await ei(e, t),
      a = t.tokenProgramId ?? o.z;
    return {
      prefixInstructions: [
        (0, u.f)(
          t.rentPayer ?? t.authority,
          n.pdas.publishFeeVaultTokenAccount,
          t.publishFeeVault,
          t.feeMint,
          a,
        ),
      ],
      mainInstruction: n.instruction,
      signers: n.signers,
      pdas: n.pdas,
    };
  }
  async function eo(e, t) {
    let n = f(e.programId),
      a = g(t.bountyId, e.programId),
      i = v(a, t.opener, e.programId);
    return {
      instruction: await e.methods
        .unresolveDispute({})
        .accountsStrict({
          authority: t.authority,
          config: n,
          bounty: a,
          dispute: i,
        })
        .instruction(),
      signers: [],
      pdas: { configPda: n, bountyPda: a, disputePda: i },
    };
  }
  function er(e) {
    return null == e
      ? null
      : a.default.isBN(e)
        ? e
        : new a.default(e.toString());
  }
  function eu(e) {
    return void 0 === e ? null : e;
  }
  async function ed(e, t) {
    let n = f(e.programId);
    return {
      instruction: await e.methods
        .updateConfig({
          multisigAuthority: eu(t.multisigAuthority),
          admin: eu(t.admin),
          moderatorAuthority: eu(t.moderatorAuthority),
          publishFeeVault: eu(t.publishFeeVault),
          disputeFeeVault: eu(t.disputeFeeVault),
          submissionFeeVault: eu(t.submissionFeeVault),
          publishFeeLamports: er(t.publishFeeLamports),
          disputeFeeLamports: er(t.disputeFeeLamports),
          submissionFeeLamports: er(t.submissionFeeLamports),
          disputeWindowSeconds: er(t.disputeWindowSeconds),
          disputeSlashBps: eu(t.disputeSlashBps),
          pausedFlags: eu(t.pausedFlags),
        })
        .accountsStrict({ authority: t.authority, config: n })
        .instruction(),
      signers: [],
      pdas: { configPda: n },
    };
  }
  async function ec(e, t) {
    let n = f(e.programId),
      a = B(e.programId);
    return {
      instruction: await e.methods
        .updateFeeSchedule({
          tiers: t.tiers ? j(t.tiers) : null,
          feeExemptMint: t.feeExemptMint ?? null,
        })
        .accountsStrict({ authority: t.authority, config: n, feeSchedule: a })
        .instruction(),
      signers: [],
      pdas: { configPda: n, feeSchedulePda: a },
    };
  }
  s.SystemProgram.programId;
  var ep = class t {
      program;
      provider;
      programId;
      constructor(e, t) {
        ((this.program = e),
          (this.provider = t),
          (this.programId = e.programId));
      }
      static fromConnection(e) {
        let n = new i.F(e.connection, e.wallet, {
          commitment: e.commitment ?? "confirmed",
        });
        return t.fromProvider(n, e.programId);
      }
      static fromProvider(e, n) {
        let a = n ? { ...m, address: n.toBase58() } : m;
        return new t(new i.v(a, e), e);
      }
      static fromProgram(e) {
        let n = e.provider;
        if ("function" != typeof n.sendAndConfirm)
          throw Error(
            "PumpBountiesClient.fromProgram requires a provider with sendAndConfirm (AnchorProvider or BankrunProvider).",
          );
        return new t(e, n);
      }
      findConfigPda = () => f(this.programId);
      findBountyPda = (e) => g(e, this.programId);
      findRewardVaultPda = (e, t) => w(e, t, this.programId);
      findDepositorLedgerPda = (e, t) => k(e, t, this.programId);
      findDisputePda = (e, t) => v(e, t, this.programId);
      findSubmissionFeeReceiptPda = (e, t) => P(e, t, this.programId);
      findAwardPda = (e, t, n) => A(e, t, n, this.programId)[0];
      findBountyFeeEscrowPda = (e, t, n) => D(e, t, n, this.programId);
      findFeeSchedulePda = () => B(this.programId);
      async fetchConfig() {
        return this.program.account.config.fetch(this.findConfigPda());
      }
      async fetchBounty(e) {
        return this.program.account.bounty.fetch(this.findBountyPda(e));
      }
      async fetchRewardVault(e, t) {
        let n = this.findBountyPda(e);
        return this.program.account.rewardVault.fetch(
          this.findRewardVaultPda(n, t),
        );
      }
      async listRewardVaultsForBounty(e) {
        let t = this.findBountyPda(e);
        return (
          await this.program.account.rewardVault.all([
            { memcmp: { offset: 9, bytes: t.toBase58() } },
          ])
        ).map((e) => ({ pda: e.publicKey, account: e.account }));
      }
      async fetchDepositorLedger(e, t) {
        return this.program.account.depositorLedger.fetch(
          this.findDepositorLedgerPda(e, t),
        );
      }
      async fetchDepositorLedgerNullable(e, t) {
        return this.program.account.depositorLedger.fetchNullable(
          this.findDepositorLedgerPda(e, t),
        );
      }
      async fetchDispute(e, t) {
        let n = this.findBountyPda(e);
        return this.program.account.dispute.fetch(this.findDisputePda(n, t));
      }
      async fetchDisputeNullable(e, t) {
        let n = this.findBountyPda(e);
        return this.program.account.dispute.fetchNullable(
          this.findDisputePda(n, t),
        );
      }
      async fetchSubmissionFeeReceipt(e, t) {
        let n = this.findBountyPda(e);
        return this.program.account.submissionFeeReceipt.fetch(
          this.findSubmissionFeeReceiptPda(n, t),
        );
      }
      async fetchSubmissionFeeReceiptNullable(e, t) {
        let n = this.findBountyPda(e);
        return this.program.account.submissionFeeReceipt.fetchNullable(
          this.findSubmissionFeeReceiptPda(n, t),
        );
      }
      async fetchAward(e, t, n) {
        let a = this.findBountyPda(e);
        return this.program.account.award.fetch(this.findAwardPda(a, t, n));
      }
      async fetchAwardNullable(e, t, n) {
        let a = this.findBountyPda(e);
        return this.program.account.award.fetchNullable(
          this.findAwardPda(a, t, n),
        );
      }
      async fetchBountyFeeEscrow(e, t, n) {
        let a = this.findBountyPda(e);
        return this.program.account.bountyFeeEscrow.fetch(
          this.findBountyFeeEscrowPda(a, t, n),
        );
      }
      async fetchBountyFeeEscrowNullable(e, t, n) {
        let a = this.findBountyPda(e);
        return this.program.account.bountyFeeEscrow.fetchNullable(
          this.findBountyFeeEscrowPda(a, t, n),
        );
      }
      async fetchFeeSchedule() {
        return this.program.account.feeSchedule.fetch(
          this.findFeeSchedulePda(),
        );
      }
      async fetchFeeScheduleNullable() {
        return this.program.account.feeSchedule.fetchNullable(
          this.findFeeSchedulePda(),
        );
      }
      buildInitializeConfig(e) {
        return $(this.program, e);
      }
      buildUpdateConfig(e) {
        return ed(this.program, e);
      }
      buildCreateBountyAndPublish(e) {
        return x(this.program, e);
      }
      buildCreateBountyAndPublishPlan(e) {
        return L(this.program, e);
      }
      buildCreateRewardPool(e) {
        return N(this.program, e);
      }
      buildCreateRewardPoolPlan(e) {
        return U(this.program, e);
      }
      buildDepositReward(e) {
        return O(this.program, e);
      }
      buildTopUpReward(e) {
        return O(this.program, e);
      }
      buildPaySubmissionFee(e) {
        return J(this.program, e);
      }
      buildPayBountyFee(e) {
        return Q(this.program, e);
      }
      buildPayBountyFeePlan(e) {
        return Z(this.program, e);
      }
      buildSettleBountyFee(e) {
        return ei(this.program, e);
      }
      buildSettleBountyFeePlan(e) {
        return es(this.program, e);
      }
      buildClaimBountyFeeRefund(e) {
        return R(this.program, e);
      }
      buildInitializeFeeSchedule(e) {
        return G(this.program, e);
      }
      buildUpdateFeeSchedule(e) {
        return ec(this.program, e);
      }
      buildRecordDecision(e) {
        return ee(this.program, e);
      }
      buildOpenDispute(e) {
        return Y(this.program, e);
      }
      buildResolveDisputes(e) {
        return et(this.program, e);
      }
      buildResolveDisputesAll(e) {
        return en(this.program, e);
      }
      buildUnresolveDispute(e) {
        return eo(this.program, e);
      }
      buildFinalizeDisputes(e) {
        return q(this.program, e);
      }
      buildFinalizeDisputesAll(e) {
        return H(this.program, e);
      }
      buildClaimDisputeRefund(e) {
        return z(this.program, e);
      }
      buildPublishAwards(e) {
        return X(this.program, e);
      }
      buildFinalizeExpired(e) {
        return K(this.program, e);
      }
      buildClaimAward(e) {
        return C(this.program, e);
      }
      buildClaimRefund(e) {
        return T(this.program, e);
      }
      buildCloseRewardPool(e) {
        return V(this.program, e);
      }
      buildCloseBounty(e) {
        return M(this.program, e);
      }
      initializeConfig(e, t) {
        return this.sendBuilt($(this.program, e), t);
      }
      updateConfig(e, t) {
        return this.sendBuilt(ed(this.program, e), t);
      }
      createBountyAndPublish(e, t) {
        return this.sendBuilt(x(this.program, e), t);
      }
      createRewardPool(e, t) {
        return this.sendBuilt(N(this.program, e), t);
      }
      depositReward(e, t) {
        return this.sendBuilt(O(this.program, e), t);
      }
      topUpReward(e, t) {
        return this.sendBuilt(O(this.program, e), t);
      }
      paySubmissionFee(e, t) {
        return this.sendBuilt(J(this.program, e), t);
      }
      payBountyFee(e, t) {
        return this.sendBuilt(Q(this.program, e), t);
      }
      settleBountyFee(e, t) {
        return this.sendBuilt(ei(this.program, e), t);
      }
      claimBountyFeeRefund(e, t) {
        return this.sendBuilt(R(this.program, e), t);
      }
      initializeFeeSchedule(e, t) {
        return this.sendBuilt(G(this.program, e), t);
      }
      updateFeeSchedule(e, t) {
        return this.sendBuilt(ec(this.program, e), t);
      }
      recordDecision(e, t) {
        return this.sendBuilt(ee(this.program, e), t);
      }
      openDispute(e, t) {
        return this.sendBuilt(Y(this.program, e), t);
      }
      resolveDisputes(e, t) {
        return this.resolveDisputesAll(e, t);
      }
      async resolveDisputesAll(e, t) {
        let n;
        for (let a of await en(this.program, e))
          n = await this.sendBuilt(Promise.resolve(a), t);
        return n;
      }
      unresolveDispute(e, t) {
        return this.sendBuilt(eo(this.program, e), t);
      }
      finalizeDisputes(e, t) {
        return this.sendBuilt(q(this.program, e), t);
      }
      claimDisputeRefund(e, t) {
        return this.sendBuilt(z(this.program, e), t);
      }
      publishAwards(e, t) {
        return this.sendBuilt(X(this.program, e), t);
      }
      finalizeExpired(e, t) {
        return this.sendBuilt(K(this.program, e), t);
      }
      claimAward(e, t) {
        return this.sendBuilt(C(this.program, e), t);
      }
      claimRefund(e, t) {
        return this.sendBuilt(T(this.program, e), t);
      }
      closeRewardPool(e, t) {
        return this.sendBuilt(V(this.program, e), t);
      }
      closeBounty(e, t) {
        return this.sendBuilt(M(this.program, e), t);
      }
      async sendBuilt(t, n) {
        let a = await t,
          i = [...a.signers, ...(n?.extraSigners ?? [])];
        try {
          let { Transaction: t } = await e.A(318190),
            n = new t().add(a.instruction);
          return {
            signature: await this.provider.sendAndConfirm(n, i),
            pdas: a.pdas,
          };
        } catch (e) {
          p.rethrow(e);
        }
      }
    },
    em = o.w;
  e.s([
    "n",
    0,
    {
      Unresolved: { unresolved: {} },
      Accepted: { accepted: {} },
      Rejected: { rejected: {} },
    },
    "g",
    0,
    {
      Publish: { publish: {} },
      RewardPoolCreate: { rewardPoolCreate: {} },
      TopUp: { topUp: {} },
    },
    "i",
    0,
    ep,
    "_",
    0,
    em,
    "w",
    0,
    R,
    "t",
    0,
    x,
    "N",
    0,
    N,
    "M",
    0,
    O,
    "q",
    0,
    Z,
    "R",
    0,
    J,
    "Q",
    0,
    es,
    "$",
    0,
    function (e, t) {
      let n = (0, r.h)(em, e, !0, o.z);
      return (0, c.f)(n, t ?? e, e, [], o.z);
    },
    "o",
    0,
    function (e, t, n) {
      let a = (0, r.h)(em, t, !0, o.z);
      return {
        instructions: [
          (0, u.f)(e, a, t, em, o.z),
          s.SystemProgram.transfer({ fromPubkey: t, toPubkey: a, lamports: n }),
          (0, d.f)(a, o.z),
        ],
        wsolAta: a,
      };
    },
    "f",
    0,
    function (e, a) {
      return new Uint8Array(
        (0, n.createHash)("sha256")
          .update(t.Buffer.from("pump.fun:bounty:submission", "utf8"))
          .update(e.toBuffer())
          .update(t.Buffer.from(a, "utf8"))
          .digest(),
      );
    },
    "I",
    0,
    A,
    "h",
    0,
    b,
    "b",
    0,
    _,
    "m",
    0,
    P,
  ]);
};
