import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">ModelProof Technologies</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">We make your business visible and chosen in the AI era.</p>
            <ul className="space-y-4">
              <li><Link href="/contact"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Get your free AI visibility mini-scan</span></Link></li>
              <li><Link href="/methodology"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">How it works</span></Link></li>
              <li><Link href="/services"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Services</span></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services#audit"><span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">AI Visibility Audit</span></Link></li>
              <li><Link href="/services#retainer"><span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Visibility retainer</span></Link></li>
              <li><Link href="/services#reviews"><span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Review management</span></Link></li>
              <li><Link href="/services#websites"><span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Websites</span></Link></li>
              <li><Link href="/services#front-desk"><span className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">AI Front Desk</span></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">About</span></Link></li>
              <li><a href="mailto:maksim@modelproof.ai" className="text-gray-500 hover:text-[#19376D] transition-colors">maksim@modelproof.ai</a></li>
              <li><Link href="/biasradar"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer" data-testid="footer-link-biasradar">BiasRadar™</span></Link></li>
              <li><Link href="/careers"><span onClick={() => window.scrollTo(0, 0)} className="text-gray-500 hover:text-[#19376D] transition-colors cursor-pointer">Careers</span></Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-gray-400 text-sm mb-4">© {new Date().getFullYear()} ModelProof Technologies. All rights reserved.</p>
          <div className="space-x-6 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-[#19376D] transition-colors cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#19376D] transition-colors cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
