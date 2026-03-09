import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Hire Dimensions",
  description: "Terms of Service for Hire Dimensions recruiting services.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <p className="text-gray-500 mb-8">Last updated: March 2025</p>

        <div className="prose prose-lg max-w-none text-[var(--color-navy-light)]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Agreement to Terms
            </h2>
            <p>
              By accessing or using the services provided by Hire Dimensions
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Description of Services
            </h2>
            <p>
              Hire Dimensions provides recruiting and staffing services for the
              HVAC industry, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Candidate sourcing and screening</li>
              <li>Behavioral and culture-fit assessments</li>
              <li>Job matching and placement services</li>
              <li>Consulting on hiring practices</li>
              <li>Applicant tracking and management tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Eligibility
            </h2>
            <p>
              Our services are intended for businesses seeking to hire employees
              and individuals seeking employment. You must be at least 18 years
              old and have the legal authority to enter into binding contracts
              to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Client Responsibilities
            </h2>
            <p className="mb-4">As a client using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate and complete information about your company and
                job requirements
              </li>
              <li>
                Comply with all applicable employment laws and regulations
              </li>
              <li>
                Not discriminate against candidates based on protected
                characteristics
              </li>
              <li>
                Maintain confidentiality of candidate information shared with
                you
              </li>
              <li>
                Pay all fees in accordance with your service agreement
              </li>
              <li>
                Notify us promptly of any hires made through our services
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Candidate Responsibilities
            </h2>
            <p className="mb-4">As a candidate using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate and truthful information in your application
                and resume
              </li>
              <li>
                Keep your contact information and availability status current
              </li>
              <li>
                Respond to communications from Hire Dimensions in a timely
                manner
              </li>
              <li>
                Not misrepresent your qualifications, experience, or work
                authorization
              </li>
              <li>
                Maintain confidentiality of any proprietary assessment
                materials
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Fees and Payment
            </h2>
            <p>
              Service fees are outlined in individual client agreements. Payment
              terms, including placement fees, subscription fees, and any
              guarantee periods, will be specified in your service contract.
              Late payments may be subject to interest charges as permitted by
              law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Placement Guarantee
            </h2>
            <p>
              Specific guarantee terms for placements, if applicable, will be
              outlined in your service agreement. Guarantees typically require
              prompt notification of any placement issues and may be subject to
              certain conditions and limitations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Intellectual Property
            </h2>
            <p>
              All content, materials, assessments, and methodologies provided by
              Hire Dimensions are our proprietary intellectual property.
              Clients and candidates may not copy, distribute, or use these
              materials for any purpose other than their intended use without
              our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Limitation of Liability
            </h2>
            <p>
              Hire Dimensions provides recruiting services on an &quot;as is&quot; basis.
              We do not guarantee that any candidate will be hired or that any
              placement will be successful. To the maximum extent permitted by
              law, we shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of our
              services.
            </p>
            <p className="mt-4">
              Our total liability for any claim arising from our services shall
              not exceed the fees paid by you in the twelve months preceding the
              claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Hire Dimensions, its
              officers, directors, employees, and agents from any claims,
              damages, losses, or expenses arising from your use of our
              services, your violation of these terms, or your violation of any
              rights of a third party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Non-Solicitation
            </h2>
            <p>
              Clients agree not to directly solicit or hire candidates
              introduced by Hire Dimensions outside of our placement process
              for a period of 12 months following the introduction, unless a
              placement fee is paid.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Termination
            </h2>
            <p>
              Either party may terminate services with written notice as
              specified in the service agreement. Upon termination, all
              outstanding fees become immediately due. Provisions regarding
              confidentiality, intellectual property, and limitation of
              liability shall survive termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Governing Law
            </h2>
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the state in which Hire Dimensions is
              headquartered, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              We will notify users of any material changes by posting the
              updated terms on our website. Your continued use of our services
              after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact
              us at:
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
