
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Coins } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';

interface CoinConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: string;
  description: string;
  onConfirm: () => void;
}

const CoinConfirmationDialog = ({ 
  open, 
  onOpenChange, 
  action, 
  description, 
  onConfirm 
}: CoinConfirmationDialogProps) => {
  const { coinBalance } = useWowCoin();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <span>Use WowCoin?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-800">Cost:</span>
                <span className="font-semibold text-amber-600">1 WowCoin</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-amber-800">Balance after:</span>
                <span className="font-semibold text-amber-600">{coinBalance - 1}</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-amber-600 hover:bg-amber-700">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CoinConfirmationDialog;
