export const lessons = {
  subjects: {
    Biology: [
      {
        id: "BIO001",
        title: "Understanding Photosynthesis",
        gradeLevel: "Grade 6",
        duration: "45 minutes",
        previewImage: "https://source.unsplash.com/featured/?photosynthesis",
        objectives: [
          "Describe the process of photosynthesis",
          "Identify the role of sunlight, water, and carbon dioxide",
          "Explain the importance of photosynthesis in the food chain",
        ],
        materials: [
          "Whiteboard and markers",
          "Leaf samples",
          "Diagrams of the photosynthesis process",
          "YouTube video link: https://youtu.be/photosynthesis-example",
        ],
        activities: [
          {
            id: "ACT001",
            name: "Leaf Observation",
            description:
              "Students will examine different types of leaves to identify chlorophyll.",
            estimatedTime: "15 minutes",
          },
          {
            id: "ACT002",
            name: "Photosynthesis Roleplay",
            description:
              "Students will act out the roles of sunlight, water, carbon dioxide, and chlorophyll.",
            estimatedTime: "20 minutes",
          },
        ],
      },
      {
        id: "BIO002",
        title: "Human Digestive System",
        gradeLevel: "Grade 7",
        duration: "50 minutes",
        previewImage: "https://source.unsplash.com/featured/?biology,digestive",
        objectives: [
          "Identify the main parts of the digestive system",
          "Explain the function of each organ in digestion",
          "Describe the journey of food through the body",
        ],
        materials: [
          "Model of the digestive system",
          "Worksheet with diagram",
          "Interactive quiz app",
        ],
        activities: [
          {
            id: "ACT003",
            name: "Journey of Food Simulation",
            description:
              "Students simulate food traveling through the digestive system with props.",
            estimatedTime: "20 minutes",
          },
          {
            id: "ACT004",
            name: "Label the Diagram",
            description:
              "Students label a diagram of the digestive system in small groups.",
            estimatedTime: "15 minutes",
          },
        ],
      },
    ],
    Mathematics: [
      {
        id: "MATH001",
        title: "Introduction to Fractions",
        gradeLevel: "Grade 4",
        duration: "30 minutes",
        previewImage: "https://source.unsplash.com/featured/?math,fractions",
        objectives: [
          "Define fractions as parts of a whole",
          "Understand numerator and denominator",
          "Represent fractions using diagrams",
        ],
        materials: [
          "Fraction circle cutouts",
          "Whiteboard and markers",
          "Worksheets for fraction practice",
        ],
        activities: [
          {
            id: "ACT005",
            name: "Fraction Circle Puzzle",
            description:
              "Students will create fractions using circle cutouts and match them to written fractions.",
            estimatedTime: "15 minutes",
          },
          {
            id: "ACT006",
            name: "Fraction Art",
            description:
              "Students will create art using fractions of colors and shapes.",
            estimatedTime: "20 minutes",
          },
        ],
      },
      {
        id: "MATH002",
        title: "Understanding Pythagoras Theorem",
        gradeLevel: "Grade 9",
        duration: "60 minutes",
        previewImage: "https://source.unsplash.com/featured/?math,geometry",
        objectives: [
          "Explain the Pythagoras theorem",
          "Solve right-angle triangle problems using the theorem",
          "Apply the theorem to real-world scenarios",
        ],
        materials: [
          "Graph paper",
          "Right-angle triangle cutouts",
          "Interactive geometry software",
        ],
        activities: [
          {
            id: "ACT007",
            name: "Proof of Pythagoras",
            description:
              "Students reconstruct the proof of Pythagoras theorem using cutouts.",
            estimatedTime: "20 minutes",
          },
          {
            id: "ACT008",
            name: "Triangle Problems",
            description:
              "Students solve problems involving right-angle triangles in small groups.",
            estimatedTime: "30 minutes",
          },
        ],
      },
    ],
    English: [
      {
        id: "ENG001",
        title: "Exploring Poetry: Rhymes and Metaphors",
        gradeLevel: "Grade 7",
        duration: "40 minutes",
        previewImage: "https://source.unsplash.com/featured/?poetry,literature",
        objectives: [
          "Identify rhyming schemes in poems",
          "Understand metaphors and their use in poetry",
          "Create a short poem using rhymes and metaphors",
        ],
        materials: [
          "Poetry handouts",
          "Whiteboard and markers",
          "Creative writing notebooks",
        ],
        activities: [
          {
            id: "ACT009",
            name: "Rhyme Hunt",
            description:
              "Students identify rhyming patterns in provided poetry handouts.",
            estimatedTime: "10 minutes",
          },
          {
            id: "ACT010",
            name: "Metaphor Creation",
            description:
              "Students write sentences using metaphors to describe objects.",
            estimatedTime: "15 minutes",
          },
        ],
      },
    ],
    History: [
      {
        id: "HIST001",
        title: "The French Revolution",
        gradeLevel: "Grade 8",
        duration: "60 minutes",
        previewImage:
          "https://source.unsplash.com/featured/?history,french-revolution",
        objectives: [
          "Explain the causes of the French Revolution",
          "Describe key events and their significance",
          "Analyze the impact of the revolution on modern society",
        ],
        materials: [
          "Timeline of events",
          "Historical documents excerpts",
          "YouTube video on the French Revolution",
        ],
        activities: [
          {
            id: "ACT013",
            name: "Event Timeline",
            description:
              "Students create a timeline of key events during the French Revolution.",
            estimatedTime: "30 minutes",
          },
          {
            id: "ACT014",
            name: "Revolution Debate",
            description:
              "Students debate whether the revolution achieved its goals.",
            estimatedTime: "20 minutes",
          },
        ],
      },
    ],
    Math: [
      {
        id: "MATH001",
        title: "Creative Geometry – Sculpting with Math",
        description:
          "Students explore mathematical shapes and forms through creative sculpting activities.",
        duration: "60 minutes",
        gradeLevel: "6th-8th",
        objectives: [
          "Understand geometric properties.",
          "Create sculptures using mathematical principles.",
        ],
        materials: ["Clay", "Ruler", "Protractor"],
        previewImage: "https://artsnowlearning.org/creative-geometry-image.jpg",
        videoLink: "https://youtube.com/creative-geometry",
        rating: 4.7,
        source: "https://artsnowlearning.org",
      },
    ],
    Science: [
      {
        id: "SCIENCE001",
        title: "Weather in Motion",
        description:
          "Learn about the science of weather patterns and how they influence our environment.",
        duration: "45 minutes",
        gradeLevel: "4th-6th",
        objectives: [
          "Analyze weather data.",
          "Understand the causes of various weather phenomena.",
        ],
        materials: ["Weather charts", "Thermometer", "Internet access"],
        previewImage:
          "https://www.weathereducation.org/weather-motion-image.jpg",
        videoLink: "https://youtube.com/weather-motion",
        rating: 4.5,
        source: "https://weathereducation.org",
      },
    ],
    Arts: [
      {
        id: "ART001",
        title: "Kandinsky’s Circles and Place Value",
        description:
          "Students combine visual art and math by creating colorful circle compositions while exploring place values.",
        duration: "90 minutes",
        gradeLevel: "2nd-4th",
        objectives: [
          "Create art inspired by Kandinsky.",
          "Learn about place value in numbers.",
        ],
        materials: ["Colored paper", "Scissors", "Glue"],
        previewImage: "https://artsnowlearning.org/kandinsky-circles-image.jpg",
        videoLink: "https://youtube.com/kandinsky-circles",
        rating: 4.9,
        source: "https://artsnowlearning.org",
      },
    ],
    History: [
      {
        id: "HISTORY001",
        title: "Teaching the Transatlantic Slave Trade",
        description:
          "Using art to teach the history and legacy of the transatlantic slave trade.",
        duration: "90 minutes",
        gradeLevel: "9th-12th",
        objectives: [
          "Understand historical contexts of the transatlantic slave trade.",
          "Analyze art as a historical source.",
        ],
        materials: ["Worksheets", "Historical art prints"],
        previewImage: "https://nga.gov/teaching-slave-trade-image.jpg",
        videoLink: "https://youtube.com/teaching-slave-trade",
        rating: 4.8,
        source: "https://nga.gov",
      },
    ],
    "Language Arts": [
      {
        id: "LANG001",
        title: "Exploring Narrative Writing Through Art",
        description:
          "Students develop their narrative writing skills by examining and interpreting visual artworks.",
        duration: "60 minutes",
        gradeLevel: "5th-8th",
        objectives: [
          "Write creative narratives.",
          "Analyze themes in visual art.",
        ],
        materials: ["Notebook", "Art prints", "Pencils"],
        previewImage: "https://artsnowlearning.org/narrative-writing-image.jpg",
        videoLink: "https://youtube.com/narrative-writing",
        rating: 4.6,
        source: "https://artsnowlearning.org",
      },
    ],
  },
};
