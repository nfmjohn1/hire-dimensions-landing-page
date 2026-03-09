import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Hire Dimensions",
  description: "Privacy Policy for Hire Dimensions recruiting services.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <Link
          href="/"
          className="text-[var(--color-orange)] hover:underline mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[var(--color-navy)] mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-500 mb-8">Last updated: March 2025</p>

        <div className="prose prose-lg max-w-none text-[var(--color-navy-light)]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Introduction
            </h2>
            <p>
              Hire Dimensions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our recruiting services or visit our
              website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact Information:</strong> Name, email address, phone
                number, and mailing address.
              </li>
              <li>
                <strong>Business Information:</strong> Company name, job title,
                industry, and company size.
              </li>
              <li>
                <strong>Employment Information:</strong> For candidates, this
                may include resumes, work history, education, skills, and
                references.
              </li>
              <li>
                <strong>Assessment Data:</strong> Results from behavioral and
                culture-fit assessments.
              </li>
              <li>
                <strong>Communications:</strong> Records of your communications
                with us, including emails and phone calls.
              </li>
              <li>
                <strong>Website Usage Data:</strong> IP address, browser type,
                pages visited, and other analytics data.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide recruiting and staffing services</li>
              <li>Match candidates with suitable job opportunities</li>
              <li>Conduct behavioral and culture-fit assessments</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Information Sharing
            </h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Employers:</strong> Candidate information is shared with
                potential employers as part of our recruiting services.
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist us in operating our business.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, comply with legal
              obligations, resolve disputes, and enforce our agreements.
              Candidate information is typically retained for up to 3 years
              unless you request earlier deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information
              below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Cookies
            </h2>
            <p>
              Our website may use cookies and similar tracking technologies to
              enhance your browsing experience and analyze website traffic. You
              can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Hire Dimensions</strong>
              <br />
              Email: paulv@hiredimensions.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
