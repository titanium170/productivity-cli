import type SetList from "../models/set-list";

export default function ListSets(setList: SetList) {
    return JSON.parse(setList.toJson());
}