import type SetList from "../core/models/set-list";

export default interface IPersister {
    save: (setList: SetList) => Promise<boolean>;
    load: () => Promise<SetList>;
}