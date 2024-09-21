const express = require('express');
const db = require('./DBConn/sqlconn');
const app = express();
require('dotenv').config();

// to convert into JSON format
app.use(express.json());

//to get a question by ID
app.route('/questions/:id')
    .get(async (req, res) => {
        const questionId = req.params.id;
        try {
            const [rows] = await db.query('SELECT id, questions, option_1, option_2, option_3, option_4 FROM python WHERE id = ?', [questionId]);
            if (rows.length === 0) {
                res.status(404).send('Question not found');
            } else {
                res.json(rows[0]); // Return the particular question.
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    //to submit answer
    .post(async (req, res) => {
        const questionId = req.params.id;
        const userSelectedOption = req.body.selectedOption;
        try {
            const [rows] = await db.query('SELECT correct_option FROM python WHERE id = ?', [questionId]);

            if (rows.length === 0) {
                res.status(404).send('Question not found');
            }
            //checking user selection option is correct or not for specific questions.
            const correctOption = rows[0].correct_option;
            if(userSelectedOption===correctOption){
                res.status(200).json({message:true})
            }
            else{
                res.status(200).json({message:false})
            }

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

// to get questions based on level
app.get('/questions/level/:level', async (req, res) => {
    const level = req.params.level;
    try {
        const [rows] = await db.query('SELECT id, questions, option_1, option_2, option_3, option_4,level FROM python WHERE level = ?', [level]);
        if (rows.length === 0) {
            res.status(404).send('No questions found for this level');
        } else {
            res.json(rows); // Return the list of questions for the specified level
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// to submit an answer based on level
app.post('/questions/level/:level', async (req, res) => {
    const level = req.params.level;
    const userSelectedOption = req.body.selectedOption;
    const questionId = req.body.id;

    try {
        const [rows] = await db.query('SELECT correct_option FROM python WHERE id = ?', [questionId]);

        if (rows.length === 0) {
            return res.status(404).send('Question not found for this level');
        }

        const correctOption = rows[0].correct_option;
        if (userSelectedOption === correctOption) {
            res.status(200).json({ message: true });
        } else {
            res.status(200).json({ message: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(process.env.PORT,()=>{
    console.log("Server Started !")
});
