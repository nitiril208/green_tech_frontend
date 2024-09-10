import { Card } from '@/components/ui/card';
import { useState } from 'react';

function ProfileSetting() {
    const [selectedGender, setSelectedGender] = useState('male');

    return (
        <div className="fixed inset-0 flex justify-center items-center p-4 sm:p-0">
            <Card className="bg-white rounded-lg h-auto w-full sm:h-[467px] sm:w-[610px]">
                <div className='ml-4 mt-3 text-[20px] font-semibold'>
                    <h1>Settings</h1>
                </div>
                <div className='flex flex-col sm:flex-row'>
                    <div className="sm:w-[200px]  sm:h-[370px] flex flex-col m-4 gap-4 border-b-2 sm:border-b-0 sm:border-r-2 border-[#E4E4E4]">
                        <button className="bg-[#F5F5F5] w-full sm:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Profile Setting
                        </button>
                        <button className="bg-[#F5F5F5] w-full sm:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Account Setting
                        </button>
                        <button className="bg-[#F5F5F5] w-full sm:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Log Out
                        </button>
                    </div>
                    <div className='mt-2 w-full sm:w-auto'>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex flex-col w-full sm:w-auto">
                                <label htmlFor="firstName" className="mb-2 text-[#000000] text-[16px]">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    defaultValue="Emilla"
                                    className="border border-[#D9D9D9] rounded-md h-[45px] w-full sm:w-[170px] pl-2"
                                />
                            </div>
                            <div className="flex flex-col w-full sm:w-auto mt-4 sm:mt-0">
                                <label htmlFor="lastName" className="mb-2 text-[#000000] text-[16px]">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    defaultValue="Anderson"
                                    className="border border-[#D9D9D9] rounded-md h-[45px] w-full sm:w-[170px] pl-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="Email" className="mb-2 text-[#000000] text-[16px]">
                                Email
                            </label>
                            <input
                                type="text"
                                id="Email"
                                name="Email"
                                defaultValue="emillaanderson@gmail.com"
                                className="border border-[#D9D9D9] rounded-md h-[45px] w-full sm:w-[360px] pl-2"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="text-gray-700">Gender</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={selectedGender === 'male'}
                                        onChange={() => setSelectedGender('male')}
                                        className="w-5 h-5"
                                    />
                                    <span className={`${selectedGender === 'male' ? 'text-black' : 'text-[#9B9B9B]'}`}>Male</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={selectedGender === 'female'}
                                        onChange={() => setSelectedGender('female')}
                                        className="w-5 h-5"
                                    />
                                    <span className={`${selectedGender === 'female' ? 'text-black' : 'text-[#9B9B9B]'}`}>Female</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className="block text-[16px] mb-2">Birth Date</label>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="relative w-full sm:w-auto">
                                    <select className="appearance-none block w-full sm:w-[107px] h-[40px] border border-[#D9D9D9] rounded-md py-2 px-3 bg-white">
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        {/* Add more months */}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <select className="appearance-none block w-full sm:w-[107px] h-[40px] border border-[#D9D9D9] rounded-md py-2 px-3 bg-white">
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        {/* Add more days */}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <select className="appearance-none block w-full sm:w-[107px] h-[40px] border border-[#D9D9D9] rounded-md py-2 px-3 bg-white">
                                        <option>2000</option>
                                        <option>2001</option>
                                        <option>2002</option>
                                        {/* Add more years */}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 ml-auto sm:ml-[125px]'>
                            <button className="bg-[#00778B] text-white py-2 px-4 rounded-md w-full sm:w-[100px]">
                                EDIT
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ProfileSetting;
