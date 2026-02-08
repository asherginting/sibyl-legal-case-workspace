
export default function CaseDetailPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 border-b border-faded text-sm">
        <button className="border-b-2 border-black-soft pb-2 font-medium">
          Details
        </button>
        <button className="pb-2 text-muted">Engagement</button>
        <button className="pb-2 text-muted">Documents</button>
      </div>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-black-soft">
            Case Summary
          </h2>
          <p className="text-sm text-muted max-w-3xl">
            In July 2023, my employer, LionTech Pte Ltd, terminated my contract
            without proper notice. The company cited “restructuring” but did not
            follow the contractual three-month notice period…
          </p>
        </section>
        <section className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-sm font-medium text-black-soft">
            Parties Involved
          </h2>
          <div className="rounded-md border border-faded">
            <div className="grid grid-cols-2 bg-weak px-3 py-2 text-xs text-muted">
              <span>Name</span>
              <span>Role</span>
            </div>
            <div className="grid grid-cols-2 px-3 py-2 text-sm border-t border-faded">
              <span>LionTech Pte Ltd</span>
              <span>Employer</span>
            </div>
            <div className="grid grid-cols-2 px-3 py-2 text-sm border-t border-faded">
              <span>Alex Chen</span>
              <span>Employee</span>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4 max-w-3xl">
          <h2 className="text-sm font-medium text-black-soft">
            Key Events
          </h2>
          <div className="flex gap-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-light text-xs">
              1
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted">8 Jul 2025</span>
              <div className="rounded-md border border-faded p-3 text-sm">
                LionTech’s HR department informed me of immediate termination due
                to “company restructuring,” without prior consultation.
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-light text-xs">
              2
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted">12 Jul 2025</span>
              <div className="rounded-md border border-faded p-3 text-sm">
                I sent a formal email to HR and my line manager requesting
                clarification on the termination clause, but received no
                response.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
