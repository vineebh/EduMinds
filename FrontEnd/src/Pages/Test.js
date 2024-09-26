import React, { useEffect, useState } from 'react';

const Test = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch("http://localhost:1000/courses")
    .then(res => {
        if (!res.ok) {
            console.error('HTTP error:', res.status);
            throw new Error('Network response was not ok');
        }
        return res.json(); // Move this to return after checking res.ok
    })
    .then(data => setCourses(data))
    .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch courses. Please try again later.');
    });

    }, []);

    const getVideoId = (url) => {
        try {
            const parsedUrl = new URL(url);
            // Handle URLs like 'https://www.youtube.com/watch?v=VIDEO_ID'
            if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
                const urlParams = new URLSearchParams(parsedUrl.search);
                return urlParams.get('v');
            }
            // Handle URLs like 'https://youtu.be/VIDEO_ID'
            if (parsedUrl.hostname === 'youtu.be') {
                return parsedUrl.pathname.substring(1); // Remove the leading '/'
            }
            return null; // Return null if the URL doesn't match expected formats
        } catch (error) {
            console.error('Error extracting video ID:', error);
            return null;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Course Topics</h1>
            {error && <p className="text-red-500">{error}</p>} {/* Display fetch error if any */}
            <ul className="space-y-4">
                {courses.map((course) => {
                    // Ensure video URL is valid
                    const videoId = getVideoId(course.video_url);
                    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

                    return (
                        <li key={course.id} className="border p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Topic: {course.topic_name}</h2>
                            <p className="text-gray-600 mb-4">Level: {course.level}</p>
                            {embedUrl ? (
                                <div className="relative" style={{ width: '400px', height: '300px' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={embedUrl}
                                        title={course.topic_name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            ) : (
                                <p className="text-red-500">Invalid video URL.</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Test;
