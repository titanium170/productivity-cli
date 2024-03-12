import type SetList from "../models/set-list";

export default function changeActiveSetAction(setList: SetList, id: number) {
    setList.changeActive(id);
}