export default function Comparison() {
  const comparisons = [
    {
      feature: "Hiring Focus",
      hireDimensions: "Culture fit + Job fit",
      generic: "Job fit only",
    },
    {
      feature: "Response Time",
      hireDimensions: "1-hour response",
      generic: "Days or weeks",
    },
    {
      feature: "Industry Knowledge",
      hireDimensions: "HVAC specialists",
      generic: "Generalists",
    },
    {
      feature: "Assessments",
      hireDimensions: "Behavior + culture assessments",
      generic: "Generic testing",
    },
    {
      feature: "Support",
      hireDimensions: "Dedicated specialist",
      generic: "Ticket queue / chatbot",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] text-center mb-4">
          Not Your Average Recruiting Platform
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See how Hire Dimensions compares to generic ATS platforms.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-gray-500 font-medium">
                  Feature
                </th>
                <th className="text-center py-4 px-4">
                  <span className="inline-block bg-[var(--color-orange)] text-white px-4 py-2 rounded-lg font-bold">
                    Hire Dimensions
                  </span>
                </th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">
                  Generic Platforms
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 font-medium text-[var(--color-navy)]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {row.hireDimensions}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-400">
                    {row.generic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
