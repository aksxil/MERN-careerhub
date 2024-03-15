import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addAccom, asyncloaduser, deleteAccom, deleteEducation, deleteInternship, deleteJob, deleteProject, deleteRespo, deleteSkill, deleteTraining } from '../../store/userActions';
import UpdateForm from '../UpdateForm';
import AddEducationForm from './AddEducationForm';
import EditGrad from './EditGrad';
import AddInternship from './AddInternship';
import AddJob from './AddJob';
import EditJob from './EditJob';
import EditInternship from './EditInternship';
import AddRespo from './AddRespo'
import EditRespo from './EditRespo';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import AddProject from './AddProject';
import EditProject from './EditProject'
import AddSkills from './AddSkills';
import EditSkills from './EditSkills';
import AddPortfolio from './AddPortfolio';
import EditPortfolio from './EditPortfolio';
import AddAcom from './AddAcom'
import EditAcom from './EditAcom';


const MyResume = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(asyncloaduser());

  // }, [dispatch]);


  const [editIndex, setEditIndex] = useState(null);
  const [editJobIndex, setEditJobIndex] = useState(null);
  const [editInternshipIndex, setEditInternshipIndex] = useState(null);
  const [editRespoIndex, setEditRespoIndex] = useState(null);
  const [editTrainingIndex, setEditTrainingIndex] = useState(null);
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [editSkillIndex, setEditSkillIndex] = useState(null);
  const [editPortfolioIndex, setEditPortfolioIndex] = useState(null);
  const [editAccomIndex, setEditAccomIndex] = useState(null);


  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedRespo, setselectedRespo] = useState(null)
  const [selectedTraining, setselectedTraining] = useState(null)
  const [selectedProject, setselectedProject] = useState(null)
  const [selectedSkill, setselectedSkill] = useState(null)
  const [selectedPortfolio, setselectedPortfolio] = useState(null)
  const [selectedAccom, setselectedAccom] = useState(null)

  const [isFormVisible, setFormVisible] = useState(false);
  const [isAddEducationFormVisible, setAddEducationFormVisible] = useState(false);
  const [isAddJobFormVisible, setAddJobFormVisible] = useState(false);
  const [isAddInternshipFormVisible, setAddInternshipFormVisible] = useState(false);
  const [isAddRespoVisible, setAddRespoVisible] = useState(false);
  const [isAddTrainingVisible, setAddTrainingVisible] = useState(false);
  const [isAddProjectVisible, setAddProjectVisible] = useState(false);
  const [isAddSkillVisible, setAddSkillVisible] = useState(false);
  const [isAddPortfolioVisible, setAddPortfolioVisible] = useState(false);
  const [isAddAccomVisible, setAddAccomVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await dispatch(asyncloaduser());
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleAddEducationFormVisibility = () => {
    setAddEducationFormVisible(!isAddEducationFormVisible);
  };

  const toggleAddJobFormVisibility = () => {
    setAddJobFormVisible(!isAddJobFormVisible);
  };

  const toggleAddInternshipFormVisibility = () => {
    setAddInternshipFormVisible(!isAddInternshipFormVisible);
  };

  const toggleAddRespoVisibility = () => {
    setAddRespoVisible(!isAddRespoVisible);
  };
  const toggleAddTrainingVisibility = () => {
    setAddTrainingVisible(!isAddTrainingVisible);
  };
  const toggleAddProjectVisibility = () => {
    setAddProjectVisible(!isAddProjectVisible);
  };
  const toggleAddSkillVisibility = () => {
    setAddSkillVisible(!isAddSkillVisible);
  };
  const toggleAddPortfolioVisibility = () => {
    setAddPortfolioVisible(!isAddPortfolioVisible);
  };
  const toggleAddAccomVisibility = () => {
    setAddAccomVisible(!isAddAccomVisible);
  };

  const handleDelete = (educationId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this education?');
    if (confirmDelete) {
      dispatch(deleteEducation(educationId));
      toast.success('Education deleted successfully');
      toast.error("Error to Delete")
    }
  };
  const handleDeleteJob = (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Job?');
    if (confirmDelete) {
      dispatch(deleteJob(jobId));
      toast.success('Job deleted successfully');
      toast.error("Error to Delete")
    
    }
  };
  const handleDeleteInternship = (internshipId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Internship?');
    if (confirmDelete) {
      dispatch(deleteInternship(internshipId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };
  const handleDeleteRespo = (respoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Respo?');
    if (confirmDelete) {
      console.log(respoId)
      dispatch(deleteRespo(respoId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };
  const handleDeleteTraining = (trainingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Training or Course?');
    if (confirmDelete) {
      console.log(trainingId)
      dispatch(deleteTraining(trainingId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };
  const handleDeleteProject = (projectId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Training or Project?');
    if (confirmDelete) {
      console.log(projectId)
      dispatch(deleteProject(projectId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };

  const handleDeleteSkill = (skillId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Skill?');
    if (confirmDelete) {
      dispatch(deleteSkill(skillId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };
  const handleDeleteAccom = (accomId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Accom?');
    if (confirmDelete) {
      dispatch(deleteAccom(accomId));
      toast.success('deleted successfully');
      toast.error("Error to Delete")
    }
  };

  const handleEdit = (education, index) => {
    setEditIndex(index);
    setSelectedEducation(education);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setSelectedEducation(null);
  };
  const handleEditJob = (Job, index) => {
    setEditJobIndex(index);
    setSelectedJob(Job);
  };

  const handleCancelJob = () => {
    setEditJobIndex(null);
    setSelectedJob(null);
  };
  ///////////////////////////////////

  const handleEditInternship = (internship, index) => {
    setEditInternshipIndex(index);
    setSelectedInternship(internship);
  };

  const handleCancelInternship = () => {
    setEditInternshipIndex(null);
    setSelectedInternship(null);
  };

  //////////////////////////
  const handleEditRespo = (respo, index) => {
    setEditRespoIndex(index);
    setselectedRespo(respo);
  };
  const handleCancelRespo = () => {
    setEditRespoIndex(null);
    setselectedRespo(null)
  }
  /////////////////////////
  const handleEditTraining = (Training, index) => {
    setEditTrainingIndex(index);
    setselectedTraining(Training);
  };
  const handleCancelTraining = () => {
    setEditTrainingIndex(null);
    setselectedTraining(null)
  }
  ////////////////////////////

  const handleEditProject = (project, index) => {
    setEditProjectIndex(index);
    setselectedProject(project);
  };
  const handleCancelProject = () => {
    setEditProjectIndex(null);
    setselectedProject(null)
  }

  ////////////////////////////////
  const handleEditSkill = (skill, index) => {
    setEditSkillIndex(index);
    setselectedSkill(skill);
  };
  const handleCancelSkill = () => {
    setEditSkillIndex(null);
    setselectedSkill(null)
  }
  /////////////////////////////
  const handleEditPortfolio = (portfolio, index) => {
    setEditPortfolioIndex(index);
    setselectedPortfolio(portfolio);
  };

  // Function to cancel editing portfolio
  const handleCancelEditPortfolio = () => {
    setEditPortfolioIndex(null);
    setselectedPortfolio(null);
  };
  ///////////////////////////////////////////
  const handleEditAccom = (accom, index) => {
    setEditAccomIndex(index);
    setselectedAccom(accom);
  };
  const handleCancelAccom = () => {
    setEditAccomIndex(null);
    setselectedAccom(null)
  }




  return (
    <div className='w-full min-h-[100vh] bg-zinc-100 overflow-hidden'>
      <Navbar />
      <h1 className='text-center text-3xl p-10 font-semibold'>Resume</h1>
      <div className='Formdiv min-h-[100vh] border-2 w-[80%] m-auto p-10'>
        <div className='personal  border-b-2 pb-2'>
          <h1 className='text-3xl font-semibold mb-2'>
            {user.user && user.user.firstname} {user.user && user.user.lastname}{' '}
            <i
              className='ri-pencil-line text-3xl opacity-60 mb-10 cursor-pointer'
              onClick={toggleFormVisibility}
            ></i>
          </h1>
          <h4>{user.user && user.user.email}</h4>
          <h4>+91 {user.user && user.user.contact}</h4>
          <h4>{user.user && user.user.city}</h4>
        </div>
        {isFormVisible && <UpdateForm onClose={toggleFormVisibility} />}
        <div className='edu border-b-2 py-4 flex'>
          <h3 className=''>EDUCATION</h3>
          <div className='w-full ml-[30vh] '>
            {user.user &&
              user.user.resume &&
              user.user.resume.education.map((education, index) => (
                <div key={index} className='education-item mb-4'>
                  {editIndex === index ? (
                    <div className='edit-form'>
                      <EditGrad onClose={handleCancelEdit} educationData={selectedEducation} type={selectedEducation.type} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{education.degree || education.type}, {education.stream || education.board}</h2>
                      <p>{education.college || education.school}</p>
                      <p>{education.startYear} - {education.endYear} {education.yearofcompl}</p>
                      <p>CGPA: {education.percentage}</p>
                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDelete(education.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEdit(education, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              onClick={toggleAddEducationFormVisibility}
              className='text-sky-500 font-semibold'
            >
              <i className='ri-add-fill'></i> Add Education
            </button>
          </div>
        </div>
        {isAddEducationFormVisible && (
          <div className='add-education-form min-h-[70vh] w-[79vw] fixed top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <AddEducationForm onClose={toggleAddEducationFormVisibility} />
          </div>
        )}
        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>WORK EXPERIENCE</h3>
          <div className='w-full ml-[30vh] '>
            {user.user &&
              user.user.resume &&
              user.user.resume.jobs.map((job, index) => (
                <div key={index} className='education-item mb-4'>
                  {editJobIndex === index ? (
                    <div className='edit-form'>
                      <EditJob onClose={handleCancelJob} jobData={selectedJob} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{job.profile || job.type} {job.stream || job.board}</h2>
                      <p className='mt-1'>{job.organization}, {job.location}</p>
                      <p className='mt-1'>{job.description}</p>
                      <p className='mt-1'>{job.type}  ({job.startDate} - {job.endDate})</p>
                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditJob(job, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            {user.user &&
              user.user.resume &&
              user.user.resume.internships.map((internship, index) => (
                <div key={index} className='education-item mb-4'>
                  {editInternshipIndex === index ? (
                    <div className='edit-form'>
                      <EditInternship onClose={handleCancelInternship} internshipData={selectedInternship} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{internship.profile || internship.type} {internship.stream || internship.board}</h2>
                      <p className='mt-1'>{internship.organization}, {internship.location}</p>
                      <p className='mt-1'>{internship.type}  ({internship.startDate} - {internship.endDate})</p>
                      <p className='mt-1'>{internship.description}</p>
                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteInternship(internship.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditInternship(internship, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddJobFormVisibility}
            >
              <i className="ri-add-fill"></i> Add Job
            </button>
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddInternshipFormVisibility}
            >
              <i className="ri-add-fill"></i> Add Internship
            </button>
          </div>



        </div>
        {/* Add WORK EXPERIENCE form or logic here */}
        {isAddInternshipFormVisible && (
          <div className='add-internship-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddInternship onClose={toggleAddInternshipFormVisibility} />
          </div>
        )}
        {isAddJobFormVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddJob onClose={toggleAddJobFormVisibility} />
          </div>
        )}
        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>POSITIONS OF RESPONSIBILITY</h3>
          <div className='w-full ml-[20vh]'>
            {user.user &&
              user.user.resume &&
              user.user.resume.responsibilities.map((respo, index) => (
                <div key={index} className='education-item mb-4'>
                  {editRespoIndex === index ? (
                    <div className='edit-form'>
                      <EditRespo onClose={handleCancelRespo} respoData={selectedRespo} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{respo.description}</h2>
                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteRespo(respo.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditRespo(respo, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddRespoVisibility}
            >
              <i className="ri-add-fill"></i> Add position of responsibility
            </button>
          </div>
        </div>
        {/* Add POSITIONS OF RESPONSIBILITY form or logic here */}
        {isAddRespoVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddRespo onClose={toggleAddRespoVisibility} />
          </div>
        )}


        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>TRAININGS/ COURSES</h3>
          <div className='w-full ml-[27vh]'>
            {user.user &&
              user.user.resume &&
              user.user.resume.courses.map((course, index) => (
                <div key={index} className='education-item mb-4'>
                  {editTrainingIndex === index ? (
                    <div className='edit-form'>
                      <EditTraining onClose={handleCancelTraining} trainingData={selectedTraining} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{course.program}</h2>
                      <p className='mt-1'>
                        {course.organization}, {course.locationType === "Location" ? course.location : course.locationType}
                      </p>
                      <p className=''>({course.startDate}) - ({course.endDate})</p>
                      <p>{course.description}</p>

                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteTraining(course.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditTraining(course, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddTrainingVisibility}
            >
              <i className="ri-add-fill"></i> Add Training
            </button>
          </div>
        </div>
        {/* Add TRAININGS/ COURSES form or logic here */}
        {isAddTrainingVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddTraining onClose={toggleAddTrainingVisibility} />
          </div>
        )}

        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>PROJECTS</h3>
          <div className='w-full ml-[34vh]'>
            {user.user &&
              user.user.resume &&
              user.user.resume.projects.map((project, index) => (
                <div key={index} className='education-item mb-4'>
                  {editProjectIndex === index ? (
                    <div className='edit-form'>
                      <EditProject onClose={handleCancelProject} projectData={selectedProject} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{project.title}</h2>

                      <p className=''>({project.startDate}) - ({project.present === true ? 'Present' : project.endDate})</p>
                      {project.projectLink && (
                        <p className='text-blue-800'>
                          <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a>
                        </p>
                      )}
                      <p>{project.description}</p>

                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditProject(project, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddProjectVisibility}
            >
              <i className="ri-add-fill"></i> Add Project
            </button>
          </div>
        </div>
        {/* Add PROJECTS form or logic here */}
        {isAddProjectVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddProject onClose={toggleAddProjectVisibility} />
          </div>
        )}

        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>SKILLS</h3>
          <div className='w-full ml-[38vh]'>
            {user.user &&
              user.user.resume &&
              user.user.resume.skills.map((skill, index) => (
                <div key={index} className='education-item mb-4'>
                  {editSkillIndex === index ? (
                    <div className='edit-form'>
                      <EditSkills onClose={handleCancelSkill} skillData={selectedSkill} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{skill.skillName}</h2>
                      <p>{skill.proficiency}</p>

                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditSkill(skill, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddSkillVisibility}
            >
              <i className="ri-add-fill"></i> Add Skills
            </button>
          </div>
        </div>
        {/* Add SKILLS form or logic here */}
        {isAddSkillVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddSkills onClose={toggleAddSkillVisibility} />
          </div>
        )}
        <div className='edu border-b-2 py-4 flex'>
          <h3 className=''>Portfolios / Work Samples</h3>
          <div className='w-full ml-[38vh]'>
            {user.user && user.user.resume && user.user.resume.portfolio ? (
              <div className='education-item mb-4'>
                <h2 className='font-semibold'>Portfolio</h2>
                {/* Iterate over portfolio items and render them */}
                {user.user.resume.portfolio.blogLink && (
                  <p>
                    Blog Link:{" "}
                    <a className='text-blue-600' href={user.user.resume.portfolio.blogLink}>
                      {user.user.resume.portfolio.blogLink}
                    </a>
                  </p>
                )}
                {user.user.resume.portfolio.githubProfile && (
                  <p>
                    GitHub Profile:{" "}
                    <a className='text-blue-600' href={user.user.resume.portfolio.githubProfile}>
                      {user.user.resume.portfolio.githubProfile}
                    </a>
                  </p>
                )}
                {user.user.resume.portfolio.playStoreDevAccount && (
                  <p>
                    Play Store Developer Account:{" "}
                    <a className='text-blue-600' href={user.user.resume.portfolio.playStoreDevAccount}>
                      {user.user.resume.portfolio.playStoreDevAccount}
                    </a>
                  </p>
                )}
                {user.user.resume.portfolio.behancePortfolio && (
                  <p>
                    Behance Portfolio:{" "}
                    <a className='text-blue-600' href={user.user.resume.portfolio.behancePortfolio}>
                      {user.user.resume.portfolio.behancePortfolio}
                    </a>
                  </p>
                )}
                {user.user.resume.portfolio.otherWorkSample && (
                  <p>
                    Other Work Sample:{" "}
                    <a className='text-blue-600' href={user.user.resume.portfolio.otherWorkSample}>
                      {user.user.resume.portfolio.otherWorkSample}
                    </a>
                  </p>
                )}
                {editPortfolioIndex !== null && (
                <EditPortfolio portfolioData={user.user.resume.portfolio} onClose={() => setEditPortfolioIndex(null)} />
              )}
                <button
                  className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                  onClick={() => handleEditPortfolio(user.user.resume.portfolio, 0)}
                >
                  Add Portfolio Links
                </button>
              </div>
            ) : (
              <button
                className='text-sky-500 font-semibold'
                onClick={toggleAddPortfolioVisibility}
              >
                <i className="ri-add-fill"></i> Add Portfolio / Work Samples
              </button>
            )}
          </div>
        </div>
        {/* -------------------------------------- */}
        {isAddPortfolioVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddPortfolio onClose={toggleAddPortfolioVisibility} />
          </div>
        )}
        <div className='edu  border-b-2 py-4 flex'>
          <h3 className=''>ACCOMPLISHMENTS</h3>
          <div className='w-full ml-[38vh]'>
            {user.user &&
              user.user.resume &&
              user.user.resume.accomplishments.map((accomplishment, index) => (
                <div key={index} className='education-item mb-4'>
                  {editAccomIndex === index ? (
                    <div className='edit-form'>
                      <EditAcom onClose={handleCancelAccom} accomData={selectedAccom} />
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold'>{accomplishment.accom}</h2>
                      {/* <p>{skill.proficiency}</p> */}

                      <button
                        className='px-4 mt-4 py-1 rounded-md mr-4 text-white bg-red-400'
                        onClick={() => handleDeleteAccom(accomplishment.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-1 rounded-md mr-4 text-white bg-sky-400'
                        onClick={() => handleEditAccom(accomplishment, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            <button
              className='text-sky-500 font-semibold'
              onClick={toggleAddAccomVisibility}
            >
              <i className="ri-add-fill"></i> Add Accom
            </button>
          </div>
        </div>
        {/*--------------------*/}
        {isAddAccomVisible && (
          <div className='add-job-form min-h-[70vh] w-[79vw] fixed top-[5%] left-[10%]'>
            <AddAcom onClose={toggleAddAccomVisibility} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResume;
