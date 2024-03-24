const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config;
require("dotenv").config({ debug: true });

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

https: app.get("/", (req, res) => {
  console.log("Hii");
  res.send("Hii");
});

// route for API call
app.get("/:q", async (req, res) => {
  // q is the query(request) recieved from the frontend when the user types the text
  const text = req.params.q;
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Sakshi Dwivedi's journey is a testament to the power of passion, perseverance, and dedication. Born with a natural curiosity and a hunger for knowledge, Sakshi embarked on a path of exploration and self-discovery that would ultimately shape her into the accomplished technologist she is today.

            Growing up, Sakshi exhibited a keen interest in science and technology, often spending hours tinkering with gadgets and exploring the inner workings of machines. Her innate curiosity led her to pursue a career in engineering, with a particular focus on computer science and robotics.
            
            During her undergraduate studies at the prestigious Indian Institute of Technology (ISM) Dhanbad, Sakshi immersed herself in a rigorous academic curriculum that challenged her intellect and honed her analytical skills. She excelled in courses ranging from data structures and algorithms to object-oriented programming, laying a solid foundation for her future endeavours in the field of technology.
            
            But Sakshi's education extended far beyond the walls of the classroom. She actively sought out opportunities to gain hands-on experience through internships and projects, eager to apply her theoretical knowledge to real-world problems. Her internship at Centre for Artificial Intelligence and Robotics (CAIR) DRDO provided her with invaluable insights into the field of autonomous navigation, where she worked on a groundbreaking project focused on the development of MiniUGV tracked vehicles using Lidar-visual SLAM technology. Her contributions to the project, including sensor calibration and implementation of LVI-SAM, demonstrated her technical prowess and ability to tackle complex engineering challenges with precision and ingenuity.
            
            Sakshi's professional journey continued to flourish as she embarked on an internship at Invento Robotics, where she served as a Robotics Software Engineer Intern. Here, she played a pivotal role in developing ROS actions for autonomous navigation of robots, showcasing her proficiency in computer vision and sensor integration. Her vision-based tracking algorithms and autonomous docking features proved instrumental in enhancing the capabilities of the robot, earning her recognition for her innovative contributions to the field of robotics.
            
            In addition to her work in the industry, Sakshi also devoted herself to various passion projects, including the development of full-stack applications like a Food Delivery App and CampSite Web Application. Leveraging her expertise in technologies such as MERN stack and EJS, Sakshi created intuitive and user-friendly applications that catered to the needs of modern consumers. Her attention to detail and commitment to excellence were evident in every aspect of her work, from the seamless user experience to the robust backend infrastructure.
            
            But Sakshi's journey was not without its challenges. Like all great innovators, she faced setbacks and obstacles along the way, but it was her resilience and determination that ultimately propelled her forward. With each challenge she encountered, Sakshi emerged stronger and more determined than ever, armed with the knowledge and experience to tackle whatever the future held.
            
            As Sakshi reflects on her journey thus far, she is filled with a sense of gratitude for the opportunities she has been afforded and a renewed sense of purpose for the road ahead. With her sights set on the horizon, Sakshi remains committed to pushing the boundaries of technology and driving positive change in the world. Whether it's through her work in robotics, her passion for education, or her commitment to community service, Sakshi's impact will undoubtedly be felt far and wide for years to come.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "In the bustling city of Meadow brook, lived a young girl named Sophie. She was a bright and curious soul with an imaginative mind.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json(); // response to the query from the API
  // console.log(data);
  res.send(data);
});

app.listen(5000, () => {
  console.log("server is running");
});
