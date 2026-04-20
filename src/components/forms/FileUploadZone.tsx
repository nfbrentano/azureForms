import { useState } from 'react';
// Plain HTML input used for simplicity
import { Upload, X, FileText, ImageIcon, File as FileIcon } from 'lucide-react';
import { Button } from '../ui/button';
// cn removed

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export const FileUploadZone = ({ onFilesSelected }: FileUploadZoneProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type.includes('pdf') || type.includes('word') || type.includes('excel')) return <FileText className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-8 transition-colors hover:bg-muted/10">
        <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm font-medium">Arraste seus arquivos aqui ou clique para selecionar</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, XLSX, PNG, JPG (Max 10MB por arquivo)</p>
        </div>
        <input
          type="file"
          multiple
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md border bg-card p-2 text-sm shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                  {getFileIcon(file.type)}
                </div>
                <span className="truncate font-medium">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
