import React from 'react';

const Exam = () => {

    

    return (
        <div className='bg-gray-900 min-h-screen py-12 sm:py-16 mt-16 px-40'>
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
                <div class="text-3xl font-bold text-white mb-4 text-center">
                    <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input id="option1" type="radio" value="" name="opt" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"></input>
                        <label for="option1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Option1</label>
                    </div>
                    <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input checked id="option2" type="radio" value="" name="opt" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"></input>
                        <label for="option2" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Option2</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Exam;
