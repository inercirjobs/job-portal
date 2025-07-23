import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Users, Building, TrendingUp, Menu } from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    postedDate: "2 days ago",
    description: "We're looking for a senior frontend developer to join our growing team and build amazing user experiences."
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    experience: "3+ years",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    postedDate: "1 day ago",
    description: "Join our product team to drive innovation and deliver exceptional products that delight our customers."
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio Pro",
    location: "Remote",
    salary: "$80,000 - $100,000",
    type: "Full-time",
    experience: "2+ years",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    postedDate: "3 days ago",
    description: "Create beautiful and intuitive user experiences for our digital products and help shape the future of design."
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "DataFlow Inc",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    experience: "4+ years",
    skills: ["Node.js", "Python", "AWS", "PostgreSQL"],
    postedDate: "1 week ago",
    description: "Build scalable backend systems and APIs that power our data-driven applications."
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           <div className="flex items-center">
  <img src="/public/logo2.png" alt="Logo" className="h-8 w-8 object-contain" />
  <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
</div>


            <nav className="hidden md:flex space-x-8">
              {/* <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link> */}
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Find Jobs</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Companies</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden flex flex-col gap-2 pt-4 pb-2">
              {/* <Link
  to="/"
  className="relative text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
>
  Home
</Link> */}

<Link
  to="/login"
  className="relative text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
>
  Find Jobs
</Link>

<Link
  to="/login"
  className="relative text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
>
  Companies
</Link>

<Link
  to="/about"
  className="relative text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
>
  About
</Link>

              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Find Your Dream Job <span className="text-blue-600">Today</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match your skills and aspirations.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full md:w-1/2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="w-full md:w-1/2 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="w-full md:w-auto">
                <Button className="w-full md:w-auto h-12 px-6 bg-blue-600 hover:bg-blue-700">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-lg text-gray-600">Discover the latest opportunities from top companies</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md w-full">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 hover:text-blue-600 transition-colors">
                        <Link to={`/job/${job.id}`}>{job.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 mt-1">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{job.experience} experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-lg font-semibold text-green-600">{job.salary}</span>
                      <Link to={`/job/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
  <Link to="/login">
  <Button
    variant="outline"
    size="lg"
    className="px-8 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
  >
    View All Jobs
  </Button>
</Link>

</div>

        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center px-2">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Jobs</h3>
              <p className="text-gray-600">Browse thousands of job opportunities from top companies worldwide.</p>
            </div>
            <div className="text-center px-2">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Apply Easily</h3>
              <p className="text-gray-600">Submit your application with just a few clicks and track your progress.</p>
            </div>
            <div className="text-center px-2">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Hired</h3>
              <p className="text-gray-600">Connect with employers and land your dream job with our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                 <img src="/public/logo2.png" alt="Logo" className="h-8 w-8 object-contain" />
                <span className="ml-2 text-xl font-bold">JobPortal</span>
              </div>
              <p className="text-gray-400">Connecting talented professionals with amazing opportunities worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Career Advice</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Resume Builder</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Browse Resumes</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Recruiting Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
