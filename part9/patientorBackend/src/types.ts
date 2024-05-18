export interface DiagnosesEntry {
    code: string;
    name : string;
    latin?: string;

}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}
export interface PatientEntry{
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[]
}
export type NonSensitivePatient = Omit<PatientEntry, 'ssn' | 'entries' >;
