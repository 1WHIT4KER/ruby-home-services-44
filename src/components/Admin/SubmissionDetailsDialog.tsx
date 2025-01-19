import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormSubmission } from "@/types/form";

interface SubmissionDetailsDialogProps {
  submission: FormSubmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: string;
  status: string;
  onNotesChange: (notes: string) => void;
  onStatusChange: (status: string) => void;
  onUpdate: () => void;
}

export const SubmissionDetailsDialog = ({
  submission,
  open,
  onOpenChange,
  notes,
  status,
  onNotesChange,
  onStatusChange,
  onUpdate,
}: SubmissionDetailsDialogProps) => {
  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p>Name: {submission.first_name} {submission.last_name}</p>
              <p>Email: {submission.email}</p>
              <p>Phone: {submission.phone}</p>
              <p>Address: {submission.address}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Services Requested</h3>
              <ul className="list-disc list-inside">
                {submission.screen_cleaning && <li>Screen Cleaning</li>}
                {submission.exterior_power_washing && <li>Exterior Power Washing</li>}
                {submission.gutter_cleaning && <li>Gutter Cleaning</li>}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Add notes about this submission..."
                className="h-32"
              />
            </div>

            <Button onClick={onUpdate} className="w-full">
              Update Submission
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};