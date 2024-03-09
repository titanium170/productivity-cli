import figlet from "figlet";
import { program } from 'commander';
import { LocalFile } from "./persistence/local-file";
import SetList from "./core/models/set-list";
import AddObjectiveToSet from "./core/actions/add-objective-to-set";
import RemoveSets from "./core/actions/remove-sets";
import ChangeActiveSet from "./core/actions/change-active-set";
import ListSets from "./core/actions/list-sets";

const persister = new LocalFile();
let setList = new SetList();


program
    .version("1.0.0")
    .name('prod-util')
    .description("My task manager")
    .hook('postAction', async (thisCommand, actionCommand) => {
        if (actionCommand.name() === 'list') {
            return;
        }
        await persister.save(setList);
        console.log(ListSets(setList));
    });

program.command('add')
    .description('adds a set')
    // .option('-e, --end', 'adds the set to the end')
    .option('-n, --number <n>', 'adds n number of sets')
    .action((options) => {
        if (options.number) {
            setList.addSets(+options.number);
        } else {
            setList.add();
        }
    });


program.command('rm')
    .description('removes a set')
    .argument('<id>', 'removes set with matching id')
    .option('-n, --number <n>', 'removes n number of sets')
    .action((arg, options) => {
        if (options.number) {
            RemoveSets(setList, +options.number)
        } else {
            setList.remove(+arg);
        }
    })


program.command('task')
    .description('adds a task')
    .argument('<name>', 'adds task')
    .action((arg) => {
        AddObjectiveToSet(setList.active() ?? setList.add(), arg);
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
        ChangeActiveSet(setList, +arg);
    });

program.command('list')
    .description('lists sets')
    .action(() => {
        console.log(ListSets(setList));
    });

(async () => {
    setList = await persister.load();
    await program.parseAsync();
})();
