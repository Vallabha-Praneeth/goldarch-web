import { Link } from 'react-router-dom';
import { FileText, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Gold.Arch Construction CRM
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your construction project management with powerful quote tracking and supplier management.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/quotes">
                  <FileText className="w-5 h-5" />
                  View Quotes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/quotes" className="card-surface-hover p-6 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quote Management</h3>
            <p className="text-muted-foreground text-sm">
              Track, compare, and manage quotes from multiple suppliers with filtering and status tracking.
            </p>
          </Link>

          <div className="card-surface p-6 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quote Comparison</h3>
            <p className="text-muted-foreground text-sm">
              Compare quotes side-by-side to find the best deals for your projects.
            </p>
          </div>

          <div className="card-surface p-6 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Supplier Directory</h3>
            <p className="text-muted-foreground text-sm">
              Manage your supplier relationships and track performance over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
