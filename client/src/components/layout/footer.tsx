import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services#essential" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Essential Assessment
                </a>
              </li>
              <li>
                <a href="/services#professional" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Professional Validation
                </a>
              </li>
              <li>
                <a href="/services#enterprise" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Enterprise Solution
                </a>
              </li>
              <li>
                <a href="/services#retainer" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Retainer Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">San Francisco Bay Area</li>
              <li className="text-muted-foreground">California, United States</li>
              <li>
                <a 
                  href="mailto:contact@modelproof.ai" 
                  className="text-muted-foreground hover:text-primary"
                >
                  contact@modelproof.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Our Methodology
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Careers
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice with Privacy and Terms */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} ModelProof Technologies LLC. All rights reserved.
          </p>
          <div className="text-xs space-x-4">
            <Link href="/privacy">
              <span className="text-muted-foreground hover:text-primary cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="text-muted-foreground hover:text-primary cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}