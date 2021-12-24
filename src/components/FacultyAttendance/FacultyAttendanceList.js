import React from "react";

import FacultyAttendanceItem from './FacultyAttendanceItem'

function FacultyAttendanceList(props){
	return (
		<div className='container-column'>
			<span className='pageTitle'>
							<h2>
								Attendance
							</h2>
						</span>
			<div className='table'>
				<div className='table-row'>
					<div className='table-cell'>
						<label>
							Teacher
						</label>
					</div>
					<div className='table-cell'>
						<label>
							Attendance
						</label>
					</div>
				</div>
				{
					Object.keys(props.faculty)
						.map((facId, ix) => (
							<FacultyAttendanceItem
								key={ix + 1}
								facultyName={props.faculty[facId]}
								facultyId={facId}
								facultyAttendance={props.presentFaculty.has(Number(facId)) ? 'present' : 'absent'}
								handleFacultyAttendanceChange={props.handleFacultyAttendanceChange}/>)
						)
				}
			</div>
		</div>
		
		
	)
}

export default  FacultyAttendanceList;
