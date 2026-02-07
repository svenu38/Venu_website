import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const { toast } = useToast();

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
        image: "/public/unina.jpg",
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
        image: "/public/nitte.jpg",
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
    image: "/public/unina.jpg",
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
    image: "/public/fiven.png",
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
    image: "/public/graded.png",
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
    image: "/public/VA_solutions.png",
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
      link: "https://docs.google.com/presentation/d/1A-Tu1BjCzNYnMJtxdG_280JBT6EBrDgG/edit?usp=drive_link&ouid=110348758768572062782&rtpof=true&sd=true",
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
      {/* Navigation */}
<nav className="fixed top-4 left-0 right-0 z-50 px-4">

  <div className="max-w-6xl mx-auto">

    <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg rounded-full px-6 py-3 flex items-center justify-between">

      {/* Brand */}
      <div className="font-inter font-bold text-navy text-lg">
        Venu Govindaraju
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">

        {[
          ["Home", "#home"],
          ["Education", "#education"],
          ["Experience", "#experience"],
          ["Projects", "#projects"],
          ["Skills", "#skills"],
          ["Certifications", "#certifications"],
          ["Interests", "#interests"],
          ["Contact", "#contact"],
        ].map(([label, link]) => (

          <a
            key={label}
            href={link}
            className="relative text-slate-600 hover:text-navy transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all hover:after:w-full"
          >
            {label}
          </a>

        ))}

      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-navy"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-6 md:hidden">

        <div className="flex flex-col gap-4 text-sm font-medium">

          {[
            ["Home", "#home"],
            ["Education", "#education"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Skills", "#skills"],
            ["Certifications", "#certifications"],
            ["Interests", "#interests"],
            ["Contact", "#contact"],
          ].map(([label, link]) => (

            <a
              key={label}
              href={link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-navy transition"
            >
              {label}
            </a>

          ))}

        </div>
      </div>
    )}

  </div>
</nav>

