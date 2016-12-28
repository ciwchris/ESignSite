import { CompletedPackage } from './completed-package';

export class CompletedDocuments {
    constructor(
        public packages: CompletedPackage[],
        public count: number
    ) { }
}
