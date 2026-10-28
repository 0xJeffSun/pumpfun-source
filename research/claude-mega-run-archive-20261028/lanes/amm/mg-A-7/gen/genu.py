# generate updater variants v_<d1><d2><d6><d4>.rs from upd_u11.rs
import itertools,re
base=open('/Users/shawwalters/amm100-run/lanes/mg-A-7/gen/upd_u11.rs').read()
call_q='''        self.roll_over(user, current_day, now)?;
        if now <= self.end_time {
            self.add_sol_volume(current_day, sol_volume);
            user.add_sol_volume(sol_volume, now);
        }
        Ok(())'''
assert call_q in base
TODAY={
'H':'''            self.add_sol_volume(current_day, sol_volume);
            user.add_sol_volume(sol_volume, now);''',
'I':'''            self.sol_volumes[current_day] = self.sol_volumes[current_day]
                .checked_add(sol_volume)
                .expect("Overflowing sol volume");
            user.current_sol_volume = user
                .current_sol_volume
                .checked_add(sol_volume)
                .expect("Overflowing user accumulator sol volume");
            user.needs_claim = user.total_unclaimed_tokens > 0 || user.current_sol_volume > 0;
            user.last_update_timestamp = now;''',
'U':'''            self.sol_volumes[current_day] = self.sol_volumes[current_day]
                .checked_add(sol_volume)
                .expect("Overflowing sol volume");
            user.add_sol_volume(sol_volume, now);''',
}
D1={'q':lambda t: '        self.roll_over(user, RO_ARGS)?;\n        if now <= self.end_time {\n'+t+'\n        }\n        Ok(())',
    'r':lambda t: '        let result = self.roll_over(user, RO_ARGS);\n        if result.is_err() {\n            return result;\n        }\n        if now <= self.end_time {\n'+t+'\n        }\n        result'}
rd_old='''                let sol_volume = self.sol_volumes[last_update_day];
                let token_supply = self.total_token_supply[last_update_day];'''
assert rd_old in base
D6={'s':rd_old,'t':'''                let token_supply = self.total_token_supply[last_update_day];
                let sol_volume = self.sol_volumes[last_update_day];'''}
sig_old='    fn roll_over(&self, user: &mut UserVolumeAccumulator, current_day: usize, now: i64) -> Result<()> {'
assert sig_old in base
D4={'a':(sig_old,'current_day, now'),'b':('    fn roll_over(&self, user: &mut UserVolumeAccumulator, now: i64, current_day: usize) -> Result<()> {','now, current_day')}
names=[]
for d1,d2,d6,d4 in itertools.product(D1,TODAY,D6,D4):
    s=base.replace(call_q,D1[d1](TODAY[d2]).replace('RO_ARGS',D4[d4][1]))
    s=s.replace(rd_old,D6[d6]).replace(sig_old,D4[d4][0])
    n=f'v_{d1}{d2}{d6}{d4}'; open(f'/Users/shawwalters/amm100-run/lanes/mg-A-7/gen/upd_{n}.rs','w').write(s); names.append(n)
print(' '.join(names))
