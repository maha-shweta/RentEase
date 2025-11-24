import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { utilitySchema, UtilityFormData } from "@/schemas/utility";
import { useToast } from "@/hooks/use-toast";

interface UtilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UtilityDialog({ open, onOpenChange }: UtilityDialogProps) {
  const { toast } = useToast();

  const form = useForm<UtilityFormData>({
    resolver: zodResolver(utilitySchema),
    defaultValues: {
      unitId: "",
      utilityType: "",
      amount: 0,
      billMonth: "",
      dueDate: "",
      paid: false,
    },
  });

  const onSubmit = (data: UtilityFormData) => {
    console.log("Create utility:", data);
    toast({
      title: "Utility Added",
      description: "The utility bill has been successfully added.",
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Utility Bill</DialogTitle>
          <DialogDescription>Fill in the utility details below</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Unit ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="utilityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utility Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Electricity, Water, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="150"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Month</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Status</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Paid</SelectItem>
                        <SelectItem value="false">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Utility</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
