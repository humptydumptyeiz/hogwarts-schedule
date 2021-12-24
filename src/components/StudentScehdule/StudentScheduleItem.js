import React, {useState, useEffect} from "react";

function StudentScheduleItem(props) {
	const {
		studentName, subjectName, facultyObj,
		facultyId, subjectFacultyHierarchyObj, presentFaculty
	} = props;
	
	const [facultyNameState, setFacultyNameState] = useState('None Available');
	
	
	useEffect(() => {
		if(facultyId !== null && presentFaculty.has(facultyId)){
			setFacultyNameState(facultyObj[facultyId]);
		} else {
			for(let facId of subjectFacultyHierarchyObj){
				if(facId === null){
					continue;
				}
				if(presentFaculty.has(facId)){
					setFacultyNameState(facultyObj[facId]);
					break;
				}
			}
		}
	}, [presentFaculty])
	
	return (
		<div className='table-row'>
			<div className='table-cell'>
				{studentName}
			</div>
			<div className='table-cell'>
				{subjectName}
			</div>
			<div className='table-cell'>
				{facultyNameState}
			</div>
		</div>
	)
}

export default StudentScheduleItem;
