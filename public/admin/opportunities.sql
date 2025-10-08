-- Table for career opportunities
CREATE TABLE IF NOT EXISTS opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    work_type ENUM('Full-time', 'Part-time', 'Contract', 'Remote') NOT NULL,
    status ENUM('Open', 'Closed', 'On-hold') DEFAULT 'Open',
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    benefits TEXT NOT NULL,
    salary_range VARCHAR(100),
    experience_level VARCHAR(50),
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO opportunities (title, department, location, work_type, status, description, requirements, responsibilities, benefits, salary_range, experience_level, application_deadline) VALUES
('Senior Backend Engineer', 'Engineering', 'New York, USA', 'Remote', 'Open', 'We are seeking a Senior Backend Engineer to join our dynamic team and help build the next generation of intelligent automation platforms. You\'ll work on scalable microservices, AI/ML pipelines, and distributed systems that power our enterprise solutions.', '5+ years of backend development experience\nStrong proficiency in Python, Go, or Java\nExperience with cloud platforms (AWS, GCP, or Azure)\nExperience with AI/ML frameworks and model deployment', 'Design and implement scalable backend services using modern technologies\nBuild and maintain APIs that power our AI automation platform\nOptimize database performance and ensure data integrity across systems\nCollaborate with ML engineers to deploy and scale AI models\nMentor junior engineers and contribute to technical decision-making', 'Competitive salary + equity\nComprehensive health benefits\nTop-tier equipment\nLearning & development budget\nRemote work stipend', '$120,000 - $180,000', 'Senior', '2024-12-31'),

('Product Manager', 'Product', 'London, UK', 'Full-time', 'Open', 'We are looking for a Product Manager to drive the development of our AI automation platform. You\'ll work closely with engineering, design, and business teams to define product strategy and deliver exceptional user experiences.', '3+ years of product management experience\nStrong analytical and problem-solving skills\nExperience with AI/ML products preferred\nExcellent communication and leadership skills', 'Define product roadmap and strategy\nCollaborate with cross-functional teams\nConduct market research and user interviews\nManage product backlog and prioritize features\nAnalyze product metrics and user feedback', 'Competitive salary + equity\nComprehensive health benefits\nTop-tier equipment\nLearning & development budget\nFlexible working arrangements', '$90,000 - $130,000', 'Mid-level', '2024-12-31'),

('Sales Representative', 'Sales', 'Remote', 'Remote', 'Open', 'Join our sales team to help enterprises discover the power of AI automation. You\'ll work with Fortune 500 companies to understand their needs and demonstrate how our platform can transform their operations.', '2+ years of B2B sales experience\nExperience with enterprise software sales\nStrong communication and presentation skills\nSelf-motivated and results-driven', 'Identify and qualify new business opportunities\nConduct product demonstrations and presentations\nBuild and maintain relationships with key stakeholders\nMeet and exceed sales targets\nCollaborate with marketing and product teams', 'Competitive base salary + commission\nComprehensive health benefits\nTop-tier equipment\nLearning & development budget\nRemote work stipend', '$60,000 - $100,000 + Commission', 'Mid-level', '2024-12-31');
