import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Services Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services/essential-assessment">
                  <span 
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer"
                  >
                    Essential Assessment
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/professional-validation">
                  <span 
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer"
                  >
                    Professional Validation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/enterprise-solution">
                  <span 
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer"
                  >
                    Enterprise Solution
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/retainer-services">
                  <span 
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer"
                  >
                    Retainer Services
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about">
                  <span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  <span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">
                    Our Methodology
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">
                    Careers
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice with Privacy and Terms */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} ModelProof Technologies LLC. All rights reserved.
          </p>
          <div className="space-x-6 text-xs">
            <Link href="/privacy">
              <span className="text-gray-400 hover:text-[#19376D] transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="text-gray-400 hover:text-[#19376D] transition-colors cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}