
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, MapPin, Calendar, Users, DollarSign, Clock, Bookmark, Share2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";



const JobDetails = () => {
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock job data - in real app, this would come from API
  const jobData = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
    postedDate: "2 days ago",
    applicants: 45,
    description: `We're looking for a senior frontend developer to join our growing team and build amazing user experiences. You'll be working with a talented team of designers and developers to create cutting-edge web applications.

This role offers the opportunity to work on exciting projects with modern technologies and make a significant impact on our product development.`,
    responsibilities: [
      "Develop and maintain frontend applications using React and TypeScript",
      "Collaborate with UI/UX designers to implement responsive designs",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Stay up-to-date with emerging technologies and best practices"
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with Next.js and server-side rendering",
      "Proficiency in CSS frameworks like Tailwind CSS",
      "Experience with version control systems (Git)",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements and remote work options",
      "Professional development budget",
      "Generous PTO and paid holidays",
      "Modern office with free snacks and beverages",
      "Team building events and company retreats"
    ],
    companyInfo: {
      name: "TechCorp Solutions",
      size: "200-500 employees",
      industry: "Technology",
      founded: "2015",
      website: "https://techcorp.com",
      description: "TechCorp Solutions is a leading technology company focused on building innovative software solutions for businesses worldwide."
    }
  };

  const handleApply = () => {
    setHasApplied(true);
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted. We'll be in touch soon!",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Job Removed from Bookmarks" : "Job Bookmarked",
      description: isBookmarked ? "Job removed from your saved jobs." : "Job saved to your bookmarks.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Job link copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
        <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Find Jobs</Link>
        <Link to="/companies" className="text-gray-700 hover:text-blue-600 transition-colors">Companies</Link>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link to="/register">
          <Button>Get Started</Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  </div>

  {/* Mobile Nav */}
  {isMobileMenuOpen && (
    <div className="md:hidden border-t">
      <div className="px-4 pt-2 pb-4 space-y-2">
        <Link to="/job-seeker-dashboard" className="block text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/browse-jobs" className="block text-gray-700 hover:text-blue-600">Find Jobs</Link>
        {/* <Link to="/companies" className="block text-gray-700 hover:text-blue-600">Companies</Link> */}
        <Link to="/subscription" className="text-gray-700 hover:text-blue-600">Subscription</Link>
        <Link to="/profile" className="block text-gray-700 hover:text-blue-600">profile</Link>
        
        {/* <Link to="/login">
          <Button variant="outline" className="w-full">Sign In</Button>
        </Link> */}
        {/* <Link to="/register">
          <Button className="w-full">Get Started</Button>
        </Link> */}
      </div>
    </div>
  )}
</header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">{jobData.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-700">
                      {jobData.company}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleBookmark}>
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{jobData.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{jobData.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Posted {jobData.postedDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xl font-semibold text-green-600">
                    {jobData.salary}
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {jobData.applicants} applicants
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {jobData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {jobData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobData.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <Button 
                  className="w-full h-12 text-lg mb-4"
                  onClick={handleApply}
                  disabled={hasApplied}
                >
                  {hasApplied ? "Application Submitted" : "Apply Now"}
                </Button>
                
                <Separator className="mb-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Range:</span>
                    <span className="font-medium">{jobData.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="font-medium">{jobData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{jobData.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applicants:</span>
                    <span className="font-medium">{jobData.applicants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {jobData.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {jobData.companyInfo.description}
                  </p>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{jobData.companyInfo.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size:</span>
                      <span className="font-medium">{jobData.companyInfo.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{jobData.companyInfo.founded}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    <Building className="h-4 w-4 mr-2" />
                    View Company Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">React Developer</h4>
                    <p className="text-xs text-gray-600">WebTech Inc</p>
                    <p className="text-xs text-green-600 font-medium mt-1">$100k - $130k</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">Frontend Engineer</h4>
                    <p className="text-xs text-gray-600">StartupLab</p>
                    <p className="text-xs text-green-600 font-medium mt-1">$110k - $140k</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">UI Developer</h4>
                    <p className="text-xs text-gray-600">DesignCorp</p>
                    <p className="text-xs text-green-600 font-medium mt-1">$95k - $120k</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View More Similar Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
    </div>

  );
};

export default JobDetails;
