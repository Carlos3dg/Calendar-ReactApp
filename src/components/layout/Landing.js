import React from 'react';
import isoCalendar from '../../img/Landing/isometric-calendar.jpg';
import {Link} from 'react-router-dom';

const Landing = () => (
    <div className='landing-container'>
        <div className='landing-entry-text-container'>
            <div className='landing-text-subcontainer'>
                <h1>Calendar Schedule</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate hic explicabo autem magni cum eum!</p>
                <Link className='button landing-entry-button' to='/login'>
                    Get started
                </Link>
            </div>
        </div>
        <div className='isometric-landing-container'>
            <img src={isoCalendar} alt="Isometric Calendar Image" className='isometric-landing-image'/>
        </div>
    </div>
);

export default Landing;