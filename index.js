const http = require('http');

const fs = require('fs');

const path = require('path');

const hostname = "localhost";

const port = 3000;

const server = http.createServer( (request, response) => {
    
  // console.log(request.headers);

  console.log( 'Request For' + request.url + 'By Method' + request.method );

  if(request.method == 'GET'){

      var fileURL;

      if(request.url == '/'){ fileURL = "/index.html" }

      else { fileURL = request.url };

      var filePath = path.resolve( './public'+ fileURL );

      const fileExtension = path.extname(filePath);

      if( fileExtension == '.html'){

          fs.exists(filePath, (exists) => {

              if(!exists){

                  response.statusCode = 404;

                  response.setHeader('Content-Type','text/html');

                  response.end( '<html> <body> <h1>=> Error 404 :( <div> => "' + fileURL + '" </div> => Does Not Exists . . . ! !</h1> </body> </html>' )

                }

              response.statusCode = 200;

              response.setHeader('Content-Type','text/html');

              fs.createReadStream(filePath).pipe(response);

            })

        }
        
        else {

          response.statusCode = 404;

          response.setHeader('Content-Type','text/html');

          response.end( '<html> <body> <h1>=> Error 404 :( <div> => "' + fileURL + '" </div> => Not a HTML File . . . ! !</h1> </body> </html>' )

        }

    }
    
    else {

      response.statusCode = 404;

      response.setHeader('Content-Type','text/html');

      response.end( '<html> <body> <h1>=> Error 404 :( <div> => "' + fileURL + '" </div> => Not Supported . . . ! !</h1> </body> </html>' )

    }

} );

server.listen(port, hostname, () => {
    
       console.log( `Server Running @ http://${hostname}:${port}` ); 
    
    } );