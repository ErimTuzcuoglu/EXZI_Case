import notFound from '../middlewares/initial/notFound';

class Router {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.handle();
  }

  handle = () => {
    const {url} = this.req;
    if (/^\/api(\/|$)/.test(url)) {
      this.res.customResult({message: 'There is no endpoint starting under "/api" implemented yet'}, 404, false);
      /*
      If we need to implement an API, maybe we can use define new files (like user.js, currency.js, etc.)
        and pass "url" parameter to these files to handle endpoints.
        Or maybe we can define a structure on reading controller files by splitting the URL and reading the part after /api.
    */
    } else if (url === '/favicon.ico') {
      this.res.writeHead(204, {'Content-Type': 'image/x-icon'}); // 204: No Content
      return this.res.end();
    } else {
      notFound(this.req);
    }
  };
}

export default Router;
