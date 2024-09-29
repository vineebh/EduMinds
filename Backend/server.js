const express = require('express');
const db = require('./DBConn/sqlconn');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/assessment/questions/:level', async (req, res) => {
    const level = req.params.level;
    const limit = 5;
    try {
        const [rows] = await db.query(
            `SELECT id, questions, option_1, option_2, option_3, option_4, correct_option 
             FROM python_qna 
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

app.post('/assessment/submit', async (req, res) => {
    const { answers } = req.body;
    let correctCount = 0;

    try {
        for (const answer of answers) {
            const { questionId, selectedOption } = answer;
            const [rows] = await db.query('SELECT correct_option FROM python_qna WHERE id = ?', [questionId]);

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

app.get('/course', async (req, res) => {
    try {
        const [data] = await db.query('SELECT * FROM data_analytics_course');
        res.json(data);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/skills', async (req,res)=>{
    const C_ID = req.params.C_ID;
    try{
        const [data]= await db.query('select * from level where C_ID= ?',[C_ID]);
        res.json(data)
    }
    catch(err){
        res.status(500).json({error:"Error fetching data"})
    }
})

app.get('/courses', async (req, res) => {
    try {
        const [data] = await db.query('select * from courses')
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: 'Courses Not Found' })
    }
})


app.post('/userdata', async (req, res) => {

    try {
        const { email_id, course_title, level } = req.body;
        await db.query('INSERT INTO users (email_id, course_title, level, datentime) VALUES (?, ?, ?, NOW())', [email_id, course_title, level]);
        res.status(200).json({ msg: 'Data Send' })
    }
    catch (error) {
        res.status(500).json({ error: 'Data Not Send' })
        console.log(error)
    }
})


app.listen(process.env.PORT, () => {
    console.log("Server Started!");
});