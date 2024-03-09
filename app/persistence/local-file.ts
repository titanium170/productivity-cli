import { file, write } from "bun";
import type IPersister from ".";
import SetList from "../core/models/set-list";

export class LocalFile implements IPersister {
    async save(setList: SetList): Promise<boolean> {
        const jsonData = setList.toJson();
        return await this.writeToFile(jsonData);
    }

    async load(): Promise<SetList> {
        const setList = new SetList();
        const setListJson = await this.loadFromFile();
        if (setListJson) {
            setList.fromJson(setListJson);
        }

        return setList;
    }


    private async writeToFile(jsonData: string): Promise<boolean> {
        const dateString = new Date().toISOString().split('T')[0];
        const filePath = `${__dirname}/work-sets/${dateString}`;

        try {
            await write(filePath, jsonData);
            return true;
        } catch (error) {
            throw error;
        }
    }

    private async loadFromFile(): Promise<string> {
        const dateString = new Date().toISOString().split('T')[0];
        const filePath = `${__dirname}/work-sets/${dateString}`;
        try {
            return await file(filePath).text();
        } catch (error) {
            return '';
        }
    }

}