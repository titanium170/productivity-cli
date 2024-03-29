
import { program } from 'commander';
import HttpClient from '@client/http-client';

program
    .version("1.0.0")
    .name('prod-util')
    .description("My task manager")
    .hook('postAction', async (thisCommand, actionCommand) => {
        if (actionCommand.name() === 'list') {
            return;
        }
        // TODO
        // await persister.save(setList);
        // console.table(formatSetList(setList));
    });

program.command('add')
    .description('adds a set')
    // .option('-e, --end', 'adds the set to the end')
    .option('-n, --number <n>', 'adds n number of sets')
    .action(async (options) => {

        // addSetsAction(setList, +options.number ?? 1, timer);
        // const setList = await HttpClient.post('addSet', { n: +options.number })
        const setList = await HttpClient.post('addSet');
        console.table(JSON.parse(setList));
    });


program.command('rm')
    .description('removes a set')
    .argument('<id>', 'removes set with matching id')
    .option('-n, --number <n>', 'removes n number of sets')
    .action(async (arg, options) => {
        let result;
        if (options.number) {
            result = await HttpClient.post('removeSets', { n: +options.number })
            // removeSetsAction(setList, +options.number)
        } else {
            result = await HttpClient.post('removeSet', {});
            // setList.remove(+arg);
        }
        console.table(JSON.parse(result));
    });


program.command('task')
    .description('adds a task')
    .argument('<name>', 'adds task')
    .action(async (arg) => {
        const result = await HttpClient.post('addTask', { name: arg })
        console.table(JSON.parse(result));
    });

program.command('next')
    .description('sets active set to next')
    .action(async () => {
        const result = await HttpClient.post('next', {});
        console.table(JSON.parse(result));
        // setList.next();
    });

program.command('prev')
    .description('sets active set to prev')
    .action(async () => {
        const result = await HttpClient.post('previous', {});
        console.table(JSON.parse(result));
        // setList.next();
    });

program.command('go')
    .description('sets active to index')
    .argument('<id>', 'id of set to choose')
    .action(async (arg) => {
        // changeActiveSetAction(setList, +arg);
        const setList = await HttpClient.post('setActive', { id: arg })
        console.table(setList);
    });

program.command('list')
    .description('lists sets')
    .action(async () => {
        const setList = await HttpClient.get('list');
        console.table(JSON.parse(setList));
    });

program.command('play')
    .description('play the timer if paused')
    .action(async () => {
        const response = await HttpClient.post('play');
        console.log(JSON.parse(response));
    });

program.command('pause')
    .description('pause the timer if not paused')
    .action(async () => {
        const response = await HttpClient.post('pause');
        console.log(JSON.parse(response));
    });

program.command('reset')
    .description('reset the timer')
    .action(async () => {
        const response = await HttpClient.post('reset');
        console.log(JSON.parse(response));
    });

program.command('skip')
    .description('skip to the next break/focus timer')
    .action(async () => {
        const response = await HttpClient.post('skipTimer');
        console.log(JSON.parse(response));
    });



export const runProgram = async () => {
    await program.parseAsync();
};
