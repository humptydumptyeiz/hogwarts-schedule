import React from "react";

import StudentScheduleItem from './StudentScheduleItem';

function StudentScheduleList(props){
	
	const {faculty, subjects, students, studentSubjectFacultyMapping, subjectFacultyHierarchy, presentFaculty} =  props;
	
	const studentScheduleItems = studentSubjectFacultyMapping.map((row, ix) => {
		const {studentId, subjectId, facultyId} = row;
		return (
			<StudentScheduleItem
				key={ix + 1}
				studentName={students[studentId]}
				subjectName={subjects[subjectId]}
				facultyObj={faculty}
				facultyId={facultyId}
				subjectFacultyHierarchyObj={subjectFacultyHierarchy[subjectId][facultyId]}
				presentFaculty={presentFaculty}
			/>
		)
	});
	
	return (
		<div className='container-column'>
			<span className='pageTitle'>
							<h2>
								Current Schedule
							</h2>
						</span>
			<div className='table'>
				<div className='table-row'>
					<div className='table-cell'>
						<label>
							Student
						</label>
					</div>
					<div className='table-cell'>
						<label>
							Subject
						</label>
					</div>
					<div className='table-cell'>
						<label>
							Teacher
						</label>
					</div>
				</div>
				{ studentScheduleItems }
			</div>
		</div>
		
	)
}


export default StudentScheduleList;
