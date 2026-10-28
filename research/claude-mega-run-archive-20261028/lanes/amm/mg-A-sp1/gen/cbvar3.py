# cbvar3.py : batch 3 (scoping of expected_ata / PDA check)
G='/Users/shawwalters/amm100-run/lanes/mg-A-sp1/gen'
B=open(G+'/cb_base.rs').read()
def R(t,a,b,n=1):
    assert t.count(a)>=1,(a[:70]); return t.replace(a,b,n)
EA_OLD="""    let expected_ata = anchor_spl::associated_token::get_associated_token_address_with_program_id(
        &user_volume_accumulator.key(),
        &quote_mint.key(),
        &quote_token_program.key(),
    );
    require!(ata.key() == expected_ata, PumpAmmError::InvalidCashbackAccumulatorAta);
"""
EA_BLK="""    {
        let expected_ata = anchor_spl::associated_token::get_associated_token_address_with_program_id(
            &user_volume_accumulator.key(),
            &quote_mint.key(),
            &quote_token_program.key(),
        );
        require!(ata.key() == expected_ata, PumpAmmError::InvalidCashbackAccumulatorAta);
    }
"""
EA_INL="""    require!(
        ata.key()
            == anchor_spl::associated_token::get_associated_token_address_with_program_id(
                &user_volume_accumulator.key(),
                &quote_mint.key(),
                &quote_token_program.key(),
            ),
        PumpAmmError::InvalidCashbackAccumulatorAta
    );
"""
PDA_OLD="""    let (expected_accumulator, bump) = Pubkey::find_program_address(
        &[b"user_volume_accumulator", user_key.as_ref()],
        &crate::ID,
    );
    if user_volume_accumulator.key() != expected_accumulator {
        return err!(PumpAmmError::InvalidCashbackAccumulator);
    }
"""
PDA_BLK="""    let bump = {
        let (expected_accumulator, bump) = Pubkey::find_program_address(
            &[b"user_volume_accumulator", user_key.as_ref()],
            &crate::ID,
        );
        if user_volume_accumulator.key() != expected_accumulator {
            return err!(PumpAmmError::InvalidCashbackAccumulator);
        }
        bump
    };
"""
assert EA_OLD in B, 'ea'; assert PDA_OLD in B, 'pda'
V={}
V['e1_ata_block']=R(B,EA_OLD,EA_BLK)
V['e3_ata_inline']=R(B,EA_OLD,EA_INL)
V['p1_pda_block']=R(B,PDA_OLD,PDA_BLK)
V['p2_pda_ata_block']=R(R(B,PDA_OLD,PDA_BLK),EA_OLD,EA_BLK)
V['p3_pda_block_ata_inl']=R(R(B,PDA_OLD,PDA_BLK),EA_OLD,EA_INL)
# e5: expected_ata block + is_writable moved into same block after
names=[]
for k,v in V.items():
    open(f'{G}/cbv/b3_{k}.rs','w').write(v); names.append(f'{G}/cbv/b3_{k}.rs')
open(G+'/cbv/b3.list','w').write('\n'.join(names)+'\n'); print(len(names))
