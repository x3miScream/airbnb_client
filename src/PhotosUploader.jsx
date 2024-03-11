import React, {useState} from 'react';

const PhotosUploader = ({addedPhotos, onChangeAddedPhotos}) => {

    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:4000/upload-by-link';
        const fetchBody = {
            link: photoLink
        };
        
        const fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(fetchBody)
        };

        await fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => {
                if(data !== '')
                {
                    onChangeAddedPhotos(prev => {
                        return[...prev, data];
                    });

                    setPhotoLink('');
                }
            });
    }

    const uploadPhoto = async (ev) => {
        const files = ev.target.files;

        const fetchUrl = 'http://localhost:4000/upload';
        const formData = new FormData();

        for(let i=0;i<files.length;i++)
        {
            formData.append('photos', files[i]);
        }

        const fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            // headers: {
            //     'Content-type': 'multipart/form-data'
            // },
            body: formData
        };

        fetch(fetchUrl, fetchOptions)
            .then(response => response.json())
            .then(data => {
                if(data !== '' && data.length > 0)
                {
                    onChangeAddedPhotos(prev => {
                        return[...prev, ...data];
                    });

                    setPhotoLink('');
                }
            });
    };


    return(
        <>
        <div className='flex gap-2'>
                <input
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    type='text' placeholder={'Add using a link....jpg'}></input>

                <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;photo</button>
            </div>

            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div className='h-32 flex' key={`${link}_${index}`}>
                        <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + link}></img>
                    </div>
                ))}
                <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                    <input type='file' multiple className='hidden' onChange={ev => uploadPhoto(ev)}></input>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>


                    Upload
                </label>
            </div>
        </>
    )
};

export default PhotosUploader;