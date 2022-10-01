import {PassThrough} from "stream";
import type {EntryContext} from "@remix-run/node";
import {Response} from "@remix-run/node";
import {RemixServer} from "@remix-run/react";
import {renderToPipeableStream, renderToString} from "react-dom/server";
import {ServerStyleSheet} from "styled-components";

const ABORT_DELAY = 5000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {

    const sheet = new ServerStyleSheet();

    let markup = renderToString(
        sheet.collectStyles(
            <RemixServer context={remixContext} url={request.url}/>
        )
    );

    const styles = sheet.getStyleTags();
    markup = markup.replace("__STYLES__", styles);

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });

    // return new Promise((resolve, reject) => {
    //     let didError = false;
    //
    //     const {pipe, abort} = renderToPipeableStream(
    //         <RemixServer context={remixContext} url={request.url}/>,
    //         {
    //             onShellReady: () => {
    //                 const body = new PassThrough();
    //
    //                 responseHeaders.set("Content-Type", "text/html");
    //
    //                 resolve(
    //                     new Response(body, {
    //                         headers: responseHeaders,
    //                         status: didError ? 500 : responseStatusCode,
    //                     })
    //                 );
    //
    //                 pipe(body);
    //             },
    //             onShellError: (err) => {
    //                 reject(err);
    //             },
    //             onError: (error) => {
    //                 didError = true;
    //
    //                 console.error(error);
    //             },
    //         }
    //     );
    //
    //     setTimeout(abort, ABORT_DELAY);
    // });
}
