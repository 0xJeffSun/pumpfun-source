# cbvar1.py : write variant files gen/cbv/b1_*.rs from cb_base.rs
import os
G='/Users/shawwalters/amm100-run/lanes/mg-A-sp1/gen'
B=open(G+'/cb_base.rs').read()
def R(t,a,b,n=1):
    assert t.count(a)>=1,(a[:60]); return t.replace(a,b,n)
V={}
V['a1_iswritable_if']=R(B,"    require!(ata.is_writable, PumpAmmError::InvalidCashbackAccumulatorAta);\n",
 "    if !ata.is_writable {\n        return err!(PumpAmmError::InvalidCashbackAccumulatorAta);\n    }\n")
V['b2_match_empty']=R(R(B,"    if ata.data_is_empty() {\n","    match ata.data_is_empty() {\n        true => {\n"),
 "        ))?;\n    }\n    let ata = InterfaceAccount","        ))?;\n        }\n        false => {}\n    }\n    let ata = InterfaceAccount")
V['b3_notempty_else']=R(R(B,"    if ata.data_is_empty() {\n","    if !ata.data_is_empty() {\n    } else {\n"),"QQQ","QQQ") if False else None
V['v4_require_key']=R(B,"    if user_volume_accumulator.key() != expected_accumulator {\n        return err!(PumpAmmError::InvalidCashbackAccumulator);\n    }\n",
 "    require!(user_volume_accumulator.key() == expected_accumulator, PumpAmmError::InvalidCashbackAccumulator);\n")
V['v6_userkey_first']=R(R(B,"    let user_key = user.key();\n",""),"    let ata = remaining_accounts\n","    let user_key = user.key();\n    let ata = remaining_accounts\n")
V['v7_userkey_ref']=R(R(R(R(B,"    let user_key = user.key();\n",""),"user_key.as_ref()],\n","user.key.as_ref()],\n"),
 "&[b\"user_volume_accumulator\", user_key.as_ref(), &bump]","&[b\"user_volume_accumulator\", user.key.as_ref(), &bump]"),
 "data[8..40].copy_from_slice(user_key.as_ref());","data[8..40].copy_from_slice(user.key.as_ref());")
V['v10_slice_disc']=R(B,"data[..8] != *UserVolumeAccumulator::DISCRIMINATOR","&data[..8] != UserVolumeAccumulator::DISCRIMINATOR")
V['v14_ata_acct']=R(R(B,"    let ata = InterfaceAccount::<TokenAccount>::try_from_unchecked(ata)?;","    let ata_account = InterfaceAccount::<TokenAccount>::try_from_unchecked(ata)?;"),"        &ata,\n        amount,","        &ata_account,\n        amount,")
v16=R(B,"    let user_key = user.key();\n","")
v16=R(v16,"        &[b\"user_volume_accumulator\", user_key.as_ref()],","        &[b\"user_volume_accumulator\", user.key().as_ref()],")
v16=R(v16,"    require!(user_volume_accumulator.is_writable, PumpAmmError::InvalidCashbackAccumulator);\n","    require!(user_volume_accumulator.is_writable, PumpAmmError::InvalidCashbackAccumulator);\n    let user_key = user.key();\n")
V['v16_userkey_late']=v16
v17=R(v16,"    let user_key = user.key();\n","")
v17=R(v17,"&[b\"user_volume_accumulator\", user_key.as_ref(), &bump]","&[b\"user_volume_accumulator\", user.key.as_ref(), &bump]")
v17=R(v17,"data[8..40].copy_from_slice(user_key.as_ref());","data[8..40].copy_from_slice(user.key.as_ref());")
V['v17_nouserkey']=v17
V['v18_rent_chain']=R(B,"        let rent = Rent::get()?;\n        let rent = rent.minimum_balance(137);\n","        let rent = Rent::get()?.minimum_balance(137);\n")
V['v19_acc_late']=R(R(B,"    let mut accumulator = Account::<UserVolumeAccumulator>::try_from_unchecked(user_volume_accumulator)?;\n",""),
  "    let ata = InterfaceAccount::<TokenAccount>::try_from_unchecked(ata)?;\n","    let ata = InterfaceAccount::<TokenAccount>::try_from_unchecked(ata)?;\n    let mut accumulator = Account::<UserVolumeAccumulator>::try_from_unchecked(user_volume_accumulator)?;\n")
names=[]
for k,v in V.items():
    if v is None: continue
    open(f'{G}/cbv/b1_{k}.rs','w').write(v); names.append(f'{G}/cbv/b1_{k}.rs')
open(G+'/cbv/b1.list','w').write('\n'.join(names)+'\n')
print(len(names))
