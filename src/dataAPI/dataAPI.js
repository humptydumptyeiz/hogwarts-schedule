import { getFacultyData, getSubjectData, getStudentData, getSubjectFacultyData,
	getStudentSubjectFacultyMappingData } from './generateData'


const fetchData = (fn, timeout) => () => new Promise(resolve => setTimeout(resolve, timeout, fn()));

const getFacultyDataAPI = fetchData(getFacultyData, 50);
const getSubjectDataAPI = fetchData(getSubjectData, 50);
const getStudentDataAPI = fetchData(getStudentData, 50);
const getSubjectFacultyDataAPI = fetchData(getSubjectFacultyData, 50);
const getStudentSubjectFacultyMappingDataAPI = fetchData(getStudentSubjectFacultyMappingData, 50);

export {
	getFacultyDataAPI,
	getStudentDataAPI,
	getSubjectDataAPI,
	getSubjectFacultyDataAPI,
	getStudentSubjectFacultyMappingDataAPI
};



