import { useRef, useState } from 'react';
import Swal from 'sweetalert2'

export default function AddJobInd() {
    const [industry, setindustry] = useState('');
    const refForm = useRef();
    const apiUrl = import.meta.env.VITE_API_URL;

    const Addindustry = async (e) => {
        e.preventDefault();
        const form = refForm.current;
        const indValue = form.industry.value.trim();

        const res = await fetch(`${apiUrl}/api/jobInd/industry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ industry: indValue }),
        });
        const data = await res.json()
        const cate = document.getElementById('industry');
        data.message !== undefined ? cate.innerText = data.message : cate.innerText = ""
        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "industry added successfully!",
                showConfirmButton: true,
            });
            setindustry('');
        }
    };

    return (
        <div>
            <form ref={refForm} className='form-group admin-form p-3' onSubmit={Addindustry}>
                <div className="form-title">
                    <h2 className="">Create Job Industry</h2>
                </div>
                <input
                    className='form-control'
                    style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                    type='text'
                    placeholder='Add industry'
                    name='industry'
                    value={industry}
                    onChange={(e) => setindustry(e.target.value)}
                />
                <div id='industry' style={{ color: 'red' }}></div>
                <div className="text-center">

                    <button className='first-button mt-3 text-white'>Add Job Industry</button>
                </div>
            </form>

        </div>
    );
}
