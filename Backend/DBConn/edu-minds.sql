-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2024 at 05:49 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edu-minds`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `c_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL,
  `imageUrl` varchar(240) NOT NULL,
  `professorName` varchar(200) NOT NULL,
  `duration` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`c_id`, `title`, `description`, `imageUrl`, `professorName`, `duration`) VALUES
(101, 'Python', 'Python is a versatile, high-level programming language known for its simplicity, readability, and broad applicability across various fields like web development, data science, and AI.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8E6Xlh2VtOsV4vrygfHVm6xKybmctIDBYnA&s', 'Dr. John Smith', '40 Hours'),
(102, 'Excel', 'Excel is a spreadsheet software by Microsoft used for data organization, analysis, and visualization, featuring functions, formulas, and pivot tables for efficient data management.', 'https://omtsdigest.com/wp-content/uploads/2016/02/excel-1598646848.jpeg', 'Dr. Alice Johnson', '30 Hours'),
(103, 'Data Analysis', 'Data Analysis is a multidisciplinary field that uses statistical methods, algorithms, and machine learning to extract insights and knowledge from structured and unstructured data for decision-making and predictive analysis.', 'https://www.fsm.ac.in/blog/wp-content/uploads/2022/07/FUqHEVVUsAAbZB0.jpg', 'Prof. Mark Davis', '40 Hours');

-- --------------------------------------------------------

--
-- Table structure for table `datascience_course`
--

CREATE TABLE `datascience_course` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `level` tinyint(1) NOT NULL CHECK (`level` in (1,2,3)),
  `topic_name` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `articles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`articles`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `datascience_course`
--

INSERT INTO `datascience_course` (`id`, `course_id`, `level`, `topic_name`, `video_url`, `articles`, `created_at`) VALUES
(1, 103, 1, 'Introduction to Data Analytics', 'https://youtu.be/5zEt1_Nkiio?si=7vL7_svQkoUsB5LG', '', '2024-08-31 03:32:21'),
(2, 103, 1, 'Excel Basic', 'https://youtu.be/FMSJXtwt6hE?si=bGYTNHXzvnJiBs9r', '', '2024-08-31 03:32:21'),
(3, 103, 2, 'Advanced Excel Part 1', 'https://youtu.be/ZmjjsfNH5nE?si=n3gnVLe08RXZjAAb', '', '2024-08-31 03:32:21'),
(4, 103, 2, 'Advanced Excel Part 2', 'https://youtu.be/9sHGgIcHVfQ?si=Ksoxxl8MnDHl0Ev7', '', '2024-08-31 03:32:21'),
(5, 103, 2, 'Power BI Part 1', 'https://youtu.be/KIlw5Up2hnk?si=PGEJa-Ik9ZfzoHd3', '', '2024-08-31 03:32:21'),
(6, 103, 2, 'Power BI Part 2', 'https://youtu.be/O9OUqf2y4LA?si=7YYkaAyav-aGtbc3', '', '2024-08-31 03:32:21'),
(7, 103, 1, 'SQL Basic', 'https://youtu.be/lbvQmIs6OHw?si=1o-QYpRA60I-rwb_', '', '2024-08-31 03:32:21'),
(8, 103, 1, 'SQL DDL', 'https://youtu.be/GfoqC_7ZmuQ?si=sxZTYzTlKQeD3Q5U', '', '2024-08-31 03:32:21'),
(9, 103, 2, 'SQL DML & Order By', 'https://youtu.be/suN0rDob0FI?si=LyCUZjPIH2HsQURa', '', '2024-08-31 03:32:21'),
(10, 103, 2, 'SQL Group By', 'https://youtu.be/oHZ8udrINbM?si=3Fq0KpAopST3wpvC', '', '2024-08-31 03:32:21'),
(11, 103, 2, 'SQL Joins', 'https://youtu.be/zN5soLiX0BQ?si=SMLCnT7UaiNS-zr-', '', '2024-08-31 03:32:21'),
(12, 103, 1, 'Python Basic', 'https://youtu.be/TlkPGxRWKhk?si=LszCLdsG2xFnc-o_', '', '2024-08-31 03:32:21'),
(13, 103, 1, 'Exploratory Data Analysis (EDA)', 'https://youtu.be/czDQqnQT3yQ?si=e63nM10aker9lUc0', '', '2024-08-31 03:32:21'),
(14, 103, 1, 'Data Visualization', 'https://youtu.be/Z6ToYVvEi2o?si=8FjlyDq9yft6ntW-', '', '2024-08-31 03:32:21'),
(15, 103, 1, 'Top 5 Data Analyst Projects for Resume', 'https://youtu.be/a16r5YaYsdE?si=nbsPtg2zJsViEeUE', '', '2024-08-31 03:32:21'),
(16, 103, 2, 'Data Analysis End-to-End Project for RESUME Part 1', 'https://youtu.be/1TmrFEHTg54?si=d1F7D3OwdPOv9WV7', '', '2024-08-31 03:32:21'),
(17, 103, 2, 'Data Analysis End-to-End Project for RESUME Part 2', 'https://youtu.be/ze8eQpfs3_A?si=d3dQAi3UAbrGI0_U', '', '2024-08-31 03:32:21'),
(18, 103, 2, 'Data Analytics PowerBI Dashboard Project for Resume', 'https://youtu.be/jt0rcsCSs2s?si=lel9Syp1HH3ZFAKw', '', '2024-08-31 03:32:21');

-- --------------------------------------------------------

--
-- Table structure for table `datascience_qna`
--

CREATE TABLE `datascience_qna` (
  `id` int(11) NOT NULL,
  `questions` varchar(255) NOT NULL,
  `option_1` varchar(255) NOT NULL,
  `option_2` varchar(255) NOT NULL,
  `option_3` varchar(255) NOT NULL,
  `option_4` varchar(255) NOT NULL,
  `correct_option` varchar(255) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `excel_course`
--

CREATE TABLE `excel_course` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `topic_name` varchar(400) NOT NULL,
  `video_url` varchar(280) NOT NULL,
  `articles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`articles`)),
  `created_at` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `excel_qna`
