import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services#essential">
                  <a className="text-muted-foreground hover:text-primary">
                    Essential Assessment
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services#professional">
                  <a className="text-muted-foreground hover:text-primary">
                    Professional Validation
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services#enterprise">
                  <a className="text-muted-foreground hover:text-primary">
                    Enterprise Solution
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  <a className="text-muted-foreground hover:text-primary">
                    Our Methodology
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ModelProof Technologies LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
