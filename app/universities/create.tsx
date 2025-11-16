"use client";

import { useState } from "react";
import { createUniversity, UniversityInput } from "@/lib/api/universities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CreateUniversity() {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof UniversityInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUniversity(form);
      router.push("/universities");
    } catch (err: any) {
      setError(err.message || "Failed to create university");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Add University</h1>
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

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create University"}
        </Button>
      </div>
    </div>
  );
}
