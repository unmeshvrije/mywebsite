export const workItems = [
  {
    title: "Senior AI Engineer at Carv",
    period: "2025 – present",
    description:
      "Owned the Candidate Sourcing feature from research to customer delivery. Built with LangGraph, RAG, and LangSmith for implementation and tracing. Hands-on with A2A, skills-based agents. Designed and implemented bias/fairness testing for compliance.",
    tags: ["LLM", "RAG", "LangGraph", "A2A", "Agents"],
  },
  {
    title: "Software Engineer at Crunchr",
    period: "2020 – 2024",
    description:
      "Owned the user and group management feature end-to-end. Worked on external API design, built an LLM-based assistant for the people analytics product, and developed an in-house data connector with a custom ETL pipeline.",
    tags: ["Python", "API Design", "LLM", "ETL"],
  },
  {
    title: "PhD Research at VU Amsterdam",
    period: "2016 – present",
    description:
      "Research on Knowledge Graphs, query answering, and embedding-based link prediction at Vrije Universiteit Amsterdam.",
    tags: ["Knowledge Graphs", "Embeddings", "Datalog", "ML"],
    scholarUrl: "https://scholar.google.com/citations?hl=en&user=FqcCMaoAAAAJ",
  },
  {
    title: "Backend Engineering at Amazon",
    period: "2013 – 2016",
    description:
      "Deployed server software in a large-scale distributed system (EBS). Performance benchmarking, root-cause analysis, data-replication bug fixes, and a data-migration protocol for server recovery.",
    tags: ["C++", "Distributed Systems", "AWS"],
  },
];

export const teachingIntro =
  "I teach the way I was taught. I start from first principles. I use hand-drawn notes, live code and analogies that stick. My courses run live online for working engineers and students across the globe. I have designed and taught Python at the VU Amsterdam Summer School, built curriculum and taught at HackYourFuture for six years, and taught kids to code at Seattle CoderDojo.";

export const teachingStats = [
  { value: "22 / 23", label: "students would recommend my courses" },
  { value: "22 / 23", label: "rated the teaching pace “perfect”" },
  { value: "4.7 / 5", label: "for live coding & demos (Course of AI)" },
  { value: "6 yrs", label: "volunteer teaching at HackYourFuture" },
];

export const courses = [
  {
    icon: "terminal",
    title: "The Design of the UNIX Operating System",
    subtitle: "Based on Maurice J. Bach",
    schedule: "January – May",
    status: "2 batches completed",
    description:
      "A chapter-by-chapter journey through the internals of UNIX. It covers the buffer cache, inodes, file system algorithms, fork/exec, scheduling and memory management. It is taught in Marathi. Every algorithm is paired with working C programs from W. Richard Stevens, so students see the kernel's ideas run on a real machine.",
    highlights: [
      "Hand-written PDF notes & audio recordings",
      "C programs (W. Richard Stevens)",
      "Quizzes after every few chapters",
      "Taught in Marathi",
    ],
  },
  {
    icon: "brain",
    title: "Course of AI",
    subtitle: "Foundations to modern deep learning",
    schedule: "September – December",
    status: "Batch 2 in progress",
    description:
      "Builds AI from the ground up: calculus, linear algebra and probability; neurons and backpropagation; RNNs, LSTMs and CNNs; Transformers and deep reinforcement learning. Classic papers, such as Turing 1950 and Word2Vec, give the history and the thinking behind each idea.",
    highlights: [
      "Live coding (incl. a tiny autograd engine)",
      "Classic research papers",
      "Weekly quizzes",
      "Notes & (video) recordings for every session",
    ],
  },
  {
    icon: "code",
    title: "Programming in Python",
    subtitle: "VU Amsterdam Summer School",
    schedule: "2019, 2020",
    status: "2 editions",
    description:
      "Designed and taught the summer school's Python course for beginners. It goes from lists, loops and functions to file I/O. It ends with a project on real-world data. Taught as the official course lecturer for two editions.",
    highlights: ["Course design", "Python", "Beginner-friendly", "Real-world data project"],
    links: [
      {
        label: "2019 course listing",
        url: "https://www.shorttermprograms.com/programs/2d6nz/programming-in-python",
      },
    ],
  },
  {
    icon: "users",
    title: "HackYourFuture",
    subtitle: "Curriculum designer, teacher & mentor",
    schedule: "2016 – 2022",
    status: "6 years",
    description:
      "Designed the Git & Command Line and Databases modules for HackYourFuture Amsterdam, and taught them to refugees and career-changers retraining as software developers, in Amsterdam and at the Brussels and Copenhagen chapters. Ran “How to teach” and mentorship workshops for volunteers in Belgium and Denmark, mentored students through tech interviews, and contributed to the Cloud Development curriculum.",
    highlights: [
      "Curriculum design",
      "Git & CLI",
      "Databases",
      "Teacher training",
      "Interview mentoring",
    ],
    links: [
      { label: "Databases module", url: "https://github.com/HackYourFuture/databases" },
      { label: "Git module", url: "https://github.com/HackYourFuture/Git" },
      { label: "Command Line module", url: "https://github.com/HackYourFuture/CommandLine" },
    ],
  },
  {
    icon: "blocks",
    title: "Seattle CoderDojo",
    subtitle: "Volunteer teacher for kids",
    schedule: "2014 – 2016",
    status: "Saturdays",
    description:
      "Spent Saturdays teaching kids to program. We started with MIT's Scratch to build intuition for loops, events and logic. Then we moved on to Java.",
    highlights: ["Scratch", "Java", "Kids"],
  },
];

