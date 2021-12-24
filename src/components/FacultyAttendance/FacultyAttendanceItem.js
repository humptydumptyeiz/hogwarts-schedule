import React from "react";

import {titleize} from "../../helpers";

const attendanceOptions = ['---', 'absent', 'present'];

function FacultyAttendanceItem(props){
	return (
		<div className='table-row'>
			<div className='table-cell'>
				{props.facultyName}
			</div>
			<div className='table-cell'>
				<select value={props.facultyAttendance}
				        onChange={props.handleFacultyAttendanceChange(props.facultyId)}>
					{attendanceOptions.map((op, ix) => (
						<option key={ix+1} value={op}>{titleize(op)}</option>
					))}
				</select>
			</div>
		</div>
	)
}



export default FacultyAttendanceItem;
