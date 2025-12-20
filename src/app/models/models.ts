export interface Subject {
    id: number;
    name: string;
}

export interface Test {
    id: number;
    name: string;
    query: Query;
    type_exam: boolean;
}

export interface Query{
    question: string;
    answers: string[];
    correct: number;
}