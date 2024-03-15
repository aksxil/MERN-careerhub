import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../JobCard';
import InternCard from '../InternCard';
import { asyncloaduser, fetchRandomInternships, fetchRandomJobs } from '../../store/userActions';

const FilteredJobsAndInternships = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const randomJobs = useSelector(state => state.user.randomJobs);
    const randomInternships = useSelector(state => state.user.randomInternships);

    useEffect(() => {
        dispatch(asyncloaduser());
        dispatch(fetchRandomJobs());
        dispatch(fetchRandomInternships());
    }, [dispatch]);

    const filterItems = (items) => {
        if (!items || !items.data) return [];
        return items.data.filter(item => {
            const locationMatches = !locationFilter || locationFilter === '' ||
                (item.jobtype && item.jobtype.toLowerCase() === locationFilter.toLowerCase()) ||
                (item.internshiptype && item.internshiptype.toLowerCase() === locationFilter.toLowerCase());
            const searchMatches = !searchQuery || searchQuery === '' ||
                (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
            return locationMatches && searchMatches;
        });
    };

    const filteredJobs = filterItems(randomJobs);
    const filteredInternships = filterItems(randomInternships);

    if (!randomJobs || !randomInternships) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='min-h-[60vh] overflow-hidden w-full bg-sky-100 flex flex-col  items-center p-5'>
                {/* <h1 className='text-3xl font-semibold'>Recommended for you</h1>
                <h2 className='mt-1 text-xl'>as per your <span className='text-sky-600 font-semibold'>preferences</span></h2> */}

                {/* Search input */}
                <input className='p-2 m-3 w-[70vh] rounded-md' type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search jobs and internships" />

                {/* Location filter */}
                <select
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                    className="p-2 m-3 rounded-md bg-white shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                >
                    <option value="">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="in office">In Office</option>
                </select>


                {/* Display filtered and searched jobs */}
                <div className='min-h-[60vh] w-full bg-sky-100 flex items-center p-10 gap-10'>
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>

                <h2>Filtered Internships</h2>
                {/* Display filtered and searched internships */}
                <div className='min-h-[60vh] w-full bg-sky-100 flex items-center p-10 gap-10'>
                    {filteredInternships.map(internship => (
                        <InternCard key={internship.id} internship={internship} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilteredJobsAndInternships;
