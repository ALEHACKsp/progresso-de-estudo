import PrivateKeyGeneratorUtil from '../util/PrivateKeyGeneratorUtil';
import * as fs from 'fs';
import * as path from 'path';

let dotenvContent = '';

const dataToDotenvFile = {
  'PRIVATE_KEY': PrivateKeyGeneratorUtil.generate(),
  'NODE_ENV': '',
  'DATABASE_SCHEMA': '',
  'DATABASE_USER': '',
  'DATABASE_PASSWORD': '',
}

for(const atribute in dataToDotenvFile) {
  dotenvContent += `${atribute}=${dataToDotenvFile[atribute]}` + '\n';
}

fs.writeFileSync(path.resolve(__dirname, '..', '..', '.env'), dotenvContent);
console.log('OK');
