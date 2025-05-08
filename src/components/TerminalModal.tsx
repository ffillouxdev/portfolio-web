import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
  
export function TerminalModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Terminal</DialogTitle>
            <DialogDescription>
              Bienvenue dans le terminal personnalisé.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3">
            <textarea
              rows={10}
              className="w-full bg-black text-white p-2 rounded-md font-mono text-sm"
              placeholder="Tapez vos commandes ici..."
            />
          </div>
        </DialogContent>
      </Dialog>
    );
}
  