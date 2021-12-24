import { arrayToObject } from '../helpers';

const facultyList = [
	'Professor Dumbledore',
	'Minerva McGonagall',
	'Rubeus Hagrid',
	'Horace Slughorn',
	'Severus Snape',
	'Alastor Moody',
	'Remus Lupin',
	'Gilderoy Lockhart'
];

const subjectList = [
	'All',
	'Potions Master',
	'Defense Against the Dark Arts'
];

const studentList = [
	'Harry Potter',
	'Hermione Granger',
	'Ron Weasley',
	'Draco Malfoy',
	'Padma Patil',
	'Luna Lovegood'
];

const subjectFacultyMapping = [
	{
		subject: 'All',
		faculty: 'Professor Dumbledore',
		parentFaculty: null
	},
	{
		subject: 'All',
		faculty: 'Minerva McGonagall',
		parentFaculty: 'Professor Dumbledore'
	},
	{
		subject: 'Potions Master',
		faculty: 'Rubeus Hagrid',
		parentFaculty: 'Minerva McGonagall',
		isStandby: true
	},
	{
		subject: 'Potions Master',
		faculty: 'Horace Slughorn',
		parentFaculty: 'Rubeus Hagrid'
	},
	{
		subject: 'Potions Master',
		faculty: 'Severus Snape',
		parentFaculty: 'Rubeus Hagrid'
	},
	{
		subject: 'Defense Against the Dark Arts',
		faculty: 'Alastor Moody',
		parentFaculty: 'Minerva McGonagall',
		isStandby: true
	},
	{
		subject: 'Defense Against the Dark Arts',
		faculty: 'Remus Lupin',
		parentFaculty: 'Alastor Moody'
	},
	{
		subject: 'Defense Against the Dark Arts',
		faculty: 'Gilderoy Lockhart',
		parentFaculty: 'Alastor Moody'
	}
];

const studentSubjectFacultyAllocationList = [
	{
		student: 'Harry Potter',
		subject: 'Potions Master',
		faculty: 'Horace Slughorn'
	},
	{
		student: 'Hermione Granger',
		subject: 'Potions Master',
		faculty: null
	},
	{
		student: 'Ron Weasley',
		subject: 'Potions Master',
		faculty: 'Severus Snape',
	},
	{
		student: 'Draco Malfoy',
		subject: 'Potions Master',
		faculty: 'Horace Slughorn'
	},
	{
		student: 'Padma Patil',
		subject: 'Potions Master',
		faculty: null
	},
	{
		student: 'Luna Lovegood',
		subject: 'Potions Master',
		faculty: 'Severus Snape'
	}
]

function addIdToEachItemOfArr(arr, itemKey = 'name'){
	return arr.map((item, ix) => ({
		[itemKey]: item,
		id: ix + 1
	}));
}

function getFacultyData(){
	return arrayToObject(addIdToEachItemOfArr(facultyList), 'id', 'name',
		{});
}

function getSubjectData(){
	return arrayToObject(addIdToEachItemOfArr(subjectList), 'id', 'name',
		{});
}

function getStudentData(){
	return arrayToObject(addIdToEachItemOfArr(studentList), 'id', 'name',
		{});
}

function getSubjectFacultyData(){
	const facultyObj = arrayToObject(addIdToEachItemOfArr(facultyList), 'name', 'id',
		{});
	const subjectObj = arrayToObject(addIdToEachItemOfArr(subjectList), 'name', 'id',
		{});
	
	return subjectFacultyMapping.map(obj => ({
		
			subjectId: subjectObj[obj.subject],
			facultyId: facultyObj[obj.faculty],
			parentFacultyId: obj.parentFaculty != null ? facultyObj[obj.parentFaculty] : null,
			isStandby: obj.isStandby || null
		}));
}

function getStudentSubjectFacultyMappingData(){
	const facultyObjById = arrayToObject(addIdToEachItemOfArr(facultyList), 'name', 'id',
		{});
	const subjectObjById = arrayToObject(addIdToEachItemOfArr(subjectList), 'name', 'id',
		{});
	const studentObjById = arrayToObject(addIdToEachItemOfArr(studentList), 'name', 'id',
		{});
	// console.debug(subjectObjById);
	// console.debug(facultyObjById);
	// console.debug(studentObjById);
	return studentSubjectFacultyAllocationList.map(({student, subject, faculty}) => ({
		studentId: studentObjById[student],
		subjectId: subjectObjById[subject],
		facultyId: faculty !== null ? facultyObjById[faculty] : null
	}));
}


export {
	getFacultyData,
    getSubjectData,
	getStudentData,
	getSubjectFacultyData,
	getStudentSubjectFacultyMappingData
};
