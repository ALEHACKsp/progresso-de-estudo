import { createConnection } from 'typeorm'

describe('', () => {
  console.log('AAAA');
  it('the database is expected to be synchronized', async () => {
    const connection = await createConnection();
    let databaseWasSync = false;

    try {
      await connection.synchronize(true);
      databaseWasSync = true;
    }
    finally {
      expect(databaseWasSync).toBe(true);
    }
  });
});