{/* Spacer */}
<div className="h-24" aria-hidden />

    {/* Hero Section */}
    <section
      id="home"
      className="scroll-mt-24 md:scroll-mt-28 gradient-bg min-h-[70vh] relative overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy/30 via-soft-blue/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

             {/* LEFT */}
              <div className="flex flex-col items-center gap-6">

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-inter font-bold text-white leading-tight text-center">
                  Hello, I'm <span className="gradient-text">Venu</span>
                </h1>

                {/* Image + socials wrapper */}
                <div className="flex flex-col items-center">

                  {/* Profile Image */}
                  <img
                    src="/venu.jpg"
                    alt="Venu Govindaraju professional headshot"
                    className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                  />

                  {/* Social Icons */}
                  <div className="flex gap-8 mt-6">

                    <a
                      href="https://www.linkedin.com/in/venu-siddapura-govindaraju-93b41b17b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold transition hover:scale-110"
                    >
                      <Linkedin size={28} />
                    </a>

                    <a
                      href="https://github.com/svenu38"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold transition hover:scale-110"
                    >
                      <Github size={28} />
                    </a>

                    <a
                      href="https://x.com/venusg378"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold transition hover:scale-110"
                    >
                      <Twitter size={28} />
                    </a>

                    <a
                      href="https://www.instagram.com/venu_sg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold transition hover:scale-110"
                    >
                      <Instagram size={28} />
                    </a>

                  </div>

                </div>

              </div>


                      {/* RIGHT */}
            <div className="text-white/90 space-y-6 max-w-xl">

              {/* Tag line */}
              <p className="uppercase tracking-widest text-gold text-sm font-semibold">
                AI Researcher • ML Engineer • Data Engineer
              </p>

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-inter font-bold leading-snug">
                From vision to value — I build intelligent systems that scale.
              </h2>

              {/* Main paragraph */}
              <p className="text-white/80 leading-relaxed text-base md:text-lg">
                My work spans <span className="text-white font-medium">AI research</span>,
                <span className="text-white font-medium"> deep learning</span>, and
                <span className="text-white font-medium"> cloud-based data engineering</span>,
                with over four years of experience building end-to-end machine learning pipelines.
                I currently conduct research at the University of Naples Federico II, focusing on
                fingerprint liveness detection, biometric deepfake defense, and adversarial robustness.
              </p>

              {/* Secondary paragraph */}
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                I’ve contributed to international projects including LivDet 2025 and BIOVID 2025,
                deploying scalable AI systems on Azure using PyTorch, Docker, and CI/CD pipelines.
                Previously, I developed LLM-based chatbot evaluation frameworks and real-time data
                pipelines—combining responsible AI principles with production-grade engineering to
                deliver trustworthy, real-world AI solutions.
              </p>

            </div>



        </div>
      </div>
    </section>



      {/* Education Section */}
      <section
        id="education"
        className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Education
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Academic foundation and continuous learning through degrees &
              certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {educationData.map((edu) => (
              <Card
                key={edu.id}
                className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                {/* Text left, image right on md+; stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_360px]">
                  {/* LEFT: text/content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-soft-blue to-gold rounded-xl flex items-center justify-center">
                        {edu.type === "degree" ? (
                          <GraduationCap className="text-white w-6 h-6" />
                        ) : (
                          <Award className="text-white w-6 h-6" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-inter font-bold text-navy">{edu.title}</h3>
                        <p className="text-soft-blue font-semibold text-sm">{edu.institution}</p>
                      </div>
                      <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                        {edu.year}
                      </span>
                    </div>

                    <p className="text-warm-gray leading-relaxed mb-4 text-sm">{edu.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-navy/10 text-navy px-2 py-1 rounded-full text-xs skill-badge"
                          data-testid={`tag-education-${edu.id}-${i}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: image (fills the right column height) */}
                  <div className="hidden md:block">
                    <img
                      src={edu.image}
                      alt={`${edu.institution} campus or related imagery`}
                      className="w-full h-full object-cover"
                      data-testid={`img-education-${edu.id}`}
                    />
                  </div>
                </div>
              </Card>

            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section
        id="experience"
        className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Work Experience
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Professional journey from software engineering to program
              management, driving digital transformation and business impact.
            </p>
          </div>

          <div className="space-y-8">
            {workExperienceData.map((work) => (
              <Card
                key={work.id}
                className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={work.image}
                      alt={`${work.company} workplace or related imagery`}
                      className="w-full h-48 md:h-full object-cover"
                      data-testid={`img-work-${work.id}`}
                    />
                  </div>
                  <div className="md:w-3/4 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-inter font-bold text-navy mb-2">
                          {work.title}
                        </h3>
                        <p className="text-soft-blue font-semibold text-lg mb-1">
                          {work.company}
                        </p>
                        <p className="text-warm-gray font-medium">
                          {work.period}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${work.type === "current"
                          ? "bg-green-500"
                          : "bg-gray-400"
                          }`}
                      ></div>
                    </div>

                    <p className="text-warm-gray leading-relaxed mb-6">
                      {work.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-soft-blue/10 text-soft-blue px-3 py-1 rounded-full text-sm skill-badge"
                          data-testid={`tag-work-${work.id}-${tagIndex}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Carousel */}
      <section
        id="projects"
        className="py-20 professional-gradient opacity-0 translate-y-5 transition-all duration-700 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Showcasing impactful products and strategic initiatives that drive
              business transformation and innovation.
            </p>
          </div>

          {/* Projects Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentProjectIndex * 100}%)`,
                }}
              >
                {projectsData.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 education-card rounded-2xl shadow-2xl overflow-hidden border border-white/30 h-full backdrop-blur-sm">
                      <div className="md:flex">
                        <div className="md:w-2/5">
                          <img
                            src={project.image}
                            alt={`${project.title} project visualization`}
                            className="w-full h-64 md:h-full object-cover"
                            data-testid={`img-project-${project.id}`}
                          />
                        </div>
                        <div className="md:w-3/5 p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-3xl font-inter font-bold text-navy mb-3">
                                {project.link ? (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure"
                                    aria-label={`Open project: ${project.title}`}
                                    data-testid={`link-project-${project.id}`}
                                    title={project.title}
                                  >
                                    {project.title}
                                  </a>
                                ) : (
                                  project.title
                                )}
                              </h3>

                              <p className="text-soft-blue font-semibold text-lg mb-2">
                                {project.company}
                              </p>
                              <div className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-semibold inline-block">
                                {project.impact}
                              </div>
                            </div>
                          </div>

                          <p className="text-warm-gray leading-relaxed mb-6 text-lg">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-navy/10 text-navy px-4 py-2 rounded-full text-sm skill-badge font-medium"
                                data-testid={`tag-project-${project.id}-${tagIndex}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProjectSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-project-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextProjectSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-project-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentProjectIndex
                    ? "bg-white scale-110 shadow-lg"
                    : "bg-white/50 hover:bg-white/70"
                    }`}
                  data-testid={`dot-project-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <span className="text-blue-600 font-semibold uppercase tracking-wide">
              Skills
            </span>

            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
              Core Technical Skills
            </h2>

            <p className="text-lg text-slate-600">
              A comprehensive overview of my technical expertise across AI research,
              machine learning, data engineering, and cloud-native systems.
            </p>
          </div>

          {/* Skill Groups */}
          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Programming & Frameworks",
                skills: [
                  ["Python","https://www.python.org/"],
                  ["SQL","https://www.mysql.com/"],
                  ["R","https://www.r-project.org/"],
                  ["PySpark","https://spark.apache.org/"],
                  ["TensorFlow","https://www.tensorflow.org/"],
                  ["PyTorch","https://pytorch.org/"],
                  ["Scikit-learn","https://scikit-learn.org/"],
                  ["NumPy","https://numpy.org/"],
                  ["Pandas","https://pandas.pydata.org/"],
                  ["OpenCV","https://opencv.org/"]
                ]
              },

              {
                title: "Machine Learning & Deep Learning",
                skills: [
                  ["Supervised Learning"],
                  ["Unsupervised Learning"],
                  ["CNNs"],
                  ["Transfer Learning"],
                  ["Multimodal Learning"],
                  ["Adversarial Training"],
                  ["Model Evaluation"]
                ]
              },

              {
                title: "NLP & Large Language Models",
                skills: [
                  ["LLMs"],
                  ["Prompt Engineering"],
                  ["Zero-shot Learning"],
                  ["Few-shot Learning"],
                  ["Sentiment Analysis"],
                  ["Conversational AI"],
                  ["Chatbot Evaluation"]
                ]
              },

              {
                title: "Data Engineering & ETL",
                skills: [
                  ["Azure Data Factory"],
                  ["Azure Synapse"],
                  ["Azure Databricks"],
                  ["Apache Airflow"],
                  ["SSIS"],
                  ["Talend"],
                  ["Data Modeling"],
                  ["ETL Automation"]
                ]
              },

              {
                title: "Cloud & DevOps",
                skills: [
                  ["Microsoft Azure"],
                  ["AWS"],
                  ["GCP"],
                  ["Docker"],
                  ["Kubernetes"],
                  ["GitHub Actions"],
                  ["Jenkins"],
                  ["CI/CD Pipelines"]
                ]
              },

              {
                title: "Visualization & Databases",
                skills: [
                  ["Power BI"],
                  ["Tableau"],
                  ["PostgreSQL"],
                  ["MySQL"],
                  ["MongoDB"],
                  ["Cassandra"],
                  ["Azure SQL"],
                  ["Star/Snowflake Schema"]
                ]
              },

              {
                title: "Responsible AI & Research",
                skills: [
                  ["AI Ethics"],
                  ["Privacy & Fairness"],
                  ["Regulatory Compliance"],
                  ["Human-Centered AI"],
                  ["User Studies"],
                  ["Experimental Design"],
                  ["Quantitative Evaluation"]
                ]
              },

              {
                title: "Tools & Collaboration",
                skills: [
                  ["Git"],
                  ["Linux"],
                  ["Jupyter"],
                  ["VS Code"],
                  ["Technical Documentation"],
                  ["Research Communication"],
                  ["Cross-functional Collaboration"],
                  ["Project Presentation"]
                ]
              }

            ].map((group, idx) => (

              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-md transition">

                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, i) => (
                    <a
                      key={i}
                      href={skill[1] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition"
                    >
                      {skill[0]}
                    </a>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


      <section
        id="certifications"
        className="py-20 professional-gradient relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-6">
              Professional Certifications
            </h2>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Industry-recognized credentials validating expertise in cloud, ML, and production AI systems.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">

            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCertIndex * 100}%)` }}
              >

                {certifications.map((cert, idx) => (

                  <div key={idx} className="w-full flex-shrink-0 px-4">

                    <Card className="rounded-2xl shadow-2xl border border-white/30 bg-white">

                      <div className="md:flex">

                        {/* PDF Preview */}
                        <div className="md:w-1/2 h-[420px]">

                          <iframe
                            src={`${cert.pdf}#zoom=page-fit`}
                            className="w-full h-full"
                          />

                        </div>

                        {/* Content */}
                        <div className="md:w-1/2 p-8">

                          <h3 className="text-2xl font-bold text-navy mb-3">
                            {cert.title}
                          </h3>

                          <p className="text-soft-blue font-semibold mb-6">
                            {cert.issuer}
                          </p>

                          <a
                            href={cert.pdf}
                            target="_blank"
                            className="inline-flex items-center bg-gold text-navy px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition"
                          >
                            Open Full Certificate →
                          </a>

                        </div>

                      </div>

                    </Card>

                  </div>

                ))}

              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prevCertSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 glass-effect rounded-full p-3"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextCertSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 glass-effect rounded-full p-3"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentCertIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentCertIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* Interests Section */}
      <section
        id="interests"
        className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Beyond Work
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Personal interests that support balance, curiosity, and continuous growth alongside research and engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <Card
                key={index}
                className="card-hover bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-200"
              >
                <CardContent className="p-0">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${interest.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <interest.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-navy mb-4">
                    {interest.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">Let's Connect</h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              Ready to collaborate on your next big initiative? Let's discuss how we can drive meaningful impact together.
            </p>
          </div>

          {/* ⬇️ One column, center the item */}
          <div className="grid grid-cols-1 gap-12 place-items-center">
            {/* ⬇️ Constrain width + center text */}
            <div className="w-full max-w-md text-center">
              <div className="space-y-6">
                {/* Email row */}
                <div className="space-y-8">
                  {/* Email (icon above text) */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-soft-blue rounded-xl flex items-center justify-center">
                      <Mail className="text-white w-5 h-5" />
                    </div>
                    <h3 className="font-inter font-semibold text-navy">Email</h3>
                    <p className="text-warm-gray">govindaraju.venu@outlook.com</p>
                  </div>

                  {/* LinkedIn (icon above text) */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                      <Linkedin className="text-white w-5 h-5" />
                    </div>
                    <h3 className="font-inter font-semibold text-navy">LinkedIn</h3>
                    <p className="text-warm-gray">
                      <a
                        href="https://www.linkedin.com/in/venu-siddapura-govindaraju-93b41b17b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        linkedin.com/in/venu-siddapura-govindaraju
                      </a>
                    </p>
                  </div>
                </div>


              </div>

              {/* Center the footer note */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-warm-gray text-sm leading-relaxed">
                  <strong className="text-navy">Interested in</strong> AI Engineer, ML Engineer, and Data Engineer opportunities in applied machine learning and cloud-based AI systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-inter font-bold mb-2 text-center">
                Thanks for viewing my portfolio!
              </h3>
              <p className="text-white/80"></p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/venu-siddapura-govindaraju-93b41b17b/"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/svenu38"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-github"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>
              &copy; 2025 All rights reserved. | Designed with passion for
              innovation and impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
