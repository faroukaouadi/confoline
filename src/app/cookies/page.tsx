import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-4xl 2xl:max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-blue-200 text-lg">
            Learn about how Confoline uses cookies and similar technologies on our website.
          </p>
        </div>

        {/* Scope */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Scope</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
             This Cookie Policy (&quot;Policy&quot;) explains how Confoline Software and its subsidiaries (&quot;Confoline&quot;), 
             use cookies and other similar technologies on our website, https://www.confoline.com, and any related 
             Confoline website (together the &quot;Site&quot;). This Policy does not apply to cookies that may be part of 
             Confoline&apos;s product offerings placed on our customers&apos; websites, for which our customers are the data controller.
          </p>
          <p className="text-blue-100 leading-relaxed">
            This Policy was last updated in January 2025.
          </p>
        </section>

        {/* Consent */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Consent</h2>
          <div className="bg-blue-800/30 border border-blue-600/30 rounded-lg p-6">
            <p className="text-blue-100 leading-relaxed font-medium">
              When you visit our Site, you will be given the option to choose whether or not you agree to the use of 
              cookies and other similar technologies for the purposes we describe in this Policy.
            </p>
          </div>
        </section>

        {/* What are Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">What are Cookies?</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            Cookies are small text files which are downloaded to your browser when you visit a website; for example 
            to remember information about you, such as your language settings or login information. Most web pages 
            contain elements from multiple web domains so when you visit our Site your browser may receive cookies 
            from several sources.
          </p>
          <p className="text-blue-100 leading-relaxed">
            Session cookies are deleted automatically when you close your browser and persistent cookies remain on 
            your device after the browser is closed (for example to remember your user preferences when you return to the Site).
          </p>
        </section>

        {/* Types of Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-300">What types of cookies do we use?</h2>
          
          <div className="space-y-8">
            {/* Essential Cookies */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Essential</h3>
              <p className="text-blue-100 leading-relaxed">
                These cookies and other technologies are necessary for our Site to function and cannot be switched off 
                in our system because they are essential to enabling your use of our Site. Without these cookies, 
                services we would provide (such as permitting log-in into the service) cannot be provided. These cookies 
                may be associated with personal data.
              </p>
            </div>

            {/* Personalization Cookies */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Personalization</h3>
              <p className="text-blue-100 leading-relaxed">
                These cookies and other technologies improve your experience by enabling personalization (like remembering 
                language and region), as well as enabling certain features like tracking progress on our videos and chat 
                support. They can also help you fill out forms on our sites more easily and they also provide you with 
                features, insights and customized content. These cookies may be associated with personal data.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Analytics</h3>
              <p className="text-blue-100 leading-relaxed">
                These cookies and other technologies help us learn how well our Site is performing and how visitors 
                interact with the site and whether there may be technical issues. We use these cookies to understand, 
                improve, and research our Site and they may be set by us or by our third party technology partners. 
                These cookies may be associated with personal data.
              </p>
            </div>

            {/* Targeted Advertising Cookies */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Targeted Advertising</h3>
              <p className="text-blue-100 leading-relaxed">
                These cookies and other technologies collect information about the browsing habits associated with your 
                device and are used to make advertising more relevant to you and your interests. Third parties provide 
                these services in return for recognising that you (or more accurately your device) have visited a 
                certain Site. They may also be used to limit the number of times you see an advertisement or measure 
                the effectiveness of advertising campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Cookie Preferences */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Your Cookie Preferences</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
             You may update your cookie preferences by clicking on the &apos;Your Privacy Choices&apos; link or cookie banner 
             (if applicable) that appears on the site. If you do not agree to the use of these cookies please disable 
             them by selecting &apos;Reject All&apos;. If you choose to reject cookies now, you may update your preferences in 
             the future by following the instructions above.
          </p>
          <p className="text-blue-100 leading-relaxed">
            Please note that the site may not function well if cookies are disabled. It may also stop you from saving 
            customized settings, like login information.
          </p>
        </section>

        {/* Browser Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Managing Cookies in Your Browser</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            Browser manufacturers also provide help pages relating to cookie management in their products:
          </p>
          <ul className="list-disc list-inside text-blue-100 space-y-2 ml-4">
            <li><Link href="https://support.google.com/chrome/answer/95647" className="text-cyan-300 hover:underline">Google Chrome</Link></li>
            <li><Link href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-cyan-300 hover:underline">Internet Explorer</Link></li>
            <li><Link href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-cyan-300 hover:underline">Mozilla Firefox</Link></li>
            <li><Link href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-cyan-300 hover:underline">Safari (Desktop)</Link></li>
            <li><Link href="https://support.apple.com/guide/iphone/iphone42d57235/ios" className="text-cyan-300 hover:underline">Safari (Mobile)</Link></li>
            <li><Link href="https://support.google.com/accounts/answer/32050" className="text-cyan-300 hover:underline">Android Browser</Link></li>
            <li><Link href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-cyan-300 hover:underline">Opera</Link></li>
            <li><Link href="https://help.opera.com/en/mobile/" className="text-cyan-300 hover:underline">Opera Mobile</Link></li>
          </ul>
        </section>

        {/* Do Not Track */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Do Not Track</h2>
          <p className="text-blue-100 leading-relaxed">
             Some internet browsers offer a &quot;do not track&quot; or &quot;DNT&quot; option that relies on technology known as a DNT header, 
             which sends a signal to the websites visited by the user about the user&apos;s browsers DNT preference setting. 
             Confoline honors website visitors&apos; Do Not Track signals and will respect your privacy preferences.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Contact Us</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            If you have any questions about this Cookie Policy, please contact us:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-blue-100">
              <strong>Email:</strong> contact@confoline.com<br />
              <strong>Address:</strong> Confoline Software, Privacy Department<br />
              <strong>Website:</strong> <Link href="/locations" className="text-cyan-300 hover:underline">Contact Us</Link>
            </p>
          </div>
        </section>

        {/* Footer Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/locations" className="text-cyan-300 hover:underline">Contact Us</Link>
            <Link href="/" className="text-cyan-300 hover:underline">Home</Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            © 2025 Confoline Software. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