--

CREATE TABLE `excel_qna` (
  `id` int(11) NOT NULL,
  `questions` varchar(255) NOT NULL,
  `option_1` varchar(255) NOT NULL,
  `option_2` varchar(255) NOT NULL,
  `option_3` varchar(255) NOT NULL,
  `option_4` varchar(255) NOT NULL,
  `correct_option` varchar(255) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `C_ID` int(11) NOT NULL,
  `levels` int(11) NOT NULL,
  `beginner` varchar(400) NOT NULL,
  `intermediate` varchar(400) NOT NULL,
  `advance` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`C_ID`, `levels`, `beginner`, `intermediate`, `advance`) VALUES
(101, 3, '\"Understanding syntax\",\"Variables and data types\",\"Basic operators\",\"Control flow (if statements)\",\"Functions\"', '\"Object-oriented programming\",\"Error handling and exceptions\",\"File I/O\",\"Modules and packages\",\"Basic data structures (lists, dictionaries)\"', '\"Decorators and generators\",\"Concurrency and parallelism\",\"Advanced data structures (sets, tuples)\",\"Testing and debugging\",\"Frameworks (Django, Flask)\"'),
(102, 3, 'beginner skills', 'intermediate skills', 'advance skills'),
(103, 2, 'beginner skills', '', 'advance skills');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `email_id` varchar(280) NOT NULL,
  `course_title` varchar(240) NOT NULL,
  `level` varchar(240) NOT NULL,
  `chapters_completed` int(11) NOT NULL,
  `last_update_date` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `python_course`
--

CREATE TABLE `python_course` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `topic_name` varchar(400) NOT NULL,
  `video_url` varchar(280) NOT NULL,
  `articles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`articles`)),
  `created_at` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `python_qna`
--

CREATE TABLE `python_qna` (
  `id` int(11) NOT NULL,
  `questions` varchar(255) NOT NULL,
  `option_1` varchar(255) NOT NULL,
  `option_2` varchar(255) NOT NULL,
  `option_3` varchar(255) NOT NULL,
  `option_4` varchar(255) NOT NULL,
  `correct_option` varchar(255) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `python_qna`
--

INSERT INTO `python_qna` (`id`, `questions`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_option`, `level`) VALUES
(1, 'Which of the function is use for print statement in Python?', 'print()', 'echo', 'cout<<', 'system.out.print()', 'print()', 1),
(2, 'What is the output of the following code: `print(type([]))`?', '<class \'list\'>', '<class \'tuple\'>', '<class \'dict\'>', '<class \'set\'>', '<class \'list\'>', 2),
(3, 'How do you start a comment in Python?', '/* Comment */', '// Comment', '# Comment', '-- Comment', '# Comment', 1),
(4, 'Which of the following is used to create an anonymous function in Python?', 'def', 'lambda', 'anonymous', 'func', 'lambda', 3),
(5, 'What is Python?', 'A high-level programming language', 'A type of database', 'A web development framework\r\n', 'A markup language', 'A high-level programming language', 1),
(6, 'Which of the following data types is immutable in Python?', 'List', 'Dictionary', 'Set', 'Tuple', 'Tuple', 1),
(7, 'What is the correct syntax to check if a variable x is equal to 10 in Python?', 'if x == 10:', 'if (x = 10):', 'if x := 10', 'if x === 10', 'if x == 10:', 1),
(8, 'Which of the following is used to define a list in Python?', '[]', '()', '{}', '<>', '[]', 1),
(9, 'Which operator is used for exponentiation in Python?', '^', '**', '*', '//', '**', 1),
(10, 'Which operator is used for floor division in Python?', '/', '%', '//', '^', '//', 1),
(11, 'What does the == operator do in Python?', 'Assigns a value', 'Checks for equality', 'Compares two strings', 'Increments a value', 'Checks for equality', 1),
(12, 'What will be the output of the following code?\r\nx = 10\r\ny = 3\r\nprint(x % y)', '0', '2', '1', '3', '1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email_id` varchar(280) NOT NULL,
  `course_title` varchar(240) NOT NULL,
  `level` int(11) NOT NULL,
  `date` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `datascience_course`
--
ALTER TABLE `datascience_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `excel_course`
--
ALTER TABLE `excel_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `excel_qna`
--
ALTER TABLE `excel_qna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`C_ID`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `python_course`
--
ALTER TABLE `python_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `python_qna`
--
ALTER TABLE `python_qna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
