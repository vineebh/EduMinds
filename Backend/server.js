const express = require('express');
const db = require('./DBConn/sqlconn');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


//Home,Courses
app.get('/courses', async (req, res) => {
    try {
        const [data] = await db.query('select c_id,title,description,imageUrl,professorName,duration from courses')
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: 'Courses Not Found' })
    }
})

//Courses
app.get('/checkuser', async (req, res) => {
    try {
        const { email } = req.query; // Extract email from the query string

        // Check if the email is present
        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Log the email being searched
        console.log(`\nChecking courses for email: ${email}\n`);

        // Query to fetch the course_title and level for the entered email
        const [Data] = await db.query('SELECT course_title, level FROM users WHERE email_id = ?', [email]);


        // Check if email exists in the database
        if (Data.length === 0) {
            console.log(`\nCourses not found: ${email}\n`);
            return res.status(200).json({ data: [course_title='',level=''] });
        }

        // Map the courses for the user
        const userCourses = Data.map(course => ({
            course_title: course.course_title,
            level: course.level
        }));

        if (userCourses.length > 0) {
            return res.status(200).json({ data: userCourses });
        }

        // If no courses are found for the entered email
        console.log('No courses associated with this email');
        return res.status(404).json({ msg: 'No courses found for this email' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Error during fetching data' });
    }
});


//Assessment
app.get('/skills/:C_ID', async (req, res) => {
    const C_ID = req.params.C_ID;
    try {
        // Fetch the beginner, intermediate, and advanced skills for the given C_ID
        const [data] = await db.query(
            'SELECT beginner, intermediate, advance FROM level WHERE C_ID = ?',
            [C_ID]
        );

        // Check if any data was returned
        if (data.length > 0) {
            const skills = {
                Beginner: data[0].beginner ? data[0].beginner.split(',') : [],
                Intermediate: data[0].intermediate ? data[0].intermediate.split(',') : [],
                Advanced: data[0].advance ? data[0].advance.split(',') : []
            };
            res.json(skills); // Send the skills back to the client
        } else {
            res.status(404).json({ error: "No skills found for this course ID" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

//MCQ,chapterQ,everyDayQ
app.post('/assessment/questions', async (req, res) => {
    const { level, c_id, limit } = req.body; // Extract from req.body since it's a POST request
  
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
            `SELECT id, questions, option_1, option_2, option_3, option_4, correct_option 
             FROM ${course_title} 
             WHERE level = ? 
             ORDER BY RAND() 
             LIMIT ?`,
            [level, limit]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No questions available for this level' });
        }

        const questionsWithoutAnswers = rows.map(({ correct_option, ...rest }) => rest);
        res.status(200).json(questionsWithoutAnswers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

//MCQ,chapterQ,everyDayQ
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


//Dashboard
app.post('/userdata', async (req, res) => {
    
    // Destructure request body
    const { email_id, course_title, Level } = req.body;

    // Validate input data
    if (!email_id || !course_title || !Level) {
        return res.status(400).json({ error: 'All fields are required: email_id, course_title, level' });
    }

    try {
        // Insert data into the database
        const query = 'INSERT INTO users (email_id, course_title, level, datentime) VALUES (?, ?, ?, NOW())';
        const result = await db.query(query, [email_id, course_title, Level]);
        console.log(result)
    } catch (error) {
        console.error("Error in /userdata:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Dashboard
app.get('/course/:c_id', async (req, res) => {
    const c_id = parseInt(req.params.c_id, 10);

    // Define a mapping of course IDs to table names
    const courses = {
        101: 'python_course',
        102: 'excel_course',
        103: 'data_analytics_course',
    };

    // Get the course title from the mapping
    const course_title = courses[c_id];

    if (!course_title) {
        // Return an error if the course ID is not valid
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        // Since table names cannot be parameterized, we safely include it directly in the query string
        const query = `SELECT level, topic_name, video_url, articles FROM ${course_title}`;
        const [data] = await db.query(query);

        // Check if data was returned
        if (data.length === 0) {
            return res.status(404).json({ error: 'No data found for this course' });
        }

        // Send the fetched data as JSON
        res.json(data);
    } catch (err) {
        console.error("Error fetching course data:", err);
        res.status(500).json({ error: 'Server Error' });
    }
});


app.get('/checkuser', async (req, res) => {
    try {
        const { email } = req.query; // Extract email from the query string

        // Check if the email is present
        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Log the email being searched
        console.log(`Checking courses for email: ${email}`);

        // Query to fetch the course_title and level for the entered email
        const [data] = await db.query('SELECT course_title, level FROM users WHERE email_id = ?', [email]);

        // Log the result from the database query
        console.log("Query Result:", data);

        // Check if email exists in the database
        if (data.length === 0) {
            console.log(`Email not found: ${email}`);
            return res.status(404).json({ msg: 'Email not found' });
        }

        // Map the courses for the user
        const userCourses = data.map(course => ({
            course_title: course.course_title,
            level: course.level
        }));

        if (userCourses.length > 0) {
            return res.status(200).json({ data: userCourses });
        }

        // If no courses are found for the entered email
        console.log('No courses associated with this email');
        return res.status(404).json({ msg: 'No courses found for this email' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Error during fetching data' });
    }
});




app.post('/userdata', async (req, res) => {
    
    // Destructure request body
    const { email_id, course_title, Level } = req.body;

    // Validate input data
    if (!email_id || !course_title || !Level) {
        return res.status(400).json({ error: 'All fields are required: email_id, course_title, level' });
    }

    try {
        // Insert data into the database
        const query = 'INSERT INTO users (email_id, course_title, level, datentime) VALUES (?, ?, ?, NOW())';
        const result = await db.query(query, [email_id, course_title, Level]);
        console.log(result)
    } catch (error) {
        console.error("Error in /userdata:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


    //everything above this is dynamic api


app.listen(process.env.PORT, () => {
    console.log("Server Started!");
});



