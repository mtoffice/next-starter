const express = require('express');
const next = require('next');
const path = require('path');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production';

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const nextApp = next({ dir: '.', dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare()
    .then(() => {
      const server = express();

      if (!dev) {
        // Enforce SSL & HSTS in production
        server.use(function(req, res, next) {
          var proto = req.headers["x-forwarded-proto"];
          if (proto === "https") {
            res.set({
              'Strict-Transport-Security': 'max-age=31557600' // one-year
            });
            return next();
          }
          res.redirect("https://" + req.headers.host + req.url);
        });
      }
      
      // Static files
      // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
      server.use('/public', express.static(path.join(__dirname, 'public'), {
        maxAge: dev ? '0' : '365d'
      }));

      // server.get('/:id', (req, res) => {
      //   const actualPage = '/znaki'
      //   const queryParams = { 
      //     hash: req.params.id,
      //    }
      //   nextApp.render(req, res, actualPage, queryParams)
      // })

      server.get('/znaki-za-nevarnost/:subcategory', (req, res) => {
        const actualPage = '/znaki-za-nevarnost'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/znaki-za-izrecne-odredbe/:subcategory', (req, res) => {
        const actualPage = '/znaki-za-izrecne-odredbe'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/znaki-za-obvestila/:subcategory', (req, res) => {
        const actualPage = '/znaki-za-obvestila'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/dopolnilne-table/:subcategory', (req, res) => {
        const actualPage = '/dopolnilne-table'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/znaki-za-oznacevanje-roba-vozisca-in-preprecevanje-voznje/:subcategory', (req, res) => {
        const actualPage = '/znaki-za-oznacevanje-roba-vozisca-in-preprecevanje-voznje'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/znaki-za-oznacevanje-del-in-ovir-v-cestnem-prometu/:subcategory', (req, res) => {
        const actualPage = '/znaki-za-oznacevanje-del-in-ovir-v-cestnem-prometu'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/znaki-turisticne-in-druge-obvestilne-signalizacije/:subcategory', (req, res) => {
        const actualPage = '/znaki-turisticne-in-druge-obvestilne-signalizacije'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/oprema-za-vodenje-prometa/:subcategory', (req, res) => {
        const actualPage = '/oprema-za-vodenje-prometa'
        const queryParams = { 
          subcategory: req.params.subcategory,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/produkt/znak/:id', (req, res) => {
        const actualPage = '/produkt/znak'
        const queryParams = { 
          hash: req.params.id,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/produkt/uredi/:id/stevilka/:cartId', (req, res) => {
        const actualPage = '/produkt/uredi'
        const queryParams = { 
          hash: req.params.id,
          cartId: req.params.cartId,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/uporabnik/narocila/:id', (req, res) => {
        const actualPage = '/uporabnik/narocila'
        const queryParams = { 
          hash: req.params.id,
         }
        nextApp.render(req, res, actualPage, queryParams)
      })

      // Default catch-all renders Next app
      server.get('*', (req, res) => {
        // res.set({
        //   'Cache-Control': 'public, max-age=3600'
        // });
        const parsedUrl = url.parse(req.url, true);
        nextHandler(req, res, parsedUrl);
      });

      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${port}`);
      });
    });
}