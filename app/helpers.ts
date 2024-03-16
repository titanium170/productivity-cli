import type SetList from '@core/models/set-list';

export function formatSetList(setList: SetList) {
    const list = setList.list();
    const active = setList.active()?.id
    const formattedList = list.map(({ tasks, id }) => ({
        active: id === active ? 'active' : '',
        tasks: tasks.map(task => `${task.name}: ${task.complete ? '☑' : '☐'}`)
    }))

    return formattedList;
}