import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const placeholderTexts = [
    "Ex: cerere casatorie Salcia, Teleorman",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const fullText = placeholderTexts[textIndex];
      setPlaceholder(fullText.substring(0, charIndex + 1));
      setCharIndex((prev) => {
        if (prev + 1 >= fullText.length) {
          setTimeout(() => {
            setCharIndex(0);
            setTextIndex((idx) => (idx + 1) % placeholderTexts.length);
          }, 2000);
          clearInterval(typingInterval);
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(typingInterval);
  }, [charIndex, textIndex]);

  return (
    <div className="relative mb-2 w-full max-w-md">
      <Input
        autoFocus
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          title="Șterge căutarea"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
