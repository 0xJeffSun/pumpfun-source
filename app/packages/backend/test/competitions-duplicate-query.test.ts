import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from './with-api-key.js';

const competition='/v1/competitions/11111111-1111-4000-8000-000000000002';
const entry=competition+'/entries/22222222-2222-4000-8000-000000000001';
for (const url of [
 '/v1/competitions?limit=1&limit=2',
 competition+'?positionsLimit=1&positionsLimit=2',
 entry+'?limit=1&limit=2',
 entry+'/highlights?limit=1&%6cimit=2',
 competition+'/highlights?perMemberLimit=1&perMemberLimit=2',
]) {
 test(`competition read rejects duplicate query keys: ${url}`,async()=>{
  const app=buildApp();
  try {
   const response=await app.inject(url);
   assert.equal(response.statusCode,501);
   assert.equal(response.json().error,'DUPLICATE_QUERY_KEYS_UNIMPLEMENTED');
  } finally { await app.close(); }
 });
}
test('ordinary competition pagination still works',async()=>{
 const app=buildApp();
 try { assert.equal((await app.inject(competition+'?limit=1&positionsLimit=1')).statusCode,200); }
 finally { await app.close(); }
});
