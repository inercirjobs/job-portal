import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Building, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [userType, setUserType] = useState("jobseeker");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyName: "",
    companyDescription: "",
    website: "",
    skills: "",
    experience: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const url =
      userType === "company"
        ? "http://127.0.0.1:8000/api/users/register/hr/"
        : "http://127.0.0.1:8000/api/users/register/jobseeker/";

    const payload =
      userType === "company"
        ? {
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            role: "HR",
            phone: formData.phone,
            company_name: formData.companyName,
            company_description: formData.companyDescription,
            company_website: formData.website,
          }
        : {
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            role: "JobSeeker",
            phone: formData.phone,
            skills: formData.skills,
            experience: formData.experience,
          };

    try {
      const response = await axios.post(url, payload);
      console.log("✅ User registered:", response.data);

      toast({
        title: "Registration Successful",
        description: "Welcome to JobPortal! Please sign in to continue.",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("❌ API Error:", error.response?.data || error.message);
      toast({
        title: "Registration Failed",
        description:
          error.response?.data?.detail ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Join JobPortal</CardTitle>
          <CardDescription className="text-gray-600">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                I want to:
              </Label>
              <RadioGroup
                value={userType}
                onValueChange={setUserType}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jobseeker" id="jobseeker" />
                  <Label htmlFor="jobseeker" className="flex items-center cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Find Jobs (Job Seeker)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company" className="flex items-center cursor-pointer">
                    <Building className="h-4 w-4 mr-2" />
                    Post Jobs (Company/HR)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-1 h-11"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1 h-11"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="mt-1 h-11"
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="mt-1 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="mt-1 h-11"
              />
            </div>

            {userType === "company" && (
              <>
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className="mt-1 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    Company Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                    className="mt-1 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription" className="text-sm font-medium text-gray-700">
                    Company Description *
                  </Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your company and what you do"
                    className="mt-1"
                    rows={3}
                    required
                  />
                </div>
              </>
            )}

            {userType === "jobseeker" && (
              <>
                <div>
                  <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, Python, Marketing"
                    className="mt-1 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 years"
                    className="mt-1 h-11"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
