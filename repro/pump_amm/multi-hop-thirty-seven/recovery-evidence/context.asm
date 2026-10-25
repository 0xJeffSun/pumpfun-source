0b3668: mov64 r8, r5
0b3670: mov64 r7, r3
0b3678: mov64 r6, r1
0b3680: stxdw [r10 - 0x508], r2
0b3688: mov64 r1, r10
0b3690: add64 r1, -0x3b8
0b3698: mov64 r2, r7
0b36a0: call -0x1478a ; call 0xfa58
0b36a8: ldxdw r3, [r10 - 0x3b0]
0b36b0: ldxdw r2, [r10 - 0x3b8]
0b36b8: jne r2, 0x2, +0x1f ; branch 0xb37b8
0b36c0: ldxdw r8, [r8 - 0xff8]
0b36c8: stxdw [r10 - 0x500], r3
0b36d0: mov64 r1, r10
0b36d8: add64 r1, -0x3b8
0b36e0: mov64 r2, r7
0b36e8: call -0x166a4 ; call 0x1d0
0b36f0: ldxw r1, [r10 - 0x308]
0b36f8: jeq r1, 0x2, +0x20 ; branch 0xb3800
0b3700: lddw r1, 0x300000000
0b3710: ldxdw r1, [r1 + 0x0]
0b3718: mov64 r3, r1
0b3720: add64 r3, -0xd8
0b3728: mov64 r2, 0x0
0b3730: mov64 r4, 0x1
0b3738: jgt r3, r1, +0x1 ; branch 0xb3748
0b3740: mov64 r4, 0x0
0b3748: stxdw [r10 - 0x810], r8
0b3750: jne r4, 0x0, +0x1 ; branch 0xb3760
0b3758: mov64 r2, r3
0b3760: lddw r8, 0x300007f28
0b3770: jeq r1, 0x0, +0x2 ; branch 0xb3788
0b3778: and64 r2, -0x8
0b3780: mov64 r8, r2
0b3788: lddw r1, 0x300000007
0b3798: jgt r8, r1, +0x17 ; branch 0xb3858
0b37a0: mov64 r1, 0x8
0b37a8: mov64 r2, 0xd8
0b37b0: call 0xbb75 ; call 0x111360
0b37b8: mov64 r1, r10
0b37c0: add64 r1, -0x518
0b37c8: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0b37d8: mov64 r5, 0x4
0b37e0: call -0x1634e ; call 0x1d78
0b37e8: ldxdw r1, [r10 - 0x518]
0b37f0: ldxdw r2, [r10 - 0x510]
0b37f8: ja +0x107 ; branch 0xb4038
0b3800: ldxdw r3, [r10 - 0x3b0]
0b3808: ldxdw r2, [r10 - 0x3b8]
0b3810: mov64 r1, r10
0b3818: add64 r1, -0x808
0b3820: lddw r4, 0x11e37d ; rodata b'user_in_token_accountuser_out_token_accountbuyback_fee_recipientpump_event_'
0b3830: mov64 r5, 0x15
0b3838: call -0x16359 ; call 0x1d78
0b3840: ldxdw r1, [r10 - 0x808]
0b3848: ldxdw r2, [r10 - 0x800]
0b3850: ja +0xfc ; branch 0xb4038
0b3858: lddw r9, 0x300000000
0b3868: stxdw [r9 + 0x0], r8
0b3870: mov64 r2, r10
0b3878: add64 r2, -0x3b8
0b3880: mov64 r1, r8
0b3888: mov64 r3, 0xd8
0b3890: call 0xcc00 ; call 0x119898
0b3898: mov64 r1, r10
0b38a0: add64 r1, -0x3b8
0b38a8: mov64 r2, r7
0b38b0: call -0x166dd ; call 0x1d0
0b38b8: ldxw r1, [r10 - 0x308]
0b38c0: jeq r1, 0x2, +0x12 ; branch 0xb3958
0b38c8: ldxdw r5, [r9 + 0x0]
0b38d0: mov64 r3, r5
0b38d8: add64 r3, -0xd8
0b38e0: mov64 r2, 0x0
0b38e8: mov64 r4, 0x1
0b38f0: jgt r3, r5, +0x1 ; branch 0xb3900
0b38f8: mov64 r4, 0x0
0b3900: jne r4, 0x0, +0x1 ; branch 0xb3910
0b3908: mov64 r2, r3
0b3910: lddw r1, 0x300007f28
0b3920: jeq r5, 0x0, +0x2 ; branch 0xb3938
0b3928: and64 r2, -0x8
0b3930: mov64 r1, r2
0b3938: lddw r2, 0x300000007
0b3948: jgt r1, r2, +0xc ; branch 0xb39b0
0b3950: ja -0x37 ; branch 0xb37a0
0b3958: ldxdw r3, [r10 - 0x3b0]
0b3960: ldxdw r2, [r10 - 0x3b8]
0b3968: mov64 r1, r10
0b3970: add64 r1, -0x7f8
0b3978: lddw r4, 0x11e392 ; rodata b'user_out_token_accountbuyback_fee_recipientpump_event_authoritypump_fee_con'
0b3988: mov64 r5, 0x16
0b3990: call -0x16384 ; call 0x1d78
0b3998: ldxdw r1, [r10 - 0x7f8]
0b39a0: ldxdw r2, [r10 - 0x7f0]
0b39a8: ja +0xd1 ; branch 0xb4038
0b39b0: stxdw [r9 + 0x0], r1
0b39b8: mov64 r2, r10
0b39c0: add64 r2, -0x3b8
0b39c8: stxdw [r10 - 0x818], r1
0b39d0: mov64 r3, 0xd8
0b39d8: call 0xcbd7 ; call 0x119898
0b39e0: mov64 r1, r10
0b39e8: add64 r1, -0x3b8
0b39f0: mov64 r2, r7
0b39f8: call -0x146dd ; call 0x10318
0b3a00: ldxb r1, [r10 - 0x4]
0b3a08: jeq r1, 0x2, +0x14 ; branch 0xb3ab0
0b3a10: ldxdw r5, [r9 + 0x0]
0b3a18: mov64 r3, r5
0b3a20: add64 r3, -0x3b8
0b3a28: mov64 r2, 0x0
0b3a30: mov64 r4, 0x1
0b3a38: jgt r3, r5, +0x1 ; branch 0xb3a48
0b3a40: mov64 r4, 0x0
0b3a48: jne r4, 0x0, +0x1 ; branch 0xb3a58
0b3a50: mov64 r2, r3
0b3a58: lddw r1, 0x300007c48
0b3a68: jeq r5, 0x0, +0x2 ; branch 0xb3a80
0b3a70: and64 r2, -0x8
0b3a78: mov64 r1, r2
0b3a80: lddw r2, 0x300000007
0b3a90: jgt r1, r2, +0xe ; branch 0xb3b08
0b3a98: mov64 r1, 0x8
0b3aa0: mov64 r2, 0x3b8
0b3aa8: call 0xbb16 ; call 0x111360
0b3ab0: ldxdw r3, [r10 - 0x3b0]
0b3ab8: ldxdw r2, [r10 - 0x3b8]
0b3ac0: mov64 r1, r10
0b3ac8: add64 r1, -0x7e8
0b3ad0: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0b3ae0: mov64 r5, 0xd
0b3ae8: call -0x163af ; call 0x1d78
0b3af0: ldxdw r1, [r10 - 0x7e8]
0b3af8: ldxdw r2, [r10 - 0x7e0]
0b3b00: ja +0xa6 ; branch 0xb4038
0b3b08: stxdw [r9 + 0x0], r1
0b3b10: mov64 r2, r10
0b3b18: add64 r2, -0x3b8
0b3b20: stxdw [r10 - 0x820], r1
0b3b28: mov64 r3, 0x3b8
0b3b30: call 0xcbac ; call 0x119898
0b3b38: mov64 r1, r10
0b3b40: add64 r1, -0x3b8
0b3b48: mov64 r2, r7
0b3b50: call -0x146f1 ; call 0x103d0
0b3b58: lddw r1, -0x8000000000000000
0b3b68: ldxdw r2, [r10 - 0x3b8]
0b3b70: jeq r2, r1, +0x14 ; branch 0xb3c18
0b3b78: ldxdw r1, [r9 + 0x0]
0b3b80: mov64 r3, r1
0b3b88: add64 r3, -0x90
0b3b90: mov64 r2, 0x0
0b3b98: mov64 r4, 0x1
0b3ba0: jgt r3, r1, +0x1 ; branch 0xb3bb0
0b3ba8: mov64 r4, 0x0
0b3bb0: jne r4, 0x0, +0x1 ; branch 0xb3bc0
0b3bb8: mov64 r2, r3
0b3bc0: lddw r9, 0x300007f70
0b3bd0: jeq r1, 0x0, +0x2 ; branch 0xb3be8
0b3bd8: and64 r2, -0x8
0b3be0: mov64 r9, r2
0b3be8: lddw r1, 0x300000007
0b3bf8: jgt r9, r1, +0xe ; branch 0xb3c70
0b3c00: mov64 r1, 0x8
0b3c08: mov64 r2, 0x90
0b3c10: call 0xbae9 ; call 0x111360
0b3c18: ldxdw r3, [r10 - 0x3a8]
0b3c20: ldxdw r2, [r10 - 0x3b0]
0b3c28: mov64 r1, r10
0b3c30: add64 r1, -0x7d8
0b3c38: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0b3c48: mov64 r5, 0xa
0b3c50: call -0x163dc ; call 0x1d78
0b3c58: ldxdw r1, [r10 - 0x7d8]
0b3c60: ldxdw r2, [r10 - 0x7d0]
0b3c68: ja +0x79 ; branch 0xb4038
0b3c70: lddw r1, 0x300000000
0b3c80: stxdw [r1 + 0x0], r9
0b3c88: mov64 r2, r10
0b3c90: add64 r2, -0x3b8
0b3c98: mov64 r1, r9
0b3ca0: mov64 r3, 0x90
0b3ca8: call 0xcb7d ; call 0x119898
0b3cb0: ldxdw r1, [r7 + 0x8]
0b3cb8: jeq r1, 0x0, +0xe ; branch 0xb3d30
0b3cc0: ldxdw r2, [r7 + 0x0]
0b3cc8: stxdw [r10 - 0x4f8], r2
0b3cd0: mov64 r4, r1
0b3cd8: add64 r4, -0x1
0b3ce0: stxdw [r7 + 0x8], r4
0b3ce8: mov64 r3, r2
0b3cf0: add64 r3, 0x30
0b3cf8: stxdw [r7 + 0x0], r3
0b3d00: jeq r4, 0x0, +0xc ; branch 0xb3d68
0b3d08: add64 r1, -0x2
0b3d10: stxdw [r7 + 0x8], r1
0b3d18: add64 r2, 0x60
0b3d20: stxdw [r7 + 0x0], r2
0b3d28: ja +0xe ; branch 0xb3da0
0b3d30: mov64 r1, r10
0b3d38: add64 r1, -0x7c8
0b3d40: mov64 r2, 0xbbd
0b3d48: call 0xa41d ; call 0x105e38
0b3d50: ldxdw r1, [r10 - 0x7c8]
0b3d58: ldxdw r2, [r10 - 0x7c0]
0b3d60: ja +0x5a ; branch 0xb4038
0b3d68: mov64 r1, r10
0b3d70: add64 r1, -0x528
0b3d78: mov64 r2, 0xbbd
0b3d80: call 0xa416 ; call 0x105e38
0b3d88: ldxdw r3, [r10 - 0x520]
0b3d90: ldxdw r2, [r10 - 0x528]
0b3d98: jne r2, 0x2, +0x42 ; branch 0xb3fb0
0b3da0: stxdw [r10 - 0x828], r3
0b3da8: mov64 r1, r10
0b3db0: add64 r1, -0x3b8
0b3db8: mov64 r2, r7
0b3dc0: call -0x144e6 ; call 0x11698
0b3dc8: ldxdw r3, [r10 - 0x3b0]
0b3dd0: ldxdw r2, [r10 - 0x3b8]
0b3dd8: jeq r2, 0x2, +0x1 ; branch 0xb3de8
0b3de0: ja +0x27 ; branch 0xb3f20
0b3de8: stxdw [r10 - 0x830], r3
0b3df0: mov64 r1, r10
0b3df8: add64 r1, -0x3b8
0b3e00: mov64 r2, r7
0b3e08: call -0x14581 ; call 0x11208
0b3e10: ldxdw r3, [r10 - 0x3b0]
0b3e18: ldxdw r2, [r10 - 0x3b8]
0b3e20: jeq r2, 0x2, +0x1 ; branch 0xb3e30
0b3e28: ja +0x27 ; branch 0xb3f68
0b3e30: stxdw [r10 - 0x838], r3
0b3e38: mov64 r1, r10
0b3e40: add64 r1, -0x3b8
0b3e48: mov64 r2, r7
0b3e50: call -0x14661 ; call 0x10b50
0b3e58: ldxdw r3, [r10 - 0x3b0]
0b3e60: ldxdw r2, [r10 - 0x3b8]
0b3e68: jeq r2, 0x2, +0x1 ; branch 0xb3e78
0b3e70: ja +0x30 ; branch 0xb3ff8
0b3e78: stxdw [r10 - 0x840], r9
0b3e80: stxdw [r10 - 0x4f0], r3
0b3e88: mov64 r1, r10
0b3e90: add64 r1, -0x3b8
0b3e98: mov64 r2, r7
0b3ea0: call -0x16367 ; call 0x2370
0b3ea8: ldxdw r9, [r10 - 0x3b0]
0b3eb0: ldxdw r2, [r10 - 0x3b8]
0b3eb8: ldxb r1, [r10 - 0x38e]
0b3ec0: jeq r1, 0x2, +0x1 ; branch 0xb3ed0
0b3ec8: ja +0x31 ; branch 0xb4058
0b3ed0: mov64 r1, r10
0b3ed8: add64 r1, -0x7b8
0b3ee0: mov64 r3, r9
0b3ee8: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0b3ef8: mov64 r5, 0xf
0b3f00: call -0x16432 ; call 0x1d78
0b3f08: ldxdw r1, [r10 - 0x7b8]
0b3f10: ldxdw r2, [r10 - 0x7b0]
0b3f18: ja +0x23 ; branch 0xb4038
0b3f20: mov64 r1, r10
0b3f28: add64 r1, -0x548
0b3f30: lddw r4, 0x11e102 ; rodata b'token_programassociated_token_programprograms/pump-amm/src/instructions/adm'
0b3f40: mov64 r5, 0xd
0b3f48: call -0x1643b ; call 0x1d78
0b3f50: ldxdw r1, [r10 - 0x548]
0b3f58: ldxdw r2, [r10 - 0x540]
0b3f60: ja +0x1a ; branch 0xb4038
0b3f68: mov64 r1, r10
0b3f70: add64 r1, -0x558
0b3f78: lddw r4, 0x11e31c ; rodata b'token_2022_programprotocol_fee_recipient_token_accountfee_configfee_program'
0b3f88: mov64 r5, 0x12
0b3f90: call -0x16444 ; call 0x1d78
0b3f98: ldxdw r1, [r10 - 0x558]
0b3fa0: ldxdw r2, [r10 - 0x550]
0b3fa8: ja +0x11 ; branch 0xb4038
0b3fb0: mov64 r1, r10
0b3fb8: add64 r1, -0x538
0b3fc0: lddw r4, 0x11e3a8 ; rodata b'buyback_fee_recipientpump_event_authoritypump_fee_configpump_globalpump_pro'
0b3fd0: mov64 r5, 0x15
0b3fd8: call -0x1644d ; call 0x1d78
0b3fe0: ldxdw r1, [r10 - 0x538]
0b3fe8: ldxdw r2, [r10 - 0x530]
0b3ff0: ja +0x8 ; branch 0xb4038
0b3ff8: mov64 r1, r10
0b4000: add64 r1, -0x568
0b4008: lddw r4, 0x11e0d1 ; rodata b'system_programglobal_incentive_token_accountadmintoken_programassociated_to'
0b4018: mov64 r5, 0xe
0b4020: call -0x16456 ; call 0x1d78
0b4028: ldxdw r1, [r10 - 0x568]
0b4030: ldxdw r2, [r10 - 0x560]
0b4038: stxdw [r6 + 0x8], r2
0b4040: stxdw [r6 + 0x0], r1
0b4048: stb [r6 + 0xa2], 0x2
0b4050: exit
0b4058: stxdw [r10 - 0x858], r1
0b4060: stxdw [r10 - 0x850], r2
0b4068: ldxdw r1, [r10 - 0x3a0]
0b4070: stxdw [r10 - 0x4e0], r1
0b4078: ldxdw r1, [r10 - 0x398]
0b4080: stxdw [r10 - 0x4d8], r1
0b4088: ldxh r1, [r10 - 0x390]
0b4090: stxh [r10 - 0x4d0], r1
0b4098: ldxw r1, [r10 - 0x38d]
0b40a0: stxw [r10 - 0x4e8], r1
0b40a8: ldxb r1, [r10 - 0x389]
0b40b0: stxb [r10 - 0x4e4], r1
0b40b8: ldxdw r1, [r10 - 0x3a8]
0b40c0: stxdw [r10 - 0x848], r1
0b40c8: mov64 r1, r10
0b40d0: add64 r1, -0x3b8
0b40d8: mov64 r2, r7
0b40e0: call -0x1466e ; call 0x10d78
0b40e8: ldxdw r3, [r10 - 0x3b0]
0b40f0: ldxdw r2, [r10 - 0x3b8]
0b40f8: jeq r2, 0x2, +0x1 ; branch 0xb4108
0b4100: ja +0x1c ; branch 0xb41e8
0b4108: stxdw [r10 - 0x860], r3
0b4110: mov64 r1, r10
0b4118: add64 r1, -0x3b8
0b4120: mov64 r2, r7
0b4128: call -0x1459c ; call 0x11450
0b4130: ldxdw r3, [r10 - 0x3b0]
0b4138: ldxdw r2, [r10 - 0x3b8]
0b4140: jeq r2, 0x2, +0x1 ; branch 0xb4150
0b4148: ja +0x1c ; branch 0xb4230
0b4150: ldxdw r1, [r7 + 0x8]
0b4158: stxdw [r10 - 0x868], r3
0b4160: jne r1, 0x0, +0x22 ; branch 0xb4278
0b4168: mov64 r1, r10
0b4170: add64 r1, -0x598
0b4178: mov64 r2, 0xbbd
0b4180: call 0xa396 ; call 0x105e38
0b4188: ldxdw r3, [r10 - 0x590]
0b4190: ldxdw r2, [r10 - 0x598]
0b4198: jeq r2, 0x2, +0x23 ; branch 0xb42b8
0b41a0: mov64 r1, r10
0b41a8: add64 r1, -0x5a8
0b41b0: lddw r4, 0x11e3e0 ; rodata b'pump_globalpump_programrecipient_token_accountrecipientuser_volume_accumula'
0b41c0: mov64 r5, 0xb
0b41c8: call -0x1648b ; call 0x1d78
0b41d0: ldxdw r1, [r10 - 0x5a8]
0b41d8: ldxdw r2, [r10 - 0x5a0]
0b41e0: ja +0x184 ; branch 0xb4e08
0b41e8: mov64 r1, r10
0b41f0: add64 r1, -0x578
0b41f8: lddw r4, 0x11e0ca ; rodata b'programsystem_programglobal_incentive_token_accountadmintoken_programassoci'
0b4208: mov64 r5, 0x7
0b4210: call -0x16494 ; call 0x1d78
0b4218: ldxdw r1, [r10 - 0x578]
0b4220: ldxdw r2, [r10 - 0x570]
0b4228: ja +0x17b ; branch 0xb4e08
0b4230: mov64 r1, r10
0b4238: add64 r1, -0x588
0b4240: lddw r4, 0x11e3eb ; rodata b'pump_programrecipient_token_accountrecipientuser_volume_accumulator_wsol_to'
0b4250: mov64 r5, 0xc
0b4258: call -0x1649d ; call 0x1d78
0b4260: ldxdw r1, [r10 - 0x588]
0b4268: ldxdw r2, [r10 - 0x580]
0b4270: ja +0x172 ; branch 0xb4e08
0b4278: ldxdw r3, [r7 + 0x0]
0b4280: mov64 r2, r3
0b4288: add64 r2, 0x30
0b4290: stxdw [r7 + 0x0], r2
0b4298: mov64 r2, r1
0b42a0: add64 r2, -0x1
0b42a8: stxdw [r7 + 0x8], r2
0b42b0: jne r2, 0x0, +0x1c ; branch 0xb4398
0b42b8: stxdw [r10 - 0x870], r3
0b42c0: mov64 r1, r10
0b42c8: add64 r1, -0x5b8
0b42d0: mov64 r2, 0xbbd
0b42d8: call 0xa36b ; call 0x105e38
0b42e0: ldxdw r3, [r10 - 0x5b0]
0b42e8: ldxdw r2, [r10 - 0x5b8]
0b42f0: jeq r2, 0x2, +0x1 ; branch 0xb4300
0b42f8: ja +0x36 ; branch 0xb44b0
0b4300: stxdw [r10 - 0x880], r3
0b4308: mov64 r1, r10
0b4310: add64 r1, -0x5d8
0b4318: mov64 r2, 0xbbd
0b4320: call 0xa362 ; call 0x105e38
0b4328: ldxdw r1, [r10 - 0x5d0]
0b4330: stxdw [r10 - 0x878], r1
0b4338: ldxdw r2, [r10 - 0x5d8]
0b4340: jeq r2, 0x2, +0x1a ; branch 0xb4418
0b4348: mov64 r1, r10
0b4350: add64 r1, -0x5e8
0b4358: ldxdw r3, [r10 - 0x878]
0b4360: lddw r4, 0x11e3bd ; rodata b'pump_event_authoritypump_fee_configpump_globalpump_programrecipient_token_a'
0b4370: mov64 r5, 0x14
0b4378: call -0x164c1 ; call 0x1d78
0b4380: ldxdw r1, [r10 - 0x5e8]
0b4388: ldxdw r2, [r10 - 0x5e0]
0b4390: ja +0x14e ; branch 0xb4e08
0b4398: stxdw [r10 - 0x870], r3
0b43a0: ldxdw r3, [r7 + 0x0]
0b43a8: mov64 r2, r3
0b43b0: add64 r2, 0x30
0b43b8: stxdw [r7 + 0x0], r2
0b43c0: mov64 r2, r1
0b43c8: add64 r2, -0x2
0b43d0: stxdw [r7 + 0x8], r2
0b43d8: jeq r2, 0x0, -0x1c ; branch 0xb4300
0b43e0: stxdw [r10 - 0x880], r3
0b43e8: add64 r1, -0x3
0b43f0: stxdw [r7 + 0x8], r1
0b43f8: ldxdw r1, [r7 + 0x0]
0b4400: stxdw [r10 - 0x878], r1
0b4408: add64 r1, 0x30
0b4410: stxdw [r7 + 0x0], r1
0b4418: mov64 r1, r10
0b4420: add64 r1, -0x3b8
0b4428: call 0xa55e ; call 0x106f20
0b4430: ldxdw r1, [r10 - 0x3b0]
0b4438: stxdw [r10 - 0x4b0], r1
0b4440: ldxdw r1, [r10 - 0x3a8]
0b4448: stxdw [r10 - 0x4a8], r1
0b4450: ldxdw r1, [r10 - 0x3a0]
0b4458: stxdw [r10 - 0x4a0], r1
0b4460: ldxdw r1, [r10 - 0x3b8]
0b4468: jeq r1, 0x0, +0x11 ; branch 0xb44f8
0b4470: mov64 r1, r10
0b4478: add64 r1, -0x5f8
0b4480: mov64 r2, r10
0b4488: add64 r2, -0x4b0
0b4490: call 0x9d75 ; call 0x103040
0b4498: ldxdw r1, [r10 - 0x5f8]
0b44a0: ldxdw r2, [r10 - 0x5f0]
0b44a8: ja +0x12b ; branch 0xb4e08
0b44b0: mov64 r1, r10
0b44b8: add64 r1, -0x5c8
0b44c0: lddw r4, 0x11e3d1 ; rodata b'pump_fee_configpump_globalpump_programrecipient_token_accountrecipientuser_'
0b44d0: mov64 r5, 0xf
0b44d8: call -0x164ed ; call 0x1d78
0b44e0: ldxdw r1, [r10 - 0x5c8]
0b44e8: ldxdw r2, [r10 - 0x5c0]
0b44f0: ja +0x122 ; branch 0xb4e08
0b44f8: ldxdw r1, [r10 - 0x4a0]
0b4500: stxdw [r10 - 0x4b8], r1
0b4508: ldxdw r1, [r10 - 0x4a8]
0b4510: stxdw [r10 - 0x4c0], r1
0b4518: ldxdw r1, [r10 - 0x4b0]
0b4520: stxdw [r10 - 0x4c8], r1
0b4528: ldxdw r1, [r10 - 0x500]
0b4530: ldxdw r1, [r1 + 0x0]
0b4538: ldxdw r2, [r1 + 0x18]
0b4540: ldxdw r3, [r1 + 0x10]
0b4548: ldxdw r4, [r1 + 0x8]
0b4550: ldxdw r1, [r1 + 0x0]
0b4558: lddw r5, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b4568: stxdw [r10 - 0x3d8], r5
0b4570: mov64 r5, r10
0b4578: add64 r5, -0x470
0b4580: stxdw [r10 - 0x3c8], r5
0b4588: stxdw [r10 - 0x470], r1
0b4590: stxdw [r10 - 0x468], r4
0b4598: stxdw [r10 - 0x460], r3
0b45a0: stxdw [r10 - 0x458], r2
0b45a8: stdw [r10 - 0x3d0], 0x17
0b45b0: stdw [r10 - 0x3c0], 0x20
0b45b8: ldxdw r4, [r10 - 0x508]
0b45c0: mov64 r1, r10
0b45c8: add64 r1, -0x3b8
0b45d0: mov64 r2, r10
0b45d8: add64 r2, -0x3d8
0b45e0: mov64 r3, 0x2
0b45e8: call 0xb34f ; call 0x10e068
0b45f0: ldxdw r1, [r10 - 0x3a0]
0b45f8: stxdw [r10 - 0x480], r1
0b4600: ldxdw r1, [r10 - 0x3a8]
0b4608: stxdw [r10 - 0x488], r1
0b4610: ldxdw r1, [r10 - 0x3b0]
0b4618: stxdw [r10 - 0x490], r1
0b4620: ldxdw r1, [r10 - 0x3b8]
0b4628: stxdw [r10 - 0x498], r1
0b4630: ldxb r1, [r10 - 0x398]
0b4638: stxb [r10 - 0x471], r1
0b4640: ldxdw r2, [r10 - 0x810]
0b4648: stxb [r2 + 0x1], r1
0b4650: ldxdw r1, [r10 - 0x4f8]
0b4658: ldxdw r1, [r1 + 0x0]
0b4660: ldxdw r2, [r1 + 0x0]
0b4668: stxdw [r10 - 0x3b8], r2
0b4670: ldxdw r2, [r1 + 0x8]
0b4678: stxdw [r10 - 0x3b0], r2
0b4680: ldxdw r2, [r1 + 0x10]
0b4688: stxdw [r10 - 0x3a8], r2
0b4690: ldxdw r1, [r1 + 0x18]
0b4698: stxdw [r10 - 0x3a0], r1
0b46a0: mov64 r1, r10
0b46a8: add64 r1, -0x3b8
0b46b0: mov64 r2, r10
0b46b8: add64 r2, -0x498
0b46c0: mov64 r3, 0x20
0b46c8: call 0xca42 ; call 0x1198e0
0b46d0: lsh64 r0, 0x20
0b46d8: rsh64 r0, 0x20
0b46e0: jeq r0, 0x0, +0x28 ; branch 0xb4828
0b46e8: mov64 r1, r10
0b46f0: add64 r1, -0x608
0b46f8: mov64 r2, 0x7d6
0b4700: call 0xa2e6 ; call 0x105e38
0b4708: ldxdw r3, [r10 - 0x600]
0b4710: ldxdw r2, [r10 - 0x608]
0b4718: mov64 r1, r10
0b4720: add64 r1, -0x618
0b4728: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b4738: mov64 r5, 0x17
0b4740: call -0x1653a ; call 0x1d78
0b4748: ldxdw r3, [r10 - 0x610]
0b4750: ldxdw r2, [r10 - 0x618]
0b4758: ldxdw r1, [r10 - 0x4f8]
0b4760: ldxdw r1, [r1 + 0x0]
0b4768: ldxdw r4, [r1 + 0x18]
0b4770: ldxdw r5, [r1 + 0x10]
0b4778: ldxdw r0, [r1 + 0x8]
0b4780: ldxdw r1, [r1 + 0x0]
0b4788: ldxdw r7, [r10 - 0x498]
0b4790: stxdw [r10 - 0x398], r7
0b4798: ldxdw r7, [r10 - 0x490]
0b47a0: stxdw [r10 - 0x390], r7
0b47a8: ldxdw r7, [r10 - 0x488]
0b47b0: stxdw [r10 - 0x388], r7
0b47b8: ldxdw r7, [r10 - 0x480]
0b47c0: stxdw [r10 - 0x380], r7
0b47c8: stxdw [r10 - 0x3b8], r1
0b47d0: stxdw [r10 - 0x3b0], r0
0b47d8: stxdw [r10 - 0x3a8], r5
0b47e0: stxdw [r10 - 0x3a0], r4
0b47e8: mov64 r1, r10
0b47f0: add64 r1, -0x628
0b47f8: mov64 r4, r10
0b4800: add64 r4, -0x3b8
0b4808: call 0x9d38 ; call 0x1031d0
0b4810: ldxdw r1, [r10 - 0x628]
0b4818: ldxdw r2, [r10 - 0x620]
0b4820: ja +0xbc ; branch 0xb4e08
0b4828: mov64 r1, r10
0b4830: add64 r1, -0x508
0b4838: stxdw [r10 - 0x390], r1
0b4840: mov64 r1, r10
0b4848: add64 r1, -0x471
0b4850: stxdw [r10 - 0x398], r1
0b4858: mov64 r1, r10
0b4860: add64 r1, -0x4f0
0b4868: stxdw [r10 - 0x3a0], r1
0b4870: mov64 r1, r10
0b4878: add64 r1, -0x500
0b4880: stxdw [r10 - 0x3a8], r1
0b4888: mov64 r1, r10
0b4890: add64 r1, -0x4c8
0b4898: stxdw [r10 - 0x3b0], r1
0b48a0: mov64 r1, r10
0b48a8: add64 r1, -0x4f8
0b48b0: stxdw [r10 - 0x3b8], r1
0b48b8: mov64 r1, r10
0b48c0: add64 r1, -0x470
0b48c8: mov64 r2, r10
0b48d0: add64 r2, -0x3b8
0b48d8: call 0x236 ; call 0xb5a90
0b48e0: ldxdw r1, [r10 - 0x468]
0b48e8: stxdw [r10 - 0x888], r1
0b48f0: ldxdw r1, [r10 - 0x470]
0b48f8: jeq r1, 0x2, +0x1 ; branch 0xb4908
0b4900: ja +0x52 ; branch 0xb4b98
0b4908: ldxdw r1, [r10 - 0x888]
0b4910: ldxdw r2, [r1 + 0x0]
0b4918: ldxb r1, [r2 + 0x29]
0b4920: jeq r1, 0x0, +0x50 ; branch 0xb4ba8
0b4928: mov64 r7, r10
0b4930: add64 r7, -0x470
0b4938: mov64 r1, r7
0b4940: call -0x14cfa ; call 0xe178
0b4948: mov64 r1, r7
0b4950: call 0xa8af ; call 0x108ed0
0b4958: stxdw [r10 - 0x890], r0
0b4960: ldxdw r1, [r10 - 0x888]
0b4968: ldxdw r2, [r1 + 0x0]
0b4970: mov64 r7, r10
0b4978: add64 r7, -0x3b8
0b4980: mov64 r1, r7
0b4988: call -0x14d03 ; call 0xe178
0b4990: mov64 r1, r10
0b4998: add64 r1, -0x3d8
0b49a0: mov64 r2, r7
0b49a8: call 0xa8bd ; call 0x108f98
0b49b0: ldxdw r3, [r10 - 0x3d0]
0b49b8: ldxdw r1, [r10 - 0x3d8]
0b49c0: lddw r2, -0x7fffffffffffffe6
0b49d0: jne r1, r2, +0x49 ; branch 0xb4c20
0b49d8: mov64 r1, r10
0b49e0: add64 r1, -0x4c8
0b49e8: ldxdw r2, [r10 - 0x890]
0b49f0: call 0xa4f0 ; call 0x107178
0b49f8: ldxdw r1, [r10 - 0x3a8]
0b4a00: ldxdw r2, [r10 - 0x3b0]
0b4a08: ldxdw r3, [r2 + 0x0]
0b4a10: add64 r3, -0x1
0b4a18: stxdw [r2 + 0x0], r3
0b4a20: jne r3, 0x0, +0x3 ; branch 0xb4a40
0b4a28: ldxdw r3, [r2 + 0x8]
0b4a30: add64 r3, -0x1
0b4a38: stxdw [r2 + 0x8], r3
0b4a40: ldxdw r2, [r1 + 0x0]
0b4a48: add64 r2, -0x1
0b4a50: stxdw [r1 + 0x0], r2
0b4a58: jne r2, 0x0, +0x3 ; branch 0xb4a78
0b4a60: ldxdw r2, [r1 + 0x8]
0b4a68: add64 r2, -0x1
0b4a70: stxdw [r1 + 0x8], r2
0b4a78: ldxdw r1, [r10 - 0x460]
0b4a80: ldxdw r2, [r10 - 0x468]
0b4a88: ldxdw r3, [r2 + 0x0]
0b4a90: add64 r3, -0x1
0b4a98: stxdw [r2 + 0x0], r3
0b4aa0: jne r3, 0x0, +0x3 ; branch 0xb4ac0
0b4aa8: ldxdw r3, [r2 + 0x8]
0b4ab0: add64 r3, -0x1
0b4ab8: stxdw [r2 + 0x8], r3
0b4ac0: ldxdw r2, [r1 + 0x0]
0b4ac8: add64 r2, -0x1
0b4ad0: stxdw [r1 + 0x0], r2
0b4ad8: jne r2, 0x0, +0x3 ; branch 0xb4af8
0b4ae0: ldxdw r2, [r1 + 0x8]
0b4ae8: add64 r2, -0x1
0b4af0: stxdw [r1 + 0x8], r2
0b4af8: jne r0, 0x0, +0x1 ; branch 0xb4b08
0b4b00: ja +0x52 ; branch 0xb4d98
0b4b08: ldxdw r1, [r10 - 0x500]
0b4b10: ldxb r1, [r1 + 0x29]
0b4b18: jne r1, 0x0, +0x70 ; branch 0xb4ea0
0b4b20: mov64 r1, r10
0b4b28: add64 r1, -0x778
0b4b30: mov64 r2, 0x7d0
0b4b38: call 0xa25f ; call 0x105e38
0b4b40: ldxdw r3, [r10 - 0x770]
0b4b48: ldxdw r2, [r10 - 0x778]
0b4b50: mov64 r1, r10
0b4b58: add64 r1, -0x788
0b4b60: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0b4b70: mov64 r5, 0x4
0b4b78: call -0x165c1 ; call 0x1d78
0b4b80: ldxdw r1, [r10 - 0x788]
0b4b88: ldxdw r2, [r10 - 0x780]
0b4b90: ja +0x4e ; branch 0xb4e08
0b4b98: ldxdw r2, [r10 - 0x888]
0b4ba0: ja +0x4c ; branch 0xb4e08
0b4ba8: mov64 r1, r10
0b4bb0: add64 r1, -0x798
0b4bb8: mov64 r2, 0x7d0
0b4bc0: call 0xa24e ; call 0x105e38
0b4bc8: ldxdw r3, [r10 - 0x790]
0b4bd0: ldxdw r2, [r10 - 0x798]
0b4bd8: mov64 r1, r10
0b4be0: add64 r1, -0x7a8
0b4be8: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b4bf8: mov64 r5, 0x17
0b4c00: call -0x165d2 ; call 0x1d78
0b4c08: ldxdw r1, [r10 - 0x7a8]
0b4c10: ldxdw r2, [r10 - 0x7a0]
0b4c18: ja +0x3d ; branch 0xb4e08
0b4c20: ldxdw r2, [r10 - 0x3c8]
0b4c28: stxdw [r10 - 0x3c8], r2
0b4c30: stxdw [r10 - 0x3d0], r3
0b4c38: stxdw [r10 - 0x3d8], r1
0b4c40: mov64 r1, r10
0b4c48: add64 r1, -0x638
0b4c50: mov64 r2, r10
0b4c58: add64 r2, -0x3d8
0b4c60: call 0x9c7b ; call 0x103040
0b4c68: ldxdw r1, [r10 - 0x638]
0b4c70: ldxdw r2, [r10 - 0x630]
0b4c78: stxdw [r6 + 0x8], r2
0b4c80: stxdw [r6 + 0x0], r1
0b4c88: stb [r6 + 0xa2], 0x2
0b4c90: ldxdw r1, [r10 - 0x3a8]
0b4c98: ldxdw r2, [r10 - 0x3b0]
0b4ca0: ldxdw r3, [r2 + 0x0]
0b4ca8: add64 r3, -0x1
0b4cb0: stxdw [r2 + 0x0], r3
0b4cb8: jne r3, 0x0, +0x3 ; branch 0xb4cd8
0b4cc0: ldxdw r3, [r2 + 0x8]
0b4cc8: add64 r3, -0x1
0b4cd0: stxdw [r2 + 0x8], r3
0b4cd8: ldxdw r2, [r1 + 0x0]
0b4ce0: add64 r2, -0x1
0b4ce8: stxdw [r1 + 0x0], r2
0b4cf0: jne r2, 0x0, +0x3 ; branch 0xb4d10
0b4cf8: ldxdw r2, [r1 + 0x8]
0b4d00: add64 r2, -0x1
0b4d08: stxdw [r1 + 0x8], r2
0b4d10: ldxdw r1, [r10 - 0x460]
0b4d18: ldxdw r2, [r10 - 0x468]
0b4d20: ldxdw r3, [r2 + 0x0]
0b4d28: add64 r3, -0x1
0b4d30: stxdw [r2 + 0x0], r3
0b4d38: jne r3, 0x0, +0x3 ; branch 0xb4d58
0b4d40: ldxdw r3, [r2 + 0x8]
0b4d48: add64 r3, -0x1
0b4d50: stxdw [r2 + 0x8], r3
0b4d58: ldxdw r2, [r1 + 0x0]
0b4d60: add64 r2, -0x1
0b4d68: stxdw [r1 + 0x0], r2
0b4d70: jne r2, 0x0, +0x15 ; branch 0xb4e20
0b4d78: ldxdw r2, [r1 + 0x8]
0b4d80: add64 r2, -0x1
0b4d88: stxdw [r1 + 0x8], r2
0b4d90: ja +0x11 ; branch 0xb4e20
0b4d98: mov64 r1, r10
0b4da0: add64 r1, -0x648
0b4da8: mov64 r2, 0x7d5
0b4db0: call 0xa210 ; call 0x105e38
0b4db8: ldxdw r3, [r10 - 0x640]
0b4dc0: ldxdw r2, [r10 - 0x648]
0b4dc8: mov64 r1, r10
0b4dd0: add64 r1, -0x658
0b4dd8: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b4de8: mov64 r5, 0x17
0b4df0: call -0x16610 ; call 0x1d78
0b4df8: ldxdw r1, [r10 - 0x658]
0b4e00: ldxdw r2, [r10 - 0x650]
0b4e08: stxdw [r6 + 0x8], r2
0b4e10: stxdw [r6 + 0x0], r1
0b4e18: stb [r6 + 0xa2], 0x2
0b4e20: ldxdw r2, [r10 - 0x848]
0b4e28: ldxdw r1, [r9 + 0x0]
0b4e30: add64 r1, -0x1
0b4e38: stxdw [r9 + 0x0], r1
0b4e40: jne r1, 0x0, +0x3 ; branch 0xb4e60
0b4e48: ldxdw r1, [r9 + 0x8]
0b4e50: add64 r1, -0x1
0b4e58: stxdw [r9 + 0x8], r1
0b4e60: ldxdw r1, [r2 + 0x0]
0b4e68: add64 r1, -0x1
0b4e70: stxdw [r2 + 0x0], r1
0b4e78: jne r1, 0x0, -0x1c6 ; branch 0xb4050
0b4e80: ldxdw r1, [r2 + 0x8]
0b4e88: add64 r1, -0x1
0b4e90: stxdw [r2 + 0x8], r1
0b4e98: ja -0x1ca ; branch 0xb4050
0b4ea0: ldxdw r1, [r8 + 0x20]
0b4ea8: ldxb r1, [r1 + 0x29]
0b4eb0: jne r1, 0x0, +0xf ; branch 0xb4f30
0b4eb8: mov64 r1, r10
0b4ec0: add64 r1, -0x758
0b4ec8: mov64 r2, 0x7d0
0b4ed0: call 0xa1ec ; call 0x105e38
0b4ed8: ldxdw r3, [r10 - 0x750]
0b4ee0: ldxdw r2, [r10 - 0x758]
0b4ee8: mov64 r1, r10
0b4ef0: add64 r1, -0x768
0b4ef8: lddw r4, 0x11e37d ; rodata b'user_in_token_accountuser_out_token_accountbuyback_fee_recipientpump_event_'
0b4f08: mov64 r5, 0x15
0b4f10: call -0x16634 ; call 0x1d78
0b4f18: ldxdw r1, [r10 - 0x768]
0b4f20: ldxdw r2, [r10 - 0x760]
0b4f28: ja -0x25 ; branch 0xb4e08
0b4f30: ldxdw r1, [r10 - 0x818]
0b4f38: ldxdw r1, [r1 + 0x20]
0b4f40: ldxb r1, [r1 + 0x29]
0b4f48: jne r1, 0x0, +0xf ; branch 0xb4fc8
0b4f50: mov64 r1, r10
0b4f58: add64 r1, -0x738
0b4f60: mov64 r2, 0x7d0
0b4f68: call 0xa1d9 ; call 0x105e38
0b4f70: ldxdw r3, [r10 - 0x730]
0b4f78: ldxdw r2, [r10 - 0x738]
0b4f80: mov64 r1, r10
0b4f88: add64 r1, -0x748
0b4f90: lddw r4, 0x11e392 ; rodata b'user_out_token_accountbuyback_fee_recipientpump_event_authoritypump_fee_con'
0b4fa0: mov64 r5, 0x16
0b4fa8: call -0x16647 ; call 0x1d78
0b4fb0: ldxdw r1, [r10 - 0x748]
0b4fb8: ldxdw r2, [r10 - 0x740]
0b4fc0: ja -0x38 ; branch 0xb4e08
0b4fc8: ldxdw r4, [r10 - 0x508]
0b4fd0: mov64 r1, r10
0b4fd8: add64 r1, -0x3b8
0b4fe0: lddw r2, 0x122a00 ; rodata b"\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9a\xcc\x11\x00.\x00\x00\x00\x00\x00\x00\x00\xe9\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00"
0b4ff0: mov64 r3, 0x1
0b4ff8: call 0xb20d ; call 0x10e068
0b5000: ldxdw r1, [r10 - 0x3a0]
0b5008: stxdw [r10 - 0x428], r1
0b5010: ldxdw r1, [r10 - 0x3a8]
0b5018: stxdw [r10 - 0x430], r1
0b5020: ldxdw r1, [r10 - 0x3b0]
0b5028: stxdw [r10 - 0x438], r1
0b5030: ldxdw r1, [r10 - 0x3b8]
0b5038: stxdw [r10 - 0x440], r1
0b5040: ldxb r1, [r10 - 0x398]
0b5048: ldxdw r2, [r10 - 0x810]
0b5050: stxb [r2 + 0x0], r1
0b5058: ldxdw r1, [r10 - 0x820]
0b5060: ldxdw r1, [r1 + 0x0]
0b5068: ldxdw r1, [r1 + 0x0]
0b5070: ldxdw r2, [r1 + 0x18]
0b5078: stxdw [r10 - 0x3a0], r2
0b5080: ldxdw r2, [r1 + 0x10]
0b5088: stxdw [r10 - 0x3a8], r2
0b5090: ldxdw r2, [r1 + 0x8]
0b5098: stxdw [r10 - 0x3b0], r2
0b50a0: ldxdw r1, [r1 + 0x0]
0b50a8: stxdw [r10 - 0x3b8], r1
0b50b0: mov64 r1, r10
0b50b8: add64 r1, -0x3b8
0b50c0: mov64 r2, r10
0b50c8: add64 r2, -0x440
0b50d0: mov64 r3, 0x20
0b50d8: call 0xc900 ; call 0x1198e0
0b50e0: lsh64 r0, 0x20
0b50e8: rsh64 r0, 0x20
0b50f0: jne r0, 0x0, +0x34 ; branch 0xb5298
0b50f8: ldxdw r1, [r10 - 0x840]
0b5100: ldxb r1, [r1 + 0x80]
0b5108: mov64 r2, r10
0b5110: add64 r2, -0x3d9
0b5118: stxdw [r10 - 0x398], r2
0b5120: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0b5130: stxdw [r10 - 0x3a8], r2
0b5138: lddw r2, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0b5148: stxdw [r10 - 0x3b8], r2
0b5150: stxb [r10 - 0x3d9], r1
0b5158: stdw [r10 - 0x390], 0x1
0b5160: stdw [r10 - 0x3a0], 0x20
0b5168: stdw [r10 - 0x3b0], 0xa
0b5170: lddw r1, 0x707cc214a46a519c
0b5180: stxdw [r10 - 0x3c0], r1
0b5188: lddw r1, 0x401fa42cc9f14c
0b5198: stxdw [r10 - 0x3c8], r1
0b51a0: lddw r1, 0x27155607bcf7a88d
0b51b0: stxdw [r10 - 0x3d0], r1
0b51b8: lddw r1, 0x568e5a05a9ff350c
0b51c8: stxdw [r10 - 0x3d8], r1
0b51d0: mov64 r1, r10
0b51d8: add64 r1, -0x470
0b51e0: mov64 r2, r10
0b51e8: add64 r2, -0x3b8
0b51f0: mov64 r4, r10
0b51f8: add64 r4, -0x3d8
0b5200: mov64 r3, 0x3
0b5208: call 0xb1f2 ; call 0x10e1a0
0b5210: ldxb r1, [r10 - 0x470]
0b5218: jeq r1, 0x0, +0x38 ; branch 0xb53e0
0b5220: mov64 r1, r10
0b5228: add64 r1, -0x698
0b5230: mov64 r2, 0x7d6
0b5238: call 0xa17f ; call 0x105e38
0b5240: ldxdw r3, [r10 - 0x690]
0b5248: ldxdw r2, [r10 - 0x698]
0b5250: mov64 r1, r10
0b5258: add64 r1, -0x6a8
0b5260: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0b5270: mov64 r5, 0xa
0b5278: call -0x166a1 ; call 0x1d78
0b5280: ldxdw r1, [r10 - 0x6a8]
0b5288: ldxdw r2, [r10 - 0x6a0]
0b5290: ja -0x92 ; branch 0xb4e08
0b5298: mov64 r1, r10
0b52a0: add64 r1, -0x668
0b52a8: mov64 r2, 0x7d6
0b52b0: call 0xa170 ; call 0x105e38
0b52b8: ldxdw r3, [r10 - 0x660]
0b52c0: ldxdw r2, [r10 - 0x668]
0b52c8: mov64 r1, r10
0b52d0: add64 r1, -0x678
0b52d8: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0b52e8: mov64 r5, 0xd
0b52f0: call -0x166b0 ; call 0x1d78
0b52f8: ldxdw r3, [r10 - 0x670]
0b5300: ldxdw r2, [r10 - 0x678]
0b5308: ldxdw r1, [r10 - 0x820]
0b5310: ldxdw r1, [r1 + 0x0]
0b5318: ldxdw r1, [r1 + 0x0]
0b5320: ldxdw r4, [r1 + 0x0]
0b5328: ldxdw r5, [r1 + 0x8]
0b5330: ldxdw r0, [r1 + 0x10]
0b5338: ldxdw r1, [r1 + 0x18]
0b5340: ldxdw r7, [r10 - 0x440]
0b5348: stxdw [r10 - 0x398], r7
0b5350: ldxdw r7, [r10 - 0x438]
0b5358: stxdw [r10 - 0x390], r7
0b5360: ldxdw r7, [r10 - 0x430]
0b5368: stxdw [r10 - 0x388], r7
0b5370: ldxdw r7, [r10 - 0x428]
0b5378: stxdw [r10 - 0x380], r7
0b5380: stxdw [r10 - 0x3a0], r1
0b5388: stxdw [r10 - 0x3a8], r0
0b5390: stxdw [r10 - 0x3b0], r5
0b5398: stxdw [r10 - 0x3b8], r4
0b53a0: mov64 r1, r10
0b53a8: add64 r1, -0x688
0b53b0: mov64 r4, r10
0b53b8: add64 r4, -0x3b8
0b53c0: call 0x9bc1 ; call 0x1031d0
0b53c8: ldxdw r1, [r10 - 0x688]
0b53d0: ldxdw r2, [r10 - 0x680]
0b53d8: ja -0xbb ; branch 0xb4e08
0b53e0: ldxw r1, [r10 - 0x46c]
0b53e8: stxw [r10 - 0x41d], r1
0b53f0: ldxw r1, [r10 - 0x46f]
0b53f8: stxw [r10 - 0x420], r1
0b5400: ldxdw r1, [r10 - 0x458]
0b5408: stxdw [r10 - 0x400], r1
0b5410: stxdw [r10 - 0x409], r1
0b5418: ldxb r1, [r10 - 0x450]
0b5420: stxb [r10 - 0x401], r1
0b5428: ldxdw r1, [r10 - 0x468]
0b5430: stxdw [r10 - 0x419], r1
0b5438: ldxdw r1, [r10 - 0x460]
0b5440: stxdw [r10 - 0x411], r1
0b5448: ldxdw r1, [r10 - 0x840]
0b5450: ldxdw r1, [r1 + 0x88]
0b5458: ldxdw r1, [r1 + 0x0]
0b5460: ldxdw r2, [r1 + 0x18]
0b5468: stxdw [r10 - 0x3a0], r2
0b5470: ldxdw r2, [r1 + 0x10]
0b5478: stxdw [r10 - 0x3a8], r2
0b5480: ldxdw r2, [r1 + 0x8]
0b5488: stxdw [r10 - 0x3b0], r2
0b5490: ldxdw r1, [r1 + 0x0]
0b5498: stxdw [r10 - 0x3b8], r1
0b54a0: mov64 r1, r10
0b54a8: add64 r1, -0x3b8
0b54b0: mov64 r2, r10
0b54b8: add64 r2, -0x420
0b54c0: mov64 r3, 0x20
0b54c8: call 0xc882 ; call 0x1198e0
0b54d0: lsh64 r0, 0x20
0b54d8: rsh64 r0, 0x20
0b54e0: jeq r0, 0x0, +0x29 ; branch 0xb5630
0b54e8: mov64 r1, r10
0b54f0: add64 r1, -0x6b8
0b54f8: mov64 r2, 0x7d6
0b5500: call 0xa126 ; call 0x105e38
0b5508: ldxdw r3, [r10 - 0x6b0]
0b5510: ldxdw r2, [r10 - 0x6b8]
0b5518: mov64 r1, r10
0b5520: add64 r1, -0x6c8
0b5528: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0b5538: mov64 r5, 0xa
0b5540: call -0x166fa ; call 0x1d78
0b5548: ldxdw r3, [r10 - 0x6c0]
0b5550: ldxdw r2, [r10 - 0x6c8]
0b5558: ldxdw r1, [r10 - 0x840]
0b5560: ldxdw r1, [r1 + 0x88]
0b5568: ldxdw r1, [r1 + 0x0]
0b5570: ldxdw r4, [r1 + 0x0]
0b5578: ldxdw r5, [r1 + 0x8]
0b5580: ldxdw r0, [r1 + 0x10]
0b5588: ldxdw r1, [r1 + 0x18]
0b5590: ldxdw r7, [r10 - 0x420]
0b5598: stxdw [r10 - 0x398], r7
0b55a0: ldxdw r7, [r10 - 0x418]
0b55a8: stxdw [r10 - 0x390], r7
0b55b0: ldxdw r7, [r10 - 0x410]
0b55b8: stxdw [r10 - 0x388], r7
0b55c0: ldxdw r7, [r10 - 0x408]
0b55c8: stxdw [r10 - 0x380], r7
0b55d0: stxdw [r10 - 0x3a0], r1
0b55d8: stxdw [r10 - 0x3a8], r0
0b55e0: stxdw [r10 - 0x3b0], r5
0b55e8: stxdw [r10 - 0x3b8], r4
0b55f0: mov64 r1, r10
0b55f8: add64 r1, -0x6d8
0b5600: mov64 r4, r10
0b5608: add64 r4, -0x3b8
0b5610: call 0x9b77 ; call 0x1031d0
0b5618: ldxdw r1, [r10 - 0x6d8]
0b5620: ldxdw r2, [r10 - 0x6d0]
0b5628: ja -0x105 ; branch 0xb4e08
0b5630: ldxdw r1, [r10 - 0x828]
0b5638: ldxb r1, [r1 + 0x29]
0b5640: jeq r1, 0x0, +0x4b ; branch 0xb58a0
0b5648: ldxdw r4, [r10 - 0x508]
0b5650: mov64 r1, r10
0b5658: add64 r1, -0x3b8
0b5660: lddw r2, 0x1229d0 ; rodata b"\x00\x00\x00\x00F\xc6\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00"
0b5670: mov64 r3, 0x1
0b5678: call 0xb13d ; call 0x10e068
0b5680: ldxdw r1, [r10 - 0x3a0]
0b5688: stxdw [r10 - 0x458], r1
0b5690: ldxdw r1, [r10 - 0x3a8]
0b5698: stxdw [r10 - 0x460], r1
0b56a0: ldxdw r1, [r10 - 0x3b0]
0b56a8: stxdw [r10 - 0x468], r1
0b56b0: ldxdw r1, [r10 - 0x3b8]
0b56b8: stxdw [r10 - 0x470], r1
0b56c0: ldxb r1, [r10 - 0x398]
0b56c8: ldxdw r2, [r10 - 0x810]
0b56d0: stxb [r2 + 0x2], r1
0b56d8: ldxdw r2, [r10 - 0x850]
0b56e0: ldxdw r1, [r2 + 0x18]
0b56e8: stxdw [r10 - 0x3a0], r1
0b56f0: ldxdw r1, [r2 + 0x10]
0b56f8: stxdw [r10 - 0x3a8], r1
0b5700: ldxdw r1, [r2 + 0x8]
0b5708: stxdw [r10 - 0x3b0], r1
0b5710: ldxdw r1, [r2 + 0x0]
0b5718: stxdw [r10 - 0x3b8], r1
0b5720: mov64 r1, r10
0b5728: add64 r1, -0x3b8
0b5730: mov64 r2, r10
0b5738: add64 r2, -0x470
0b5740: mov64 r3, 0x20
0b5748: call 0xc832 ; call 0x1198e0
0b5750: lsh64 r0, 0x20
0b5758: rsh64 r0, 0x20
0b5760: jeq r0, 0x0, +0x36 ; branch 0xb5918
0b5768: mov64 r1, r10
0b5770: add64 r1, -0x6e8
0b5778: mov64 r2, 0x7d6
0b5780: call 0xa0d6 ; call 0x105e38
0b5788: ldxdw r3, [r10 - 0x6e0]
0b5790: ldxdw r2, [r10 - 0x6e8]
0b5798: mov64 r1, r10
0b57a0: add64 r1, -0x6f8
0b57a8: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0b57b8: mov64 r5, 0xf
0b57c0: call -0x1674a ; call 0x1d78
0b57c8: ldxdw r3, [r10 - 0x6f0]
0b57d0: ldxdw r2, [r10 - 0x6f8]
0b57d8: ldxdw r4, [r10 - 0x850]
0b57e0: ldxdw r1, [r4 + 0x18]
0b57e8: stxdw [r10 - 0x3a0], r1
0b57f0: ldxdw r1, [r4 + 0x10]
0b57f8: stxdw [r10 - 0x3a8], r1
0b5800: ldxdw r1, [r4 + 0x8]
0b5808: stxdw [r10 - 0x3b0], r1
0b5810: ldxdw r1, [r4 + 0x0]
0b5818: stxdw [r10 - 0x3b8], r1
0b5820: ldxdw r1, [r10 - 0x470]
0b5828: stxdw [r10 - 0x398], r1
0b5830: ldxdw r1, [r10 - 0x468]
0b5838: stxdw [r10 - 0x390], r1
0b5840: ldxdw r1, [r10 - 0x460]
0b5848: stxdw [r10 - 0x388], r1
0b5850: ldxdw r1, [r10 - 0x458]
0b5858: stxdw [r10 - 0x380], r1
0b5860: mov64 r1, r10
0b5868: add64 r1, -0x708
0b5870: mov64 r4, r10
0b5878: add64 r4, -0x3b8
0b5880: call 0x9b29 ; call 0x1031d0
0b5888: ldxdw r1, [r10 - 0x708]
0b5890: ldxdw r2, [r10 - 0x700]
0b5898: ja -0x153 ; branch 0xb4e08
0b58a0: mov64 r1, r10
0b58a8: add64 r1, -0x718
0b58b0: mov64 r2, 0x7d0
0b58b8: call 0xa0af ; call 0x105e38
0b58c0: ldxdw r3, [r10 - 0x710]
0b58c8: ldxdw r2, [r10 - 0x718]
0b58d0: mov64 r1, r10
0b58d8: add64 r1, -0x728
0b58e0: lddw r4, 0x11e3a8 ; rodata b'buyback_fee_recipientpump_event_authoritypump_fee_configpump_globalpump_pro'
0b58f0: mov64 r5, 0x15
0b58f8: call -0x16771 ; call 0x1d78
0b5900: ldxdw r1, [r10 - 0x728]
0b5908: ldxdw r2, [r10 - 0x720]
0b5910: ja -0x162 ; branch 0xb4e08
0b5918: ldxdw r1, [r10 - 0x500]
0b5920: ldxdw r2, [r10 - 0x4f0]
0b5928: ldxh r3, [r10 - 0x4d0]
0b5930: stxh [r6 + 0xa0], r3
0b5938: ldxdw r3, [r10 - 0x4d8]
0b5940: stxdw [r6 + 0x98], r3
0b5948: ldxdw r3, [r10 - 0x4e0]
0b5950: stxdw [r6 + 0x90], r3
0b5958: ldxw r3, [r10 - 0x4e8]
0b5960: stxw [r6 + 0xa3], r3
0b5968: ldxb r3, [r10 - 0x4e4]
0b5970: stxb [r6 + 0xa7], r3
0b5978: ldxdw r3, [r10 - 0x858]
0b5980: stxb [r6 + 0xa2], r3
0b5988: ldxdw r3, [r10 - 0x848]
0b5990: stxdw [r6 + 0x88], r3
0b5998: stxdw [r6 + 0x80], r9
0b59a0: ldxdw r3, [r10 - 0x850]
0b59a8: stxdw [r6 + 0x78], r3
0b59b0: ldxdw r3, [r10 - 0x878]
0b59b8: stxdw [r6 + 0x70], r3
0b59c0: ldxdw r3, [r10 - 0x880]
0b59c8: stxdw [r6 + 0x68], r3
0b59d0: ldxdw r3, [r10 - 0x870]
0b59d8: stxdw [r6 + 0x60], r3
0b59e0: ldxdw r3, [r10 - 0x868]
0b59e8: stxdw [r6 + 0x58], r3
0b59f0: ldxdw r3, [r10 - 0x860]
0b59f8: stxdw [r6 + 0x50], r3
0b5a00: stxdw [r6 + 0x48], r2
0b5a08: ldxdw r2, [r10 - 0x838]
0b5a10: stxdw [r6 + 0x40], r2
0b5a18: ldxdw r2, [r10 - 0x830]
0b5a20: stxdw [r6 + 0x38], r2
0b5a28: ldxdw r2, [r10 - 0x828]
0b5a30: stxdw [r6 + 0x30], r2
0b5a38: ldxdw r2, [r10 - 0x888]
0b5a40: stxdw [r6 + 0x28], r2
0b5a48: ldxdw r2, [r10 - 0x840]
0b5a50: stxdw [r6 + 0x20], r2
0b5a58: ldxdw r2, [r10 - 0x820]
0b5a60: stxdw [r6 + 0x18], r2
0b5a68: ldxdw r2, [r10 - 0x818]
0b5a70: stxdw [r6 + 0x10], r2
0b5a78: stxdw [r6 + 0x8], r8
0b5a80: stxdw [r6 + 0x0], r1
0b5a88: ja -0x348 ; branch 0xb4050
