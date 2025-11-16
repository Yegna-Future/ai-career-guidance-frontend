"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { FacultyInput, fetchFacultyById, updateFacultyById } from "@/lib/api/faculties";
import Loading from "@/components/Loading";

export default function EditFacultyPage() {
  const params = useParams();
  const router = useRouter();
  const facultyId = Number(params?.id);

  const [formData, setFormData] = useState<Partial<FacultyInput>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const faculty = await fetchFacultyById(facultyId);
        setFormData({
          name: faculty.name,
          description: faculty.description,
          establishedYear: faculty.establishedYear,
          website: faculty.website,
          image_url: faculty.image_url,
        });
      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    if (facultyId) loadFaculty();
  }, [facultyId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "establishedYear" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateFacultyById(facultyId, formData);
      router.push(`/faculties/${facultyId}`);
    } catch (error) {
      console.error(error);

    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Faculty</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <Label htmlFor="name">Faculty Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Established Year */}
        <div>
          <Label htmlFor="establishedYear">Established Year</Label>
          <Input
            type="number"
            id="establishedYear"
            name="establishedYear"
            value={formData.establishedYear || ""}
            onChange={handleChange}
          />
        </div>

        {/* Website */}
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            type="url"
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
          />
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url || ""}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/faculties/${facultyId}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
