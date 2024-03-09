import type SetList from "../models/set-list";

export default function ChangeActiveSet(setList: SetList, id: number) {
    setList.changeActive(id);
}