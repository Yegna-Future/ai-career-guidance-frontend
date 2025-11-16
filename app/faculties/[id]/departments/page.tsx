"use client"
import { fetchDepartmentsByFaculty } from "@/lib/api/departments";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export default function FacultyDepartmentsPage() {
  const { id } = useParams();
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchDepartmentsByFaculty(Number(id))
      .then(setDepartments)
      .catch(err => setError(err.message || "Failed to fetch departments"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Loading departments..." />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{dept.name}</h2>
              {dept.description && <p className="text-gray-600">{dept.description}</p>}
            </div>
            <Link
              href={`/departments/${dept.id}/courses`}
              className="mt-4 inline-block text-blue-600 hover:underline font-medium"
            >
              <Button variant="outline">
                View Courses
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
