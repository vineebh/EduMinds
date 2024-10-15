const express = require('express');
const db = require('./DBConn/sqlconn');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


// Home, Courses
app.get('/courses', async (req, res) => {
    try {
        const [data] = await db.query('SELECT c_id, title, description, imageUrl, professorName, duration FROM courses');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Courses Not Found' });
    }
});

// Check user courses   courses
app.get('/checkuser', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const [data] = await db.query('SELECT course_title, level FROM users WHERE email_id = ?', [email]);

        if (data.length === 0) {
            console.log(`Email not found: ${email}`);
            return res.status(201).json({ msg: 'Email not found',data: {course_title:'',level:''} });
        }

        const userCourses = data.map(course => ({
            course_title: course.course_title,
            level: course.level
        }));

        return res.status(200).json({ data: userCourses });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Error during fetching data' });
    }
});

// Assessment
app.get('/skills/:C_ID', async (req, res) => {
    const C_ID = req.params.C_ID;
    try {
        const [data] = await db.query('SELECT beginner, intermediate, advance FROM level WHERE C_ID = ?', [C_ID]);

        if (data.length > 0) {
            const skills = {
                Beginner: data[0].beginner ? data[0].beginner.split(',') : [],
                Intermediate: data[0].intermediate ? data[0].intermediate.split(',') : [],
                Advanced: data[0].advance ? data[0].advance.split(',') : []
            };
            res.json(skills);
        } else {
            res.status(404).json({ error: "No skills found for this course ID" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching data" });
    }
});


// MCQ, everyDayQ
app.post('/assessment/questions', async (req, res) => {
    const { level, c_id, limit } = req.body;

    const courses = {
        101: 'python_qna',
        102: 'excel_qna',
        103: 'data_analytics_qna',
    };

    const course_title = courses[c_id];

    if (!course_title) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const [rows] = await db.query(
            `SELECT id, questions, option_1, option_2, option_3, option_4
             FROM ${course_title} 
             WHERE level = ? 
             ORDER BY RAND() 
             LIMIT ?`,
            [level, limit]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No questions available for this level' });
        }

        const questionsWithoutAnswers = rows;
        res.status(200).json(questionsWithoutAnswers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Chapter Q
app.post('/assessment/chapterQ', async (req, res) => {
    const { topic, c_id, limit } = req.body;

    const courses = {
        101: 'python_qna',
        102: 'excel_qna',
        103: 'data_analytics_qna',
    };

    const course_title = courses[c_id];

    if (!course_title) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const [rows] = await db.query(
            `SELECT id, questions, option_1, option_2, option_3, option_4 
             FROM ${course_title} 
             WHERE title = ? 
             ORDER BY RAND() 
             LIMIT ?`,
            [topic, limit]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No questions available for this topic' });
        }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// MCQ, chapterQ, everyDayQ submission
app.post('/assessment/submit', async (req, res) => {
    const { c_id, answers } = req.body;

    const courses = {
        101: 'python_qna',
        102: 'excel_qna',
        103: 'data_analytics_qna',
    };

    const course_title = courses[c_id];

    if (!course_title) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        let correctCount = 0;
        for (const answer of answers) {
            const { questionId, selectedOption } = answer;
            const [rows] = await db.query(`SELECT correct_option FROM ${course_title} WHERE id = ?`, [questionId]);

            if (rows.length > 0) {
                const correctOption = rows[0].correct_option;
                if (selectedOption === correctOption) {
                    correctCount++;
                }
            }
        }

        res.status(200).json({ correct: correctCount, total: answers.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Dashboard
app.post('/userdata', async (req, res) => {
    const { email_id, course_title, Level } = req.body;

    if (!email_id || !course_title || !Level) {
        return res.status(400).json({ error: 'All fields are required: email_id, course_title, level' });
    }

    const calculatepoints = (Level) => {
        if (Level === 'Advanced') return 200;
        if (Level === 'Intermediate') return 100;
        return 0;
    };

    const points = calculatepoints(Level);

    try {
        const query = 'INSERT INTO users (email_id, course_title, level, points, datentime) VALUES (?, ?, ?, ?, NOW())';
        await db.query(query, [email_id, course_title, Level, points]);
        res.status(201).json({ message: 'User data saved successfully' });
    } catch (error) {
        console.error("Error in /userdata:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Dashboard Course Data
app.get('/course/:c_id', async (req, res) => {
    const c_id = parseInt(req.params.c_id, 10);

    const courses = {
        101: 'python_course',
        102: 'excel_course',
        103: 'data_analytics_course',
    };

    const course_title = courses[c_id];

    if (!course_title) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const query = `SELECT id, level, topic_name, video_url, articles FROM ${course_title}`;
        const [data] = await db.query(query);

        if (data.length === 0) {
            return res.status(404).json({ error: 'No data found for this course' });
        }

        res.json(data);
    } catch (err) {
        console.error("Error fetching course data:", err);
        res.status(500).json({ error: 'Server Error' });
    }
});


// videos   watched
app.get('/watched_videos/:email', async (req, res) => {
    const email = req.params.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    try {
        const [rows] = await db.query('SELECT watched_video_id FROM progress WHERE email_id = ?', [email]);
        const watchedVideoIds = rows.map(row => row.watched_video_id);
        res.status(200).json(watchedVideoIds);
    } catch (error) {
        console.error("Error fetching watched videos:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


//  videos   add video
app.post('/watched_videos', async (req, res) => {
    const { email_id, courseTitle, watched_video_id } = req.body;

    if (!email_id || !watched_video_id || !courseTitle) {
        return res.status(400).json({ error: 'Invalid input: email_id or courseTitle or watched_video_id are required' });
    }

    try {
        const [existingRecord] = await db.query(
            'SELECT COUNT(*) AS count FROM progress WHERE email_id = ? AND course_title = ? AND watched_video_id = ?',
            [email_id, courseTitle, watched_video_id]
        );
        
        if (existingRecord[0].count > 0) {
            return res.status(200).json({ message: 'Video already marked as watched' });
        }        

        await db.query('INSERT INTO progress (email_id, course_title, watched_video_id,last_updated) VALUES (?, ?, ?, NOW())', 
            [email_id, courseTitle, watched_video_id]);
        res.status(201).json({ message: 'Video marked as watched' });
    } catch (error) {
        console.error("Error marking video as watched:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//  progress    get points
app.post('/userpoints', async (req, res) => {
    try {
        const { email, course_title } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Query the database for points based on email and course_title
        const [data] = await db.query(
            'SELECT points FROM users WHERE email_id = ? and course_title = ?',
            [email, course_title]
        );

        // If no records found, return a 404 error with 0 points
        if (data.length === 0) {
            return res.status(404).json({ msg: 'User not found or not enrolled in the course', data: { points: 0 } });
        }

        // Return the points if user found
        const userPoints = data[0].points;
        return res.status(200).json({ data: { points: userPoints } });
    } catch (error) {
        console.error('Error occurred during fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});


//  videos,test  update points
app.post('/update_points_and_level', async (req, res) => {
    try {
        const { email, course_title, new_points } = req.body;

        // Check if required fields are provided
        if (!email || !course_title || typeof new_points !== 'number') {
            return res.status(400).json({ msg: 'Email, course title, and new points are required' });
        }

        // Query the database for current points and level based on email and course_title
        const [data] = await db.query(
            'SELECT points, level FROM users WHERE email_id = ? and course_title = ?',
            [email, course_title]
        );

        // If no records found, return a 404 error
        if (data.length === 0) {
            return res.status(404).json({ msg: 'User not found or not enrolled in the course' });
        }

        // Calculate the updated points
        const currentPoints = data[0].points;
        const updatedPoints = currentPoints + new_points;

        // Define a function to calculate the level based on points
        const calculateLevel = (points) => {
            if (points >= 260) return 'Advanced';
            if (points >= 100) return 'Intermediate';
            return 'Beginner';
        };

        // Calculate the new level based on updated points
        const newLevel = calculateLevel(updatedPoints);

        // Update the user's points and level in the database
        await db.query(
            'UPDATE users SET points = ?, level = ? WHERE email_id = ? and course_title = ?',
            [updatedPoints, newLevel, email, course_title]
        );

        // Return success response with the updated points and level
        return res.status(200).json({ data: { points: updatedPoints, level: newLevel } });
    } catch (error) {
        console.error('Error occurred during updating points and level:', error);
        return res.status(500).json({ error: 'An error occurred while updating user data' });
    }
});


//  questions    post completed
app.post('/mark_questions', async (req, res) => {
    try {
        const { email_id, course_title, topic_name } = req.body;

        // Check if email is provided
        if (!email_id) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Insert data into the database
        const query = 'INSERT INTO users_questions (email_id, course_title, topic_name) VALUES (?, ?, ?)';
        const values = [email_id, course_title, topic_name];
        await db.query(query, values);

        res.status(201).json({ message: 'Question marked as done' });
    } catch (error) {
        console.error('Error occurred during inserting data:', error);
        res.status(500).json({ error: 'An error occurred while marking the question' });
    }
});


//  questions    post completed
app.post('/mark_questions', async (req, res) => {
    try {
        const { email_id, course_title, topic_name } = req.body;

        // Check if email is provided
        if (!email_id) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Insert data into the database
        const query = 'INSERT INTO users_questions (email_id, course_title, topic_name) VALUES (?, ?, ?)';
        const values = [email_id, course_title, topic_name];
        await db.query(query, values);

        res.status(201).json({ message: 'Question marked as done' });
    } catch (error) {
        console.error('Error occurred during inserting data:', error);
        res.status(500).json({ error: 'An error occurred while marking the question' });
    }
});


//  questions    get completed
//  questions    get completed
app.post('/completed_questions', async (req, res) => {
    try {
        const { email_id, course_title } = req.body;
        const { email_id, course_title } = req.body;

        // Check if email is provided
        if (!email_id) {
        if (!email_id) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Query the database for completed topics based on email and course_title
        // Query the database for completed topics based on email and course_title
        const [data] = await db.query(
            'SELECT topic_name FROM users_questions WHERE email_id = ? AND course_title = ?',
            [email_id, course_title]
            'SELECT topic_name FROM users_questions WHERE email_id = ? AND course_title = ?',
            [email_id, course_title]
        );

        // If no records found, return a message
        // If no records found, return a message
        if (data.length === 0) {
            return res.status(200).json({ msg: 'User not found or no questions completed', data: { topic_name: [] } });
            return res.status(200).json({ msg: 'User not found or no questions completed', data: { topic_name: [] } });
        }

        // Extract topic names from the query result
        const topicNames = data.map((row) => row.topic_name);

        // Return the list of completed topic names
        return res.status(200).json({ data: { topic_name: topicNames } });
        // Extract topic names from the query result
        const topicNames = data.map((row) => row.topic_name);

        // Return the list of completed topic names
        return res.status(200).json({ data: { topic_name: topicNames } });
    } catch (error) {
        console.error('Error occurred during fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching completed questions' });
    }
        res.status(500).json({ error: 'An error occurred while fetching completed questions' });
    }
});
//  questions    post completed
app.post('/mark_questions', async (req, res) => {
    try {
        const { email_id, course_title, topic_name } = req.body;

        // Check if email is provided
        if (!email_id) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Insert data into the database
        const query = 'INSERT INTO users_questions (email_id, course_title, topic_name) VALUES (?, ?, ?)';
        const values = [email_id, course_title, topic_name];
        await db.query(query, values);

        res.status(201).json({ message: 'Question marked as done' });
    } catch (error) {
        console.error('Error occurred during inserting data:', error);
        res.status(500).json({ error: 'An error occurred while marking the question' });
    }
});


app.listen(process.env.PORT, () => {
    console.log("Server Started!");
});
