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

// Check user courses
app.get('/checkuser', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        console.log(`Checking courses for email: ${email}`);

        const [data] = await db.query('SELECT course_title, level FROM users WHERE email_id = ?', [email]);

        if (data.length === 0) {
            console.log(`Email not found: ${email}`);
            return res.status(404).json({ msg: 'Email not found' });
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

// User data
app.post('/userdata', async (req, res) => {
    const { email_id, course_title, Level } = req.body;

    if (!email_id || !course_title || !Level) {
        return res.status(400).json({ error: 'All fields are required: email_id, course_title, level' });
    }

    try {
        const query = 'INSERT INTO users (email_id, course_title, level, datentime) VALUES (?, ?, ?, NOW())';
        await db.query(query, [email_id, course_title, Level]);
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

// Route to log watched videos

app.post('/watched_videos', async (req, res) => {
    const { email_id, video_id } = req.body;
    try {
      await db.query('INSERT INTO watched_videos (email_id, video_id) VALUES (?, ?)', [email_id, video_id]);
      res.status(201).send('Video marked as watched');
    } catch (error) {
      console.error("Error marking video as watched:", error);
      res.status(500).send('Server error');
    }
  });
  

app.get('/watched_videos/:email', async (req, res) => {
    const email = req.params.email;
    try {
      const [rows] = await db.query('SELECT video_id FROM watched_videos WHERE email_id = ?', [email]);
      const watchedVideoIds = rows.map(row => row.video_id);
      res.json(watchedVideoIds);
    } catch (error) {
      console.error("Error fetching watched videos:", error);
      res.status(500).send('Server error');
    }
  });
  


    //everything above this is dynamic api
    app.post('/profile', async (req, res) => {
        try {
            const { email_id, course_title, level } = req.body;
    
            if (!email_id || !course_title||!level||!test_passed) {
                return res.status(400).json({error:'All field are required fields'});
            }
    
            const selectQuery = `
                SELECT chapters_completed FROM profiles 
                WHERE email_id = ? AND course_title = ?`;
            
            const [selectResult] = await db.query(selectQuery, [email_id, course_title]);
    
            let chapters_completed = 0;
    
            if (selectResult.length > 0) {
                chapters_completed = selectResult[0].chapters_completed;
            }
    
            chapters_completed += 1;
    
            let updateFields = [];
            let updateValues = [];
    
            if (level) {
                updateFields.push('level = ?');
                updateValues.push(level);
            }
    
            updateFields.push('chapters_completed = ?');
            updateValues.push(chapters_completed);
    
            updateFields.push('last_update_date = NOW()');
    
            updateValues.push(email_id, course_title);
    
            const updateQuery = `
                UPDATE profiles 
                SET ${updateFields.join(', ')} 
                WHERE email_id = ? AND course_title = ?`;
    
            const [updateResult] = await db.query(updateQuery, updateValues);
    
            if (updateResult.affectedRows === 0) {
                const insertQuery = `
                    INSERT INTO profiles (email_id, course_title, level, chapters_completed, last_update_date) 
                    VALUES (?, ?, ?, ?, NOW())`;
    
                const insertValues = [email_id, course_title, level || '', chapters_completed || 0];
    
                db.query(insertQuery, insertValues, (error, result) => {
                    if (error) {
                        console.error('Error inserting data:', error);
                        return res.status(500).json({ message: 'Error enrolling user' });
                    }
                    console.log(result);
                    res.status(201).json({ message: 'User enrolled successfully' });
                });
            } else {
                res.status(200).json({ message: 'Profile updated successfully' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


app.listen(process.env.PORT, () => {
    console.log("Server Started!");
});
