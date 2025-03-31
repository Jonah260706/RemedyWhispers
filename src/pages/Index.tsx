import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Placeholder Icons (replace with actual icons later)
const IconSymptom = () => <span className="text-2xl">🩺</span>; // Example emoji
const IconRemedy = () => <span className="text-2xl">🌿</span>; // Example emoji
const IconPersonalized = () => <span className="text-2xl">👤</span>; // Example emoji

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 via-white to-blue-50 rounded-lg shadow-md mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to Remedy Whisper
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your intelligent guide to understanding symptoms and discovering natural remedies. Find personalized insights and holistic solutions for your well-being.
        </p>
        <Link to="/remedies"> {/* Add Link wrapper */}
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore Remedies
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconSymptom />
              <div>
                <CardTitle>Symptom Checker</CardTitle>
                <CardDescription>Enter your symptoms to get potential insights.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Our AI-powered checker helps you understand possible causes.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconRemedy />
              <div>
                <CardTitle>Natural Remedies</CardTitle>
                <CardDescription>Explore a vast library of natural solutions.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Discover traditional and evidence-based remedies.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconPersonalized />
              <div>
                <CardTitle>Personalized Insights</CardTitle>
                <CardDescription>Get recommendations tailored to you.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Receive guidance based on your unique profile and needs.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="text-center p-6 bg-white rounded-lg shadow">
             <div className="text-3xl mb-3">1</div>
             <h3 className="font-semibold mb-2">Describe Symptoms</h3>
             <p className="text-sm text-gray-600">Use our intuitive interface to detail how you're feeling.</p>
           </Card>
           <Card className="text-center p-6 bg-white rounded-lg shadow">
             <div className="text-3xl mb-3">2</div>
             <h3 className="font-semibold mb-2">Get Insights</h3>
             <p className="text-sm text-gray-600">Our AI analyzes your input and suggests potential remedies.</p>
           </Card>
           <Card className="text-center p-6 bg-white rounded-lg shadow">
             <div className="text-3xl mb-3">3</div>
             <h3 className="font-semibold mb-2">Explore Solutions</h3>
             <p className="text-sm text-gray-600">Browse detailed information on recommended natural remedies.</p>
           </Card>
        </div>
      </section>

      {/* Placeholder for more content */}
      <div className="text-center py-10 border-t border-gray-200">
        <p className="text-gray-500">More content coming soon...</p>
      </div>
    </div>
  );
};

export default Index;
