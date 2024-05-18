// import patientEntries from '../../data/patientsData';
// import patientEntries from '../../data/patientsData';
import patientsData from '../../data/patientsData';
import { PatientEntry , NonSensitivePatient} from '../types';
// import { v1 as uuid } from 'uuid';
// const id = uuid()
import { v1 as uuid } from 'uuid'
const id = uuid()
const getPatients = (): PatientEntry[]=>{
    return patientsData;

}
const getSensitiveEntries = ():NonSensitivePatient[]=>{
    return patientsData.map(({id,name,dateOfBirth, gender, occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: [] //added now
    }));
}
const findById = (id:string):NonSensitivePatient | undefined=>{
    const entry = patientsData.find(p => p.id === String(id));
    return entry;

}
const createPatients = ( name: string, dateOfBirth: string, gender: string, ssn: string, occupation: string): NonSensitivePatient | undefined=>{
    const newPatient = {
        id: id ,
        name,
        dateOfBirth,
        gender,
        ssn,
        occupation,
        entries : [] //added now
    };
    patientsData.push(newPatient);
    return newPatient;


    

}
export default{
    getPatients,
    createPatients,
    getSensitiveEntries,
    findById
    
}