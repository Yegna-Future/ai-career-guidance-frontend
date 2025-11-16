import { University } from "../types";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { UniversityCard } from "./UniversityCard";

export default function FeaturedUniversities({ list }: { list: University[] }) {
  return (
    <MaxWidthWrapper>
      <section className="py-16">
        <div className="container">
          <h3 className="text-2xl font-semibold text-center">Featured Universities</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map(u => <UniversityCard key={u.id} uni={u} />)}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>

  );
}
