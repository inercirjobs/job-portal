import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, MapPin, Briefcase, Clock, DollarSign, Users, Heart, LogOut, Menu } from "lucide-react";
import ResumeUploadDialog from "@/components/ResumeUploadDialog";
import { useNavigate } from "react-router-dom";

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [experienceYears, setExperienceYears] = useState("");
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);


  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Senior",
      minExperience: 5,
      salary: "$120,000 - $150,000",
      description: "Join our team to build cutting-edge web applications using React, TypeScript, and modern technologies.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Modern JavaScript", "RESTful APIs"],
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Node.js"],
      postedDate: "2024-01-15",
      applicants: 45,
      saved: false
    },
    {
      id: 2,
      title: "Junior Software Developer",
      company: "StartupLab Inc",
      location: "Austin, TX",
      type: "Full-time",
      experience: "Entry",
      minExperience: 0,
      salary: "$65,000 - $80,000",
      description: "Perfect opportunity for fresh graduates to start their career in software development.",
      requirements: ["Computer Science degree", "Basic programming knowledge", "Eagerness to learn"],
      skills: ["JavaScript", "Python", "Git", "SQL"],
      postedDate: "2024-01-14",
      applicants: 23,
      saved: false
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      type: "Full-time",
      experience: "Mid-level",
      minExperience: 3,
      salary: "$100,000 - $130,000",
      description: "Lead product strategy and work with cross-functional teams to deliver exceptional user experiences.",
      requirements: ["3+ years product management", "Agile methodologies", "Data-driven decision making"],
      skills: ["Product Management", "Agile", "Data Analysis", "User Research", "Roadmapping"],
      postedDate: "2024-01-12",
      applicants: 67,
      saved: true
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignStudio Pro",
      location: "Remote",
      type: "Contract",
      experience: "Mid-level",
      minExperience: 2,
      salary: "$80,000 - $100,000",
      description: "Create intuitive and engaging user experiences for our digital products.",
      requirements: ["4+ years UX design", "Figma proficiency", "Strong portfolio", "User research experience"],
      skills: ["UX Design", "Figma", "Prototyping", "User Research", "Wireframing"],
      postedDate: "2024-01-10",
      applicants: 34,
      saved: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Systems",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "Senior",
      minExperience: 4,
      salary: "$110,000 - $140,000",
      description: "Build and maintain scalable infrastructure and deployment pipelines.",
      requirements: ["4+ years DevOps experience", "AWS/Azure expertise", "Docker & Kubernetes", "CI/CD pipelines"],
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python"],
      postedDate: "2024-01-08",
      applicants: 28,
      saved: false
    },
    {
      id: 6,
      title: "Data Analyst Intern",
      company: "DataInsights Corp",
      location: "Chicago, IL",
      type: "Internship",
      experience: "Entry",
      minExperience: 0,
      salary: "$40,000 - $50,000",
      description: "Learn and apply data analysis techniques to derive business insights.",
      requirements: ["Currently pursuing degree", "Basic SQL knowledge", "Excel proficiency"],
      skills: ["SQL", "Excel", "Python", "Data Visualization", "Statistics"],
      postedDate: "2024-01-06",
      applicants: 89,
      saved: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    
    let matchesExperience = true;
    if (experienceLevel === "fresher") {
      matchesExperience = job.minExperience === 0;
    } else if (experienceLevel === "experienced" && experienceYears) {
      const years = parseInt(experienceYears);
      matchesExperience = job.minExperience <= years && years <= job.minExperience + 3;
    }
    
    return matchesSearch && matchesLocation && matchesExperience;
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowResumeDialog(true);
  };

  const handleLogout = () => {
  // Clear session data if needed
  localStorage.removeItem("token"); // optional, if you store auth tokens
  // Redirect to login page
  navigate("/login");
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover-scale">
            <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/job-seeker-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link to="/browse-jobs" className="text-blue-600 font-medium">Browse Jobs</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
          </nav>

          {/* Sign Out */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <Menu
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="h-6 w-6 text-gray-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white border rounded p-4 shadow">
            <Link to="/job-seeker-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/browse-jobs" className="block text-blue-600 font-medium">Browse Jobs</Link>
            <Link to="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
            <Button variant="outline" onClick={handleLogout} className="w-full hover:bg-red-50 hover:text-red-600 mt-2">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Find Your Perfect Job
            </CardTitle>
            <CardDescription>
              Search through thousands of job opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Job Title or Skills</Label>
                <Input
                  id="search"
                  placeholder="e.g. Frontend Developer, React"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {experienceLevel === "experienced" && (
                <div>
                  <Label htmlFor="years">Years of Experience</Label>
                  <Input
                    id="years"
                    type="number"
                    placeholder="e.g. 3"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="mt-1"
                    min="1"
                    max="20"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredJobs.length} Jobs Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing relevant opportunities for you
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <Card key={job.id} className="hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Link to={`/job/${job.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className={`h-4 w-4 ${job.saved ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                    <p className="text-lg font-medium text-blue-600 mb-2">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.minExperience === 0 ? 'Entry Level' : `${job.minExperience}+ years`}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 5).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} applicants • Posted {job.postedDate}
                  </div>
                <div className="mt-4 space-y-2">
  <Link to={`/job/${job.id}`}>
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full"
    >
      View Details
    </Button>
  </Link>
  <Button 
    size="sm" 
    className="w-full bg-blue-600 hover:bg-blue-700"
    onClick={() => handleApply(job)}
  >
    Apply Now
  </Button>
</div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Resume Upload Dialog */}
      <ResumeUploadDialog
        isOpen={showResumeDialog}
        onClose={() => setShowResumeDialog(false)}
        jobTitle={selectedJob?.title || ""}
        companyName={selectedJob?.company || ""}
      />
    </div>
  );
};

export default BrowseJobs;
