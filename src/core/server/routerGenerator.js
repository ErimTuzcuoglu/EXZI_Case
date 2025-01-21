import {Router} from 'express';

class RouterGenerator {
  createRouter() {
    return Router();
  }
}

export const routerGenerator = new RouterGenerator();