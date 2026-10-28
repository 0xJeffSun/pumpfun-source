FNS=['execute','account_size']
CALL='    let new_size = account_size(account)?;'
CHAIN='''if discriminator == GlobalConfig::DISCRIMINATOR {
        Ok(949)
    } else if discriminator == Pool::DISCRIMINATOR {
        Ok(301)
    } else if discriminator == UserVolumeAccumulator::DISCRIMINATOR {
        Ok(137)
    } else if discriminator == [202, 42, 246, 43, 142, 190, 30, 255] {
        Ok(600)
    } else {'''
INL='''    let new_size = {
        require!(account.data_len() >= 8, PumpAmmError::AccountTypeNotSupported);
        let data = account.try_borrow_data()?;
        let discriminator = &data[..8];
        if discriminator == GlobalConfig::DISCRIMINATOR {
            949
        } else if discriminator == Pool::DISCRIMINATOR {
            301
        } else if discriminator == UserVolumeAccumulator::DISCRIMINATOR {
            137
        } else if discriminator == [202, 42, 246, 43, 142, 190, 30, 255] {
            600
        } else {
            return err!(PumpAmmError::AccountTypeNotSupported);
        }
    };'''
CLO=INL.replace('let new_size = {','let new_size = (|| -> Result<usize> {').replace('return err!(PumpAmmError::AccountTypeNotSupported);','return err!(PumpAmmError::AccountTypeNotSupported);').replace('            949','            Ok(949)').replace('            301','            Ok(301)').replace('            137','            Ok(137)').replace('            600','            Ok(600)').replace('    };','    })()?;')
MATCH='''let size = match discriminator {
        d if d == GlobalConfig::DISCRIMINATOR => 949,
        d if d == Pool::DISCRIMINATOR => 301,
        d if d == UserVolumeAccumulator::DISCRIMINATOR => 137,
        d if d == [202, 42, 246, 43, 142, 190, 30, 255] => 600,
        _ => {'''
V=[
 ('s0',[]),
 ('s1',[(CALL,INL)]),
 ('s2',[(CALL,CLO)]),
 ('s3',[(CHAIN,MATCH),('        err!(PumpAmmError::AccountTypeNotSupported)\n    }\n}','        return err!(PumpAmmError::AccountTypeNotSupported)\n        }\n    };\n    Ok(size)\n}')]),
 ('s4',[('    let data = account.try_borrow_data()?;\n    let discriminator = &data[..8];','    let data = account.try_borrow_data()?;\n    let discriminator: &[u8] = &data[..8];')]),
 ('s5',[(CALL,'    let new_size = account_size(account);\n    let new_size = new_size?;')]),
]
