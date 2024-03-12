#! /usr/bin/env bun


import { program } from 'commander';
import { LocalFile } from "./persistence/local-file";
import SetList from "./core/models/set-list";
import addObjectiveToSetAction from "./core/actions/add-objective-to-set";
import removeSetsAction from "./core/actions/remove-sets";
import changeActiveSetAction from "./core/actions/change-active-set";
import listSetsAction from "./core/actions/list-sets";
import addSetsAction from './core/actions/add-sets';
import { TimerManager } from './core/timer/time-manager';

const persister = new LocalFile();
let setList = new SetList();
const timer = new TimerManager();


program
    .version("1.0.0")
    .name('prod-util')
    .description("My task manager")
    .hook('postAction', async (thisCommand, actionCommand) => {
        if (actionCommand.name() === 'list') {
            return;
        }
        await persister.save(setList);
        console.table(listSetsAction(setList));
    });

program.command('add')
    .description('adds a set')
    // .option('-e, --end', 'adds the set to the end')
    .option('-n, --number <n>', 'adds n number of sets')
    .action((options) => {
        addSetsAction(setList, +options.number ?? 1, timer);
    });


program.command('rm')
    .description('removes a set')
    .argument('<id>', 'removes set with matching id')
    .option('-n, --number <n>', 'removes n number of sets')
    .action((arg, options) => {
        if (options.number) {
            removeSetsAction(setList, +options.number)
        } else {
            setList.remove(+arg);
        }
    })


program.command('task')
    .description('adds a task')
    .argument('<name>', 'adds task')
    .action((arg) => {
        addObjectiveToSetAction(setList.active() ?? setList.add(), arg);
    });

program.command('next')
    .description('sets active set to next')
    .action(() => {
        setList.next();
    });

program.command('prev')
    .description('sets active set to prev')
    .action(() => {
        setList.prev();
    });

program.command('go')
    .description('sets active to index')
    .argument('<id>', 'id of set to choose')
    .action((arg) => {
        changeActiveSetAction(setList, +arg);
    });

program.command('list')
    .description('lists sets')
    .action(() => {
        console.table(listSetsAction(setList));
    });

(async () => {
    setList = await persister.load();
    await program.parseAsync();
})();
