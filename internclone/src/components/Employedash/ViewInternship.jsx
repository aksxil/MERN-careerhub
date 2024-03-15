import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import EmNavbar from '../EmNavbar';
import { asyncloademploye, fetchInternshipDetails, deleteInternshipPost, fetchStudentDetails, addShortlistedStudentInternship } from '../../store/userActions'; // Import fetchInternshipDetails and deleteInternship actions
import EditInternshipPost from './EditInternshipPost';

const ViewInternship = () => {
    const dispatch = useDispatch();
    const { internshipId } = useParams(); // Get the internshipId parameter from the route
    const internshipDetails = useSelector(state => state.user.internshipDetails[internshipId]);
    const [isEditing, setIsEditing] = useState(false); // State to control edit form visibility
    const [studentDetails, setStudentDetails] = useState({});
    const [shortlistedStudents, setShortlistedStudents] = useState([]);

    useEffect(() => {
        // Fetch internship details when component mounts
        dispatch(asyncloademploye());
        dispatch(fetchInternshipDetails(internshipId)); // Dispatch fetchInternshipDetails action
    }, [dispatch, internshipId]);


    useEffect(() => {
        if (internshipDetails && internshipDetails.students) {
            internshipDetails.students.forEach(studentId => {
                dispatch(fetchStudentDetails(studentId))
                    .then(student => {
                        if (student) {
                            setStudentDetails(prevState => ({
                                ...prevState,
                                [studentId]: student
                            }));
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching student details:', error);
                    });
            });
        }
    }, [dispatch, internshipDetails,]);

    useEffect(() => {
        if (internshipDetails && internshipDetails.shortlistedStudents) {
            setShortlistedStudents(internshipDetails.shortlistedStudents);
        }
    }, [internshipDetails]);
    

    // Function to handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Function to handle close button click in EditJobPost component
    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    // Function to handle delete button click
    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this internship?")) {
            dispatch(deleteInternshipPost(internshipId, () => {
                // Navigate to employe dashboard after deleting internship
                toast.success('Student Internship Deleted');
                window.location.href = "/employe/dashboard";
               
            })).catch(error => {
                console.error("Error deleting internship:", error);
            });
        }
    };
    const handleAddShortlisted = (studentId) => {
        dispatch(addShortlistedStudentInternship(internshipId, studentId)).then(() => {
            setShortlistedStudents(prevState => [...prevState, studentId]);
            toast.success('Student Shortlisted');
        }).catch(error => {
            console.error('Error adding student as shortlisted:', error);
        });
    };

    return (
        <div className='min-h-screen w-full'>
            <EmNavbar />
            {internshipDetails && (
                <h2 className='text-3xl p-8 font-semibold text-center'>{internshipDetails.profile} ({internshipDetails.internshiptype})</h2>
            )}

            {internshipDetails && (
                <div className='min-h-screen w-[85%] m-auto border-2 p-5'>
                    <h2 className='font-semibold'>{internshipDetails.profile}</h2>
                    <p className='mt-2'>Internship Type: {internshipDetails.internshiptype}</p>
                    <p className='mt-2'>Location: {internshipDetails.location}</p>
                    {/* Display other internship details here as needed */}
                    <p className='mt-1'><span className=' font-semibold'>Salary:</span> {internshipDetails.stipend.amount}/month</p>
                    <p className='mt-1'><span className=' font-semibold'>Perks:</span> {internshipDetails.perks}</p>
                    <p className='mt-1'><span className='font-semibold'>Skills:</span> <span className='text-sky-500'>{internshipDetails.skill}</span></p>
                    <p className='mt-1'><span className='text-sky-500 font-semibold'>Openings:</span> {internshipDetails.openings}</p>
                    <p className='mt-1'><span className=' font-semibold'>Duration: </span>{internshipDetails.duration}</p>
                    <p className='mt-5'><span className=' font-semibold'>Preferences:</span> {internshipDetails.preferences}</p>
                    <p className='mt-5'><span className=' font-semibold'>Responsibility:</span> {internshipDetails.responsibility}</p>
                    {/* <p className='mt-5'><span className=' font-semibold'>Description:</span> {internshipDetails.description}</p> */}
                    <p className='mt-5'><span className=' font-semibold'>Assesments:</span> {internshipDetails.assesments}</p>

                    {/* Button to edit internship */}
                    <button onClick={handleEditClick} className='bg-blue-500 text-white py-2 px-4 rounded-md mt-5 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                        Edit Internship
                    </button>

                    {/* Button to delete internship */}
                    <button onClick={handleDeleteClick} className='bg-red-500 text-white py-2 px-4 rounded-md mt-3 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'>
                        Delete Internship
                    </button>
                    <h3 className="text-xl mt-5">Students Applied:</h3>
                    {internshipDetails.students && (
                        <ul>
                            {internshipDetails.students.map((studentId, index) => {
                                const student = studentDetails[studentId];
                                return (
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
                                );
                            })}
                        </ul>
                    )}

                </div>
            )}

            {/* Conditionally render EditInternship component based on isEditing state */}
            {isEditing && <EditInternshipPost onClose={handleCloseEdit} />}
        </div>
    );
};

export default ViewInternship;
