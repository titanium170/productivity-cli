#! /usr/bin/env bun

import { serve } from "bun";
import API from "./api";
import figlet from "figlet";
import { formatSetList } from "./helpers";
import { LocalFile } from "@persistence/local-file";

const persister = new LocalFile();
const setList = await persister.load();
const apiInstance = new API(setList);

const routeMap = new Map<string, Function>([
    ['', () => ({ message: 'Please choose a valid route', data: {} })],
    ['add_set', apiInstance.addSet.bind(apiInstance)],
    ['remove_set', apiInstance.removeSet.bind(apiInstance)],
    ['remove_sets', apiInstance.removeSets.bind(apiInstance)],
    ['add_task', apiInstance.addTask.bind(apiInstance)],
    ['next', apiInstance.next.bind(apiInstance)],
    ['previous', apiInstance.previous.bind(apiInstance)],
    ['set_active', apiInstance.setActive.bind(apiInstance)],
    ['list', apiInstance.list.bind(apiInstance)],
    ['play', apiInstance.play.bind(apiInstance)],
    ['pause', apiInstance.pause.bind(apiInstance)],
    ['reset', apiInstance.reset.bind(apiInstance)],
    ['skip_timer', apiInstance.skipTimer.bind(apiInstance)],
]);

const getResultFromHandler = (handler: Function, requestArgs: object) => {
    let result;
    if (requestArgs && Object.keys(requestArgs).length) {
        result = handler(...Object.values(requestArgs));
    } else {
        result = handler();
    }

    const res = JSON.stringify(formatSetList(result));
    console.log({ res });
    return res;
}

const port = '3000';

serve({
    port,
    // unix: '/tmp/my-socket.sock',
    async fetch(req) {
        let reqJson;
        if (req.method === 'POST') {
            reqJson = await req.json();
            console.log(`request: ${JSON.stringify(reqJson)}}`);
        }

        const route = new URL(req.url).pathname.replace('/', '');
        const handler = routeMap.get(route);
        if (handler) {
            const res = getResultFromHandler(handler, reqJson);
            await persister.save(setList);
            return new Response(JSON.stringify(res), { status: 200 });
        }

        return new Response('Not found', { status: 404 });
    }
})

console.log(figlet.textSync('Robbie\'s'));
console.log(figlet.textSync('Productivity'));
console.log(figlet.textSync('Server'));
console.log('Listening on port: ', port)