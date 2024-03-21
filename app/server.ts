#! /usr/bin/env bun

import { serve } from "bun";
import API from "./api";
import figlet from "figlet";
import { formatSetList } from "./helpers";
import { LocalFile } from "@persistence/local-file";
import SetList from "@core/models/set-list";
import { type TimerState } from "@core/timer/timer-manager";



const persister = new LocalFile();
const setList = await persister.load();
const apiInstance = new API(setList);

type Route = [string, Function];


// TODO: 
// map function names automatically instead of manual string entry
const timerAPIRoutes: Route[] = [
    ['play', apiInstance.play.bind(apiInstance)],
    ['pause', apiInstance.pause.bind(apiInstance)],
    ['reset', apiInstance.reset.bind(apiInstance)],
    ['skip_timer', apiInstance.skipTimer.bind(apiInstance)],
    ['get_timer', apiInstance.getTimer.bind(apiInstance)],
];

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
    ...timerAPIRoutes
]);

const getResultFromHandler = (handler: Function, requestArgs: object): string => {
    let result;
    if (requestArgs && Object.keys(requestArgs).length) {
        result = handler(...Object.values(requestArgs));
    } else {
        result = handler();
    }

    if (result instanceof SetList) {
        result = formatSetList(result);
    }

    return JSON.stringify(result);
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
            console.log({ res });
            return new Response(
                JSON.stringify(res),
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
                    }
                }
            );
        }

        return new Response('Not found', { status: 404 });
    }
})

console.log(figlet.textSync('Robbie\'s'));
console.log(figlet.textSync('Productivity'));
console.log(figlet.textSync('Server'));
console.log('Listening on port: ', port)