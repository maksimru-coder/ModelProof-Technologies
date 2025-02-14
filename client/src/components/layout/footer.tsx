import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#essential">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Essential Assessment
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services#professional">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Professional Validation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services#enterprise">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Enterprise Solution
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services#retainer">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Retainer Services
                  </span>
                </Link>
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

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: <a href="mailto:contact@modelproof.ai" className="hover:text-primary">
                  contact@modelproof.ai
                </a>
              </li>
              <li className="text-muted-foreground">
                Location: San Francisco Bay Area
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ModelProof Technologies LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}