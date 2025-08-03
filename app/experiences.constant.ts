const experiences = [
        {
            dateStart: new Date(2022, 8),
            dateEnd: new Date(2024, 11),
            name: "Full Stack Software Engineer",
            description: "Rotated across 3 teams as a Graduate Software Engineer in Rokos Capital Management. Worked in the Risk Technology platform, Middle Office workflows and Research Technology. Worked in weekly sprints as part of an agile release cycle. Emphasis on Test Driven Development. Contributed to main .NET stack and implemented a RAG-based news digestion pipeline designed to run user-generated prompts on economic data. Engineered a high-performing cache for a trade management service managing 5+ million database rows, resulting in 60% reduction in cold startups.",
            technologies: ["C#/.NET", "Python/Flask", "Typescript/React", "Java/Spring", "SQL", "Azure", "TDD", "Git"]
        },
        {
            dateStart: new Date(2022, 3),
            dateEnd: new Date(2022, 6),
            name: "NLP-based Psychotherapist Chatbot for Administering the Self-Attachment Protocol Techniques",
            description: 'Trained a complex emotion recognition model, based on several different transformer architectures and integrated it into a chatbot system. Achieved a First Class and recorded 85% user-satisfaction rate among test users. You can see the final report <a href="/Project_Report.pdf" target="_blank" rel="noopener noreferrer">here</a>.',
            technologies: ["Pytorch", "NLP", "Jupyter Notebook"]
        },
        {
            dateStart: new Date(2021, 3),
            dateEnd: new Date(2021, 8),
            name: "Software Engineering Intern",
            description: "Industrial placement in the Order Gateway team, responsible for the connectivity between the fund and the exchanges. Created an API to serve livemetadata from market gateways, which was part of an ongoing project to automate market orders. The API was benchmarked to handle 1000 requets in 4 seconds, utilising asynchronous IO. Implemented the business logic into the mainstack in C++, with an emphasis on low latency.",
            technologies: ["Python", "Flask/FastAPI", "C++", "Unix/Bash", "Consul", "Git", "CI/CD"]
        },
        {
            dateStart: new Date(2020, 5),
            dateEnd: new Date(2020, 8),
            name: "Software Engineering Intern",
            description: "Internship in the Market Data team, responsible for the feedhandlers, serving market data for the whole fund. Created a bespoke filtering business logic solution to reduce latency in the feedhandlers with the most traffic. Worked on refactoring and adding new feedhandlers in C++.",
            technologies: ["Python", "C++", "Unix/Bash", "Git", "CI/CD"]
        },
        {
            dateStart: new Date(2018, 8),
            dateEnd: new Date(2022, 6),
            name: "MEng Computing Student",
            description: "I graduated from Imperial College London with a MEng in Computing. Throughout my course I studied various theoretical and practical Computer Sciences topics, including Functional Programming, Discrete Structures, Logic, Algorithms and Data Structures, Software Engineering Design, Machine Learning, Reinforcement Learning, Natural Language Processing, Blockchain Technologies. I graduated with a high Upper Second Class Honours.",
            technologies: ["Haskell", "Java", "Kotlin", "Python", "Pytorch", "Git", "Unix/Bash"]
        }
    ];

export default experiences;