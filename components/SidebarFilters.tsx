import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw, Filter } from "lucide-react";

interface SidebarFiltersProps {
  filters: {
    judet: string;
    categorie: string;
    institutie: string;
    tip: string;
    format: string;
  };
  options: {
    categoriiUnice: string[];
    judeteUnice: string[];
    institutiiUnice: string[];
    tipuriFormulare: string[];
    formateUnice: string[];
  };
  onChange: (field: string, value: string) => void;
  onReset: () => void;
  sidebarOpen: boolean;
}

export default function SidebarFilters({ filters, options, onChange, onReset, sidebarOpen }: SidebarFiltersProps) {
  const filtersActive = Object.values(filters).some((v) => v !== "all");

  return (
    <aside
      className={`transition-all duration-300 p-4 w-72 bg-gray-100 h-screen overflow-y-auto border-r
      ${sidebarOpen ? "block" : "hidden"} md:block`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-1">
          <Filter className="w-4 h-4" /> Filtre
          {filtersActive && <span className="text-sm bg-blue-100 text-blue-800 rounded px-2 ml-1">active</span>}
        </h2>
        <Button variant="ghost" size="icon" onClick={onReset} title="Resetează filtre">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <Select onValueChange={(val) => onChange("categorie", val)} value={filters.categorie}>
          <SelectTrigger><SelectValue placeholder="Categorie" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate categoriile</SelectItem>
            {options.categoriiUnice.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onChange("judet", val)} value={filters.judet}>
          <SelectTrigger><SelectValue placeholder="Județ" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate județele</SelectItem>
            <SelectItem value="Național">Național</SelectItem>
            {options.judeteUnice.map((j) => j !== "Național" && <SelectItem key={j} value={j}>{j}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onChange("institutie", val)} value={filters.institutie}>
          <SelectTrigger><SelectValue placeholder="Instituție" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate instituțiile</SelectItem>
            {options.institutiiUnice.map((inst) => <SelectItem key={inst} value={inst}>{inst}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onChange("tip", val)} value={filters.tip}>
          <SelectTrigger><SelectValue placeholder="Tip document" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate tipurile</SelectItem>
            {options.tipuriFormulare.map((tip) => <SelectItem key={tip} value={tip}>{tip}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onChange("format", val)} value={filters.format}>
          <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate formatele</SelectItem>
            {options.formateUnice.map((f) => <SelectItem key={f} value={f}>{f.toUpperCase().replace(".", "")}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}