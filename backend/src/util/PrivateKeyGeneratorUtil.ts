import * as crypto from 'crypto';

class PrivateKeyGeneratorUtil {
  static generate() {
    const diffieHellman = crypto.createDiffieHellman(256);
    diffieHellman.generateKeys('base64');

    return diffieHellman.getPrivateKey('base64');
  }
}

export default PrivateKeyGeneratorUtil;
