import {useState} from 'react';
import {Link, useParams, Navigate} from 'react-router-dom';
import Perks from '../Perks.jsx';
import PhotosUploader from '../PhotosUploaded.jsx'

const PlacesPage = () => {

    const {action} = useParams();

    const [title, setTitle] = useState('');
    const [addedPhotos, setAddedPhotos] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setmaxGuests] = useState(1);
    const [redirect, setRedirect] = useState('');

    const generateLabel = (text) => {
        return <h2 className='text-2xl mt-4'>{text}</h2>
    };

    const generateFieldDescription = (text) => {
        return <p className='text-gray-500 text-sm'>{text}</p>
    };

    const preInputText = (header, description) => {
        return(
            <>
                {generateLabel(header)}
                {generateFieldDescription(description)}
            </>
        )
    };

    const getPlacesObject = () => {
        let placesObject = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        };

        return placesObject;
    };

    const addNewPlace = async (ev) => {
        ev.preventDefault();

        let placesObject = getPlacesObject();

        console.log(placesObject);

        let fetchUrl = 'http://localhost:4000/places';
        let fetchBody = JSON.stringify(placesObject);
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: fetchBody
        };

        await fetch(fetchUrl, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRedirect('/account/places');
            });
    };

    if(redirect)
    {
        return <Navigate to={redirect} />
    }

    return(
        <div>
        {action !== 'new' && 
            (
                <div className='text-center'>
                    <Link className='inline-flex  gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>


                        Add New
                    </Link>
                </div>
            )
        }
        {action === 'new' && (
            <div>
                <form onSubmit={ev => addNewPlace(ev)}>
                    {preInputText('Title', 'title for your place. should be short and catchy')}
                    <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example: My lovely apt'></input>
                    {preInputText('Address', 'address to your place')}
                    <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address'></input>
                    {preInputText('Photos', 'more = better')}
                    
                    <PhotosUploader addedPhotos={addedPhotos} onChangeAddedPhotos={setAddedPhotos}/>
                    
                    {preInputText('Description', 'description of the place')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                    {preInputText('Perks', 'Select all the perks of your place')}
                    <div className='grid mt-2 ga-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        <Perks selected={perks} onChange={setPerks}></Perks>
                    </div>
                    {preInputText('Extra info', 'House rules, etc')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                    {preInputText('Check in & out times, max guests', 'Add check in and out times, remember to have some time window for cleaning the room between guests')}
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className ='mt-2 -mb-1'>Check in time</h3>
                            <input type='text' value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder='14'></input>
                        </div>
                        <div>
                            <h3 className ='mt-2 -mb-1'>Check out time</h3> 
                            <input type='text'  value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder='11'></input>
                        </div>
                        <div>
                            <h3 className ='mt-2 -mb-1'>Max number of guests</h3>
                            <input type='number' value={maxGuests}
                            onChange={ev => setmaxGuests(ev.target.value)}></input>
                        </div>
                    </div>
                    <button className='primary my-4'>Save</button>
                </form>
            </div>
        )}
        </div>
    );
};

export default PlacesPage;