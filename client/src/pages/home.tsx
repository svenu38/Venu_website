import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import type { InsertContactSubmission } from "@shared/schema";
import {
  Code,
  Building,
  ChartPie,
  Brain,
  Bot,
  ChartLine,
  Cloud,
  Target,
  Handshake,
  Globe,
  Lightbulb,
  CheckSquare,
  AlertTriangle,
  Users,
  Calculator,
  BookOpen,
  Sprout,
  Camera,
  Mountain,
  UtensilsCrossed,
  Mail,
  Linkedin,
  Phone,
  Menu,
  X,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink,
  Paintbrush,
  PaintRoller,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const { toast } = useToast();


    const Section = ({ children, id }: any) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20"
    >
      {children}
    </motion.section>
  );




const [darkNav, setDarkNav] = useState(false);
const [activeSection, setActiveSection] = useState("home");

/* Switch navbar theme after Hero */
useEffect(() => {
  const hero = document.getElementById("home");

  const handleScroll = () => {
    if (!hero) return;
    const heroBottom = hero.offsetHeight - 80;
    setDarkNav(window.scrollY > heroBottom);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
  const sectionIds = [
    "home",
    "education",
    "experience",
    "projects",
    "skills",
    "certifications",
    "contact",
  ];

  const handleScroll = () => {
    const scrollPos = window.scrollY + 120;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section && scrollPos >= section.offsetTop) {
        setActiveSection(sectionIds[i]);
        break;
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);




  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
        }
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 50) {
        navbar?.classList.add("shadow-lg");
      } else {
        navbar?.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    }, observerOptions);

    // Observe all sections except the hero
    document.querySelectorAll("section:not(#home)").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const skillCategories = [
    {
      title: "AI & Digital Transformation",
      skills: [
        {
          icon: Brain,
          name: "Gen AI + CoPilot",
          color: "from-soft-blue/10 to-gold/10 border-soft-blue/20",
        },
        {
          icon: Bot,
          name: "Process Automation",
          color: "from-gold/10 to-soft-blue/10 border-gold/20",
        },
        {
          icon: ChartLine,
          name: "Data Analytics",
          color: "from-navy/10 to-soft-blue/10 border-navy/20",
        },
        {
          icon: Cloud,
          name: "Cloud Solutions",
          color: "from-soft-blue/10 to-navy/10 border-soft-blue/20",
        },
      ],
    },
    {
      title: "Technical Tools",
      skills: [
        {
          icon: Code,
          name: "Visual Studio, IntelliJ, Eclise IDE",
          color: "from-purple-100 to-pink-100 border-purple-200",
        },
        {
          icon: Building,
          name: "Jira, Target Process, Asana, Confluence",
          color: "from-blue-100 to-indigo-100 border-blue-200",
        },
        {
          icon: ChartPie,
          name: "SQL, MongoDB, PowerBI, Snowflake DB",
          color: "from-orange-100 to-red-100 border-orange-200",
        },
        {
          icon: Code,
          name: "Python, Javascript, Java",
          color: "from-green-100 to-teal-100 border-green-200",
        },
      ],
    },
    {
      title: "Business Strategy",
      skills: [
        {
          icon: Target,
          name: "Strategic Planning",
          color: "from-gold/10 to-yellow-100 border-gold/20",
        },
        {
          icon: Handshake,
          name: "Stakeholder Management",
          color: "from-navy/10 to-blue-100 border-navy/20",
        },
        {
          icon: Globe,
          name: "Global Procurement & Operations",
          color: "from-soft-blue/10 to-cyan-100 border-soft-blue/20",
        },
        {
          icon: Lightbulb,
          name: "Innovation",
          color: "from-purple-100 to-soft-blue/10 border-purple-200",
        },
      ],
    },
    {
      title: "Program Management",
      skills: [
        {
          icon: CheckSquare,
          name: "Agile/Scrum Methodologies",
          color: "from-emerald-100 to-green-100 border-emerald-200",
        },
        {
          icon: AlertTriangle,
          name: "Risk Management",
          color: "from-red-100 to-pink-100 border-red-200",
        },
        {
          icon: Users,
          name: "Team Leadership",
          color: "from-blue-100 to-soft-blue/10 border-blue-200",
        },
        {
          icon: Calculator,
          name: "Resource Allocation & Budgeting",
          color: "from-yellow-100 to-gold/10 border-yellow-200",
        },
      ],
    },
  ];

      const educationData = [
      {
        id: 1,
        title: "Master’s in Human-Centered Artificial Intelligence",
        institution: "Università degli Studi di Napoli Federico II, Italy",
        year: "Oct 2023 – Dec 2024",
        description:
          "Specialized in trustworthy AI, deep learning, and LLM evaluation. Thesis focused on real-world chatbot performance measurement using FACQ metrics, including user studies and ethical AI analysis.",
        image: "/unina.jpg",
        tags: [
          "Machine Learning",
          "Responsible AI",
          "LLMs",
          "Chatbot Evaluation",
          "FACQ Metrics",
          "Ethics & Privacy",
        ],
        type: "degree",
      },

      {
        id: 2,
        title: "Master’s in Data Science",
        institution: "Università degli Studi di Napoli Federico II, Italy",
        year: "Oct 2021 – Mar 2024",
        description:
          "Focused on data engineering, predictive modeling, and scalable analytics pipelines using Azure Databricks, Synapse Analytics, and PySpark.",
        image: "/unina.jpg",
        tags: [
          "Data Engineering",
          "PySpark",
          "Azure Databricks",
          "ETL Pipelines",
          "Predictive Modeling",
        ],
        type: "degree",
      },

      {
        id: 3,
        title: "Bachelor of Engineering in Computer Science",
        institution: "Nitte Meenakshi Institute of Technology, India",
        year: "Aug 2016 – Jul 2019",
        description:
          "Strong foundation in software engineering, algorithms, and machine learning. Final-year project on deep learning–based face mask and social distancing detection.",
        image: "/nitte.jpg",
        tags: [
          "Software Engineering",
          "Deep Learning",
          "CNNs",
          "Computer Vision",
          "Final Year Project",
        ],
        type: "degree",
      },
    ];


 const workExperienceData = [
  {
    id: 1,
    title: "AI Researcher",
    company: "University of Naples Federico II, Italy",
    period: "Dec 2024 – Nov 2025",
    description:
      "Conducting applied research on biometric security, fingerprint liveness detection, and adversarial robustness in deep learning. Leading model development and experimentation for LivDet 2025 and BIOVID 2025 challenges, building end-to-end AI pipelines on Azure using PyTorch, Docker, and CI/CD with GitHub Actions. Collaborating with international research teams and presenting results at ICIAP 2025.",
    image: "/unina.jpg",
    tags: [
      "Biometrics",
      "Deepfake Detection",
      "PyTorch",
      "Azure ML",
      "Adversarial Learning",
      "LivDet 2025",
      "CI/CD",
    ],
    type: "current",
  },

  {
    id: 2,
    title: "AI Chatbot Developer (Intern)",
    company: "Fiven, Remote",
    period: "Jan 2024 – Dec 2024",
    description:
      "Developed LLM-based chatbot systems for real-world customer support, focusing on prompt engineering, sentiment adaptation, and response evaluation. Designed quantitative NLP metrics for chatbot performance assessment, conducted user studies, and contributed to responsible AI analyses covering privacy, fairness, and regulatory compliance.",
    image: "/fiven.png",
    tags: [
      "LLMs",
      "Prompt Engineering",
      "NLP",
      "Chatbot Evaluation",
      "Responsible AI",
      "Python",
    ],
    type: "previous",
  },

  {
    id: 3,
    title: "Junior Data Engineer",
    company: "Graded SpA, Naples, Italy",
    period: "Jun 2023 – May 2024",
    description:
      "Built scalable ETL pipelines using Azure Data Factory, Synapse Analytics, and Databricks for real-time sensor data ingestion. Developed predictive ML models in PySpark and Azure ML, deployed analytics workflows using Docker and CI/CD pipelines, and delivered Power BI dashboards for operational decision-making.",
    image: "/graded.png",
    tags: [
      "Azure Data Factory",
      "Databricks",
      "PySpark",
      "ETL",
      "Power BI",
      "Docker",
    ],
    type: "previous",
  },

  {
    id: 4,
    title: "Data Analyst",
    company: "VA Solutions Pvt Ltd, Hyderabad, India",
    period: "Aug 2019 – Dec 2021",
    description:
      "Worked on SQL-based data analysis and reporting pipelines, developed Power BI dashboards, and implemented ETL workflows to support business operations and performance optimization.",
    image: "/VA_solutions.png",
    tags: [
      "SQL",
      "Power BI",
      "ETL",
      "Data Analysis",
      "Azure",
    ],
    type: "previous",
  },
];


  // Projects data for carousel
  const projectsData = [
    {
      id: 1,
      link: "https://github.com/svenu38/Predictive-Modelling-of-Diabetes-Risk-using-Health-Indicators/blob/main/Documents/Research_Projects/analysis_ppt.pptx",
      title: "Predictive Modeling of Diabetes Risk using Health Indicators",
      company: "Predictive Analytics for Business",
      description:
        "Utilized publicly available health data to build predictive models assessing individual risk for diabetes. This project leveraged the 2015 Behavioral Risk Factor Surveillance System (BRFSS) dataset from the CDC to explore health indicators and develop early detection tools. ",
      image:
        "https://cdn.analyticsvidhya.com/wp-content/uploads/2022/01/Diabetes-Prediction-Using-Machine-Learning.webp",
      tags: [
        "Data Preparation",
        "Data Exploration",
        "Model Development",
        "Machine Learning",
        "Feature Importance Analysis",
        "Linear Regression",
        "Logistic Regression",
        "KNN",
        "Decision Trees",
        "SVM",
      ],
      impact: "R, R Studio, Kaggle, Tableau",
    },
    {
      id: 1,
      link: "https://drive.google.com/file/d/11GX73FO7IZpSuv9dtR-KQjJ97xPGBco0/view?usp=drive_link",
      title: "Amazon Haul - Market Research & Product Strategy",
      company: "Corporate Information Planning",
      description:
        "Developed a strategic product roadmap for Amazon SkyHaul, a conceptual logistics and delivery enhancement initiative aimed at redefining last-mile efficiency and customer experience. The project integrated emerging technologies with market insights to shape a scalable, innovation-driven solution.",
      image:
        "https://image.cnbcfm.com/api/v1/image/108078551-1734649503100-site_Haul_Thumbnail.png?v=1734649575",
      tags: [
        "MVP",
        "Product Strategy",
        "Market Research",
        "Competitor Analysis",
        "Business Model Canvas",
        "Phased Tech Roadmap",
        "Revenue Modeling",
        "Strategic Partnerships",
        "Market Positioning",
        "Visual Strategy Assets"
      ],
      impact: "Canva, Figma, GenAI, Microsoft 365",
    },
    {
      id: 2,
      link: "https://drive.google.com/drive/folders/1XV9wfXHVvWxLNkQUb--_l1I0J1uPwMhL?usp=drive_link",
      title: "AR System Implementation at Artemis Logistics",
      company: "Project Management & Implementation",
      description:
        "Led the development of comprehensive project management documentation for a case study focused on implementing an Augmented Reality (AR) system at Artemis Logistics. The project aimed to enhance warehouse operations and inventory tracking through immersive, real-time data visualization.",
      image:
        "https://www.falconfulfillment.com/wp-content/uploads/2023/03/ff_logistics_001_misc_1920x1280.jpg",
      tags: [
        "Project Planning",
        "Budgeting",
        "Risk Management",
        "Resource Allocation",
        "GANTT Chart",
        "Work Breakdown Structure",
        "RACI Matrix",
        "PERT Chart"
      ],
      impact: "Figma, MS Project, Excel, LucidChart",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/1n4_na2NXBXLqf-6zrYt_aBjmvxKx8tdO/view?usp=drive_link",
      title: "DeliverEase - Product Canvas",
      company: "System Analysis & Design",
      description:
        "Deliver Ease is a food delivery app that integrates major platforms like UberEats & GrubHub into a single interface. Mission is to optimize user experience by enabling real-time cost comparison, reducing wait times, and streamlining order tracking. The strategy focuses on enhancing customer satisfaction through predictive delivery insights, and personalized recommendations.",
      image:
        "https://tahinis.com/cdn/shop/articles/food_delivery.png?v=1653305107",
      tags: [
        "Product Market Fit Analysis",
        "User Personas",
        "Wireframing",
        "Pain Points Analysis",
        "UI / UX Design",
        "Features",
        "User Stories",
        "Points Estimation",
        "Roadmap",
        "Sprint Planning",
      ],
      impact: "Canva, LucidChart, Visio",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/1KY_XuLk6buagdVge8fqUnn2QW9B5bK1y/view?usp=sharing",
      title: "Medallion Theater Booking System",
      company: "Flowchart and UML Diagrams",
      description:
        "Led the design and analysis of the Medallion Theater Booking System, focusing on modeling user interactions, system behavior, and core functionalities. Conducted a comprehensive workflow analysis to understand the end-to-end booking process, including ticket selection, seat reservation, payment processing, and confirmation. This project demonstrated my ability to translate business requirements into clear, structured system models that support scalable and user-friendly application design.",
      image:
        "https://i.pinimg.com/originals/86/5a/f9/865af99a0389c5cf41753ee143c75ea6.jpg",
      tags: [
        "Work Flow Analysis",
        "UML Diagrams",
        "Sequence Diagrams",
        " Class Diagram",
        "Use Case Diagram",
        "Flowcharts",
        ""
      ],
      impact: "Canva, LucidChart, Visio",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/14Nh6I_M8tFo8As6rjV4NnPbpkvQ3UiCQ/view?usp=drive_link",
      title: "System Requirements Specification",
      company: "Project Request Proposal",
      description: "Acted as a systems analyst for a software consulting firm responding to a Request for Proposal (RFP) from *&* Publishing. Developed a comprehensive SRS document to serve as the SOW for the proposed solution. Successfully translated business needs into actionable technical documentation, ensuring alignment between client expectations and development execution.",
      image:
        "https://yuktisolutions.com/Content/Images/bigstock-Srs-Software-Requirements-Spec-395858375%20(1).jpg",
      tags: [
        "Project Charter",
        "System Specifications",
        "Request Proposal",
        "Technical Specifications",
        "Consulting Documentation",
        "Project Specification",
      ],
      impact: "Atlassian Confluence, MS Word",
    },
    {
      id: 2,
      title: "Point of Sale Migration & Optimization",
      company: "Data Management & Migration",
      description:
        "Enhanced a POS system by migrating data to a NoSQL database and implementing ETL processes using AWS EC2 and MariaDB, significantly improving scalability and query performance. Leveraged EC2 instances to manage data replication, sharding, backup automation, and high availability configurations, ensuring robust and efficient data handling across distributed environments.",
      image:
        "https://academy.invictus-ir.com/content-assets/public/eyJhbGciOiJIUzI1NiJ9.eyJvYmplY3Rfa2V5IjoiNTV3cDI0YWV6YnlzdWlmcjdia2Y3dHZvNTh6bCIsImRvbWFpbiI6ImFjYWRlbXkuaW52aWN0dXMtaXIuY29tIn0.DKgFrTwIh9UYw9GE34WA_ssHfPnzI-mhls6US7VLN3Q",
      tags: ["Data Management", "ETL", "Migration", "Replication", "Sharding", "Infrastructure Optimization", "Performance Gains", "High-Volume Transactional Environment"],
      impact: "SQL, MongoDB, AWC EC2 Instances",
    },

    {
      id: 2,
      title: "Penetration Testing & Risk Management in Healthcare",
      company: "Business Information Security",
      description:
        "Deployed Kali Linux and Metasploitable2 for penetration testing; leveraged tools such as Nmap, Unicornscan, for port scanning and OS fingerprinting. Additionally, performed CVE-based vulnerability assessments, PGP email encryption, and HIPAA-aligned risk evaluation of a healthcare system.",
      image:
        "https://news-cdn.softpedia.com/images/news2/kali-linux-2016-2-released-as-the-most-advanced-penetration-testing-distribution-507816-4.jpg",
      tags: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Risk Analysis",
        "IT Risk Management Management",
        "Secure Communication",
        "Manage IT Risks",
        "HIPAA Frameworks",
        "CVE-based analysis"
      ],
      impact: "Kali, Metasploitable, NMAP",
    },
    {
      id: 1,
      title: "Publication: Social Distancing and Face Mask Detection using Deep Learning Model",
      company: "https://ieeexplore.ieee.org/abstract/document/9544890",
      link: "https://d1wqtxts1xzle7.cloudfront.net/108019684/45_1570753865_28577_EMr_15Jul22_16aug21_Ff-libre.pdf?1701250233=&response-content-disposition=inline%3B+filename%3DSocial_distance_and_face_mask_detector_s.pdf&Expires=1752559866&Signature=RVSn1IcgTt~g-sgS3GopgCArqKlgCov85PYO0lFSLscOialAbXkH2elhoMZtUFTRdXdAmmkXRrJR3CbT6UP04miEJd0Eo6Hm7P~2capKdLC4pIpr-C9ouAwswsA0UxNrRG7ViWt1k~Gkc3Zj2Izk8C3MMlURV1hA7MBM-ya~toB8Y1YyobBcRYSQTwrZBja10BUzpGaHodeP-zs-wiQhd~S0DKrIEq8eRKqH8pJg8N6R3ZEesgJSjvCj2uGTiBImW4gZVl~IeSnLFjnSLjqASmt6uWoDeQd31WJ58qHMqHu~8t2WGSSoNQ9L2XIP11WaX4hYNi-gLLLyI6f1kx2yEw__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA",
      description:
        "Developed a Social Distancing and Face Mask Detection system using MobileNet V2 for mask detection and YOLOv4 for distance computation, achieving 99% accuracy with a dataset of over 4,000 images, trained on Google Colab. The research paper is published on IJECE, a scopus indexed Q2 Journal.",
      image:
        "https://www.nasddds.org/wp-content/smush-webp/2020/03/Coronavirus-COVID-19.jpg.webp",
      tags: [
        "MobileNetV2",
        "CNN",
        "YOLOv4",
        "Scopus Indexed Q2 Journal",
        "Research Paper IEEE"
      ],
      impact: "Final Year Project: 2020-21",
    },
  ];

  const nextProjectSlide = () => {
    setCurrentProjectIndex((prev) =>
      prev === projectsData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevProjectSlide = () => {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projectsData.length - 1 : prev - 1,
    );
  };

  const nextCertSlide = () => {
  setCurrentCertIndex((prev) =>
    prev === certifications.length - 1 ? 0 : prev + 1
  );
};

const prevCertSlide = () => {
  setCurrentCertIndex((prev) =>
    prev === 0 ? certifications.length - 1 : prev - 1
  );
};


    const certifications = [
    {
      title: "Create Machine Learning Models in Microsoft Azure",
      issuer: "Coursera · Mar 2025",
      pdf: "/certificates/Coursera 3L7KYYIVJKY2-2.pdf",
    },
    {
      title: "Microsoft Azure Data Fundamentals (DP-900)",
      issuer: "Microsoft / Coursera · Feb 2025",
      pdf: "/certificates/Coursera RFU26J0BTZV1-3.pdf",
    },
    {
      title: "Machine Learning in Production",
      issuer: "DeepLearning.AI · Aug 2024",
      pdf: "/certificates/Coursera JW0H7X2IAL6F.pdf",
    },
    {
      title: "Database Engineer / DBA",
      issuer: "Udemy",
      pdf: "/certificates/UC-c308f498-ca45-4e04-a590-75fb518e72c7.pdf",
    },
  ];

  const interests = [
  {
    icon: Brain,
    title: "AI Research",
    description: "Exploring biometric security, adversarial ML, and trustworthy AI systems.",
    color: "from-soft-blue to-gold",
  },
  {
    icon: BookOpen,
    title: "Scientific Reading",
    description: "Keeping up with latest publications in computer vision and deep learning.",
    color: "from-gold to-navy",
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    description: "Designing scalable ML pipelines and MLOps workflows.",
    color: "from-navy to-soft-blue",
  },
  {
    icon: Mountain,
    title: "Traveling",
    description: "Exploring cultures and nature across Europe and beyond.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Users,
    title: "Mentoring",
    description: "Supporting junior engineers and students entering AI.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Sprout,
    title: "Fitness & Wellbeing",
    description: "Staying active through walking and light workouts to maintain balance during intensive research.",
    color: "from-emerald-500 to-lime-500",
  },


];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation — Organization Style */}
<header
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
darkNav
? "bg-slate-900 text-white"
: "bg-white/95 text-slate-900 border-b border-slate-200"
}`}
>

<div className="max-w-7xl mx-auto px-6">

<div className="flex items-center justify-between h-16">

{/* Brand */}
<div className="text-lg font-semibold">
Venu Govindaraju
</div>

{/* Desktop Nav */}
<nav className="hidden md:flex items-center space-x-10 text-sm font-medium">

{[
["Home","#home"],
["Education","#education"],
["Experience","#experience"],
["Projects","#projects"],
["Skills","#skills"],
["Certifications","#certifications"],
["Contact","#contact"],
].map(([label,link]) => (

<a
key={label}
href={link}
className={`relative transition ${
darkNav
? "text-white/70 hover:text-white"
: "text-slate-600 hover:text-slate-900"
}`}
>

{label}

{/* Active underline */}
<span
className={`absolute -bottom-2 left-0 h-[2px] bg-current transition-all duration-300 ${
activeSection === link.substring(1)
? "w-full opacity-100"
: "w-0 opacity-0"
}`}
/>

</a>

))}

</nav>

{/* Mobile Button */}
<button
className="md:hidden"
onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
{isMobileMenuOpen ? <X /> : <Menu />}
</button>

</div>
</div>

{/* Mobile Menu */}
{isMobileMenuOpen && (

<div className={`${darkNav ? "bg-slate-900 text-white" : "bg-white"} md:hidden`}>

<div className="px-6 py-4 space-y-4 text-sm font-medium">

{[
["Home","#home"],
["Education","#education"],
["Experience","#experience"],
["Projects","#projects"],
["Skills","#skills"],
["Certifications","#certifications"],
["Contact","#contact"],
].map(([label,link]) => (

<a
key={label}
href={link}
onClick={() => setIsMobileMenuOpen(false)}
className={`block transition ${
activeSection === link.substring(1)
? "font-semibold opacity-100"
: "opacity-70"
}`}
>
{label}
</a>

))}

</div>
</div>

)}

</header>

{/* Spacer */}
<div className="h-16" />



    {/* Hero — Organization Style */}
<section
  id="home"
  className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />

  <div className="relative max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-2 gap-20 items-center">

      {/* LEFT — Executive Copy */}
      <div className="space-y-8">

        <p className="uppercase tracking-widest text-blue-400 text-sm font-semibold">
          Applied AI • Machine Learning • Cloud Engineering
        </p>

        <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
          Building Intelligent Systems for
          <span className="block text-blue-400 mt-2">
            Real-World Impact
          </span>
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
          I’m <strong className="text-white">Venu Govindaraju</strong> — an Applied AI Researcher and
          Machine Learning Engineer specializing in biometric security, deep learning systems,
          and cloud-native ML pipelines.
        </p>

        <p className="text-slate-400 leading-relaxed max-w-xl">
          Currently conducting research at the University of Naples Federico II, focusing on fingerprint
          liveness detection, adversarial robustness, and trustworthy AI. I design production-grade
          ML systems combining research rigor with engineering excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-6">

          <a
            href="#experience"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            View Experience
          </a>

          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
          >
            Contact Me
          </a>

        </div>

      </div>

      {/* RIGHT — Professional Portrait + Signals */}
      <div className="flex flex-col items-center">

        <img
          src="/venu.jpg"
          alt="Venu Govindaraju"
          className="w-80 h-80 rounded-3xl object-cover shadow-2xl border border-white/10"
        />

        {/* Trust Bar */}
        <div className="flex gap-8 mt-10 text-slate-400">

          <a
            href="https://www.linkedin.com/in/venu-siddapura-govindaraju-93b41b17b/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Linkedin size={24} />
          </a>

          <a
            href="https://github.com/svenu38"
            target="_blank"
            className="hover:text-white transition"
          >
            <Github size={24} />
          </a>

          <a
            href="https://x.com/venusg378"
            target="_blank"
            className="hover:text-white transition"
          >
            <Twitter size={24} />
          </a>

          <a
            href="https://www.instagram.com/venu_sg/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Instagram size={24} />
          </a>

        </div>

        {/* Research Highlights */}
        <div className="grid grid-cols-3 gap-6 mt-12 text-center">

          <div>
            <p className="text-white text-xl font-semibold">4+</p>
            <p className="text-slate-400 text-sm">Years Experience</p>
          </div>

          <div>
            <p className="text-white text-xl font-semibold">10+</p>
            <p className="text-slate-400 text-sm">ML Projects</p>
          </div>

          <div>
            <p className="text-white text-xl font-semibold">3</p>
            <p className="text-slate-400 text-sm">Countries</p>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>



            {/* Education Section — Professional SaaS Style */}
     <Section id="education">

        <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-24">

        <h2 className="text-5xl font-bold tracking-tight text-slate-900 mb-4">
        Education
        </h2>

        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
        Advanced academic training in Artificial Intelligence and Data Science, focused on trustworthy ML systems and real-world deployment.
        </p>

        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">

        {educationData.map((edu, i) => (

        <motion.div
        key={edu.id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.15 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >

        {/* Image */}
        <div className="h-44 overflow-hidden">
        <img
        src={edu.image}
        className="w-full h-full object-cover"
        />
        </div>

        <div className="p-8">

        {/* Year */}
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
        {edu.year}
        </span>

        <h3 className="text-xl font-semibold text-slate-900 mb-1">
        {edu.title}
        </h3>

        <p className="text-blue-600 text-sm mb-4">
        {edu.institution}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
        {edu.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">

        {edu.tags.map((tag, idx) => (

        <span
        key={idx}
        className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
        >

        {tag}

        </span>

        ))}

        </div>

        </div>

        </motion.div>

        ))}

        </div>

        </div>

      </Section>


      
                {/* Experience — Engineering Career Narrative */}
          <motion.section
            id="experience"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-32 bg-gradient-to-b from-gray-50 to-white"
          >

            <div className="max-w-6xl mx-auto px-6">

            {/* Experience Header */}
            <div className="text-center max-w-4xl mx-auto mb-28">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl font-bold tracking-tight text-slate-900 mb-6"
                >
                  Professional Experience
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-lg text-slate-600 leading-relaxed"
                >
                  Applied AI researcher and machine learning engineer with hands-on experience building biometric security systems,
                  LLM-based applications, and cloud-native data pipelines across academic and industrial environments.
                </motion.p>

            </div>

            {/* Career Timeline */}
            <div className="relative border-l border-slate-200 pl-12 space-y-32">

            {workExperienceData.map((work, i) => (

            <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative"
            >

            {/* Timeline Node */}
            <div className={`absolute -left-[14px] top-6 w-7 h-7 rounded-full border-4 border-white shadow-lg ${
            work.type === "current" ? "bg-emerald-500" : "bg-slate-400"
            }`} />

            <div className="grid md:grid-cols-[160px_1fr] gap-14">

            {/* Period */}
            <div className="text-sm text-slate-500 font-medium pt-2">
            {work.period}
            </div>

            {/* Main Content */}
            <div>

            {/* Role Header */}
            <div className="mb-6">

            <h3 className="text-2xl font-semibold text-slate-900">
            {work.title}
            </h3>

            <p className="text-blue-600 font-medium">
            {work.company}
            </p>

            </div>

            {/* Role Description */}
            <p className="text-slate-700 leading-relaxed max-w-3xl mb-8">
            {work.description}
            </p>

            {/* Key Contributions */}
            <div className="mb-8">

            <h4 className="text-sm uppercase tracking-wide text-slate-500 mb-3">
            Key Contributions
            </h4>

            <ul className="space-y-2 text-slate-700 list-disc list-inside">

            <li>Designed and deployed end-to-end ML pipelines supporting real-world biometric authentication systems.</li>
            <li>Led experimentation on adversarial robustness and fingerprint liveness detection models.</li>
            <li>Built scalable cloud workflows using Azure ML, Docker, and CI/CD automation.</li>
            <li>Collaborated with cross-functional research teams and contributed to international benchmarks.</li>

            </ul>

            </div>

            {/* Technology Stack */}
            <div>

            <h4 className="text-sm uppercase tracking-wide text-slate-500 mb-3">
            Technology Stack
            </h4>

            <div className="flex flex-wrap gap-2">

            {work.tags.map((tag, idx) => (

            <span
            key={idx}
            className="px-3 py-1 text-sm border border-slate-200 rounded-md text-slate-600 bg-slate-50"
            >

            {tag}

            </span>

            ))}

            </div>

            </div>

            </div>

            </div>

            </motion.div>

            ))}

            </div>

            </div>

          </motion.section>

    {/* Projects — Scalable Professional Layout */}
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-32 bg-white"
    >

    <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-4xl mx-auto mb-20">

    <h2 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
    Selected Projects
    </h2>

    <p className="text-lg text-slate-600">
    A curated selection of applied AI, biometric security, and data engineering projects.
    </p>

    </div>

    {/* Grid */}
    <div className="grid md:grid-cols-2 gap-10">

    {projectsData
    .slice(0, showAllProjects ? projectsData.length : 4)
    .map((project, index) => (

    <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
    >

    <div className="h-48 overflow-hidden">
    <img
    src={project.image}
    className="w-full h-full object-cover"
    />
    </div>

    <div className="p-8">

    <h3 className="text-xl font-semibold text-slate-900 mb-1">
    {project.title}
    </h3>

    <p className="text-blue-600 font-medium mb-3">
    {project.company}
    </p>

    <p className="text-slate-600 mb-4">
    {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">

    {project.tags.slice(0,4).map((tag, idx) => (

    <span
    key={idx}
    className="px-3 py-1 text-xs border border-slate-200 rounded-md text-slate-600"
    >
    {tag}
    </span>

    ))}

    </div>

    {project.link && (
    <a
    href={project.link}
    target="_blank"
    className="text-blue-600 font-medium hover:underline"
    >
    View Project →
    </a>
    )}

    </div>

    </motion.div>

    ))}

    </div>

    {/* Load More */}
    <div className="text-center mt-12">

    <button
    onClick={() => setShowAllProjects(!showAllProjects)}
    className="px-8 py-3 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 transition"
    >

    {showAllProjects ? "Show Less" : "View All Projects"}

    </button>

    </div>

    </div>

    </motion.section>

      {/* Skills — Professional Competency Matrix */}
<motion.section
  id="skills"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="py-32 bg-gray-50"
>

<div className="max-w-7xl mx-auto px-6">

{/* Header */}
<div className="text-center max-w-4xl mx-auto mb-24">

<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-5xl font-bold tracking-tight text-slate-900 mb-6"
>
Core Technical Skills
</motion.h2>

<motion.p
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.15 }}
className="text-lg text-slate-600 leading-relaxed"
>
Expertise across applied machine learning, biometric AI research, cloud-native data engineering, and responsible AI systems.
</motion.p>

</div>

{/* Skill Domains */}
<div className="grid md:grid-cols-2 gap-12">

{[
{
title: "Programming & ML Frameworks",
skills: ["Python","SQL","R","PySpark","TensorFlow","PyTorch","Scikit-learn","NumPy","Pandas","OpenCV"]
},

{
title: "Machine Learning & Deep Learning",
skills: ["Supervised Learning","Unsupervised Learning","CNNs","Transfer Learning","Multimodal Learning","Adversarial Training","Model Evaluation"]
},

{
title: "NLP & Large Language Models",
skills: ["LLMs","Prompt Engineering","Zero-shot Learning","Few-shot Learning","Sentiment Analysis","Conversational AI","Chatbot Evaluation"]
},

{
title: "Data Engineering & ETL",
skills: ["Azure Data Factory","Azure Synapse","Azure Databricks","Apache Airflow","SSIS","Talend","Data Modeling","ETL Automation"]
},

{
title: "Cloud & DevOps",
skills: ["Microsoft Azure","AWS","GCP","Docker","Kubernetes","GitHub Actions","Jenkins","CI/CD Pipelines"]
},

{
title: "Visualization & Databases",
skills: ["Power BI","Tableau","PostgreSQL","MySQL","MongoDB","Cassandra","Azure SQL","Star/Snowflake Schema"]
},

{
title: "Responsible AI & Research",
skills: ["AI Ethics","Privacy & Fairness","Regulatory Compliance","Human-Centered AI","User Studies","Experimental Design","Quantitative Evaluation"]
},

{
title: "Tools & Collaboration",
skills: ["Git","Linux","Jupyter","VS Code","Technical Documentation","Research Communication","Cross-functional Collaboration","Project Presentation"]
}

].map((group, idx) => (

<motion.div
key={idx}
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.12 }}
whileHover={{ scale: 1.02 }}
className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10"
>

<h3 className="text-xl font-semibold text-slate-900 mb-6">
{group.title}
</h3>

<div className="grid grid-cols-2 gap-y-3 gap-x-6">

{group.skills.map((skill, i) => (

<motion.div
key={i}
whileHover={{ x: 4 }}
className="flex items-center text-slate-700 text-sm"
>

<span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />

{skill}

</motion.div>

))}

</div>

</motion.div>

))}

</div>

</div>

</motion.section>

{/* Certifications — Executive Credential Showcase */}
<motion.section
  id="certifications"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="py-32 bg-gradient-to-b from-gray-50 to-white"
>

<div className="max-w-7xl mx-auto px-6">

{/* Header */}
<div className="text-center max-w-4xl mx-auto mb-24">

<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-5xl font-bold tracking-tight text-slate-900 mb-6"
>
Professional Certifications
</motion.h2>

<motion.p
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.15 }}
className="text-lg text-slate-600 leading-relaxed"
>
Validated expertise across cloud platforms, machine learning pipelines, and production-grade AI systems.
</motion.p>

</div>

{/* Credentials */}
<div className="grid md:grid-cols-2 gap-12">

{certifications.map((cert, idx) => (

<motion.div
key={idx}
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.12 }}
whileHover={{ scale: 1.03 }}
className="group bg-white rounded-3xl border border-slate-200 shadow-xl p-10 relative overflow-hidden"
>

{/* Accent Bar */}
<div className="absolute left-0 top-0 h-full w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition" />

{/* Content */}
<h3 className="text-xl font-semibold text-slate-900 mb-2">
{cert.title}
</h3>

<p className="text-blue-600 font-medium mb-6">
{cert.issuer}
</p>

<div className="flex items-center justify-between">

<span className="text-sm text-slate-500">
Credential Verified
</span>

<a
href={cert.pdf}
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center text-blue-600 font-medium hover:underline"
>
View Certificate →
</a>

</div>

</motion.div>

))}

</div>

</div>

</motion.section>


{/* Professional Focus */}
<motion.section
  id="interests"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="py-32 bg-white"
>

<div className="max-w-6xl mx-auto px-6">

{/* Header */}
<div className="text-center max-w-4xl mx-auto mb-24">

<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-5xl font-bold tracking-tight text-slate-900 mb-6"
>
Professional Focus
</motion.h2>

<p className="text-lg text-slate-600 leading-relaxed">
Areas of continuous development aligned with research excellence and engineering leadership.
</p>

</div>

{/* Focus Grid */}
<div className="grid md:grid-cols-3 gap-12">

{[
{
title: "AI Research",
description: "Biometric security, adversarial machine learning, and trustworthy AI systems."
},
{
title: "Cloud Engineering",
description: "Designing scalable ML pipelines and MLOps workflows for production environments."
},
{
title: "Scientific Learning",
description: "Keeping pace with current research in computer vision and deep learning."
},
{
title: "Technical Mentorship",
description: "Supporting junior engineers and students entering applied AI."
},
{
title: "Systems Thinking",
description: "Bridging research with production-grade engineering practices."
},
{
title: "Wellbeing & Balance",
description: "Maintaining performance through fitness, travel, and continuous self-improvement."
}

].map((item, idx) => (

<motion.div
key={idx}
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.1 }}
className="bg-gray-50 border border-slate-200 rounded-2xl p-8"
>

<h3 className="text-xl font-semibold text-slate-900 mb-3">
{item.title}
</h3>

<p className="text-slate-600 leading-relaxed">
{item.description}
</p>

</motion.div>

))}

</div>

</div>

</motion.section>



{/* Contact — Organizational Layout */}
<motion.section
  id="contact"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="py-32 bg-gray-50"
>

  <div className="max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-4xl mx-auto mb-24">

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-bold tracking-tight text-slate-900 mb-6"
      >
        Get in Touch
      </motion.h2>

      <p className="text-lg text-slate-600 leading-relaxed">
        Open to collaboration, research partnerships, and professional opportunities in applied AI,
        machine learning, and cloud-native engineering.
      </p>

    </div>

    {/* Contact Grid */}
    <div className="grid md:grid-cols-2 gap-20 items-start">

      {/* Left */}
      <div className="space-y-10">

        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Professional Inquiries
          </h3>

          <p className="text-slate-600">
            For collaborations, research discussions, or engineering opportunities, please reach out.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 mb-1">
              Email
            </p>

            <p className="text-slate-800 font-medium">
              govindaraju.venu@outlook.com
            </p>
          </div>
          
           <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 mb-1">
              Phone
            </p>

            <p className="text-slate-800 font-medium">
              
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 mb-1">
              LinkedIn
            </p>

            <a
              href="https://www.linkedin.com/in/venu-siddapura-govindaraju-93b41b17b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              linkedin.com/in/venu-siddapura-govindaraju
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200">

          <p className="text-slate-600">
            Currently exploring opportunities in:
          </p>

          <ul className="mt-3 space-y-1 text-slate-700 list-disc list-inside">
            <li>AI Engineer</li>
            <li>Machine Learning Engineer</li>
            <li>Data Engineer</li>
          </ul>

        </div>

      </div>

      {/* Right */}
      <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-xl">

        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
          Let’s Work Together
        </h3>

        <p className="text-slate-600 leading-relaxed mb-8">
          If you’re building intelligent systems or scaling ML pipelines,
          I’d be glad to contribute.
        </p>

        <a
          href="mailto:govindaraju.venu@outlook.com"
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Contact via Email
        </a>

      </div>

    </div>

  </div>

</motion.section>

{/* Footer — Organization Style */}
<footer className="bg-slate-900 text-white py-16">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-3 gap-12">

      <div>
        <h3 className="text-xl font-semibold mb-3">
          Venu Govindaraju
        </h3>

        <p className="text-white/70 max-w-sm">
          Applied AI Researcher and Machine Learning Engineer specializing in biometric security,
          cloud-native ML systems, and responsible artificial intelligence.
        </p>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-wide text-white/60 mb-4">
          Navigation
        </h4>

        <ul className="space-y-2 text-white/70">
          <li><a href="#home">Home</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-wide text-white/60 mb-4">
          Connect
        </h4>

        <p className="text-white/70 mb-3">
          govindaraju.venu@outlook.com
        </p>

        <div className="flex space-x-4">
          <Linkedin className="w-5 h-5" />
          <Code className="w-5 h-5" />
        </div>
      </div>

    </div>

    <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
      © 2025 Venu Govindaraju. All rights reserved.
    </div>

  </div>

</footer>

</div>
);
}
