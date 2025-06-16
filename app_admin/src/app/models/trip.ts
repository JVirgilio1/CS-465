export interface Trip {
    id: string, // Internal primary key in MongoDB
    code: string,
    name: string,
    length: number,
    start: Date,
    resort: string,
    perPerson: number,
    image: string,
    description: string
}