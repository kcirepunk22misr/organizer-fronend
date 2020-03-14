export interface tool {
    ok: true
    inventaios: [
        {
            crearedAf: string;
            name: string;
            marca: string;
            type: string;
            size: string;
            color: string;
            group: string;
            location: string;
            state: string;
            quantify: number;
            img: string;
        }
    ]
}

export interface property {
    types: [{
        name: string
    }]
}