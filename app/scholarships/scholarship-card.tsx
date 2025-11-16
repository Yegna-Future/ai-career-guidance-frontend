// components/scholarship-card.tsx
import { Calendar, ExternalLink, MapPin, GraduationCap, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Scholarship } from "@/types";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const isDeadlinePassed = scholarship.deadline ? new Date(scholarship.deadline) < new Date() : false;
  const daysUntilDeadline = scholarship.deadline
    ? Math.ceil((new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const getDeadlineColor = () => {
    if (!scholarship.deadline) return "text-gray-600 bg-gray-50 border-gray-200";
    if (isDeadlinePassed) return "text-red-600 bg-red-50 border-red-200";
    if (daysUntilDeadline && daysUntilDeadline <= 30) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getTypeColor = () => {
    switch (scholarship.type) {
      case "University":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Global/External":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return "Amount not specified";
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB'
    }).format(amount);
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-indigo-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getTypeColor()}>
            {scholarship.type}
          </Badge>
          {scholarship.deadline && (
            <Badge className={`${getDeadlineColor()} border`}>
              <Calendar className="w-3 h-3 mr-1" />
              {format(new Date(scholarship.deadline), "MMM dd, yyyy")}
            </Badge>
          )}
        </div>

        <CardTitle className="text-lg font-semibold text-primary group-hover:text-indigo-700 transition-colors line-clamp-2">
          {scholarship.title}
        </CardTitle>

        <CardDescription className="flex items-center gap-1 mt-2">
          {scholarship.university ? (
            <>
              <GraduationCap className="w-4 h-4" />
              <span>{scholarship.university.name}</span>
              <span className="text-indigo-500">•</span>
              <MapPin className="w-4 h-4" />
              <span>{scholarship.university.region}</span>
            </>
          ) : (
            <span className="text-gray-500">Multiple Institutions</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {scholarship.description || "No description available."}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-indigo-700">Funding:</span>
            <span className="text-sm text-gray-700">{formatAmount(scholarship.amount)}</span>
          </div>

          {scholarship.eligibility && (
            <div>
              <span className="text-sm font-medium text-indigo-700">Eligibility:</span>
              <p className="text-sm text-gray-700 line-clamp-2 mt-1">{scholarship.eligibility}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          variant="primary"
          className="w-full transition-colors"
          asChild
        >
          {scholarship.link ? (
            <a
              href={scholarship.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Apply Now
            </a>
          ) : (
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Details Coming Soon
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}