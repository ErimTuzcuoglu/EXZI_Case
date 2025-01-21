/* Instead of using 3rd party libs like uuid or uuidv4, using default crypto. */
import {randomUUID as generateRandomUUID} from 'crypto';

export default class Crypto {
  static randomUUID() {
    return generateRandomUUID();
  }
};
