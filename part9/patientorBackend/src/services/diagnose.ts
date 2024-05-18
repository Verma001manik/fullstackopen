import diagnosesData from '../../data/diagnosesData';
import { DiagnosesEntry } from '../types';
const getDiagnoses = (): DiagnosesEntry[]=>{
    return diagnosesData;

}
const createDiagnoses = ()=>{
    return null;

}
export default{
    getDiagnoses,
    createDiagnoses
    
}