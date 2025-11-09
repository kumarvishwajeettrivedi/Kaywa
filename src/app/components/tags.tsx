export interface CategoryData {
  title: string;
  items: string[];
}

export const categories: CategoryData[] = [
    {
      title: "Programming",
      items: ["Flutter", "React Native", "Python", "JavaScript", "TypeScript"]
    },
    {
      title: "Games", 
      items: ["BGMI", "Minecraft", "Valorant", "GTA V", "Fortnite"]
    },
    {
      title: "Design",
      items: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"]
    },
    // Add more categories as needed
    {
      title: "Web Development",
      items: ["HTML", "CSS", "React", "Vue", "Angular"]
    },
    {
      title: "Mobile Development", 
      items: ["iOS", "Android", "React Native", "Flutter", "Xamarin"]
    },
    {
      title: "Database",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"]
    },
    {
      title: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD"]
    },
    {
      title: "AI/ML",
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP"]
    },
    {
      title: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Digital Ocean", "Heroku"]
    },
    {
      title: "Tools",
      items: ["Git", "VS Code", "Postman", "Jira", "Slack"]
    },
    {
      title: "Frameworks",
      items: ["React", "Vue", "Angular", "Django", "Spring"]
    },
    {
      title: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C++"]
    }
  ];
