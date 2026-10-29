import test from 'node:test';
import assert from 'node:assert/strict';
import {LeaderboardStore} from '../src/leaderboard-store.js';
test('each deterministic board uses the documented 2026 anchor',()=>{
  const store=new LeaderboardStore();const anchor=Date.parse('2026-10-01T00:00:00Z')/1000;
  for (const [period,span] of [['daily',86400],['weekly',604800],['monthly',2592000]] as const) {
    assert.equal(store.getBoard({period}).windowStartSec,Math.floor(anchor/span)*span);
  }
});
