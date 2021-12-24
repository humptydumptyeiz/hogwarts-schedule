import React, {useState, useEffect, Suspense} from "react";

import './App.css';
import FacultyAttendanceList from './components/FacultyAttendance/FacultyAttendanceList'
import StudentScheduleList from "./components/StudentScehdule/StudentScheduleList";
import ErrorBoundary from "./components/ErrorBoundaries/ErrorBoundary";
// import {useWindowUnloadEffect} from "./customHooks/useBeforeUnload";
import {
	getFacultyDataAPI,
	getStudentDataAPI,
	getSubjectDataAPI,
	getSubjectFacultyDataAPI,
	getStudentSubjectFacultyMappingDataAPI
} from './dataAPI/dataAPI';


function App() {
	const [facultyState, setFacultyState] = useState({});
	const [subjectState, setSubjectState] = useState({});
	const [allSubjectState, setAllSubjectState] = useState(null);
	const [studentState, setStudentState] = useState({});
	const [primaryDataFetchedState, setPrimaryDataFetchedState] = useState(false);
	const [subjectFacultyHierarchyState, setSubjectFacultyHierarchyState] = useState({});
	const [studentSubjectFacultyMappingState, setStudentSubjectFacultyMappingState] = useState([]);
	const [presentFacultyState, setPresentFacultySet] = useState(new Set());
	
	// useWindowUnloadEffect(e => {
	// 	// e.preventDefault();
	// 	// e.returnValue = '';
	// });
	
	useEffect(() => {
		const getData = async () => {
			await Promise.all([getFacultyDataAPI(), getSubjectDataAPI(), getStudentDataAPI()])
				.then(([facultyDataResp, subjectDataResp, studentDataResp]) => {
					setFacultyState(facultyDataResp);
					setSubjectState(subjectDataResp);
					setStudentState(studentDataResp);
					const allSubId = Object.keys(subjectDataResp).filter(id => subjectDataResp[id] === 'All');
					if(allSubId.length){
						setAllSubjectState(allSubId[0]);
					}
					setPrimaryDataFetchedState(true);
				})
		};
		getData();
	}, []);
	
	useEffect( () => {
		const getData = async () => {
			await Promise.all([getSubjectFacultyDataAPI(), getStudentSubjectFacultyMappingDataAPI()])
				.then(([subjectFacultyResp, studentSubjectFacultyMappingResp]) => {
					setSubjectFacultyHierarchyState(getSubjectFacultyHierarchy(subjectFacultyResp, allSubjectState));
					setStudentSubjectFacultyMappingState(studentSubjectFacultyMappingResp);
				});
		};
		getData();
	}, [primaryDataFetchedState]);
	
	const handleFacultyAttendanceChange = facultyId => e => {
		facultyId = Number(facultyId);
		const presentFacultySet = new Set(presentFacultyState)
		switch (e.target.value) {
			case '---':
			case 'absent':
				setPresentFacultySet(
					new Set(
						(presentFacultySet.delete(facultyId) && false) || presentFacultySet
					)
				);
				break;
			case 'present':
				setPresentFacultySet(
					new Set(
						(presentFacultySet.add(facultyId) && false) || presentFacultySet
					)
				);
				break;
			default:
		}
	}
	
	
	return (
		<div className='container-column'>
			<span className='pageTitle'>
				<h1>Schedule Today</h1>
			</span>
			<div className='container-row'>
				<Suspense fallback={<h1>Loading Faculty List</h1>}>
					<ErrorBoundary>
						<FacultyAttendanceList
							faculty={facultyState}
							presentFaculty={presentFacultyState}
							handleFacultyAttendanceChange={handleFacultyAttendanceChange}
						/>
					</ErrorBoundary>
				</Suspense>
				<Suspense fallback={<h1>Loading Student Schedule</h1>}>
					<ErrorBoundary>
						<StudentScheduleList
							faculty={facultyState}
							subjects={subjectState}
							students={studentState}
							studentSubjectFacultyMapping={studentSubjectFacultyMappingState}
							subjectFacultyHierarchy={subjectFacultyHierarchyState}
							presentFaculty={presentFacultyState}
						/>
					</ErrorBoundary>
				</Suspense></div>
		</div>

);
			



}

function getSubjectFacultyHierarchy(subjectFacultyMapping, subjectAllId){
	const subjectFacultyObj = {};
	const subjectStandbyFaculty = {};
	const subjectAllFacultyObj = subjectAllId !== null ? {} : null;
	
	for(let obj of subjectFacultyMapping){
		
		const {subjectId, facultyId, parentFacultyId, isStandby} = obj;
		
		if(subjectAllId && Number(subjectId) === Number(subjectAllId)){
			subjectAllFacultyObj[facultyId] = parentFacultyId;
			continue;
		}
		
		if(isStandby){
			if(subjectStandbyFaculty[subjectId] === undefined){
				subjectStandbyFaculty[subjectId] = {};
			}
			subjectStandbyFaculty[subjectId][facultyId] = parentFacultyId;
			continue;
		}
		
		if(subjectFacultyObj[subjectId] === undefined){
			subjectFacultyObj[subjectId] = {};
		}
		subjectFacultyObj[subjectId][facultyId] = parentFacultyId;
	}
	
	const subjectFacultyHierarchy = {};
	
	for(let subjectId of Object.keys(subjectFacultyObj)){
		if(subjectFacultyHierarchy[subjectId] === undefined){
			subjectFacultyHierarchy[subjectId] = {};
		}
		for(let facultyId of Object.keys(subjectFacultyObj[subjectId])){
			if(subjectFacultyHierarchy[subjectId][facultyId] === undefined){
				subjectFacultyHierarchy[subjectId][facultyId] = [];
			}
			let nextParent = subjectFacultyObj[subjectId][facultyId];
			while(nextParent !== null){
				subjectFacultyHierarchy[subjectId][facultyId].push(nextParent);
				console.log(`subjectId ${subjectId} nextParent ${nextParent}
					subjectStandbyFaculty[${subjectId}][${nextParent}] ${subjectStandbyFaculty[subjectId][nextParent]}`);
				if(subjectStandbyFaculty[subjectId][nextParent] !== undefined){
					nextParent = subjectStandbyFaculty[subjectId][nextParent];
				} else {
					nextParent = subjectAllFacultyObj[nextParent];
				}
			}
		}
		
		subjectFacultyHierarchy[subjectId][null] = Object.values(
			Object.values(subjectFacultyHierarchy[subjectId])[0]);
		
	}
	return subjectFacultyHierarchy;
}

export default App;
