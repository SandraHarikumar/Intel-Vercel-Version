"use client"

import { useState } from "react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, FileText, Download } from "lucide-react"

interface ProposalSection {
  id: string
  title: string
  content: string
  isEditing: boolean
  isExpanded: boolean
}

export function ProposalDetails() {
  const [sections, setSections] = useState<ProposalSection[]>([
    {
      id: "solution-approach",
      title: "Solution Approach & Methodology",
      content: `Our solution leverages Intel's latest AI hardware and software stack to deliver a comprehensive fraud detection system tailored to your financial services requirements.

The approach combines Intel® Xeon® Scalable processors with Intel® Habana® Gaudi2 accelerators to provide optimal performance for both training and inference workloads. This hybrid architecture ensures cost-effective scaling while maintaining the low-latency response times required for real-time fraud detection.

Key technical specifications include:
- Intel® Xeon® 4th Generation processors for general compute and preprocessing
- Intel® Habana® Gaudi2 accelerators for deep learning model training
- Intel® Optane™ Persistent Memory for high-speed data access
- Intel® oneAPI toolkit for optimized software development
- OpenVINO™ for efficient model deployment and inference`,
      isEditing: false,
      isExpanded: true,
    },
    {
      id: "project-plan",
      title: "Project Plan & Timeline",
      content: `The implementation will follow a phased approach over a 16-week period:

Phase 1: Infrastructure Setup (Weeks 1-3)
- Hardware installation and configuration
- Base software stack deployment
- Network and security configuration

Phase 2: Data Integration (Weeks 4-6)
- Data pipeline development
- ETL process implementation
- Initial data validation

Phase 3: Model Development (Weeks 7-10)
- Feature engineering
- Model training and optimization
- Performance benchmarking

Phase 4: System Integration (Weeks 11-13)
- API development
- Integration with existing systems
- End-to-end testing

Phase 5: Deployment & Validation (Weeks 14-16)
- Production deployment
- Performance validation
- Knowledge transfer and documentation`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "pricing",
      title: "Pricing & Cost Estimates",
      content: `The total solution cost is $89,200, broken down as follows:

Hardware Components: $58,200
- Intel® Xeon® Scalable Processors: $18,000
- Intel® Habana® Gaudi2 Accelerators: $17,000
- Intel® SSD D7-P5520: $9,600
- Intel® Optane™ Persistent Memory: $13,600

Software Components: $8,000
- Intel® oneAPI AI Analytics Toolkit: $5,000
- Intel® Distribution of OpenVINO™ Toolkit: $3,000

Professional Services: $23,000
- Implementation Services: $15,000
- Training & Knowledge Transfer: $8,000

Annual maintenance and support costs (starting year 2): $12,500`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "key-personnel",
      title: "Key Personnel & Experience",
      content: `The project will be delivered by a team of experienced professionals:

Project Lead: Dr. Sarah Chen
- 15+ years experience in AI/ML implementation
- Ph.D. in Computer Science, Stanford University
- Led 20+ enterprise AI deployments in financial services

Technical Architect: Michael Rodriguez
- Intel® Certified Solutions Architect
- 12 years experience with Intel hardware optimization
- Specialist in high-performance computing environments

ML Engineer: Priya Sharma
- Expert in fraud detection algorithms
- 8 years experience in financial services ML
- Published researcher in anomaly detection

Implementation Specialist: James Wilson
- 10+ years in enterprise system integration
- Certified in Intel® oneAPI and OpenVINO™
- Specialized in secure deployment architectures`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "references",
      title: "References & Case Studies",
      content: `Global Financial Services Company
- Implemented similar fraud detection system
- Achieved 99.2% detection rate with <0.1% false positives
- Reduced fraud losses by 78% in first year
- 60% improvement in processing time

Major European Bank
- Deployed Intel® Xeon® and Habana® Gaudi solution
- Handles 15,000 transactions per second
- Reduced infrastructure costs by 40%
- Improved model training time by 3.5x

North American Payment Processor
- Real-time fraud detection system
- 99.99% system availability
- 45ms average response time
- Scales to handle holiday shopping peaks`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "implementation",
      title: "Implementation & Delivery Strategy",
      content: `Our implementation strategy follows a collaborative approach:

1. Initial Assessment & Planning
   - Requirements validation
   - Environment assessment
   - Detailed implementation plan development

2. Agile Implementation
   - Two-week sprint cycles
   - Regular demos and feedback sessions
   - Continuous integration and testing

3. Knowledge Transfer
   - Hands-on training sessions
   - Comprehensive documentation
   - Shadowing opportunities with our experts

4. Post-Implementation Support
   - 30-day hypercare period
   - 24/7 critical issue support
   - Quarterly system health checks

5. Continuous Improvement
   - Performance optimization recommendations
   - Quarterly technology reviews
   - Model retraining guidance`,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: "risk-management",
      title: "Risk Management & Mitigation",
      content: `We've identified key risks and developed mitigation strategies:

Data Quality & Availability
- Risk: Insufficient or poor quality training data
- Mitigation: Early data assessment, synthetic data generation techniques, and data quality validation framework

Integration Complexity
- Risk: Challenges integrating with legacy systems
- Mitigation: Comprehensive API approach, middleware solutions, and phased integration

Performance Scalability
- Risk: System unable to handle peak loads
- Mitigation: Load testing at 2x expected volume, auto-scaling architecture, and performance monitoring

Security Compliance
- Risk: Regulatory or compliance issues
- Mitigation: Built-in compliance controls, regular security audits, and privacy-by-design approach

Model Drift
- Risk: Degradation of model accuracy over time
- Mitigation: Automated monitoring, retraining schedules, and A/B testing framework`,
      isEditing: false,
      isExpanded: false,
    },
  ])

  const toggleEdit = (id: string) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isEditing: !section.isEditing } : section)),
    )
  }

  const updateContent = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  const saveContent = (id: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, isEditing: false } : section)))
  }

  const toggleExpand = (id: string) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-blue-900/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Proposal Details</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Load Template
          </Button>
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export as PDF
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger onClick={() => toggleExpand(section.id)}>
              <span>{section.title}</span>
              {section.isExpanded ? (
                <span className="ml-2 text-blue-400">▼</span>
              ) : (
                <span className="ml-2 text-blue-400">▶</span>
              )}
            </AccordionTrigger>
            <AccordionContent expanded={section.isExpanded}>
              <div className="flex justify-end mb-2">
                {section.isEditing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 flex items-center text-xs"
                    onClick={() => saveContent(section.id)}
                  >
                    <Save className="h-3.5 w-3.5 mr-1 text-green-400" />
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 flex items-center text-xs"
                    onClick={() => toggleEdit(section.id)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1 text-blue-400" />
                    Edit
                  </Button>
                )}
              </div>

              {section.isEditing ? (
                <Textarea
                  value={section.content}
                  onChange={(e) => updateContent(section.id, e.target.value)}
                  className="min-h-[200px] bg-blue-950/30 border-blue-800/50"
                />
              ) : (
                <div className="whitespace-pre-line text-sm">{section.content}</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </div>
  )
}
