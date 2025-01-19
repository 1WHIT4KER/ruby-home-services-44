import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormSubmission } from "@/types/form";

interface SubmissionsTableProps {
  submissions: FormSubmission[];
  onRowClick: (submission: FormSubmission) => void;
}

export const SubmissionsTable = ({ submissions, onRowClick }: SubmissionsTableProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Appointment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow 
              key={submission.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => onRowClick(submission)}
            >
              <TableCell>{formatDate(submission.created_at)}</TableCell>
              <TableCell>
                {submission.first_name} {submission.last_name}
              </TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>{submission.phone}</TableCell>
              <TableCell>
                <span className="capitalize">{submission.status}</span>
              </TableCell>
              <TableCell>
                {submission.appointment_date 
                  ? formatDate(submission.appointment_date)
                  : 'Not scheduled'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};