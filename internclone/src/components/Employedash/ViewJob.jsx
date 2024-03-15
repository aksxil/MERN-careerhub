import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import EmNavbar from '../EmNavbar';
import { asyncloademploye, fetchJobDetails, deleteJobPost, fetchStudentDetails, addShortlistedStudent } from '../../store/userActions';
import EditJobPost from './EditJobPost';

const ViewJob = () => {
    const dispatch = useDispatch();
    const { jobId } = useParams();
    const jobDetails = useSelector(state => state.user.jobDetails[jobId]);
    const [isEditing, setIsEditing] = useState(false);
    const [studentDetails, setStudentDetails] = useState({});
    const [shortlistedStudents, setShortlistedStudents] = useState([]);

    useEffect(() => {
        dispatch(asyncloademploye()); // Load employe details first
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchJobDetails(jobId));
    }, [dispatch, jobId]);
    
    const user = useSelector(state=> state.user)

    useEffect(() => {
        if (jobDetails && jobDetails.job && jobDetails.job.students) {
            Promise.all(jobDetails.job.students.map(studentId => dispatch(fetchStudentDetails(studentId))))
                .then(students => {
                    const studentData = {};
                    students.forEach((student, index) => {
                        studentData[jobDetails.job.students[index]] = student;
                    });
                    setStudentDetails(studentData);
                })
                .catch(error => {
                    console.error('Error fetching student details:', error);
                });
        }
    }, [dispatch, jobDetails]);

    useEffect(() => {
        if (jobDetails && jobDetails.job && jobDetails.job.shortlistedStudents) {
            setShortlistedStudents(jobDetails.job.shortlistedStudents);
        }
    }, [jobDetails]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this job post?")) {
            dispatch(deleteJobPost(jobId, () => {
                window.location.href = "/employe/dashboard";
                toast.success('Student Internship Deleted');
            })).catch(error => {
                console.error("Error deleting job post:", error);
            });
        }
    };

    const handleAddShortlisted = (studentId) => {
        dispatch(addShortlistedStudent(jobId, studentId)).then(() => {
            setShortlistedStudents(prevState => [...prevState, studentId]);
        }).catch(error => {
            console.error('Error adding student as shortlisted:', error);
        });
    };
    console.log(user)

    return (
        <div className='min-h-screen w-full'>
            <EmNavbar />
            {jobDetails && (
                <h2 className='text-3xl p-8 font-semibold text-center'>{jobDetails.job.title} ({jobDetails.job.jobtype})</h2>
            )}

            {jobDetails && (
                <div className='min-h-screen w-[85%] m-auto border-2 p-5'>
                    <h2 className='font-semibold'>{jobDetails.job.title}</h2>
                    <p className='mt-2'>Job-Type {jobDetails.job.jobtype}</p>
                    <p className='mt-2'>Loaction : {jobDetails.job.location}</p>
                    <p className='mt-1'><span className=' font-semibold'>Salary:</span> {jobDetails.job.salary}/month</p>
                    <p className='mt-1'><span className=' font-semibold'>Perks:</span> {jobDetails.job.perks}</p>
                    <p className='mt-1'><span className='font-semibold'>Skills:</span> <span className='text-sky-500'>{jobDetails.job.skills}</span></p>
                    <p className='mt-1'><span className='text-sky-500 font-semibold'>Openings:</span> {jobDetails.job.openings}</p>
                    <p className='mt-5'><span className=' font-semibold'>Preferences:</span> {jobDetails.job.preferences}</p>
                    <p className='mt-5'><span className=' font-semibold'>Responsibility:</span> {jobDetails.job.responsibility}</p>
                    <p className='mt-5'><span className=' font-semibold'>Description:</span> {jobDetails.job.description}</p>
                    <p className='mt-5'><span className=' font-semibold'>Assesments:</span> {jobDetails.job.assesments}</p>

                    {/* Button to edit internship */}
                    <button onClick={handleEditClick} className='bg-blue-500 text-white py-2 px-4 rounded-md mt-5 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                        Edit Internship
                    </button>

                    {/* Button to delete internship */}
                    <button onClick={handleDeleteClick} className='bg-red-500 text-white py-2 px-4 rounded-md mt-3 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'>
                        Delete Internship
                    </button>
                    <h3 className="text-xl mt-5">Students Applied:</h3>
                    <ul>
                        {jobDetails.job.students.map(studentId => (
                            <li key={studentId}>
                                <div className='flex items-center gap-20 mt-3'>
                                    <p><Link to={`/viewJobApplicant/${studentId}`}>{studentDetails[studentId]?.firstname} {studentDetails[studentId]?.lastname} <span className='text-sky-500 font-semibold'>View Profile</span></Link></p>
                                    <button
                                        onClick={() => handleAddShortlisted(studentId)}
                                        disabled={shortlistedStudents.includes(studentId)}
                                        className={`px-2 py-2 rounded-md ${shortlistedStudents.includes(studentId) ? 'bg-green-500 text-white' : 'bg-sky-500 text-white'
                                            }`}
                                    >
                                        {shortlistedStudents.includes(studentId) ? 'Already Shortlisted' : 'Add Shortlisted'}
                                    </button>

                                    {/* Add more student details */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isEditing && <EditJobPost onClose={handleCloseEdit} />}
        </div>
    );
};

export default ViewJob;
