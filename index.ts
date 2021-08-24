import d from 'debug';
import http from 'http';
import app from './src/app';
const debug = d('server:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('beforeExit', (code) => {
    // Can make asynchronous calls
    debug('Server exit', code);
    setTimeout(() => {
        console.log(`Process will exit with code: ${code}`);
        process.exit(code);
    }, 100);
});

process.on('exit', (code) => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`);
});

process.on('SIGTERM', (signal) => {
    debug('Process SIGTERM signal', process.pid);
    console.log(`Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
});

process.on('SIGINT', (signal) => {
    debug('Process has been interrupted', process.pid);
    console.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    debug('Uncaught Exception', err.message);
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (err, promise) => {
    debug('Unhandled rejection', err);
    console.log('Unhandled rejection at ', promise, `reason: ${err}`);
    process.exit(1);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    debug('Server error', error);

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('Listening on ' + bind);
}
