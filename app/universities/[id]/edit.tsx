"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUniversity, updateUniversity, University, UniversityInput } from "@/lib/api/universities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditUniversity() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<UniversityInput>({
    name: "",
    region: "",
    website: "",
    description: "",
    establishedYear: new Date().getFullYear(),
    isPublic: true,
    location: { latitude: 0, longitude: 0, address: "" },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing university
  useEffect(() => {
    if (!id) return;
    fetchUniversity(Number(id))
      .then((uni: University) => {
        setForm({
          name: uni.name,
          region: uni.region,
          website: uni.website,
          description: uni.description,
          establishedYear: uni.establishedYear,
          isPublic: uni.isPublic,
          location: uni.location,
          image_url: uni.image_url,
          globalRank: uni.globalRank,
          nationalRank: uni.nationalRank,
        });
      })
      .catch(err => setError(err.message || "Failed to fetch university"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field: keyof UniversityInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateUniversity(Number(id), form);
      router.push(`/universities/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to update university");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading university data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit University</h1>
      <div className="space-y-4">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={e => handleChange("name", e.target.value)}
        />
        <Input
          placeholder="Region"
          value={form.region}
          onChange={e => handleChange("region", e.target.value)}
        />
        <Input
          placeholder="Website"
          value={form.website}
          onChange={e => handleChange("website", e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={e => handleChange("description", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Established Year"
          value={form.establishedYear}
          onChange={e => handleChange("establishedYear", Number(e.target.value))}
        />
        <Input
          placeholder="Address"
          value={form.location.address}
          onChange={e => setForm(prev => ({
            ...prev,
            location: { ...prev.location, address: e.target.value }
          }))}
        />
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Latitude"
            value={form.location.latitude}
            onChange={e => setForm(prev => ({
              ...prev,
              location: { ...prev.location, latitude: Number(e.target.value) }
            }))}
          />
          <Input
            type="number"
            placeholder="Longitude"
            value={form.location.longitude}
            onChange={e => setForm(prev => ({
              ...prev,
              location: { ...prev.location, longitude: Number(e.target.value) }
            }))}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
