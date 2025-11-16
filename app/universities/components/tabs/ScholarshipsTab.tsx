import { University } from "@/lib/api/universities";
import { Award, Eye, ExternalLink, Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Scholarship {
  id: number;
  universityId: number;
  name: string;
  description: string;
  eligibility: string;
  deadline: string;
  link: string;
  amount: string;
  image_url?: string;
  type: string;
}

interface ScholarshipsTabProps {
  university: University;
  scholarships: Scholarship[];
}

export default function ScholarshipsTab({ university, scholarships }: ScholarshipsTabProps) {
  if (scholarships.length === 0) {
    return (
      <EmptyState
        icon={<Award className="w-16 h-16" />}
        title="No Scholarships Available"
        description="There are currently no scholarships listed for this university. Check back later for new opportunities."
        action={
          <Button asChild>
            <Link href="/scholarships">
              <Award className="w-4 h-4 mr-2" />
              Browse All Scholarships
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats
      
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-50 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Scholarship Opportunities</h2>
            <p className="text-gray-600 mt-1">
              {scholarships.length} financial aid options available for {university.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{scholarships.length}</div>
            <div className="text-sm text-gray-600">Total Scholarships</div>
          </div>
        </div>
      </div>*/}


      {/* Scholarship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => {
          const deadline = new Date(scholarship.deadline);
          const isUrgent = deadline.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;
          const isExpired = deadline.getTime() < Date.now();

          return (
            <Card
              key={scholarship.id}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden"
            >


              <CardHeader className="pb-3 px-6 pt-6">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-indigo-700 transition-colors line-clamp-2 leading-tight">
                    {scholarship.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                  {scholarship.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6 space-y-4">
                {/* Key Information Grid */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-semibold text-gray-900">{scholarship.amount}</div>
                      <div className="text-gray-500 text-xs">Funding</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className={`w-4 h-4 ${isExpired ? 'text-primary' : isUrgent ? 'text-red-500' : 'text-secondary'}`} />
                    <div>
                      <div className={`font-semibold ${isExpired ? 'text-gray-500' : isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                        {deadline.toLocaleDateString()}
                      </div>
                      <div className="text-gray-500 text-xs">Deadline</div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Preview */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-gray-900">Eligibility</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {scholarship.eligibility}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-lg border-gray-300 hover:border-indigo-300 hover:bg-indigo-50"
                    disabled={isExpired}
                  >
                    <Link href={`/scholarships/${scholarship.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all"
                    disabled={isExpired}
                  >
                    <Link href={isExpired ? '#' : scholarship.link} target={isExpired ? '_self' : '_blank'}>
                      {isExpired ? (
                        <Clock className="w-4 h-4 mr-2" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-2" />
                      )}
                      {isExpired ? 'Expired' : 'Apply Now'}
                    </Link>
                  </Button>
                </div>

                {/* Urgent Notice */}
                {isUrgent && !isExpired && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Apply soon! Deadline approaching</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}