import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRef } from "react";
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
  HeartPulse,
} from "lucide-react";


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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

/* Navbar theme based on HOME visibility */
useEffect(() => {
  const home = document.getElementById("home");

  if (!home) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Home visible → transparent
      // Home not visible → dark
      setDarkNav(!entry.isIntersecting);
    },
    {
      threshold: 0.8, // ensures it switches right after home
    }
  );

  observer.observe(home);

  return () => observer.disconnect();
}, []);

/* Active section tracking */


useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);


/* Smooth anchor scrolling */
useEffect(() => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;

    if (!target.getAttribute("href")?.startsWith("#")) return;

    e.preventDefault();

    const el = document.querySelector(target.getAttribute("href")!);

    el?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", handleClick);
  });

  return () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.removeEventListener("click", handleClick);
    });
  };
}, []);

/* Section fade-in animation */
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section:not(#home)").forEach((section) => {
    observer.observe(section);
  });

  return () => observer.disconnect();
}, []);

/* Contact form */

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
  onError: () => {
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
      link: "https://github.com/svenu38/Biovid-Challenge2025",
      title: "BIOVID Challenge 2025 — Multimodal Biometric Authentication",
      company: "Research Project · Open-set Audiovisual Verification",
      description:
        "Developed a dual-factor biometric authentication system for the BIOVID Challenge 2025 targeting open-set identity verification using synchronized audio–visual data. The system processes MP4 video inputs containing spoken passphrases and lip motion. A dual-stream deep learning architecture combines a ResNet3D-18 with Bidirectional GRU for visual feature extraction and a fine-tuned ECAPA-TDNN for robust speech embeddings. These representations are fused using a Gated Multimodal Unit (GMU) to generate a 256-dimensional joint embedding for both classification and identity matching. Trained using a composite loss (triplet loss with semi-hard negative mining + cross-entropy), the model achieved 71.36% accuracy with an EER of 28.61% under 3-fold cross-validation. A cosine similarity thresholding mechanism enables open-set decision making.",
      image: "/biovid.png",
      tags: [
        "Multimodal Biometrics",
        "Audiovisual Fusion",
        "ResNet3D",
        "ECAPA-TDNN",
        "Lip Reading",
        "Gated Multimodal Unit",
        "Triplet Loss",
        "Open-set Recognition",
        "PyTorch",
        "Cosine Similarity Matching"
      ],
      impact: "Accuracy 71.36% · EER 28.61% · BIOVID Challenge 2025",
    },

    {
      id: 2,
      link: "https://github.com/svenu38/livdet2025_liveness_recognition",
      title: "LivDet 2025 — Fingerprint Presentation Attack Detection (DAC-LNet)",
      company: "Biometric Security Research · Adversarial & Contrastive Learning",
      description:
        "Proposed DAC-LNet, a dual-branch fingerprint presentation attack detection system for LivDet 2025, addressing cross-material variability and sensor shift in operational PAD scenarios. The architecture couples EfficientNetV2-S and ConvNeXt-Tiny via a learned scalar fusion gate, augmented with adversarial consistency (FGSM-based representation alignment) and NT-Xent contrastive loss to improve live/spoof separation. A geometry-preserving preprocessing pipeline (robust min–max normalization, pad-to-600×600, CLAHE, gray-to-RGB) ensures deployment-friendly inputs without spatial distortion. Trained on pooled LivDet 2025 data, the model achieved 92.72% accuracy, AUC 98.08%, ACE 7.29%, and EER 2.10%. Identity-disjoint per-sensor training further stabilized thresholds, yielding near-perfect AUC and sub-1% EER on most devices (e.g., Crossmatch 0.07%, Identix 0.13%, Biometrika 0.53%), with Swipe remaining the most challenging. Grad-CAM analysis highlights PAD-relevant ridge discontinuities and material cues, while fusion gate statistics demonstrate sensor-adaptive behavior.",
      image: "/livdet2025.png",
      tags: [
        "Fingerprint PAD",
        "LivDet 2025",
        "EfficientNetV2",
        "ConvNeXt",
        "Adversarial Consistency",
        "Contrastive Learning (NT-Xent)",
        "FGSM",
        "Sensor Adaptation",
        "Grad-CAM",
        "PyTorch"
      ],
      impact: "Accuracy 92.72% · AUC 98.08% · EER 2.10% · LivDet 2025",
    },

  {
      id: 3,
      link: "https://github.com/svenu38/prediction_Bussines_activity",
      title: "Predicting Business Process Activity with Deep Learning",
      company: "Master Thesis · Università degli Studi di Napoli Federico II",
      description:
        "Master’s thesis project focused on predicting future activities and attributes of ongoing business process instances using deep learning. Developed an end-to-end process mining pipeline based on a simulated Purchase-to-Pay (P2P) workflow aligned with SAP table structures. The dataset incorporates realistic anomalies to emulate enterprise operational behavior. Implemented neural architectures using Keras (CNN, RNN, and LSTM) to model both temporal event sequences and static case attributes, enabling next-activity prediction and trace-level risk analysis. The work demonstrates how deep learning–driven process mining can support real-time monitoring, anomaly detection, and audit transparency in business operations.",
      image: "/process-mining.webp",
      tags: [
        "Process Mining",
        "Deep Learning",
        "LSTM",
        "RNN",
        "CNN",
        "Keras",
        "Business Process Analytics",
        "Time-series Modeling",
        "Anomaly Detection",
        "SAP P2P Simulation"
      ],
      impact: "Master Thesis · Physics of Data · University of Naples Federico II",
    },

        {
      id: 4,
      link: "",
      title: "Real-World Chatbot Performance Measurement & Self-Training",
      company: "AI Chatbot Developer · Fiven (Industry Internship)",
      description:
        "Industry internship focused on building and evaluating Large Language Model–based customer support chatbots. Contributed to research, development, and testing of end-to-end chatbot pipelines using Python, including prompt engineering, zero-shot learning, sentiment analysis, and conversational style adaptation. Designed quantitative NLP evaluation frameworks to measure response quality, personalization, readability, and complexity. Conducted real-user studies to validate system performance in applied settings and supported Responsible AI analysis addressing privacy, fairness, and regulatory compliance. Collaborated closely with multidisciplinary teams of AI engineers and researchers while delivering full technical documentation and final project reports.",
      image: "/fiven.png",
      tags: [
        "Large Language Models",
        "Chatbot Evaluation",
        "Prompt Engineering",
        "Zero-shot Learning",
        "Sentiment Analysis",
        "NLP Metrics",
        "Python",
        "Responsible AI",
        "User Studies",
        "Customer Support Automation"
      ],
      impact: "Industry Deployment · LLM Evaluation Framework · Responsible AI Integration",
    },
      {
    id: 5,
    link: "https://github.com/svenu38/AI_framework_tech",
    title: "Hospital Admission Analytics — Patient Stay Duration Prediction",
    company: "Healthcare Data Science · Human-Centered AI",
    description:
      "Developed a machine learning pipeline to analyze hospital admission data and predict patient stay duration. Conducted exploratory data analysis across demographic, clinical, and operational variables, followed by supervised modeling using Random Forest, Decision Tree, and Logistic Regression. Addressed severe class imbalance using SMOTE and performed hyperparameter tuning to improve generalization. The optimized Random Forest model achieved 62.3% accuracy, demonstrating the potential of data-driven insights to support hospital resource planning and patient care optimization.",
    image: "/hospital-analytics.webp",
    tags: [
      "Healthcare Analytics",
      "Machine Learning",
      "Random Forest",
      "SMOTE",
      "Scikit-learn",
      "Data Preprocessing",
      "EDA",
      "Predictive Modeling",
      "Human-Centered AI"
    ],
    impact: "Random Forest Accuracy 62.3% · Resource Optimization Use Case",
  },


    {
      id: 6,
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
    {
      title: "ORCID Researcher Identifier",
      issuer: "ORCID",
      pdf: "https://orcid.org/0009-0000-7992-5708",
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
className={`fixed top-0 w-full z-50 transition-all duration-300 ${
darkNav
  ? "bg-slate-900 shadow-xl"
  : "bg-white border-b"
}`}
>
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

    {/* Logo */}
    <div className={`font-semibold text-lg transition ${
      darkNav ? "text-white" : "text-slate-900"
    }`}>
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
        ["Focus","#interests"],
        ["Contact","#contact"],
      ].map(([label, link]) => (
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
            className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-300 ${
              darkNav ? "bg-white" : "bg-slate-900"
            } ${
              activeSection === link.substring(1)
                ? "w-full opacity-100"
                : "w-0 opacity-0"
            }`}
          />

        </a>
      ))}

    </nav>

    {/* Mobile Toggle */}
    <button
      className={`${darkNav ? "text-white" : "text-slate-900"} md:hidden`}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? <X /> : <Menu />}
    </button>

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
          ["Focus","#interests"],
          ["Contact","#contact"],
        ].map(([label, link]) => (
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
        <motion.section
          id="education"
          className="scroll-mt-24 py-32 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.section>



      
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

{/* Featured Projects */}
<motion.section
  id="projects"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="scroll-mt-24 py-20 bg-white"
>
  <div className="max-w-7xl mx-auto px-6 relative overflow-hidden">

    {/* Header */}
    <div className="text-center max-w-4xl mx-auto mb-6">

      <h2 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
        Featured Projects
      </h2>

      <p className="text-lg text-slate-600 leading-relaxed">
        Selected applied AI, biometric security, and machine learning projects
        demonstrating research depth and production-level engineering.
      </p>

    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-end gap-3 mb-10">
      <button
        onClick={() =>
          sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" })
        }
        className="w-10 h-10 border border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() =>
          sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" })
        }
        className="w-10 h-10 border border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
      >
        <ChevronRight />
      </button>
    </div>

    {/* Slider */}
    <div
      ref={sliderRef}
      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
    >
      {projectsData.map((project, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="min-w-[320px] max-w-[320px] snap-start bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
        >
          <img
            src={project.image}
            className="h-44 w-full object-cover"
          />

          <div className="p-5">
            <h3 className="font-semibold text-slate-900 leading-snug mb-2">
              {project.title}
            </h3>

            <p className="text-sm text-slate-600 line-clamp-3 mb-3">
              {project.description}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Learn more →
              </a>
            )}
          </div>
        </motion.div>
      ))}
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

{/* Professional Focus — Icon Layout */}
{/* Professional Focus */}
<motion.section
id="interests"
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="py-32 bg-white"
>

<div className="max-w-7xl mx-auto px-6">

{/* Header */}
<div className="text-center mb-24">

<h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
Professional Focus
</h2>

<p className="text-lg text-slate-600 max-w-3xl mx-auto">
Areas of continuous development supporting research excellence, engineering leadership, and sustainable growth.
</p>

</div>

{/* Icon Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 text-center">

{[
{
icon: Brain,
title: "AI Research",
desc: "Biometric security, adversarial ML, and trustworthy AI systems.",
},
{
icon: Cloud,
title: "Growth",
desc: "Scalable ML pipelines and production MLOps workflows.",
},
{
icon: HeartPulse,
title: "Wellbeing",
desc: "Balance, fitness, and clarity for sustainable performance.",
},
{
icon: Users,
title: "Community",
desc: "Mentorship, collaboration, and research networks.",
},
].map((item, i) => (

<motion.div
key={i}
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: i * 0.1 }}
className="flex flex-col items-center"
>

<item.icon className="w-16 h-16 text-slate-900 mb-6 stroke-[1.5]" />

<h3 className="text-xl font-semibold text-slate-900 mb-3">
{item.title}
</h3>

<p className="text-slate-600 max-w-xs leading-relaxed">
{item.desc}
</p>

</motion.div>

))}

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