export const testimonials = [
  {
    quote:
      "Even though it was a one-way conversation, it kept me engaged. It never felt like you were sitting in Amsterdam teaching us. It always felt like you were right next to us. After the class ended, I felt that gap.",
    course: "UNIX · Batch 1",
    featured: true,
  },
  {
    quote:
      "The class helped me a lot. I just gave an interview at Semtech, they asked me about complete OS design, and I got placed there. Thank you very much!",
    course: "UNIX · Batch 1",
    translated: true,
  },
  {
    quote:
      "I got what I wanted, and that too in my mother tongue. I landed a UNIX job because of this class. I wanted to switch to UNIX somehow, and I'm glad I made it.",
    course: "UNIX · Batch 2",
  },
  {
    quote:
      "A “one of a kind” course. Courses like this should exist. Ones that actually open up the internals, the great minds and the thinking behind AI!",
    course: "Course of AI · Batch 1",
  },
  {
    quote:
      "Before the course I wasn't ready to believe in AI's magic. Now I'm sure AI is not magic. It is a technology made by magic people.",
    course: "Course of AI · Batch 1",
  },
  {
    quote:
      "It honestly felt more like learning from a friend than from a teacher. You made detailed notes, repeatedly asked if we understood, and tried your best to make sure everyone was following along.",
    course: "UNIX · Batch 1",
  },
  {
    quote:
      "Very few teachers teach purely for the love of teaching. That's what I experienced here.",
    course: "UNIX · Batch 2",
    translated: true,
  },
  {
    quote:
      "Learning the internals of the OS helped me understand Git and other tools. In engineering college I wondered how all this works. Now the truth is being revealed.",
    course: "UNIX · Batch 1",
  },
  {
    quote:
      "Even though the class was online, it never felt like it. Every question got an answer, and I understood the answer.",
    course: "UNIX · Batch 1",
    translated: true,
  },
  {
    quote:
      "Your teaching is awesome: real-life examples, stories, jokes, truth, and the history behind Bach.",
    course: "UNIX · Batch 2",
  },
  {
    quote:
      "You give really genuine feedback, and I felt it in every session. No shame, no fear, just straight to the point.",
    course: "UNIX · Batch 2",
  },
  {
    quote:
      "Unmesh is a very excellent and smart teacher, and always available for feedback.",
    course: "HackYourFuture · 2017",
  },
];

export const researchPapers = [
  {
    title:
      "On the Impact of Compression and Aggregation on Knowledge Graph Embeddings",
    venue: "KG-NeSy 2026 (ISWC Workshops)",
    venueUrl: "https://kg-nesy.github.io/",
    pdfUrl: "/papers/KGNeSy_2026_Compression_Aggregation_KGE.pdf",
  },
  {
    title:
      "Ensemble-Based Fact Classification with Knowledge Graph Embeddings",
    venue: "ESWC 2022",
    pdfUrl:
      "/papers/ESWC_Ensemble_Based_Fact_Classification_with_Knowledge_Graph_Embeddings.pdf",
  },
  {
    title:
      "Rewrite or not Rewrite? ML-based Algorithm Selection for Datalog Query Answering on Knowledge Graphs",
    venue: "ECAI 2020",
    pdfUrl: "/papers/ecai_2020_magic_sets_QSQR.pdf",
  },
  {
    title:
      "Searching for Embeddings in a Haystack: Link Prediction on Knowledge Graphs with Subgraph Pruning",
    venue: "WWW 2020",
    pdfUrl: "/papers/WWW_subgraphs.pdf",
  },
];

export const blogPosts = [
  {
    title: "नवनवोन्मेषशालिनी",
    description:
      "Marathi poems and travelogues.",
    url: "https://unmeshjoshi.blogspot.com/",
    language: "Marathi",
  },
  {
    title: "ड(च) डायरी(चा)",
    description:
      "Experiences in the Netherlands, in Marathi.",
    url: "https://unmeshnaringideshat.blogspot.com/",
    language: "Marathi",
  },
  {
    title: "वाघिणीचे दूध",
    description:
      "Travel writing and reflections.",
    url: "https://unmeshjoshi.wordpress.com/",
    language: "English",
  },
  {
    title: "For all C++ lovers",
    description:
      "C++ programming blog.",
    url: "https://docplusplusforthis.blogspot.com/",
    language: "English",
  },
];

export const socialLinks = {
  email: "me@unme.sh",
  linkedin: "https://www.linkedin.com/in/unmeshjoshi",
  github: "https://github.com/unmeshvrije",
};

export const podcastInfo = {
  title: "काव्यातले काही",
  titleRomanized: "KavyaTale Kahi",
  description:
    "A Marathi poetry podcast exploring the beauty of popular Hindi songs and their Marathi interpretation. Over 25 episodes of song histories, reflections, and interpretations about the songs that spoke to me.",
  spotifyEmbedUrl:
    "https://open.spotify.com/embed/show/4YS6PdHHnnrPaAukxuQI1g?utm_source=generator&theme=0",
};
