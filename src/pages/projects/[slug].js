// pages/projects/[slug].js
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Projects data - you can move this to a separate file later
const projectsData = {
  "drone-rl-control": {
    title: "Drone RL Control",
    description: "Simulation & Control of a Drone using Reinforcement Learning Techniques in a ROS2 Environment",
    longDescription: "This project focuses on enabling autonomous navigation for a drone in a simulated environment. Using the open-source SJTU drone repository, the drone was enhanced to support a 180-degree LiDAR laser scanner for obstacle detection. A custom environment was created using OpenAI Gymnasium, and the drone was trained to navigate the AWS HospitalWorld map autonomously with a Reinforcement Learning model developed using Stable Baselines 3. The project integrates simulation, control, and AI techniques to achieve intelligent drone navigation.",
    tags: ["ROS2", "Reinforcement Learning", "Gazebo", "OpenAI Gymnasium", "Stable Baselines3", "Python"],
    icon: "fa-solid fa-robot",
    githubUrl: "https://github.com/melaniayoo/Drone-RL-Control",
    features: [
      "LiDAR Integration: Extended the SJTU drone model to support a 180-degree LiDAR for real-time obstacle detection",
      "Custom Environment: Built a Gymnasium-based environment defining the drone's state and action space for RL training",
      "Reinforcement Learning: Trained the drone for autonomous navigation in a complex simulated map using Stable Baselines 3",
      "Simulation Tools: Leveraged Gazebo for realistic drone physics and environment simulation",
    ],
    images: [
      {
        src: "/images/drone-rl/drone_test_world.png",
        caption: "Drone Training in the AWS HospitalWorld map"
      },
      {
        src: "/images/drone-rl/drone_training.gif",
        caption: "Drone moving around the world and generating an RL model"
      },
      {
        src: "/images/drone-rl/project_flowchart.jpeg",
        caption: "The flowchart for the project is as follows:"
      },
      {
        src: "/images/drone-rl/terminal_output.jpg",
        caption: "Terminal Output of the RL model being trained"
      }
    ],
    date: "May 2024"
  },
  "handwriting-recognizer": {
    title: "Handwriting Recognizer",
    description: "Recognition and Conversion of Handwritten Alphabets and Numbers into Digital Text",
    longDescription: `AlphaDigit Recognizer is a deep learning–based handwriting recognition system that accurately converts handwritten digits and letters into digital text. Built with Convolutional Neural Networks (CNNs) in Python (PyTorch), it’s capable of recognizing a wide range of handwriting styles with high accuracy.
                      The model achieves 98.4% accuracy on the MNIST (digits) dataset and 80.8% accuracy on the EMNIST (alphabets) dataset. It also features an interactive Tkinter GUI that enables real-time drawing and prediction of handwritten inputs.
                      To improve performance and consistency, the project includes a preprocessing pipeline with image normalization and noise reduction techniques, helping the model deliver reliable and accurate results.`,
    tags: ["Python", "PyTorch", "Tkinter", "OpenCV", "NumPy", "Matplotlib", "TensorFlow"],
    icon: "fas fa-laptop-code",
    githubUrl: "https://github.com/melaniayoo/AlphaDigitRecognizer",
    features: [
      "High Accuracy Models: 98.4% on MNIST (digits) and 80.8% on EMNIST (alphabets)",
      "Interactive GUI: Users can draw characters directly and receive instant predictions",
      "Optimized Preprocessing: Computer vision techniques like image normalization and denoising improve prediction consistency"
    ],
    images: [
      {
        src: "/images/alpha-digit/terminal_output_MNIST.png",
        caption: "Terminal Output of MNIST dataset"
      },
      {
        src: "/images/alpha-digit/video.gif",
        caption: "Real-time digit recognition on the MNIST dataset using AlphaDigit Recognizer"
      },
      {
        src: "/images/alpha-digit/terminal_output_EMNIST.png",
        caption: "Terminal Output of EMNIST dataset"
      }
    ],
    date: "December 2024"
  },
  "water-level-tracker": {
    title: "Water Level Tracker",
    description: "A smart, portable system that monitors water consumption from a 500 mL bottle, providing real-time feedback and reminders to encourage proper hydration",
    longDescription: "The system uses a load cell connected to an HX711 amplifier and an STM32F401RE board to measure water intake with milliliter precision. It features two LEDs: one to indicate the daily water consumption goal has been reached, and another to show the selected calculation mode (male/female). A buzzer reminds the user to drink water if consumption is stagnant for more than 30 minutes. Users can interact with the system via a button to switch between calculation modes. The portable design ensures the bottle is securely sealed, preventing leaks during use.",
    tags: ["C", "STM32 Nucleo Board", "STM32CubeIDE", "Sensor Integration", "Embedded Systems"],
    icon: "fas fa-water",
    githubUrl: "https://github.com/melaniayoo/water-level-tracker",
    features: [
      "Accurate water measurement with load cell + HX711 amplifier",
      "Button interface to switch between male/female intake modes",
      "LED indicators for daily intake goals and calculation mode",
      "Buzzer reminders for inactivity over 30 minutes"
    ],
    images: [
      {
        src: "/images/water-level-tracker/electrical-schematic-drawing.png",
        caption: "Electrical Schematic Diagram"
      },
      {
        src: "/images/water-level-tracker/system-architecture-drawing.png",
        caption: "System Architecture Drawing"
      },
      {
        src: "/images/water-level-tracker/mechanical-drawing.png",
        caption: "Mechanical Drawing"
      },
      {
        src: "/images/water-level-tracker/layout.jpg",
        caption: "Layout of hardware components"
      },
      {
        src: "/images/water-level-tracker/layout2.jpg",
        caption: "Layout of hardware components"
      },
      {
        src: "/images/water-level-tracker/demo.gif",
        caption: "Demonstration of the project"
      }
    ],
    date: "November 2023"
  },
  "dance-dance-fingerlution": {
    title: "Dance Dance Fingerlution",
    description: "Interactive memory game using buttons, LEDs, and sound feedback",
    longDescription: "Dance-Dance-Fingerlution is a fun memory game where players replicate sequences of button presses displayed with LED lights. Each correct input is accompanied by audio feedback, while mistakes trigger a losing sound. The game gradually increases in difficulty by extending the sequence, providing an engaging and interactive experience using physical hardware components.",
    tags: ["Raspberry Pi", "Python", "GPIO Control", "Audio Playback", "Circuit Prototyping"],
    icon: "fas fa-gamepad",
    githubUrl: "https://github.com/melaniayoo/Dance-Dance-Fingerlution",
    features: [
      "Visual Feedback: LEDs indicate the sequence to follow and show level progression",
      "Auditory Feedback: Sounds play for each button press and indicate success or failure",
      "Level Progression: Sequence length increases with each successful round, gradually raising difficulty",
      "Logic Implementation: Utilized lists, conditional statements, and loops to manage sequence tracking, input validation, and game flow"
    ],
    images: [
      {
        src: "/images/dance-dance-fingerlution/image1.JPEG",
        caption: "Layout of hardware components"
      },
      {
        src: "/images/dance-dance-fingerlution/image2.JPEG",
        caption: "Layout of hardware components"
      },
      {
        src: "/images/dance-dance-fingerlution/image3.JPEG",
        caption: "Layout of hardware components"
      },
      {
        src: "/images/dance-dance-fingerlution/Dance-Dance-Fingerlution.gif",
        caption: "Demonstration of sample game round"
      }
    ],
    date: "June 2023"
  },
  "port-scanner": {
    title: "Port Scanner",
    description: "Python-based TCP port scanner that scans a given IP address or hostname over a specified range of ports",
    longDescription: "A network security tool designed for penetration testing and network analysis. This port scanner efficiently identifies open ports and services running on target systems, providing valuable information for security assessments and network monitoring.",
    tags: ["Python", "Network Security", "Penetration Testing", "Socket Programming"],
    icon: "fas fa-shield-alt",
    githubUrl: "https://github.com/melaniayoo/Port-Scanner",
    features: [
      "Set custom port ranges and configurable timeouts",
      "TCP-based detection with service name lookup (from common_ports.py)",
      "Verbose mode with reverse DNS resolution"
    ],
    images: [
      {
        src: "/images/port-scanner/result.png",
        caption: "Output of my Python-based Port Scanner showing detected open ports and services"
      }
    ],
    date: "June 2025"
  }
};

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const project = projectsData[slug];

  // Show loading state while router is ready
  if (router.isFallback || !project) {
    return (
      <Layout>
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} - Melania Yoo</title>
        <meta name="description" content={project.description} />
      </Head>

      <Layout>
        <section className="section-padding">
          <div className="container">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
              <Link href="/projects">
                <i className="fas fa-arrow-left"></i> Back to Projects
              </Link>
            </div>
            
            <div className="project-detail">
              {/* Project Header */}
              <div className="project-header">
                <div className="project-icon">
                  <i className={project.icon}></i>
                </div>
                <div className="project-title">
                  <h1>{project.title}</h1>
                  <p className="project-subtitle">{project.description}</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="project-main">
                  {/* About Section */}
                  <section className="content-section">
                    <h2>About This Project</h2>
                    <p>{project.longDescription}</p>
                  </section>

                  {/* Features Section */}
                  <section className="content-section">
                    <h2>Key Features</h2>
                    <ul className="features-list">
                      {project.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Project Gallery Section */}
                  {project.images && project.images.length > 0 && (
                    <section className="content-section">
                      <h2>Project Gallery</h2>
                      <div className="project-gallery">
                        {project.images.map((image, index) => (
                          <div key={index} className="gallery-item">
                            <div className="image-container">
                              <img
                                src={image.src}
                                alt={image.caption}
                                className="project-image"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div className="image-error" style={{display: 'none'}}>
                                <p>⚠️ Image not found: {image.src}</p>
                                <p>Please check the file path and make sure the image exists in your public folder.</p>
                              </div>
                            </div>
                            <p className="image-caption">{image.caption}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <div className="project-sidebar">
                  <div className="action-card">
                    <a 
                      href={project.githubUrl} 
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> View Code on GitHub
                    </a>

                    <div className="project-meta">
                      {/* Add Project Date Section */}
                      {project.date && (
                        <div className="meta-section">
                          <h3>Project Timeline</h3>
                          <div className="meta-date">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Completed: {project.date}</span>
                          </div>
                        </div>
                      )}
                    
                    <div className="project-meta">
                      <h3>Technologies & Tools</h3>
                      <div className="meta-tags">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="meta-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </Layout>

      <style jsx>{`
        .breadcrumb {
          margin-bottom: 2rem;
        }
        
        .breadcrumb a {
          color: var(--secondary-color);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }
        
        .breadcrumb a:hover {
          color: var(--primary-color);
        }
        
        .project-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .project-icon {
          font-size: 4rem;
          color: var(--primary-color);
          flex-shrink: 0;
        }
        
        .project-title h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }
        
        .project-subtitle {
          font-size: 1.2rem;
          color: var(--light-text);
          margin: 0;
        }
        
        .project-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        .content-section {
          margin-bottom: 3rem;
        }
        
        .content-section h2 {
          margin-bottom: 1.5rem;
          color: var(--secondary-color);
          font-size: 1.5rem;
          border-left: 4px solid var(--primary-color);
          padding-left: 1rem;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
        }
        
        .features-list li {
          padding: 0.8rem 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .features-list li:last-child {
          border-bottom: none;
        }
        
        .features-list i {
          color: var(--primary-color);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        
        .tech-tag {
          background: var(--primary-color);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: var(--border-radius);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        /* Project Gallery Styles - Original Size */
        .project-gallery {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin-top: 1rem;
        }
        
        .gallery-item {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
          width: 100%;
        }
        
        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          background: #f8f9fa;
          padding: 2rem;
          min-height: 200px;
        }
        
        .project-image {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .image-error {
          text-align: center;
          color: #dc2626;
          padding: 2rem;
        }
        
        .image-error p {
          margin: 0.5rem 0;
        }
        
        .image-caption {
          padding: 1.5rem;
          margin: 0;
          text-align: center;
          font-size: 0.95rem;
          color: var(--light-text);
          background: white;
          border-top: 1px solid #f0f0f0;
          font-style: italic;
        }
        
        .action-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          position: sticky;
          top: 2rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 1.5rem;
          background: var(--secondary-color);
          color: white;
          text-decoration: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: var(--transition);
          width: 100%;
          justify-content: center;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .btn:hover {
          background: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
        
        .project-meta h3 {
          margin-bottom: 1rem;
          color: var(--secondary-color);
          font-size: 1.2rem;
        }
        
        .meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .meta-tag {
          background: rgba(253, 224, 71, 0.2);
          color: var(--secondary-color);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .loading {
          text-align: center;
          padding: 4rem;
          font-size: 1.2rem;
          color: var(--light-text);
        }
        
        @media (max-width: 768px) {
          .project-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .project-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .project-gallery {
            gap: 2rem;
          }
          
          .image-container {
            padding: 1rem;
          }
          
          .action-card {
            position: static;
          }
          
          .project-title h1 {
            font-size: 2rem;
          }
        }

        /* Add to your existing CSS */
          .project-meta {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .meta-section {
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 1.5rem;
          }

          .meta-section:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .meta-section h3 {
            margin-bottom: 1rem;
            color: var(--secondary-color);
            font-size: 1.1rem;
            font-weight: 600;
          }

          .meta-date {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem;
            background: rgba(59, 130, 246, 0.05);
            border-radius: var(--border-radius);
            border-left: 3px solid var(--primary-color);
          }

          .meta-date i {
            color: var(--primary-color);
            width: 16px;
            text-align: center;
          }

          .meta-date span {
            color: var(--secondary-color);
            font-weight: 500;
            font-size: 0.95rem;
          }

          .meta-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .meta-tag {
            background: rgba(253, 224, 71, 0.2);
            color: var(--secondary-color);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          /* Ensure the action card has enough padding */
          .action-card {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            position: sticky;
            top: 2rem;
          }
      `}</style>
    </>
  );
}