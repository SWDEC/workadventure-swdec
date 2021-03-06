import {HttpResponse} from "uWebSockets.js";


export class BaseController {
    protected addCorsHeaders(res: HttpResponse): void {
        res.writeHeader('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.writeHeader('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.writeHeader('access-control-allow-origin', '*');
    }

    /**
     * Turns any exception into a HTTP response (and logs the error)
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected errorToResponse(e: any, res: HttpResponse): void {
        console.error(e.message || "An error happened.", e?.config.url);
        console.error(e.stack || 'no stack defined.');
        if (e.response) {
            res.writeStatus(e.response.status+" "+e.response.statusText);
            this.addCorsHeaders(res);
            res.end("An error occurred: "+e.response.status+" "+e.response.statusText);
        } else {
            res.writeStatus("500 Internal Server Error")
            this.addCorsHeaders(res);
            res.end("An error occurred");
        }
    }
}
