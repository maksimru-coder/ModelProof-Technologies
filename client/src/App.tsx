import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Methodology from "@/pages/methodology";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import EssentialAssessment from "@/pages/services/essential-assessment";
import ProfessionalValidation from "@/pages/services/professional-validation";
import EnterpriseSolution from "@/pages/services/enterprise-solution";
import RetainerServices from "@/pages/services/retainer-services";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/services/essential-assessment" component={EssentialAssessment} />
          <Route path="/services/professional-validation" component={ProfessionalValidation} />
          <Route path="/services/enterprise-solution" component={EnterpriseSolution} />
          <Route path="/services/retainer-services" component={RetainerServices} />
          <Route path="/methodology" component={Methodology} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;